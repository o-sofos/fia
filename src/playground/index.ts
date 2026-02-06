import { $, button, div, Match, p } from "../core/mod";

export default () => {
    const tabs = ["Home", "About", "Contact"];
    const active = $<number>(0);

    div(() => {
        div({ class: "tabs" }, () => {
            tabs.forEach((tab, i) => {
                button({
                    textContent: tab,
                    class: $(() => active.value === i ? "active" : ""),
                    onclick: () => active.value = i,
                });
            });
        });
        div({ class: "content" }, () => {
            p({
                textContent: Match(() => active.value, {
                    0: () => "Welcome to the Home page!",
                    1: () => "About Fia Framework...",
                    2: () => "Contact us at hello@fia.dev",
                    _: () => "Unknown",
                })
            });
        });
    });
};
