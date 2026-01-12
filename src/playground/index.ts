import { div } from "../core/mod";

export default (() => {
    div({ id: "test", class: "a b hi-bro i oh-my-god" }, (divRef) => {
        if (divRef.id === "test") {
            console.log("It works!");
        }

        if (divRef.classList.contains("xsadasd")) {
        }
    })
})();