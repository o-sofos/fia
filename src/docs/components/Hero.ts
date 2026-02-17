import { header, h1, div, button, a, span, $ } from "../../core/mod";
import { t } from "../store/i18n";

export const Hero = () =>
  header(
    {
      class: "container",
      style: {
        padding: "var(--spacing-xl) 0",
        textAlign: "center",
        maxWidth: "900px",
        position: "relative",
      },
    },
    () => {
      // Main Title
      h1(
        {
          style: {
            fontSize: "clamp(3rem, 8vw, 5rem)",
            lineHeight: "1.1",
            marginBottom: "var(--spacing-sm)",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            position: "relative",
            zIndex: "1",
            color: "var(--text-primary)", // White
          },
        },
        () => {
          div({ textContent: "Immutability by Design" });
        },
      );

      // Subtitle (Gradient)
      h1(
        {
          class: "text-gradient",
          style: {
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            lineHeight: "1.2",
            marginBottom: "var(--spacing-md)",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            position: "relative",
            zIndex: "1",
          },
        },
        () => {
          div({ textContent: "Bare Metal JavaScript" });
        },
      );

      // Features Line
      div(
        {
          style: {
            fontSize: "1.2rem",
            color: "var(--text-secondary)", // Light gray
            marginBottom: "var(--spacing-lg)",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: "1",
          },
        },
        () => {
          const features = [
            "No JSX",
            "No Virtual DOM",
            "No Dependencies",
          ];

          features.forEach((feature) => {
            span({
              style: { display: "flex", alignItems: "center", gap: "0.5rem" }
            }, () => {
              span({
                style: { color: "var(--fia-primary)" },
                textContent: "✦"
              });
              span({ textContent: feature });
            });
          });
        },
      );

      // Buttons
      div(
        {
          style: {
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            marginTop: "var(--spacing-lg)",
            position: "relative",
            zIndex: "1",
          },
        },
        () => {
          // Get Started (Primary)
          button({
            class: "btn btn-primary",
            style: {
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              borderRadius: "2rem", // Rounded pill
            },
            textContent: $(() => t.value.hero.getStarted),
          });

          // View Source (Outline)
          a({
            href: "https://github.com/o-sofos/fia",
            target: "_blank",
            class: "btn btn-outline",
            style: {
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              borderRadius: "2rem",
            },
            textContent: "View Source",
          });
        },
      );

      // 3D Decorative Shapes
      div({
        class: "animate-float",
        style: {
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "60px",
          height: "60px",
          borderRadius: "1rem",
          background:
            "linear-gradient(135deg, var(--fia-primary), var(--fia-accent))",
          opacity: "0.2",
          boxShadow: "0 10px 30px rgba(var(--fia-brand-rgb),0.2)",
          zIndex: "0",
          transform: "rotate(45deg)",
        },
      });

      div({
        class: "animate-float-delayed",
        style: {
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: "2px solid var(--fia-primary)",
          opacity: "0.1",
          zIndex: "0",
        },
      });

      // Small floating circle top-right
      div({
        class: "animate-float",
        style: {
          position: "absolute",
          top: "15%",
          right: "15%",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "var(--fia-primary)",
          opacity: "0.2",
          boxShadow: "0 0 20px var(--fia-primary)",
          zIndex: "0",
          animationDelay: "1s",
        },
      });

      // Blurred orb bottom-left
      div({
        class: "animate-float-delayed",
        style: {
          position: "absolute",
          bottom: "25%",
          left: "10%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--fia-primary) 0%, transparent 70%)",
          opacity: "0.1",
          zIndex: "0",
          filter: "blur(20px)",
          animationDelay: "2s",
        },
      });

      // Tilted square mid-right
      div({
        class: "animate-float",
        style: {
          position: "absolute",
          top: "45%",
          right: "8%",
          width: "40px",
          height: "40px",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          transform: "rotate(15deg) translateZ(-20px)",
          opacity: "0.3",
          zIndex: "0",
          animationDelay: "3s",
        },
      });
    },
  );
