import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <p className="font-display text-lg font-bold text-amber-100">
          Ngày Lễ Việt
        </p>
        <nav aria-label="Chân trang" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/" className="hover:text-white">
            Trang chủ
          </Link>
          <Link href="/#danh-sach" className="hover:text-white">
            Các ngày lễ
          </Link>
          <Link href="/birthday/" className="hover:text-white">
            Thiệp sinh nhật
          </Link>
        </nav>
        <p className="text-xs text-stone-500">
          Mẫu trang cộng đồng — dữ liệu chỉ phục vụ tham khảo.
        </p>
      </div>
    </footer>
  );
}
