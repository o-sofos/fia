
import { $, Mut, $e } from "fia";

type Theme = "dark" | "light";

// Initialize state from local storage or system preference
const getInitialTheme = (): Theme => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("fia-theme")) {
        return localStorage.getItem("fia-theme") as Theme;
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "dark"; // Default to dark
};

export const themeStore = $(Mut({
    current: getInitialTheme()
}));

// Sync with localStorage and DOM
$e(() => {
    const theme = themeStore.current;
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("fia-theme", theme);
    }
    if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);

        // Inject styles if not present
        if (!document.getElementById("fia-theme-styles")) {
            const style = document.createElement("style");
            style.id = "fia-theme-styles";
            style.textContent = `
                :root {
                    /* Dark Mode (Default) - Fia Brand Colors */
                    --fia-brand: #2dd4bf;      /* Teal 400 */
                    --fia-brand-rgb: 45, 212, 191;
                    
                    --fia-primary: var(--fia-brand);
                    --fia-accent: #99f6e4;     /* Teal 200 */
                    
                    --fia-dark: #0f172a;       /* Slate 900 - deep background */
                    --fia-slate: #334155;      /* Slate 700 - borders */
                    --fia-white: #f1f5f9;      /* Slate 100 - light text */
                    --fia-gray: #e2e8f0;       /* Slate 200 - subtle backgrounds */
                    --bg-dark: #111111;
                    --bg-card: #181818;
                    --text-primary: #ffffff;
                    --text-secondary: #a0a0a0;
                    --syntax-comment: #6a9955;
                    --syntax-string: #ce9178;
                    --syntax-keyword: #569cd6;
                    --syntax-function: #dcdcaa;
                    --spacing-xl: 3rem;
                }

                [data-theme="light"] {
                    /* Light Mode Overrides - Fia Brand Colors */
                    --fia-brand: #0d9488;      /* Teal 600 */
                    --fia-brand-rgb: 13, 148, 136;
                    
                    --fia-primary: var(--fia-brand);
                    --fia-accent: #115e59;     /* Teal 800 */

                    --fia-slate: #cbd5e1;      /* Light slate for borders */
                    --fia-white: #1e293b;      /* Dark slate for text */
                    --fia-gray: #f1f5f9;       /* Very light slate */
                    --fia-dark: #f8fafc;       /* Almost white for cards */
                    --bg-dark: #FFFFFF;        /* White background */
                    --bg-card: #F7FAFC;        /* Light grey card bg */
                    --text-primary: #2D3748;   /* Dark grey text */
                    --text-secondary: #718096;

                    /* Syntax Highlighting for Light Mode */
                    --syntax-comment: #008000;
                    --syntax-string: #a31515;
                    --syntax-keyword: #0000ff;
                    --syntax-function: #795e26;
                }

                body {
                    background-color: var(--bg-dark);
                    color: var(--text-primary);
                    transition: background-color 0.3s ease, color 0.3s ease;
                    cursor: auto;
                }

                [data-theme="light"] body {
                    background-color: var(--bg-dark);
                }
            `;
            document.head.appendChild(style);
        }

        // Optional: toggle class on body if needed
        if (theme === "dark") {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        } else {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
        }
    }
});

export const toggleTheme = () => {
    themeStore.current = themeStore.current === "dark" ? "light" : "dark";
};
