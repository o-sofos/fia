import { $, button, form, input, div } from "../core/mod";

// Best Practice: Group related signals in a state factory or class
// This keeps signals fine-grained (performance) but organized (maintainability).
function createFormState() {
  const name = $("");
  const email = $("");
  const password = $("");

  return {
    name,
    email,
    password,
    // Derived state (Computed): Updates automatically when dependencies change
    isValid: $(() =>
      name.value.length > 0 &&
      email.value.includes("@") &&
      password.value.length >= 6
    ),
    // Actions: Encapsulate logic for modifying state
    reset: () => {
      name.value = "";
      email.value = "";
      password.value = "";
    },
    // proper serialization
    getData: () => ({
      name: name.value,
      email: email.value,
      password: password.value
    })
  };
}

export default () => {
  // Initialize state
  const formState = createFormState();

  form(() => {
    input({
      type: "text",
      placeholder: "Enter your name",
      value: formState.name, // Binding
      oninput: (e) => formState.name.value = (e.target as HTMLInputElement).value
    });

    input({
      type: "email",
      placeholder: "Enter your email",
      value: formState.email,
      oninput: (e) => formState.email.value = (e.target as HTMLInputElement).value
    });

    input({
      type: "password",
      placeholder: "Enter your password (min 6 chars)",
      value: formState.password,
      oninput: (e) => formState.password.value = (e.target as HTMLInputElement).value
    });

    button({
      // Reactive text content using computed signal
      textContent: $(() => formState.isValid.value ? "Submit" : "Fill all fields"),

      // Reactive styling
      style: {
        opacity: $(() => formState.isValid.value ? "1" : "0.5"),
        cursor: $(() => formState.isValid.value ? "pointer" : "not-allowed"),
        marginTop: "1rem",
        display: "contents"
      },

      onclick: (e) => {
        e.preventDefault();

        if (!formState.isValid.value) {
          console.log("Form is invalid!");
          return;
        }

        console.log("Submitting:", formState.getData());
        formState.reset();
      }
    });

    // Debug helper to visualize state changes in real-time
    button({
      textContent: "Reset Form",
      type: "button",
      style: { marginLeft: "0.5rem", background: "#f44336", color: "white" },
      onclick: formState.reset
    });
  });
};
