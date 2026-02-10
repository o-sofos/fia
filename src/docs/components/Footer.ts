import { footer, div, a } from "../../core/mod";

export const Footer = () =>
    footer({
        style: {
            borderTop: "1px solid var(--mongo-slate)",
            marginTop: "auto",
            padding: "var(--spacing-lg) 0",
            background: "rgba(0,0,0,0.2)"
        }
    }, () => {
        div({ class: "container", style: { textAlign: "center", color: "var(--text-secondary)", fontSize: "0.9rem" } }, () => {
            div({ style: { marginBottom: "1rem" }, textContent: "© 2026 Fia Framework. Open Source under MIT License." });
        });
    });
