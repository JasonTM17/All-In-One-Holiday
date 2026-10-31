import { test, expect } from "@playwright/test";

test.describe("lunar (âm lịch) birthdays", () => {
  test("card renders from lunar params with dual dates and age", async ({
    page,
  }) => {
    await page.goto(
      "/birthday/?name=Lan&cal=lunar&lmonth=8&lday=15&lyear=2000",
    );
    await expect(
      page.getByRole("heading", { name: "Lan", level: 2 }),
    ).toBeVisible();
    // Dual-date line: "âm 15/8 — dương <date>"
    await expect(page.getByText(/âm 15\/8 — dương/)).toBeVisible();
    // Lunar birth year 2000 → age shown on the card.
    await expect(page.getByText(/bước sang tuổi|tròn/)).toBeVisible();
    await expect(
      page.getByText(/ngày nữa đến sinh nhật|tròn/),
    ).toBeVisible();
  });

  test("lunar card without a birth year hides the age", async ({ page }) => {
    await page.goto("/birthday/?name=An&cal=lunar&lmonth=5&lday=5");
    await expect(
      page.getByRole("heading", { name: "An", level: 2 }),
    ).toBeVisible();
    await expect(page.getByText(/âm 5\/5 — dương/)).toBeVisible();
    await expect(page.getByText(/Sinh nhật sắp tới|là sinh nhật/)).toBeVisible();
  });

  test("form toggle switches to lunar inputs and submits lunar params", async ({
    page,
  }) => {
    await page.goto("/birthday/");
    await page.getByLabel(/Tên người nhận/).fill("Minh");
    await page.getByRole("button", { name: "Âm lịch" }).click();
    await page.getByLabel(/Tháng âm/).selectOption("8");
    await page.getByLabel(/Ngày âm/).selectOption("15");
    await page.getByLabel(/Năm âm/).fill("1999");
    await page.getByRole("button", { name: "Tạo thiệp" }).click();
    await expect(page).toHaveURL(/cal=lunar&lmonth=8&lday=15&lyear=1999/);
    await expect(
      page.getByRole("heading", { name: "Minh", level: 2 }),
    ).toBeVisible();
    await expect(page.getByText(/âm 15\/8 — dương/)).toBeVisible();
  });

  test("English locale renders the lunar card", async ({ page }) => {
    await page.goto("/en/birthday/?name=Lan&cal=lunar&lmonth=1&lday=1&lyear=2000");
    await expect(
      page.getByRole("heading", { name: "Lan", level: 2 }),
    ).toBeVisible();
    await expect(page.getByText(/lunar 1\/1 — solar/)).toBeVisible();
  });
});
