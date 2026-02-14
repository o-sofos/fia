import { $, button, div } from "fia";

export default () => {

    const state = $({ count: 0 }, "count");

    const btnText = $(() => `Increment ${state.count}`);

    div(() => {
        button(btnText, () => {
            state.count++;
        })
    });

    div($(() => state.count));

};
