import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderer } from "./main";

import { FLICK_ROOT_ID } from "./types";

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
});
