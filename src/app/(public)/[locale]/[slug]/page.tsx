import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  disciplineBySlug,
  disciplineKeys,
  getDiscipline,
  getDisciplines,
  slugForLocale,
} from "@/i18n/disciplines";
import { CLUB } from "@/lib/club";
import { whatsappLink } from "@/lib/wa";
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import JsonLd from "@/components/JsonLd";

/** Every discipline page in every language is prerendered at build time. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    disciplineKeys.map((key) => ({ locale, slug: slugForLocale(key, locale) })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const key = disciplineBySlug(locale, params.slug);
  if (!key) return {};

  const d = getDiscipline(locale, key);
  const path = `/${locale}/${d.slug}`;

  return {
    title: d.metaTitle,
    // The homepage title template would append "· OCD Fighters" a second
    // time; these titles already carry the club name.
    description: d.metaDescription,
    keywords: d.keywords,
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
      title: d.metaTitle,
      description: d.metaDescription,
      images: ["/logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: d.metaTitle,
      description: d.metaDescription,
    },
  };
}

export default function DisciplinePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const key = disciplineBySlug(locale, params.slug);
  if (!key) notFound();

  const d = getDiscipline(locale, key);
  const t = getDictionary(locale);
  const path = `/${locale}/${d.slug}`;
  const whatsappHref = whatsappLink(CLUB.coachPhone, t.contact.whatsappMessage, "387");
  const others = getDisciplines(locale).filter((o) => o.slug !== d.slug);

  return (
    <>
      <PublicNav
        locale={locale}
        hrefs={{
          bs: `/bs/${slugForLocale(key, "bs")}`,
          en: `/en/${slugForLocale(key, "en")}`,
        }}
      />

      <JsonLd
        data={[
          courseJsonLd({
            locale,
            name: d.h1,
            description: d.metaDescription,
            path,
          }),
          faqJsonLd(d.faq),
          breadcrumbJsonLd(locale, [
            { name: CLUB.shortName, path: `/${locale}` },
            { name: d.navLabel, path },
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
            <li className="text-zinc-300">{d.navLabel}</li>
          </ol>
        </nav>

        <article className="mx-auto max-w-4xl px-4 pb-16 pt-6">
          {/* A single, visible, keyword-bearing H1 — the strongest on-page
              signal there is for what this page is about. */}
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">{d.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-300">{d.lede}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t.schedule.cta}
            </a>
            <a href={`/${locale}#schedule`} className="btn-ghost">
              {t.nav.schedule}
            </a>
          </div>

          {d.sections.map((s) => (
            <section key={s.title} className="mt-12">
              <h2 className="font-display text-2xl font-bold md:text-3xl">{s.title}</h2>
              <p className="mt-4 leading-relaxed text-zinc-300">{s.body}</p>
            </section>
          ))}

          {/* FAQ — matched to the FAQPage schema above. Rendered as plain
              headings rather than collapsed panels so the answers are in the
              HTML unconditionally. */}
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              {t.faq.title}
            </h2>
            <dl className="mt-6 space-y-6">
              {d.faq.map((item) => (
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
            <h2 className="font-display text-2xl font-bold md:text-3xl">{d.ctaTitle}</h2>
            <p className="mt-3 text-zinc-300">{d.ctaBody}</p>
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

      <PublicFooter locale={locale} />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.contact.whatsapp}
        className="btn fixed bottom-5 right-5 z-50 rounded-full bg-[#25D366] px-5 py-3 text-black shadow-lg shadow-black/40 hover:bg-[#1ebe5b]"
      >
        {t.contact.whatsapp}
      </a>
    </>
  );
}
