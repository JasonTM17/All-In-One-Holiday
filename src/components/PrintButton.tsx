"use client";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-[var(--color-line)] px-4 py-2 text-xs font-bold text-[var(--color-muted)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)] focus-visible:outline-2 print:hidden"
    >
      {label}
    </button>
  );
}
