---
name: fia-component
description: Create a new Fia component with proper reactive patterns. Use when scaffolding new components or UI elements.
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Edit, Bash
argument-hint: [component-name] [optional: type=basic|form|list]
---

# Fia Component Builder Skill

Creates a new Fia component with proper structure and patterns following Fia best practices.

## Usage

```bash
/fia-component ComponentName [type]
```

## Arguments

- `$0` (required): Component name in PascalCase (e.g., `UserProfile`, `TodoList`, `LoginForm`)
- `$1` (optional): Component type - one of:
  - `basic` - Simple display component with basic state
  - `form` - Form component with validation and submission
  - `list` - List component with Each() for reactive rendering
  - If omitted, the skill will infer from the component name

## What This Skill Does

1. **Analyzes component requirements** from name and type
2. **Selects appropriate template** from the templates directory
3. **Generates TypeScript code** with:
   - Proper signal/store usage
   - Type-safe props interface
   - Reactive rendering patterns
   - Event handlers
   - JSDoc documentation
4. **Creates test file** with basic test structure
5. **Verifies compilation** using `bun tsc --noEmit`

## Templates

This skill uses the following templates:

- **[basic-component.md](templates/basic-component.md)** - Simple component with:
  - State signals
  - Reactive computed values
  - Basic DOM structure
  - Event handlers

- **[form-component.md](templates/form-component.md)** - Form component with:
  - Form state store
  - Validation logic
  - Error handling
  - Submit handler
  - Input bindings

- **[list-component.md](templates/list-component.md)** - List component with:
  - Array signal for items
  - Each() for efficient rendering
  - Add/remove operations
  - Item state management

## Examples

### Create a basic counter component

```bash
/fia-component Counter basic
```

Generates:

```typescript
import { div, button, p, $ } from "fia";

/**
 * Counter component with increment/decrement controls
 */
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

### Create a login form

```bash
/fia-component LoginForm form
```

Generates a form component with email/password inputs, validation, and submit handling.

### Create a todo list

```bash
/fia-component TodoList list
```

Generates a list component with Each(), add/remove operations, and item state.

## Component Naming Inference

If no type is specified, the skill infers from the component name:

- Names ending in "Form" → `form` type
- Names ending in "List" → `list` type
- Names containing "Input", "Select", "Field" → `form` type
- Everything else → `basic` type

Examples:

- `UserForm` → form template
- `ProductList` → list template
- `EmailInput` → form template
- `StatusBadge` → basic template

## Output Location

Components are created in:

- `src/components/{ComponentName}.ts` - Component implementation
- `src/components/{ComponentName}.test.ts` - Component tests

If these directories don't exist, the skill will create them.

## After Creation

The skill will:

1. Report the files created
2. Show a summary of the component structure
3. Run type checking to verify compilation
4. Suggest next steps (adding styles, implementing logic, etc.)

## See Also

- [Usage Examples](examples/usage-examples.md) - More detailed examples
- [Component Patterns](../../agents/component-builder.md) - Full component patterns guide
- `/fia-fix` - Fix common component issues
- `/fia-optimize` - Optimize component performance
