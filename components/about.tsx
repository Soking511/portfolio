"use client";

import { useT } from "@/components/lang/provider";

/**
 * Short by design. No stat bar — the previous one carried a filler metric
 * ("7 featured below") and an unverifiable claim ("100% on-time delivery").
 */
export function About() {
  const { t } = useT();
  const A = t.about;

  return (
    <section id="about" className="band section-y">
      <div className="container-edge">
        <header
          data-reveal
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}
        >
          <span className="eyebrow">{A.eyebrow}</span>
          <span className="rule" style={{ flex: 1 }} />
        </header>

        <div className="r-text-aside">
          <h2 className="d2" data-reveal style={{ maxWidth: "14ch" }}>
            {A.headline_pre}
            <span className="em">{A.headline_em}</span>
            {A.headline_post}
          </h2>

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
