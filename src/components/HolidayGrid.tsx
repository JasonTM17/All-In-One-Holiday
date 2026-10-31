"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_LABELS, type HolidayCategory } from "@/data/categories";
import type { MotifName } from "@/data/holidays";
import { nextOccurrence, daysUntil, type DateRule } from "@/lib/dates";
import { formatDayMonth, formatFull } from "@/lib/format";
import { useNow } from "@/hooks/useNow";
import Motif from "./Motif";
import HImg from "./HImg";

export interface GridItem {
  slug: string;
  name: string;
  dateMark: string;
  displayDate: string;
  motif: MotifName;
  categories: HolidayCategory[];
  rule: DateRule;
  theme: { from: string; to: string; accent: string };
  tagline: string;
}

type Filter = "all" | HolidayCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "phu-nu", label: CATEGORY_LABELS["phu-nu"] },
  { key: "quoc-gia", label: CATEGORY_LABELS["quoc-gia"] },
  { key: "truyen-thong", label: CATEGORY_LABELS["truyen-thong"] },
  { key: "quoc-te", label: CATEGORY_LABELS["quoc-te"] },
];

export default function HolidayGrid({ items }: { items: GridItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const now = useNow();

  const dates = useMemo(() => {
    const map: Record<string, Date> = {};
    if (now) {
      for (const h of items) map[h.slug] = nextOccurrence(h.rule, now);
    }
    return map;
  }, [items, now]);

  const visible = useMemo(() => {
    const list =
      filter === "all"
        ? items
        : items.filter((h) => h.categories.includes(filter));
    return [...list].sort((a, b) => {
      const da = dates[a.slug]?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const db = dates[b.slug]?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return da - db;
    });
  }, [items, filter, dates]);

  return (
    <div>
      <div
        role="group"
        aria-label="Lọc ngày lễ theo nhóm"
        className="mb-10 flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`min-h-11 rounded-full border px-5 py-2.5 text-sm font-bold transition-colors ${
              filter === f.key
                ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-[var(--color-on-brand)]"
                : "border-[var(--color-line)] bg-[var(--color-card)] text-[var(--color-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((h) => {
          const next = dates[h.slug];
          const days = next && now ? daysUntil(next, now) : null;
          return (
            <li key={h.slug}>
              <Link
                href={`/${h.slug}/`}
                className="card group block h-full overflow-hidden"
              >
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${h.theme.from}, ${h.theme.to})`,
                  }}
                >
                  <HImg
                    src={`${h.slug}/card.webp`}
                    thumb={{ slug: h.slug, base: "card" }}
                    sizes="(min-width: 1184px) 355px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                    alt=""
                    width={800}
                    height={600}
                    className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-60"
                  />
                  <div
                    className="dot-pattern absolute inset-0"
                    aria-hidden="true"
                  />
                  <Motif
                    name={h.motif}
                    className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 text-white/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                  />
                  <span className="relative font-display text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                    {h.dateMark}
                  </span>
                </div>
                <div className="p-6">
                  <p className="font-display text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand-deep)]">
                    {h.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                    {h.tagline}
                  </p>
                  <p className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--color-faint)]">
                    <time
                      dateTime={
                        next ? next.toISOString().slice(0, 10) : undefined
                      }
                      title={next ? formatFull(next) : undefined}
                    >
                      {next ? formatDayMonth(next) : h.displayDate}
                    </time>
                    {days !== null && (
                      <span className="text-[var(--color-brand)]">
                        {days === 0 ? "· Hôm nay" : `· Còn ${days} ngày`}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
