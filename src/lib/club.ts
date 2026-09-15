// Public club details shown on the landing page.

const LAT = 43.83629;
const LNG = 18.333193;

export const CLUB = {
  address: "Nedžarići 7, Sarajevo",
  instagramUrl: "https://www.instagram.com/ocdfighters.s/",
  instagramHandle: "@ocdfighters.s",
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
