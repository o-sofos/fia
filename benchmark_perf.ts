
const ITERATIONS = 100000;

// Mock Signal
function createMockSignal() {
    const s = () => 1;
    Object.defineProperty(s, "value", { get: () => 1 });
    return s;
}

// Current isSignal (Slow)
function isSignalSlow(value: any) {
    if (value === null || value === undefined) return false;
    if (typeof value !== "function") return false;
    const descriptor = Object.getOwnPropertyDescriptor(value, "value");
    return descriptor !== undefined && descriptor.get !== undefined;
}

// Optimized isSignal (Fast)
const SIGNAL_SYMBOL = Symbol("SIGNAL");
interface InternalSignal {
    [SIGNAL_SYMBOL]: true;
}

function createFastSignal() {
    const s = () => 1;
    (s as unknown as InternalSignal)[SIGNAL_SYMBOL] = true;
    return s;
}
function isSignalFast(value: any) {
    return value && (value as InternalSignal)[SIGNAL_SYMBOL];
}

// Props Object
const props = {
    id: "foo",
    className: "bar",
    style: "color: red",
    "data-test": "123",
    onclick: () => { }
};

// Benchmark 1: isSignal
console.time("isSignal (Current)");
const sig = createMockSignal();
for (let i = 0; i < ITERATIONS; i++) {
    isSignalSlow(sig);
    isSignalSlow("string");
    isSignalSlow(123);
}
console.timeEnd("isSignal (Current)");

console.time("isSignal (Optimized)");
const fastSig = createFastSignal();
for (let i = 0; i < ITERATIONS; i++) {
    isSignalFast(fastSig);
    isSignalFast("string");
    isSignalFast(123);
}
console.timeEnd("isSignal (Optimized)");

// Benchmark 2: Prop Iteration
console.time("Object.entries (Current)");
for (let i = 0; i < ITERATIONS; i++) {
    for (const [key, value] of Object.entries(props)) {
        void key; void value;
    }
}
console.timeEnd("Object.entries (Current)");

console.time("for...in (Optimized)");
for (let i = 0; i < ITERATIONS; i++) {
    for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            const value = (props as Record<string, unknown>)[key];
            void key; void value;
        }
    }
}
console.timeEnd("for...in (Optimized)");
