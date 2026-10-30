"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { nextBirthday, turningAge, daysUntil } from "@/lib/dates";
import { formatFull } from "@/lib/format";
import Confetti from "./Confetti";
import CopyButton from "./CopyButton";

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

  const name = (params.get("name") ?? "").trim().slice(0, 60);
  const birth = useMemo(() => parseDate(params.get("date")), [params]);
  const msg = (params.get("msg") ?? "").trim().slice(0, 300);
  const from = (params.get("from") ?? "").trim().slice(0, 60);

  const [fName, setFName] = useState("");
  const [fDate, setFDate] = useState("");
  const [fMsg, setFMsg] = useState("");
  const [fFrom, setFFrom] = useState("");
  const [error, setError] = useState("");

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!fName.trim()) return setError("Vui lòng nhập tên.");
    if (!parseDate(fDate)) return setError("Vui lòng chọn ngày sinh hợp lệ.");
    const q = new URLSearchParams({ name: fName.trim(), date: fDate });
    if (fMsg.trim()) q.set("msg", fMsg.trim());
    if (fFrom.trim()) q.set("from", fFrom.trim());
    router.push(`/birthday/?${q.toString()}`);
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
          className="dot-pattern rounded-3xl px-6 py-14 text-center text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #be123c, #7c3aed)",
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
            Sinh nhật vui vẻ
          </p>
          <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl">
            {name}
          </h1>
          <p className="mt-4 text-lg text-white/90">
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
            <blockquote className="mx-auto mt-8 max-w-xl rounded-2xl bg-white/15 p-6 text-lg italic backdrop-blur-sm">
              “{msg}”
            </blockquote>
          )}
          {from && (
            <p className="mt-4 text-sm font-semibold text-white/80">
              — Gửi từ {from}
            </p>
          )}
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <CopyButton text={shareUrl} label="Sao chép liên kết" />
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-semibold text-stone-700 hover:border-rose-400 hover:text-rose-800"
          >
            In thiệp
          </button>
          <button
            type="button"
            onClick={() => router.push("/birthday/")}
            className="rounded-lg bg-rose-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-rose-800"
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
      className="mx-auto max-w-lg rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="bd-name"
            className="mb-1 block text-sm font-semibold text-stone-700"
          >
            Tên người nhận <span aria-hidden="true" className="text-rose-700">*</span>
          </label>
          <input
            id="bd-name"
            type="text"
            required
            maxLength={60}
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2"
            autoComplete="off"
          />
        </div>
        <div>
          <label
            htmlFor="bd-date"
            className="mb-1 block text-sm font-semibold text-stone-700"
          >
            Ngày sinh <span aria-hidden="true" className="text-rose-700">*</span>
          </label>
          <input
            id="bd-date"
            type="date"
            required
            value={fDate}
            onChange={(e) => setFDate(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div>
          <label
            htmlFor="bd-msg"
            className="mb-1 block text-sm font-semibold text-stone-700"
          >
            Lời nhắn
          </label>
          <textarea
            id="bd-msg"
            rows={3}
            maxLength={300}
            value={fMsg}
            onChange={(e) => setFMsg(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2"
          />
        </div>
        <div>
          <label
            htmlFor="bd-from"
            className="mb-1 block text-sm font-semibold text-stone-700"
          >
            Người gửi
          </label>
          <input
            id="bd-from"
            type="text"
            maxLength={60}
            value={fFrom}
            onChange={(e) => setFFrom(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2"
            autoComplete="off"
          />
        </div>
        {error && (
          <p role="alert" className="text-sm font-medium text-rose-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-full bg-rose-700 py-3 font-semibold text-white transition-colors hover:bg-rose-800"
        >
          Tạo thiệp
        </button>
      </div>
    </form>
  );
}
