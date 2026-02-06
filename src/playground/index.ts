import { $, button, div, h2 } from "../core/mod";

export default () => {
  const modal = $<{
    open: boolean;
    title: string;
  }>({ open: false, title: "" });

  function openModal(title: string) {
    modal.title = title;
    modal.open = true;
  }

  button({ textContent: "Open Modal", onclick: () => openModal("Hello!") });

  div({
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
