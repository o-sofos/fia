// === src/SvgApp.ts (NEW FILE) ===
import { signal } from "./reactivity";
import { div, p } from "./element-html";
import { svg, circle, rect, text, line } from "./element-svg";

console.log("SvgApp started in Worker");

// --- Reactive State ---
const mouseX = signal(0);
const mouseY = signal(0);
const circleRadius = signal(50);
const rectColor = signal("blue");

// --- UI Layout (HTML Container) ---
const appContainer = div()
  .style("fontFamily", "sans-serif")
  .style("textAlign", "center")
  .style("marginTop", "20px")
  .appendTo("root");

// --- SVG Container ---
const svgCanvas = svg()
  .style("width", "80%")
  .style("height", "400px")
  .style("border", "2px solid #ccc")
  .style("backgroundColor", "#f9f9f9")
  // We'll add mouse move listener to the SVG itself
  .on("mousemove", (e: MouseEvent) => {
    // e.payload will have clientX, clientY from serializeEvent
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  })
  .on("click", () => {
    // Toggle rect color on click anywhere on SVG
    rectColor.set(rectColor() === "blue" ? "green" : "blue");
  })
  .appendTo(appContainer);

// --- Dynamic Circle ---
circle()
  .style("cx", mouseX) // Reactively follow mouse X
  .style("cy", mouseY) // Reactively follow mouse Y
  .style("r", circleRadius)
  .style("fill", "red")
  .style("stroke", "black")
  .style("strokeWidth", "22") // SVG properties work with .style
  .on("click", () => {
    // Make circle smaller on its own click
    circleRadius.set(circleRadius() > 20 ? circleRadius() - 10 : 50);
  })
  .appendTo(svgCanvas);

// --- Reactive Rectangle ---
rect()
  .style("x", 50)
  .style("y", 50)
  .style("width", 100)
  .style("height", 100)
  .style("fill", rectColor) // Reactively change color
  .appendTo(svgCanvas);

// --- Dynamic Text ---
text()
  .style("x", 20)
  .style("y", 30)
  .style("fontSize", "20px")
  .style("fill", "darkslategray")
  .text(() => `Mouse: (${mouseX()}, ${mouseY()})`) // <-- Just pass the function
  .appendTo(svgCanvas);

// --- Static Line ---
line()
  .style("x1", 0)
  .style("y1", 400)
  .style("x2", 800)
  .style("y2", 0)
  .style("stroke", "gray")
  .style("strokeWidth", "2")
  .appendTo(svgCanvas);

// Add a simple instruction
p()
  .text(
    "Move your mouse over the SVG. Click to change rectangle color. Click the red circle to shrink it."
  )
  .appendTo(appContainer);
