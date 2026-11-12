/**
 * DOM macro-benchmarks modelled on js-framework-benchmark's keyed rows, run
 * under happy-dom. Absolute numbers aren't browser numbers — happy-dom is far
 * slower at DOM work — but relative changes in Fia's own overhead show up.
 * For real-browser numbers use `bun run benchmark` (benchmark_repo).
 */

import { defineSuite, type FiaLib } from "../lib";

interface Row {
    id: number;
    label: { value: string };
}

const ADJECTIVES = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint"];
const NOUNS = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger"];

function makeApp(lib: FiaLib) {
    const { $, Mut, Each, batch, table, tbody, tr, td, a, button, pushContext, popContext } = lib;
    let nextId = 1;

    const buildRows = (count: number): Row[] =>
        Array.from({ length: count }, (_, i) => ({
            id: nextId++,
            label: $(Mut(`${ADJECTIVES[i % ADJECTIVES.length]} ${NOUNS[(i * 7) % NOUNS.length]}`)),
        }));

    return function mountApp(initial: number) {
        const rows = $(Mut(buildRows(initial)));
        const container = document.createElement("div");
        document.body.appendChild(container);
        pushContext(container);
        try {
            table(() =>
                tbody(() =>
                    Each(() => rows as unknown as Row[], (row) => {
                        tr(() => {
                            td(String(row.id));
                            td(() => a(row.label as never));
                            td(() => button("×", () => {}));
                        });
                    }),
                ),
            );
        } finally {
            popContext();
        }
        const list = rows as unknown as Row[];
        return {
            container,
            list,
            buildRows,
            replace: (next: Row[]) => batch(() => { list.splice(0, list.length, ...next); }),
            update: (fn: () => void) => batch(fn),
            destroy: () => container.remove(),
        };
    };
}

export default defineSuite({
    name: "dom",
    dom: true,
    benches: (lib) => {
        const mountApp = makeApp(lib);
        type App = ReturnType<typeof mountApp>;
        const teardown = (app: App) => app.destroy();
        const { div, span, pushContext, popContext } = lib;

        return [
            {
                name: "create 1k rows",
                setup: () => mountApp(0),
                run: (app: App) => app.replace(app.buildRows(1000)),
                teardown,
            },
            {
                name: "replace 1k rows",
                setup: () => mountApp(1000),
                run: (app: App) => app.replace(app.buildRows(1000)),
                teardown,
            },
            {
                name: "update every 10th of 1k",
                setup: () => mountApp(1000),
                run: (app: App) =>
                    app.update(() => {
                        for (let i = 0; i < app.list.length; i += 10) app.list[i].label.value += " !!!";
                    }),
                teardown,
            },
            {
                name: "swap 2 rows of 1k",
                setup: () => mountApp(1000),
                run: (app: App) =>
                    app.update(() => {
                        const a = app.list[1];
                        app.list[1] = app.list[998];
                        app.list[998] = a;
                    }),
                teardown,
            },
            {
                name: "remove 1 row of 1k",
                setup: () => mountApp(1000),
                run: (app: App) => app.update(() => { app.list.splice(500, 1); }),
                teardown,
            },
            {
                name: "append 1k to 1k rows",
                setup: () => mountApp(1000),
                run: (app: App) => app.update(() => { app.list.push(...app.buildRows(1000)); }),
                teardown,
            },
            {
                name: "clear 1k rows",
                setup: () => mountApp(1000),
                run: (app: App) => app.replace([]),
                teardown,
            },
            {
                name: "create 1k static elements",
                setup: () => {
                    const container = document.createElement("div");
                    document.body.appendChild(container);
                    return container;
                },
                run: (container: HTMLElement) => {
                    pushContext(container);
                    try {
                        div(() => {
                            for (let i = 0; i < 1000; i++) span({ class: "cell" }, () => {});
                        });
                    } finally {
                        popContext();
                    }
                },
                teardown: (container: HTMLElement) => container.remove(),
            },
        ];
    },
});
