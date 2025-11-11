import { signal } from "./reactivity";
import {
  main,
  header,
  nav,
  a,
  button,
  section,
  div,
  h1,
  h2,
  h3,
  p,
  span,
  pre,
  code,
  footer,
} from "./element-html";
import * as css from "./css-html-props";
import * as a11y from "./accessibility";

// --- Code Snippets ---
const helloWorldCode = `
import { h1, p, div } from './elements';
import { color } from './css-properties';

const root = div();

root.append(
  h1()
    .style(color('blue'))
    .text('Hello World!')
);

root.append(
  p().text('This is Flick.')
);
`;

const counterCode = `
import { button, div } from './elements';
import { signal } from './reactivity';

const count = signal(0);
const root = div();

// The text node reactively updates
root.append(
  div().text(count)
);

root.append(
  button()
    .text('Click Me')
    .on('click', () => count.set(count() + 1))
);
`;

// --- Page Load Animation ---
// We'll fade the whole page in by controlling opacity with a signal.
const pageOpacity = signal(0);
const pageTransform = signal("translateY(20px)");

// Trigger animation once the worker loads the app
setTimeout(() => {
  pageOpacity.set(1);
  pageTransform.set("translateY(0)");
}, 100); // Small delay to ensure styles are applied

// --- App Container ---
main().style(
  css.fontFamily(
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  ),
  css.backgroundColor("#ffffff"),
  css.color("#222"),
  css.margin(0),
  css.padding(0),
  css.transition("opacity 0.6s ease-out, transform 0.6s ease-out"),
  // Bind styles directly to our signals for animation
  css.opacity(pageOpacity),
  css.transform(pageTransform)
);

// --- 1. Header & Navigation ---
header()
  .style(
    css.display("flex"),
    css.justifyContent("space-between"),
    css.alignItems("center"),
    css.padding("20px 40px"),
    css.maxWidth("1200px"),
    css.margin("0 auto")
  )
  .append(
    // Logo
    h2().style(css.margin(0), css.fontSize("24px")).text("Flick"),
    // Nav Links
    nav()
      .attr(a11y.ariaLabel("Main navigation"))
      .append(
        a().text("Docs").attr("href", "#"),
        a().text("Examples").attr("href", "#").style(css.marginLeft("20px")),
        a()
          .text("GitHub")
          .attr("href", "#")
          .style(
            css.marginLeft("20px"),
            css.border("1px solid #007bff"),
            css.padding("8px 16px"),
            css.borderRadius("6px"),
            css.textDecoration("none")
          )
      )
  );

// --- 2. Hero Section ---
section()
  .style(
    css.textAlign("center"),
    css.padding("80px 40px"),
    css.maxWidth("900px"),
    css.margin("0 auto")
  )
  .append(
    h1().style(css.fontSize("56px"), css.margin("0 0 20px 0")).text("Flick"),
    h2()
      .style(css.fontSize("32px"), css.fontWeight(400), css.color("#444"))
      .text("Native Speed. Declarative Fluency."),
    p()
      .style(
        css.fontSize("18px"),
        css.lineHeight(1.6),
        css.color("#555"),
        css.marginTop("30px")
      )
      .text(
        "Flick is a minimalist, high-performance architecture that runs your entire app in a Web Worker. No VDOM, no compiler, no jank—just relentlessly efficient reactivity."
      ),
    button()
      .text("Get Started")
      .style(
        css.fontSize("18px"),
        css.backgroundColor("#007bff"),
        css.color("white"),
        css.border("none"),
        css.padding("16px 32px"),
        css.borderRadius("8px"),
        css.cursor("pointer"),
        css.marginTop("30px")
      )
  );

// --- 3. Features Section ---
section()
  .attr(a11y.ariaLabel("Framework Features"))
  .style(
    css.display("grid"),
    css.gridTemplateColumns("repeat(auto-fit, minmax(280px, 1fr))"),
    css.gap("40px"),
    css.padding("60px 40px"),
    css.maxWidth("1200px"),
    css.margin("20px auto")
  )
  .append(
    // Reusable Feature Card Component
    createFeatureCard(
      "⚡",
      "Zero Jank Core",
      "The entire reactive core runs in a Web Worker, offloading 100% of state tracking and update logic from the main thread."
    ),
    createFeatureCard(
      "🔗",
      "Function-First API",
      "No VDOM. Just a chainable, function-first API (div(), .text(), .on()) that mutates the native DOM directly and immediately."
    ),
    createFeatureCard(
      "💡",
      "Fine-Grained Reactivity",
      "Powered by signals (signal()) and memoized derivations (memo()), updates are automatic, precise, and batched for O(1) performance."
    ),
    createFeatureCard(
      "🎨",
      "Typed & Tree-Shakable",
      "500+ typed CSS functions (color(), padding()) and a zero-config, 19.8 KB design built for full TypeScript inference."
    )
  );

// --- 4. "How it Works" Diagram Section ---
section()
  .attr(a11y.ariaLabel("Flick Architecture Diagram"))
  .style(
    css.textAlign("center"),
    css.padding("60px 40px"),
    css.backgroundColor("#f9f9f9")
  )
  .append(
    h2().style(css.fontSize("32px")).text("The Flick Difference"),
    p()
      .style(css.fontSize("18px"), css.color("#555"))
      .text("A clean separation of concerns."),
    // The Diagram
    div()
      .attr(a11y.role("group"))
      .style(
        css.display("flex"),
        css.justifyContent("center"),
        css.alignItems("center"),
        css.gap("30px"),
        css.marginTop("40px")
      )
      .append(
        // Main Thread Box
        div()
          .style(
            css.border("2px solid #007bff"),
            css.borderRadius("8px"),
            css.padding("20px 30px"),
            css.width("300px")
          )
          .append(
            h3().text("Main Thread"),
            p().text(
              "Handles *only* painting DOM updates and capturing raw user events. It does zero thinking."
            )
          ),
        // Arrow
        span()
          .attr(a11y.ariaHidden(true))
          .style(css.fontSize("24px"), css.fontWeight("bold"))
          .text("↔"),
        // Worker Thread Box
        div()
          .style(
            css.backgroundColor("#222"),
            css.color("white"),
            css.borderRadius("8px"),
            css.padding("20px 30px"),
            css.width("300px")
          )
          .append(
            h3().text("Flick Worker Core"),
            p().text(
              "Runs all your app logic, state, signals, and update scheduling. 100% sandboxed."
            )
          )
      )
  );

// --- 5. Code Example Section ---
section()
  .attr(a11y.ariaLabel("Code Examples"))
  .style(
    css.padding("80px 40px"),
    css.maxWidth("1200px"),
    css.margin("0 auto"),
    css.display("flex"),
    css.gap("40px")
  )
  .append(
    // Hello World
    div()
      .attr(a11y.ariaLabel("Hello World code example"))
      .style(css.flex("1"))
      .append(
        h3().style(css.fontSize("24px")).text("Simple, Chainable"),
        pre().append(code().text(helloWorldCode))
      ),
    // Reactive Counter
    div()
      .attr(a11y.ariaLabel("Reactive Counter code example"))
      .style(css.flex("1"))
      .append(
        h3().style(css.fontSize("24px")).text("Instantly Reactive"),
        pre().append(code().text(counterCode))
      )
  );

// --- 6. Final Mantra Section ---
section()
  .attr(a11y.ariaLabel("Framework Mantra"))
  .style(
    css.backgroundColor("#111"),
    css.color("#eee"),
    css.textAlign("center"),
    css.padding("80px 40px")
  )
  .append(
    h2()
      .style(
        css.fontSize("32px"),
        css.fontWeight(500),
        css.letterSpacing("1px")
      )
      .text("No JSX. No Compiler. No VDOM."),
    p()
      .style(css.fontSize("18px"), css.color("#aaa"), css.marginTop("10px"))
      .text(
        "Just German precision: clean, predictable, and relentlessly efficient."
      ),
    div()
      .style(
        css.marginTop("30px"),
        css.fontSize("16px"),
        css.color("#007bff"),
        css.fontWeight("bold")
      )
      .text("19.8 KB min+gzip")
  );

// --- 7. Footer ---
footer()
  .style(
    css.textAlign("center"),
    css.padding("40px"),
    css.color("#888"),
    css.fontSize("14px")
  )
  .text("© 2025 Flick Framework");

// --- Reusable Component (as a simple function) ---
function createFeatureCard(icon: string, title: string, description: string) {
  return div()
    .style(
      css.backgroundColor("#f9f9f9"),
      css.border("1px solid #eee"),
      css.padding("30px"),
      css.borderRadius("8px"),
      css.transition("transform 0.2s ease, box-shadow 0.2s ease")
    )
    .append(
      span().style(css.fontSize("40px")).text(icon),
      h3().style(css.fontSize("22px"), css.marginTop("20px")).text(title),
      p()
        .style(css.fontSize("16px"), css.lineHeight(1.6), css.color("#555"))
        .text(description)
    );
}
