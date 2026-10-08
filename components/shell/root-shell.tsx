import type React from "react";
import "@/app/globals.css";
import Script from "next/script";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";

import { LangProvider } from "@/components/lang/provider";
import { STRINGS, type Lang } from "@/components/lang/strings";
import { ThemeProvider } from "@/components/theme/provider";
import { PreHydrationScript } from "@/components/theme/pre-hydration-script";
import { SITE_URL, UMAMI_WEBSITE_ID } from "@/lib/site";

// Three families, not six. Newsreader is italic-only in the UI (the emphasised
// phrase in every heading), so only the italic face is requested. The Arabic
// face is loaded by the Arabic layout alone, so English pages never fetch it.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-mono",
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
  const fontVariables = [newsreader.variable, geist.variable, geistMono.variable, fontClassName]
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
        <meta name="theme-color" content="#F4F0E6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0E1116" media="(prefers-color-scheme: dark)" />
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
