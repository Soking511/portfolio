/**
 * A forward arrow that flips under RTL (see `.flip-x` in globals.css). Used
 * only where it says where a link goes — back to the list, on to the next
 * case study — not as decoration on buttons. `back` points towards the start
 * of the line in either direction.
 */
export function Arrow({ size = 14, back = false }: { size?: number; back?: boolean }) {
  return (
    <svg
      className={back ? "flip-back" : "flip-x"}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      aria-hidden="true"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  );
}
