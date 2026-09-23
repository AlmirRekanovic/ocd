import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import CreateSlotsForm from "@/components/CreateSlotsForm";

export default function NewSlotsPage() {
  return (
    <AdminShell active="slots" title="Dodaj treninge">
      <div className="max-w-2xl">
        <p className="mb-6 text-sm text-zinc-400">
          Dodaj pojedinačni trening ili kreiraj ponavljajući raspored za duži
          period (npr. cijela godina) odabirom dana u sedmici.
        </p>
        <div className="card">
          <CreateSlotsForm />
        </div>
        <Link href="/admin/schedule" className="btn-ghost mt-4">
          ← Nazad na raspored
        </Link>
      </div>
    </AdminShell>
  );
}
