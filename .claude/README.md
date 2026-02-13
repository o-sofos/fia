# Fia Framework - Claude Code Agents and Skills

This directory contains specialized Claude Code agents and skills designed to help developers (and other LLMs) work effectively with the Fia reactive UI framework.

## Table of Contents

- [Overview](#overview)
- [Agents](#agents)
- [Skills](#skills)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)

---

## Overview

The Fia framework agents and skills provide:

1. **Specialized Agents**: Expert assistants for specific Fia development tasks
2. **Slash Command Skills**: Quick commands for common operations
3. **Templates**: Pre-built component templates
4. **Guides**: Best practices and optimization checklists
5. **Patterns**: Common fixes and anti-patterns

These tools are designed to work seamlessly within Claude Code to accelerate Fia development.

---

## Agents

Agents are specialized assistants that can be invoked by Claude to handle specific tasks.

### 1. Type System Architect (`type-system-architect`)

**Description:** TypeScript type system expert focused on world-class type inference and DX.

**When to use:**
- Designing sophisticated types
- Eliminating `any` from the codebase
- Improving type inference and auto-complete
- Creating best-in-class developer experience

**Capabilities:**
- Advanced TypeScript techniques (conditional types, mapped types, template literals)
- Zero-`any` type system design
- Maximizing type inference to reduce manual annotations
- Creating contextually intelligent types
- Optimizing for IDE auto-complete experience

**Model:** Opus (for complex type reasoning)

**Example:**
```
Claude, the element factory types need better inference. Can you use the type-system-architect to improve them?
```

### 2. Test Specialist (`test-specialist`)

**Description:** Unit testing expert for Fia reactive code.

**When to use:**
- Writing comprehensive unit tests
- Testing reactive behavior (signals, effects, computed)
- Improving test coverage
- Creating test utilities

**Capabilities:**
- Testing signals, computed, effects, and stores
- Testing DOM manipulation and rendering
- Testing Each() list rendering
- Edge case coverage
- Creating reusable test helpers
- Ensuring fast, isolated, reliable tests

**Model:** Sonnet (balanced for test writing)

**Example:**
```
Claude, can you write comprehensive tests for this component using the test-specialist?
```

### 3. Component Builder (`component-builder`)

**Description:** Expert at building Fia components from scratch.

**When to use:**
- Creating new reactive components
- Scaffolding UI elements
- Designing component architecture with signals and effects

**Capabilities:**
- Analyzes requirements and designs component structure
- Chooses appropriate reactivity patterns (signals, computed, stores)
- Implements with proper TypeScript types
- Adds event handlers with correct delegation
- Creates accompanying tests

**Model:** Sonnet (balanced capability and speed)

**Example:**
```
Claude, can you create a new user profile component with avatar, name, and status?
```

### 4. Refactor Helper (`refactor-helper`)

**Description:** Expert at refactoring code to Fia patterns.

**When to use:**
- Converting React/Vue/vanilla JS to Fia
- Improving existing Fia code
- Modernizing component patterns

**Capabilities:**
- Converts React hooks to Fia signals
- Migrates imperative code to reactive patterns
- Improves code organization and structure
- Maintains backward compatibility

**Conversion Patterns:**
- `useState` → `$(value)`
- `useEffect` → `$e(() => ...)`
- `useMemo` → `$(() => computed)`
- JSX → Element factories

**Model:** Sonnet

**Example:**
```
Claude, can you refactor this React component to use Fia?
```

### 5. Performance Analyzer (`performance-analyzer`)

**Description:** Expert at analyzing and optimizing Fia performance.

**When to use:**
- Debugging slow reactivity
- Investigating excessive re-renders
- Finding memory leaks
- Performance profiling

**Capabilities:**
- Analyzes reactive code for performance issues
- Identifies unnecessary effect re-runs
- Detects over-subscription problems
- Finds memory leaks in signal cleanup
- Recommends batch() usage
- Suggests computed vs. effect tradeoffs

**Model:** Opus (for deep analysis)

**Example:**
```
Claude, this component is running slow. Can you analyze the performance?
```

### 6. Documentation Curator (`documentation-curator`)

**Description:** Documentation expert responsible for JSDoc, README, and website content.

**When to use:**
- Writing or reviewing JSDoc comments
- Updating README.md files
- Maintaining the documentation website
- Creating code examples
- Ensuring documentation accuracy

**Capabilities:**
- Writing comprehensive JSDoc with examples
- Maintaining README structure and content
- Updating website documentation
- Creating clear, tested code examples
- Cross-linking related documentation
- Ensuring docs match current code

**Model:** Sonnet (balanced for writing)

**Example:**
```
Claude, can you review and improve the JSDoc comments in this file?
Claude, update the README to reflect the new features
Claude, add this new API to the website documentation
```

### 7. Pattern Validator (`pattern-validator`)

**Description:** Expert at validating Fia code against best practices.

**When to use:**
- Reviewing code
- Checking for anti-patterns
- Ensuring consistency with Fia conventions

**Capabilities:**
- Fast, read-only validation
- Checks for common mistakes
- Ensures consistent coding style
- Verifies proper TypeScript usage

**Model:** Haiku (fast validation)

**Example:**
```
Claude, can you validate this code against Fia best practices?
```

---

## Skills

Skills are slash commands that can be invoked directly for quick operations.

### 1. `/fia-component` - Create Components

**Description:** Create a new Fia component with proper reactive patterns.

**Usage:**
```bash
/fia-component ComponentName [type]
```

**Arguments:**
- `ComponentName` (required): Component name in PascalCase
- `type` (optional): `basic`, `form`, or `list`

**Examples:**
```bash
# Create a basic counter component
/fia-component Counter basic

# Create a login form (inferred from name)
/fia-component LoginForm

# Create a todo list
/fia-component TodoList list
```

**Features:**
- Automatic type inference from component name
- TypeScript templates with proper types
- Test file generation
- Compilation verification

**Templates:**
- [Basic Component](skills/fia-component/templates/basic-component.md)
- [Form Component](skills/fia-component/templates/form-component.md)
- [List Component](skills/fia-component/templates/list-component.md)

### 2. `/fia-fix` - Fix Common Issues

**Description:** Automatically detect and fix common Fia pattern issues.

**Usage:**
```bash
/fia-fix [file-path]
```

**Arguments:**
- `file-path` (optional): File to analyze and fix

**What it fixes:**
1. Missing `.value` in reactive contexts
2. Event handler issues (e.target vs e.currentTarget)
3. Missing effect cleanup
4. Static vs. reactive content
5. Unbatched updates
6. Effect for derived state
7. Context issues
8. Type errors

**Examples:**
```bash
# Fix current file
/fia-fix

# Fix specific file
/fia-fix src/components/Counter.ts
```

**Reference:** [Common Fixes](skills/fia-fix/patterns/common-fixes.md)

### 3. `/fia-optimize` - Optimize Performance

**Description:** Analyze and optimize Fia code for better performance.

**Usage:**
```bash
/fia-optimize [file-path]
```

**Arguments:**
- `file-path` (optional): File to analyze and optimize

**Optimizations:**
1. Batch multiple updates
2. Convert effects to computed
3. Use peek() for non-reactive reads
4. Optimize signal granularity
5. Optimize list rendering
6. Minimize DOM updates
7. Reduce computed complexity
8. Optimize effect dependencies

**Examples:**
```bash
# Optimize current file
/fia-optimize

# Optimize specific component
/fia-optimize src/components/Dashboard.ts
```

**Reference:** [Optimization Checklist](skills/fia-optimize/guides/optimization-checklist.md)

### 4. `/fia-docs` - Generate Documentation

**Description:** Generate comprehensive documentation for Fia components.

**Usage:**
```bash
/fia-docs [file-path]
```

**Arguments:**
- `file-path` (optional): File to document

**What it generates:**
1. Component overview
2. Props documentation
3. Signals documentation
4. Events documentation
5. Usage examples
6. Type exports
7. Testing examples

**Examples:**
```bash
# Document current file
/fia-docs

# Document specific component
/fia-docs src/components/Counter.ts
```

**Reference:** [Documentation Template](skills/fia-docs/templates/doc-template.md)

---

## Quick Start

### Creating a New Component

1. Use the component skill:
   ```bash
   /fia-component UserProfile basic
   ```

2. The skill will:
   - Create `src/components/UserProfile.ts`
   - Create `src/components/UserProfile.test.ts`
   - Generate boilerplate with proper patterns
   - Run type checking

3. Customize the component as needed

4. Fix any issues:
   ```bash
   /fia-fix src/components/UserProfile.ts
   ```

5. Optimize performance:
   ```bash
   /fia-optimize src/components/UserProfile.ts
   ```

6. Generate documentation:
   ```bash
   /fia-docs src/components/UserProfile.ts
   ```

### Converting React to Fia

1. Ask Claude to use the refactor-helper agent:
   ```
   Claude, please refactor this React component to Fia
   ```

2. The agent will:
   - Analyze the React code
   - Convert hooks to Fia signals
   - Convert JSX to element factories
   - Update event handlers
   - Maintain functionality

3. Review and test the converted code

### Optimizing Performance

1. Ask Claude to analyze performance:
   ```
   Claude, this component is slow. Can you use the performance-analyzer agent?
   ```

2. Or use the optimize skill directly:
   ```bash
   /fia-optimize src/components/SlowComponent.ts
   ```

3. Review the suggested optimizations

4. Apply fixes and measure impact

---

## Usage Examples

### Example 1: Build a Todo App

```bash
# Create the main TodoList component
/fia-component TodoList list

# Create a TodoItem component
/fia-component TodoItem basic

# Create a TodoForm component
/fia-component TodoForm form

# Fix any issues
/fia-fix src/components/TodoList.ts
/fia-fix src/components/TodoItem.ts
/fia-fix src/components/TodoForm.ts

# Optimize
/fia-optimize src/components/TodoList.ts

# Document
/fia-docs src/components/TodoList.ts
```

### Example 2: Refactor React App

```
User: "Claude, I have a React component that I want to convert to Fia"

Claude: "I'll use the refactor-helper agent to convert your React component to Fia patterns."

[Refactoring happens automatically]

User: "Can you also optimize it?"

Claude: "I'll use the performance-analyzer agent to find optimization opportunities."

[Analysis and optimization happens]
```

### Example 3: Fix Issues

```bash
# Run pattern validator
# (Claude automatically invokes the pattern-validator agent when asked to review code)

# Fix detected issues
/fia-fix src/components/

# Verify fixes
# (Type checking happens automatically)
```

---

## Directory Structure

```
.claude/
├── agents/                            # Specialized agents
│   ├── component-builder.md          # Component creation expert
│   ├── refactor-helper.md            # Code refactoring expert
│   ├── performance-analyzer.md       # Performance optimization expert
│   └── pattern-validator.md          # Best practices validator
├── skills/                            # Slash command skills
│   ├── fia-component/                # Component creation skill
│   │   ├── SKILL.md                  # Skill definition
│   │   ├── templates/                # Component templates
│   │   │   ├── basic-component.md    # Basic component template
│   │   │   ├── form-component.md     # Form component template
│   │   │   └── list-component.md     # List component template
│   │   └── examples/                 # Usage examples
│   │       └── usage-examples.md     # Detailed examples
│   ├── fia-fix/                      # Fix common issues skill
│   │   ├── SKILL.md                  # Skill definition
│   │   └── patterns/                 # Fix patterns
│   │       └── common-fixes.md       # Common issue fixes
│   ├── fia-optimize/                 # Performance optimization skill
│   │   ├── SKILL.md                  # Skill definition
│   │   └── guides/                   # Optimization guides
│   │       └── optimization-checklist.md  # Systematic checklist
│   └── fia-docs/                     # Documentation generation skill
│       ├── SKILL.md                  # Skill definition
│       └── templates/                # Documentation templates
│           └── doc-template.md       # Doc structure template
├── settings.local.json                # Permissions configuration
└── README.md                          # This file
```

---

## Agent vs. Skill: When to Use What

### Use Agents When:
- You need complex analysis or generation
- The task requires multiple steps
- You want Claude to make decisions
- You need deep code understanding
- The task is conversational

**Examples:**
- "Analyze the performance of this component"
- "Refactor this React code to Fia"
- "Design a component architecture for X"
- "Review this code for best practices"

### Use Skills When:
- You want a quick, specific operation
- The task is well-defined and scoped
- You want direct control
- You need to repeat the same task
- You prefer command-line style

**Examples:**
- `/fia-component Counter basic`
- `/fia-fix src/components/Header.ts`
- `/fia-optimize Dashboard.ts`
- `/fia-docs Button.ts`

---

## Best Practices

### For Component Development

1. **Start with a skill** to generate boilerplate:
   ```bash
   /fia-component MyComponent basic
   ```

2. **Implement business logic** in the generated component

3. **Fix issues** with the fix skill:
   ```bash
   /fia-fix src/components/MyComponent.ts
   ```

4. **Optimize** if needed:
   ```bash
   /fia-optimize src/components/MyComponent.ts
   ```

5. **Document** the component:
   ```bash
   /fia-docs src/components/MyComponent.ts
   ```

6. **Test** the component (write tests)

### For Code Review

1. Ask Claude to invoke the **pattern-validator** agent

2. Review the validation report

3. Use **fia-fix** to automatically fix simple issues

4. Manually fix complex issues

5. Re-validate to ensure all issues are resolved

### For Performance

1. Measure performance (use browser DevTools)

2. Ask Claude to use the **performance-analyzer** agent

3. Review the analysis report

4. Apply suggested optimizations (some automatically with fia-optimize)

5. Measure again to verify improvement

---

## Troubleshooting

### Skill Not Found

**Problem:** `/fia-component` returns "skill not found"

**Solution:**
- Ensure you're in the project directory (`/home/evan/flick`)
- Check that `.claude/skills/fia-component/SKILL.md` exists
- Verify the frontmatter has `user-invocable: true`

### Agent Not Invoked

**Problem:** Claude doesn't use the appropriate agent

**Solution:**
- Be explicit: "Use the component-builder agent to create..."
- Check that `.claude/agents/component-builder.md` exists
- Verify the agent frontmatter is correct

### Permission Denied

**Problem:** Tool execution is denied

**Solution:**
- Check `.claude/settings.local.json` has necessary permissions
- The current settings allow all Read, Write, Edit, Grep, Glob, Bash, Skill, Task

### Type Errors After Generation

**Problem:** Generated code has type errors

**Solution:**
- Run `/fia-fix` to automatically fix common type issues
- Manually fix complex type issues
- Ensure templates are up to date

---

## Contributing

### Adding a New Agent

1. Create `.claude/agents/agent-name.md`
2. Add frontmatter with name, description, tools, model
3. Write comprehensive instructions
4. Add examples and patterns
5. Update this README

### Adding a New Skill

1. Create `.claude/skills/skill-name/SKILL.md`
2. Add frontmatter with configuration
3. Write skill instructions
4. Create support files (templates, guides, examples)
5. Update permissions in `settings.local.json`
6. Update this README

### Updating Templates

1. Edit template files in `skills/*/templates/`
2. Test templates by creating components
3. Verify generated code compiles and follows best practices
4. Update examples in `skills/*/examples/`

---

## FAQ

### Q: Do I need to install anything?

A: No, these agents and skills work within Claude Code without additional installation. Just ensure you're in the Fia project directory.

### Q: Can I use these with other projects?

A: The agents and skills are Fia-specific. However, you can copy this structure and adapt it for other frameworks.

### Q: What's the difference between an agent and a skill?

A: **Agents** are invoked by Claude automatically or when you ask Claude to use them. **Skills** are slash commands you invoke directly (like `/fia-component`).

### Q: Can I customize the templates?

A: Yes! Edit the template files in `.claude/skills/*/templates/` to match your preferences.

### Q: How do I disable a skill?

A: Set `user-invocable: false` in the skill's frontmatter, or delete the skill directory.

### Q: Can I create my own agents/skills?

A: Absolutely! Follow the structure of existing agents/skills and add your own.

---

## Resources

### Documentation
- [Fia Documentation](../README.md)
- [Component Patterns](agents/component-builder.md)
- [Common Fixes](skills/fia-fix/patterns/common-fixes.md)
- [Optimization Checklist](skills/fia-optimize/guides/optimization-checklist.md)

### Templates
- [Basic Component](skills/fia-component/templates/basic-component.md)
- [Form Component](skills/fia-component/templates/form-component.md)
- [List Component](skills/fia-component/templates/list-component.md)
- [Documentation Template](skills/fia-docs/templates/doc-template.md)

### Guides
- [Usage Examples](skills/fia-component/examples/usage-examples.md)
- [Common Fixes Reference](skills/fia-fix/patterns/common-fixes.md)
- [Optimization Guide](skills/fia-optimize/guides/optimization-checklist.md)

---

## License

MIT - Same as Fia framework

---

## Support

For issues or questions:
- File an issue on the Fia repository
- Ask Claude for help (Claude can read this documentation)
- Check the troubleshooting section above

---

**Built with ❤️ for the Fia reactive UI framework**
