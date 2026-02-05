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
    h1({ textContent: $(() => state.name) });
    h1({ textContent: $(() => `Age: ${state.age}`) });

    button({
      textContent: "+ 1",
      onclick: () => state.age++,
    });

    button({
      textContent: "- 1",
      onclick: () => state.age--,
    });

    // Computed updates automatically when state.age changes
    p({ textContent: $(() => isAdult() ? "Adult" : "Minor") });
  });
};
