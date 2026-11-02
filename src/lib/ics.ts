import type { Holiday } from "../data/holidays.js";
import { occurrenceInYear } from "./dates.js";

/** YYYYMMDD for ICS DATE values (all-day events, no time). */
export function icsDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

/** Build one VEVENT for a holiday occurrence. */
export function eventLine(h: Holiday, d: Date): string {
  const uid = `${h.slug}-${d.getFullYear()}@ngayleviet`;
  const next = new Date(d);
  next.setDate(next.getDate() + 1);
  return [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${icsDate(new Date())}T000000Z`,
    `DTSTART;VALUE=DATE:${icsDate(d)}`,
    `DTEND;VALUE=DATE:${icsDate(next)}`,
    `SUMMARY:${esc(h.name)}`,
    `DESCRIPTION:${esc(h.tagline)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:-P1D",
    `DESCRIPTION:${esc(h.name)}`,
    "END:VALARM",
    "END:VEVENT",
  ].join("\r\n");
}

/** Full VCALENDAR for all holidays across the given years. */
export function buildIcs(holidays: Holiday[], years: number[]): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NgayLeViet//Lich Ngay Le Viet//VI",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Ngày Lễ Việt",
    "X-WR-TIMEZONE:Asia/Ho_Chi_Minh",
  ];
  for (const h of holidays) {
    for (const y of years) {
      const d = occurrenceInYear(h.rule, y);
      if (d) lines.push(eventLine(h, d));
    }
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
