import { div } from "../core/mod";

export default () => {
  div((el, onMount) => {
    el.style.height = "3000px";

    onMount(() => {
      console.log("Element height after mount:", el.offsetHeight);
    });
  });
};
