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
| Analytics | Umami (cookie-free), off until `UMAMI_WEBSITE_ID` is set in `lib/site.ts` |
| Hosting | Firebase Hosting (`out/`) |

There is no animation library, no component library and no CSS framework doing
the layout. That is deliberate: the whole design system is one CSS file.

## Design system

`DESIGN.md` is the contract: direction, tokens and rules. `app/globals.css`
implements it. Read it before changing any page.

In short: pictures first, short text second, colour from the work. A soft
neutral ground with near-black type; each featured project owns one of six
soft tints and its screenshot sits on that tint everywhere. The same tints
colour the hero's fact tiles, the service icons and the beliefs. One dark
block at the end holds contact and the footer. Rubik sets the name and
headings in both scripts; IBM Plex sets the reading text. Flat tiles, no
shadows, no white ground.

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
  pages/case-study.tsx     one featured project on its own URL
  hero.tsx                 the fold: the name in both scripts, one sentence,
                           two actions, and four facts as tinted tiles
  section-head.tsx         section heading, optional intro line and action
  work-featured.tsx        the projects as picture tiles, two to a row;
                           Answers for the case study
  work-selected.tsx        remaining projects as three small tiles
  project-panel.tsx        a project's screenshot or diagram on its tint
  capabilities.tsx         services: six tiles with an icon, one line and
                           links to the proof; tools as four columns
  principles.tsx           three beliefs on tints, and how a project goes
  about.tsx                who I am
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

**Content is never hidden waiting for JavaScript.** All motion is CSS (see
the rules in `DESIGN.md`): no text waits on an animation, and everything is
skipped under `prefers-reduced-motion`.

**A project tile is one link with a second link on top.** The project's name
is the link to its case study and covers the whole tile; the live-site link
sits above it. Each project's colour is `tint` in `lib/projects.ts`, and
`ProjectPanel` puts its screenshot on that colour on the home page and at
the top of its case study.

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

`kind=home` draws the home image; a case takes `tint=peach|lilac|sky|amber|blue|mint`
(its colour in `lib/projects.ts`), and without `img` takes `nodes=A|*B|C`
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
