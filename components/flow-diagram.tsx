import type { Diagram } from "@/components/lang/strings";

/** ASCII only, i.e. a Latin product name like "Node.js + Express". */
const LATIN = /^[\x20-\x7E]+$/;

/**
 * An architecture diagram drawn as an ordered list, not an SVG: the stages
 * are real text, so they translate, wrap, flip for RTL and read out to a
 * screen reader in order. It is a real sequence (the path of a request), so
 * the stages are numbered. Stages marked `bought` are third-party services —
 * the point of the diagram is which hard parts were bought, not rebuilt.
 *
 * `compact` keeps only the stage names, for the small project card.
 */
export function FlowDiagram({ diagram, compact = false }: { diagram: Diagram; compact?: boolean }) {
  return (
    <figure className={compact ? "flow flow--compact" : "flow"}>
      <ol className="flow-steps">
        {diagram.nodes.map((node, i) => (
          <li key={node.name} className={`flow-node${node.bought ? " flow-node--bought" : ""}`}>
            <span className="flow-n" aria-hidden="true">
              {i + 1}
            </span>
            <span>
              <span className={`flow-name${LATIN.test(node.name) ? " latin" : ""}`}>{node.name}</span>
              <span className="flow-note">{node.note}</span>
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="flow-cap">{diagram.caption}</figcaption>
    </figure>
  );
}
