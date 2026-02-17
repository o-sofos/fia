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
- 📦 **~4KB gzipped** - Lightweight Hello World (1.5KB signals-only, 8KB full)
- 📘 **Fully typed** - Complete TypeScript support with autocomplete
- ⚡ **Event delegation** - Single listener per event type, automatic cleanup
- 🚀 **No build required** - Import from JSR and start building

## 🧠 Philosophy

- **Minimal abstraction** - `$()` for reactivity and functions for elements. That's it.
- **Zero dependencies** - No supply chain risk, no version conflicts, no surprises.
- **Vanilla JavaScript** - Use `if`, `forEach` for static logic. Use `Show`/`Each` only for reactive DOM updates.

## 📦 Bundle Sizes

Fia is designed to be lightweight with excellent tree-shaking support. Import only what you need:

<div align="center">

| Entry Point | Bundle Size (gzip) | Bundle Size (brotli) | Use Case |
|-------------|:------------------:|:--------------------:|----------|
| `fia/signals` | **1.46 KB** | **1.28 KB** | Reactive state without DOM |
| `fia/control` | **2.16 KB** | **1.90 KB** | Control flow (Show, Each) |
| `fia/elements` | **4.05 KB** | **3.58 KB** | UI with 3 elements |
| `fia/svg` | **~4 KB** | **~3.5 KB** | SVG graphics |
| `fia` (full) | **8.21 KB** | **7.25 KB** | Complete library |

</div>

### Framework Comparison

How Fia compares to other popular frameworks:

<div align="center">

| Framework | Minimal | Hello World | Notes |
|-----------|:-------:|:-----------:|-------|
| **Fia** | **1.46 KB** | **~4 KB** | Zero dependencies |
| Preact | ~3 KB | ~3.5 KB | Lightweight champion |
| Svelte | ~2-3 KB | ~4 KB | Compiler magic |
| Solid | ~6-7 KB | ~6.5 KB | Fine-grained reactivity |
| Vue | ~17 KB | ~22 KB | Tree-shakable |
| React | ~7 KB | ~42 KB | Standard + VDOM |
| Angular | N/A | ~85 KB | Full framework |

</div>

> 💡 **All sizes are minified + gzipped.** Fia's tree-shaking ensures you only bundle what you use.

## 📚 Table of Contents

- [Bundle Sizes](#-bundle-sizes)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Updating](#updating)
  - [Quick Start](#quick-start)
  - [Mounting](#mounting)
  - [Import Patterns](#import-patterns)
- [Element API](#-element-api)
- [Element Factory Types](#-element-factory-types)
- [Reactivity](#-reactivity)
  - [Signals](#primitives--signals)
  - [Stores](#objects--reactive-stores)
  - [Immutability](#-immutability)
- [Control Flow](#-control-flow)
- [Component Composition](#-component-composition)

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
const state = $(Mut({ count: 0 }));

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

### Import Patterns

Fia provides multiple entry points for different use cases:

```typescript
// Full library (default) - 8.21 KB gzip
import { $, div, Show } from "fia";

// Signals only - 1.46 KB gzip
import { $, $e, batch } from "fia/signals";

// Elements with signals - 4.05 KB gzip
import { $, div, button } from "fia/elements";

// Control flow - 2.16 KB gzip
import { $, Show, Each } from "fia/control";

// SVG elements
import { svg, circle, path } from "fia/svg";
```

**All entry points tree-shake identically** - use whichever feels most semantic. The separate entry points exist for:
- ✅ **Clarity** - Express intent explicitly
- ✅ **Better autocomplete** - Smaller import suggestions
- ✅ **Flexibility** - Use signals without DOM on server-side

See [IMPORTS.md](IMPORTS.md) for detailed usage guide.

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

## 📋 Element Factory Types

Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns.

### Standard Elements (4 overloads)

Used for semantic structure elements like `article`, `section`, `nav`, `form`, `ul`, `ol`, `table`, etc.

```typescript
// 1. Empty element
article();

// 2. Props only
article({ id: "post-1", class: "article" });

// 3. Children only
article(() => {
  h2({ textContent: "Title" });
  p({ textContent: "Content" });
});

// 4. Props + children (most common)
article({ class: "post" }, () => {
  h2({ textContent: "Article Title" });
  p({ textContent: "Article body..." });
});
```

**Elements:** `article`, `section`, `nav`, `form`, `ul`, `ol`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `details`, `dialog`, `fieldset`, `menu`, `select`, `datalist`, `meter`, `progress`, `canvas`, `audio`, `video`, `picture`, `iframe`, `embed`, `object`

### Text Elements (11 overloads)

Optimized for elements that commonly hold text content with convenient text-first syntax.

```typescript
// 1-4. Same as standard elements
h1();
h1({ class: "title" });
h1(() => { span({ textContent: "nested" }); });
h1({ class: "title" }, () => { span({ textContent: "nested" }); });

// 5. Text content (static or reactive)
h1("Hello World");
h1($(() => `Count: ${count.value}`));

// 6. Text + props
h1("Hello", { class: "title", style: { color: "blue" } });

// 7. Text + children
h1("Header", () => {
  span({ textContent: " with nested content" });
});

// 8. Text + props + children (all three!)
h1("Main Title", { class: "hero" }, () => {
  span({ textContent: " subtitle", class: "sub" });
});
```

**Elements:** `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `div`, `span`, `blockquote`, `figcaption`, `label`, `legend`, `caption`, `strong`, `em`, `small`, `mark`, `code`, `pre`, `samp`, `kbd`, `var`, `i`, `b`, `u`, `s`, `del`, `ins`, `sub`, `sup`, `li`, `td`, `th`, `dt`, `dd`, `address`, `cite`, `q`, `abbr`, `time`, `data`, `output`

### Interactive Elements (10 overloads)

Special factories for interactive elements with text + click handler shorthand.

```typescript
// 1-8. Same as text elements
button("Click me");
button("Submit", { type: "submit", class: "btn-primary" });

// 9. Text + click handler shorthand (special!)
button("Delete", () => {
  console.log("Delete clicked!");
});

// Full props alternative (if you need more than onclick)
button({
  textContent: "Delete",
  onclick: () => console.log("Delete clicked!"),
  onmouseenter: () => console.log("Hovered!"),
  class: "btn-danger"
});
```

**Elements:** `button`, `summary`, `option`, `optgroup`

### Void Elements (1 overload)

Self-closing elements that cannot have children.

```typescript
// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com", required: true });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description", loading: "lazy" });
```

**Elements:** `input`, `br`, `hr`, `img`, `area`, `base`, `col`, `embed`, `link`, `meta`, `param`, `source`, `track`, `wbr`

### Summary Table

| Element Type | Overloads | Text Shorthand | Click Shorthand | Use Case |
|--------------|-----------|----------------|-----------------|----------|
| **Standard** | 4 | ❌ | ❌ | Semantic structure |
| **Text** | 11 | ✅ `el("text")` | ❌ | Content-heavy elements |
| **Interactive** | 10 | ✅ `el("text")` | ✅ `button("text", onclick)` | Buttons, interactive |
| **Void** | 1 | ❌ | ❌ | Self-closing elements |

### Type Safety Benefits

All factories provide:
- **Full TypeScript autocomplete** for props
- **Event type inference** (`e.currentTarget` is correctly typed)
- **CSS property validation** with autocomplete
- **ARIA attribute support** with literal types
- **Reactive value support** with `Signal<T>` or computed `$(() => value)`

```typescript
// TypeScript knows this is an HTMLInputElement
input({
  type: "email",
  oninput: (e) => {
    // e.currentTarget is HTMLInputElement
    console.log(e.currentTarget.value); // ✅ Type-safe
  }
});

// ARIA attributes with autocomplete
button({
  textContent: "Menu",
  ariaExpanded: $(false),        // "true" | "false" | "undefined"
  ariaHasPopup: "menu",           // Autocomplete shows valid values!
  onclick: () => console.log("Toggle menu")
});
```

---

## 💡 Reactivity

### Primitives → Signals

```typescript
// Immutable Signal (Default)
const count = $(0);
// count.value++; // Error: Cannot assign to read-only property

// Mutable Signal (Opt-in)
const name = $(Mut("World"));
name.value = "Fia"; // Works!
```

### Objects → Reactive Stores

Fia stores are **immutable by default**. You must explicitly opt-in to mutability for specific keys. This encourages predictable state updates.

```typescript
// 🔒 Immutable Store (Default)
const config = $({ theme: "dark", version: "1.0" });
// config.theme = "light"; // Error: Cannot assign to read-only property

// 🔓 Mutable Store (Opt-in)
// option 1: Mark specific keys as mutable
const state = $({
  count: 0,
  name: "Evan"
}, "count", "name"); 

state.count++;      // ✅ Works
state.name = "John"; // ✅ Works

// option 2: Mark entire object as mutable
const data = $(Mut({ items: [] }));
data.items.push("New Item"); // ✅ Works
```

### Deep Reactivity

Objects directly nested in a store are deeply reactive, but also follow immutability rules. To update deep state, **replace the object** or use a mutable key for the nested store.

```typescript
const app = $(Mut({
  user: { name: "Alice", active: true }
}));

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

const state = $(Mut({ age: 17 }));
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

### Data Types & Behavior

#### 1. Primitives (String, Number, Boolean)
Primitives are immutable by default. To make them mutable, use `Mut`.

```typescript
// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;
```

#### 2. Objects
Objects are shallowly immutable by default. You cannot add, remove, or change properties.

```typescript
const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.
```

**Mutable Objects:**
```typescript
// Option A: Specific keys
const state = $({ count: 0 }, "count");
state.count++;

// Option B: Full object mutability
const config = $(Mut({ theme: "dark", debug: false }));
config.theme = "light";
config.debug = true;
```

#### 3. Arrays
Arrays are immutable by default. Methods that mutate (`push`, `pop`, `splice`, `sort`) are typed to not exist or error.

```typescript
const list = $({ items: [1, 2, 3] });

// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
// list.items.push(4);

// ✅ Valid: Replace array
list.items = [...list.items, 4]; // Only works if 'items' key is mutable
```

**Mutable Arrays:**
```typescript
const todos = $(Mut({ list: [] as string[] }));

// ✅ Valid: Mutation methods work
todos.list.push("Buy milk");
todos.list.splice(0, 1);
```

#### 4. Nested Objects (Deep Reactivity)
Deeply nested objects inherit the mutability context of their parent property *assignment*, but by default, Fia encourages replacing nested objects.

```typescript
const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
app.settings.notifications.email = false;

// ℹ️ Pattern: Immutable Tree with Mutable Root
// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };
```

### Secure Immutability by Design

Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone.

```typescript
const original = $({ name: "Evan", details: { age: 30 } });
const snapshot = { ...original };

// To create a truly independent reactive copy:
const clone = $({ ...original }); // New store with copied values
```

> **Info:** This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.

### Opt-in Mutability

For scenarios where granular mutation is preferred (e.g., forms, high-performance counters), you can opt-in to mutability for specific keys.

```typescript
const state = $(Mut({ count: 0 }));
state.count++; // Mutable because "count" was explicitly allowed

// Or use Mut helper for full mutability:
const counter = $(Mut(0));
counter.value++; // Mutable primitive
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

High-performance keyed list rendering with efficient reconciliation. Each minimizes DOM operations by reusing existing nodes instead of recreating them.

#### Automatic Key Assignment

Each **automatically assigns stable keys** to list items - no key function needed! This works for both objects and primitives:

```typescript
import { Each } from "fia";

// Primitives: automatically keyed by value
const items = $({ list: ["Apple", "Banana", "Cherry"] });
Each(() => items.list, (item, index) => {
  li({ textContent: `${index + 1}. ${item}` });
});

// Objects: automatically get stable internal IDs (via WeakMap)
const todos = $({ items: [
  { id: 1, text: "Learn Fia", completed: false },
  { id: 2, text: "Build app", completed: false }
] });

Each(() => todos.items, (todo) => {
  li(() => {
    input({
      type: "checkbox",
      checked: todo.completed,
      onchange: (e) => { todo.completed = e.currentTarget.checked; }
    });
    span({ textContent: todo.text });
  });
});
// ✅ Objects automatically get stable IDs - no keyFn needed!
// ✅ State, focus, and scroll position preserved on updates
```

#### Custom Key Function (Optional)

For explicit control (e.g., database IDs), you can provide a custom key function:

```typescript
// Provide custom key function for explicit ID control
Each(
  () => todos.items,
  (todo) => {
    li(() => {
      input({
        type: "checkbox",
        checked: todo.completed,
        onchange: (e) => { todo.completed = e.currentTarget.checked; }
      });
      span({ textContent: todo.text });
    });
  },
  (todo) => todo.id  // Optional: use database ID as key
);
```

**How Automatic Keying Works:**
- **Objects/Arrays**: Each reference gets a unique stable internal ID via WeakMap (no memory leaks, automatic garbage collection)
- **Primitives**: Keyed by `type:value` (e.g., "string:Apple", "number:42")
- **Custom keyFn**: Takes precedence when provided (useful for database IDs)
- **Performance**: Same O(1) operations whether automatic or custom keys are used

**When Automatic Keying Works:**
- ✅ **Object arrays** - Each object gets a unique ID
- ✅ **Unique primitive values** - `[1, 2, 3]` or `["a", "b", "c"]`
- ✅ **Arrays of arrays** - Each array reference gets a unique ID

**When to Provide Custom keyFn:**
- ⚠️ **Duplicate primitive values** - `[1, 2, 1]` means both `1`s share key `"number:1"`
- ⚠️ **Same object reference multiple times** - `[obj, obj]` results in duplicate keys
- 🎯 **Explicit control needed** - Database IDs, debugging, cross-system sync

```typescript
// ⚠️ Example: Duplicate primitives need custom keyFn
const tags = ["react", "vue", "react"];  // Duplicate "react"

Each(() => tags, (tag) => {
  span({ textContent: tag });
}, (tag, index) => `${tag}-${index}`);  // ✅ Make keys unique with index
// Warning: "[Each] Duplicate key: "string:react"" (if keyFn omitted)
```
```

#### Performance Characteristics

Each uses keyed reconciliation (automatic or custom keys) to achieve **O(1) performance** for common operations:

| Operation | Old Approach (No Keying) | Fia Each (Keyed) | Improvement |
|-----------|--------------------------|------------------|-------------|
| Add 1 item to 1000 | ~150ms<br>(recreates 1001) | ~0.5ms<br>(creates 1) | **300x faster** |
| Remove 1 item | ~145ms<br>(recreates 999) | ~0.3ms<br>(removes 1) | **480x faster** |
| Move/reorder item | ~30ms<br>(recreates all) | ~0.2ms<br>(moves node) | **150x faster** |
| **State preservation** | ❌ Lost | ✅ Preserved | Critical for UX |

**What gets preserved:**
- ✅ Input focus and cursor position
- ✅ Scroll position
- ✅ Form values
- ✅ Component state
- ✅ CSS animations

#### Custom Key Function Best Practices

While automatic keying works great, you may want custom keys for specific use cases:

**✅ Good Custom Keys:**
```typescript
// Database ID (explicit control)
(item) => item.id

// UUID (for distributed systems)
(item) => item.uuid

// Composite unique identifier (multi-field uniqueness)
(item) => `${item.category}-${item.slug}`
```

**❌ Bad Custom Keys:**
```typescript
// Index (automatic keying is better)
(item, index) => index

// Random (never reuses nodes)
(item) => Math.random()

// Non-unique (causes collisions)
(item) => item.category
```

**When to use custom keys:**
- Database objects with existing IDs (explicit control)
- Cross-system synchronization (predictable keys)
- Debugging (readable keys in DevTools)

**When automatic keying is fine:**
- Most common cases (objects automatically get stable IDs)
- Primitive arrays (strings, numbers automatically keyed)
- Local component state (no external ID requirements)

#### Real-World Example

Complete todo list with add, remove, and toggle:

```typescript
const state = $({
  todos: [],
  nextId: 0
}, "todos", "nextId");

div(() => {
  // Add todo form
  input({
    type: "text",
    placeholder: "New todo",
    onkeydown: (e) => {
      if (e.key === "Enter") {
        const input = e.currentTarget;
        state.todos = [
          ...state.todos,
          { id: state.nextId++, text: input.value, completed: false }
        ];
        input.value = "";
      }
    }
  });

  // Todo list with keyed Each
  ul(() => {
    Each(
      () => state.todos,
      (todo) => {
        li(() => {
          input({
            type: "checkbox",
            checked: todo.completed,
            onchange: (e) => {
              todo.completed = e.currentTarget.checked;
            }
          });
          span({ textContent: todo.text });
          button("×", () => {
            state.todos = state.todos.filter(t => t.id !== todo.id);
          });
        });
      },
      (todo) => todo.id  // Preserves state
    );
  });
});
```

#### Performance Tips

1. **Always use key function for dynamic lists** - Enables O(1) operations
2. **Use stable keys** - Database IDs, UUIDs, not indices
3. **Batch updates** - Use `batch()` for multiple changes
4. **Key function is optional** - For simple, append-only lists

> Use `Show` and `Each` instead of plain `if`/`forEach` when you need the content to **react to state changes**.

### Match

Reactive pattern matching for strict switch/case logic or simple routing. Automatically updates rendering when the matched value changes. Match accepts signals or getter functions, and returns `Signal<R>` with `_` default or `Signal<R | undefined>` without.

#### Strings

Match exact string values:

```typescript
const status = $(Mut("active"));

Match(status, {
  "active": () => span({ class: "success" }, () => "Active"),
  "inactive": () => span({ class: "danger" }, () => "Inactive"),
  "pending": () => span({ class: "warning" }, () => "Pending"),
  _: () => span("Unknown")
});
```

#### Booleans

Boolean values are automatically converted to string keys ("true" / "false"):

```typescript
const isActive = $(Mut(true));

Match(isActive, {
  "true": () => "✅ Active",
  "false": () => "❌ Inactive"
});
```

#### Numbers & Ranges

Numbers support exact matching and **range-based comparisons** using operators and interval notation:

```typescript
const age = $(Mut(25));

// Comparison operators
Match(age, {
  "<18": () => "Minor",
  ">=18": () => "Adult",
  ">65": () => "Senior",
  _: () => "Invalid"
});

// Range notation (N..M is inclusive)
Match(age, {
  "0..17": () => "Child",       // 0 <= age <= 17
  "18..64": () => "Adult",      // 18 <= age <= 64
  "65..120": () => "Senior",    // 65 <= age <= 120
  _: () => "Unknown"
});

// Interval notation: [] = inclusive, () = exclusive
Match(age, {
  "(0..13)": () => "Child",     // 0 < age < 13
  "[13..18)": () => "Teen",     // 13 <= age < 18
  "[18..65)": () => "Adult",    // 18 <= age < 65
  "[65..120]": () => "Senior",  // 65 <= age <= 120
  _: () => "Unknown"
});
```

> **Note:** Range patterns only work with numeric values. Exact string matches are checked before range patterns.

### Derived Values with Match

`Match` returns a signal, so you can use it directly in properties:

```typescript
const status = $(Mut(10));

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
const userId = $(Mut(1));
const user = $(() => fetchUser(userId.value)); // Signal<User>
const name = $(() => user.value?.name);        // Signal<string | undefined>

// If userId changes -> user updates -> name updates.
// Automatic dependency flattening!
```

---



---

## ⚡ Performance

Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity. These optimizations are built into the framework and require no configuration.

### Event Delegation

**The Problem:** Traditional frameworks attach individual event listeners to each interactive element, leading to memory overhead and slower event handling.

```typescript
// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler); // 100 separate listeners
}
```

**Fia's Solution:** A single delegated listener per event type for the entire document.

```
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>
```

**How it works:**
1. Fia registers **one global listener** per event type (click, input, etc.) on `document.body`
2. Event handlers are stored in a `WeakMap<Element, Handler>`
3. When an event fires, Fia looks up the handler for the target element
4. Handlers are **automatically cleaned up** when elements are removed (WeakMap)

**Performance Benefits:**
- ✅ **Memory efficient**: 100 buttons = 1 listener (not 100)
- ✅ **Faster event dispatch**: Single lookup vs. multiple listener checks
- ✅ **Automatic cleanup**: No memory leaks from forgotten listeners
- ✅ **Dynamic elements**: New elements automatically work without rebinding

**Example:**
```typescript
// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(`Button ${i}`, () => console.log(`Clicked ${i}`));
    });
  }
});
// Memory usage: O(1) for event listeners
// Traditional: O(n) - 1,000 separate listeners
```

### Automatic Fragment Batching

**The Problem:** Each DOM insertion triggers browser reflow and repaint, causing performance bottlenecks.

```typescript
// Traditional approach (3 reflows!)
container.appendChild(h1); // Reflow #1
container.appendChild(p1); // Reflow #2
container.appendChild(p2); // Reflow #3
```

**Fia's Solution:** Automatic batching using `DocumentFragment`.

**How it works:**
1. When a children callback executes, Fia creates a `DocumentFragment`
2. All child elements are appended to the fragment (in-memory, no reflow)
3. The complete fragment is inserted in **one atomic operation**
4. Browser performs **one reflow** instead of multiple

**Performance Benefits:**
- ✅ **Single reflow**: N insertions = 1 reflow (not N)
- ✅ **Faster rendering**: Especially noticeable with 10+ children
- ✅ **Automatic**: No manual batching or optimization needed
- ✅ **Composable**: Works with nested structures

**Example:**
```typescript
// Fia automatically batches these 100 elements
div(() => {
  // All created in-memory first (DocumentFragment)
  h1({ textContent: "Title" });

  ul(() => {
    for (let i = 0; i < 100; i++) {
      li({ textContent: `Item ${i}` });
    }
  });

  p({ textContent: "Footer" });
});
// Result: 2 reflows total (outer div + inner ul)
// Traditional: 102 reflows (1 for each element)
```

**Execution Context Stack:**

Fia maintains an execution context stack to track parent elements:

```typescript
// Simplified internal flow:
pushExecutionContext(fragment);    // Push fragment as context
  h1({ textContent: "Title" });     // Appends to fragment
  p({ textContent: "Para 1" });     // Appends to fragment
  p({ textContent: "Para 2" });     // Appends to fragment
popExecutionContext();               // Pop fragment
parent.appendChild(fragment);        // Single DOM operation
```

### Fine-Grained Reactivity

**The Problem:** Virtual DOM frameworks re-render entire component trees when state changes.

**Fia's Solution:** Surgical updates to only changed elements.

```typescript
const count = $(0);

// Only the <p> text updates when count changes
// The <div> and <button> are never touched
div(() => {
  p({ textContent: $(() => `Count: ${count.value}`) }); // ← Only this updates
  button("+", () => count.value++); // ← Never re-renders
});
```



### Best Practices

While Fia optimizes automatically, you can maximize performance with these patterns:

**1. Use `batch()` for multiple updates:**
```typescript
import { batch } from "fia";

// Triggers one effect run instead of three
batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
});
```

**2. Use `peek()` for non-reactive reads:**
```typescript
const count = $(0);
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});
```

**3. Memoize expensive computations:**
```typescript
// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);
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
h1("Hello, World!");
```

#### 2. Counter
Signals hold reactive state. Pass a signal as `textContent` and it updates automatically when the value changes.

```typescript
const count = $(Mut(0));
button("+", () => count.value++);
p(count);
```

#### 3. Toggle
Computed signals (`$(() => ...)`) derive values from other signals. Here we toggle visibility using a reactive `display` style.

```typescript
const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p("Now you see me!");
});
```

#### 4. Input Binding
Two-way binding is manual but explicit. Use `oninput` to update the signal from user input.

```typescript
const name = $(Mut(""));
input({ type: "text", oninput: (e) => name.value = e.currentTarget.value });
p($(() => `Hello, ${name.value || "stranger"}!`));
```

#### 5. List Rendering (Static)
For static lists, plain `forEach` works fine:

```typescript
const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li(item)));
```

For **reactive lists** that update when data changes, use `Each`:

```typescript
const items = $(Mut({ list: ["Apple", "Banana"] }));
ul(() => Each(() => items.list, item => li(item)));
```

---

### 🟡 Intermediate

#### 6. Reactive Store Counter
Objects passed to `$()` become reactive stores. Access properties directly without `.value`.

```typescript
const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => `Count: ${state.count}`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});
```

#### 7. Conditional Classes
Computed signals work anywhere—including the `class` prop. Return different class strings based on state.

```typescript
const active = $(Mut(false));

button("Toggle Active", {
  class: $(() => active.value ? "btn active" : "btn")
}, () => active.value = !active.value);
```

#### 8. Form Handling
Reactive stores are perfect for forms. Each field maps to a store property with live updates.

```typescript
const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});
```

#### 9. Computed Values
Computed signals automatically track dependencies. When `state.price` or `state.quantity` changes, `total` updates.

```typescript
const state = $(Mut({ price: 100, quantity: 2 }));
const total = $(() => state.price * state.quantity);

div(() => {
  p($(() => `Price: $${state.price}`));
  p($(() => `Qty: ${state.quantity}`));
  p($(() => `Total: $${total.value}`));
  button("Add", () => state.quantity++);
});
```

#### 10. Dynamic Styling
Individual style properties can be reactive. Toggle entire themes by switching computed values.

```typescript
const theme = $(Mut("light"));

div({
  style: {
    background: $(() => theme.value === "dark" ? "#222" : "#fff"),
    color: $(() => theme.value === "dark" ? "#fff" : "#222"),
    padding: "2rem",
  }
}, () => {
  button("Toggle Theme", () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  });
});
```

---

### 🔴 Advanced

#### 11. Control Flow Combo (Each + Show + Match)
A complete task manager combining all control flow components:

```typescript
// Task manager example combining Each, Show, and Match
type Task = { id: number; text: string; completed: boolean };
type Filter = "all" | "active" | "completed";

const tasks = $(Mut<Task[]>([
  { id: 1, text: "Learn Fia", completed: true },
  { id: 2, text: "Build an app", completed: false },
  { id: 3, text: "Deploy to production", completed: false }
]));

const currentFilter = $(Mut<Filter>("all"));
const showCompleted = $(Mut(true));

// Computed: filtered tasks based on current filter and showCompleted toggle
const filteredTasks = $(() => {
  const filter = currentFilter.value;
  let result: typeof tasks = tasks;
  
  // Filter by completion status based on filter
  if (filter === "active") result = tasks.filter((t: Task) => !t.completed) as typeof tasks;
  else if (filter === "completed") result = tasks.filter((t: Task) => t.completed) as typeof tasks;
  
  // Additionally hide completed if showCompleted is false and filter is "all"
  if (filter === "all" && !showCompleted.value) {
    result = tasks.filter((t: Task) => !t.completed) as typeof tasks;
  }
  
  return result;
});

div({ style: { padding: "20px", maxWidth: "600px", margin: "0 auto" } }, () => {
  h2("Task Manager - Control Flow Demo");
  
  // Each: render filter buttons
  div({ style: { marginBottom: "20px", display: "flex", gap: "10px" } }, () => {
    const filters: Filter[] = ["all", "active", "completed"];
    Each(filters, (filter) => {
      button({
        textContent: filter.charAt(0).toUpperCase() + filter.slice(1),
        style: {
          padding: "8px 16px",
          background: $(() => currentFilter.value === filter ? "#4CAF50" : "#ddd"),
          color: $(() => currentFilter.value === filter ? "white" : "black"),
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        },
        onclick: () => currentFilter.value = filter
      });
    });
  });
  
  // Toggle to show/hide completed tasks
  div({ style: { marginBottom: "20px" } }, () => {
    button({
      textContent: $(() => showCompleted.value ? "Hide Completed" : "Show Completed"),
      onclick: () => showCompleted.value = !showCompleted.value
    });
    
    // Show: conditionally display completed stats
    Show(showCompleted, () => {
      const completedCount = $(() => tasks.filter((t: Task) => t.completed).length);
      p({
        style: { marginTop: "10px", padding: "10px", background: "#e3f2fd", borderRadius: "4px" },
        textContent: $(() => `Completed: ${completedCount.value} / ${tasks.length}`)
      });
    });
  });
  
  // Match: display different messages based on filter
  div({ style: { marginBottom: "20px", padding: "10px", background: "#fff3cd", borderRadius: "4px" } }, () => {
    p({
      style: { margin: "0", fontWeight: "bold" },
      textContent: Match(currentFilter, {
        "all": () => "📋 Showing all tasks",
        "active": () => "⚡ Showing active tasks",
        "completed": () => "✅ Showing completed tasks",
        _: () => "Unknown filter"
      })
    });
  });
  
  // Each: render the filtered task list
  ul({ style: { listStyle: "none", padding: "0" } }, () => {
    // Show: display message when no tasks match filter
    Show(() => filteredTasks.value.length === 0, () => {
      li({
        style: { padding: "20px", textAlign: "center", color: "#999" },
        textContent: Match(currentFilter, {
          "all": () => "No tasks yet!",
          "active": () => "No active tasks!",
          "completed": () => "No completed tasks!",
          _: () => "No tasks"
        })
      });
    });
    
    Each(filteredTasks, (task: Task) => {
      const taskCompleted = $(Mut(task.completed));
      li({
        style: {
          padding: "12px",
          marginBottom: "8px",
          background: $(() => taskCompleted.value ? "#f1f8f4" : "#fff"),
          border: "1px solid #ddd",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }
      }, () => {
        // Checkbox
        button({
          textContent: $(() => taskCompleted.value ? "✓" : "○"),
          style: {
            width: "24px",
            height: "24px",
            border: "2px solid #4CAF50",
            borderRadius: "50%",
            background: $(() => taskCompleted.value ? "#4CAF50" : "white"),
            color: "white",
            cursor: "pointer",
            fontSize: "14px"
          },
          onclick: () => {
            taskCompleted.value = !taskCompleted.value;
            task.completed = taskCompleted.value;
          }
        });
        
        // Task text
        p({
          style: {
            margin: "0",
            flex: "1",
            textDecoration: $(() => taskCompleted.value ? "line-through" : "none"),
            color: $(() => taskCompleted.value ? "#999" : "#333")
          },
          textContent: task.text
        });
      });
    });
  });
  
  // Add new task button
  button({
    textContent: "Add Random Task",
    style: {
      marginTop: "20px",
      padding: "10px 20px",
      background: "#2196F3",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    },
    onclick: () => {
      const newTask: Task = {
        id: Date.now(),
        text: `Task ${tasks.length + 1}`,
        completed: false
      };
      tasks.push(newTask);
    }
  });
});
```

#### 12. Todo App
A complete todo app using `Each` for reactive list rendering.

```typescript
const todos = $(Mut({ items: [] as string[], input: "" }));

div(() => {
  input({
    type: "text",
    value: $(() => todos.input),
    oninput: (e) => todos.input = e.currentTarget.value,
  });
  button("Add", () => {
      if (todos.input.trim()) {
        todos.items.push(todos.input);
        todos.input = "";
      }
    });
  ul(() => {
    Each(() => todos.items, (item, i) => {
      li(() => {
        span(item);
        button("×", () => todos.items.splice(i, 1));
      });
    });
  });
});
```

#### 13. Tabs Component
UI patterns like tabs are natural to implement. Track active index and conditionally apply classes.

```typescript
const tabs = ["Home", "About", "Contact"];
const active = $(Mut(0));

div(() => {
  div({ class: "tabs" }, () => {
    tabs.forEach((tab, i) => {
      button(
        tab,
        { class: $(() => active.value === i ? "active" : "") },
        () => active.value = i
      );
    });
  });
  div({ class: "content" }, () => {
  div({ class: "content" }, () => {
    // Match returns a signal, so we can use it directly in textContent!
    p(Match(() => active.value, {
        0: () => "Welcome to the Home page!",
        1: () => "About Fia Framework...",
        2: () => "Contact us at hello@fia.dev",
      })
    );
  });
});
});
```

#### 14. Async Data Fetching
Use `Show` for reactive loading states that update when data arrives.

```typescript
const state = $(Mut({
  status: "loading" as "loading" | "success" | "error",
  users: [] as string[]
}));

fetch("/api/users")
  .then(r => r.json())
  .then(users => {
    state.users = users;
    state.status = "success";
  })
  .catch(() => state.status = "error");

div(() => {
  Match(() => state.status, {
    loading: () => p("Loading..."),
    error: () => p("Failed to load users"),
    success: () => ul(() => Each(() => state.users, u => li(u))),
  });
});
```

#### 15. Modal Dialog
Modal patterns with backdrop click-to-close. Use explicit types to avoid literal type inference.

```typescript
const modal = $(Mut({ open: false, title: "" }));

function openModal(title: string) {
  modal.title = title;
  modal.open = true;
}

button("Open Modal", () => openModal("Hello!"));

div({
  class: "modal-backdrop",
  style: { display: $(() => modal.open ? "flex" : "none") },
  onclick: () => modal.open = false,
}, () => {
  div({
    class: "modal",
    onclick: (e) => e.stopPropagation(),
  }, () => {
    h2($(() => modal.title));
    button("Close", () => modal.open = false);
  });
});
```



---

## License

MIT

