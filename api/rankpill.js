export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Method Not Allowed");
  }

  const auth = req.headers.authorization || "";
  const expected = `Bearer ${process.env.RANKPILL_WEBHOOK_SECRET}`;

  if (!process.env.RANKPILL_WEBHOOK_SECRET || auth !== expected) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  const payload = req.body || {};

  return res.status(200).json({
    ok: true,
    message: "RankPill webhook received",
    received: payload,
  });
}

