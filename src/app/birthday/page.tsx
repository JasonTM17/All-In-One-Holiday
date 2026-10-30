import type { Metadata } from "next";
import { Suspense } from "react";
import BirthdayCard from "@/components/BirthdayCard";

export const metadata: Metadata = {
  title: "Thiệp sinh nhật",
  description:
    "Tạo thiệp sinh nhật cá nhân trong vài giây: đếm ngược, lời nhắn và liên kết chia sẻ.",
  openGraph: {
    title: "Thiệp sinh nhật",
    description: "Tạo thiệp sinh nhật cá nhân trong vài giây.",
  },
};

export default function BirthdayPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <h1 className="font-display text-3xl font-extrabold text-stone-900 sm:text-4xl">
          Thiệp sinh nhật
        </h1>
      </div>
      <div className="mx-auto max-w-3xl">
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="mx-auto h-96 max-w-lg animate-pulse rounded-3xl bg-stone-200/60"
            />
          }
        >
          <BirthdayCard />
        </Suspense>
      </div>
    </section>
  );
}
