import { width } from "happy-dom/lib/PropertySymbol";
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
  div,
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

  const r = $(0);
  const g = $(0);
  const b = $(0);
  const rgbString = $(() => `rgb(${r.value}, ${g.value}, ${b.value})`);

  div({ width: "", height: "50px", backgroundColor: rgbString });

  let banana = false;
  let props;

  if (banana) {
    props = {
      id: "banana-button",
      onclick,
    };
  } else {
    props = {
      id: "increment-button",
      onclick,
    };
  }

  button(
    $(() => `count: ${count.value}`),
    props,
    (btn) => {
      if (btn.id === "increment-button") {
        span("Click me to increment count");
      }
    },
  );

  input({
    type: "tel",
    placeholder: $(() => `Count: ${count.value}`),
  });

  $e(() => {
    console.log(count.value);
  });
})();
