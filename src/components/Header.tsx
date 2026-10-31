import Link from "next/link";
import dynamic from "next/dynamic";
import Motif from "./Motif";

const SearchPalette = dynamic(() => import("./SearchPalette"));
const ThemeToggle = dynamic(() => import("./ThemeToggle"));
const PwaRegister = dynamic(() => import("./PwaRegister"));

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          prefetch={false}
          className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-[var(--color-brand-deep)]"
        >
          <Motif name="lantern" className="h-7 w-7" filled />
          Ngày Lễ Việt
        </Link>
        <nav aria-label="Điều hướng chính" className="flex items-center gap-2 sm:gap-5">
          <Link
            href="/#danh-sach"
            prefetch={false}
            className="u-link hidden min-h-11 items-center px-2 text-sm font-bold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)] sm:inline-flex"
          >
            Tất cả ngày lễ
          </Link>
          <Link
            href="/lich/"
            prefetch={false}
            className="u-link hidden min-h-11 items-center px-2 text-sm font-bold text-[var(--color-muted)] hover:text-[var(--color-brand-deep)] sm:inline-flex"
          >
            Lịch
          </Link>
          <SearchPalette />
          <ThemeToggle />
          <PwaRegister />
          <Link
            href="/birthday/"
            prefetch={false}
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--color-brand-deep)] px-5 py-2.5 text-sm font-bold text-[var(--color-on-brand)] transition-colors hover:brightness-110"
          >
            Tạo thiệp sinh nhật
          </Link>
        </nav>
      </div>
    </header>
  );
}
