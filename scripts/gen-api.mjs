// Build-time JSON API: emits public/api/holidays.json — the bilingual holiday
// corpus as flat JSON for third-party consumers (no build needed to read it).
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tscCli = join(root, "node_modules", "typescript", "bin", "tsc");

execFileSync(
  process.execPath,
  [
    tscCli,
    "scripts/gen-api-entry.ts",
    "src/data/holidays.ts",
    "src/data/holidays-en.ts",
    "src/data/lunar-table.ts",
    "src/lib/dates.ts",
    "--outDir",
    ".api-tmp",
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
import { readdirSync, statSync } from "node:fs";
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
fixSpecifiers(join(root, ".api-tmp"));

execFileSync(process.execPath, [".api-tmp/scripts/gen-api-entry.js"], {
  cwd: root,
  stdio: "inherit",
});
rmSync(".api-tmp", { recursive: true, force: true });
