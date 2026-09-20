"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";
import { ProjectImage } from "@/components/project-image";
import { SELECTED } from "@/lib/projects";

/**
 * The remaining projects. After three full case studies, repetition is the
 * thing most likely to lose the reader, so this is a tight index rather than
 * four more cards — and on phones the thumbnails are dropped entirely, since
 * a 132px screenshot is decoration with no information in it.
 */
export function WorkSelected() {
  const { t } = useT();
  const W = t.works;

  return (
    <section className="band section-tight">
      <div className="container-edge">
        <div
          data-reveal
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "6px 20px",
            marginBottom: 8,
          }}
        >
          <h2 className="d3">{W.selected_headline}</h2>
          <p className="dim" style={{ margin: 0, fontSize: 14.5 }}>
            {W.selected_note}
          </p>
        </div>

        <ul style={{ listStyle: "none", margin: "24px 0 0", padding: 0 }}>
          {W.selected.map((p, i) => {
            const meta = SELECTED[i];
            return (
              <li
                key={p.title}
                data-reveal
                className="r-selected-row"
                style={{ paddingBlock: 22, borderTop: "1px solid var(--rule)" }}
              >
                <div className="r-selected-thumb">
                  <ProjectImage
                    image={meta.image}
                    title={p.title}
                    swatch={meta.swatch}
                    alt={t.misc.screenshot_alt(p.title)}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                    <Latin as="span" className="mono">
                      <span style={{ fontSize: 11.5, color: "var(--fg-dim)", letterSpacing: "0.1em" }}>
                        {p.n}
                      </span>
                    </Latin>
                    <h3 style={{ margin: 0, fontSize: "clamp(19px, 5vw, 24px)", fontWeight: 500, letterSpacing: "-0.02em" }}>
                      {p.title}
                    </h3>
                  </div>
                  <p className="dim" style={{ margin: "3px 0 0", fontSize: 14 }}>
                    {p.kicker}
                  </p>
                </div>

                <p className="body dim" style={{ maxWidth: "56ch", fontSize: 15 }}>
                  {p.blurb}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  {p.stack.map((s) => (
                    <span key={s} className="chip latin">
                      {s}
                    </span>
                  ))}
                  {meta.url ? (
                    <a
                      href={meta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono tap"
                      style={{
                        fontSize: 12,
                        letterSpacing: "0.06em",
                        color: "var(--accent)",
                        textDecoration: "underline",
                        textUnderlineOffset: 4,
                        marginInlineStart: 4,
                      }}
                    >
                      {t.misc.visit_project} ↗
                    </a>
                  ) : (
                    <span
                      className="mono"
                      style={{
                        fontSize: 11.5,
                        letterSpacing: "0.06em",
                        color: "var(--fg-dim)",
                        marginInlineStart: 4,
                      }}
                    >
                      {W.offline_note}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
