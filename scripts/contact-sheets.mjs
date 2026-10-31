// Build labeled contact sheets of all downloaded images for curation.
// Usage: node scripts/contact-sheets.mjs [srcDir] [dstSuffix]
// Defaults to public/images/holidays -> screenshots/contact.
// For staged candidates: node scripts/contact-sheets.mjs staging stage
import { readdirSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const OUT = process.argv[2] ?? "public/images/holidays";
const DST = join("screenshots/contact", process.argv[3] ?? "");
if (!existsSync(DST)) mkdirSync(DST, { recursive: true });

const COLS = 4, TW = 340, TH = 227, LH = 24;
const cells = [];
for (const slug of readdirSync(OUT)) {
  const d = join(OUT, slug);
  if (!existsSync(d)) continue;
  for (const f of readdirSync(d).filter((x) => x.endsWith(".webp")).sort()) {
    cells.push({ slug, file: f, path: join(d, f) });
  }
}

const sheets = Math.ceil(cells.length / (COLS * 5));
for (let s = 0; s < sheets; s++) {
  const batch = cells.slice(s * COLS * 5, (s + 1) * COLS * 5);
  const composites = [];
  for (let i = 0; i < batch.length; i++) {
    const { slug, file, path } = batch[i];
    const col = i % COLS, row = Math.floor(i / COLS);
    const x = col * TW, y = row * (TH + LH);
    const thumb = await sharp(path).resize(TW, TH, { fit: "cover" }).webp({ quality: 70 }).toBuffer();
    composites.push({ input: thumb, left: x, top: y });
    const label = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="${LH}"><rect width="100%" height="100%" fill="#222"/><text x="6" y="17" font-family="sans-serif" font-size="13" fill="#fff">${slug}/${file.replace(".webp", "")}</text></svg>`,
    );
    composites.push({ input: label, left: x, top: y + TH });
  }
  const W = COLS * TW, H = 5 * (TH + LH);
  await sharp({ create: { width: W, height: H, channels: 3, background: "#111" } })
    .composite(composites)
    .jpeg({ quality: 82 })
    .toFile(join(DST, `sheet-${s}.jpg`));
  console.log(`sheet-${s}.jpg  ${batch.length} images`);
}
