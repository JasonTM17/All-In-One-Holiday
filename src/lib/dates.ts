import { Lunar } from "lunar-typescript";

export type DateRule =
  | { type: "solar"; month: number; day: number }
  | { type: "lunar"; month: number; day: number }
  | { type: "nth-weekday"; month: number; weekday: number; nth: number };

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

/** Convert a lunar date to a Gregorian Date via the Vietnamese/Chinese lunisolar calendar. */
export function lunarToSolar(
  lunarYear: number,
  lunarMonth: number,
  lunarDay: number,
): Date {
  const solar = Lunar.fromYmd(lunarYear, lunarMonth, lunarDay).getSolar();
  return new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
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
