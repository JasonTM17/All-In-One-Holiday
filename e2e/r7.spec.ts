import { test, expect } from "@playwright/test";

test.describe("r7 features", () => {
  test("calendar page navigates months and shows holiday chips", async ({ page }) => {
    await page.goto("/lich/");
    await expect(page.getByRole("heading", { name: /Lịch ngày lễ/i })).toBeVisible();
    await page.getByRole("button", { name: "Tháng trước" }).click();
    await page.getByRole("button", { name: "Tháng sau" }).click();
    await page.getByRole("button", { name: "Hôm nay" }).click();
    await expect(page.getByRole("link", { name: /\.ics/ })).toHaveAttribute("href", /ngay-le-viet\.ics/);
  });
  test("command palette opens, searches without diacritics, navigates", async ({ page }) => {
    await page.goto("/");
    // The ⌘K listener attaches at hydration; retry until the dialog opens.
    await expect(async () => {
      await page.keyboard.press("Control+k");
      await expect(
        page.getByPlaceholder(/Nhập tên ngày lễ/),
      ).toBeVisible({ timeout: 1500 });
    }).toPass();
    await page.keyboard.type("tet nguyen dan");
    const hit = page.getByRole("link", { name: /Tết Nguyên Đán/ }).first();
    await expect(hit).toBeVisible();
    await hit.click();
    await expect(page).toHaveURL(/tet-nguyen-dan/);
  });
  test("dark mode toggle persists across reload", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /giao diện tối|giao diện sáng/i }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
  test("thiep maker renders canvas and download button", async ({ page }) => {
    await page.goto("/thiep/?holiday=tet-nguyen-dan&to=Lan&msg=Chuc%20mung");
    await expect(page.getByTestId("thiep-canvas")).toBeVisible();
    await expect(page.getByTestId("thiep-download")).toBeVisible();
    const [dl] = await Promise.all([
      page.waitForEvent("download"),
      page.getByTestId("thiep-download").click(),
    ]);
    expect(dl.suggestedFilename()).toContain("thiep-tet-nguyen-dan");
  });
  test("home shows 90-day timeline and tools row", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() =>
      document.querySelector("#sap-toi")?.scrollIntoView(),
    );
    await expect(page.getByText(/Trong 90 ngày tới/)).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Lịch ngày lễ/ }).first(),
    ).toBeVisible();
  });
  test("new holiday pages render", async ({ page }) => {
    await page.goto("/tet-doan-ngo/");
    await expect(page.getByRole("heading", { name: /Đoan Ngọ/ }).first()).toBeVisible();
    await page.goto("/ngay-bao-chi/");
    await expect(page.getByRole("heading", { name: /Báo chí/ }).first()).toBeVisible();
  });
});
