"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";
import { ProjectImage } from "@/components/project-image";
import { FEATURED } from "@/lib/projects";
import type { FeaturedWork } from "@/components/lang/strings";

/**
 * Three projects, three different layouts, so the section never reads as the
 * same card repeated. Each carries four short beats: problem, what I built,
 * the decision that mattered, and the role.
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

      <div style={{ display: "flex", flexDirection: "column", gap: 96, marginTop: 72 }}>
        {W.featured.map((p, i) => (
          <ProjectBlock key={p.title} project={p} index={i} labels={W} />
        ))}
      </div>
    </section>
  );
}

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
  // 0 = full-bleed image above text, 1 = image right, 2 = image left.
  const layout = index % 3;
  const image = (
    <ProjectImage
      image={meta.image}
      title={project.title}
      swatch={meta.swatch}
      alt={t.misc.screenshot_alt(project.title)}
      priority={index === 0}
      maxHeight={layout === 0 ? "min(62vh, 620px)" : undefined}
    />
  );

  return (
    <article data-reveal>
      {layout === 0 ? (
        <>
          <div className="container-edge">{image}</div>
          <div className="container-edge" style={{ marginTop: 32 }}>
            <Head project={project} />
            <Beats project={project} labels={labels} />
            <Foot project={project} meta={meta} labels={labels} />
          </div>
        </>
      ) : (
        <div className="container-edge">
          <div className="r-split">
            <div style={{ order: layout === 1 ? 1 : 2 }}>
              <Head project={project} />
              <div style={{ marginTop: 24 }}>
                <Beat label={labels.label_problem} text={project.problem} />
                <Beat label={labels.label_built} text={project.built} />
                <Beat label={labels.label_decision} text={project.decision} />
              </div>
            </div>
            <div style={{ order: layout === 1 ? 2 : 1 }}>{image}</div>
          </div>
          <Foot project={project} meta={meta} labels={labels} />
        </div>
      )}
    </article>
  );
}

function Head({ project }: { project: FeaturedWork }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "baseline",
        gap: "4px 16px",
      }}
    >
      <Latin as="span" className="mono">
        <span style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.1em" }}>
          {project.n}
        </span>
      </Latin>
      <h3 className="d3 latin" style={{ marginInlineEnd: 4 }}>
        {project.title}
      </h3>
      <p className="dim" style={{ margin: 0, fontSize: 16 }}>
        {project.kicker}
      </p>
    </div>
  );
}

function Beats({
  project,
  labels,
}: {
  project: FeaturedWork;
  labels: ReturnType<typeof useT>["t"]["works"];
}) {
  return (
    <div className="r-beats" style={{ marginTop: 28 }}>
      <BeatCell label={labels.label_problem} text={project.problem} />
      <BeatCell label={labels.label_built} text={project.built} />
      <BeatCell label={labels.label_decision} text={project.decision} />
    </div>
  );
}

function BeatCell({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 10 }}>
        {label}
      </div>
      <p className="body">{text}</p>
    </div>
  );
}

function Beat({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ paddingBlock: 18, borderTop: "1px solid var(--rule)" }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        {label}
      </div>
      <p className="body">{text}</p>
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
      style={{
        marginTop: 24,
        paddingTop: 18,
        borderTop: "1px solid var(--rule)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "14px 28px",
      }}
    >
      <span className="eyebrow">
        {labels.label_role} — {project.role}
      </span>
      <Latin as="span" className="mono">
        <span style={{ fontSize: 11.5, color: "var(--fg-dim)", letterSpacing: "0.06em" }}>
          {project.year}
        </span>
      </Latin>
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
            fontSize: 12,
            letterSpacing: "0.06em",
            borderBottom: "1px solid var(--accent)",
            paddingBottom: 3,
            color: "var(--accent)",
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
}: {
  eyebrow: string;
  pre: string;
  em: string;
  post: string;
  intro?: string;
}) {
  return (
    <header data-reveal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <span className="eyebrow">{eyebrow}</span>
        <span className="rule" style={{ flex: 1 }} />
      </div>
      <h2 className="d2" style={{ maxWidth: "20ch" }}>
        {pre}
        <span className="em">{em}</span>
        {post}
      </h2>
      {intro && (
        <p className="lead dim" style={{ maxWidth: "48ch", marginTop: 20 }}>
          {intro}
        </p>
      )}
    </header>
  );
}
