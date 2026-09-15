"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isISODate, todayISO } from "@/lib/dates";
import { computeValidUntil } from "@/lib/membership";
import { runMembershipReminders } from "@/lib/reminders";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") throw new Error("Nije dozvoljeno.");
  return session;
}

function revalidateMembership() {
  revalidatePath("/admin/payments");
  revalidatePath("/admin");
}

/** Record a membership payment made on a given day (defaults to today). */
export async function recordPaymentAction(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const db = getDb();

  const userId = Number(formData.get("userId"));
  const paidOn = String(formData.get("paidOn") || "") || todayISO();
  const amountRaw = String(formData.get("amount") || "").replace(",", ".").trim();
  const amount = amountRaw && Number.isFinite(Number(amountRaw)) ? Number(amountRaw) : null;
  const note = String(formData.get("note") || "").trim() || null;

  if (!userId || !isISODate(paidOn)) return;
  const member = db.prepare("SELECT 1 FROM users WHERE id = ? AND role = 'member'").get(userId);
  if (!member) return;

  const validUntil = computeValidUntil(userId, paidOn);
  db.prepare(
    `INSERT INTO membership_payments (user_id, paid_on, valid_until, amount, note, created_by)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(userId, paidOn, validUntil, amount, note, session.uid);

  revalidateMembership();
}

/** Remove a payment entered by mistake. */
export async function deletePaymentAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  getDb().prepare("DELETE FROM membership_payments WHERE id = ?").run(id);
  revalidateMembership();
}

/** Run today's WhatsApp reminders immediately (same job as the daily cron). */
export async function sendRemindersNowAction(): Promise<void> {
  await requireAdmin();
  await runMembershipReminders();
  revalidatePath("/admin/payments");
}
