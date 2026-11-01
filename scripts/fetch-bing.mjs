// Stage Bing Images candidates filtered to Creative-Commons licenses
// (qft filterui:license-L2_L3_L4_L5_L6_L7) for slots Commons+Flickr
// could not fill. Writes staging-fix/<slug>__<stem>__c<n>.webp + manifest.
//   node scripts/fetch-bing.mjs
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const STAGE = "staging-fix";
const UA = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  "Accept-Language": "vi-VN,vi;q=0.9,en;q=0.8",
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Round 12: amThuc stems for the new ngay-tho page + two
// wrong-subject amThuc images (mango sticky rice, songpyeon).
const FIX = {
  "ngay-tho-viet-nam/amthuc-banh-troi": ["bánh trôi nước việt nam", "chè trôi nước", "banh troi nuoc"],
  "ngay-tho-viet-nam/amthuc-banh-com": ["bánh cốm hà nội", "banh com vietnam green rice", "cốm xanh hà nội"],
  "tet-nguyen-tieu/amthuc-xoi-che": ["xôi chè việt nam", "chè xôi nước nguyên tiêu", "xoi che vietnam dessert"],
  "tet-han-thuc/amthuc-banh-troi": ["bánh trôi tết hàn thực", "bánh trôi nước ngũ sắc", "banh troi vietnam"],
};

mkdirSync(STAGE, { recursive: true });
const manifestFile = join(STAGE, "manifest.json");
const manifest = existsSync(manifestFile) ? JSON.parse(readFileSync(manifestFile, "utf8")) : [];
const used = new Set(manifest.map((m) => m.photo));

async function searchBing(query) {
  const u =
    "https://www.bing.com/images/search?q=" +
    encodeURIComponent(query) +
    "&qft=+filterui:license-L2_L3_L4_L5_L6_L7+filterui:imagesize-large&count=35";
  const t = await (await fetch(u, { headers: UA })).text();
  const seen = new Set();
  return [...t.matchAll(/m="(\{[^"]+\})"/g)]
    .map((m) => {
      try { return JSON.parse(m[1].replace(/&quot;/g, '"')); } catch { return null; }
    })
    .filter(Boolean)
    .filter((x) => x.murl && !seen.has(x.murl) && seen.add(x.murl));
}

let staged = 0;
for (const [key, queries] of Object.entries(FIX)) {
  const [slug, stem] = key.split("/");
  const found = [];
  for (const q of queries) {
    if (found.length >= 5) break;
    await sleep(1200);
    let res;
    try { res = await searchBing(q); } catch (e) { console.log(`ERR ${key} "${q}": ${e.message}`); continue; }
    for (const it of res) {
      if (found.length >= 5) break;
      if (used.has(it.purl)) continue;
      // Download full image; fall back to Bing's cached thumb.
      let buf = null;
      for (const url of [it.murl, (it.turl || "").replace("&amp;", "&")]) {
        try {
          const img = await fetch(url, { headers: { ...UA, Referer: it.purl } });
          if (img.ok && (img.headers.get("content-type") || "").startsWith("image")) {
            buf = Buffer.from(await img.arrayBuffer());
            break;
          }
        } catch { /* next fallback */ }
      }
      if (!buf || buf.length < 20000) continue;
      let meta;
      try { meta = await sharp(buf).metadata(); } catch { continue; }
      if ((meta.width ?? 0) < 800) continue;
      used.add(it.purl);
      const n = manifest.filter((m) => m.slug === slug && m.stem === stem).length + 10;
      writeFileSync(join(STAGE, `${slug}__${stem}__c${n}.webp`), await sharp(buf).webp({ quality: 74 }).toBuffer());
      const host = (() => { try { return new URL(it.purl).hostname.replace(/^www\./, ""); } catch { return "web"; } })();
      manifest.push({
        slug, stem, cand: n,
        photo: it.purl,
        photographer: host,
        license: "CC (xem nguồn)",
        source: `Web (${host})`,
        alt: (it.desc || q).slice(0, 140),
      });
      found.push(it.murl);
      staged++;
      await sleep(350);
    }
  }
  console.log(`${key}: ${found.length}${found.length ? "" : "  <<<< NONE"}`);
}
writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
console.log(`staged ${staged} bing candidates`);
