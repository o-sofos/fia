import { $, button, h1, h2, h3, h4, h5, h6, p } from "../core/mod";

export default (() => {
  const count = $(0);

  h1(count);
  h2(count);
  h3(count);
  h4(count);
  h5(count);
  h6(count);

  p($(() => "count: " + count.value));

  const onclick = () => count.value++

  button("increment", { onclick });
})();
