import { div, button, $, Mut } from "fia";
import {
  i18nStore,
  languages,
  setLanguage,
  type Language,
} from "../store/i18n";

export const LanguageSwitcher = () => {
  const isOpen = $(Mut(false));

  return div(
    {
      style: {
        position: "relative",
        display: "inline-block",
      },
    },
    () => {
      // Language button
      button(
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            background: "transparent",
            border: "1px solid var(--fia-slate)",
            borderRadius: "0.5rem",
            color: "var(--text-primary)",
            fontSize: "0.875rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s",
          },
          onclick: () => {
            isOpen.value = !isOpen.value;
          },
          onmouseover: (e) => {
            e.currentTarget.style.borderColor = "var(--fia-primary)";
            e.currentTarget.style.background = "rgba(99, 102, 241, 0.1)";
          },
          onmouseout: (e) => {
            e.currentTarget.style.borderColor = "var(--fia-slate)";
            e.currentTarget.style.background = "transparent";
          },
        },
        () => {
          // Globe icon
          div({
            textContent: "🌐",
            style: {
              display: "flex",
              alignItems: "center",
              fontSize: "1.1rem",
            },
          });

          // Current language
          div({
            textContent: $(() => {
              const lang = i18nStore.currentLanguage as Language;
              return languages[lang];
            }),
          });

          // Chevron icon
          div({
            textContent: $(() => (isOpen.value ? "▲" : "▼")),
            style: {
              display: "flex",
              alignItems: "center",
              fontSize: "0.6rem",
              opacity: "0.7",
            },
          });
        },
      );

      // Dropdown menu
      div(
        {
          style: {
            display: $(() => (isOpen.value ? "block" : "none")),
            position: "absolute",
            top: "calc(100% + 0.5rem)",
            right: "0",
            background: "var(--bg-card)",
            border: "1px solid var(--fia-slate)",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            zIndex: "1000",
            minWidth: "140px",
          },
        },
        () => {
          // Language options
          const languageOptions: Array<{
            code: Language;
            name: string;
            flag: string;
          }> = [
            { code: "en", name: "English", flag: "🇬🇧" },
            { code: "de", name: "Deutsch", flag: "🇩🇪" },
            { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
          ];

          languageOptions.forEach((lang) => {
            button(
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  width: "100%",
                  padding: "0.75rem 1rem",
                  background: $(() =>
                    i18nStore.currentLanguage === lang.code
                      ? "rgba(99, 102, 241, 0.15)"
                      : "transparent",
                  ),
                  border: "none",
                  color: $(() =>
                    i18nStore.currentLanguage === lang.code
                      ? "var(--fia-primary)"
                      : "var(--text-primary)",
                  ),
                  fontSize: "0.875rem",
                  fontWeight: $(() =>
                    i18nStore.currentLanguage === lang.code ? "600" : "400",
                  ),
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s",
                },
                onclick: () => {
                  setLanguage(lang.code);
                  isOpen.value = false;
                },
                onmouseover: (e) => {
                  if (i18nStore.currentLanguage !== lang.code) {
                    e.currentTarget.style.background =
                      "rgba(99, 102, 241, 0.08)";
                  }
                },
                onmouseout: (e) => {
                  if (i18nStore.currentLanguage !== lang.code) {
                    e.currentTarget.style.background = "transparent";
                  }
                },
              },
              () => {
                div({
                  textContent: lang.flag,
                  style: { fontSize: "1.25rem" },
                });
                div({ textContent: lang.name });
              },
            );
          });
        },
      );
    },
  );

  // Close dropdown when clicking outside
  if (typeof document !== "undefined") {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[style*="position: relative"]')) {
        isOpen.value = false;
      }
    });
  }
};
