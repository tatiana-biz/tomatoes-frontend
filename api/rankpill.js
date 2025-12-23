const crypto = require("crypto");

function timingSafeEqual(a, b) {
  const ba = Buffer.from(a || "", "utf8");
  const bb = Buffer.from(b || "", "utf8");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

module.exports = async (req, res) => {
  // Allow GET health check
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "rankpill endpoint alive" });
  }

  // RankPill docs: POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ ok: false, error: `Method ${req.method} not allowed` });
  }

  const secret = process.env.RANKPILL_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({ ok: false, error: "Missing RANKPILL_WEBHOOK_SECRET in Vercel env vars" });
  }

  // RankPill sends signature here
  const signature = req.headers["x-rankpill-signature"];

  if (!signature) {
    return res.status(401).json({ ok: false, error: "Missing X-RankPill-Signature header" });
  }

  // IMPORTANT:
  // Vercel provides req.body already parsed, but signature needs the raw body.
  // We reconstruct a stable JSON string for signing.
  // This will work if RankPill sends JSON and Vercel parses it consistently.
  const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});

  const computed = crypto.createHmac("sha256", secret).update(raw).digest("hex");

  // Some services prefix signatures like "sha256=..."
  const sig = String(signature);
  const normalized = sig.startsWith("sha256=") ? sig.slice(7) : sig;

  if (!timingSafeEqual(normalized, computed)) {
    return res.status(401).json({ ok: false, error: "Invalid signature" });
  }

  // ✅ Signature verified
  return res.status(200).json({
    ok: true,
    message: "RankPill webhook verified",
    receivedKeys: Object.keys(req.body || {}),
  });
};

