import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getPage,
  getPages,
  pageBySlug,
  pageKeys,
  slugForLocale,
  type PageContent,
} from "@/i18n/pages";
import { CLUB, PRICES, type PlanKey } from "@/lib/club";
import { todayISO } from "@/lib/dates";
import { WEEK, type Level } from "@/lib/timetable";
import { dayOfWeek } from "@/lib/utils";
import { whatsappLink } from "@/lib/wa";
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

// Refreshed hourly so the "today" marker on the schedule block stays right,
// while the pages are still served as static HTML from the CDN.
export const revalidate = 3600;

/** Every page in every language is prerendered at build time. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pageKeys.map((key) => ({ locale, slug: slugForLocale(key, locale) })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const key = pageBySlug(locale, params.slug);
  if (!key) return {};

  const p = getPage(locale, key);
  const path = `/${locale}/${p.slug}`;

  return {
    // These titles already carry the club name, so no template suffix.
    title: p.metaTitle,
    description: p.metaDescription,
    keywords: p.keywords,
    alternates: {
      canonical: path,
      languages: {
        bs: `/bs/${slugForLocale(key, "bs")}`,
        en: `/en/${slugForLocale(key, "en")}`,
        "x-default": `/bs/${slugForLocale(key, "bs")}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${path}`,
      siteName: CLUB.shortName,
      locale: locale === "bs" ? "bs_BA" : "en_US",
      title: p.metaTitle,
      description: p.metaDescription,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: CLUB.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: p.metaTitle,
      description: p.metaDescription,
    },
  };
}

const LEVEL_STYLE: Record<Level, string> = {
  advanced: "bg-brand/15 text-brand-light",
  beginner: "bg-emerald-500/15 text-emerald-400",
  women: "bg-fuchsia-500/15 text-fuchsia-300",
  all: "bg-amber-500/15 text-amber-400",
};

type Dict = ReturnType<typeof getDictionary>;

/** Price list, rendered from PRICES so it can't drift from the home page. */
function PricingBlock({ t }: { t: Dict }) {
  const saving = PRICES.grappling + PRICES.mma - PRICES.combo;

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold md:text-3xl">{t.pricing.title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {(Object.keys(PRICES) as PlanKey[]).map((key) => {
          const plan = t.pricing.plans[key];
          const featured = key === "combo";
          return (
            <div
              key={key}
              className={`card flex flex-col ${featured ? "border-brand" : ""}`}
            >
              <h3 className="font-display text-lg font-bold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold">{PRICES[key]}</span>
                <span className="font-bold text-zinc-300">KM</span>
                <span className="text-sm text-zinc-500">
                  {key === "dropIn" ? t.pricing.perSession : t.pricing.perMonth}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm text-zinc-400">{plan.desc}</p>
              {featured && saving > 0 && (
                <p className="mt-3 text-sm font-semibold text-emerald-400">
                  {t.pricing.save} {saving} KM
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Weekly timetable, rendered from WEEK — the same source as the home page. */
function TimetableBlock({ t }: { t: Dict }) {
  const todayDow = dayOfWeek(todayISO());

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold md:text-3xl">{t.schedule.title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {WEEK.map(({ day, sessions }) => {
          const isToday = day === todayDow;
          return (
            <div key={day} className={`card ${isToday ? "border-brand" : ""}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">{t.days[day]}</h3>
                {isToday && (
                  <span className="badge bg-brand text-white">{t.schedule.today}</span>
                )}
              </div>
              <ul className="mt-3 divide-y divide-ink-700">
                {sessions.map((s) => (
                  <li key={`${s.start}-${s.cls}`} className="flex items-start gap-3 py-2.5">
                    <span className="w-[6.5rem] shrink-0 pt-0.5 font-mono text-sm text-brand-light">
                      {s.start}–{s.end}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold">{t.schedule.classes[s.cls]}</div>
                      <span className={`badge mt-1 ${LEVEL_STYLE[s.level]}`}>
                        {t.schedule.levels[s.level]}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MapBlock({ t }: { t: Dict }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold md:text-3xl">{t.location.title}</h2>
      <p className="mt-4 text-xl font-bold">{CLUB.address}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={CLUB.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          {t.location.route}
        </a>
        <a
          href={CLUB.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          {t.location.openMaps}
        </a>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-ink-600 bg-ink-800">
        <iframe
          title={`${t.location.title}: ${CLUB.address}`}
          src={CLUB.mapEmbedUrl}
          className="block aspect-[4/3] w-full md:aspect-video"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}

/** Term list. A <dl> so the term/definition relationship is machine-readable. */
function GlossaryBlock({ p }: { p: PageContent }) {
  if (!p.glossary?.length) return null;

  return (
    <section className="mt-12">
      <dl className="grid gap-4 sm:grid-cols-2">
        {p.glossary.map((item) => (
          <div key={item.term} className="card">
            <dt className="font-display font-bold text-brand-light">{item.term}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-zinc-300">{item.def}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function ContentPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const key = pageBySlug(locale, params.slug);
  if (!key) notFound();

  const p = getPage(locale, key);
  const t = getDictionary(locale);
  const path = `/${locale}/${p.slug}`;
  const whatsappHref = whatsappLink(CLUB.coachPhone, t.contact.whatsappMessage, "387");
  const others = getPages(locale).filter((o) => o.slug !== p.slug);

  return (
    <>
      <JsonLd
        data={[
          courseJsonLd({
            locale,
            name: p.h1,
            description: p.metaDescription,
            path,
          }),
          faqJsonLd(p.faq),
          breadcrumbJsonLd(locale, [
            { name: CLUB.shortName, path: `/${locale}` },
            { name: p.navLabel, path },
          ]),
        ]}
      />

      <main>
        {/* Breadcrumb — mirrors the BreadcrumbList above for human readers. */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-4 pt-8 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-zinc-500">
            <li>
              <Link href={`/${locale}`} className="hover:text-brand-light">
                {t.nav.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-300">{p.navLabel}</li>
          </ol>
        </nav>

        <article className="mx-auto max-w-4xl px-4 pb-16 pt-6">
          {/* A single, visible, keyword-bearing H1 — the strongest on-page
              signal there is for what this page is about. */}
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">{p.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-300">{p.lede}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t.schedule.cta}
            </a>
            <Link href={`/${locale}#schedule`} className="btn-ghost">
              {t.nav.schedule}
            </Link>
          </div>

          {p.sections.map((s) => (
            <section key={s.title} className="mt-12">
              <h2 className="font-display text-2xl font-bold md:text-3xl">{s.title}</h2>
              <p className="mt-4 leading-relaxed text-zinc-300">{s.body}</p>
            </section>
          ))}

          {/* Live-data blocks. These render from PRICES / WEEK / CLUB rather
              than from prose, so the figures on these pages can never
              contradict the home page. */}
          {p.blocks?.map((block) => {
            switch (block) {
              case "pricing":
                return <PricingBlock key={block} t={t} />;
              case "timetable":
                return <TimetableBlock key={block} t={t} />;
              case "map":
                return <MapBlock key={block} t={t} />;
              case "glossary":
                return <GlossaryBlock key={block} p={p} />;
            }
          })}

          {/* FAQ — matched to the FAQPage schema above. Rendered as plain
              headings rather than collapsed panels so the answers are in the
              HTML unconditionally. */}
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              {t.faq.title}
            </h2>
            <dl className="mt-6 space-y-6">
              {p.faq.map((item) => (
                <div key={item.q} className="card">
                  <dt className="font-display text-lg font-bold text-brand-light">
                    {item.q}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-zinc-300">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* CTA */}
          <section className="mt-14 rounded-xl border border-brand/40 bg-brand/5 p-8">
            <h2 className="font-display text-2xl font-bold md:text-3xl">{p.ctaTitle}</h2>
            <p className="mt-3 text-zinc-300">{p.ctaBody}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t.contact.whatsapp}
              </a>
              <a href={`tel:${CLUB.coachPhone}`} className="btn-ghost">
                {t.contact.call} {CLUB.coachPhoneDisplay}
              </a>
            </div>
            <p className="mt-5 text-sm text-zinc-400">{CLUB.address}</p>
          </section>

          {/* Internal links to the sibling pages. */}
          <section className="mt-14">
            <h2 className="font-display text-xl font-bold">{t.faq.otherPrograms}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/${locale}/${o.slug}`}
                  className="card transition-colors hover:border-brand"
                >
                  <div className="font-display font-bold text-brand-light">{o.h1}</div>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{o.lede}</p>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>


    </>
  );
}
