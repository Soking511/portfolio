"use client";

import { useRef, useState } from "react";
import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";
import { PROJECTS } from "@/lib/projects";
import { WorkPreview } from "@/components/work-preview";

export function Projects() {
  const { t, lang } = useT();
  const W = t.works;
  const isAR = lang === "ar";
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? Math.abs(el.scrollLeft) / max : 0);
  };

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const sign = isAR ? -dir : dir;
    el.scrollBy({ left: sign * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="works" style={{ padding: "120px 0 120px", position: "relative" }}>
      <div className="container-edge">
        <div
          data-reveal
          style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 32 }}
        >
          <span
            className="mono"
            style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".18em" }}
          >
            ● {W.eyebrow}
          </span>
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--fg-dim)",
              letterSpacing: ".14em",
              textTransform: isAR ? "none" : "uppercase",
            }}
          >
            {W.sub}
          </span>
          <span className="rule" style={{ flex: 1 }} />
        </div>

        <div
          className="r-2col-15"
          data-reveal
          data-reveal-delay="1"
          style={{ marginBottom: 40 }}
        >
          <h2
            className="serif"
            style={{
              margin: 0,
              fontWeight: 400,
              fontSize: isAR ? "clamp(28px, 7.5vw, 108px)" : "clamp(34px, 9vw, 132px)",
              lineHeight: 0.95,
              letterSpacing: "-.02em",
            }}
          >
            {W.headline_a}
            <span className="italic" style={{ color: "var(--accent)" }}>
              {W.headline_em}
            </span>
            {W.headline_b}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--fg-dim)",
              maxWidth: "36ch",
            }}
          >
            {W.intro}
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="works-track"
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          padding: "8px var(--pad) 28px",
          scrollSnapType: "x mandatory",
        }}
      >
        {W.items.map((w, i) => {
          const meta = PROJECTS[i];
          return (
            <article
              key={i}
              className="r-work-card"
              style={{
                flex: "0 0 auto",
                scrollSnapAlign: "start",
                display: "flex",
                flexDirection: "column",
                background: "var(--card)",
                border: "1px solid var(--rule)",
                borderRadius: 18,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative" }}>
                <WorkPreview
                  url={meta.url}
                  swatch={meta.swatch}
                  title={w.title}
                  previewBlocked={meta.previewBlocked}
                />
                <a
                  href={meta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    padding: 18,
                    background: "transparent",
                    transition: "background .3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(180deg, transparent 40%, rgba(0,0,0,.55))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 14px",
                      borderRadius: 999,
                      background: "var(--accent)",
                      color: "var(--accent-ink)",
                      fontSize: 11.5,
                      letterSpacing: ".06em",
                    }}
                  >
                    {t.misc.visit_project}
                  </span>
                </a>
                <Latin
                  as="div"
                  className="mono"
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 14,
                      insetInlineStart: 14,
                      fontSize: 11,
                      letterSpacing: ".14em",
                      color: "#fff",
                      background: "rgba(0,0,0,.55)",
                      padding: "4px 8px",
                      borderRadius: 6,
                    }}
                  >
                    {w.n} · {w.year}
                  </span>
                </Latin>
              </div>

              <div style={{ padding: "24px 26px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {w.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mono"
                      style={{
                        fontSize: 10.5,
                        letterSpacing: ".08em",
                        textTransform: isAR ? "none" : "uppercase",
                        padding: "4px 9px",
                        border: "1px solid var(--rule)",
                        borderRadius: 999,
                        color: "var(--fg-dim)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <h3
                    className="serif"
                    style={{ margin: 0, fontSize: 36, fontWeight: 400, letterSpacing: "-.01em" }}
                  >
                    {w.title}
                  </h3>
                  <p
                    className="serif italic"
                    style={{ margin: "4px 0 0", fontSize: 18, color: "var(--fg-dim)" }}
                  >
                    {w.kicker}
                  </p>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--fg-dim)" }}>{w.blurb}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 12,
                    marginTop: 6,
                    paddingTop: 14,
                    borderTop: "1px solid var(--rule)",
                  }}
                >
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: "var(--fg-dim)", letterSpacing: ".06em" }}
                  >
                    <span style={{ opacity: 0.6 }}>{W.role_label}: </span>
                    {w.role}
                  </span>
                  <span
                    className="mono latin"
                    style={{
                      fontSize: 11,
                      color: "var(--fg-dim)",
                      letterSpacing: ".06em",
                      textAlign: "end",
                    }}
                  >
                    {w.stack.join(" · ")}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
        <div style={{ flex: "0 0 var(--pad)" }} />
      </div>

      <div
        className="container-edge"
        style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 8 }}
      >
        <div style={{ flex: 1, height: 2, background: "var(--rule)", position: "relative", borderRadius: 99 }}>
          <div
            style={{
              position: "absolute",
              top: -2,
              height: 6,
              borderRadius: 99,
              background: "var(--accent)",
              insetInlineStart: `${progress * 100}%`,
              width: `${Math.max(8, 100 / W.items.length)}%`,
              transform: `translateX(${isAR ? "" : "-"}${progress * 100}%)`,
              transition: "inset-inline-start .15s linear",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => nudge(-1)} aria-label="Previous" style={btnStyle}>
            <span className="arrow-x">←</span>
          </button>
          <button onClick={() => nudge(1)} aria-label="Next" style={btnStyle}>
            <span className="arrow-x">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

const btnStyle: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 999,
  border: "1px solid var(--rule)",
  background: "transparent",
  color: "var(--fg)",
  fontSize: 16,
  cursor: "pointer",
  transition: "background .2s, border-color .2s",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};
