// Locale-aware data accessors. Kept separate from ./index so that client
// components importing getStrings() don't pull the full holiday/story
// datasets into the browser bundle — only server code should import this.
import { holidays as holidaysVi, getHoliday as getHolidayVi } from "@/data/holidays";
import { holidaysEn, getHolidayEn } from "@/data/holidays-en";
import { stories as storiesVi } from "@/data/stories";
import { storiesEn } from "@/data/stories-en";
import type { Holiday } from "@/data/holidays";
import type { StoryEntry } from "@/data/stories";
import type { Locale } from "./types";

/** Holiday list for a locale (same slugs, localized content). */
export function holidaysOf(locale: Locale): Holiday[] {
  return locale === "en" ? holidaysEn : holidaysVi;
}

export function holidayOf(slug: string, locale: Locale): Holiday | undefined {
  return locale === "en" ? getHolidayEn(slug) : getHolidayVi(slug);
}

/** Story map (slug -> entry) for a locale. */
export function storiesOf(locale: Locale): Record<string, StoryEntry> {
  return locale === "en" ? storiesEn : storiesVi;
}
