import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { getHoliday, holidays } from "@/data/holidays";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export function generateStaticParams() {
  return holidays.map((h) => ({ slug: h.slug }));
}

export async function generateAlt({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<string> {
  const { slug } = await params;
  return getHoliday(slug)?.name ?? "Ngày lễ";
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const h = getHoliday(slug);
  if (!h) notFound();

  const bold = await readFile(
    join(process.cwd(), "src/assets/fonts/BeVietnamPro-Bold.ttf"),
  );
  const regular = await readFile(
    join(process.cwd(), "src/assets/fonts/BeVietnamPro-Regular.ttf"),
  );
  // Real holiday photo as the card backdrop (webp → jpeg for satori).
  const { default: sharp } = await import("sharp");
  const bgJpeg = await sharp(
    join(process.cwd(), `public/images/holidays/${slug}/hero.webp`),
  )
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: 74 })
    .toBuffer();
  const bg = `data:image/jpeg;base64,${bgJpeg.toString("base64")}`;

  const res = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundImage: `linear-gradient(160deg, ${h.theme.from}cc 0%, ${h.theme.from}66 45%, rgba(0,0,0,0.55) 100%), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 30,
            fontWeight: 700,
            opacity: 0.95,
          }}
        >
          <div>Ngày Lễ Việt</div>
          <div
            style={{
              border: "2px solid rgba(255,255,255,0.45)",
              borderRadius: 999,
              padding: "10px 28px",
              fontSize: 26,
            }}
          >
            {h.displayDate}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            {h.name}
          </div>
          <div style={{ fontSize: 32, opacity: 0.9 }}>{h.tagline}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Be Vietnam Pro", data: bold, weight: 700, style: "normal" },
        { name: "Be Vietnam Pro", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
  // Re-encode the satori PNG as JPEG — ~85% smaller for photo cards, and every
  // social scraper accepts og:image/jpeg.
  const png = Buffer.from(await res.arrayBuffer());
  const out = await sharp(png).flatten().jpeg({ quality: 82 }).toBuffer();
  return new Response(new Uint8Array(out), {
    headers: { "content-type": "image/jpeg" },
  });
}
