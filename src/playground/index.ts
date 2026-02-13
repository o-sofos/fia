import { $, button, h1, p, Show } from "fia";

export default () => {
  const count = $(0);

  Show(
    () => count.value > 0,
    () => {
      p({
        textContent: $(() => `The count is ${count.value}`),
        style: {
          color: $(() =>
            count.value > 0 ? "green" : count.value < 0 ? "red" : "black",
          ),
        },
      });
    },
  );

  h1($(() => `Count: ${count.value}`));
  button("+", () => count.value++);
  button("-", () => count.value--);
};
