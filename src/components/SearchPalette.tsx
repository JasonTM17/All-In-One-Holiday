"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getStrings, type Locale } from "@/i18n";

// The dialog (and its search-index data) ships in a separate chunk, fetched on
// first intent: click, ⌘K, or an idle-time prefetch — never at page load.
const PaletteDialog = dynamic(() => import("./SearchPaletteDialog"), {
  ssr: false,
});

const warm = () => {
  void import("./SearchPaletteDialog");
};

export default function SearchPalette({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // Idle prefetch after `load` so it never competes with the LCP image;
  // the dialog still opens instantly for any real first use.
  useEffect(() => {
    const w = window as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const schedule = () =>
      w.requestIdleCallback
        ? w.requestIdleCallback(warm, { timeout: 4000 })
        : window.setTimeout(warm, 2000);
    let id: number;
    if (document.readyState === "complete") {
      id = schedule();
    } else {
      const onLoad = () => {
        id = schedule();
      };
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={warm}
        onFocus={warm}
        aria-label={t.nav.searchAria}
        className="flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-line)] px-4 text-sm font-bold text-[var(--color-faint)] hover:bg-[var(--color-soft)] focus-visible:outline-2"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="7" cy="7" r="5" />
          <path d="m11 11 3 3" />
        </svg>
        <span className="hidden sm:inline">{t.nav.search}</span>
        <kbd className="hidden rounded bg-[var(--color-soft)] px-1.5 text-[10px] sm:inline">⌘K</kbd>
      </button>

      {open && <PaletteDialog onClose={close} locale={locale} />}
    </>
  );
}
