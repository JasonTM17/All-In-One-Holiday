// Build-time search index: writes the slim client-side corpus consumed by the
// command palette so the full holidays dataset stays server-only.
import { writeFileSync } from "node:fs";
import { holidays } from "../src/data/holidays.js";
import type { Searchable } from "../src/lib/search.js";

const index: Searchable[] = holidays.map((h) => ({
  slug: h.slug,
  name: h.name,
  dateMark: h.dateMark,
  displayDate: h.displayDate,
  tagline: h.tagline,
  wishes: h.wishes,
  theme: { from: h.theme.from, to: h.theme.to },
}));

const body = `// GENERATED FILE — do not edit by hand. Regenerate with \`npm run gen:data\`.
// Slim search corpus for the lazy command-palette chunk.
import type { Searchable } from "../lib/search.js";

export const searchIndex: Searchable[] = ${JSON.stringify(index, null, 0)};
`;

writeFileSync("src/data/search-index.ts", body, "utf8");
console.log(`wrote src/data/search-index.ts (${index.length} entries)`);
