import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getStrings, type Locale } from "@/i18n";

const display = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
  // No <link rel=preload>: two ~30KB woff2 files competing with the LCP image
  // on first paint costs more than the metric-matched fallback flash.
  preload: false,
});

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
  preload: false,
});

/**
 * The shared <html>/<body> shell for both root layouts ((vi) and /en/).
 * Each locale's layout delegates here so chrome, fonts and scripts stay
 * identical; only lang, strings and the locale prop differ.
 */
export default function SiteRoot({
  locale,
  children,
}: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  const t = getStrings(locale);
  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body>
        {/* Set theme before paint: localStorage theme or system preference. No flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}",
          }}
        />
        <a href="#noi-dung" className="skip-link">
          {t.meta.skipToContent}
        </a>
        <Header locale={locale} />
        {/* tabIndex=-1 lets the skip link move focus into <main>; outline-none
            because the focus is programmatic, not a keyboard-tab stop. */}
        <main id="noi-dung" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
