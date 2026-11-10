import type { CSSProperties } from "react";
import { FlowDiagram } from "@/components/flow-diagram";
import { ProjectImage } from "@/components/project-image";
import type { Diagram } from "@/components/lang/strings";
import type { ProjectMeta } from "@/lib/projects";

/**
 * A project's picture on a neutral panel: its screenshot rising from the
 * panel's bottom edge, or, when there is no honest screenshot, the diagram
 * of how it works. The same panel is used on the home page and at
 * the top of the case study, so a click carries it from one to the other.
 */
export function ProjectPanel({
  meta,
  title,
  alt = "",
  diagram,
  compact = false,
  priority = false,
  className = "",
  style,
}: {
  meta: ProjectMeta;
  title: string;
  alt?: string;
  diagram?: Diagram;
  /** Diagram stage names only, for the small tile. */
  compact?: boolean;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const kind = meta.image ? "" : " panel--diagram";
  return (
    <div className={`panel${kind} ${className}`.trim()} style={style}>
      {meta.image ? (
        <div className="panel__shot">
          <ProjectImage image={meta.image} title={title} alt={alt} variant="feature" priority={priority} />
        </div>
      ) : diagram ? (
        <FlowDiagram diagram={diagram} compact={compact} />
      ) : (
        <ProjectImage image={null} title={title} alt={alt} />
      )}
    </div>
  );
}
