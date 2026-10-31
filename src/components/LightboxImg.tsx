"use client";

// Photo thumbnail that opens a full-size lightbox dialog.
// A11y contract: the trigger is a real <button> with its own aria-label;
// the overlay is role="dialog" aria-modal, closes on Esc/backdrop/close
// button, moves focus to the close button on open and back to the trigger
// on close, and locks body scroll while open.
import { useEffect, useRef, useState } from "react";
import HImg from "./HImg";

type Props = {
  slug: string;
  /** File stem under images/holidays/<slug>/ (e.g. "amthuc-banh-chung"). */
  base: string;
  alt: string;
  /** Caption + dialog name in the lightbox (defaults to alt). */
  caption?: string;
  /** aria-label for the thumbnail trigger button. */
  openLabel: string;
  /** aria-label for the close button and the dimmed backdrop. */
  closeLabel: string;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function LightboxImg({
  slug,
  base,
  alt,
  caption,
  openLabel,
  closeLabel,
  sizes,
  className,
  width = 960,
  height = 720,
}: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={openLabel}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden"
      >
        <HImg
          src={`${slug}/${base}.webp`}
          thumb={{ slug, base }}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M8 11h6M11 8v6" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={caption ?? alt}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-zoom-out bg-black/75 backdrop-blur-sm"
          />
          <figure className="relative z-10 max-h-full w-full max-w-4xl">
            <HImg
              src={`${slug}/${base}.webp`}
              alt={alt}
              width={width}
              height={height}
              sizes="(min-width: 1024px) 56rem, 94vw"
              eager
              className="max-h-[80vh] w-full rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm font-semibold text-white/90">
              {caption ?? alt}
            </figcaption>
          </figure>
          <button
            ref={closeRef}
            type="button"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
