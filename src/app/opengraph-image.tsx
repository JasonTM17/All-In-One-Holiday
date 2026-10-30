import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { holidays } from "@/data/holidays";

export const dynamic = "force-static";
export const alt = "Ngày Lễ Việt — Lịch lễ hội và lời chúc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const bold = await readFile(
    join(process.cwd(), "src/assets/fonts/BeVietnamPro-Bold.ttf"),
  );
  const regular = await readFile(
    join(process.cwd(), "src/assets/fonts/BeVietnamPro-Regular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #881337, #b45309)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            Lễ
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>Ngày Lễ Việt</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Mỗi ngày lễ, một lời yêu thương.
          </div>
          <div style={{ fontSize: 30, opacity: 0.9 }}>
            {`Đếm ngược · Ý nghĩa · Phong tục · Lời chúc — ${holidays.length} ngày lễ trong năm`}
          </div>
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
}
