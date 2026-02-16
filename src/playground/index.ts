import { $, button, div, Each, h1, h2, input, li, Match, Mut, p, Show, strong, u, ul } from "fia";

export default () => {
    const age = $(Mut(5));

    Show(Match(age, {
        17: () => false,
        18: () => true,
        _: () => false,
    }), {
        then: () => p("You can vote"),
        else: () => p("You can't vote")
    })


    input({
        type: "number",
        value: age,
        onchange: (e) => age.value = Number(e.currentTarget.value)
    })
};
