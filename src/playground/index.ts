import { $, div, Match } from "../core/mod";

export default () => {
    const status = $<"loading" | "success" | "error">("loading");

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
                loading: () => div({ textContent: "Loading..." }),
                success: () => div({ textContent: "Success!" }),
                error: () => div({ textContent: "Error!" }),
                _: () => div({ textContent: "Unknown state" })
            });
        });
    });
};
