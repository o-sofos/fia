import { header, h1, p, div, button, a } from "../../core/mod";

export const Hero = () =>
    header({ class: "container", style: { padding: "var(--spacing-xl) 0", textAlign: "center", maxWidth: "900px" } }, () => {
        h1({ style: { fontSize: "4.5rem", lineHeight: "1.1", marginBottom: "var(--spacing-md)", fontWeight: "800", letterSpacing: "-0.02em" } }, () => {
            div({ textContent: "Build High-Performance UIs" });
            div({ class: "text-gradient", textContent: "Without the Virtual DOM" });
        });

        p({
            style: { fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: "var(--spacing-lg)", maxWidth: "600px", margin: "0 auto var(--spacing-lg)", lineHeight: "1.6" },
            textContent: "Fia is a generic, type-safe reactive library. It uses fine-grained signals to update the DOM directly, delivering 0ms overhead and maximum battery life."
        });

        div({ style: { display: "flex", gap: "1rem", justifyContent: "center", marginTop: "var(--spacing-lg)" } }, () => {
            button({ class: "btn btn-primary", style: { padding: "1rem 2rem", fontSize: "1.1rem" }, textContent: "Get Started" });
            a({
                href: "https://github.com/o-sofos/fia",
                target: "_blank",
                class: "btn btn-outline",
                style: { padding: "1rem 2rem", fontSize: "1.1rem" },
                textContent: "View Source"
            });
        });
    });
