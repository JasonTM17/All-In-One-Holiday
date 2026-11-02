import { ogCard, OG_SIZE } from "@/lib/og-card";
import { getStrings } from "@/i18n";

export const dynamic = "force-static";
export const alt = "What day is today — Ngày Lễ Việt";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const t = getStrings("en");
  return ogCard({
    eyebrow: t.today.eyebrow,
    title: t.today.metaTitle,
    subtitle: t.today.intro,
    from: "#0f766e",
    to: "#1e40af",
  });
}
