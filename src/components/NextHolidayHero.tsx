"use client";

import { useMemo } from "react";
import Link from "next/link";
import { nextOccurrence, type DateRule } from "@/lib/dates";
import { formatFull } from "@/lib/format";
import { useNow } from "@/hooks/useNow";
import RuleCountdown from "./RuleCountdown";

export interface NextHolidayItem {
  slug: string;
  name: string;
  rule: DateRule;
}

export default function NextHolidayHero({
  items,
}: {
  items: NextHolidayItem[];
}) {
  const now = useNow(60_000);
  const next = useMemo(() => {
    if (!now) return null;
    let best: { item: NextHolidayItem; date: Date } | null = null;
    for (const item of items) {
      const date = nextOccurrence(item.rule, now);
      if (!best || date < best.date) best = { item, date };
    }
    return best;
  }, [items, now]);

  return (
    <div className="flex min-h-44 flex-col items-start gap-4">
      {next ? (
        <>
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-200">
            Ngày lễ sắp tới
          </p>
          <Link
            href={`/${next.item.slug}/`}
            className="font-display text-4xl font-extrabold text-white sm:text-5xl"
          >
            {next.item.name}
          </Link>
          <p className="text-sm text-white/80">{formatFull(next.date)}</p>
          <RuleCountdown rule={next.item.rule} />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="h-44 w-full animate-pulse rounded-xl bg-white/10"
        />
      )}
    </div>
  );
}
