"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logoutAction } from "@/lib/actions/auth";
import type { Locale } from "@/i18n/config";

/**
 * The session-dependent corner of the public nav.
 *
 * Kept on the client so the surrounding page can be statically prerendered and
 * served from the CDN — see src/app/api/session/route.ts for the reasoning.
 * The logged-out state renders immediately (correct for crawlers and for every
 * first-time visitor), then swaps if a session turns out to exist.
 */
export default function NavAuth({
  locale,
  labels,
}: {
  locale: Locale;
  labels: { login: string; memberArea: string; logout: string };
}) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/session", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.authenticated) setAuthenticated(true);
      })
      // A failed check just leaves the logged-out nav in place, which is a
      // safe default — the member area is protected by middleware regardless.
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (!authenticated) {
    return (
      <Link href={`/${locale}/login`} className="btn-primary btn-sm">
        {labels.login}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href={`/${locale}/member`} className="btn-ghost btn-sm">
        {labels.memberArea}
      </Link>
      <form action={logoutAction}>
        <button type="submit" className="btn-ghost btn-sm">
          {labels.logout}
        </button>
      </form>
    </div>
  );
}
