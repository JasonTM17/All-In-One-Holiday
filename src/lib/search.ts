import type { Holiday } from "../data/holidays.js";

/** Normalize Vietnamese text for diacritic-insensitive matching. */
export function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

/** The minimal holiday shape the search index (and the palette) needs. */
export type Searchable = Pick<
  Holiday,
  "slug" | "name" | "dateMark" | "displayDate" | "tagline" | "wishes"
> & { theme: Pick<Holiday["theme"], "from" | "to"> };

export type SearchHit<T extends Searchable = Searchable> = {
  holiday: T;
  score: number;
  why: string;
};

/** Fuzzy-ish search: folded substring match on name, tagline, wishes. */
export function searchHolidays<T extends Searchable>(
  holidays: T[],
  query: string,
): SearchHit<T>[] {
  const q = fold(query);
  if (!q) return [];
  const hits: SearchHit<T>[] = [];
  for (const h of holidays) {
    let score = 0;
    let why = "";
    const name = fold(h.name);
    if (name === q) score = 100;
    else if (name.startsWith(q)) score = 80;
    else if (name.includes(q)) score = 60;
    else if (fold(h.tagline).includes(q)) score = 40;
    else {
      const wi = h.wishes.findIndex((w) => fold(w).includes(q));
      if (wi >= 0) {
        score = 25;
        why = "lời chúc";
      } else if (fold(h.displayDate).includes(q) || fold(h.dateMark.replace("·", "/")).includes(q)) {
        score = 30;
        why = "ngày";
      }
    }
    if (score > 0) hits.push({ holiday: h, score, why });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 8);
}
