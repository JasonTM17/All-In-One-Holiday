"use client";

// Six-image gallery: masonry triggers + a shared lightbox dialog.
// The dialog is split into its own chunk via React.lazy so the lightbox
// code is off the critical path — it downloads on first open only.
// One client island owns all six triggers (single hydration root) instead
// of one island per photo.
import { lazy, Suspense, useCallback, useRef, useState } from "react";
import HImg from "./HImg";

const GalleryDialog = lazy(() => import("./GalleryDialog"));

export type GalleryItem = {
  /** File stem under images/holidays/<slug>/ (e.g. "gallery4"). */
  base: string;
  alt: string;
  /** aria-label on the thumbnail trigger button. */
  openLabel: string;
};

export type GalleryLabels = {
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  /** Counter template: "{n}" and "{total}" are substituted. */
  counter: string;
};

// Varied cell aspects give the column masonry its staggered rhythm.
const ASPECTS = [
  "aspect-[4/5]",
  "aspect-[1/1]",
  "aspect-[4/3]",
  "aspect-[1/1]",
  "aspect-[4/5]",
  "aspect-[4/3]",
];

export default function GalleryGrid({
  slug,
  items,
  labels,
}: {
  slug: string;
  items: GalleryItem[];
  labels: GalleryLabels;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    setOpen((cur) => {
      if (cur !== null) triggerRefs.current[cur]?.focus();
      return null;
    });
  }, []);

  const nav = useCallback((dir: 1 | -1) => {
    setOpen((cur) =>
      cur === null ? cur : (cur + dir + items.length) % items.length,
    );
  }, [items.length]);

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3">
        {items.map((it, i) => (
          <button
            key={it.base}
            ref={(el) => {
              triggerRefs.current[i] = el;
            }}
            type="button"
            aria-label={it.openLabel}
            aria-haspopup="dialog"
            onClick={() => setOpen(i)}
            className="group relative mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl shadow-lg"
          >
            <HImg
              src={`${slug}/${it.base}.webp`}
              thumb={{ slug, base: it.base }}
              sizes="(min-width: 944px) 290px, (min-width: 640px) 30vw, 46vw"
              alt={it.alt}
              width={960}
              height={720}
              className={`${ASPECTS[i % ASPECTS.length]} h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]`}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 pb-2.5 pt-10 text-left text-xs font-medium leading-snug text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {it.alt}
            </span>
            <span
              aria-hidden="true"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
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
        ))}
      </div>

      {open !== null && (
        <Suspense fallback={null}>
          <GalleryDialog
            slug={slug}
            items={items}
            index={open}
            labels={labels}
            onClose={close}
            onNav={nav}
          />
        </Suspense>
      )}
    </>
  );
}
