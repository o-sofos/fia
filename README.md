# Fia

[![jsr:@fia/core](https://jsr.io/badges/@fia/core)](https://jsr.io/@fia/core)
[![jsr:@fia/core_score](https://jsr.io/badges/@fia/core/score)](https://jsr.io/@fia/core)

> **No JSX. No VDOM. No Jank.**
>
> Fia is a 2KB framework for building reactive UIs with signals and plain functions.

---

## 🔭 Overview

### Native Speed. Declarative Fluency.

Most frameworks add layers of abstraction between you and the DOM. Fia gives you just enough to be productive:

- ✨ **Reactive values** - `$()` creates signals for primitives, reactive stores for objects
- 🎯 **Direct DOM** - No virtual DOM, no diffing, just native browser APIs
- 📦 **2KB total** - Smaller than the frameworks claiming to be minimal
- 🔒 **Zero dependencies** - No supply chain risks, no version conflicts
- 📘 **Fully typed** - Complete TypeScript support with autocomplete
- 🚀 **No build required** - Import from JSR and start building
- ⚡ **Automatic batching** - Children are batched into single DOM insertions

## 🧠 Philosophy

Fia is built on three principles:

* **Minimal abstraction** - We give you `$()` for reactivity and functions for elements. That's it.
* **Zero dependencies** - No supply chain risk, no version conflicts, no surprises.
* **Vanilla JavaScript** - Use `if`, `forEach`, `map`, `filter`. No custom control flow helpers.

## 🚀 Getting Started

### Installation

```typescript
// Import from JSR (Deno, Bun, Node with JSR support)
import { $ } from "jsr:@fia/core";
```

### Quick Start

```typescript
import { $, div, h1, button, p } from "jsr:@fia/core";

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

Fia elements follow a **Simplified API** with 4 overloads:

```typescript
el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children
```

### Text Content

Use the native `textContent` prop for element text:

```typescript
// Static text
h1({ textContent: "Hello World" });
button({ textContent: "Click me", onclick: () => alert("Hi!") });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => `Hello, ${name.value}!`) });
```

### Void Elements

Elements like `input`, `img`, `br`, `hr` only accept optional properties:

```typescript
input({ type: "text", placeholder: "Name" });
br();
```

### The Golden Rule: Function Children for Nesting

**Always use `() => { ... }` to nest elements inside a parent.**

```typescript
// ✅ CORRECT - Function establishes parent context
div({ class: "parent" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Paragraph" });
});

// ❌ WRONG - Elements mount BEFORE div processes them
div({ class: "parent" }, h1({ textContent: "Title" }), p({ textContent: "Paragraph" }));
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

#### 4. Computed Reactive Text
For dynamic text expressions, wrap in `$()`:

```typescript
const name = $("World");

// ✅ Correct - wrap computed expression in $()
h1($(() => `Hello, ${name.value}!`));

// ❌ Wrong - bare arrow function is treated as children callback
h1(() => `Hello, ${name.value}!`);  // Creates no text!
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

## ⚡ Performance

### Automatic Fragment Batching

Fia automatically batches all children into a `DocumentFragment` before inserting into the DOM. This means:

```typescript
ul(() => {
  // All 1000 items = 1 DOM insertion, not 1000
  items.forEach(item => li(item.name));
});
```

**No manual optimization needed** - every children callback is automatically batched, eliminating layout thrashing.

---

## 🛡️ Advanced Type System

Fia leverages TypeScript's mapped types and conditional inference to provide an IDE experience that catches errors *before* you run your code.

### 🎨 Strict CSS Typing

Fia ships with a hand-tuned CSS type definition that goes beyond `string`. It understands strict values for properties while allowing any string for flexibility (e.g. CSS variables).

```typescript
// ✅ Autocomplete for strict values
div({ 
  style: { 
    display: "flex",       // "flex" | "grid" | "block" ...
    justifyContent: "cen"  // Suggests "center"
  } 
});

// ✅ Valid units validation
div({ style: { width: 100 } }); // Error: Type 'number' is not assignable to 'string'
div({ style: { width: "100px" } }); // OK
```

### 🧠 Intelligent Event Inference

The type system knows exactly what element you are working on, even inside callbacks.

```typescript
input({
  oninput: (e) => {
    // e.currentTarget is inferred as HTMLInputElement
    // ✅ Autocomplete works for .value, .checked, etc.
    console.log(e.currentTarget.value.toUpperCase());
  }
});

// ❌ Error: Property 'value' does not exist on type 'HTMLDivElement'
div({ 
  onclick: (e) => console.log(e.currentTarget.value) 
});
```

### 🔒 Attribute Safety

Global attributes (like `id`, `class`) and element-specific attributes (like `href` for `a`, `src` for `img`) are strictly separated.

```typescript
// ✅ Valid attributes for img
img({ src: "cat.jpg", alt: "A cute cat" });

// ❌ Error: Property 'href' does not exist on type 'ImgAttributes'
img({ href: "google.com" });
```

### 🚦 Signal-Aware Props

All properties strictly accept `T | Signal<T>`.

```typescript
const isLoading = $(false);

button({ 
  // ✅ Boolean prop accepts boolean signal
  disabled: isLoading,
  
  // ❌ Error: Type 'boolean' is not assignable to type 'string'
  class: isLoading 
});
```

---

## 💡 Core Concepts

### Reactive Values (Primitives)

Use `$()` with primitives to create signals that automatically update the UI when they change.

```typescript
import { $ } from "jsr:@fia/core";

// Create reactive signals for primitives
const name = $("World");
const count = $(0);
const isActive = $(false);

// Read with .value
console.log(name.value); // "World"

// Write with .value
name.value = "Fia";
count.value++;
isActive.value = !isActive.value;
```

### Reactive Stores (Objects)

Pass an object to `$()` to create a **reactive store** with direct property access:

```typescript
// Object → ReactiveStore (auto-detected!)
const state = $({
  name: "Evan",
  age: 17,
});

// Direct property access - no .value needed!
console.log(state.name);  // "Evan"
state.age++;              // Reactive update!
state.name = "John";      // Triggers subscribers

// Deep reactivity works automatically
const nested = $({
  user: { profile: { name: "Alice" } }
});
nested.user.profile.name = "Bob";  // Triggers updates
```

> [!WARNING]
> **Destructuring breaks reactivity.** When you destructure a store, the values become static copies:
> ```typescript
> const state = $({ age: 17 });
> const { age } = state;  // age is now just 17 (static!)
> state.age = 21;
> console.log(age);       // Still 17 - NOT reactive!
> ```
> Always access properties directly from the store for reactivity.

### Computed Values

Computed values derive from other reactive values:

```typescript
const count = $(0);
const doubled = $(() => count.value * 2);

// Works with stores too!
const state = $({ age: 17 });
const isAdult = $(() => state.age >= 18);

console.log(isAdult.value); // false
state.age = 21;
console.log(isAdult.value); // true
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
import { $, div, h1, input, button, ul, li } from "jsr:@fia/core";

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
import { $, div, p, button } from "jsr:@fia/core";

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

---

## 🏆 Best Practices

### 1. Components are Functions

Don't overcomplicate components. They are just functions that run once. You don't need `class` or `return`.

```typescript
// ✅ Good: Simple function, named props
function UserCard({ name, role }: { name: Signal<string>, role: string }) {
  div({ class: "card" }, () => {
    h2(name);
    p(role);
  });
}

// Usage
UserCard({ name: userName, role: "Admin" });
```

### 2. Immutable Object Updates

Fia uses **reference equality** to detect changes. If you have an object signal, you must replace the object to trigger updates.

```typescript
const state = $({ count: 0 });

// ❌ Won't trigger update (same reference)
state.value.count++;

// ✅ Triggers update (new reference)
state.value = { ...state.value, count: state.value.count + 1 };
```

### 3. Granular Signals

For complex state, prefer multiple small signals over one giant object signal. This ensures only the relevant parts of the UI update.

```typescript
// ⚠️ Triggers all listeners on every change
const bigState = $({ name: "Evan", age: 25, theme: "dark" });

// ✅ Updates independently and efficiently
const name = $("Evan");
const age = $(25);
const theme = $("dark");
```

### 4. Computed Signals for Derived State

Don't manually update related state. Use computed signals to ensure data consistency.

```typescript
const firstName = $("John");
const lastName = $("Doe");

// ✅ Automatically updates when dependencies change
const fullName = $(() => `${firstName.value} ${lastName.value}`);
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