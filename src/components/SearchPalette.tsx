"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { holidays } from "@/data/holidays";
import { searchHolidays } from "@/lib/search";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const hits = searchHolidays(holidays, q);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setActive(0);
  }, []);

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

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function onTrap(e: React.KeyboardEvent) {
    if (e.key === "Tab" && boxRef.current) {
      const els = boxRef.current.querySelectorAll<HTMLElement>(
        "input, a[href], button",
      );
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && hits[active]) {
      router.push(`${BASE}/${hits[active].holiday.slug}/`);
      close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Tìm ngày lễ (Ctrl+K)"
        className="flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-line)] px-4 text-sm font-bold text-[var(--color-faint)] hover:bg-[var(--color-soft)] focus-visible:outline-2"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="7" cy="7" r="5" />
          <path d="m11 11 3 3" />
        </svg>
        <span className="hidden sm:inline">Tìm lễ</span>
        <kbd className="hidden rounded bg-[var(--color-soft)] px-1.5 text-[10px] sm:inline">⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[12vh]"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={boxRef}
            role="dialog"
            aria-modal="true"
            aria-label="Tìm kiếm ngày lễ"
            onKeyDown={onTrap}
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls="search-list"
              aria-activedescendant={hits[active] ? `hit-${hits[active].holiday.slug}` : undefined}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              placeholder="Nhập tên ngày lễ, lời chúc…"
              className="w-full border-b border-[var(--color-line)] px-5 py-4 text-lg outline-none"
            />
            <ul id="search-list" role="listbox" className="max-h-80 overflow-auto p-2">
              {q && hits.length === 0 && (
                <li className="p-4 text-sm text-[var(--color-faint)]">Không tìm thấy “{q}”.</li>
              )}
              {!q && (
                <li className="p-4 text-sm text-[var(--color-faint)]">
                  Gõ để tìm — không cần dấu: “tet”, “phu nu”, “sinh nhat”…
                </li>
              )}
              {hits.map((h, i) => (
                <li key={h.holiday.slug} role="option" id={`hit-${h.holiday.slug}`} aria-selected={i === active}>
                  <a
                    href={`${BASE}/${h.holiday.slug}/`}
                    onClick={close}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 focus-visible:outline-2 ${
                      i === active ? "bg-[var(--color-brand)]/10" : "hover:bg-[var(--color-soft)]"
                    }`}
                  >
                    <span
                      className="h-8 w-8 shrink-0 rounded-lg"
                      style={{ background: `linear-gradient(135deg, ${h.holiday.theme.from}, ${h.holiday.theme.to})` }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-[var(--color-ink)]">{h.holiday.name}</span>
                      <span className="block truncate text-xs text-[var(--color-faint)]">
                        {h.holiday.displayDate}
                        {h.why ? ` · khớp ${h.why}` : ""}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="border-t border-[var(--color-line)] px-4 py-2 text-[10px] text-[var(--color-faint)]">
              ↑↓ chọn · Enter mở · Esc đóng
            </p>
          </div>
        </div>
      )}
    </>
  );
}
