"use client";

import { useT } from "@/components/lang/provider";
import type { ProjectMeta } from "@/lib/projects";

/**
 * The outbound link for a project — but only when it is live. Anything else
 * gets a plain label saying why there is no link, so nobody leaves the
 * portfolio for a maintenance page or a login wall.
 */
export function ProjectLink({ meta, size = 12.5 }: { meta: ProjectMeta; size?: number }) {
  const { t } = useT();

  if (meta.status !== "live" || !meta.url) {
    return (
      <span
        className="mono"
        style={{ fontSize: size - 1, letterSpacing: "0.06em", color: "var(--fg-dim)" }}
      >
        {t.works.status[meta.status === "live" ? "offline" : meta.status]}
      </span>
    );
  }

  return (
    <a
      href={meta.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mono tap"
      style={{
        fontSize: size,
        letterSpacing: "0.06em",
        color: "var(--accent)",
        textDecoration: "underline",
        textUnderlineOffset: 4,
      }}
    >
      {t.misc.visit_project} ↗
    </a>
  );
}
