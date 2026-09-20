"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WorkFeatured } from "@/components/work-featured";
import { Principles } from "@/components/principles";
import { WorkSelected } from "@/components/work-selected";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { useReveal } from "@/components/theme/use-reveal";

export default function Home() {
  useReveal();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <WorkFeatured />
        <Principles />
        <WorkSelected />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
