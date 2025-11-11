# Flick

[![jsr:@flick/core](https://jsr.io/badges/@flick/core)](https://jsr.io/@flick/core)
[![jsr:@flick/core_v](https://jsr.io/badges/@flick/core/v)](https://jsr.io/@flick/core)

> **No JSX. No VDOM. No Jank.**
>
> Flick is a minimalist, worker-first framework for building relentlessly efficient user interfaces.

---

### Native Speed. Declarative Fluency.

**Flick** is engineered with a **minimalist, high-performance architecture** that runs entirely in a **Web Worker-backed reactive core**. It offloads all state tracking, dependency resolution, and update scheduling from the main thread—achieving **zero jank** even under heavy reactivity.

At its heart lies a **function-first, chainable DOM API** built directly on the native DOM, eliminating virtual DOM diffing and runtime overhead. Reactivity is powered by **fine-grained signals** (`signal<T>`) and implicit memoization.

This design delivers **native speed with declarative fluency**—a clean, predictable, and relentlessly efficient architecture.

## ⚡ Features

- **Zero-Jank Architecture:** 100% of app logic, state, and reactivity runs in a Web Worker, leaving the main thread free for 60fps scrolling and animations.
- **No VDOM, No JSX:** A simple, chainable API (`div()`, `.text()`, `.style()`) that mutates the native DOM directly via batched commands.
- **Fine-Grained Reactivity:** A "set and forget" signal-based system. When your signal updates, only the _exact_ DOM node that depends on it (e.g., a single text node) is updated.
- **O(1) Keyed List Updates:** Our `append()` method automatically performs keyed list reconciliation, ensuring minimal DOM operations for sorts, shuffles, or splices.
- **Secure by Default:** The worker sandbox and `textContent`-based rendering neutralize XSS attacks. All attributes are automatically sanitized.
- **Typed & Tree-Shakable:** A massive library of typed helpers for [CSS](https://jsr.io/@flick/core/css), [SVG](https://jsr.io/@flick/core/svg), and [ARIA](https://jsr.io/@flick/core/aria) provides full IDE autocomplete.
- **Ultra-Lightweight:** The core framework (renderer + worker) is **~2kB gzipped**, proving that high-performance doesn't mean high-cost.

## 🚀 Getting Started

Flick's architecture requires two entry points: a file for the **main thread** and a file for the **worker thread**.

### 1. `index.html` (Your Host File)

This is a standard HTML file. It just needs to load your `main.ts` file as a module.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flick App</title>
  </head>
  <body>
    <script type="module" src="/main.ts"></script>
  </body>
</html>
```

### 2. `main.ts` (Main Thread)

This file is your "dumb" renderer. Its only job is to load the Flick renderer and tell it where your worker file is.

```typescript
// Imports and runs the Flick main-thread renderer
import { renderer } from "jsr:@flick/core/renderer";

// This file only needs to do one thing:
// Create the worker that will run your *actual* app.
const worker = new Worker(new URL("./app.worker.ts", import.meta.url), {
  type: "module",
});

// Connect the renderer to the worker
renderer(worker);
```

(Flick's renderer automatically finds this worker and establishes communication).

### 3. `app.worker.ts` (Worker Thread & App Logic)

This is where your entire application lives. Import the Flick API and start building.

```typescript
// Imports and runs the Flick worker core
import "jsr:@flick/core/worker";

// Import the building blocks from Flick
import { signal } from "jsr:@flick/core";
import { div, h1, button } from "jsr:@flick/core/elements";
import { color, padding, cursor } from "jsr:@flick/core/css";

// 1. Create reactive state
const count = signal(0);

// 2. Build your UI
// Elements without a parent automatically append to the root
h1().style(color("blue")).text("Hello from Flick!");

div().text(count); // This text node is now bound to the signal

button()
  .text("Click Me")
  .style(padding(10, 20), cursor("pointer"))
  .on("click", () => {
    // 3. Update state. The UI updates automatically.
    count.set(count() + 1);
  });
```

## API Examples

Here are more advanced usage examples.

### Reactivity

Flick's reactivity is "implicitly memoized." You never need to use a memo() or useMemo(). Just pass a getter function, and Flick optimizes it automatically.

```typescript
import { signal } from "jsr:@flick/core";
import { div, input } from "jsr:@flick/core/elements";

const name = signal("World");
const greeting = () => `Hello, ${name()}!`; // A simple getter

// This text node will ONLY update when 'name' changes.
div().text(greeting);

input()
  .attr("value", name)
  .on("input", (e) => name.set(e.payload.value));
```

### Typed Styling & Attributes

```typescript
import { div } from "jsr:@flick/core/elements";
import {
  backgroundColor,
  borderRadius,
  boxShadow,
  padding,
} from "jsr:@flick/core/css";
import { ariaLabel } from "jsr:@flick/core/aria";

div()
  .style(
    backgroundColor("#f9f9f9"),
    borderRadius(8),
    padding("20px"),
    boxShadow("0 4px 12px rgba(0,0,0,0.1)")
  )
  .attr(ariaLabel("A styled, accessible container"))
  .text("I am a styled box.");
```

### Secure by Default

Flick's architecture neutralizes XSS threats at the source.

Attack Vector:

```typescript
const userInput = `<img src="x" onerror="alert('XSS!')">`;

// In other frameworks, this might be a vulnerability:
div().html(userInput); // 😱 Flick does not have an .html() method
```

Flick's Defense:

```typescript
// .text() uses 'textContent', which escapes all HTML.
// The attacker's script will NOT execute.
div().text(userInput);

// Output: <div>&lt;img src...&gt;</div>
```
