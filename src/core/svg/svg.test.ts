import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { beforeEach, describe, expect, it } from "bun:test";
import { animate, circle, svg } from "./svg";
import { hasExecutionContext, popExecutionContext } from "../context/context";

try {
    GlobalRegistrator.register();
} catch {
    // Already registered
}

beforeEach(() => {
    while (hasExecutionContext()) popExecutionContext();
    document.body.innerHTML = "";
});

describe("SVG events", () => {
    it("attaches SMIL animation handlers to beginEvent/endEvent/repeatEvent", () => {
        const fired: string[] = [];
        let anim!: SVGElement;
        svg(() => {
            circle({ r: 5 });
            anim = animate({
                attributeName: "r",
                onbegin: () => fired.push("begin"),
                onend: () => fired.push("end"),
                onrepeat: () => fired.push("repeat"),
            });
        });

        anim.dispatchEvent(new Event("beginEvent"));
        anim.dispatchEvent(new Event("repeatEvent"));
        anim.dispatchEvent(new Event("endEvent"));
        expect(fired).toEqual(["begin", "repeat", "end"]);
    });

    it("attaches regular UI event handlers", () => {
        let clicks = 0;
        const c = circle({ r: 5, onclick: () => clicks++ });
        c.dispatchEvent(new Event("click"));
        expect(clicks).toBe(1);
    });
});
