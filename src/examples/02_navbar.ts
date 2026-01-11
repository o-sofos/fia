/**
 * 02_navbar.ts
 *
 * Difficulty: Beginner
 * Concept: Functional Components
 *
 * Concepts:
 * 1. Functions as Components: Creating reusable UI parts
 * 2. Props: Passing arguments `text`, `href` to components
 * 3. Flexbox Layout: Aligning items
 */

import { div, nav, a, h3, button } from "../mod";

// Reusable Component: NavLink
// Just a plain function that returns an element!
function NavLink(text: string, href: string) {
  return a({
    href,
    style: {
      textDecoration: "none",
      color: "#666",
      fontWeight: "500",
      fontSize: "0.95rem",
      transition: "color 0.2s"
    },
    onmouseover: (e) => e.target.style.color = "#000",
    onmouseout: (e) => e.target.style.color = "#666"
  }, text);
}

export function Navbar() {
  nav({
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      borderBottom: "1px solid #eee",
      fontFamily: "system-ui, sans-serif"
    }
  }, () => {
    // Logo
    h3({ style: { margin: 0, fontSize: "1.5rem" } }, "Flick");

    // Links container
    div({ style: { display: "flex", gap: "2rem", alignItems: "center" } }, () => {
      // Using our component
      NavLink("Features", "#features");
      NavLink("Docs", "#docs");
      NavLink("Blog", "#blog");
      
      // CTA Button
      button({
        style: {
          padding: "0.5rem 1rem",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "0.9rem"
        }
      }, "Download");
    });
  });
}

// Only run if executed directly
if (import.meta.main) {
  Navbar();
}
