import { $, $e, button, p } from "fia";

export default () => {
  const count = $(0);
  const threshold = $(10);

  $e(() => {
    // Only subscribes to count, not threshold
    if (count.value > threshold.peek()) {
      console.log("Threshold exceeded!");
    }
  });

  p($(() => `Count: ${count.value}`));
  p($(() => `Threshold: ${threshold.value}`));

  button("Increment Count", () => {
    count.value += 1;
  });

  button("Increment Threshold", () => {
    threshold.value += 1;
  });
};
