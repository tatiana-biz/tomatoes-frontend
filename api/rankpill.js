module.exports = async (req, res) => {
  // Always respond OK so RankPill can't get a 405 while we debug
  if (req.method === "OPTIONS" || req.method === "HEAD") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "rankpill endpoint alive", method: req.method });
  }

  // Accept POST/PUT/PATCH too
  if (req.method !== "POST" && req.method !== "PUT" && req.method !== "PATCH") {
    return res.status(200).json({ ok: true, message: "accepted", method: req.method });
  }

  return res.status(200).json({
    ok: true,
    message: "webhook received",
    method: req.method,
    headers: {
      authorization: req.headers.authorization ? "present" : "missing",
      x_rankpill_signature: req.headers["x-rankpill-signature"] ? "present" : "missing",
      user_agent: req.headers["user-agent"] || null
    },
    receivedKeys: Object.keys(req.body || {}),
  });
};

