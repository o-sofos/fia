# Flick

**DOM at the flick of a function.**

```ts
const count = signal(0);
div()
  .text(() => count.value)
  .style(color('blue'), padding('16px'))
  .append(button('+').onClick(() => count.value++))
  .appendTo(document.body);