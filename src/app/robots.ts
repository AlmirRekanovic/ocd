import type { MetadataRoute } from "next";

const BASE = "https://ocdmma.ba";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private / non-content areas — keep them out of search results.
      disallow: ["/admin", "/bs/member", "/en/member", "/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
