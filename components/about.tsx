"use client";

import { useT } from "@/components/lang/provider";
import { PORTRAIT } from "@/lib/site";

/**
 * Who I am, in my own words, in two columns so neither side of the page is
 * empty: the heading and the path here on one side, what freelancing taught
 * me and what I care about on the other. A portrait appears under the
 * heading once lib/site.ts points at one. No stat bar: the numbers that
 * would go in one are not verifiable.
 */
export function About() {
  const { t } = useT();
  const A = t.about;

  return (
    <section id="about" className="section section--surface" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__lead">
          <h2 className="h2" id="about-title">
            {A.title}
          </h2>
          <p className="lead">{A.p1}</p>
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

        <div className="about__text">
          {/* The working history; phones leave it to Experience, just below. */}
          <p className="about__history">{A.p2}</p>
          <p>{A.p3}</p>
        </div>
      </div>
    </section>
  );
}
