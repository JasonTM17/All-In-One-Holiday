import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-7xl font-black text-[var(--color-brand-deep)]">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-[var(--color-ink)]">
        Không tìm thấy trang
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[var(--color-brand)] px-6 py-3 font-semibold text-white hover:bg-[var(--color-brand-deep)]"
      >
        Về trang chủ
      </Link>
    </section>
  );
}
