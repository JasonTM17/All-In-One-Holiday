// Quick light/dark screenshot capture for visual self-review.
import { chromium } from "playwright";

const BASE = "http://localhost:3200";
const PAGES = ["", "tet-nguyen-dan", "thiep", "lich", "birthday"];

const browser = await chromium.launch();
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: theme === "dark" ? "dark" : "light",
  });
  const page = await ctx.newPage();
  for (const p of PAGES) {
    const name = p === "" ? "home" : p;
    await page.goto(`${BASE}/${p}`, { waitUntil: "networkidle" });
    if (theme === "dark") {
      await page.evaluate(() => {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      });
      await page.reload({ waitUntil: "networkidle" });
    }
    await page.waitForTimeout(700);
    await page.screenshot({ path: `screenshots/review-${name}-${theme}.png` });
    console.log(`review-${name}-${theme}.png`);
  }
  await ctx.close();
}
await browser.close();
