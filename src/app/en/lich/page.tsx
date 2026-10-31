import type { Metadata } from "next";
import CalendarPage, { calendarMetadata } from "@/components/pages/calendar";

export const metadata: Metadata = calendarMetadata("en");

export default function Page() {
  return <CalendarPage locale="en" />;
}
