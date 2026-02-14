import { $, Mut } from "./core/mod";

const mutableArray = $(Mut([1, 2, 3]));
mutableArray.push(4);
console.log("PASS: mutable array length is", mutableArray.length);

const friends = $(Mut(["Evan", "John", "Jane"]));
friends.push("Bob");
console.log("Friends:", friends.length);
