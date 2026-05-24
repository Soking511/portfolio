"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "loading" | "loaded" | "blocked";

const LOAD_TIMEOUT_MS = 5000;
const ROOT_MARGIN = "200px";

// Coordinates concurrent iframe budget across all <WorkPreview> instances.
// Mobile gets a tighter budget — iframes are expensive and the carousel only
// shows ~1.1 cards at a time on phones, so 2 is plenty.
const isMobile =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(max-width: 780px)").matches;

class IframeBudget {
  private capacity = isMobile ? 2 : 3;
  private active = new Set<symbol>();
  private waiters: Array<(release: () => void) => void> = [];

  acquire(): Promise<() => void> {
    return new Promise((resolve) => {
      const token = Symbol();
      const tryGrant = () => {
        if (this.active.size < this.capacity) {
          this.active.add(token);
          resolve(() => {
            this.active.delete(token);
            const next = this.waiters.shift();
            if (next) next(() => this.active.delete(token));
          });
        } else {
          this.waiters.push(() => tryGrant());
        }
      };
      tryGrant();
    });
  }
}

const budget = new IframeBudget();

export function WorkPreview({
  url,
  swatch,
  title,
  previewBlocked,
}: {
  url: string;
  swatch: string;
  title: string;
  previewBlocked?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const releaseRef = useRef<(() => void) | null>(null);
  const [state, setState] = useState<State>(previewBlocked ? "blocked" : "idle");

  useEffect(() => {
    if (previewBlocked) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      async (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            io.disconnect();
            releaseRef.current = await budget.acquire();
            setState("loading");
          }
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0.01 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      releaseRef.current?.();
      releaseRef.current = null;
    };
  }, [previewBlocked]);

  useEffect(() => {
    if (state !== "loading") return;
    const timer = setTimeout(() => {
      setState((s) => (s === "loading" ? "blocked" : s));
      releaseRef.current?.();
      releaseRef.current = null;
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [state]);

  const showIframe = state === "loading" || state === "loaded";
  const swatchOpacity = state === "loaded" ? 0 : 1;

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        aspectRatio: "16 / 10",
        background: "color-mix(in oklab, var(--fg) 6%, var(--bg))",
        overflow: "hidden",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: swatch,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: swatchOpacity,
          transition: "opacity .5s",
        }}
      >
        <span
          className="serif italic latin"
          style={{
            fontSize: 72,
            color: "rgba(0,0,0,.18)",
            mixBlendMode: "multiply",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          {title}
        </span>
      </div>

      {showIframe && (
        <iframe
          src={url}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => {
            setState((s) => (s === "loading" ? "loaded" : s));
          }}
          style={{
            position: "absolute",
            top: 0,
            insetInlineStart: 0,
            width: "160%",
            height: "160%",
            transform: "scale(.625)",
            transformOrigin: "top left",
            border: 0,
            pointerEvents: "none",
            background: "#fff",
          }}
        />
      )}
    </div>
  );
}
