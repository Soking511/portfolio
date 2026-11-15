"use client";

import { useRef } from "react";
import type { MouseEvent, SyntheticEvent } from "react";
import { useT } from "@/components/lang/provider";
import { SectionHead } from "@/components/section-head";
import { FEATURED, SELECTED } from "@/lib/projects";
import { workPath } from "@/lib/i18n";
import { trackAttrs } from "@/lib/analytics";
import { EASE, MOTION, gsap, useGSAP } from "@/lib/gsap";

/**
 * What I can build, in words a non-engineer can follow, as a list a visitor
 * opens one at a time: pick the thing you need, and it shows what it means
 * and the projects where I did it, each a link to that project's story. The
 * claim is never more than a tap from its proof.
 *
 * Native <details> sharing one name: the browser keeps a single item open
 * and it works without JavaScript. The first is open, so the section is
 * never a column of closed rows. The tools follow as four short columns.
 *
 * With motion allowed, GSAP takes over the opening and closing so the rows
 * slide instead of snapping: the one being left closes while the one picked
 * opens, and its projects arrive in order. The browser's rule allows a
 * single open item at a time, which would shut the old one before it could
 * be seen closing, so the shared name comes off while GSAP is in charge and
 * goes back on when it is not.
 */
export function Capabilities() {
  const { t, lang } = useT();
  const C = t.capabilities;
  const W = t.works;

  // A proof names a project by its anchor: a featured one has its own page,
  // the others are entries further up this page.
  const proofFor = (anchor: string) => {
    const f = FEATURED.findIndex((m) => m.slug === anchor);
    if (f >= 0) return { href: workPath(lang, anchor), kicker: W.featured[f].kicker };
    const s = SELECTED.findIndex((m) => m.slug === anchor);
    return { href: `#${anchor}`, kicker: s >= 0 ? W.selected[s].kicker : "" };
  };

  const listRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  const { contextSafe } = useGSAP(() => {
    const list = listRef.current;
    if (!list) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      const items = Array.from(list.querySelectorAll("details"));
      items.forEach((d) => d.removeAttribute("name"));
      animated.current = true;
      return () => {
        animated.current = false;
        items.forEach((d) => {
          d.removeAttribute("data-closing");
          d.setAttribute("name", "services");
        });
      };
    });
  }, []);

  const closing = (d: HTMLDetailsElement) => d.hasAttribute("data-closing");

  const shut = contextSafe((d: HTMLDetailsElement) => {
    const wrap = d.querySelector<HTMLElement>(".svc__wrap");
    if (!wrap || closing(d)) return;
    // The name and its mark answer at once; the body follows.
    d.setAttribute("data-closing", "");
    gsap.killTweensOf([wrap, ...Array.from(wrap.querySelectorAll(".svc__proof li"))]);
    gsap.to(wrap, {
      height: 0,
      overflow: "hidden",
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        d.open = false;
        d.removeAttribute("data-closing");
        gsap.set([wrap, ...Array.from(wrap.querySelectorAll(".svc__proof li"))], { clearProps: "all" });
      },
    });
  });

  const reveal = contextSafe((d: HTMLDetailsElement) => {
    const wrap = d.querySelector<HTMLElement>(".svc__wrap");
    if (!wrap) return;
    // Picked again while still closing: carry on from where it has got to.
    const from = d.open ? wrap.offsetHeight : 0;
    d.removeAttribute("data-closing");
    d.open = true;
    gsap.killTweensOf(wrap);
    // One timeline: the body opens, and its projects follow a beat later.
    const opening = gsap.timeline({ defaults: { ease: EASE } });
    opening.fromTo(
      wrap,
      { height: from, overflow: "hidden" },
      { height: "auto", duration: 0.5, clearProps: "height,overflow" },
    );
    if (!from) {
      opening.from(
        wrap.querySelectorAll(".svc__proof li"),
        { y: 14, autoAlpha: 0, duration: 0.35, stagger: 0.05, clearProps: "all" },
        0.1,
      );
    }
  });

  const onPick = (e: MouseEvent<HTMLElement>) => {
    if (!animated.current) return; // the browser's own toggle
    e.preventDefault();
    const picked = e.currentTarget.parentElement as HTMLDetailsElement;
    const wasOpen = picked.open && !closing(picked);
    listRef.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((d) => {
      if (d !== picked) shut(d);
    });
    if (wasOpen) shut(picked);
    else reveal(picked);
  };

  // An item the browser opened by itself (find in page, a link into it)
  // still closes the others, as the shared name would have.
  const onToggle = (e: SyntheticEvent<HTMLDetailsElement>) => {
    const opened = e.currentTarget;
    if (!animated.current || !opened.open) return;
    listRef.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((d) => {
      if (d !== opened && !closing(d)) d.open = false;
    });
  };

  return (
    <section id="skills" className="section section--surface" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={C.title} intro={C.intro} />

        <div className="svc-list" ref={listRef}>
          {C.items.map((it, i) => (
            <details key={it.title} className="svc" name="services" open={i === 0} onToggle={onToggle}>
              <summary className="svc__name" onClick={onPick}>
                <h3 className="h3">{it.title}</h3>
                <span className="svc__mark" aria-hidden="true" />
              </summary>
              {/* The box whose height GSAP moves; the body keeps its own
                  padding inside it, so it can close all the way. */}
              <div className="svc__wrap">
                <div className="svc__body">
                  <p className="lead">{it.body}</p>
                  <ul className="svc__proof" aria-label={C.proof_label}>
                    {it.proof.map(([label, anchor]) => {
                      const proof = proofFor(anchor);
                      return (
                        <li key={anchor}>
                          <a href={proof.href} {...trackAttrs("service_proof", { project: anchor })}>
                            <span className="svc__project latin">{label}</span>
                            <span className="svc__kicker">{proof.kicker}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>

        <dl className="stack-table" aria-label={C.stack_label}>
          {C.stack.map(([area, tools]) => (
            <div key={area}>
              <dt className="label">{area}</dt>
              <dd className="latin">{tools}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
