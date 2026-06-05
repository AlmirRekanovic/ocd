"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

export interface PrivateState {
  ok?: boolean;
  error?: string;
}

export async function requestPrivateAction(
  _prev: PrivateState,
  formData: FormData
): Promise<PrivateState> {
  const session = await getSession();
  if (!session) return { error: "auth" };

  const preferred = String(formData.get("preferred") || "").trim() || null;
  const note = String(formData.get("note") || "").trim() || null;
  const locale = String(formData.get("locale") || "bs");

  getDb()
    .prepare("INSERT INTO private_requests (user_id, preferred, note) VALUES (?, ?, ?)")
    .run(session.uid, preferred, note);

  revalidatePath(`/${locale}/member`);
  return { ok: true };
}

export async function setRequestStatusAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session || session.role !== "admin") throw new Error("Nije dozvoljeno.");
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "");
  if (!id || !["pending", "approved", "declined"].includes(status)) return;
  getDb().prepare("UPDATE private_requests SET status = ? WHERE id = ?").run(status, id);
  revalidatePath("/admin/requests");
}
