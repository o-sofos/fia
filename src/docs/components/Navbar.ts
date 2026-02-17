import { nav, div, a, span, button, $ } from "../../core/mod";
import { themeStore, toggleTheme } from "../store/theme";
import { t } from "../store/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navbar = () =>
  nav(
    {
      class: "container animate-fade-up delay-100",
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100px",
      },
    },
    () => {
      // Logo
      div(
        {
          style: {
            fontSize: "1.5rem",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          },
        },
        () => {
          span({ style: { color: "var(--fia-primary)" }, textContent: "fia" });
        },
      );

      // Links
      div(
        { style: { display: "flex", gap: "2rem", alignItems: "center" } },
        () => {
          a({
            href: "#docs",
            style: { fontWeight: "500" },
            textContent: $(() => t.value.nav.docs),
          });
          a({
            href: "https://github.com/o-sofos/fia",
            target: "_blank",
            style: { fontWeight: "500" },
            textContent: $(() => t.value.nav.github),
          });

          // Language Switcher
          // LanguageSwitcher();

          // Theme Toggle
          button(
            {
              style: {
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                color: $(() =>
                  themeStore.current === "dark"
                    ? "var(--text-primary)"
                    : "var(--fia-primary)",
                ),
              },
              onclick: toggleTheme,
              title: $(() =>
                themeStore.current === "dark"
                  ? t.value.common.lightMode
                  : t.value.common.darkMode,
              ),
            },
            () => {
              span({
                textContent: $(() =>
                  themeStore.current === "dark" ? "🌙" : "☀️",
                ),
              });
            },
          );
        },
      );
    },
  );
