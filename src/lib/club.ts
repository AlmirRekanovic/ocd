// Public club details shown on the landing page and in the JSON-LD structured
// data (see src/lib/seo.ts). Keep every value here identical to the club's
// Google Business Profile — Google cross-checks name/address/phone ("NAP")
// between the two, and matching them is what earns the Maps listing trust.

// Taken from the Google Business Profile listing itself, so the coordinates in
// our structured data are the exact ones Google already holds for the club.
export const LAT = 43.8363107;
export const LNG = 18.3331464;

/**
 * The listing's CID — Google's stable identifier for this place.
 *
 * Preferred over a share.google short link: it never expires, carries no
 * tracking parameters, and resolves straight to the profile.
 * Feature ID: 0x4758cb9151116a61:0x9f3882182a63257
 */
const MAPS_CID = "717066443189269079";

export const CLUB = {
  // `name` must match the Google Business Profile listing character for
  // character — Google compares the two, and the match is what lets the site
  // and the Maps listing reinforce each other instead of looking like two
  // different businesses. Listing: "OCD FIGHTERS MMA & GRAPPLING CLUB".
  name: "OCD Fighters MMA & Grappling Club",
  shortName: "OCD Fighters",
  legalName: "OCD Fighters Sarajevo",
  foundingYear: 2026,
  street: "Nedžarići 7",
  city: "Sarajevo",
  postalCode: "71000",
  countryCode: "BA",
  address: "Nedžarići 7, Sarajevo",
  instagramUrl: "https://www.instagram.com/ocdfighters.s/",
  instagramHandle: "@ocdfighters.s",
  coachName: "Namik Alibašić",
  womensCoachName: "Dalila",
  coachPhone: "+38761023883",
  coachPhoneDisplay: "+387 61 023 883",
  // Google Business Profile listing. The "Otvori u Google Maps" button and the
  // JSON-LD `hasMap`/`sameAs` all point here, which is what ties the site and
  // the Maps listing together as one entity.
  mapsUrl: `https://www.google.com/maps?cid=${MAPS_CID}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`,
  // Embedded by business name rather than by bare coordinates, so the map
  // shows the actual listing — name, photos and reviews — instead of an
  // anonymous pin. `ll` keeps it centred correctly regardless.
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(
    "OCD FIGHTERS MMA & GRAPPLING CLUB, Nedžarići 7, Sarajevo",
  )}&ll=${LAT},${LNG}&z=17&output=embed`,
};

/** Prices in KM. Labels live in the i18n dictionaries (pricing.plans). */
export const PRICES = {
  grappling: 70,
  mma: 70,
  combo: 100,
  dropIn: 15,
} as const;

export type PlanKey = keyof typeof PRICES;
