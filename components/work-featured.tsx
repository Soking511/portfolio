"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/lang/provider";
import { FlowDiagram } from "@/components/flow-diagram";
import { ProjectImage } from "@/components/project-image";
import { ProjectLink } from "@/components/project-link";
import { SectionHead } from "@/components/section-head";
import { WorkSelected } from "@/components/work-selected";
import { FEATURED } from "@/lib/projects";
import { workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";
import type { FeaturedWork } from "@/components/lang/strings";

/**
 * The featured projects as an index: a name, a line saying what it is, the
 * year, and where it lives now. The whole row opens the case study, which
 * holds the problem, my part and the decision.
 *
 * With a pointer and enough room, the pictures leave the rows for one pane
 * beside the list. It shows the project under the pointer or holding focus,
 * with its role, tools and who uses it. Everywhere else (phones, tablets,
 * touch laptops) each row carries its own picture. Both are in the markup
 * and CSS shows one; the images are lazy, so the hidden set is never fetched.
 *
 * The remaining projects follow as a shorter list.
 */
export function WorkFeatured() {
  const { t, lang } = useT();
  const W = t.works;
  const [active, setActive] = useState(0);

  // A link to a project from elsewhere on the page ("#eg-pricey" under
  // Services) brings its picture up as well as scrolling to its row.
  useEffect(() => {
    const sync = () => {
      const i = FEATURED.findIndex((m) => `#${m.slug}` === window.location.hash);
      if (i >= 0) setActive(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work-title" title={W.title} intro={W.intro} />

        <div className="work">
          <ul className="work-list">
            {W.featured.map((project, i) => {
              const meta = FEATURED[i];
              const caseHref = workPath(lang, meta.slug);
              const diagram = meta.diagram ? t.misc.diagrams[meta.diagram] : undefined;
              return (
                <li
                  key={meta.slug}
                  id={meta.slug}
                  className="work-row"
                  data-active={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  {/* The row's own picture, for layouts without the pane. A
                      second way into the case study for the many who tap the
                      picture; out of the tab order, as the name is the link. */}
                  <a
                    href={caseHref}
                    className={`frame work-row__media${meta.image ? "" : " frame--diagram"}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    {...trackAttrs("case_study_open", { project: meta.slug, from: "home_media" })}
                  >
                    {meta.image ? (
                      <ProjectImage image={meta.image} title={project.title} alt="" variant="feature" />
                    ) : (
                      diagram && <FlowDiagram diagram={diagram} compact />
                    )}
                  </a>

                  <h3 className="h3 work-row__title" style={{ viewTransitionName: `title-${meta.slug}` }}>
                    <a
                      href={caseHref}
                      className="latin"
                      {...trackAttrs("case_study_open", { project: meta.slug, from: "home_title" })}
                    >
                      {project.title}
                    </a>
                  </h3>
                  <span className="work-row__year">{project.year}</span>
                  <p className="work-row__kicker">{project.kicker}</p>
                  <p className="work-row__role">{project.role}</p>
                  <span className="work-row__link">
                    <ProjectLink meta={meta} />
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Repeats what the rows and case studies already say, in pictures,
              so it is kept from assistive technology. */}
          <div className="work-pane" aria-hidden="true">
            {W.featured.map((project, i) => {
              const meta = FEATURED[i];
              const diagram = meta.diagram ? t.misc.diagrams[meta.diagram] : undefined;
              const on = i === active;
              return (
                <figure key={meta.slug} className="work-pane__item" data-active={on}>
                  <div
                    className={`frame${meta.image ? "" : " frame--diagram"}`}
                    // Only the picture on show travels into its case study.
                    style={on ? { viewTransitionName: `media-${meta.slug}` } : undefined}
                  >
                    {meta.image ? (
                      <ProjectImage image={meta.image} title={project.title} alt="" />
                    ) : (
                      diagram && <FlowDiagram diagram={diagram} compact />
                    )}
                  </div>
                  <figcaption>
                    <dl className="pane-facts">
                      <div>
                        <dt className="label">{W.label_role}</dt>
                        <dd>{project.role}</dd>
                      </div>
                      <div>
                        <dt className="label">{W.label_stack}</dt>
                        <dd className="latin">{project.stack.join(", ")}</dd>
                      </div>
                      {project.outcome && (
                        <div>
                          <dt className="label">{W.outcome_label}</dt>
                          <dd>{project.outcome}</dd>
                        </div>
                      )}
                    </dl>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <WorkSelected />
      </div>
    </section>
  );
}

/**
 * The answers every case study gives, one per row: who uses it (once that is
 * true), the problem, what it is, what I did, and the decision that mattered.
 */
export function Answers({
  project,
  labels,
}: {
  project: FeaturedWork;
  labels: ReturnType<typeof useT>["t"]["works"];
}) {
  return (
    <dl className="answers">
      {project.outcome && (
        <div>
          <dt>{labels.outcome_label}</dt>
          <dd className="lead">{project.outcome}</dd>
        </div>
      )}
      <div>
        <dt>{labels.label_problem}</dt>
        <dd>{project.problem}</dd>
      </div>
      <div>
        <dt>{labels.label_built}</dt>
        <dd>{project.built}</dd>
      </div>
      <div>
        <dt>{labels.label_contribution}</dt>
        <dd>{project.contribution}</dd>
      </div>
      <div className="answers__key">
        <dt>{labels.label_decision}</dt>
        <dd>{project.decision}</dd>
      </div>
    </dl>
  );
}
