# Ngày Lễ Việt

Trang tĩnh (static) đa landing-page về các ngày lễ Việt Nam và quốc tế, bằng tiếng Việt. Next.js App Router + Tailwind CSS, xuất ra HTML tĩnh (`output: 'export'`).

## Chạy

```bash
npm install
npm run dev        # dev server
npm run build      # xuất site tĩnh ra thư mục out/
npm test           # test logic ngày tháng (vitest)
npm run lint
```

## Thêm một ngày lễ

1. Mở `src/data/holidays.ts`, thêm một object `Holiday` vào mảng `holidays`:
   - `slug` — đường dẫn `/<slug>/`
   - `rule` — `{ type: 'solar', month, day }` (dương lịch), `{ type: 'lunar', month, day }` (âm lịch, tự quy đổi), hoặc `{ type: 'nth-weekday', month, weekday, nth }` (vd. Chủ nhật thứ 2 tháng 5)
   - `theme`, `history`, `traditions`, `wishes`, `gifts`, `faq`…
2. Không cần thêm route — trang `/<slug>/` tự sinh qua `generateStaticParams` và xuất hiện trong grid + sitemap.

## Triển khai

`npm run build` → nội dung trong `out/` có thể đẩy lên bất kỳ static host nào (Vercel, Netlify, Cloudflare Pages, GitHub Pages…).

## Thiệp sinh nhật

`/birthday/?name=<tên>&date=<YYYY-MM-DD>&msg=<lời nhắn>&from=<người gửi>` — nhập qua form hoặc truyền thẳng qua URL. Không có dữ liệu cá nhân nào được lưu trữ.
