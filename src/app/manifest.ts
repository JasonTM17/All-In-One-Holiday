import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ngày Lễ Việt",
    short_name: "Ngày Lễ Việt",
    description:
      "Lịch các ngày lễ Việt Nam và quốc tế: đếm ngược, ý nghĩa, phong tục, lời chúc và thiệp.",
    lang: "vi",
    start_url: `${BASE}/`,
    scope: `${BASE}/`,
    display: "standalone",
    background_color: "#fffdf8",
    theme_color: "#be123c",
    icons: [
      { src: `${BASE}/icon-192.png`, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: `${BASE}/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: `${BASE}/icon-512-maskable.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
