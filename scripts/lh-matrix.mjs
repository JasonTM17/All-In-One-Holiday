// Runs Lighthouse N times per page against the local static export and prints
// median/range per page. Usage: node scripts/lh-matrix.mjs [runs]
import { execFileSync } from "node:child_process";
import { readFileSync, mkdirSync } from "node:fs";

const PAGES = [
  ["home", ""],
  ["tet-nguyen-dan", "tet-nguyen-dan"],
  ["lich", "lich"],
  ["thiep", "thiep"],
  ["birthday", "birthday"],
];
const RUNS = Number(process.argv[2] || 6);
const BASE = "http://localhost:3200";
mkdirSync("screenshots/lh-final", { recursive: true });

const median = (a) => {
  const s = [...a].sort((x, y) => x - y);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};

for (const [name, path] of PAGES) {
  const scores = [], lcps = [], tbts = [];
  for (let i = 0; i < RUNS; i++) {
    const out = `screenshots/lh-final/${name}-${i}.json`;
    execFileSync(
      "npx",
      [
        "lighthouse", `${BASE}/${path}`,
        "--output=json", `--output-path=${out}`,
        '--chrome-flags=--headless --no-sandbox',
        "--quiet",
      ],
      { stdio: "ignore", shell: true },
    );
    const r = JSON.parse(readFileSync(out, "utf8"));
    const a = r.audits;
    const perf = Math.round(r.categories.performance.score * 100);
    const lcp = a["largest-contentful-paint"].numericValue / 1000;
    const tbt = a["total-blocking-time"].numericValue;
    scores.push(perf); lcps.push(lcp); tbts.push(tbt);
    console.log(`${name} #${i + 1}  perf=${perf}  lcp=${lcp.toFixed(1)}s  tbt=${Math.round(tbt)}ms`);
  }
  console.log(
    `>>> ${name}: median ${median(scores)} | range ${Math.min(...scores)}-${Math.max(...scores)} | LCP med ${median(lcps).toFixed(1)}s | TBT med ${Math.round(median(tbts))}ms\n`,
  );
}
