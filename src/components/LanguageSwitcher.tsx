"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  function swap(to: Locale): string {
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
