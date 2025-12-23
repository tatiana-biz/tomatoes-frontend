module.exports = async (req, res) => {
  // Optional: allow GET for quick health check
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "rankpill endpoint alive" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).send("Method Not Allowed");
  }

  // 1) Verify RankPill secret
  const auth = req.headers.authorization || "";
  const expected = `Bearer ${process.env.RANKPILL_WEBHOOK_SECRET}`;
  if (!process.env.RANKPILL_WEBHOOK_SECRET || auth !== expected) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  // 2) Read RankPill payload
  const p = req.body || {};

  // ---- Adjust these field names to match RankPill’s payload ----
  const title = p.title || p.post_title || p.article_title;
  const slug =
    p.slug ||
    p.post_slug ||
    (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : null);
  const excerpt = p.description || p.meta_description || p.excerpt || "";
  const markdown = p.content_markdown || p.markdown || p.content || "";

  if (!title || !slug || !markdown) {
    return res.status(400).json({
      ok: false,
      error: "Missing required fields (need title, slug, content)",
      receivedKeys: Object.keys(p),
    });
  }

  // 3) Build a simple Sanity mutation
  // Note: This creates body as plain text in an array. Later we can convert Markdown -> Portable Text.
  const now = new Date().toISOString();
  const docId = `post.${slug}`; // deterministic id to avoid duplicates

  const mutations = [
    {
      createOrReplace: {
        _id: docId,
        _type: "post",
        title,
        slug: { _type: "slug", current: slug },
        publishedAt: p.publishedAt || now,
        excerpt,
        // Minimal body field. Your schema may use "body" as Portable Text.
        // This may need adjustment to match your exact Sanity schema.
        body: [
          {
            _type: "block",
            _key: "intro",
            style: "normal",
            children: [{ _type: "span", _key: "t1", text: markdown }],
          },
        ],
      },
    },
  ];

  // 4) Send mutation to Sanity
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";
  const apiVersion = process.env.SANITY_API_VERSION || "2025-12-23";
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId || !token) {
    return res.status(500).json({ ok: false, error: "Missing SANITY_PROJECT_ID or SANITY_API_TOKEN" });
  }

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;

  const sanityResp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  const sanityJson = await sanityResp.json().catch(() => ({}));

  if (!sanityResp.ok) {
    return res.status(sanityResp.status).json({
      ok: false,
      error: "Sanity mutation failed",
      sanityStatus: sanityResp.status,
      sanityResponse: sanityJson,
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Published to Sanity",
    slug,
    sanity: sanityJson,
  });
};

