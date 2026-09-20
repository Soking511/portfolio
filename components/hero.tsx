"use client";

import { useT } from "@/components/lang/provider";

/**
 * The fold. Everything here must fit one viewport at 1440x900 and 375x812,
 * so it is deliberately four elements: status, headline, one sentence, CTAs.
 *
 * Nothing in this section carries data-reveal — first paint must not wait for
 * hydration.
 */
export function Hero() {
  const { t } = useT();
  const H = t.hero;

  return (
    <section
      id="index"
      style={{
        minHeight: "min(100svh, 900px)",
        display: "flex",
        alignItems: "center",
        paddingTop: 96,
        paddingBottom: 64,
      }}
    >
      <div className="container-edge" style={{ width: "100%" }}>
        <p
          className="mono"
          style={{
            margin: "0 0 28px",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "var(--fg-dim)",
          }}
        >
          {H.name}
        </p>

        <h1 className="d1" style={{ maxWidth: "17ch" }}>
          {H.headline_pre}
          <span className="em">{H.headline_em}</span>
          {H.headline_post}
        </h1>

        <p className="lead dim" style={{ maxWidth: "52ch", marginTop: 28 }}>
          {H.sub}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            marginTop: 36,
          }}
        >
          <a href="#work" className="btn btn-primary">
            {H.cta_works}
            <Arrow />
          </a>
          <a href="#contact" className="btn btn-ghost">
            {H.cta_contact}
          </a>
          <a
            href="/youseef-tareq-resume.pdf"
            download
            className="mono"
            style={{
              minHeight: 48,
              display: "inline-flex",
              alignItems: "center",
              fontSize: 12,
              letterSpacing: "0.06em",
              color: "var(--fg-dim)",
              paddingInline: 8,
            }}
          >
            {H.resume}
          </a>
        </div>

        <ul
          style={{
            listStyle: "none",
            margin: "48px 0 0",
            padding: "20px 0 0",
            borderTop: "1px solid var(--rule)",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 28px",
          }}
        >
          {H.status.map((s, i) => (
            <li
              key={s}
              className="mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontSize: 12,
                letterSpacing: "0.04em",
                color: "var(--fg-dim)",
              }}
            >
              {i === 1 && <AvailableDot />}
              <span className={i === 2 ? "latin" : undefined}>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AvailableDot() {
  return (
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
