# DESIGN.md

The design contract for soking.digital. Every page and every change is built
from this file. If something you need is not here, add it here first; do not
invent a one-off value in a component.

## Direction

One colour, pictures first, short text second. The page is a soft neutral
with near-black type and a single orange accent. The accent always means
"this is live, or you can act on it": the primary button, links, the current
section, the project on show. Everything else is neutral, so the screenshots
carry the variety. Rows are filled edge to edge. The page ends in one dark
block that holds the contact form and the footer.

The page should be easy and never flat: it shows the work on the first
screen, says what a click will do, and moves a little as you use it.

The owner's feedback on earlier versions, in order. Do not drift back toward
any of these:

- The sage and pine text index: colours dull, too much text, layout empty.
- Six pastel tints, one per project: too many colours.

Directions set aside before those: a bank-style corporate look, lapis and
gold, a dark hero with cards, the original editorial cream, and soft paper
with lapis ink and teal.

What the owner explicitly does not want: many colours, harsh saturated
colours, a bright white ground, content inside cards with shadows, and many
elements competing on one screen.

## Tokens

```yaml
color:
  paper:       "#F4F4F1"   # soft neutral ground, never white
  surface:     "#EAEAE5"   # alternate sections, picture panels, small tiles
  ink:         "#17171A"   # text and headings
  ink-soft:    "#5A5A63"   # secondary text, 5.7:1 on surface
  line:        "#DCDCD6"   # dividers only
  line-strong: "#83838B"   # control edges, 3:1
  accent:      "#CF4318"   # the one colour, as a fill. White on it is 4.7:1
  accent-text: "#B5380F"   # the accent as text on the neutral grounds
  accent-soft: "#FBE3D8"   # the accent as a quiet ground
  band:        "#17171A"   # the dark block: contact and footer
dark:
  paper: "#111113"  surface: "#1B1B1F"  ink: "#F0EFEB"  ink-soft: "#A6A6B0"
  accent: "#FF7A4D"  accent-text: "#FF8F69"  accent-soft: "#3A1E14"  band: "#09090B"
type:
  display: Rubik (variable), Arabic + Latin: the name and headings
  text:    IBM Plex Sans / IBM Plex Sans Arabic, 400 and 600
  body:    17px EN, 18px AR
radius:
  panel: 20px (16px on phones)   field: 12px   button: pill
```

## Rules

- One accent. No second hue anywhere: no per-project colours, no coloured
  tiles beyond the accent, ink and neutral. If something needs to stand out
  and the accent is already on screen, use weight or size instead.
- The accent is for what is live or actionable: the primary button, link
  underlines, the current nav item, the availability dot, the project on
  show, step numbers, a tile under the pointer. Never for decoration.
- A project is shown before it is described: its screenshot (or the diagram
  that stands in for one) on a neutral panel, then a name, a year and one
  line. The long answers live on the case study.
- Say what a click does. A tile carries "Read the case study"; a live site
  is a separate, underlined link; anything not public says why.
- Home-page text is short. A tile gets one or two lines; if something needs
  a paragraph it belongs on a case study or in a note.
- Fill the row. Sections use two, three or four columns on desktop and stack
  on phones; nothing sits beside an empty column.
- Phones get their own composition where stacking would be long: the
  projects are one swipe row with the next always peeking in, and the hero
  showcase is dropped because that row follows directly.
- Tiles are flat: `--surface` (or the accent or ink, once each, for the
  three beliefs), a 20px radius, no border, no shadow.
- Headings are plain sentences. No accent word in another colour.
- Numbers only on real sequences: the request diagrams and "How a project
  goes". Step numbers follow the page's language.
- Tools are a plain comma list, not chips. Pills are for controls (buttons,
  the form's choices).
- Headings name the section the way the menu does ("Work", "Services").
  No generic CTA copy ("Let's talk"); no arrows stapled to link text.
- The contact form sits on the dark band itself, not on a panel inside it.
- Motion answers something: the hero's showcase takes turns through the
  projects and holds while pointed at; tiles rise into place as you reach
  them; a project's picture lifts when its tile is pointed at; a click
  carries the picture and title into the project's page; the header's edge
  shows how far down you are; buttons answer a press. Nothing moves under
  reduced motion, scroll-linked parts exist only where the browser supports
  them, and no text is ever hidden waiting for an animation.
- Copy is plain and matches `public/youseef-tareq-resume.pdf`.
- Every text pair passes WCAG AA; visible focus everywhere; 44px touch targets.
