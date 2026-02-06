import { div, Match, signal } from "../core/mod";

export default () => {
    const status = signal<"loading" | "success" | "error">("loading");

    // Cycle status every second
    setInterval(() => {
        const s = status.value;
        if (s === "loading") status.value = "success";
        else if (s === "success") status.value = "error";
        else status.value = "loading";
    }, 1000);

    div({ style: "padding: 20px; font-family: sans-serif;" }, () => {
        div({ style: "margin-bottom: 20px;" }, () => {
            Match(() => status.value, {
                loading: () => div({ textContent: "Loading...", style: "color: blue" }),
                success: () => div({ textContent: "Success!", style: "color: green" }),
                error: () => div({ textContent: "Error!", style: "color: red" }),
                _: () => div({ textContent: "Unknown state" })
            });
        });
    });
};
