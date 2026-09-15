// Calendar-date helpers. Dates are plain 'YYYY-MM-DD' strings in the club's
// timezone, so "today" is correct even when the server runs in UTC (Vercel).

export const CLUB_TIMEZONE = "Europe/Sarajevo";
const DAY_MS = 24 * 60 * 60 * 1000;

/** Today's date in Sarajevo as 'YYYY-MM-DD'. */
export function todayISO(now = new Date()): string {
  // en-CA formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CLUB_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function toUTC(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function addDays(iso: string, days: number): string {
  return new Date(toUTC(iso) + days * DAY_MS).toISOString().slice(0, 10);
}

/** Whole days from `from` to `to` (negative if `to` is earlier). */
export function daysBetween(from: string, to: string): number {
  return Math.round((toUTC(to) - toUTC(from)) / DAY_MS);
}

/** True for a real calendar date in 'YYYY-MM-DD' form (rejects e.g. 2026-02-31). */
export function isISODate(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && addDays(s, 0) === s;
}

/** '2026-10-15' -> '15.10.2026.' */
export function formatDateBs(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}.`;
}

/** SQLite UTC datetime ('YYYY-MM-DD HH:MM:SS') -> local '15.10.2026. 09:00'. */
export function formatDateTimeBs(sqliteUtc: string): string {
  const d = new Date(sqliteUtc.replace(" ", "T") + "Z");
  const date = formatDateBs(todayISO(d));
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: CLUB_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
  return `${date} ${time}`;
}
