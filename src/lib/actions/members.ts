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

export interface UpdateMemberState {
  error?: string;
  saved?: { passwordReset: boolean };
}

export async function updateMemberAction(
  _prev: UpdateMemberState,
  formData: FormData
): Promise<UpdateMemberState> {
  await requireAdmin();
  const db = getDb();

  const id = Number(formData.get("id"));
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const username = String(formData.get("username") || "").trim().toLowerCase();

  if (!id) return { error: "Nepoznat član." };
  if (!name || !phone || !username) {
    return { error: "Ime, broj telefona i korisničko ime su obavezni." };
  }
  if (!/^[a-z0-9._-]+$/.test(username)) {
    return { error: "Korisničko ime smije sadržavati samo mala slova, brojeve, tačku, crticu i donju crtu." };
  }

  const current = db
    .prepare("SELECT phone FROM users WHERE id = ? AND role = 'member'")
    .get(id) as { phone: string } | undefined;
  if (!current) return { error: "Član ne postoji." };

  if (db.prepare("SELECT 1 FROM users WHERE phone = ? AND id != ?").get(phone, id)) {
    return { error: "Drugi član već ima ovaj broj telefona." };
  }
  if (db.prepare("SELECT 1 FROM users WHERE username = ? AND id != ?").get(username, id)) {
    return { error: "Korisničko ime je već zauzeto." };
  }

  // The password is the member's phone number, so a new phone means a new password.
  const passwordReset = phone !== current.phone;
  if (passwordReset) {
    db.prepare(
      "UPDATE users SET name = ?, phone = ?, username = ?, password_hash = ? WHERE id = ?"
    ).run(name, phone, username, bcrypt.hashSync(phone, 10), id);
  } else {
    db.prepare("UPDATE users SET name = ?, username = ? WHERE id = ?").run(name, username, id);
  }

  revalidatePath("/admin", "layout");
  return { saved: { passwordReset } };
}
