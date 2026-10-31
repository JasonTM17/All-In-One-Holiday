// Entry point compiled by gen-feed.mjs — writes public/feed.xml.
// Atom 1.0 feed listing every holiday page; titles and summaries are
// bilingual (VI name · EN name) so one feed serves both locales.
import { writeFileSync } from "node:fs";
import { holidays } from "../src/data/holidays.js";
import { holidaysEn } from "../src/data/holidays-en.js";
import { nextOccurrence, occurrenceInYear } from "../src/lib/dates.js";

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ngayleviet.vn").replace(
  /\/$/,
  "",
);
const now = new Date();
const iso = now.toISOString();
const year = now.getFullYear();

const esc = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const fmt = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

const enBySlug = new Map(holidaysEn.map((h) => [h.slug, h]));

const entries = holidays
  .map((h) => {
    const en = enBySlug.get(h.slug);
    const enName = en?.name ?? h.name;
    const enDate = en?.displayDate ?? h.displayDate;
    const enTagline = en?.tagline ?? "";
    const next = fmt(nextOccurrence(h.rule, now));
    const thisYear = fmt(occurrenceInYear(h.rule, year));
    return `  <entry>
    <title>${esc(`${h.name} — ${enName}`)}</title>
    <link rel="alternate" hreflang="vi" href="${site}/${h.slug}/"/>
    <link rel="alternate" hreflang="en" href="${site}/en/${h.slug}/"/>
    <id>${site}/${h.slug}/</id>
    <updated>${iso}</updated>
    <summary type="text">${esc(`${h.name} (${h.displayDate}, ${thisYear}): ${h.tagline} — ${enName} (${enDate}): ${enTagline} Next: ${next}`)}</summary>
${h.categories.map((c) => `    <category term="${esc(c)}" />`).join("\n")}
  </entry>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="vi">
  <title>Ngày Lễ Việt — Vietnamese &amp; international holiday calendar</title>
  <subtitle>Nguồn gốc, phong tục, lời chúc và đếm ngược cho mọi ngày lễ — origins, traditions, wishes and countdowns for every holiday.</subtitle>
  <link href="${site}/"/>
  <link rel="self" type="application/atom+xml" href="${site}/feed.xml"/>
  <id>${site}/</id>
  <updated>${iso}</updated>
  <author><name>Ngày Lễ Việt</name></author>
  <icon>${site}/icon-192.png</icon>
${entries}
</feed>
`;

writeFileSync("public/feed.xml", xml);
console.log(`wrote public/feed.xml (${holidays.length} entries)`);
