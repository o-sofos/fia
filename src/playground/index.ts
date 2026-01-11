import { div } from "../core/elements"
import { $ } from "../core/reactivity"

export function Playground(){
    let a = $(1)

    div("eva")

    console.log(a.value)
}