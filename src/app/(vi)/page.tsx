import type { Metadata } from "next";
import HomePage, { homeMetadata } from "@/components/pages/home";

export const metadata: Metadata = homeMetadata("vi");

export default function Home() {
  return <HomePage locale="vi" />;
}
