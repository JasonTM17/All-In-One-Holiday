"use client";

import { useRef, useState } from "react";
import type { Faq as FaqItem } from "@/data/holidays";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      refs.current[(i + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      refs.current[(i - 1 + items.length) % items.length]?.focus();
    }
  }

  return (
    <div className="card divide-y divide-[var(--color-line)] overflow-hidden p-0">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-4 text-left font-bold text-[var(--color-ink)] hover:text-[var(--color-brand-deep)]"
              >
                {f.q}
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xl leading-none transition-transform ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
              className="px-6 pb-5 leading-relaxed text-[var(--color-muted)]"
            >
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
