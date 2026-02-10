import { header, h1, p, div, button, a } from "../../core/mod";

export const Hero = () =>
    header({ class: "container", style: { padding: "var(--spacing-xl) 0", textAlign: "center", maxWidth: "900px", position: "relative" } }, () => {
        h1({ style: { fontSize: "4.5rem", lineHeight: "1.1", marginBottom: "var(--spacing-md)", fontWeight: "800", letterSpacing: "-0.02em", position: "relative", zIndex: "1" } }, () => {
            div({ textContent: "Build High-Performance UIs" });
            div({ class: "text-gradient", textContent: "Without the Virtual DOM" });
        });

        p({
            style: { fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: "var(--spacing-lg)", maxWidth: "800px", margin: "0 auto var(--spacing-lg)", lineHeight: "1.6", position: "relative", zIndex: "1" },
            textContent: "Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely."
        });

        div({ style: { display: "flex", gap: "1rem", justifyContent: "center", marginTop: "var(--spacing-lg)", position: "relative", zIndex: "1" } }, () => {
            button({ class: "btn btn-primary", style: { padding: "1rem 2rem", fontSize: "1.1rem" }, textContent: "Get Started" });
            a({
                href: "https://github.com/o-sofos/fia",
                target: "_blank",
                class: "btn btn-outline",
                style: { padding: "1rem 2rem", fontSize: "1.1rem" },
                textContent: "View Source"
            });
        });

        // 3D Decorative Shapes
        div({
            class: "animate-float",
            style: {
                position: "absolute",
                top: "10%",
                left: "5%",
                width: "60px",
                height: "60px",
                borderRadius: "1rem",
                background: "linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",
                opacity: "0.2",
                boxShadow: "0 10px 30px rgba(0,237,100,0.2)",
                zIndex: "0",
                transform: "rotate(45deg)",
            }
        });

        div({
            class: "animate-float-delayed",
            style: {
                position: "absolute",
                bottom: "10%",
                right: "5%",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "2px solid var(--mongo-green)",
                opacity: "0.1",
                zIndex: "0",
            }
        });

        // Small floating circle top-right
        div({
            class: "animate-float",
            style: {
                position: "absolute",
                top: "15%",
                right: "15%",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "var(--mongo-green)",
                opacity: "0.2",
                boxShadow: "0 0 20px var(--mongo-green)",
                zIndex: "0",
                animationDelay: "1s"
            }
        });

        // Blurred orb bottom-left
        div({
            class: "animate-float-delayed",
            style: {
                position: "absolute",
                bottom: "25%",
                left: "10%",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",
                opacity: "0.1",
                zIndex: "0",
                filter: "blur(20px)",
                animationDelay: "2s"
            }
        });

        // Tilted square mid-right
        div({
            class: "animate-float",
            style: {
                position: "absolute",
                top: "45%",
                right: "8%",
                width: "40px",
                height: "40px",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                transform: "rotate(15deg) translateZ(-20px)",
                opacity: "0.3",
                zIndex: "0",
                animationDelay: "3s"
            }
        });

    });