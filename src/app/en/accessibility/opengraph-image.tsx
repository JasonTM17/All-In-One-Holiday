import { ogCard, OG_SIZE } from "@/lib/og-card";
import { getStrings } from "@/i18n";

export const dynamic = "force-static";
export const alt = "Accessibility statement — Ngày Lễ Việt";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const t = getStrings("en");
  return ogCard({
    eyebrow: t.a11y.eyebrow,
    title: t.a11y.h1,
    subtitle: t.a11y.metaDescription,
    from: "#0f766e",
    to: "#1d4ed8",
  });
}
