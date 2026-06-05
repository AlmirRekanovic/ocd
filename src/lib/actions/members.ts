"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { generateUsername } from "@/lib/utils";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Nije dozvoljeno.");
  }
  return session;
}

export interface CreateMemberState {
  error?: string;
  created?: { name: string; username: string; password: string; phone: string };
}

export async function createMemberAction(
  _prev: CreateMemberState,
  formData: FormData
): Promise<CreateMemberState> {
  await requireAdmin();
  const db = getDb();

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();

  if (!name || !phone) return { error: "Ime i broj telefona su obavezni." };

  const existing = db.prepare("SELECT id FROM users WHERE phone = ?").get(phone);
  if (existing) return { error: "Član sa ovim brojem telefona već postoji." };

  // Per spec: the password is the member's phone number.
  const username = generateUsername(name, phone);
  const password = phone;
  const hash = bcrypt.hashSync(password, 10);

  db.prepare(
    `INSERT INTO users (name, phone, username, password_hash, role)
     VALUES (?, ?, ?, ?, 'member')`
  ).run(name, phone, username, hash);

  revalidatePath("/admin/members");
  return { created: { name, username, password, phone } };
}

export async function deleteMemberAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  const db = getDb();
  // Never delete an admin account through this path.
  db.prepare("DELETE FROM users WHERE id = ? AND role = 'member'").run(id);
  revalidatePath("/admin/members");
  revalidatePath("/admin/payments");
}
