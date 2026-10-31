import type { Metadata } from "next";
import CreditsPage, { creditsMetadata } from "@/components/pages/credits";

export const metadata: Metadata = creditsMetadata("en");

export default function Page() {
  return <CreditsPage locale="en" />;
}
