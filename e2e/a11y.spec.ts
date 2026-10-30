import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const PAGES = ["/", "/tet-nguyen-dan/", "/phu-nu-viet-nam/", "/trung-thu/", "/birthday/"];

for (const path of PAGES) {
  test(`axe: no serious+ violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    // Reveal scroll-animated sections so axe audits them at real contrast.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
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
