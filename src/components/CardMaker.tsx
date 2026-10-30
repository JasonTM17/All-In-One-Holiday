"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { holidays } from "@/data/holidays";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SIZES = [
  { id: "portrait", w: 1080, h: 1350, label: "1080×1350" },
  { id: "wide", w: 1200, h: 630, label: "1200×630" },
] as const;

// 6 layout templates.
const TEMPLATES = [
  { id: 0, label: "Centrado", align: "center" as const, photoMode: "bg" },
  { id: 1, label: "Izquierda", align: "left" as const, photoMode: "bg" },
  { id: 2, label: "Foto superior", align: "center" as const, photoMode: "top" },
  { id: 3, label: "Minimal", align: "center" as const, photoMode: "none" },
  { id: 4, label: "Polaroid", align: "center" as const, photoMode: "frame" },
  { id: 5, label: "Invertido", align: "right" as const, photoMode: "bg-inv" },
] as const;

type Tpl = (typeof TEMPLATES)[number];

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxW: number,
): string[] => {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const t = cur ? cur + " " + w : w;
    if (ctx.measureText(t).width > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 8);
};

export default function CardMaker() {
  const params = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [slug, setSlug] = useState(
    () => params.get("holiday") ?? holidays[0]?.slug ?? "",
  );
  const [tplId, setTplId] = useState(() => Number(params.get("t") ?? 0) || 0);
  const [sizeId, setSizeId] = useState<(typeof SIZES)[number]["id"]>("portrait");
  const [to, setTo] = useState(() => (params.get("to") ?? "").slice(0, 40));
  const [from, setFrom] = useState(() => (params.get("from") ?? "").slice(0, 40));
  const [msg, setMsg] = useState(() => (params.get("msg") ?? "").slice(0, 200));
  const [fontsReady, setFontsReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const h = useMemo(
    () => holidays.find((x) => x.slug === slug) ?? holidays[0],
    [slug],
  );
  const tpl: Tpl = TEMPLATES[tplId] ?? TEMPLATES[0];
  const size = SIZES.find((s) => s.id === sizeId) ?? SIZES[0];

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size.w;
    canvas.height = size.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h: ch } = size;
    const display = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-display")
      .trim() || "Georgia, serif";
    const sans =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-sans")
        .trim() || "system-ui, sans-serif";

    // Background gradient
    const g = ctx.createLinearGradient(
      tpl.photoMode === "bg-inv" ? w : 0,
      0,
      tpl.photoMode === "bg-inv" ? 0 : w,
      ch,
    );
    g.addColorStop(0, h.theme.from);
    g.addColorStop(1, h.theme.to);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, ch);

    const img = imgRef.current;
    const drawCover = (x: number, y: number, dw: number, dh: number) => {
      if (!img) return;
      const s = Math.max(dw / img.width, dh / img.height);
      const sw = dw / s,
        sh = dh / s;
      ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, dw, dh);
    };

    if (tpl.photoMode === "bg" || tpl.photoMode === "bg-inv") {
      drawCover(0, 0, w, ch);
      ctx.fillStyle = `${h.theme.from}d9`;
      ctx.fillRect(0, 0, w, ch);
      const vg = ctx.createLinearGradient(0, ch * 0.4, 0, ch);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, ch);
    } else if (tpl.photoMode === "top") {
      drawCover(0, 0, w, Math.round(ch * 0.45));
      const fade = ctx.createLinearGradient(0, ch * 0.3, 0, ch * 0.55);
      fade.addColorStop(0, "rgba(0,0,0,0)");
      fade.addColorStop(1, h.theme.from);
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, ch * 0.55);
    } else if (tpl.photoMode === "frame") {
      const fw = Math.round(w * 0.8),
        fh = Math.round(ch * 0.52);
      const fx = (w - fw) / 2,
        fy = Math.round(ch * 0.08);
      ctx.fillStyle = "#fffdf8";
      ctx.fillRect(fx - 18, fy - 18, fw + 36, fh + 36);
      drawCover(fx, fy, fw, fh);
    }

    const cx = tpl.align === "center" ? w / 2 : tpl.align === "left" ? w * 0.07 : w * 0.93;
    ctx.textAlign = tpl.align;
    const light = tpl.photoMode !== "frame" && tpl.photoMode !== "none";
    const ink = light ? "#ffffff" : "#1c1917";
    const textTop = tpl.photoMode === "top" ? ch * 0.52 : tpl.photoMode === "frame" ? ch * 0.66 : ch * 0.18;

    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.85;
    ctx.font = `800 ${Math.round(ch * 0.16)}px ${display}`;
    ctx.textBaseline = "top";
    ctx.fillText(h.dateMark.replace("·", "·"), cx, textTop * 0.4);
    ctx.globalAlpha = 1;

    ctx.font = `800 ${Math.round(ch * 0.062)}px ${display}`;
    for (const [i, line] of wrapText(ctx, h.name, w * 0.86).entries()) {
      ctx.fillText(line, cx, textTop + i * ch * 0.075);
    }

    if (to) {
      ctx.font = `600 ${Math.round(ch * 0.032)}px ${sans}`;
      ctx.fillText(`Para: ${to}`, cx, textTop + ch * 0.19);
    }
    if (msg) {
      ctx.font = `400 ${Math.round(ch * 0.03)}px ${sans}`;
      const lines = wrapText(ctx, msg, w * 0.8);
      const startY = textTop + ch * 0.26;
      lines.forEach((line, i) => ctx.fillText(line, cx, startY + i * ch * 0.042));
    }
    if (from) {
      ctx.font = `600 ${Math.round(ch * 0.028)}px ${sans}`;
      ctx.globalAlpha = 0.85;
      ctx.fillText(`De: ${from}`, cx, ch * 0.9);
      ctx.globalAlpha = 1;
    }
    ctx.font = `700 ${Math.round(ch * 0.024)}px ${sans}`;
    ctx.globalAlpha = 0.6;
    ctx.fillText("Ngày Lễ Việt", cx, ch * 0.95);
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) {
        setFontsReady(true);
        draw();
      }
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    draw();
  }, [draw]);


  // Load holiday photo (same-origin, canvas-safe) and redraw on arrival.
  useEffect(() => {
    imgRef.current = null;
    const img = new Image();
    img.src = `${BASE}/images/holidays/${slug}/hero-800.webp`;
    img.onload = () => {
      imgRef.current = img;
      draw();
    };
    img.onerror = () => draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Redraw on every state change (live preview).
  useEffect(() => {
    draw();
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
          Día festivo
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
          >
            {holidays.map((x) => (
              <option key={x.slug} value={x.slug}>
                {x.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          <p className="text-sm font-bold text-[var(--color-muted)]">Plantilla</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTplId(t.id)}
                aria-pressed={tplId === t.id}
                className={`min-h-11 rounded-xl px-3 text-xs font-bold transition focus-visible:outline-2 ${
                  tpl.id === t.id
                    ? "bg-[var(--color-brand)] text-white"
                    : "border border-[var(--color-line)] hover:bg-[var(--color-soft)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <label className="block text-sm font-bold text-[var(--color-muted)]">
          Para
          <input
            type="text"
            value={to}
            maxLength={40}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
          />
        </label>
        <label className="block text-sm font-bold text-[var(--color-muted)]">
          De
          <input
            type="text"
            value={from}
            maxLength={40}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
          />
        </label>
        <label className="block text-sm font-bold text-[var(--color-muted)]">
          Mensaje
          <textarea
            value={msg}
            maxLength={200}
            rows={3}
            onChange={(e) => setMsg(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
          />
        </label>
        <div>
          <p className="text-sm font-bold text-[var(--color-muted)]">Desde los deseos</p>
          <select
            onChange={(e) => {
              const i = Number(e.target.value);
              if (h.wishes[i]) setMsg(h.wishes[i].slice(0, 200));
              e.target.value = "-1";
            }}
            defaultValue={-1}
            className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-3 py-2.5 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
          >
            <option value={-1}>Elegir un deseo…</option>
            {h.wishes.map((w, i) => (
              <option key={i} value={i}>
                {w.length > 60 ? w.slice(0, 57) + "…" : w}
              </option>
            ))}
          </select>
        </div>
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
                    ? "bg-[var(--color-brand)] text-white"
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
            className="min-h-11 rounded-full bg-[var(--color-brand)] px-5 text-sm font-bold text-white hover:bg-[var(--color-brand-deep)] focus-visible:outline-2"
          >
            Descargar PNG
          </button>
          <button
            type="button"
            onClick={share}
            className="min-h-11 rounded-full border border-[var(--color-line)] px-4 text-sm font-bold text-[var(--color-muted)] hover:bg-[var(--color-soft)] focus-visible:outline-2"
          >
            {copied ? "¡Enlace copiado!" : "Compartir"}
          </button>
        </div>
        <canvas
          ref={canvasRef}
          data-testid="thiep-canvas"
          className="mt-4 w-full rounded-2xl shadow-lg"
          style={{ aspectRatio: `${size.w}/${size.h}` }}
        />
        {!fontsReady && (
          <p className="mt-2 text-xs text-[var(--color-faint)]">Cargando fuentes…</p>
        )}
      </div>
    </div>
  );
}
