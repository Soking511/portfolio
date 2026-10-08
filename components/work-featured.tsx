"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";
import { ProjectImage } from "@/components/project-image";
import { ProjectLink } from "@/components/project-link";
import { Arrow } from "@/components/arrow";
import { FEATURED } from "@/lib/projects";
import { workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";
import type { FeaturedWork } from "@/components/lang/strings";

/**
 * Three projects as a skim layer: title, kicker, picture and the one decision
 * that mattered. The problem, the build and the rest live on each project's
 * case-study page, which the title and the picture both open — printing all
 * four beats here made the home page sixteen screens long on a phone.
 *
 * One DOM order — metadata, title, media, decision, footer — recomposed per
 * breakpoint in globals.css:
 *
 *   phones   one column, media edge-to-edge and portrait; the middle project
 *            leads with its visual so the three do not share a silhouette.
 *   desktop  grid areas put the media beside the text, alternating sides,
 *            with the first project running full width.
 */
export function WorkFeatured() {
  const { t } = useT();
  const W = t.works;

  return (
    <section id="work" className="section-y section-follow">
      <div className="container-edge">
        <SectionHead
          eyebrow={W.eyebrow}
          pre={W.headline_pre}
          em={W.headline_em}
          post={W.headline_post}
          intro={W.intro}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 88, marginTop: 56 }}>
        {W.featured.map((p, i) => (
          <ProjectBlock key={p.title} project={p} index={i} labels={W} />
        ))}
      </div>
    </section>
  );
}

const LAYOUTS = ["proj--wide", "proj--flip proj--media-first", ""] as const;

function ProjectBlock({
  project,
  index,
  labels,
}: {
  project: FeaturedWork;
  index: number;
  labels: ReturnType<typeof useT>["t"]["works"];
}) {
  const { t, lang } = useT();
  const meta = FEATURED[index];
  const caseHref = workPath(lang, meta.slug);

  return (
    <article id={meta.slug} data-reveal>
      <div className="container-edge">
        <div className={`proj ${LAYOUTS[index % LAYOUTS.length]}`.trim()}>
          <header className="proj-head">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <Latin as="span" className="mono accent">
                <span style={{ fontSize: 12, letterSpacing: "0.14em" }}>{project.n}</span>
              </Latin>
              <span className="rule" style={{ flex: 1 }} />
              <Latin as="span" className="mono">
                <span style={{ fontSize: 11.5, letterSpacing: "0.1em", color: "var(--fg-dim)" }}>
                  {project.year}
                </span>
              </Latin>
            </div>

            <h3 className="d3">
              <a
                href={caseHref}
                className="proj-title-link"
                {...trackAttrs("case_study_open", { project: meta.slug, from: "home_title" })}
              >
                <span className="latin">{project.title}</span>
              </a>
            </h3>
            <p className="lead" style={{ marginTop: 8, maxWidth: "30ch" }}>
              {project.kicker}
            </p>
          </header>

          {meta.image ? (
            // A second way into the case study, for the many who click the
            // picture. Out of the tab order: the title link already is one.
            <a
              href={caseHref}
              className="proj-media proj-media--link"
              tabIndex={-1}
              aria-hidden="true"
              {...trackAttrs("case_study_open", { project: meta.slug, from: "home_media" })}
            >
              <ProjectImage
                image={meta.image}
                title={project.title}
                swatch={meta.swatch}
                alt={t.misc.screenshot_alt(project.title)}
                priority={index === 0}
                variant="feature"
              />
            </a>
          ) : (
            // A diagram is content in its own right, so it is not hidden
            // inside a link.
            <div className="proj-media">
              <ProjectImage
                image={meta.image}
                title={project.title}
                swatch={meta.swatch}
                alt={t.misc.screenshot_alt(project.title)}
                variant="feature"
                diagram={meta.diagram ? t.misc.diagrams[meta.diagram] : undefined}
              />
            </div>
          )}

          <div className="proj-beats">
            {project.outcome && <Outcome label={labels.outcome_label} text={project.outcome} />}
            <Beat label={labels.label_decision} text={project.decision} isKey />
          </div>

          <Foot project={project} meta={meta} labels={labels} />
        </div>
      </div>
    </article>
  );
}

export function Beat({ label, text, isKey }: { label: string; text: string; isKey?: boolean }) {
  return (
    <div className={`proj-beat${isKey ? " proj-beat--key" : ""}`}>
      <div
        className="eyebrow"
        style={{ marginBottom: 8, color: isKey ? "var(--accent)" : undefined }}
      >
        {label}
      </div>
      <p className="body" style={{ color: isKey ? "var(--fg)" : "var(--fg-dim)" }}>
        {text}
      </p>
    </div>
  );
}

/** A verified result. Only rendered once there is an honest number to put here. */
export function Outcome({ label, text }: { label: string; text: string }) {
  return (
    <div className="proj-outcome">
      <div className="eyebrow" style={{ marginBottom: 6, color: "var(--accent)" }}>
        {label}
      </div>
      <p className="lead" style={{ color: "var(--fg)" }}>
        {text}
      </p>
    </div>
  );
}

function Foot({
  project,
  meta,
  labels,
}: {
  project: FeaturedWork;
  meta: (typeof FEATURED)[number];
  labels: ReturnType<typeof useT>["t"]["works"];
}) {
  const { lang } = useT();
  return (
    <div
      className="proj-foot"
      style={{
        marginTop: 6,
        paddingTop: 18,
        borderTop: "1px solid var(--rule)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "12px 20px",
      }}
    >
      <span className="eyebrow" style={{ flexBasis: "100%" }}>
        {labels.label_role} — {project.role}
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.stack.map((s) => (
          <span key={s} className="chip latin">
            {s}
          </span>
        ))}
      </div>
      <span className="proj-links">
        <a
          href={workPath(lang, meta.slug)}
          className="tap proj-case-link"
          {...trackAttrs("case_study_open", { project: meta.slug, from: "home" })}
        >
          {labels.case_study}
          <Arrow size={12} />
        </a>
        <ProjectLink meta={meta} />
      </span>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  pre,
  em,
  post,
  intro,
  invert = false,
}: {
  eyebrow: string;
  pre: string;
  em: string;
  post: string;
  intro?: string;
  invert?: boolean;
}) {
  return (
    <header data-reveal>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <span className="eyebrow">{eyebrow}</span>
        <span className="rule" style={{ flex: 1 }} />
      </div>
      <h2 className="d2" style={{ maxWidth: "18ch" }}>
        {pre}
        <span className="em">{em}</span>
        {post}
      </h2>
      {intro && (
        <p
          className="lead"
          style={{
            maxWidth: "44ch",
            marginTop: 18,
            color: invert ? "var(--ink-dim)" : "var(--fg-dim)",
          }}
        >
          {intro}
        </p>
      )}
    </header>
  );
}
