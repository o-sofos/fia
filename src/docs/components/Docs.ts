import {
  section,
  div,
  h2,
  h3,
  h4,
  p,
  pre,
  ul,
  li,
  span,
  getCurrentContext,
  a,
  img,
  button,
  $,
  Mut,
} from "fia";

// Helper to append text nodes
const t = (text: string) => {
  getCurrentContext().appendChild(document.createTextNode(text));
};

// --- Styled Components ---

const SyntaxHighlight = (codeStr: string) => {
  // Very basic syntax highlighting for demo purposes
  const parts = codeStr.split(
    /(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g,
  );

  parts.forEach((part) => {
    if (part.startsWith("//")) {
      span({ style: { color: "var(--syntax-comment)" }, textContent: part });
    } else if (
      part.startsWith('"') ||
      part.startsWith("'") ||
      part.startsWith("`")
    ) {
      span({ style: { color: "var(--syntax-string)" }, textContent: part });
    } else if (
      [
        "const",
        "import",
        "from",
        "function",
        "return",
        "if",
        "else",
        "true",
        "false",
      ].includes(part)
    ) {
      span({ style: { color: "var(--syntax-keyword)" }, textContent: part });
    } else if (
      [
        "div",
        "button",
        "h1",
        "p",
        "ul",
        "li",
        "input",
        "span",
        "console",
        "log",
        "map",
        "filter",
        "Show",
        "Each",
        "Match",
      ].includes(part)
    ) {
      span({ style: { color: "var(--syntax-function)" }, textContent: part });
    } else {
      t(part);
    }
  });
};

const CodeBlock = (content: string) =>
  div(
    {
      class: "code-block animate-fade-up",
      style: {
        // background: "var(--mongo-forest)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        margin: "1.5rem 0",
        border: "1px solid var(--mongo-slate)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.9rem",
        lineHeight: "1.6",
        overflow: "hidden",
      },
    },
    () => {
      // Window Controls + Copy Button
      div(
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          },
        },
        () => {
          // Controls
          div(
            { style: { display: "flex", gap: "0.5rem", opacity: "0.6" } },
            () => {
              div({
                style: {
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#ff5f56",
                },
              });
              div({
                style: {
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#ffbd2e",
                },
              });
              div({
                style: {
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#27c93f",
                },
              });
            },
          );

          // Copy Button
          const copied = $(Mut(false));
          button({
            textContent: $(() => (copied.value ? "Copied!" : "Copy")),
            style: {
              background: "transparent",
              border: "1px solid var(--mongo-slate)",
              color: $(() =>
                copied.value ? "var(--mongo-green)" : "var(--text-secondary)",
              ),
              borderRadius: "4px",
              padding: "2px 8px",
              fontSize: "0.75rem",
              cursor: "pointer",
              transition: "all 0.2s",
              opacity: "0.8",
            },
            onclick: () => {
              navigator.clipboard.writeText(content);
              copied.value = true;
              setTimeout(() => (copied.value = false), 2000);
            },
          });
        },
      );

      // Code Content
      pre({ style: { margin: "0", overflowX: "auto" } }, () => {
        SyntaxHighlight(content);
      });
    },
  );

const Section = (title: string, id: string, children: () => void) => {
  section(
    {
      id,
      class: "animate-fade-up",
      style: { marginBottom: "var(--spacing-xl)", scrollMarginTop: "120px" },
    },
    () => {
      div(
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          },
        },
        () => {
          // Simple geometric icon
          div({
            style: {
              width: "4px",
              height: "32px",
              background: "var(--mongo-green)",
              borderRadius: "2px",
            },
          });
          h2({
            style: {
              fontSize: "2rem",
              color: "var(--mongo-white)",
              letterSpacing: "-0.5px",
            },
            textContent: title,
          });
        },
      );
      children();
    },
  );
};

const SubSection = (title: string, children: () => void) => {
  div({ style: { marginBottom: "2.5rem" } }, () => {
    h3({
      style: {
        fontSize: "1.5rem",
        marginBottom: "1rem",
        color: "var(--mongo-green)",
      },
      textContent: title,
    });
    children();
  });
};

const SubSubSection = (title: string, children: () => void) => {
  div({ style: { marginBottom: "1.5rem" } }, () => {
    h4({
      style: {
        fontSize: "1.2rem",
        marginBottom: "0.75rem",
        color: "var(--mongo-white)",
        fontWeight: "600",
      },
      textContent: title,
    });
    children();
  });
};

const Paragraph = (text: string) =>
  p(
    {
      style: {
        marginBottom: "1rem",
        lineHeight: "1.8",
        color: "var(--text-secondary)",
        fontSize: "1.05rem",
      },
    },
    () => t(text),
  );

const List = (items: string[]) =>
  ul(
    {
      style: {
        marginLeft: "1.5rem",
        marginBottom: "1.5rem",
        color: "var(--text-secondary)",
        lineHeight: "1.8",
      },
    },
    () => {
      items.forEach((item) => li(item));
    },
  );

const Note = (text: string, type: "info" | "warning" = "info") =>
  div(
    {
      style: {
        background:
          type === "warning"
            ? "rgba(255, 189, 46, 0.1)"
            : "rgba(0, 237, 100, 0.05)",
        borderLeft: `4px solid ${type === "warning" ? "#ffbd2e" : "var(--mongo-green)"}`,
        padding: "1rem",
        borderRadius: "0 0.5rem 0.5rem 0",
        marginBottom: "1.5rem",
        color: type === "warning" ? "#ffbd2e" : "var(--mongo-green)",
      },
    },
    () => t(text),
  );

// --- Navigation Data ---

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "why-fia", title: "Why Fia?" },
  { id: "getting-started", title: "Getting Started" },
  { id: "element-api", title: "Element API" },
  { id: "element-factory-types", title: "Element Factory Types" },
  { id: "reactivity", title: "Reactivity" },
  { id: "immutability", title: "Immutability" },
  { id: "control-flow", title: "Control Flow" },
  { id: "components", title: "Components" },

  { id: "performance", title: "Performance" },
  { id: "examples", title: "Examples" },
];

const TableOfContents = () => {
  const activeSection = $(Mut("intro"));

  // Track scroll position to highlight active section
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 150; // Offset for navbar

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i].id);
      if (section && section.offsetTop <= scrollPosition) {
        activeSection.value = sections[i].id;
        break;
      }
    }
  };

  // Setup scroll listener on mount
  if (typeof window !== "undefined") {
    // Initialize on next tick to ensure DOM is ready
    setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Set initial active section
    }, 0);
  }

  return div(
    {
      class: "toc-container",
      style: {
        position: "sticky",
        top: "120px",
        height: "fit-content",
        maxHeight: "calc(100vh - 140px)",
        overflowY: "auto",
        paddingRight: "1rem",
        width: "220px",
        flexShrink: "0",
      },
    },
    () => {
      div(
        {
          style: {
            borderLeft: "2px solid var(--mongo-slate)",
            paddingLeft: "1rem",
          },
        },
        () => {
          h3({
            style: {
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: "600",
            },
          });

          ul(
            { style: { listStyle: "none", padding: "0", margin: "0" } },
            () => {
              sections.forEach((section) => {
                li({ style: { marginBottom: "0.5rem" } }, () => {
                  a({
                    href: `#${section.id}`,
                    style: {
                      color: $(() =>
                        activeSection.value === section.id
                          ? "var(--mongo-green)"
                          : "var(--text-secondary)",
                      ),
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      display: "block",
                      padding: "0.25rem 0",
                      transition: "color 0.2s",
                      fontWeight: $(() =>
                        activeSection.value === section.id ? "600" : "400",
                      ),
                      borderLeft: $(() =>
                        activeSection.value === section.id
                          ? "2px solid var(--mongo-green)"
                          : "2px solid transparent",
                      ),
                      paddingLeft: "0.5rem",
                      marginLeft: "-0.5rem",
                    },
                    textContent: section.title,
                    onclick: (e) => {
                      e.preventDefault();
                      const target = document.getElementById(section.id);
                      if (target) {
                        const offset = 100;
                        const targetPosition = target.offsetTop - offset;
                        window.scrollTo({
                          top: targetPosition,
                          behavior: "smooth",
                        });
                        activeSection.value = section.id;
                      }
                    },
                  });
                });
              });
            },
          );
        },
      );
    },
  );
};

// --- Main Component ---

export const Docs = () =>
  div(
    {
      id: "docs",
      class: "container",
      style: {
        display: "flex",
        gap: "3rem",
        maxWidth: "1400px",
        margin: "0 auto",
        paddingBottom: "var(--spacing-xl)",
        paddingLeft: "2rem",
        paddingRight: "2rem",
      },
    },
    () => {
      // Table of Contents - Sticky Sidebar
      TableOfContents();

      // Main Content
      div(
        {
          style: {
            flex: "1",
            minWidth: "0", // Prevent flex item from overflowing
            maxWidth: "800px",
          },
        },
        () => {
          // Overview Badges
          div(
            {
              style: {
                display: "flex",
                gap: "0.5rem",
                marginBottom: "2rem",
                marginTop: "1rem",
              },
            },
            () => {
              a({ href: "https://jsr.io/@fia/core", target: "_blank" }, () => {
                img({
                  src: "https://jsr.io/badges/@fia/core",
                  alt: "jsr-badge",
                });
              });
              a({ href: "https://jsr.io/@fia/core", target: "_blank" }, () => {
                img({
                  src: "https://jsr.io/badges/@fia/core/score",
                  alt: "score-badge",
                });
              });
            },
          );

          Section("Introduction", "intro", () => {
            Paragraph(
              "Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.",
            );
          });

          Section("Why Fia?", "why-fia", () => {
            Paragraph(
              "While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision.",
            );
            ul(
              {
                style: {
                  marginLeft: "1.5rem",
                  marginBottom: "1.5rem",
                  color: "var(--text-secondary)",
                },
              },
              () => {
                li({ style: { marginBottom: "0.5rem" } }, () => {
                  span({
                    style: { color: "var(--mongo-white)", fontWeight: "600" },
                    textContent: "True Fine-Grained Reactivity: ",
                  });
                  t(
                    "Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.",
                  );
                });
                li({ style: { marginBottom: "0.5rem" } }, () => {
                  span({
                    style: { color: "var(--mongo-white)", fontWeight: "600" },
                    textContent: "End-to-End Type Safety: ",
                  });
                  t(
                    "Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.",
                  );
                });
                li({ style: { marginBottom: "0.5rem" } }, () => {
                  span({
                    style: { color: "var(--mongo-white)", fontWeight: "600" },
                    textContent: "Zero-Abstraction Feel: ",
                  });
                  t(
                    "Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.",
                  );
                });
                li({ style: { marginBottom: "0.5rem" } }, () => {
                  span({
                    style: { color: "var(--mongo-white)", fontWeight: "600" },
                    textContent: "Minimal Footprint: ",
                  });
                  t(
                    "Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.",
                  );
                });
              },
            );
          });

          Section("Getting Started", "getting-started", () => {
            SubSection("Prerequisites", () => {
              Paragraph(
                "Fia is compatible with any modern JavaScript runtime.",
              );
              List(["Node.js (v18.0.0+)", "Bun (v1.0.0+)", "Deno (v1.30.0+)"]);
            });

            SubSection("Installation", () => {
              Paragraph(
                "Fia is published on JSR. Install it using your preferred package manager:",
              );

              div({ style: { marginBottom: "1rem" } }, () => {
                h4({
                  style: {
                    color: "var(--mongo-white)",
                    marginBottom: "0.5rem",
                  },
                  textContent: "Deno",
                });
                CodeBlock("deno add jsr:@fia/core");
              });

              div({ style: { marginBottom: "1rem" } }, () => {
                h4({
                  style: {
                    color: "var(--mongo-white)",
                    marginBottom: "0.5rem",
                  },
                  textContent: "Bun",
                });
                Paragraph(
                  '1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc',
                );
                Paragraph("2. Install (aliased as 'fia'):");
                CodeBlock("bun add fia@npm:@jsr/fia__core");
              });

              div({ style: { marginBottom: "1rem" } }, () => {
                h4({
                  style: {
                    color: "var(--mongo-white)",
                    marginBottom: "0.5rem",
                  },
                  textContent: "Node.js (npm/yarn/pnpm)",
                });
                CodeBlock("npx jsr add @fia/core");
              });

              Note(
                "The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.",
                "info",
              );
            });

            SubSection("Updating", () => {
              Paragraph(
                "To update to the latest version, run the installation command again (or use your package manager's update command).",
              );
              CodeBlock(
                `# Deno\ndeno add jsr:@fia/core\n\n# Bun\nbun add fia@npm:@jsr/fia__core\n\n# Node.js\nnpx jsr add @fia/core`,
              );
            });

            SubSection("Quick Start", () => {
              Paragraph("Create your first reactive app in seconds.");
              CodeBlock(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1("Counter App");
  p($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`);
            });

            SubSection("Mounting", () => {
              Paragraph(
                "For Single Page Apps (SPAs), use the mount helper to attach to a root element.",
              );
              CodeBlock(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`);
            });
          });

          Section("Element API", "element-api", () => {
            Paragraph(
              "Fia elements have a simple, consistent API. Functions match HTML tag names.",
            );
            CodeBlock(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`);

            //             SubSubSection("Text Content", () => {
            //               Paragraph(
            //                 "Use the native textContent prop for static or reactive text.",
            //               );
            //               CodeBlock(`// Static text
            // h1("Hello World");

            // // Reactive text
            // const name = $("Evan");
            // p(name);

            // // Computed text
            // p(() => \`Hello, \${name.value}!\`);`);
            //             });

            SubSubSection("Event Handlers", () => {
              Paragraph(
                "Event handlers are delegated automatically for performance.",
              );
              CodeBlock(`button("Click me", () => console.log("clicked!"));

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`);
            });

            SubSubSection("Nesting Elements", () => {
              Paragraph("Use a callback function to nest elements.");
              CodeBlock(`div({ class: "card" }, () => {
  h1("Title");
  p("Description");
});`);
            });

            SubSubSection("Void Elements", () => {
              Paragraph("Elements like input, img, br only accept props.");
              CodeBlock(`input({ type: "email", placeholder: "you@example.com" });
img("/photo.jpg", "Photo");
br();`);
            });

            SubSubSection("onMount Callback", () => {
              Paragraph(
                "Access layout properties after the element is in the DOM.",
              );
              CodeBlock(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`);
            });
          });

          Section("Element Factory Types", "element-factory-types", () => {
            Paragraph(
              "Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns.",
            );

            SubSection("Standard Elements (4 overloads)", () => {
              Paragraph(
                "Used for semantic structure elements. These factories support the base patterns:",
              );
              CodeBlock(`// 1. Empty element
article();

// 2. Props only
article({ id: "post-1", class: "article" });

// 3. Children only
article(() => {
  h2("Title");
  p("Content");
});

// 4. Props + children (most common)
article({ class: "post" }, () => {
  h2("Article Title");
  p("Article body...");
});`);
              Note(
                "Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.",
              );
            });

            SubSection("Text Elements (11 overloads)", () => {
              Paragraph(
                "Optimized for elements that commonly hold text content with convenient text-first syntax.",
              );
              CodeBlock(`// All standard overloads plus text shortcuts:

// 5. Text content (static or reactive)
h1("Hello World");
h1($(() => \`Count: \${count.value}\`));

// 6. Text + props
h1("Hello", { class: "title", style: { color: "blue" } });

// 7. Text + children
h1("Header", () => {
  span("with nested content");
});

// 8. Text + props + children (all three!)
h1("Main Title", { class: "hero" }, () => {
  span("subtitle", { class: "sub" });
});`);
              Note(
                "Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.",
              );
            });

            SubSection("Interactive Elements (10 overloads)", () => {
              Paragraph(
                "Special factories for interactive elements with text + click handler shorthand.",
              );
              CodeBlock(`// All text element overloads plus click shorthand:

// 9. Text + click handler shorthand (special!)
button("Delete", () => {
  console.log("Delete clicked!");
});

// Equivalent full props version:
button({
  textContent: "Delete",
  onclick: () => console.log("Delete clicked!"),
  class: "btn-danger"
});`);
              Note("Elements: button, summary, option, optgroup.");
            });

            SubSection("Void Elements (1 overload)", () => {
              Paragraph("Self-closing elements that cannot have children.");
              CodeBlock(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`);
              Note(
                "Elements: input, br, hr, img, area, base, col, link, meta, and more.",
              );
            });

            SubSection("Type Safety Benefits", () => {
              Paragraph(
                "All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation.",
              );
              CodeBlock(`// TypeScript knows this is an HTMLInputElement
input({
  type: "email",
  oninput: (e) => {
    // e.currentTarget is HTMLInputElement
    console.log(e.currentTarget.value); // ✅ Type-safe
  }
});

// ARIA attributes with autocomplete
button({
  textContent: "Menu",
  ariaExpanded: $(false),      // "true" | "false" | "undefined"
  ariaHasPopup: "menu",         // Autocomplete shows valid values!
  onclick: () => console.log("Toggle menu")
});`);
            });
          });

          Section("Reactivity", "reactivity", () => {
            SubSection("Signals", () => {
              Paragraph("Signals are the primitive units of reactivity.");
              CodeBlock(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`);
            });
            SubSection("Reactive Stores", () => {
              Paragraph(
                "Fia stores are immutable by default for predictability.",
              );
              CodeBlock(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`);
              Note(
                "Destructuring breaks reactivity. Always access properties directly: state.count",
                "warning",
              );
              Note(
                "Immutable stores are physically frozen with Object.freeze(). Any attempt to mutate them via $raw or other means will fail.",
                "info",
              );
            });
            SubSection("Computed Values", () => {
              Paragraph(
                "Computed signals automatically track dependencies and update when they change.",
              );
              CodeBlock(`const count = $(0);
const doubled = $(() => count.value * 2);`);
            });
            SubSection("Effects", () => {
              Paragraph(
                "Use $e() to run side effects when dependencies change.",
              );
              CodeBlock(`$e(() => {
  console.log("Count changed to:", count.value);
});`);
            });
          });

          Section("Immutability", "immutability", () => {
            Paragraph(
              "Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles.",
            );
            SubSection("Data Types & Behavior", () => {
              SubSubSection("1. Primitives (String, Number, Boolean)", () => {
                Paragraph("Primitives are immutable by default. To make them mutable, use Mut.");
                CodeBlock(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`);
              });

              SubSubSection("2. Objects", () => {
                Paragraph("Objects are shallowly immutable by default. You cannot add, remove, or change properties.");
                CodeBlock(`const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.`);

                Paragraph("Mutable Objects:");
                CodeBlock("// Option A: Specific keys\n" +
                  "const state = $({ count: 0 }, \"count\");\n" +
                  "state.count++;\n\n" +
                  "// Option B: Full object mutability\n" +
                  "const config = $(Mut({ theme: \"dark\", debug: false }));\n" +
                  "config.theme = \"light\";\n" +
                  "config.debug = true;\n\n" +
                  "// Option C: Selective Nested Mutability\n" +
                  "const user = $({\n" +
                  "  name: \"Evan\",\n" +
                  "  settings: {\n" +
                  "    notifications: Mut(true), // Mutable Primitive: can be replaced\n" +
                  "    theme: \"dark\"             // Read-only\n" +
                  "  }\n" +
                  "});\n" +
                  "user.settings.notifications = false; // Works!\n\n" +
                  "// Note: Mut({}) on an object makes its *properties* mutable,\n" +
                  "// unless the parent key is also mutable.");
              });

              SubSubSection("Secure Immutability by Design", () => {
                Paragraph("Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone.");
                CodeBlock("const original = $({ name: \"Evan\", details: { age: 30 } });\n" +
                  "const snapshot = { ...original };\n\n" +
                  "// To create a truly independent reactive copy:\n" +
                  "const clone = $({ ...original }); // New store with copied values");
                Note("This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.", "info");
              });

              SubSubSection("3. Arrays", () => {
                Paragraph("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error.");
                CodeBlock("const list = $({ items: [1, 2, 3] });\n" +
                  "// ❌ Error: Property 'push' does not exist on type 'readonly number[]'\n" +
                  "// list.items.push(4);\n\n" +
                  "// ✅ Valid: Replace array\n" +
                  "// list.items = [...list.items, 4]; // Only works if 'items' key is mutable");

                Paragraph("Mutable Arrays:");
                CodeBlock("const todos = $(Mut({ list: [] as string[] }));\n\n" +
                  "// ✅ Valid: Mutation methods work\n" +
                  "todos.list.push(\"Buy milk\");\n" +
                  "todos.list.splice(0, 1);");
              });

              SubSubSection("4. Nested Objects (Deep Reactivity)", () => {
                Paragraph("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects.");
                CodeBlock("const app = $(Mut({\n" +
                  "  settings: {\n" +
                  "    notifications: { email: true }\n" +
                  "  }\n" +
                  "}));\n\n" +
                  "// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)\n" +
                  "app.settings.notifications.email = false;\n\n" +
                  "// ℹ️ Pattern: Immutable Tree with Mutable Root\n" +
                  "// If 'settings' wasn't mutable, you'd do:\n" +
                  "// app.settings = { ...app.settings, notifications: { ... } };");
              });
            });
          });

          Section("Control Flow", "control-flow", () => {
            SubSection("Show", () => {
              Paragraph(
                "Conditionally render content that updates when the condition changes.",
              );
              CodeBlock(
                `Show(() => isVisible.value, () => div("Hello!"));`,
              );
            });
            SubSection("Each", () => {
              Paragraph("Reactive list rendering that re-renders efficiently.");
              CodeBlock(`const items = $({ list: ["Apple", "Banana"] });
Each(items.list, item => li(item));`);
            });
            SubSection("Match", () => {
              Paragraph("Reactive pattern matching for switch/case logic.");
              CodeBlock(`Match(() => status.value, {
  loading: () => p("Loading..."),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`);
            });
          });

          Section("Component Composition", "components", () => {
            Paragraph(
              "In Fia, components are just functions. There is no special class or type.",
            );
            SubSection("Basic Component", () => {
              CodeBlock(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`);
            });
            SubSection("Children & Layouts", () => {
              Paragraph(
                "To create wrapper components, pass a callback function as a child prop.",
              );
              CodeBlock(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`);
            });
          });

          Section("Performance", "performance", () => {
            Paragraph("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity.");

            SubSection("Event Delegation", () => {
              Paragraph("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type.");

              CodeBlock(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`);

              SubSubSection("How it works", () => {
                List([
                  "One global listener per event type (click, input, etc.)",
                  "Handlers stored in WeakMap<Element, Handler>",
                  "Automatic cleanup when elements are removed",
                  "Dynamic elements work without rebinding"
                ]);
              });

              SubSubSection("Benefits", () => {
                List([
                  "Memory efficient: 100 buttons = 1 listener (not 100)",
                  "Faster event dispatch: Single lookup",
                  "No memory leaks from forgotten listeners",
                  "Works with dynamically created elements"
                ]);
              });

              CodeBlock(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`);
            });

            SubSection("Automatic Fragment Batching", () => {
              Paragraph("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment.");

              CodeBlock(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1("Title");    // → Fragment
  p("Para 1");     // → Fragment
  p("Para 2");     // → Fragment
});
// Single appendChild(fragment)`);

              SubSubSection("How it works", () => {
                List([
                  "Children callback creates a DocumentFragment",
                  "All child elements append to fragment (in-memory)",
                  "Complete fragment inserted in one operation",
                  "Browser performs one reflow instead of multiple"
                ]);
              });

              SubSubSection("Benefits", () => {
                List([
                  "Single reflow: N insertions = 1 reflow (not N)",
                  "Faster rendering with 10+ children",
                  "Automatic - no manual optimization needed",
                  "Composable with nested structures"
                ]);
              });

              CodeBlock(`// Fia automatically batches 100 elements
div(() => {
  h1("Title");
  ul(() => {
    for (let i = 0; i < 100; i++) {
      li(\`Item \${i}\`);
    }
  });
  p("Footer");
});
// Result: 2 reflows total
// Traditional: 102 reflows`);
            });

            SubSection("Fine-Grained Reactivity", () => {
              Paragraph("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements.");

              CodeBlock(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p(() => \`Count: \${count.value}\`); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`);
            });

            SubSection("Best Practices", () => {
              SubSubSection("1. Batch Multiple Updates", () => {
                CodeBlock(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`);
              });

              SubSubSection("2. Use peek() for Non-Reactive Reads", () => {
                CodeBlock(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`);
              });

              SubSubSection("3. Memoize Expensive Computations", () => {
                CodeBlock(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`);
              });
            });
          });

          Section("Examples", "examples", () => {
            SubSection("🟢 Beginner", () => {
              SubSubSection("1. Hello World", () => {
                Paragraph("The simplest possible Fia code.");
                CodeBlock(`h1("Hello, World!");`);
              });

              SubSubSection("2. Counter", () => {
                Paragraph("Signals hold reactive state.");
                CodeBlock(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`);
              });

              SubSubSection("3. Toggle", () => {
                Paragraph("Computed signals derive values from other signals.");
                CodeBlock(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
Show(visible, () => p("Now you see me!"));`);
              });

              SubSubSection("4. Input Binding", () => {
                Paragraph("Two-way binding is manual but explicit.");
                CodeBlock(`const name = $(Mut(""));
input({ type: "text", oninput: (e) => name.value = e.currentTarget.value });
p($(() => \`Hello, \${name.value || "stranger"}!\`));`);
              });

              SubSubSection("5. List Rendering (Static)", () => {
                Paragraph("For simple static lists, forEach works fine.");
                CodeBlock(`const items = ["Apple", "Banana", "Cherry"];
ul(() => Each(items, li));`);
              });
            });

            SubSection("🟡 Intermediate", () => {
              SubSubSection("6. Reactive Store Counter", () => {
                Paragraph("Objects passed to $() become reactive stores.");
                CodeBlock(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`);
              });

              SubSubSection("7. Conditional Classes", () => {
                Paragraph("Computed signals work in class props too.");
                CodeBlock(`const active = $(Mut(false));
button($(() => active.value ? "Deactivate" : "Activate"), () => active.value = !active.value);`);
              });

              SubSubSection("8. Form Handling", () => {
                Paragraph("Reactive stores are perfect for forms.");
                CodeBlock(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`);
              });

              SubSubSection("9. Computed Values", () => {
                Paragraph("Track dependencies automatically.");
                CodeBlock(`const state = $(Mut({ price: 100, quantity: 2 }));
const total = $(() => state.price * state.quantity);

div(() => {
  p($(() => \`Price: $\${state.price}\`));
  p($(() => \`Qty: \${state.quantity}\`));
  p($(() => \`Total: $\${total.value}\`));
  button("Add", () => state.quantity++);
});`);
              });

              SubSubSection("10. Dynamic Styling", () => {
                Paragraph("Reactive styles allow theming.");
                CodeBlock(`const theme = $(Mut("light"));

div({
  style: {
    background: $(() => theme.value === "dark" ? "#222" : "#fff"),
    color: $(() => theme.value === "dark" ? "#fff" : "#222"),
    padding: "2rem",
  }
}, () => {
  button("Toggle Theme", () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  });
});`);
              });
            });

            SubSection("🔴 Advanced", () => {
              SubSubSection("11. Control Flow Combo (Each + Show + Match)", () => {
                Paragraph("A complete task manager combining all control flow components:");
                CodeBlock(`// Task manager example combining Each, Show, and Match
type Task = { id: number; text: string; completed: boolean };
type Filter = "all" | "active" | "completed";

const tasks = $(Mut<Task[]>([
  { id: 1, text: "Learn Fia", completed: true },
  { id: 2, text: "Build an app", completed: false },
  { id: 3, text: "Deploy to production", completed: false }
]));

const currentFilter = $(Mut<Filter>("all"));
const showCompleted = $(Mut(true));

// Computed: filtered tasks based on current filter and showCompleted toggle
const filteredTasks = $(() => {
  const filter = currentFilter.value;
  let result: typeof tasks = tasks;
  
  // Filter by completion status based on filter
  if (filter === "active") result = tasks.filter((t: Task) => !t.completed) as typeof tasks;
  else if (filter === "completed") result = tasks.filter((t: Task) => t.completed) as typeof tasks;
  
  // Additionally hide completed if showCompleted is false and filter is "all"
  if (filter === "all" && !showCompleted.value) {
    result = tasks.filter((t: Task) => !t.completed) as typeof tasks;
  }
  
  return result;
});

div({ style: { padding: "20px", maxWidth: "600px", margin: "0 auto" } }, () => {
  h2("Task Manager - Control Flow Demo");
  
  // Each: render filter buttons
  div({ style: { marginBottom: "20px", display: "flex", gap: "10px" } }, () => {
    const filters: Filter[] = ["all", "active", "completed"];
    Each(filters, (filter) => {
      button({
        textContent: filter.charAt(0).toUpperCase() + filter.slice(1),
        style: {
          padding: "8px 16px",
          background: $(() => currentFilter.value === filter ? "#4CAF50" : "#ddd"),
          color: $(() => currentFilter.value === filter ? "white" : "black"),
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        },
        onclick: () => currentFilter.value = filter
      });
    });
  });
  
  // Toggle to show/hide completed tasks
  div({ style: { marginBottom: "20px" } }, () => {
    button({
      textContent: $(() => showCompleted.value ? "Hide Completed" : "Show Completed"),
      onclick: () => showCompleted.value = !showCompleted.value
    });
    
    // Show: conditionally display completed stats
    Show(showCompleted, () => {
      const completedCount = $(() => tasks.filter((t: Task) => t.completed).length);
      p({
        style: { marginTop: "10px", padding: "10px", background: "#e3f2fd", borderRadius: "4px" },
        textContent: $(() => \`Completed: \${completedCount.value} / \${tasks.length}\`)
      });
    });
  });
  
  // Match: display different messages based on filter
  div({ style: { marginBottom: "20px", padding: "10px", background: "#fff3cd", borderRadius: "4px" } }, () => {
    p({
      style: { margin: "0", fontWeight: "bold" },
      textContent: Match(currentFilter, {
        "all": () => "📋 Showing all tasks",
        "active": () => "⚡ Showing active tasks",
        "completed": () => "✅ Showing completed tasks",
        _: () => "Unknown filter"
      })
    });
  });
  
  // Each: render the filtered task list
  ul({ style: { listStyle: "none", padding: "0" } }, () => {
    // Show: display message when no tasks match filter
    Show(() => filteredTasks.value.length === 0, () => {
      li({
        style: { padding: "20px", textAlign: "center", color: "#999" },
        textContent: Match(currentFilter, {
          "all": () => "No tasks yet!",
          "active": () => "No active tasks!",
          "completed": () => "No completed tasks!",
          _: () => "No tasks"
        })
      });
    });
    
    Each(filteredTasks, (task: Task) => {
      const taskCompleted = $(Mut(task.completed));
      li({
        style: {
          padding: "12px",
          marginBottom: "8px",
          background: $(() => taskCompleted.value ? "#f1f8f4" : "#fff"),
          border: "1px solid #ddd",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }
      }, () => {
        // Checkbox
        button({
          textContent: $(() => taskCompleted.value ? "✓" : "○"),
          style: {
            width: "24px",
            height: "24px",
            border: "2px solid #4CAF50",
            borderRadius: "50%",
            background: $(() => taskCompleted.value ? "#4CAF50" : "white"),
            color: "white",
            cursor: "pointer",
            fontSize: "14px"
          },
          onclick: () => {
            taskCompleted.value = !taskCompleted.value;
            task.completed = taskCompleted.value;
          }
        });
        
        // Task text
        p({
          style: {
            margin: "0",
            flex: "1",
            textDecoration: $(() => taskCompleted.value ? "line-through" : "none"),
            color: $(() => taskCompleted.value ? "#999" : "#333")
          },
          textContent: task.text
        });
      });
    });
  });
  
  // Add new task button
  button({
    textContent: "Add Random Task",
    style: {
      marginTop: "20px",
      padding: "10px 20px",
      background: "#2196F3",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    },
    onclick: () => {
      const newTask: Task = {
        id: Date.now(),
        text: \`Task \${tasks.length + 1}\`,
        completed: false
      };
      tasks.push(newTask);
    }
  });
});`);
              });

              SubSubSection("12. Todo App", () => {
                Paragraph("A complete todo app using Each.");
                CodeBlock(`const todos = $(Mut({ items: [] as string[], input: "" }));

div(() => {
  input({
    type: "text",
    value: $(() => todos.input),
    oninput: (e) => todos.input = e.currentTarget.value,
  });
  button("Add", () => {
      if (todos.input.trim()) {
        todos.items.push(todos.input);
        todos.input = "";
      }
    });
  ul(() => {
    Each(() => todos.items, (item, i) => {
      li(() => {
        span(item);
        button("×", () => todos.items.splice(i, 1));
      });
    });
  });
});`);
              });

              SubSubSection("12. Tabs Component", () => {
                Paragraph("Track active index and conditionally render.");
                CodeBlock(`const tabs = ["Home", "About", "Contact"];
const active = $(Mut(0));

div(() => {
  div({ class: "tabs" }, () => {
    tabs.forEach((tab, i) => {
      button(
        tab,
        { class: $(() => active.value === i ? "active" : "") },
        () => active.value = i
      );
    });
  });
  div({ class: "content" }, () => {
    // Match returns a signal, so we can use it directly in textContent!
    p(Match(() => active.value, {
        0: () => "Welcome to the Home page!",
        1: () => "About Fia Framework...",
        2: () => "Contact us at hello@fia.dev",
      })
    );
  });
});`);
              });

              SubSubSection("13. Async Data Fetching", () => {
                Paragraph("Use Match for loading states.");
                CodeBlock(`const state = $(Mut({
  status: "loading" as "loading" | "success" | "error",
  users: [] as string[]
}));

fetch("/api/users")
  .then(r => r.json())
  .then(users => {
    state.users = users;
    state.status = "success";
  })
  .catch(() => state.status = "error");

div(() => {
  Match(() => state.status, {
    loading: () => p("Loading..."),
    error: () => p("Failed to load users"),
    success: () => ul(() => Each(() => state.users, u => li(u))),
  });
});`);
              });

              SubSubSection("14. Modal Dialog", () => {
                Paragraph("Modal patterns with explicit types.");
                CodeBlock(`const modal = $(Mut({ open: false, title: "" }));

function openModal(title: string) {
  modal.title = title;
  modal.open = true;
}

button("Open Modal", () => openModal("Hello!"));

div({
  class: "modal-backdrop",
  style: { display: $(() => modal.open ? "flex" : "none") },
  onclick: () => modal.open = false,
}, () => {
  div({
    class: "modal",
    onclick: (e) => e.stopPropagation(),
  }, () => {
    h2($(() => modal.title));
    button("Close", () => modal.open = false);
  });
});`);
              });
            });
          });
        },
      ); // Close main content div
    },
  ); // Close docs container