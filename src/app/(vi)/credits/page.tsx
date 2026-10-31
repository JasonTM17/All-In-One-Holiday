import type { Metadata } from "next";
import CreditsPage, { creditsMetadata } from "@/components/pages/credits";

export const metadata: Metadata = creditsMetadata("vi");

export default function Page() {
  return <CreditsPage locale="vi" />;
}
