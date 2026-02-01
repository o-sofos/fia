/**
 * Fia Framework Showcase Landing Page
 *
 * Demonstrates: Signals, computed values, effects, reactive styles,
 * event handlers, list rendering, and functional components.
 */

import {
  $,
  $e,
  div,
  section,
  h1,
  h2,
  h3,
  p,
  button,
  span,
  input,
  pre,
  code,
} from "../core/mod";

// ============================================================================
// Reusable Components
// ============================================================================

// Shared base styles - now works with object spread thanks to (string & {}) fallback!
const buttonBase = {
  padding: "0.75rem 1.5rem",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
};

function Button(
  text: string,
  variant: "primary" | "secondary" = "primary",
  onclick?: () => void
) {
  const style =
    variant === "primary"
      ? {
          ...buttonBase,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
        }
      : {
          ...buttonBase,
          background: "#fff",
          color: "#333",
          border: "2px solid #e0e0e0",
        };

  return button(text, {
    style,
    onclick,
    onmouseover: (e) => {
      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
    },
    onmouseout: (e) => {
      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
    },
  });
}

function FeatureCard(icon: string, title: string, desc: string) {
  return div(
    {
      style: {
        padding: "2rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "transform 0.2s, box-shadow 0.2s",
      },
      onmouseover: (e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
      },
      onmouseout: (e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
      },
    },
    () => {
      div(icon, {
        style: { fontSize: "2rem", marginBottom: "1rem" },
      });
      h3(title, {
        style: {
          fontSize: "1.25rem",
          marginBottom: "0.5rem",
          color: "#1a1a1a",
        },
      });
      p(desc, {
        style: {
          color: "#666",
          lineHeight: "1.6",
          margin: "0",
        },
      });
    }
  );
}

function CodeBlock(codeText: string) {
  return pre(
    {
      style: {
        background: "#1e1e1e",
        color: "#d4d4d4",
        padding: "1.5rem",
        borderRadius: "8px",
        overflow: "auto",
        fontSize: "0.9rem",
        lineHeight: "1.6",
        margin: "0",
      },
    },
    () => {
      code(codeText);
    }
  );
}

// ============================================================================
// Landing Page Sections
// ============================================================================

function HeroSection() {
  section(
    {
      style: {
        padding: "6rem 2rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        textAlign: "center",
        color: "#fff",
      },
    },
    () => {
      h1("Close to the Metal JavaScript", {
        style: {
          fontSize: "3.5rem",
          fontWeight: "800",
          marginBottom: "1.5rem",
          lineHeight: "1.2",
        },
      });

      p("2KB gzipped. No virtual DOM. No abstractions. Just you and the DOM.", {
        style: {
          fontSize: "1.25rem",
          opacity: "0.9",
          maxWidth: "600px",
          margin: "0 auto 2.5rem auto",
          lineHeight: "1.6",
        },
      });

      div({ style: { display: "flex", gap: "1rem", justifyContent: "center" } }, () => {
        Button("Get Started", "primary", () => {
          console.log("Get Started clicked!");
        });
        button("View on GitHub", {
          style: {
            padding: "0.75rem 1.5rem",
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
          },
        });
      });
    }
  );
}

function FeaturesSection() {
  const features = [
    { icon: "📦", title: "Zero Dependencies", desc: "No bloat. Just the code you need. Pure JavaScript all the way down." },
    { icon: "🪶", title: "2KB Gzipped", desc: "Tiny footprint means faster load times and happier users." },
    { icon: "🔒", title: "Type-Safe", desc: "Built with TypeScript for excellent DX and autocomplete." },
    { icon: "⚡", title: "Reactive Signals", desc: "Fine-grained reactivity with automatic dependency tracking." },
    { icon: "🚀", title: "No Build Step", desc: "Works directly in browsers. Just import and go." },
    { icon: "🏎️", title: "Native Speed", desc: "Direct DOM manipulation. No virtual DOM overhead." },
  ];

  section(
    {
      style: {
        padding: "5rem 2rem",
        background: "#f8f9fa",
      },
    },
    () => {
      h2("Why Fia?", {
        style: {
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "3rem",
          color: "#1a1a1a",
        },
      });

      div(
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            maxWidth: "1100px",
            margin: "0 auto",
          },
        },
        () => {
          features.forEach((f) => {
            FeatureCard(f.icon, f.title, f.desc);
          });
        }
      );
    }
  );
}

function InteractiveDemoSection() {
  // Reactive state
  const count = $(0);
  const r = $(102);
  const g = $(126);
  const b = $(234);

  // Computed values
  const doubled = $(() => count.value * 2);
  const rgbString = $(() => `rgb(${r.value}, ${g.value}, ${b.value})`);

  // Effect - logs when count changes
  $e(() => {
    if (count.value > 0) {
      console.log(`Count changed to: ${count.value}`);
    }
  });

  section(
    {
      style: {
        padding: "5rem 2rem",
        background: "#fff",
      },
    },
    () => {
      h2("See It In Action", {
        style: {
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "1rem",
          color: "#1a1a1a",
        },
      });

      p("These demos are powered by reactive signals - change a value and watch everything update.", {
        style: {
          textAlign: "center",
          color: "#666",
          marginBottom: "3rem",
          fontSize: "1.1rem",
        },
      });

      div(
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            maxWidth: "900px",
            margin: "0 auto",
          },
        },
        () => {
          // Counter Demo
          div(
            {
              style: {
                padding: "2rem",
                background: "#f8f9fa",
                borderRadius: "12px",
                textAlign: "center",
              },
            },
            () => {
              h3("Reactive Counter", {
                style: { marginBottom: "1.5rem", color: "#333" },
              });

              div(
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  },
                },
                () => {
                  button("-", {
                    style: {
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#e0e0e0",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    },
                    onclick: () => count.value--,
                  });

                  span($(() => String(count.value)), {
                    style: {
                      fontSize: "3rem",
                      fontWeight: "bold",
                      minWidth: "80px",
                      color: "#667eea",
                    },
                  });

                  button("+", {
                    style: {
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#667eea",
                      color: "#fff",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    },
                    onclick: () => count.value++,
                  });
                }
              );

              p($(() => `Doubled: ${doubled.value}`), {
                style: { color: "#666", margin: "0" },
              });
            }
          );

          // Color Picker Demo
          div(
            {
              style: {
                padding: "2rem",
                background: "#f8f9fa",
                borderRadius: "12px",
              },
            },
            () => {
              h3("Reactive Styles", {
                style: { marginBottom: "1.5rem", color: "#333", textAlign: "center" },
              });

              // Color preview box with reactive background
              div({
                style: {
                  width: "100%",
                  height: "80px",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
                  backgroundColor: rgbString,
                  transition: "background-color 0.2s",
                },
              });

              // RGB sliders
              const SliderRow = (label: string, value: typeof r, color: string) => {
                div(
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.75rem",
                    },
                  },
                  () => {
                    span(label, {
                      style: { width: "20px", fontWeight: "bold", color },
                    });
                    input({
                      type: "range",
                      min: "0",
                      max: "255",
                      value: String(value.value),
                      style: { flex: "1" },
                      oninput: (e) => {
                        value.value = parseInt((e.target as HTMLInputElement).value);
                      },
                    });
                    span($(() => String(value.value)), {
                      style: { width: "35px", textAlign: "right", fontSize: "0.9rem" },
                    });
                  }
                );
              };

              SliderRow("R", r, "#e53935");
              SliderRow("G", g, "#43a047");
              SliderRow("B", b, "#1e88e5");
            }
          );
        }
      );
    }
  );
}

function CodeExampleSection() {
  const exampleCode = `// Create reactive signals
const count = $(0);
const doubled = $(() => count.value * 2);

// Build UI with functions
button("Increment", {
  onclick: () => count.value++
});

// Reactive text updates automatically
p($(() => \`Count: \${count.value}\`));
p($(() => \`Doubled: \${doubled.value}\`));`;

  section(
    {
      style: {
        padding: "5rem 2rem",
        background: "#1a1a2e",
        color: "#fff",
      },
    },
    () => {
      div(
        {
          style: {
            maxWidth: "800px",
            margin: "0 auto",
          },
        },
        () => {
          h2("Simple by Design", {
            style: {
              fontSize: "2.5rem",
              marginBottom: "1rem",
              textAlign: "center",
            },
          });

          p("No JSX. No templates. No magic. Just JavaScript functions that create real DOM elements.", {
            style: {
              textAlign: "center",
              opacity: "0.8",
              marginBottom: "2.5rem",
              fontSize: "1.1rem",
            },
          });

          CodeBlock(exampleCode);
        }
      );
    }
  );
}

function FooterSection() {
  div(
    {
      style: {
        padding: "3rem 2rem",
        background: "#111",
        color: "#888",
        textAlign: "center",
      },
    },
    () => {
      p("Built with Fia - The 2KB UI Framework", {
        style: { marginBottom: "0.5rem" },
      });
      p("No dependencies. No compromises.", {
        style: { fontSize: "0.9rem", opacity: "0.7", margin: "0" },
      });
    }
  );
}

// ============================================================================
// Main Landing Page
// ============================================================================

export default function LandingPage() {
  div(
    {
      style: {
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        margin: "0",
        padding: "0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      },
    },
    () => {
      HeroSection();
      FeaturesSection();
      InteractiveDemoSection();
      CodeExampleSection();
      FooterSection();
    }
  );
}

// Auto-run when accessed directly
LandingPage();
