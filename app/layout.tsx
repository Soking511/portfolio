import type React from "react"
import "./globals.css"
import { Inter, Fira_Code } from "next/font/google"
import type { Metadata } from "next"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" })

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
    "next.js"
  ],
  authors: [{ name: "Youseef Tareq" }],
  creator: "Youseef Tareq",
  robots: "index, follow",
  generator: 'v0.dev'
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <link rel="canonical" href="https://youseeftareq.dev" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
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
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "email": "youseeftareq5176@gmail.com",
      "telephone": "+201120678976",
      "sameAs": ["https://linkedin.com/in/youseef-tareq", "https://soking.tech"]
    }
  `}
        </Script>
      </head>
      <body className={`${inter.variable} ${firaCode.variable} font-display selection:bg-primary selection:text-white antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
