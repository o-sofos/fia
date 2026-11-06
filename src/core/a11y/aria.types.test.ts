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

// --- Roles: abstract roles are rejected ----------------------------------------
div({ role: "region", "aria-label": "Filters" });
// @ts-expect-error - abstract roles are not for authors
div({ role: "widget" });
// @ts-expect-error - "text" is not an ARIA role
span({ role: "text" });
div({ role: "paragraph" }); // ARIA 1.2 structural role

// --- Roles: required states and properties ------------------------------------
div({ role: "checkbox", "aria-checked": false, tabIndex: 0 });
div({ role: "checkbox", ariaChecked: "mixed" }); // camelCase satisfies it too
// @ts-expect-error - checkbox requires aria-checked
div({ role: "checkbox" });
// @ts-expect-error - slider requires aria-valuenow
div({ role: "slider", "aria-label": "Volume" });
div({ role: "slider", "aria-label": "Volume", ariaValueNow: 50 });
// @ts-expect-error - combobox requires aria-controls (has aria-expanded)
div({ role: "combobox", "aria-expanded": false, "aria-label": "City" });
// @ts-expect-error - heading requires aria-level
div({ role: "heading" });
div({ role: "heading", ariaLevel: 2 });
// Children callback overloads are checked too
// @ts-expect-error - switch requires aria-checked
div({ role: "switch" }, () => {});

// --- Roles: native semantics supply the attribute -------------------------------
input({ type: "checkbox", role: "switch" }); // checked state is native
input({ type: "range", role: "slider" }); // value is native, and <label for> names it

// --- Roles: author-named roles need a name ---------------------------------------
// @ts-expect-error - dialog role needs aria-label / aria-labelledby / title
div({ role: "dialog" });
div({ role: "dialog", "aria-labelledby": "dialog-title" });
div({ role: "dialog", ariaLabel: "Settings" });
div({ role: "img", title: "Chart of sales" });
// @ts-expect-error - img role needs a name
span({ role: "img" });
button("Menu", { role: "combobox", ariaExpanded: false, ariaControls: "list" }); // button is labelable via content

// --- Roles: non-literal roles can't be checked ------------------------------------
const asSwitch = $(Mut(false));
div({ role: $(() => (asSwitch.value ? "switch" : "checkbox")) });

test("aria type tests compile", () => {
  expect(true).toBe(true);
});
