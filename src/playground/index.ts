import { $, button, div, Each, h2, li, Match, Mut, p, Show, ul } from "fia";

export default () => {
    // Task manager example combining Each, Show, and Match
    type Task = { id: number; text: string; completed: boolean };
    type Filter = "all" | "active" | "completed";

    const tasks = $(Mut<Task[]>([
        { id: 1, text: "Learn Fia", completed: true },
        { id: 2, text: "Build an app", completed: false },
        { id: 3, text: "Deploy to production", completed: false }
    ]));

    const currentFilter = $(Mut<Filter>("all"));
    const showCompleted = $(Mut(true));

    // Computed: filtered tasks based on current filter and showCompleted toggle
    const filteredTasks = $(() => {
        const filter = currentFilter.value;
        let result: typeof tasks = tasks;

        // Filter by completion status based on filter
        if (filter === "active") result = tasks.filter((t: Task) => !t.completed) as typeof tasks;
        else if (filter === "completed") result = tasks.filter((t: Task) => t.completed) as typeof tasks;

        // Additionally hide completed if showCompleted is false and filter is "all"
        if (filter === "all" && !showCompleted.value) {
            result = tasks.filter((t: Task) => !t.completed) as typeof tasks;
        }

        return result;
    });

    div({ style: { padding: "20px", maxWidth: "600px", margin: "0 auto" } }, () => {
        h2("Task Manager - Control Flow Demo");

        // Filter buttons using Each
        div({ style: { marginBottom: "20px", display: "flex", gap: "10px" } }, () => {
            const filters: Filter[] = ["all", "active", "completed"];
            Each(filters, (filter) => {
                button({
                    textContent: filter.charAt(0).toUpperCase() + filter.slice(1),
                    style: {
                        padding: "8px 16px",
                        background: $(() => currentFilter.value === filter ? "#4CAF50" : "#ddd"),
                        color: $(() => currentFilter.value === filter ? "white" : "black"),
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    },
                    onclick: () => currentFilter.value = filter
                });
            });
        });

        // Toggle to show/hide completed tasks
        div({ style: { marginBottom: "20px" } }, () => {
            button({
                textContent: $(() => showCompleted.value ? "Hide Completed" : "Show Completed"),
                onclick: () => showCompleted.value = !showCompleted.value
            });

            // Show: conditionally display completed stats
            Show(showCompleted, () => {
                const completedCount = $(() => tasks.filter((t: Task) => t.completed).length);
                p({
                    style: { marginTop: "10px", padding: "10px", background: "#e3f2fd", borderRadius: "4px" },
                    textContent: $(() => `Completed: ${completedCount.value} / ${tasks.length}`)
                });
            });
        });

        // Match: display different messages based on filter
        div({ style: { marginBottom: "20px", padding: "10px", background: "#fff3cd", borderRadius: "4px" } }, () => {
            p({
                style: { margin: "0", fontWeight: "bold" },
                textContent: Match(currentFilter, {
                    "all": () => "📋 Showing all tasks",
                    "active": () => "⚡ Showing active tasks",
                    "completed": () => "✅ Showing completed tasks",
                    _: () => "Unknown filter"
                })
            });
        });

        // Each: render the filtered task list
        ul({ style: { listStyle: "none", padding: "0" } }, () => {
            // Show: display message when no tasks match filter
            Show(() => filteredTasks.value.length === 0, () => {
                li({
                    style: { padding: "20px", textAlign: "center", color: "#999" },
                    textContent: Match(currentFilter, {
                        "all": () => "No tasks yet!",
                        "active": () => "No active tasks!",
                        "completed": () => "No completed tasks!",
                        _: () => "No tasks"
                    })
                });
            });

            Each(filteredTasks, (task: Task) => {
                const taskCompleted = $(Mut(task.completed));
                li({
                    style: {
                        padding: "12px",
                        marginBottom: "8px",
                        background: $(() => taskCompleted.value ? "#f1f8f4" : "#fff"),
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }
                }, () => {
                    // Checkbox
                    button({
                        textContent: $(() => taskCompleted.value ? "✓" : "○"),
                        style: {
                            width: "24px",
                            height: "24px",
                            border: "2px solid #4CAF50",
                            borderRadius: "50%",
                            background: $(() => taskCompleted.value ? "#4CAF50" : "white"),
                            color: "white",
                            cursor: "pointer",
                            fontSize: "14px"
                        },
                        onclick: () => {
                            taskCompleted.value = !taskCompleted.value;
                            task.completed = taskCompleted.value;
                        }
                    });

                    // Task text
                    p({
                        style: {
                            margin: "0",
                            flex: "1",
                            textDecoration: $(() => taskCompleted.value ? "line-through" : "none"),
                            color: $(() => taskCompleted.value ? "#999" : "#333")
                        },
                        textContent: task.text
                    });
                });
            });
        });

        // Add new task button
        button({
            textContent: "Add Random Task",
            style: {
                marginTop: "20px",
                padding: "10px 20px",
                background: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
            },
            onclick: () => {
                const newTask: Task = {
                    id: Date.now(),
                    text: `Task ${tasks.length + 1}`,
                    completed: false
                };
                tasks.push(newTask);
            }
        });
    });
};
