// Structured data (JSON-LD) + shared SEO helpers.
//
// Why this file exists: search engines rank a local gym mostly on how well they
// can *understand* it, not on how many times the page says "MMA Sarajevo".
// The schema below states plainly — in the format Google parses — that this is
// a martial arts gym, at these coordinates, open at these hours, teaching these
// disciplines, at these prices. That is what feeds the Maps/local pack, the
// rich results and the "sports club near me" style queries.
//
// Everything is derived from the single sources of truth (CLUB, PRICES, WEEK)
// so the structured data can never drift out of sync with the visible page —
// a mismatch between the two is itself a ranking problem.

import { CLUB, LAT, LNG, PRICES } from "@/lib/club";
import { WEEK } from "@/lib/timetable";
import type { Locale } from "@/i18n/config";

export const SITE_URL = "https://ocdmma.ba";

/** Schema.org day names, indexed by JS day number (0 = Sunday). */
const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/**
 * Opening hours, derived from the class timetable.
 *
 * Days that run an identical set of sessions are merged into one entry (e.g.
 * Mon/Wed/Fri share a block), which is both smaller and exactly how Google's
 * examples model a recurring weekly schedule.
 */
function openingHours() {
  // Group days by the time-window signature they run, so Mon/Wed/Fri collapse.
  const byWindow = new Map<string, { days: number[]; opens: string; closes: string }>();

  for (const { day, sessions } of WEEK) {
    for (const s of sessions) {
      const key = `${s.start}-${s.end}`;
      const existing = byWindow.get(key);
      if (existing) {
        if (!existing.days.includes(day)) existing.days.push(day);
      } else {
        byWindow.set(key, { days: [day], opens: s.start, closes: s.end });
      }
    }
  }

  return [...byWindow.values()].map(({ days, opens, closes }) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days.sort((a, b) => a - b).map((d) => SCHEMA_DAYS[d]),
    opens,
    closes,
  }));
}

/**
 * The disciplines actually taught at the club.
 *
 * Note that boxing/striking appears only as a component of MMA — the club runs
 * no standalone boxing program, and claiming one in structured data would be
 * a misrepresentation Google treats as spam.
 */
const SPORTS_BS = [
  "MMA (mješovite borilačke vještine)",
  "Grappling",
  "Brazilska jiu-jitsa (BJJ)",
  "Hrvanje",
  "Udaračke tehnike u sklopu MMA treninga (boks, kickboks)",
  "Kondicijski trening",
  "Borilački sportovi za žene",
];

const SPORTS_EN = [
  "MMA (mixed martial arts)",
  "Grappling",
  "Brazilian jiu-jitsu (BJJ)",
  "Wrestling",
  "Striking as part of MMA training (boxing, kickboxing)",
  "Strength and conditioning",
  "Martial arts for women",
];

const DESCRIPTION_BS =
  "OCD Fighters je klub za MMA i grappling u Sarajevu (Nedžarići 7). Treninzi MMA-a, grapplinga i brazilske jiu-jitse za sve nivoe — od početnika do profesionalnih takmičara — uz udaračke tehnike u sklopu MMA treninga i poseban program za žene. Glavni trener Namik Alibašić, crni pojas u brazilskoj jiu-jitsi.";

const DESCRIPTION_EN =
  "OCD Fighters is an MMA and grappling club in Sarajevo (Nedžarići 7). MMA, grappling and Brazilian jiu-jitsu training for all levels — from beginners to professional competitors — including striking as part of MMA training, plus a dedicated women's program. Head coach Namik Alibašić, Brazilian jiu-jitsu black belt.";

/**
 * The club itself: a SportsActivityLocation, which is the Schema.org type
 * Google maps onto gyms and gives local-pack treatment.
 */
export function clubJsonLd(locale: Locale) {
  const bs = locale === "bs";

  return {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "SportsClub"],
    "@id": `${SITE_URL}/#club`,
    name: CLUB.name,
    alternateName: [CLUB.shortName, CLUB.legalName],
    description: bs ? DESCRIPTION_BS : DESCRIPTION_EN,
    url: `${SITE_URL}/${locale}`,
    telephone: CLUB.coachPhone,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    foundingDate: String(CLUB.foundingYear),
    sport: bs ? SPORTS_BS : SPORTS_EN,
    currenciesAccepted: "BAM",
    priceRange: `${PRICES.dropIn}–${PRICES.combo} KM`,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLUB.street,
      addressLocality: CLUB.city,
      postalCode: CLUB.postalCode,
      addressCountry: CLUB.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: LAT,
      longitude: LNG,
    },
    hasMap: CLUB.mapsUrl,
    openingHoursSpecification: openingHours(),
    sameAs: [CLUB.instagramUrl],
    employee: [
      {
        "@type": "Person",
        name: CLUB.coachName,
        jobTitle: bs ? "Glavni trener" : "Head coach",
        description: bs
          ? "Nosilac crnog pojasa u brazilskoj jiu-jitsi."
          : "Brazilian jiu-jitsu black belt.",
      },
      {
        "@type": "Person",
        name: CLUB.womensCoachName,
        jobTitle: bs ? "Trenerica — program za žene" : "Coach — women's program",
      },
    ],
    // Membership options, so prices can surface directly in search results.
    makesOffer: (Object.keys(PRICES) as (keyof typeof PRICES)[]).map((key) => ({
      "@type": "Offer",
      name: OFFER_NAMES[locale][key],
      price: PRICES[key],
      priceCurrency: "BAM",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/${locale}#pricing`,
    })),
    areaServed: {
      "@type": "City",
      name: "Sarajevo",
    },
  };
}

const OFFER_NAMES: Record<Locale, Record<keyof typeof PRICES, string>> = {
  bs: {
    grappling: "Mjesečna članarina — grappling",
    mma: "Mjesečna članarina — MMA",
    combo: "Mjesečna članarina — MMA + grappling",
    dropIn: "Pojedinačni trening (drop-in)",
  },
  en: {
    grappling: "Monthly membership — grappling",
    mma: "Monthly membership — MMA",
    combo: "Monthly membership — MMA + grappling",
    dropIn: "Single session (drop-in)",
  },
};

/** The site as a whole — lets Google show the club name as the site name. */
export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: CLUB.shortName,
    inLanguage: locale === "bs" ? "bs-BA" : "en",
    publisher: { "@id": `${SITE_URL}/#club` },
  };
}

/** FAQ rich result — the cheapest way to rank for long, spoken-word queries. */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Breadcrumb trail for sub-pages, shown under the title in search results. */
export function breadcrumbJsonLd(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** A single training program, used on the discipline pages. */
export function courseJsonLd(opts: {
  locale: Locale;
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    inLanguage: opts.locale === "bs" ? "bs-BA" : "en",
    provider: { "@id": `${SITE_URL}/#club` },
    offers: {
      "@type": "Offer",
      category: opts.locale === "bs" ? "Mjesečna članarina" : "Monthly membership",
      priceCurrency: "BAM",
      price: PRICES.mma,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      location: { "@id": `${SITE_URL}/#club` },
    },
  };
}
