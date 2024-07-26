import { AnyValue } from "./AnyValue.js"
import { BranchedValue, isBranchable } from "./BranchedValue.js"
import { BuiltinValue } from "./BuiltinValue.js"
import { DataValue } from "./DataValue.js"
import { ErrorValue } from "./ErrorValue.js"
import { FuncValue } from "./FuncValue.js"
import { LiteralValue } from "./LiteralValue.js"
import { MaybeErrorValue } from "./MaybeErrorValue.js"
import { Stack } from "./Stack.js"
import { StackValues } from "./StackValues.js"
import { initValuePath } from "./loop.js"

/**
 * @typedef {import("./Value.js").Value} Value
 */

/**
 *
 * @param {string[]} rootPath
 * @param {Value} root
 * @param {{
 *   genStackSummary: (values: StackValues, blockRecursionTag: number) => number
 *   anyValue?: (path: string[], value: AnyValue) => Value
 *   branchedValue?: (path: string[], value: BranchedValue) => Value
 *   builtinValue?: (path: string[], value: BuiltinValue) => Value
 *   dataValue?: (path: string[], value: DataValue) => Value
 *   errorValue?: (path: string[], value: ErrorValue) => Value
 *   funcValue?: (path: string[], value: FuncValue) => Value
 *   literalValue?: (path: string[], value: LiteralValue) => Value
 *   maybeErrorValue?: (path: string[], value: MaybeErrorValue) => Value
 * }} callbacks
 * @returns {Value}
 */
export function mutate(rootPath, root, callbacks) {
    /**
     * @type {{
     *   compute: {path: string[], value: Value}
     * } | {
     *   reduce: Value
     * }}
     */
    let state = {
        compute: {
            path: rootPath,
            value: root
        }
    }

    /**
     * @typedef {{args: [string[], Value][], mutatedArgs: Value[], fn: (values: Value[]) => Value}} Frame
     */

    /**
     * @type {Frame[]}
     */
    let frames = []

    while (true) {
        if ("compute" in state) {
            const { path, value } = state.compute

            if (value instanceof AnyValue) {
                state = {
                    reduce: callbacks.anyValue
                        ? callbacks.anyValue(path, value)
                        : value
                }
            } else if (value instanceof BranchedValue) {
                state = {
                    compute: {
                        value: value.condition,
                        path: path.concat([`${value.prefix}Cond`])
                    }
                }

                frames.push({
                    args: [
                        /** @type {[string[], Value]} */ ([
                            path.concat([`${value.prefix}Cond`]),
                            value.condition
                        ])
                    ].concat(
                        value.cases.map((c, i) => [
                            path.concat([`${value.prefix}Case${i}`]),
                            c
                        ])
                    ),
                    mutatedArgs: [],
                    fn: (values) => {
                        const condition = values[0]
                        const cases = values.slice(1)

                        if (
                            !(
                                condition instanceof DataValue ||
                                condition instanceof AnyValue
                            )
                        ) {
                            throw new Error("invalid branch condition mutation")
                        }

                        if (!cases.every(isBranchable)) {
                            throw new Error("invalid branch cases mutation")
                        }

                        const isSame =
                            condition == value.condition &&
                            cases.every((c, i) => c == value.cases[i])

                        const v = isSame
                            ? value
                            : new BranchedValue(value.type, condition, cases)

                        return callbacks.branchedValue
                            ? callbacks.branchedValue(path, v)
                            : v
                    }
                })
            } else if (value instanceof BuiltinValue) {
                state = {
                    reduce: callbacks.builtinValue
                        ? callbacks.builtinValue(path, value)
                        : value
                }
            } else if (value instanceof DataValue) {
                state = {
                    reduce: callbacks.dataValue
                        ? callbacks.dataValue(path, value)
                        : value
                }
            } else if (value instanceof ErrorValue) {
                state = {
                    reduce: callbacks.errorValue
                        ? callbacks.errorValue(path, value)
                        : value
                }
            } else if (value instanceof FuncValue) {
                if (value.stack.values.values.length == 0) {
                    state = {
                        reduce: callbacks.funcValue
                            ? callbacks.funcValue(path, value)
                            : value
                    }
                } else {
                    const first = value.stack.values.values[0]

                    state = {
                        compute: {
                            path: initValuePath(first[0]),
                            value: first[1]
                        }
                    }

                    frames.push({
                        args: value.stack.values.values.map(([id, v]) => [
                            initValuePath(id),
                            v
                        ]),
                        mutatedArgs: [],
                        fn: (values) => {
                            const stackValues = new StackValues(
                                values.map((v, i) => {
                                    const id = value.stack.values.values[i][0]

                                    if (
                                        v instanceof ErrorValue ||
                                        v instanceof MaybeErrorValue
                                    ) {
                                        throw new Error("unexpected")
                                    }

                                    return [id, v]
                                })
                            )

                            const isSame = stackValues.values.every(
                                ([id, v], i) =>
                                    id == value.stack.values.values[i][0] &&
                                    v == value.stack.values.values[i][1]
                            )

                            /**
                             * @type {FuncValue}
                             */
                            let v

                            if (isSame) {
                                v = value
                            } else {
                                const stackSummary = callbacks.genStackSummary(
                                    stackValues,
                                    value.definitionTag
                                )

                                v = new FuncValue(
                                    value.definitionTag,
                                    new Stack(
                                        stackValues,
                                        value.stack.branches
                                    ),
                                    stackSummary
                                )
                            }

                            return callbacks.funcValue
                                ? callbacks.funcValue(path, v)
                                : v
                        }
                    })
                }
            } else if (value instanceof LiteralValue) {
                state = {
                    reduce: callbacks.literalValue
                        ? callbacks.literalValue(path, value)
                        : value
                }
            } else if (value instanceof MaybeErrorValue) {
                state = {
                    compute: {
                        path: path,
                        value: value.value
                    }
                }

                frames.push({
                    args: [[path, value.value]],
                    mutatedArgs: [],
                    fn: (values) => {
                        const innerValue = values[0]

                        if (
                            innerValue instanceof ErrorValue ||
                            innerValue instanceof MaybeErrorValue
                        ) {
                            throw new Error("invalid MaybeErrorValue mutation")
                        }

                        /**
                         * @type {MaybeErrorValue}
                         */
                        let v

                        if (innerValue == value.value) {
                            v = value
                        } else {
                            v = new MaybeErrorValue(innerValue)
                        }

                        return callbacks.maybeErrorValue
                            ? callbacks.maybeErrorValue(path, v)
                            : v
                    }
                })
            } else {
                throw new Error("unhandled value type")
            }
        } else {
            const frame = frames.pop()

            if (!frame) {
                break
            }

            frame.mutatedArgs.push(state.reduce)

            if (frame.mutatedArgs.length == frame.args.length) {
                state = {
                    reduce: frame.fn(frame.mutatedArgs)
                }
            } else {
                const nextArg = frame.args[frame.mutatedArgs.length]
                state = {
                    compute: {
                        value: nextArg[1],
                        path: nextArg[0]
                    }
                }

                frames.push(frame)
            }
        }
    }

    if (!("reduce" in state)) {
        throw new Error("unexpected")
    }

    return state.reduce
}
