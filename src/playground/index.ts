import { $, div, h2, input, Match, Mut, p } from "fia";

export default () => {
    const age = $(Mut(65));

    div({ style: { padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" } }, () => {
        h2("Voting Eligibility Checker");

        // Match with range patterns
        p({
            style: {
                fontSize: "24px",
                fontWeight: "bold",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                background: $(() => age.value >= 18 ? "#d4edda" : "#f8d7da"),
                color: $(() => age.value >= 18 ? "#155724" : "#721c24")
            },
            textContent: Match(age, {
                "<18": () => "❌ Too young to vote",
                "[18..120]": () => "✅ Eligible to vote",
                _: () => "Invalid age"
            })
        });

        p({
            style: { fontSize: "18px", textAlign: "center" },
            textContent: $(() => `Age: ${age.value}`)
        });

        input({
            type: "range",
            min: "0",
            max: "120",
            value: String(age.value),
            style: { width: "100%", marginBottom: "10px" },
            oninput: (e) => age.value = Number(e.currentTarget.value)
        });

        const state = Match(age, {
            "(0..13)": () => "Child",
            "[13..18)": () => "Teenager",
            "[18..65]": () => "Adult",
            ">65": () => "Senior",
            _: () => "Unknown"
        });

        // Additional examples showing range notation
        p({
            style: { fontSize: "14px", color: "#666", marginTop: "20px" },
            textContent: $(() => `Category: ${state.value}`)
        });
    });
};
