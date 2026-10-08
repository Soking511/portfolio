/** Canonical origin. The live site is soking.digital; the older soking.tech
 *  and youseeftareq.dev domains no longer resolve. */
export const SITE_URL = "https://soking.digital";

// Contact details live here once, so moving to a domain address or a new
// number is a one-line change rather than a hunt through both locales.
export const EMAIL = "youseeftareq5176@gmail.com";
export const WHATSAPP_NUMBER = "201557337989";
export const WHATSAPP_DISPLAY = "+20 155 733 7989";
export const LINKEDIN_URL = "https://linkedin.com/in/youseef-tareq";
export const LINKEDIN_DISPLAY = "/in/youseef-tareq";
export const GITHUB_URL = "https://github.com/Soking511";
export const GITHUB_DISPLAY = "Soking511";
export const RESUME_PATH = "/youseef-tareq-resume.pdf";

export function whatsappLink(prefill?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return prefill ? `${base}?text=${encodeURIComponent(prefill)}` : base;
}

// Slots that render nothing until they hold something real.

/** A scheduling link (e.g. a Cal.com event). Null hides the "book a call" button. */
export const BOOKING_URL: string | null = null;

/** Path under /public, e.g. "/portrait.webp". Null hides the portrait in About. */
export const PORTRAIT: string | null = null;

/** Umami Cloud website ID (public, not a secret). Null loads no analytics at all. */
export const UMAMI_WEBSITE_ID: string | null = null;
