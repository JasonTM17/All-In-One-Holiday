"use client";

import { useMemo } from "react";
import Link from "next/link";
import { nextOccurrence, type DateRule } from "@/lib/dates";
import { formatFull } from "@/lib/format";
import { useNow } from "@/hooks/useNow";
import Motif from "./Motif";
import RuleCountdown from "./RuleCountdown";
import type { MotifName } from "@/data/holidays";
import { HERO_TINT } from "@/data/hero-sizes";
import HImg from "./HImg";

export interface NextHolidayItem {
  slug: string;
  name: string;
  dateMark: string;
  motif: MotifName;
  rule: DateRule;
  theme: { from: string; to: string };
}

export interface NextHolidayInitial {
  slug: string;
  /** ISO date of the next occurrence as computed on the server. */
  dateISO: string;
}

export default function NextHolidayHero({
  items,
  initial,
}: {
  items: NextHolidayItem[];
  /**
   * Server-computed "next holiday" so the card renders real content in the
   * static HTML instead of a post-hydration skeleton. The client re-derives
   * it once the clock starts ticking and only swaps when it truly differs.
   */
  initial: NextHolidayInitial;
}) {
  const now = useNow(60_000);
  const next = useMemo(() => {
    if (!now) {
      const item = items.find((x) => x.slug === initial.slug) ?? items[0];
      return item
        ? { item, date: new Date(initial.dateISO) }
        : null;
    }
    let best: { item: NextHolidayItem; date: Date } | null = null;
    for (const item of items) {
      const date = nextOccurrence(item.rule, now);
      if (!best || date < best.date) best = { item, date };
    }
    return best;
  }, [items, now, initial]);

  return (
    <div className="min-h-[22rem]">
      {next ? (
        <div
          className="relative h-full overflow-hidden rounded-3xl p-7 text-white shadow-2xl sm:p-9"
          style={{
            background: `linear-gradient(140deg, ${next.item.theme.from}, ${next.item.theme.to})`,
          }}
        >
          <HImg
            src={`${next.item.slug}/hero.webp`}
            hero={next.item.slug}
            tint={HERO_TINT[next.item.slug]}
            sizes="(min-width: 1184px) 507px, (min-width: 1024px) 45vw, 100vw"
            alt=""
            width={1920}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="dot-pattern absolute inset-0" aria-hidden="true" />
          <Motif
            name={next.item.motif}
            className="floaty-slow pointer-events-none absolute -bottom-8 -right-8 h-44 w-44 text-white/15"
          />
          <div className="relative flex h-full flex-col gap-4">
            <p className="eyebrow flex items-center justify-between text-white/75">
              Ngày lễ sắp tới
              <span className="rounded-full border border-white/30 px-2.5 py-0.5 text-[10px] tracking-widest">
                {formatFull(next.date)}
              </span>
            </p>
            <Link
              href={`/${next.item.slug}/`}
              className="font-display text-4xl font-extrabold leading-tight sm:text-[2.6rem]"
            >
              {next.item.name}
            </Link>
            <RuleCountdown rule={next.item.rule} />
            <Link
              href={`/${next.item.slug}/`}
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-[var(--color-brand-ink)] transition-transform hover:scale-[1.03]"
            >
              Xem chi tiết →
            </Link>
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="h-[22rem] w-full animate-pulse rounded-3xl bg-black/10"
        />
      )}
    </div>
  );
}
