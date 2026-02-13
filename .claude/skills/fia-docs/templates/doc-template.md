# Documentation Template for Fia Components

This template provides a comprehensive structure for documenting Fia components.

## JSDoc Template

### Component Documentation

```typescript
/**
 * {ComponentName} - {One-line description}
 *
 * {Detailed description explaining what the component does, when to use it,
 * and any important notes about its behavior or requirements.}
 *
 * @example
 * Basic usage
 * ```typescript
 * {ComponentName}({
 *   prop1: "value",
 *   prop2: 42
 * });
 * ```
 *
 * @example
 * Advanced usage
 * ```typescript
 * {ComponentName}({
 *   prop1: "value",
 *   prop2: 42,
 *   onEvent: (data) => {
 *     console.log("Event fired:", data);
 *   }
 * });
 * ```
 *
 * @param props - Component properties
 * @param props.prop1 - {Description of prop1}
 * @param props.prop2 - {Description of prop2} (default: {defaultValue})
 * @param props.onEvent - {Description of callback}
 *
 * @returns {SmartElement<"div">} The component element
 *
 * @see {@link RelatedComponent} for related functionality
 * @see {@link https://docs.example.com} for documentation
 *
 * @since v1.0.0
 * @public
 */
export const {ComponentName} = (props: {ComponentName}Props) => {
  // Implementation
};
```

### Props Interface Documentation

```typescript
/**
 * Props for {@link {ComponentName}} component
 *
 * @public
 */
export interface {ComponentName}Props {
  /**
   * {Property description}
   *
   * @remarks
   * {Additional details, constraints, or behavior notes}
   *
   * @example
   * ```typescript
   * prop1: "example value"
   * ```
   *
   * @defaultValue {default value or "undefined"}
   */
  prop1: string;

  /**
   * {Property description}
   *
   * @optional
   * @defaultValue 0
   */
  prop2?: number;

  /**
   * Callback fired when {event description}
   *
   * @param data - {Data passed to callback}
   *
   * @example
   * ```typescript
   * onEvent: (data) => {
   *   console.log("Event:", data);
   * }
   * ```
   */
  onEvent?: (data: EventData) => void;
}
```

### Type Documentation

```typescript
/**
 * {Type description}
 *
 * @public
 */
export type {TypeName} = {
  /** {Field description} */
  field1: string;

  /** {Field description} */
  field2: number;
};
```

### Signal Documentation

```typescript
/**
 * Internal state signals
 *
 * @internal
 */
const internalState = $(initialValue);

/**
 * Computed value derived from {dependencies}
 *
 * @remarks
 * This value is lazy-evaluated and only recomputes when dependencies change.
 *
 * @internal
 */
const computedValue = $(() => derivation);
```

### Effect Documentation

```typescript
/**
 * Effect that {what it does}
 *
 * @remarks
 * - Runs when {dependencies} change
 * - Cleanup: {what cleanup does}
 *
 * @internal
 */
$e(() => {
  // Effect implementation
  return () => {
    // Cleanup
  };
});
```

---

## Markdown Template

### Component README

```markdown
# {ComponentName}

{One-line description}

## Overview

{Detailed description of the component, its purpose, and when to use it.}

## Features

- {Feature 1}
- {Feature 2}
- {Feature 3}

## Installation

\`\`\`bash
# If published as package
npm install fia-{component-name}

# Or import from local module
import { {ComponentName} } from "./components/{ComponentName}";
\`\`\`

## Usage

### Basic Example

\`\`\`typescript
import { {ComponentName} } from "fia-{component-name}";

// Create component
{ComponentName}({
  prop1: "value",
  prop2: 42
});
\`\`\`

### Advanced Example

\`\`\`typescript
import { {ComponentName}, type {ComponentName}Props } from "fia-{component-name}";

const props: {ComponentName}Props = {
  prop1: "value",
  prop2: 42,
  onEvent: (data) => {
    console.log("Event:", data);
  }
};

{ComponentName}(props);
\`\`\`

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `prop1` | `string` | - | ✅ | {Description} |
| `prop2` | `number` | `0` | ❌ | {Description} |
| `onEvent` | `(data: EventData) => void` | - | ❌ | {Description} |

### Prop Details

#### `prop1`

{Detailed description of prop1}

**Type:** `string`

**Required:** Yes

**Example:**
\`\`\`typescript
prop1: "example value"
\`\`\`

#### `prop2`

{Detailed description of prop2}

**Type:** `number`

**Required:** No

**Default:** `0`

**Example:**
\`\`\`typescript
prop2: 42
\`\`\`

#### `onEvent`

{Detailed description of callback}

**Type:** `(data: EventData) => void`

**Required:** No

**Parameters:**
- `data: EventData` - {Description of data parameter}

**Example:**
\`\`\`typescript
onEvent: (data) => {
  console.log("Event fired with data:", data);
}
\`\`\`

## Events

### {EventName}

Fired when {condition}

**Callback:** `(data: EventData) => void`

**Data:**
\`\`\`typescript
interface EventData {
  field1: string;
  field2: number;
}
\`\`\`

**Example:**
\`\`\`typescript
{ComponentName}({
  on{EventName}: (data) => {
    console.log(data.field1, data.field2);
  }
});
\`\`\`

## Methods

If component returns methods:

### `methodName(param: Type): ReturnType`

{Description of what the method does}

**Parameters:**
- `param: Type` - {Description}

**Returns:** `ReturnType` - {Description}

**Example:**
\`\`\`typescript
const component = {ComponentName}({ /* props */ });
component.methodName(value);
\`\`\`

## Styling

### CSS Classes

The component uses the following CSS classes:

| Class | Element | Description |
|-------|---------|-------------|
| `{component-name}` | Root container | Main component wrapper |
| `{component-name}__element` | Child element | {Description} |
| `{component-name}--modifier` | Modified state | {Description} |

### Custom Styling

\`\`\`css
.{component-name} {
  /* Custom styles */
}

.{component-name}__element {
  /* Element styles */
}

.{component-name}--active {
  /* Active state styles */
}
\`\`\`

## Accessibility

- ✅ Keyboard navigation: {describe support}
- ✅ ARIA attributes: {list attributes}
- ✅ Screen reader: {describe support}
- ✅ Focus management: {describe behavior}

### ARIA Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `{role}` | {Purpose} |
| `aria-label` | `{label}` | {Purpose} |
| `aria-describedby` | `{id}` | {Purpose} |

## Examples

### Example 1: {Scenario Name}

{Description of scenario}

\`\`\`typescript
{ComponentName}({
  // Configuration for this scenario
});
\`\`\`

**Result:** {Expected outcome}

### Example 2: {Scenario Name}

{Description of scenario}

\`\`\`typescript
{ComponentName}({
  // Configuration for this scenario
});
\`\`\`

**Result:** {Expected outcome}

## State Management

### Internal State

The component maintains the following internal state:

| State | Type | Description |
|-------|------|-------------|
| `state1` | `Signal<Type>` | {Description} |
| `state2` | `Computed<Type>` | {Description} |

### Computed Values

| Computed | Derived From | Description |
|----------|--------------|-------------|
| `computed1` | `state1, state2` | {Description} |

## Performance

### Optimization Tips

1. {Tip 1}
2. {Tip 2}
3. {Tip 3}

### Performance Characteristics

- **Render Time:** {metric}
- **Memory Usage:** {metric}
- **Re-render Cost:** {description}

## Testing

### Unit Tests

\`\`\`typescript
import { describe, it, expect } from "bun:test";
import { {ComponentName} } from "./{ComponentName}";

describe("{ComponentName}", () => {
  it("should {test description}", () => {
    const component = {ComponentName}({ prop1: "test" });
    expect(component).toBeDefined();
  });

  it("should {test behavior}", () => {
    // Test implementation
  });
});
\`\`\`

### Integration Tests

\`\`\`typescript
describe("{ComponentName} integration", () => {
  it("should interact with {other component}", () => {
    // Integration test
  });
});
\`\`\`

## TypeScript

### Type Exports

\`\`\`typescript
export { {ComponentName} };
export type {
  {ComponentName}Props,
  {EventData},
  {CustomType}
};
\`\`\`

### Type Usage

\`\`\`typescript
import type { {ComponentName}Props } from "fia-{component-name}";

const props: {ComponentName}Props = {
  // Props with full type checking
};
\`\`\`

## Migration

### From Version X to Version Y

**Breaking Changes:**
1. {Change description}

**Migration Steps:**
1. {Step 1}
2. {Step 2}

**Before:**
\`\`\`typescript
// Old API
\`\`\`

**After:**
\`\`\`typescript
// New API
\`\`\`

## Troubleshooting

### Common Issues

#### Issue: {Problem Description}

**Cause:** {Why it happens}

**Solution:**
\`\`\`typescript
// Solution code
\`\`\`

#### Issue: {Problem Description}

**Cause:** {Why it happens}

**Solution:**
\`\`\`typescript
// Solution code
\`\`\`

## FAQ

### Q: {Question}

A: {Answer}

### Q: {Question}

A: {Answer}

## Related Components

- [{RelatedComponent}](./{RelatedComponent}.md) - {Description}
- [{AnotherComponent}](./{AnotherComponent}.md) - {Description}

## API Reference

Full API documentation: [API Docs](./api-reference.md)

## Changelog

### v1.1.0

- Added: {Feature}
- Fixed: {Bug}
- Changed: {Change}

### v1.0.0

- Initial release

## License

MIT

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## Support

- Documentation: {URL}
- Issues: {URL}
- Discussions: {URL}
```

---

## Quick Reference Card

### Minimal Documentation

For simple components, a minimal template:

```typescript
/**
 * {ComponentName} - {Brief description}
 *
 * @example
 * ```typescript
 * {ComponentName}({ prop: "value" });
 * ```
 */
export const {ComponentName} = (props: {
  /** {Prop description} */
  prop: string;
}) => {
  // Implementation
};
```

### Inline Comments

For internal implementation details:

```typescript
// Initialize reactive state
const state = $(initialValue);

// Compute derived value
const computed = $(() => {
  // Computation logic
  return result;
});

// Handle side effects
$e(() => {
  // Effect logic

  // Cleanup
  return () => {
    // Cleanup logic
  };
});
```

---

## Documentation Checklist

- [ ] Component has JSDoc comment with description
- [ ] All props are documented with types and descriptions
- [ ] Examples are provided (basic and advanced)
- [ ] Return type is specified
- [ ] Default values are documented
- [ ] Callbacks document their parameters
- [ ] Related components/types are cross-referenced
- [ ] Since/version information is included
- [ ] Public/internal visibility is marked
- [ ] README exists for complex components
- [ ] Props table is complete
- [ ] Examples are tested and work
- [ ] Types are exported
- [ ] Accessibility info is included
- [ ] Performance notes are provided

---

## Related Resources

- [Component Builder Agent](../../agents/component-builder.md)
- [Usage Examples](../fia-component/examples/usage-examples.md)
- [TypeScript Docs](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
