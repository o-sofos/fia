import { $, button, div } from "../core/mod";

export default (() => {

  const style = $<{ color: "red" | "blue" }>({
    color: "red",
  });

  button('update color', {
    onclick: () => {
      style.value = { ...style.value, color: style.value.color === "red" ? "blue" : "red" };
    }
  });

  div("hey bro", { style });

})();
