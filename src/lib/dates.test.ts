import { describe, expect, it } from "vitest";
import {
  daysUntil,
  lunarDayExists,
  nextBirthday,
  nextLunarBirthday,
  nextOccurrence,
  nthWeekdayOfMonth,
  turningAge,
  type DateRule,
} from "./dates";

const D = (y: number, m: number, d: number) => new Date(y, m - 1, d);

const MOTHERS_DAY: DateRule = { type: "nth-weekday", month: 5, weekday: 0, nth: 2 };
const NEW_YEAR: DateRule = { type: "solar", month: 1, day: 1 };
const VU_LAN: DateRule = { type: "lunar", month: 7, day: 15 };
const TET: DateRule = { type: "lunar", month: 1, day: 1 };
const GIO_TO: DateRule = { type: "lunar", month: 3, day: 10 };

describe("nthWeekdayOfMonth", () => {
  it("2nd Sunday of May 2026 is May 10", () => {
    expect(nthWeekdayOfMonth(2026, 5, 0, 2)).toEqual(D(2026, 5, 10));
  });
  it("2nd Sunday of May 2027 is May 9", () => {
    expect(nthWeekdayOfMonth(2027, 5, 0, 2)).toEqual(D(2027, 5, 9));
  });
});

describe("nextOccurrence — solar", () => {
  it("returns same year when date is ahead", () => {
    expect(nextOccurrence(NEW_YEAR, D(2026, 6, 15))).toEqual(D(2027, 1, 1));
  });
  it("returns today when today is the holiday", () => {
    expect(nextOccurrence(NEW_YEAR, D(2026, 1, 1))).toEqual(D(2026, 1, 1));
  });
  it("rolls to next year after the date passes", () => {
    expect(nextOccurrence(NEW_YEAR, D(2026, 1, 2))).toEqual(D(2027, 1, 1));
  });
});

describe("nextOccurrence — lunar", () => {
  it("Tết 2027 falls on Feb 6 2027", () => {
    expect(nextOccurrence(TET, D(2026, 3, 1))).toEqual(D(2027, 2, 6));
  });
  it("Giỗ Tổ 2026 falls on Apr 26 2026", () => {
    expect(nextOccurrence(GIO_TO, D(2026, 1, 10))).toEqual(D(2026, 4, 26));
  });
  it("Vu Lan 2026 falls on Aug 27 2026", () => {
    expect(nextOccurrence(VU_LAN, D(2026, 1, 1))).toEqual(D(2026, 8, 27));
  });
});

describe("lunar table parity with lunar-typescript", () => {
  it("every lunar month-1 day-1 matches, 1900–2100", async () => {
    const { Lunar, LunarYear } = await import("lunar-typescript");
    const { lunarToSolar } = await import("./dates");
    for (let y = 1900; y <= 2100; y++) {
      const months = LunarYear.fromYear(y)
        .getMonths()
        .filter((m) => m.getYear() === y)
        .map((m) => m.getMonth());
      for (const m of months) {
        const lib = Lunar.fromYmd(y, m, 1).getSolar();
        const mine = lunarToSolar(y, m, 1);
        expect(
          `${mine.getFullYear()}-${mine.getMonth() + 1}-${mine.getDate()}`,
          `lunar ${y}/${m}/1`,
        ).toBe(`${lib.getYear()}-${lib.getMonth()}-${lib.getDay()}`);
      }
    }
  });
  it("solarToLunar matches for a sample of days incl. leap months", async () => {
    const { Solar } = await import("lunar-typescript");
    const { solarToLunar } = await import("./dates");
    // Every 37th day over 51 years — crosses Tết boundaries and leap months.
    for (
      let t = Date.UTC(1980, 0, 1);
      t < Date.UTC(2031, 0, 1);
      t += 37 * 86400000
    ) {
      const d = new Date(t);
      const lib = Solar.fromYmd(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
      ).getLunar();
      const mine = solarToLunar(d);
      expect(
        `${mine.month}/${mine.day}`,
        `solar ${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
      ).toBe(`${lib.getMonth()}/${lib.getDay()}`);
    }
  });
});

describe("nextOccurrence — Mother's Day", () => {
  it("next Mother's Day after Jan 1 2026 is May 10 2026", () => {
    expect(nextOccurrence(MOTHERS_DAY, D(2026, 1, 1))).toEqual(D(2026, 5, 10));
  });
  it("rolls to 2027 after May 10 2026", () => {
    expect(nextOccurrence(MOTHERS_DAY, D(2026, 5, 11))).toEqual(D(2027, 5, 9));
  });
});

describe("daysUntil", () => {
  it("counts calendar days", () => {
    expect(daysUntil(D(2026, 1, 11), D(2026, 1, 1))).toBe(10);
    expect(daysUntil(D(2026, 1, 1), D(2026, 1, 1))).toBe(0);
  });
});

describe("nextBirthday", () => {
  it("today is the birthday", () => {
    expect(nextBirthday(D(2000, 5, 10), D(2026, 5, 10))).toEqual(D(2026, 5, 10));
  });
  it("next year when this year's birthday passed", () => {
    expect(nextBirthday(D(2000, 5, 10), D(2026, 5, 11))).toEqual(D(2027, 5, 10));
  });
  it("Feb 29 birthday observed Feb 28 in non-leap years", () => {
    expect(nextBirthday(D(2000, 2, 29), D(2026, 3, 1))).toEqual(D(2027, 2, 28));
  });
  it("Feb 29 birthday falls Feb 29 in leap years", () => {
    expect(nextBirthday(D(2000, 2, 29), D(2027, 3, 1))).toEqual(D(2028, 2, 29));
  });
});

describe("turningAge", () => {
  it("age at next birthday", () => {
    expect(turningAge(D(2000, 5, 10), D(2026, 1, 1))).toBe(26);
    expect(turningAge(D(2000, 5, 10), D(2026, 5, 10))).toBe(26);
  });
});

describe("nextLunarBirthday", () => {
  it("converts the next lunar 15/8 occurrence to the same Gregorian date as lunar-typescript", async () => {
    const { Lunar } = await import("lunar-typescript");
    const res = nextLunarBirthday(8, 15, D(2026, 1, 1));
    expect(res).not.toBeNull();
    const lib = Lunar.fromYmd(res!.lunarYear, 8, 15).getSolar();
    expect(res!.date).toEqual(
      D(lib.getYear(), lib.getMonth(), lib.getDay()),
    );
    // 15/8 âm 2026 already passed by Nov 2026 → must roll to lunar 2027.
    const res2 = nextLunarBirthday(8, 15, D(2026, 11, 1));
    expect(res2!.lunarYear).toBe(2027);
  });

  it("samples across months match lunar-typescript conversions", async () => {
    const { Lunar } = await import("lunar-typescript");
    for (const [m, d] of [
      [1, 1],
      [2, 29],
      [5, 5],
      [7, 15],
      [12, 23],
    ] as const) {
      const res = nextLunarBirthday(m, d, D(2026, 2, 20));
      expect(res, `lunar ${m}/${d}`).not.toBeNull();
      const lib = Lunar.fromYmd(res!.lunarYear, m, d).getSolar();
      expect(res!.date, `lunar ${m}/${d} of year ${res!.lunarYear}`).toEqual(
        D(lib.getYear(), lib.getMonth(), lib.getDay()),
      );
    }
  });

  it("today's lunar birthday returns today", async () => {
    const { Solar } = await import("lunar-typescript");
    const today = D(2026, 6, 15);
    const l = Solar.fromYmd(2026, 6, 15).getLunar();
    const res = nextLunarBirthday(l.getMonth(), l.getDay(), today);
    expect(res!.date).toEqual(today);
  });

  it("uses the regular month, not the leap month, in leap years", async () => {
    const { Lunar } = await import("lunar-typescript");
    // 2025 has a leap month 6 — a 6/X birthday must land on the regular one.
    const res = nextLunarBirthday(6, 1, D(2025, 1, 15));
    expect(res!.lunarYear).toBe(2025);
    const regular = Lunar.fromYmd(2025, 6, 1).getSolar();
    const leap = Lunar.fromYmd(2025, -6, 1).getSolar();
    expect(res!.date).toEqual(
      D(regular.getYear(), regular.getMonth(), regular.getDay()),
    );
    expect(res!.date).not.toEqual(
      D(leap.getYear(), leap.getMonth(), leap.getDay()),
    );
  });

  it("skips years where the lunar date doesn't exist (the lunar Feb-29)", async () => {
    const { lunarToSolar } = await import("./dates");
    // Find a month that has only 29 days in some year of this decade.
    let missing: { y: number; m: number } | null = null;
    for (let y = 2024; y <= 2032 && !missing; y++) {
      for (let m = 1; m <= 12; m++) {
        if (!lunarDayExists(y, m, 30)) missing = { y, m };
      }
    }
    expect(missing, "expected some 29-day month in 2024–2032").not.toBeNull();
    // Anchor `from` at the start of the 29-day month itself: the 30th-day
    // birthday has no occurrence in that lunar year, so it must skip ahead.
    const from = lunarToSolar(missing!.y, missing!.m, 1);
    const res = nextLunarBirthday(missing!.m, 30, from);
    expect(res).not.toBeNull();
    expect(res!.lunarYear).toBeGreaterThan(missing!.y);
    expect(lunarDayExists(res!.lunarYear, missing!.m, 30)).toBe(true);
  });

  it("a 30th-day birthday always lands on a year where day 30 exists", () => {
    for (let m = 1; m <= 12; m++) {
      const res = nextLunarBirthday(m, 30, D(2026, 10, 31));
      expect(res, `month ${m}`).not.toBeNull();
      expect(lunarDayExists(res!.lunarYear, m, 30), `month ${m}`).toBe(true);
    }
  });

  it("rejects out-of-range input", () => {
    expect(nextLunarBirthday(0, 15)).toBeNull();
    expect(nextLunarBirthday(13, 15)).toBeNull();
    expect(nextLunarBirthday(8, 0)).toBeNull();
    expect(nextLunarBirthday(8, 31)).toBeNull();
    expect(nextLunarBirthday(2.5, 10)).toBeNull();
  });

  it("lunarDayExists bounds checks", () => {
    expect(lunarDayExists(2026, 1, 1)).toBe(true);
    expect(lunarDayExists(2026, 1, 30)).toBe(
      // month 1 of lunar 2026 has 30 days in the generated table
      true,
    );
    expect(lunarDayExists(2026, 13, 1)).toBe(false);
    expect(lunarDayExists(2026, 1, 0)).toBe(false);
    expect(lunarDayExists(1850, 1, 1)).toBe(false); // outside table range
  });
});
