/**
 * Full public URL prefix for canonical, sitemap, JSON-LD and OG URLs.
 * When deploying under a sub-path, include the base path here too, e.g.
 * NEXT_PUBLIC_SITE_URL=https://jasontm17.github.io/All-In-One-Holiday
 */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ngayleviet.vn").replace(
    /\/$/,
    "",
  );
}
