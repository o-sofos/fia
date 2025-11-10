import type { MainToWorkerMessage } from "./types";
import { workerEventListenerRegistry } from "./worker-api";

self.addEventListener("error", (event) => {
  console.error("[Worker]: An 'error' occurred:", event);
});

self.addEventListener("unhandledrejection", (event) => {
  console.error("[Worker]: An 'unhandledrejection' occurred:", event);
});

self.addEventListener("messageerror", (event) => {
  console.error("[Worker]: An unhandled error occurred:", event);
});

// --- This is now the ONLY 'message' listener ---
self.addEventListener("message", (e: MessageEvent<MainToWorkerMessage>) => {
  const msg = e.data;

  switch (msg.type) {
    case "init":
      console.log("Worker: Received init. Loading App.ts...");
      // This import starts the app
      import("./App");
      // import("./App.svg");
      break;

    case "event": {
      const handler = workerEventListenerRegistry.get(msg.id)?.get(msg.event);
      if (handler) {
        console.log(`[Worker]: Found handler for ID ${msg.id}. Running...`);
        handler(msg.payload);
      } else {
        console.warn(
          `[Worker]: No handler found for event "${msg.event}" on ID ${msg.id}`
        );
        console.warn(
          `[Worker]: Current handlers:`,
          workerEventListenerRegistry
        );
      }
      break;
    }
  }
});
