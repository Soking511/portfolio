"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";
import { ProjectImage } from "@/components/project-image";
import { FEATURED } from "@/lib/projects";
import type { FeaturedWork } from "@/components/lang/strings";

/**
 * Three case studies. One DOM order — metadata, title, media, beats, footer —
 * recomposed per breakpoint in globals.css:
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
    <section id="work" className="section-y">
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
  const { t } = useT();
  const meta = FEATURED[index];

  return (
    <article data-reveal>
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

            <h3 className="d3 latin">{project.title}</h3>
            <p className="lead" style={{ marginTop: 8, maxWidth: "30ch" }}>
              {project.kicker}
            </p>
          </header>

          <div className="proj-media">
            <ProjectImage
              image={meta.image}
              title={project.title}
              swatch={meta.swatch}
              alt={t.misc.screenshot_alt(project.title)}
              priority={index === 0}
              variant="feature"
            />
          </div>

          <div className="proj-beats">
            <Beat label={labels.label_problem} text={project.problem} />
            <Beat label={labels.label_built} text={project.built} />
            <Beat label={labels.label_decision} text={project.decision} isKey />
          </div>

          <Foot project={project} meta={meta} labels={labels} />
        </div>
      </div>
    </article>
  );
}

function Beat({ label, text, isKey }: { label: string; text: string; isKey?: boolean }) {
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

function Foot({
  project,
  meta,
  labels,
}: {
  project: FeaturedWork;
  meta: (typeof FEATURED)[number];
  labels: ReturnType<typeof useT>["t"]["works"];
}) {
  const { t } = useT();
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
      {meta.url && (
        <a
          href={meta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mono tap"
          style={{
            marginInlineStart: "auto",
            fontSize: 12.5,
            letterSpacing: "0.06em",
            color: "var(--accent)",
            textDecoration: "underline",
            textUnderlineOffset: 4,
          }}
        >
          {t.misc.visit_project} ↗
        </a>
      )}
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
