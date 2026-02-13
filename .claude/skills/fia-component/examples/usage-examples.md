# Fia Component Usage Examples

Comprehensive examples demonstrating how to use the `/fia-component` skill effectively.

## Basic Usage

### Create a Simple Component

```bash
/fia-component StatusIndicator basic
```

**Result:** Creates a basic component in `src/components/StatusIndicator.ts`

```typescript
import { div, span, $ } from "fia";

export const StatusIndicator = (props: {
  status: "online" | "offline" | "away";
} = {}) => {
  const statusColor = $(() => {
    switch (props.status) {
      case "online":
        return "green";
      case "away":
        return "yellow";
      case "offline":
        return "red";
    }
  });

  return div({ class: "status-indicator" }, () => {
    span({
      class: "status-dot",
      style: {
        backgroundColor: statusColor.value,
      },
    });
    span({ textContent: props.status });
  });
};
```

### Create a Form Component

```bash
/fia-component RegistrationForm form
```

**Result:** Creates a form component with validation:

```typescript
import { form, div, input, button, label, p, $, batch } from "fia";

interface RegistrationFormData {
  username: string;
  email: string;
  password: string;
}

export const RegistrationForm = (props: {
  onSubmit: (data: RegistrationFormData) => Promise<void>;
}) => {
  const formData = $(
    {
      username: "",
      email: "",
      password: "",
    },
    "username",
    "email",
    "password"
  );

  const errors = $(
    {
      username: "",
      email: "",
      password: "",
    },
    "username",
    "email",
    "password"
  );

  // Validation and submission logic...
  // Full implementation following form-component template
};
```

### Create a List Component

```bash
/fia-component ProductList list
```

**Result:** Creates a list component with Each():

```typescript
import { div, ul, li, button, input, $, Each } from "fia";

interface ProductListItem {
  id: number;
  name: string;
  price: number;
}

export const ProductList = (props: {
  products?: ProductListItem[];
  onProductClick?: (product: ProductListItem) => void;
}) => {
  const items = $(props.products ?? []);

  return div({ class: "product-list" }, () => {
    ul(() => {
      Each(
        () => items.value,
        (product) => {
          li(
            {
              onclick: () => props.onProductClick?.(product),
            },
            () => {
              span({ textContent: product.name });
              span({ textContent: $(() => `$${product.price}`) });
            }
          );
        },
        (product) => product.id
      );
    });
  });
};
```

## Advanced Usage

### Inferred Component Types

The skill infers component type from naming conventions:

```bash
# These all create form components
/fia-component LoginForm
/fia-component SignupForm
/fia-component ContactForm
/fia-component EmailInput

# These all create list components
/fia-component UserList
/fia-component TodoList
/fia-component ItemList

# These create basic components
/fia-component Header
/fia-component Footer
/fia-component Navbar
/fia-component Card
```

### Complex Components

#### Modal Component

```bash
/fia-component Modal basic
```

Then customize with modal-specific logic:

```typescript
export const Modal = (props: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: () => void;
}) => {
  const isOpen = $(props.isOpen);

  // Close on Escape key
  $e(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    if (isOpen.value) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  });

  if (!isOpen.value) return null;

  return div({ class: "modal-overlay", onclick: props.onClose }, () => {
    div(
      {
        class: "modal-content",
        onclick: (e) => e.stopPropagation(),
      },
      () => {
        if (props.title) {
          div({ class: "modal-header" }, () => {
            h2({ textContent: props.title });
            button("×", props.onClose);
          });
        }

        div({ class: "modal-body" }, props.children);
      }
    );
  });
};
```

#### Autocomplete Component

```bash
/fia-component Autocomplete form
```

Customize for autocomplete functionality:

```typescript
export const Autocomplete = (props: {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}) => {
  const query = $("");
  const isOpen = $(false);
  const selectedIndex = $(0);

  const filteredOptions = $(() => {
    if (!query.value) return props.options;
    return props.options.filter((opt) =>
      opt.toLowerCase().includes(query.value.toLowerCase())
    );
  });

  const selectOption = (option: string) => {
    query.value = option;
    isOpen.value = false;
    props.onSelect(option);
  };

  return div({ class: "autocomplete" }, () => {
    input({
      type: "text",
      value: query.value,
      oninput: (e) => {
        query.value = e.currentTarget.value;
        isOpen.value = true;
      },
      onfocus: () => (isOpen.value = true),
      placeholder: props.placeholder,
    });

    if (isOpen.value && filteredOptions.value.length > 0) {
      ul({ class: "autocomplete-dropdown" }, () => {
        Each(
          () => filteredOptions.value,
          (option, index) => {
            li(
              {
                class: $(() =>
                  selectedIndex.value === index ? "selected" : ""
                ),
                onclick: () => selectOption(option),
              },
              () => {
                span({ textContent: option });
              }
            );
          }
        );
      });
    }
  });
};
```

#### Tabs Component

```bash
/fia-component Tabs basic
```

Customize for tab navigation:

```typescript
interface Tab {
  id: string;
  label: string;
  content: () => void;
}

export const Tabs = (props: {
  tabs: Tab[];
  defaultTab?: string;
}) => {
  const activeTab = $(props.defaultTab ?? props.tabs[0]?.id ?? "");

  return div({ class: "tabs" }, () => {
    // Tab headers
    div({ class: "tab-headers" }, () => {
      Each(
        () => props.tabs,
        (tab) => {
          button(
            {
              class: $(() =>
                activeTab.value === tab.id ? "tab-active" : "tab-inactive"
              ),
              textContent: tab.label,
            },
            () => (activeTab.value = tab.id)
          );
        },
        (tab) => tab.id
      );
    });

    // Tab content
    div({ class: "tab-content" }, () => {
      const currentTab = $(() =>
        props.tabs.find((tab) => tab.id === activeTab.value)
      );

      if (currentTab.value) {
        currentTab.value.content();
      }
    });
  });
};
```

## Real-World Examples

### Dashboard Widget

```bash
/fia-component DashboardWidget basic
```

```typescript
export const DashboardWidget = (props: {
  title: string;
  value: number;
  change: number;
  icon?: string;
}) => {
  const isPositive = $(() => props.change >= 0);

  return div({ class: "dashboard-widget" }, () => {
    div({ class: "widget-header" }, () => {
      if (props.icon) {
        span({ class: "widget-icon", textContent: props.icon });
      }
      h3({ textContent: props.title });
    });

    div({ class: "widget-value" }, () => {
      span({
        class: "value",
        textContent: $(() => props.value.toLocaleString()),
      });
    });

    div({ class: "widget-change" }, () => {
      span({
        class: $(() => (isPositive.value ? "positive" : "negative")),
        textContent: $(() => {
          const prefix = isPositive.value ? "+" : "";
          return `${prefix}${props.change.toFixed(1)}%`;
        }),
      });
    });
  });
};
```

### Data Table

```bash
/fia-component DataTable list
```

```typescript
interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => string;
}

export const DataTable = <T extends { id: number | string }>(props: {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}) => {
  const sortColumn = $<keyof T | null>(null);
  const sortDirection = $<"asc" | "desc">("asc");

  const sortedData = $(() => {
    if (!sortColumn.value) return props.data;

    return [...props.data].sort((a, b) => {
      const aVal = a[sortColumn.value!];
      const bVal = b[sortColumn.value!];

      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDirection.value === "asc" ? comparison : -comparison;
    });
  });

  const handleSort = (column: keyof T) => {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
      sortColumn.value = column;
      sortDirection.value = "asc";
    }
  };

  return div({ class: "data-table" }, () => {
    table(() => {
      thead(() => {
        tr(() => {
          Each(
            () => props.columns,
            (column) => {
              th(
                {
                  onclick: () => handleSort(column.key),
                  class: $(() =>
                    sortColumn.value === column.key ? "sorted" : ""
                  ),
                },
                () => {
                  span({ textContent: column.label });
                  if (sortColumn.value === column.key) {
                    span({
                      textContent: sortDirection.value === "asc" ? "↑" : "↓",
                    });
                  }
                }
              );
            },
            (column) => String(column.key)
          );
        });
      });

      tbody(() => {
        Each(
          () => sortedData.value,
          (row) => {
            tr(
              {
                onclick: () => props.onRowClick?.(row),
              },
              () => {
                Each(
                  () => props.columns,
                  (column) => {
                    td(() => {
                      const value = row[column.key];
                      const text = column.render
                        ? column.render(value, row)
                        : String(value);
                      span({ textContent: text });
                    });
                  },
                  (column) => String(column.key)
                );
              }
            );
          },
          (row) => row.id
        );
      });
    });
  });
};
```

## Tips and Tricks

### 1. Component Composition

Build complex components by composing simpler ones:

```typescript
export const UserProfile = () => {
  return div({ class: "user-profile" }, () => {
    Avatar({ size: "large", url: user.avatar });
    UserInfo({ name: user.name, email: user.email });
    StatusBadge({ status: user.status });
  });
};
```

### 2. Reusable Patterns

Extract common patterns into utilities:

```typescript
// Utility for creating form fields
const FormField = (props: {
  label: string;
  type: string;
  value: Signal<string>;
  error?: string;
}) => {
  return div({ class: "form-field" }, () => {
    label({ textContent: props.label });
    input({
      type: props.type,
      value: props.value.value,
      oninput: (e) => (props.value.value = e.currentTarget.value),
    });
    if (props.error) {
      p({ class: "error", textContent: props.error });
    }
  });
};
```

### 3. Conditional Rendering

Use computed signals for conditional UI:

```typescript
const showAdvanced = $(false);

return div(() => {
  button("Toggle Advanced", () => (showAdvanced.value = !showAdvanced.value));

  if (showAdvanced.value) {
    div({ class: "advanced-options" }, () => {
      // Advanced UI
    });
  }
});
```

### 4. Dynamic Styles

Use computed signals for dynamic styling:

```typescript
const theme = $("light");

div({
  style: {
    backgroundColor: $(() => (theme.value === "light" ? "white" : "black")),
    color: $(() => (theme.value === "light" ? "black" : "white")),
  },
});
```

## Next Steps

After creating components with `/fia-component`:

1. **Fix Issues**: Use `/fia-fix` to correct any anti-patterns
2. **Optimize**: Use `/fia-optimize` for performance improvements
3. **Document**: Use `/fia-docs` to generate documentation
4. **Test**: Write tests for component behavior
5. **Style**: Add CSS/styles for visual appearance
6. **Integrate**: Use component in your application

## Related Resources

- [Component Builder Agent](../../agents/component-builder.md)
- [Basic Component Template](../templates/basic-component.md)
- [Form Component Template](../templates/form-component.md)
- [List Component Template](../templates/list-component.md)
- [Fia Documentation](https://github.com/yourusername/fia)
