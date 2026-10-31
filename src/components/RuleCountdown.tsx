"use client";

import { useMemo } from "react";
import { nextOccurrence, daysUntil, type DateRule } from "@/lib/dates";
import { useNow } from "@/hooks/useNow";
import { getStrings, type Locale } from "@/i18n";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function RuleCountdown({
  rule,
  todayLabel,
  dark = false,
  locale = "vi",
}: {
  rule: DateRule;
  todayLabel?: string;
  dark?: boolean;
  locale?: Locale;
}) {
  const t = getStrings(locale);
  const now = useNow(1000);
  const target = useMemo(
    () => (now ? nextOccurrence(rule, now) : null),
    [now, rule],
  );
  const label = todayLabel ?? t.countdown.today;
  const UNITS = [
    t.countdown.days,
    t.countdown.hours,
    t.countdown.minutes,
    t.countdown.seconds,
  ];

  const box = dark
    ? "tile bg-black/10 text-[var(--color-ink)]"
    : "tile glass text-white";

  if (!target || !now) {
    return (
      <div
        aria-hidden="true"
        className="grid h-24 w-full max-w-md grid-cols-4 gap-3"
      >
        {UNITS.map((u) => (
          <div key={u} className={box} />
        ))}
      </div>
    );
  }

  if (daysUntil(target, now) === 0) {
    return (
      <p className={`${dark ? "bg-black/10 text-[var(--color-ink)]" : "glass text-white"} rounded-2xl px-8 py-5 font-display text-2xl font-bold`}>
        {label}
      </p>
    );
  }

  const diff = Math.max(0, target.getTime() - now.getTime());
  const values = [
    Math.floor(diff / 86_400_000),
    Math.floor(diff / 3_600_000) % 24,
    Math.floor(diff / 60_000) % 60,
    Math.floor(diff / 1000) % 60,
  ];

  return (
    <div className="w-full max-w-md">
      {/* The ticking digits are decorative; a static label carries the meaning. */}
      <div aria-hidden="true" className="grid grid-cols-4 gap-3">
        {UNITS.map((unit, i) => (
          <div key={unit} className={box}>
            <span className="font-display text-3xl font-bold tabular-nums">
              {pad(values[i])}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide opacity-75">
              {unit}
            </span>
          </div>
        ))}
      </div>
      <p className="sr-only" role="timer">
        {t.countdown.srLeft(values[0], values[1])}
      </p>
    </div>
  );
}
