// === src/worker.ts (Runs on Web Worker) ===
import type { MainToWorkerMessage, WorkerToMainCommand } from "./types";

let commandQueue: WorkerToMainCommand[] = [];
let isBatchQueued = false;

function sendBatch() {
  if (commandQueue.length === 0) {
    isBatchQueued = false;
    return;
  }
  self.postMessage(commandQueue);
  commandQueue = [];
  isBatchQueued = false;
}

export function queueCommand(command: WorkerToMainCommand) {
  commandQueue.push(command);
  if (!isBatchQueued) {
    isBatchQueued = true;
    queueMicrotask(sendBatch);
  }
}

self.onmessage = (e: MessageEvent<MainToWorkerMessage>) => {
  if (e.data.type === "init") {
    console.log("Worker: Received init. Loading App.ts...");
    // Dynamically import the user's app
    import("./App");
  }
};
