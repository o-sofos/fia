import { div } from "../core/mod";

export default (() => {
  div("Correct ARIA", {
    role: "alert",
    ariaLive: "assertive",
    ariaHidden: true
  });
})();
