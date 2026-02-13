# Fia Optimization Checklist

A systematic checklist for optimizing Fia reactive code for maximum performance.

## Table of Contents

1. [Reactivity Optimization](#reactivity-optimization)
2. [Effect Optimization](#effect-optimization)
3. [DOM Optimization](#dom-optimization)
4. [List Rendering Optimization](#list-rendering-optimization)
5. [Memory Management](#memory-management)
6. [Type Safety](#type-safety)
7. [Measurement and Profiling](#measurement-and-profiling)

---

## Reactivity Optimization

### ✅ Use Computed for Derived State

- [ ] All derived values use computed signals, not effects
- [ ] No signal assignments in effects that could be computed
- [ ] Computed signals are lazy-evaluated

```typescript
// ❌ Bad: Effect for derived state
const doubled = $(0);
$e(() => {
  doubled.value = count.value * 2;
});

// ✅ Good: Computed signal
const doubled = $(() => count.value * 2);
```

**Why:** Computed signals are lazy-evaluated and only recompute when accessed and dependencies change.

### ✅ Use peek() for Non-Reactive Reads

- [ ] Conditional dependencies use peek()
- [ ] Static values use peek()
- [ ] Configuration values use peek()

```typescript
// ❌ Bad: Creates dependency on threshold
$e(() => {
  if (count.value > threshold.value) {
    process();
  }
});

// ✅ Good: Only depends on count
$e(() => {
  if (count.value > threshold.peek()) {
    process();
  }
});
```

**Why:** Reduces unnecessary effect re-runs by 30-50% in typical cases.

### ✅ Batch Multiple Updates

- [ ] Sequential signal updates are batched
- [ ] Related state changes use batch()
- [ ] Form updates are batched

```typescript
// ❌ Bad: Effects run 3 times
function updateUser(user: User) {
  name.value = user.name;
  email.value = user.email;
  age.value = user.age;
}

// ✅ Good: Effects run once
import { batch } from "fia";

function updateUser(user: User) {
  batch(() => {
    name.value = user.name;
    email.value = user.email;
    age.value = user.age;
  });
}
```

**Why:** Reduces effect re-runs from N to 1.

### ✅ Use Stores for Object State

- [ ] Related signals are combined into stores
- [ ] Object state uses stores, not multiple signals
- [ ] Property-level reactivity is enabled

```typescript
// ❌ Bad: Many individual signals
const firstName = $("");
const lastName = $("");
const email = $("");

// ✅ Good: Single store
const user = $({
  firstName: "",
  lastName: "",
  email: ""
}, "firstName", "lastName", "email");
```

**Why:** Better organization and enables property-level subscriptions.

### ✅ Avoid Creating Signals in Hot Paths

- [ ] Signals created at component initialization, not in render
- [ ] Signals not created in loops
- [ ] Signals not created in effects

```typescript
// ❌ Bad: Signal created on every click
button("Click", () => {
  const temp = $(0); // Created every time!
  temp.value = count.value + 1;
});

// ✅ Good: Signal created once
const temp = $(0);
button("Click", () => {
  temp.value = count.value + 1;
});
```

**Why:** Signal creation has overhead; create once, update many times.

---

## Effect Optimization

### ✅ Effects Are Minimal

- [ ] Each effect has one clear responsibility
- [ ] Effects don't contain unrelated logic
- [ ] Effects are focused and targeted

```typescript
// ❌ Bad: Effect doing too much
$e(() => {
  console.log(count.value);
  updateTitle(count.value);
  saveToLocalStorage(count.value);
  sendAnalytics(count.value);
});

// ✅ Good: Separate concerns
$e(() => console.log(count.value));
$e(() => updateTitle(count.value));
$e(() => saveToLocalStorage(count.value));
$e(() => sendAnalytics(count.value));
```

**Why:** Smaller effects run less frequently and are easier to optimize.

### ✅ No Nested Effects

- [ ] Effects are not nested within other effects
- [ ] Effect creation is at component initialization
- [ ] No dynamic effect creation

```typescript
// ❌ Bad: Nested effects
$e(() => {
  if (condition.value) {
    $e(() => {
      // Nested effect - bad!
    });
  }
});

// ✅ Good: Flat effects with conditions
$e(() => {
  if (condition.value) {
    // Conditional logic
  }
});
```

**Why:** Nested effects create memory leaks and unpredictable behavior.

### ✅ Proper Effect Cleanup

- [ ] Effects with timers return cleanup
- [ ] Effects with listeners return cleanup
- [ ] Effects with subscriptions return cleanup
- [ ] Cleanup functions are tested

```typescript
// ❌ Bad: No cleanup
$e(() => {
  const timer = setInterval(() => tick(), 1000);
});

// ✅ Good: Returns cleanup
$e(() => {
  const timer = setInterval(() => tick(), 1000);
  return () => clearInterval(timer);
});
```

**Why:** Prevents memory leaks and resource exhaustion.

### ✅ Minimize Effect Dependencies

- [ ] Effects only depend on what they actually use
- [ ] Unnecessary dependencies are removed
- [ ] peek() is used for non-reactive reads

```typescript
// ❌ Bad: Depends on unused signal
$e(() => {
  console.log(count.value);
  // Accesses theme.value but doesn't use it
  const t = theme.value;
});

// ✅ Good: Only depends on count
$e(() => {
  console.log(count.value);
  // Use peek() if you need theme for something
  const t = theme.peek();
});
```

**Why:** Fewer dependencies = fewer re-runs.

---

## DOM Optimization

### ✅ Fragment Batching

- [ ] Children callbacks automatically batch DOM insertions
- [ ] No manual DOM manipulation in loops
- [ ] DocumentFragment used for bulk operations

```typescript
// ✅ Automatic fragment batching
div(() => {
  // All these elements are batched into a fragment
  h1("Title");
  p("Paragraph 1");
  p("Paragraph 2");
  p("Paragraph 3");
});
```

**Why:** Reduces layout thrashing and reflows.

### ✅ Event Delegation

- [ ] Common events use delegation (automatic for built-ins)
- [ ] No manual addEventListener for common events
- [ ] Event handlers are on appropriate elements

```typescript
// ✅ Good: Uses built-in delegation
ul(() => {
  Each(
    () => items.value,
    (item) => li({
      onclick: () => handleClick(item) // Automatically delegated
    })
  );
});
```

**Why:** Reduces memory usage and improves performance.

### ✅ Minimize Reactive Style Updates

- [ ] Static styles are not reactive
- [ ] Only changing styles are reactive
- [ ] Style objects group related properties

```typescript
// ❌ Bad: All styles reactive
div({
  style: {
    width: $(() => "100px"), // Static but reactive
    height: $(() => "100px"), // Static but reactive
    color: $(() => theme.value === "dark" ? "white" : "black")
  }
});

// ✅ Good: Only dynamic styles reactive
div({
  style: {
    width: "100px",
    height: "100px",
    color: $(() => theme.value === "dark" ? "white" : "black")
  }
});
```

**Why:** Reduces DOM mutations and style recalculations.

### ✅ Use Text Content Shorthands

- [ ] Text elements use shorthand when possible
- [ ] No unnecessary props for simple text

```typescript
// ❌ Verbose
h1({ textContent: "Title" });
p({ textContent: "Description" });

// ✅ Concise
h1("Title");
p("Description");
```

**Why:** Less code, same result.

### ✅ Avoid Unnecessary DOM Queries

- [ ] Elements are referenced via refs, not queries
- [ ] onMount used for element access
- [ ] No repeated querySelector calls

```typescript
// ❌ Bad: Repeated queries
$e(() => {
  const el = document.querySelector(".my-element");
  el.style.color = color.value;
});

// ✅ Good: Use ref
const elRef = { current: null as HTMLElement | null };

div({
  class: "my-element",
  onMount: (el) => {
    elRef.current = el;
  },
  style: {
    color: $(() => color.value)
  }
});
```

**Why:** DOM queries are expensive; cache references.

---

## List Rendering Optimization

### ✅ Use Each() for Lists

- [ ] All lists use Each(), not manual loops
- [ ] No innerHTML for dynamic lists
- [ ] No createElement in loops

```typescript
// ❌ Bad: Manual list creation
$e(() => {
  container.innerHTML = "";
  items.value.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    container.appendChild(li);
  });
});

// ✅ Good: Each() for efficient updates
ul(() => {
  Each(
    () => items.value,
    (item) => li({ textContent: item.name })
  );
});
```

**Why:** Each() only updates changed items, not entire list.

### ✅ Provide Stable Keys

- [ ] Each() receives key function (third argument)
- [ ] Keys are unique and stable
- [ ] Keys are based on ID, not index

```typescript
// ❌ Bad: No key function
Each(
  () => items.value,
  (item) => li({ textContent: item.name })
);

// ✅ Good: Stable key function
Each(
  () => items.value,
  (item) => li({ textContent: item.name }),
  (item) => item.id // Stable unique key
);
```

**Why:** Enables efficient diffing and reordering (when implemented).

### ✅ Avoid Creating Functions in Render

- [ ] Event handlers defined outside Each()
- [ ] No arrow functions created per item
- [ ] Stable function references

```typescript
// ❌ Bad: New function per item
Each(
  () => items.value,
  (item) => li(() => {
    button("Delete", () => removeItem(item.id)); // New function!
  })
);

// ✅ Good: Stable function reference
const handleRemove = (id: number) => {
  items.value = items.value.filter(item => item.id !== id);
};

Each(
  () => items.value,
  (item) => li(() => {
    button("Delete", () => handleRemove(item.id));
  }),
  (item) => item.id
);
```

**Why:** Reduces memory allocations and GC pressure.

### ✅ Batch List Updates

- [ ] Multiple list operations are batched
- [ ] Filters and sorts are combined
- [ ] Add/remove operations grouped

```typescript
// ❌ Bad: Separate operations
items.value = items.value.filter(item => !item.done);
items.value = items.value.sort((a, b) => a.name.localeCompare(b.name));
items.value = [...items.value, newItem];

// ✅ Good: Single operation
items.value = [
  ...items.value
    .filter(item => !item.done)
    .sort((a, b) => a.name.localeCompare(b.name)),
  newItem
];
```

**Why:** Single update triggers one re-render.

### ✅ Consider Virtualization

- [ ] Lists with 500+ items use virtual scrolling
- [ ] Only visible items are rendered
- [ ] Scroll performance is smooth

```typescript
// For very large lists (>1000 items), consider:
// - Virtual scrolling library
// - Pagination
// - Infinite scroll
// - Windowing techniques
```

**Why:** Massive performance improvement for large lists.

---

## Memory Management

### ✅ Dispose Effects Properly

- [ ] Component unmount disposes effects
- [ ] Long-lived effects have cleanup
- [ ] No effect leaks

```typescript
// ✅ Good: Store disposal reference
const disposeEffect = $e(() => {
  // Effect logic
  return () => {
    // Cleanup
  };
});

// On component unmount:
disposeEffect();
```

**Why:** Prevents memory leaks in dynamic UIs.

### ✅ Clean Up Event Listeners

- [ ] All addEventListener have removeEventListener
- [ ] Effect cleanup removes listeners
- [ ] No global event listener leaks

```typescript
// ✅ Good: Cleanup in effect
$e(() => {
  const handler = () => {};
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
});
```

**Why:** Event listeners prevent garbage collection.

### ✅ Avoid Circular References

- [ ] Signals don't reference themselves
- [ ] No circular computed dependencies
- [ ] Clear ownership hierarchy

```typescript
// ❌ Bad: Circular dependency
const a = $(() => b.value + 1);
const b = $(() => a.value + 1); // Circular!

// ✅ Good: Clear dependency direction
const a = $(1);
const b = $(() => a.value + 1);
```

**Why:** Circular references cause memory leaks and infinite loops.

### ✅ Use WeakMap for Element Associations

- [ ] Element-to-data mappings use WeakMap
- [ ] No strong references from data to DOM
- [ ] Proper garbage collection

```typescript
// ✅ Good: WeakMap for element data
const elementData = new WeakMap<HTMLElement, Data>();

div({
  onMount: (el) => {
    elementData.set(el, { /* data */ });
  }
});
// When element is removed, data is automatically GC'd
```

**Why:** Allows DOM nodes to be garbage collected.

---

## Type Safety

### ✅ SmartElement for Narrowed Types

- [ ] Elements typed with SmartElement
- [ ] Generic parameters provided
- [ ] Return types explicit

```typescript
// ✅ Good: Explicit types
const createButton = (): SmartElement<"button"> => {
  return button({ type: "submit", textContent: "Submit" });
};
```

**Why:** Better IDE support and type checking.

### ✅ Validate Props

- [ ] Component props are validated
- [ ] Required props enforced
- [ ] Default values provided

```typescript
// ✅ Good: Props interface
interface ComponentProps {
  required: string;
  optional?: number;
}

export const Component = (props: ComponentProps) => {
  const value = props.optional ?? 0; // Default value
  // ...
};
```

**Why:** Catches errors at compile time.

### ✅ Type Event Handlers

- [ ] Event handlers use TypedEvent
- [ ] Correct element and event types
- [ ] No 'any' types

```typescript
// ✅ Good: Typed handler
button({
  onclick: (e: TypedEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.currentTarget.textContent);
  }
});
```

**Why:** Type safety for event handling.

---

## Measurement and Profiling

### ✅ Measure Before Optimizing

- [ ] Profile to find actual bottlenecks
- [ ] Use browser DevTools Performance tab
- [ ] Measure effect re-run frequency
- [ ] Track memory usage

### ✅ Benchmark Changes

- [ ] Before/after performance comparison
- [ ] Measure impact of optimizations
- [ ] Test with realistic data volumes
- [ ] Verify no regressions

### ✅ Monitor in Production

- [ ] Track render performance
- [ ] Monitor memory usage
- [ ] Watch for memory leaks
- [ ] Measure user-perceived performance

---

## Optimization Priority

### High Priority (Do First)
1. Fix memory leaks (effect cleanup)
2. Use computed for derived state
3. Batch multiple updates
4. Use Each() for lists

### Medium Priority (Do Next)
5. Use peek() for non-reactive reads
6. Optimize effect dependencies
7. Use stores for object state
8. Minimize DOM updates

### Low Priority (Nice to Have)
9. Text content shorthands
10. Type safety improvements
11. Micro-optimizations
12. Code organization

---

## Quick Wins

These optimizations typically have the biggest impact with least effort:

1. **Add batch()** - 3x fewer effect re-runs
2. **Convert effects to computed** - 10x performance improvement
3. **Use peek()** - 30-50% fewer re-runs
4. **Add effect cleanup** - Eliminates memory leaks
5. **Use Each() for lists** - 100x faster for large lists

---

## Related Resources

- [Common Fixes](../../fia-fix/patterns/common-fixes.md)
- [Performance Analyzer Agent](../../../agents/performance-analyzer.md)
- [Component Patterns](../../../agents/component-builder.md)
