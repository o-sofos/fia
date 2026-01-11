import { button, input } from "../core/elements"
import { $ } from "../core/reactivity"

export function Playground(){
    let a = $(1)

    input({type:"number"})
    button("ah")
    console.log(a.value)
}