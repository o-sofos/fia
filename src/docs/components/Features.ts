import { section, div, h3, p } from "../../core/mod";

const FeatureCard = (title: string, desc: string, icon: string) =>
    div({
        style: {
            padding: "2rem",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "1rem",
            border: "1px solid rgba(255,255,255,0.05)",
            transition: "transform 0.2s ease, background 0.2s ease"
        }
    }, (el) => {
        // Add hover effect manually since we're in JS
        el.onmouseenter = () => {
            el.style.transform = "translateY(-5px)";
            el.style.background = "rgba(255,255,255,0.05)";
        };
        el.onmouseleave = () => {
            el.style.transform = "translateY(0)";
            el.style.background = "rgba(255,255,255,0.03)";
        };

        div({ style: { fontSize: "2.5rem", marginBottom: "1rem" }, textContent: icon });
        h3({ style: { fontSize: "1.25rem", marginBottom: "0.75rem", color: "var(--mongo-green)", fontWeight: "600" }, textContent: title });
        p({ style: { color: "var(--text-secondary)", lineHeight: "1.6" }, textContent: desc });
    });

export const Features = () =>
    section({
        id: "features",
        class: "container",
        style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "var(--spacing-xl)",
            paddingTop: "var(--spacing-lg)"
        }
    }, () => {
        FeatureCard(
            "Zero Virtual DOM",
            "Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.",
            "⚡️"
        );
        FeatureCard(
            "Fine-Grained Reactivity",
            "Signals track dependencies automatically. Only what changes updates.",
            "🎯"
        );
        FeatureCard(
            "Type Safe",
            "Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.",
            "🛡️"
        );
    });
