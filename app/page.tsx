"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WorkFeatured } from "@/components/work-featured";
import { Principles } from "@/components/principles";
import { About } from "@/components/about";
import { WorkSelected } from "@/components/work-selected";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { useReveal } from "@/components/theme/use-reveal";

/**
 * Section order is chosen for rhythm as much as for narrative. Reading down,
 * the background alternates paper → ink → paper → tint → paper → tint, so no
 * two adjacent sections share a mode. On a phone, where everything is one
 * column, that alternation is the main thing keeping the scroll moving.
 */
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
        <About />
        <WorkSelected />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
