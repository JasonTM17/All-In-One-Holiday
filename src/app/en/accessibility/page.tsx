import type { Metadata } from "next";
import AccessibilityPage, {
  accessibilityMetadata,
} from "@/components/pages/accessibility";

export const metadata: Metadata = accessibilityMetadata("en");

export default function Page() {
  return <AccessibilityPage locale="en" />;
}
