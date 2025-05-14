import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  metadataBase: new URL("https://soking.tech"),
  title: {
    default: "Youseef Tareq | Full-Stack Developer",
    template: "%s | Youseef Tareq",
  },
  description:
    "Full-Stack Developer specializing in Angular, Node.js, and Django with a focus on building high-performance, accessible web applications.",
  keywords: [
    "full-stack developer",
    "frontend developer",
    "backend developer",
    "angular",
    "node.js",
    "django",
    "web development",
  ],
  authors: [{ name: "Youseef Tareq" }],
  creator: "Youseef Tareq",
  robots: "index, follow",
    generator: 'v0.dev'
}

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
      "url": "https://soking.tech",
      "jobTitle": "Full-Stack Developer",
      "knowsAbout": ["Angular", "Node.js", "Django", "Web Development", "UI/UX Design"],
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <Header /> */}
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
