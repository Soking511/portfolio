"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { isIntent, type Intent } from "@/lib/contact";

/**
 * Lets a call to action say *why* the visitor is heading to the form, so
 * "Start a project" and "Talk about a role" land on the right fields.
 *
 * On the same page this is plain state: the CTA sets it, then the browser
 * follows its #contact href. Arriving from another page (a case study), the
 * CTA links to `/?intent=role#contact`, which is read once on mount.
 */
type ContactIntentValue = {
  intent: Intent;
  setIntent: (i: Intent) => void;
};

const ContactIntentContext = createContext<ContactIntentValue>({
  intent: "project",
  setIntent: () => {},
});

export function ContactIntentProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<Intent>("project");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("intent");
    if (!fromUrl) return;
    if (isIntent(fromUrl)) setIntent(fromUrl);
    // Drop the parameter once read, so in-page anchor links stay same-document
    // jumps instead of navigations, and a shared URL does not carry it along.
    params.delete("intent");
    const query = params.toString();
    history.replaceState(null, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
  }, []);

  const value = useMemo(() => ({ intent, setIntent }), [intent]);
  return <ContactIntentContext.Provider value={value}>{children}</ContactIntentContext.Provider>;
}

/** The form on the home page, opened with an intent, from any other page. */
export function contactHref(home: string, intent: Intent) {
  return `${home}?intent=${intent}#contact`;
}

export function useContactIntent() {
  return useContext(ContactIntentContext);
}
