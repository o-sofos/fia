import { span, getCurrentContext } from "fia";

// Helper to append text nodes
const t = (text: string) => {
    getCurrentContext().appendChild(document.createTextNode(text));
};

export const SyntaxHighlight = (codeStr: string) => {
    // Token types and their colors
    const COMMENT = "var(--syntax-comment)";
    const STRING = "var(--syntax-string)";
    const KEYWORD = "var(--syntax-keyword)";
    const FUNC = "var(--syntax-function)";
    const NUMBER = "#f78c6c";
    const OPERATOR = "#89ddff";
    const PUNCTUATION = "#89ddff";
    const TYPE = "#ffcb6b";
    const PROPERTY = "#82aaff";

    const keywords = new Set([
        "const", "let", "var", "import", "from", "export", "default",
        "function", "return", "if", "else", "for", "while", "do",
        "switch", "case", "break", "continue", "new", "delete", "typeof", "instanceof",
        "class", "extends", "implements", "interface", "type", "enum",
        "async", "await", "yield", "throw", "try", "catch", "finally",
        "true", "false", "null", "undefined", "void", "this", "super",
        "of", "in", "as",
    ]);

    const types = new Set([
        "string", "number", "boolean", "object", "any", "never", "unknown",
        "Array", "Promise", "Map", "Set", "Record", "Partial", "Required",
        "Signal", "Mut", "MaybeSignal",
    ]);

    const builtins = new Set([
        "div", "button", "h1", "h2", "h3", "h4", "h5", "h6",
        "p", "ul", "ol", "li", "input", "span", "section", "article", "nav",
        "form", "table", "tr", "td", "th", "a", "img", "pre", "code",
        "header", "footer", "main", "aside", "label", "select", "option",
        "textarea", "strong", "em", "canvas", "video", "audio",
        "console", "document", "window", "navigator",
        "Show", "Each", "Match", "$", "Mut",
        "setTimeout", "setInterval", "requestAnimationFrame",
        "map", "filter", "forEach", "reduce", "find", "some", "every",
        "push", "pop", "splice", "slice", "join", "split",
        "JSON", "Math", "Object", "Number", "String",
    ]);

    // Tokenize using regex
    const tokenRegex = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|=>|[{}()\[\];,.]|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*\b|[+\-*/%=!<>&|?:~^]+|\s+|./g;

    const tokens = codeStr.match(tokenRegex) || [];

    tokens.forEach((token, i) => {
        // Comments
        if (token.startsWith("//") || token.startsWith("/*")) {
            span({ style: { color: COMMENT, fontStyle: "italic" }, textContent: token });
        }
        // Template literals
        else if (token.startsWith("`")) {
            // Highlight template literal with interpolations
            const parts = token.split(/(\$\{[^}]*\})/);
            parts.forEach((part) => {
                if (part.startsWith("${")) {
                    span({ style: { color: PUNCTUATION }, textContent: "${" });
                    // Highlight inner expression simply
                    const inner = part.slice(2, -1);
                    if (builtins.has(inner) || keywords.has(inner)) {
                        span({ style: { color: builtins.has(inner) ? FUNC : KEYWORD }, textContent: inner });
                    } else {
                        span({ style: { color: "var(--text-primary)" }, textContent: inner });
                    }
                    span({ style: { color: PUNCTUATION }, textContent: "}" });
                } else {
                    span({ style: { color: STRING }, textContent: part });
                }
            });
        }
        // Strings
        else if (token.startsWith('"') || token.startsWith("'")) {
            span({ style: { color: STRING }, textContent: token });
        }
        // Arrow function
        else if (token === "=>") {
            span({ style: { color: OPERATOR }, textContent: token });
        }
        // Numbers
        else if (/^\d+(\.\d+)?$/.test(token)) {
            span({ style: { color: NUMBER }, textContent: token });
        }
        // Keywords
        else if (keywords.has(token)) {
            span({ style: { color: KEYWORD, fontStyle: token === "this" ? "italic" : "normal" }, textContent: token });
        }
        // Types (capitalized or known types)
        else if (types.has(token)) {
            span({ style: { color: TYPE }, textContent: token });
        }
        // Function calls: identifier followed by (
        else if (/^[a-zA-Z_$]/.test(token) && tokens[i + 1]?.trim() === "(") {
            if (builtins.has(token)) {
                span({ style: { color: FUNC }, textContent: token });
            } else {
                span({ style: { color: FUNC }, textContent: token });
            }
        }
        // Known builtins (not followed by parens)
        else if (builtins.has(token)) {
            span({ style: { color: FUNC }, textContent: token });
        }
        // Property access: token after .
        else if (i > 0 && tokens[i - 1] === "." && /^[a-zA-Z_$]/.test(token)) {
            span({ style: { color: PROPERTY }, textContent: token });
        }
        // Punctuation
        else if (/^[{}()\[\];,.]$/.test(token)) {
            span({ style: { color: PUNCTUATION }, textContent: token });
        }
        // Operators
        else if (/^[+\-*/%=!<>&|?:~^]+$/.test(token)) {
            span({ style: { color: OPERATOR }, textContent: token });
        }
        // Whitespace and everything else
        else {
            t(token);
        }
    });
};
