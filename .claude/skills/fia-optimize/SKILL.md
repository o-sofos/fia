---
name: fia-optimize
description: Optimize Fia components for better performance. Use when code is slow, has excessive re-renders, or needs reactive optimization.
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Edit, Bash
argument-hint: [file-path]
context: fork
agent: general-purpose
---

# Fia Optimize Skill

Analyzes and optimizes Fia code for better performance, reducing unnecessary re-renders and improving reactive efficiency.

## Usage

```bash
/fia-optimize [file-path]
```

## Arguments

- `$0` (optional): File path to analyze and optimize
  - If provided, optimizes that specific file
  - If omitted, analyzes current file or recently modified Fia files

## What This Skill Optimizes

### 1. Batch Multiple Updates

**Detects:**
- Sequential signal assignments
- Multiple related state changes
- Effects running multiple times per operation

**Optimizes:**
```typescript
// Before: Effects run 3 times
const updateUser = (user) => {
  name.value = user.name;
  email.value = user.email;
  age.value = user.age;
};

// After: Effects run once
const updateUser = (user) => {
  batch(() => {
    name.value = user.name;
    email.value = user.email;
    age.value = user.age;
  });
};
```

### 2. Convert Effects to Computed

**Detects:**
- Effects that only update another signal
- Derived state implemented as effects
- Unnecessary signal assignments

**Optimizes:**
```typescript
// Before: Effect runs on every count change
const doubled = $(0);
$e(() => {
  doubled.value = count.value * 2;
});

// After: Lazy-evaluated computed
const doubled = $(() => count.value * 2);
```

### 3. Use peek() for Non-Reactive Reads

**Detects:**
- Conditional dependencies that shouldn't trigger re-runs
- Static values read reactively
- Unnecessary effect dependencies

**Optimizes:**
```typescript
// Before: Re-runs when threshold changes
$e(() => {
  if (count.value > threshold.value) {
    process(count.value);
  }
});

// After: Only re-runs when count changes
$e(() => {
  if (count.value > threshold.peek()) {
    process(count.value);
  }
});
```

### 4. Optimize Signal Granularity

**Detects:**
- Too many individual signals for related data
- Object state not using stores
- Inefficient state organization

**Optimizes:**
```typescript
// Before: Many individual signals
const firstName = $("");
const lastName = $("");
const age = $(0);
const email = $("");

// After: Single store with property reactivity
const user = $({
  firstName: "",
  lastName: "",
  age: 0,
  email: ""
}, "firstName", "lastName", "age", "email");
```

### 5. Optimize List Rendering

**Detects:**
- Manual list updates instead of Each()
- Re-creating all list items on changes
- Missing keys for list items

**Optimizes:**
```typescript
// Before: Re-creates all items
$e(() => {
  container.innerHTML = "";
  items.value.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    container.appendChild(li);
  });
});

// After: Efficient keyed updates
ul(() => {
  Each(
    () => items.value,
    (item) => li({ textContent: item.name }),
    (item) => item.id // Optional key function
  );
});
```

### 6. Minimize DOM Updates

**Detects:**
- Multiple separate reactive style updates
- Frequent class changes
- Inefficient DOM manipulation

**Optimizes:**
```typescript
// Before: Two separate effects for styles
$e(() => {
  element.style.color = color.value;
});
$e(() => {
  element.style.backgroundColor = bg.value;
});

// After: Single reactive style object
div({
  style: {
    color: $(() => color.value),
    backgroundColor: $(() => bg.value)
  }
});
```

### 7. Reduce Computed Complexity

**Detects:**
- Expensive computations that run too often
- Computations that could be cached
- Nested computed signals that could be flattened

**Optimizes:**
By breaking down complex computations into smaller, cacheable pieces.

### 8. Optimize Effect Dependencies

**Detects:**
- Effects with too many dependencies
- Dependencies that change frequently
- Nested reads that create unintended dependencies

**Optimizes:**
By restructuring effects to have minimal, focused dependencies.

## How It Works

1. **Profile Code** - Analyzes reactive patterns and dependencies
2. **Identify Bottlenecks** - Finds performance issues
3. **Calculate Impact** - Estimates improvement from each optimization
4. **Apply Optimizations** - Implements safe, high-impact changes
5. **Verify** - Runs type check and suggests testing
6. **Report** - Shows before/after and performance impact

## Optimization Categories

### Safe Optimizations (Applied automatically)
- Adding batch() for sequential updates
- Using peek() for conditional reads
- Converting simple effects to computed
- Using Each() for lists

### Impact Optimizations (Require confirmation)
- Restructuring state into stores
- Changing effect dependencies
- Refactoring complex computations
- Architectural changes

### Suggested Optimizations (Manual implementation)
- Adding virtualization for large lists
- Implementing debouncing/throttling
- Using web workers for heavy computation
- Caching strategies

## Output Format

```
# Fia Optimization Report

## File: src/components/Dashboard.ts

### Performance Analysis

**Current Issues:**
- Effects running 10x more than necessary
- Unbatched updates causing multiple re-renders
- Derived state using effects instead of computed

**Estimated Impact:** 3-5x faster reactive updates

### Applied Optimizations ✅

1. **Batched user updates (line 42-45)**
   - Before: 3 separate assignments
   - After: Single batch() call
   - Impact: Effects run 1x instead of 3x

2. **Converted to computed (line 58-61)**
   - Before: Effect updating doubled signal
   - After: Computed signal
   - Impact: Lazy evaluation, no unnecessary updates

3. **Added peek() for threshold (line 73)**
   - Before: Dependency on threshold.value
   - After: Non-reactive threshold.peek()
   - Impact: 50% fewer effect re-runs

### Suggested Optimizations ⚠️

1. **Use store for user state (line 30-34)**
   - Current: 4 separate signals (firstName, lastName, age, email)
   - Suggested: Single store with property reactivity
   - Impact: Better organization, potential performance gain
   - Apply? [Y/n]

### Performance Tips 💡

1. **Consider virtualization (line 95)**
   - List has 500+ items
   - Consider using virtual scrolling
   - Example: https://...

2. **Debounce search input (line 110)**
   - Search runs on every keystroke
   - Consider debouncing by 300ms
   - Add: `debounce(() => search(query.value), 300)`

## Summary
- 3 optimizations applied automatically
- 1 suggested optimization pending
- 2 performance tips for consideration
- Type check: ✅ Passed
- Estimated improvement: 3-5x faster
```

## Optimization Checklist

This skill follows the systematic checklist from [guides/optimization-checklist.md](guides/optimization-checklist.md):

- [ ] Reactivity optimization (computed, peek, batch, stores)
- [ ] Effect optimization (minimal, no nesting, cleanup)
- [ ] DOM optimization (fragment batching, event delegation)
- [ ] List rendering (Each(), keys, batching)
- [ ] Memory management (cleanup, disposal, weak refs)
- [ ] Type safety (correct types, validation)

## Examples

### Optimize current file
```bash
/fia-optimize
```

### Optimize specific component
```bash
/fia-optimize src/components/Dashboard.ts
```

### Optimize all components in directory
```bash
/fia-optimize src/components/
```

## Integration with Other Tools

- Use `/fia-fix` first to fix pattern issues
- Run `performance-analyzer` agent for deep analysis
- Use `/fia-docs` to document optimization decisions
- Test before and after with benchmarks

## Reference

See [guides/optimization-checklist.md](guides/optimization-checklist.md) for the complete optimization checklist and strategies.
