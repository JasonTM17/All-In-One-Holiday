"use client";

// Shared lightbox dialog for the six-photo gallery.
// A11y contract: role="dialog" aria-modal; Esc/backdrop/close button exit;
// ArrowLeft/ArrowRight step through photos; Tab and Shift+Tab cycle the
// three controls (focus trap); body scroll locks while open; focus returns
// to the trigger that opened it. Caption comes from the image alt text.
import { useEffect, useRef } from "react";
import HImg from "./HImg";
import { photoCredit } from "@/lib/photo-credit";
import type { GalleryItem, GalleryLabels } from "./GalleryGrid";

export default function GalleryDialog({
  slug,
  items,
  index,
  labels,
  onClose,
  onNav,
}: {
  slug: string;
  items: GalleryItem[];
  index: number;
  labels: GalleryLabels;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const creditRef = useRef<HTMLAnchorElement>(null);
  const it = items[index];
  const credit = photoCredit(slug, it.base);
  const counter = labels.counter
    .replace("{n}", String(index + 1))
    .replace("{total}", String(items.length));

  // Mount-only: remember the element that opened the dialog (the gallery
  // trigger still holds focus at this point), move focus to the close
  // control, and restore focus to the opener when the dialog unmounts.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => opener?.focus();
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNav(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNav(1);
        return;
      }
      if (e.key === "Tab") {
        // Focus trap across the controls — close keeps initial focus so the
        // first Tab lands on prev; the credit link stays reachable both ways.
        const focusables = (
          [
            prevRef.current,
            nextRef.current,
            creditRef.current,
            closeRef.current,
          ] as (HTMLElement | null)[]
        ).filter((el): el is HTMLElement => el !== null);
        const active = document.activeElement;
        const i = focusables.indexOf(active as HTMLElement);
        e.preventDefault();
        const next = e.shiftKey
          ? focusables[(i - 1 + focusables.length) % focusables.length]
          : focusables[(i + 1) % focusables.length];
        next?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNav]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={it.alt}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label={labels.closeLabel}
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-black/75 backdrop-blur-sm"
      />
      <figure className="relative z-10 max-h-full w-full max-w-4xl">
        <HImg
          key={it.base}
          src={`${slug}/${it.base}.webp`}
          thumb={{ slug, base: it.base }}
          sizes="(min-width: 1024px) 56rem, 94vw"
          alt={it.alt}
          width={960}
          height={720}
          eager
          className="max-h-[76vh] w-full rounded-2xl object-contain shadow-2xl"
        />
        <figcaption className="mt-3 text-center text-sm font-semibold text-white/90">
          {it.alt}
          <span aria-hidden="true" className="ml-2 text-white/60">
            · {counter}
          </span>
          {credit && (
            <a
              ref={creditRef}
              href={credit.photo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-xs font-normal text-white/55 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              {credit.photographer} · {credit.license} · {credit.source}
            </a>
          )}
        </figcaption>
      </figure>

      <button
        ref={prevRef}
        type="button"
        aria-label={labels.prevLabel}
        onClick={() => onNav(-1)}
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        ref={nextRef}
        type="button"
        aria-label={labels.nextLabel}
        onClick={() => onNav(1)}
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button
        ref={closeRef}
        type="button"
        aria-label={labels.closeLabel}
        onClick={onClose}
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
      <p aria-live="polite" className="sr-only">
        {counter}
      </p>
    </div>
  );
}
