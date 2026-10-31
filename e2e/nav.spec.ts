import { test, expect } from "@playwright/test";

// Cheap navigation spec: footer links reach the feed and the accessibility
// pages, and the new holiday pages resolve in both locales.
test("footer links reach accessibility page and Atom feed", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Khả năng truy cập" })
    .last()
    .click();
  await expect(page).toHaveURL(/\/accessibility\/$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /tuyên bố khả năng truy cập/i,
    }),
  ).toBeVisible();

  const feed = page.getByRole("link", { name: "Nguồn cấp Atom" });
  await expect(feed).toHaveAttribute("href", /feed\.xml$/);
});

test("EN footer reaches the English accessibility page", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("link", { name: "Accessibility" }).last().click();
  await expect(page).toHaveURL(/\/en\/accessibility\/$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /accessibility statement/i,
    }),
  ).toBeVisible();
});

test("new holiday pages render in both locales", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [path, name] of [
    ["/ngay-sinh-nhat-bac/", /Hồ Chí Minh/i],
    ["/en/ngay-dien-bien-phu/", /Điện Biên Phủ/i],
    ["/ngay-thanh-lap-dang/", /Đảng Cộng sản/i],
    ["/en/ngay-cach-mang-thang-tam/", /August Revolution/i],
    ["/ngay-giai-phong-thu-do/", /Thủ đô/i],
  ] as const) {
    await page.goto(path);
    await expect(
      page.getByRole("heading", { level: 1, name }),
    ).toBeVisible();
  }
});
