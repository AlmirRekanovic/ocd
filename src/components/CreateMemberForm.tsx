"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createMemberAction, type CreateMemberState } from "@/lib/actions/members";
import WhatsAppCredsButton from "./WhatsAppCredsButton";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "…" : "Kreiraj člana"}
    </button>
  );
}

export default function CreateMemberForm({ countryCode }: { countryCode: string }) {
  const [state, formAction] = useFormState<CreateMemberState, FormData>(
    createMemberAction,
    {}
  );

  return (
    <div className="space-y-4">
      <form action={formAction} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end" key={state.created?.username}>
        <div>
          <label className="label" htmlFor="name">
            Ime i prezime
          </label>
          <input id="name" name="name" required className="input" placeholder="npr. Almir Rekanović" />
        </div>
        <div>
          <label className="label" htmlFor="phone">
            Broj telefona
          </label>
          <input id="phone" name="phone" required className="input" placeholder="npr. 061 123 456" />
        </div>
        <SubmitButton />
      </form>

      {state.error && <p className="text-sm text-brand-light">{state.error}</p>}

      {state.created && (
        <div className="card border-emerald-600/40 bg-emerald-500/5">
          <p className="text-sm font-semibold text-emerald-400">Član kreiran ✓</p>
          <dl className="mt-2 grid gap-1 text-sm">
            <div className="flex gap-2">
              <dt className="w-32 text-zinc-400">Ime</dt>
              <dd className="font-medium">{state.created.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-32 text-zinc-400">Korisničko ime</dt>
              <dd className="font-mono font-medium">{state.created.username}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-32 text-zinc-400">Lozinka</dt>
              <dd className="font-mono font-medium">{state.created.password}</dd>
            </div>
          </dl>
          <div className="mt-4">
            <WhatsAppCredsButton
              name={state.created.name}
              username={state.created.username}
              password={state.created.password}
              phone={state.created.phone}
              countryCode={countryCode}
            />
          </div>
        </div>
      )}
    </div>
  );
}
