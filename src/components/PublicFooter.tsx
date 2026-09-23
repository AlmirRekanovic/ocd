import Link from "next/link";
import { CLUB } from "@/lib/club";
import { getDictionary } from "@/i18n/dictionaries";
import { getPages } from "@/i18n/pages";
import type { Locale } from "@/i18n/config";

/**
 * Site-wide footer.
 *
 * The page links here are deliberate: every page linking to every other
 * page is what lets search engines discover and re-crawl the sub-pages, and it
 * spreads authority from the (most-linked) home page across them.
 */
export default function PublicFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const disciplines = getPages(locale);

  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-zinc-500">
              {t.footer.programs}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {disciplines.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/${locale}/${d.slug}`}
                    className="text-zinc-400 transition-colors hover:text-brand-light"
                  >
                    {d.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-zinc-500">
              {t.footer.club}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`/${locale}#about`} className="text-zinc-400 hover:text-brand-light">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href={`/${locale}#schedule`} className="text-zinc-400 hover:text-brand-light">
                  {t.nav.schedule}
                </a>
              </li>
              <li>
                <a href={`/${locale}#pricing`} className="text-zinc-400 hover:text-brand-light">
                  {t.nav.pricing}
                </a>
              </li>
              <li>
                <a href={`/${locale}#location`} className="text-zinc-400 hover:text-brand-light">
                  {t.nav.location}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-zinc-500">
              {t.nav.contact}
            </h2>
            {/* Marked up so crawlers read this as the club's address, matching
                the Google Business Profile listing exactly. */}
            <address className="mt-3 space-y-2 text-sm not-italic text-zinc-400">
              <div>{CLUB.address}</div>
              <div>
                <a href={`tel:${CLUB.coachPhone}`} className="hover:text-brand-light">
                  {CLUB.coachPhoneDisplay}
                </a>
              </div>
              <div>
                <a
                  href={CLUB.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-light"
                >
                  {CLUB.instagramHandle}
                </a>
              </div>
              <div>
                <a
                  href={CLUB.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-light"
                >
                  {t.location.openMaps}
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-700 pt-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} {CLUB.shortName}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
