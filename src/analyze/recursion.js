import { ValueGenerator } from "./ValueGenerator.js"
import {
    AnyValue,
    BranchedValue,
    Branches,
    BuiltinValue,
    DataValue,
    ErrorValue,
    FuncValue,
    LiteralValue,
    MaybeErrorValue,
    StackValues
} from "./values/index.js"
import { loop, mutate } from "./values/index.js"

/**
 * @typedef {import("./values/index.js").NonErrorValue} NonErrorValue
 * @typedef {import("./values/index.js").Value} Value
 */

/**
 * @param {StackValues} values
 * @param {ValueGenerator} valueGenerator
 * @returns {StackValues}
 */
export function makeRecursiveDataOpaque(values, valueGenerator) {
    const [mustBeMadeOpaque, allLiteral] = getAllDataLike(values)

    if (allLiteral || mustBeMadeOpaque.size == 0) {
        return values
    } else {
        /**
         * @param {string[]} path
         * @param {DataValue | LiteralValue | AnyValue} value
         * @returns {DataValue | LiteralValue | AnyValue}
         */
        const makeValueOpaque = (path, value) => {
            const key = pathToKey(path)

            if (mustBeMadeOpaque.has(key)) {
                if (value instanceof AnyValue) {
                    return valueGenerator.genAny(key)
                } else if (value instanceof DataValue) {
                    return valueGenerator.genData(key, value.branches)
                } else {
                    return valueGenerator.genData(key, Branches.empty())
                }
            } else {
                return value
            }
        }

        const mutatedValues = values.values.map(([id, v]) => {
            const newValue = mutate([`${id}`], v, {
                genStackSummary: (vs, tag) => {
                    return valueGenerator.genStackSummary(vs, tag)
                },
                dataValue: makeValueOpaque,
                anyValue: makeValueOpaque,
                literalValue: makeValueOpaque
            })

            if (
                newValue instanceof ErrorValue ||
                newValue instanceof MaybeErrorValue
            ) {
                throw new Error("unexpected")
            }

            return /** @type {[number, NonErrorValue]} */ ([id, newValue])
        })

        return new StackValues(mutatedValues)
    }
}

/**
 * @param {string[]} path
 * @returns {string}
 */
function pathToKey(path) {
    return path.join("_")
}

/**
 * @param {StackValues} values
 * @returns {[Set<string>, boolean]}
 */
function getAllDataLike(values) {
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

    values.values.forEach(([id, v]) => {
        loop([`${id}`], v, {
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
    })

    const s = new Set(
        Array.from(m.entries())
            .filter(([k, v]) => v === null)
            .map(([k]) => k)
    )
    return [s, allLiteral]
}
