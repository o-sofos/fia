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

            // Mouse handler
            // window.addEventListener("mousemove", (e) => {
            //     mouseX = e.clientX;
            //     mouseY = e.clientY;
            // });

            // Animation Loop
            const render = () => {
                ctx.clearRect(0, 0, width, height);

                const isDark = themeStore.current === "dark";

                ctx.fillStyle = isDark
                    ? "rgba(36, 247, 177, 1)"
                    : "rgba(0, 0, 0, 0.15)";

                const cols = Math.ceil(width / DOT_SPACING);
                const rows = Math.ceil(height / DOT_SPACING);

                for (let i = 0; i <= cols; i++) {
                    for (let j = 0; j <= rows; j++) {
                        const x = i * DOT_SPACING;
                        const y = j * DOT_SPACING;

                        const dx = x - mouseX;
                        const dy = y - mouseY;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        let drawX = x;
                        let drawY = y;
                        let drawRadius = DOT_RADIUS;

                        if (dist < WAVE_RADIUS) {
                            const rawInfluence = 1 - dist / WAVE_RADIUS;
                            const influence = rawInfluence * rawInfluence * rawInfluence;

                            const angle = Math.atan2(dy, dx);
                            drawX += Math.cos(angle) * influence * 15;
                            drawY += Math.sin(angle) * influence * 15;

                            drawRadius = DOT_RADIUS + influence * 1.5;

                            if (isDark) {
                                ctx.fillStyle = "rgba(36, 247, 177, 1)";
                            } else {
                                ctx.fillStyle = "rgba(36, 247, 177, 1)"
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
