"use client";

import { useT } from "@/components/lang/provider";
import { PORTRAIT } from "@/lib/site";

/**
 * Short by design. No stat bar — the previous one carried a filler metric
 * ("7 featured below") and an unverifiable claim ("100% on-time delivery").
 * The headline's count is the one number here, and the page above proves it.
 *
 * A portrait appears under the headline once lib/site.ts points at one.
 */
export function About() {
  const { t } = useT();
  const A = t.about;

  return (
    <section id="about" className="section-open">
      <div className="container-edge">
        <header
          data-reveal
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}
        >
          <span className="eyebrow">{A.eyebrow}</span>
          <span className="rule" style={{ flex: 1 }} />
        </header>

        <div className="r-text-aside">
          <div data-reveal>
            <h2 className="d2" style={{ maxWidth: "14ch" }}>
              {A.headline_pre}
              <span className="em">{A.headline_em}</span>
              {A.headline_post}
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

          <div
            data-reveal
            data-reveal-delay="1"
            style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: "58ch" }}
          >
            <p className="lead">{A.p1}</p>
            <p className="body dim">{A.p2}</p>
            <p className="body dim">{A.p3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
