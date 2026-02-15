import { nav, div, a, span, button, $ } from "../../core/mod";
import { themeStore, toggleTheme } from "../store/theme";

export const Navbar = () =>
    nav({ class: "container animate-fade-up delay-100", style: { display: "flex", justifyContent: "space-between", alignItems: "center", height: "100px" } }, () => {
        // Logo
        div({ style: { fontSize: "1.5rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" } }, () => {
            span({ style: { color: "var(--mongo-green)" }, textContent: "fia" });
        });

        // Links
        div({ style: { display: "flex", gap: "2rem", alignItems: "center" } }, () => {
            a({ href: "#features", style: { fontWeight: "500" }, textContent: "Features" });
            a({ href: "#docs", style: { fontWeight: "500" }, textContent: "Docs" });
            // Theme Toggle
            button({
                style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    color: $(() => themeStore.current === "dark" ? "var(--text-primary)" : "var(--mongo-green)")
                },
                onclick: toggleTheme
            }, () => {
                span({
                    textContent: $(() => themeStore.current === "dark" ? "🌙" : "☀️")
                });
            });

            a({
                href: "https://github.com/o-sofos/fia",
                target: "_blank",
                class: "btn btn-outline",
                style: { padding: "0.5rem 1.25rem", fontSize: "0.9rem" },
                textContent: "GitHub"
            });
        });
    });
