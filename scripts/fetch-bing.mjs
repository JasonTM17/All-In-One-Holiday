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

// Round 14: full-site contact-sheet audit — off-theme, duplicates
// within a page, and same-subject monotony slots.
const FIX = {
  // off-theme / wrong subject
  "tet-han-thuc/gallery2": ["bánh trôi bánh chay tết hàn thực", "vietnamese glutinous rice balls dessert", "mâm cỗ tết hàn thực"],
  "quoc-te-lao-dong/gallery6": ["công nhân nhà máy việt nam", "vietnamese factory workers", "construction workers vietnam"],
  "ngay-sinh-nhat-bac/gallery4": ["phủ chủ tịch hà nội", "presidential palace hanoi", "nhà sàn bác hồ"],
  "ngay-bao-chi/gallery2": ["tòa soạn báo việt nam", "vietnamese newsroom journalists", "phóng viên báo chí việt nam"],
  "ngay-phap-luat-viet-nam/gallery3": ["tòa án nhân dân việt nam phiên tòa", "vietnamese court trial", "quốc hội việt nam biểu quyết"],
  "quoc-te-thieu-nhi/gallery4": ["trẻ em việt nam vui chơi", "vietnamese children playing", "children festival vietnam"],
  "ngay-doan-thanh-nien/gallery3": ["đoàn viên thanh niên việt nam sinh hoạt", "vietnamese youth union members", "thanh niên tình nguyện việt nam"],
  "ngay-doan-thanh-nien/gallery5": ["lễ kết nạp đoàn viên việt nam", "sinh hoạt đoàn thanh niên việt nam", "vietnamese youth group activity"],
  "quoc-te-nam-gioi/gallery3": ["cha và con trai việt nam", "vietnamese father and son", "nam giới việt nam làm việc"],
  "ong-cong-ong-tao/card": ["bàn thờ ông công ông táo", "kitchen gods vietnam altar", "thờ táo quân việt nam"],
  "ong-cong-ong-tao/gallery2": ["thả cá chép tiễn ông táo", "releasing carp kitchen gods", "mâm cúng ông công ông táo"],
  "tet-nguyen-tieu/gallery6": ["đèn lồng trăng rằm việt nam", "vietnamese full moon lantern", "tết nguyên tiêu đèn lồng"],
  "ngay-cua-me/gallery1": ["mẹ và con việt nam", "vietnamese mother and child", "mother's day vietnam family"],
  // duplicates within page
  "ngay-gia-dinh-viet-nam/gallery2": ["gia đình việt nam sum họp", "vietnamese family gathering park", "gia đình việt nam vui chơi"],
  "quoc-te-thieu-nhi/gallery6": ["trẻ em việt nam học nhóm", "vietnamese children school happy", "kids painting vietnam"],
  // monotony — diversify repeated subjects
  "valentine/gallery3": ["couple holding hands hearts silhouette", "valentine couple love heart", "romantic couple sunset"],
  "quoc-te-phu-nu/gallery5": ["phụ nữ nhận hoa ngày 8/3", "women receiving flowers celebration", "vietnamese women's day flowers gift"],
  "tet-nguyen-dan/gallery3": ["câu đối đỏ tết việt nam", "vietnamese new year red couplets calligraphy", "thư pháp tết chữ phúc"],
  "tet-nguyen-dan/gallery6": ["mâm ngũ quả tết việt nam", "five fruit tray tet vietnam", "bàn thờ tết việt nam"],
  "ngay-dien-bien-phu/gallery2": ["bảo tàng điện biên phủ", "dien bien phu museum diorama", "hầm đờ cát điện biên phủ"],
  "ngay-dien-bien-phu/gallery3": ["đồi a1 điện biên phủ", "dien bien phu battlefield", "chiến trường điện biên phủ"],
  "ngay-giai-phong-thu-do/gallery3": ["quảng trường ba đình hà nội", "ba dinh square hanoi", "lăng chủ tịch hồ chí minh"],
  "ngay-giai-phong-thu-do/gallery4": ["tiếp quản thủ đô 1954", "hanoi liberation 1954", "hồ gươm hà nội xưa"],
  "ngay-cach-mang-thang-tam/gallery3": ["quảng trường ba đình 1945", "august revolution 1945 hanoi", "cách mạng tháng tám hà nội"],
  "ngay-cach-mang-thang-tam/gallery4": ["lăng chủ tịch hồ chí minh ba đình", "ho chi minh mausoleum hanoi", "phủ chủ tịch hà nội"],
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
