// This is the core state management
export { signal } from "@flick/comms/";
export { FlickElement, FlickSvgElement } from "@flick/comms/";

// NOTE: We do NOT export src/main.ts or src/worker-api.ts.
// Those are the *runtime* and are not part of the
// app-building API.
