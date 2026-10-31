// Entry point compiled by gen-api.mjs — writes public/api/holidays.json.
import { mkdirSync, writeFileSync } from "node:fs";
import { holidays } from "../src/data/holidays.js";
import { holidaysEn } from "../src/data/holidays-en.js";
import type { Holiday } from "../src/data/holidays.js";
import { nextOccurrence, occurrenceInYear } from "../src/lib/dates.js";

interface ApiHoliday {
  slug: string;
  locale: "vi" | "en";
  name: string;
  dateMark: string;
  displayDate: string;
  categories: string[];
  tagline: string;
  meaning: string;
  traditions: { title: string; text: string }[];
  wishes: string[];
  gifts: { title: string; text: string }[];
  rule: Holiday["rule"];
  /** ISO date of the upcoming occurrence from build time. */
  nextOccurrence: string;
  /** ISO date of the occurrence inside the given calendar year. */
  occurrenceThisYear: string;
}

const year = new Date().getFullYear();
const now = new Date();

function shape(list: Holiday[], locale: "vi" | "en"): ApiHoliday[] {
  return list.map((h) => ({
    slug: h.slug,
    locale,
    name: h.name,
    dateMark: h.dateMark,
    displayDate: h.displayDate,
    categories: h.categories,
    tagline: h.tagline,
    meaning: h.meaning,
    traditions: h.traditions,
    wishes: h.wishes,
    gifts: h.gifts,
    rule: h.rule,
    nextOccurrence: nextOccurrence(h.rule, now).toISOString().slice(0, 10),
    occurrenceThisYear: occurrenceInYear(h.rule, year).toISOString().slice(0, 10),
  }));
}

const payload = {
  generatedAt: now.toISOString(),
  locales: ["vi", "en"] as const,
  count: holidays.length,
  holidays: [...shape(holidays, "vi"), ...shape(holidaysEn, "en")],
};

mkdirSync("public/api", { recursive: true });
writeFileSync("public/api/holidays.json", JSON.stringify(payload, null, 1));
console.log(
  `wrote public/api/holidays.json (${payload.holidays.length} holidays ×2 locales)`,
);
