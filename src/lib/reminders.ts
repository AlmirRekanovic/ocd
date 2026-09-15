import { getDb } from "./db";
import { formatDateBs, todayISO } from "./dates";
import { getMemberships, REMIND_DAYS_BEFORE } from "./membership";
import { sendTemplateMessage, whatsappCloudConfig } from "./whatsapp-cloud";
import { toWhatsappNumber } from "./wa";

export type ReminderKind = "before" | "due";

/**
 * If the daily job misses a day (deploy, outage), still send the expiry-day
 * reminder up to this many days late instead of skipping it.
 */
const DUE_GRACE_DAYS = 2;

export interface ReminderRunResult {
  configured: boolean;
  sent: number;
  failed: number;
  details: { name: string; kind: ReminderKind; status: "sent" | "failed" | "not_configured"; error?: string }[];
}

/**
 * Send WhatsApp membership reminders that are due today:
 *  - "before": REMIND_DAYS_BEFORE days before expiry
 *  - "due":    on the expiry day
 * Each reminder is sent at most once per membership period (tracked in
 * membership_reminders). A member who pays gets a new expiry date, so no
 * further reminders go out for the old one. Failed sends are retried on the
 * next run.
 */
export async function runMembershipReminders(today = todayISO()): Promise<ReminderRunResult> {
  const db = getDb();
  const cfg = whatsappCloudConfig();
  const countryCode = process.env.DEFAULT_COUNTRY_CODE || "387";
  const result: ReminderRunResult = { configured: !!cfg, sent: 0, failed: 0, details: [] };

  const alreadySent = db.prepare(
    `SELECT 1 FROM membership_reminders
      WHERE user_id = ? AND valid_until = ? AND kind = ? AND status = 'sent'`
  );
  const log = db.prepare(
    `INSERT INTO membership_reminders (user_id, valid_until, kind, status, error, wa_message_id, sent_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(user_id, valid_until, kind) DO UPDATE SET
       status = excluded.status, error = excluded.error,
       wa_message_id = excluded.wa_message_id, sent_at = excluded.sent_at`
  );

  for (const m of getMemberships(today)) {
    if (!m.valid_until || m.daysLeft === null) continue;

    let kind: ReminderKind | null = null;
    if (m.daysLeft >= 1 && m.daysLeft <= REMIND_DAYS_BEFORE) kind = "before";
    else if (m.daysLeft <= 0 && m.daysLeft >= -DUE_GRACE_DAYS) kind = "due";
    if (!kind) continue;

    if (alreadySent.get(m.id, m.valid_until, kind)) continue;

    if (!cfg) {
      result.details.push({ name: m.name, kind, status: "not_configured" });
      continue;
    }

    const template = kind === "before" ? cfg.templateBefore : cfg.templateDue;
    const res = await sendTemplateMessage(
      cfg,
      toWhatsappNumber(m.phone, countryCode),
      template,
      [m.name, formatDateBs(m.valid_until)]
    );

    if (res.ok) {
      log.run(m.id, m.valid_until, kind, "sent", null, res.id);
      result.sent++;
      result.details.push({ name: m.name, kind, status: "sent" });
    } else {
      log.run(m.id, m.valid_until, kind, "failed", res.error, null);
      result.failed++;
      result.details.push({ name: m.name, kind, status: "failed", error: res.error });
    }
  }

  return result;
}
