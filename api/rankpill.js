export default async function handler(req, res) {
  // TEMP: allow everything so we can confirm RankPill connectivity
  res.setHeader("Allow", "POST, GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const body =
      typeof req.body === "object"
        ? req.body
        : JSON.parse(req.body || "{}");

    console.log("RankPill webhook received");
    console.log("Method:", req.method);
    console.log("Headers:", req.headers);
    console.log("Body:", body);

    return res.status(200).json({
      ok: true,
      received: true,
      test: body.test === true,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Webhook crashed" });
  }
}

