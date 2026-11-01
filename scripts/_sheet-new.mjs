// Contact sheets for newly staged candidates of the 3 new holidays.
// Usage: node scripts/_sheet-new.mjs [slugFilter]
import { readdirSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const STAGE = "staging-fix";
const OUT = join(STAGE, "_sheets");
mkdirSync(OUT, { recursive: true });
const filter = process.argv[2];
const manifest = JSON.parse(readFileSync(join(STAGE, "manifest.json"), "utf8"));

const groups = {};
for (const m of manifest) {
  if (filter && m.slug !== filter) continue;
  if (!["ngay-doan-thanh-nien", "ngay-tho-viet-nam", "quoc-te-nam-gioi", "tet-nguyen-tieu", "tet-han-thuc"].includes(m.slug)) continue;
  const key = `${m.slug}/${m.stem}`;
  (groups[key] ??= []).push(m);
}

const TW = 220, TH = 150, COLS = 5;
for (const [key, cands] of Object.entries(groups)) {
  const rows = Math.ceil(cands.length / COLS);
  const cells = [];
  for (let i = 0; i < cands.length; i++) {
    const f = join(STAGE, `${cands[i].slug}__${cands[i].stem}__c${cands[i].cand}.webp`);
    try {
      const img = await sharp(f).resize(TW, TH - 24, { fit: "cover" }).extend({ bottom: 24, background: "#111" }).toBuffer();
      const label = Buffer.from(
        `<svg width="${TW}" height="${TH}"><rect width="100%" height="100%" fill="none"/><text x="6" y="${TH - 7}" font-size="13" fill="#fff" font-family="sans-serif">c${cands[i].cand}</text></svg>`
      );
      cells.push(await sharp(img).composite([{ input: label }]).webp({ quality: 70 }).toBuffer());
    } catch { /* skip */ }
  }
  if (!cells.length) continue;
  const W = COLS * TW, H = Math.ceil(cells.length / COLS) * TH;
  const composites = cells.map((buf, i) => ({ input: buf, left: (i % COLS) * TW, top: Math.floor(i / COLS) * TH }));
  const out = join(OUT, `${key.replace("/", "__")}.webp`);
  await sharp({ create: { width: W, height: H, channels: 3, background: "#000" } }).composite(composites).webp({ quality: 72 }).toFile(out);
  console.log(out, `(${cells.length})`);
}
