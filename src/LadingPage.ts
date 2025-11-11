// === src/LandingPage.ts ===

import { signal } from "./reactivity";
import {
  main,
  nav,
  a,
  button,
  section,
  div,
  h1,
  h2,
  h3,
  h4,
  p,
  span,
  pre,
  code,
  footer,
} from "./element-html"; // Using your file paths
import * as css from "./css-html-props";
import * as a11y from "./accessibility";
import type { FlickElement } from "./core";

// ❗️ 1. ALL CODE SNIPPETS MOVED TO TOP (Fixes "Cannot find name")
// ❗️ AND REDEFINED AS "TOKEN" ARRAYS FOR HIGHLIGHTING

type CodeToken = {
  type:
    | "text"
    | "keyword"
    | "function"
    | "string"
    | "comment"
    | "number"
    | "property"
    | "tag";
  content: string;
};

const zeroJankCode: CodeToken[] = [
  { type: "comment", content: "// main.ts (Main Thread)" },
  { type: "keyword", content: "\nconst" },
  { type: "text", content: " worker = " },
  { type: "keyword", content: "new" },
  { type: "function", content: " Worker" },
  { type: "text", content: "(" },
  { type: "string", content: "'./worker.ts'" },
  { type: "text", content: ");\n" },
  { type: "text", content: "worker." },
  { type: "function", content: "onmessage" },
  { type: "text", content: " = (" },
  { type: "property", content: "commands" },
  { type: "text", content: ") => {\n  " },
  { type: "function", content: "requestAnimationFrame" },
  { type: "text", content: "(() => {\n    " },
  { type: "function", content: "applyCommands" },
  { type: "text", content: "(commands);\n  });\n};" },
  { type: "comment", content: "\n\n// worker.ts (App Core)" },
  { type: "keyword", content: "\nimport" },
  { type: "text", content: " { div } " },
  { type: "keyword", content: "from" },
  { type: "string", content: " './element-html'" },
  { type: "text", content: ";\n" },
  { type: "function", content: "div" },
  { type: "text", content: "()." },
  { type: "function", content: "text" },
  { type: "text", content: "(" },
  { type: "string", content: "'Hello from worker'" },
  { type: "text", content: ");" },
];

const functionApiCode: CodeToken[] = [
  { type: "comment", content: "// No JSX, No VDOM." },
  { type: "comment", content: "\n// Just chainable functions." },
  { type: "function", content: "\ndiv" },
  { type: "text", content: "()\n  ." },
  { type: "function", content: "attr" },
  { type: "text", content: "(" },
  { type: "function", content: "ariaLabel" },
  { type: "text", content: "(" },
  { type: "string", content: "'My element'" },
  { type: "text", content: "))\n  ." },
  { type: "function", content: "style" },
  { type: "text", content: "(" },
  { type: "function", content: "color" },
  { type: "text", content: "(" },
  { type: "string", content: "'blue'" },
  { type: "text", content: "))\n  ." },
  { type: "function", content: "on" },
  { type: "text", content: "(" },
  { type: "string", content: "'click'" },
  { type: "text", content: ", () => " },
  { type: "function", content: "console" },
  { type: "text", content: "." },
  { type: "function", content: "log" },
  { type: "text", content: "(" },
  { type: "string", content: "'hi'" },
  { type: "text", content: "))\n  ." },
  { type: "function", content: "append" },
  { type: "text", content: "(" },
  { type: "function", content: "h1" },
  { type: "text", content: "()." },
  { type: "function", content: "text" },
  { type: "text", content: "(" },
  { type: "string", content: "'Child'" },
  { type: "text", content: "));" },
];

const reactivityCode: CodeToken[] = [
  { type: "keyword", content: "const" },
  { type: "text", content: " count = " },
  { type: "function", content: "signal" },
  { type: "text", content: "(" },
  { type: "number", content: "0" },
  { type: "text", content: ");\n\n" },
  { type: "comment", content: "// 1. A reactive effect..." },
  { type: "function", content: "\neffect" },
  { type: "text", content: "(() => {\n  " },
  { type: "comment", content: "// 2. ...reads the signal..." },
  { type: "text", content: "\n  myDiv." },
  { type: "function", content: "text" },
  { type: "text", content: "(" },
  { type: "function", content: "count" },
  { type: "text", content: "());\n});\n\n" },
  { type: "comment", content: "// 3. ...mutating the signal" },
  { type: "comment", content: "\n//    auto-triggers the effect." },
  { type: "text", content: "\ncount." },
  { type: "function", content: "set" },
  { type: "text", content: "(" },
  { type: "function", content: "count" },
  { type: "text", content: "() + " },
  { type: "number", content: "1" },
  { type: "text", content: ");" },
];

const typedCssCode: CodeToken[] = [
  { type: "comment", content: "// Full IDE autocomplete" },
  { type: "keyword", content: "\nimport" },
  { type: "text", content: " {\n  padding,\n  borderRadius,\n  boxShadow\n} " },
  { type: "keyword", content: "from" },
  { type: "string", content: " './css-html-props'" },
  { type: "text", content: ";\n\nmyElement." },
  { type: "function", content: "style" },
  { type: "text", content: "(\n  " },
  { type: "function", content: "padding" },
  { type: "text", content: "(" },
  { type: "number", content: "10" },
  { type: "text", content: "), " },
  { type: "comment", content: "// auto-px" },
  { type: "text", content: "\n  " },
  { type: "function", content: "borderRadius" },
  { type: "text", content: "(" },
  { type: "string", content: "'8px'" },
  { type: "text", content: "),\n  " },
  { type: "function", content: "boxShadow" },
  { type: "text", content: "(" },
  { type: "string", content: "'0 4px 6px #0002'" },
  { type: "text", content: ")\n);" },
];

const helloWorldCode: CodeToken[] = [
  { type: "keyword", content: "import" },
  { type: "text", content: " { h1, p, div } " },
  { type: "keyword", content: "from" },
  { type: "string", content: " './element-html'" },
  { type: "text", content: ";\n" },
  { type: "keyword", content: "import" },
  { type: "text", content: " { color } " },
  { type: "keyword", content: "from" },
  { type: "string", content: " './css-html-props'" },
  { type: "text", content: ";\n\n" },
  { type: "keyword", content: "const" },
  { type: "text", content: " root = " },
  { type: "function", content: "div" },
  { type: "text", content: "();\n\nroot." },
  { type: "function", content: "append" },
  { type: "text", content: "(\n  " },
  { type: "function", content: "h1" },
  { type: "text", content: "()\n    ." },
  { type: "function", content: "style" },
  { type: "text", content: "(" },
  { type: "function", content: "color" },
  { type: "text", content: "(" },
  { type: "string", content: "'blue'" },
  { type: "text", content: "))\n    ." },
  { type: "function", content: "text" },
  { type: "text", content: "(" },
  { type: "string", content: "'Hello World!'" },
  { type: "text", content: ")\n);\n\nroot." },
  { type: "function", content: "append" },
  { type: "text", content: "(\n  " },
  { type: "function", content: "p" },
  { type: "text", content: "()." },
  { type: "function", content: "text" },
  { type: "text", content: "(" },
  { type: "string", content: "'This is Flick.'" },
  { type: "text", content: ")\n);" },
];

const counterCode: CodeToken[] = [
  { type: "keyword", content: "import" },
  { type: "text", content: " { button, div } " },
  { type: "keyword", content: "from" },
  { type: "string", content: " './element-html'" },
  { type: "text", content: ";\n" },
  { type: "keyword", content: "import" },
  { type: "text", content: " { signal } " },
  { type: "keyword", content: "from" },
  { type: "string", content: " './reactivity'" },
  { type: "text", content: ";\n\n" },
  { type: "keyword", content: "const" },
  { type: "text", content: " count = " },
  { type: "function", content: "signal" },
  { type: "text", content: "(" },
  { type: "number", content: "0" },
  { type: "text", content: ");\n" },
  { type: "keyword", content: "const" },
  { type: "text", content: " root = " },
  { type: "function", content: "div" },
  { type: "text", content: "();\n\n" },
  { type: "comment", content: "// The text node reactively updates" },
  { type: "text", content: "\nroot." },
  { type: "function", content: "append" },
  { type: "text", content: "(\n  " },
  { type: "function", content: "div" },
  { type: "text", content: "()." },
  { type: "function", content: "text" },
  { type: "text", content: "(count)\n);\n\nroot." },
  { type: "function", content: "append" },
  { type: "text", content: "(\n  " },
  { type: "function", content: "button" },
  { type: "text", content: "()\n    ." },
  { type: "function", content: "text" },
  { type: "text", content: "(" },
  { type: "string", content: "'Click Me'" },
  { type: "text", content: ")\n    ." },
  { type: "function", content: "on" },
  { type: "text", content: "(" },
  { type: "string", content: "'click'" },
  { type: "text", content: ", () => " },
  { type: "function", content: "count" },
  { type: "text", content: "." },
  { type: "function", content: "set" },
  { type: "text", content: "(" },
  { type: "function", content: "count" },
  { type: "text", content: "() + " },
  { type: "number", content: "1" },
  { type: "text", content: "))\n);" },
];

const xssAttackCode: CodeToken[] = [
  { type: "comment", content: "// An attacker tries to inject a script" },
  { type: "keyword", content: "\nconst" },
  { type: "text", content: " userName = " },
  { type: "string", content: '`<img src="x" onerror="alert(\'XSS!\')">`' },
  { type: "text", content: ";\n\n" },
  {
    type: "comment",
    content: "// In a VDOM/innerHTML framework, this might run:",
  },
  { type: "function", content: "\ndiv" },
  { type: "text", content: "()." },
  { type: "function", content: "html" },
  { type: "text", content: "(userName); " },
  { type: "comment", content: "// 😱 VULNERABLE" },
];

const xssDefenseCode: CodeToken[] = [
  { type: "comment", content: "// In Flick, .text() is the default." },
  { type: "comment", content: "\n// It uses 'textContent', not 'innerHTML'." },
  { type: "keyword", content: "\nconst" },
  { type: "text", content: " userName = " },
  { type: "string", content: '`<img src="x" onerror="alert(\'XSS!\')">`' },
  { type: "text", content: ";\n\n" },
  { type: "function", content: "div" },
  { type: "text", content: "()." },
  { type: "function", content: "text" },
  { type: "text", content: "(userName);\n\n" },
  { type: "comment", content: "// The browser safely renders the literal" },
  { type: "comment", content: "\n// text. The script does NOT execute." },
  { type: "comment", content: "\n// Output: <div>&lt;img src...&gt;</div>" },
];

const attributeAttackCode: CodeToken[] = [
  { type: "comment", content: "// Attacker tries a 'javascript:' URL" },
  { type: "keyword", content: "\nconst" },
  { type: "text", content: " userUrl = " },
  { type: "string", content: "'javascript:alert(\"pwned\")'" },
  { type: "text", content: ";\n\n" },
  { type: "function", content: "a" },
  { type: "text", content: "()\n  ." },
  { type: "function", content: "text" },
  { type: "text", content: "(" },
  { type: "string", content: "'My Profile'" },
  { type: "text", content: ")\n  ." },
  { type: "function", content: "attr" },
  { type: "text", content: "(" },
  { type: "string", content: "'href'" },
  { type: "text", content: ", userUrl); " },
  { type: "comment", content: "// 😱 VULNERABLE" },
];

const attributeDefenseCode: CodeToken[] = [
  { type: "comment", content: "// Flick's main thread renderer" },
  { type: "comment", content: "\n// sanitizes all 'href' attributes." },
  { type: "keyword", content: "\nfunction" },
  { type: "function", content: " sanitizeAttribute" },
  { type: "text", content: "(" },
  { type: "property", content: "name" },
  { type: "text", content: ", " },
  { type: "property", content: "value" },
  { type: "text", content: ") {\n  " },
  { type: "keyword", content: "if" },
  { type: "text", content: " (name === " },
  { type: "string", content: "'href'" },
  { type: "text", content: ") {\n    " },
  { type: "keyword", content: "const" },
  { type: "text", content: " url = " },
  { type: "keyword", content: "new" },
  { type: "function", content: " URL" },
  { type: "text", content: "(value);\n    " },
  { type: "keyword", content: "if" },
  { type: "text", content: " (![" },
  { type: "string", content: "'http:'" },
  { type: "text", content: ", " },
  { type: "string", content: "'https:'" },
  { type: "text", content: "]." },
  { type: "function", content: "includes" },
  { type: "text", content: "(url.protocol)) {\n      " },
  { type: "keyword", content: "return" },
  { type: "text", content: " " },
  { type: "number", content: "false" },
  { type: "text", content: "; " },
  { type: "comment", content: "// Block 'javascript:'" },
  { type: "text", content: "\n    }\n  }\n  " },
  { type: "keyword", content: "return" },
  { type: "text", content: " " },
  { type: "number", content: "true" },
  { type: "text", content: ";\n}" },
];

// Define some basic color styles for different token types
const highlightColors = {
  keyword: css.color("#C678DD"), // Purple
  string: css.color("#98C379"), // Green
  comment: css.color("#5C6370"), // Gray
  number: css.color("#D19A66"), // Orange
  operator: css.color("#E06C75"), // Redish
  function: css.color("#61AFEF"), // Blue
  variable: css.color("#ABB2BF"), // Default text color (grayish white in dark theme)
};

const colors = {
  text: "#111827", // Almost black
  textMuted: "#6B7281", // Mid-gray
  background: "#FFFFFF",
  bgLight: "#F9FAFB", // Light gray bg
  border: "#E5E7EB", // Light gray border
  primary: "#0052FF", // A strong, professional "tech" blue
  dark: "#111827", // Dark bg (for nav buttons, footer)

  // ❗️ 2. ADDED COLORS FOR SYNTAX HIGHLIGHTING
  code: {
    text: "#d4d4d4",
    bg: "#1E1E1E",
    keyword: "#c586c0", // Lighter purple
    function: "#4FC1FF", // Light blue
    string: "#ce9178", // Orange-ish
    comment: "#6A9955", // Green
    number: "#b5cea8", // Light green
    property: "#9CDCFE", // Lighter blue
  },
};

const fonts = {
  sans: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
};

const spacing = {
  px: "1px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
};

/**
 * Very basic, regex-based syntax highlighter that outputs FlickElements.
 * Designed to run in the worker.
 */
export function highlightCode(codeString: string): FlickElement[] {
  const tokens: FlickElement[] = [];

  // Simple regex for common JS tokens
  const patterns = [
    {
      regex:
        /\b(import|export|const|let|var|function|return|if|else|for|while|try|catch|new|this|class|extends|super|await|async|type)\b/g,
      type: "keyword",
    },
    { regex: /"(.*?)"|'(.*?)'|`(.*?)`/g, type: "string" },
    { regex: /\/\/.*/g, type: "comment" },
    { regex: /\b\d+(\.\d+)?\b/g, type: "number" },
    { regex: /(\+|\-|\*|\/|=|<|>|!|&|\||\?|:|\.)/g, type: "operator" },
    { regex: /\b([a-zA-Z_$][0-9a-zA-Z_$]*?)\s*\(/g, type: "function" }, // Matches function names
    // Fallback for general text (must be last)
    { regex: /.+/g, type: "variable" },
  ];

  let match;

  // Process the code line by line to handle newlines correctly
  codeString.split("\n").forEach((line, lineIndex) => {
    let lineTokens: FlickElement[] = [];
    let lineLastIndex = 0;

    for (const pattern of patterns) {
      pattern.regex.lastIndex = 0; // Reset regex for each line
      while ((match = pattern.regex.exec(line)) !== null) {
        const value = match[0];
        const startIndex = match.index;
        const endIndex = pattern.regex.lastIndex;

        // Add preceding unhighlighted text
        if (startIndex > lineLastIndex) {
          lineTokens.push(
            span().text(line.substring(lineLastIndex, startIndex))
          );
        }

        // Add highlighted token
        const colorStyle =
          highlightColors[pattern.type as keyof typeof highlightColors] ||
          highlightColors.variable;
        lineTokens.push(span().style(colorStyle).text(value));
        lineLastIndex = endIndex;
      }
    }

    // Add any remaining unhighlighted text in the line
    if (lineLastIndex < line.length) {
      lineTokens.push(span().text(line.substring(lineLastIndex)));
    }

    // Add a newline after each line (unless it's the last line)
    if (lineIndex < codeString.split("\n").length - 1) {
      lineTokens.push(span().text("\n"));
    }

    tokens.push(...lineTokens);
  });

  return tokens;
}

// --- (Page Load Animation) ---
const pageOpacity = signal(0);
const pageTransform = signal(`translateY(${spacing[3]})`);
setTimeout(() => {
  pageOpacity.set(1);
  pageTransform.set("translateY(0)");
}, 100);

const app = main()
  .attr(a11y.role("main"))
  .style(
    css.fontFamily(fonts.sans),
    css.backgroundColor(colors.background),
    css.color(colors.text),
    css.margin(0),
    css.padding(0),
    css.transition("opacity 0.6s ease-out, transform 0.6s ease-out"),
    css.opacity(pageOpacity),
    css.transform(pageTransform)
  );

createHeader(app);
createHero(app);
createFeaturesSection(app);
createArchitectureDiagram(app);
createSecuritySection(app);
// createBenchmarkSection(app); // Optional: add back if wanted
createCodeExamples(app);
createMantraFooter(app);
createFooter(app);

function createHeader(parent: FlickElement) {
  const navEl = nav()
    .attr(a11y.ariaLabel("Main navigation"))
    .style(
      css.display("flex"),
      css.justifyContent("space-between"),
      css.alignItems("center"),
      css.padding(`${spacing[5]} ${spacing[10]}`),
      css.maxWidth("1280px"),
      css.margin("0 auto"),
      css.borderBottom(`${spacing.px} solid ${colors.border}`)
    );

  // Logo
  h2()
    .style(css.margin(0), css.fontSize("24px"), css.fontWeight(600))
    .text("Flick")
    .appendTo(navEl);

  // Nav Links
  div()
    .style(css.display("flex"), css.alignItems("center"), css.gap(spacing[6]))
    .append(
      a()
        .text("Docs")
        .attr("href", "#")
        .style(css.color(colors.textMuted), css.textDecoration("none")),
      a()
        .text("Examples")
        .attr("href", "#")
        .style(css.color(colors.textMuted), css.textDecoration("none")),
      button()
        .text("GitHub")
        .attr("href", "#")
        .style(
          css.backgroundColor(colors.dark),
          css.color("white"),
          css.border("none"),
          css.padding(spacing[2], spacing[4]),
          css.borderRadius(spacing[2]),
          css.cursor("pointer"),
          css.fontWeight(500)
        )
    )
    .appendTo(navEl);

  navEl.appendTo(parent);
}

function createHero(parent: FlickElement) {
  section()
    .style(
      css.textAlign("center"),
      css.padding(`${spacing[24]} ${spacing[10]} ${spacing[20]}`),
      css.maxWidth("900px"),
      css.margin("0 auto")
    )
    .append(
      h1()
        .style(
          css.fontSize("56px"),
          css.fontWeight(700),
          css.margin(0, 0, spacing[4], 0),
          css.letterSpacing("-0.02em")
        )
        .text("Native Speed. Declarative Fluency."),
      p()
        .style(
          css.fontSize("20px"),
          css.lineHeight(1.6),
          css.color(colors.textMuted),
          css.marginTop(spacing[6]),
          css.maxWidth("700px"),
          css.margin("0 auto")
        )
        .text(
          "Flick is the minimalist, worker-first framework for relentlessly efficient UIs. No VDOM, no compiler, no jank—just German precision."
        ),
      div()
        .style(
          css.marginTop(spacing[8]),
          css.display("flex"),
          css.justifyContent("center"),
          css.gap(spacing[4])
        )
        .append(
          button()
            .text("Get Started")
            .style(
              css.fontSize("18px"),
              css.backgroundColor(colors.primary),
              css.color("white"),
              css.border("none"),
              css.padding(spacing[4], spacing[8]),
              css.borderRadius(spacing[2]),
              css.cursor("pointer"),
              css.fontWeight(500)
            ),
          button()
            .text("View on GitHub")
            .style(
              css.fontSize("18px"),
              css.backgroundColor(colors.bgLight),
              css.color(colors.text),
              css.border(spacing.px, "solid", colors.border),
              css.padding(spacing[4], spacing[8]),
              css.borderRadius(spacing[2]),
              css.cursor("pointer"),
              css.fontWeight(500)
            )
        )
    )
    .appendTo(parent);
}

function createFeaturesSection(parent: FlickElement) {
  const sectionEl = section()
    .attr(a11y.ariaLabel("Framework Features"))
    .style(
      css.padding(`${spacing[20]} ${spacing[10]}`),
      css.maxWidth("1280px"),
      css.margin("0 auto")
    )
    .appendTo(parent);

  // Card Grid
  div()
    .style(
      css.display("grid"),
      css.gridTemplateColumns("repeat(auto-fit, minmax(320px, 1fr))"),
      css.gap(spacing[8])
    )
    .append(
      createFeatureCard(
        "⚡",
        "Zero Jank Core",
        "The entire reactive core runs in a Web Worker, offloading 100% of state tracking and update logic from the main thread.",
        zeroJankCode
      ),
      createFeatureCard(
        "🔗",
        "Function-First API",
        "No VDOM. Just a chainable, function-first API (div(), .text(), .on()) that mutates the native DOM directly and immediately.",
        functionApiCode
      ),
      createFeatureCard(
        "💡",
        "Fine-Grained Reactivity",
        "Powered by signals (signal()) and memoized derivations (memo()), updates are automatic, precise, and batched for O(1) performance.",
        reactivityCode
      ),
      createFeatureCard(
        "🎨",
        "Typed & Tree-Shakable",
        "500+ typed CSS functions (color(), padding()) and a zero-config, 19.8 KB design built for full TypeScript inference.",
        typedCssCode
      )
    )
    .appendTo(sectionEl);
}

function createArchitectureDiagram(parent: FlickElement) {
  section()
    .attr(a11y.ariaLabel("Flick Architecture Diagram"))
    .style(
      css.textAlign("center"),
      css.padding(`${spacing[20]} ${spacing[10]}`),
      css.backgroundColor(colors.bgLight),
      css.borderTop(spacing.px, "solid", colors.border),
      css.borderBottom(spacing.px, "solid", colors.border)
    )
    .append(
      h2()
        .style(css.fontSize("32px"), css.fontWeight(600))
        .text("The Flick Difference"),
      p()
        .style(
          css.fontSize("18px"),
          css.color(colors.textMuted),
          css.marginTop(spacing[4])
        )
        .text("A clean, unblockable separation of concerns."),
      // The Diagram
      div()
        .attr(a11y.role("group"))
        .style(
          css.display("flex"),
          css.justifyContent("center"),
          css.alignItems("center"),
          css.gap(spacing[8]),
          css.marginTop(spacing[12])
        )
        .append(
          // Main Thread Box
          div()
            .style(
              css.backgroundColor(colors.background),
              css.border(spacing.px, "solid", colors.border),
              css.borderRadius(spacing[3]),
              css.padding(spacing[8]),
              css.width("350px"),
              css.boxShadow("0 4px 12px -2px #0000000d")
            )
            .append(
              h3().style(css.marginTop(0)).text("Main Thread"),
              p()
                .style(css.color(colors.textMuted))
                .text(
                  "Handles *only* painting DOM updates and capturing raw user events. It does zero thinking."
                )
            ),
          // Arrow
          span()
            .attr(a11y.ariaHidden(true))
            .style(
              css.fontSize("32px"),
              css.fontWeight("bold"),
              css.color(colors.textMuted)
            )
            .text("↔"),
          // Worker Thread Box
          div()
            .style(
              css.backgroundColor(colors.dark),
              css.color("white"),
              css.border(spacing.px, "solid", colors.dark),
              css.borderRadius(spacing[3]),
              css.padding(spacing[8]),
              css.width("350px"),
              css.boxShadow("0 10px 20px -5px #0000001a")
            )
            .append(
              h3().style(css.marginTop(0)).text("Flick Worker Core"),
              p()
                .style(css.color("#d1d5db"))
                .text(
                  "Runs all your app logic, state, signals, and update scheduling. 100% sandboxed."
                )
            )
        )
    )
    .appendTo(parent);
}

function createSecuritySection(parent: FlickElement) {
  section()
    .attr(a11y.ariaLabel("Security Features"))
    .style(
      css.padding(`${spacing[20]} ${spacing[10]}`),
      css.maxWidth("1200px"),
      css.margin("0 auto")
    )
    .append(
      h2()
        .style(
          css.fontSize("32px"),
          css.fontWeight(600),
          css.textAlign("center"),
          css.marginBottom(spacing[12])
        )
        .text("Secure by Default"),
      div()
        .style(
          css.display("grid"),
          // ❗️ 3. RESPONSIVENESS FIX
          css.gridTemplateColumns("repeat(auto-fit, minmax(320px, 1fr))"),
          css.gap(spacing[16]),
          css.alignItems("start")
        )
        .append(
          // --- Security Card 1: XSS ---
          div()
            .style(
              css.display("flex"),
              css.flexDirection("column"),
              css.gap(spacing[4])
            )
            .append(
              h3()
                .style(css.fontSize("24px"), css.margin(0))
                .text("XSS is Neutralized"),
              p()
                .style(
                  css.fontSize("16px"),
                  css.color(colors.textMuted),
                  css.lineHeight(1.6),
                  css.margin(0)
                )
                .text(
                  "Cross-Site Scripting (XSS) is impossible by default. Your app logic runs in a worker, which has no DOM access. The .text() method always uses 'textContent', never 'innerHTML', automatically escaping all user input."
                ),
              h4()
                .style(css.margin(spacing[4], 0, 0, 0))
                .text("Attack Vector:"),
              createCodeBlock(xssAttackCode),
              h4()
                .style(css.margin(spacing[4], 0, 0, 0))
                .text("Flick's Defense:"),
              createCodeBlock(xssDefenseCode)
            ),
          // --- Security Card 2: Attributes ---
          div()
            .style(
              css.display("flex"),
              css.flexDirection("column"),
              css.gap(spacing[4])
            )
            .append(
              h3()
                .style(css.fontSize("24px"), css.margin(0))
                .text("Attribute Sanitization"),
              p()
                .style(
                  css.fontSize("16px"),
                  css.color(colors.textMuted),
                  css.lineHeight(1.6),
                  css.margin(0)
                )
                .text(
                  "Flick's renderer sanitizes dangerous attributes. 'on*' handlers are blocked, and 'href' or 'src' attributes are checked against a protocol safelist, preventing 'javascript:'-based attacks."
                ),
              h4()
                .style(css.margin(spacing[4], 0, 0, 0))
                .text("Attack Vector:"),
              createCodeBlock(attributeAttackCode),
              h4()
                .style(css.margin(spacing[4], 0, 0, 0))
                .text("Flick's Defense:"),
              createCodeBlock(attributeDefenseCode)
            )
        )
    )
    .appendTo(parent);
}

function createCodeExamples(parent: FlickElement) {
  section()
    .attr(a11y.ariaLabel("Code Examples"))
    .style(
      css.padding(`${spacing[20]} ${spacing[10]}`),
      css.maxWidth("1200px"),
      css.margin("0 auto"),
      css.display("grid"),
      // ❗️ 3. RESPONSIVENESS FIX
      css.gridTemplateColumns("repeat(auto-fit, minmax(320px, 1fr))"),
      css.gap(spacing[10])
    )
    .append(
      // Hello World
      div()
        .attr(a11y.ariaLabel("Hello World code example"))
        .style(css.flex("1"))
        .append(
          h3()
            .style(css.fontSize("24px"), css.fontWeight(600))
            .text("Simple, Chainable"),
          p()
            .style(css.color(colors.textMuted), css.lineHeight(1.6))
            .text(
              "No complex setup, no JSX, no build steps. Just pure, chainable functions."
            ),
          createCodeBlock(helloWorldCode)
        ),
      // Reactive Counter
      div()
        .attr(a11y.ariaLabel("Reactive Counter code example"))
        .style(css.flex("1"))
        .append(
          h3()
            .style(css.fontSize("24px"), css.fontWeight(600))
            .text("Instantly Reactive"),
          p()
            .style(css.color(colors.textMuted), css.lineHeight(1.6))
            .text(
              "Bind UI elements directly to signals. When the signal changes, only the dependent DOM node updates."
            ),
          createCodeBlock(counterCode)
        )
    )
    .appendTo(parent);
}

function createMantraFooter(parent: FlickElement) {
  section()
    .attr(a11y.ariaLabel("Framework Mantra"))
    .style(
      css.backgroundColor(colors.dark),
      css.color("white"),
      css.textAlign("center"),
      css.padding(`${spacing[20]} ${spacing[10]}`)
    )
    .append(
      h2()
        .style(
          css.fontSize("32px"),
          css.fontWeight(600),
          css.letterSpacing("-0.01em")
        )
        .text("No JSX. No Compiler. No VDOM."),
      p()
        .style(
          css.fontSize("18px"),
          css.color(colors.textMuted),
          css.marginTop(spacing[4]),
          css.maxWidth("600px"),
          css.margin("0 auto")
        )
        .text(
          "Just German precision: clean, predictable, and relentlessly efficient."
        ),
      div()
        .style(
          css.marginTop(spacing[8]),
          css.fontSize("16px"),
          css.color(colors.primary),
          css.fontWeight("bold")
        )
        .text("19.8 KB min+gzip")
    )
    .appendTo(parent);
}

function createFooter(parent: FlickElement) {
  footer()
    .style(
      css.textAlign("center"),
      css.padding(spacing[10]),
      css.color(colors.textMuted),
      css.fontSize("14px"),
      css.borderTop(spacing.px, "solid", colors.border)
    )
    .text("© 2025 Flick Framework. All rights reserved.")
    .appendTo(parent);
}

// --- 5. Helper Functions (Sub-Components) ---

function createFeatureCard(
  icon: string,
  title: string,
  description: string,
  codeSnippet?: CodeToken[]
) {
  const card = div().style(
    css.display("flex"),
    css.flexDirection("column"),
    css.backgroundColor(colors.background),
    css.border(spacing.px, "solid", colors.border),
    css.padding(spacing[8]),
    css.borderRadius(spacing[3]),
    css.transition("transform 0.2s ease, box-shadow 0.2s ease")
  );

  span().style(css.fontSize("32px")).text(icon).appendTo(card);
  h3()
    .style(css.fontSize("22px"), css.fontWeight(600), css.marginTop(spacing[5]))
    .text(title)
    .appendTo(card);
  p()
    .style(
      css.fontSize("16px"),
      css.lineHeight(1.6),
      css.color(colors.textMuted),
      css.flexGrow(1)
    )
    .text(description)
    .appendTo(card);

  if (codeSnippet) {
    createCodeBlock(codeSnippet, true) // Pass 'true' for dark mode
      .style(css.marginTop(spacing[5]))
      .appendTo(card);
  }

  return card;
}

function createCodeBlock(snippet: CodeToken[], dark: boolean = false) {
  const preBlock = pre().style(
    css.backgroundColor(dark ? colors.code.bg : colors.bgLight),
    css.border(spacing.px, "solid", dark ? "#333" : colors.border),
    css.padding(spacing[4]),
    css.borderRadius(spacing[2]),
    css.overflowX("auto"),
    css.textAlign("left")
  );

  const codeEl = code()
    .style(
      css.fontFamily(fonts.mono),
      css.fontSize("14px"),
      css.color(dark ? colors.code.text : colors.text)
    )
    .appendTo(preBlock);

  // Build the code block with Flick elements (spans)
  snippet.forEach((token) => {
    let tokenColor: string;
    switch (token.type) {
      case "keyword":
        tokenColor = colors.code.keyword;
        break;
      case "function":
        tokenColor = colors.code.function;
        break;
      case "string":
        tokenColor = colors.code.string;
        break;
      case "comment":
        tokenColor = colors.code.comment;
        break;
      case "number":
        tokenColor = colors.code.number;
        break;
      case "property":
        tokenColor = colors.code.property;
        break;
      default:
        tokenColor = dark ? colors.code.text : colors.text;
    }

    span().text(token.content).style(css.color(tokenColor)).appendTo(codeEl);
  });

  return preBlock;
}
