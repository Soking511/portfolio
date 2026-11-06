"use client";

import { useT } from "@/components/lang/provider";
import { ProjectImage } from "@/components/project-image";
import { ProjectLink } from "@/components/project-link";
import { SectionHead } from "@/components/section-head";
import { NextLink } from "@/components/next-link";
import { FEATURED } from "@/lib/projects";
import { workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";
import type { FeaturedWork } from "@/components/lang/strings";

/**
 * The featured projects, all in one shape: picture beside the name, then three
 * short answers — what it is, what I did, the decision that mattered. The
 * picture alternates sides on desktop so each project fits on one screen and
 * the page has a rhythm; the shape stays the same, so a non-technical
 * visitor learns how to read it once. The problem statement and the rest live on each case study,
 * which the name and the picture both open.
 */
export function WorkFeatured() {
  const { t } = useT();
  const W = t.works;

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work-title" title={W.title} intro={W.intro} />
        <div className="projects">
          {W.featured.map((p, i) => (
            <ProjectBlock key={p.title} project={p} index={i} />
          ))}
        </div>
        <NextLink href="#shipped" label={W.selected_headline} />
      </div>
    </section>
  );
}

function ProjectBlock({ project, index }: { project: FeaturedWork; index: number }) {
  const { t, lang } = useT();
  const W = t.works;
  const meta = FEATURED[index];
  const caseHref = workPath(lang, meta.slug);
  const diagram = meta.diagram ? t.misc.diagrams[meta.diagram] : undefined;

  return (
    <article
      id={meta.slug}
      className={`project${index % 2 ? " project--flip" : ""}`}
      aria-labelledby={`${meta.slug}-title`}
    >
      {meta.image ? (
        // A second way into the case study, for the many who click the
        // picture. Out of the tab order: the title link already is one.
        <a
          href={caseHref}
          className="project__media"
          style={{ viewTransitionName: `media-${meta.slug}` }}
          tabIndex={-1}
          aria-hidden="true"
          {...trackAttrs("case_study_open", { project: meta.slug, from: "home_media" })}
        >
          <ProjectImage image={meta.image} title={project.title} alt="" priority={index === 0} variant="feature" />
        </a>
      ) : (
        // A diagram is content in its own right, so it is not hidden in a link.
        <div className="project__media project__media--diagram" style={{ viewTransitionName: `media-${meta.slug}` }}>
          <ProjectImage
            image={meta.image}
            title={project.title}
            alt={t.misc.screenshot_alt(project.title)}
            variant="feature"
            diagram={diagram}
          />
        </div>
      )}

      <header className="project__head">
        <div>
          <h3
            className="h3 project__title"
            id={`${meta.slug}-title`}
            style={{ viewTransitionName: `title-${meta.slug}` }}
          >
            <a
              href={caseHref}
              className="latin"
              {...trackAttrs("case_study_open", { project: meta.slug, from: "home_title" })}
            >
              {project.title}
            </a>
          </h3>
          <p className="project__kicker">{project.kicker}</p>
        </div>
        <p className="project__meta">
          <span>{project.role}</span>
          <span className="project__year">{project.year}</span>
        </p>
      </header>

      <Answers project={project} labels={W} />

      <footer className="project__foot">
        <ul className="tags" aria-label={W.label_stack}>
          {project.stack.map((s) => (
            <li key={s} className="tag">
              <span className="latin">{s}</span>
            </li>
          ))}
        </ul>
        <span className="project__links">
          <a
            href={caseHref}
            className="link"
            {...trackAttrs("case_study_open", { project: meta.slug, from: "home" })}
          >
            {W.case_study}
            <span className="visually-hidden">: {project.title}</span>
          </a>
          <ProjectLink meta={meta} />
        </span>
      </footer>
    </article>
  );
}

/**
 * What it is, what I did, and the decision — the three answers every project
 * gives. The case study adds the problem in front of them. On a phone the
 * home page keeps only what it is: the rest is one tap away on the case
 * study, and six projects at full length made the page a long scroll.
 */
export function Answers({
  project,
  labels,
  withProblem = false,
  className = "",
}: {
  project: FeaturedWork;
  labels: ReturnType<typeof useT>["t"]["works"];
  withProblem?: boolean;
  className?: string;
}) {
  return (
    <dl className={`answers ${className}`.trim()}>
      {project.outcome && (
        <div>
          <dt>{labels.outcome_label}</dt>
          <dd className="lead">{project.outcome}</dd>
        </div>
      )}
      {withProblem && (
        <div>
          <dt>{labels.label_problem}</dt>
          <dd>{project.problem}</dd>
        </div>
      )}
      <div className="answers__built">
        <dt>{labels.label_built}</dt>
        <dd>{project.built}</dd>
      </div>
      <div className="answers__more">
        <dt>{labels.label_contribution}</dt>
        <dd>{project.contribution}</dd>
      </div>
      <div className="answers__key answers__more">
        <dt>{labels.label_decision}</dt>
        <dd>{project.decision}</dd>
      </div>
    </dl>
  );
}
