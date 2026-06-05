import Link from "next/link";
import { getDb } from "@/lib/db";
import { currentPeriod } from "@/lib/utils";
import AdminShell from "@/components/AdminShell";

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function AdminDashboard() {
  const db = getDb();
  const period = currentPeriod();
  const today = todayISO();

  const members = (
    db.prepare("SELECT COUNT(*) AS c FROM users WHERE role = 'member'").get() as {
      c: number;
    }
  ).c;
  const paid = (
    db
      .prepare("SELECT COUNT(*) AS c FROM payments WHERE period = ? AND status = 'paid'")
      .get(period) as { c: number }
  ).c;
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
    { label: `Platilo (${period})`, value: `${paid}/${members}`, href: "/admin/payments" },
    { label: "Nadolazećih treninga", value: upcoming, href: "/admin/schedule" },
    { label: "Zahtjeva na čekanju", value: pending, href: "/admin/requests" },
  ];

  return (
    <AdminShell active="dashboard" title="Pregled">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
