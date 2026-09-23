import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../globals.css";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CLUB } from "@/lib/club";
import { SITE_URL } from "@/lib/seo";

/**
 * Root layout for the public site.
 *
 * It lives under `[locale]` rather than at the app root so that `<html lang>`
 * can state the page's real language — only a root layout may render `<html>`,
 * and only this depth knows the locale. The admin panel has its own root
 * layout under `(admin)`.
 */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const { seo } = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    // Per-locale, so the English page no longer inherits Bosnian copy —
    // serving the wrong language in the title and description undercuts the
    // hreflang setup and loses the English-speaking audience in Sarajevo.
    title: { default: seo.title, template: "%s" },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: CLUB.shortName,
    icons: { icon: "/logo.png", apple: "/logo.png" },
    alternates: {
      canonical: `/${locale}`,
      languages: { bs: "/bs", en: "/en", "x-default": "/bs" },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
      siteName: CLUB.shortName,
      locale: locale === "bs" ? "bs_BA" : "en_US",
      alternateLocale: locale === "bs" ? "en_US" : "bs_BA",
      title: seo.title,
      description: seo.description,
      images: ["/logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        // Let Google show full-length snippets and large image previews; the
        // defaults are more restrictive and cost click-through.
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    verification: { google: "4jGLEN-Wygs0rqH-qwXwk9INFWYDRZhldR_0eLAQKlY" },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  return (
    <html lang={params.locale === "en" ? "en" : "bs"}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
