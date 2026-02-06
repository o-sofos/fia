import { div, Each } from "../core/mod";

export default () => {
  const list = [1, 2, 3];
  Each(() => list, (i, idx) => div({ textContent: `${idx}: ${i}` }));
};
