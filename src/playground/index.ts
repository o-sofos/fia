import { $, button, div, Mut } from "fia";

export default () => {

    // Mutable Store
    const state = $({ count: 0 }, "count");

    const btnText = $(() => `Increment Store ${state.count}`);

    div(() => {
        button(btnText, () => {
            state.count++;
        })
    });

    div($(() => state.count));

    // Mutable Primitive
    const state2 = $(Mut(0));

    const btnText2 = $(() => `Increment Primitive ${state2.value}`);

    div(() => {
        button(btnText2, () => {
            state2.value++;
        })
    });

    div($(() => state2.value));

};
