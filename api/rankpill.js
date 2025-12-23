module.exports = async (req, res) => {
  // Allow anything RankPill sends
  const allowed = ["GET", "POST", "PUT", "PATCH", "OPTIONS"];

  if (!allowed.includes(req.method)) {
    res.setHeader("Allow", allowed);
    return res.status(405).json({ ok: false, error: `Method ${req.method} not allowed` });
  }

  // Preflight support
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", allowed);
    return res.status(200).end();
  }

  // Health check
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "rankpill endpoint alive" });
  }

  // Auth (RankPill sends Authorization: Bearer <secret>)
  const auth = req.headers.authorization || "";
  const expected = `Bearer ${process.env.RANKPILL_WEBHOOK_SECRET}`;

  if (!process.env.RANKPILL_WEBHOOK_SECRET) {
    return res.status(500).json({ ok: false, error: "Missing RANKPILL_WEBHOOK_SECRET in Vercel env vars" });
  }

  if (auth !== expected) {
    return res.status(401).json({ ok: false, error: "Unauthorized", gotAuth: !!auth });
  }

  // Return success for now so RankPill stops failing.
  // Next step is publishing to Sanity.
  return res.status(200).json({
    ok: true,
    method: req.method,
    receivedKeys: Object.keys(req.body || {}),
  });
};

