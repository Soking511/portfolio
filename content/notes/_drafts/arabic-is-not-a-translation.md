# Arabic is not a translation

_Outline — not built or published. Expands principle 02 with TileGreen and this site. A strong candidate to publish in both languages._

**Angle:** RTL changes layout, typography and numerals — not just text direction. How to build both directions from one system so neither drifts.

**Who it's for:** teams in the region shipping bilingual products; agencies quoting "Arabic version" as a line item.

## Beats

1. **The mirrored-copy trap.** Two templates that slowly diverge. What did you see go wrong on projects before TileGreen?
2. **One layout system.** Logical properties (`margin-inline-start`, `inset-inline`, `border-inline-start`) instead of left/right; `dir` on `<html>`; icons that flip and icons that must not.
3. **Typography is where it breaks.** Examples from this site's own code:
   - letter-spacing pulls joined Arabic letters apart (`[dir="rtl"] .mono:not(.latin)` in `app/globals.css`);
   - Arabic has no italic, so emphasis moves to colour and weight;
   - Latin product names inside Arabic text need `unicode-bidi: isolate`.
4. **Numerals and dates.** Eastern Arabic digits in prose, Latin digits where data is compared. `Intl.DateTimeFormat("ar-EG")`.
5. **SEO: Arabic has to be a real page.** A client-side language toggle means search engines never see the Arabic site. Separate URLs (`/ar/`), `hreflang`, `lang`/`dir` in the static HTML.
6. **TileGreen in practice.** What sharing one system bought you there. _Add a before/after or the two screenshots side by side._

## Before publishing

- Decide: write Arabic first and translate, or the reverse? (Register the pair with `translation` in `content/notes/meta.ts`.)
- Link to `/work/tilegreen/`.
