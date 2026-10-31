"use client";
import { HERO_TINT } from "@/data/hero-sizes";
import HImg from "./HImg";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { nextBirthday, turningAge, daysUntil } from "@/lib/dates";
import { formatFull } from "@/lib/format";
import { getStrings, localePath, type Locale } from "@/i18n";
import CopyButton from "./CopyButton";
import Motif from "./Motif";

// Purely decorative — loaded after hydration, only when a card is shown.
const Confetti = dynamic(() => import("./Confetti"), { ssr: false });

const THEMES = [
  { key: "hoa-hong", from: "#be123c", to: "#7c3aed" },
  { key: "hoang-hon", from: "#c2410c", to: "#e11d48" },
  { key: "dai-duong", from: "#0e7490", to: "#4f46e5" },
  { key: "rung-xanh", from: "#065f46", to: "#ca8a04" },
] as const;

type ThemeKey = (typeof THEMES)[number]["key"];

function parseDate(v: string | null): Date | null {
  if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  const [y, m, d] = v.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
    ? date
    : null;
}

export default function BirthdayCard({
  lqip,
  locale = "vi",
}: {
  lqip?: string;
  locale?: Locale;
}) {
  const t = getStrings(locale);
  const home = localePath(locale, "/birthday/");
  const params = useSearchParams();
  const router = useRouter();

  const name = (params.get("name") ?? "").trim().slice(0, 40);
  const birth = useMemo(() => parseDate(params.get("date")), [params]);
  const msg = (params.get("msg") ?? "").trim().slice(0, 200);
  const from = (params.get("from") ?? "").trim().slice(0, 40);
  const themeKey = (params.get("theme") ?? "hoa-hong") as ThemeKey;
  const theme = THEMES.find((t) => t.key === themeKey) ?? THEMES[0];

  const [fName, setFName] = useState("");
  const [fDate, setFDate] = useState("");
  const [fMsg, setFMsg] = useState("");
  const [fFrom, setFFrom] = useState("");
  const [fTheme, setFTheme] = useState<ThemeKey>("hoa-hong");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = fName.trim().slice(0, 40);
    if (!n) return setError(t.birthday.errName);
    if (!parseDate(fDate)) return setError(t.birthday.errDate);
    const q = new URLSearchParams({ name: n, date: fDate });
    if (fMsg.trim()) q.set("msg", fMsg.trim().slice(0, 200));
    if (fFrom.trim()) q.set("from", fFrom.trim().slice(0, 40));
    if (fTheme !== "hoa-hong") q.set("theme", fTheme);
    router.push(`${home}?${q.toString()}`);
  }

  async function share() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: t.birthday.shareTitle(name),
          text: t.birthday.shareText(name),
          url: window.location.href,
        });
        return;
      } catch {
        /* cancelled — copy instead */
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  if (name && birth) {
    const next = nextBirthday(birth);
    const age = turningAge(birth);
    const days = daysUntil(next);
    return (
      <div>
        <Confetti />
        <section
          aria-label={t.birthday.cardAria}
          className="relative overflow-hidden rounded-3xl px-6 py-16 text-center text-white shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
          }}
        >
          <HImg
            src="birthday/hero.webp"
            hero="birthday"
            lqip={lqip}
            tint={HERO_TINT.birthday}
            sizes="100vw"
            alt=""
            width={1920}
            height={1280}
            eager
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="dot-pattern absolute inset-0" aria-hidden="true" />
          <Motif
            name="balloon"
            className="floaty pointer-events-none absolute left-[7%] top-10 h-20 w-20 text-white/20 [--r:-10deg]"
          />
          <Motif
            name="heart"
            filled
            className="floaty-slow pointer-events-none absolute right-[8%] top-16 h-14 w-14 text-white/20"
          />
          <div className="relative">
            <p className="eyebrow text-white/75">{t.birthday.happyBirthday}</p>
            <h2 className="mt-4 font-display text-5xl font-black [overflow-wrap:anywhere] sm:text-6xl">
              {name}
            </h2>
            <p className="mt-5 text-lg text-white/90">
              {days === 0
                ? t.birthday.turnsToday(name, age)
                : t.birthday.turnsOn(age, formatFull(next, locale))}
            </p>
            {days > 0 && (
              <p className="mt-2 text-sm text-white/75">
                {t.birthday.daysLeft(days)}
              </p>
            )}
            {msg && (
              <blockquote className="glass mx-auto mt-9 max-w-xl rounded-2xl p-6 text-lg italic [overflow-wrap:anywhere]">
                “{msg}”
              </blockquote>
            )}
            {from && (
              <p className="mt-5 text-sm font-semibold text-white/80 [overflow-wrap:anywhere]">
                {t.birthday.fromSender(from)}
              </p>
            )}
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            type="button"
            onClick={share}
            className="min-h-11 rounded-full border border-[var(--color-line)] bg-[var(--color-card)] px-5 py-2.5 text-sm font-bold text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
          >
            <span aria-live="polite">
              {copied ? t.copy.copied : t.birthday.shareCard}
            </span>
          </button>
          <CopyButton text={shareUrl} label={t.birthday.copyLink} copiedLabel={t.copy.copied} />
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-full border border-[var(--color-line)] bg-[var(--color-card)] px-5 py-2.5 text-sm font-bold text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
          >
            {t.birthday.printCard}
          </button>
          <button
            type="button"
            onClick={() => router.push(home)}
            className="min-h-11 rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-[var(--color-on-brand)] hover:bg-[var(--color-brand-deep)]"
          >
            {t.birthday.makeAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="card mx-auto max-w-lg p-8"
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="bd-name"
            className="mb-1.5 block text-sm font-bold text-[var(--color-ink)]"
          >
            {t.birthday.nameLabel} <span aria-hidden="true" className="text-[var(--color-brand)]">*</span>
          </label>
          <input
            id="bd-name"
            type="text"
            required
            maxLength={40}
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-[var(--color-line)] px-4 py-2.5 text-base"
            autoComplete="off"
          />
        </div>
        <div>
          <label
            htmlFor="bd-date"
            className="mb-1.5 block text-sm font-bold text-[var(--color-ink)]"
          >
            {t.birthday.dateLabel} <span aria-hidden="true" className="text-[var(--color-brand)]">*</span>
          </label>
          <input
            id="bd-date"
            type="date"
            required
            value={fDate}
            onChange={(e) => setFDate(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-[var(--color-line)] px-4 py-2.5 text-base"
          />
        </div>
        <div>
          <label
            htmlFor="bd-msg"
            className="mb-1.5 block text-sm font-bold text-[var(--color-ink)]"
          >
            {t.birthday.msgLabel}
          </label>
          <textarea
            id="bd-msg"
            rows={3}
            maxLength={200}
            value={fMsg}
            onChange={(e) => setFMsg(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-line)] px-4 py-2.5 text-base"
          />
        </div>
        <div>
          <label
            htmlFor="bd-from"
            className="mb-1.5 block text-sm font-bold text-[var(--color-ink)]"
          >
            {t.birthday.fromLabel}
          </label>
          <input
            id="bd-from"
            type="text"
            maxLength={40}
            value={fFrom}
            onChange={(e) => setFFrom(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-[var(--color-line)] px-4 py-2.5 text-base"
            autoComplete="off"
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-bold text-[var(--color-ink)]">
            {t.birthday.themeLegend}
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {THEMES.map((th, i) => (
              <button
                key={th.key}
                type="button"
                aria-pressed={fTheme === th.key}
                onClick={() => setFTheme(th.key)}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border-2 px-2 py-2 text-xs font-bold transition-colors ${
                  fTheme === th.key
                    ? "border-[var(--color-brand)]"
                    : "border-[var(--color-line)] hover:border-[var(--color-faint)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-4 w-10 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${th.from}, ${th.to})`,
                  }}
                />
                {t.birthday.themes[i]}
              </button>
            ))}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="text-sm font-bold text-[var(--color-brand)]">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="min-h-12 w-full rounded-full bg-[var(--color-brand)] py-3 font-bold text-[var(--color-on-brand)] transition-colors hover:bg-[var(--color-brand-deep)]"
        >
          {t.birthday.submit}
        </button>
      </div>
    </form>
  );
}
