import { describe, expect, it } from "vitest";
import { holidays } from "@/data/holidays";
import { buildIcs, eventLine, icsDate } from "@/lib/ics";
import { occurrenceInYear, solarToLunar } from "@/lib/dates";
import { fold, searchHolidays } from "@/lib/search";
import { makeWishes, tonesFor } from "@/lib/wishes-gen";
import { getStrings } from "@/i18n";

describe("diacritic-insensitive search", () => {
  it("folds Vietnamese diacritics", () => {
    expect(fold("Ngày Quốc Tế Phụ Nữ")).toBe("ngay quoc te phu nu");
    expect(fold("Đoan Ngọ")).toBe("doan ngo");
    expect(fold("Tết Nguyên Đán")).toBe("tet nguyen dan");
  });
  it("finds holidays without diacritics", () => {
    const hits = searchHolidays(holidays, "tet nguyen dan");
    expect(hits[0]?.holiday.slug).toBe("tet-nguyen-dan");
    expect(searchHolidays(holidays, "phu nu").length).toBeGreaterThan(1);
    expect(searchHolidays(holidays, "doan ngo")[0]?.holiday.slug).toBe("tet-doan-ngo");
  });
  it("matches wishes text too", () => {
    const hits = searchHolidays(holidays, "bep lua am");
    expect(hits.length).toBeGreaterThan(0);
  });
  it("empty query returns nothing", () => {
    expect(searchHolidays(holidays, "")).toEqual([]);
  });
});

describe("ics generation", () => {
  const y = new Date().getFullYear();
  const ics = buildIcs(holidays, [y, y + 1, y + 2]);

  it("is a valid VCALENDAR document", () => {
    expect(ics.startsWith("BEGIN:VCALENDAR")).toBe(true);
    expect(ics.trimEnd().endsWith("END:VCALENDAR")).toBe(true);
    expect(ics).toContain("VERSION:2.0");
    expect(ics).toContain("PRODID:");
  });
  it("emits one event per holiday per year", () => {
    const events = ics.split("BEGIN:VEVENT").length - 1;
    expect(events).toBe(holidays.length * 3);
  });
  it("has unique UIDs", () => {
    const uids = [...ics.matchAll(/UID:(\S+)/g)].map((m) => m[1]);
    expect(new Set(uids).size).toBe(uids.length);
  });
  it("dates match occurrenceInYear", () => {
    const tet = holidays.find((h) => h.slug === "tet-nguyen-dan")!;
    const d = occurrenceInYear(tet.rule, y);
    expect(ics).toContain(`DTSTART;VALUE=DATE:${icsDate(d)}`);
    expect(ics).toContain(`UID:tet-nguyen-dan-${y}@ngayleviet`);
  });
  it("event line escapes commas", () => {
    const h = { ...holidays[0], name: "A, B", tagline: "x;y" };
    const line = eventLine(h, new Date(2030, 0, 1));
    expect(line).toContain("A\\, B");
    expect(line).toContain("x\\;y");
  });
});

describe("lunar calendar helpers", () => {
  it("solarToLunar round-trips a lunar holiday", () => {
    const tet = holidays.find((h) => h.slug === "tet-nguyen-dan")!;
    const solar = occurrenceInYear(tet.rule, 2026);
    const lunar = solarToLunar(solar);
    expect(lunar.month).toBe(1);
    expect(lunar.day).toBe(1);
  });
  it("every new holiday resolves a date this year", () => {
    const y = new Date().getFullYear();
    for (const slug of [
      "ong-cong-ong-tao",
      "tet-han-thuc",
      "tet-doan-ngo",
      "ngay-thay-thuoc",
      "ngay-bao-chi",
      "nguoi-cao-tuoi",
      "doanh-nhan",
    ]) {
      const h = holidays.find((x) => x.slug === slug)!;
      const d = occurrenceInYear(h.rule, y);
      // Lunar-year rules can land in the next Gregorian year (e.g. 23/12 ÂL → Feb of y+1).
      expect(d.getFullYear(), slug).toBeGreaterThanOrEqual(y);
      expect(d.getFullYear(), slug).toBeLessThanOrEqual(y + 1);
    }
  });
});

describe("wish generator", () => {
  const tet = holidays.find((h) => h.slug === "tet-nguyen-dan")!;
  const me = holidays.find((h) => h.slug === "ngay-cua-me")!;
  const wishGen = getStrings("vi").wishGen;

  it("relevant tone subsets per holiday", () => {
    expect(tonesFor(me)).toContain("gui-me");
    expect(tonesFor(tet)).not.toContain("gui-me");
    expect(tonesFor(tet)).toContain("trong");
    expect(tonesFor(tet)).toContain("vui");
  });
  it("produces personalized wishes", () => {
    const ws = makeWishes(tet, "trong", "Lan", "cô", wishGen);
    expect(ws.length).toBeGreaterThanOrEqual(2);
    expect(ws[0]).toContain("Lan");
    expect(ws[0]).toContain("Tết Nguyên Đán");
  });
  it("falls back when name empty", () => {
    const ws = makeWishes(tet, "vui", "", "", wishGen);
    expect(ws[0].length).toBeGreaterThan(20);
  });
});
