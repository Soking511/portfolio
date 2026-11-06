"use client";

import { useT } from "@/components/lang/provider";
import { ProjectImage } from "@/components/project-image";
import { ProjectLink } from "@/components/project-link";
import { SELECTED } from "@/lib/projects";
import { NextLink } from "@/components/next-link";

/**
 * The remaining projects as a tight list rather than more big blocks:
 * after three full projects, repetition is what loses a reader. Phones drop
 * the thumbnails — at that size a screenshot carries no information.
 */
export function WorkSelected() {
  const { t } = useT();
  const W = t.works;

  return (
    <section id="shipped" className="section section--surface" aria-labelledby="shipped-title">
      <div className="container">
        <header className="section-head">
          <h2 className="h2" id="shipped-title">
            {W.selected_headline}
          </h2>
          <p className="lead">{W.selected_note}</p>
        </header>

        <ul className="shipped">
          {W.selected.map((p, i) => {
            const meta = SELECTED[i];
            return (
              <li key={p.title} id={meta.slug} className="shipped__item">
                <div className="shipped__thumb" aria-hidden="true">
                  <ProjectImage image={meta.image} title={p.title} alt="" />
                </div>

                <div>
                  <h3 className="h3 shipped__name">{p.title}</h3>
                  <p className="shipped__kicker">{p.kicker}</p>
                </div>

                <p>{p.blurb}</p>

                <div className="shipped__meta">
                  <ul className="tags" aria-label={W.label_stack}>
                    {p.stack.map((s) => (
                      <li key={s} className="tag">
                        <span className="latin">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <ProjectLink meta={meta} />
                </div>
              </li>
            );
          })}
        </ul>
        <NextLink href="#skills" label={t.capabilities.title} />
      </div>
    </section>
  );
}
