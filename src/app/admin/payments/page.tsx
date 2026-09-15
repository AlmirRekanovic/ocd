import Link from "next/link";
import { getDb } from "@/lib/db";
import {
  deletePaymentAction,
  recordPaymentAction,
  sendRemindersNowAction,
} from "@/lib/actions/payments";
import { formatDateBs, formatDateTimeBs, todayISO } from "@/lib/dates";
import {
  getMemberships,
  MEMBERSHIP_DAYS,
  REMIND_DAYS_BEFORE,
  type MemberMembership,
  type MembershipState,
} from "@/lib/membership";
import { whatsappCloudConfig } from "@/lib/whatsapp-cloud";
import { membershipReminderMessage, whatsappLink } from "@/lib/wa";
import AdminShell from "@/components/AdminShell";

type Filter = "all" | MembershipState;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Svi" },
  { key: "today", label: "Ističu danas" },
  { key: "expiring", label: `Ističu za ≤${REMIND_DAYS_BEFORE} dana` },
  { key: "expired", label: "Istekle" },
  { key: "never", label: "Nikad platili" },
  { key: "active", label: "Aktivne" },
];

// Most urgent first.
const URGENCY: Record<MembershipState, number> = {
  today: 0,
  expired: 1,
  expiring: 2,
  never: 3,
  active: 4,
};

const BADGE = {
  green: "bg-emerald-500/15 text-emerald-400",
  amber: "bg-amber-500/15 text-amber-400",
  red: "bg-brand/15 text-brand-light",
};

function dana(n: number): string {
  return n % 10 === 1 && n % 100 !== 11 ? "dan" : "dana";
}

function statusBadge(m: MemberMembership): { text: string; cls: string } {
  const d = m.daysLeft ?? 0;
  switch (m.state) {
    case "never":
      return { text: "Nije plaćeno", cls: BADGE.red };
    case "expired":
      return { text: `Istekla prije ${-d} ${dana(-d)}`, cls: BADGE.red };
    case "today":
      return { text: "Ističe danas", cls: BADGE.amber };
    case "expiring":
      return { text: `Ističe za ${d} ${dana(d)}`, cls: BADGE.amber };
    default:
      return { text: `Aktivna · još ${d} ${dana(d)}`, cls: BADGE.green };
  }
}

interface PaymentRow {
  id: number;
  paid_on: string;
  valid_until: string;
  amount: number | null;
  note: string | null;
  member: string;
  recorded_by: string | null;
}

interface ReminderRow {
  id: number;
  kind: "before" | "due";
  status: "sent" | "failed";
  error: string | null;
  sent_at: string;
  valid_until: string;
  member: string;
}

export default function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: { filter?: string; month?: string };
}) {
  const db = getDb();
  const today = todayISO();
  const countryCode = process.env.DEFAULT_COUNTRY_CODE || "387";
  const remindersConfigured = whatsappCloudConfig() !== null;

  const all = getMemberships(today);
  const counts: Record<MembershipState, number> = {
    active: 0,
    expiring: 0,
    today: 0,
    expired: 0,
    never: 0,
  };
  for (const m of all) counts[m.state]++;

  const filter: Filter = FILTERS.some((f) => f.key === searchParams.filter)
    ? (searchParams.filter as Filter)
    : "all";
  const members = all
    .filter((m) => filter === "all" || m.state === filter)
    .sort(
      (a, b) =>
        URGENCY[a.state] - URGENCY[b.state] ||
        (a.daysLeft ?? 0) - (b.daysLeft ?? 0) ||
        a.name.localeCompare(b.name, "bs")
    );

  const month = /^\d{4}-\d{2}$/.test(searchParams.month || "")
    ? (searchParams.month as string)
    : today.slice(0, 7);

  const payments = db
    .prepare(
      `SELECT p.id, p.paid_on, p.valid_until, p.amount, p.note,
              u.name AS member, a.name AS recorded_by
         FROM membership_payments p
         JOIN users u ON u.id = p.user_id
         LEFT JOIN users a ON a.id = p.created_by
        WHERE substr(p.paid_on, 1, 7) = ?
        ORDER BY p.paid_on DESC, p.id DESC`
    )
    .all(month) as PaymentRow[];
  const monthTotal = payments.reduce((sum, p) => sum + (p.amount ?? 0), 0);

  const reminders = db
    .prepare(
      `SELECT r.id, r.kind, r.status, r.error, r.sent_at, r.valid_until, u.name AS member
         FROM membership_reminders r
         JOIN users u ON u.id = r.user_id
        ORDER BY r.sent_at DESC
        LIMIT 30`
    )
    .all() as ReminderRow[];

  const dueToday = all.filter((m) => m.state === "today");
  const overdue = all.filter((m) => m.state === "expired");

  return (
    <AdminShell active="payments" title="Članarine">
      {/* Today */}
      <section className="card mb-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-bold">Danas, {formatDateBs(today)}</h2>
          <span className="text-xs text-zinc-500">
            Članarina traje {MEMBERSHIP_DAYS} dana od dana uplate.
          </span>
        </div>
        <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <p className="font-semibold text-amber-400">Ističe danas ({dueToday.length})</p>
            <p className="mt-1 text-zinc-300">
              {dueToday.length ? dueToday.map((m) => m.name).join(", ") : "Nikome."}
            </p>
          </div>
          <div>
            <p className="font-semibold text-brand-light">Istekle ({overdue.length})</p>
            <p className="mt-1 text-zinc-300">
              {overdue.length ? overdue.map((m) => m.name).join(", ") : "Nema."}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-ink-700 pt-4 text-sm">
          {remindersConfigured ? (
            <span className={`badge ${BADGE.green}`}>WhatsApp podsjetnici uključeni</span>
          ) : (
            <span className={`badge ${BADGE.amber}`}>
              WhatsApp podsjetnici nisu podešeni (nedostaju WHATSAPP_* postavke)
            </span>
          )}
          <span className="text-xs text-zinc-500">
            Automatski svaki dan ujutro: {REMIND_DAYS_BEFORE} dana prije isteka i na dan isteka.
          </span>
          {remindersConfigured && (
            <form action={sendRemindersNowAction} className="ml-auto">
              <button className="btn-ghost btn-sm">Pošalji današnje podsjetnike sada</button>
            </form>
          )}
        </div>
      </section>

      {/* Members */}
      <div className="mb-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={f.key === "all" ? "/admin/payments" : `/admin/payments?filter=${f.key}`}
            className={`btn-sm rounded-md border px-3 py-1.5 text-xs font-semibold ${
              filter === f.key
                ? "border-brand bg-brand text-white"
                : "border-ink-600 text-zinc-300 hover:bg-ink-700"
            }`}
          >
            {f.label} ({f.key === "all" ? all.length : counts[f.key]})
          </Link>
        ))}
      </div>

      {members.length === 0 ? (
        <p className="mb-8 text-sm text-zinc-500">Nema članova u ovoj kategoriji.</p>
      ) : (
        <div className="mb-10 overflow-x-auto rounded-xl border border-ink-600">
          <table className="w-full text-sm">
            <thead className="bg-ink-800 text-left text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Ime</th>
                <th className="px-4 py-3 font-medium">Zadnja uplata</th>
                <th className="px-4 py-3 font-medium">Vrijedi do</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Evidentiraj uplatu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700">
              {members.map((m) => {
                const badge = statusBadge(m);
                return (
                  <tr key={m.id}>
                    <td className="px-4 py-3">
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-zinc-500">{m.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-zinc-300">
                      {m.last_paid_on ? formatDateBs(m.last_paid_on) : "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-300">
                      {m.valid_until ? formatDateBs(m.valid_until) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`badge ${badge.cls}`}>{badge.text}</span>
                        {m.state !== "active" && (
                          <a
                            href={whatsappLink(
                              m.phone,
                              membershipReminderMessage(
                                m.name,
                                m.valid_until ? formatDateBs(m.valid_until) : null,
                                m.state === "expired"
                              ),
                              countryCode
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-zinc-400 underline hover:text-zinc-200"
                          >
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <form action={recordPaymentAction} className="flex items-center gap-2">
                        <input type="hidden" name="userId" value={m.id} />
                        <input
                          type="date"
                          name="paidOn"
                          defaultValue={today}
                          max={today}
                          required
                          aria-label="Datum uplate"
                          className="input w-36 py-1.5"
                        />
                        <input
                          name="amount"
                          inputMode="decimal"
                          placeholder="KM"
                          aria-label="Iznos (KM)"
                          className="input w-20 py-1.5"
                        />
                        <button className="btn-primary btn-sm whitespace-nowrap">Platio/la</button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment history */}
      <section className="mb-10">
        <form method="get" className="mb-3 flex flex-wrap items-end gap-3">
          <h2 className="mr-auto font-display text-lg font-bold">Historija uplata</h2>
          <div>
            <label className="label" htmlFor="month">
              Mjesec
            </label>
            <input
              id="month"
              type="month"
              name="month"
              defaultValue={month}
              className="input w-44"
            />
          </div>
          {filter !== "all" && <input type="hidden" name="filter" value={filter} />}
          <button className="btn-ghost">Prikaži</button>
        </form>
        <p className="mb-3 text-sm text-zinc-400">
          Uplata: <span className="font-semibold text-zinc-100">{payments.length}</span>
          {monthTotal > 0 && (
            <>
              {" "}
              · Ukupno:{" "}
              <span className="font-semibold text-emerald-400">
                {monthTotal.toLocaleString("bs-BA")} KM
              </span>
            </>
          )}
        </p>

        {payments.length === 0 ? (
          <p className="text-sm text-zinc-500">Nema uplata u ovom mjesecu.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink-600">
            <table className="w-full text-sm">
              <thead className="bg-ink-800 text-left text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Datum uplate</th>
                  <th className="px-4 py-3 font-medium">Član</th>
                  <th className="px-4 py-3 font-medium">Vrijedi do</th>
                  <th className="px-4 py-3 font-medium">Iznos</th>
                  <th className="px-4 py-3 font-medium">Evidentirao</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-700">
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3">{formatDateBs(p.paid_on)}</td>
                    <td className="px-4 py-3 font-medium">
                      {p.member}
                      {p.note && <div className="text-xs font-normal text-zinc-500">{p.note}</div>}
                    </td>
                    <td className="px-4 py-3 text-zinc-300">{formatDateBs(p.valid_until)}</td>
                    <td className="px-4 py-3 text-zinc-300">
                      {p.amount != null ? `${p.amount.toLocaleString("bs-BA")} KM` : "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">{p.recorded_by || "—"}</td>
                    <td className="px-4 py-3">
                      <form action={deletePaymentAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="btn-ghost btn-sm text-brand-light">Obriši</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Reminder log */}
      <section>
        <h2 className="mb-3 font-display text-lg font-bold">Poslani WhatsApp podsjetnici</h2>
        {reminders.length === 0 ? (
          <p className="text-sm text-zinc-500">Još nema poslanih podsjetnika.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink-600">
            <table className="w-full text-sm">
              <thead className="bg-ink-800 text-left text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Vrijeme</th>
                  <th className="px-4 py-3 font-medium">Član</th>
                  <th className="px-4 py-3 font-medium">Podsjetnik</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-700">
                {reminders.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 text-zinc-300">{formatDateTimeBs(r.sent_at)}</td>
                    <td className="px-4 py-3 font-medium">{r.member}</td>
                    <td className="px-4 py-3 text-zinc-300">
                      {r.kind === "before" ? `${REMIND_DAYS_BEFORE} dana prije` : "Na dan isteka"} (
                      {formatDateBs(r.valid_until)})
                    </td>
                    <td className="px-4 py-3">
                      {r.status === "sent" ? (
                        <span className={`badge ${BADGE.green}`}>Poslano</span>
                      ) : (
                        <span className={`badge ${BADGE.red}`} title={r.error || undefined}>
                          Greška{r.error ? `: ${r.error.slice(0, 60)}` : ""}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
