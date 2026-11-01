import { describe, expect, it } from "vitest";
import { holidays, CATEGORY_LABELS } from "@/data/holidays";
import { holidaysEn } from "@/data/holidays-en";
import { storiesEn } from "@/data/stories-en";
import { en } from "./en";
import { vi } from "./vi";
import {
  localePath,
  localePrefix,
  translatePath,
} from "./index";
import type { Messages } from "./types";

const viSlugs = holidays.map((h) => h.slug);
const enSlugs = holidaysEn.map((h) => h.slug);

/** Deep structural key-set comparison (functions count, not values). */
function shapeOf(v: unknown, path = ""): string[] {
  if (typeof v === "function") return [path];
  if (Array.isArray(v)) return v.flatMap((x, i) => shapeOf(x, `${path}[${i}]`));
  if (v && typeof v === "object") {
    return Object.entries(v as Record<string, unknown>).flatMap(([k, x]) =>
      shapeOf(x, path ? `${path}.${k}` : k),
    );
  }
  return [path];
}

describe("EN holiday data parity", () => {
  it("has the same 36 slugs in the same order", () => {
    expect(enSlugs).toEqual(viSlugs);
    expect(enSlugs.length).toBe(36);
  });

  it("every EN entry has complete content sections", () => {
    for (const h of holidaysEn) {
      expect(h.slug).toMatch(/^[a-z0-9-]+$/);
      expect(h.name.length, h.slug).toBeGreaterThan(2);
      expect(h.dateMark.length).toBeGreaterThan(0);
      expect(h.displayDate.length).toBeGreaterThan(0);
      expect(h.tagline.length).toBeGreaterThan(5);
      expect(h.history.length).toBeGreaterThanOrEqual(1);
      expect(h.meaning.length).toBeGreaterThan(10);
      expect(h.wishes.length).toBeGreaterThanOrEqual(5);
      expect(h.gifts.length).toBeGreaterThanOrEqual(3);
      expect(h.faq.length).toBeGreaterThanOrEqual(3);
      expect(h.traditions.length).toBeGreaterThanOrEqual(2);
      for (const c of h.categories) {
        expect(CATEGORY_LABELS[c], `${h.slug} bad category`).toBeDefined();
      }
    }
  });

  it("every EN entry has a complete deep section", () => {
    for (const h of holidaysEn) {
      const d = h.deep;
      expect(d, `${h.slug} missing deep`).toBeDefined();
      // English prose is denser than Vietnamese — ≥80 words is the bar.
      const words = d.ongNguon.join(" ").split(/\s+/).filter(Boolean).length;
      expect(words, `${h.slug} ongNguon has ${words} words`).toBeGreaterThanOrEqual(80);
      expect(d.phongTuc.length, h.slug).toBeGreaterThanOrEqual(5);
      for (const x of d.phongTuc) {
        expect(x.title.length).toBeGreaterThan(2);
        expect(x.text.length).toBeGreaterThan(40);
      }
      expect(d.facts.length, h.slug).toBeGreaterThanOrEqual(4);
      for (const f of d.facts) expect(f.length).toBeGreaterThan(30);
    }
  });

  it("EN deep items mirror the VI photo stems (img parity by index)", () => {
    for (let i = 0; i < holidays.length; i++) {
      const viD = holidays[i].deep;
      const enD = holidaysEn[i].deep;
      expect(enD.amThuc.length, holidays[i].slug).toBe(viD.amThuc.length);
      expect(enD.phongTuc.length, holidays[i].slug).toBe(viD.phongTuc.length);
      viD.amThuc.forEach((a, j) =>
        expect(enD.amThuc[j].img, `${holidays[i].slug} amThuc[${j}]`).toBe(a.img),
      );
      viD.phongTuc.forEach((x, j) =>
        expect(enD.phongTuc[j].img, `${holidays[i].slug} phongTuc[${j}]`).toBe(
          x.img,
        ),
      );
    }
  });

  it("EN text is actually English (no un-translated VI phrases)", () => {
    // Proper nouns keep their diacritics (Tết, Đà Nẵng…) — instead look for
    // multi-word Vietnamese phrases that signal an un-translated passage.
    const viPhrases =
      /\b(chúc mừng|kính chúc|nhân dịp|ngày lễ|lời chúc|phong tục|nguồn gốc|ý nghĩa|gợi ý quà|sức khỏe dồi dào|vạn sự như ý|an khang thịnh vượng)\b/i;
    for (const h of holidaysEn) {
      expect(h.tagline, `${h.slug} tagline`).not.toMatch(viPhrases);
      expect(h.wishes.join(" "), `${h.slug} wishes`).not.toMatch(viPhrases);
      expect(
        h.faq.map((f) => f.q + f.a).join(" "),
        `${h.slug} faq`,
      ).not.toMatch(viPhrases);
    }
  });
});

describe("EN stories parity", () => {
  it("covers every holiday with ≥3 HTTPS sources", () => {
    const seen = new Set<string>();
    for (const slug of viSlugs) {
      const st = storiesEn[slug];
      expect(st, `no EN story for ${slug}`).toBeDefined();
      expect(st.sources.length).toBeGreaterThanOrEqual(3);
      for (const s of st.sources) {
        expect(s.url).toMatch(/^https:/);
        expect(s.summary.length).toBeGreaterThan(40);
        expect(seen.has(`${slug}:${s.url}`)).toBe(false);
        seen.add(`${slug}:${s.url}`);
      }
      expect(st.story.body.length).toBeGreaterThan(300);
    }
  });

  it("EN stories link to English sources (not vi.wikipedia)", () => {
    for (const slug of viSlugs) {
      for (const s of storiesEn[slug].sources) {
        expect(s.url, `${slug}: ${s.url}`).not.toMatch(/vi\.wikipedia\.org/);
      }
    }
  });
});

describe("locale routing helpers", () => {
  it("localePrefix / localePath build correct URLs", () => {
    expect(localePrefix("vi")).toBe("");
    expect(localePrefix("en")).toBe("/en");
    expect(localePath("vi", "/lich/")).toBe("/lich/");
    expect(localePath("en", "/lich/")).toBe("/en/lich/");
    expect(localePath("en", "/")).toBe("/en/");
    expect(localePath("vi", "/")).toBe("/");
    expect(localePath("en", "/tet-nguyen-dan/")).toBe("/en/tet-nguyen-dan/");
  });

  it("translatePath round-trips between locales", () => {
    const cases = ["/", "/tet-nguyen-dan/", "/lich/", "/credits/"];
    for (const p of cases) {
      const enPath = translatePath(p);
      expect(enPath.startsWith("/en")).toBe(true);
      expect(translatePath(enPath)).toBe(p);
    }
    expect(translatePath("/")).toBe("/en/");
    expect(translatePath("/en/")).toBe("/");
    expect(translatePath("/en/tet-nguyen-dan/")).toBe("/tet-nguyen-dan/");
  });
});

describe("Messages shape parity", () => {
  it("en and vi expose identical key structures", () => {
    const viKeys = shapeOf(vi as Messages).sort();
    const enKeys = shapeOf(en as Messages).sort();
    expect(enKeys).toEqual(viKeys);
  });
});
