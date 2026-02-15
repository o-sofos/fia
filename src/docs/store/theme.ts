
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
                    /* Dark Mode (Default) */
                    --mongo-green: #00ED64;
                    --mongo-forest: #00684A;
                    --mongo-slate: #1C2D38; /* Slate / Dark Blue-Grey */
                    --mongo-white: #E3E3E3; 
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
                    /* Light Mode Overrides */
                    --mongo-green: #00A344; /* Darker green for light bg */
                    --mongo-forest: #E0F2F1; /* Very light teal for backgrounds */
                    --mongo-slate: #E2E8F0;  /* Light grey for borders */
                    --mongo-white: #1a202c;  /* Dark text for headers */
                    --bg-dark: #FFFFFF;      /* White background */
                    --bg-card: #F7FAFC;      /* Light grey card bg */
                    --text-primary: #2D3748; /* Dark grey text */
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
