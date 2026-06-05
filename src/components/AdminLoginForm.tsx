"use client";

import { useFormState, useFormStatus } from "react-dom";
import { adminLoginAction, type LoginState } from "@/lib/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full" disabled={pending}>
      {pending ? "…" : "Prijavi se"}
    </button>
  );
}

export default function AdminLoginForm() {
  const [state, formAction] = useFormState<LoginState, FormData>(adminLoginAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="label" htmlFor="username">
          Korisničko ime
        </label>
        <input id="username" name="username" required className="input" autoComplete="username" />
      </div>
      <div>
        <label className="label" htmlFor="password">
          Lozinka
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="input"
          autoComplete="current-password"
        />
      </div>
      {state.error && (
        <p className="text-sm text-brand-light">Pogrešno korisničko ime ili lozinka.</p>
      )}
      <SubmitButton />
    </form>
  );
}
