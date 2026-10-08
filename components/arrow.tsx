/** A forward arrow that flips under RTL (see `.arrow-x` in globals.css). */
export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg className="arrow-x" width={size} height={size} viewBox="0 0 14 14" aria-hidden="true">
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
