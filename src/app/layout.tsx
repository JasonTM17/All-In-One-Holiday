import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl() + "/"),
  title: {
    default: "Ngày Lễ Việt — Lịch lễ hội & lời chúc",
    template: "%s | Ngày Lễ Việt",
  },
  description:
    "Lịch các ngày lễ Việt Nam và quốc tế: đếm ngược, ý nghĩa, phong tục, lời chúc và ý tưởng quà tặng. Tạo thiệp sinh nhật cá nhân miễn phí.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Ngày Lễ Việt",
    url: "/",
    images: [`${siteUrl()}/opengraph-image.png`],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#be123c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#noi-dung" className="skip-link">
          Bỏ qua đến nội dung
        </a>
        <Header />
        <main id="noi-dung">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
