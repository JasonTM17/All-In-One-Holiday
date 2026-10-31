import { LUNAR_TABLE, QINGMING_TABLE } from "../data/lunar-table";

export type DateRule =
  | { type: "solar"; month: number; day: number }
  | { type: "lunar"; month: number; day: number }
  | { type: "nth-weekday"; month: number; weekday: number; nth: number }
  | { type: "qingming" };

function atMidnight(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Gregorian date of the nth weekday (0=Sunday) of a month. month is 1-based. */
export function nthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  nth: number,
): Date {
  const first = new Date(year, month - 1, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month - 1, 1 + offset + (nth - 1) * 7);
}

/* ---------- Lunar calendar (generated table, see scripts/gen-lunar-table.mjs) ---------- */

type LunarYearInfo = {
  /** Solar day-of-year (within the same-numbered year) of lunar month 1 day 1. */
  start: number;
  /** Cumulative day offsets of each month start relative to `start`. */
  offsets: number[];
  /** Month numbers in order; leap months are negative (lunar-typescript convention). */
  months: number[];
};

const lunarYearCache = new Map<number, LunarYearInfo>();

function daysInSolarYear(y: number): number {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 366 : 365;
}

/** Decode one `<start>:<lengthBits>:<leapPos>` table row into month start offsets. */
function lunarYearInfo(lunarYear: number): LunarYearInfo {
  let info = lunarYearCache.get(lunarYear);
  if (info) return info;
  const row = LUNAR_TABLE[lunarYear];
  if (!row) {
    throw new RangeError(
      `lunar year ${lunarYear} outside supported table range`,
    );
  }
  const [startStr, bitsStr, leapStr] = row.split(":");
  const start = Number(startStr);
  const bits = Number(bitsStr);
  const leapPos = Number(leapStr);
  // A lunar year has 13 months when it contains a leap month, else 12.
  const count = leapPos > 0 ? 13 : 12;
  const months: number[] = [];
  const offsets: number[] = [];
  let acc = 0;
  let next = 1;
  for (let i = 0; i < count; i++) {
    offsets.push(acc);
    acc += bits & (1 << i) ? 30 : 29;
    if (leapPos === i + 1) {
      months.push(-(i)); // leap month repeats the previous month number
    } else {
      months.push(next++);
    }
  }
  info = { start, offsets, months };
  lunarYearCache.set(lunarYear, info);
  return info;
}

function dayOfYear(d: Date): number {
  return (
    Math.round(
      (d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 86_400_000,
    ) + 1
  );
}

/** Convert a lunar date to a Gregorian Date via the Vietnamese/Chinese lunisolar calendar. */
export function lunarToSolar(
  lunarYear: number,
  lunarMonth: number,
  lunarDay: number,
): Date {
  const info = lunarYearInfo(lunarYear);
  const i = info.months.indexOf(lunarMonth);
  if (i < 0) {
    throw new RangeError(
      `lunar month ${lunarMonth} not found in lunar year ${lunarYear}`,
    );
  }
  // new Date(year, 0, n) rolls month-12/13 starts into January of year+1.
  return new Date(lunarYear, 0, info.start + info.offsets[i] + lunarDay - 1);
}

/** Convert a Gregorian date to its lunar month/day numbers. */
export function solarToLunar(d: Date): { month: number; day: number } {
  const y = d.getFullYear();
  const doy = dayOfYear(d);
  const info = lunarYearInfo(y);
  // Days before lunar month 1 still belong to the previous lunar year.
  let lunarYear = y;
  let offset = doy - info.start;
  if (offset < 0) {
    lunarYear = y - 1;
    const prev = lunarYearInfo(lunarYear);
    offset = doy + daysInSolarYear(lunarYear) - prev.start;
    for (let i = prev.offsets.length - 1; i >= 0; i--) {
      if (offset >= prev.offsets[i]) {
        return { month: prev.months[i], day: offset - prev.offsets[i] + 1 };
      }
    }
  }
  for (let i = info.offsets.length - 1; i >= 0; i--) {
    if (offset >= info.offsets[i]) {
      return { month: info.months[i], day: offset - info.offsets[i] + 1 };
    }
  }
  // Unreachable when the table covers the year.
  return { month: 0, day: 0 };
}

/** Solar date of the Qingming solar term (Tết Thanh minh) in a year. */
function qingmingInYear(year: number): Date {
  const doy = QINGMING_TABLE[year];
  if (!doy) {
    throw new RangeError(`Qingming year ${year} outside supported table range`);
  }
  return new Date(year, 0, doy);
}

/** Occurrence of a rule in a given calendar year (lunar year for lunar rules). */
export function occurrenceInYear(rule: DateRule, year: number): Date {
  switch (rule.type) {
    case "solar":
      return new Date(year, rule.month - 1, rule.day);
    case "lunar":
      return lunarToSolar(year, rule.month, rule.day);
    case "nth-weekday":
      return nthWeekdayOfMonth(year, rule.month, rule.weekday, rule.nth);
    case "qingming":
      return qingmingInYear(year);
  }
}

/**
 * Next occurrence of a recurring date on or after `from` (calendar-day precision).
 * If `from` is the holiday itself, that same day is returned.
 */
export function nextOccurrence(rule: DateRule, from: Date = new Date()): Date {
  const today = atMidnight(from);
  const year = from.getFullYear();
  for (const y of [year - 1, year, year + 1, year + 2]) {
    const occ = occurrenceInYear(rule, y);
    if (occ >= today) return occ;
  }
  return occurrenceInYear(rule, year + 3);
}

/** Whole calendar days from `from` (today at midnight) to `target`. */
export function daysUntil(target: Date, from: Date = new Date()): number {
  return Math.round((atMidnight(target).getTime() - atMidnight(from).getTime()) / 86_400_000);
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Next birthday on or after `from`. A Feb 29 birthdate is observed on Feb 28
 * in non-leap years. If today is the birthday, today is returned.
 */
export function nextBirthday(birth: Date, from: Date = new Date()): Date {
  const today = atMidnight(from);
  const m = birth.getMonth();
  const d = birth.getDate();
  for (const year of [from.getFullYear(), from.getFullYear() + 1]) {
    let day = d;
    if (m === 1 && d === 29 && !isLeapYear(year)) day = 28;
    const cand = new Date(year, m, day);
    if (cand >= today) return cand;
  }
  const year = from.getFullYear() + 2;
  return new Date(year, m, m === 1 && d === 29 && !isLeapYear(year) ? 28 : d);
}

/** Age the person turns on their next birthday after `from`. */
export function turningAge(birth: Date, from: Date = new Date()): number {
  return nextBirthday(birth, from).getFullYear() - birth.getFullYear();
}
