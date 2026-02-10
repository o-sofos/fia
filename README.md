# Fia

> [!CAUTION]
> **🚧 Under Active Development** — API may change. Not recommended for production use yet.

[![jsr:@fia/core](https://jsr.io/badges/@fia/core)](https://jsr.io/@fia/core)
[![jsr:@fia/core_score](https://jsr.io/badges/@fia/core/score)](https://jsr.io/@fia/core)

> **No JSX. No VDOM. No Jank.**
>
> Fia is a lightweight framework for building reactive UIs with signals and plain functions.

---

## 🔭 Overview

Most frameworks add layers of abstraction between you and the DOM. Fia gives you just enough to be productive:

- ✨ **Reactive values** - `$()` creates signals for primitives, reactive stores for objects
- 🎯 **Direct DOM** - No virtual DOM, no diffing, just native browser APIs
- 📦 **~6KB gzipped** - Lightweight with zero dependencies
- 📘 **Fully typed** - Complete TypeScript support with autocomplete
- ⚡ **Event delegation** - Single listener per event type, automatic cleanup
- 🚀 **No build required** - Import from JSR and start building

## 🧠 Philosophy

- **Minimal abstraction** - `$()` for reactivity and functions for elements. That's it.
- **Zero dependencies** - No supply chain risk, no version conflicts, no surprises.
- **Vanilla JavaScript** - Use `if`, `forEach` for static logic. Use `Show`/`Each` only for reactive DOM updates.

## 📚 Table of Contents

- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Updating](#updating)
  - [Quick Start](#quick-start)
  - [Mounting](#mounting)
- [Element API](#-element-api)
- [Reactivity](#-reactivity)
  - [Signals](#primitives--signals)
  - [Stores](#objects--reactive-stores)
  - [Immutability](#-immutability)
- [Control Flow](#-control-flow)
- [Component Composition](#-component-composition)
- [SVG](#-svg)
- [Performance](#-performance)
- [Type System](#-type-system)
- [Examples](#-examples)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0+)
- Bun (v1.0.0+)
- Deno (v1.30.0+)

### Installation

Fia is published on JSR. Install it using your preferred package manager:

#### Deno

```bash
deno add jsr:@fia/core
```

#### Bun

1. Create/Update `.npmrc` with JSR registry:
   ```bash
   echo "@jsr:registry=https://npm.jsr.io" > .npmrc
   ```

2. Install (aliased as `fia`):
   ```bash
   bun add fia@npm:@jsr/fia__core
   ```

#### Node.js (npm, yarn, pnpm)

```bash
npx jsr add @fia/core
```

> **Note:** The `bun` command above automatically aliases the package to `fia`. For Node.js/Deno, mapping to `fia` in `package.json`/`deno.json` is recommended for cleaner imports.

### Updating

To update to the latest version, running the installation command again will fetch the latest version from JSR.

```bash
# Deno
deno add jsr:@fia/core

# Bun
bun add jsr:@fia/core

# Node.js
npx jsr add @fia/core
```

### Quick Start

```typescript
import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => `Count: ${state.count}`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});
```

### Mounting

By default, Fia elements append to `document.body` if no parent context exists. For Single Page Apps (SPAs), use the `mount` helper to attach to a root element:

```typescript
import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App
```

That's it. No build step, no configuration, no boilerplate.

---

## 📐 Element API

Fia elements have a **simple, consistent API**:

```typescript
el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children
```

### Text Content

Use the native `textContent` prop:

```typescript
// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => `Hello, ${name.value}!`) });
```

### Event Handlers

Event handlers are delegated automatically for performance:

```typescript
button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});
```

### Nesting Elements

Use a callback function to nest elements:

```typescript
div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
  
  div({ class: "actions" }, () => {
    button({ textContent: "Save" });
    button({ textContent: "Cancel" });
  });
});
```

### Void Elements

Elements like `input`, `img`, `br` only accept props:

```typescript
input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();
```

### onMount Callback

Access layout properties after the element is in the DOM:

```typescript
div((el, onMount) => {
  el.style.height = "100vh";
  
  onMount(() => {
    // Runs after mount - layout is computed
    console.log(el.offsetHeight);
  });
  
  p({ textContent: "Child" });  // Still batched
});
```

---

## 💡 Reactivity

### Primitives → Signals

```typescript
const count = $(0);
const name = $("World");

// Read/write with .value
console.log(count.value);  // 0
count.value++;
name.value = "Fia";
```

### Objects → Reactive Stores

Fia stores are **immutable by default**. You must explicitly opt-in to mutability for specific keys. This encourages predictable state updates.

```typescript
// 🔒 Immutable Store (Read-only)
const config = $({ theme: "dark", version: "1.0" });
// config.theme = "light"; // Error: Cannot assign to read-only property

// 🔓 Mutable Store (Opt-in)
const state = $({
  count: 0,
  name: "Evan"
}, "count", "name"); // Pass keys you want to be mutable

state.count++;      // ✅ Works
state.name = "John"; // ✅ Works
```

### Deep Reactivity

Objects directly nested in a store are deeply reactive, but also follow immutability rules. To update deep state, **replace the object** or use a mutable key for the nested store.

```typescript
const app = $({
  user: { name: "Alice", active: true }
}, "user");

// ❌ Error: user.name is read-only
// app.user.name = "Bob";

// ✅ Correct: Replace the nested object
app.user = { ...app.user, name: "Bob" };
```

> [!WARNING]
> **Destructuring breaks reactivity.** Always access properties directly:
> ```typescript
> const { age } = state;  // age is static, not reactive!
> state.age;              // ✅ This is reactive
> ```

### Computed Values

```typescript
const count = $(0);
const doubled = $(() => count.value * 2);

const state = $({ age: 17 });
const isAdult = $(() => state.age >= 18);
```

### Effects

Use `$e()` to run side effects when dependencies change:

```typescript
import { $e } from "fia";

const count = $(0);

// Runs whenever count changes
$e(() => {
  console.log("Count changed to:", count.value);
  document.title = `Count: ${count.value}`;
});
```

---

## 🔒 Immutability

Fia embraces an **Immutable-by-Default** philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles to reduce bugs.

### Why Immutability?

1.  **Predictability**: State changes are explicit. You know exactly where and when state is modified.
2.  **Type Safety**: TypeScript prevents accidental mutations of read-only properties.
3.  **Deep Reactivity**: Replacing nested objects triggers updates reliably without expensive deep proxy trapping for every property access.

### Working with Immutable State

When a store is immutable, you update state by **replacing** objects, not mutating properties. This is similar to React's `useState` or Redux.

```typescript
const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable (can be replaced), but user.score is readonly

// ❌ Error: user.score is read-only
// state.user.score++;

// ✅ Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };
```

### Opt-in Mutability

For scenarios where granular mutation is preferred (e.g., forms, high-performance counters), you can opt-in to mutability for specific keys.

```typescript
const state = $({ count: 0 }, "count");
state.count++; // Mutable because "count" was explicitly allowed
```

### Internal Proxies

Fia uses `Proxy` internally to make state reactive. When you access a property on a `ReactiveStore`, you are interacting with a proxy that tracks dependencies.

-   **Lazy Wrapping**: Deeply nested objects are only wrapped in proxies when you access them. This ensures initiailiztion is fast and memory efficient.
-   **Identity Stability**: Accessing the same object multiple times returns the same proxy instance (via a `WeakMap` cache), ensuring strict equality `===` works as expected.
-   **Unwrapping**: You can always get the raw object back using the special read-only property `state.$raw`, which is useful for debugging or passing data to 3rd party libraries.

---

## 🔀 Control Flow

Fia provides reactive control flow components for conditional rendering and lists.

### Show

Conditionally render content that updates when the condition changes:

```typescript
import { Show } from "fia";

// Simple usage
Show(() => isVisible.value, () => div({ textContent: "Hello!" }));

// With else branch
Show(() => data.loading, {
  then: () => p({ textContent: "Loading..." }),
  else: () => ul(() => items.forEach(i => li({ textContent: i }))),
});
```

### Each

Reactive list rendering that re-renders when the source array changes:

```typescript
import { Each } from "fia";

const todos = $({ items: ["Task 1", "Task 2"] });

Each(() => todos.items, (item, index) => {
  li({ textContent: `${index + 1}. ${item}` });
});
```

> Use `Show` and `Each` instead of plain `if`/`forEach` when you need the content to **react to state changes**.

### Match

Reactive pattern matching for strict switch/case logic or simple routing:

```typescript
import { Match } from "fia";

const status = $("loading");

Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  error: () => p({ textContent: "Error loading data" }),
  _: () => p({ textContent: "Unknown state" }), // Default case
});
```

### Derived Values with Match

`Match` returns a signal, so you can use it directly in properties:

```typescript
const status = $(10);

p({
  // Returns Signal<string | undefined>
  textContent: Match(() => status.value, {
    10: () => "Perfect Score!",
    0: () => "Maybe next time...",
    _: () => `Score: ${status.value}`
  })
});
```

---

## 🧩 Component Composition

In Fia, **components are just functions**. There is no special "Component" class or type.

### Basic Component

A component is a function that returns or creates elements.

```typescript
function Button(props: { text: string; onClick: () => void }) {
  // Return the element (optional, but good for testing)
  return button({
    textContent: props.text,
    onclick: props.onClick,
    class: "btn-primary"
  });
}

// Usage
div(() => {
  Button({ text: "Click Me", onClick: () => alert("Hi") });
});
```

### Children & Layouts

To create wrapper components (like layouts or cards), pass a callback function as a child prop (usually the last argument or a named prop).

```typescript
// 1. Define the component
function Card(props: { title: string }, children: () => void) {
  return div({ class: "card" }, () => {
    div({ class: "card-header", textContent: props.title });
    div({ class: "card-body" }, () => {
      // 2. Render children where you want them
      children();
    });
  });
}

// 3. Use it with nesting
div(() => {
  Card({ title: "My Profile" }, () => {
    p({ textContent: "User details go here..." });
    button({ textContent: "Edit" });
  });
});
```

### Best Practice: Return the Element

Always return the root element from your component functions. This allows consumers to capture references if needed.

```typescript
function InputField(props: { label: string }) {
  // Return the wrapper div
  return div({ class: "field" }, () => {
    label({ textContent: props.label });
    input({});
  });
}

const el = InputField({ label: "Name" }); // HTMLDivElement
```

### Advanced: Factories & Currying

Since components are just functions, you can use standard functional patterns like partial application to create specialized components.

```typescript
// A factory function that returns a component
const createButton = (className: string) => (text: string) => {
  return button({ class: className, textContent: text });
};

// Curried components
const PrimaryBtn = createButton("btn-primary");
const DangerBtn = createButton("btn-danger");

// Usage
div(() => {
  PrimaryBtn("Save");   // <button class="btn-primary">Save</button>
  DangerBtn("Delete");  // <button class="btn-danger">Delete</button>
});
```

### Signals as Monads

If you're coming from functional programming: **Signals are Monads**.

- **Unit**: `$(value)` wraps a value.
- **Bind/Map**: `$(() => ...)` transforms values relationally.

You don't need explicit `flatMap`. Just access the signal value!

```typescript
const userId = $(1);
const user = $(() => fetchUser(userId.value)); // Signal<User>
const name = $(() => user.value?.name);        // Signal<string | undefined>

// If userId changes -> user updates -> name updates.
// Automatic dependency flattening!
```

---

## 🖼️ SVG

Fia supports SVG elements with full type safety. Import them from the main package (prefixed, e.g., `svgCircle`) or the sub-module.

```typescript
import { svg, svgCircle } from "fia";

svg({ width: 100, height: 100, viewBox: "0 0 100 100" }, () => {
  svgCircle({
    cx: 50,
    cy: 50,
    r: 40,
    stroke: "black",
    "stroke-width": 3,
    fill: "red"
  });
});
```

> **Note**: SVG elements are in a separate namespace (`http://www.w3.org/2000/svg`) and are created correctly by these factories.

---

## ⚡ Performance

### Event Delegation

Fia uses a single delegated listener per event type instead of per-element listeners:

```
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>
```

This means 100 buttons = 1 click listener, not 100.

### Automatic Fragment Batching

Children are collected in a `DocumentFragment` before DOM insertion:

```typescript
div(() => {
  // All 3 elements batch into one DOM operation
  h1({ textContent: "Title" });
  p({ textContent: "Paragraph 1" });
  p({ textContent: "Paragraph 2" });
});
```

---

## 🛡️ Type System

### Strict CSS Typing

```typescript
div({
  style: {
    display: "flex",      // Autocomplete for values
    justifyContent: "center",
    gap: "1rem",
  }
});
```

### Event Type Inference

```typescript
input({
  oninput: (e) => {
    // e.currentTarget is HTMLInputElement
    console.log(e.currentTarget.value);
  }
});
```

---

## 📖 Examples

### 🟢 Beginner

#### 1. Hello World
The simplest possible Fia code. Elements are just functions—call them with props to create DOM nodes.

```typescript
h1({ textContent: "Hello, World!" });
```

#### 2. Counter
Signals hold reactive state. Pass a signal as `textContent` and it updates automatically when the value changes.

```typescript
const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });
```

#### 3. Toggle
Computed signals (`$(() => ...)`) derive values from other signals. Here we toggle visibility using a reactive `display` style.

```typescript
const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});
```

#### 4. Input Binding
Two-way binding is manual but explicit. Use `oninput` to update the signal from user input.

```typescript
const name = $("");
input({ type: "text", oninput: (e) => name.value = e.currentTarget.value });
p({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });
```

#### 5. List Rendering (Static)
For static lists, plain `forEach` works fine:

```typescript
const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));
```

For **reactive lists** that update when data changes, use `Each`:

```typescript
const items = $({ list: ["Apple", "Banana"] });
ul(() => Each(() => items.list, item => li({ textContent: item })));
```

---

### 🟡 Intermediate

#### 6. Reactive Store Counter
Objects passed to `$()` become reactive stores. Access properties directly without `.value`.

```typescript
const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => `Count: ${state.count}`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});
```

#### 7. Conditional Classes
Computed signals work anywhere—including the `class` prop. Return different class strings based on state.

```typescript
const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});
```

#### 8. Form Handling
Reactive stores are perfect for forms. Each field maps to a store property with live updates.

```typescript
const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});
```

#### 9. Computed Values
Computed signals automatically track dependencies. When `state.price` or `state.quantity` changes, `total` updates.

```typescript
const state = $({ price: 100, quantity: 2 }, "quantity");
const total = $(() => state.price * state.quantity);

div(() => {
  p({ textContent: $(() => `Price: $${state.price}`) });
  p({ textContent: $(() => `Qty: ${state.quantity}`) });
  p({ textContent: $(() => `Total: $${total.value}`) });
  button({ textContent: "Add", onclick: () => state.quantity++ });
});
```

#### 10. Dynamic Styling
Individual style properties can be reactive. Toggle entire themes by switching computed values.

```typescript
const theme = $("light");

div({
  style: {
    background: $(() => theme.value === "dark" ? "#222" : "#fff"),
    color: $(() => theme.value === "dark" ? "#fff" : "#222"),
    padding: "2rem",
  }
}, () => {
  button({ textContent: "Toggle Theme", onclick: () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }});
});
```

---

### 🔴 Advanced

#### 11. Todo App
A complete todo app using `Each` for reactive list rendering.

```typescript
const todos = $({ items: [] as string[], input: "" }, "items", "input");

div(() => {
  input({
    type: "text",
    value: $(() => todos.input),
    oninput: (e) => todos.input = e.currentTarget.value,
  });
  button({
    textContent: "Add",
    onclick: () => {
      if (todos.input.trim()) {
        todos.items = [...todos.items, todos.input];
        todos.input = "";
      }
    },
  });
  ul(() => {
    Each(() => todos.items, (item, i) => {
      li(() => {
        span({ textContent: item });
        button({
          textContent: "×",
          onclick: () => todos.items = todos.items.filter((_, j) => j !== i),
        });
      });
    });
  });
});
```

#### 12. Tabs Component
UI patterns like tabs are natural to implement. Track active index and conditionally apply classes.

```typescript
const tabs = ["Home", "About", "Contact"];
const active = $(0);

div(() => {
  div({ class: "tabs" }, () => {
    tabs.forEach((tab, i) => {
      button({
        textContent: tab,
        class: $(() => active.value === i ? "active" : ""),
        onclick: () => active.value = i,
      });
    });
  });
  div({ class: "content" }, () => {
  div({ class: "content" }, () => {
    // Match returns a signal, so we can use it directly in textContent!
    p({
      textContent: Match(() => active.value, {
        0: () => "Welcome to the Home page!",
        1: () => "About Fia Framework...",
        2: () => "Contact us at hello@fia.dev",
      })
    });
  });
});
});
```

#### 13. Async Data Fetching
Use `Show` for reactive loading states that update when data arrives.

```typescript
const state = $({
  status: "loading" as "loading" | "success" | "error",
  users: [] as string[]
}, "status", "users");

fetch("/api/users")
  .then(r => r.json())
  .then(users => {
    state.users = users;
    state.status = "success";
  })
  .catch(() => state.status = "error");

div(() => {
  Match(() => state.status, {
    loading: () => p({ textContent: "Loading..." }),
    error: () => p({ textContent: "Failed to load users" }),
    success: () => ul(() => Each(() => state.users, u => li({ textContent: u }))),
  });
});
```

#### 14. Modal Dialog
Modal patterns with backdrop click-to-close. Use explicit types to avoid literal type inference.

```typescript
const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

function openModal(title: string) {
  modal.title = title;
  modal.open = true;
}

button({ textContent: "Open Modal", onclick: () => openModal("Hello!") });

div({
  class: "modal-backdrop",
  style: { display: $(() => modal.open ? "flex" : "none") },
  onclick: () => modal.open = false,
}, () => {
  div({
    class: "modal",
    onclick: (e) => e.stopPropagation(),
  }, () => {
    h2({ textContent: $(() => modal.title) });
    button({ textContent: "Close", onclick: () => modal.open = false });
  });
});
```



---

## License

MIT

