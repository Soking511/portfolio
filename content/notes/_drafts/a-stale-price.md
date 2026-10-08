# A stale price is worse than no price

_Outline — not built or published. Expands principle 01 ("Correct beats clever") with EG-Pricey._

**Angle:** why EG-Pricey pushes prices over WebSockets, and why the interface says "reconnecting" instead of quietly showing the last number.

**Who it's for:** engineers building anything live (prices, scores, stock levels); founders deciding between polling and push.

## Beats

1. **The problem in one paragraph.** Egyptians check the dollar and gold rate several times a day, across sources that rarely agree. What does a wrong number cost the reader?
2. **Polling vs push.** Why a tab left open all morning is the case that matters. _Your numbers:_ how often prices change, how many tabs stay open, what polling would have cost the API.
3. **The failure case is the feature.** What happens on disconnect — how is "stale" detected, how long before the UI says so, what exactly does it show? A screenshot of the reconnect state would carry this section.
4. **What Socket.IO gave you and what it didn't.** Reconnection, rooms, fallbacks — and anything you had to build yourself.
5. **What you'd do differently.** (Same text can fill `caseStudy.differently` for EG-Pricey.)

## Before publishing

- One real number (concurrent sockets at peak, update frequency, or monthly visitors).
- One code excerpt — the stale-detection logic, trimmed.
- Link to the case study: `/work/eg-pricey/`.
