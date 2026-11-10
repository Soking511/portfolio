"use client";

import { useT } from "@/components/lang/provider";
import { PORTRAIT } from "@/lib/site";

/**
 * Who I am, in my own words: the path here, what freelancing taught me, and
 * what I care about. A portrait appears under the heading once lib/site.ts
 * points at one. No stat bar: the numbers that would go in one are not
 * verifiable.
 */
export function About() {
  const { t } = useT();
  const A = t.about;

  return (
    <section id="about" className="section section--surface" aria-labelledby="about-title">
      <div className="container split">
        <div className="split__head">
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

        <div className="about__text">
          <p className="lead">{A.p1}</p>
          <p className="soft">{A.p2}</p>
          <p className="soft">{A.p3}</p>
        </div>
      </div>
    </section>
  );
}
