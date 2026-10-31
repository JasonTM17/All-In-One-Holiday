import { ogCard, OG_SIZE } from "@/lib/og-card";
import { getStrings } from "@/i18n";

export const dynamic = "force-static";
export const alt = "Create a personalized birthday card — Ngày Lễ Việt";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const t = getStrings("en");
  return ogCard({
    eyebrow: t.thiep.eyebrow,
    title: t.birthday.metaTitle,
    subtitle: t.birthday.metaDescription,
    from: "#be123c",
    to: "#ea580c",
  });
}
