import Link from "next/link";
import { getDb } from "@/lib/db";
import { todayISO } from "@/lib/dates";
import { getMemberships, TONE_TEXT, WARN_DAYS_BEFORE } from "@/lib/membership";
import AdminShell from "@/components/AdminShell";

export default function AdminDashboard() {
  const db = getDb();
  const today = todayISO();

  const memberships = getMemberships(today);
  const members = memberships.length;
  const paid = memberships.filter((m) => m.state === "active");
  const dueToday = memberships.filter((m) => m.state === "today");
  const dueSoon = memberships.filter((m) => m.state === "expiring" || m.state === "today");
  const expired = memberships.filter((m) => m.state === "expired" || m.state === "never");

  const upcoming = (
    db.prepare("SELECT COUNT(*) AS c FROM training_slots WHERE date >= ?").get(today) as {
      c: number;
    }
  ).c;
  const pending = (
    db
      .prepare("SELECT COUNT(*) AS c FROM private_requests WHERE status = 'pending'")
      .get() as { c: number }
  ).c;

  const cards = [
    { label: "Članova", value: members, href: "/admin/members", tone: "" },
    { label: "Plaćeno", value: `${paid.length}/${members}`, href: "/admin/payments?filter=active", tone: TONE_TEXT.green },
    { label: `Ističu u ${WARN_DAYS_BEFORE} dana`, value: dueSoon.length, href: "/admin/payments", tone: TONE_TEXT.orange },
    { label: "Isteklo / neplaćeno", value: expired.length, href: "/admin/payments?filter=expired", tone: TONE_TEXT.red },
    { label: "Nadolazećih treninga", value: upcoming, href: "/admin/schedule", tone: "" },
    { label: "Zahtjeva na čekanju", value: pending, href: "/admin/requests", tone: "" },
  ];

  return (
    <AdminShell active="dashboard" title="Pregled">
      {(dueToday.length > 0 || expired.length > 0) && (
        <Link
          href="/admin/payments"
          className={`card mb-6 block transition-colors hover:border-brand ${
            expired.length > 0 ? "border-red-500/50" : "border-orange-500/50"
          }`}
        >
          <h2 className="font-display text-lg font-bold">Članarine — danas</h2>
          {dueToday.length > 0 && (
            <p className="mt-2 text-sm">
              <span className={`font-semibold ${TONE_TEXT.orange}`}>Ističe danas:</span>{" "}
              <span className="text-zinc-300">{dueToday.map((m) => m.name).join(", ")}</span>
            </p>
          )}
          {expired.length > 0 && (
            <p className="mt-1 text-sm">
              <span className={`font-semibold ${TONE_TEXT.red}`}>Neplaćeno / isteklo:</span>{" "}
              <span className="text-zinc-300">{expired.map((m) => m.name).join(", ")}</span>
            </p>
          )}
        </Link>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card transition-colors hover:border-brand">
            <div className="text-sm text-zinc-400">{c.label}</div>
            <div className={`mt-2 font-display text-3xl font-extrabold ${c.tone}`}>{c.value}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/members" className="card hover:border-brand">
          <h2 className="font-display text-lg font-bold">Dodaj člana</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Kreiraj nalog (ime + broj), pošalji podatke putem WhatsApp-a.
          </p>
        </Link>
        <Link href="/admin/slots/new" className="card hover:border-brand">
          <h2 className="font-display text-lg font-bold">Dodaj treninge</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Kreiraj pojedinačne ili ponavljajuće treninge (npr. cijela godina).
          </p>
        </Link>
      </div>
    </AdminShell>
  );
}
