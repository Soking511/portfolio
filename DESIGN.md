# DESIGN.md

The design contract for soking.digital. Every page and every change is built
from this file. If something you need is not here, add it here first; do not
invent a one-off value in a component.

## Direction

Quiet and precise. One hue family: a sage ground, pine ink, and a deeper
green for anything you can act on. The page ends in one dark block that holds
the contact form and the footer. Structure comes from hairlines, a two-column
section grid and a large difference in type size, not from boxes.

The home page is an index, not a scroll of case studies: the name, one
sentence, then every project as a row. The detail lives on each case study.

Directions already tried and set aside: a bank-style corporate look, lapis
and gold, a dark hero with cards, the original editorial cream, and soft
paper with lapis ink and teal (the previous version of this file).

What the owner explicitly does not want: bright saturated colours, a bright
white ground, content inside cards with shadows, and many elements competing
on one screen.

## Tokens

```yaml
color:
  paper:       "#E9ECE6"   # sage ground, never white
  surface:     "#DDE2DA"   # alternate sections, media frames
  ink:         "#15211C"   # pine: text and headings
  ink-soft:    "#4B5A52"   # secondary text, 5.5:1 on surface
  line:        "#C4CCC3"   # dividers only
  line-strong: "#74837A"   # control edges, 3:1
  accent:      "#1F5E48"   # links, primary button, focus. 5.8:1 on surface
  band:        "#15211C"   # the dark block: contact and footer
dark:
  paper: "#101814"  surface: "#17221D"  ink: "#E2E9E1"  ink-soft: "#A0AEA4"
  accent: "#8CCBAA"  band: "#0A100D"
type:
  display: Zain (300, 400, 700, 800), Arabic + Latin: the name and headings
  text:    IBM Plex Sans / IBM Plex Sans Arabic, 400 and 600
  mono:    IBM Plex Mono, 400 and 500: years, tools, small labels
  body:    17px EN, 18px AR
radius:
  media: 8px   field: 8px   button: pill
```

## Rules

- The name is set in both scripts, each from its own edge: Latin from the
  left, Arabic from the right, on the English and the Arabic page alike. The
  page's own script is heavy, the other light. One line from 900px, stacked
  below.
- Two loud moments per page, no more: the name, and the three beliefs under
  "How I work". Everything else is reading size.
- A section's name sits beside its content and stays in view while the
  content is read (`.split`). Lists open with an ink hairline and separate
  their rows with quiet ones.
- Headings are plain sentences. No accent word in another colour.
- Content sits on the page, not in cards. No shadows anywhere. The contact
  form sits on the dark band itself, not on a panel inside it.
- One accent, used sparingly: buttons, links, the active nav item, the
  project under the pointer.
- Mono is for small facts only (years, tools, labels). Arabic has no mono or
  capitals, so labels there use the reading face at weight.
- Numbers only on real sequences (the request diagrams).
- No badges or chips for information: availability is a fact in the hero
  list, and tools are a plain comma list. Pills are for controls (buttons,
  the form's choices).
- Headings name the section the way the menu does ("Work", "Services").
  No generic CTA copy ("Let's talk"); no arrows stapled to link text.
- Motion answers something, and stops there: the name's second script
  settles once on load; the project under the pointer steps forward and its
  picture fades into the pane; clicking a project carries its picture and
  title into its page (cross-document view transitions); buttons answer a
  press. Nothing moves under reduced motion, and no text is ever hidden
  waiting for an animation.
- Copy is plain and matches `public/youseef-tareq-resume.pdf`.
- Every text pair passes WCAG AA; visible focus everywhere; 44px touch targets.
