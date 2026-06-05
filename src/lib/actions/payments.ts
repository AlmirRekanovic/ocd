"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") throw new Error("Nije dozvoljeno.");
}

/** Toggle/set a member's payment status for a given period ('YYYY-MM'). */
export async function setPaymentAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const db = getDb();

  const userId = Number(formData.get("userId"));
  const period = String(formData.get("period") || "");
  const status = String(formData.get("status") || "paid"); // 'paid' | 'unpaid'

  if (!userId || !/^\d{4}-\d{2}$/.test(period)) return;

  if (status === "paid") {
    db.prepare(
      `INSERT INTO payments (user_id, period, status, updated_at)
       VALUES (?, ?, 'paid', datetime('now'))
       ON CONFLICT(user_id, period)
       DO UPDATE SET status = 'paid', updated_at = datetime('now')`
    ).run(userId, period);
  } else {
    // "unpaid" is the absence of a paid record — remove it.
    db.prepare("DELETE FROM payments WHERE user_id = ? AND period = ?").run(
      userId,
      period
    );
  }

  revalidatePath("/admin/payments");
}
