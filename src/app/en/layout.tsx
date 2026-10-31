import type { Metadata, Viewport } from "next";
import "../globals.css";
import SiteRoot from "@/components/SiteRoot";
import { rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = rootMetadata("en");

export const viewport: Viewport = {
  themeColor: "#be123c",
};

export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteRoot locale="en">{children}</SiteRoot>;
}
