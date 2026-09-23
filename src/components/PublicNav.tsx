import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { getDisciplines } from "@/i18n/disciplines";
import type { Locale } from "@/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";
import NavAuth from "./NavAuth";
import Logo from "./Logo";

/**
 * Public site navigation.
 *
 * Intentionally *not* async and it never reads the session: doing so would
 * opt every public page out of static rendering. The logged-in state is
 * handled client-side by <NavAuth>.
 */
export default function PublicNav({
  locale,
  hrefs,
}: {
  locale: Locale;
  hrefs?: Partial<Record<Locale, string>>;
}) {
  const t = getDictionary(locale).nav;
  const disciplines = getDisciplines(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="flex items-center" aria-label={t.home}>
          <Logo className="h-10 w-auto" />
        </Link>

        {/* The discipline links are real <a>s to real pages, not in-page
            anchors — that is what makes the sub-pages crawlable from every
            page on the site. */}
        <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-300 lg:flex">
          {disciplines.map((d) => (
            <Link
              key={d.slug}
              href={`/${locale}/${d.slug}`}
              className="hover:text-white"
            >
              {d.navLabel}
            </Link>
          ))}
          <a href={`/${locale}#schedule`} className="hover:text-white">
            {t.schedule}
          </a>
          <a href={`/${locale}#pricing`} className="hover:text-white">
            {t.pricing}
          </a>
          <a href={`/${locale}#contact`} className="hover:text-white">
            {t.contact}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} hrefs={hrefs} />
          <NavAuth
            locale={locale}
            labels={{ login: t.login, memberArea: t.memberArea, logout: t.logout }}
          />
        </div>
      </div>

      {/* Narrow screens: the same links, horizontally scrollable, so mobile
          visitors and mobile crawlers get the identical link graph. */}
      <nav className="flex gap-4 overflow-x-auto border-t border-ink-700 px-4 py-2 text-sm font-medium text-zinc-400 lg:hidden">
        {disciplines.map((d) => (
          <Link
            key={d.slug}
            href={`/${locale}/${d.slug}`}
            className="whitespace-nowrap hover:text-white"
          >
            {d.navLabel}
          </Link>
        ))}
        <a href={`/${locale}#schedule`} className="whitespace-nowrap hover:text-white">
          {t.schedule}
        </a>
        <a href={`/${locale}#pricing`} className="whitespace-nowrap hover:text-white">
          {t.pricing}
        </a>
      </nav>
    </header>
  );
}
