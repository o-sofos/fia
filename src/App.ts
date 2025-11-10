import { div } from "./core";

console.log("App.ts: Running application logic...");

// This code now runs correctly inside the worker
div().text("some text").appendTo("root");

console.log('App.ts: "some text" UI has been queued.');
