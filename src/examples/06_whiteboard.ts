import { env } from "bun";
import { $, div, canvas, input, button, label, h2, Mut } from "../core/mod";

/**
 * A collaborative-style whiteboard example demonstrating:
 * - HTML5 Canvas integration
 * - Reactive state for tools (color, size)
 * - Imperative event handling for high-performance drawing
 */
export default function Whiteboard() {
    // Reactive tool state
    const tools = $(Mut({
        allowedToBeUsed: env.FIA_WHITEBOARD_ALLOWED_TO_BE_USED === "true",
        color: "#000000",
        lineWidth: 5,
        isDrawing: false
    }));

    // Mutable drawing state
    let lastX = 0;
    let lastY = 0;
    let ctx: CanvasRenderingContext2D | null = null;

    return div({
        style: {
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            fontFamily: "system-ui, sans-serif",
            color: "#333",
            background: "#f9f9f9"
        }
    }, () => {
        // Toolbar
        div({
            style: {
                padding: "1rem",
                background: "#ffffff",
                display: "flex",
                gap: "1.5rem",
                alignItems: "center",
                borderBottom: "1px solid #e0e0e0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                zIndex: "10"
            }
        }, () => {
            h2("Fia Whiteboard", {
                style: { margin: "0", fontSize: "1.25rem", fontWeight: "600" }
            });

            // Color Picker
            label({ style: { display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" } }, () => {
                div("Color", { style: { fontSize: "0.9rem", fontWeight: "500" } });
                input({
                    type: "color",
                    value: $(() => tools.color),
                    style: {
                        width: "32px",
                        height: "32px",
                        padding: "0",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    },
                    oninput: (e) => tools.color = e.currentTarget.value
                });
            });

            // Size Slider
            label({ style: { display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" } }, () => {
                div($(() => `Size: ${tools.lineWidth}px`), {
                    style: { fontSize: "0.9rem", fontWeight: "500", minWidth: "80px" }
                });
                input({
                    type: "range",
                    min: "1",
                    max: "50",
                    value: $(() => tools.lineWidth),
                    style: { cursor: "pointer" },
                    oninput: (e) => tools.lineWidth = Number(e.currentTarget.value)
                });
            });

            // Clear Button
            button("Clear Canvas", {
                style: {
                    padding: "0.5rem 1rem",
                    background: "#fff0f0",
                    color: "#d93025",
                    border: "1px solid #ffaeb0",
                    borderRadius: "6px",
                    fontWeight: "500",
                    cursor: "pointer",
                    marginLeft: "auto",
                    transition: "background 0.2s"
                }
            }, () => {
                if (ctx && ctx.canvas) {
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                }
            });
        });

        // Canvas Container
        div({
            style: {
                flex: "1",
                position: "relative",
                overflow: "auto", // Allow scrolling on small screens
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem"
            }
        }, () => {
            canvas({
                width: 800,
                height: 600,
                style: {
                    background: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    cursor: "crosshair",
                    touchAction: "none" // Prevent scrolling while drawing on touch devices
                }
            }, (el) => {
                ctx = el.getContext("2d");
                if (!ctx) return;

                // optimize for sharper lines
                ctx.lineJoin = "round";
                ctx.lineCap = "round";

                const startDrawing = (x: number, y: number) => {
                    tools.isDrawing = true;
                    [lastX, lastY] = [x, y];
                };

                const draw = (x: number, y: number) => {
                    if (!tools.isDrawing || !ctx) return;

                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = tools.color;
                    ctx.lineWidth = tools.lineWidth;
                    ctx.stroke();

                    [lastX, lastY] = [x, y];
                };

                const stopDrawing = () => {
                    tools.isDrawing = false;
                    if (ctx) ctx.beginPath(); // Reset path to prevent connecting separate lines
                };

                // Mouse Events
                el.addEventListener("mousedown", (e) => startDrawing(e.offsetX, e.offsetY));
                el.addEventListener("mousemove", (e) => draw(e.offsetX, e.offsetY));
                el.addEventListener("mouseup", stopDrawing);
                el.addEventListener("mouseout", stopDrawing);

                // Touch Events (for mobile support)
                // Helper to get touch coords relative to canvas
                const getTouchPos = (touch: Touch) => {
                    const rect = el.getBoundingClientRect();
                    return {
                        x: touch.clientX - rect.left,
                        y: touch.clientY - rect.top
                    };
                };

                el.addEventListener("touchstart", (e) => {
                    e.preventDefault();
                    const pos = getTouchPos(e.touches[0]);
                    startDrawing(pos.x, pos.y);
                }, { passive: false });

                el.addEventListener("touchmove", (e) => {
                    e.preventDefault();
                    const pos = getTouchPos(e.touches[0]);
                    draw(pos.x, pos.y);
                }, { passive: false });

                el.addEventListener("touchend", stopDrawing);
            });
        });
    });
}
