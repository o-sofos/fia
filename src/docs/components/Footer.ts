import { footer, div, $ } from "../../core/mod";
import { t } from "../store/i18n";

export const Footer = () =>
    footer({
        style: {
            borderTop: "1px solid var(--fia-slate)",
            marginTop: "auto",
            padding: "var(--spacing-lg) 0",
            background: "rgba(0,0,0,0.2)"
        }
    }, () => {
        div({ class: "container", style: { textAlign: "center", color: "var(--text-secondary)", fontSize: "0.9rem" } }, () => {
            div({
                style: { marginBottom: "0.5rem", fontWeight: "500" },
                textContent: $(() => t.value.footer.tagline)
            });
            div({
                style: { marginBottom: "1rem" },
                textContent: $(() => `${t.value.footer.madeWith} ❤️ ${t.value.footer.by}`)
            });
            div({ textContent: "© 2026 Fia Framework. Open Source under MIT License." });
        });
    });
