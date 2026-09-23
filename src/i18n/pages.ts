// Registry of the public landing pages.
//
// One dynamic route (`/[locale]/[slug]`) renders every page defined here, and
// the nav, footer and sitemap are all generated from this list. Adding a page
// means adding one entry — it then gets a URL, internal links from every other
// page, a sitemap entry with hreflang alternates, and static prerendering,
// with nothing left to remember to wire up.
//
// Slugs are translated per locale and are ASCII-only: Bosnian search queries
// are routinely typed without diacritics, and an ASCII slug matches both
// spellings while the visible copy keeps proper orthography.

import type { Locale } from "./config";
import * as disciplines from "./content/disciplines";
import * as info from "./content/info";
import type { DisciplineKey } from "./content/disciplines";
import type { InfoKey } from "./content/info";

/** Extra content a page can render beyond its prose sections. */
export type PageBlock = "pricing" | "timetable" | "map" | "glossary";

export interface PageContent {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  lede: string;
  sections: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  /** Live data blocks rendered by the page component, in this order. */
  blocks?: PageBlock[];
  /** Term/definition pairs, for pages carrying a "glossary" block. */
  glossary?: { term: string; def: string }[];
  /** Whether to show in the top nav. Defaults to true; the info pages opt out
   *  so the nav stays readable — they are reachable from the footer instead. */
  inNav?: boolean;
}

export type PageKey = DisciplineKey | InfoKey;

/** Order matters: it drives the nav, the footer and the sitemap. */
export const pageKeys = [
  "mma",
  "grappling",
  "bjj",
  "women",
  "beginners",
  "pricing",
  "schedule",
  "location",
  "students",
  "glossary",
] as const satisfies readonly PageKey[];

const content: Record<Locale, Record<PageKey, PageContent>> = {
  bs: { ...disciplines.bs, ...info.bs },
  en: { ...disciplines.en, ...info.en },
};

export function getPage(locale: Locale, key: PageKey): PageContent {
  return content[locale][key];
}

export function getPages(locale: Locale): PageContent[] {
  return pageKeys.map((key) => content[locale][key]);
}

/** Pages shown in the top navigation. */
export function getNavPages(locale: Locale): PageContent[] {
  return getPages(locale).filter((p) => p.inNav !== false);
}

/** Resolve a URL slug back to its key, for the dynamic route. */
export function pageBySlug(locale: Locale, slug: string): PageKey | null {
  return pageKeys.find((key) => content[locale][key].slug === slug) ?? null;
}

/** The matching slug in the other language, so the language switcher works. */
export function slugForLocale(key: PageKey, locale: Locale): string {
  return content[locale][key].slug;
}
