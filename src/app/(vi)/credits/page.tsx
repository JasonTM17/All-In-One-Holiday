import type { Metadata } from "next";
import { imageCredits } from "@/data/image-credits";
import { holidays } from "@/data/holidays";

export const metadata: Metadata = {
  title: "Nguồn ảnh",
  description: "Ghi nhận tác giả và giấy phép của hình ảnh trên Ngày Lễ Việt.",
};

const NAME: Record<string, string> = {
  "home-hero": "Trang chủ",
  birthday: "Thiệp sinh nhật",
};
const NAME_OF = new Map<string, string>([
  ...holidays.map((h) => [h.slug, h.name] as [string, string]),
  ...Object.entries(NAME),
]);

export default function CreditsPage() {
  const entries = Object.entries(imageCredits);
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="eyebrow text-[var(--color-brand)]">Ghi nhận</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold text-[var(--color-ink)]">
        Nguồn hình ảnh
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
        Ảnh trên trang này đến từ cộng đồng Wikimedia Commons, theo các giấy
        phép tự do (CC0, CC BY, CC BY-SA, phạm vi công cộng). Xin cảm ơn các tác giả.
      </p>
      <div className="mt-10 space-y-10">
        {entries.map(([slug, list]) => (
          <section key={slug} aria-labelledby={`cr-${slug}`}>
            <h2
              id={`cr-${slug}`}
              className="font-display text-lg font-bold text-[var(--color-ink)]"
            >
              {NAME_OF.get(slug) ?? slug}
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {list.map((c) => (
                <li
                  key={c.file}
                  className="card flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
                >
                  <span className="truncate text-[var(--color-muted)]">
                    {c.file.split("/")[1]}
                  </span>
                  <a
                    href={c.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link shrink-0 font-semibold text-[var(--color-brand-deep)]"
                  >
                    {c.photographer} · {c.license}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
