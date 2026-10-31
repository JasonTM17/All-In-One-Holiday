// Build-time search index: writes the slim client-side corpus consumed by the
// command palette so the full holidays dataset stays server-only.
// Emits one index per locale (VI root + EN /en/).
import { writeFileSync } from "node:fs";
import { holidays } from "../src/data/holidays.js";
import { holidaysEn } from "../src/data/holidays-en.js";
import type { Holiday } from "../src/data/holidays.js";
import type { Searchable } from "../src/lib/search.js";

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

function emit(file: string, exportName: string, index: Searchable[]): void {
  const body = `// GENERATED FILE — do not edit by hand. Regenerate with \`npm run gen:data\`.
// Slim search corpus for the lazy command-palette chunk.
import type { Searchable } from "../lib/search.js";

export const ${exportName}: Searchable[] = ${JSON.stringify(index, null, 0)};
`;
  writeFileSync(file, body, "utf8");
  console.log(`wrote ${file} (${index.length} entries)`);
}

emit("src/data/search-index.ts", "searchIndex", build(holidays));
emit("src/data/search-index-en.ts", "searchIndexEn", build(holidaysEn));
