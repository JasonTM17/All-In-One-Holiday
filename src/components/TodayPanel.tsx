"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { HolidayCategory } from "@/data/categories";
import type { DateRule } from "@/lib/dates";
import { daysUntil, nextOccurrence, solarToLunar } from "@/lib/dates";
import { formatDayMonth, formatFull } from "@/lib/format";
import { getStrings, localePath, type Locale } from "@/i18n";

/** Slim per-holiday shape the today panel needs (serialized from the server page). */
export interface TodayItem {
  slug: string;
  name: string;
  categories: HolidayCategory[];
  rule: DateRule;
  theme: { from: string };
  dayOff?: boolean;
}

function atMidnight(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export default function TodayPanel({
  items,
  locale = "vi",
}: {
  items: TodayItem[];
  locale?: Locale;
}) {
  const t = getStrings(locale);
  const lp = (p: string) => localePath(locale, p);

  const { today, lunar, todays, upcoming, restOfMonth } = useMemo(() => {
    const now = atMidnight(new Date());
    const rows = items
      .map((h) => ({ h, date: nextOccurrence(h.rule, now) }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    return {
      today: now,
      lunar: solarToLunar(now),
      todays: rows.filter((r) => r.date.getTime() === now.getTime()),
      upcoming: rows.filter((r) => r.date.getTime() > now.getTime()).slice(0, 5),
      restOfMonth: rows.filter(
        (r) =>
          r.date.getTime() > now.getTime() &&
          r.date.getFullYear() === now.getFullYear() &&
          r.date.getMonth() === now.getMonth(),
      ),
    };
  }, [items]);

  return (
    <div className="space-y-8">
      {/* Today panel */}
      <section
        aria-label={t.today.liveAria}
        className="card overflow-hidden p-0"
      >
        <div className="bg-[var(--color-brand)] px-6 py-8 text-[var(--color-on-brand)] sm:px-8">
          <p className="text-sm font-bold uppercase tracking-widest opacity-80">
            {t.grid.today}
          </p>
          <p className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
            {formatFull(today, locale)}
          </p>
          <p className="mt-1 text-sm font-semibold opacity-85">
            {t.today.lunarToday(lunar.day, lunar.month)}
          </p>
        </div>
        <div className="px-6 py-6 sm:px-8">
          {todays.length > 0 ? (
            <>
              <h2 className="font-display text-xl font-extrabold text-[var(--color-ink)]">
                {t.today.hasHoliday}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {todays.map(({ h }) => (
                  <li key={h.slug}>
                    <Link
                      prefetch={false}
                      href={lp(`/${h.slug}/`)}
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white hover:brightness-110 focus-visible:outline-2"
                      style={{ background: h.theme.from }}
                    >
                      {h.name}
                      {h.dayOff && (
                        <span className="rounded-md bg-white/25 px-1.5 py-0.5 text-[10px] tracking-wide">
                          {t.holiday.dayOff}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h2 className="font-display text-xl font-extrabold text-[var(--color-ink)]">
              {t.today.noHoliday}
            </h2>
          )}
        </div>
      </section>

      {/* Upcoming */}
      <section aria-labelledby="today-next">
        <h2
          id="today-next"
          className="font-display text-xl font-extrabold text-[var(--color-ink)]"
        >
          {t.today.nextLabel}
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {upcoming.map(({ h, date }) => (
            <li key={h.slug}>
              <Link
                prefetch={false}
                href={lp(`/${h.slug}/`)}
                className="card flex items-center justify-between gap-3 px-4 py-3 transition hover:-translate-y-0.5 focus-visible:outline-2"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-[var(--color-ink)]">
                    {h.name}
                  </span>
                  <span className="text-xs text-[var(--color-faint)]">
                    {formatFull(date, locale)}
                  </span>
                </span>
                <span
                  className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold text-white"
                  style={{ background: h.theme.from }}
                >
                  {t.today.inDays(daysUntil(date, today))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Rest of month */}
      <section aria-labelledby="today-month">
        <h2
          id="today-month"
          className="font-display text-xl font-extrabold text-[var(--color-ink)]"
        >
          {t.today.thisMonth}
        </h2>
        {restOfMonth.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--color-faint)]">
            {t.today.noneThisMonth}
          </p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {restOfMonth.map(({ h, date }) => (
              <li key={h.slug}>
                <Link
                  prefetch={false}
                  href={lp(`/${h.slug}/`)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-line)] px-3 py-1.5 text-sm font-semibold text-[var(--color-muted)] hover:bg-[var(--color-soft)] focus-visible:outline-2"
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: h.theme.from }}
                    aria-hidden="true"
                  />
                  {h.name}
                  <span className="text-[var(--color-faint)]">
                    {formatDayMonth(date, locale)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6">
          <Link
            prefetch={false}
            href={lp("/lich/")}
            className="u-link text-sm font-bold text-[var(--color-brand)] focus-visible:outline-2"
          >
            {t.today.viewCalendar} →
          </Link>
        </p>
      </section>
    </div>
  );
}
