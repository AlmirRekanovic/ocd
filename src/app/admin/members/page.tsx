import { getDb } from "@/lib/db";
import { deleteMemberAction } from "@/lib/actions/members";
import AdminShell from "@/components/AdminShell";
import CreateMemberForm from "@/components/CreateMemberForm";
import WhatsAppCredsButton from "@/components/WhatsAppCredsButton";

interface MemberRow {
  id: number;
  name: string;
  phone: string;
  username: string;
  created_at: string;
}

export default function AdminMembersPage() {
  const db = getDb();
  const countryCode = process.env.DEFAULT_COUNTRY_CODE || "387";

  const members = db
    .prepare(
      "SELECT id, name, phone, username, created_at FROM users WHERE role = 'member' ORDER BY name"
    )
    .all() as MemberRow[];

  return (
    <AdminShell active="members" title="Članovi">
      <section className="card mb-8">
        <h2 className="mb-1 font-display text-lg font-bold">Dodaj novog člana</h2>
        <p className="mb-4 text-sm text-zinc-400">
          Unesi ime i broj telefona. Korisničko ime se generiše automatski, a
          lozinka je broj telefona člana.
        </p>
        <CreateMemberForm countryCode={countryCode} />
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-bold">
          Svi članovi ({members.length})
        </h2>
        {members.length === 0 ? (
          <p className="text-sm text-zinc-500">Još nema članova.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink-600">
            <table className="w-full text-sm">
              <thead className="bg-ink-800 text-left text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Ime</th>
                  <th className="px-4 py-3 font-medium">Korisničko ime</th>
                  <th className="px-4 py-3 font-medium">Telefon</th>
                  <th className="px-4 py-3 font-medium">Akcije</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-700">
                {members.map((m) => (
                  <tr key={m.id}>
                    <td className="px-4 py-3 font-medium">{m.name}</td>
                    <td className="px-4 py-3 font-mono text-zinc-300">{m.username}</td>
                    <td className="px-4 py-3 text-zinc-300">{m.phone}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <WhatsAppCredsButton
                          name={m.name}
                          username={m.username}
                          password={m.phone}
                          phone={m.phone}
                          countryCode={countryCode}
                          className="btn-ghost btn-sm"
                          label="WhatsApp podaci"
                        />
                        <form action={deleteMemberAction}>
                          <input type="hidden" name="id" value={m.id} />
                          <button className="btn-ghost btn-sm text-brand-light">
                            Obriši
                          </button>
                        </form>
                      </div>
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
