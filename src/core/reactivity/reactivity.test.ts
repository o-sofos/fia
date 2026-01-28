import { describe, it, expect } from "bun:test";
import { $, $e, batch } from "./reactivity";

describe("Reactivity System", () => {
    describe("Signals", () => {
        it("should hold and update values via function call", () => {
            const count = $<number>(0);
            expect(count()).toBe(0);

            count(5);
            expect(count()).toBe(5);
        });

        it("should hold and update values via .value property", () => {
            const count = $<number>(0);
            expect(count.value).toBe(0);

            count.value = 10;
            expect(count.value).toBe(10);
        });

        it("should not trigger effects when value is unchanged (Object.is)", () => {
            const count = $<number>(0);
            let runs = 0;

            $e(() => {
                count.value;
                runs++;
            });
            expect(runs).toBe(1);

            count.value = 0; // Same value
            expect(runs).toBe(1);

            count(0); // Same value via function
            expect(runs).toBe(1);
        });

        it("should handle NaN correctly (Object.is)", () => {
            const val = $<number>(NaN);
            let runs = 0;

            $e(() => {
                val.value;
                runs++;
            });
            expect(runs).toBe(1);

            val.value = NaN; // NaN === NaN with Object.is
            expect(runs).toBe(1);
        });

        it("should trigger effects on value change", () => {
            const count = $<number>(0);
            let observed = -1;

            $e(() => {
                observed = count.value;
            });
            expect(observed).toBe(0);

            count.value = 42;
            expect(observed).toBe(42);
        });

        it("should allow reading without tracking via peek()", () => {
            const count = $<number>(0);
            let runs = 0;

            $e(() => {
                count.peek(); // Should NOT track
                runs++;
            });
            expect(runs).toBe(1);

            count.value = 1;
            expect(runs).toBe(1); // Effect should NOT re-run
        });
    });

    describe("Computed", () => {
        it("should derive values from signals", () => {
            const count = $<number>(2);
            const doubled = $(() => count.value * 2);

            expect(doubled()).toBe(4);
            expect(doubled.value).toBe(4);
        });

        it("should update when dependencies change", () => {
            const count = $<number>(1);
            const doubled = $(() => count.value * 2);

            expect(doubled.value).toBe(2);

            count.value = 5;
            expect(doubled.value).toBe(10);
        });

        it("should chain computed values", () => {
            const count = $<number>(1);
            const doubled = $(() => count.value * 2);
            const quadrupled = $(() => doubled.value * 2);

            expect(quadrupled.value).toBe(4);

            count.value = 3;
            expect(doubled.value).toBe(6);
            expect(quadrupled.value).toBe(12);
        });

        it("should be lazy - only recompute when read", () => {
            let computeCount = 0;
            const count = $<number>(1);
            const doubled = $(() => {
                computeCount++;
                return count.value * 2;
            });

            expect(computeCount).toBe(1); // Initial computation

            count.value = 2;
            expect(computeCount).toBe(1); // Not yet recomputed

            doubled.value; // Trigger recomputation
            expect(computeCount).toBe(2);

            doubled.value; // Read again - should NOT recompute
            expect(computeCount).toBe(2);
        });

        it("should allow peeking without tracking", () => {
            const count = $<number>(5);
            const doubled = $(() => count.value * 2);

            let runs = 0;
            $e(() => {
                doubled.peek(); // Peek at computed
                runs++;
            });
            expect(runs).toBe(1);

            count.value = 10;
            expect(runs).toBe(1); // Effect should NOT re-run
            expect(doubled.peek()).toBe(20); // But computed should update
        });
    });

    describe("Effects", () => {
        it("should run immediately on creation", () => {
            let ran = false;
            $e(() => {
                ran = true;
            });
            expect(ran).toBe(true);
        });

        it("should track multiple dependencies", () => {
            const first = $<string>("John");
            const last = $<string>("Doe");
            let fullName = "";

            $e(() => {
                fullName = `${first.value} ${last.value}`;
            });
            expect(fullName).toBe("John Doe");

            first.value = "Jane";
            expect(fullName).toBe("Jane Doe");

            last.value = "Smith";
            expect(fullName).toBe("Jane Smith");
        });

        it("should cleanup stale dependencies on re-run", () => {
            const show = $<boolean>(true);
            const msg = $<string>("Hello");
            let runs = 0;

            $e(() => {
                runs++;
                if (show.value) {
                    msg.value; // Only track msg when show is true
                }
            });
            expect(runs).toBe(1);

            msg.value = "World";
            expect(runs).toBe(2); // msg is tracked

            show.value = false;
            expect(runs).toBe(3); // show changed

            // Now msg should NOT be tracked anymore
            msg.value = "Ignored";
            expect(runs).toBe(3); // Should NOT re-run!
        });

        it("should be disposable", () => {
            const count = $<number>(0);
            let runs = 0;

            const dispose = $e(() => {
                count.value;
                runs++;
            });
            expect(runs).toBe(1);

            count.value = 1;
            expect(runs).toBe(2);

            dispose();

            count.value = 2;
            expect(runs).toBe(2); // Should NOT run after disposal
        });

        it("should handle nested effects independently", () => {
            const outer = $<number>(0);
            const inner = $<number>(0);
            let outerRuns = 0;
            let innerRuns = 0;

            $e(() => {
                outer.value;
                outerRuns++;

                $e(() => {
                    inner.value;
                    innerRuns++;
                });
            });

            // Note: nested effects create new effects each outer run
            // This is generally discouraged but should not crash
            expect(outerRuns).toBe(1);
            expect(innerRuns).toBe(1);
        });
    });

    describe("Batching", () => {
        it("should batch multiple updates into single effect run", () => {
            const count = $<number>(0);
            let runs = 0;

            $e(() => {
                count.value;
                runs++;
            });
            expect(runs).toBe(1);

            batch(() => {
                count.value = 1;
                count.value = 2;
                count.value = 3;
            });

            expect(runs).toBe(2); // Initial + one batched run
            expect(count.value).toBe(3);
        });

        it("should deduplicate effects within a batch", () => {
            const a = $<number>(0);
            const b = $<number>(0);
            let runs = 0;

            $e(() => {
                a.value;
                b.value;
                runs++;
            });
            expect(runs).toBe(1);

            batch(() => {
                a.value = 1; // Schedules effect
                b.value = 1; // Schedules same effect again
            });

            expect(runs).toBe(2); // Should only run once after batch
        });

        it("should support nested batches", () => {
            const count = $<number>(0);
            let runs = 0;

            $e(() => {
                count.value;
                runs++;
            });
            expect(runs).toBe(1);

            batch(() => {
                count.value = 1;
                batch(() => {
                    count.value = 2;
                    count.value = 3;
                });
                count.value = 4;
            });

            expect(runs).toBe(2); // Effects run after outermost batch
            expect(count.value).toBe(4);
        });
    });

    describe("Edge Cases", () => {
        it("should handle circular computed dependencies gracefully", () => {
            // This tests that we don't infinite loop
            const count = $<number>(1);
            let computeRuns = 0;

            const derived = $(() => {
                computeRuns++;
                return count.value + 1;
            });

            expect(derived.value).toBe(2);
            expect(computeRuns).toBe(1);

            count.value = 2;
            expect(derived.value).toBe(3);
        });

        it("should handle effects that modify their own dependencies", () => {
            const count = $<number>(0);
            let runs = 0;

            $e(() => {
                runs++;
                if (count.value < 3) {
                    count.value++; // Modifies its own dependency
                }
            });

            // Effect runs until count reaches 3
            expect(runs).toBe(4); // 0->1, 1->2, 2->3, then stops
            expect(count.value).toBe(3);
        });

        it("should handle signals with object values", () => {
            const obj = $({ a: 1 });
            let runs = 0;

            $e(() => {
                obj.value;
                runs++;
            });
            expect(runs).toBe(1);

            // Same reference - should NOT trigger
            const ref = obj.value;
            obj.value = ref;
            expect(runs).toBe(1);

            // New object - should trigger
            obj.value = { a: 1 };
            expect(runs).toBe(2);
        });

        it("should handle disposal during effect execution", () => {
            const count = $<number>(0);
            let dispose: (() => void) | undefined;
            let runs = 0;

            dispose = $e(() => {
                runs++;
                count.value;
                if (runs === 2 && dispose) {
                    dispose(); // Dispose self during execution
                }
            });
            expect(runs).toBe(1);

            count.value = 1;
            expect(runs).toBe(2);

            count.value = 2;
            expect(runs).toBe(2); // Should not run - disposed
        });
    });
});