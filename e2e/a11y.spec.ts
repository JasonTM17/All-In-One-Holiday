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

test("axe: photo lightbox dialog on /trung-thu/", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/trung-thu/");
  // Photo triggers live in the cuisine cards + gallery band.
  const trigger = page
    .getByRole("button", { name: /Xem ảnh lớn:/ })
    .first();
  await expect(trigger).toBeVisible();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
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
  // Esc closes and focus returns to the trigger.
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("gallery: six photos open a shared lightbox with keyboard nav", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/trung-thu/");
  const gallery = page.locator('section[aria-labelledby="hinh-anh"]');
  const triggers = gallery.locator("button");
  await expect(triggers).toHaveCount(6);

  // Open photo 1 — the shared dialog shows it with its counter. The
  // gallery island hydrates lazily, so retry the click until it sticks.
  const dialog = page.getByRole("dialog");
  await expect(async () => {
    await triggers.nth(0).click();
    await expect(dialog).toBeVisible({ timeout: 1500 });
  }).toPass();
  await expect(dialog).toContainText("Ảnh 1 trên 6");

  // ArrowRight advances, ArrowLeft steps back and wraps around.
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toContainText("Ảnh 2 trên 6");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("Ảnh 1 trên 6");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText("Ảnh 6 trên 6");

  // Focus trap: Tab cycles the prev/next/close controls only.
  await page.keyboard.press("Tab");
  const focused1 = await page.evaluate(() =>
    document.activeElement?.getAttribute("aria-label"),
  );
  expect(["Ảnh trước", "Ảnh sau", "Đóng ảnh"]).toContain(focused1);

  // Esc closes and focus returns to the trigger that opened it.
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(triggers.nth(0)).toBeFocused();

  // The open dialog itself is axe-clean.
  await triggers.nth(3).click();
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
  await page.keyboard.press("Escape");
});

test("signature steps render as an ordered, headed sequence", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tet-nguyen-dan/");
  // The bánh chưng ritual: steps are list items inside an <ol> under a
  // labelled section heading.
  const section = page.locator("section", {
    has: page.getByRole("heading", { name: /Gói bánh chưng/ }),
  });
  await expect(section).toBeVisible();
  const steps = section.locator("ol li");
  await expect(steps).toHaveCount(4);
  await expect(steps.first()).toContainText("Vo gạo");
});

test("photo cards render images in the cuisine section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/trung-thu/");
  const cuisine = page.getByRole("heading", { name: "Ẩm thực & lễ vật" });
  await expect(cuisine).toBeVisible();
  // Every cuisine card shows a photo trigger (button opens the lightbox).
  const photos = page.getByRole("button", { name: /Xem ảnh lớn:/ });
  expect(await photos.count()).toBeGreaterThanOrEqual(5);
  await expect(photos.first().locator("img")).toBeVisible();
});
