import type { Metadata, Viewport } from "next";
import "../globals.css";
import SiteRoot from "@/components/SiteRoot";
import { rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = rootMetadata("vi");

export const viewport: Viewport = {
  themeColor: "#be123c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteRoot locale="vi">{children}</SiteRoot>;
}
