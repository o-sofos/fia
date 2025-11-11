// === src/SvgApp.ts (FIXED) ===
import { signal } from "./reactivity";

// Import CSS functions for actual CSS
import {
  fontFamily,
  textAlign,
  marginTop,
  border,
  backgroundColor,
} from "./css-html-props";
import { div, p } from "./element-html";
import { svg, circle, rect, text, line } from "./element-svg";
import { fill, fontSize, stroke, strokeWidth } from "./css-svg-props";

console.log("SvgApp started in Worker");

// --- Reactive State ---
const mouseX = signal(0);
const mouseY = signal(0);
const circleRadius = signal(50);
const rectColor = signal("blue");

// --- UI Layout (HTML Container) ---
const appContainer = div()
  .style(fontFamily("sans-serif"), textAlign("center"), marginTop("20px"))
  .appendTo("root");

// --- SVG Container ---
const svgCanvas = svg()
  // Use .attr() for SVG attributes
  .attr("width", "80%")
  .attr("height", "400px")
  // Use .style() for CSS properties
  .style(border("2px solid #ccc"), backgroundColor("#f9f9f9"))
  .on("mousemove", (e: MouseEvent) => {
    // We need to get the mouse position *relative* to the SVG
    // Our serializeEvent doesn't do this yet, but clientX/Y
    // will work for a full-screen demo.
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  })
  .on("click", () => {
    rectColor.set(rectColor() === "blue" ? "green" : "blue");
  })
  .appendTo(appContainer);

// --- Dynamic Circle ---
circle()
  .attr("cx", mouseX) // Reactively follow mouse X
  .attr("cy", mouseY) // Reactively follow mouse Y
  .attr("r", circleRadius)
  .attr(fill("red"), stroke("black"), strokeWidth(2))
  .on("click", () => {
    // This click won't register if it's behind the text
    circleRadius.set(circleRadius() > 20 ? circleRadius() - 10 : 50);
  })
  .appendTo(svgCanvas);

// --- Reactive Rectangle ---
rect()
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 100)
  .attr(fill(rectColor))
  .appendTo(svgCanvas);

// --- Dynamic Text ---
text()
  .attr("x", 20)
  .attr("y", 30)
  .attr(fill("darkslategray"), fontSize("20px"))
  .text(() => `Mouse: (${mouseX()}, ${mouseY()})`)
  .appendTo(svgCanvas);

// --- Static Line ---
line()
  .attr("x1", 0)
  .attr("y1", 400)
  .attr("x2", 800)
  .attr("y2", 0)
  .attr(stroke("gray"), strokeWidth(2))
  .appendTo(svgCanvas);

p()
  .text(
    "Move your mouse over the SVG. Click to change rectangle color. Click the red circle to shrink it."
  )
  .appendTo(appContainer);
