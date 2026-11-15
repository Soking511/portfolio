# Skills for this repository

Claude Code loads every folder here that holds a `SKILL.md`, in any session
opened on this repository, so the guidance travels with the code.

## GSAP (`gsap-*`)

GreenSock's official skills for GSAP, copied unchanged from
https://github.com/greensock/gsap-skills at commit `aed9cfd`. MIT licence, in
`GSAP-SKILLS-LICENSE`.

| Skill | Covers |
|---|---|
| `gsap-core` | tweens, easing, stagger, `gsap.matchMedia()`, reduced motion |
| `gsap-timeline` | sequencing with timelines |
| `gsap-scrolltrigger` | scroll-linked motion, scrub, refresh |
| `gsap-react` | `useGSAP`, context-safe handlers, cleanup, SSR |
| `gsap-performance` | transforms, batching reads and writes |
| `gsap-plugins` | Flip, SplitText, ScrollTo and the rest |
| `gsap-utils` | `gsap.utils` helpers |
| `gsap-frameworks` | Vue, Svelte and others (not used here) |

They say how to use GSAP correctly. What this site's motion should do is in
`DESIGN.md`, and that file wins where the two differ. The setup they are
applied to is `lib/gsap.ts`.

To update: copy `skills/gsap-*/SKILL.md` from the repository above over these
and change the commit named here.
