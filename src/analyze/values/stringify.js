import { None, isSome } from "@helios-lang/type-utils"
import { BiMap } from "../BiMap.js"
import { AnyValue } from "./AnyValue.js"
import { BranchedValue } from "./BranchedValue.js"
import { BuiltinValue } from "./BuiltinValue.js"
import { DataValue } from "./DataValue.js"
import { ErrorValue } from "./ErrorValue.js"
import { FuncValue } from "./FuncValue.js"
import { LiteralValue } from "./LiteralValue.js"
import { MaybeErrorValue } from "./MaybeErrorValue.js"
import { StackValues } from "./StackValues.js"

/**
 * @typedef {import("./Value.js").Value} Value
 */

/**
 * @typedef {{tag: number, maxDepth: number}} BlockRecursionProps
 */

/**
 * @param {Value} fn
 * @param {Value[]} args
 */
export function stringifyCall(fn, args) {
    return `${fn.toString()}(${args.map((a) => a.toString()).join(", ")})`
}

/**
 * @param {StackValues} values
 * @param {BlockRecursionProps} blockRecursion - not optional because it is almost always needed when stringifying stacks
 * @returns {string}
 */
export function stringifyStackValues(values, blockRecursion) {
    /**
     * @type {BiMap<string>}
     */
    const stackIds = new BiMap()

    /**
     * @type {Map<Value, string>}
     */
    const valueCache = new Map()

    const items = values.values.map(([id, v]) => {
        const item = stringifyValue(v, blockRecursion, valueCache, stackIds)

        return `${id}: ${item}`
    })

    const itemsStr = `[${items.join(", ")}]`

    let refs = ""
    if (stackIds.keyValues.length > 0) {
        refs =
            stackIds.keyValues.map((v, i) => `Ref${i}: ${v}`).join("\n") + "\n"
    }

    const res = refs + itemsStr

    return res
}

/**
 * Non-recursive algorithm for speed
 * This is still the bottleneck though (both in terms of cpu and memory)
 * @param {Value} value
 * @param {Option<BlockRecursionProps>} blockRecursion
 * @param {Option<Map<Value, string>>} valueCache
 * @param {Option<BiMap<string>>} stackIds_
 * @returns {string}
 */
export function stringifyValue(
    value,
    blockRecursion = None,
    valueCache = None,
    stackIds_ = None
) {
    /**
     * @typedef {{
     *   value: Value
     *   depth: number
     * }} ComputeItem
     */

    /**
     * @type {{
     *   compute: ComputeItem
     * } | {
     *   reduce: {
     *     item: string
     *   }
     * }}
     */
    let state = {
        compute: {
            value: value,
            depth: 0
        }
    }

    /**
     * The owner is used to cache the value
     * @typedef {{
     *   owner: Value
     *   values: ComputeItem[]
     *   stringifiedValues: string[]
     *   fn: (items: string[]) => string
     * }} Frame
     */

    /**
     * @type {Frame[]}
     */
    const frames = []

    /**
     * Give each stringified Stack a unique ID, which is reused for repeated
     * @type {BiMap<string>}
     */
    const stackIds = stackIds_ ?? new BiMap()

    while (true) {
        if ("compute" in state) {
            const { value, depth } = state.compute

            let cached

            if ((cached = valueCache?.get(value))) {
                state = {
                    reduce: {
                        item: cached
                    }
                }
            } else if (
                value instanceof AnyValue ||
                value instanceof DataValue ||
                value instanceof LiteralValue ||
                value instanceof ErrorValue ||
                value instanceof BuiltinValue
            ) {
                state = {
                    reduce: {
                        item: value.toString()
                    }
                }
            } else if (value instanceof MaybeErrorValue) {
                /**
                 * @type {ComputeItem}
                 */
                const first = {
                    value: value.value,
                    depth: depth
                }

                state = {
                    compute: {
                        value: value.value,
                        depth: depth
                    }
                }

                frames.push({
                    owner: value,
                    values: [first],
                    stringifiedValues: [],
                    fn: (items) => {
                        return "(" + items[0] + " | Error)"
                    }
                })
            } else if (value instanceof BranchedValue) {
                /**
                 * @type {ComputeItem}
                 */
                const first = {
                    value: value.condition,
                    depth: depth
                }

                state = {
                    compute: first
                }

                frames.push({
                    owner: value,
                    values: [first].concat(
                        value.cases.map((c, i) => {
                            return { value: c, depth: depth }
                        })
                    ),
                    stringifiedValues: [],
                    fn: (items) => {
                        const cond = items[0]
                        const cases = items.slice(1)

                        return (
                            value.prefix +
                            "(" +
                            cond +
                            ", " +
                            cases.join(", ") +
                            ")"
                        )
                    }
                })
            } else if (value instanceof FuncValue) {
                if (
                    blockRecursion &&
                    value.definitionTag == blockRecursion.tag &&
                    depth == blockRecursion.maxDepth
                ) {
                    state = {
                        reduce: {
                            item: "Fn" + value.definitionTag
                        }
                    }
                } else if (value.stack.values.values.length == 0) {
                    state = {
                        reduce: {
                            item: "Fn" + value.definitionTag + "[]"
                        }
                    }
                } else {
                    const newDepth =
                        blockRecursion &&
                        value.definitionTag == blockRecursion.tag
                            ? depth + 1
                            : depth

                    /**
                     * @type {ComputeItem}
                     */
                    const first = {
                        value: value.stack.values.values[0][1],
                        depth: newDepth
                    }

                    state = {
                        compute: first
                    }

                    frames.push({
                        owner: value,
                        values: [first].concat(
                            value.stack.values.values
                                .slice(1)
                                .map(([id, v]) => ({
                                    value: v,
                                    depth: newDepth
                                }))
                        ),
                        stringifiedValues: [],
                        fn: (items) => {
                            const stackEntries = items.map((item, i) => {
                                const id = value.stack.values.values[i][0]

                                return id + ": " + item
                            })

                            const stackStr = "[" + stackEntries.join(", ") + "]"

                            return "Fn" + value.definitionTag + stackStr
                        }
                    })
                }
            } else {
                throw new Error("unhandled value type")
            }
        } else {
            const frame = frames.pop()

            if (!frame) {
                break
            }

            frame.stringifiedValues.push(state.reduce.item)

            if (frame.stringifiedValues.length == frame.values.length) {
                let s = frame.fn(frame.stringifiedValues)

                if (valueCache && frame.owner) {
                    if (frame.owner instanceof FuncValue) {
                        // generate an id
                        const id = stackIds.add(s)
                        s = "Ref" + id
                    }

                    valueCache.set(frame.owner, s)
                }

                state = {
                    reduce: {
                        item: s
                    }
                }
            } else {
                const nextValue = frame.values[frame.stringifiedValues.length]

                state = {
                    compute: nextValue
                }

                frames.push(frame)
            }
        }
    }

    if (!("reduce" in state)) {
        throw new Error("unexpected")
    }

    const res = state.reduce.item

    if (res.length > 100000) {
        console.log(res)
        throw new Error("stringified value too big")
    }

    return res
}
