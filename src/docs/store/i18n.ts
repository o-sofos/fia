import { $, Mut, $e } from "fia";
import {
  translations,
  type Language,
  languageNames,
} from "../i18n/translations";

// Re-export Language type for use in components
export type { Language };

// Get initial language from localStorage or browser
const getInitialLanguage = (): Language => {
  // Check localStorage first
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("fia-language") as Language | null;
    if (stored && (stored === "en" || stored === "de" || stored === "el")) {
      return stored;
    }
  }

  // Check browser language
  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("de")) return "de";
    if (browserLang.startsWith("el")) return "el";
  }

  return "en"; // Default to English
};

// Language store
export const i18nStore = $(
  Mut({
    currentLanguage: getInitialLanguage(),
  }),
);

// Computed current translations
export const t = $(() => translations[i18nStore.currentLanguage as Language]);

// Language names (keep as plain object, no need to make reactive)
export const languages = languageNames;

// Save language preference
$e(() => {
  const lang = i18nStore.currentLanguage;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("fia-language", lang);
  }

  // Update HTML lang attribute
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", lang);
  }
});

// Helper to change language
export const setLanguage = (lang: Language) => {
  i18nStore.currentLanguage = lang;
};

// Helper to get translation helper (for components)
export const useTranslations = () => {
  return t;
};
