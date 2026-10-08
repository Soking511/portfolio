# Buy the hard parts

_Outline — not built or published. Expands principle 03 with XTranslator._

**Angle:** selling a subscription internationally from Egypt is a tax, currency and fraud problem before it is a product problem. Why XTranslator uses a merchant of record (Lemon Squeezy) and an edge proxy (Cloudflare) instead of building either.

**Who it's for:** founders in the region launching a SaaS; developers asked to "just add Stripe".

## Beats

1. **What "sell worldwide" actually means.** VAT/GST by country, currency, chargebacks, fraud. What were the options available from Egypt at the time?
2. **Merchant of record vs payment processor.** What the fee buys you, in plain terms. _Your view:_ when is it worth it, when would you switch?
3. **Integration in practice.** Checkout, subscription lifecycle, keeping your own user records in sync. The part that took longest.
4. **Cloudflare in front.** Rate limiting and bot filtering at the edge, so the origin stays small. What abuse did you actually see on a translation API?
5. **The rule of thumb.** How you decide what to buy and what to build — the reusable takeaway.

## Before publishing

- Any number you can share (countries with paying users, languages covered, blocked requests per day).
- Link to `/work/xtranslator/`.
