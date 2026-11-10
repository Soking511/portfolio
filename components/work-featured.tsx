"use client";

import { useT } from "@/components/lang/provider";
import { ProjectLink } from "@/components/project-link";
import { ProjectPanel } from "@/components/project-panel";
import { SectionHead } from "@/components/section-head";
import { WorkSelected } from "@/components/work-selected";
import { FEATURED } from "@/lib/projects";
import { workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";
import type { FeaturedWork } from "@/components/lang/strings";

/**
 * The featured projects as picture tiles, two to a row: the screenshot (or
 * the diagram that stands in for one) on the project's own colour, then its
 * name, the year, one line saying what it is, and where it lives now. The
 * whole tile opens the case study, which holds the problem, my part and the
 * decision. Nothing here needs JavaScript.
 *
 * The remaining projects follow as three small tiles.
 */
export function WorkFeatured() {
  const { t, lang } = useT();
  const W = t.works;

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work-title" title={W.title} intro={W.intro} />

        <ul className="work-grid">
          {W.featured.map((project, i) => {
            const meta = FEATURED[i];
            const caseHref = workPath(lang, meta.slug);
            const diagram = meta.diagram ? t.misc.diagrams[meta.diagram] : undefined;
            return (
              <li key={meta.slug} id={meta.slug} className="tile">
                <ProjectPanel
                  meta={meta}
                  title={project.title}
                  diagram={diagram}
                  compact
                  priority={i < 2}
                  style={{ viewTransitionName: `media-${meta.slug}` }}
                />
                <h3 className="h3 tile__title" style={{ viewTransitionName: `title-${meta.slug}` }}>
                  <a
                    href={caseHref}
                    className="latin"
                    {...trackAttrs("case_study_open", { project: meta.slug, from: "home" })}
                  >
                    {project.title}
                  </a>
                </h3>
                <span className="tile__year">{project.year}</span>
                <p className="tile__kicker">{project.kicker}</p>
                <span className="tile__link">
                  <ProjectLink meta={meta} />
                </span>
              </li>
            );
          })}
        </ul>

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
