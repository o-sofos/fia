import { Each, li } from "fia";

export default () => {
  // ✅ Works automatically - no keyFn needed!
  const todos = [
    { id: 1, text: "Learn Fia" },
    { id: 2, text: "Build app" },
  ];

  Each(
    () => todos.map((item) => item.text),
    li,
    (d) => d,
  );
  // Each object automatically gets stable ID: "obj:0", "obj:1", etc.
};
