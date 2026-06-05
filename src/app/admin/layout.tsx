// The admin panel is fully dynamic: every page reads live data from the
// database, so it must never be statically prerendered at build time.
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
