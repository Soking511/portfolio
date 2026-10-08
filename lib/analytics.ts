// Umami (cookie-free) event tracking. Both helpers are inert until
// UMAMI_WEBSITE_ID is set in lib/site.ts and the script loads — the
// attributes are just unread data-* attributes until then.

type UmamiData = Record<string, string>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: UmamiData) => void };
  }
}

/**
 * Attributes that make a link or button report a click, with no JavaScript:
 * `<a {...trackAttrs("live_site", { project: "jafy" })}>`.
 */
export function trackAttrs(event: string, data?: UmamiData): Record<string, string> {
  const attrs: Record<string, string> = { "data-umami-event": event };
  for (const [key, value] of Object.entries(data ?? {})) {
    attrs[`data-umami-event-${key}`] = value;
  }
  return attrs;
}

/** For outcomes that are not a click, such as a form that actually sent. */
export function track(event: string, data?: UmamiData) {
  try {
    window.umami?.track(event, data);
  } catch {
    /* analytics must never break the page */
  }
}
