import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

export default async function PublicNav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).nav;
  const session = await getSession();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="flex items-center">
          <Logo className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-300 md:flex">
          <a href={`/${locale}#about`} className="hover:text-white">{t.about}</a>
          <a href={`/${locale}#training`} className="hover:text-white">{t.training}</a>
          <a href={`/${locale}#schedule`} className="hover:text-white">{t.schedule}</a>
          <a href={`/${locale}#pricing`} className="hover:text-white">{t.pricing}</a>
          <a href={`/${locale}#location`} className="hover:text-white">{t.location}</a>
          <a href={`/${locale}#contact`} className="hover:text-white">{t.contact}</a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} />
          {session ? (
            <div className="flex items-center gap-2">
              <Link href={`/${locale}/member`} className="btn-ghost btn-sm">
                {t.memberArea}
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="btn-ghost btn-sm">
                  {t.logout}
                </button>
              </form>
            </div>
          ) : (
            <Link href={`/${locale}/login`} className="btn-primary btn-sm">
              {t.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
