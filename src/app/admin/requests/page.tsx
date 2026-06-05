import { getDb } from "@/lib/db";
import { setRequestStatusAction } from "@/lib/actions/private";
import { whatsappLink } from "@/lib/wa";
import AdminShell from "@/components/AdminShell";

interface Row {
  id: number;
  preferred: string | null;
  note: string | null;
  status: "pending" | "approved" | "declined";
  created_at: string;
  member: string;
  phone: string;
}

const STATUS_LABEL: Record<Row["status"], string> = {
  pending: "Na čekanju",
  approved: "Odobreno",
  declined: "Odbijeno",
};

export default function AdminRequestsPage() {
  const db = getDb();
  const countryCode = process.env.DEFAULT_COUNTRY_CODE || "387";

  const rows = db
    .prepare(
      `SELECT r.id, r.preferred, r.note, r.status, r.created_at,
              u.name AS member, u.phone AS phone
         FROM private_requests r
         JOIN users u ON u.id = r.user_id
        ORDER BY CASE r.status WHEN 'pending' THEN 0 ELSE 1 END, r.created_at DESC
        LIMIT 200`
    )
    .all() as Row[];

  return (
    <AdminShell active="requests" title="Zahtjevi za privatni trening">
      {rows.length === 0 ? (
        <p className="text-sm text-zinc-500">Nema zahtjeva.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="card flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{r.member}</h3>
                  <span
                    className={`badge ${
                      r.status === "approved"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : r.status === "declined"
                        ? "bg-brand/15 text-brand-light"
                        : "bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {STATUS_LABEL[r.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-300">
                  Željeni termin: {r.preferred || "—"}
                </p>
                {r.note && <p className="text-sm text-zinc-400">Napomena: {r.note}</p>}
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={whatsappLink(
                    r.phone,
                    `Zdravo ${r.member}, u vezi tvog zahtjeva za privatni trening...`,
                    countryCode
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost btn-sm"
                >
                  WhatsApp
                </a>
                <form action={setRequestStatusAction}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="status" value="approved" />
                  <button className="btn-primary btn-sm">Odobri</button>
                </form>
                <form action={setRequestStatusAction}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="status" value="declined" />
                  <button className="btn-ghost btn-sm text-brand-light">Odbij</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
