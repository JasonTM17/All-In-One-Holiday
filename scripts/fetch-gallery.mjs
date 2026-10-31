// Stage gallery CANDIDATES for the 3→6 expansion: for each holiday slug,
// download up to MAX_PER_SLUG free-license photos from Wikimedia Commons
// into staging/<slug>/cand-<n>.webp plus a manifest.json with full credit
// metadata. Review happens via contact sheets; scripts/promote-gallery.mjs
// turns the chosen files into gallery4/5/6.webp and appends credits.
//
// Usage: node scripts/fetch-gallery.mjs [slug ...]
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const STAGE = "staging";
const API = "https://commons.wikimedia.org/w/api.php";
const UA = { "User-Agent": "NgayLeViet/1.0 (github.com/JasonTM17/All-In-One-Holiday)" };
const LIC_OK = /CC0|CC BY|public domain|attribution|cc by|CC BY-SA/i;
const MAX_PER_SLUG = 10;
const MIN_W = 900; // source must be at least this wide (we store 960w)

const ONLY = new Set(process.argv.slice(2));

// Curated subject sets per holiday — each inner array is one visual theme;
// candidates are pooled across all themes for variety.
const QUERIES = {
  "tet-duong-lich": [
    ["fireworks city night", "fireworks celebration night sky"],
    ["new year countdown crowd", "Times Square New Year"],
    ["champagne toast glasses", "new year toast celebration"],
  ],
  "tet-nguyen-dan": [
    ["making banh chung", "wrapping banh chung dong leaves"],
    ["hoa mai apricot blossom", "Ochna integerrima flower"],
    ["Vietnamese calligraphy Tet", "ong do calligraphy"],
    ["kumquat tree Tet", "peach blossom Hanoi Tet"],
    ["mam ngu qua fruit tray", "Tet offerings altar"],
    ["li xi red envelope", "dragon dance Tet Vietnam"],
  ],
  "tet-nguyen-tieu": [
    ["Hoi An lanterns night", "Vietnamese lantern full moon"],
    ["Vietnamese temple incense", "chua Huong pagoda festival"],
    ["lantern floating river", "sky lantern festival"],
  ],
  valentine: [
    ["red roses bouquet", "roses valentine"],
    ["couple holding hands sunset", "romantic couple silhouette"],
    ["heart shaped gift box", "love letter envelope roses"],
  ],
  "quoc-te-phu-nu": [
    ["tulip bouquet pink", "mimosa flower branch"],
    ["Vietnamese women ao dai", "women Vietnam portrait smile"],
    ["flowers market women", "gerbera daisy bouquet"],
  ],
  "gio-to-hung-vuong": [
    ["Hung Kings temple festival", "Den Hung Phu Tho"],
    ["Vietnam temple procession", "ruoc kieu festival Vietnam"],
    ["Vietnam bronze drum", "trong dong Dong Son"],
  ],
  "tet-thanh-minh": [
    ["tomb sweeping incense grave", "Qingming grave cleaning"],
    ["Vietnam cemetery flowers", "ancestor grave offerings"],
    ["incense sticks temple smoke", "burning incense sticks"],
  ],
  "giai-phong-mien-nam": [
    ["Saigon Notre-Dame cathedral", "Ho Chi Minh City landmark"],
    ["Reunification Palace Saigon", "Independence Palace Vietnam"],
    ["Vietnam flag crowd celebration", "Vietnamese flags street"],
  ],
  "quoc-te-lao-dong": [
    ["Vietnam rice harvest farmer", "Vietnamese farmer field"],
    ["workers factory Vietnam", "construction worker Asia"],
    ["Vietnam market vendor working", "conical hat field work"],
  ],
  "ngay-cua-me": [
    ["mother child Vietnam", "Vietnamese mother baby"],
    ["carnation bouquet pink", "flowers mother day"],
    ["grandmother child hug", "mother daughter hands"],
  ],
  "quoc-te-thieu-nhi": [
    ["Vietnam children playing", "Vietnamese kids school happy"],
    ["children colorful balloons", "kids jumping joy"],
    ["child drawing painting", "children toys colorful"],
  ],
  "ngay-gia-dinh-viet-nam": [
    ["Vietnamese family dinner", "family meal Vietnam"],
    ["Vietnamese food dishes table", "com gia dinh"],
    ["family three generations", "grandparents family meal"],
  ],
  "thuong-binh-liet-si": [
    ["candlelight memorial", "memorial candles flame"],
    ["Vietnam war cemetery", "nghia trang liet si"],
    ["white flowers memorial", "incense offering solemn"],
  ],
  "vu-lan": [
    ["lotus flower blooming", "pink lotus pond"],
    ["Vietnamese pagoda temple", "Buddhist temple Vietnam"],
    ["rose on shirt", "flower pinned clothing"],
    ["monks praying temple", "Buddhist ceremony Vietnam"],
  ],
  "quoc-khanh": [
    ["Ba Dinh square Hanoi", "Ho Chi Minh Mausoleum"],
    ["Vietnam flag waving", "Vietnamese national flag"],
    ["Hanoi parade soldiers", "Vietnam military parade"],
  ],
  "trung-thu": [
    ["star lantern Vietnam", "den ong sao"],
    ["mooncake Vietnam", "banh trung thu"],
    ["full moon night sky", "moon lantern festival"],
    ["lion dance Vietnam", "mua lan mid autumn"],
    ["children lantern procession", "kid holding lantern night"],
  ],
  "phu-nu-viet-nam": [
    ["ao dai white Vietnam", "Vietnamese woman ao dai hat"],
    ["non la conical hat", "Vietnam traditional dress"],
    ["Vietnam women flowers", "ao dai silk"],
  ],
  "nha-giao-viet-nam": [
    ["teacher classroom Vietnam", "Vietnam school teacher"],
    ["students classroom raising hand", "school children Vietnam"],
    ["chalkboard writing teacher", "books flowers teacher"],
  ],
  "quan-doi-nhan-dan": [
    ["Vietnam army soldiers", "Vietnamese soldiers parade"],
    ["military honor guard Vietnam", "flag ceremony Vietnam"],
    ["soldiers silhouette sunset", "army camouflage Asia"],
  ],
  "giang-sinh": [
    ["Christmas nativity scene", "nativity church Vietnam"],
    ["Christmas tree night lights", "Christmas decorations street"],
    ["Vietnam cathedral Christmas", "Hanoi cathedral Noel"],
    ["Christmas gift wrapped", "santa decoration"],
  ],
  "ong-cong-ong-tao": [
    ["koi carp pond", "goldfish carp orange"],
    ["Vietnam kitchen altar", "ong Tao altar offerings"],
    ["paper offerings burning", "votive paper Vietnam"],
  ],
  "tet-han-thuc": [
    ["banh troi glutinous", "Vietnamese floating cake"],
    ["banh chay mung", "Vietnamese sweet soup dessert"],
    ["sesame dumplings bowl", "glutinous rice balls syrup"],
  ],
  "tet-doan-ngo": [
    ["ruou nep fermented rice", "Vietnamese fermented sticky rice"],
    ["lychee rambutan fruit", "Vietnam summer fruits"],
    ["Vietnamese market tropical fruit", "mangosteen plum fruit"],
  ],
  "ngay-thay-thuoc": [
    ["Vietnam doctor hospital", "Vietnamese doctors white coat"],
    ["stethoscope doctor hands", "doctor patient Vietnam"],
    ["medical herbs traditional", "thuoc nam medicine"],
  ],
  "ngay-bao-chi": [
    ["Vietnam newspaper", "Vietnamese newspapers print"],
    ["printing press newspaper", "journalist notepad interview"],
    ["newsroom journalists", "press conference cameras"],
  ],
  "nguoi-cao-tuoi": [
    ["Vietnamese elderly couple", "old people Vietnam smile"],
    ["mung tho birthday elderly", "Vietnam longevity celebration"],
    ["elderly hands praying", "senior Asian walking park"],
  ],
  "doanh-nhan": [
    ["Ho Chi Minh City skyline night", "Saigon business district"],
    ["business meeting handshake", "Vietnam entrepreneur office"],
    ["Hanoi skyline modern", "Vietnam city development"],
  ],
  "ngay-thanh-lap-dang": [
    ["Vietnam communist flag hammer sickle", "Vietnamese party flag"],
    ["Hanoi flag ceremony", "Vietnam flags red"],
    ["Ho Chi Minh statue", "Uncle Ho memorial"],
  ],
  "ngay-dien-bien-phu": [
    ["Dien Bien Phu victory monument", "Dien Bien monument hill"],
    ["Dien Bien Phu museum", "A1 hill Dien Bien"],
    ["Vietnam flag bunker Dien Bien", "Dien Bien Phu landscape"],
  ],
  "ngay-sinh-nhat-bac": [
    ["Ho Chi Minh mausoleum night", "lang Bac Ba Dinh"],
    ["Kim Lien village Nghe An", "Ho Chi Minh birthplace house"],
    ["lotus flower Ho Chi Minh", "sen Ho Sen"],
    ["Ho Chi Minh stilt house", "nha san Bac Ho"],
  ],
  "ngay-cach-mang-thang-tam": [
    ["Hanoi Opera House", "nha hat lon Ha Noi"],
    ["August Revolution Hanoi crowd", "Vietnam 1945 flag"],
    ["Ba Dinh square history", "Hanoi old quarter flag"],
  ],
  "ngay-giai-phong-thu-do": [
    ["Flag Tower Hanoi", "cot co Ha Noi"],
    ["Thang Long citadel Hanoi", "Imperial citadel Hanoi"],
    ["Hoan Kiem lake turtle tower", "Hanoi Ho Guom"],
    ["Hanoi street flags", "Vietnam flag old town"],
  ],
};

function stripHtml(s = "") {
  return s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(query, want, attempt = 0) {
  const u = `${API}?action=query&generator=search&gsrsearch=${encodeURIComponent(
    "filetype:bitmap " + query,
  )}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=${want}&format=json&origin=*`;
  const r = await fetch(u, { headers: UA });
  if (r.status === 429 && attempt < 4) {
    const wait = 15000 * (attempt + 1);
    console.log(`  429 — backing off ${wait / 1000}s`);
    await sleep(wait);
    return search(query, want, attempt + 1);
  }
  if (!r.ok) throw new Error(`search ${r.status}`);
  const j = await r.json();
  return Object.values(j.query?.pages ?? {})
    .map((p) => p.imageinfo?.[0] && { title: p.title, ...p.imageinfo[0] })
    .filter(Boolean);
}

const used = new Set();

// Seed the dedupe set with every photo already credited so candidates never
// repeat an image already on the site (even in another holiday's gallery).
if (existsSync("src/data/image-credits.ts")) {
  const m = readFileSync("src/data/image-credits.ts", "utf8").match(
    /imageCredits: Record<string, ImageCredit\[]> = ([\s\S]*);\s*$/,
  );
  if (m) {
    for (const c of Object.values(JSON.parse(m[1])).flat()) used.add(c.photo);
  }
}

let staged = 0;
for (const [slug, themes] of Object.entries(QUERIES)) {
  if (ONLY.size && !ONLY.has(slug)) continue;
  const dir = join(STAGE, slug);
  if (existsSync(join(dir, "manifest.json"))) {
    console.log(`skip ${slug} (already staged)`);
    continue;
  }
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const manifest = [];
  let n = 0;
  for (const group of themes) {
    if (n >= MAX_PER_SLUG) break;
    for (const q of group) {
      if (n >= MAX_PER_SLUG) break;
      await sleep(4200);
      let res;
      try {
        res = await search(q, 1100);
      } catch (e) {
        console.log(`ERR search ${slug} "${q}": ${e.message}`);
        continue;
      }
      // Prefer landscape photos ≥ MIN_W with usable thumbs, sorted big→small.
      const ok = res
        .filter((ii) => {
          const lic = ii.extmetadata?.LicenseShortName?.value ?? "";
          return (
            LIC_OK.test(lic) &&
            ii.thumburl &&
            ii.width >= MIN_W &&
            ii.width >= ii.height * 0.9 &&
            !used.has(ii.descriptionurl)
          );
        })
        .sort((a, b) => b.width - a.width);
      for (const ii of ok.slice(0, 2)) {
        used.add(ii.descriptionurl);
        await sleep(800);
        const img = await fetch(ii.thumburl, { headers: UA });
        if (!img.ok) continue;
        const file = `cand-${++n}.webp`;
        const buf = await sharp(Buffer.from(await img.arrayBuffer()))
          .resize(960, null, { withoutEnlargement: true })
          .webp({ quality: 74 })
          .toBuffer();
        writeFileSync(join(dir, file), buf);
        manifest.push({
          file,
          query: q,
          photographer: stripHtml(ii.extmetadata?.Artist?.value) || "Wikimedia Commons",
          profile: ii.descriptionurl,
          photo: ii.descriptionurl,
          license: ii.extmetadata?.LicenseShortName?.value ?? "CC",
          source: "Wikimedia Commons",
          alt: stripHtml(ii.extmetadata?.ImageDescription?.value).slice(0, 160) || q,
          w: ii.width,
          h: ii.height,
        });
        console.log(`${slug}/${file}  ${ii.width}x${ii.height}  ${manifest.at(-1).license}  ${q}`);
        staged++;
        break; // one per query keeps themes diverse
      }
    }
  }
  writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest, null, 2));
  if (!manifest.length) console.log(`!! no candidates for ${slug}`);
}
console.log(`\nDONE staged=${staged}`);
