# soking.digital

Personal site for Youseef Tareq — full-stack engineer, Cairo.

Next.js 15 (App Router) exported as a fully static site and deployed to
Firebase Hosting by GitHub Actions on push to `main`.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15, React 19, TypeScript, `output: "export"` |
| Styling | CSS custom properties in `app/globals.css` + inline styles. Tailwind is present for preflight and the odd utility only. |
| Content | One typed bilingual file: `components/lang/strings.ts` |
| Languages | English at `/`, Arabic at `/ar/` — separate static pages, one root layout each |
| Contact form | Firestore write → Cloud Function → email |
| Analytics | Umami (cookie-free), off until `UMAMI_WEBSITE_ID` is set in `lib/site.ts` |
| Hosting | Firebase Hosting (`out/`) |

There is no animation library, no component library and no CSS framework doing
the layout. That is deliberate: the whole design system is about 300 lines of
CSS.

## Layout

```
app/
  (en)/layout.tsx          <html lang="en" dir="ltr">
  (en)/page.tsx            /
  (en)/work/[slug]/        /work/<slug>/ case studies
  (ar)/layout.tsx          <html lang="ar" dir="rtl">, Arabic font
  (ar)/ar/…                the same pages under /ar/
  globals.css              the design system
  robots.ts  sitemap.ts    generated at build (sitemap lists hreflang pairs)
components/
  shell/root-shell.tsx     fonts, head, providers, analytics — shared by both layouts
  pages/home.tsx           section order
  pages/case-study.tsx     one featured project on its own URL
  hero.tsx                 the fold — no reveal animation
  work-featured.tsx        3 case studies, 3 different layouts
  work-selected.tsx        remaining projects as a list
  principles.tsx  about.tsx  experience.tsx  contact.tsx  footer.tsx  header.tsx
  testimonials.tsx         hidden until strings.ts has a real quote
  project-image.tsx        screenshot, diagram, or a wordmark panel
  flow-diagram.tsx         architecture diagram as an ordered list
  contact-intent.tsx       lets a CTA preselect "project" / "role" on the form
  lang/                    strings.ts (en + ar), provider, RTL helper
  theme/                   light/dark, no-FOUC script, reveal hook
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

**Project links follow `status` in `lib/projects.ts`.** Only `live` projects
link out; `private`, `maintenance` and `offline` show a label instead.

**Content is visible by default.** `[data-reveal]` elements are only hidden once
the pre-hydration script sets `data-reveal-ready` on `<html>`, and it omits that
under `prefers-reduced-motion`. Without JavaScript, or with reduced motion, the
page renders fully. Nothing above the fold animates, so first paint never waits
for hydration.

**Project screenshots are static WebP** in `public/work`, at 1440w and 720w.
Earlier versions embedded each project as a live `<iframe>`; that was removed
because most of them could not render (`X-Frame-Options: DENY`, auth walls,
maintenance pages) and it meant loading seven third-party sites.

**A project without an honest screenshot gets a wordmark panel**, not a
placeholder — set `image: null` in `lib/projects.ts`. Set `url: null` when a
domain no longer resolves and no link is rendered.

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

Case-study share images (`public/og/<slug>.png`, 1200×630) are drawn the same
way as `public/og.png`: an SVG composited with the 1440w screenshot by `sharp`.
Regenerate them when a project's title, kicker or screenshot changes.

## Deploying

Push to `main`. `.github/workflows/firebase-hosting-merge.yml` builds and deploys
to the live channel; pull requests get a preview channel.

Firestore rules restrict the `messages` collection to create-only writes that
match the contact form's exact shape, with length caps. Reads are closed.

CI deploys hosting only. When the form's shape changes, deploy the rules and
the function first — `firebase deploy --only firestore:rules,functions` — so
the live form never writes a document the rules reject.
