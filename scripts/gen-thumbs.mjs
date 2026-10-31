// Derivative generator:
//  • writes 480w variants of card.webp / galleryN.webp (grids serve a
//    right-sized image via srcset instead of the full 960px file), each in
//    both webp and avif so <picture> can offer avif first
//  • writes every hero-<w> ladder rung that is SMALLER than the source
//    hero.webp (never wider — a `w` descriptor must never lie), in webp
//    and avif, plus hero.avif at full source width
//  • emits src/data/hero-sizes.ts with each slug's real source width
//  • emits src/data/hero-lqip.ts with a 20px base64 webp placeholder and a
//    dominant-color tint per hero (inlined behind eager hero <img>s)
// Idempotent: missing or wrong-size files are (re)written.
// Run: node scripts/gen-thumbs.mjs
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DIR = "public/images/holidays";
const THUMB_W = 480;
const HERO_WIDTHS = [480, 800, 1200, 1600];
const WEBP_HERO_Q = 78;
const WEBP_THUMB_Q = 80;
const AVIF_Q = 45;
const LQIP_W = 20;
const LQIP_Q = 35;

let written = 0;
const heroSizes = {};
const lqip = {};
const tint = {};

const hex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");

async function widthOf(path) {
  const m = await sharp(readFileSync(path)).metadata();
  return m.width;
}

// Re-encode `buf` into `dst` at width `w` unless dst already exists at w.
async function derive(buf, dst, w, format, quality) {
  if (existsSync(dst) && (await widthOf(dst)) === w) return;
  await sharp(buf)
    .resize(w, null, { withoutEnlargement: true })
    [format]({ quality })
    .toFile(dst);
  written++;
}

for (const slug of readdirSync(DIR)) {
  const dir = join(DIR, slug);
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) continue;

  // ---- card / gallery thumbs ----
  for (const base of [
    "card",
    "gallery1",
    "gallery2",
    "gallery3",
    "gallery4",
    "gallery5",
    "gallery6",
  ]) {
    const src = join(dir, `${base}.webp`);
    if (!existsSync(src)) continue;
    const buf = readFileSync(src);
    const { width: srcW } = await sharp(buf).metadata();
    const w = Math.min(THUMB_W, srcW);
    const webp480 = join(dir, `${base}-${THUMB_W}.webp`);
    const avif480 = join(dir, `${base}-${THUMB_W}.avif`);
    const avifFull = join(dir, `${base}.avif`);
    if (!existsSync(webp480)) {
      await sharp(buf)
        .resize(w, null, { withoutEnlargement: true })
        .webp({ quality: WEBP_THUMB_Q })
        .toFile(webp480);
      written++;
    }
    if (!existsSync(avif480)) {
      await sharp(buf)
        .resize(w, null, { withoutEnlargement: true })
        .avif({ quality: AVIF_Q })
        .toFile(avif480);
      written++;
    }
    if (!existsSync(avifFull)) {
      await sharp(buf).avif({ quality: AVIF_Q }).toFile(avifFull);
      written++;
    }
  }

  // ---- deep-section photos (amthuc-*, phongtuc-*) ----
  // Any extra 4:3 photo stem gets the same -480 webp/avif + full avif twins.
  for (const f of readdirSync(dir)) {
    const m = f.match(/^(amthuc|phongtuc)-.+\.webp$/);
    if (!m || f.endsWith(`-${THUMB_W}.webp`)) continue;
    const base = f.replace(/\.webp$/, "");
    const src = join(dir, f);
    const buf = readFileSync(src);
    const webp480 = join(dir, `${base}-${THUMB_W}.webp`);
    const avif480 = join(dir, `${base}-${THUMB_W}.avif`);
    const avifFull = join(dir, `${base}.avif`);
    if (!existsSync(webp480)) {
      await sharp(buf)
        .resize(THUMB_W, null, { withoutEnlargement: true })
        .webp({ quality: WEBP_THUMB_Q })
        .toFile(webp480);
      written++;
    }
    if (!existsSync(avif480)) {
      await sharp(buf)
        .resize(THUMB_W, null, { withoutEnlargement: true })
        .avif({ quality: AVIF_Q })
        .toFile(avif480);
      written++;
    }
    if (!existsSync(avifFull)) {
      await sharp(buf).avif({ quality: AVIF_Q }).toFile(avifFull);
      written++;
    }
  }

  // ---- hero ladder ----
  const hero = join(dir, "hero.webp");
  if (existsSync(hero)) {
    const buf = readFileSync(hero);
    const { width: srcW } = await sharp(buf).metadata();
    heroSizes[slug] = srcW;

    // Inline placeholder + dominant tint for eager hero images.
    const tiny = await sharp(buf)
      .resize(LQIP_W, null, { withoutEnlargement: true })
      .webp({ quality: LQIP_Q })
      .toBuffer();
    lqip[slug] = `data:image/webp;base64,${tiny.toString("base64")}`;
    const stats = await sharp(buf).stats();
    const d = stats.dominant ?? { r: 24, g: 24, b: 27 };
    tint[slug] = `#${hex(d.r)}${hex(d.g)}${hex(d.b)}`;

    // Rungs smaller than the source (hero-{w}); the source itself is the top rung.
    for (const w of HERO_WIDTHS) {
      if (w >= srcW) continue;
      await derive(buf, join(dir, `hero-${w}.webp`), w, "webp", WEBP_HERO_Q);
      await derive(buf, join(dir, `hero-${w}.avif`), w, "avif", AVIF_Q);
    }
    // hero.avif is the full-width avif twin of hero.webp.
    const avifFull = join(dir, "hero.avif");
    if (!existsSync(avifFull)) {
      await sharp(buf).avif({ quality: AVIF_Q }).toFile(avifFull);
      written++;
    }
  }
}

const ts =
  `// GENERATED by scripts/gen-thumbs.mjs — real pixel width of each\n` +
  `// holiday's hero.webp source. Used to build honest srcset ladders.\n` +
  `export const HERO_SRC_W: Record<string, number> = ${JSON.stringify(heroSizes, null, 2)};\n\n` +
  `// GENERATED by scripts/gen-thumbs.mjs — dominant color of each hero,\n` +
  `// used as a plain CSS placeholder behind client components (cheap\n` +
  `// alternative to the base64 LQIP, which stays server-side).\n` +
  `export const HERO_TINT: Record<string, string> = ${JSON.stringify(tint, null, 2)};\n`;
writeFileSync("src/data/hero-sizes.ts", ts);

const tsLqip =
  `// GENERATED by scripts/gen-thumbs.mjs — ~20px base64 webp placeholders\n` +
  `// painted behind eager hero <img>s until the real file decodes.\n` +
  `// Server components only: importing this into a client bundle ships\n` +
  `// every holiday's placeholder (~15KB) — pass a single entry as a prop.\n` +
  `export const HERO_LQIP: Record<string, string> = ${JSON.stringify(lqip, null, 2)};\n`;
writeFileSync("src/data/hero-lqip.ts", tsLqip);

console.log(
  `gen-thumbs: wrote ${written} derivative files + hero-sizes.ts + hero-lqip.ts`,
);
