import { $, div, button, h1, nav, ul, li } from "./core/mod";
import { Hero } from "./examples/01_hero";
import { Navbar } from "./examples/02_navbar";
import { Features } from "./examples/03_features";
import { Contact } from "./examples/04_contact";
import { LandingPage } from "./examples/05_full_page";
import Playground from "./playground/index";

export function ExamplesLauncher() {
  const currentExample = $<string>("playground");

  div(
    { style: { display: "flex", minHeight: "100vh", fontFamily: "system-ui" } },
    () => {
      // Sidebar
      nav(
        {
          style: {
            width: "250px",
            background: "#f4f4f4",
            padding: "1.5rem",
            borderRight: "1px solid #ddd",
            position: "sticky",
            top: "0",
            height: "100vh",
            overflowY: "auto",
          },
        },
        () => {
          h1("Fia Examples", {
            style: {
              fontSize: "1.2rem",
              marginBottom: "1.5rem",
              marginTop: "0",
            },
          });

          const examples = [
            { id: "01", name: "01. Hero", component: Hero },
            { id: "02", name: "02. Navbar", component: Navbar },
            { id: "03", name: "03. Features", component: Features },
            { id: "04", name: "04. Contact", component: Contact },
            { id: "05", name: "05. Full Page", component: LandingPage },
            { id: "playground", name: "🛝 Playground", component: Playground },
          ];

          ul(
            { style: { listStyle: "none", padding: "0", margin: "0" } },
            () => {
              examples.forEach((ex) => {
                li({ style: { marginBottom: "0.5rem" } }, () => {
                  const isActive = $(() => currentExample.value === ex.id);

                  button(ex.name, {
                    style: {
                      width: "100%",
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      background: isActive.value ? "#fff" : "transparent",
                      border: "1px solid",
                      borderColor: isActive.value ? "#ccc" : "transparent",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: isActive.value ? "600" : "normal",
                      boxShadow: isActive.value
                        ? "0 1px 2px rgba(0,0,0,0.05)"
                        : "none",
                      transition: "all 0.2s",
                    },
                    onclick: () => (currentExample.value = ex.id),
                  });
                });
              });
            },
          );
        },
      );

      // Main Content Area
      div(
        { id: "content-area", style: { flex: "1", background: "#fff" } },
        () => {
          // Reactive switching
          if (currentExample.value === "01") Hero();
          else if (currentExample.value === "02") Navbar();
          else if (currentExample.value === "03") Features();
          else if (currentExample.value === "04") Contact();
          else if (currentExample.value === "05") LandingPage();
          else if (currentExample.value === "playground") Playground;
        },
      );
    },
  );
}
