/**
 * bun:test preload (see bunfig.toml). Runs once per test process, before any
 * test file is loaded:
 *
 * - registers happy-dom globals
 * - resets the DOM and execution-context stack before every test
 * - fails any test that leaves the runtime dirty (unbalanced context stack,
 *   open batch, queued effects, leaked tracking/owner scope)
 */

import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { afterEach, beforeEach } from "bun:test";

try {
    GlobalRegistrator.register();
} catch {
    // Already registered (a test file registered first)
}

// Imported after registration: these modules touch `document` lazily, but
// keep the order explicit anyway.
const { assertRuntimeIdle, resetDom } = await import("./runtime");

beforeEach(() => {
    resetDom();
});

afterEach(() => {
    assertRuntimeIdle();
});
