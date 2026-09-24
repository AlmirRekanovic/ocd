import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { getNavPages, pageKeys, slugForLocale } from "@/i18n/pages";
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
/** Slug pairs for the language switcher, built once from the registry. */
const SLUG_MAP = pageKeys.map((key) => ({
  bs: slugForLocale(key, "bs"),
  en: slugForLocale(key, "en"),
}));

export default function PublicNav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).nav;
  const navPages = getNavPages(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="flex items-center" aria-label={t.home}>
          <Logo className="h-10 w-auto" sizes="40px" />
        </Link>

        {/* Every item is a <Link> to a real page. They used to be plain <a>
            anchors back to the home page (/bs#schedule), which from any other
            page meant a full browser reload — visible as the header flashing
            and jumping. <Link> navigates client-side, so the header stays put.
            Real pages also beat in-page anchors for crawlability. */}
        <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-300 lg:flex">
          {navPages.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/${p.slug}`}
              className="hover:text-white"
            >
              {p.navLabel}
            </Link>
          ))}
          <Link href={`/${locale}#contact`} className="hover:text-white">
            {t.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} slugMap={SLUG_MAP} />
          <NavAuth
            locale={locale}
            labels={{ login: t.login, memberArea: t.memberArea, logout: t.logout }}
          />
        </div>
      </div>

      {/* Narrow screens: the same links, horizontally scrollable, so mobile
          visitors and mobile crawlers get the identical link graph. */}
      <nav className="flex gap-4 overflow-x-auto border-t border-ink-700 px-4 py-2 text-sm font-medium text-zinc-400 lg:hidden">
        {navPages.map((p) => (
          <Link
            key={p.slug}
            href={`/${locale}/${p.slug}`}
            className="whitespace-nowrap hover:text-white"
          >
            {p.navLabel}
          </Link>
        ))}
        <Link href={`/${locale}#contact`} className="whitespace-nowrap hover:text-white">
          {t.contact}
        </Link>
      </nav>
    </header>
  );
}
