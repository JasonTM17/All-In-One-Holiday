import { ogCard, OG_SIZE } from "@/lib/og-card";
import { getStrings } from "@/i18n";
import { holidays } from "@/data/holidays";

export const dynamic = "force-static";
export const alt = "Ngày Lễ Việt — Vietnamese holiday calendar";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const t = getStrings("en");
  return ogCard({
    eyebrow: t.home.eyebrow,
    title: t.home.h1,
    subtitle: `Countdown · Origins · Traditions · Wishes — ${holidays.length} holidays a year`,
  });
}
