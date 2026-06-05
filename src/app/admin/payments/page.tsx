import { getDb } from "@/lib/db";
import { setPaymentAction } from "@/lib/actions/payments";
import { currentPeriod } from "@/lib/utils";
import AdminShell from "@/components/AdminShell";

interface Row {
  id: number;
  name: string;
  phone: string;
  status: string | null;
}

export default function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: { period?: string };
}) {
  const db = getDb();
  const period = /^\d{4}-\d{2}$/.test(searchParams.period || "")
    ? (searchParams.period as string)
    : currentPeriod();

  const rows = db
    .prepare(
      `SELECT u.id, u.name, u.phone, p.status
         FROM users u
         LEFT JOIN payments p ON p.user_id = u.id AND p.period = ?
        WHERE u.role = 'member'
        ORDER BY u.name`
    )
    .all(period) as Row[];

  const paidCount = rows.filter((r) => r.status === "paid").length;

  return (
    <AdminShell active="payments" title="Članarine">
      <form method="get" className="mb-6 flex flex-wrap items-end gap-3">
        <div>
          <label className="label" htmlFor="period">
            Mjesec
          </label>
          <input
            id="period"
            type="month"
            name="period"
            defaultValue={period}
            className="input w-48"
          />
        </div>
        <button className="btn-ghost">Prikaži</button>
        <span className="ml-auto text-sm text-zinc-400">
          Platilo: <span className="font-semibold text-emerald-400">{paidCount}</span> /{" "}
          {rows.length}
        </span>
      </form>

      {rows.length === 0 ? (
        <p className="text-sm text-zinc-500">Nema članova.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-ink-600">
          <table className="w-full text-sm">
            <thead className="bg-ink-800 text-left text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Ime</th>
                <th className="px-4 py-3 font-medium">Telefon</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Akcija</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700">
              {rows.map((r) => {
                const paid = r.status === "paid";
                return (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3 text-zinc-300">{r.phone}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`badge ${
                          paid
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-brand/15 text-brand-light"
                        }`}
                      >
                        {paid ? "Plaćeno" : "Neplaćeno"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <form action={setPaymentAction}>
                        <input type="hidden" name="userId" value={r.id} />
                        <input type="hidden" name="period" value={period} />
                        <input
                          type="hidden"
                          name="status"
                          value={paid ? "unpaid" : "paid"}
                        />
                        <button
                          className={paid ? "btn-ghost btn-sm" : "btn-primary btn-sm"}
                        >
                          {paid ? "Označi neplaćeno" : "Označi plaćeno"}
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
