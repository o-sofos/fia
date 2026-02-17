import { canvas } from "../../core/mod";
import { themeStore } from "../store/theme";

export const Background = () =>
    canvas(
        {
            style: {
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                zIndex: "-1",
                pointerEvents: "none",
            },
        },
        (el) => {
            const ctx = el.getContext("2d")!;
            let width = 0;
            let height = 0;
            let mouseX = -1000;
            let mouseY = -1000;

            // Grid configuration
            const DOT_SPACING = 50;
            const DOT_RADIUS = .5;
            const WAVE_RADIUS = 500;

            // Resize handler
            const resize = () => {
                width = window.innerWidth;
                height = window.innerHeight;
                el.width = width;
                el.height = height;
            };

            window.addEventListener("resize", resize);
            resize();

            // Scroll handler
            let targetScrollY = window.scrollY;
            let currentScrollY = window.scrollY;

            window.addEventListener("scroll", () => {
                targetScrollY = window.scrollY;
            });

            const lerp = (start: number, end: number, t: number) => {
                return start * (1 - t) + end * t;
            };

            // Animation Loop
            const render = () => {
                ctx.clearRect(0, 0, width, height);

                const isDark = themeStore.current === "dark";

                // Base color
                ctx.fillStyle = isDark
                    ? "rgba(36, 247, 177, 1)"
                    : "rgba(0, 0, 0, 0.15)";

                // Parallax config
                const PARALLAX_SPEED = 0.5; // Dots move at half speed of scroll

                // Smooth scroll interpolation
                currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

                const effectiveScroll = currentScrollY * PARALLAX_SPEED;
                // Modulo to keep grid aligned without generating millions of rows
                const rowOffset = effectiveScroll % DOT_SPACING;

                const cols = Math.ceil(width / DOT_SPACING);
                const rows = Math.ceil(height / DOT_SPACING) + 1; // +1 to cover edges

                for (let i = 0; i <= cols; i++) {
                    for (let j = -1; j <= rows; j++) { // Start -1 to cover top edge
                        const x = i * DOT_SPACING;
                        // y starts at grid position minus the scroll modulo
                        // This makes the grid scroll continuously
                        const y = j * DOT_SPACING - rowOffset;

                        // Original world Y (for consistent separate noise/wave if needed)
                        // const worldY = j * DOT_SPACING + (effectiveScroll - rowOffset);

                        const dx = x - mouseX;
                        const dy = y - mouseY;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        let drawX = x;
                        let drawY = y;
                        let drawRadius = DOT_RADIUS;

                        if (dist < WAVE_RADIUS) {
                            const rawInfluence = 1 - dist / WAVE_RADIUS;
                            const influence = rawInfluence * rawInfluence * rawInfluence;

                            // Only apply if influence is positive (sanity check)
                            if (influence > 0) {
                                const angle = Math.atan2(dy, dx);
                                drawX += Math.cos(angle) * influence * 15;
                                drawY += Math.sin(angle) * influence * 15;

                                drawRadius = DOT_RADIUS + influence * 1.5;

                                if (isDark) {
                                    ctx.fillStyle = "rgba(36, 247, 177, 1)";
                                } else {
                                    ctx.fillStyle = "rgba(36, 247, 177, 1)";
                                }
                            }
                        } else {
                            ctx.fillStyle = isDark
                                ? "rgba(36, 247, 177, 1)"
                                : "rgba(0, 0, 0, 0.15)";
                        }

                        ctx.beginPath();
                        ctx.arc(drawX, drawY, drawRadius, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                requestAnimationFrame(render);
            };

            render();
        },
    );
