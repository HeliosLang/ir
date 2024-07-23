import { ValueGenerator } from "./ValueGenerator.js"
import {
    AnyValue,
    Branches,
    DataValue,
    ErrorValue,
    LiteralValue,
    MaybeErrorValue,
    StackValues,
    initValuePath,
    pathToKey,
    mutate,
    collectNonConst
} from "./values/index.js"

/**
 * @typedef {import("./values/index.js").NonErrorValue} NonErrorValue
 * @typedef {import("./values/index.js").Value} Value
 */

/**
 * @param {StackValues} values
 * @param {ValueGenerator} valueGenerator
 * @param {Option<StackValues>} prevValues
 * @returns {StackValues}
 */
export function makeRecursiveDataOpaque(values, valueGenerator, prevValues) {
    const [nonConstKeys, allLiteral] = collectNonConst(values, prevValues)

    if (allLiteral || nonConstKeys.size == 0) {
        return values
    } else {
        /**
         * @param {string[]} path
         * @param {DataValue | LiteralValue | AnyValue} value
         * @returns {DataValue | LiteralValue | AnyValue}
         */
        const makeValueOpaque = (path, value) => {
            const key = pathToKey(path)

            if (nonConstKeys.has(key)) {
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
            const newValue = mutate(initValuePath(id), v, {
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
