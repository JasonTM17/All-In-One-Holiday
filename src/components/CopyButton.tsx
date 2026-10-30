"use client";

import { useState } from "react";

export default function CopyButton({
  text,
  label = "Sao chép",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`min-h-11 shrink-0 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-bold text-[var(--color-muted)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)] ${className}`}
    >
      <span aria-live="polite">{copied ? "Đã sao chép" : label}</span>
    </button>
  );
}
