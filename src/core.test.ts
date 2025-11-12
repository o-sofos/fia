import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { FLICK_ROOT_ID } from "./types";

// Mock the entire worker-api module
vi.mock("./worker-api", () => ({
  // We provide a fake 'queueCommand' and 'registerWorkerListener'
  // that we can spy on.
  queueCommand: vi.fn(),
  registerWorkerListener: vi.fn(),
  workerEventListenerRegistry: new Map(), // Provide the registry
}));

// Import the *mocked* functions
import { queueCommand, registerWorkerListener } from "./worker-api";
// Import the system-under-test
import { FlickElement } from "./core";
import { button, div, h1 } from "./html";
import { color } from "./css";
import { ariaLabel } from "./accessibility";

describe("FlickElement (Worker-Side API)", () => {
  //  Reset the mock's call history before each test
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers(); // For the auto-root test
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be an instance of FlickElement", () => {
    // Arrange: Import and use the class directly
    const el = new FlickElement("span");

    // Assert: Check if it's an instance of the class
    expect(el).toBeInstanceOf(FlickElement);
  });

  //
  it("should be an instance of FlickElement from a factory", () => {
    // Arrange: Use a factory function
    const el = div();

    // Assert: Check if the factory returns the correct class
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
      })
    );
  });

  it("should NOT auto-append if .appendTo() is called", async () => {
    // Arrange: Create a parent and satisfy its own auto-root
    const parent = div().appendTo("root"); // Explicitly append the parent
    await vi.runAllTimersAsync(); // Let its microtask run (it will do nothing now)

    // Clear mocks. Now we are in a clean state.
    vi.clearAllMocks();

    // Act: Create the child and append it
    const child = h1().appendTo(parent);

    //  Wait for the CHILD'S microtask to run
    await vi.runAllTimersAsync();

    // Assert: We should have exactly TWO calls:
    //    'create' for the child
    //    'append' for the child to the parent
    //    The child's auto-root should NOT have fired.
    expect(queueCommand).toHaveBeenCalledTimes(2);

    // We can be more specific
    expect(queueCommand).toHaveBeenCalledWith(
      expect.objectContaining({ type: "create", tag: "h1", id: child.id })
    );
    expect(queueCommand).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "append",
        parentId: parent.id,
        childId: child.id,
      })
    );
  });

  it("should queue commands for chaining", () => {
    div().text("hi").style(color("red")).attr(ariaLabel("test"));

    // 1 (create) + 1 (text) + 1 (style) + 1 (attr)
    // The auto-root append is still in a microtask, so we get 4
    expect(queueCommand).toHaveBeenCalledTimes(4);

    expect(queueCommand).toHaveBeenCalledWith(
      expect.objectContaining({ type: "text", value: "hi" })
    );
    expect(queueCommand).toHaveBeenCalledWith(
      expect.objectContaining({ type: "style", prop: "color", value: "red" })
    );
    expect(queueCommand).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "attribute",
        name: "aria-label",
        value: "test",
      })
    );
  });

  it("should register an event listener", () => {
    const handler = () => {};
    const el = button().on("click", handler);

    // It should queue a 'listen' command for the renderer
    expect(queueCommand).toHaveBeenCalledWith(
      expect.objectContaining({ type: "listen", event: "click", id: el.id })
    );

    // It should register the handler in the worker's map
    expect(registerWorkerListener).toHaveBeenCalledTimes(1);
    expect(registerWorkerListener).toHaveBeenCalledWith(
      el.id,
      "click",
      handler
    );
  });
});
