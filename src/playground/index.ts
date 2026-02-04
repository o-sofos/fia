import { div } from "../core/mod";

div(
  {
    id: "footer-padding",
    style: { borderRadius: "1rem" },
  },
  (parentDiv) => {
    if (parentDiv.id === "footer-padding") {
      if (parentDiv.style.borderRadius === "1rem") {
        parentDiv.style.borderRadius = "2rem";
      } else {
        parentDiv.style.borderRadius = "3rem";
      }
    }
  },
);
