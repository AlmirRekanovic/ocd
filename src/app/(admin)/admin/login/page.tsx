import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminLoginForm from "@/components/AdminLoginForm";
import Logo from "@/components/Logo";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session?.role === "admin") redirect("/admin");

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center">
          <Logo className="h-14 w-auto" sizes="56px" />
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
