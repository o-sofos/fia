import { div, h1, p, button } from "./element-html";
import { signal } from "./reactivity";

const count = signal(0);

const container = div()
  .style("fontFamily", "sans-serif")
  .style("textAlign", "center")
  .style("marginTop", "50px")
  .appendTo("root");

h1().text("Hello from Flick!").appendTo(container);

p().text("This entire UI is running in a Web Worker.").appendTo(container);

div()
  .style("fontSize", "2rem")
  .style("margin", "20px")
  .text(count) // <-- Pass the signal directly!
  .appendTo(container);

button()
  .text("Click Me")
  .style("fontSize", "1rem")
  .style("padding", "10px 20px")
  .style("cursor", "pointer")
  .on("click", () => {
    // This handler runs in the WORKER!
    console.log("Worker: Click event received!");
    count.set(count() + 1);
  })
  .appendTo(container);
