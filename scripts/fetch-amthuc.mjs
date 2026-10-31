// Fetch free-license photos for every deep.amThuc (ẩm thực & lễ vật) item —
// and a couple of high-value phongTuc anchors — from Wikimedia Commons.
// License whitelist: CC0, CC BY, CC BY-SA, public domain. Server-side thumbs.
// Each item is cropped to an exact 960×720 (4:3) master so the shared
// thumbSrcSet ladder (480w + 960w) stays honest, with -480 + .avif twins.
// Every item carries `re`: a candidate is only accepted when its Commons
// filename or description matches the subject (prevents generic food shots).
// Resumable: an existing <stem>.webp is skipped. Credits merge like
// fetch-images.mjs --fill. Run: node scripts/fetch-amthuc.mjs [slug ...]
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const OUT = "public/images/holidays";
const API = "https://commons.wikimedia.org/w/api.php";
const UA = {
  "User-Agent": "NgayLeViet/1.0 (github.com/JasonTM17/All-In-One-Holiday)",
};
const LIC_OK = /CC0|CC BY|public domain|attribution|cc by/i;
const W = 960;
const H = 720;
const THUMB_W = 480;
const THUMB_H = 360;

// slug -> [{ stem, re (subject match on filename/alt), q: [queries in order] }]
const SPEC = {
  "tet-nguyen-dan": [
    {
      stem: "amthuc-banh-chung",
      re: /bánh chưng|banh chung|bánh tét|banh tet|chung/i,
      q: ["banh chung", "banh chung tet"],
    },
    {
      stem: "amthuc-thit-kho-trung",
      re: /thịt kho|thit kho|kho trứng|braised|carameliz|pork.{0,12}egg|egg.{0,12}pork/i,
      q: ["thit kho trung", "thit kho tau", "caramelized pork eggs"],
    },
    {
      stem: "amthuc-thit-dong",
      re: /thịt đông|thit dong|dưa hành|dua hanh|kiệu|kieu|hành muối|pickled|jellied|aspic|giò thủ|head ?cheese|brawn|hành tím/i,
      q: ["thịt đông", "gio thu", "dua hanh muoi", "head cheese", "cu kieu"],
    },
    {
      stem: "amthuc-mut-tet",
      re: /mứt|mut\b|kẹo|candied|candy|hạt dưa|hat dua|seed|jam|mứt/i,
      q: ["mut tet", "Vietnamese candied fruit", "mut dua coconut"],
    },
    {
      stem: "amthuc-nem-ran",
      re: /nem rán|nem ran|cha gio|chả giò|spring roll|fried roll|nem\b/i,
      q: ["nem ran", "cha gio", "fried spring rolls Vietnam"],
    },
  ],
  "tet-nguyen-tieu": [
    {
      stem: "amthuc-che-troi-nuoc",
      re: /chè trôi|che troi|trôi nước|troi nuoc|tangyuan|rice ball|bánh trôi|tāngyuán/i,
      q: ["che troi nuoc", "banh troi nuoc", "tangyuan"],
    },
    {
      stem: "amthuc-co-chay",
      re: /chay|vegetarian|vegan|buddhist|mâm|feast/i,
      q: ["Vietnamese vegetarian dishes", "com chay", "Buddhist vegetarian meal"],
    },
    {
      stem: "amthuc-xoi-che",
      re: /xôi|xoi|sticky rice|glutinous|chè/i,
      q: ["xoi sticky rice", "xoi nep Vietnam"],
    },
  ],
  valentine: [
    {
      stem: "amthuc-socola",
      re: /chocolat|cacao|praline|truffle|sô-cô-la/i,
      q: ["chocolate pralines", "chocolates assortment box"],
    },
    {
      stem: "amthuc-dau-socola",
      re: /strawberr|dâu|chocolate/i,
      q: ["chocolate covered strawberries", "chocolate strawberries"],
    },
    {
      stem: "amthuc-banh-tim",
      re: /cake|heart|bánh|torta|valentine/i,
      q: ["heart shaped cake", "heart cake valentine"],
    },
  ],
  "gio-to-hung-vuong": [
    {
      stem: "amthuc-banh-chung",
      re: /bánh chưng|banh chung|bánh tét|banh tet|chung/i,
      avoid: /nguyên liệu|ingredient/i,
      q: ["banh chung gio to", "banh chung cung", "banh chung tet"],
    },
    {
      stem: "amthuc-banh-giay",
      re: /bánh giầy|banh giay|bánh dày|banh day|glutinous|rice cake|giầy/i,
      q: ["banh giay", "banh day Vietnam"],
    },
    {
      stem: "amthuc-xoi-ga",
      re: /xôi|xoi|gà|chicken|glutinous|sticky/i,
      q: ["xoi ga", "ga luoc", "boiled chicken offering Vietnam"],
    },
  ],
  "tet-thanh-minh": [
    {
      stem: "amthuc-xoi",
      re: /xôi|xoi|sticky|glutinous/i,
      q: ["xoi dish Vietnam", "xoi"],
    },
    {
      stem: "amthuc-banh-nep",
      re: /bánh nếp|banh nep|bánh khúc|banh khuc|bánh dày|banh day|nếp/i,
      avoid: /bánh chưng|banh chung|ingredient|nguyên liệu/i,
      q: ["banh nep", "banh khuc", "Vietnamese glutinous rice cake"],
    },
    {
      stem: "amthuc-hoa-qua",
      re: /hoa quả|hoa qua|ngũ quả|ngu qua|trái cây|trai cay|fruit|cúng/i,
      avoid: /chả cá|ingredient|nguyên liệu|fish/i,
      q: ["mam hoa qua cung", "mam ngu qua", "trai cay cung le"],
    },
  ],
  "vu-lan": [
    {
      stem: "amthuc-mam-co-chay",
      re: /chay|vegetarian|vegan|cỗ/i,
      avoid: /volunteer|diet|study|stew meat|meat\b/i,
      q: ["com chay Vietnam", "do an chay", "mon an chay Vietnam", "co chay"],
    },
    {
      stem: "amthuc-chao-trang",
      re: /cháo|chao|congee|porridge|muối|jok/i,
      q: ["chao trang", "rice congee plain", "rice porridge bowl"],
    },
    {
      stem: "amthuc-dang-phat",
      re: /cúng|dâng|offering|mâm|hoa quả|fruit|lễ vật/i,
      avoid: /statue|kamakura|monument|big buddha/i,
      q: ["mam hoa qua dang phat", "fruit altar Vietnam", "le vat cung phat"],
    },
  ],
  "trung-thu": [
    {
      stem: "amthuc-banh-nuong",
      re: /bánh nướng|banh nuong|mooncake|moon cake|trung thu|baked/i,
      q: ["banh trung thu nuong", "baked mooncake", "mooncake"],
    },
    {
      stem: "amthuc-banh-deo",
      re: /bánh dẻo|banh deo|mooncake|moon cake|snow skin|trung thu/i,
      q: ["banh deo", "snow skin mooncake"],
    },
    {
      stem: "amthuc-tra",
      re: /trà|tea|sen|lotus|ấm|tách/i,
      q: ["tra sen lotus tea", "lotus tea Vietnam", "Vietnamese tea"],
    },
    {
      stem: "amthuc-mam-trai-cay",
      re: /trái cây|trai cay|fruit|ngũ quả|ngu qua|mâm|pomelo|bưởi|grape/i,
      q: ["mam ngu qua", "mam trai cay trung thu", "Vietnamese fruit tray"],
    },
    {
      stem: "amthuc-banh-in",
      re: /bánh in|banh in|kẹo|keo|cốm|com\b|bò kéo|Vong/i,
      avoid: /pork|sandwich|bánh mì|banh mi|thịt|meat/i,
      q: ["banh in Vietnam", "keo bo com", "banh in trung thu"],
    },
  ],
  "giang-sinh": [
    {
      stem: "amthuc-ga-nuong",
      re: /turkey|gà|roast|chicken|christmas|gà tây|ga tay/i,
      q: ["roast turkey christmas dinner", "roasted turkey"],
    },
    {
      stem: "amthuc-buche",
      re: /bûche|buche|yule|christmas cake|log|khúc cây/i,
      q: ["buche de noel", "yule log cake"],
    },
    {
      stem: "amthuc-lau",
      re: /lẩu|lau\b|hot ?pot|hotpot|steamboat|nabe/i,
      q: ["Vietnamese hot pot", "lau Vietnam", "hotpot"],
    },
    {
      stem: "amthuc-banh-quy-gung",
      re: /ginger|gừng|cookie|bánh quy|candy cane|christmas|gingerbread/i,
      q: ["gingerbread cookies", "gingerbread man", "candy cane"],
    },
  ],
  "ong-cong-ong-tao": [
    {
      stem: "amthuc-mam-com-tao",
      re: /táo|tao quan|kitchen god|altar|cúng|cung|mâm|offering|bếp|Tao/i,
      q: ["ong Cong ong Tao", "kitchen god altar Vietnam", "Tao quan offering"],
    },
    {
      stem: "amthuc-ca-chep",
      re: /cá chép|ca chep|carp|koi|fish/i,
      q: ["ca chep", "common carp fish", "carp Vietnam"],
    },
    {
      stem: "amthuc-vang-ma",
      re: /vàng mã|vang ma|joss|votive|hàng mã|hang ma|paper (money|offer)|ghost money|kim ngân/i,
      q: ["vang ma", "joss paper offerings", "hang ma Hanoi"],
    },
    {
      stem: "amthuc-che-xoi",
      re: /chè|xôi|xoi|sweet|cúng|dessert|che\b/i,
      q: ["che xoi cung", "xoi cung le", "che Vietnam"],
    },
  ],
  "tet-han-thuc": [
    {
      stem: "amthuc-banh-troi",
      re: /bánh trôi|banh troi|trôi nước|glutinous|rice ball/i,
      q: ["banh troi nuoc", "banh troi"],
    },
    {
      stem: "amthuc-banh-chay",
      // Commons only has "Banhchay.JPG" (595w) — accept a smaller source;
      // the 960×720 cover crop upscales it so descriptors stay honest.
      minW: 480,
      re: /bánh ?chay|banh ?chay/i,
      q: ["Banhchay", "banh chay", "bánh chay"],
    },
    {
      stem: "amthuc-mam-cung",
      re: /mâm cúng|mam cung|cúng|cung|offering|altar|lễ vật|bánh trôi/i,
      q: ["mam cung Vietnam", "Vietnamese offering tray", "cung kien"],
    },
  ],
  "tet-doan-ngo": [
    {
      stem: "amthuc-com-ruou",
      re: /cơm rượu|com ruou|rượu nếp|ferment|ruou|nếp cẩm/i,
      q: ["com ruou", "fermented sticky rice Vietnam", "ruou nep"],
    },
    {
      stem: "amthuc-trai-cay-chua",
      re: /vải|vai\b|lychee|litchi|plum|mận|man\b|trái cây|fruit/i,
      q: ["vai qua lychee", "lychee fruits branch", "man plum Vietnam"],
    },
    {
      stem: "amthuc-banh-tro",
      re: /bánh tro|banh tro|bánh gio|banh gio|bánh ú|banh u\b|ú nước|tro\b/i,
      q: ["banh tro", "banh gio", "banh u tro"],
    },
    {
      stem: "amthuc-trung-luoc",
      re: /egg|trứng|trung|boiled|luộc/i,
      q: ["boiled eggs", "trung luoc"],
    },
  ],
  "nguoi-cao-tuoi": [
    {
      stem: "amthuc-mung-tho",
      re: /mừng thọ|mung tho|thọ|cỗ|tiệc|banquet|feast/i,
      avoid: /document|emperor|report|tấu|calligraphy|house|letter|bút phê/i,
      q: ["mung tho", "co mung tho", "tiec mung tho Vietnam", "Vietnamese banquet family"],
    },
    {
      stem: "amthuc-xoi-gac",
      re: /xôi gấc|xoi gac|gấc|gac|momordica|glutinous/i,
      q: ["xoi gac"],
    },
    {
      stem: "amthuc-che-tra",
      re: /chè|trà|tea|dessert|sweet|tráp|che\b/i,
      q: ["che Vietnam dessert", "Vietnamese sweet soup che", "tra da"],
    },
  ],
};

// phongTuc anchors worth a real photo (rest use the motif chip).
const EXTRA = {
  "vu-lan": [
    {
      stem: "phongtuc-bong-hong",
      re: /rose|hồng|rosa|corsage|boutonni/i,
      q: ["pink rose single", "rose corsage", "red rose"],
    },
  ],
  "trung-thu": [
    {
      stem: "phongtuc-den-ong-sao",
      re: /lantern|lồng đèn|đèn|trung thu|mid.autumn|lampion/i,
      avoid: /planet|solar system|star sizes|space/i,
      q: ["den long ong sao", "trung thu den long", "cellophane lantern Vietnam", "lantern procession children Vietnam"],
    },
  ],
};

const ONLY = new Set(process.argv.slice(2).filter((a) => !a.startsWith("--")));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function stripHtml(s = "") {
  return s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

async function search(query, attempt = 0) {
  const u = `${API}?action=query&generator=search&gsrsearch=${encodeURIComponent(
    "filetype:bitmap " + query,
  )}&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=${W}&format=json&origin=*`;
  const r = await fetch(u, { headers: UA });
  if (r.status === 429) {
    if (attempt >= 4) throw new Error("search 429 (retries exhausted)");
    const wait = 15000 * (attempt + 1);
    console.log(`   .. 429, backing off ${wait / 1000}s`);
    await sleep(wait);
    return search(query, attempt + 1);
  }
  if (!r.ok) throw new Error(`search ${r.status}`);
  const j = await r.json();
  return Object.values(j.query?.pages ?? {})
    .map((p) => p.imageinfo?.[0] && { title: p.title, ...p.imageinfo[0] })
    .filter(Boolean);
}

const used = new Set();
const credits = {};
if (existsSync("src/data/image-credits.ts")) {
  const m = readFileSync("src/data/image-credits.ts", "utf8").match(
    /imageCredits: Record<string, ImageCredit\[]> = ([\s\S]*);\s*$/,
  );
  if (m) Object.assign(credits, JSON.parse(m[1]));
  for (const list of Object.values(credits)) {
    for (const c of list) used.add(c.photo);
  }
}

function matches(ii, item) {
  const hay = `${ii.title ?? ""} :: ${stripHtml(
    ii.extmetadata?.ImageDescription?.value,
  )} :: ${stripHtml(ii.extmetadata?.Categories?.value)}`;
  if (!item.re.test(hay)) return false;
  if (item.avoid && item.avoid.test(hay)) return false;
  return true;
}

async function pick(item) {
  for (const q of item.q) {
    const res = await search(q);
    for (const ii of res) {
      const lic = ii.extmetadata?.LicenseShortName?.value ?? "";
      if (!LIC_OK.test(lic)) continue;
      if (used.has(ii.descriptionurl)) continue;
      if (!ii.thumburl && !ii.url) continue;
      if ((ii.width ?? 0) < (item.minW ?? W)) continue; // keep 960w honest
      if (!matches(ii, item)) continue;
      used.add(ii.descriptionurl);
      return ii;
    }
    await sleep(2500);
  }
  return null;
}

let done = 0;
let failed = 0;
const results = [];
for (const [slug, items] of Object.entries(SPEC)) {
  if (ONLY.size && !ONLY.has(slug)) continue;
  const dir = join(OUT, slug);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const all = [...items, ...(EXTRA[slug] ?? [])];
  for (const it of all) {
    const dst = join(dir, `${it.stem}.webp`);
    if (existsSync(dst)) {
      console.log(`.. skip ${slug}/${it.stem}`);
      continue;
    }
    await sleep(2500);
    try {
      const ii = await pick(it);
      if (!ii) {
        console.log(`!! none ${slug}/${it.stem} [${it.q.join(" | ")}]`);
        failed++;
        results.push({ slug, stem: it.stem, ok: false });
        continue;
      }
      const img = await fetch(ii.thumburl ?? ii.url, { headers: UA });
      if (!img.ok) {
        console.log(`!! dl ${img.status} ${slug}/${it.stem}`);
        failed++;
        continue;
      }
      const buf = Buffer.from(await img.arrayBuffer());
      await sharp(buf)
        .resize(W, H, { fit: "cover" })
        .webp({ quality: 72 })
        .toFile(dst);
      await sharp(buf)
        .resize(W, H, { fit: "cover" })
        .avif({ quality: 45 })
        .toFile(join(dir, `${it.stem}.avif`));
      await sharp(buf)
        .resize(THUMB_W, THUMB_H, { fit: "cover" })
        .webp({ quality: 78 })
        .toFile(join(dir, `${it.stem}-${THUMB_W}.webp`));
      await sharp(buf)
        .resize(THUMB_W, THUMB_H, { fit: "cover" })
        .avif({ quality: 45 })
        .toFile(join(dir, `${it.stem}-${THUMB_W}.avif`));
      credits[slug] ??= [];
      credits[slug].push({
        file: `${slug}/${it.stem}.webp`,
        photographer:
          stripHtml(ii.extmetadata?.Artist?.value) || "Wikimedia Commons",
        profile: ii.descriptionurl,
        photo: ii.descriptionurl,
        license: ii.extmetadata?.LicenseShortName?.value ?? "CC",
        source: "Wikimedia Commons",
        alt:
          stripHtml(ii.extmetadata?.ImageDescription?.value).slice(0, 120) ||
          it.q[0],
      });
      done++;
      results.push({
        slug,
        stem: it.stem,
        ok: true,
        alt: credits[slug].at(-1).alt,
        license: credits[slug].at(-1).license,
      });
      console.log(
        `${slug}/${it.stem}.webp ${credits[slug].at(-1).license} :: ${credits[slug].at(-1).alt.slice(0, 70)}`,
      );
    } catch (e) {
      console.log(`ERR ${slug}/${it.stem}: ${e.message}`);
      failed++;
    }
  }
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
const md = [
  "# Image credits",
  "",
  "Photos from Wikimedia Commons contributors; see per-file license and description pages.",
  "",
  "| File | Author | License | Source |",
  "|---|---|---|---|",
  ...Object.values(credits)
    .flat()
    .map((c) => `| ${c.file} | ${c.photographer} | ${c.license} | [Commons](${c.photo}) |`),
  "",
].join("\n");
writeFileSync("public/images/CREDITS.md", md);
console.log(`\nDONE fetched=${done} failed=${failed}`);
writeFileSync(
  "plans/r4-photos/reports/amthuc-fetch.json",
  JSON.stringify(results, null, 2),
);
