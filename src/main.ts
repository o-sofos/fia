// === src/index.ts (Runs on Main Thread) ===
import type { FlickId, WorkerToMainCommand } from "./types";
import { FLICK_ROOT_ID } from "./types";

console.log("Main Thread: Renderer loaded.");

const flickRegistry = new Map<FlickId, Node>();
flickRegistry.set(FLICK_ROOT_ID, document.body);

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

worker.onmessage = (e: MessageEvent<WorkerToMainCommand[]>) => {
  const commands = e.data;

  // Use rAF to batch DOM writes
  requestAnimationFrame(() => {
    for (const cmd of commands) {
      switch (cmd.type) {
        case "create":
          flickRegistry.set(cmd.id, document.createElement(cmd.tag));
          break;
        case "text": {
          const node = flickRegistry.get(cmd.id);
          if (node) node.textContent = cmd.value;
          break;
        }
        case "style": {
          const node = flickRegistry.get(cmd.id);
          if (node && "style" in node)
            (node as HTMLElement).style[cmd.prop as any] = String(cmd.value);
          break;
        }
        case "append": {
          const p = flickRegistry.get(cmd.parentId);
          const c = flickRegistry.get(cmd.childId);
          if (p && c) p.appendChild(c);
          break;
        }
      }
    }
  });
};

// Tell the worker it's time to start
console.log("Main Thread: Initializing worker...");
worker.postMessage({ type: "init" });
