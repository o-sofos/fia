// === src/utils.ts (or a new 'security.ts') ===

/**
 * A simple (but not perfect) sanitizer.
 * A real app might use a more robust library.
 */
export function simpleSanitize(html: string): string {
  // Removes all tags
  return html.replace(/<[^>]*>?/gm, "");
}
