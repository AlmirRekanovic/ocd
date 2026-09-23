import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// Never cached, and never prerendered — it reads the session cookie.
export const dynamic = "force-dynamic";

/**
 * Whether the current visitor is logged in.
 *
 * This exists so the public pages can stay *statically* rendered. Reading the
 * session during server render would force every public page to be built per
 * request, which costs the whole site its CDN caching — and page speed is a
 * ranking factor. Instead the nav renders its logged-out state (what crawlers
 * and first-time visitors see anyway) and swaps client-side after this call.
 *
 * Deliberately returns the bare minimum: a boolean and a display name. The
 * session cookie itself stays httpOnly.
 */
export async function GET() {
  const session = await getSession();

  return NextResponse.json(
    session
      ? { authenticated: true, name: session.name }
      : { authenticated: false },
    { headers: { "Cache-Control": "no-store" } },
  );
}
