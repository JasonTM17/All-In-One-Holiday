import type { Metadata } from "next";
import BirthdayPage, { birthdayMetadata } from "@/components/pages/birthday";

export const metadata: Metadata = birthdayMetadata("en");

export default function Page() {
  return <BirthdayPage locale="en" />;
}
