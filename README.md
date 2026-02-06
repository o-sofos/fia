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
- **Vanilla JavaScript** - Use `if`, `forEach`, `map`, `filter`. No custom helpers.

## 🚀 Getting Started

### Installation

```typescript
// Import from JSR (Deno, Bun, Node with JSR support)
import { $, div, h1, button, p } from "jsr:@fia/core";
```

### Quick Start

```typescript
import { $, div, h1, button, p } from "jsr:@fia/core";

// Reactive store for state
const state = $({ count: 0 });

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => `Count: ${state.count}`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});
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

```typescript
const state = $({
  name: "Evan",
  age: 17,
});

// Direct property access - no .value needed!
state.age++;
state.name = "John";

// Deep reactivity
const nested = $({ user: { name: "Alice" } });
nested.user.name = "Bob";  // Triggers updates
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

#### 5. List Rendering
No special syntax needed—just use `forEach` to render lists. Plain JavaScript works everywhere.

```typescript
const items = ["Apple", "Banana", "Cherry"];
ul(() => {
  items.forEach(item => li({ textContent: item }));
});
```

---

### 🟡 Intermediate

#### 6. Reactive Store Counter
Objects passed to `$()` become reactive stores. Access properties directly without `.value`.

```typescript
const state = $({ count: 0 });

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
const formData = $({ email: "", password: "" });

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});
```

#### 9. Computed Values
Computed signals automatically track dependencies. When `state.price` or `state.quantity` changes, `total` updates.

```typescript
const state = $({ price: 100, quantity: 2 });
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
A complete todo app with add/remove functionality. Demonstrates reactive arrays and list manipulation.

```typescript
const todos = $({ items: [] as string[], input: "" });

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
    todos.items.forEach((item, i) => {
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
    p({ textContent: $(() => `Content for ${tabs[active.value]}`) });
  });
});
```

#### 13. Async Data Fetching
Handle async operations by updating store properties when data arrives. Use conditional rendering for loading states.

```typescript
const data = $({ loading: true, users: [] as string[] });

fetch("/api/users")
  .then(r => r.json())
  .then(users => { data.users = users; data.loading = false; });

div(() => {
  if (data.loading) {
    p({ textContent: "Loading..." });
  } else {
    ul(() => data.users.forEach(u => li({ textContent: u })));
  }
});
```

#### 14. Modal Dialog
Modal patterns with backdrop click-to-close. Use `stopPropagation()` to prevent closing when clicking inside.

```typescript
const modal = $({ open: false, title: "" });

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

#### 15. Reusable Component Pattern
Components are just functions that return elements. Pass props as arguments for reusability.

```typescript
function Card(title: string, content: string) {
  return div({ class: "card" }, () => {
    h3({ textContent: title });
    p({ textContent: content });
  });
}

function Button(text: string, onClick: () => void) {
  return button({ textContent: text, onclick: onClick, class: "btn" });
}

// Usage
div(() => {
  Card("Feature 1", "Description of feature 1");
  Card("Feature 2", "Description of feature 2");
  Button("Click Me", () => alert("Clicked!"));
});
```

---

## License

MIT

