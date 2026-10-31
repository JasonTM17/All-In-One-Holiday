"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { drawCard } from "@/lib/card-draw";

/** Slim per-holiday shape the card maker needs (serialized from the server page). */
export interface CardHoliday {
  slug: string;
  name: string;
  dateMark: string;
  wishes: string[];
  theme: { from: string; to: string };
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SIZES = [
  { id: "portrait", w: 1080, h: 1350, label: "1080×1350" },
  { id: "wide", w: 1200, h: 630, label: "1200×630" },
] as const;

// 6 layout templates.
const TEMPLATES = [
  { id: 0, label: "Giữa", align: "center" as const, photoMode: "bg" },
  { id: 1, label: "Trái", align: "left" as const, photoMode: "bg" },
  { id: 2, label: "Ảnh trên", align: "center" as const, photoMode: "top" },
  { id: 3, label: "Tối giản", align: "center" as const, photoMode: "none" },
  { id: 4, label: "Khung ảnh", align: "center" as const, photoMode: "frame" },
  { id: 5, label: "Đảo ngược", align: "right" as const, photoMode: "bg-inv" },
] as const;

type Tpl = (typeof TEMPLATES)[number];

export default function CardMaker({ items }: { items: CardHoliday[] }) {
  const params = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [slug, setSlug] = useState(
    () => params.get("holiday") ?? items[0]?.slug ?? "",
  );
  const [tplId, setTplId] = useState(() => Number(params.get("t") ?? 0) || 0);
  const [sizeId, setSizeId] = useState<(typeof SIZES)[number]["id"]>("portrait");
  const [to, setTo] = useState(() => (params.get("to") ?? "").slice(0, 40));
  const [from, setFrom] = useState(() => (params.get("from") ?? "").slice(0, 40));
  const [msg, setMsg] = useState(() => (params.get("msg") ?? "").slice(0, 200));
  const [fontsReady, setFontsReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const h = useMemo(
    () => items.find((x) => x.slug === slug) ?? items[0],
    [items, slug],
  );
  const tpl: Tpl = TEMPLATES[tplId] ?? TEMPLATES[0];
  const size = SIZES.find((s) => s.id === sizeId) ?? SIZES[0];

  // drawCard is a plain module function; the ref keeps every effect on the
  // latest closure without making `draw` itself a hook dependency.
  const drawRef = useRef<() => void>(() => {});
  useEffect(() => {
    drawRef.current = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const display =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--font-display")
          .trim() || "Georgia, serif";
      const sans =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--font-sans")
          .trim() || "system-ui, sans-serif";
      drawCard(canvas, {
        width: size.w,
        height: size.h,
        tpl,
        holiday: h,
        img: imgRef.current,
        to,
        from,
        msg,
        displayFont: display,
        sansFont: sans,
      });
    };
  });

  useEffect(() => {
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) {
        setFontsReady(true);
        drawRef.current();
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  // Load holiday photo (same-origin, canvas-safe) and redraw on arrival.
  useEffect(() => {
    imgRef.current = null;
    const img = new Image();
    img.src = `${BASE}/images/holidays/${slug}/hero-800.webp`;
    img.onload = () => {
      imgRef.current = img;
      drawRef.current();
    };
    img.onerror = () => drawRef.current();
  }, [slug]);

  // Redraw on every state change (live preview).
  useEffect(() => {
    drawRef.current();
  });

  const shareUrl = () => {
    const u = new URL(`${location.origin}${BASE}/thiep/`);
    u.searchParams.set("holiday", slug);
    u.searchParams.set("t", String(tplId));
    if (to) u.searchParams.set("to", to.slice(0, 40));
    if (from) u.searchParams.set("from", from.slice(0, 40));
    if (msg) u.searchParams.set("msg", msg.slice(0, 200));
    return u.toString();
  };

  const download = async () => {
    const blob = await new Promise<Blob | null>((r) =>
      canvasRef.current?.toBlob(r, "image/png"),
    );
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `thiep-${slug}-${size.id}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const share = async () => {
    const blob = await new Promise<Blob | null>((r) =>
      canvasRef.current?.toBlob(r, "image/png"),
    );
    const file = blob
      ? new File([blob], `thiep-${slug}.png`, { type: "image/png" })
      : null;
    if (file && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: `${h.name} — Ngày Lễ Việt` });
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-5">
        <label className="block text-sm font-bold text-[var(--color-muted)]">
          Ngày lễ
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
          >
            {items.map((x) => (
              <option key={x.slug} value={x.slug}>
                {x.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          <p className="text-sm font-bold text-[var(--color-muted)]">Kiểu thiệp</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTplId(t.id)}
                aria-pressed={tplId === t.id}
                className={`min-h-11 rounded-xl px-3 text-xs font-bold transition focus-visible:outline-2 ${
                  tpl.id === t.id
                    ? "bg-[var(--color-brand)] text-[var(--color-on-brand)]"
                    : "border border-[var(--color-line)] hover:bg-[var(--color-soft)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <label className="block text-sm font-bold text-[var(--color-muted)]">
          Gửi đến
          <input
            type="text"
            value={to}
            maxLength={40}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
          />
        </label>
        <label className="block text-sm font-bold text-[var(--color-muted)]">
          Từ
          <input
            type="text"
            value={from}
            maxLength={40}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
          />
        </label>
        <label className="block text-sm font-bold text-[var(--color-muted)]">
          Lời nhắn
          <textarea
            value={msg}
            maxLength={200}
            rows={3}
            onChange={(e) => setMsg(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
          />
        </label>
        <label className="block text-sm font-bold text-[var(--color-muted)]">
          Chọn từ lời chúc
          <select
            onChange={(e) => {
              const i = Number(e.target.value);
              if (h.wishes[i]) setMsg(h.wishes[i].slice(0, 200));
              e.target.value = "-1";
            }}
            defaultValue={-1}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
          >
            <option value={-1}>Chọn một lời chúc…</option>
            {h.wishes.map((w, i) => (
              <option key={i} value={i}>
                {w.length > 60 ? w.slice(0, 57) + "…" : w}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1.5">
            {SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSizeId(s.id)}
                aria-pressed={sizeId === s.id}
                className={`min-h-11 rounded-xl px-3 text-xs font-bold transition focus-visible:outline-2 ${
                  sizeId === s.id
                    ? "bg-[var(--color-brand)] text-[var(--color-on-brand)]"
                    : "border border-[var(--color-line)] hover:bg-[var(--color-soft)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={download}
            data-testid="thiep-download"
            className="min-h-11 rounded-full bg-[var(--color-brand)] px-5 text-sm font-bold text-[var(--color-on-brand)] hover:bg-[var(--color-brand-deep)] focus-visible:outline-2"
          >
            Tải PNG
          </button>
          <button
            type="button"
            onClick={share}
            className="min-h-11 rounded-full border border-[var(--color-line)] px-4 text-sm font-bold text-[var(--color-muted)] hover:bg-[var(--color-soft)] focus-visible:outline-2"
          >
            {copied ? "Đã sao chép liên kết" : "Chia sẻ"}
          </button>
        </div>
        <canvas
          ref={canvasRef}
          data-testid="thiep-canvas"
          className="mt-4 w-full rounded-2xl shadow-lg"
          style={{ aspectRatio: `${size.w}/${size.h}` }}
        />
        {!fontsReady && (
          <p className="mt-2 text-xs text-[var(--color-faint)]">Đang tải phông chữ…</p>
        )}
      </div>
    </div>
  );
}
