// Build-time ICS generation: compiles the needed TS chain to .ics-tmp, runs it.
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
    "scripts/gen-ics-entry.ts",
    "scripts/gen-search-entry.ts",
    "src/lib/dates.ts",
    "src/lib/ics.ts",
    "src/lib/search.ts",
    "src/data/holidays.ts",
    "src/data/lunar-table.ts",
    "--outDir",
    ".ics-tmp",
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
fixSpecifiers(join(root, ".ics-tmp"));

execFileSync(process.execPath, [".ics-tmp/scripts/gen-ics-entry.js"], {
  cwd: root,
  stdio: "inherit",
});
execFileSync(process.execPath, [".ics-tmp/scripts/gen-search-entry.js"], {
  cwd: root,
  stdio: "inherit",
});
rmSync(".ics-tmp", { recursive: true, force: true });

// PWA icons from the SVG app icon (devDep sharp).
const { default: sharp } = await import("sharp");
const svg = readFileSync("src/app/icon.svg");
for (const [size, name, pad] of [
  [192, "icon-192.png", 0],
  [512, "icon-512.png", 0],
  [512, "icon-512-maskable.png", 64],
]) {
  const base = sharp(svg, { density: 384 }).resize(size - pad * 2, size - pad * 2);
  const img = pad
    ? base.extend({ top: pad, bottom: pad, left: pad, right: pad, background: "#be123c" })
    : base;
  await img.png().toFile(`public/${name}`);
}
console.log("wrote PWA icons");
