// Server-only client for the official WhatsApp Business Cloud API (Meta).
// Messages to members outside a 24h conversation window must use a
// pre-approved message template, so reminders are sent as templates.

export interface WhatsAppCloudConfig {
  token: string;
  phoneNumberId: string;
  graphVersion: string;
  templateBefore: string;
  templateDue: string;
  language: string;
}

/** Returns the config, or null if automatic WhatsApp sending isn't set up yet. */
export function whatsappCloudConfig(): WhatsAppCloudConfig | null {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateBefore = process.env.WHATSAPP_TEMPLATE_BEFORE;
  const templateDue = process.env.WHATSAPP_TEMPLATE_DUE;
  if (!token || !phoneNumberId || !templateBefore || !templateDue) return null;

  return {
    token,
    phoneNumberId,
    templateBefore,
    templateDue,
    graphVersion: process.env.WHATSAPP_GRAPH_VERSION || "v23.0",
    language: process.env.WHATSAPP_TEMPLATE_LANG || "hr",
  };
}

export type SendResult = { ok: true; id: string | null } | { ok: false; error: string };

/**
 * Send a template message. `bodyParams` fill the template's {{1}}, {{2}}, ...
 * `to` is the international number without '+' (e.g. 38761123456).
 */
export async function sendTemplateMessage(
  cfg: WhatsAppCloudConfig,
  to: string,
  template: string,
  bodyParams: string[]
): Promise<SendResult> {
  try {
    const res = await fetch(
      `https://graph.facebook.com/${cfg.graphVersion}/${cfg.phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cfg.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "template",
          template: {
            name: template,
            language: { code: cfg.language },
            components: [
              {
                type: "body",
                parameters: bodyParams.map((text) => ({ type: "text", text })),
              },
            ],
          },
        }),
        cache: "no-store",
      }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: data?.error?.message || `HTTP ${res.status}` };
    }
    return { ok: true, id: data?.messages?.[0]?.id ?? null };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
