/**
 * @module jsr:@flick/core/worker
 *
 * This is the Flick worker-thread runtime.
 * Import this file once (for its side effects) in your app.worker.ts
 * to initialize the event listeners.
 *
 * @example
 * ```typescript
 * // In app.worker.ts
 * import 'jsr:@flick/core/worker';
 * import { signal } from 'jsr:@flick/core';
 * import { div } from 'jsr:@flick/core/elements';
 *
 * div().text(signal('Hello from the worker!'));
 * ```
 */
import type { MainToWorkerMessage } from "../../flick-comms/src/types";
import { workerEventListenerRegistry } from "./worker-api";

// --- Error Handlers ---
self.onmessageerror = (event) => {
  console.error("[Flick Worker]: A 'messageerror' occurred:", event);
};
self.onerror = (event) => {
  console.error("[Flick Worker]: An unhandled error occurred:", event);
};

// --- This is the Flick Worker Runtime ---
self.addEventListener("message", (e: MessageEvent<MainToWorkerMessage>) => {
  const msg = e.data;
  switch (msg.type) {
    case "init":
      // The worker is ready. The user's code will
      // now execute in their file.
      break;

    case "event": {
      const handler = workerEventListenerRegistry.get(msg.id)?.get(msg.event);
      if (handler) {
        try {
          handler(msg.payload);
        } catch (error) {
          // This bug won't crash the worker OR the task.
          // It will just fail gracefully.
          console.error(
            `[Flick Worker]: Error in event handler for ${msg.event} on ${msg.id}:`,
            error
          );
        }
      } else {
        console.warn(
          `[Flick Worker]: No handler found for event "${msg.event}" on ID ${msg.id}`
        );
      }
      break;
    }
  }
});
