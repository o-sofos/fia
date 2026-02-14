import { $, button, div, Each, li, Mut, ul } from "fia";

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

    const friends = $(Mut([{ name: "Evan", age: 25 }, { name: "John", age: 26 }, { name: "Jane", age: 27 }]));

    ul(() => {
        Each(friends, (friend) => {
            li(`${friend.name} (${friend.age})`);
        })
    })

    button("Add Friend", () => {
        friends.push({ name: "Bob", age: Math.random() * 100 });
    });

};
