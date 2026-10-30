import Link from "next/link";
import { holidays } from "@/data/holidays";
import HolidayGrid from "@/components/HolidayGrid";
import NextHolidayHero from "@/components/NextHolidayHero";

export default function Home() {
  const wishCount = holidays.reduce((s, h) => s + h.wishes.length, 0);
  const traditionCount = holidays.reduce((s, h) => s + h.traditions.length, 0);

  const gridItems = holidays.map((h) => ({
    slug: h.slug,
    name: h.name,
    dateMark: h.dateMark,
    displayDate: h.displayDate,
    categories: h.categories,
    rule: h.rule,
    theme: h.theme,
    tagline: h.tagline,
  }));

  const heroItems = holidays.map((h) => ({
    slug: h.slug,
    name: h.name,
    rule: h.rule,
  }));

  return (
    <>
      <section className="dot-pattern bg-gradient-to-br from-rose-900 via-rose-800 to-amber-700 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
              Lịch lễ hội Việt Nam
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Mỗi ngày lễ,
              <br />
              một lời yêu thương.
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/85">
              Đếm ngược các ngày lễ Việt Nam và quốc tế, khám phá ý nghĩa,
              phong tục và những lời chúc sẵn sàng gửi đi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#danh-sach"
                className="rounded-full bg-white px-6 py-3 font-semibold text-rose-800 transition-colors hover:bg-amber-100"
              >
                Xem các ngày lễ
              </a>
              <Link
                href="/birthday/"
                className="rounded-full border-2 border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Tạo thiệp sinh nhật
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-black/20 p-6 backdrop-blur-sm sm:p-8">
            <NextHolidayHero items={heroItems} />
          </div>
        </div>
      </section>

      <section
        aria-label="Thống kê"
        className="border-b border-stone-200 bg-white"
      >
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-stone-200 px-4 sm:px-6">
          {[
            { v: `${holidays.length}`, l: "Ngày lễ" },
            { v: `${wishCount}+`, l: "Lời chúc sẵn có" },
            { v: `${traditionCount}+`, l: "Phong tục" },
          ].map((s) => (
            <div key={s.l} className="px-4 py-6 text-center sm:py-8">
              <dd className="font-display text-3xl font-extrabold text-rose-800 sm:text-4xl">
                {s.v}
              </dd>
              <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-500 sm:text-sm">
                {s.l}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <section
        id="danh-sach"
        aria-labelledby="danh-sach-title"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6"
      >
        <h2
          id="danh-sach-title"
          className="font-display text-3xl font-extrabold text-stone-900 sm:text-4xl"
        >
          Các ngày lễ trong năm
        </h2>
        <p className="mb-8 mt-2 max-w-xl text-stone-600">
          Sắp xếp theo ngày gần nhất — bấm vào từng ngày lễ để xem ý nghĩa,
          phong tục và lời chúc.
        </p>
        <HolidayGrid items={gridItems} />
      </section>

      <section className="dot-pattern bg-gradient-to-br from-rose-800 to-violet-800 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
            Sinh nhật ai đó sắp đến?
          </h2>
          <p className="max-w-xl text-white/85">
            Tạo thiệp sinh nhật cá nhân trong vài giây — có đếm ngược, pháo
            giấy và liên kết để chia sẻ.
          </p>
          <Link
            href="/birthday/"
            className="rounded-full bg-white px-8 py-3 font-semibold text-rose-800 transition-colors hover:bg-amber-100"
          >
            Tạo thiệp ngay
          </Link>
        </div>
      </section>
    </>
  );
}
