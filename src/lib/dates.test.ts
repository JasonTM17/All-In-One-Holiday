import { describe, expect, it } from "vitest";
import {
  daysUntil,
  nextBirthday,
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
