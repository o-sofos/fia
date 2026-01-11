/**
 * 01_hero.ts
 *
 * Difficulty: Easy
 * Concept: Layout & Styling (static)
 *
 * This example demonstrates:
 * 1. Creating elements with factory functions (section, h1, p, button)
 * 2. Passing styles and attributes via the props object
 * 3. Nesting elements (children)
 */

import { div, section, h1, p, button } from "../core/elements";

export function Hero() {
  section({
    style: {
      padding: "4rem 2rem",
      textAlign: "center",
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#f9f9f9"
    }
  }, () => {
    h1({ 
      style: { 
        fontSize: "3.5rem", 
        marginBottom: "1rem",
        color: "#1a1a1a"
      } 
    }, "Build Faster with Flick");

    p({ 
      style: { 
        fontSize: "1.25rem", 
        color: "#666", 
        marginBottom: "2rem",
        maxWidth: "600px",
        margin: "0 auto 2rem auto" 
      } 
    }, "The 2KB framework for modern web apps. No JSX. No VDOM. Just JavaScript.");

    div({ 
      style: { 
        display: "flex", 
        gap: "1rem", 
        justifyContent: "center" 
      } 
    }, () => {
      button({
        style: {
          padding: "0.8rem 1.5rem",
          background: "#222",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: "600",
          cursor: "pointer"
        }
      }, "Get Started");

      button({
        style: {
          padding: "0.8rem 1.5rem",
          background: "white",
          border: "1px solid #ccc",
          color: "#333",
          borderRadius: "6px",
          fontWeight: "600",
          cursor: "pointer"
        }
      }, "Documentation");
    });
  });
}

// Only run if executed directly
if (import.meta.main) {
  Hero();
}
