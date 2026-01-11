/**
 * 05_full_page.ts
 *
 * Difficulty: Expert
 * Concept: Composition
 *
 * Concepts:
 * 1. Composition: Assembling complex pages from smaller components
 * 2. Layout: Managing global layout structure
 */

import { div } from "../core/elements";
import { Navbar } from "./02_navbar";
import { Hero } from "./01_hero";
import { Features } from "./03_features";
import { Contact } from "./04_contact";

// Our main App component
export function LandingPage() {
  div({ 
    style: { 
      fontFamily: "system-ui, -apple-system, sans-serif",
      margin: "0",
      padding: "0",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    } 
  }, () => {
    // Header
    Navbar();
    
    // Main Content
    div({ style: { flex: "1" } }, () => {
      Hero();
      Features();
      Contact();
    });
    
    // Footer
    div({ 
      style: { 
        padding: "2rem", 
        background: "#222", 
        color: "#fff", 
        textAlign: "center",
        fontSize: "0.9rem"
      } 
    }, "© 2026 Flick Framework. Built with 0 dependencies.");
  });
}

if (import.meta.main) LandingPage();
