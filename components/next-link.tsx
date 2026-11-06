"use client";

import { useT } from "@/components/lang/provider";

/**
 * The quiet link at the end of a section that says what comes next and takes
 * you there, so the page leads the reader from one question to the next
 * instead of leaving them to scroll and guess.
 */
export function NextLink({ href, label }: { href: string; label: string }) {
  const { t } = useT();
  return (
    <p className="next-link">
      <a href={href}>
        <span className="next-link__label">{t.misc.next_label}:</span>
        <span className="next-link__title">{label}</span>
      </a>
    </p>
  );
}
