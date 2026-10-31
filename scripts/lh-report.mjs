// Summarize a Lighthouse JSON report: scores, web vitals, JS cost audits.
// Usage: node scripts/lh-report.cjs <report.json>
import { readFileSync } from "node:fs";
const r = JSON.parse(readFileSync(process.argv[2], "utf8"));
const a = r.audits;
const cat = r.categories;
console.log(
  "PERF", Math.round(cat.performance.score * 100),
  "A11Y", Math.round(cat.accessibility.score * 100),
  "BP", Math.round(cat["best-practices"].score * 100),
  "SEO", Math.round(cat.seo.score * 100),
);
for (const k of [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "speed-index",
  "interactive",
  "server-response-time",
])
  console.log(" ", k, a[k]?.displayValue, "|score", a[k]?.score);
console.log("--- mainthread ---");
a["mainthread-work-breakdown"]?.details?.items?.forEach((i) =>
  console.log(" ", i.groupLabel, Math.round(i.duration) + "ms"),
);
console.log("--- unused-js ---", a["unused-javascript"]?.displayValue);
a["unused-javascript"]?.details?.items?.forEach((i) =>
  console.log(
    " ",
    (i.url || "").split("/").pop() || i.url,
    Math.round(i.wastedBytes / 1024) + "KB wasted of",
    Math.round(i.totalBytes / 1024) + "KB",
  ),
);
console.log("--- bootup ---");
a["bootup-time"]?.details?.items?.forEach((i) =>
  console.log(
    " ",
    (i.url || "").split("/").pop(),
    "total",
    Math.round(i.total),
    "eval",
    Math.round(i.scripting),
    "parse",
    Math.round(i.scriptParseCompile),
  ),
);
console.log("--- total bytes ---", a["total-byte-weight"]?.displayValue);
console.log("--- third-party ---");
a["third-party-summary"]?.details?.items?.forEach((i) =>
  console.log(
    " ",
    i.entity?.text || i.url,
    Math.round(i.mainThreadTime) + "ms",
    Math.round(i.transferSize / 1024) + "KB",
  ),
);
console.log("--- lcp element ---");
a["largest-contentful-paint-element"]?.details?.items?.forEach((it) =>
  (it.items || []).forEach((x) =>
    console.log(" ", x.phase || "", x.timing ?? "", x.node?.snippet || ""),
  ),
);
console.log("--- failing audits (score<1, applicable) ---");
for (const k of Object.keys(a)) {
  const v = a[k];
  if (
    typeof v.score === "number" &&
    v.score < 1 &&
    v.scoreDisplayMode !== "notApplicable" &&
    v.scoreDisplayMode !== "manual" &&
    v.scoreDisplayMode !== "informative"
  ) {
    console.log(" ", k, "=>", v.score, "-", v.title);
    (v.details?.items || []).slice(0, 4).forEach((i) =>
      console.log(
        "    *",
        i.node?.snippet ||
          i.url ||
          i.source?.url ||
          JSON.stringify(i).slice(0, 160),
      ),
    );
  }
}
