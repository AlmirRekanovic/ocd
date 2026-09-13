"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

/**
 * Club logo. Uses the artwork at `public/logo.png` (the blue puzzle-style
 * "OCD FIGHTERS" mark). If that file is missing it gracefully falls back to a
 * styled blue/chrome wordmark, so the UI never shows a broken image.
 * Control the size via `className`, e.g. "h-9 w-auto" or "h-32 w-auto".
 */
export default function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`inline-flex select-none items-center font-display text-lg font-black tracking-tight ${className}`}
        aria-label="OCD Fighters"
      >
        <span className="bg-gradient-to-b from-brand-light via-brand to-brand-dark bg-clip-text text-transparent">
          OCD
        </span>
        <span className="ml-1 text-steel-light">FIGHTERS</span>
      </span>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="OCD Fighters"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
