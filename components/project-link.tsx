"use client";

import { useT } from "@/components/lang/provider";
import type { ProjectMeta } from "@/lib/projects";
import { trackAttrs } from "@/lib/analytics";

/**
 * The outbound link for a project: its live site, or its public source code.
 * Anything else gets a plain label saying why there is no link, so nobody
 * leaves the portfolio for a maintenance page or a login wall. A new tab is
 * announced in words for screen readers, not drawn as an arrow.
 */
export function ProjectLink({ meta }: { meta: ProjectMeta }) {
  const { t } = useT();

  const { status } = meta;
  if (status !== "live" && status !== "source") return <Label text={t.works.status[status]} />;
  if (!meta.url) return <Label text={t.works.status.offline} />;

  return (
    <a
      href={meta.url}
      target="_blank"
      rel="noopener noreferrer"
      className="link tap"
      {...trackAttrs(meta.status === "source" ? "source_code" : "live_site", { project: meta.slug })}
    >
      {meta.status === "source" ? t.misc.view_source : t.misc.visit_project}
      <span className="visually-hidden"> {t.misc.new_tab}</span>
    </a>
  );
}

function Label({ text }: { text: string }) {
  return <span className="soft">{text}</span>;
}
