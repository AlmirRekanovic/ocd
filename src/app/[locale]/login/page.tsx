import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSession } from "@/lib/auth";
import MemberLoginForm from "@/components/MemberLoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  const session = await getSession();
  if (session) redirect(session.role === "admin" ? "/admin" : `/${locale}/member`);

  const t = getDictionary(locale).login;

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm">
        <Link href={`/${locale}`} className="mb-8 flex items-center justify-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded bg-brand font-display text-sm font-black text-white">
            OCD
          </span>
          <span className="font-display text-xl font-extrabold">OCD Fighters</span>
        </Link>
        <div className="card">
          <h1 className="font-display text-2xl font-extrabold">{t.title}</h1>
          <p className="mb-6 mt-1 text-sm text-zinc-400">{t.subtitle}</p>
          <MemberLoginForm locale={locale} t={t} />
        </div>
      </div>
    </main>
  );
}
