// The contact form's structured fields. Stored values are these codes, never
// the translated labels, so a message reads the same whichever language it was
// sent in. firestore.rules enumerates the same lists — keep them in step.

export const INTENTS = ["project", "role", "other"] as const;
export type Intent = (typeof INTENTS)[number];

export const BUDGETS = ["lt1k", "1-3k", "3-8k", "8k+", "unsure"] as const;
export type Budget = (typeof BUDGETS)[number];

export const TIMELINES = ["asap", "1-3m", "flexible"] as const;
export type Timeline = (typeof TIMELINES)[number];

export function isIntent(v: unknown): v is Intent {
  return typeof v === "string" && (INTENTS as readonly string[]).includes(v);
}
