import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { TechStack } from "@/components/tech-stack"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Youseef Tareq | Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in Angular, Node.js, and Django with a focus on building high-performance, accessible web applications.",
  openGraph: {
    title: "Youseef Tareq | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in Angular, Node.js, and Django with a focus on building high-performance, accessible web applications.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Youseef Tareq - Full-Stack Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Youseef Tareq | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in Angular, Node.js, and Django with a focus on building high-performance, accessible web applications.",
    images: ["/images/og-image.jpg"],
  },
}

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
