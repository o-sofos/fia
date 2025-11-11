import type { MainToWorkerMessage } from "./types";
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
      console.log("Flick Worker: Runtime initialized.");
      break;

    case "event": {
      const handler = workerEventListenerRegistry.get(msg.id)?.get(msg.event);
      if (handler) {
        handler(msg.payload);
      } else {
        console.warn(
          `[Flick Worker]: No handler found for event "${msg.event}" on ID ${msg.id}`
        );
      }
      break;
    }
  }
});
