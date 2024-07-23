import { FuncValue } from "./FuncValue.js"

/**
 * @typedef {import("./Value.js").Value} Value
 */

/**
 * @param {Value[]} values
 * @returns {Set<number>}
 */
export function collectFuncTags(...values) {
    /**
     * @type {Set<number>}
     */
    const s = new Set()

    values.forEach((value) => value.collectFuncTags(s))

    return s
}

/**
 * @param {Value[]} values
 * @returns {FuncValue[]}
 */
export function collectFuncValues(...values) {
    /**
     * @type {Map<string, FuncValue>}
     */
    const m = new Map()

    values.forEach((value) => value.collectFuncValues(m))

    return Array.from(m.values())
}
