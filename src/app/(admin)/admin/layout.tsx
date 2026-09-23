import type { Metadata } from "next";
import "../../globals.css";

// The admin panel is fully dynamic: every page reads live data from the
// database, so it must never be statically prerendered at build time.
export const dynamic = "force-dynamic";

// Its own root layout (see the public one under `(public)/[locale]`). The
// panel is Bosnian-only by design, and must never reach search results.
export const metadata: Metadata = {
  title: "OCD Fighters — Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
