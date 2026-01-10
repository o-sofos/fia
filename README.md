# Flick

[![jsr:@flick/core](https://jsr.io/badges/@flick/core)](https://jsr.io/@flick/core)
[![jsr:@flick/core_v](https://jsr.io/badges/@flick/core/v)](https://jsr.io/@flick/core)

> **No JSX. No VDOM. No Jank.**
>
> Flick is a 2KB framework for building reactive UIs with signals and plain functions.

---

## 🔭 Overview

### Native Speed. Declarative Fluency.

Most frameworks add layers of abstraction between you and the DOM. Flick gives you just enough to be productive:

✨ Reactive values - $() creates values that automatically update the UI

🎯 Direct DOM - No virtual DOM, no diffing, just native browser APIs

📦 2KB total - Smaller than the frameworks claiming to be minimal

🔒 Zero dependencies - No supply chain risks, no version conflicts

📘 Fully typed - Complete TypeScript support with autocomplete

🚀 No build required - Import from JSR and start building

## 🧠 Philosophy

Flick is built on three principles:

* Minimal abstraction - We give you $() for reactivity and functions for elements. That's it.
* Zero dependencies - No supply chain risk, no version conflicts, no surprises.
* Vanilla JavaScript - Use if, forEach, map, filter. No custom control flow helpers.

## ⚡ Features

Use Flick when:

📱 You're building a small to medium app

⚡ Performance is critical

🎯 You want zero dependencies

📦 Bundle size matters

🚀 You want fast iteration without build steps

## 🚀 Getting Started

### Installation

```typescript
// Import from JSR (Deno, Bun, Node with JSR support)
import { $ } from "jsr:@flick/core";
```

### Quick Start

Create a simple counter app:

```typescript
import { signal, div, h1, button, p } from "jsr:@flick/core";

// 1. Create reactive state
const count = signal(0);

// 2. Build your UI - elements auto-mount to body
div(() => {
  h1("Counter App");
  
  p("Count: ", count);
  
  button(
    { onclick: () => count.set(count() + 1) },
    "Increment"
  );
  
  button(
    { onclick: () => count.set(count() - 1) },
    "Decrement"
  );
});
```
That's it. No build step, no configuration, no boilerplate.

## 💡 Core Concepts

### Reactive Values
Use $() to create values that automatically update the UI when they change.

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
import { $ } from "jsr:@flick/core";

const count = $(0);

// Create a computed value
const doubled = $(() => count.value * 2);

console.log(doubled.value);
count.value = 5;
console.log(doubled.value); 
```

### Elements
Every HTML element is a function that creates and mounts a DOM node.

```typescript
import { div, h1, p, input, button } from "jsr:@flick/core";

// Elements can take props and children
div(
  { class: "container", id: "app" },
  "Hello World"
);

// Props are optional - just pass children
p("Simple paragraph");

// Reactive values work automatically
const name = $("Alice");
p("Hello, ", name.value); // Updates when name changes

// Event handlers
button(
  { onclick: (e) => console.log("Clicked!") },
  "Click Me"
);
```

### Context-Based Mounting
Elements automatically append to their parent context. No need for explicit mounting.

```typescript
// Outer div becomes the parent context
div(() => {
  h1("Title");
  
  // These all append to the div above
  p("Paragraph 1");
  p("Paragraph 2");
  
  // Nested contexts work naturally
  div(() => {
    p("I'm inside a nested div");
  });
});
```

### Reactive Attributes
Any prop can use .value from a reactive variable:

```typescript
import { $ } from "jsr:@flick/core";

const isActive = $(false);
const theme = $("light");

div({
  class: isActive.value ? "active" : "inactive",
  "data-theme": theme.value,
  style: {
    color: theme.value === "dark" ? "white" : "black",
    padding: "20px"
  }
}, "Reactive div");
```

## 📦 Examples

### Todo App

```typescript
import { $, div, h1, input, button, ul, li } from "jsr:@flick/core";

const todos = $(["Buy milk", "Walk dog"]);
const newTodo = $("");

div(() => {
  h1("Todo List");
  
  div(() => {
    input({
      type: "text",
      value: newTodo.value,
      oninput: (e) => newTodo.value = e.target.value,
      placeholder: "What needs to be done?"
    });
    
    button({
      onclick: () => {
        if (newTodo.value.trim()) {
          todos.value = [...todos.value, newTodo.value];
          newTodo.value = "";
        }
      }
    }, "Add");
  });
  
  ul(() => {
    todos.value.forEach((todo, index) => {
      li(
        { 
          onclick: () => {
            todos.value = todos.value.filter((_, i) => i !== index);
          }
        },
        todo
      );
    });
  });
});
```

### Form with Validation

```typescript
import { $, div, form, input, p, button } from "jsr:@flick/core";

const email = $("");
const password = $("");

// Computed validation
const isValidEmail = $(() => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
);

const canSubmit = $(() => 
  isValidEmail.value && password.value.length >= 8
);

div(() => {
  form({
    onsubmit: (e) => {
      e.preventDefault();
      console.log({ 
        email: email.value, 
        password: password.value 
      });
    }
  }, () => {
    div(() => {
      input({
        type: "email",
        value: email.value,
        oninput: (e) => email.value = e.target.value,
        placeholder: "Email"
      });
      
      p({
        style: { 
          color: isValidEmail.value ? "green" : "red"
        }
      }, isValidEmail.value ? "✓ Valid" : "✗ Invalid email");
    });
    
    div(() => {
      input({
        type: "password",
        value: password.value,
        oninput: (e) => password.value = e.target.value,
        placeholder: "Password"
      });
      
      p(
        password.value.length >= 8 
          ? "✓ Strong password" 
          : "✗ At least 8 characters"
      );
    });
    
    button({
      type: "submit",
      disabled: !canSubmit.value
    }, "Submit");
  });
});
```

### Conditional Rendering

```typescript
import { $, div, button, p } from "jsr:@flick/core";

const showDetails = $(false);

div(() => {
  button(
    { onclick: () => showDetails.value = !showDetails.value },
    showDetails.value ? "Hide Details" : "Show Details"
  );
  
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
import { $, div, button, ul, li } from "jsr:@flick/core";

const items = $(["Apple", "Banana", "Cherry"]);

div(() => {
  button({
    onclick: () => {
      items.value = [...items.value, `Item ${items.value.length + 1}`];
    }
  }, "Add Item");
  
  button({
    onclick: () => {
      items.value = items.value.slice(0, -1);
    }
  }, "Remove Last");
  
  ul(() => {
    items.value.forEach((item, index) => {
      li(`${index + 1}. ${item}`);
    });
  });
});
```

### Counter with Multiple Computations

```typescript
import { $, div, p, button } from "jsr:@flick/core";

const count = $(0);

// Computed values automatically update
const doubled = $(() => count.value * 2);
const squared = $(() => count.value ** 2);
const isEven = $(() => count.value % 2 === 0);

div(() => {
  p("Count: ", count.value);
  p("Doubled: ", doubled.value);
  p("Squared: ", squared.value);
  p("Is Even: ", isEven.value ? "Yes" : "No");
  
  button({ onclick: () => count.value++ }, "++");
  button({ onclick: () => count.value-- }, "--");
  button({ onclick: () => count.value = 0 }, "Reset");
});
```

## 📚 API Reference

### $(initialValue)

Creates a reactive value. Read and write using .value.

```typescript 
// Primitive values
const count = $(0);
const name = $("Alice");
const isActive = $(false);

// Objects and arrays
const user = $({ name: "Alice", age: 30 });
const todos = $(["Task 1", "Task 2"]);

// Read
console.log(count.value); // 0

// Write
count.value = 5;
name.value = "Bob";
user.value = { name: "Charlie", age: 25 };
todos.value = [...todos.value, "Task 3"];
```

### $(computeFn)
```typescript
const firstName = $("John");
const lastName = $("Doe");

// Computed value
const fullName = $(() => `${firstName.value} ${lastName.value}`);

console.log(fullName.value); // "John Doe"

firstName.value = "Jane";
console.log(fullName.value); // "Jane Doe"
```


### Elements
All standard HTML elements are available as functions:

```typescript
// Text elements
div, span, p, h1, h2, h3, h4, h5, h6, a, strong, em, code, pre

// Form elements
form, input, textarea, select, option, button, label, fieldset, legend

// List elements
ul, ol, li

// Table elements
table, thead, tbody, tfoot, tr, td, th

// Semantic elements
header, footer, nav, main, section, article, aside

// Media elements
img, video, audio, canvas, svg

// And more...
```

Each element function accepts:

Props object (optional) - attributes, event handlers, styles
Children - strings, numbers, reactive values, or a function for nested elements

```typescript
// With props and children
div({ class: "container", id: "app" }, "Content");

// Just children
p("Simple text");

// Nested elements with function
div(() => {
  h1("Title");
  p("Description");
});

// Reactive values
const name = $("World");
p("Hello, ", name.value);
```

## 🎨 Patterns

### Two-Way Binding

```typescript
const text = $("");

input({
  value: text.value,
  oninput: (e) => text.value = e.target.value
});
```

### Toggle State

```typescript
const isOpen = $(false);

button(
  { onclick: () => isOpen.value = !isOpen.value },
  isOpen.value ? "Close" : "Open"
});
```

### Derived State

```typescript
const todos = $([...]);
const completed = $(() => todos.value.filter(t => t.done));
const remaining = $(() => todos.value.filter(t => !t.done));
```

### Conditional Classes

```typescript
const isActive = $(false);

button(
  { class: { active: isActive.value } },
  "Click me"
});
```

### Array Operations

```typescript
const items = $([1, 2, 3]);

// Add
button({ onclick: () => items.value = [...items.value, 4] }, "Add");

// Remove last
button({ onclick: () => items.value = items.value.slice(0, -1) }, "Remove");

// Filter
button({ 
  onclick: () => items.value = items.value.filter(x => x % 2 === 0) 
}, "Keep Even");
```


## 🛠️ Development

Flick uses [Bun](https://bun.sh) for development, testing, and bundling.

### Prerequisites

- [Bun](https://bun.sh) v1.0+

### Setup

```bash
# Install dependencies
bun install
```

### Dev Server

Starts a development server with hot-reloading for TypeScript files.

```bash
bun run dev
```

The server runs at `http://localhost:4000`. It serves `index.html` by default and compiles `.ts` files on the fly.

### Testing

Run the test suite:

```bash
bun test
```

## 🤝 Contributing
Flick is intentionally minimal. Before opening a PR, ask yourself:

- Does this belong in the core, or should it be a separate package?
- Does this add unnecessary abstraction?
- Will this increase the bundle size?

If you answered "yes" to any of these, it probably shouldn't be in core.

## 📄 License
MIT



Built with ❤️ by developers who believe less is more.