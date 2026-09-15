import { getDb } from "./db";
import { addDays, daysBetween, todayISO } from "./dates";

/** A payment covers this many days. */
export const MEMBERSHIP_DAYS = 30;
/** "Expiring soon" (orange) window: this many days or fewer until expiry. */
export const WARN_DAYS_BEFORE = 7;
/** When the first WhatsApp reminder goes out. */
export const REMIND_DAYS_BEFORE = 3;

export type MembershipState = "active" | "expiring" | "today" | "expired" | "never";

/** Traffic-light color per state: paid = green, due within a week = orange, overdue/unpaid = red. */
export type MembershipTone = "green" | "orange" | "red";

export const MEMBERSHIP_TONE: Record<MembershipState, MembershipTone> = {
  active: "green",
  expiring: "orange",
  today: "orange",
  expired: "red",
  never: "red",
};

export const TONE_BADGE: Record<MembershipTone, string> = {
  green: "bg-emerald-500/15 text-emerald-400",
  orange: "bg-orange-500/15 text-orange-400",
  red: "bg-red-500/15 text-red-400",
};

export const TONE_TEXT: Record<MembershipTone, string> = {
  green: "text-emerald-400",
  orange: "text-orange-400",
  red: "text-red-400",
};

export const TONE_BAR: Record<MembershipTone, string> = {
  green: "border-l-emerald-500",
  orange: "border-l-orange-500",
  red: "border-l-red-500",
};

export interface Membership {
  last_paid_on: string | null;
  valid_until: string | null;
  /** Days until `valid_until` (0 = expires today, negative = expired). */
  daysLeft: number | null;
  state: MembershipState;
}

export interface MemberMembership extends Membership {
  id: number;
  name: string;
  phone: string;
}

export function membershipState(
  validUntil: string | null,
  today: string
): Pick<Membership, "daysLeft" | "state"> {
  if (!validUntil) return { daysLeft: null, state: "never" };
  const daysLeft = daysBetween(today, validUntil);
  const state: MembershipState =
    daysLeft < 0
      ? "expired"
      : daysLeft === 0
      ? "today"
      : daysLeft <= WARN_DAYS_BEFORE
      ? "expiring"
      : "active";
  return { daysLeft, state };
}

/** Membership status of every member, based on their latest payment. */
export function getMemberships(today = todayISO()): MemberMembership[] {
  const rows = getDb()
    .prepare(
      `SELECT u.id, u.name, u.phone,
              MAX(mp.paid_on) AS last_paid_on,
              MAX(mp.valid_until) AS valid_until
         FROM users u
         LEFT JOIN membership_payments mp ON mp.user_id = u.id
        WHERE u.role = 'member'
        GROUP BY u.id
        ORDER BY u.name`
    )
    .all() as Omit<MemberMembership, "daysLeft" | "state">[];

  return rows.map((r) => ({ ...r, ...membershipState(r.valid_until, today) }));
}

export function getMembership(userId: number, today = todayISO()): Membership {
  const row = getDb()
    .prepare(
      `SELECT MAX(paid_on) AS last_paid_on, MAX(valid_until) AS valid_until
         FROM membership_payments WHERE user_id = ?`
    )
    .get(userId) as { last_paid_on: string | null; valid_until: string | null };

  return { ...row, ...membershipState(row.valid_until, today) };
}

/**
 * Expiry date for a new payment: MEMBERSHIP_DAYS from the payment date, or
 * from the current expiry if the member is still active, so paying early
 * never loses days.
 */
export function computeValidUntil(userId: number, paidOn: string): string {
  const { v } = getDb()
    .prepare("SELECT MAX(valid_until) AS v FROM membership_payments WHERE user_id = ?")
    .get(userId) as { v: string | null };
  const start = v && v > paidOn ? v : paidOn;
  return addDays(start, MEMBERSHIP_DAYS);
}
