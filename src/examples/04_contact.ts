/**
 * 04_contact.ts
 *
 * Difficulty: Advanced
 * Concept: Reactivity & Forms
 *
 * Concepts:
 * 1. Signals: Creating reactive state `const email = $("")`
 * 2. Two-way Binding: Updating state from input events
 * 3. Conditional Rendering: Showing Success message vs Form
 * 4. Events: Handling `onsubmit`
 */

import { $, div, form, input, button, p, h2, textarea } from "../mod";

export function Contact() {
  const email = $("");
  const message = $("");
  const sent = $(false);

  div({ 
    style: { 
      padding: "4rem 2rem", 
      textAlign: "center", 
      background: "#f9f9f9",
      minHeight: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } 
  }, () => {
    // Conditional View using early return pattern inside effect
    if (sent.value) {
      div({ 
        style: { 
          color: "#2ecc71", 
          fontSize: "1.2rem",
          padding: "2rem",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        } 
      }, () => {
        h2({ style: { margin: "0 0 1rem 0" } }, "Message Sent! 🚀");
        p("Thanks so much. We'll be in touch soon.");
        button({ 
          onclick: () => sent.value = false,
          style: {
             marginTop: "1rem",
             padding: "0.5rem 1rem",
             border: "1px solid #ccc",
             background: "white",
             borderRadius: "4px",
             cursor: "pointer"
          }
        }, "Send another");
      });
      return;
    }

    form({
      style: { 
        width: "100%", 
        maxWidth: "400px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "1rem",
        textAlign: "left"
      },
      onsubmit: (e) => {
        e.preventDefault();
        console.log("Sending:", email.value, message.value);
        sent.value = true;
        email.value = "";
        message.value = "";
      }
    }, () => {
      h2({ style: { textAlign: "center", marginBottom: "1rem" } }, "Contact Us");
      
      div({ style: { display: "flex", flexDirection: "column", gap: "0.5rem" }}, () => {
         p({ style: { margin: "0", fontSize: "0.9rem", fontWeight: "bold" }}, "Email");
         input({
            type: "email",
            placeholder: "hello@example.com",
            value: email.value, // Bind value
            oninput: (e) => email.value = (e.target as HTMLInputElement).value, // Update signal
            style: { padding: "0.8rem", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem" }
         });
      });

      div({ style: { display: "flex", flexDirection: "column", gap: "0.5rem" }}, () => {
         p({ style: { margin: "0", fontSize: "0.9rem", fontWeight: "bold" }}, "Message");
         textarea({
            placeholder: "How can we help?",
            value: message.value,
            oninput: (e) => message.value = (e.target as HTMLTextAreaElement).value,
            style: { padding: "0.8rem", borderRadius: "4px", border: "1px solid #ccc", minHeight: "100px", fontFamily: "inherit", fontSize: "1rem" }
         });
      });
      
      button({
        type: "submit",
        style: { 
          padding: "1rem", 
          background: "#222", 
          color: "#fff", 
          border: "none", 
          borderRadius: "4px", 
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem",
          marginTop: "1rem"
        }
      }, "Send Message");
      
      // Reactive preview
      p({ style: { fontSize: "0.8rem", color: "#888", textAlign: "center", minHeight: "1.2em" } }, 
        () => email.value ? `Replying to: ${email.value}` : ""
      );
    });
  });
}

if (import.meta.main) Contact();
