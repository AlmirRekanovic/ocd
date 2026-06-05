"use client";

import { useFormState, useFormStatus } from "react-dom";
import { requestPrivateAction, type PrivateState } from "@/lib/actions/private";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "…" : label}
    </button>
  );
}

export default function PrivateRequestForm({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary["member"];
}) {
  const [state, formAction] = useFormState<PrivateState, FormData>(
    requestPrivateAction,
    {}
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="locale" value={locale} />
      <div>
        <label className="label" htmlFor="preferred">
          {t.privateDate}
        </label>
        <input id="preferred" name="preferred" className="input" placeholder="npr. 12.06. u 18:00" />
      </div>
      <div>
        <label className="label" htmlFor="note">
          {t.privateNote}
        </label>
        <textarea id="note" name="note" rows={2} className="input" />
      </div>
      <SubmitButton label={t.privateSubmit} />
      {state.ok && <p className="text-sm text-emerald-400">✓</p>}
    </form>
  );
}
