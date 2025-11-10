import {
  cursor,
  fontFamily,
  fontSize,
  margin,
  marginTop,
  padding,
  textAlign,
} from "./css-html-props";
import { div, h1, p, button } from "./element-html";
import { signal } from "./reactivity";

const count = signal(0);

const container = div()
  .style(fontFamily("sans-serif"), textAlign("center"), marginTop("50px"))
  .appendTo("root");

h1().text("Hello from Flick!").appendTo(container);

p().text("This entire UI is running in a Web Worker.").appendTo(container);

div().style(margin("20px"), fontSize("2rem")).text(count).appendTo(container);

button()
  .text("Click Me")
  .style(fontSize("1rem"), padding("10px 20px"), cursor("pointer"))
  .on("click", () => {
    // This handler runs in the WORKER!
    console.log("Worker: Click event received!");
    count.set(count() + 1);
  })
  .appendTo(container);
