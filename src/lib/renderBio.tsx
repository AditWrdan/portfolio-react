import { Fragment } from "react";

/**
 * Splits text on a `**bold**` convention and wraps matches in the same
 * emphasis span used across the site, so the bio stays editable as plain
 * text in the dashboard while keeping its visual emphasis.
 */
export function renderBio(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
