# Ngày Lễ Việt

Trang tĩnh (static) đa landing-page về các ngày lễ Việt Nam và quốc tế, bằng tiếng Việt. Next.js App Router + Tailwind CSS, xuất ra HTML tĩnh (`output: 'export'`).

## Chạy

```bash
npm install
npm run dev        # dev server
npm run build      # xuất site tĩnh ra thư mục out/
npm test           # test logic ngày tháng + dữ liệu (vitest)
npm run test:e2e   # e2e + axe a11y (Playwright, cần build trước)
npm run lint
```

## Tính năng

- `/` — trang chủ: hero ảnh, đếm ngược, lịch trình 90 ngày, công cụ nhanh, băng ảnh Việt Nam, lưới 26 ngày lễ.
- `/[slug]/` — 26 trang lễ: đếm ngược, lịch sử, ý nghĩa, phong tục, quà tặng, 5+ lời chúc, câu chuyện & nguồn, **Gợi ý lời chúc** (tạo câu chúc theo tông).
- `/lich/` — lịch cả năm: ô ngày dương + âm, chip ngày lễ, lọc loại, agenda mobile, tải `ngay-le-viet.ics` (3 năm).
- `/thiep/` — tạo thiệp: 6 mẫu, tùy chỉnh người nhận/người gửi/lời chúc, tải PNG (1080×1350, 1200×630), chia sẻ (noindex).
- `/birthday/` — thiệp sinh nhật qua URL (noindex, không lưu dữ liệu).
- `Ctrl/⌘+K` — tìm ngày lễ không cần dấu.
- Chế độ tối (system + toggle, lưu localStorage), PWA (manifest + service worker, cài được).
- `/credits/` — nguồn ảnh theo giấy phép.
- Live: https://jasontm17.github.io/All-In-One-Holiday/

## Design system

Chi tiết nghiên cứu + token đầy đủ: [`docs/design-references.md`](docs/design-references.md).

- **Hướng thẩm mỹ**: festive editorial — hero "drenched" theo màu riêng của từng ngày lễ, nội dung trung tính ấm tối giản.
- **Màu**: token trong `@theme` ở `src/app/globals.css` (`--color-ink/muted/faint/surface/line/brand`). Mỗi holiday có `theme.from/to` gradient riêng.
- **Chữ**: Playfair Display (tiêu đề, có subset Vietnamese) + Be Vietnam Pro (nội dung). Nhạy số: `tabular-nums`.
- **Bố cục**: radius thống nhất 16px card / pill nút; chiều sâu = hairline + một lớp shadow tint; motif SVG riêng mỗi ngày lễ (`src/components/Motif.tsx`).
- **Motion**: IntersectionObserver reveal (`Reveal.tsx`), marquee, float ornaments; tôn trọng `prefers-reduced-motion`; countdown `aria-hidden` với nhãn tĩnh.
- **Không** dùng ảnh ngoài, emoji, hay asset có bản quyền.

## Thêm một ngày lễ

1. Mở `src/data/holidays.ts`, thêm một object `Holiday` vào mảng `holidays`:
   - `slug` — đường dẫn `/<slug>/`
   - `rule` — `{ type: 'solar', month, day }` (dương lịch), `{ type: 'lunar', month, day }` (âm lịch, tự quy đổi), hoặc `{ type: 'nth-weekday', month, weekday, nth }` (vd. Chủ nhật thứ 2 tháng 5)
   - `motif` — tên ornament trong `Motif.tsx`
   - `theme`, `history`, `traditions`, `wishes` (≥5), `gifts`, `faq`…
2. Không cần thêm route — trang `/<slug>/`, OG image, sitemap và grid tự sinh.

## Triển khai

`npm run build` → nội dung trong `out/` đẩy lên bất kỳ static host nào.

- **Custom domain**: build mặc định (không env).
- **GitHub Pages** (`user.github.io/All-In-One-Holiday/`): build với `NEXT_PUBLIC_BASE_PATH=/All-In-One-Holiday` và `NEXT_PUBLIC_SITE_URL=https://<user>.github.io/All-In-One-Holiday`. Workflow `.github/workflows/pages.yml` đã cấu hình sẵn cho repo này.

## Thiệp sinh nhật

`/birthday/?name=<tên>&date=<YYYY-MM-DD>&msg=<lời nhắn>&from=<người gửi>&theme=<hoa-hong|hoang-hon|dai-duong|rung-xanh>` — không lưu trữ dữ liệu cá nhân; trang `noindex`.

## Đóng góp

- Branch mới từ `main`, conventional commits (`feat:`, `fix:`…).
- Trước khi mở PR: `npm run lint && npx tsc --noEmit && npm test && npm run build && npm run test:e2e` phải xanh.
- Không commit dữ liệu cá nhân, secrets, hay file trong `.gitignore`.

## License

MIT — xem `LICENSE`.
