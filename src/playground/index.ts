import { debugContext, ul, li, div, h2 } from "../core/mod";

export default () => {
  h2("Fragment Batching Demo");

  debugContext();

  div(() => {
    ul(() => {
      // All 10 items are batched into one DOM insertion
      for (let i = 0; i < 10; i++) {
        li(`Item ${i + 1}`);
      }
    });
  });

  console.log("After fragment:");
  debugContext();
};
