import { section, div, h2, h3, h4, p, pre, code, ul, li, span, getCurrentContext, a, img } from "../../core/mod";

// Helper to append text nodes
const t = (text: string) => {
    getCurrentContext().appendChild(document.createTextNode(text));
};

// --- Styled Components ---

const SyntaxHighlight = (codeStr: string) => {
    // Very basic syntax highlighting for demo purposes
    const parts = codeStr.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g);

    parts.forEach(part => {
        if (part.startsWith("//")) {
            span({ style: { color: "var(--syntax-comment)" }, textContent: part });
        } else if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
            span({ style: { color: "var(--syntax-string)" }, textContent: part });
        } else if (["const", "import", "from", "function", "return", "if", "else", "true", "false"].includes(part)) {
            span({ style: { color: "var(--syntax-keyword)" }, textContent: part });
        } else if (["div", "button", "h1", "p", "ul", "li", "input", "span", "console", "log", "map", "filter", "Show", "Each", "Match"].includes(part)) {
            span({ style: { color: "var(--syntax-function)" }, textContent: part });
        } else {
            t(part);
        }
    });
};

const CodeBlock = (content: string) =>
    div({
        class: "code-block animate-fade-up",
        style: {
            background: "var(--mongo-forest)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            margin: "1.5rem 0",
            border: "1px solid var(--mongo-slate)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.9rem",
            lineHeight: "1.6",
            overflow: "hidden"
        }
    }, () => {
        // Window Controls
        div({ style: { display: "flex", gap: "0.5rem", marginBottom: "1rem", opacity: "0.6" } }, () => {
            div({ style: { width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" } });
            div({ style: { width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" } });
            div({ style: { width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" } });
        });

        // Code Content
        pre({ style: { margin: "0", overflowX: "auto" } }, () => {
            SyntaxHighlight(content);
        });
    });

const Section = (title: string, id: string, children: () => void) => {
    section({ id, class: "animate-fade-up", style: { marginBottom: "var(--spacing-xl)", scrollMarginTop: "120px" } }, () => {
        div({ style: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" } }, () => {
            // Simple geometric icon
            div({ style: { width: "4px", height: "32px", background: "var(--mongo-green)", borderRadius: "2px" } });
            h2({
                style: {
                    fontSize: "2rem",
                    color: "var(--mongo-white)",
                    letterSpacing: "-0.5px"
                }, textContent: title
            });
        });
        children();
    });
};

const SubSection = (title: string, children: () => void) => {
    div({ style: { marginBottom: "2.5rem" } }, () => {
        h3({ style: { fontSize: "1.5rem", marginBottom: "1rem", color: "var(--mongo-green)" }, textContent: title });
        children();
    });
};

const SubSubSection = (title: string, children: () => void) => {
    div({ style: { marginBottom: "1.5rem" } }, () => {
        h4({ style: { fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--mongo-white)", fontWeight: "600" }, textContent: title });
        children();
    });
};

const Paragraph = (text: string) =>
    p({ style: { marginBottom: "1rem", lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "1.05rem" } }, () => t(text));

const List = (items: string[]) =>
    ul({ style: { marginLeft: "1.5rem", marginBottom: "1.5rem", color: "var(--text-secondary)", lineHeight: "1.8" } }, () => {
        items.forEach(item => li({ textContent: item }));
    });

const Note = (text: string, type: "info" | "warning" = "info") =>
    div({
        style: {
            background: type === "warning" ? "rgba(255, 189, 46, 0.1)" : "rgba(0, 237, 100, 0.05)",
            borderLeft: `4px solid ${type === "warning" ? "#ffbd2e" : "var(--mongo-green)"}`,
            padding: "1rem",
            borderRadius: "0 0.5rem 0.5rem 0",
            marginBottom: "1.5rem",
            color: type === "warning" ? "#ffbd2e" : "var(--mongo-green)"
        }
    }, () => t(text));

// --- Main Component ---

export const Docs = () =>
    div({ id: "docs", class: "container", style: { maxWidth: "800px", margin: "0 auto", paddingBottom: "var(--spacing-xl)" } }, () => {

        // Overview Badges
        div({ style: { display: "flex", gap: "0.5rem", marginBottom: "2rem", marginTop: "1rem" } }, () => {
            a({ href: "https://jsr.io/@fia/core", target: "_blank" }, () => {
                img({ src: "https://jsr.io/badges/@fia/core", alt: "jsr-badge" });
            });
            a({ href: "https://jsr.io/@fia/core", target: "_blank" }, () => {
                img({ src: "https://jsr.io/badges/@fia/core/score", alt: "score-badge" });
            });
        });

        Section("Getting Started", "getting-started", () => {
            SubSection("Installation", () => {
                Paragraph("Import directly from JSR. No build step required.");
                CodeBlock('import { $, div, h1, button, p } from "jsr:@fia/core";');
            });
            SubSection("Quick Start", () => {
                Paragraph("Create your first reactive app in seconds.");
                CodeBlock(`import { $, div, h1, button, p } from "jsr:@fia/core";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`);
            });
            SubSection("Mounting", () => {
                Paragraph("For Single Page Apps (SPAs), use the mount helper to attach to a root element.");
                CodeBlock(`import { mount, div } from "@fia/core";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`);
            });
        });

        Section("Philosophy", "philosophy", () => {
            Paragraph("Most frameworks add layers of abstraction between you and the DOM. Fia gives you just enough to be productive:");
            ul({ style: { marginLeft: "1.5rem", marginBottom: "1.5rem", color: "var(--text-secondary)" } }, () => {
                li({ style: { marginBottom: "0.5rem" } }, () => { span({ style: { color: "var(--mongo-white)", fontWeight: "600" }, textContent: "Reactive values" }); t(" - $() creates signals for primitives, reactive stores for objects"); });
                li({ style: { marginBottom: "0.5rem" } }, () => { span({ style: { color: "var(--mongo-white)", fontWeight: "600" }, textContent: "Direct DOM" }); t(" - No virtual DOM, no diffing, just native browser APIs"); });
                li({ style: { marginBottom: "0.5rem" } }, () => { span({ style: { color: "var(--mongo-white)", fontWeight: "600" }, textContent: "~6KB gzipped" }); t(" - Lightweight with zero dependencies"); });
                li({ style: { marginBottom: "0.5rem" } }, () => { span({ style: { color: "var(--mongo-white)", fontWeight: "600" }, textContent: "Fully typed" }); t(" - Complete TypeScript support with autocomplete"); });
            });
        });

        Section("Element API", "element-api", () => {
            Paragraph("Fia elements have a simple, consistent API. Functions match HTML tag names.");
            CodeBlock(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`);

            SubSubSection("Text Content", () => {
                Paragraph("Use the native textContent prop for static or reactive text.");
                CodeBlock(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`);
            });

            SubSubSection("Event Handlers", () => {
                Paragraph("Event handlers are delegated automatically for performance.");
                CodeBlock(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`);
            });

            SubSubSection("Nesting Elements", () => {
                Paragraph("Use a callback function to nest elements.");
                CodeBlock(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`);
            });

            SubSubSection("Void Elements", () => {
                Paragraph("Elements like input, img, br only accept props.");
                CodeBlock(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`);
            });

            SubSubSection("onMount Callback", () => {
                Paragraph("Access layout properties after the element is in the DOM.");
                CodeBlock(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`);
            });
        });

        Section("Reactivity", "reactivity", () => {
            SubSection("Signals", () => {
                Paragraph("Signals are the primitive units of reactivity.");
                CodeBlock(`const count = $(0);
console.log(count.value); // 0
count.value++;`);
            });
            SubSection("Reactive Stores", () => {
                Paragraph("Fia stores are immutable by default for predictability.");
                CodeBlock(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`);
                Note("Destructuring breaks reactivity. Always access properties directly: state.count", "warning");
            });
            SubSection("Computed Values", () => {
                Paragraph("Computed signals automatically track dependencies and update when they change.");
                CodeBlock(`const count = $(0);
const doubled = $(() => count.value * 2);`);
            });
            SubSection("Effects", () => {
                Paragraph("Use $e() to run side effects when dependencies change.");
                CodeBlock(`$e(() => {
  console.log("Count changed to:", count.value);
});`);
            });
        });

        Section("Immutability", "immutability", () => {
            Paragraph("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles.");
            SubSection("Working with Immutable State", () => {
                Paragraph("When a store is immutable, you update state by replacing objects, not mutating properties.");
                CodeBlock(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`);
            });
        });

        Section("Control Flow", "control-flow", () => {
            SubSection("Show", () => {
                Paragraph("Conditionally render content that updates when the condition changes.");
                CodeBlock(`Show(() => isVisible.value, () => div({ textContent: "Hello!" }));`);
            });
            SubSection("Each", () => {
                Paragraph("Reactive list rendering that re-renders efficiently.");
                CodeBlock(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`);
            });
            SubSection("Match", () => {
                Paragraph("Reactive pattern matching for switch/case logic.");
                CodeBlock(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`);
            });
        });

        Section("Component Composition", "components", () => {
            Paragraph("In Fia, components are just functions. There is no special class or type.");
            SubSection("Basic Component", () => {
                CodeBlock(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`);
            });
            SubSection("Children & Layouts", () => {
                Paragraph("To create wrapper components, pass a callback function as a child prop.");
                CodeBlock(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`);
            });
        });

        Section("SVG", "svg", () => {
            Paragraph("Fia supports SVG elements with full type safety.");
            CodeBlock(`import { svg, svgCircle } from "@fia/core";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`);
        });

        Section("Performance", "performance", () => {
            List([
                "Event Delegation: Single listener per event type.",
                "Automatic Batching: DOM updates are batched via standard event loop microtasks.",
                "Fragment Insertion: Children are collected in DocumentFragments before insertion."
            ]);
        });

        Section("Examples", "examples", () => {
            SubSection("1. Hello World", () => {
                CodeBlock(`h1({ textContent: "Hello, World!" });`);
            });
            SubSection("2. Counter", () => {
                CodeBlock(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`);
            });
            SubSection("3. Conditional Styling", () => {
                CodeBlock(`const active = $(false);
button({
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`);
            });
        });

    });
