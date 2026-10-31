// Fetch free-license photos from Wikimedia Commons for every holiday.
// License whitelist: CC0, CC BY, CC BY-SA, public domain. Server-side thumbs.
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const OUT = "public/images/holidays";
const API = "https://commons.wikimedia.org/w/api.php";
const UA = { "User-Agent": "NgayLeViet/1.0 (github.com/JasonTM17/All-In-One-Holiday)" };
const LIC_OK = /CC0|CC BY|public domain|attribution|cc by/i;

const MISSING_ONLY = new Set(process.argv.slice(2).filter((a) => !a.startsWith("--")));

const QUERIES = {
  "ong-cong-ong-tao": ["koi carp water", "Vietnamese altar offerings"],
  "tet-han-thuc": ["banh troi", "banh chay"],
  "tet-doan-ngo": ["lychee fruit fresh", "plums fruit market", "Vietnam fruit stall"],
  "ngay-thay-thuoc": ["stethoscope", "medical examination tools"],
  "ngay-bao-chi": ["newspaper stack", "printing press machine"],
  "nguoi-cao-tuoi": ["autumn park bench", "senior couple back view", "bamboo walking stick"],
  "doanh-nhan": ["business skyline city", "handshake business", "Ho Chi Minh City business"],
  "scenery": ["Terraced fields Mu Cang Chai", "Ha Long Bay", "Vietnam rice terrace"],
  "tet-nguyen-dan": ["hoa mai", "Tet Vietnam", "banh chung", "hoa dao Tet"],
  "tet-nguyen-tieu": ["lantern festival Vietnam", "den long Hoi An", "Nguyen Tieu"],
  "valentine": ["rose flower red", "single red rose", "rose petals"],
  "quoc-te-phu-nu": ["roses flowers pink", "tulips bouquet", "flowers women"],
  "gio-to-hung-vuong": ["Hung Kings temple", "Phu Tho temple", "Nghia Linh mountain"],
  "tet-thanh-minh": ["Qingming tomb sweeping", "Tomb-Sweeping Day cemetery", "Thanh Minh Vietnam", "grave offering Qingming"],
  "giai-phong-mien-nam": ["Ho Chi Minh City", "Saigon skyline", "Ben Thanh market"],
  "quoc-te-lao-dong": ["rice field Vietnam farmer", "Vietnam farmers", "dong lua"],
  "ngay-cua-me": ["carnation", "dianthus flower", "flowers pink bloom"],
  "quoc-te-thieu-nhi": ["colorful balloons", "kids birthday balloons", "playground children"],
  "ngay-gia-dinh-viet-nam": ["Vietnamese cuisine dishes", "family meal rice", "traditional Vietnamese food"],
  "thuong-binh-liet-si": ["memorial candle light", "candles night memorial", "war memorial Vietnam"],
  "vu-lan": ["lotus flower", "hoa sen", "lotus pond Vietnam"],
  "quoc-khanh": ["Hanoi Ba Dinh", "Vietnam parade", "Ba Dinh square"],
  "trung-thu": ["Full moon festival lanterns", "paper lantern night", "Chinese lantern festival"],
  "phu-nu-viet-nam": ["ao dai Vietnam", "Vietnamese woman ao dai", "áo dài"],
  "nha-giao-viet-nam": ["teacher desk books", "school blackboard", "chalk letters board"],
  "quan-doi-nhan-dan": ["Vietnam soldiers parade", "army honor guard", "flag raising ceremony"],
  "giang-sinh": ["Christmas tree decorations", "Christmas lights", "Noel tree"],
  "ngay-thanh-lap-dang": ["Vietnam communist flag", "Communist Party of Vietnam flag", "Vietnamese flag red star", "Hanoi flag crowd"],
  "ngay-dien-bien-phu": ["Dien Bien Phu monument", "Dien Bien Phu statue Vietnam", "De Castries bunker", "Dien Bien Phu victory monument"],
  "ngay-sinh-nhat-bac": ["Ho Chi Minh Mausoleum", "Ba Dinh square Hanoi", "Kim Lien Nghe An", "lotus Vietnam temple"],
  "ngay-cach-mang-thang-tam": ["Hanoi Opera House", "August Revolution Square Hanoi", "Ba Dinh square", "Vietnam flag parade"],
  "ngay-giai-phong-thu-do": ["Flag Tower of Hanoi", "Ky Dai Hanoi flag", "Hanoi citadel tower", "Thang Long citadel Hanoi"],
};
const EXTRA = {
  "home-hero": ["Hoi An lanterns night", "Vietnam festival"],
  "birthday": ["birthday cake", "birthday candles"],
};

function stripHtml(s = "") {
  return s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

async function search(query, want) {
  const u = `${API}?action=query&generator=search&gsrsearch=${encodeURIComponent("filetype:bitmap " + query)}&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=${want}&format=json&origin=*`;
  const r = await fetch(u, { headers: UA });
  if (!r.ok) throw new Error(`search ${r.status}`);
  const j = await r.json();
  const pages = Object.values(j.query?.pages ?? {});
  return pages
    .map((p) => p.imageinfo?.[0] && { title: p.title, ...p.imageinfo[0] })
    .filter(Boolean);
}

async function pick(queries, want, used) {
  for (const q of queries) {
    const res = await search(q, want);
    for (const ii of res) {
      const lic = ii.extmetadata?.LicenseShortName?.value ?? "";
      if (!LIC_OK.test(lic)) continue;
      if (used.has(ii.descriptionurl)) continue;
      if (!ii.thumburl) continue;
      used.add(ii.descriptionurl);
      return ii;
    }
  }
  return null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const used = new Set();
const credits = {};
let total = 0;
const SKIP = process.argv.includes("--fill");

async function handle(slug, queries, kinds = ["hero", "card", "gallery1", "gallery2"]) {
  const dir = join(OUT, slug);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  for (const kind of kinds) {
    const file0 = join(dir, `${kind}.webp`);
    if (SKIP && existsSync(file0)) continue;
    await sleep(2500);
    const w = kind === "hero" ? 1920 : 800;
    const ii = await pick(queries, w, used);
    if (!ii) { console.log(`!! none: ${slug}/${kind} [${queries[0]}]`); continue; }
    const img = await fetch(ii.thumburl, { headers: UA });
    if (!img.ok) { console.log(`!! dl ${img.status} ${slug}/${kind}`); continue; }
    const webp = await sharp(Buffer.from(await img.arrayBuffer()))
      .webp({ quality: kind === "hero" ? 72 : 70 })
      .toBuffer();
    writeFileSync(join(dir, `${kind}.webp`), webp);
    total += webp.length;
    credits[slug] ??= [];
    credits[slug].push({
      file: `${slug}/${kind}.webp`,
      photographer: stripHtml(ii.extmetadata?.Artist?.value) || "Wikimedia Commons",
      profile: ii.descriptionurl,
      photo: ii.descriptionurl,
      license: ii.extmetadata?.LicenseShortName?.value ?? "CC",
      source: "Wikimedia Commons",
      alt: stripHtml(ii.extmetadata?.ImageDescription?.value).slice(0, 120) || queries[0],
    });
    console.log(`${slug}/${kind}.webp ${(webp.length / 1024).toFixed(0)}KB ${credits[slug].at(-1).license}`);
  }
}

// merge previous credits when filling
if (SKIP && existsSync("src/data/image-credits.ts")) {
  const { readFileSync } = await import("node:fs");
  const m = readFileSync("src/data/image-credits.ts", "utf8").match(
    /imageCredits: Record<string, ImageCredit\[]> = ([\s\S]*);\s*$/,
  );
  if (m) Object.assign(credits, JSON.parse(m[1]));
  for (const list of Object.values(credits)) {
    for (const c of list) used.add(c.photo);
  }
}
const kinds = ["hero", "card", "gallery1", "gallery2", "gallery3"];
for (const [slug, q] of Object.entries(QUERIES)) {
  if (MISSING_ONLY.size && !MISSING_ONLY.has(slug)) continue;
  try { await handle(slug, q, kinds); } catch (e) { console.log(`ERR ${slug}: ${e.message}`); }
}
try { await handle("home-hero", EXTRA["home-hero"], kinds); } catch (e) { console.log(`ERR home ${e.message}`); }
try { await handle("birthday", EXTRA.birthday, ["hero"]); } catch (e) { console.log(`ERR bday ${e.message}`); }

const ts = `// AUTO-GENERATED by scripts/fetch-images.mjs — do not edit by hand.
export interface ImageCredit {
  file: string;
  photographer: string;
  profile: string;
  photo: string;
  license: string;
  source: string;
  alt: string;
}
export const imageCredits: Record<string, ImageCredit[]> = ${JSON.stringify(credits, null, 2)};
`;
writeFileSync("src/data/image-credits.ts", ts);
const md = ["# Image credits", "", "Photos from Wikimedia Commons contributors; see per-file license and description pages.", "", "| File | Author | License | Source |", "|---|---|---|---|", ...Object.values(credits).flat().map((c) => `| ${c.file} | ${c.photographer} | ${c.license} | [Commons](${c.photo}) |`), ""].join("\n");
writeFileSync("public/images/CREDITS.md", md);
console.log(`\nTOTAL ${(total / 1048576).toFixed(1)}MB files=${Object.values(credits).flat().length}`);
