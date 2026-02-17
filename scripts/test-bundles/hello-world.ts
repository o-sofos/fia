/**
 * Realistic Hello World - What a typical starter app looks like
 *
 * Includes:
 * - Counter state with signal
 * - A few basic elements (div, h1, p, button)
 * - Event handler
 * - Reactive text binding
 */

import { $, div, h1, p, button, Mut } from "../../src/core/mod";

// Create reactive state
const count = $(Mut(0));

// Build the app
div({ class: "app" }, () => {
  h1("Hello World");
  p($(() => `Count: ${count.value}`));
  button("Click me!", () => count.value++);
});

// Export to prevent tree-shaking
export { count };
