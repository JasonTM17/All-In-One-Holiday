"use client";

import { useMemo, useState } from "react";
import { holidays, type HolidayCategory } from "@/data/holidays";
import { occurrenceInYear, solarToLunar } from "@/lib/dates";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const WEEKDAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const CATS: { id: HolidayCategory | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "truyen-thong", label: "Truyền thống" },
  { id: "quoc-gia", label: "Quốc gia" },
  { id: "quoc-te", label: "Quốc tế" },
  { id: "phu-nu", label: "Phụ nữ" },
];

type DayCell = {
  date: Date;
  inMonth: boolean;
  lunar: { month: number; day: number };
  hols: typeof holidays;
};

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [cat, setCat] = useState<HolidayCategory | "all">("all");

  const weeks = useMemo(() => {
    const first = new Date(year, month, 1);
    const start = new Date(year, month, 1 - first.getDay());
    const map = new Map<string, typeof holidays>();
    for (const h of holidays) {
      if (cat !== "all" && !h.categories.includes(cat)) continue;
      for (const y of [year - 1, year, year + 1]) {
        const d = occurrenceInYear(h.rule, y);
        const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        map.set(key, [...(map.get(key) ?? []), h]);
      }
    }
    const out: DayCell[][] = [];
    for (let w = 0; w < 6; w++) {
      const row: DayCell[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d);
        row.push({
          date,
          inMonth: date.getMonth() === month,
          lunar: solarToLunar(date),
          hols: map.get(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`) ?? [],
        });
      }
      out.push(row);
    }
    return out;
  }, [year, month, cat]);

  const agenda = useMemo(
    () => weeks.flat().filter((c) => c.inMonth && c.hols.length > 0),
    [weeks],
  );

  function shift(dir: number) {
    const d = new Date(year, month + dir, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }
  function goToday() {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }

  const isToday = (d: Date) =>
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Tháng trước"
            className="min-h-11 min-w-11 rounded-xl border border-[var(--color-line)] text-lg font-bold hover:bg-[var(--color-soft)] focus-visible:outline-2"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Tháng sau"
            className="min-h-11 min-w-11 rounded-xl border border-[var(--color-line)] text-lg font-bold hover:bg-[var(--color-soft)] focus-visible:outline-2"
          >
            ›
          </button>
        </div>
        <h2 className="font-display text-xl font-extrabold text-[var(--color-ink)]">
          Tháng {month + 1}/{year}
        </h2>
        <button
          type="button"
          onClick={goToday}
          className="min-h-11 rounded-xl border border-[var(--color-line)] px-4 text-sm font-bold hover:bg-[var(--color-soft)] focus-visible:outline-2"
        >
          Hôm nay
        </button>
        <a
          href={`${BASE}/ngay-le-viet.ics`}
          download
          className="min-h-11 rounded-xl bg-[var(--color-brand)] px-4 py-3 text-sm font-bold text-white hover:brightness-110 focus-visible:outline-2"
        >
          Đăng ký lịch (.ics)
        </a>
        <div className="ml-auto flex flex-wrap gap-1" role="group" aria-label="Lọc loại ngày lễ">
          {CATS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              aria-pressed={cat === c.id}
              className={`min-h-11 rounded-full px-3 text-xs font-bold transition focus-visible:outline-2 ${
                cat === c.id
                  ? "bg-[var(--color-brand)] text-white"
                  : "border border-[var(--color-line)] hover:bg-[var(--color-soft)]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Month grid */}
      <div role="grid" aria-label={`Lịch tháng ${month + 1} năm ${year}`} className="mt-6 hidden sm:block">
        <div role="row" className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((w) => (
            <div role="columnheader" key={w} className="pb-2 text-center text-xs font-extrabold text-[var(--color-faint)]">
              {w}
            </div>
          ))}
        </div>
        {weeks.map((row, i) => (
          <div role="row" key={i} className="grid grid-cols-7 gap-1">
            {row.map((c) => (
              <div
                role="gridcell"
                key={c.date.toISOString()}
                className={`min-h-24 rounded-xl border p-1.5 text-left align-top transition ${
                  c.inMonth ? "border-[var(--color-line)] bg-white" : "border-transparent bg-[var(--color-soft)]/50 text-[var(--color-faint)]"
                } ${isToday(c.date) ? "ring-2 ring-[var(--color-brand)]" : ""}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className={`text-sm font-extrabold ${isToday(c.date) ? "text-[var(--color-brand)]" : ""}`}>
                    {c.date.getDate()}
                  </span>
                  <span className="text-[10px] text-[var(--color-faint)]">
                    {c.lunar.day}/{c.lunar.month}ÂL
                  </span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {c.hols.map((h) => (
                    <a
                      key={h.slug}
                      href={`${BASE}/${h.slug}/`}
                      className="block truncate rounded px-1.5 py-0.5 text-[10px] font-bold text-white hover:brightness-110 focus-visible:outline-2"
                      style={{ background: h.theme.from }}
                      title={h.name}
                    >
                      {h.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile agenda */}
      <ul className="mt-6 space-y-2 sm:hidden" aria-label="Các ngày lễ trong tháng">
        {agenda.length === 0 && (
          <li className="rounded-xl border border-[var(--color-line)] p-4 text-sm text-[var(--color-faint)]">
            Không có ngày lễ nào trong tháng này.
          </li>
        )}
        {agenda.map((c) => (
          <li key={c.date.toISOString()} className="rounded-xl border border-[var(--color-line)] p-3">
            <p className="text-xs font-bold text-[var(--color-faint)]">
              {c.date.getDate()}/{month + 1} · ÂL {c.lunar.day}/{c.lunar.month}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {c.hols.map((h) => (
                <a
                  key={h.slug}
                  href={`${BASE}/${h.slug}/`}
                  className="rounded-full px-3 py-1.5 text-xs font-bold text-white"
                  style={{ background: h.theme.from }}
                >
                  {h.name}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
