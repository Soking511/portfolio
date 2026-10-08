"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { isIntent, type Intent } from "@/lib/contact";

/**
 * Lets a call to action say *why* the visitor is heading to the form, so
 * "Start a project" and "Talk about a role" land on the right fields.
 *
 * On the same page this is plain state: the CTA sets it, then the browser
 * follows its #contact href. Arriving from another page, the CTA links to
 * `/?intent=role#contact`, which is read once on mount.
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
    const fromUrl = new URLSearchParams(window.location.search).get("intent");
    if (isIntent(fromUrl)) setIntent(fromUrl);
  }, []);

  const value = useMemo(() => ({ intent, setIntent }), [intent]);
  return <ContactIntentContext.Provider value={value}>{children}</ContactIntentContext.Provider>;
}

export function useContactIntent() {
  return useContext(ContactIntentContext);
}
