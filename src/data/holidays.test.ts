import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { holidays, CATEGORY_LABELS } from "./holidays";
import { holidaysEn } from "./holidays-en";
import { nextOccurrence } from "@/lib/dates";
import sitemap from "@/app/sitemap";
import { imageCredits } from "./image-credits";
import { stories } from "./stories";
import { HERO_SRC_W } from "./hero-sizes";

const IMG_DIR = join(__dirname, "../../public/images/holidays");
const HERO_WIDTHS = [480, 800, 1200, 1600];

describe("holiday data integrity", () => {
  it("has unique slugs", () => {
    const slugs = holidays.map((h) => h.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every holiday has required non-empty content", () => {
    for (const h of holidays) {
      expect(h.slug).toMatch(/^[a-z0-9-]+$/);
      expect(h.name.length).toBeGreaterThan(2);
      expect(h.dateMark.length).toBeGreaterThan(0);
      expect(h.displayDate.length).toBeGreaterThan(0);
      expect(h.tagline.length).toBeGreaterThan(5);
      expect(h.history.length).toBeGreaterThanOrEqual(1);
      expect(h.meaning.length).toBeGreaterThan(10);
      expect(h.wishes.length).toBeGreaterThanOrEqual(5);
      expect(h.gifts.length).toBeGreaterThanOrEqual(3);
      expect(h.faq.length).toBeGreaterThanOrEqual(3);
      expect(h.categories.length).toBeGreaterThan(0);
      for (const c of h.categories) {
        expect(CATEGORY_LABELS[c]).toBeDefined();
      }
    }
  });

  it("every holiday has a complete 'đọc trọn ngày lễ' deep section", () => {
    for (const h of holidays) {
      const d = h.deep;
      expect(d, `${h.slug} missing deep`).toBeDefined();

      // ongNguon: 1–3 paragraphs totaling ~120–200 words
      expect(d.ongNguon.length).toBeGreaterThanOrEqual(1);
      expect(d.ongNguon.length).toBeLessThanOrEqual(3);
      const words = d.ongNguon.join(" ").split(/\s+/).filter(Boolean).length;
      expect(words, `${h.slug} ongNguon has ${words} words`).toBeGreaterThanOrEqual(110);
      expect(words, `${h.slug} ongNguon has ${words} words`).toBeLessThanOrEqual(220);
      for (const p of d.ongNguon) expect(p.length).toBeGreaterThan(60);

      // phongTuc: 5–8 items, title + explanation
      expect(d.phongTuc.length, `${h.slug} phongTuc`).toBeGreaterThanOrEqual(5);
      expect(d.phongTuc.length, `${h.slug} phongTuc`).toBeLessThanOrEqual(8);
      for (const t of d.phongTuc) {
        expect(t.title.length).toBeGreaterThan(2);
        expect(t.text.length).toBeGreaterThan(40);
      }

      // amThuc: empty (hidden gracefully) or 3–5 items
      expect(
        d.amThuc.length === 0 || (d.amThuc.length >= 3 && d.amThuc.length <= 5),
        `${h.slug} amThuc has ${d.amThuc.length} items`,
      ).toBe(true);
      for (const a of d.amThuc) {
        expect(a.title.length).toBeGreaterThan(2);
        expect(a.text.length).toBeGreaterThan(20);
      }

      // facts: 4–6 "Bạn có biết?" items
      expect(d.facts.length, `${h.slug} facts`).toBeGreaterThanOrEqual(4);
      expect(d.facts.length, `${h.slug} facts`).toBeLessThanOrEqual(6);
      for (const f of d.facts) expect(f.length).toBeGreaterThan(30);
    }
  });

  it("every holiday resolves a future occurrence", () => {
    const from = new Date();
    for (const h of holidays) {
      const next = nextOccurrence(h.rule, from);
      expect(next.getTime()).toBeGreaterThanOrEqual(from.getTime() - 86_400_000);
      expect(next.getFullYear()).toBeLessThanOrEqual(from.getFullYear() + 2);
    }
  });

  it("sitemap contains every holiday slug plus home and birthday", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/"))).toBe(true);
    expect(urls.some((u) => u.includes("/birthday/"))).toBe(true);
    for (const h of holidays) {
      expect(urls.some((u) => u.endsWith(`/${h.slug}/`))).toBe(true);
    }
  });
});

describe("holiday photos", () => {
  it("every holiday has hero/card/gallery images on disk in webp + avif", () => {
    for (const h of holidays) {
      for (const kind of ["hero", "card", "gallery1", "gallery2", "gallery3", "gallery4", "gallery5", "gallery6"]) {
        for (const ext of ["webp", "avif"]) {
          const f = join(IMG_DIR, h.slug, `${kind}.${ext}`);
          expect(existsSync(f), `${h.slug}/${kind}.${ext} missing`).toBe(true);
        }
      }
    }
  });

  it("every srcset rung advertised by HImg exists on disk in both formats", () => {
    for (const h of holidays) {
      const srcW = HERO_SRC_W[h.slug];
      expect(srcW, `${h.slug} missing from HERO_SRC_W`).toBeDefined();
      for (const w of HERO_WIDTHS) {
        if (w >= srcW) continue;
        for (const ext of ["webp", "avif"]) {
          const f = join(IMG_DIR, h.slug, `hero-${w}.${ext}`);
          expect(existsSync(f), `${h.slug}/hero-${w}.${ext} missing`).toBe(true);
        }
      }
      for (const base of ["card", "gallery1", "gallery2", "gallery3", "gallery4", "gallery5", "gallery6"]) {
        for (const ext of ["webp", "avif"]) {
          const f = join(IMG_DIR, h.slug, `${base}-480.${ext}`);
          expect(existsSync(f), `${h.slug}/${base}-480.${ext} missing`).toBe(true);
        }
      }
      // legacy hero-sm.webp was retired — must stay deleted
      expect(
        existsSync(join(IMG_DIR, h.slug, "hero-sm.webp")),
        `${h.slug}/hero-sm.webp should be deleted`,
      ).toBe(false);
    }
  });

  it("every deep item img resolves to on-disk webp/avif + 480 derivatives", () => {
    const checkImg = (slug: string, img: string, where: string) => {
      expect(img, `${slug} ${where} img stem`).toMatch(/^[a-z0-9-]+$/);
      for (const base of [img, `${img}-480`]) {
        for (const ext of ["webp", "avif"]) {
          const f = join(IMG_DIR, slug, `${base}.${ext}`);
          expect(existsSync(f), `${slug}/${base}.${ext} missing (${where})`).toBe(
            true,
          );
        }
      }
    };
    for (const h of holidays) {
      const seen = new Set<string>();
      for (const a of h.deep.amThuc) {
        // cuisine photo is optional (the card hides it gracefully); when
        // present it must resolve to real derivatives and carry a credit
        if (!a.img) continue;
        expect(a.img!, `${h.slug} amThuc img prefix`).toMatch(/^amthuc-/);
        expect(seen.has(a.img!), `${h.slug} dup img ${a.img}`).toBe(false);
        seen.add(a.img!);
        checkImg(h.slug, a.img!, `amThuc "${a.title}"`);
        // a fetched photo must always carry attribution
        const c = (imageCredits[h.slug] ?? []).find(
          (c) => c.file === `${h.slug}/${a.img}.webp`,
        );
        expect(c, `${h.slug}/${a.img} has no credit`).toBeDefined();
      }
      for (const x of h.deep.phongTuc) {
        // customs img is optional but must resolve when present
        if (x.img) checkImg(h.slug, x.img, `phongTuc "${x.title}"`);
      }
    }
  });

  it("home-page scenery files exist in webp + avif too", () => {
    for (const rel of [
      "scenery/hero",
      "scenery/hero-480",
      "scenery/gallery1-480",
      "scenery/gallery3-480",
      "scenery/card-480",
      "home-hero/gallery2-480",
      "gio-to-hung-vuong/hero-480",
    ]) {
      for (const ext of ["webp", "avif"]) {
        const f = join(IMG_DIR, `${rel}.${ext}`);
        expect(existsSync(f), `${rel}.${ext} missing`).toBe(true);
      }
    }
  });
  it("signature sections are well-formed for both locales", () => {
    const validKinds = new Set(["steps", "meanings", "timeline", "legend"]);
    for (const list of [holidays, holidaysEn]) {
      for (const h of list) {
        expect(h.signature, `${h.slug} missing signature`).toBeDefined();
        expect(h.signature!.length).toBeGreaterThanOrEqual(1);
        expect(h.signature!.length).toBeLessThanOrEqual(2);
        for (const s of h.signature!) {
          expect(validKinds.has(s.kind), `${h.slug} bad kind ${s.kind}`).toBe(
            true,
          );
          expect(s.title.length).toBeGreaterThan(5);
          if (s.kind === "steps") {
            expect(s.steps.length).toBeGreaterThanOrEqual(3);
            for (const st of s.steps) {
              expect(st.icon.length).toBeGreaterThan(2);
              expect(st.title.length).toBeGreaterThan(2);
              expect(st.text.length).toBeGreaterThan(20);
            }
          } else if (s.kind === "meanings") {
            expect(s.items.length).toBeGreaterThanOrEqual(3);
            for (const m of s.items) {
              expect(m.swatch).toMatch(/^#[0-9a-f]{6}$/i);
              expect(m.title.length).toBeGreaterThan(1);
              expect(m.text.length).toBeGreaterThan(20);
            }
          } else if (s.kind === "timeline") {
            expect(s.beats.length).toBeGreaterThanOrEqual(3);
            for (const b of s.beats) {
              expect(b.year.length).toBeGreaterThan(0);
              expect(b.title.length).toBeGreaterThan(2);
              expect(b.text.length).toBeGreaterThan(20);
            }
          } else {
            expect(s.lead.length).toBeGreaterThan(20);
            expect(s.paragraphs.length).toBeGreaterThanOrEqual(1);
            for (const p of s.paragraphs) expect(p.length).toBeGreaterThan(60);
          }
        }
      }
    }
  });

  it("quotes are always attributed; EN quotes note their translation", () => {
    for (const h of holidays) {
      for (const q of h.quotes ?? []) {
        expect(q.text.length, `${h.slug} quote text`).toBeGreaterThan(8);
        expect(q.author.length, `${h.slug} quote author`).toBeGreaterThan(1);
      }
    }
    for (const h of holidaysEn) {
      for (const q of h.quotes ?? []) {
        expect(q.text.length, `${h.slug} quote text`).toBeGreaterThan(8);
        expect(q.author.length, `${h.slug} quote author`).toBeGreaterThan(1);
        expect(
          q.note,
          `${h.slug} EN quote needs a translation note`,
        ).toBeDefined();
      }
    }
  });

  it("vi/en parity: same slugs, same signature shape, same quote count, same heroStyle", () => {
    expect(holidaysEn.length).toBe(holidays.length);
    for (let i = 0; i < holidays.length; i++) {
      const v = holidays[i];
      const e = holidaysEn[i];
      expect(e.slug).toBe(v.slug);
      expect((e.signature ?? []).map((s) => s.kind)).toEqual(
        (v.signature ?? []).map((s) => s.kind),
      );
      expect((e.quotes ?? []).length).toBe((v.quotes ?? []).length);
      expect(e.heroStyle ?? null).toBe(v.heroStyle ?? null);
      // step/beat counts mirror so the layouts line up
      for (let j = 0; j < (v.signature ?? []).length; j++) {
        const vs = v.signature![j];
        const es = e.signature![j];
        const vCount =
          vs.kind === "steps"
            ? vs.steps.length
            : vs.kind === "meanings"
              ? vs.items.length
              : vs.kind === "timeline"
                ? vs.beats.length
                : vs.paragraphs.length;
        const eCount =
          es.kind === "steps"
            ? es.steps.length
            : es.kind === "meanings"
              ? es.items.length
              : es.kind === "timeline"
                ? es.beats.length
                : es.paragraphs.length;
        expect(eCount, `${v.slug} section ${j} count`).toBe(vCount);
      }
    }
  });

  it("heroStyle values come from the known set", () => {
    const ok = new Set([
      "classic",
      "split",
      "framed",
      "poster",
      "mosaic",
      "banner",
    ]);
    for (const list of [holidays, holidaysEn]) {
      for (const h of list) {
        if (h.heroStyle) {
          expect(ok.has(h.heroStyle), `${h.slug} bad heroStyle`).toBe(true);
        }
      }
    }
  });

  it("every holiday image has a credit entry", () => {
    for (const h of holidays) {
      const list = imageCredits[h.slug] ?? [];
      expect(list.length, `${h.slug} has no credits`).toBeGreaterThanOrEqual(5);
      for (const c of list) {
        expect(c.license.length).toBeGreaterThan(0);
        expect(c.photo).toMatch(/^https:/);
        expect(c.photographer.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("holiday stories", () => {
  it("every holiday has ≥3 sources, https links, and sane summaries", () => {
    const seen = new Set<string>();
    for (const h of holidays) {
      const st = stories[h.slug];
      expect(st, `no story for ${h.slug}`).toBeDefined();
      expect(st.sources.length).toBeGreaterThanOrEqual(3);
      for (const s of st.sources) {
        expect(s.url).toMatch(/^https:/);
        expect(s.summary.length).toBeGreaterThan(40);
        expect(seen.has(`${h.slug}:${s.url}`)).toBe(false);
        seen.add(`${h.slug}:${s.url}`);
      }
      expect(st.story.body.length).toBeGreaterThan(300);
    }
  });
});
