import { ogCard, OG_SIZE } from "@/lib/og-card";
import { getStrings } from "@/i18n";

export const dynamic = "force-static";
export const alt = "Tạo thiệp ngày lễ miễn phí — Ngày Lễ Việt";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const t = getStrings("vi");
  return ogCard({
    eyebrow: t.thiep.eyebrow,
    title: t.thiep.metaTitle,
    subtitle: t.thiep.intro,
    from: "#9d174d",
    to: "#d97706",
  });
}
