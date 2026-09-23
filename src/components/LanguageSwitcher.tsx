"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

/**
 * Language toggle.
 *
 * `hrefs` lets a page state its own translated URLs. That matters on the
 * discipline pages, where the slug itself is translated
 * (/bs/brazilska-jiu-jitsa-sarajevo ↔ /en/brazilian-jiu-jitsu-sarajevo) —
 * swapping only the locale segment would land on a 404, and a language
 * switcher that breaks is both a ranking and a usability problem.
 */
export default function LanguageSwitcher({
  current,
  hrefs,
}: {
  current: Locale;
  hrefs?: Partial<Record<Locale, string>>;
}) {
  const pathname = usePathname();

  function swap(to: Locale): string {
    if (hrefs?.[to]) return hrefs[to] as string;
    if (!pathname) return `/${to}`;
    const parts = pathname.split("/");
    parts[1] = to; // replace the locale segment
    return parts.join("/") || `/${to}`;
  }

  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      {(["bs", "en"] as const).map((loc) => (
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
