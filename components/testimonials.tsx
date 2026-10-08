"use client";

import { useT } from "@/components/lang/provider";

/**
 * Quotes from real clients, with names and roles. Renders nothing at all
 * until there is at least one — an empty "testimonials" heading, or invented
 * praise, costs more trust than the section could ever earn.
 */
export function Testimonials() {
  const { t } = useT();
  const T = t.testimonials;
  if (!T.items.length) return null;

  return (
    <section className="section-tight">
      <div className="container-edge">
        <div
          data-reveal
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}
        >
          <span className="eyebrow">{T.eyebrow}</span>
          <span className="rule" style={{ flex: 1 }} />
        </div>

        <div className="r-quotes">
          {T.items.map((q) => (
            <figure key={q.name} data-reveal style={{ margin: 0 }}>
              <blockquote className="statement" style={{ margin: 0, fontSize: "clamp(20px, 2.4vw, 26px)" }}>
                “{q.quote}”
              </blockquote>
              <figcaption style={{ marginTop: 16, fontSize: 14 }}>
                <span style={{ fontWeight: 500 }}>{q.name}</span>
                <span className="dim"> · {q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
