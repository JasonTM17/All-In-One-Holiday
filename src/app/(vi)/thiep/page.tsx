import type { Metadata } from "next";
import CardPage, { cardMetadata } from "@/components/pages/card";

export const metadata: Metadata = cardMetadata("vi");

export default function Page() {
  return <CardPage locale="vi" />;
}
