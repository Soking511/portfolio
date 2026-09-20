/**
 * Project screenshot, or a designed typographic panel when there is no honest
 * image to show (site in maintenance, or domain no longer resolving).
 *
 * Plain <img> rather than next/image: the site is a static export with
 * `images.unoptimized`, so next/image would add runtime weight and buy
 * nothing. Sources are pre-sized WebP in /public/work.
 */
export function ProjectImage({
  image,
  title,
  swatch,
  alt,
  priority = false,
  maxHeight,
}: {
  image: string | null;
  title: string;
  swatch: string;
  alt: string;
  priority?: boolean;
  /** Caps the full-bleed variant so one screenshot cannot eat two screens. */
  maxHeight?: string;
}) {
  if (!image) {
    return <FallbackPanel title={title} swatch={swatch} maxHeight={maxHeight} />;
  }

  return (
    <img
      src={`/work/${image}-1440.webp`}
      srcSet={`/work/${image}-720.webp 720w, /work/${image}-1440.webp 1440w`}
      sizes="(max-width: 1080px) 100vw, 60vw"
      alt={alt}
      width={1440}
      height={900}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...({ fetchpriority: priority ? "high" : undefined } as any)}
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: "16 / 10",
        maxHeight,
        objectFit: "cover",
        objectPosition: "top center",
        background: "var(--card)",
        border: "1px solid var(--rule)",
      }}
    />
  );
}

/**
 * Not an error state — a deliberate wordmark panel, so a project without a
 * usable screenshot still reads as designed rather than broken.
 */
function FallbackPanel({
  title,
  swatch,
  maxHeight,
}: {
  title: string;
  swatch: string;
  maxHeight?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        aspectRatio: "16 / 10",
        maxHeight,
        background: swatch,
        border: "1px solid var(--rule)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        overflow: "hidden",
      }}
    >
      <span
        className="serif latin"
        style={{
          fontSize: "clamp(28px, 5vw, 64px)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "rgba(255,255,255,.92)",
          textAlign: "center",
        }}
      >
        {title}
      </span>
    </div>
  );
}
