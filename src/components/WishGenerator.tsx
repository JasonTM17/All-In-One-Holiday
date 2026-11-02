"use client";

import { useState } from "react";
import {
  makeWishes,
  tonesFor,
  type Tone,
  type WishHoliday,
} from "@/lib/wishes-gen";
import { getStrings, localePath, type Locale } from "@/i18n";
import CopyButton from "./CopyButton";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function WishGenerator({
  holiday,
  locale = "vi",
}: {
  holiday: WishHoliday;
  locale?: Locale;
}) {
  const t = getStrings(locale);
  const tones = tonesFor(holiday);
  const [tone, setTone] = useState<Tone>(tones[0]);
  const [name, setName] = useState("");
  const [rel, setRel] = useState("");
  const wishes = makeWishes(holiday, tone, name, rel, t.wishGen);
  const thiep = `${BASE}${localePath(locale, "/thiep/")}`;

  return (
    <div className="mt-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5">
      <div className="flex flex-wrap gap-2">
        {tones.map((x) => (
          <button
            key={x}
            type="button"
            onClick={() => setTone(x)}
            aria-pressed={tone === x}
            className={`min-h-11 rounded-xl px-4 text-sm font-bold transition focus-visible:outline-2 ${
              tone === x
                ? "bg-[var(--color-brand)] text-[var(--color-on-brand)]"
                : "border border-[var(--color-line)] hover:bg-[var(--color-soft)]"
            }`}
          >
            {t.wishGen.tones[x]}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-sm font-bold text-[var(--color-muted)]">
          {t.wishGen.nameLabel}
          <input
            type="text"
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.wishGen.namePlaceholder}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-transparent px-3 py-2.5 outline-none focus:border-[var(--color-brand)]"
          />
        </label>
        <label className="text-sm font-bold text-[var(--color-muted)]">
          {t.wishGen.relLabel}
          <input
            type="text"
            value={rel}
            maxLength={40}
            onChange={(e) => setRel(e.target.value)}
            placeholder={t.wishGen.relPlaceholder}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-transparent px-3 py-2.5 outline-none focus:border-[var(--color-brand)]"
          />
        </label>
      </div>
      <ul className="mt-4 space-y-2">
        {wishes.map((w, i) => (
          <li
            key={i}
            className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--color-line)] bg-[var(--color-soft)]/60 p-3"
          >
            <p className="min-w-0 flex-1 text-sm leading-relaxed text-[var(--color-ink)]">{w}</p>
            <div className="flex shrink-0 gap-1.5">
              <CopyButton text={w} label={t.copy.copy} copiedLabel={t.copy.copied} />
              <a
                href={`${thiep}?holiday=${holiday.slug}&to=${encodeURIComponent(name)}&msg=${encodeURIComponent(w)}`}
                className="min-h-11 rounded-xl border border-[var(--color-line)] px-3 py-2 text-xs font-bold text-[var(--color-muted)] hover:bg-[var(--color-card)] focus-visible:outline-2"
              >
                {t.wishGen.sendToCard}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
