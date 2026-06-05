import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import { joinSlotAction, leaveSlotAction } from "@/lib/actions/slots";
import { getDb } from "@/lib/db";
import { currentPeriod, dayOfWeek } from "@/lib/utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PrivateRequestForm from "@/components/PrivateRequestForm";

export const dynamic = "force-dynamic";

interface SlotRow {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  notes: string | null;
  taken: number;
  mine: number;
  creator: string | null;
}

interface RequestRow {
  id: number;
  preferred: string | null;
  note: string | null;
  status: "pending" | "approved" | "declined";
  created_at: string;
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default async function MemberPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const session = await getSession();
  if (!session) redirect(`/${locale}/login`);

  const t = getDictionary(locale);
  const m = t.member;
  const db = getDb();
  const today = todayISO();
  const period = currentPeriod();

  const payment = db
    .prepare("SELECT status FROM payments WHERE user_id = ? AND period = ?")
    .get(session.uid, period) as { status: string } | undefined;
  const isPaid = payment?.status === "paid";

  const slots = db
    .prepare(
      `SELECT s.id, s.title, s.date, s.start_time, s.end_time, s.capacity, s.notes,
              (SELECT COUNT(*) FROM slot_signups ss WHERE ss.slot_id = s.id) AS taken,
              (SELECT COUNT(*) FROM slot_signups ss WHERE ss.slot_id = s.id AND ss.user_id = ?) AS mine,
              u.name AS creator
         FROM training_slots s
         LEFT JOIN users u ON u.id = s.created_by
        WHERE s.date >= ?
        ORDER BY s.date, s.start_time
        LIMIT 50`
    )
    .all(session.uid, today) as SlotRow[];

  const mySlots = slots.filter((s) => s.mine > 0);

  const requests = db
    .prepare(
      `SELECT id, preferred, note, status, created_at
         FROM private_requests WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`
    )
    .all(session.uid) as RequestRow[];

  const formatDate = (iso: string) => {
    const [, , d] = iso.split("-");
    return `${t.days[dayOfWeek(iso)]}, ${d}.${iso.split("-")[1]}.`;
  };

  const statusLabel = (s: RequestRow["status"]) =>
    s === "approved" ? m.statusApproved : s === "declined" ? m.statusDeclined : m.statusPending;

  return (
    <div className="min-h-screen">
      <header className="border-b border-ink-700 bg-ink-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded bg-brand font-display text-sm font-black text-white">
              OCD
            </span>
            <span className="font-display text-lg font-extrabold">OCD Fighters</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher current={locale} />
            <form action={logoutAction}>
              <button className="btn-ghost btn-sm">{t.nav.logout}</button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        {/* Greeting + payment */}
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-400">{m.greeting}</p>
            <h1 className="font-display text-3xl font-extrabold">{session.name}</h1>
          </div>
          <div className="card flex items-center gap-3 py-3">
            <span className="text-sm text-zinc-400">
              {m.paymentStatus} ({m.forMonth} {period})
            </span>
            <span
              className={`badge ${
                isPaid ? "bg-emerald-500/15 text-emerald-400" : "bg-brand/15 text-brand-light"
              }`}
            >
              {isPaid ? m.paid : m.unpaid}
            </span>
          </div>
        </section>

        {/* Available training */}
        <section>
          <h2 className="mb-3 font-display text-xl font-bold">{m.upcomingTitle}</h2>
          {slots.length === 0 ? (
            <p className="text-sm text-zinc-500">{m.noSlots}</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {slots.map((s) => {
                const full = s.taken >= s.capacity && s.mine === 0;
                return (
                  <div key={s.id} className="card flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{s.title}</h3>
                        <p className="text-sm text-zinc-400">
                          {formatDate(s.date)} · {s.start_time}–{s.end_time}
                        </p>
                      </div>
                      <span className="text-xs text-zinc-500">
                        {m.capacity}: {s.taken}/{s.capacity}
                      </span>
                    </div>
                    {s.notes && <p className="text-xs text-zinc-500">{s.notes}</p>}
                    {s.creator && (
                      <p className="text-xs text-zinc-600">
                        {m.createdBy}: {s.creator}
                      </p>
                    )}
                    <div className="mt-1">
                      {s.mine > 0 ? (
                        <form action={leaveSlotAction}>
                          <input type="hidden" name="slotId" value={s.id} />
                          <input type="hidden" name="locale" value={locale} />
                          <button className="btn-ghost btn-sm">{m.leave}</button>
                        </form>
                      ) : full ? (
                        <span className="badge bg-ink-700 text-zinc-400">{m.full}</span>
                      ) : (
                        <form action={joinSlotAction}>
                          <input type="hidden" name="slotId" value={s.id} />
                          <input type="hidden" name="locale" value={locale} />
                          <button className="btn-primary btn-sm">{m.join}</button>
                        </form>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* My training */}
        <section>
          <h2 className="mb-3 font-display text-xl font-bold">{m.mySlotsTitle}</h2>
          {mySlots.length === 0 ? (
            <p className="text-sm text-zinc-500">{m.noMySlots}</p>
          ) : (
            <ul className="divide-y divide-ink-700 rounded-xl border border-ink-600 bg-ink-800">
              {mySlots.map((s) => (
                <li key={s.id} className="flex items-center justify-between px-4 py-3">
                  <span>
                    <span className="font-medium">{s.title}</span>{" "}
                    <span className="text-sm text-zinc-400">
                      — {formatDate(s.date)} · {s.start_time}
                    </span>
                  </span>
                  <span className="badge bg-emerald-500/15 text-emerald-400">
                    {m.joined}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Private session */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="font-display text-xl font-bold">{m.privateTitle}</h2>
            <p className="mb-4 mt-1 text-sm text-zinc-400">{m.privateBody}</p>
            <PrivateRequestForm locale={locale} t={m} />
          </div>
          <div className="card">
            <h2 className="font-display text-xl font-bold">{m.privateMine}</h2>
            {requests.length === 0 ? (
              <p className="mt-3 text-sm text-zinc-500">{m.noPrivate}</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {requests.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between rounded-md border border-ink-600 px-3 py-2 text-sm"
                  >
                    <span className="text-zinc-300">
                      {r.preferred || "—"}
                      {r.note ? ` · ${r.note}` : ""}
                    </span>
                    <span
                      className={`badge ${
                        r.status === "approved"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : r.status === "declined"
                          ? "bg-brand/15 text-brand-light"
                          : "bg-amber-500/15 text-amber-400"
                      }`}
                    >
                      {statusLabel(r.status)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
