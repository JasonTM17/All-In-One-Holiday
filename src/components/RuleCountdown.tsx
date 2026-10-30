"use client";

import { useMemo } from "react";
import { nextOccurrence, daysUntil, type DateRule } from "@/lib/dates";
import { useNow } from "@/hooks/useNow";

const UNITS = ["ngày", "giờ", "phút", "giây"] as const;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function RuleCountdown({
  rule,
  todayLabel = "Hôm nay là ngày lễ!",
}: {
  rule: DateRule;
  todayLabel?: string;
}) {
  const now = useNow(1000);
  const target = useMemo(
    () => (now ? nextOccurrence(rule, now) : null),
    [now, rule],
  );

  if (!target || !now) {
    return (
      <div
        aria-hidden="true"
        className="grid h-24 w-full max-w-md grid-cols-4 gap-3"
      >
        {UNITS.map((u) => (
          <div key={u} className="rounded-xl bg-white/10" />
        ))}
      </div>
    );
  }

  if (daysUntil(target, now) === 0) {
    return (
      <p className="rounded-2xl bg-white/15 px-8 py-5 font-display text-2xl font-bold">
        {todayLabel}
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
    <div
      role="timer"
      aria-label={`Còn ${values[0]} ngày ${values[1]} giờ`}
      className="grid w-full max-w-md grid-cols-4 gap-3"
    >
      {UNITS.map((unit, i) => (
        <div
          key={unit}
          className="rounded-xl bg-white/15 px-2 py-3 text-center backdrop-blur-sm"
        >
          <span className="block font-display text-3xl font-bold tabular-nums">
            {pad(values[i])}
          </span>
          <span className="text-xs uppercase tracking-wide opacity-80">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
