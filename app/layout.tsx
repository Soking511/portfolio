import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";

import { LangProvider } from "@/components/lang/provider";
import { ThemeProvider } from "@/components/theme/provider";
import { PreHydrationScript } from "@/components/theme/pre-hydration-script";
import { SITE_URL } from "@/lib/site";



// Three families, not six. Newsreader is italic-only in the UI (the emphasised
// phrase in every heading), so only the italic face is requested.
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

const TITLE = "Youseef Tareq — Full-Stack Engineer, Cairo";
const DESCRIPTION =
  "Full-stack engineer in Cairo building live-data platforms, subscription products and internal dashboards with Angular, Node.js and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Youseef Tareq",
  },
  description: DESCRIPTION,
  keywords: [
    "full-stack developer",
    "full-stack engineer",
    "angular developer",
    "node.js",
    "typescript",
    "mongodb",
    "web development",
    "Cairo",
    "مطور ويب",
    "مبرمج مواقع",
    "مطور انجولار",
  ],
  authors: [{ name: "Youseef Tareq", url: SITE_URL }],
  creator: "Youseef Tareq",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Youseef Tareq",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en",
    alternateLocale: ["ar_EG"],
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Youseef Tareq — full-stack engineer, Cairo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Youseef Tareq",
  alternateName: "يوسف طارق",
  url: SITE_URL,
  jobTitle: "Full-Stack Engineer",
  description: DESCRIPTION,
  knowsLanguage: ["en", "ar", "ar-EG"],
  knowsAbout: [
    "Angular",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "Django",
    "Cloudflare",
    "Web Development",
  ],
  worksFor: { "@type": "Organization", name: "The POST" },
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
  email: "youseeftareq5176@gmail.com",
  sameAs: ["https://github.com/Soking511", "https://linkedin.com/in/youseef-tareq", SITE_URL],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = [newsreader.variable, geist.variable, geistMono.variable].join(" ");

  return (
    <html lang="en" dir="ltr" data-theme="light" suppressHydrationWarning className={fontVariables}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F4F0E6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0E1116" media="(prefers-color-scheme: dark)" />
        <PreHydrationScript />
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(JSON_LD)}
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
