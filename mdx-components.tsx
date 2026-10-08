import type { MDXComponents } from "mdx/types";

/**
 * Required by @next/mdx. Typography comes from `.note-body` in globals.css;
 * the one override is that links leaving the site open in a new tab.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", ...props }) =>
      href.startsWith("http") ? (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
      ) : (
        <a href={href} {...props} />
      ),
    ...components,
  };
}
