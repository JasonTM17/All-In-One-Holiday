import { ogCard, OG_SIZE } from "@/lib/og-card";
import { getStrings } from "@/i18n";

export const dynamic = "force-static";
export const alt = "Nguồn hình ảnh — Ngày Lễ Việt";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const t = getStrings("vi");
  return ogCard({
    eyebrow: t.credits.eyebrow,
    title: t.credits.h1,
    subtitle: t.credits.intro,
    from: "#44403c",
    to: "#a16207",
  });
}
