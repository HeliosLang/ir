import { FuncValue } from "./FuncValue.js"
import { StackValues } from "./StackValues.js"
import { initValuePath, loopMany, pathToKey } from "./loop.js"

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

/**
 * @param {StackValues} values
 * @param {Option<StackValues>} prevValues
 * @returns {[Set<string>, boolean]}
 */
export function collectNonConst(values, prevValues) {
    /**
     * Keys for which the value is null are made opaque
     * @type {Map<string, Value | null>}
     */
    const m = new Map()

    let allLiteral = true

    /**
     * @param {string[]} path
     * @param {Value} value
     */
    const setValue = (path, value) => {
        const key = pathToKey(path)
        const prev = m.get(key)

        if (prev === undefined) {
            m.set(key, value)
        } else if (prev === null) {
            // do nothing
        } else if (prev.toString() != value.toString()) {
            m.set(key, null)
        }
    }

    /**
     * @type {[string[], Value][]}
     */
    const loopItems = values.values
        .concat(prevValues ? prevValues.values : [])
        .map(([id, v]) => [initValuePath(id), v])

    loopMany(loopItems, {
        anyValue: (path, value) => {
            allLiteral = false
            setValue(path, value)
        },
        dataValue: (path, value) => {
            allLiteral = false
            setValue(path, value)
        },
        literalValue: (path, value) => {
            setValue(path, value)
        }
    })

    const s = new Set(
        Array.from(m.entries())
            .filter(([k, v]) => v === null)
            .map(([k]) => k)
    )
    return [s, allLiteral]
}
