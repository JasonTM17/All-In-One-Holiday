// Build-time Atom feed: compiles the needed TS chain to .feed-tmp, runs it.
// Emits public/feed.xml (Atom 1.0, bilingual titles) — same pattern as
// scripts/gen-api.mjs.
import { execFileSync } from "node:child_process";
import {
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tscCli = join(root, "node_modules", "typescript", "bin", "tsc");

execFileSync(
  process.execPath,
  [
    tscCli,
    "scripts/gen-feed-entry.ts",
    "src/lib/dates.ts",
    "src/data/holidays.ts",
    "src/data/holidays-en.ts",
    "src/data/lunar-table.ts",
    "--outDir",
    ".feed-tmp",
    "--module",
    "esnext",
    "--target",
    "es2020",
    "--moduleResolution",
    "bundler",
    "--skipLibCheck",
  ],
  { cwd: root, stdio: "inherit" },
);

// Emitted ES modules keep their specifiers verbatim; append ".js" to
// extensionless relative imports so Node ESM can resolve them.
function fixSpecifiers(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      fixSpecifiers(p);
    } else if (name.endsWith(".js")) {
      const s = readFileSync(p, "utf8");
      const fixed = s.replace(
        /from "(\.[^"]*?)"/g,
        (m, spec) => (/\.(js|json)$/.test(spec) ? m : `from "${spec}.js"`),
      );
      if (fixed !== s) writeFileSync(p, fixed);
    }
  }
}
fixSpecifiers(join(root, ".feed-tmp"));

execFileSync(process.execPath, [".feed-tmp/scripts/gen-feed-entry.js"], {
  cwd: root,
  stdio: "inherit",
});
rmSync(".feed-tmp", { recursive: true, force: true });
