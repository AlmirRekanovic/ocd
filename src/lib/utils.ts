import { getDb } from "./db";

/** Current period in 'YYYY-MM' form. */
export function currentPeriod(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Normalise a local phone number into international digits for wa.me links.
 * e.g. "061 123 456" -> "38761123456" (with DEFAULT_COUNTRY_CODE=387).
 */
export function toWhatsappNumber(phone: string): string {
  const cc = process.env.DEFAULT_COUNTRY_CODE || "387";
  let digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits.slice(1);
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return cc + digits.slice(1);
  if (digits.startsWith(cc)) return digits;
  return cc + digits;
}

/** Build a wa.me click-to-send link with a prefilled message. */
export function whatsappLink(phone: string, message: string): string {
  return `https://wa.me/${toWhatsappNumber(phone)}?text=${encodeURIComponent(message)}`;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[čć]/g, "c")
    .replace(/[đ]/g, "d")
    .replace(/[š]/g, "s")
    .replace(/[ž]/g, "z")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .replace(/\.{2,}/g, ".");
}

/**
 * Generate a unique username from a member's name and phone.
 * e.g. "Almir Rekanović" + "061123456" -> "almir.r456", with numeric
 * fallbacks if the base is already taken.
 */
export function generateUsername(name: string, phone: string): string {
  const db = getDb();
  const taken = (u: string) =>
    !!db.prepare("SELECT 1 FROM users WHERE username = ?").get(u);

  const parts = slugify(name).split(".").filter(Boolean);
  const first = parts[0] || "clan";
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : "";
  const digits = phone.replace(/\D/g, "");
  const suffix = digits.slice(-3) || "1";

  let base = lastInitial ? `${first}.${lastInitial}${suffix}` : `${first}${suffix}`;
  if (!taken(base)) return base;

  let i = 1;
  while (taken(`${base}${i}`)) i++;
  return `${base}${i}`;
}

/** Day of week index (0=Sunday) for a 'YYYY-MM-DD' string, locale-safe. */
export function dayOfWeek(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}
