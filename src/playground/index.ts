import { div, input, button, ul, Each, li, span, $ } from "../core/mod";

export default () => {
    const todos = $<{ items: string[]; input: string }>({
        items: [],
        input: ""
    });

    div(() => {
        input({
            type: "text",
            value: $(() => todos.input),
            oninput: (e) => todos.input = e.currentTarget.value,
        });
        button({
            textContent: "Add",
            onclick: () => {
                if (todos.input?.trim()) {
                    todos.items = [...todos.items, todos.input];
                    todos.input = "";
                }
            },
        });
        ul(() => {
            Each(() => todos.items, (item, i) => {
                li(() => {
                    span({ textContent: item });
                    button({
                        textContent: "×",
                        onclick: () => todos.items = todos.items.filter((_, j) => j !== i),
                    });
                });
            });
        });
    });


};
