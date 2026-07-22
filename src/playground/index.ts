import { $, Mut, div, form, input, label, button, p, h2 } from "fia";

export default () => {
    const email = $(Mut(""));
    const subscribed = $(Mut(false));

    div(
        {
            style: {
                maxWidth: 420,
                margin: "2rem auto",
                fontFamily: "system-ui",
            },
        },
        () => {
            h2("Signup");

            form(
                {
                    style: {
                        width: 360, //                     number → "360px" (auto-px)
                        padding: "1rem", //                strings still work
                        opacity: 0.95, //                  unitless stays "0.95"
                        "--accent": "rebeccapurple", //    typed custom property
                    },
                    onsubmit: (e) => {
                        e.preventDefault(); //             e is a typed SubmitEvent
                        console.log("submit:", email.peek(), subscribed.peek());
                    },
                },
                () => {
                    label("Email", { htmlFor: "email" });

                    input({
                        id: "email",
                        type: "email", //                  discriminant: unlocks multiple/pattern, forbids checked
                        required: true,
                        placeholder: "you@example.com",
                        value: email, //                   signal-bound (reactive)
                        oninput: (e) => {
                            email.value = e.target.value; // target IS the input → .value is string
                        },
                    });

                    label(() => {
                        input({
                            type: "checkbox", //           checkbox variant: checked is boolean
                            checked: subscribed,
                            onchange: (e) => {
                                subscribed.value = e.target.checked; // typed boolean
                            },
                        });
                        p("Subscribe to updates");
                    });

                    button("Save", (e) => {
                        e.currentTarget.disabled = true; // shorthand handler: typed element + PointerEvent
                        void e.pointerId;
                    });
                },
            );
        },
    );

    // ---- What the compiler now rejects (uncomment any line to see) ----
    // input({ type: "text", checked: true });  // checked is a checkbox/radio prop
    // input({ type: "email", value: 123 });    // email value must be a string
    // input({ type: "text", unknownProp: 1 }); // excess props rejected
    // input({ type: "txet" });                 // typo in the discriminant
    // div({ onchange: (e) => e.target.value }); // target is Element on containers
};
