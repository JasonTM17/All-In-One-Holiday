// Canvas renderer for the /thiep card maker. Kept in a plain module so the
// preview code can move independently of the form UI — the whole feature is
// only loaded after the page's first paint (see CardMakerLazy).

export interface CardTemplate {
  align: "left" | "center" | "right";
  photoMode: string;
}

export interface DrawCardOptions {
  width: number;
  height: number;
  tpl: CardTemplate;
  holiday: {
    name: string;
    dateMark: string;
    theme: { from: string; to: string };
  };
  img: HTMLImageElement | null;
  to: string;
  from: string;
  msg: string;
  displayFont: string;
  sansFont: string;
}

export const wrapText = (
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

export function drawCard(canvas: HTMLCanvasElement, o: DrawCardOptions): void {
  canvas.width = o.width;
  canvas.height = o.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width: w, height: ch, tpl, holiday: h, img, to, from, msg } = o;
  const display = o.displayFont;
  const sans = o.sansFont;

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
    ctx.fillText(`Gửi: ${to}`, cx, textTop + ch * 0.19);
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
    ctx.fillText(`Từ: ${from}`, cx, ch * 0.9);
    ctx.globalAlpha = 1;
  }
  ctx.font = `700 ${Math.round(ch * 0.024)}px ${sans}`;
  ctx.globalAlpha = 0.6;
  ctx.fillText("Ngày Lễ Việt", cx, ch * 0.95);
  ctx.globalAlpha = 1;
}
