"use client";

import { Header as Nav } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects as Works } from "@/components/projects";
import { TechStack as Stack } from "@/components/tech-stack";
import { Experience as CV } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { TweaksPanel } from "@/components/theme/tweaks-panel";
import { useReveal } from "@/components/theme/use-reveal";

export default function Home() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Works />
        <Stack />
        <CV />
        <Contact />
      </main>
      <Footer />
      <TweaksPanel />
    </>
  );
}
