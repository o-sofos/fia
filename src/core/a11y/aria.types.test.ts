/**
 * Type tests for ARIA props. Checked by `bun run test:types`.
 */
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { expect, test } from "bun:test";
import { button, div, input, span } from "../elements/elements";
import { $, Mut } from "../reactivity/reactivity";

try {
  GlobalRegistrator.register();
} catch {
  // Already registered
}

// --- Kebab-case and camelCase both work, typed from the same maps -----------
div({ "aria-label": "Close", "aria-live": "polite", "aria-level": 2 });
div({ ariaLabel: "Close", ariaLive: "polite", ariaLevel: 2 });
// @ts-expect-error - not an aria-live value
div({ "aria-live": "loud" });
// @ts-expect-error - not an aria-live value
div({ ariaLive: "loud" });
// @ts-expect-error - misspelled ARIA attribute
div({ "aria-lable": "Close" });

// --- Booleans where the attribute takes "true"/"false" ----------------------
button({ "aria-pressed": true, ariaExpanded: false, "aria-checked": "mixed" });
// @ts-expect-error - aria-live is not boolean
div({ "aria-live": true });
// @ts-expect-error - aria-level is a number
div({ ariaLevel: true });

// --- Signals, including widened Mut() booleans -------------------------------
const open = $(Mut(false));
button({ "aria-expanded": open, ariaControls: "menu" });
button({ ariaExpanded: $(() => (open.value ? "true" : "false")) });

// --- ARIA 1.2 additions -------------------------------------------------------
span({ ariaDescription: "extra", "aria-braillelabel": "x", ariaRowIndexText: "Row 1" });
div({ "aria-relevant": "additions text" });
div({ "aria-relevant": "text removals additions" });
// @ts-expect-error - repeated aria-relevant token
div({ "aria-relevant": "text text" });

// --- Discriminated elements still accept ARIA --------------------------------
input({ type: "checkbox", "aria-describedby": "hint" });

test("aria type tests compile", () => {
  expect(true).toBe(true);
});
