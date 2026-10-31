import { test, expect } from "@playwright/test";

test.describe("English locale /en/", () => {
  test("home renders English content with lang=en", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Every holiday is a chance/i,
      }),
    ).toBeVisible();
    // English category filter works and shows English names
    const grid = page.locator("#danh-sach");
    await page.getByRole("button", { name: "Women", exact: true }).click();
    await expect(
      grid.getByRole("link", { name: /International Women's Day/ }),
    ).toBeVisible();
    await expect(
      grid.getByRole("link", { name: /Lunar New Year/ }),
    ).toHaveCount(0);
  });

  test("holiday page renders English sections and English links", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/trung-thu/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Mid-Autumn Festival" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Traditions & activities" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Wishes", exact: true }),
    ).toBeVisible();
    const firstCopy = page
      .getByRole("button", { name: "Copy", exact: true })
      .first();
    await firstCopy.click();
    await expect(
      page.getByRole("button", { name: "Copied" }).first(),
    ).toBeVisible();
  });

  test("canonical and hreflang alternates are locale-aware", async ({
    page,
  }) => {
    await page.goto("/en/tet-nguyen-dan/");
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /\/en\/tet-nguyen-dan\/?$/);
    await expect(
      page.locator('link[rel="alternate"][hreflang="vi"]'),
    ).toHaveAttribute("href", /\/tet-nguyen-dan\/?$/);
    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveAttribute("href", /\/en\/tet-nguyen-dan\/?$/);
    await expect(
      page.locator('link[rel="alternate"][hreflang="x-default"]'),
    ).toHaveAttribute("href", /\/tet-nguyen-dan\/?$/);
  });

  test("language switch preserves the current subpath both ways", async ({
    page,
  }) => {
    await page.goto("/en/tet-nguyen-dan/");
    await page
      .getByRole("link", { name: /VI \| EN/ })
      .click();
    await expect(page).toHaveURL(/\/tet-nguyen-dan\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");

    await page
      .getByRole("link", { name: /VI \| EN/ })
      .click();
    await expect(page).toHaveURL(/\/en\/tet-nguyen-dan\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("calendar page renders in English", async ({ page }) => {
    await page.goto("/en/lich/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /holiday calendar/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Next month", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Subscribe (.ics)", exact: true }),
    ).toBeVisible();
  });

  test("Thanh Minh holiday page renders in English", async ({ page }) => {
    await page.goto("/en/tet-thanh-minh/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Tết Thanh Minh/,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Origins", exact: true }),
    ).toBeVisible();
  });
});
