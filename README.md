# soking.digital

Personal site for Youseef Tareq — software engineer (MEAN stack), Cairo.

Next.js 15 (App Router) exported as a fully static site and deployed to
Firebase Hosting by GitHub Actions on push to `main`.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15, React 19, TypeScript, `output: "export"` |
| Styling | One design system in `app/globals.css` (tokens + component classes). Tailwind is present for preflight only. |
| Type | Rubik (display, Arabic + Latin) and IBM Plex Sans / Plex Sans Arabic (text), self-hosted by `next/font` |
| Content | One typed bilingual file: `components/lang/strings.ts` |
| Languages | English at `/`, Arabic at `/ar/` — separate static pages, one root layout each |
| Contact form | Firestore write → Cloud Function → email |
| Motion | GSAP 3 with ScrollTrigger, through `@gsap/react`. One arrival in CSS; everything after follows the scroll or a click |
| Analytics | Umami (cookie-free), off until `UMAMI_WEBSITE_ID` is set in `lib/site.ts` |
| Hosting | Firebase Hosting (`out/`) |

There is no component library and no CSS framework doing the layout. That is
deliberate: the whole design system is one CSS file. GSAP is the one library
added on top of it, and only for motion.

## Design system

`DESIGN.md` is the contract: direction, tokens and rules. `app/globals.css`
implements it. Read it before changing any page.

In short: one colour, pictures first, short text second. A soft neutral
ground with near-black type and a single orange accent that always means
"live, or you can act on this". Screenshots sit on neutral panels and carry
the variety. One dark block at the end holds contact and the footer. Rubik
sets the name and headings in both scripts; IBM Plex sets the reading text.
Flat tiles, no shadows, no white ground.

## Layout

```
app/
  (en)/layout.tsx          <html lang="en" dir="ltr">
  (en)/page.tsx            /
  (en)/work/[slug]/        /work/<slug>/ case studies
  (en)/notes/[[...slug]]/  /notes/ index and each note; feed.xml beside it
  (ar)/layout.tsx          <html lang="ar" dir="rtl">, Arabic font
  (ar)/ar/…                the same pages under /ar/
  globals.css              the design system
  robots.ts  sitemap.ts    generated at build (sitemap lists hreflang pairs)
components/
  shell/root-shell.tsx     fonts, head, providers, analytics — shared by both layouts
  pages/home.tsx           section order
  pages/case-study.tsx     one featured project on its own URL: title, a row
                           of facts, the picture, the answers, and the next
                           project shown with its picture
  hero.tsx                 the fold: the name in both scripts, one sentence,
                           two actions, the showcase, and four facts
  hero-showcase.tsx        the projects one at a time, taking turns (desktop
                           and tablet; phones go straight to the work row)
  section-head.tsx         section heading, optional intro line and action
  work-featured.tsx        the projects as picture tiles, two to a row, and
                           one swipe row with position marks on phones;
                           Answers for the case study
  work-selected.tsx        remaining projects as three rows under a rule
  project-panel.tsx        a project's screenshot or diagram on a panel
  capabilities.tsx         services: a list opened one item at a time
                           (native <details>), each with its proof projects;
                           tools as four columns
  principles.tsx           three beliefs as tiles, and how a project goes
                           as four numbered steps
  about.tsx                who I am, and the four things I care about as a list
  experience.tsx           positions as one line through time
  contact.tsx  footer.tsx  header.tsx
  testimonials.tsx         hidden until strings.ts has a real quote
  project-image.tsx        screenshot, diagram, or a wordmark panel
  flow-diagram.tsx         architecture diagram as an ordered list
  contact-intent.tsx       lets a CTA preselect "project" / "role" on the form
  lang/                    strings.ts (en + ar), provider
  theme/                   light/dark, no-FOUC script
content/notes/
  meta.ts         published notes (title, date, language) — client-safe
  bodies.ts       each note's MDX body, imported only by the note route
  _drafts/        outlines; never built
mdx-components.tsx  required by @next/mdx; external links open in a new tab
lib/
  site.ts         canonical origin, contact details, optional slots
  projects.ts     project slugs, status, images, diagrams
  i18n.ts         /ar path helpers and hreflang maps
  seo.ts          per-page metadata and JSON-LD
  contact.ts      form enums (mirrored in firestore.rules)
  analytics.ts    Umami event helpers
  gsap.ts         GSAP set up once: plugins, the motion media queries, and
                  the "draw in order" and "land each" helpers. Import GSAP
                  from here only
  firebase.ts     client init
```

## Conventions worth knowing

**Content lives in `components/lang/strings.ts`.** The `Strings` type is shared
by both locales, so adding an English string without its Arabic counterpart is a
compile error. That is the point — it keeps the two languages from drifting.

**The URL decides the language.** Each language has its own root layout, so
`/ar/` ships `lang="ar" dir="rtl"` and Arabic text in its static HTML — search
engines index both. The language toggle is a link to the same page in the
other language. Every page sets its own canonical and `hreflang` alternates
(`lib/seo.ts`); never put a canonical on a layout, or every child page inherits
it.

**Slots stay empty until there is something true to put in them.** An
`outcome` on a featured project, a testimonial, `PORTRAIT`, `BOOKING_URL` and
`UMAMI_WEBSITE_ID` all render nothing until set.

**Project links follow `status` in `lib/projects.ts`.** `live` links to the
site and `source` to public code on GitHub; `private`, `maintenance`,
`offline` and `unreleased` show a label instead. MenuVista is `unreleased`
until menuvista.net serves a valid certificate. Check the live sites now and then — a project
that comes back from maintenance should link again.

**Claims match the résumé.** Years, roles and "My part" for each project are
taken from `public/youseef-tareq-resume.pdf`. When one changes, change both.

**Two border weights.** `--rule` is a quiet hairline for dividers.
`--rule-strong` (3:1 against the background) outlines anything you can
interact with — inputs, outline buttons, the form's choices — so controls
can be found.

**Notes are written per language and appear with the first one.** To
publish: write `content/notes/<lang>/<slug>.mdx`, import it in `bodies.ts`,
add its entry to `meta.ts` (newest first; `translation` names its twin in the
other language, if any). Until a language has a note, its `/notes/` page is
`noindex`, absent from the sitemap and not linked from the nav or home page.
The notes route is an optional catch-all because static export rejects a
dynamic route with no params — which is exactly the state before the first
note.

**Content is never hidden waiting for JavaScript.** The stylesheet draws
every element in its finished state, and the first screen's arrival is CSS,
so the page is whole before any script runs. No text waits on an animation,
and everything is skipped under `prefers-reduced-motion`.

**Motion after the first screen is GSAP, and follows the visitor** (the
rules are in `DESIGN.md`, the setup in `lib/gsap.ts`):

- Scroll motion is scrubbed, never triggered: it moves as far as the page
  has moved and goes back with it. The header's edge fills, a project's
  picture rises into its panel (`work-featured.tsx`), the three beliefs land
  in turn and the steps are drawn in order (`principles.tsx`), the line
  through the jobs is drawn (`experience.tsx`), and the dark band widens
  into place (`contact.tsx`).
- On phones the same motion takes the layout's shape: the project row's
  pictures follow the sideways swipe (the tile in view is up, the next one
  rises as it comes in), and the stacked belief tiles each land as they
  arrive (`landEach` in `lib/gsap.ts`). The phone's address-bar resize is ignored
  so nothing re-measures under the thumb.
- Click motion: a service slides open while the last one closes
  (`capabilities.tsx`), the menu's mark slides to the section in view and the
  phone menu's links arrive in order (`header.tsx`), the showcase caption
  rises in when the project changes (`hero-showcase.tsx`).
- GreenSock's official GSAP skills are in `.claude/skills/`, so a Claude
  Code session on this repository writes GSAP the way its makers document
  it. `DESIGN.md` still decides what the motion should do.
- Every tween is created in `useGSAP`, inside `gsap.matchMedia()` under the
  `MOTION` query, so it is undone when the component leaves or the visitor
  turns motion off.
- The lines are drawn through a `--draw` custom property (0 to 1) that the
  stylesheet reads; it is 1 unless GSAP is driving it.
- `header.tsx` re-measures every scroll position when the page's height
  changes (a service opens, a font lands). Anything new that changes the
  page's height needs nothing more.

**The services list is native `<details>` with GSAP on top.** Without
script, or under reduced motion, the shared `name` keeps one item open, as
the browser does it. With motion on, the name comes off so the item being
left can be seen closing, and the component keeps the one-open rule itself.

**A project tile is one link with a second link on top.** The project's name
is the link to its case study and covers the whole tile; the live-site link
sits above it. "Read the case study" under it is a label for that click, not
a third link. `ProjectPanel` draws the same picture on the home page and at
the top of the case study, so a click carries it across.

**Phones have their own composition.** It lives in one block of
`app/globals.css` ("phones", under 720px) plus three pieces of markup that
only show there: the availability line in `hero.tsx`, the position marks in
`work-featured.tsx`, and the contact bar in `header.tsx` (WhatsApp and "Start
a project", shown after the hero and hidden at the contact section, the end
of the page and under the open menu). Check any change at 320px and 390px.

**The hero showcase is driven by its own CSS animation.** The mark of the
project on show fills over five seconds, and the end of that animation is
what advances the showcase. Pointing at the picture or the marks, or tabbing
to them, pauses the animation and so holds the turn; picking a project or
pressing the pause button at the end of the marks stops the turns, and the
same button starts them again; under reduced motion the animation does not
exist, so nothing advances and the button is not shown.

**The contact form keeps what is typed and never hangs.** The draft lives in
`localStorage` (`portfolio:contact-draft`) until the message is sent, and
never leaves the device that way. Firestore queues a write it cannot deliver
instead of failing, so the send is raced against a fifteen-second timer;
after that, or at once when the browser reports no connection, the form
says so and offers the same message as a `mailto:` link. Validation is one
pure function (`check`) run on submit and then on every change. Do not test
a real send against production: block `googleapis.com` in the browser test,
as the form then shows its timeout path.

**Project screenshots are static WebP** in `public/work`, at 1440w and 720w.
Earlier versions embedded each project as a live `<iframe>`; that was removed
because most of them could not render (`X-Frame-Options: DENY`, auth walls,
maintenance pages) and it meant loading seven third-party sites.

**A project without an honest screenshot shows its diagram**, or failing
that a wordmark panel, not a placeholder — set `image: null` in
`lib/projects.ts`. Set `url: null` when a domain no longer resolves and no
link is rendered.

## Scripts

```bash
npm run dev        # dev server
npm run build      # static export to out/
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

Lint and type errors fail the build; they are not ignored.

## Regenerating project screenshots

Captured with headless Chrome and converted with `sharp` (already present as a
transitive dependency). There is no committed script — screenshots are taken
rarely and by hand:

```bash
chrome --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,900 --virtual-time-budget=12000 \
  --screenshot=shot.png https://example.com/
```

Then crop any promo or consent bar, resize to 1440w and 720w, and write WebP at
quality 82 into `public/work/<slug>-{1440,720}.webp`.

Share images (`public/og.png` and `public/og/<slug>.png`, 1200×630) are
rendered from `scripts/og-template.html` with headless Chrome, so they use the
site's own fonts and palette. Copy the project's 1440w screenshot next to the
template, then:

```bash
chrome --headless=new --hide-scrollbars --allow-file-access-from-files   --window-size=1200,630 --virtual-time-budget=12000 --screenshot=og.png   "file:///…/og-template.html?kind=case&title=EG-Pricey&kicker=…&stack=…&img=eg-pricey-1440.webp"
```

`kind=home` draws the home image; a case without `img` takes `nodes=A|*B|C`
(a `*` marks a bought service) and draws its architecture instead.
Regenerate them when a project's title, kicker or screenshot changes.

## Deploying

Push to `main`. `.github/workflows/firebase-hosting-merge.yml` builds and deploys
to the live channel; pull requests get a preview channel.

Firestore rules restrict the `messages` collection to create-only writes that
match the contact form's exact shape, with length caps. Reads are closed.

CI deploys hosting only. When the form's shape changes, deploy the rules and
the function first — `firebase deploy --only firestore:rules,functions` — so
the live form never writes a document the rules reject.
