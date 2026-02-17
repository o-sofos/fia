import { header, h1, p, div, button, a, span, $ } from "../../core/mod";
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
      h1(
        {
          style: {
            fontSize: "4.5rem",
            lineHeight: "1.1",
            marginBottom: "var(--spacing-md)",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            position: "relative",
            zIndex: "1",
          },
        },
        () => {
          div({ textContent: $(() => t.value.hero.title) });
          div({ class: "text-gradient", textContent: $(() => t.value.hero.subtitle) });
        },
      );

      p(
        {
          style: {
            fontSize: "1.25rem",
            color: "var(--text-secondary)",
            marginBottom: "var(--spacing-lg)",
            maxWidth: "800px",
            margin: "0 auto var(--spacing-lg)",
            lineHeight: "1.8",
            position: "relative",
            zIndex: "1",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem 1.5rem",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        () => {
          const features = [
            // "Almost Native",
            "Immutability by Design",
            "No JSX",
            "No Virtual DOM",
            "No Dependencies",
          ];

          features.forEach((feature) => {
            span(
              {
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                },
              },
              () => {
                span({
                  style: {
                    color: "var(--fia-primary)",
                    fontSize: "0.8em",
                  },
                  textContent: "✦",
                });
                span({ textContent: feature });
              },
            );
          });
        },
      );

      div(
        {
          style: {
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "var(--spacing-lg)",
            position: "relative",
            zIndex: "1",
          },
        },
        () => {
          button({
            class: "btn btn-primary",
            style: { padding: "1rem 2rem", fontSize: "1.1rem" },
            textContent: $(() => t.value.hero.getStarted),
          });
          a({
            href: "https://github.com/o-sofos/fia",
            target: "_blank",
            class: "btn btn-outline",
            style: { padding: "1rem 2rem", fontSize: "1.1rem" },
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
