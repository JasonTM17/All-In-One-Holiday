// Verify external story links respond 2xx. Not part of CI (network required).
// Checks both Vietnamese and English story sources.
// 403/429 from sites that bot-block scrapers (e.g. Britannica) are reported as
// BLOCKED warnings, not failures — verify those manually in a real browser.
// Usage: npm run check:links
import { stories } from "../src/data/stories.ts";
import { storiesEn } from "../src/data/stories-en.ts";

const urls = new Set();
for (const map of [stories, storiesEn]) {
  for (const list of Object.values(map)) {
    for (const s of list.sources) urls.add(s.url);
  }
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

let fail = 0;
const blocked = [];
for (const url of urls) {
  try {
    const r = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(15000),
    });
    if (r.status === 403 || r.status === 429) {
      blocked.push(url);
      console.log(`BLOCKED ${r.status} ${url}`);
    } else {
      const ok = r.status < 400;
      if (!ok) fail++;
      console.log(`${ok ? "OK " : "FAIL"} ${r.status} ${url}`);
    }
  } catch (e) {
    fail++;
    console.log(`FAIL ERR ${url} (${e.message.slice(0, 60)})`);
  }
}
console.log(
  `\n${urls.size} links checked, ${fail} failed, ${blocked.length} bot-blocked`,
);
if (blocked.length) {
  console.log("Bot-blocked (verify manually):");
  for (const u of blocked) console.log(`  ${u}`);
}
process.exit(fail ? 1 : 0);
