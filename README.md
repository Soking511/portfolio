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
| Contact form | Firestore write → Cloud Function → email |
| Hosting | Firebase Hosting (`out/`) |

There is no animation library, no component library and no CSS framework doing
the layout. That is deliberate: the whole design system is about 300 lines of
CSS.

## Layout

```
app/
  layout.tsx      fonts, metadata, OG, JSON-LD
  page.tsx        section order
  globals.css     the design system
  robots.ts       generated at build
  sitemap.ts      generated at build
components/
  hero.tsx            the fold — no reveal animation, must fit one screen
  work-featured.tsx   3 case studies, 3 different layouts
  work-selected.tsx   remaining projects as a list
  principles.tsx      "how I work" + tools
  about.tsx  experience.tsx  contact.tsx  footer.tsx  header.tsx
  project-image.tsx   screenshot, or a wordmark panel when there is none
  lang/               strings.ts (en + ar), provider, RTL helper
  theme/              light/dark, no-FOUC script, reveal hook
lib/
  projects.ts     project URLs, images and brand colours
  site.ts         canonical origin
  firebase.ts     client init
```

## Conventions worth knowing

**Content lives in `components/lang/strings.ts`.** The `Strings` type is shared
by both locales, so adding an English string without its Arabic counterpart is a
compile error. That is the point — it keeps the two languages from drifting.

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

## Deploying

Push to `main`. `.github/workflows/firebase-hosting-merge.yml` builds and deploys
to the live channel; pull requests get a preview channel.

Firestore rules restrict the `messages` collection to create-only writes that
match the contact form's exact shape, with length caps. Reads are closed.
