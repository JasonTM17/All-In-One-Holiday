import { ogCard, OG_SIZE } from "@/lib/og-card";
import { getStrings } from "@/i18n";

export const dynamic = "force-static";
export const alt = "Holiday calendar for the whole year — Ngày Lễ Việt";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const t = getStrings("en");
  return ogCard({
    eyebrow: t.calendar.eyebrow,
    title: t.calendar.metaTitle,
    subtitle: t.calendar.intro,
    from: "#1e40af",
    to: "#0e7490",
  });
}
