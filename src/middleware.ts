import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/constants";

function secret(): Uint8Array {
  const s = process.env.SESSION_SECRET || "dev-insecure-secret-change-me";
  return new TextEncoder().encode(s);
}

async function readSession(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as { uid: number; role: string; name: string };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await readSession(req);

  // Admin area — Bosnian only, requires an admin session.
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    if (!session || session.role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Member area — /bs/member or /en/member, requires any session.
  const memberMatch = pathname.match(/^\/(bs|en)\/member(\/|$)/);
  if (memberMatch) {
    if (!session) {
      const locale = memberMatch[1];
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}/login`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/bs/member/:path*", "/en/member/:path*"],
};
