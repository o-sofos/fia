/**
 * 05_full_page.ts
 *
 * Difficulty: Expert
 * Concept: Composition & Routing
 *
 * Concepts:
 * 1. Composition: Assembling complex pages from smaller components
 * 2. Routing: Using Match for hash-based navigation
 * 3. Global State: Connecting URL hash to application state
 */

import { $, div, Match } from "../core/mod";
import { Navbar } from "./02_navbar";
import { Hero } from "./01_hero";
import { Features } from "./03_features";
import { Contact } from "./04_contact";

// Simple routing state
function useRouter() {
  const hash = $(window.location.hash || "#");

  // Listen for hash changes
  window.addEventListener("hashchange", () => {
    hash.value = window.location.hash || "#";
  });

  return hash;
}

// Our main App component
export function LandingPage() {
  const route = useRouter();

  div(
    {
      style: {
        fontFamily: "system-ui, -apple-system, sans-serif",
        margin: "0",
        padding: "0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      },
    },
    () => {
      // Header
      Navbar();

      // Main Content Area with Routing
      div({ style: { flex: "1" } }, () => {
        Match(() => route.value, {
          "#features": () => Features(),
          "#docs": () => div({
            style: { padding: "4rem", textAlign: "center" },
            textContent: "Documentation coming soon!"
          }),
          "#blog": () => div({
            style: { padding: "4rem", textAlign: "center" },
            textContent: "Blog coming soon!"
          }),
          // Default route (Home)
          _: () => {
            Hero();
            // Show contact on home page too for demo
            Contact();
          }
        });
      });

      // Footer
      div({
        textContent: "© 2026 Fia Framework. Built with 0 dependencies.",
        style: {
          padding: "2rem",
          background: "#222",
          color: "#fff",
          textAlign: "center",
          fontSize: "0.9rem",
        },
      });
    },
  );
}

if (import.meta.main) LandingPage();
