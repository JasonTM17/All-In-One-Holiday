// Stage Flickr CC-licensed candidates (license=4,5,9,10 → CC BY/BY-SA/CC0/PDM)
// by scraping the public search page, for stems Commons could not cover.
// Writes staging-fix/<slug>__<stem>__f<n>.webp + appends manifest entries.
//   node scripts/fetch-flickr.mjs
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const STAGE = "staging-fix";
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// slug/stem -> queries (Vietnamese-first where possible).
// Round 2: only slots still weak after the first promotion pass.
const FIX = {
  "ngay-bao-chi/gallery3": ["phóng viên việt nam", "vietnam journalist camera", "sạp báo hà nội", "báo chí"],
  "tet-duong-lich/gallery6": ["pháo hoa", "fireworks vietnam", "danang fireworks", "new year countdown fireworks"],
  "trung-thu/hero": ["đèn lồng trung thu", "mid autumn festival vietnam", "trung thu lantern street", "múa lân trung thu"],
  "trung-thu/gallery4": ["đèn ông sao", "vietnam star lantern", "trung thu children lantern"],
  "quoc-khanh/gallery4": ["cờ đỏ sao vàng", "vietnam flag crowd", "ba dinh hanoi", "vietnam national day"],
  "ngay-cua-me/gallery5": ["mẹ và con việt nam", "vietnam mother child", "vietnamese mother baby"],
  "ngay-gia-dinh-viet-nam/hero": ["gia đình sum họp", "vietnamese family dinner", "family meal vietnam"],
  "quoc-te-thieu-nhi/gallery6": ["trẻ em vui chơi", "vietnam children school", "kids laughing vietnam"],
  "nguoi-cao-tuoi/gallery6": ["vietnam grandparents", "cụ già hạnh phúc", "old couple vietnam smiling"],
};

mkdirSync(STAGE, { recursive: true });
const manifestFile = join(STAGE, "manifest.json");
const manifest = existsSync(manifestFile) ? JSON.parse(readFileSync(manifestFile, "utf8")) : [];
const used = new Set(manifest.map((m) => m.photo));

async function searchFlickr(query) {
  const u = `https://www.flickr.com/search/?license=4%2C5%2C9%2C10&text=${encodeURIComponent(query)}`;
  const t = await (await fetch(u, { headers: UA })).text();
  const out = [];
  for (const m of t.matchAll(/live\.staticflickr\.com\/(\d+)\/(\d+)_([0-9a-f]+)_([a-z])\.jpg/g)) {
    out.push({ server: m[1], id: m[2], secret: m[3] });
  }
  // dedupe keep order
  const seen = new Set();
  return out.filter((p) => !seen.has(p.id) && seen.add(p.id));
}

async function licenseOf(id) {
  try {
    const r = await fetch(`https://www.flickr.com/photo.gne?id=${id}`, { headers: UA, redirect: "follow" });
    const t = await r.text();
    const lic = t.match(/creativecommons\.org\/(licenses|publicdomain)\/([a-z-]+)\/([\d.]+)?/i);
    const page = r.url.split("?")[0];
    const title = (t.match(/<meta property="og:title" content="([^"]+)"/) || [])[1] || "Flickr photo";
    const author = (t.match(/"ownername":"([^"]+)"/) || t.match(/<a[^>]+class="[^"]*owner-name[^"]*"[^>]*>([^<]+)</) || [])[1] || "Flickr user";
    return { license: lic ? (lic[1] === "publicdomain" ? "CC0/PDM" : `CC ${lic[2].toUpperCase()} ${lic[3] ?? "2.0"}`) : "CC (xem nguồn)", page, title, author };
  } catch {
    return { license: "CC (xem nguồn)", page: `https://www.flickr.com/photo.gne?id=${id}`, title: "Flickr photo", author: "Flickr user" };
  }
}

let staged = 0;
for (const [key, queries] of Object.entries(FIX)) {
  const [slug, stem] = key.split("/");
  const want = stem === "hero" ? "h" : "b"; // h=1600 b=1024
  const found = [];
  for (const q of queries) {
    if (found.length >= 3) break;
    await sleep(1500);
    let res;
    try { res = await searchFlickr(q); } catch (e) { console.log(`ERR ${key} "${q}": ${e.message}`); continue; }
    for (const p of res) {
      if (found.length >= 3) break;
      const url = `https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}_${want}.jpg`;
      if (used.has(p.id)) continue;
      const img = await fetch(url, { headers: UA });
      if (!img.ok) continue;
      const buf = Buffer.from(await img.arrayBuffer());
      const meta = await sharp(buf).metadata();
      if ((meta.width ?? 0) < 800) continue;
      used.add(p.id);
      const n = manifest.filter((m) => m.slug === slug && m.stem === stem).length + 10;
      writeFileSync(join(STAGE, `${slug}__${stem}__c${n}.webp`), await sharp(buf).webp({ quality: 74 }).toBuffer());
      manifest.push({
        slug, stem, cand: n, flickrId: p.id,
        photo: `https://www.flickr.com/photo.gne?id=${p.id}`,
        photographer: "Flickr user",
        license: "CC (xem nguồn)",
        source: "Flickr",
        alt: q,
      });
      found.push(p.id);
      staged++;
      await sleep(400);
    }
  }
  console.log(`${key}: ${found.length}${found.length ? "" : "  <<<< NONE"}`);
}
writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
console.log(`staged ${staged} flickr candidates`);

// Resolve real license/author for staged flickr entries (photo-page fetch, only new ones).
const need = manifest.filter((m) => m.flickrId && m.license === "CC (xem nguồn)");
for (const m of need) {
  await sleep(1200);
  const info = await licenseOf(m.flickrId);
  m.license = info.license;
  m.photo = info.page;
  m.title = info.title;
  m.photographer = info.author;
}
writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
console.log(`licenses resolved for ${need.length} entries`);
