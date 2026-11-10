import type React from "react";
import "@/app/globals.css";
import Script from "next/script";
import { IBM_Plex_Sans, Rubik } from "next/font/google";

import { LangProvider } from "@/components/lang/provider";
import { STRINGS, type Lang } from "@/components/lang/strings";
import { ThemeProvider } from "@/components/theme/provider";
import { PreHydrationScript } from "@/components/theme/pre-hydration-script";
import { SITE_URL, UMAMI_WEBSITE_ID } from "@/lib/site";

// Two families. Rubik draws Arabic and Latin as one design, so the name in
// both scripts is a single typeface; it sets the name and the headings. IBM
// Plex Sans carries the reading text; the Arabic layout adds its Arabic twin.
//
// Only the Latin subset is preloaded here. The Arabic faces are still
// declared (by unicode-range) and the Arabic layout preloads them, so an
// English page fetches Rubik's Arabic only for the two words of the name.
const display = Rubik({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-display",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex",
  display: "swap",
});

/**
 * The document for one language. Each language has its own root layout
 * (app/(en) and app/(ar)), so the static HTML already carries the right
 * lang and dir — crawlers and first paint never depend on JavaScript to
 * learn that a page is Arabic.
 */
export function RootShell({
  lang,
  fontClassName = "",
  children,
}: {
  lang: Lang;
  fontClassName?: string;
  children: React.ReactNode;
}) {
  const fontVariables = [display.variable, plexSans.variable, fontClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <html
      lang={lang}
      dir={STRINGS[lang].dir}
      data-theme="light"
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F5F4F0" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#121214" media="(prefers-color-scheme: dark)" />
        <PreHydrationScript />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider lang={lang}>{children}</LangProvider>
        </ThemeProvider>
        {/* Cookie-free analytics, and only on the production domain, so local
            builds and Firebase preview channels never count as visits. */}
        {UMAMI_WEBSITE_ID && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={UMAMI_WEBSITE_ID}
            data-domains={new URL(SITE_URL).host}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
