/**
 * 🛝 Flick Playground
 * 
 * Experiment with code here!
 * This component is available in the Examples Gallery.
 */
import { $, div, h1, p, button, input } from "../mod";

export function Playground() {
  const text = $("Hello World");

  div({ style: { padding: "2rem", fontFamily: "system-ui" } }, () => {
    h1("Playground");
    p("Edit src/playground/index.ts to see changes here.");
    
    div({ style: { marginTop: "1rem" } }, () => {
      input({ 
        value: text.value, 
        oninput: (e) => text.value = (e.target as HTMLInputElement).value,
        style: { padding: "0.5rem", marginRight: "0.5rem" }
      });
      
      p(() => `You typed: ${text.value}`);
    });
  });
}
