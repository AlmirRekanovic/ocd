import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";

const NAV = [
  { href: "/admin", label: "Pregled", key: "dashboard" },
  { href: "/admin/members", label: "Članovi", key: "members" },
  { href: "/admin/payments", label: "Članarine", key: "payments" },
  { href: "/admin/schedule", label: "Raspored", key: "schedule" },
  { href: "/admin/slots/new", label: "Dodaj treninge", key: "slots" },
  { href: "/admin/requests", label: "Privatni treninzi", key: "requests" },
];

export default function AdminShell({
  active,
  title,
  children,
}: {
  active: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b border-ink-700 bg-ink-900 md:w-60 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center gap-2 px-4 py-4">
          <span className="grid h-8 w-8 place-items-center rounded bg-brand font-display text-sm font-black text-white">
            OCD
          </span>
          <div>
            <div className="font-display text-sm font-extrabold leading-tight">
              OCD Fighters
            </div>
            <div className="text-xs text-zinc-500">Admin panel</div>
          </div>
        </div>
        <nav className="flex flex-wrap gap-1 px-2 pb-3 md:flex-col">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active === item.key
                  ? "bg-brand text-white"
                  : "text-zinc-300 hover:bg-ink-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <form action={logoutAction} className="mt-1 md:mt-4">
            <button className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-400 hover:bg-ink-700">
              Odjava
            </button>
          </form>
        </nav>
      </aside>

      <main className="flex-1 px-4 py-6 md:px-8">
        <h1 className="mb-6 font-display text-2xl font-extrabold">{title}</h1>
        {children}
      </main>
    </div>
  );
}
