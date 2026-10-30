"use client";

import { useMemo, useState } from "react";
import { nextOccurrence, type DateRule } from "@/lib/dates";
import { formatFull } from "@/lib/format";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toIcsDate(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

function plusDays(d: Date, days: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + days);
  return c;
}

export default function HolidayActions({
  name,
  slug,
  displayDate,
  tagline,
  rule,
}: {
  name: string;
  slug: string;
  displayDate: string;
  tagline: string;
  rule: DateRule;
}) {
  const [copied, setCopied] = useState(false);

  const canShare = useMemo(
    () => typeof navigator !== "undefined" && "share" in navigator,
    [],
  );

  async function share() {
    const url = window.location.href;
    if (canShare) {
      try {
        await navigator.share({ title: name, text: tagline, url });
        return;
      } catch {
        /* user cancelled or share failed — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  function downloadIcs() {
    const next = nextOccurrence(rule);
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ngay Le Viet//Holidays//VI",
      "BEGIN:VEVENT",
      `UID:${slug}-${next.getFullYear()}@ngayleviet`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d+/g, "")}`,
      `DTSTART;VALUE=DATE:${toIcsDate(next)}`,
      `DTEND;VALUE=DATE:${toIcsDate(plusDays(next, 1))}`,
      `SUMMARY:${name}`,
      `DESCRIPTION:${name} — ${displayDate}. ${tagline}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={share}
        className="glass rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/25"
      >
        <span aria-live="polite">{copied ? "Đã sao chép liên kết" : "Chia sẻ"}</span>
      </button>
      <button
        type="button"
        onClick={downloadIcs}
        className="glass rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/25"
      >
        Thêm vào lịch
      </button>
      <span className="sr-only">
        Ngày lễ gần nhất: {formatFull(nextOccurrence(rule))}
      </span>
    </div>
  );
}
