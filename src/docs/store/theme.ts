
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
