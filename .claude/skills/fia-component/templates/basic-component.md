# Basic Component Template

This template creates a simple Fia component with basic reactive state and DOM structure.

## Template

```typescript
import { div, h2, p, button, $ } from "fia";

/**
 * {ComponentName} - {Brief description}
 *
 * {Detailed description of what this component does and when to use it}
 *
 * @example
 * ```typescript
 * {ComponentName}({ /* props */ });
 * ```
 *
 * @param props - Component properties
 * @returns {SmartElement<"div">} The component element
 */
export const {ComponentName} = (props: {
  // Define props here with JSDoc comments
  /**
   * Example prop description
   * @default defaultValue
   */
  exampleProp?: string;
} = {}) => {
  // Initialize reactive state
  const state = $({
    // Define initial state properties
    value: props.exampleProp ?? "default",
    count: 0,
    isActive: false,
  });

  // Computed values (derived state)
  const displayValue = $(() => {
    return state.isActive ? state.value.toUpperCase() : state.value;
  });

  // Event handlers
  const handleClick = () => {
    state.count++;
    state.isActive = !state.isActive;
  };

  // Effects for side effects
  $e(() => {
    console.log("{ComponentName} state:", state);
    // Return cleanup if needed
    // return () => { /* cleanup */ };
  });

  // Render component
  return div({ class: "{component-name}" }, () => {
    h2({ textContent: "{ComponentName}" });

    p({
      textContent: $(() => `Value: ${displayValue.value}`),
    });

    p({
      textContent: $(() => `Count: ${state.count}`),
    });

    button("Toggle", handleClick);
  });
};
```

## Key Features

- **Reactive State**: Uses signal or store for state management
- **Computed Values**: Derives values from state reactively
- **Event Handlers**: Handles user interactions
- **Type Safety**: Props interface with JSDoc documentation
- **Effects**: Side effects with optional cleanup

## Customization Points

1. **Props Interface**: Add component-specific props
2. **State**: Define initial state shape
3. **Computed**: Add derived values as needed
4. **Event Handlers**: Implement component-specific interactions
5. **Effects**: Add side effects for logging, API calls, etc.
6. **DOM Structure**: Customize the element tree

## Example Customizations

### Counter Component
```typescript
export const Counter = (props: { initial?: number } = {}) => {
  const count = $(props.initial ?? 0);

  return div({ class: "counter" }, () => {
    p({ textContent: $(() => `Count: ${count.value}`) });
    button("+", () => count.value++);
    button("-", () => count.value--);
    button("Reset", () => (count.value = 0));
  });
};
```

### Toggle Component
```typescript
export const Toggle = (props: {
  initial?: boolean;
  onToggle?: (value: boolean) => void;
} = {}) => {
  const isOn = $(props.initial ?? false);

  const handleToggle = () => {
    isOn.value = !isOn.value;
    props.onToggle?.(isOn.value);
  };

  return div({ class: "toggle" }, () => {
    button(
      {
        class: $(() => (isOn.value ? "toggle-on" : "toggle-off")),
        textContent: $(() => (isOn.value ? "ON" : "OFF")),
      },
      handleToggle
    );
  });
};
```

### Status Badge Component
```typescript
export const StatusBadge = (props: {
  status: "success" | "warning" | "error";
  message?: string;
}) => {
  const statusColors = {
    success: "green",
    warning: "orange",
    error: "red",
  };

  return div(
    {
      class: "status-badge",
      style: {
        backgroundColor: statusColors[props.status],
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
      },
    },
    () => {
      span({ textContent: props.message ?? props.status });
    }
  );
};
```

## Best Practices

1. **Use Computed for Derived State** - Not effects
2. **Keep State Minimal** - Only store what can't be computed
3. **Type All Props** - Use TypeScript interfaces
4. **Clean Up Effects** - Return disposal functions when needed
5. **Use Text Shortcuts** - `h1("Title")` instead of `h1({ textContent: "Title" })`
6. **Batch Updates** - Use `batch()` for multiple state changes
7. **Descriptive Names** - Clear, semantic component and prop names
