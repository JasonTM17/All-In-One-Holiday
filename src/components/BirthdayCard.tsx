"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { nextBirthday, turningAge, daysUntil } from "@/lib/dates";
import { formatFull } from "@/lib/format";
import Confetti from "./Confetti";
import CopyButton from "./CopyButton";
import Motif from "./Motif";

const THEMES = [
  { key: "hoa-hong", label: "Hoa hồng", from: "#be123c", to: "#7c3aed" },
  { key: "hoang-hon", label: "Hoàng hôn", from: "#c2410c", to: "#e11d48" },
  { key: "dai-duong", label: "Đại dương", from: "#0e7490", to: "#4f46e5" },
  { key: "rung-xanh", label: "Rừng xanh", from: "#065f46", to: "#ca8a04" },
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

export default function BirthdayCard() {
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
    if (!n) return setError("Vui lòng nhập tên.");
    if (!parseDate(fDate)) return setError("Vui lòng chọn ngày sinh hợp lệ.");
    const q = new URLSearchParams({ name: n, date: fDate });
    if (fMsg.trim()) q.set("msg", fMsg.trim().slice(0, 200));
    if (fFrom.trim()) q.set("from", fFrom.trim().slice(0, 40));
    if (fTheme !== "hoa-hong") q.set("theme", fTheme);
    router.push(`/birthday/?${q.toString()}`);
  }

  async function share() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: `Sinh nhật ${name}`,
          text: `Thiệp sinh nhật dành cho ${name}`,
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
          aria-label="Thiệp sinh nhật"
          className="relative overflow-hidden rounded-3xl px-6 py-16 text-center text-white shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
          }}
        >
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
            <p className="eyebrow text-white/75">Sinh nhật vui vẻ</p>
            <h2 className="mt-4 font-display text-5xl font-black [overflow-wrap:anywhere] sm:text-6xl">
              {name}
            </h2>
            <p className="mt-5 text-lg text-white/90">
              {days === 0
                ? `Hôm nay ${name} tròn ${age} tuổi!`
                : `Sắp bước sang tuổi ${age} — ${formatFull(next)}`}
            </p>
            {days > 0 && (
              <p className="mt-2 text-sm text-white/75">
                Còn {days} ngày nữa đến sinh nhật.
              </p>
            )}
            {msg && (
              <blockquote className="glass mx-auto mt-9 max-w-xl rounded-2xl p-6 text-lg italic [overflow-wrap:anywhere]">
                “{msg}”
              </blockquote>
            )}
            {from && (
              <p className="mt-5 text-sm font-semibold text-white/80 [overflow-wrap:anywhere]">
                — Gửi từ {from}
              </p>
            )}
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            type="button"
            onClick={share}
            className="min-h-11 rounded-full border border-[var(--color-line)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
          >
            <span aria-live="polite">
              {copied ? "Đã sao chép liên kết" : "Chia sẻ thiệp"}
            </span>
          </button>
          <CopyButton text={shareUrl} label="Sao chép liên kết" />
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-full border border-[var(--color-line)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
          >
            In thiệp
          </button>
          <button
            type="button"
            onClick={() => router.push("/birthday/")}
            className="min-h-11 rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:bg-[var(--color-brand-deep)]"
          >
            Tạo thiệp khác
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
            Tên người nhận <span aria-hidden="true" className="text-[var(--color-brand)]">*</span>
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
            Ngày sinh <span aria-hidden="true" className="text-[var(--color-brand)]">*</span>
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
            Lời nhắn
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
            Người gửi
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
            Chủ đề thiệp
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {THEMES.map((t) => (
              <button
                key={t.key}
                type="button"
                aria-pressed={fTheme === t.key}
                onClick={() => setFTheme(t.key)}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border-2 px-2 py-2 text-xs font-bold transition-colors ${
                  fTheme === t.key
                    ? "border-[var(--color-brand)]"
                    : "border-[var(--color-line)] hover:border-stone-300"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-4 w-10 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${t.from}, ${t.to})`,
                  }}
                />
                {t.label}
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
          className="min-h-12 w-full rounded-full bg-[var(--color-brand)] py-3 font-bold text-white transition-colors hover:bg-[var(--color-brand-deep)]"
        >
          Tạo thiệp
        </button>
      </div>
    </form>
  );
}
