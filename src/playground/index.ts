import { $, button, dialog, div, h2 } from "fia";

export default () => {
    const modal = $({ open: false, title: "" }, "open", "title");

    function openModal(title: string) {
        modal.title = title;
        modal.open = true;
    }

    button({
        class: "button a b c",
        className: "someccsclass as",
        classList: ["a", "b", "c"],
        textContent: "Open Modal",
        onclick: (e) => {
            const target = e.currentTarget;
            if (target.textContent) {
                console.log(target.textContent);
                console.log(target.className);
                console.log(target.classList);
            }
        }
    });

    dialog({
        class: "modal-backdrop",
        style: { display: $(() => modal.open ? "flex" : "none") },
        onclick: () => modal.open = false,
    }, () => {
        div({
            class: "modal",
            onclick: (e) => e.stopPropagation(),
        }, () => {
            h2({ textContent: $(() => modal.title) });
            button({ textContent: "Close", onclick: () => modal.open = false });
        });
    });

};
