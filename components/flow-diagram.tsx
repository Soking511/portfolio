import type { Diagram } from "@/components/lang/strings";

/** ASCII plus the middle dot, i.e. a Latin product name like "Node.js · Express". */
const LATIN = /^[\x20-\x7E·]+$/;

/**
 * An architecture diagram drawn as an ordered list, not an SVG: the stages
 * are real text, so they translate, wrap, flip for RTL and read out to a
 * screen reader in order. Stages marked `bought` are third-party services —
 * the point of the diagram is which hard parts were bought, not rebuilt.
 */
export function FlowDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="flow">
      <ol className="flow-steps">
        {diagram.nodes.map((node, i) => (
          <li key={node.name} className={`flow-node${node.bought ? " flow-node--bought" : ""}`}>
            <span className="flow-n mono latin">{String(i + 1).padStart(2, "0")}</span>
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
