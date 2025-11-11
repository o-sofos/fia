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
    <title>Flick
```
