import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminLoginForm from "@/components/AdminLoginForm";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session?.role === "admin") redirect("/admin");

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded bg-brand font-display text-sm font-black text-white">
            OCD
          </span>
          <span className="font-display text-xl font-extrabold">OCD Fighters</span>
        </div>
        <div className="card">
          <h1 className="font-display text-2xl font-extrabold">Admin prijava</h1>
          <p className="mb-6 mt-1 text-sm text-zinc-400">Pristup za trenera.</p>
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
