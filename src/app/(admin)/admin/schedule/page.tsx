import Link from "next/link";
import { getDb } from "@/lib/db";
import { deleteSlotAction } from "@/lib/actions/slots";
import { dayOfWeek } from "@/lib/utils";
import AdminShell from "@/components/AdminShell";

interface SlotRow {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  notes: string | null;
  creator: string | null;
  taken: number;
  attendees: string | null;
}

const DAYS = ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"];

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function AdminSchedulePage({
  searchParams,
}: {
  searchParams: { all?: string };
}) {
  const db = getDb();
  const showAll = searchParams.all === "1";
  const today = todayISO();

  const rows = db
    .prepare(
      `SELECT s.id, s.title, s.date, s.start_time, s.end_time, s.capacity, s.notes,
              u.name AS creator,
              (SELECT COUNT(*) FROM slot_signups ss WHERE ss.slot_id = s.id) AS taken,
              (SELECT GROUP_CONCAT(mu.name, ', ')
                 FROM slot_signups ss JOIN users mu ON mu.id = ss.user_id
                WHERE ss.slot_id = s.id) AS attendees
         FROM training_slots s
         LEFT JOIN users u ON u.id = s.created_by
        ${showAll ? "" : "WHERE s.date >= @today"}
        ORDER BY s.date, s.start_time
        LIMIT 500`
    )
    .all(showAll ? {} : { today }) as SlotRow[];

  // Group by date for readability.
  const groups = new Map<string, SlotRow[]>();
  for (const r of rows) {
    if (!groups.has(r.date)) groups.set(r.date, []);
    groups.get(r.date)!.push(r);
  }

  return (
    <AdminShell active="schedule" title="Raspored treninga">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link href="/admin/slots/new" className="btn-primary">
          + Dodaj treninge
        </Link>
        <Link
          href={showAll ? "/admin/schedule" : "/admin/schedule?all=1"}
          className="btn-ghost"
        >
          {showAll ? "Prikaži samo nadolazeće" : "Prikaži sve"}
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-zinc-500">Nema zakazanih treninga.</p>
      ) : (
        <div className="space-y-6">
          {[...groups.entries()].map(([date, slots]) => (
            <div key={date}>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-400">
                {DAYS[dayOfWeek(date)]}, {date.split("-").reverse().join(".")}
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {slots.map((s) => (
                  <div key={s.id} className="card">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{s.title}</h3>
                        <p className="text-sm text-zinc-400">
                          {s.start_time}–{s.end_time}
                        </p>
                      </div>
                      <span className="text-xs text-zinc-500">
                        {s.taken}/{s.capacity}
                      </span>
                    </div>
                    {s.notes && <p className="mt-1 text-xs text-zinc-500">{s.notes}</p>}
                    <p className="mt-2 text-xs text-zinc-600">
                      Kreirao: {s.creator || "—"}
                    </p>
                    {s.attendees && (
                      <p className="mt-1 text-xs text-zinc-400">
                        Prijavljeni: {s.attendees}
                      </p>
                    )}
                    <form action={deleteSlotAction} className="mt-3">
                      <input type="hidden" name="id" value={s.id} />
                      <button className="btn-ghost btn-sm text-brand-light">
                        Obriši
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
