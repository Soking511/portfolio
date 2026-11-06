# DESIGN.md

The design contract for soking.digital. Every page and every change is built
from this file. If something you need is not here, add it here first; do not
invent a one-off value in a component.

## Direction

Calm and easy on the eye. The owner tried four other directions (a bank-style
corporate look, lapis and gold, a dark hero with cards, the original editorial
cream) and chose this one: a soft paper ground, lapis ink, one muted teal
accent, plain sections, and the name large at the top in both scripts.

What the owner explicitly does not want: bright saturated colours, a bright
white ground, content inside cards with shadows, and many elements competing
on one screen.

## Tokens

```yaml
color:
  paper:       "#FBFBF9"   # soft ground, never pure white
  surface:     "#ECF1F1"   # limestone: alternate sections, media frames
  ink:         "#13264D"   # lapis: text and headings
  ink-soft:    "#4A5872"   # secondary text, 6.3:1 on surface
  line:        "#D5DDE0"   # dividers only
  line-strong: "#7D8A9C"   # control edges, 3:1
  accent:      "#0A7671"   # muted teal: links, primary button, focus. 4.8:1 on surface
  band:        "#13264D"   # the one dark section: contact
dark:
  paper: "#0E1A33"  surface: "#142446"  ink: "#E6ECF2"  ink-soft: "#A3B0C4"
  accent: "#4FC1B7"  band: "#08122A"
type:
  display: Alexandria (variable), Arabic + Latin: the name and headings
  text:    IBM Plex Sans / IBM Plex Sans Arabic, 400 and 600
  body:    17px EN, 18px AR
radius:
  media: 16px   button: 10px   field: 6px
```

## Rules

- Headings are plain sentences. No accent word in another colour.
- Content sits on the page, not in cards. No shadows on content.
- One accent colour, used sparingly: buttons, links, the active nav item.
- Numbers only on real sequences (the timeline, the request diagram).
- No badges, chips or pills for information: availability is a fact in the
  hero list, and tools are a plain comma list. Pills are only for controls
  (the form's choices).
- Headings name the section the way the menu does ("Work", "Services").
  No generic CTA copy ("Let's talk"); no arrows stapled to link text.
- Motion answers something, and stops there: the name's second line settles
  once on load; clicking a project carries its picture and title into its
  page (cross-document view transitions); screenshots open as they arrive
  and drift slightly with the scroll; the career line draws as you read it;
  buttons answer a press. Scroll-linked parts need scroll timelines and
  are simply absent elsewhere. Nothing moves under reduced motion, and no
  text is ever hidden waiting for an animation.
- Copy is plain and matches `public/youseef-tareq-resume.pdf`.
- Every text pair passes WCAG AA; visible focus everywhere; 44px touch targets.
