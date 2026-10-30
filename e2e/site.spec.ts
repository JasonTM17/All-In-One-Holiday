import { test, expect } from "@playwright/test";

test("home renders hero and filters holidays", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /ngày lễ/i }),
  ).toBeVisible();
  const grid = page.locator("#danh-sach");
  await page.getByRole("button", { name: "Phụ nữ", exact: true }).click();
  await expect(
    grid.getByRole("link", { name: /Quốc tế Phụ nữ 8\/3/ }),
  ).toBeVisible();
  await expect(
    grid.getByRole("link", { name: /Ngày Phụ nữ Việt Nam 20\/10/ }),
  ).toBeVisible();
  await expect(
    grid.getByRole("link", { name: /Tết Nguyên Đán/ }),
  ).toHaveCount(0);
});

test("holiday page renders sections and copies a wish", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/trung-thu/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Tết Trung thu" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Phong tục & hoạt động" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Lời chúc" })).toBeVisible();
  const firstCopy = page
    .getByRole("button", { name: "Sao chép", exact: true })
    .first();
  await firstCopy.click();
  await expect(
    page.getByRole("button", { name: "Đã sao chép" }).first(),
  ).toBeVisible();
});

test("birthday page personalizes from query params", async ({ page }) => {
  await page.goto("/birthday/?name=Lan&date=2000-05-10&msg=Chuc+mung&from=An");
  await expect(
    page.getByRole("heading", { name: "Lan", level: 2 }),
  ).toBeVisible();
  await expect(page.getByText(/bước sang tuổi 27/)).toBeVisible();
  await expect(page.getByText(/Chuc mung/)).toBeVisible();
  await expect(page.getByText(/Gửi từ An/)).toBeVisible();
  // name with HTML must render as text, not markup
  await page.goto("/birthday/?name=%3Cb%3EHack%3C%2Fb%3E&date=2000-01-01");
  await expect(page.getByRole("heading", { name: "<b>Hack</b>" })).toBeVisible();
});

test("unknown route shows 404", async ({ page }) => {
  const res = await page.goto("/khong-ton-tai-abc/");
  expect(res?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Không tìm thấy trang" }),
  ).toBeVisible();
});
