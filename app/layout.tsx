import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import {
  Newsreader,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";

import { LangProvider } from "@/components/lang/provider";
import { ThemeProvider } from "@/components/theme/provider";
import { PreHydrationScript } from "@/components/theme/pre-hydration-script";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soking.tech"),
  title: {
    default: "Youseef Tareq | Full-Stack Developer | مطور ويب شامل",
    template: "%s | Youseef Tareq",
  },
  description:
    "Youseef Tareq: Full-Stack Developer specializing in Angular, Node.js, TypeScript, and MongoDB. مطور ويب شامل ومبرمج مواقع متخصص في بناء تطبيقات ويب عالية الأداء.",
  keywords: [
    "full-stack developer",
    "frontend developer",
    "backend developer",
    "angular",
    "node.js",
    "typescript",
    "mongodb",
    "cloudflare",
    "web development",
    "مطور ويب",
    "مبرمج مواقع",
    "تصميم مواقع",
    "تطوير واجهات برمجة التطبيقات",
    "مطور واجهات أمامية",
    "مطور واجهات خلفية",
    "next.js",
  ],
  authors: [{ name: "Youseef Tareq" }],
  creator: "Youseef Tareq",
  robots: "index, follow",
  alternates: {
    languages: {
      en: "/",
      ar: "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = [
    newsreader.variable,
    geist.variable,
    geistMono.variable,
    instrumentSerif.variable,
    spaceGrotesk.variable,
    jetbrainsMono.variable,
  ].join(" ");

  return (
    <html
      lang="en"
      dir="ltr"
      data-style="studio"
      data-theme="light"
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <link rel="canonical" href="https://soking.tech" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <PreHydrationScript />
        <Script id="structured-data" type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Youseef Tareq",
  "alternateName": "يوسف طارق",
  "url": "https://soking.tech",
  "jobTitle": "Full-Stack Developer",
  "knowsLanguage": ["en", "ar", "ar-EG"],
  "knowsAbout": ["Angular", "Node.js", "TypeScript", "MongoDB", "Cloudflare", "Web Development", "مطور ويب"],
  "worksFor": { "@type": "Organization", "name": "The POST" },
  "email": "youseeftareq5176@gmail.com",
  "sameAs": ["https://linkedin.com/in/youseef-tareq", "https://soking.tech"]
}
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
