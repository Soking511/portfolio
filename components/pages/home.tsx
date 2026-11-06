"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WorkFeatured } from "@/components/work-featured";
import { Capabilities } from "@/components/capabilities";
import { Principles } from "@/components/principles";
import { Testimonials } from "@/components/testimonials";
import { NotesStrip } from "@/components/notes-strip";
import { About } from "@/components/about";
import { WorkSelected } from "@/components/work-selected";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ContactIntentProvider } from "@/components/contact-intent";
import { useT } from "@/components/lang/provider";

/**
 * Section order follows the questions a stranger asks, in turn: who are you
 * (the hero), what have you built (three projects, then the rest), what can
 * you build for me, how do you work, who are you, where have you worked, how
 * do I reach you.
 *
 * Backgrounds alternate paper and limestone so the change of subject shows
 * on a phone, where everything is one column; the contact band is the one
 * dark section, at the end, where the page asks for something.
 * Testimonials and the notes strip render nothing until they have content.
 */
export function HomePage() {
  const { t } = useT();
  return (
    <ContactIntentProvider>
      <a className="skip-link" href="#main">
        {t.misc.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <WorkFeatured />
        <WorkSelected />
        <Testimonials />
        <Capabilities />
        <Principles />
        <NotesStrip />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </ContactIntentProvider>
  );
}
