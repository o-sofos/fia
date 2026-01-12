# Flick

[![jsr:@flick/core](https://jsr.io/badges/@flick/core)](https://jsr.io/@flick/core)
[![jsr:@flick/core_score](https://jsr.io/badges/@flick/core/score)](https://jsr.io/@flick/core)

> **No JSX. No VDOM. No Jank.**
>
> Flick is a 2KB framework for building reactive UIs with signals and plain functions.

---

## 🔭 Overview

### Native Speed. Declarative Fluency.

Most frameworks add layers of abstraction between you and the DOM. Flick gives you just enough to be productive:

- ✨ **Reactive values** - `$()` creates values that automatically update the UI
- 🎯 **Direct DOM** - No virtual DOM, no diffing, just native browser APIs
- 📦 **2KB total** - Smaller than the frameworks claiming to be minimal
- 🔒 **Zero dependencies** - No supply chain risks, no version conflicts
- 📘 **Fully typed** - Complete TypeScript support with autocomplete
- 🚀 **No build required** - Import from JSR and start building

## 🧠 Philosophy

Flick is built on three principles:

* **Minimal abstraction** - We give you `$()` for reactivity and functions for elements. That's it.
* **Zero dependencies** - No supply chain risk, no version conflicts, no surprises.
* **Vanilla JavaScript** - Use `if`, `forEach`, `map`, `filter`. No custom control flow helpers.

## 🚀 Getting Started

### Installation

```typescript
// Import from JSR (Deno, Bun, Node with JSR support)
import { $ } from "jsr:@flick/core";
```

### Quick Start

```typescript
import { $, div, h1, button, p } from "jsr:@flick/core";

const count = $(0);

div({ class: "app" }, () => {
  h1("Counter App");
  p("Count: ", count);
  button("Increment", { onclick: () => count.value++ });
  button("Decrement", { onclick: () => count.value-- });
});
```

That's it. No build step, no configuration, no boilerplate.

---

## 📐 Element Signatures

Flick elements follow a **Unified API** with 8 consistent overloads. Every element function accepts consistent combinations of `Content`, `Props`, and `Children`.

### The 8 Overloads

1. **Empty**: `div()`
2. **Content**: `div("Hello")` or `div(count)`
3. **Props**: `div({ class: "box" })`
4. **Children**: `div(() => { ... })`
5. **Props + Children**: `div({ class: "box" }, () => { ... })`
6. **Content + Props**: `button("Save", { class: "primary" })`
7. **Content + Children**: `div("Header", () => { ... })`
8. **All Three**: `div("Title", { id: "main" }, () => { ... })`

**Note**: "Content" can be a string, number, or Signal. "Children" is always a callback function `(el) => void`.

### Void Elements

Elements like `input`, `img`, `br`, `hr` cannot have children. They only accept optional properties:

```typescript
input({ type: "text", placeholder: "Name" });
br();
```

### The Golden Rule: Function Children for Nesting

**Always use `() => { ... }` to nest elements inside a parent.**

```typescript
// ✅ CORRECT - Function establishes parent context
div({ class: "parent" }, () => {
  h1("Title");
  p("Paragraph");
});

// ❌ WRONG - Elements mount BEFORE div processes them
div({ class: "parent" }, h1("Title"), p("Paragraph"));
```

### Signature Examples

#### 1. Props + Function Child
The most common pattern for container elements:

```typescript
div({ class: "card", id: "user-card" }, () => {
  h1("User Profile");
  p("Welcome back!");
});
```

#### 2. Content + Props
Perfect for leaf elements like buttons and labels:

```typescript
button("Submit", { 
  class: "btn-primary", 
  onclick: () => submitForm() 
});

label("Email:", { for: "email" });
```

#### 3. Reactive Content
Pass a signal directly as content:

```typescript
const count = $(0);
p(count); // Updates text automatically
h1("Count: ", count); // "Count: 0"
```

### Complete Pattern Reference

| Pattern | Example | Use Case |
|---------|---------|----------|
| `div(() => {...})` | `div(() => { h1(); })` | Nesting elements |
| `div({ props })` | `div({ class: "box" })` | Props only |
| `div({ props }, () => {...})` | `div({ id: "app" }, () => {...})` | Props + nested children |
| `div("text")` | `p("Hello")` | Simple text content |
| `div(signal)` | `span(count)` | Reactive text |
| `button("text", { props })` | `button("Go", { onclick: ... })` | Content + props (Standard) |
| `input({ props })` | `input({ type: "email" })` | Void elements |

### What NOT to Do

```typescript
// ❌ Passing element results as children - they mount immediately!
div(h1("Title"), p("Text"));

// ❌ Children for void elements
input({ type: "text" }, "some text");
img({ src: "..." }, () => { span("caption"); });

// ❌ Forgetting the function wrapper for nesting
ul(
  li("Item 1"),  // These mount to body, not ul!
  li("Item 2")
);

// ✅ Correct way
ul(() => {
  li("Item 1");
  li("Item 2");
});
```

---

## 💡 Core Concepts

### Reactive Values

Use `$()` to create values that automatically update the UI when they change.

```typescript
import { $ } from "jsr:@flick/core";

// Create reactive values
const name = $("World");
const count = $(0);
const isActive = $(false);

// Read with .value
console.log(name.value); // "World"

// Write with .value
name.value = "Flick";
count.value++;
isActive.value = !isActive.value;
```

### Computed Values

Reactive values can derive from other reactive values:

```typescript
const count = $(0);
const doubled = $(() => count.value * 2);

console.log(doubled.value); // 0
count.value = 5;
console.log(doubled.value); // 10
```

### Context-Based Mounting

Elements automatically append to their parent context:

```typescript
div(() => {
  h1("Title");           // Appends to div
  p("Paragraph 1");      // Appends to div
  
  section(() => {
    p("Nested");         // Appends to section
  });
});
```

### Reactive Props

Any prop can accept a signal for automatic updates:

```typescript
const isDisabled = $(false);
const theme = $("light");

button({
  disabled: isDisabled,  // Updates when signal changes
  class: theme,          // Updates when signal changes
  onclick: () => isDisabled.value = true
}, "Submit");
```

---

## 📦 Examples

### Todo App

```typescript
import { $, div, h1, input, button, ul, li } from "jsr:@flick/core";

const todos = $(["Buy milk", "Walk dog"]);
const newTodo = $("");

div({ class: "todo-app" }, () => {
  h1("Todo List");
  
  div({ class: "input-row" }, () => {
    input({
      type: "text",
      value: newTodo,
      placeholder: "What needs to be done?"
    });
    
    button("Add", {
      onclick: () => {
        if (newTodo.value.trim()) {
          todos.value = [...todos.value, newTodo.value];
          newTodo.value = "";
        }
      }
    });
  });
  
  ul(() => {
    todos.value.forEach((todo, i) => {
      li(todo, {
        onclick: () => {
          todos.value = todos.value.filter((_, j) => j !== i);
        }
      });
    });
  });
});
```

### Counter with Computed Values

```typescript
import { $, div, p, button } from "jsr:@flick/core";

const count = $(0);
const doubled = $(() => count.value * 2);
const isEven = $(() => count.value % 2 === 0);

div(() => {
  p("Count: ", count);
  p("Doubled: ", doubled);
  p("Even: ", $(() => isEven.value ? "Yes" : "No"));
  
  button("++", { onclick: () => count.value++ });
  button("--", { onclick: () => count.value-- });
  button("Reset", { onclick: () => count.value = 0 });
});
```

### Conditional Rendering

```typescript
const showDetails = $(false);

div(() => {
  button(
    $(() => showDetails.value ? "Hide" : "Show"),
    { onclick: () => showDetails.value = !showDetails.value }
  );
  
  // Conditional content inside function child
  if (showDetails.value) {
    div(() => {
      p("Here are the details!");
      p("More information...");
    });
  }
});
```

### Dynamic Lists

```typescript
const items = $(["Apple", "Banana", "Cherry"]);

div(() => {
    button("Add", {
      onclick: () => {
        items.value = [...items.value, `Item ${items.value.length + 1}`];
      }
    });
  
  ul(() => {
    items.value.forEach((item, i) => {
      li(`${i + 1}. ${item}`);
    });
  });
});
```

---

## 📚 API Reference

### `$(initialValue)`

Creates a writable reactive signal.

```typescript
const count = $(0);
count.value;      // Read: 0
count.value = 5;  // Write
count.value++;    // Modify
```

### `$(() => computation)`

Creates a computed (read-only) signal.

```typescript
const doubled = $(() => count.value * 2);
doubled.value;  // Read only
```

### `effect(fn)`

Runs a function whenever its dependencies change.

```typescript
effect(() => {
  console.log("Count is:", count.value);
});
```

### `batch(fn)`

Batches multiple signal updates into one.

```typescript
batch(() => {
  count.value++;
  name.value = "New";
  // Effects run once after batch completes
});
```

### Elements

All standard HTML elements are available:

```typescript
// Text: div, span, p, h1-h6, a, strong, em, code, pre
// Form: form, input, textarea, select, option, button, label
// List: ul, ol, li, dl, dt, dd
// Table: table, thead, tbody, tr, td, th
// Semantic: header, footer, nav, main, section, article, aside
// Media: img, video, audio, canvas, picture
// Interactive: details, summary, dialog
// Void: br, hr, input, img, meta, link, source, track
```

---

## 🎨 Common Patterns

### Two-Way Binding

```typescript
const text = $("");

input({
  value: text,
  oninput: (e) => text.value = e.currentTarget.value
});
```

### Conditional Classes

```typescript
const isActive = $(false);

div({
  class: { active: isActive, hidden: !isActive }
}, "Content");
```

### Array Operations

```typescript
const items = $([1, 2, 3]);

// Add
items.value = [...items.value, 4];

// Remove
items.value = items.value.filter(x => x !== 2);

// Update
items.value = items.value.map(x => x * 2);
```

### Ref Access

```typescript
div({ class: "box" }, (el) => {
  // el is the HTMLDivElement
  console.log(el.getBoundingClientRect());
});
```

---

## 🛠️ Development

```bash
bun install      # Install dependencies
bun run dev      # Start dev server at localhost:4000
bun test         # Run tests
```

## 📄 License

MIT

---

Built with ❤️ by developers who believe less is more.