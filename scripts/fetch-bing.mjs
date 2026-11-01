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

// Round 8: wrong-subject galleries found in the alt-text audit.
const FIX = {
  "nguoi-cao-tuoi/gallery2": ["người già việt nam mỉm cười", "cụ bà việt nam tuổi cao", "người cao tuổi việt nam gia đình"],
  "nguoi-cao-tuoi/gallery3": ["chúc thọ người già việt nam", "mừng thọ cụ ông cụ bà", "đại gia đình việt nam quây quần"],
  "nguoi-cao-tuoi/gallery4": ["người già tập dưỡng sinh công viên", "cụ già việt nam thể dục buổi sáng", "elderly vietnam park"],
  "tet-han-thuc/gallery6": ["bánh trôi nước tết hàn thực", "chè trôi nước tàu", "bánh chay ngọt việt nam"],
  "quan-doi-nhan-dan/gallery4": ["diễu binh quân đội việt nam", "vietnam military parade", "quân đội nhân dân duyệt binh"],
  "nha-giao-viet-nam/gallery5": ["thầy cô giáo việt nam lớp học", "giáo viên việt nam dạy học", "học sinh việt nam chào cờ"],
  "nha-giao-viet-nam/gallery6": ["lớp học việt nam học sinh", "cô giáo và học sinh việt nam", "ngày nhà giáo việt nam tặng hoa"],
  "giang-sinh/gallery4": ["giáng sinh nhà thờ việt nam đêm", "christmas church vietnam", "nhà thờ đức bà giáng sinh"],
  "giang-sinh/gallery6": ["phố hàng mã giáng sinh", "noel trang trí việt nam", "cây thông noel việt nam"],
  "valentine/gallery6": ["couple vietnam valentine", "đôi tình nhân việt nam", "ngày valentine quà tặng"],
  "ngay-bao-chi/gallery4": ["nhà báo việt nam tác nghiệp", "vietnam journalist interview", "báo chí việt nam phóng viên"],
  "ngay-the-thao-viet-nam/gallery4": ["đội tuyển bóng đá nữ việt nam", "vietnam women football team", "nữ cầu thủ việt nam áo đỏ"],
  "ngay-phap-luat-viet-nam/gallery3": ["tòa án nhân dân việt nam", "vietnam court trial", "thẩm phán việt nam"],
  // Round 9: hero/card slots with foreign subjects found in credit audit.
  "nguoi-cao-tuoi/hero": ["người cao tuổi việt nam gia đình", "cụ ông cụ bà việt nam", "elderly vietnamese grandparents"],
  "nguoi-cao-tuoi/card": ["mừng thọ người già việt nam", "chúc thọ cụ bà", "kính lão việt nam"],
  "ngay-the-thao-viet-nam/hero": ["vận động viên việt nam thi đấu", "vietnam athletes competition", "điền kinh việt nam chạy"],
  "ngay-the-thao-viet-nam/gallery5": ["vovinam việt nam thi đấu", "võ thuật việt nam", "tập võ vovinam"],
  "ngay-the-thao-viet-nam/gallery6": ["thể dục buổi sáng bờ hồ hà nội", "morning exercise hanoi lake", "chạy bộ hồ gươm"],
  "ngay-bao-chi/hero": ["phóng viên báo chí việt nam tác nghiệp", "vietnam press reporters", "nhà báo việt nam camera"],
  "ngay-bao-chi/card": ["tòa soạn báo việt nam", "vietnam newsroom", "đài truyền hình việt nam"],
  "ngay-bao-chi/gallery3": ["phỏng vấn báo chí việt nam", "vietnam tv interview", "micro báo chí"],
  "ngay-bao-chi/gallery5": ["họp báo việt nam", "vietnam press conference", "phòng tin tức"],
  "ngay-phap-luat-viet-nam/hero": ["hội trường quốc hội việt nam", "vietnam national assembly hall", "quốc hội họp việt nam"],
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
