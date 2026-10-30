import { describe, expect, it } from "vitest";
import { holidays, CATEGORY_LABELS } from "./holidays";
import { nextOccurrence } from "@/lib/dates";
import sitemap from "@/app/sitemap";

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
