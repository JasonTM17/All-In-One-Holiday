// Build-time search index: writes the slim client-side corpus consumed by the
// command palette so the full holidays dataset stays server-only.
// Emits one index per locale (VI root + EN /en/).
import { writeFileSync } from "node:fs";
import { holidays } from "../src/data/holidays.js";
import { holidaysEn } from "../src/data/holidays-en.js";
import type { Holiday } from "../src/data/holidays.js";
import type { Searchable } from "../src/lib/search.js";
import { getStrings, type Locale } from "../src/i18n/index.js";

function build(list: Holiday[]): Searchable[] {
  return list.map((h) => ({
    slug: h.slug,
    name: h.name,
    dateMark: h.dateMark,
    displayDate: h.displayDate,
    tagline: h.tagline,
    wishes: h.wishes,
    theme: { from: h.theme.from, to: h.theme.to },
  }));
}

/** Tool routes join the index so "lich", "thiep"… also surface pages. */
function tools(locale: Locale): Searchable[] {
  const t = getStrings(locale);
  const theme = { from: "#334155", to: "#64748b" };
  const rows: [string, string, string][] = [
    ["lich", t.calendar.h1, t.calendar.metaDescription],
    ["hom-nay", t.today.h1, t.today.metaDescription],
    ["thiep", t.thiep.h1, t.thiep.metaDescription],
    ["birthday", t.birthday.h1, t.birthday.metaDescription],
  ];
  const toolChip = t.today.eyebrow; // shared "Công cụ"/"Tool" label across tool pages
  return rows.map(([slug, name, tagline]) => ({
    slug,
    name,
    dateMark: "",
    displayDate: toolChip,
    tagline,
    wishes: [],
    theme,
  }));
}

function emit(file: string, exportName: string, index: Searchable[]): void {
  const body = `// GENERATED FILE — do not edit by hand. Regenerate with \`npm run gen:data\`.
// Slim search corpus for the lazy command-palette chunk.
import type { Searchable } from "../lib/search.js";

export const ${exportName}: Searchable[] = ${JSON.stringify(index, null, 0)};
`;
  writeFileSync(file, body, "utf8");
  console.log(`wrote ${file} (${index.length} entries)`);
}

emit("src/data/search-index.ts", "searchIndex", [...build(holidays), ...tools("vi")]);
emit("src/data/search-index-en.ts", "searchIndexEn", [...build(holidaysEn), ...tools("en")]);
