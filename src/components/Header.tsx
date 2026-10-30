import Link from "next/link";
import Motif from "./Motif";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-[var(--color-brand-deep)]"
        >
          <Motif name="lantern" className="h-7 w-7" filled />
          Ngày Lễ Việt
        </Link>
        <nav aria-label="Điều hướng chính" className="flex items-center gap-2 sm:gap-5">
          <Link
            href="/#danh-sach"
            className="u-link hidden min-h-11 items-center px-2 text-sm font-bold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)] sm:inline-flex"
          >
            Tất cả ngày lễ
          </Link>
          <Link
            href="/birthday/"
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-brand-deep)]"
          >
            Tạo thiệp sinh nhật
          </Link>
        </nav>
      </div>
    </header>
  );
}
