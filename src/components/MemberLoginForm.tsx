"use client";

import { useFormState, useFormStatus } from "react-dom";
import { memberLoginAction, type LoginState } from "@/lib/actions/auth";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full" disabled={pending}>
      {pending ? "…" : label}
    </button>
  );
}

export default function MemberLoginForm({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary["login"];
}) {
  const [state, formAction] = useFormState<LoginState, FormData>(
    memberLoginAction,
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />
      <div>
        <label className="label" htmlFor="username">
          {t.username}
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          className="input"
        />
      </div>
      <div>
        <label className="label" htmlFor="password">
          {t.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="input"
        />
      </div>
      {state.error && <p className="text-sm text-brand-light">{t.error}</p>}
      <SubmitButton label={t.submit} />
      <p className="text-xs text-zinc-500">{t.hint}</p>
    </form>
  );
}
