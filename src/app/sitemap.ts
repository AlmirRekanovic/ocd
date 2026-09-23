import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { pageKeys, slugForLocale } from "@/i18n/pages";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap for the public site.
 *
 * Built from the same locale and page definitions the routes use, so a
 * new page appears here automatically rather than being silently
 * left out — an unlisted page is a page that may never get crawled.
 *
 * Each entry declares its translations via `alternates.languages`, which is
 * the sitemap equivalent of hreflang and keeps the Bosnian and English
 * versions from competing with each other in search results.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homes = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: locale === "bs" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`])),
    },
  }));

  const contentPages = locales.flatMap((locale) =>
    pageKeys.map((key) => ({
      url: `${SITE_URL}/${locale}/${slugForLocale(key, locale)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: locale === "bs" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/${slugForLocale(key, l)}`]),
        ),
      },
    })),
  );

  return [...homes, ...contentPages];
}
