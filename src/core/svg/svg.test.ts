import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { beforeEach, describe, expect, it } from "bun:test";
import { animate, circle, g, path, rect, svg, text } from "./svg";
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

// =============================================================================
// Type-level checks (bun run test:types)
// =============================================================================

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

describe("SVG types", () => {
    it("returns exact element types and element-typed handlers", () => {
        svg(() => {
            const r = rect({ width: 10, height: 10 });
            const isRect: Equal<typeof r, SVGRectElement> = true;
            const t = text({ x: 0 }, "label");
            const isText: Equal<typeof t, SVGTextElement> = true;
            const group = g(() => {});
            const isG: Equal<typeof group, SVGGElement> = true;
            void [isRect, isText, isG];

            circle({
                r: 4,
                onclick: (e) => {
                    const target: SVGCircleElement = e.currentTarget;
                    const pointer: number = e.pointerId; // click is a PointerEvent
                    void [target, pointer];
                },
                onkeydown: (e) => e.key,
            });
            path({ d: "M0 0", ongotpointercapture: (e) => e.currentTarget.getTotalLength() });

            animate({
                attributeName: "r",
                onbegin: (e) => {
                    const target: SVGAnimateElement = e.currentTarget;
                    void target;
                },
            });
            // @ts-expect-error - animation elements don't dispatch UI events
            animate({ attributeName: "r", onclick: () => {} });
            // @ts-expect-error - SMIL handlers only exist on animation elements
            circle({ r: 4, onbegin: () => {} });
        });
        expect(true).toBe(true);
    });
});
