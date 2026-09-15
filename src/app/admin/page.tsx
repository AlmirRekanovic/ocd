import Link from "next/link";
import { getDb } from "@/lib/db";
import { todayISO } from "@/lib/dates";
import { getMemberships } from "@/lib/membership";
import AdminShell from "@/components/AdminShell";

export default function AdminDashboard() {
  const db = getDb();
  const today = todayISO();

  const memberships = getMemberships(today);
  const members = memberships.length;
  const active = memberships.filter((m) => m.daysLeft !== null && m.daysLeft >= 0).length;
  const dueToday = memberships.filter((m) => m.state === "today");
  const expiringSoon = memberships.filter((m) => m.state === "expiring");
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
    { label: "Članova", value: members, href: "/admin/members" },
    { label: "Aktivne članarine", value: `${active}/${members}`, href: "/admin/payments?filter=active" },
    { label: "Ističu danas", value: dueToday.length, href: "/admin/payments?filter=today" },
    { label: "Ističu uskoro", value: expiringSoon.length, href: "/admin/payments?filter=expiring" },
    { label: "Nadolazećih treninga", value: upcoming, href: "/admin/schedule" },
    { label: "Zahtjeva na čekanju", value: pending, href: "/admin/requests" },
  ];

  return (
    <AdminShell active="dashboard" title="Pregled">
      {(dueToday.length > 0 || expired.length > 0) && (
        <Link
          href="/admin/payments"
          className="card mb-6 block border-amber-500/40 transition-colors hover:border-brand"
        >
          <h2 className="font-display text-lg font-bold">Članarine — danas</h2>
          {dueToday.length > 0 && (
            <p className="mt-2 text-sm">
              <span className="font-semibold text-amber-400">Ističe danas:</span>{" "}
              <span className="text-zinc-300">{dueToday.map((m) => m.name).join(", ")}</span>
            </p>
          )}
          {expired.length > 0 && (
            <p className="mt-1 text-sm">
              <span className="font-semibold text-brand-light">Neplaćeno / isteklo:</span>{" "}
              <span className="text-zinc-300">{expired.map((m) => m.name).join(", ")}</span>
            </p>
          )}
        </Link>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card transition-colors hover:border-brand">
            <div className="text-sm text-zinc-400">{c.label}</div>
            <div className="mt-2 font-display text-3xl font-extrabold">{c.value}</div>
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
