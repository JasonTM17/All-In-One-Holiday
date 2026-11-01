// Stage replacement candidates for wrong-subject images, then promote picks.
//   node scripts/fix-images.mjs            — stage up to 3 candidates per stem
//   node scripts/fix-images.mjs --promote  — apply staging-fix/picks.json
// picks.json: { "slug/stem": candNumber }
// Writes master webp (960w / hero 1920w), updates image-credits.ts (deduped
// by file key) and CREDITS.md. Derivatives via gen-thumbs.mjs afterwards.
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const STAGE = "staging-fix";
const OUT = "public/images/holidays";
const API = "https://commons.wikimedia.org/w/api.php";
const UA = { "User-Agent": "NgayLeViet/1.0 (github.com/JasonTM17/All-In-One-Holiday)" };
const LIC_OK = /CC0|CC BY|public domain|attribution|cc by/i;

// slug/stem -> Vietnam-specific queries (ordered).
const FIX = {
  "thuong-binh-liet-si/hero": ["Nghia trang liet si Vietnam", "Truong Son cemetery Vietnam", "war cemetery Vietnam incense"],
  "thuong-binh-liet-si/card": ["nghia trang liet si", "Vietnamese war cemetery", "Vietnam martyr cemetery"],
  "thuong-binh-liet-si/gallery1": ["Truong Son martyrs cemetery", "nghia trang Truong Son", "Dong Loc junction memorial"],
  "thuong-binh-liet-si/gallery2": ["Vietnam war memorial Hanoi", "Dai tuong niem chien si Hanoi", "memorial soldiers Hanoi"],
  "thuong-binh-liet-si/gallery3": ["Vi Xuyen cemetery", "nghia trang Vi Xuyen", "Ha Giang cemetery"],
  "thuong-binh-liet-si/gallery4": ["Ben Duoc memorial temple", "Cu Chi memorial temple", "Vietnam war temple memorial"],
  "thuong-binh-liet-si/gallery5": ["Vietnam cemetery candles", "thap nen tri an", "incense grave Vietnam"],
  "thuong-binh-liet-si/gallery6": ["Vietnamese soldiers monument", "martyr statue Vietnam", "tuong dai liet si Vietnam"],
  "quan-doi-nhan-dan/hero": ["Vietnam military parade soldiers", "dieu binh Vietnam army", "Vietnam People's Army parade"],
  "quan-doi-nhan-dan/card": ["Vietnam soldiers Hanoi", "Vietnamese army soldiers", "PAVN Vietnam troops"],
  "quan-doi-nhan-dan/gallery1": ["Vietnam army parade Ba Dinh", "Vietnam soldiers marching", "dieu hanh quan doi Vietnam"],
  "quan-doi-nhan-dan/gallery2": ["Vietnam flag ceremony soldiers", "chao co Vietnam military", "Vietnam honor guard"],
  "quan-doi-nhan-dan/gallery4": ["Vietnam military parade Saigon", "30 April parade Vietnam", "National reunification parade"],
  "quan-doi-nhan-dan/gallery5": ["Vietnam army honor guard mausoleum", "Ho Chi Minh mausoleum guard", "lính gác lăng Bác"],
  "quan-doi-nhan-dan/gallery6": ["Vietnam army training soldiers", "bo doi Vietnam", "quân đội Việt Nam"],
  "ngay-thanh-lap-dang/hero": ["Communist Party Vietnam flag", "flag hammer sickle Vietnam", "Dang cong san Viet Nam flag"],
  "ngay-thanh-lap-dang/gallery4": ["Vietnam red flags street", "co dang Vietnam street", "flag Vietnam Hanoi street"],
  "ngay-thanh-lap-dang/gallery5": ["Vietnam flag monument", "co to quoc Vietnam", "Vietnam national flag"],
  "ngay-thanh-lap-dang/gallery6": ["Ho Chi Minh portrait Hanoi", "Ba Dinh hall Vietnam", "Vietnam party congress hall"],
  "doanh-nhan/card": ["Bitexco Financial Tower", "Ho Chi Minh City skyline tower", "Saigon buildings"],
  "doanh-nhan/gallery2": ["Ben Thanh market Saigon", "cho Ben Thanh", "Vietnam market busy"],
  "doanh-nhan/gallery3": ["Thu Thiem bridge Saigon", "Saigon river skyline", "Ho Chi Minh City night"],
  "doanh-nhan/gallery5": ["Vietnam factory workers", "Vietnam garment factory", "Vietnamese factory"],
  "doanh-nhan/gallery6": ["Saigon port container", "container port Vietnam", "Cat Lai port Saigon"],
  "ngay-gia-dinh-viet-nam/hero": ["Vietnamese family meal", "mam com gia dinh Vietnam", "family dinner Vietnam"],
  "ngay-gia-dinh-viet-nam/gallery1": ["Vietnamese family children", "gia dinh Vietnam happy", "Vietnam family Tet"],
  "ngay-gia-dinh-viet-nam/gallery6": ["Vietnamese family home", "Vietnam family three generations", "Vietnamese grandmother family"],
  "nha-giao-viet-nam/gallery3": ["Vietnam classroom students", "Vietnamese school pupils class", "hoc sinh Vietnam classroom"],
  "ngay-cua-me/gallery4": ["Vietnamese mother child", "mother baby Vietnam", "Vietnam mother daughter"],
  "tet-nguyen-dan/gallery4": ["making banh chung", "wrapping banh chung leaves", "goi banh chung"],
  "tet-nguyen-tieu/card": ["Hoi An lanterns night river", "lanterns Hoi An Vietnam", "den long Hoi An"],
  "tet-nguyen-tieu/gallery5": ["Vietnam lantern festival temple", "Vietnamese pagoda incense", "chua Vietnam le hoi"],
  "tet-duong-lich/gallery4": ["fireworks Ho Chi Minh City", "Saigon New Year fireworks", "phao hoa Saigon"],
  "tet-duong-lich/gallery5": ["Hanoi New Year fireworks", "fireworks Vietnam Hanoi", "phao hoa Ha Noi"],
  "tet-duong-lich/gallery6": ["countdown New Year Saigon", "New Year celebration Vietnam", "fireworks Da Nang"],
  "trung-thu/hero": ["Trung thu lanterns Vietnam", "mid autumn festival Vietnam lanterns", "den long trung thu"],
  "trung-thu/gallery5": ["lantern parade children Vietnam", "ruoc den trung thu", "Tuyen Quang lantern festival"],
  "trung-thu/gallery6": ["den ong sao star lantern", "star lantern Vietnam", "lantern making Vietnam"],
  "giang-sinh/hero": ["Notre Dame Cathedral Saigon Christmas", "Hanoi cathedral Christmas", "nha tho Duc Ba Noel"],
  "giang-sinh/gallery1": ["Christmas Vietnam church", "Giang sinh Vietnam", "Christmas Hanoi street"],
  "giang-sinh/gallery5": ["Christmas Saigon decorations", "noel Vietnam", "Christmas Vietnamese cathedral"],
  "tet-doan-ngo/hero": ["Vietnam fruit market lychee", "Vietnamese fruit stall", "trai cay Vietnam market"],
  "tet-doan-ngo/gallery6": ["Vietnam breakfast family food", "Vietnamese food offerings", "cung gia tien Vietnam"],
  "quoc-te-thieu-nhi/hero": ["Vietnamese children playing", "Vietnam kids happy", "tre em Vietnam vui"],
  "quoc-te-thieu-nhi/gallery6": ["Vietnam children drawing", "Vietnamese kids school art", "child painting Vietnam"],
  "nguoi-cao-tuoi/gallery5": ["Vietnamese elderly portrait", "old woman Vietnam", "cu ba Vietnam"],
  "ngay-thay-thuoc/gallery1": ["Vietnam hospital doctors", "Vietnamese hospital", "benh vien Vietnam"],
  "ngay-thay-thuoc/gallery4": ["Vietnamese nurse patient", "Vietnam doctor patient", "bac si Vietnam"],
  "ngay-bao-chi/gallery1": ["Vietnam newspaper vendor", "Vietnamese newspapers", "bao chi Vietnam"],
  "ngay-bao-chi/gallery2": ["newspaper stand Hanoi", "Vietnam newsstand", "sạp báo Vietnam"],
  "ngay-bao-chi/gallery3": ["reading newspaper Vietnam", "Vietnamese man newspaper", "doc bao Vietnam"],
  "tet-han-thuc/gallery5": ["banh troi Vietnam", "banh chay Vietnam", "Vietnamese glutinous balls dessert"],
  "tet-thanh-minh/gallery6": ["Vietnam cemetery grave", "nghia trang Vietnam", "Vietnamese tomb grave"],
  "ong-cong-ong-tao/gallery1": ["carp fish Vietnam release", "ca chep Vietnam", "thả cá chép"],
  "ong-cong-ong-tao/gallery4": ["votive paper burning Vietnam", "dot vang ma Vietnam", "burning offerings Vietnam"],
  "ong-cong-ong-tao/gallery6": ["Vietnam kitchen altar", "ban tho ong Tao", "Vietnamese home altar"],
};

function stripHtml(s = "") {
  return s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(query, want) {
  const u = `${API}?action=query&generator=search&gsrsearch=${encodeURIComponent("filetype:bitmap " + query)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=${want}&format=json&origin=*`;
  const r = await fetch(u, { headers: UA });
  if (!r.ok) throw new Error(`search ${r.status}`);
  const j = await r.json();
  return Object.values(j.query?.pages ?? {})
    .map((p) => p.imageinfo?.[0] && { title: p.title, ...p.imageinfo[0] })
    .filter(Boolean);
}

if (process.argv.includes("--promote")) {
  const picks = JSON.parse(readFileSync(join(STAGE, "picks.json"), "utf8"));
  const manifest = JSON.parse(readFileSync(join(STAGE, "manifest.json"), "utf8"));
  const byKey = {};
  for (const m of manifest) byKey[`${m.slug}/${m.stem}#${m.cand}`] = m;
  const m2 = readFileSync("src/data/image-credits.ts", "utf8").match(
    /imageCredits: Record<string, ImageCredit\[]> = ([\s\S]*);\s*$/,
  );
  const credits = JSON.parse(m2[1]);
  for (const [key, sel] of Object.entries(picks)) {
    // sel: number -> same-stem cand; "otherStem/cN" -> borrow a cand file
    const [slug, stem] = key.split("/");
    // sel: number | "stem/cN" (same slug) | "otherSlug:stem/cN" (cross-slug)
    let srcSlug = slug, srcStem = stem, n = sel;
    if (typeof sel === "string" && sel.includes("/")) {
      const [left, cand] = sel.split("/");
      n = cand;
      if (left.includes(":")) {
        [srcSlug, srcStem] = left.split(":");
      } else {
        srcStem = left;
      }
    }
    const m = byKey[`${srcSlug}/${srcStem}#${n}`];
    if (!m) { console.log(`!! no manifest for ${key} <= ${srcSlug}/${srcStem}#${n}`); continue; }
    const w = stem === "hero" ? 1920 : 960;
    const buf = readFileSync(join(STAGE, `${srcSlug}__${srcStem}__c${n}.webp`));
    const out = join(OUT, slug, `${stem}.webp`);
    mkdirSync(join(OUT, slug), { recursive: true });
    await sharp(buf).resize(w, null, { withoutEnlargement: true }).webp({ quality: stem === "hero" ? 72 : 74 }).toFile(out);
    const entry = {
      file: `${slug}/${stem}.webp`,
      photographer: m.photographer,
      profile: m.photo.replace(/^http:\/\//, "https://"),
      photo: m.photo.replace(/^http:\/\//, "https://"),
      license: m.license,
      source: m.source ?? "Wikimedia Commons",
      alt: m.alt,
    };
    credits[slug] = (credits[slug] ?? []).filter((c) => c.file !== entry.file);
    credits[slug].push(entry);
    console.log(`${out} <= cand${n} ${m.license}`);
  }
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
  const seen = new Set();
  const rows = Object.values(credits).flat().filter((c) => {
    if (seen.has(c.file)) return false;
    seen.add(c.file);
    return true;
  });
  const short = (s) => (s === "Flickr" ? "Flickr" : s?.startsWith("Web") ? s.replace(/^Web \((.*)\)$/, "$1") : "Commons");
  const md = ["# Image credits", "", "Photos from Wikimedia Commons and Flickr contributors; see per-file license and description pages.", "", "| File | Author | License | Source |", "|---|---|---|---|", ...rows.map((c) => `| ${c.file} | ${c.photographer} | ${c.license} | [${short(c.source)}](${c.photo}) |`), ""].join("\n");
  writeFileSync("public/images/CREDITS.md", md);
  console.log(`promoted ${Object.keys(picks).length}, deduped credit rows -> ${rows.length}`);
  process.exit(0);
}

// ---- staging mode ----
mkdirSync(STAGE, { recursive: true });
// --extra <file.json>: merge an additional {slug/stem: queries} map for retries.
let activeFix = FIX;
let manifestFile = join(STAGE, "manifest.json");
if (process.argv.includes("--extra")) {
  const f = process.argv[process.argv.indexOf("--extra") + 1];
  activeFix = JSON.parse(readFileSync(f, "utf8"));
}
const manifest = existsSync(manifestFile)
  ? JSON.parse(readFileSync(manifestFile, "utf8"))
  : [];
const used = new Set(manifest.map((m) => m.photo));
const m0 = readFileSync("src/data/image-credits.ts", "utf8").match(
  /imageCredits: Record<string, ImageCredit\[]> = ([\s\S]*);\s*$/,
);
if (m0) for (const list of Object.values(JSON.parse(m0[1]))) for (const c of list) used.add(c.photo);

for (const [key, queries] of Object.entries(activeFix)) {
  const [slug, stem] = key.split("/");
  const want = stem === "hero" ? 1920 : 960;
  const found = [];
  for (const q of queries) {
    if (found.length >= 3) break;
    await sleep(2200);
    let res;
    try { res = await search(q, want); } catch (e) { console.log(`ERR ${key} "${q}": ${e.message}`); continue; }
    for (const ii of res) {
      if (found.length >= 3) break;
      const lic = ii.extmetadata?.LicenseShortName?.value ?? "";
      if (!LIC_OK.test(lic) || !ii.thumburl || used.has(ii.descriptionurl)) continue;
      if ((ii.width ?? 0) < 800) continue;
      used.add(ii.descriptionurl);
      const img = await fetch(ii.thumburl, { headers: UA });
      if (!img.ok) continue;
      const n = found.length + 1;
      const buf = Buffer.from(await img.arrayBuffer());
      writeFileSync(join(STAGE, `${slug}__${stem}__c${n}.webp`), await sharp(buf).webp({ quality: 74 }).toBuffer());
      manifest.push({
        slug, stem, cand: n, title: ii.title,
        photographer: stripHtml(ii.extmetadata?.Artist?.value) || "Wikimedia Commons",
        photo: ii.descriptionurl,
        license: lic,
        alt: stripHtml(ii.extmetadata?.ImageDescription?.value).slice(0, 120) || q,
      });
      found.push(ii.title);
    }
  }
  console.log(`${key}: ${found.length} cands${found.length ? "" : "  <<<< NONE"}`);
}
writeFileSync(join(STAGE, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`staged ${manifest.length} candidates -> ${STAGE}/`);
