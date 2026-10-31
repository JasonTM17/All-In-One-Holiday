"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchIndex } from "@/data/search-index";
import { searchIndexEn } from "@/data/search-index-en";
import { searchHolidays } from "@/lib/search";
import { getStrings, localePrefix, type Locale } from "@/i18n";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Modal search dialog — lazy chunk; mounts only when the palette is open. */
export default function SearchPaletteDialog({
  onClose,
  locale,
}: {
  onClose: () => void;
  locale: Locale;
}) {
  const t = getStrings(locale);
  const index = locale === "en" ? searchIndexEn : searchIndex;
  const prefix = `${BASE}${localePrefix(locale)}`;
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const hits = searchHolidays(index, q);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      router.push(`${prefix}/${hits[active].holiday.slug}/`);
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[12vh]"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.search.dialogAria}
        onKeyDown={onTrap}
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-[var(--color-card)] shadow-2xl"
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
          placeholder={t.search.placeholder}
          className="w-full border-b border-[var(--color-line)] px-5 py-4 text-lg outline-none"
        />
        <ul id="search-list" role="listbox" className="max-h-80 overflow-auto p-2">
          {q && hits.length === 0 && (
            <li className="p-4 text-sm text-[var(--color-faint)]">{t.search.empty(q)}</li>
          )}
          {!q && (
            <li className="p-4 text-sm text-[var(--color-faint)]">
              {t.search.hint}
            </li>
          )}
          {hits.map((h, i) => (
            <li key={h.holiday.slug} role="option" id={`hit-${h.holiday.slug}`} aria-selected={i === active}>
              <a
                href={`${prefix}/${h.holiday.slug}/`}
                onClick={onClose}
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
                    {h.why
                      ? ` · ${h.why === "wish" ? t.search.whyWish : t.search.whyDate}`
                      : ""}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="border-t border-[var(--color-line)] px-4 py-2 text-[10px] text-[var(--color-faint)]">
          {t.search.footer}
        </p>
      </div>
    </div>
  );
}
