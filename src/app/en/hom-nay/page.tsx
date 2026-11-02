import type { Metadata } from "next";
import TodayPage, { todayMetadata } from "@/components/pages/today";

export const metadata: Metadata = todayMetadata("en");

export default function Page() {
  return <TodayPage locale="en" />;
}
