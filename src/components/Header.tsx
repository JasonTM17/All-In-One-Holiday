import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-amber-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-rose-800"
        >
          Ngày Lễ Việt
        </Link>
        <nav aria-label="Điều hướng chính" className="flex items-center gap-5">
          <Link
            href="/#danh-sach"
            className="hidden text-sm font-medium text-stone-600 hover:text-rose-800 sm:inline"
          >
            Tất cả ngày lễ
          </Link>
          <Link
            href="/birthday/"
            className="rounded-full bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-800"
          >
            Tạo thiệp sinh nhật
          </Link>
        </nav>
      </div>
    </header>
  );
}
