import { NextResponse } from "next/server";
import { runMembershipReminders } from "@/lib/reminders";

export const dynamic = "force-dynamic";

/**
 * Daily membership reminder job. Vercel Cron calls this (see vercel.json) and
 * sends `Authorization: Bearer <CRON_SECRET>` automatically when the
 * CRON_SECRET env var is set on the project.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runMembershipReminders();
  return NextResponse.json(result);
}
