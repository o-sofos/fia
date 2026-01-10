/**
 * Flick Counter Example
 *
 * Demonstrates the basic usage of Flick's reactive UI system.
 */

import { $, div, h1, button, p } from "./mod";

// Create reactive state
const count = $(0);

// Create computed values
const doubled = $(() => count.value * 2);
const isEven = $(() => count.value % 2 === 0);

// Build the UI
div({ style: { padding: "20px", fontFamily: "system-ui" } }, () => {
  h1("Flick Counter");

  p("Count: ", count);
  p("Doubled: ", doubled);
  p(() => {
    if (isEven.value) {
      p({ style: { color: "green" } }, "✓ Even number");
    } else {
      p({ style: { color: "orange" } }, "○ Odd number");
    }
  });

  div({ style: { display: "flex", gap: "10px", marginTop: "20px" } }, () => {
    button(
      { onclick: () => count.value++ },
      "Increment"
    );

    button(
      { onclick: () => count.value-- },
      "Decrement"
    );

    button(
      { onclick: () => count.value = 0 },
      "Reset"
    );
  });
});
