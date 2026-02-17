import { section, div, h3, p, $ } from "../../core/mod";
import { applyTilt } from "../utils/tilt";
import { t } from "../store/i18n";

export const Features = () =>
  section(
    {
      id: "features",
      class: "container",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
        marginBottom: "var(--spacing-xl)",
        paddingTop: "var(--spacing-lg)",
      },
    },
    () => {
      const features = $(() => [
        { key: "noVdom", icon: "⚡" },
        { key: "signals", icon: "🎯" },
        { key: "typescript", icon: "🛡️" },
        { key: "accessibility", icon: "♿" },
        { key: "zeroDeps", icon: "📦" },
        { key: "tiny", icon: "⚖️" },
        { key: "delegation", icon: "🎪" },
        { key: "batching", icon: "🚀" },
      ]);

      features.value.forEach(({ key, icon }) => {
        const title = $(
          () =>
            t.value.features.items[key as keyof typeof t.value.features.items]
              .title,
        );
        const desc = $(
          () =>
            t.value.features.items[key as keyof typeof t.value.features.items]
              .desc,
        );

        div(
          {
            style: {
              padding: "2rem",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "1rem",
              border: "1px solid rgba(255,255,255,0.05)",
              transition: "transform 0.1s ease-out",
              transformStyle: "preserve-3d",
            },
          },
          (el) => {
            applyTilt(el as unknown as HTMLElement, 15);

            div({
              style: {
                fontSize: "2.5rem",
                marginBottom: "1rem",
                transform: "translateZ(20px)",
              },
              textContent: icon,
            });
            h3({
              style: {
                fontSize: "1.25rem",
                marginBottom: "0.75rem",
                color: "var(--fia-primary)",
                fontWeight: "600",
                transform: "translateZ(10px)",
              },
              textContent: title,
            });
            p({
              style: {
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                transform: "translateZ(5px)",
              },
              textContent: desc,
            });
          },
        );
      });
    },
  );
