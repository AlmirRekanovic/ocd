import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import PublicNav from "@/components/PublicNav";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

const INSTAGRAM = "https://www.instagram.com/ocdfighters.s/";

export default function LandingPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <PublicNav locale={locale} />

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
            <h1 className="sr-only">{t.hero.title}</h1>
            <p className="mt-2 max-w-xl text-lg text-zinc-300">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={`/${locale}/login`} className="btn-primary">
                {t.hero.ctaJoin}
              </Link>
              <a href={`#training`} className="btn-ghost">
                {t.hero.ctaTraining}
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-20">
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
        <section id="training" className="border-y border-ink-700 bg-ink-800/40">
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
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-zinc-300">{t.contact.body}</p>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            {t.contact.instagram} @ocdfighters.s
          </a>
        </section>
      </main>

      <footer className="border-t border-ink-700 py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-zinc-500">
          © {new Date().getFullYear()} OCD Fighters. {t.footer.rights}
        </div>
      </footer>
    </>
  );
}
