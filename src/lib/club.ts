// Public club details shown on the landing page and in the JSON-LD structured
// data (see src/lib/seo.ts). Keep every value here identical to the club's
// Google Business Profile — Google cross-checks name/address/phone ("NAP")
// between the two, and matching them is what earns the Maps listing trust.

export const LAT = 43.83629;
export const LNG = 18.333193;

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
  mapsUrl: "https://maps.app.goo.gl/NC3F9tm6oqp9ZnMn9",
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`,
};

/** Prices in KM. Labels live in the i18n dictionaries (pricing.plans). */
export const PRICES = {
  grappling: 70,
  mma: 70,
  combo: 100,
  dropIn: 15,
} as const;

export type PlanKey = keyof typeof PRICES;
