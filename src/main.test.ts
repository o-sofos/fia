import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderer } from "./main";

import { FLICK_ROOT_ID } from "../../flick-comms/src/types";

// We need a mock worker to test the renderer
class MockWorker {
  onmessage: ((e: MessageEvent) => void) | null = null;
  onerror: ((e: ErrorEvent) => void) | null = null;

  postMessageToRenderer(commands: any) {
    if (this.onmessage) {
      this.onmessage(new MessageEvent("message", { data: commands }));
    }
  }

  postMessage() {}
  addEventListener(type: string, listener: any) {
    if (type === "message") this.onmessage = listener;
  }
  removeEventListener() {}
  terminate() {}
}

describe("Renderer (Main Thread)", () => {
  let mockWorker: MockWorker;

  // Set up fake timers to control requestAnimationFrame
  beforeEach(() => {
    vi.useFakeTimers();
    // Reset JSDOM's body
    document.body.innerHTML = "";

    // Create a new mock worker and connect it
    mockWorker = new MockWorker();
    renderer(mockWorker as any);
  });

  // Clean up timers
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create an element", async () => {
    const commands = [
      { type: "create", id: "el-1", tag: "h1" },
      // Use the REAL FLICK_ROOT_ID
      { type: "append", parentId: FLICK_ROOT_ID, childId: "el-1" },
    ];

    mockWorker.postMessageToRenderer(commands);

    // Manually advance timers to flush requestAnimationFrame
    await vi.runAllTimersAsync();

    const h1 = document.body.querySelector("h1");
    expect(h1).not.toBeNull();
  });

  it("should set text on an element", async () => {
    const commands = [
      { type: "create", id: "el-1", tag: "p" },
      { type: "text", id: "el-1", value: "Hello Flick" },
      { type: "append", parentId: FLICK_ROOT_ID, childId: "el-1" },
    ];

    mockWorker.postMessageToRenderer(commands);

    await vi.runAllTimersAsync();

    const p = document.body.querySelector("p");
    expect(p).not.toBeNull();
    expect(p?.textContent).toBe("Hello Flick");
  });

  it("should sanitize a malicious href attribute", async () => {
    const commands = [
      { type: "create", id: "el-1", tag: "a" },
      {
        type: "attribute",
        id: "el-1",
        name: "href",
        value: "javascript:alert(1)",
      },
      { type: "append", parentId: FLICK_ROOT_ID, childId: "el-1" },
    ];

    mockWorker.postMessageToRenderer(commands);

    await vi.runAllTimersAsync();

    const a = document.body.querySelector("a");
    expect(a).not.toBeNull();
    // The sanitizer should have *blocked* the attribute
    expect(a?.getAttribute("href")).toBeNull();
  });

  it("should apply styles to an element", async () => {
    const commands = [
      { type: "create", id: "el-1", tag: "div" },
      { type: "style", id: "el-1", prop: "color", value: "red" },
      { type: "style", id: "el-1", prop: "backgroundColor", value: "blue" },
      { type: "append", parentId: FLICK_ROOT_ID, childId: "el-1" },
    ];

    mockWorker.postMessageToRenderer(commands);
    await vi.runAllTimersAsync();

    const el = document.body.querySelector("div");
    expect(el).not.toBeNull();
    expect(el?.style.color).toBe("red");
    expect(el?.style.backgroundColor).toBe("blue");
  });

  it("should move an element for list reconciliation", async () => {
    // 1. Arrange: Create A, B, C in order
    const createCommands = [
      { type: "create", id: "A", tag: "div" },
      { type: "text", id: "A", value: "A" },
      { type: "append", parentId: FLICK_ROOT_ID, childId: "A" },
      { type: "create", id: "B", tag: "div" },
      { type: "text", id: "B", value: "B" },
      { type: "append", parentId: FLICK_ROOT_ID, childId: "B" },
      { type: "create", id: "C", tag: "div" },
      { type: "text", id: "C", value: "C" },
      { type: "append", parentId: FLICK_ROOT_ID, childId: "C" },
    ];
    mockWorker.postMessageToRenderer(createCommands);
    await vi.runAllTimersAsync();

    expect(document.body.textContent).toBe("ABC");

    // 2. Act: Move C before B
    const moveCommands = [
      { type: "move", id: "C", parentId: FLICK_ROOT_ID, beforeId: "B" },
    ];
    mockWorker.postMessageToRenderer(moveCommands);
    await vi.runAllTimersAsync();

    // 3. Assert: DOM order is now ACB
    expect(document.body.textContent).toBe("ACB");
  });

  it("should destroy an element and clean up listeners", async () => {
    // 1. Arrange: Create a button with a listener
    const commands = [
      { type: "create", id: "btn-1", tag: "button" },
      { type: "listen", id: "btn-1", event: "click" },
      { type: "append", parentId: FLICK_ROOT_ID, childId: "btn-1" },
    ];
    mockWorker.postMessageToRenderer(commands);
    await vi.runAllTimersAsync();

    const btn = document.body.querySelector("button");
    expect(btn).not.toBeNull();

    // 2. Act: Destroy the button
    const destroyCommands = [{ type: "destroy", id: "btn-1" }];
    mockWorker.postMessageToRenderer(destroyCommands);
    await vi.runAllTimersAsync();

    // 3. Assert: The button is gone
    expect(document.body.querySelector("button")).toBeNull();
    // We can't *truly* test if the listener map was cleaned
    // without access to the renderer's internal state,
    // but we've confirmed the DOM removal.
  });

  it("should proxy a DOM event back to the worker", async () => {
    // 1. Arrange: Spy on the worker's postMessage
    const postMessageSpy = vi.spyOn(mockWorker, "postMessage");

    // 2. Act: Create a button and add a listener
    const commands = [
      { type: "create", id: "btn-click", tag: "button" },
      { type: "listen", id: "btn-click", event: "click" },
      { type: "append", parentId: FLICK_ROOT_ID, childId: "btn-click" },
    ];
    mockWorker.postMessageToRenderer(commands);
    await vi.runAllTimersAsync();

    // 3. Act: Simulate the user click
    const btn = document.body.querySelector("button");
    btn?.click(); // This fires the proxyHandler

    // 4. Assert: The renderer should have sent a
    // 'event' message back to the worker.
    expect(postMessageSpy).toHaveBeenCalledTimes(1);
    expect(postMessageSpy).toHaveBeenCalledWith({
      type: "event",
      id: "btn-click",
      event: "click",
      payload: expect.any(Object), // We know our serializer works
    });
  });

  describe("Renderer (Main Thread)", () => {
    // ... (Keep all your existing tests) ...

    it("should create SVG elements with the correct namespace", async () => {
      const commands = [
        { type: "create", id: "svg-1", tag: "svg", ns: "svg" },
        { type: "create", id: "path-1", tag: "path", ns: "svg" },
        { type: "append", parentId: "svg-1", childId: "path-1" },
        { type: "append", parentId: FLICK_ROOT_ID, childId: "svg-1" },
      ];

      mockWorker.postMessageToRenderer(commands);
      await vi.runAllTimersAsync();

      const svg = document.body.querySelector("svg");
      const path = document.body.querySelector("path");

      expect(svg).not.toBeNull();
      expect(path).not.toBeNull();

      // This is the real test
      expect(svg?.namespaceURI).toBe("http://www.w3.org/2000/svg");
      expect(path?.namespaceURI).toBe("http://www.w3.org/2000/svg");
    });

    it('should block "on*" event attributes', async () => {
      // 1. Arrange: Spy on the console
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      const commands = [
        { type: "create", id: "el-1", tag: "img" },
        { type: "attribute", id: "el-1", name: "src", value: "x" },
        { type: "attribute", id: "el-1", name: "onerror", value: "alert(1)" },
        { type: "append", parentId: FLICK_ROOT_ID, childId: "el-1" },
      ];

      mockWorker.postMessageToRenderer(commands);
      await vi.runAllTimersAsync();

      const img = document.body.querySelector("img");
      expect(img).not.toBeNull();
      // The sanitizer should have blocked the attribute
      expect(img?.getAttribute("onerror")).toBeNull();
      // And it should have warned the developer
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Blocked 'on*' event attribute")
      );

      consoleWarnSpy.mockRestore(); // Clean up the spy
    });

    it("should proxy an input event with value", async () => {
      // 1. Arrange: Spy on the worker's postMessage
      const postMessageSpy = vi.spyOn(mockWorker, "postMessage");

      // 2. Act: Create an input and add a listener
      const commands = [
        { type: "create", id: "in-1", tag: "input" },
        { type: "listen", id: "in-1", event: "input" },
        { type: "append", parentId: FLICK_ROOT_ID, childId: "in-1" },
      ];
      mockWorker.postMessageToRenderer(commands);
      await vi.runAllTimersAsync();

      // 3. Act: Simulate the user typing
      const inputEl = document.body.querySelector("input");
      expect(inputEl).not.toBeNull();

      // Set the value and dispatch the event
      inputEl!.value = "test value";
      inputEl!.dispatchEvent(
        new Event("input", { bubbles: true, composed: true })
      );

      // 4. Assert: The renderer sent the correct payload
      expect(postMessageSpy).toHaveBeenCalledTimes(1);
      expect(postMessageSpy).toHaveBeenCalledWith({
        type: "event",
        id: "in-1",
        event: "input",
        payload: { value: "test value" }, // Check the payload
      });
    });
  });
});
