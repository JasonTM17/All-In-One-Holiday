// Verify external story links respond 2xx. Not part of CI (network required).
// Usage: npm run check:links
import { stories } from "../src/data/stories.ts";

const urls = new Set();
for (const list of Object.values(stories)) {
  for (const s of list.sources) urls.add(s.url);
}

let fail = 0;
for (const url of urls) {
  try {
    const r = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 link-check" },
      signal: AbortSignal.timeout(15000),
    });
    const ok = r.status < 400;
    if (!ok) fail++;
    console.log(`${ok ? "OK " : "FAIL"} ${r.status} ${url}`);
  } catch (e) {
    fail++;
    console.log(`FAIL ERR ${url} (${e.message.slice(0, 60)})`);
  }
}
console.log(`\n${urls.size} links checked, ${fail} failed`);
process.exit(fail ? 1 : 0);
