/**
 * 03_features.ts
 *
 * Difficulty: Intermediate
 * Concept: List Rendering
 *
 * Concepts:
 * 1. Rendering Lists: Using `array.forEach` or `map`
 * 2. Grid Layout: CSS Grid basics
 * 3. Composition: Using small components (Card)
 */

import { div, h2, p, section } from "../core/elements/elements";

const features = [
  { title: "Zero Dependencies", desc: "No bloat. Just the code you need." },
  { title: "Native Speed", desc: "Direct DOM manipulation. No VDOM overhead." },
  { title: "Type Safe", desc: "Built with TypeScript for great DX." }
];

function Card(title: string, desc: string) {
  return div({
    style: {
      padding: "1.5rem",
      border: "1px solid #eee",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
    }
  }, () => {
    h2(title, { style: { fontSize: "1.2rem", marginBottom: "0.5rem" } });
    p(desc, { style: { color: "#555", lineHeight: "1.5" } });
  });
}

export function Features() {
  section({ style: { padding: "4rem 2rem", background: "#fff" } }, () => {
    div({
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "2rem",
        maxWidth: "1000px",
        margin: "0 auto"
      }
    }, () => {
      // List Rendering: Just iterate over data!
      features.forEach(f => {
        Card(f.title, f.desc);
      });
    });
  });
}

if (import.meta.main) Features();
