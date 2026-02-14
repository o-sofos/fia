import { $, button as Button, Each, li as Item, ul as List, Mut } from "fia";

export default () => {

    type Friend = { name: string; age: number };
    const evanFriend = $<Friend>({ name: "Evan", age: 25 });
    const johnFriend = $<Friend>({ name: "John", age: 26 });
    const janeFriend = $<Friend>({ name: "Jane", age: 27 });
    const newFriend = $<Friend>({ name: "Bob", age: Math.random() * 100 });

    const friends = $(
        Mut(
            [
                evanFriend,
                johnFriend,
                janeFriend
            ]
        )
    );

    const friend = (friend: Friend) => Item(`${friend.name} (${friend.age})`)

    Button("Add Friend", () => {
        friends.push(newFriend);
    });
    List(() => Each(friends, friend));
};
