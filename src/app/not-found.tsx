import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-7xl font-black text-rose-800">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-stone-900">
        Không tìm thấy trang
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-rose-700 px-6 py-3 font-semibold text-white hover:bg-rose-800"
      >
        Về trang chủ
      </Link>
    </section>
  );
}
