import { describe, it, expect, beforeAll } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

// 1. Setup happy-dom global environment before importing the app
beforeAll(() => {
  GlobalRegistrator.register();
});

// 2. Import the app (this will execute the side-effect UI creation)
// We use a dynamic import to ensure DOM is ready first, though beforeAll runs before module body execution?
// Actually top-level imports run first. So we need to put the DOM registration in a separate setup file
// or rely on happy-dom registration happening before the import if we use a dynamic import inside a test block?
// For simplicity in this file, we can't do top-level import of example.ts if we want to mock DOM first in this same file unless we use bun's preload.
// But valid JS evaluation order means imports run before current module code.
//
// Workaround: We will use a dynamic import or assuming the user sets up preload if they want cleaner code.
// But here, I'll just use dynamic import for the test.

describe("Flick Counter Example", () => {
  it("should have correct initial state", async () => {
    // Dynamically import to ensure DOM globals are present
    const { count, doubled, isEven } = await import("./example");

    expect(count.value).toBe(0);
    expect(doubled.value).toBe(0);
    expect(isEven.value).toBe(true);
    
    // Check DOM
    const h1 = document.querySelector("h1");
    expect(h1?.textContent).toBe("Flick Counter");
    
    // Check initial text content in body (approximate check)
    expect(document.body.innerHTML).toContain("Count: 0");
    // Note: Implementation detail - elements.ts creates text nodes.
    // Let's just check the text content of the body container
    expect(document.body.textContent).toContain("Count: 0");
    expect(document.body.textContent).toContain("Doubled: 0");
    expect(document.body.textContent).toContain("✓ Even number");
  });

  it("should update state and DOM when count changes", async () => {
    // We get the same instance because modules are singletons
    const { count, doubled, isEven } = await import("./example");

    // ACT: Increment
    count.value++;

    // ASSERT: State
    expect(count.value).toBe(1);
    expect(doubled.value).toBe(2);
    expect(isEven.value).toBe(false);

    // ASSERT: DOM
    // We need to wait for effects? Effect system is synchronous in my implementation!
    // So updates should be immediate.
    expect(document.body.textContent).toContain("Count: 1");
    expect(document.body.textContent).toContain("Doubled: 2");
    expect(document.body.textContent).toContain("○ Odd number");

    // ACT: Reset
    count.value = 0;
    expect(count.value).toBe(0);
    expect(document.body.textContent).toContain("Count: 0");
  });
});
