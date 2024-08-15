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
    collectNonConst,
    BranchedValue,
    loopValues,
    collectFuncTagsIgnoreStacks
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

/**
 * @param {BranchedValue} before
 * @param {BranchedValue} after
 * @param {string} rootPath
 * @param {ValueGenerator} valueGenerator
 * @returns {BranchedValue | AnyValue | MaybeErrorValue}
 */
export function makeNestedBranchesOpaque(
    before,
    after,
    rootPath,
    valueGenerator
) {
    const cases = after.cases

    // We must collect func tags here, not func value keys, because stack summaries can change
    const beforeFns = collectFuncTagsIgnoreStacks(before)
    const afterFns = collectFuncTagsIgnoreStacks(...cases)

    let isBranchedRecursive = false
    let someError = false

    loopValues(
        cases.map((c) => [[], c]),
        {
            skipStacks: true,
            branchedValue: (_path, v) => {
                if (
                    v.type == before.type &&
                    v.condition.toString() == before.condition.toString()
                ) {
                    isBranchedRecursive = true
                }
            },
            errorValue: (_) => {
                someError = true
            },
            maybeErrorValue: (_) => {
                someError = true
            }
        }
    )

    if (
        isBranchedRecursive &&
        Array.from(afterFns).every((fn) => beforeFns.has(fn))
    ) {
        const a = valueGenerator.genAny(rootPath)

        if (someError) {
            return new MaybeErrorValue(a)
        } else {
            return a
        }
    } else {
        return after
    }
}
