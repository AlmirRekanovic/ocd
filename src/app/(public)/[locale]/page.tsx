import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CLUB, PRICES, type PlanKey } from "@/lib/club";
import { todayISO } from "@/lib/dates";
import { WEEK, type Level } from "@/lib/timetable";
import { dayOfWeek } from "@/lib/utils";
import { whatsappLink } from "@/lib/wa";
import { getNavPages } from "@/i18n/pages";
import { clubJsonLd, faqJsonLd, websiteJsonLd } from "@/lib/seo";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import JsonLd from "@/components/JsonLd";
import Logo from "@/components/Logo";

// Prerendered and refreshed hourly rather than rendered per request. The only
// time-dependent thing on the page is which day is highlighted as "today", so
// an hourly rebuild is accurate — and a static page is served far faster,
// which is itself a ranking factor.
export const revalidate = 3600;

const LEVEL_STYLE: Record<Level, string> = {
  advanced: "bg-brand/15 text-brand-light",
  beginner: "bg-emerald-500/15 text-emerald-400",
  women: "bg-fuchsia-500/15 text-fuchsia-300",
  all: "bg-amber-500/15 text-amber-400",
};

export default function LandingPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const todayDow = dayOfWeek(todayISO());
  const whatsappHref = whatsappLink(CLUB.coachPhone, t.contact.whatsappMessage, "387");
  const disciplines = getNavPages(locale);

  const highlights = [
    { label: t.highlights.location, value: CLUB.address, href: "#location" },
    { label: t.highlights.training, value: t.highlights.trainingValue, href: "#schedule" },
    { label: t.highlights.coach, value: CLUB.coachPhoneDisplay, href: `tel:${CLUB.coachPhone}` },
  ];

  return (
    <>
      <PublicNav locale={locale} />

      {/* Structured data: tells search engines this is a martial arts gym at
          these coordinates, with these hours, prices and disciplines. This is
          what feeds the Google Maps local pack and rich results. */}
      <JsonLd
        data={[clubJsonLd(locale), websiteJsonLd(locale), faqJsonLd(t.homeFaq)]}
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-ink-700">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(46,114,230,0.45), transparent 45%), radial-gradient(circle at 80% 0%, rgba(46,114,230,0.28), transparent 40%)",
            }}
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center md:py-32">
            <Logo className="mb-10 h-40 w-auto drop-shadow-[0_0_45px_rgba(46,114,230,0.45)] sm:h-52 md:h-64" />
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-brand-light">
              {t.hero.kicker}
            </p>
            {/* A real, visible H1 carrying the primary keyword. It used to be
                sr-only and brand-name only, which wasted the single strongest
                on-page signal the page has. */}
            <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">
              {t.hero.h1}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-300">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={`/${locale}/login`} className="btn-primary">
                {t.hero.ctaJoin}
              </Link>
              <a href="#schedule" className="btn-ghost">
                {t.hero.ctaTraining}
              </a>
            </div>
          </div>
        </section>

        {/* Key info strip */}
        <section className="border-b border-ink-700 bg-ink-800/60">
          <div className="mx-auto grid max-w-6xl divide-y divide-ink-700 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {highlights.map((h) => (
              <a
                key={h.label}
                href={h.href}
                className="group px-2 py-5 transition-colors sm:px-6"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  {h.label}
                </div>
                <div className="mt-1 font-semibold text-zinc-100 group-hover:text-brand-light">
                  {h.value}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            {t.about.title}
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-300">{t.about.body}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.about.points.map((p) => (
              <div key={p.title} className="card">
                <h3 className="font-display text-lg font-bold text-brand-light">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Training */}
        <section id="training" className="scroll-mt-20 border-y border-ink-700 bg-ink-800/40">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              {t.trainingSection.title}
            </h2>
            <p className="mt-4 max-w-3xl text-zinc-300">{t.trainingSection.body}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {t.trainingSection.disciplines.map((d) => (
                <span
                  key={d}
                  className="badge border border-ink-600 bg-ink-900 text-zinc-200"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Links out to the per-discipline pages. Beyond being useful
                navigation, this is what passes the home page's authority to
                the pages that target the individual keywords. */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {disciplines.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${locale}/${d.slug}`}
                  className="card group transition-colors hover:border-brand"
                >
                  <h3 className="font-display text-lg font-bold text-brand-light">
                    {d.h1}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">{d.lede}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-zinc-500 group-hover:text-brand-light">
                    {t.trainingSection.more} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section id="schedule" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">
                {t.schedule.title}
              </h2>
              <p className="mt-4 max-w-2xl text-zinc-300">{t.schedule.subtitle}</p>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {t.schedule.cta}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(Object.keys(LEVEL_STYLE) as Level[]).map((level) => (
              <span key={level} className={`badge ${LEVEL_STYLE[level]}`}>
                {t.schedule.levels[level]}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WEEK.map(({ day, sessions }) => {
              const isToday = day === todayDow;
              return (
                <div
                  key={day}
                  className={`card ${isToday ? "border-brand" : ""} ${
                    sessions.length === 0 ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold">{t.days[day]}</h3>
                    {isToday && (
                      <span className="badge bg-brand text-white">{t.schedule.today}</span>
                    )}
                  </div>
                  {sessions.length === 0 ? (
                    <p className="mt-3 text-sm text-zinc-500">{t.schedule.rest}</p>
                  ) : (
                    <ul className="mt-3 divide-y divide-ink-700">
                      {sessions.map((s) => (
                        <li key={s.start} className="flex items-start gap-3 py-2.5">
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
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-20 border-t border-ink-700 bg-ink-800/40">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              {t.pricing.title}
            </h2>
            <p className="mt-4 max-w-2xl text-zinc-300">{t.pricing.subtitle}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(Object.keys(PRICES) as PlanKey[]).map((key) => {
                const plan = t.pricing.plans[key];
                const featured = key === "combo";
                const saving = PRICES.grappling + PRICES.mma - PRICES.combo;
                return (
                  <div
                    key={key}
                    className={`card relative flex flex-col ${
                      featured ? "border-brand shadow-[0_0_40px_rgba(46,114,230,0.25)]" : ""
                    }`}
                  >
                    {featured && (
                      <span className="badge absolute -top-3 left-5 bg-brand text-white">
                        {t.pricing.bestValue}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-bold">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-display text-4xl font-extrabold">{PRICES[key]}</span>
                      <span className="text-lg font-bold text-zinc-300">KM</span>
                    </div>
                    <div className="text-sm text-zinc-500">
                      {key === "dropIn" ? t.pricing.perSession : t.pricing.perMonth}
                    </div>
                    <p className="mt-4 flex-1 text-sm text-zinc-400">{plan.desc}</p>
                    {featured && saving > 0 && (
                      <p className="mt-3 text-sm font-semibold text-emerald-400">
                        {t.pricing.save} {saving} KM
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8"
            >
              {t.pricing.cta}
            </a>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="scroll-mt-20 border-y border-ink-700">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">
                {t.location.title}
              </h2>
              <p className="mt-4 text-zinc-300">{t.location.body}</p>
              <p className="mt-6 text-xl font-bold">{CLUB.address}</p>
              <div className="mt-6 flex flex-wrap gap-3">
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
            </div>
            <div className="overflow-hidden rounded-xl border border-ink-600 bg-ink-800">
              <iframe
                title={`${t.location.title}: ${CLUB.address}`}
                src={CLUB.mapEmbedUrl}
                className="block aspect-[4/3] w-full md:aspect-video"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* FAQ — mirrors the FAQPage structured data. These answer the exact
            full-sentence questions people type into Google, which is how a
            page becomes eligible for those long-tail results. */}
        <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            {t.faq.title}
          </h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {t.homeFaq.map((item) => (
              <div key={item.q} className="card">
                <dt className="font-display text-lg font-bold text-brand-light">
                  {item.q}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-zinc-300">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 bg-ink-800/40">
          <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-300">{t.contact.body}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href={`tel:${CLUB.coachPhone}`}
              className="card transition-colors hover:border-brand"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                {t.highlights.coach} · {t.contact.call}
              </div>
              <div className="mt-2 text-lg font-bold">{CLUB.coachPhoneDisplay}</div>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="card transition-colors hover:border-emerald-500"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                {t.contact.whatsapp}
              </div>
              <div className="mt-2 text-lg font-bold text-emerald-400">
                {t.contact.whatsappAction}
              </div>
            </a>
            <a
              href={CLUB.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card transition-colors hover:border-brand"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                {t.contact.instagram}
              </div>
              <div className="mt-2 text-lg font-bold">{CLUB.instagramHandle}</div>
            </a>
          </div>
          </div>
        </section>
      </main>

      <PublicFooter locale={locale} />

      {/* Floating WhatsApp button */}
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
