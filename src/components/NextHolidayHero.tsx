"use client";

import { useMemo } from "react";
import Link from "next/link";
import { nextOccurrence, type DateRule } from "@/lib/dates";
import { formatFull } from "@/lib/format";
import { useNow } from "@/hooks/useNow";
import Motif from "./Motif";
import RuleCountdown from "./RuleCountdown";
import type { MotifName } from "@/data/holidays";

export interface NextHolidayItem {
  slug: string;
  name: string;
  dateMark: string;
  motif: MotifName;
  rule: DateRule;
  theme: { from: string; to: string };
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
    <div className="min-h-[22rem]">
      {next ? (
        <div
          className="relative h-full overflow-hidden rounded-3xl p-7 text-white shadow-2xl sm:p-9"
          style={{
            background: `linear-gradient(140deg, ${next.item.theme.from}, ${next.item.theme.to})`,
          }}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/holidays/${next.item.slug}/hero.webp`}
            srcSet={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/holidays/${next.item.slug}/hero-sm.webp 800w, ${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/holidays/${next.item.slug}/hero.webp 1600w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt=""
            width={1920}
            height={1280}
            loading="lazy"
            decoding="async"
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
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-[var(--color-brand-deep)] transition-transform hover:scale-[1.03]"
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
