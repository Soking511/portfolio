"use client";

import { useRef, useState } from "react";
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
 * the diagram that stands in for one), then its name, the year, one line
 * saying what it is, and two ways on: the case study, which the whole tile
 * opens and which holds the problem, my part and the decision, and the live
 * site where there is one. Nothing here needs JavaScript.
 *
 * On phones the tiles are one row to swipe, the next always peeking in, with
 * a row of marks under it that show where you are and jump to any project.
 *
 * The remaining projects follow as three small tiles.
 */
export function WorkFeatured() {
  const { t, lang } = useT();
  const W = t.works;

  // Phones show the tiles as one row to swipe. These two follow that row:
  // which tile is at its start, for the marks under it, and a way to bring
  // any tile there. Elsewhere the list does not scroll and neither is used.
  const listRef = useRef<HTMLUListElement>(null);
  const [inView, setInView] = useState(0);
  const onScroll = () => {
    const list = listRef.current;
    const first = list?.firstElementChild as HTMLElement | null;
    if (!list || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(list).columnGap || "0");
    // Right-to-left rows scroll into negative numbers.
    const i = Math.round(Math.abs(list.scrollLeft) / step);
    setInView(Math.max(0, Math.min(W.featured.length - 1, i)));
  };
  const show = (i: number) =>
    listRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work-title" title={W.title} intro={W.intro} />

        <ul className="work-grid" ref={listRef} onScroll={onScroll}>
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
                  priority={i === 0}
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
                <p className="tile__foot">
                  <span className="tile__more" aria-hidden="true">
                    {W.case_study}
                  </span>
                  <span className="tile__link">
                    <ProjectLink meta={meta} />
                  </span>
                </p>
              </li>
            );
          })}
        </ul>

        <div className="work-marks" role="group" aria-label={W.title}>
          {W.featured.map((project, i) => (
            <button
              key={FEATURED[i].slug}
              type="button"
              className="work-mark"
              aria-label={project.title}
              aria-current={i === inView ? "true" : undefined}
              onClick={() => show(i)}
            >
              <span />
            </button>
          ))}
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
