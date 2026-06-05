export const locales = ["bs", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bs";

export function isLocale(value: string | undefined): value is Locale {
  return value === "bs" || value === "en";
}
