/** Canonical origin for metadata, sitemap and JSON-LD. */
export function siteUrl(): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ngayleviet.vn").replace(/\/$/, "");
  const path = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return base + path;
}
