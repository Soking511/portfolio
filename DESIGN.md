# DESIGN.md

The design contract for soking.digital. Every page and every change is built
from this file. If something you need is not here, add it here first; do not
invent a one-off value in a component.

## Direction

Pictures first, short text second, colour from the work. The page itself is a
soft neutral with near-black type. Each featured project owns one of six soft
tints, and its screenshot sits on that tint wherever the project appears. The
same tints colour the fact tiles in the hero, the service icons and the three
beliefs, so every screen has colour without any one colour shouting. Rows are
filled edge to edge; no column is left empty. The page ends in one dark block
that holds the contact form and the footer.

The owner's feedback on the version before this one (a sage and pine text
index): the colours were dull, there was too much text, and the layout felt
empty. Do not drift back toward any of those.

Directions already tried and set aside: a bank-style corporate look, lapis
and gold, a dark hero with cards, the original editorial cream, soft paper
with lapis ink and teal, and the sage and pine index.

What the owner explicitly does not want: harsh saturated colours, a bright
white ground, content inside cards with shadows, and many elements competing
on one screen.

## Tokens

```yaml
color:
  paper:       "#F5F4F0"   # soft neutral ground, never white
  surface:     "#ECEAE4"   # alternate sections, small tiles
  ink:         "#18181B"   # text, headings, primary button
  ink-soft:    "#5B5B66"   # secondary text, 5.6:1 on surface
  line:        "#DDDBD4"   # dividers only
  line-strong: "#84838C"   # control edges, 3:1
  hot:         "#D9512C"   # the one spark: availability dot, active nav item
  band:        "#18181B"   # the dark block: contact and footer
tints:                      # light / dark
  peach: "#F9D2C2 / #55291B"   # MenuVista
  lilac: "#E0D4F8 / #35285F"   # UFeed
  sky:   "#C2E4F0 / #143D4A"   # Damanhour University
  amber: "#F8E0A6 / #4A3A12"   # EG-Pricey
  blue:  "#CFDAFB / #1F2C5A"   # XTranslator
  mint:  "#C8EAD4 / #163F2C"   # TileGreen
dark:
  paper: "#121214"  surface: "#1A1A1E"  ink: "#EFEEEA"  ink-soft: "#A7A6B1"
  hot: "#FF7D56"  band: "#09090B"
type:
  display: Rubik (variable), Arabic + Latin: the name and headings
  text:    IBM Plex Sans / IBM Plex Sans Arabic, 400 and 600
  body:    17px EN, 18px AR
radius:
  panel: 20px (16px on phones)   field: 12px   button: pill
```

## Rules

- A project is shown before it is described: its screenshot (or the diagram
  that stands in for one) on its own tint, then a name, a year and one line.
  The long answers live on the case study.
- Home-page text is short. A tile gets one or two lines; if something needs a
  paragraph it belongs on a case study or in a note.
- Fill the row. Sections use two, three or four columns on desktop and stack
  on phones; nothing sits beside an empty column.
- Tints are grounds, not text colours. Text on a tint is `--on-tint`; text is
  never set in a tint. A project keeps its tint everywhere (`tint` in
  `lib/projects.ts`).
- Tiles are flat: a tint or `--surface`, a 20px radius, no border, no shadow.
- Buttons are ink pills; links are underlined ink. `--hot` is used only for
  the availability dots, the active nav item and the first stop on the
  experience line.
- Headings are plain sentences. No accent word in another colour.
- Numbers only on real sequences (the request diagrams).
- Tools are a plain comma list, not chips. Pills are for controls (buttons,
  the form's choices).
- Headings name the section the way the menu does ("Work", "Services").
  No generic CTA copy ("Let's talk"); no arrows stapled to link text.
- The contact form sits on the dark band itself, not on a panel inside it.
- Motion answers something, and stops there: the name's second script
  settles once on load; a project's screenshot rises when its tile is pointed
  at; clicking a project carries its picture and title into its page
  (cross-document view transitions); buttons answer a press. Nothing moves
  under reduced motion, and no text is ever hidden waiting for an animation.
- Copy is plain and matches `public/youseef-tareq-resume.pdf`.
- Every text pair passes WCAG AA; visible focus everywhere; 44px touch targets.
