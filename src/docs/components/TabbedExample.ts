import { $, button, div, Each, Mut } from "fia";

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
                borderBottom: "1px solid #e0e0e0",
                marginBottom: "1rem"
            }
        }, () => {
            Each(tabs, (tab, index) => {
                button({
                    textContent: tab.label,
                    style: {
                        padding: "8px 16px",
                        background: $(() => activeTab.value === index ? "#2563eb" : "transparent"),
                        color: $(() => activeTab.value === index ? "white" : "#666"),
                        border: "none",
                        borderBottom: $(() => activeTab.value === index ? "2px solid #2563eb" : "2px solid transparent"),
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: $(() => activeTab.value === index ? "600" : "400"),
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
                        background: "#1e1e1e",
                        color: "#d4d4d4",
                        padding: "1rem",
                        borderRadius: "4px",
                        overflow: "auto",
                        fontFamily: "monospace",
                        fontSize: "14px",
                        whiteSpace: "pre"
                    }
                }, () => {
                    div({ textContent: tab.code });
                });
            });
        });
    });
};
