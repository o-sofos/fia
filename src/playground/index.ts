import { div, h1, button, $, p } from "../core/mod";

export default () => {
  // Object state → ReactiveStore (direct property access, no .value needed!)
  const state = $({
    name: "Evan",
    age: 17,
  });

  // Computed/derived value from store
  const isAdult = $(() => state.age >= 18);

  div(() => {
    h1($(() => state.name));
    h1($(() => `Age: ${state.age}`));

    button('+', {
      onclick: () => state.age++,  // Direct mutation!
    });

    button('-', {
      onclick: () => state.age--,
    });

    // Computed updates automatically when state.age changes
    p($(() => isAdult.value ? "Adult" : "Minor"));
  });
};
