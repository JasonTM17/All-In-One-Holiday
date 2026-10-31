import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Shared 1200×630 branded card for tool-page opengraph-image routes. */
export const OG_SIZE = { width: 1200, height: 630 };

const FONT_DIR = join(process.cwd(), "src/assets/fonts");

/**
 * Branded OG card: "Ngày Lễ Việt" mark + eyebrow pill on top,
 * big title + subtitle at the bottom over a diagonal gradient.
 */
export async function ogCard({
  eyebrow,
  title,
  subtitle,
  from = "#881337",
  to = "#b45309",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  from?: string;
  to?: string;
}): Promise<ImageResponse> {
  const [bold, regular] = await Promise.all([
    readFile(join(FONT_DIR, "BeVietnamPro-Bold.ttf")),
    readFile(join(FONT_DIR, "BeVietnamPro-Regular.ttf")),
  ]);

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
          background: `linear-gradient(135deg, ${from}, ${to})`,
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
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: "rgba(255,255,255,0.15)",
                border: "2px solid rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              Lễ
            </div>
            <div>Ngày Lễ Việt</div>
          </div>
          <div
            style={{
              border: "2px solid rgba(255,255,255,0.45)",
              borderRadius: 999,
              padding: "10px 28px",
              fontSize: 26,
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, opacity: 0.9, lineHeight: 1.3 }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Be Vietnam Pro", data: bold, weight: 700, style: "normal" },
        { name: "Be Vietnam Pro", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
