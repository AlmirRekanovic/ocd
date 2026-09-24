"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

/** One page's slug in each language, e.g. { bs: "cijene-…", en: "training-…" }. */
export type SlugMap = Record<Locale, string>;

/**
 * Language toggle.
 *
 * Slugs are translated (/bs/brazilska-jiu-jitsa-sarajevo ↔
 * /en/brazilian-jiu-jitsu-sarajevo), so swapping only the locale segment would
 * land on a 404. `slugMap` carries the pairs, letting this work from a layout
 * without every page having to pass its own URLs down.
 */
export default function LanguageSwitcher({
  current,
  slugMap = [],
}: {
  current: Locale;
  slugMap?: SlugMap[];
}) {
  const pathname = usePathname();

  function swap(to: Locale): string {
    if (!pathname) return `/${to}`;

    const parts = pathname.split("/");
    const slug = parts[2];

    // Translate the slug when this is one of the content pages. Routes with no
    // entry (login, member) share a slug across languages, so they pass through
    // with only the locale segment replaced.
    if (slug) {
      const match = slugMap.find((m) => m[current] === slug);
      if (match) parts[2] = match[to];
    }

    parts[1] = to;
    return parts.join("/") || `/${to}`;
  }

  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={swap(loc)}
          hrefLang={loc}
          className={`rounded px-2 py-1 uppercase transition-colors ${
            current === loc
              ? "bg-brand text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
