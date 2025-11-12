import { describe, it, expect } from "vitest";
import { padding, fontSize, fontWeight, display, border } from "./css";

describe("CSS Helper Functions", () => {
  it('px helper: should add "px" to numbers', () => {
    const rule = fontSize(16);
    expect(rule).toEqual({ prop: "fontSize", value: 16, unit: "px" });
  });

  it('px helper: should NOT add "px" to strings or keywords', () => {
    const rule1 = padding("10px 20px");
    const rule2 = padding("auto");

    expect(rule1).toEqual({
      prop: "padding",
      value: "10px 20px",
      unit: undefined,
    });
    expect(rule2).toEqual({ prop: "padding", value: "auto", unit: undefined });
  });

  it('px helper: should NOT add "px" to 0', () => {
    const rule = padding(0);
    expect(rule).toEqual({ prop: "padding", value: 0, unit: undefined });
  });

  it("k helper: should pass through keywords", () => {
    const rule = display("flex");
    expect(rule).toEqual({ prop: "display", value: "flex" });
  });

  it("kn helper: should handle keywords and numbers", () => {
    const rule1 = fontWeight("bold");
    const rule2 = fontWeight(700);
    expect(rule1).toEqual({ prop: "fontWeight", value: "bold" });
    expect(rule2).toEqual({ prop: "fontWeight", value: 700 });
  });

  it("multi helper: should handle multiple arguments", () => {
    //  This test assumes you fixed the multi-arg helper
    // If not, use: const rule = border('1px solid red');
    const rule = border("1px", "solid", "red");
    expect(rule).toEqual({
      prop: "border",
      value: "1px solid red",
      unit: undefined,
    });
  });
});
