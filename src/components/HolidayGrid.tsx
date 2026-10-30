"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CATEGORY_LABELS,
  type HolidayCategory,
} from "@/data/holidays";
import { nextOccurrence, daysUntil, type DateRule } from "@/lib/dates";
import { formatDayMonth, formatFull } from "@/lib/format";
import { useNow } from "@/hooks/useNow";

export interface GridItem {
  slug: string;
  name: string;
  dateMark: string;
  displayDate: string;
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
        className="mb-8 flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f.key
                ? "border-rose-700 bg-rose-700 text-white"
                : "border-stone-300 bg-white text-stone-700 hover:border-rose-400 hover:text-rose-800"
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
                className="group block h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className="dot-pattern flex h-32 items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${h.theme.from}, ${h.theme.to})`,
                  }}
                >
                  <span className="font-display text-3xl font-extrabold tracking-tight text-white drop-shadow">
                    {h.dateMark}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-display text-lg font-bold text-stone-900 group-hover:text-rose-800">
                    {h.name}
                  </p>
                  <p className="mt-1 text-sm text-stone-600">{h.tagline}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    <time
                      dateTime={next ? next.toISOString().slice(0, 10) : undefined}
                      title={next ? formatFull(next) : undefined}
                    >
                      {next ? formatDayMonth(next) : h.displayDate}
                    </time>
                    {days !== null && (
                      <span className="ml-2 text-rose-700">
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
