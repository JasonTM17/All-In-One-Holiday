import Link from "next/link";
import { holidays } from "@/data/holidays";
import Motif from "./Motif";

export default function Footer() {
  const featured = ["tet-nguyen-dan", "quoc-te-phu-nu", "phu-nu-viet-nam", "trung-thu"]
    .map((s) => holidays.find((h) => h.slug === s))
    .filter((h) => h !== undefined);

  return (
    <footer className="dot-pattern-ink border-t border-[var(--color-line)] bg-[#f5f0e8]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="flex items-center gap-2 font-display text-xl font-extrabold text-[var(--color-brand-deep)]">
            <Motif name="lantern" className="h-7 w-7" filled />
            Ngày Lễ Việt
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
            Lịch lễ hội Việt Nam và quốc tế — ý nghĩa, phong tục và lời chúc
            cho từng dịp trong năm.
          </p>
        </div>
        <nav aria-label="Ngày lễ nổi bật">
          <p className="eyebrow text-[var(--color-faint)]">Ngày lễ nổi bật</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {featured.map((h) => (
              <li key={h.slug}>
                <Link
                  href={`/${h.slug}/`}
                  className="font-medium text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]"
                >
                  {h.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Liên kết khác">
          <p className="eyebrow text-[var(--color-faint)]">Khám phá</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/#danh-sach" className="font-medium text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                Tất cả ngày lễ
              </Link>
            </li>
            <li>
              <Link href="/birthday/" className="font-medium text-[var(--color-muted)] hover:text-[var(--color-brand-deep)]">
                Thiệp sinh nhật
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-[var(--color-line)]">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-[var(--color-faint)] sm:px-6">
          Mẫu trang cộng đồng — dữ liệu chỉ phục vụ tham khảo.
        </p>
      </div>
    </footer>
  );
}
