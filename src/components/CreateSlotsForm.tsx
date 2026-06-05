"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createSlotsAction, type CreateSlotsState } from "@/lib/actions/slots";

const WEEKDAYS = [
  { v: 1, label: "Pon" },
  { v: 2, label: "Uto" },
  { v: 3, label: "Sri" },
  { v: 4, label: "Čet" },
  { v: 5, label: "Pet" },
  { v: 6, label: "Sub" },
  { v: 0, label: "Ned" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "…" : "Sačuvaj treninge"}
    </button>
  );
}

export default function CreateSlotsForm() {
  const [mode, setMode] = useState<"single" | "recurring">("single");
  const [state, formAction] = useFormState<CreateSlotsState, FormData>(
    createSlotsAction,
    {}
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="mode" value={mode} />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("single")}
          className={mode === "single" ? "btn-primary btn-sm" : "btn-ghost btn-sm"}
        >
          Pojedinačno
        </button>
        <button
          type="button"
          onClick={() => setMode("recurring")}
          className={mode === "recurring" ? "btn-primary btn-sm" : "btn-ghost btn-sm"}
        >
          Ponavljajuće (npr. cijela godina)
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="title">
            Naziv treninga
          </label>
          <input id="title" name="title" required className="input" placeholder="npr. MMA grupni trening" />
        </div>

        <div>
          <label className="label" htmlFor="startTime">
            Početak
          </label>
          <input id="startTime" name="startTime" type="time" required className="input" defaultValue="18:00" />
        </div>
        <div>
          <label className="label" htmlFor="endTime">
            Kraj
          </label>
          <input id="endTime" name="endTime" type="time" required className="input" defaultValue="19:30" />
        </div>

        <div>
          <label className="label" htmlFor="capacity">
            Broj mjesta
          </label>
          <input id="capacity" name="capacity" type="number" min={1} defaultValue={12} className="input" />
        </div>
      </div>

      {mode === "single" ? (
        <div>
          <label className="label" htmlFor="date">
            Datum
          </label>
          <input id="date" name="date" type="date" required className="input sm:w-60" />
        </div>
      ) : (
        <div className="space-y-4 rounded-lg border border-ink-600 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="startDate">
                Od datuma
              </label>
              <input id="startDate" name="startDate" type="date" required className="input" />
            </div>
            <div>
              <label className="label" htmlFor="endDate">
                Do datuma
              </label>
              <input id="endDate" name="endDate" type="date" required className="input" />
            </div>
          </div>
          <div>
            <span className="label">Dani u sedmici</span>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map((d) => (
                <label
                  key={d.v}
                  className="flex cursor-pointer items-center gap-1.5 rounded-md border border-ink-600 px-3 py-1.5 text-sm hover:bg-ink-700"
                >
                  <input type="checkbox" name="weekdays" value={d.v} className="accent-brand" />
                  {d.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="label" htmlFor="notes">
          Napomena (opcionalno)
        </label>
        <input id="notes" name="notes" className="input" />
      </div>

      {state.error && <p className="text-sm text-brand-light">{state.error}</p>}
      {state.createdCount ? (
        <p className="text-sm text-emerald-400">
          Kreirano treninga: {state.createdCount} ✓
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
