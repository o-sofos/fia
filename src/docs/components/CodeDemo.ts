import { div, pre, span, getCurrentContext } from "fia";
import { applyTilt } from "../utils/tilt";

// Helper to append text nodes
const t = (text: string) => {
    getCurrentContext().appendChild(document.createTextNode(text));
};

export const CodeDemo = () =>
    div({ class: "container animate-fade-up delay-200", style: { margin: "var(--spacing-xl) auto", maxWidth: "800px" } }, () => {
        div({
            style: {
                background: "var(--mongo-forest)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                border: "1px solid var(--mongo-slate)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.95rem",
                overflow: "hidden",
                lineHeight: "1.6",
                transformStyle: "preserve-3d",
            }
        }, (el) => {
            applyTilt(el as unknown as HTMLElement, 5);

            // Window controls
            div({ style: { display: "flex", gap: "0.5rem", marginBottom: "1.5rem", opacity: "0.7", transform: "translateZ(20px)" } }, () => {
                div({ style: { width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" } });
                div({ style: { width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" } });
                div({ style: { width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f" } });
            });

            // Helper for syntax highlighting
            const k = (text: string) => span({ style: { color: "var(--syntax-keyword)" }, textContent: text });
            const f = (text: string) => span({ style: { color: "var(--syntax-function)" }, textContent: text });
            const s = (text: string) => span({ style: { color: "var(--syntax-string)" }, textContent: text });
            const c = (text: string) => span({ style: { color: "var(--syntax-comment)" }, textContent: text });

            pre({ style: { transform: "translateZ(40px)" } }, () => {
                div(() => { k("import"); t(" { $, div, button } "); k("from"); s(' "fia"'); t(";"); });
                t(" "); // newline
                div(() => { k("const"); t(" count = "); f("$"); t("(0);"); });
                t(" ");
                div(() => { f("div"); t("(() => {"); });
                div({ style: { paddingLeft: "1.5rem" } }, () => {
                    f("button"); t("({ ");
                });
                div({ style: { paddingLeft: "3rem" } }, () => {
                    div({ textContent: "onclick: () => count.value++," });
                });
                div({ style: { paddingLeft: "3rem" } }, () => {
                    t("textContent: "); s('"Increment"');
                });
                div({ style: { paddingLeft: "1.5rem" } }, () => {
                    t("});");
                });
                t(" ");
                div({ style: { paddingLeft: "1.5rem" } }, () => {
                    c("// Updates are surgical - no VDOM diffing");
                });
                div({ style: { paddingLeft: "1.5rem" } }, () => {
                    f("div"); t("({ "); t("textContent"); t(": "); f("$"); t("(() => "); s('`Count: ${count.value}`'); t(") });");
                });
                div({ textContent: "});" });
            });
        });
    });
