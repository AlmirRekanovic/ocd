"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Club logo — the blue "OCD FIGHTERS" mark at `public/logo.png`.
 *
 * Uses next/image so the platform serves a resized WebP/AVIF instead of the
 * source PNG: the mark is drawn anywhere from 40px (nav) to 256px (hero), and
 * shipping one large bitmap to every one of those slots is wasted bandwidth on
 * every page load. Pass `sizes` matching the rendered width, and `priority` on
 * the hero instance, which is the largest-contentful-paint element.
 *
 * If the file is ever missing it falls back to a styled wordmark, so the UI
 * never shows a broken image.
 */
export default function Logo({
  className = "h-9 w-auto",
  sizes = "64px",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
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
    <Image
      src="/logo.png"
      alt="OCD Fighters — MMA i grappling klub Sarajevo"
      width={512}
      height={512}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
