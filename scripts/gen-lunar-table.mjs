// Generates src/data/lunar-table.ts — a compact lookup of Vietnamese lunar
// month starts, replacing the ~300KB runtime lunar library on the client.
// For each lunar year we store: the solar day-of-year of month 1 day 1,
// a bitfield of month lengths (bit 1 = 30 days, bit 0 = 29), and the
// position of the leap month (0 when the year has none).
// Run via `npm run gen:lunar` (also part of prebuild). Requires lunar-typescript.
import { writeFileSync } from "node:fs";
import { LunarYear, Lunar } from "lunar-typescript";

const FIRST_YEAR = 1900;
const LAST_YEAR = 2100;

/** solar Date -> day-of-year within its calendar year (Jan 1 = 1). */
function dayOfYear(solar) {
  const d = new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
  return Math.round((d - new Date(d.getFullYear(), 0, 1)) / 86400000) + 1;
}

function yearEntry(lunarYear) {
  // Months whose day-1 falls inside solar year `lunarYear`, filtered to the
  // ones belonging to this lunar year, already in chronological order.
  const months = LunarYear.fromYear(lunarYear)
    .getMonths()
    .filter((m) => m.getYear() === lunarYear);
  if (months.length < 12 || months.length > 13) {
    throw new Error(`lunar year ${lunarYear}: unexpected ${months.length} months`);
  }
  let start = null;
  let bits = 0;
  let leapIndex = 0; // position (1-based) of the leap month in the sequence
  months.forEach((m, i) => {
    const first = Lunar.fromYmd(lunarYear, m.getMonth(), 1).getSolar();
    const doy =
      first.getYear() === lunarYear
        ? dayOfYear(first)
        : // Month starts in the next solar year (month 11/12 of the lunar year).
          dayOfYear(first) + daysInYear(lunarYear);
    if (i === 0) start = doy;
    if (m.getDayCount() === 30) bits |= 1 << i;
    if (m.getMonth() < 0) leapIndex = i + 1;
  });
  if (start === null || start < 15 || start > 60) {
    throw new Error(`lunar year ${lunarYear}: bad start doy ${start}`);
  }
  return `${start}:${bits}:${leapIndex}`;
}

function daysInYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 366 : 365;
}

const rows = [];
for (let y = FIRST_YEAR; y <= LAST_YEAR; y++) {
  rows.push(`  ${y}: "${yearEntry(y)}",`);
}

const body = `// GENERATED FILE — do not edit by hand. Regenerate with \`npm run gen:lunar\`.
// Compact Vietnamese lunisolar calendar, ${FIRST_YEAR}–${LAST_YEAR}.
// Format per lunar year: "<doyOfMonth1Day1>:<monthLengthBits>:<leapMonthPosition>".
//   - doyOfMonth1Day1: solar day-of-year (within the same-numbered Gregorian
//     year) of lunar month 1 day 1.
//   - monthLengthBits: bit i set = month i has 30 days, clear = 29.
//   - leapMonthPosition: 1-based index of the intercalary month (it repeats the
//     previous month number), 0 when absent.
// Month numbering in decoded form is 1..12 with the leap entry stored as the
// negative of its month number, matching lunar-typescript's convention.
export const LUNAR_TABLE: Record<number, string> = {
${rows.join("\n")}
};
`;

writeFileSync("src/data/lunar-table.ts", body, "utf8");
console.log(
  `wrote src/data/lunar-table.ts (${FIRST_YEAR}–${LAST_YEAR}, ${rows.length} years)`,
);
