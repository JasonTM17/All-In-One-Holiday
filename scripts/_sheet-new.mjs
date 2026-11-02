// Contact sheets for this round's staged candidates (last 5 per slot).
// Usage: node scripts/_sheet-new.mjs
import { readdirSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const STAGE = "staging-fix";
const OUT = join(STAGE, "_sheets");
mkdirSync(OUT, { recursive: true });
const manifest = JSON.parse(readFileSync(join(STAGE, "manifest.json"), "utf8"));

const SLOTS = [
  "quoc-te-nam-gioi/hero","quoc-te-nam-gioi/card","quoc-te-nam-gioi/gallery4","quoc-te-nam-gioi/gallery5","quoc-te-nam-gioi/gallery6","quoc-te-nam-gioi/history",
  "ngay-sach-viet-nam/hero","ngay-sach-viet-nam/card","ngay-sach-viet-nam/gallery2","ngay-sach-viet-nam/gallery3","ngay-sach-viet-nam/gallery4","ngay-sach-viet-nam/gallery5","ngay-sach-viet-nam/gallery6",
  "ngay-tho-viet-nam/gallery1","ngay-tho-viet-nam/gallery5","ngay-tho-viet-nam/gallery6",
  "tet-han-thuc/hero","tet-han-thuc/gallery3","tet-han-thuc/gallery6","tet-han-thuc/history","tet-han-thuc/amthuc-mam-cung",
  "tet-doan-ngo/card","tet-doan-ngo/amthuc-com-ruou",
  "ngay-the-thao-viet-nam/gallery1","ngay-the-thao-viet-nam/gallery4",
  "vu-lan/gallery4","vu-lan/history",
  "ngay-doan-thanh-nien/history","ngay-doan-thanh-nien/gallery2",
];

const groups = {};
for (const m of manifest) {
  const key = `${m.slug}/${m.stem}`;
  if (!SLOTS.includes(key)) continue;
  (groups[key] ??= []).push(m);
}
// keep only the last 5 candidates per slot (this round)
for (const k of Object.keys(groups)) groups[k] = groups[k].slice(-5);

const TW = 220, TH = 150, COLS = 5;
for (const key of SLOTS) {
  const cands = groups[key];
  if (!cands?.length) { console.log(`${key}: NO CANDS`); continue; }
  const cells = [];
  for (const c of cands) {
    const f = join(STAGE, `${c.slug}__${c.stem}__c${c.cand}.webp`);
    try {
      const img = await sharp(f).resize(TW, TH - 24, { fit: "cover" }).extend({ bottom: 24, background: "#111" }).toBuffer();
      const label = Buffer.from(
        `<svg width="${TW}" height="${TH}"><rect width="100%" height="100%" fill="none"/><text x="6" y="${TH - 7}" font-size="13" fill="#fff" font-family="sans-serif">c${c.cand}</text></svg>`
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
