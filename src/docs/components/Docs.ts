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
import { SyntaxHighlight } from "./SyntaxHighlight";
import { TabbedExample } from "./TabbedExample";

// Helper to append text nodes
const t = (text: string) => {
  getCurrentContext().appendChild(document.createTextNode(text));
};

// --- Styled Components ---


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

// Toast notification for copy feedback
const showToast = (message: string) => {
  const toast = document.createElement("div");
  toast.textContent = message;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%) translateY(20px)",
    background: "var(--mongo-green)",
    color: "var(--mongo-dark)",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.875rem",
    zIndex: "9999",
    opacity: "0",
    transition: "opacity 0.3s, transform 0.3s",
    pointerEvents: "none",
    boxShadow: "0 4px 20px rgba(0, 237, 100, 0.3)",
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 2000);
};

// Anchor link icon for headers — updates URL hash and copies link to clipboard
const AnchorLink = (id: string) => {
  a({
    href: `#${id}`,
    ariaLabel: "Link to this section",
    style: {
      opacity: "0",
      marginLeft: "0.5rem",
      color: "var(--text-tertiary)",
      textDecoration: "none",
      fontSize: "0.75em",
      transition: "opacity 0.2s, color 0.2s",
      cursor: "pointer",
      flexShrink: "0",
    },
    className: "anchor-link",
    textContent: "🔗",
    onclick: (e) => {
      e.preventDefault();
      history.replaceState(null, "", `#${id}`);
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        showToast("✓ Link copied to clipboard");
      });
      const target = document.getElementById(id);
      if (target) {
        const offset = 100;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    },
  });
};

const Section = (title: string, id: string, children: () => void) => {
  section(
    {
      id,
      class: "animate-fade-up heading-group",
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
          AnchorLink(id);
        },
      );
      children();
    },
  );
};

const SubSection = (title: string, idOrChildren: string | (() => void), children?: () => void) => {
  const id = typeof idOrChildren === 'string' ? idOrChildren : title.toLowerCase().replace(/\s+/g, "-");
  const childrenFn = typeof idOrChildren === 'function' ? idOrChildren : children!;

  div(
    {
      class: "heading-group",
      style: {
        marginBottom: "3rem",
        paddingBottom: "2rem",
        borderBottom: "1px solid var(--border-subtle)",
      },
    },
    () => {
      div(
        {
          style: {
            display: "flex",
            alignItems: "center",
            marginBottom: "1.5rem",
          },
        },
        () => {
          h3({
            id,
            style: {
              color: "var(--mongo-green)",
              fontSize: "1.5rem",
              scrollMarginTop: "120px",
            },
            textContent: title,
          });
          AnchorLink(id);
        },
      );
      childrenFn();
    },
  );
};

const SubSubSection = (title: string, idOrChildren: string | (() => void), children?: () => void) => {
  const id = typeof idOrChildren === 'string' ? idOrChildren : title.toLowerCase().replace(/\s+/g, "-");
  const childrenFn = typeof idOrChildren === 'function' ? idOrChildren : children!;

  div({ class: "heading-group", style: { marginBottom: "1.5rem" } }, () => {
    div(
      {
        style: {
          display: "flex",
          alignItems: "center",
          marginBottom: "0.75rem",
        },
      },
      () => {
        h4({
          id,
          style: {
            fontSize: "1.2rem",
            color: "var(--mongo-white)",
            fontWeight: "600",
            scrollMarginTop: "120px",
          },
          textContent: title,
        });
        AnchorLink(id);
      },
    );
    childrenFn();
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
  {
    id: "control-flow",
    title: "Control Flow",
    children: [
      { id: "control-flow-show", title: "Show" },
      { id: "control-flow-each", title: "Each" },
      {
        id: "control-flow-match",
        title: "Match",
        children: [
          { id: "match-strings", title: "Strings" },
          { id: "match-booleans", title: "Booleans" },
          { id: "match-numbers", title: "Numbers" },
        ]
      },
    ]
  },
  { id: "components", title: "Components" },

  { id: "performance", title: "Performance" },
  { id: "examples", title: "Examples" },
];

const TableOfContents = () => {
  const activeSection = $(Mut("intro"));

  // Track scroll position to highlight active section
  // Flatten all IDs from sections, children, and grandchildren
  const allIds: string[] = [];
  for (const s of sections) {
    allIds.push(s.id);
    if ((s as any).children) {
      for (const c of (s as any).children as any[]) {
        allIds.push(c.id);
        if (c.children) {
          for (const gc of c.children as any[]) {
            allIds.push(gc.id);
          }
        }
      }
    }
  }

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 150;
    let bestId = allIds[0];

    for (const id of allIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPosition) {
          bestId = id;
        }
      }
    }

    activeSection.value = bestId;
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
              // Helper: collect all descendant IDs for a section
              const getDescendantIds = (s: any): string[] => {
                const ids: string[] = [];
                if (s.children) {
                  for (const c of s.children) {
                    ids.push(c.id);
                    ids.push(...getDescendantIds(c));
                  }
                }
                return ids;
              };

              sections.forEach((section) => {
                const descendantIds = getDescendantIds(section);
                const isSectionActive = () =>
                  activeSection.value === section.id ||
                  descendantIds.includes(activeSection.value);

                li({ style: { marginBottom: "0.5rem" } }, () => {
                  a({
                    href: `#${section.id}`,
                    style: {
                      color: $(() =>
                        isSectionActive()
                          ? "var(--mongo-green)"
                          : "var(--text-secondary)",
                      ),
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      display: "block",
                      padding: "0.25rem 0",
                      transition: "color 0.2s",
                      fontWeight: $(() =>
                        isSectionActive() ? "600" : "400",
                      ),
                      borderLeft: $(() =>
                        isSectionActive()
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
                        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({
                          top: targetPosition,
                          behavior: "smooth",
                        });
                        activeSection.value = section.id;
                      }
                    },
                  });

                  // Render nested children if present
                  if ((section as any).children) {
                    ul(
                      { style: { listStyle: "none", padding: "0", marginTop: "0.5rem" } },
                      () => {
                        ((section as any).children as any[]).forEach((child: any) => {
                          li({ style: { marginBottom: "0.25rem" } }, () => {
                            a({
                              href: `#${child.id}`,
                              style: {
                                color: $(() =>
                                  activeSection.value === child.id
                                    ? "var(--mongo-green)"
                                    : "var(--text-tertiary)",
                                ),
                                textDecoration: "none",
                                fontSize: "0.8rem",
                                display: "block",
                                padding: "0.25rem 0 0.25rem 1.5rem",
                                transition: "color 0.2s",
                                fontWeight: $(() =>
                                  activeSection.value === child.id ? "600" : "400",
                                ),
                              },
                              textContent: child.title,
                              onclick: (e) => {
                                e.preventDefault();
                                const target = document.getElementById(child.id);
                                if (target) {
                                  const offset = 100;
                                  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                                  window.scrollTo({
                                    top: targetPosition,
                                    behavior: "smooth",
                                  });
                                }
                                activeSection.value = child.id;
                              },
                            });

                            // Render 2nd level nested children if present (for Match subsections)
                            if ((child as any).children) {
                              ul(
                                { style: { listStyle: "none", padding: "0", marginTop: "0.25rem" } },
                                () => {
                                  ((child as any).children as any[]).forEach((grandchild: any) => {
                                    li({ style: { marginBottom: "0.25rem" } }, () => {
                                      a({
                                        href: `#${grandchild.id}`,
                                        style: {
                                          color: $(() =>
                                            activeSection.value === grandchild.id
                                              ? "var(--mongo-green)"
                                              : "var(--text-tertiary)",
                                          ),
                                          textDecoration: "none",
                                          fontSize: "0.75rem",
                                          display: "block",
                                          padding: "0.25rem 0 0.25rem 3rem",
                                          transition: "color 0.2s",
                                          fontWeight: $(() =>
                                            activeSection.value === grandchild.id ? "600" : "400",
                                          ),
                                        },
                                        textContent: grandchild.title,
                                        onclick: (e) => {
                                          e.preventDefault();
                                          const target = document.getElementById(grandchild.id);
                                          if (target) {
                                            const offset = 100;
                                            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                                            window.scrollTo({
                                              top: targetPosition,
                                              behavior: "smooth",
                                            });
                                          }
                                          activeSection.value = grandchild.id;
                                        },
                                      });
                                    });
                                  });
                                }
                              );
                            }
                          });
                        });
                      }
                    );
                  }
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

            SubSection("Standard Elements", () => {
              Paragraph(
                "Used for semantic structure elements. Click each tab to see the different patterns for creating an article:",
              );

              TabbedExample([
                {
                  label: "Empty",
                  code: `// Empty element
article();`
                },
                {
                  label: "Props Only",
                  code: `// Props only
article({ 
  id: "post-1", 
  class: "article",
  role: "article"
});`
                },
                {
                  label: "Children",
                  code: `// Children callback only
article(() => {
  h2("Article Title");
  p("Article content goes here...");
});`
                },
                {
                  label: "Props + Children",
                  code: `// Props + children (most common) 
article({ class: "post" }, () => {
  h2("Article Title");
  p("Article body...");
  footer("Published: 2024");
});`
                }
              ]);

              Note(
                "Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.",
              );
            });

            SubSection("Text Elements", () => {
              Paragraph(
                "Optimized for elements that commonly hold text content. Click each tab to see different ways to create the same heading:",
              );

              TabbedExample([
                {
                  label: "Empty",
                  code: `// Empty element
h1();`
                },
                {
                  label: "Props Only",
                  code: `// Props only
h1({ 
  class: "title", 
  style: { color: "blue", fontSize: "32px" } 
});`
                },
                {
                  label: "Children",
                  code: `// Children callback
h1(() => {
  span("Welcome ");
  strong("User");
});`
                },
                {
                  label: "Props + Children",
                  code: `// Props + children
h1({ class: "hero" }, () => {
  span("Welcome ", { class: "greeting" });
  strong("User");
});`
                },
                {
                  label: "Text Content",
                  code: `// Text content shorthand 
h1("Welcome User");

// Also works with signals:
const user = $(Mut("User"));
h1($(() => \`Welcome \${user.value}\`));`
                },
                {
                  label: "Text + Props",
                  code: `// Text + props 
h1("Welcome User", { 
  class: "hero", 
  id: "main-heading" 
});`
                },
                {
                  label: "Text + Children",
                  code: `// Text + children
h1("Welcome", () => {
  strong(" User");
});`
                },
                {
                  label: "All Three",
                  code: `// Text + props + children 
h1("Welcome", { class: "hero" }, () => {
  strong(" User");
});`
                },
                {
                  label: "onMount",
                  code: `// With onMount callback
h1((el, onMount) => {
  el.textContent = "Welcome User";
  onMount(() => {
    console.log("Height:", el.offsetHeight);
  });
});

// Or with props:
h1({ class: "hero" }, (el, onMount) => {
  el.textContent = "Welcome User";
  onMount(() => el.scrollIntoView());
});`
                }
              ]);

              Note(
                "Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.",
              );
            });

            SubSection("Interactive Elements", () => {
              Paragraph(
                "Special factories for interactive elements with convenient text + click handler shorthand:",
              );

              TabbedExample([
                {
                  label: "Text + Click ",
                  code: `// Text + click handler shorthand
// The MOST convenient pattern!
button("Delete", () => {
  confirmDelete();
});

button("Save", () => save());

// Equivalent to:
button({
  textContent: "Delete",
  onclick: () => confirmDelete()
});`
                },
                {
                  label: "Text + Props",
                  code: `// Text + props
button("Submit", { 
  class: "btn-primary",
  type: "submit",
  disabled: false
});

// With reactive props
button("Submit", {
  class: "btn-primary",
  disabled: $(() => !isValid.value)
});`
                },
                {
                  label: "Text + Children",
                  code: `// Text + children callback
button("Delete", () => {
  span({ class: "icon" }, () => t("🗑️"));
});

button("Menu", () => {
  span(menuIcon);
  span("Options");
});`
                },
                {
                  label: "Text + Props + Children",
                  code: `// Text + props + children
button("Delete", { class: "btn-danger" }, () => {
  span({ class: "icon" }, () => t("🗑️"));
  span("Delete Item");
});`
                },
                {
                  label: "Props Only",
                  code: `// Props only (standard element pattern)
button({
  textContent: "Click",
  class: "btn",
  onclick: () => handleClick()
});`
                },
                {
                  label: "Props + Children",
                  code: `// Props + children (standard element pattern)
button({ class: "btn-danger" }, () => {
  span({ class: "icon" }, () => t("🗑️"));
  span("Delete");
});

// Note: onclick goes in props, not as 3rd arg!
button({ class: "btn", onclick: () => save() }, () => {
  span("Save");
});`
                }
              ]);

              Note("Elements: button, summary, option, optgroup.");
            });

            SubSection("Void Elements", () => {
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
            SubSection("Show", "control-flow-show", () => {
              Paragraph(
                "Conditionally render content that updates when the condition changes.",
              );
              CodeBlock(
                `Show(() => isVisible.value, () => div("Hello!"));`,
              );
            });
            SubSection("Each", "control-flow-each", () => {
              Paragraph("Reactive list rendering that re-renders efficiently.");
              CodeBlock(`const items = $({ list: ["Apple", "Banana"] });
Each(items.list, item => li(item));`);
            });
            SubSection("Match", "control-flow-match", () => {
              Paragraph("Reactive pattern matching for switch/case logic. Automatically updates rendering when the matched value changes.");

              Paragraph("Match accepts signals or getter functions, and returns Signal<R> with '_' default or Signal<R | undefined> without.");


              SubSubSection("Strings", "match-strings", () => {
                Paragraph("Match exact string values:");
                CodeBlock(`const status = $(Mut("active"));

Match(status, {
  "active": () => span({ class: "success" }, () => t("Active")),
  "inactive": () => span({ class: "danger" }, () => t("Inactive")),
  "pending": () => span({ class: "warning" }, () => t("Pending")),
  _: () => span("Unknown")
});`);
              });

              SubSubSection("Booleans", "match-booleans", () => {
                Paragraph("Boolean values are automatically converted to string keys:");
                CodeBlock(`const isActive = $(Mut(true));

Match(isActive, {
  "true": () => "✅ Active",
  "false": () => "❌ Inactive"
});`);
              });

              SubSubSection("Numbers", "match-numbers", () => {
                Paragraph("Numbers support exact matching:");
                CodeBlock(`const count = $(Mut(2));

Match(count, {
  "0": () => "None",
  "1": () => "One",
  "2": () => "Two",
  _: () => "Many"
});`);

                Paragraph("For numeric values, Match also supports range-based comparisons using operators and interval notation:");

                CodeBlock(`const age = $(Mut(25));

// Comparison operators
Match(age, {
  "<18": () => "Minor",
  ">=18": () => "Adult",
  ">65": () => "Senior",
  _: () => "Invalid"
});

// Range notation (N..M is inclusive)
Match(age, {
  "0..17": () => "Child",       // 0 <= age <= 17
  "18..64": () => "Adult",      // 18 <= age <= 64
  "65..120": () => "Senior",    // 65 <= age <= 120
  _: () => "Unknown"
});

// Interval notation: [] = inclusive, () = exclusive
Match(age, {
  "(0..13)": () => "Child",     // 0 < age < 13
  "[13..18)": () => "Teen",     // 13 <= age < 18
  "[18..65)": () => "Adult",    // 18 <= age < 65
  "[65..120]": () => "Senior",  // 65 <= age <= 120
  _: () => "Unknown"
});

// Mix comparison and range patterns
Match(age, {
  "<18": () => "Minor",
  "[18..21)": () => "Young Adult",
  "[21..65)": () => "Adult",
  ">=65": () => "Senior",
  _: () => "Unknown"
});`);

                Note("Range patterns only work with numeric values. Exact string matches are checked before range patterns.", "info");
              });
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