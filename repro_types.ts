
import { $, button } from "./src/core/mod";

const isValid = $(false);

// Case 1: Minimal reproduction
button({
    textContent: "Submit",
    style: { marginTop: "1rem" },
    onclick: (e) => { e.preventDefault(); },
    // Expected: disabled should be valid
    disabled: true
});

// Case 2: Exact copy from playground
button({
    textContent: $(() => isValid.value ? "Submit" : "Fill all fields"),
    style: {
        opacity: $(() => isValid.value ? "1" : "0.5"),
        cursor: $(() => isValid.value ? "pointer" : "not-allowed"),
        marginTop: "1rem",
    },
    disabled: true, // Should be allowed
    onclick: (e) => {
        e.preventDefault();
    }
});
