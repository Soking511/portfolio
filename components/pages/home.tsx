"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WorkFeatured } from "@/components/work-featured";
import { Testimonials } from "@/components/testimonials";
import { Principles } from "@/components/principles";
import { NotesStrip } from "@/components/notes-strip";
import { About } from "@/components/about";
import { WorkSelected } from "@/components/work-selected";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { useReveal } from "@/components/theme/use-reveal";
import { ContactIntentProvider } from "@/components/contact-intent";
import { useT } from "@/components/lang/provider";

/**
 * Section order is chosen for rhythm as much as for narrative. Reading down,
 * the background alternates paper → ink → paper → tint → paper → tint, so no
 * two adjacent sections share a mode. On a phone, where everything is one
 * column, that alternation is the main thing keeping the scroll moving.
 *
 * Testimonials and the notes strip are tinted bands that slot in after work
 * and after "How I work" without breaking that — and render nothing until
 * they have content.
 */
export function HomePage() {
  const { t } = useT();
  useReveal();
  return (
    <ContactIntentProvider>
      <a className="skip-link" href="#main">
        {t.misc.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <WorkFeatured />
        <Testimonials />
        <Principles />
        <NotesStrip />
        <About />
        <WorkSelected />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </ContactIntentProvider>
  );
}
