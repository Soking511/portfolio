"use client";

import { useT } from "@/components/lang/provider";
import { PORTRAIT } from "@/lib/site";

/**
 * Who I am, in my own words, as two rows of two so no side of the page is
 * empty. Across the top, the heading and the path here. Under them, what
 * freelancing taught me, and beside it what I care about: four things, so
 * they are set as four lines to scan, not buried in a sentence. A portrait
 * appears under the heading once lib/site.ts points at one. No stat bar: the
 * numbers that would go in one are not verifiable.
 */
export function About() {
  const { t } = useT();
  const A = t.about;

  return (
    <section id="about" className="section section--surface" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__head">
          <h2 className="h2" id="about-title">
            {A.title}
          </h2>
          {PORTRAIT && (
            <img
              src={PORTRAIT}
              alt={A.portrait_alt}
              width={480}
              height={600}
              loading="lazy"
              decoding="async"
              className="about-portrait"
            />
          )}
        </div>
        <p className="lead about__intro">{A.p1}</p>

        {/* The working history; phones leave it to Experience, just below. */}
        <p className="about__history">{A.p2}</p>

        <div className="about__cares">
          <p id="cares-title">{A.care_intro}</p>
          <ul className="cares" aria-labelledby="cares-title">
            {A.cares.map((care) => (
              <li key={care}>{care}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
