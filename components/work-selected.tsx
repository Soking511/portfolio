"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";
import { ProjectImage } from "@/components/project-image";
import { SELECTED } from "@/lib/projects";

/**
 * The remaining projects as a scannable list — year, name, one line, stack.
 * Deliberately not cards: after three full case studies, repetition is the
 * thing most likely to lose the reader.
 */
export function WorkSelected() {
  const { t } = useT();
  const W = t.works;

  return (
    <section className="band section-y">
      <div className="container-edge">
        <header
          data-reveal
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}
        >
          <span className="eyebrow">{W.selected_eyebrow}</span>
          <span className="rule" style={{ flex: 1 }} />
        </header>

        <div
          data-reveal
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "8px 24px",
            marginBottom: 36,
          }}
        >
          <h2 className="d3">{W.selected_headline}</h2>
          <p className="dim" style={{ margin: 0, fontSize: 15 }}>
            {W.selected_note}
          </p>
        </div>

        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            borderTop: "1px solid var(--rule)",
          }}
        >
          {W.selected.map((p, i) => {
            const meta = SELECTED[i];
            return (
              <li
                key={p.title}
                data-reveal
                className="r-selected-row"
                style={{ paddingBlock: 24, borderBottom: "1px solid var(--rule)" }}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <Latin as="span" className="mono">
                      <span
                        style={{ fontSize: 11.5, color: "var(--fg-dim)", letterSpacing: "0.08em" }}
                      >
                        {p.n}
                      </span>
                    </Latin>
                    <h3 className="d3" style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}>
                      {p.title}
                    </h3>
                  </div>
                  <p className="dim" style={{ margin: "4px 0 0", fontSize: 14.5 }}>
                    {p.kicker}
                  </p>
                </div>

                <p className="body dim" style={{ maxWidth: "56ch" }}>
                  {p.blurb}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 8,
                    justifyContent: "flex-end",
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
                        borderBottom: "1px solid var(--accent)",
                        paddingBottom: 2,
                        marginInlineStart: 6,
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
                        marginInlineStart: 6,
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
