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

// Round 5: last flagged slots from the full-image audit.
const FIX = {
  "tet-nguyen-tieu/gallery5": ["đèn hoa đăng hội an", "vietnam lantern festival night", "đèn lồng rằm tháng giêng", "hội đèn lồng việt nam"],
  "tet-duong-lich/gallery3": ["giao thừa hà nội", "new year eve vietnam crowd", "đếm ngược năm mới việt nam"],
  "tet-duong-lich/gallery4": ["pháo hoa hồ gươm", "fireworks ho guom hanoi", "ha noi new year night"],
  "ngay-bao-chi/gallery6": ["nhà báo việt nam", "báo điện tử việt nam", "vietnam press conference", "họp báo việt nam"],
  "nguoi-cao-tuoi/gallery1": ["người già việt nam", "chăm sóc người cao tuổi việt nam", "cụ già việt nam gia đình"],
  "giai-phong-mien-nam/gallery2": ["sài gòn giải phóng 1975", "xe tăng dinh độc lập 1975", "thành phố hồ chí minh lễ hội"],
  "nha-giao-viet-nam/gallery6": ["sân trường việt nam học sinh", "trường học việt nam", "học sinh việt nam chào cờ"],
  "giang-sinh/gallery1": ["giáng sinh phố việt nam", "noel việt nam đường phố", "christmas hanoi street", "hang ma giang sinh"],
  "tet-thanh-minh/hero": ["tảo mộ việt nam", "nghĩa trang việt nam hoa", "thanh minh việt nam", "mộ phần việt nam"],
  "vu-lan/card": ["vu lan hoa hồng cài áo", "lễ vu lan báo hiếu việt nam", "bông hồng cài áo vu lan"],
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
