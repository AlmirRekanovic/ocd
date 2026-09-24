import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CLUB } from "@/lib/club";
import { whatsappLink } from "@/lib/wa";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

/**
 * Chrome shared by every marketing page.
 *
 * The nav, footer and floating WhatsApp button live here rather than inside
 * each page on purpose. Rendered per-page, the whole header was unmounted and
 * rebuilt on every navigation — the sticky bar redrew, the logo re-requested
 * and the session check re-ran, which showed up as the header visibly jumping.
 * In a layout it mounts once and stays put as you move between pages.
 *
 * The login and member pages sit outside this group: they have their own,
 * deliberately minimal header.
 */
export default function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const whatsappHref = whatsappLink(CLUB.coachPhone, t.contact.whatsappMessage, "387");

  return (
    <>
      <PublicNav locale={locale} />
      {children}
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
