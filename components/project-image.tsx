/**
 * Project imagery, or a designed typographic panel when there is no honest
 * image to show (site in maintenance, or domain no longer resolving).
 *
 * Phones get a genuinely different asset, not a scaled-down desktop one:
 * `<slug>-m390/780.webp` are 3:4 portrait captures taken with real mobile
 * device emulation, so the site's own phone breakpoint is what you see. A
 * 1440x900 desktop screenshot shrunk into a 335px column reads as an empty
 * rectangle, which is exactly what it used to do here.
 *
 * Plain <picture> rather than next/image: the site is a static export with
 * `images.unoptimized`, so next/image would add runtime weight and buy nothing.
 */
export function ProjectImage({
  image,
  title,
  swatch,
  alt,
  priority = false,
  variant = "landscape",
}: {
  image: string | null;
  title: string;
  swatch: string;
  alt: string;
  priority?: boolean;
  /** "feature" = full-bleed portrait on phones; "landscape" = desktop crop only. */
  variant?: "feature" | "landscape";
}) {
  if (!image) {
    return <FallbackPanel title={title} swatch={swatch} variant={variant} />;
  }

  const common = {
    alt,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      objectPosition: "top center",
      background: "var(--card)",
      display: "block" as const,
    },
  };

  if (variant === "feature") {
    return (
      <picture>
        <source
          media="(max-width: 720px)"
          srcSet={`/work/${image}-m390.webp 390w, /work/${image}-m780.webp 780w`}
          sizes="100vw"
          width={390}
          height={520}
        />
        <source
          srcSet={`/work/${image}-720.webp 720w, /work/${image}-1440.webp 1440w`}
          sizes="(max-width: 1080px) 100vw, 60vw"
          width={1440}
          height={900}
        />
        <img
          src={`/work/${image}-1440.webp`}
          width={1440}
          height={900}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...({ fetchpriority: priority ? "high" : undefined } as any)}
          {...common}
        />
      </picture>
    );
  }

  return (
    <img
      src={`/work/${image}-1440.webp`}
      srcSet={`/work/${image}-720.webp 720w, /work/${image}-1440.webp 1440w`}
      sizes="(max-width: 1080px) 100vw, 40vw"
      width={1440}
      height={900}
      {...common}
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
  variant,
}: {
  title: string;
  swatch: string;
  variant: "feature" | "landscape";
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        background: swatch,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 28,
        overflow: "hidden",
      }}
    >
      <span
        className="serif latin"
        style={{
          fontSize: variant === "feature" ? "clamp(30px, 8vw, 62px)" : "clamp(18px, 4vw, 30px)",
          lineHeight: 1.05,
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
