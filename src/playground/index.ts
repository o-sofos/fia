import {
  $,
  button,
  $e,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  input,
  p,
  span,
} from "../core/mod";

export default (() => {
  const count = $(0);

  h1(count);
  h2(count);
  h3(count);
  h4(count);
  h5(count);
  h6(count);

  p($(() => "count: " + count.value));

  const onclick = () => count.value++;

  button(
    $(() => `count: ${count.value}`),
    { id: "increment-button", onclick },
    (btn) => {
      if (btn.id === "increment-button") {
        span("Click me to increment count");
      }
    },
  );

  input({ type: "tel", placeholder: $(() => `Count: ${count.value}`) });

  $e(() => {
    console.log(count.value);
  });
})();
