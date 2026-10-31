import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const PAGES = [
  "/",
  "/tet-nguyen-dan/",
  "/phu-nu-viet-nam/",
  "/trung-thu/",
  "/ngay-sinh-nhat-bac/",
  "/ngay-dien-bien-phu/",
  "/birthday/",
  "/lich/",
  "/thiep/",
  "/accessibility/",
  "/en/",
  "/en/tet-nguyen-dan/",
  "/en/lich/",
  "/en/thiep/",
  "/en/accessibility/",
  "/credits/",
  "/en/credits/",
];

for (const path of PAGES) {
  test(`axe: no serious+ violations on ${path}`, async ({ page }) => {
    // Reduced motion: Reveal never hides content, so axe audits settled colors.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(
      serious,
      serious.map((v) => `${v.id}: ${v.nodes.length} nodes`).join("\n"),
    ).toEqual([]);
  });
}
