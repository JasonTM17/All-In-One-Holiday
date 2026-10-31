import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { holidays, CATEGORY_LABELS } from "./holidays";
import { nextOccurrence } from "@/lib/dates";
import sitemap from "@/app/sitemap";
import { imageCredits } from "./image-credits";
import { stories } from "./stories";

const IMG_DIR = join(__dirname, "../../public/images/holidays");

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
  it("every holiday has hero/card/gallery images on disk", () => {
    for (const h of holidays) {
      for (const kind of ["hero", "card", "gallery1", "gallery2", "gallery3"]) {
        const f = join(IMG_DIR, h.slug, `${kind}.webp`);
        expect(existsSync(f), `${h.slug}/${kind}.webp missing`).toBe(true);
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
