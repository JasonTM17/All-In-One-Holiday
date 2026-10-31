import type { Metadata } from "next";
import HolidayPage, {
  holidayMetadata,
  holidayParams,
} from "@/components/pages/holiday";

export function generateStaticParams() {
  return holidayParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return holidayMetadata(slug, "en");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <HolidayPage slug={slug} locale="en" />;
}
