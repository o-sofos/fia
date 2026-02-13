# Common Fia Pattern Fixes

This document catalogs common Fia coding mistakes and their automatic fixes.

## 1. Missing `.value` in Reactive Contexts

### Pattern Detection

**In Computed Signals:**
```typescript
// ❌ Pattern: Signal used without .value in computed
const doubled = $(() => count * 2);
const fullName = $(() => firstName + " " + lastName);
```

**Fix:**
```typescript
// ✅ Fixed: Access signal value
const doubled = $(() => count.value * 2);
const fullName = $(() => firstName.value + " " + lastName.value);
```

**Regex Pattern:**
```regex
\$\(\(\) => .*\b(\w+)(?!\.value)\b.*\)
```

### In Effects

```typescript
// ❌ Pattern: Signal used without .value in effect
$e(() => {
  console.log(name);
  updateTitle(count);
});
```

**Fix:**
```typescript
// ✅ Fixed: Access signal value
$e(() => {
  console.log(name.value);
  updateTitle(count.value);
});
```

## 2. Event Handler Issues

### Using `e.target` Instead of `e.currentTarget`

```typescript
// ❌ Pattern: e.target in event handler
button({
  onclick: (e) => {
    const value = e.target.value;
    handleClick(e.target);
  }
});

input({
  oninput: (e) => value.value = e.target.value
});
```

**Fix:**
```typescript
// ✅ Fixed: Use e.currentTarget
button({
  onclick: (e) => {
    const value = e.currentTarget.value;
    handleClick(e.currentTarget);
  }
});

input({
  oninput: (e) => value.value = e.currentTarget.value
});
```

**Regex Pattern:**
```regex
e\.target(?!\.contains|\.matches|\.closest)
```

### Missing Event Type Annotations

```typescript
// ❌ Pattern: Untyped event handler
onclick: (e) => { ... }
oninput: (e) => { ... }
```

**Fix:**
```typescript
// ✅ Fixed: Typed event handler
onclick: (e: TypedEvent<HTMLButtonElement, MouseEvent>) => { ... }
oninput: (e: TypedEvent<HTMLInputElement, InputEvent>) => { ... }
```

## 3. Missing Effect Cleanup

### Timers Without Cleanup

```typescript
// ❌ Pattern: setInterval/setTimeout without cleanup
$e(() => {
  setInterval(() => tick(), 1000);
});

$e(() => {
  setTimeout(() => action(), 5000);
});
```

**Fix:**
```typescript
// ✅ Fixed: Return cleanup function
$e(() => {
  const timer = setInterval(() => tick(), 1000);
  return () => clearInterval(timer);
});

$e(() => {
  const timer = setTimeout(() => action(), 5000);
  return () => clearTimeout(timer);
});
```

### Event Listeners Without Removal

```typescript
// ❌ Pattern: addEventListener without cleanup
$e(() => {
  window.addEventListener("resize", handleResize);
  document.addEventListener("click", handleClick);
});
```

**Fix:**
```typescript
// ✅ Fixed: Remove listeners in cleanup
$e(() => {
  window.addEventListener("resize", handleResize);
  document.addEventListener("click", handleClick);

  return () => {
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("click", handleClick);
  };
});
```

## 4. Static vs. Reactive Content

### Static String Interpolation

```typescript
// ❌ Pattern: Static template literal with signal
p({ textContent: `Count: ${count.value}` });
h1({ textContent: `Hello ${name.value}!` });

div({
  innerHTML: `<strong>${message.value}</strong>`
});
```

**Fix:**
```typescript
// ✅ Fixed: Computed signal for reactive text
p({ textContent: $(() => `Count: ${count.value}`) });
h1({ textContent: $(() => `Hello ${name.value}!`) });

div({
  innerHTML: $(() => `<strong>${message.value}</strong>`)
});
```

**Detection:**
- Template literal in textContent/innerHTML
- Contains `.value` access
- Not wrapped in $(() => ...)

## 5. Unbatched Multiple Updates

### Sequential Signal Assignments

```typescript
// ❌ Pattern: Multiple separate updates
function updateUser(user: User) {
  name.value = user.name;
  email.value = user.email;
  age.value = user.age;
}

// ❌ Pattern: Related state changes
function reset() {
  count.value = 0;
  isActive.value = false;
  error.value = null;
}
```

**Fix:**
```typescript
// ✅ Fixed: Batch updates
import { batch } from "fia";

function updateUser(user: User) {
  batch(() => {
    name.value = user.name;
    email.value = user.email;
    age.value = user.age;
  });
}

function reset() {
  batch(() => {
    count.value = 0;
    isActive.value = false;
    error.value = null;
  });
}
```

**Detection:**
- 3+ consecutive `.value =` assignments
- Within same function scope
- Not already in batch()

## 6. Effect for Derived State

### Signal Assignment in Effect

```typescript
// ❌ Pattern: Effect updating another signal
const doubled = $(0);
$e(() => {
  doubled.value = count.value * 2;
});

const fullName = $("");
$e(() => {
  fullName.value = `${firstName.value} ${lastName.value}`;
});
```

**Fix:**
```typescript
// ✅ Fixed: Use computed signal
const doubled = $(() => count.value * 2);

const fullName = $(() => `${firstName.value} ${lastName.value}`);
```

**Detection:**
- Effect body contains only signal assignment
- Right side derives from other signals
- No other side effects

## 7. Incorrect Signal Initialization

### Missing Type Parameter

```typescript
// ❌ Pattern: Complex type without generic
const items = $([]);
const user = $(null);
```

**Fix:**
```typescript
// ✅ Fixed: Explicit type parameter
const items = $<Item[]>([]);
const user = $<User | null>(null);
```

## 8. Context Issues

### Elements Outside Execution Context

```typescript
// ❌ Pattern: Element created in effect
$e(() => {
  const el = div({ textContent: count.value });
  container.appendChild(el);
});
```

**Fix:**
```typescript
// ✅ Fixed: Reactive content in element factory
div(() => {
  div({ textContent: $(() => count.value) });
});
```

### Missing Parent Context

```typescript
// ❌ Pattern: Elements created at top level
const el1 = div("Hello");
const el2 = p("World");

export function Component() {
  // ...
}
```

**Fix:**
```typescript
// ✅ Fixed: Elements created in factory context
export function Component() {
  return div(() => {
    div("Hello");
    p("World");
  });
}
```

## 9. List Rendering Anti-Patterns

### Manual List Updates

```typescript
// ❌ Pattern: Manual DOM manipulation for lists
$e(() => {
  container.innerHTML = "";
  items.value.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    container.appendChild(li);
  });
});
```

**Fix:**
```typescript
// ✅ Fixed: Use Each() for efficient updates
import { Each } from "fia";

ul(() => {
  Each(
    () => items.value,
    (item) => li({ textContent: item.name }),
    (item) => item.id // Optional key function
  );
});
```

### Creating Functions in Render

```typescript
// ❌ Pattern: Function created per item
Each(
  () => items.value,
  (item) => li(() => {
    button("Delete", () => removeItem(item.id)); // Creates new function each render
  })
);
```

**Fix:**
```typescript
// ✅ Fixed: Stable function reference
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

## 10. Peek vs. Value

### Unnecessary Reactive Reads

```typescript
// ❌ Pattern: Reads that create unnecessary dependencies
$e(() => {
  if (count.value > threshold.value) {
    process(count.value);
  }
});

$e(() => {
  const max = maxValue.value; // Only used once, doesn't need reactivity
  if (current.value > max) {
    reset();
  }
});
```

**Fix:**
```typescript
// ✅ Fixed: Use peek() for non-reactive reads
import { peek } from "fia";

$e(() => {
  if (count.value > threshold.peek()) {
    process(count.value);
  }
});

$e(() => {
  const max = maxValue.peek(); // Non-reactive read
  if (current.value > max) {
    reset();
  }
});
```

**Detection:**
- Value read in condition but shouldn't trigger re-run
- Value read once and never changes
- Static configuration values

## 11. Store Misuse

### Multiple Related Signals

```typescript
// ❌ Pattern: Many signals for one entity
const firstName = $("");
const lastName = $("");
const email = $("");
const age = $(0);
const address = $("");
```

**Fix:**
```typescript
// ✅ Fixed: Use store for object state
const user = $({
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
  address: ""
}, "firstName", "lastName", "email", "age", "address");
```

**Detection:**
- 4+ signals with related naming (same prefix)
- Signals often updated together
- Represent properties of same entity

## 12. Void Elements with Children

### Children on Void Elements

```typescript
// ❌ Pattern: Void element with children callback
input({}, () => {
  span("Invalid");
});

br(() => {
  div("Also invalid");
});
```

**Fix:**
```typescript
// ✅ Fixed: Remove children from void elements
input({});

br();
```

**Void Elements:**
- `input`, `br`, `hr`, `img`, `meta`, `link`, `area`, `base`, `col`, `embed`, `param`, `source`, `track`, `wbr`

## Detection Strategies

### AST-Based Detection
Use TypeScript compiler API to:
1. Parse source file
2. Walk AST nodes
3. Identify patterns
4. Apply transformations

### Regex-Based Detection (Simpler Patterns)
Use regex for quick pattern matching:
1. Scan file line-by-line
2. Match known anti-patterns
3. Suggest or apply fixes
4. Verify with type check

### Heuristic-Based Detection
Combine multiple signals:
1. Variable naming patterns
2. Function call patterns
3. Code structure
4. Type annotations

## Fix Confidence Levels

### High Confidence (Auto-fix)
- Missing `.value` in obvious contexts
- `e.target` → `e.currentTarget`
- Static to reactive content

### Medium Confidence (Suggest)
- Effect cleanup patterns
- Batching opportunities
- Computed vs. effect

### Low Confidence (Report Only)
- Complex refactoring
- Architectural changes
- Context-dependent fixes

## Testing Fixes

After applying fixes:
1. Run TypeScript type check: `bun tsc --noEmit`
2. Run unit tests: `bun test`
3. Verify runtime behavior
4. Check for regressions

## Related Tools

- `/fia-optimize` - Performance optimizations
- `pattern-validator` agent - Verify best practices
- `refactor-helper` agent - Larger refactorings
