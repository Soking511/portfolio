"use client";

import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";

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
    <section className="section" aria-labelledby="quotes-title">
      <div className="container">
        <SectionHead id="quotes-title" title={T.title} />
        <div className="quotes">
          {T.items.map((q) => (
            <figure key={q.name} className="quote">
              <blockquote>“{q.quote}”</blockquote>
              <figcaption>
                <strong style={{ fontWeight: 600 }}>{q.name}</strong>
                <span className="soft">, {q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
