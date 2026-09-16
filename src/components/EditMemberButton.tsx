"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateMemberAction, type UpdateMemberState } from "@/lib/actions/members";

interface Member {
  id: number;
  name: string;
  phone: string;
  username: string;
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "…" : "Sačuvaj"}
    </button>
  );
}

function EditMemberForm({ member, onClose }: { member: Member; onClose: () => void }) {
  const [state, formAction] = useFormState<UpdateMemberState, FormData>(updateMemberAction, {});

  useEffect(() => {
    if (state.saved) onClose();
  }, [state.saved, onClose]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={member.id} />
      <div>
        <label className="label" htmlFor={`name-${member.id}`}>
          Ime i prezime
        </label>
        <input id={`name-${member.id}`} name="name" required className="input" defaultValue={member.name} />
      </div>
      <div>
        <label className="label" htmlFor={`phone-${member.id}`}>
          Broj telefona
        </label>
        <input id={`phone-${member.id}`} name="phone" required className="input" defaultValue={member.phone} />
        <p className="mt-1 text-xs text-zinc-500">
          Ako promijeniš broj, lozinka postaje novi broj telefona.
        </p>
      </div>
      <div>
        <label className="label" htmlFor={`username-${member.id}`}>
          Korisničko ime
        </label>
        <input
          id={`username-${member.id}`}
          name="username"
          required
          className="input font-mono"
          defaultValue={member.username}
        />
      </div>

      {state.error && <p className="text-sm text-brand-light">{state.error}</p>}

      <div className="flex justify-end gap-2">
        <button type="button" className="btn-ghost" onClick={onClose}>
          Odustani
        </button>
        <SaveButton />
      </div>
    </form>
  );
}

export default function EditMemberButton({ member }: { member: Member }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" className="btn-ghost btn-sm" onClick={() => setOpen(true)}>
        Uredi
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`edit-title-${member.id}`}
            className="card w-full max-w-md bg-ink-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id={`edit-title-${member.id}`} className="mb-4 font-display text-lg font-bold">
              Uredi člana
            </h2>
            <EditMemberForm member={member} onClose={close} />
          </div>
        </div>
      )}
    </>
  );
}
