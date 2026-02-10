import { div, $ } from "../../core/mod";

export const Cursor = () => {
    const x = $(0);
    const y = $(0);
    const opacity = $(0);

    // Track mouse movement
    document.addEventListener("mousemove", (e) => {
        x.value = e.clientX;
        y.value = e.clientY;
        opacity.value = 1;
    });

    // Hide when leaving window
    document.addEventListener("mouseout", () => {
        opacity.value = 0;
    });

    return div({
        style: {
            position: "fixed",
            top: "0",
            left: "0",
            width: "400px",  // Large blur area
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",
            transform: $(() => `translate(${x.value - 200}px, ${y.value - 200}px)`), // Center it
            pointerEvents: "none", // Pass through clicks
            zIndex: "9999",
            mixBlendMode: "screen",
            filter: "blur(30px)",
            opacity: $(() => opacity.value.toString()),
            transition: "opacity 0.3s ease",
            willChange: "transform",
        }
    });
};
