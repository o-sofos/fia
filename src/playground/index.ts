import { $, button, div, Mut } from "fia";

export default () => {

    const state = $({
        nested: {
            count: 0,
            grades: {
                1: 0,
                2: Mut(1), // Only this property is mutable
                3: 0,
                4: 0,
                5: 0,
            }
        }
    });


    div($(() => state.nested.grades['2']));

    button("Increment", () => {
        const { nested: { grades } } = state;
        grades['2'] = grades['2'] + 1;
    });

};
