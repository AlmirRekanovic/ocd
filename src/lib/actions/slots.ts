"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { dayOfWeek } from "@/lib/utils";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") throw new Error("Nije dozvoljeno.");
  return session;
}

async function requireUser() {
  const session = await getSession();
  if (!session) throw new Error("Nije dozvoljeno.");
  return session;
}

export interface CreateSlotsState {
  error?: string;
  createdCount?: number;
}

/**
 * Create training slots. Supports a single date or a recurring schedule across
 * a date range on selected weekdays (used to lay out e.g. a whole year).
 */
export async function createSlotsAction(
  _prev: CreateSlotsState,
  formData: FormData
): Promise<CreateSlotsState> {
  const session = await requireAdmin();
  const db = getDb();

  const title = String(formData.get("title") || "").trim();
  const startTime = String(formData.get("startTime") || "");
  const endTime = String(formData.get("endTime") || "");
  const capacity = Math.max(1, Number(formData.get("capacity")) || 12);
  const notes = String(formData.get("notes") || "").trim() || null;
  const mode = String(formData.get("mode") || "single");

  if (!title || !startTime || !endTime) {
    return { error: "Naziv, početak i kraj treninga su obavezni." };
  }

  const dates: string[] = [];

  if (mode === "single") {
    const date = String(formData.get("date") || "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Neispravan datum." };
    dates.push(date);
  } else {
    const startDate = String(formData.get("startDate") || "");
    const endDate = String(formData.get("endDate") || "");
    const weekdays = formData.getAll("weekdays").map((d) => Number(d));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      return { error: "Neispravan raspon datuma." };
    }
    if (weekdays.length === 0) return { error: "Odaberi bar jedan dan u sedmici." };

    const [sy, sm, sd] = startDate.split("-").map(Number);
    const [ey, em, ed] = endDate.split("-").map(Number);
    const cursor = new Date(sy, sm - 1, sd);
    const end = new Date(ey, em - 1, ed);
    let guard = 0;
    while (cursor <= end && guard < 1000) {
      const iso = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
      if (weekdays.includes(dayOfWeek(iso))) dates.push(iso);
      cursor.setDate(cursor.getDate() + 1);
      guard++;
    }
    if (dates.length === 0) return { error: "Nijedan datum ne odgovara odabranim danima." };
  }

  const insert = db.prepare(
    `INSERT INTO training_slots (title, date, start_time, end_time, capacity, notes, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  const tx = db.transaction((rows: string[]) => {
    for (const date of rows) {
      insert.run(title, date, startTime, endTime, capacity, notes, session.uid);
    }
  });
  tx(dates);

  revalidatePath("/admin/schedule");
  return { createdCount: dates.length };
}

export async function deleteSlotAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  getDb().prepare("DELETE FROM training_slots WHERE id = ?").run(id);
  revalidatePath("/admin/schedule");
}

export async function joinSlotAction(formData: FormData): Promise<void> {
  const session = await requireUser();
  const db = getDb();
  const slotId = Number(formData.get("slotId"));
  const locale = String(formData.get("locale") || "bs");
  if (!slotId) return;

  const slot = db
    .prepare("SELECT capacity FROM training_slots WHERE id = ?")
    .get(slotId) as { capacity: number } | undefined;
  if (!slot) return;

  const count = db
    .prepare("SELECT COUNT(*) AS c FROM slot_signups WHERE slot_id = ?")
    .get(slotId) as { c: number };

  if (count.c < slot.capacity) {
    db.prepare(
      "INSERT OR IGNORE INTO slot_signups (slot_id, user_id) VALUES (?, ?)"
    ).run(slotId, session.uid);
  }
  revalidatePath(`/${locale}/member`);
}

export async function leaveSlotAction(formData: FormData): Promise<void> {
  const session = await requireUser();
  const slotId = Number(formData.get("slotId"));
  const locale = String(formData.get("locale") || "bs");
  if (!slotId) return;
  getDb()
    .prepare("DELETE FROM slot_signups WHERE slot_id = ? AND user_id = ?")
    .run(slotId, session.uid);
  revalidatePath(`/${locale}/member`);
}
