import type { Metadata } from "next";
import CardPage, { cardMetadata } from "@/components/pages/card";

export const metadata: Metadata = cardMetadata("en");

export default function Page() {
  return <CardPage locale="en" />;
}
