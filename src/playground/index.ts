import { $, effect } from "../core/mod";
import { div, h1, input, button, ul, li, span, p } from "../core/elements";

// Types
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Fake Data Factory
const createFakeTodos = (): Todo[] => [
  { id: 1, text: "Buy groceries 🍎", completed: false },
  { id: 2, text: "Walk the dog 🐕", completed: true },
  { id: 3, text: "Read a book 📚", completed: false },
  { id: 4, text: "Learn Flick 🚀", completed: false },
];

export default (() => {
  // --- State ---
  const todos = $<Todo[]>(createFakeTodos());
  const inputText = $<string>("");
  const editingId = $<number | null>(null);
  const editText = $<string>("");

  // --- Actions ---

  // Create
  const addTodo = () => {
    const text = inputText.value.trim();
    if (!text) return;

    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };

    // Immutable update to trigger reactivity
    todos.value = [...todos.value, newTodo];
    inputText.value = "";
  };

  // Update (Toggle Complete)
  const toggleTodo = (id: number) => {
    todos.value = todos.value.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
  };

  // Delete
  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter(t => t.id !== id);
  };

  // Edit Mode Start
  const startEdit = (todo: Todo) => {
    editingId.value = todo.id;
    editText.value = todo.text;
  };

  // Edit Mode Save
  const saveEdit = () => {
    const id = editingId.value;
    if (id === null) return;

    const text = editText.value.trim();
    if (text) {
      todos.value = todos.value.map(t =>
        t.id === id ? { ...t, text } : t
      );
    }
    cancelEdit();
  };

  // Edit Mode Cancel
  const cancelEdit = () => {
    editingId.value = null;
    editText.value = "";
  };

  // Computed
  const stats = $(() => {
    const total = todos.value.length;
    const completed = todos.value.filter(t => t.completed).length;
    const pending = total - completed;
    return `${total} items | ${completed} completed | ${pending} pending`;
  });

  // --- UI Render ---
  div({ style: { fontFamily: "system-ui, sans-serif", maxWidth: "500px", margin: "2rem auto", padding: "1rem", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } }, () => {

    h1("Flick Todo App ✨", { style: { textAlign: "center", color: "#333", marginBottom: "0.5rem" } });

    // Stats
    p(stats, { style: { textAlign: "center", color: "#666", fontSize: "0.9rem", marginBottom: "1.5rem" } });

    // Input Form
    div({ style: { display: "flex", gap: "0.5rem", marginBottom: "1.5rem" } }, () => {
      input({
        type: "text",
        value: inputText,
        placeholder: "Add a new task...",
        style: { flex: "1", padding: "0.8rem", borderRadius: "4px", border: "1px solid #ddd", fontSize: "1rem" },
        onInput: (e) => inputText.value = e.currentTarget.value,
        onKeyDown: (e) => {
          if (e.key === "Enter") addTodo();
        }
      });

      button("Add", {
        style: { padding: "0.5rem 1.5rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" },
        onClick: addTodo
      });
    });

    // Todo List
    ul({ style: { listStyle: "none", padding: "0", display: "flex", flexDirection: "column", gap: "0.5rem" } }, (listEl) => {

      // Reactive Render Loop using Effect
      effect(() => {
        // Clear current list
        listEl.innerHTML = "";

        todos.value.forEach(todo => {
          const isEditing = editingId.value === todo.id;

          // Create List Item (Capture reference)
          const item = li({
            style: {
              padding: "1rem",
              backgroundColor: "white",
              borderRadius: "4px",
              border: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }
          }, (liEl) => {
            if (isEditing) {
              // EDIT MODE
              const editInput = input({
                type: "text",
                value: editText,
                style: { flex: "1", padding: "0.5rem", border: "1px solid #007bff", outline: "none", borderRadius: "3px" },
                onKeyDown: (e) => {
                  if (e.key === "Enter") saveEdit();
                  if (e.key === "Escape") cancelEdit();
                }
              });
              liEl.appendChild(editInput);

              liEl.appendChild(button("💾", { onClick: saveEdit, title: "Save", style: { cursor: "pointer", background: "none", border: "none" } }));
              liEl.appendChild(button("❌", { onClick: cancelEdit, title: "Cancel", style: { cursor: "pointer", background: "none", border: "none" } }));

            } else {
              // VIEW MODE
              liEl.appendChild(input({
                type: "checkbox",
                checked: todo.completed,
                style: { cursor: "pointer", width: "1.2rem", height: "1.2rem" },
                onChange: () => toggleTodo(todo.id)
              }));

              liEl.appendChild(span(todo.text, {
                style: {
                  flex: "1",
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#aaa" : "inherit",
                  cursor: "pointer"
                },
                onClick: () => toggleTodo(todo.id)
              }));

              liEl.appendChild(button("✏️", {
                onClick: () => startEdit(todo),
                style: { cursor: "pointer", background: "none", border: "none", opacity: "0.6" },
                title: "Edit"
              }));

              liEl.appendChild(button("🗑️", {
                onClick: () => deleteTodo(todo.id),
                style: { cursor: "pointer", background: "none", border: "none", opacity: "0.6", color: "#dc3545" },
                title: "Delete"
              }));
            }
          });

          listEl.appendChild(item);
        });
      });
    });
  });
})();
