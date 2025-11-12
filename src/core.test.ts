// === src/core.test.ts ===
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterAll,
} from "vitest";
import { FLICK_ROOT_ID, type FlickId } from "../../flick-comms/src/types";
import { signal } from "./reactivity";
import { FlickElement } from "./core";
import { button, div, h1 } from "./html";
import { color } from "./css";

// --- 1. MOCK SETUP (Handles Hoisting & Spying) ---

// Mock the worker-api module - define everything INSIDE the factory
vi.mock("./worker-api", () => {
  // Create the registry map inside the factory
  const mockWorkerEventListenerRegistry = new Map<FlickId, Map<string, any>>();

  const registerWorkerListenerSpy = vi.fn(
    (id: FlickId, event: string, handler: any) => {
      // Implementation logic for the spy
      if (!mockWorkerEventListenerRegistry.has(id)) {
        mockWorkerEventListenerRegistry.set(id, new Map());
      }
      mockWorkerEventListenerRegistry.get(id)!.set(event, handler);
    }
  );

  return {
    queueCommand: vi.fn(),
    registerWorkerListener: registerWorkerListenerSpy,
    workerEventListenerRegistry: mockWorkerEventListenerRegistry,
  };
});

// Import the necessary components from the mocked module
import {
  queueCommand,
  registerWorkerListener,
  workerEventListenerRegistry,
} from "./worker-api";

// --- GLOBAL TIMING SETUP ---

// Set up fake timers for the entire file (solves the unhandled timer error)
beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe("FlickElement (Worker-Side API)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- Basic Creation & Auto-Root ---

  it("should be an instance of FlickElement from a factory", () => {
    const el = div();
    expect(el).toBeInstanceOf(FlickElement);
  });

  it('should queue a "create" command on construction', () => {
    div();
    expect(queueCommand).toHaveBeenCalledTimes(1);
    expect(queueCommand).toHaveBeenCalledWith(
      expect.objectContaining({ type: "create", tag: "div" })
    );
  });

  it("should auto-append to root if no parent is set", async () => {
    const el = div();

    // It shouldn't append immediately
    expect(queueCommand).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: "append" })
    );

    // Wait for the microtask
    await vi.runAllTimersAsync();

    // it should have appended to root
    expect(queueCommand).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "append",
        parentId: FLICK_ROOT_ID,
        childId: el.id,
        beforeId: null, // Check for the nullable beforeId
      })
    );
  });

  it("should NOT auto-append if .appendTo() is called", async () => {
    const parent = div().appendTo("root");
    await vi.runAllTimersAsync();
    vi.clearAllMocks();

    const child = h1().appendTo(parent);

    await vi.runAllTimersAsync();

    // Assert: We should have exactly TWO calls: 'create' for child, 'append' for child
    expect(queueCommand).toHaveBeenCalledTimes(2);
  });

  // --- Chaining & Event Registration ---

  it("should queue commands for chaining", () => {
    div().text("hi").style(color("red"));

    // 1 (create) + 1 (text) + 1 (style)
    expect(queueCommand).toHaveBeenCalledTimes(3);

    expect(queueCommand).toHaveBeenCalledWith(
      expect.objectContaining({ type: "text", value: "hi" })
    );
    expect(queueCommand).toHaveBeenCalledWith(
      expect.objectContaining({ type: "style", prop: "color", value: "red" })
    );
  });

  it("should register an event listener", () => {
    const handler = () => {};
    const el = button().on("click", handler);

    // Assert that the spy was called using vi.mocked
    expect(vi.mocked(registerWorkerListener)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(registerWorkerListener)).toHaveBeenCalledWith(
      el.id,
      "click",
      handler
    );
  });

  // --- Reactive Attributes (Implicit Memo Test) ---

  describe("FlickElement.attr()", () => {
    // ... (Test for single attribute command) ...

    it("should create an effect for a reactive attribute", async () => {
      const mySignal = signal("test");
      const el = div().attr("aria-label", mySignal);

      await vi.runAllTimersAsync();

      // Assert that the reactive attribute command was sent (before the auto-append)
      expect(vi.mocked(queueCommand).mock.calls[1][0]).toEqual(
        expect.objectContaining({
          type: "attribute",
          name: "aria-label",
          value: "test",
        })
      );

      // Clear mocks and update signal (the reactive test)
      vi.clearAllMocks();
      mySignal.set("new value");

      // Assert: Only the attribute command was queued (Times = 1)
      expect(queueCommand).toHaveBeenCalledTimes(1);
      expect(queueCommand).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "attribute",
          name: "aria-label",
          value: "new value",
        })
      );
    });
  });

  // --- Keyed Reconciliation Tests ---
  describe("FlickElement.append() (Keyed Reconciliation)", () => {
    let parent: FlickElement;

    beforeEach(async () => {
      parent = div().appendTo("root");
      await vi.runAllTimersAsync();
      vi.clearAllMocks();
    });

    it("should add new items to the end", async () => {
      const childA = div().key("A");
      parent.append(childA);
      await vi.runAllTimersAsync();
      vi.clearAllMocks();

      const childB = div().key("B");
      parent.append(childA, childB);
      await vi.runAllTimersAsync();

      // We expect 3 calls: create(B), move(A), append(B)
      expect(queueCommand).toHaveBeenCalledTimes(3);

      expect(queueCommand).toHaveBeenCalledWith(
        expect.objectContaining({ type: "create", id: childB.id })
      );
      expect(queueCommand).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "move",
          id: childA.id,
          beforeId: childB.id,
        })
      );
      expect(queueCommand).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "append",
          childId: childB.id,
          beforeId: null,
        })
      );
    });

    it("should remove items from the end", async () => {
      const childA = div().key("A");
      const childB = div().key("B");
      parent.append(childA, childB);
      await vi.runAllTimersAsync();
      vi.clearAllMocks();

      parent.append(childA);
      await vi.runAllTimersAsync();

      // destroy(B), move(A)
      expect(queueCommand).toHaveBeenCalledTimes(2);
      expect(queueCommand).toHaveBeenCalledWith(
        expect.objectContaining({ type: "destroy", id: childB.id })
      );
      expect(queueCommand).toHaveBeenCalledWith(
        expect.objectContaining({ type: "move", id: childA.id, beforeId: null })
      );
    });

    it("should correctly reverse a list (pure move)", async () => {
      const childA = div().key("A");
      const childB = div().key("B");
      const childC = div().key("C");
      parent.append(childA, childB, childC);
      await vi.runAllTimersAsync();
      vi.clearAllMocks();

      // Act: Reverse the list
      parent.append(childC, childB, childA);
      await vi.runAllTimersAsync();

      expect(queueCommand).toHaveBeenCalledTimes(3);
      expect(queueCommand).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "move",
          id: childC.id,
          beforeId: childB.id,
        })
      );
      expect(queueCommand).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "move",
          id: childB.id,
          beforeId: childA.id,
        })
      );
      expect(queueCommand).toHaveBeenCalledWith(
        expect.objectContaining({ type: "move", id: childA.id, beforeId: null })
      );
    });
  });

  // --- Cleanup Tests ---
  describe("FlickElement.destroy() (Cleanup)", () => {
    it("should queue destroy commands for itself and all children", async () => {
      const parent = div();
      const child = div();

      // Manually set up parent-child relationship
      parent.append(child);

      await vi.runAllTimersAsync();
      vi.clearAllMocks();

      parent.destroy();

      // Get all the destroy commands
      const destroyCalls = vi
        .mocked(queueCommand)
        .mock.calls.filter((call) => call[0].type === "destroy");

      // Expect 2 destroy calls: destroy(child), destroy(parent)
      expect(destroyCalls).toHaveLength(2);

      // Assert child is destroyed first (depth-first)
      expect(destroyCalls[0][0]).toEqual(
        expect.objectContaining({ type: "destroy", id: child.id })
      );
      // Assert parent is destroyed second
      expect(destroyCalls[1][0]).toEqual(
        expect.objectContaining({ type: "destroy", id: parent.id })
      );
    });

    it("should remove the element from the worker event registry", () => {
      const handler = vi.fn();
      const buttonEl = button().on("click", handler);

      // Assert that the registry was populated
      expect(workerEventListenerRegistry.has(buttonEl.id)).toBe(true);

      buttonEl.destroy();

      // Assert: The ID is removed from the worker's map (cleanup)
      expect(workerEventListenerRegistry.has(buttonEl.id)).toBe(false);
    });
  });
});
