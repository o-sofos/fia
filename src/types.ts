/**
 * A unique identifier for a DOM node managed by Flick.
 * This ID is used by both the Worker and the Main Thread.
 */
export type FlickId = string;

/**
 * A special "magic" ID that represents the document.body
 * or a user-defined root element on the main thread.
 */
export const FLICK_ROOT_ID: FlickId = "__FLICK_ROOT__";

// --- Worker to Main Thread Payloads (DOM Commands) ---

type CreateElementCommand = {
  type: "create";
  id: FlickId;
  tag: string; // e.g., 'div', 'h1', 'svg'
  ns?: "svg";
};

type SetTextCommand = {
  type: "text";
  id: FlickId;
  value: string;
};

type SetStyleCommand = {
  type: "style";
  id: FlickId;
  prop: string; // e.g., 'color', 'paddingTop'
  value: string | number;
};

type AppendChildCommand = {
  type: "append";
  parentId: FlickId;
  childId: FlickId; // This is correct
};

type AddListenerCommand = {
  type: "listen";
  id: FlickId;
  event: string; // e.g., 'click', 'input'
};

type RemoveListenerCommand = {
  type: "unlisten";
  id: FlickId;
  event: string;
};

type DestroyElementCommand = {
  type: "destroy";
  id: FlickId;
};

/**
 * A single command sent from the Worker to the Main Thread.
 * These are always batched into an array for performance.
 */
export type WorkerToMainCommand =
  | CreateElementCommand
  | SetTextCommand
  | SetStyleCommand
  | AppendChildCommand
  | AddListenerCommand
  | RemoveListenerCommand
  | DestroyElementCommand;

// --- Main Thread to Worker Payloads (Events) ---

type InitPayload = {
  type: "init";
  // We could pass options here, like window size, device pixel ratio, etc.
};

type EventPayload = {
  type: "event";
  id: FlickId;
  event: string;
  // The serializable payload from the event
  payload: any;
};

/**
 * A message sent from the Main Thread to the Worker.
 */
export type MainToWorkerMessage = InitPayload | EventPayload;
