"use client";

import { useT } from "@/components/lang/provider";
import { Latin } from "@/components/lang/latin";

/**
 * The fold. Five elements, in order of what a stranger needs: availability,
 * what I build, who I am, one action, what I build it with.
 *
 * The name is deliberately absent — the header wordmark already carries it,
 * and repeating it burned the most valuable line on the page.
 *
 * Nothing here carries data-reveal: first paint must not wait for hydration.
 */
export function Hero() {
  const { t } = useT();
  const H = t.hero;

  return (
    <section
      id="index"
      style={{
        minHeight: "min(94svh, 880px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 92,
        paddingBottom: 28,
      }}
    >
      <div className="container-edge" style={{ width: "100%" }}>
        <p
          className="mono"
          style={{
            margin: "0 0 22px",
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            fontSize: 11.5,
            letterSpacing: "0.14em",
            color: "var(--accent)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 7,
              height: 7,
              borderRadius: 99,
              background: "var(--accent)",
              flex: "none",
            }}
          />
          {H.status_line}
        </p>

        <h1 className="d1" style={{ maxWidth: "15ch" }}>
          {H.headline_pre}
          <span className="em">{H.headline_em}</span>
          {H.headline_post}
        </h1>

        <p className="lead dim" style={{ maxWidth: "40ch", marginTop: 22 }}>
          {H.sub}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <a href="#work" className="btn btn-primary">
            {H.cta_works}
            <Arrow />
          </a>
          <a href="#contact" className="btn btn-ghost">
            {H.cta_contact}
          </a>
        </div>

        <div
          style={{
            marginTop: 40,
            paddingTop: 18,
            borderTop: "1px solid var(--rule)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px 20px",
          }}
        >
          <Latin as="span" className="mono">
            <span style={{ fontSize: 12, letterSpacing: "0.08em", color: "var(--fg-dim)" }}>
              {H.stack_line}
            </span>
          </Latin>
          <a
            href="/youseef-tareq-resume.pdf"
            download
            className="mono tap"
            style={{ fontSize: 12, letterSpacing: "0.08em", color: "var(--fg-dim)" }}
          >
            {H.resume} ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg className="arrow-x" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  );
}
