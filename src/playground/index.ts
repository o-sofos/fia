import { $, button, div, Mut } from "fia";

export default () => {

    const person = $(
        {
            name: Mut("evan"),
            age: 25,
            address: {
                city: Mut("new york"),
                zip: Mut("10001")
            }
        }
    );

    const person2 = { ...person };

    div($(() => person.name));
    div($(() => person.address.city));
    div($(() => person.address.zip));

    //btn for updating city
    button("update city", () => person.address.city = "new york city");
    button("update zip", () => person.address.zip = `${Number(person.address.zip) + 1}`);
    button("update name", () => person.name = "evan kol");

    const todos = $(Mut({ list: [] as string[] }));

    // ✅ Valid: Mutation methods work
    todos.list.push("Buy milk");
    todos.list.splice(0, 1);
};
