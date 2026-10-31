import type { Metadata } from "next";
import CalendarPage, { calendarMetadata } from "@/components/pages/calendar";

export const metadata: Metadata = calendarMetadata("vi");

export default function Page() {
  return <CalendarPage locale="vi" />;
}
