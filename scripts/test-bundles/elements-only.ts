/**
 * Test bundle: Element factories only
 *
 * Tests tree-shaking for basic element creation.
 * Expected size: ~1-1.5KB minified+gzipped
 */

import { $, div, span, button, Mut } from "../../src/core/mod";

// Create signals
const message = $("Hello, World!");
const count = $(Mut(0));

// Create elements
const app = div({ class: "app" }, () => {
  span({ textContent: message });
  button({
    textContent: "Click me",
    onclick: () => count.value++,
  });
  div(() => {
    span("Count: ");
    span({ textContent: count });
  });
});

// Export to prevent elimination
export { app };
