# List Component Template

This template creates a Fia list component with Each() for efficient reactive rendering, add/remove operations, and item state management.

## Template

```typescript
import { div, ul, li, button, input, span, $, Each, batch } from "fia";

/**
 * List item interface
 */
interface {ComponentName}Item {
  id: number | string;
  // Add item properties
  name: string;
  completed?: boolean;
}

/**
 * {ComponentName} - List component with reactive rendering
 *
 * {Detailed description of what the list displays and manages}
 *
 * @example
 * ```typescript
 * {ComponentName}({
 *   items: [{ id: 1, name: "Item 1" }],
 *   onItemsChange: (items) => console.log(items)
 * });
 * ```
 *
 * @param props - Component properties
 * @param props.items - Initial list items
 * @param props.onItemsChange - Callback when items change
 * @param props.onItemClick - Optional callback when item is clicked
 * @returns {SmartElement<"div">} The list component element
 */
export const {ComponentName} = (props: {
  items?: {ComponentName}Item[];
  onItemsChange?: (items: {ComponentName}Item[]) => void;
  onItemClick?: (item: {ComponentName}Item) => void;
} = {}) => {
  // List state
  const items = $<{ComponentName}Item[]>(props.items ?? []);

  // Input state for adding new items
  const newItemName = $("");

  // Selection state (optional)
  const selectedId = $<number | string | null>(null);

  // Filter/sort state (optional)
  const filterText = $("");
  const sortBy = $<"name" | "id">("name");

  // Computed values
  const filteredItems = $(() => {
    let result = items.value;

    // Apply filter
    if (filterText.value) {
      const query = filterText.value.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
    }

    // Apply sort
    result = [...result].sort((a, b) => {
      if (sortBy.value === "name") {
        return a.name.localeCompare(b.name);
      }
      return String(a.id).localeCompare(String(b.id));
    });

    return result;
  });

  const itemCount = $(() => items.value.length);
  const filteredCount = $(() => filteredItems.value.length);

  // Event handlers
  const addItem = () => {
    const name = newItemName.value.trim();
    if (!name) return;

    const newItem: {ComponentName}Item = {
      id: Date.now(), // Or use UUID
      name,
      completed: false,
    };

    items.value = [...items.value, newItem];
    newItemName.value = "";

    props.onItemsChange?.(items.value);
  };

  const removeItem = (id: number | string) => {
    items.value = items.value.filter((item) => item.id !== id);
    props.onItemsChange?.(items.value);
  };

  const updateItem = (id: number | string, updates: Partial<{ComponentName}Item>) => {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    props.onItemsChange?.(items.value);
  };

  const toggleComplete = (id: number | string) => {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    props.onItemsChange?.(items.value);
  };

  const selectItem = (id: number | string) => {
    selectedId.value = selectedId.value === id ? null : id;
  };

  const clearCompleted = () => {
    items.value = items.value.filter((item) => !item.completed);
    props.onItemsChange?.(items.value);
  };

  const clearAll = () => {
    items.value = [];
    props.onItemsChange?.(items.value);
  };

  // Keyboard shortcuts
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  // Render component
  return div({ class: "{component-name}" }, () => {
    // Header with stats
    div({ class: "list-header" }, () => {
      h2({ textContent: "{ComponentName}" });
      p({
        textContent: $(() =>
          `${filteredCount.value} of ${itemCount.value} items`
        ),
      });
    });

    // Add item input
    div({ class: "add-item" }, () => {
      input({
        type: "text",
        value: newItemName.value,
        oninput: (e) => (newItemName.value = e.currentTarget.value),
        onkeypress: handleKeyPress,
        placeholder: "Add new item...",
      });
      button("Add", addItem);
    });

    // Filter/Sort controls (optional)
    div({ class: "list-controls" }, () => {
      input({
        type: "text",
        value: filterText.value,
        oninput: (e) => (filterText.value = e.currentTarget.value),
        placeholder: "Filter items...",
      });

      select(
        {
          value: sortBy.value,
          onchange: (e) => (sortBy.value = e.currentTarget.value as "name" | "id"),
        },
        () => {
          option({ value: "name", textContent: "Sort by Name" });
          option({ value: "id", textContent: "Sort by ID" });
        }
      );
    });

    // List items
    ul({ class: "item-list" }, () => {
      Each(
        () => filteredItems.value,
        (item) => {
          li(
            {
              class: $(() =>
                selectedId.value === item.id ? "selected" : ""
              ),
              onclick: () => {
                selectItem(item.id);
                props.onItemClick?.(item);
              },
            },
            () => {
              // Checkbox for completed state
              input({
                type: "checkbox",
                checked: item.completed ?? false,
                onchange: (e) => {
                  e.stopPropagation();
                  toggleComplete(item.id);
                },
              });

              // Item name
              span({
                textContent: item.name,
                style: {
                  textDecoration: item.completed
                    ? "line-through"
                    : "none",
                },
              });

              // Delete button
              button(
                "Delete",
                (e) => {
                  e.stopPropagation();
                  removeItem(item.id);
                }
              );
            }
          );
        },
        (item) => item.id // Key function for efficient updates
      );
    });

    // Empty state
    if (filteredItems.value.length === 0) {
      div({ class: "empty-state" }, () => {
        p({
          textContent: filterText.value
            ? "No items match your filter"
            : "No items yet",
        });
      });
    }

    // Actions
    div({ class: "list-actions" }, () => {
      button("Clear Completed", clearCompleted);
      button("Clear All", clearAll);
    });
  });
};
```

## Key Features

- **Reactive List Rendering**: Uses Each() for efficient DOM updates
- **Add/Remove/Update**: Full CRUD operations on items
- **Filtering**: Search/filter items reactively
- **Sorting**: Sort items by different criteria
- **Selection**: Track selected item
- **Computed Stats**: Derived values like counts
- **Keyboard Support**: Enter to add items
- **Type Safety**: Typed item interface

## Customization Points

1. **Item Interface**: Define item structure and properties
2. **Operations**: Add custom item operations (edit, duplicate, etc.)
3. **Filtering**: Customize filter logic
4. **Sorting**: Add more sort options
5. **Item Rendering**: Customize how items are displayed
6. **Actions**: Add bulk operations
7. **Persistence**: Save to localStorage, API, etc.

## Example Customizations

### Todo List
```typescript
interface TodoItem {
  id: number;
  text: string;
  done: boolean;
  priority: "low" | "medium" | "high";
}

export const TodoList = () => {
  const items = $<TodoItem[]>([]);
  const newText = $("");

  const addTodo = () => {
    if (!newText.value.trim()) return;

    items.value = [
      ...items.value,
      {
        id: Date.now(),
        text: newText.value,
        done: false,
        priority: "medium",
      },
    ];
    newText.value = "";
  };

  const toggleDone = (id: number) => {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
  };

  return div(() => {
    ul(() => {
      Each(
        () => items.value,
        (item) => {
          li(() => {
            input({
              type: "checkbox",
              checked: item.done,
              onchange: () => toggleDone(item.id),
            });
            span({
              textContent: item.text,
              style: {
                textDecoration: item.done ? "line-through" : "none",
              },
            });
          });
        },
        (item) => item.id
      );
    });
  });
};
```

### User List with Pagination
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

export const UserList = (props: { users: User[] }) => {
  const items = $(props.users);
  const page = $(1);
  const pageSize = 10;

  const paginatedItems = $(() => {
    const start = (page.value - 1) * pageSize;
    const end = start + pageSize;
    return items.value.slice(start, end);
  });

  const totalPages = $(() => Math.ceil(items.value.length / pageSize));

  return div(() => {
    ul(() => {
      Each(
        () => paginatedItems.value,
        (user) => {
          li(() => {
            div(() => {
              strong({ textContent: user.name });
              p({ textContent: user.email });
            });
          });
        },
        (user) => user.id
      );
    });

    // Pagination controls
    div(() => {
      button({
        textContent: "Previous",
        disabled: $(() => page.value === 1),
        onclick: () => page.value--,
      });
      span({ textContent: $(() => `Page ${page.value} of ${totalPages.value}`) });
      button({
        textContent: "Next",
        disabled: $(() => page.value >= totalPages.value),
        onclick: () => page.value++,
      });
    });
  });
};
```

### Editable List
```typescript
interface EditableItem {
  id: number;
  text: string;
}

export const EditableList = () => {
  const items = $<EditableItem[]>([]);
  const editingId = $<number | null>(null);
  const editText = $("");

  const startEdit = (item: EditableItem) => {
    editingId.value = item.id;
    editText.value = item.text;
  };

  const saveEdit = (id: number) => {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, text: editText.value } : item
    );
    editingId.value = null;
    editText.value = "";
  };

  const cancelEdit = () => {
    editingId.value = null;
    editText.value = "";
  };

  return div(() => {
    ul(() => {
      Each(
        () => items.value,
        (item) => {
          li(() => {
            if (editingId.value === item.id) {
              // Edit mode
              input({
                type: "text",
                value: editText.value,
                oninput: (e) => (editText.value = e.currentTarget.value),
              });
              button("Save", () => saveEdit(item.id));
              button("Cancel", cancelEdit);
            } else {
              // View mode
              span({ textContent: item.text });
              button("Edit", () => startEdit(item));
            }
          });
        },
        (item) => item.id
      );
    });
  });
};
```

## Best Practices

1. **Always Use Each() for Lists** - More efficient than manual DOM updates
2. **Provide Key Function** - Third argument to Each() for stable identity
3. **Immutable Updates** - Use spread operator to create new arrays
4. **Batch Related Changes** - Use `batch()` for multiple updates
5. **Compute Derived Values** - Use computed for filtered/sorted lists
6. **Type Item Interface** - Define clear item structure
7. **Handle Empty States** - Show helpful message when list is empty
8. **Prevent Event Bubbling** - Use `e.stopPropagation()` for nested clicks
9. **Unique IDs** - Use `Date.now()`, UUID, or server IDs
10. **Cleanup** - Dispose effects when component unmounts
