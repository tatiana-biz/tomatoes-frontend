module.exports = async (req, res) => {
  try {
    // Health check
    if (req.method === "GET") {
      return res.status(200).json({ ok: true, message: "rankpill endpoint alive" });
    }

    // RankPill sometimes uses POST for test and PUT/PATCH for publish
    const allowed = ["POST", "PUT", "PATCH"];
    if (!allowed.includes(req.method)) {
      res.setHeader("Allow", ["GET", ...allowed]);
      return res.status(405).json({ ok: false, error: `Method ${req.method} not allowed` });
    }

    // Auth: Authorization: Bearer <secret>
    const auth = req.headers.authorization || "";
    const expected = `Bearer ${process.env.RANKPILL_WEBHOOK_SECRET}`;
    if (!process.env.RANKPILL_WEBHOOK_SECRET) {
      return res.status(500).json({ ok: false, error: "Missing RANKPILL_WEBHOOK_SECRET in Vercel env vars" });
    }
    if (auth !== expected) {
      return res.status(401).json({ ok: false, error: "Unauthorized" });
    }

    // Payload
    const p = req.body || {};

    // For now, just return payload (so RankPill publish succeeds while we refine mapping)
    return res.status(200).json({ ok: true, receivedKeys: Object.keys(p), received: p });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Server error", details: String(e) });
  }
};

