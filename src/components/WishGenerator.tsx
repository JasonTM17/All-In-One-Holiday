"use client";

import { useState } from "react";
import type { Holiday } from "@/data/holidays";
import { TONE_LABEL, makeWishes, tonesFor, type Tone } from "@/lib/wishes-gen";
import CopyButton from "./CopyButton";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function WishGenerator({ holiday }: { holiday: Holiday }) {
  const tones = tonesFor(holiday);
  const [tone, setTone] = useState<Tone>(tones[0]);
  const [name, setName] = useState("");
  const [rel, setRel] = useState("");
  const wishes = makeWishes(holiday, tone, name, rel);

  return (
    <div className="mt-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5">
      <div className="flex flex-wrap gap-2">
        {tones.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTone(t)}
            aria-pressed={tone === t}
            className={`min-h-11 rounded-full px-4 text-sm font-bold transition focus-visible:outline-2 ${
              tone === t
                ? "bg-[var(--color-brand)] text-white"
                : "border border-[var(--color-line)] hover:bg-[var(--color-soft)]"
            }`}
          >
            {TONE_LABEL[t]}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-bold text-[var(--color-muted)]">
          Tên người nhận
          <input
            type="text"
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
            placeholder="Lan"
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-transparent px-3 py-2.5 outline-none focus:border-[var(--color-brand)]"
          />
        </label>
        <label className="text-sm font-bold text-[var(--color-muted)]">
          Mối quan hệ
          <input
            type="text"
            value={rel}
            maxLength={40}
            onChange={(e) => setRel(e.target.value)}
            placeholder="mẹ, cô, bạn thân…"
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
              <CopyButton text={w} label="Sao chép" />
              <a
                href={`${BASE}/thiep/?holiday=${holiday.slug}&to=${encodeURIComponent(name)}&msg=${encodeURIComponent(w)}`}
                className="min-h-11 rounded-full border border-[var(--color-line)] px-3 py-2 text-xs font-bold text-[var(--color-muted)] hover:bg-[var(--color-card)] focus-visible:outline-2"
              >
                Gửi vào thiệp
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
