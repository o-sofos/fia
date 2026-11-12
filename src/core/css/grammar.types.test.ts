/**
 * Type tests for CSS value grammars (css/grammar.ts).
 * Checked by `bun run test:types`; the runtime test below only keeps bun happy.
 */
import { expect, test } from "bun:test";
import type { IsValidStyleValue } from "./grammar";
import { div } from "../elements/elements";
import { $, Mut } from "../reactivity/reactivity";

type Valid<K, V extends string> = IsValidStyleValue<K, V>;
/** Rejected = anything but exactly `true` (a union with a bad branch is `boolean`) */
type Rejected<T> = [T] extends [true] ? false : true;
function ok<T extends true>(): T | void {}
function bad<T extends true>(): T | void {}

// --- Grid tracks -------------------------------------------------------------
ok<Valid<"gridTemplateColumns", "repeat(3, 1fr)">>();
ok<Valid<"gridTemplateColumns", "repeat(auto-fill, minmax(200px, 1fr))">>();
ok<Valid<"gridTemplateColumns", "[full-start] minmax(1rem, 1fr) [content-start] minmax(0, 60ch) [content-end] minmax(1rem, 1fr) [full-end]">>();
ok<Valid<"gridTemplateColumns", "200px fit-content(40%) auto">>();
ok<Valid<"gridTemplateColumns", "calc(100% - 2rem) 1fr">>();
ok<Valid<"gridTemplateColumns", "subgrid [a] [b]">>();
ok<Valid<"gridTemplateRows", "none">>();
ok<Valid<"gridTemplateRows", "auto 1fr auto">>();
ok<Valid<"gridAutoRows", "minmax(100px, auto)">>();
bad<Rejected<Valid<"gridTemplateColumns", "repeat(3, 1fx)">>>();
bad<Rejected<Valid<"gridTemplateColumns", "repeat(three, 1fr)">>>();
bad<Rejected<Valid<"gridTemplateColumns", "repeat(3 1fr)">>>();
bad<Rejected<Valid<"gridTemplateColumns", "minmax(1fr, 200px)">>>(); // min can't be flexible
bad<Rejected<Valid<"gridTemplateColumns", "1fr 2fr)">>>();
bad<Rejected<Valid<"gridTemplateColumns", "100">>>(); // bare number
bad<Rejected<Valid<"gridTemplateColumns", "">>>();
bad<Rejected<Valid<"gridAutoRows", "[a] 1fr">>>(); // no line names in auto tracks

// --- Transitions -------------------------------------------------------------
ok<Valid<"transition", "opacity 200ms ease-out">>();
ok<Valid<"transition", "opacity 0.2s, transform 300ms cubic-bezier(0.2, 0, 0, 1) 50ms">>();
ok<Valid<"transition", "all 1s steps(4, jump-end)">>();
ok<Valid<"transition", "display 300ms allow-discrete">>();
ok<Valid<"transition", "--my-prop 1s linear(0, 0.25 75%, 1)">>();
ok<Valid<"transition", "-webkit-line-clamp 1s">>();
bad<Rejected<Valid<"transition", "opactiy 200ms">>>(); // misspelled property
bad<Rejected<Valid<"transition", "opacity 200">>>(); // time needs a unit
bad<Rejected<Valid<"transition", "opacity 1s 2s 3s">>>(); // at most two times
bad<Rejected<Valid<"transition", "opacity ease ease-in">>>(); // one easing
bad<Rejected<Valid<"transition", "opacity 1s,">>>(); // empty layer
ok<Valid<"transitionProperty", "opacity, background-color">>();
ok<Valid<"transitionProperty", "none">>();
bad<Rejected<Valid<"transitionProperty", "backgroundColor">>>(); // camelCase isn't CSS
ok<Valid<"transitionDuration", "150ms, 1.5s">>();
bad<Rejected<Valid<"transitionDuration", "150">>>();
ok<Valid<"transitionTimingFunction", "cubic-bezier(.4, 0, .2, 1)">>();
bad<Rejected<Valid<"transitionTimingFunction", "cubic-bezier(.4, 0, .2)">>>(); // needs 4
bad<Rejected<Valid<"transitionTimingFunction", "steps(2.5)">>>(); // integer steps
bad<Rejected<Valid<"transitionTimingFunction", "ease-in-quad">>>();

// --- Animations --------------------------------------------------------------
ok<Valid<"animation", "spin 1s linear infinite">>();
ok<Valid<"animation", "fade-in 300ms ease-out 100ms both, pulse 2s 3 alternate paused">>();
bad<Rejected<Valid<"animation", "spin 1s 2s 3s">>>();
bad<Rejected<Valid<"animation", "spin fade 1s">>>(); // two names
bad<Rejected<Valid<"animation", "spin 1s infinite infinite">>>();
ok<Valid<"animationName", "spin, none">>();
bad<Rejected<Valid<"animationName", "1spin">>>();
ok<Valid<"animationDuration", "auto">>();
ok<Valid<"animationDelay", "-200ms">>();

// --- Gradients & images ------------------------------------------------------
ok<Valid<"backgroundImage", "linear-gradient(red, blue)">>();
ok<Valid<"backgroundImage", "linear-gradient(to right bottom, #fff 0%, rgb(0 0 0 / 50%) 50% 75%, transparent)">>();
ok<Valid<"backgroundImage", "linear-gradient(45deg in oklch longer hue, red, blue)">>();
ok<Valid<"backgroundImage", "linear-gradient(in oklab, red, 30%, blue)">>(); // color hint
ok<Valid<"backgroundImage", "radial-gradient(circle at top left, var(--a), transparent 70%)">>();
ok<Valid<"backgroundImage", "radial-gradient(ellipse farthest-corner, red, blue)">>();
ok<Valid<"backgroundImage", "conic-gradient(from 90deg at 50% 50%, red, blue 0.5turn, red)">>();
ok<Valid<"backgroundImage", "repeating-linear-gradient(45deg, #000 0 10px, #fff 10px 20px)">>();
ok<Valid<"backgroundImage", "url(a.png), linear-gradient(red, blue)">>();
ok<Valid<"maskImage", "linear-gradient(black, transparent)">>();
bad<Rejected<Valid<"backgroundImage", "linear-gradient(to middle, red, blue)">>>();
bad<Rejected<Valid<"backgroundImage", "linear-gradient(to left right, red, blue)">>>();
bad<Rejected<Valid<"backgroundImage", "linear-gradient(red, bleu)">>>(); // misspelled color
bad<Rejected<Valid<"backgroundImage", "linear-gradient(#ggg, blue)">>>();
bad<Rejected<Valid<"backgroundImage", "linear-gradient(#12345, blue)">>>(); // 5 hex digits
bad<Rejected<Valid<"backgroundImage", "linear-gradient(to right)">>>(); // no stops
bad<Rejected<Valid<"backgroundImage", "linear-gradient(in hsv, red, blue)">>>();
bad<Rejected<Valid<"backgroundImage", "conic-gradient(red 10px, blue)">>>(); // conic stops are angles
bad<Rejected<Valid<"backgroundImage", "linear-gradient(red, blue">>>(); // unbalanced
bad<Rejected<Valid<"backgroundImage", "gradient(red, blue)">>>();

// --- Pass-through rules ------------------------------------------------------
ok<Valid<"gridTemplateColumns", string>>(); // widened: runtime data
ok<Valid<"transition", "inherit">>();
ok<Valid<"backgroundImage", "var(--hero)">>();
ok<Valid<"display", "anything">>(); // no grammar: declared type decides
bad<Rejected<Valid<"gridTemplateColumns", "1fr" | "2fx">>>(); // every union branch must parse

// --- End to end through element props ---------------------------------------
div({
  style: {
    gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
    transition: "opacity 150ms ease-out",
    backgroundImage: "linear-gradient(to bottom, white, transparent)",
  },
});
// @ts-expect-error - 1fx is not a track size
div({ style: { gridTemplateColumns: "repeat(3, 1fx)" } });
// @ts-expect-error - opactiy is not a CSS property
div({ style: { transition: "opactiy 200ms" } });
// @ts-expect-error - bleu is not a color
div({ style: { backgroundImage: "linear-gradient(red, bleu)" } });
// Signals carry widened types and pass through
div({ style: { gridTemplateColumns: $(Mut("1fr 1fr")) } });

test("grammar type tests compile", () => {
  expect(true).toBe(true);
});
