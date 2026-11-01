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

// Round 7: images for 4 new holidays (sach, the-thao, phap-luat, thuong-mai).
const FIX = {
  "ngay-sach-viet-nam/hero": ["đường sách nguyễn văn bình", "ngày sách việt nam", "thư viện sách việt nam"],
  "ngay-sach-viet-nam/card": ["đọc sách việt nam", "quyển sách mở", "sách và cà phê"],
  "ngay-sach-viet-nam/gallery1": ["hội sách việt nam", "book fair vietnam", "ngày hội sách"],
  "ngay-sach-viet-nam/gallery2": ["trẻ em đọc sách", "học sinh đọc sách việt nam", "em bé đọc truyện"],
  "ngay-sach-viet-nam/gallery3": ["kệ sách thư viện", "bookshelf books", "hiệu sách việt nam"],
  "ngay-sach-viet-nam/gallery4": ["phố sách đinh lễ hà nội", "đường sách sài gòn", "sách cũ việt nam"],
  "ngay-sach-viet-nam/gallery5": ["gia đình đọc sách cùng nhau", "mẹ đọc truyện cho con", "reading book family"],
  "ngay-sach-viet-nam/gallery6": ["tặng sách thiện nguyện việt nam", "thư viện trường học việt nam", "sách miền núi"],
  "ngay-the-thao-viet-nam/hero": ["chạy bộ việt nam", "olympic run vietnam", "vận động viên việt nam"],
  "ngay-the-thao-viet-nam/card": ["thể dục buổi sáng hồ gươm", "morning exercise hanoi", "tập thể dục công viên"],
  "ngay-the-thao-viet-nam/gallery1": ["bóng đá việt nam sân cỏ", "vietnam football fans", "đội tuyển việt nam"],
  "ngay-the-thao-viet-nam/gallery2": ["sea games việt nam", "vận động viên việt nam cờ đỏ", "vietnam athlete flag"],
  "ngay-the-thao-viet-nam/gallery3": ["cầu lông việt nam", "badminton vietnam", "thể thao phong trào"],
  "ngay-the-thao-viet-nam/gallery4": ["đi bão việt nam bóng đá", "vietnam football celebration street", "cổ động viên việt nam"],
  "ngay-the-thao-viet-nam/gallery5": ["tập võ việt nam", "vovinam vietnam", "võ thuật việt nam"],
  "ngay-the-thao-viet-nam/gallery6": ["chạy bộ công viên sáng", "hồ gươm buổi sáng thể dục", "đạp xe việt nam"],
  "ngay-phap-luat-viet-nam/hero": ["nhà quốc hội việt nam", "national assembly vietnam building", "quốc hội việt nam tòa nhà"],
  "ngay-phap-luat-viet-nam/card": ["cân công lý tòa án", "scales of justice law", "búa thẩm phán tòa án"],
  "ngay-phap-luat-viet-nam/gallery1": ["tòa án việt nam phiên tòa", "vietnam court", "luật sư việt nam"],
  "ngay-phap-luat-viet-nam/gallery2": ["nhà hát lớn hà nội", "hanoi opera house", "opera house hanoi"],
  "ngay-phap-luat-viet-nam/gallery3": ["tư vấn pháp luật việt nam", "legal advice vietnam", "trợ giúp pháp lý"],
  "ngay-phap-luat-viet-nam/gallery4": ["hiến pháp việt nam sách luật", "law books vietnam", "sách luật"],
  "ngay-phap-luat-viet-nam/gallery5": ["quốc hội việt nam họp", "vietnam national assembly session", "hội trường quốc hội"],
  "ngay-phap-luat-viet-nam/gallery6": ["học sinh tuyên thệ việt nam", "lá cờ việt nam trường học", "chào cờ học sinh"],
  "ngay-thuong-mai-viet-nam/hero": ["cảng container cát lái", "cat lai port container", "cảng biển việt nam container"],
  "ngay-thuong-mai-viet-nam/card": ["chợ việt nam truyền thống", "vietnam market vendor", "chợ đồng xuân hà nội"],
  "ngay-thuong-mai-viet-nam/gallery1": ["container ship export vietnam", "tàu container xuất khẩu", "xuất khẩu việt nam"],
  "ngay-thuong-mai-viet-nam/gallery2": ["cà phê xuất khẩu việt nam", "coffee beans vietnam", "hạt cà phê"],
  "ngay-thuong-mai-viet-nam/gallery3": ["hội chợ triển lãm việt nam", "vietnam expo trade fair", "exhibition vietnam"],
  "ngay-thuong-mai-viet-nam/gallery4": ["gạo xuất khẩu việt nam", "rice export vietnam", "lúa gạo việt nam"],
  "ngay-thuong-mai-viet-nam/gallery5": ["dệt may xuất khẩu việt nam", "garment factory vietnam", "nhà máy dệt việt nam"],
  "ngay-thuong-mai-viet-nam/gallery6": ["phố cổ hà nội buôn bán", "hanoi old quarter market", "phố cổ hàng ngang"],
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
