import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private / non-content areas — keep them out of search results.
      // `/admin` also carries a noindex header from its own layout, since
      // robots.txt only asks crawlers not to *fetch*, not to omit from the
      // index if they find the URL linked elsewhere.
      disallow: ["/admin", "/bs/member", "/en/member", "/bs/login", "/en/login", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
