# Triển khai — Ngày Lễ Việt

Hướng dẫn các bước **chủ repo phải tự làm** (tài khoản GitHub/DNS/Search Console
không thể tự động hoá bằng code). Site đang chạy tại
`https://jasontm17.github.io/All-In-One-Holiday/` qua GitHub Pages +
workflow `.github/workflows/pages.yml`.

## 1. GitHub Pages (đã cấu hình sẵn)

1. Repo → **Settings → Pages → Source: GitHub Actions**.
2. Push lên `main` → workflow build với
   `NEXT_PUBLIC_BASE_PATH=/All-In-One-Holiday` và
   `NEXT_PUBLIC_SITE_URL=https://jasontm17.github.io/All-In-One-Holiday`,
   rồi deploy `out/`.
3. Kiểm tra sau deploy: `/manifest.webmanifest`, `/sw.js`,
   `/sitemap.xml`, `/feed.xml`, `/ngay-le-viet.ics` đều trả về 200.

## 2. Custom domain (tuỳ chọn, vd. `ngayleviet.vn`)

Mặc định code đã sẵn sàng: `NEXT_PUBLIC_SITE_URL` mặc định là
`https://ngayleviet.vn` (`src/lib/site.ts`), nên chỉ cần đổi env workflow.

1. **File CNAME**: tạo `public/CNAME` chứa đúng một dòng `ngayleviet.vn`
   (được copy vào `out/` mỗi build). Hoặc điền domain tại
   **Settings → Pages → Custom domain** — GitHub tự tạo file `CNAME`.
2. **DNS** tại nhà cung cấp tên miền:
   - **Apex** (`ngayleviet.vn`) — 4 bản ghi `A` trỏ tới IP GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (thêm `AAAA` `2606:50c0:8000::153` … `8003::153` nếu muốn IPv6).
   - **`www`** — bản ghi `CNAME` trỏ tới `jasontm17.github.io`.
   - Nếu muốn `www` → apex: bật redirect www ở DNS provider, hoặc giữ cả hai
     (GitHub Pages tự phục vụ cả hai khi đã khai báo).
3. **Env workflow** (`.github/workflows/pages.yml`) — khi site chạy ở root
   domain thì bỏ base path:
   ```yaml
   NEXT_PUBLIC_BASE_PATH: ""
   NEXT_PUBLIC_SITE_URL: https://ngayleviet.vn
   ```
   Canonical, hreflang, sitemap, `og:*`, JSON-LD và link `webcal:` đều tự đổi
   theo `NEXT_PUBLIC_SITE_URL`. **Lưu ý:** `webcal://` subscribe chỉ hoạt động
   đúng khi `NEXT_PUBLIC_SITE_URL` trỏ đúng domain công khai.
4. **Enforce HTTPS**: sau khi DNS trỏ đúng và chứng chỉ Let's Encrypt được
   cấp (vài phút → vài giờ), tick **Settings → Pages → Enforce HTTPS**.
5. Nếu trước đó site đã chạy dưới `/All-In-One-Holiday/`, các URL cũ sẽ
   "rớt" path — cân nhắc giữ thêm một bản build ở path cũ hoặc chấp nhận
   redirect từ domain mới (GitHub Pages không hỗ trợ redirect rule; có thể
   thêm `<meta http-equiv="refresh">` vào `404.html` nếu cần).

## 3. Google Search Console

1. Vào <https://search.google.com/search-console> → **Add property**:
   - **Domain property** (`ngayleviet.vn`) — khuyến nghị, bao trọn mọi
     subdomain + http/https. Xác minh bằng **DNS TXT**: copy chuỗi
     `google-site-verification=…` vào DNS provider, chờ DNS lan rồi bấm Verify.
   - Hoặc **URL-prefix** (`https://ngayleviet.vn/`) — xác minh bằng
     **HTML tag**: lấy `<meta name="google-site-verification" content="…">`,
     thêm vào `app/layout.tsx` dưới `metadata.verification.google`
     (hoặc `verification: { google: "<mã>" }`), deploy lại rồi Verify.
2. Sau khi verify: **Sitemaps → Add a new sitemap** → nhập
   `sitemap.xml` → Submit. Sitemap tự sinh mỗi build (`src/app/sitemap.ts`)
   gồm cả `hreflang` vi/en.
3. Theo dõi **Page indexing** vài ngày; không cần request indexing thủ công
   cho từng trang (sitemap đủ).

## 4. Bing / các máy tìm kiếm khác

- **Bing Webmaster Tools** <https://www.bing.com/webmasters>: đăng nhập
  Microsoft → **Import from Google Search Console** (nhanh nhất — kéo theo
  cả sitemap), hoặc Add site thủ công và submit `sitemap.xml`.
- **robots.txt** đã mở (`src/app/robots.ts`) và trỏ `Sitemap:` tuyệt đối —
  các engine khác tự tìm thấy.

## 5. Bảo trì định kỳ

| Việc | Tần suất | Cách làm |
| --- | --- | --- |
| Kiểm tra link nguồn chết | Vài tháng/lần | `npm run check:links` — cần mạng; `BLOCKED 403/429` là site chặn bot, kiểm tay bằng trình duyệt |
| File `.ics` | Tự động | `scripts/gen-ics.mjs` sinh lại mỗi build, phủ **năm hiện tại + 2 năm** — chỉ cần site được build lại trong năm là đủ mới |
| Lịch âm / Thanh minh | Không cần hằng năm | `LUNAR_TABLE` + `QINGMING_TABLE` phủ **1900–2100**; quá 2100 mới cần chỉnh `FIRST_YEAR/LAST_YEAR` trong `scripts/gen-lunar-table.mjs` rồi `npm run gen:lunar` |
| Thêm ngày lễ mới | Khi Nhà nước ban hành | Làm theo `CONTRIBUTING.md — Adding a holiday` (thêm `holidays.ts` + `holidays-en.ts` + stories + ảnh → `npm run gen:data && npm test`) |
| Feed + API JSON | Tự động | `gen-feed.mjs`, `gen-api.mjs` chạy trong `prebuild` mỗi lần build |
| Phiên bản service worker | Khi đổi `public/sw.js` | Tăng `VERSION` trong file — cache cũ tự dọn lúc `activate` |
