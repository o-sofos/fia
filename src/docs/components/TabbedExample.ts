import { $, button, div, Each, Mut } from "fia";
import { SyntaxHighlight } from "./SyntaxHighlight";

/**
 * Interactive tab component for showing different code examples
 */
export const TabbedExample = (
    tabs: { label: string; code: string }[]
) => {
    const activeTab = $(Mut(0));

    div({ style: { marginBottom: "1.5rem" } }, () => {
        // Tab buttons
        div({
            style: {
                display: "flex",
                gap: "4px",
                borderBottom: "1px solid var(--fia-slate)",
                marginBottom: "1rem"
            }
        }, () => {
            Each(tabs, (tab, index) => {
                const isActive = () => activeTab.value === index;
                button({
                    textContent: tab.label,
                    style: {
                        padding: "8px 16px",
                        background: $(() => isActive() ? "var(--fia-primary)" : "transparent"),
                        color: $(() => isActive() ? "white" : "var(--text-secondary)"),
                        border: "none",
                        borderRadius: "4px 4px 0 0",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: $(() => isActive() ? "600" : "400"),
                        transition: "all 0.2s"
                    },
                    onclick: () => activeTab.value = index
                });
            });
        });

        // Code display
        div({ style: { position: "relative" } }, () => {
            Each(tabs, (tab, index) => {
                div({
                    style: {
                        display: $(() => activeTab.value === index ? "block" : "none"),
                        background: "var(--bg-code)",
                        color: "var(--text-primary)",
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: "1px solid var(--fia-slate)",
                        overflowX: "auto",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.9rem",
                        whiteSpace: "pre"
                    }
                }, () => {
                    SyntaxHighlight(tab.code);
                });
            });
        });
    });
};
