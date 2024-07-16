import { encodeUtf8 } from "@helios-lang/codec-utils"
import { CompilerError } from "@helios-lang/compiler-utils"
import { None, expectSome, isNone } from "@helios-lang/type-utils"
import {
    ByteArrayData,
    ConstrData,
    IntData,
    ListData,
    MapData,
    UplcBool,
    UplcByteArray,
    UplcDataValue,
    UplcInt,
    UplcList,
    UplcPair,
    UplcString,
    UplcUnit,
    builtinsV2
} from "@helios-lang/uplc"
import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    LiteralExpr,
    NameExpr,
    Scope,
    Variable
} from "../expressions/index.js"
import { loop } from "../ops/loop.js"
import { Analysis } from "./Analysis.js"
import { AnyValue } from "./AnyValue.js"
import { BuiltinValue } from "./BuiltinValue.js"
import { DataValue } from "./DataValue.js"
import { DataValueCache } from "./DataValueCache.js"
import { ErrorValue } from "./ErrorValue.js"
import { FuncValue } from "./FuncValue.js"
import { LiteralValue } from "./LiteralValue.js"
import { MultiValue } from "./MultiValue.js"
import { Stack } from "./Stack.js"
import { ValueCodeMapper } from "./ValueCodeMapper.js"
import { Branches } from "./Branches.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcData} UplcData
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./Branch.js").Branch} Branch
 * @typedef {import("./Value.js").Value} Value
 */

/**
 * @typedef {{
 *   definition: FuncExpr
 *   stack: Stack
 * }} FuncValueDetails
 */

/**
 * evalLiterals defaults to true
 * @typedef {{
 *   evalLiteral?: boolean
 * }} EvaluatorOptions
 */

export class Analyzer {
    /**
     * Unwraps an IR AST
     * @type {(
     *   {
     *     stack: Stack
     *     expr: ErrorExpr | LiteralExpr | NameExpr | FuncExpr | CallExpr | BuiltinExpr
     *   } |
     *   {calling: CallExpr, code: number, args: Value[]} |
     *   {fn: FuncExpr, owner: null | Expr, stack: Stack} |
     *   {multi: number, owner: null | Expr} |
     *   {value: Value, owner: null | Expr} |
     *   {ignore: number, owner: null | Expr} |
     *   {cacheExpr: CallExpr, code: number, value: Value}
     * )[]}
     */
    #compute

    /**
     * @type {Value[]}
     */
    #reduce

    /**
     * Keep track of the eval result of each expression
     * @type {Map<Expr, Value>}
     */
    #exprValues

    /**
     * Keep track of all values passed through IRVariables
     * @type {Map<Variable, Value>}
     */
    #variableValues

    /**
     * FuncExpr tag as key
     * @type {Map<number, number>}
     */
    #callCount

    /**
     * Unique 1-based ids
     * @type {Map<FuncExpr, number>}
     */
    #funcExprTags

    /**
     * @type {Map<FuncExpr, Set<CallExpr>>}
     */
    #funcCallExprs

    /**
     * @type {Map<Variable, Set<NameExpr>>}
     */
    #variableReferences

    /**
     * @type {Map<CallExpr, Map<number, Value>>}
     */
    #cachedCalls

    /**
     * @type {DataValueCache}
     */
    #dataValueCache

    /**
     * @type {Map<string, FuncValueDetails>}
     */
    #funcValueDetails

    /**
     * @type {boolean}
     */
    #evalLiterals

    /**
     * An Evaluator can only run once per expression
     * @type {Expr}
     */
    #root

    /**
     * @param {Expr} expr
     * @param {EvaluatorOptions} options
     */
    constructor(expr, options = {}) {
        this.#evalLiterals = options.evalLiteral ?? true
        this.#root = expr

        this.reset()
        this.init()
    }

    /**
     * @returns {Analysis}
     */
    analyze() {
        this.#root.resolveNames(new Scope(None, None))

        let res = this.evalFirstPass(this.#root)

        while (
            res instanceof FuncValue ||
            (res instanceof MultiValue &&
                res.values.some((v) => v instanceof FuncValue))
        ) {
            if (res instanceof FuncValue) {
                res = this.evalSecondPass(res)
            } else {
                const fvs = res.values
                    .filter((v) => v instanceof FuncValue)
                    .map((v) => {
                        if (!(v instanceof FuncValue)) {
                            throw new Error("unexpected")
                        } else {
                            return v
                        }
                    })
                res = this.combineValues(
                    fvs.map((fv) => this.evalSecondPass(fv))
                )
            }
        }

        return new Analysis({
            callCount: this.#callCount,
            exprValues: this.#exprValues,
            funcCallExprs: this.#funcCallExprs,
            funcExprTags: this.#funcExprTags,
            rootExpr: this.#root,
            variableReferences: this.#variableReferences,
            variableValues: this.#variableValues
        })
    }

    /**
     * @returns {UplcData}
     */
    evalConst() {
        const res = this.evalFirstPass(this.#root)

        if (res instanceof LiteralValue) {
            let v = res.value

            if (v instanceof UplcDataValue) {
                return v.value
            } else if (v instanceof UplcInt) {
                return new IntData(v.value)
            } else if (v instanceof UplcBool) {
                return new ConstrData(v.bool ? 1 : 0, [])
            } else if (v instanceof UplcList) {
                if (v.isDataList()) {
                    return new ListData(
                        v.items.map((item) => {
                            if (!(item instanceof UplcDataValue)) {
                                throw new Error("unexpected")
                            }

                            return item.value
                        })
                    )
                } else if (v.isDataMap()) {
                    return new MapData(
                        v.items.map((item) => {
                            const pair = item

                            if (!(pair instanceof UplcPair)) {
                                throw new Error("unexpected")
                            }

                            if (!(pair.first instanceof UplcDataValue)) {
                                throw new Error("unexpected")
                            }

                            if (!(pair.second instanceof UplcDataValue)) {
                                throw new Error("unexpected")
                            }

                            return [pair.first.value, pair.second.value]
                        })
                    )
                }
            } else if (v instanceof UplcString) {
                return new ByteArrayData(encodeUtf8(v.string))
            } else if (v instanceof UplcByteArray) {
                return new ByteArrayData(v.bytes)
            }

            throw new Error(`unable to turn '${v.toString()}' into data`)
        } else {
            throw new Error("expected LiteralValue")
        }
    }

    /**
     * @private
     */
    init() {
        this.generateFuncTags()
    }

    /**
     * @private
     */
    reset() {
        this.#compute = []
        this.#reduce = []

        // data structures used by optimization
        this.#exprValues = new Map()
        this.#variableValues = new Map()
        this.#callCount = new Map()
        this.#funcExprTags = new Map()
        this.#funcCallExprs = new Map()
        this.#variableReferences = new Map()
        this.#cachedCalls = new Map()
        this.#dataValueCache = new DataValueCache()
    }

    /**
     * fill the #funcExprTags map
     * @private
     */
    generateFuncTags() {
        let tag = 1

        loop(this.#root, {
            funcExpr: (funcExpr) => {
                this.#funcExprTags.set(funcExpr, tag)
                tag = tag + 1
            }
        })
    }

    /**
     * @private
     * @param {FuncExpr} expr
     * @returns {number}
     */
    getFuncExprTag(expr) {
        return expectSome(this.#funcExprTags.get(expr), "tag not generated")
    }

    /**
     * @private
     * @returns {Value}
     */
    popLastValue() {
        return expectSome(this.#reduce.pop())
    }

    /**
     * Push onto the computeStack, unwrapping CallExprs
     * @private
     * @param {Stack} stack
     * @param {Expr} expr
     */
    pushExpr(stack, expr) {
        if (expr instanceof ErrorExpr) {
            this.#compute.push({ stack: stack, expr: expr })
        } else if (expr instanceof LiteralExpr) {
            this.#compute.push({ stack: stack, expr: expr })
        } else if (expr instanceof BuiltinExpr) {
            this.#compute.push({ stack: stack, expr: expr })
        } else if (expr instanceof NameExpr) {
            this.#compute.push({ stack: stack, expr: expr })
        } else if (expr instanceof FuncExpr) {
            this.#compute.push({ stack: stack, expr: expr })
        } else if (expr instanceof CallExpr) {
            this.#compute.push({ stack: stack, expr: expr })

            this.pushExpr(stack, expr.func)

            expr.args.forEach((a) => this.pushExpr(stack, a))
        } else {
            throw new Error("unexpected expression type")
        }
    }

    /**
     * @private
     * @param {Expr} expr
     * @param {Value} value
     * @returns {Value} combined value
     */
    setExprValue(expr, value) {
        const outputs = this.#exprValues.get(expr)

        if (outputs) {
            const combined = this.combineValues([outputs, value])
            this.#exprValues.set(expr, combined)
            return combined
        } else {
            this.#exprValues.set(expr, value)
            return value
        }
    }

    /**
     * @private
     * @param {null | Expr} owner
     * @param {Value} value
     */
    pushReductionValue(owner, value) {
        if (owner) {
            const combined = this.setExprValue(owner, value)

            if (
                value instanceof AnyValue ||
                (value instanceof MultiValue &&
                    value.values.some((v) => v instanceof AnyValue))
            ) {
                value = combined
            }
        }

        this.#reduce.push(value)
    }

    /**
     * @private
     * @param {Stack} stack
     * @param {NameExpr} nameExpr
     * @returns {Value}
     */
    getValue(stack, nameExpr) {
        const variable = nameExpr.variable

        const s = this.#variableReferences.get(variable)

        if (s) {
            s.add(nameExpr)
        } else {
            this.#variableReferences.set(variable, new Set([nameExpr]))
        }

        return stack.getValue(variable)
    }

    /**
     * @private
     * @param {Value} value
     * @returns {Value}
     */
    valueWithoutLiterals(value) {
        if (value instanceof AnyValue) {
            return value
        } else if (value instanceof BuiltinValue) {
            return value
        } else if (value instanceof DataValue) {
            return value
        } else if (value instanceof ErrorValue) {
            return value
        } else if (value instanceof LiteralValue) {
            if (value.value instanceof UplcUnit) {
                return new AnyValue()
            } else {
                return this.#dataValueCache.getFromLiteralValue(value.value)
            }
        } else if (value instanceof MultiValue) {
            return this.combineValues(
                value.values.map((v) => this.valueWithoutLiterals(v))
            )
        } else if (value instanceof FuncValue) {
            return new FuncValue(
                value.definition,
                this.stackWithoutLiterals(value.stack)
            )
        } else {
            throw new Error("unhandled value type")
        }
    }

    /**
     * @private
     * @param {Value} value
     * @returns {Value}
     */
    valueWithoutErrors(value) {
        if (value instanceof AnyValue) {
            return value
        } else if (value instanceof BuiltinValue) {
            return value
        } else if (value instanceof DataValue) {
            return value
        } else if (value instanceof ErrorValue) {
            throw new Error("can't remove ErrorValue from ErrorValue")
        } else if (value instanceof FuncValue) {
            return value
        } else if (value instanceof LiteralValue) {
            return value
        } else if (value instanceof MultiValue) {
            return this.combineValues(
                value.values.filter((v) => !(v instanceof ErrorValue))
            )
        } else {
            throw new Error("unhandled value type")
        }
    }

    /**
     * @param {Stack} stack
     * @returns {Stack}
     */
    stackWithoutLiterals(stack) {
        /**
         * @type {[Variable, Value][]}
         */
        const varVals = stack.values.map(([vr, vl]) => {
            if (Stack.isGlobal(vr)) {
                return [vr, vl]
            } else {
                return [vr, this.valueWithoutLiterals(vl)]
            }
        })

        return new Stack(
            varVals,
            stack.branches,
            varVals.every(([_, v]) => v.isLiteral())
        )
    }

    /**
     * Both stack are expected to have the same shape
     * TODO: get rid of this
     * @param {Stack} stackA
     * @param {Stack} stackB
     * @returns {Stack}
     */
    mergeStacks(stackA, stackB) {
        const n = stackA.values.length

        if (n != stackB.values.length) {
            throw new Error("unexpected")
        }

        let stack = Stack.empty()

        for (let i = 0; i < n; i++) {
            const a = stackA.values[i]
            const b = stackB.values[i]

            if (a == b) {
                stack = stack.extend([a])
            } else {
                stack = stack.extend([[a[0], this.combineValues([a[1], b[1]])]])
            }
        }

        return stack
    }

    /**
     * @param {Value[]} values
     * @returns {Value}
     */
    combineValues(values) {
        if (values.length == 1) {
            return values[0]
        }

        // flatten nested MultiValues
        values = values
            .map((v) => {
                if (v instanceof MultiValue) {
                    return v.values
                } else {
                    return [v]
                }
            })
            .flat()

        /**
         * Remove duplicate data values
         * @type {Value[]}
         */
        const tmp = []

        values.forEach((v) => {
            if (v instanceof DataValue) {
                if (
                    !tmp.some(
                        (check) =>
                            check instanceof DataValue &&
                            check.id == v.id &&
                            check.branches.isEqual(v.branches)
                    )
                ) {
                    tmp.push(v)
                }
            } else if (v instanceof ErrorValue) {
                if (!tmp.some((check) => check instanceof ErrorValue)) {
                    tmp.push(v)
                }
            } else {
                tmp.push(v)
            }
        })

        values = tmp

        if (values.length == 1) {
            return values[0]
        } else if (
            values.every(
                (v, i) =>
                    v instanceof LiteralValue &&
                    (i == 0 || v.toString() == values[0].toString())
            )
        ) {
            return values[0]
        }

        // remove duplicate DataValues

        const hasError = values.some((v) => v instanceof ErrorValue)

        if (
            hasError &&
            values.some((v) => v instanceof DataValue) &&
            values.length == 2
        ) {
            return new MultiValue(values)
        }

        const hasData = values.some(
            (v) =>
                v instanceof DataValue ||
                (v instanceof LiteralValue && !(v.value instanceof UplcUnit))
        )

        const hasAny = values.some(
            (v) =>
                v instanceof AnyValue ||
                (v instanceof LiteralValue && v.value instanceof UplcUnit)
        )

        /**
         * @type {Value[]}
         */
        let flattened = []

        if (
            values.some(
                (v) => v instanceof FuncValue || v instanceof BuiltinValue
            )
        ) {
            /**
             * @type {Map<Expr, FuncValue | BuiltinValue>}
             */
            const s = new Map()

            values.forEach((v) => {
                if (v instanceof FuncValue) {
                    const prev = s.get(v.definition)

                    if (prev instanceof FuncValue) {
                        s.set(
                            v.definition,
                            FuncValue.new(
                                v.definition,
                                this.mergeStacks(prev.stack, v.stack)
                            )
                        )
                    } else {
                        s.set(v.definition, v)
                    }
                } else if (v instanceof BuiltinValue) {
                    s.set(v.builtin, v)
                }
            })

            flattened = flattened.concat(Array.from(s.values()))
        } else if (hasData) {
            const newDataValue = this.#dataValueCache.newValue(Branches.empty())
            if (newDataValue.id == 16) {
                console.log("created newDataValue with id 16")
            }
            flattened.push(newDataValue)
        } else if (hasAny) {
            flattened.push(new AnyValue())
        }

        if (hasError) {
            flattened.push(new ErrorValue())
        }

        if (flattened.length == 1) {
            return flattened[0]
        } else {
            return new MultiValue(flattened)
        }
    }

    /**
     * @private
     * @param {CallExpr} owner
     * @param {BuiltinExpr} builtinExpr
     * @param {Value[]} args
     * @param {Stack} stack
     */
    callBuiltin(owner, builtinExpr, args, stack) {
        const builtin = builtinExpr.name
        const isSafe = builtinExpr.safe

        // collect results for each permutation of multivalued args

        /**
         * @type {Value[][]}
         */
        const permutations = MultiValue.allPermutations(args)

        const resValues = permutations.map((args) => {
            if (args.every((a) => a instanceof LiteralValue)) {
                try {
                    const callback = builtinsV2[builtinExpr.id].call

                    const res = callback(
                        args.map((a) => {
                            if (!(a instanceof LiteralValue)) {
                                throw new Error("unexpected")
                            }

                            return a
                        }),
                        { print: () => {} }
                    )

                    if ("value" in res) {
                        return new LiteralValue(res.value)
                    } else {
                        throw new Error("unexpected return value")
                    }
                } catch (e) {
                    return new ErrorValue()
                }
            } else if (args.some((a) => a instanceof ErrorValue)) {
                return new ErrorValue()
            } else {
                const res = this.callBuiltinInternal(
                    builtin,
                    owner,
                    args,
                    stack
                )

                if (isSafe && res instanceof MultiValue && res.hasError()) {
                    return this.valueWithoutErrors(res)
                } else {
                    return res
                }
            }
        })

        this.pushReductionValue(owner, this.combineValues(resValues))
    }

    /**
     * @param {string} name
     * @param {CallExpr} owner
     * @param {Value[]} args
     * @param {Stack} stack
     * @returns {Value}
     */
    callBuiltinInternal(name, owner, args, stack) {
        const defaultResult = () => {
            return this.#dataValueCache.getBuiltinResultValue(
                name,
                args,
                stack.branches
            )
        }

        /**
         * @type {{[name: string]: (args: Value[]) => Value}}
         */
        const callbacks = {
            addInteger: ([a, b]) => {
                return defaultResult()
            },
            subtractInteger: ([a, b]) => {
                return defaultResult()
            },
            multiplyInteger: ([a, b]) => {
                if (a instanceof LiteralValue) {
                    if (a.int == 0n) {
                        return a
                    } else if (a.int == 1n) {
                        return b
                    }
                } else if (b instanceof LiteralValue) {
                    if (b.int == 0n) {
                        return b
                    } else if (b.int == 1n) {
                        return a
                    }
                }

                return defaultResult()
            },
            divideInteger: ([a, b]) => {
                if (a instanceof LiteralValue && a.int == 0n) {
                    return this.combineValues([a, new ErrorValue()])
                } else if (b instanceof LiteralValue) {
                    if (b.int == 0n) {
                        return new ErrorValue()
                    } else if (b.int == 1n) {
                        return a
                    } else {
                        return defaultResult()
                    }
                } else {
                    return this.combineValues([
                        defaultResult(),
                        new ErrorValue()
                    ])
                }
            },
            modInteger: ([a, b]) => {
                if (b instanceof LiteralValue) {
                    if (b.int == 1n) {
                        return new LiteralValue(new UplcInt(0n, true))
                    } else if (b.int == 0n) {
                        return new ErrorValue()
                    } else {
                        return defaultResult()
                    }
                } else {
                    return this.combineValues([
                        defaultResult(),
                        new ErrorValue()
                    ])
                }
            },
            quotientInteger: ([a, b]) => {
                if (a instanceof LiteralValue && a.int == 0n) {
                    return this.combineValues([a, new ErrorValue()])
                } else if (b instanceof LiteralValue) {
                    if (b.int == 0n) {
                        return new ErrorValue()
                    } else if (b.int == 1n) {
                        return a
                    } else {
                        return defaultResult()
                    }
                } else {
                    return this.combineValues([
                        defaultResult(),
                        new ErrorValue()
                    ])
                }
            },
            remainderInteger: ([a, b]) => {
                if (b instanceof LiteralValue) {
                    if (b.int == 1n) {
                        return new LiteralValue(new UplcInt(0n, true))
                    } else if (b.int == 0n) {
                        return new ErrorValue()
                    } else {
                        return defaultResult()
                    }
                } else {
                    return this.combineValues([
                        defaultResult(),
                        new ErrorValue()
                    ])
                }
            },
            equalsInteger: ([a, b]) => {
                return defaultResult()
            },
            lessThanInteger: ([a, b]) => {
                return defaultResult()
            },
            lessThanEqualsInteger: ([a, b]) => {
                return defaultResult()
            },
            appendByteString: ([a, b]) => {
                return defaultResult()
            },
            consByteString: ([a, b]) => {
                return defaultResult()
            },
            sliceByteString: ([a, b, c]) => {
                if (b instanceof LiteralValue && b.int <= 0n) {
                    return new LiteralValue(new UplcByteArray([]))
                } else {
                    return defaultResult()
                }
            },
            lengthOfByteString: ([a]) => {
                return defaultResult()
            },
            indexByteString: ([a, b]) => {
                if (b instanceof LiteralValue && b.int < 0n) {
                    return new ErrorValue()
                } else if (a instanceof LiteralValue && a.bytes.length == 0) {
                    return new ErrorValue()
                } else {
                    return this.combineValues([
                        defaultResult(),
                        new ErrorValue()
                    ])
                }
            },
            equalsByteString: ([a, b]) => {
                return defaultResult()
            },
            lessThanByteString: ([a, b]) => {
                return defaultResult()
            },
            lessThanEqualsByteString: ([a, b]) => {
                return defaultResult()
            },
            appendString: ([a, b]) => {
                return defaultResult()
            },
            equalsString: ([a, b]) => {
                return defaultResult()
            },
            encodeUtf8: ([a]) => {
                return defaultResult()
            },
            decodeUtf8: ([a]) => {
                return this.combineValues([defaultResult(), new ErrorValue()])
            },
            sha2_256: ([a]) => {
                return defaultResult()
            },
            sha3_256: ([a]) => {
                return defaultResult()
            },
            blake2b_256: ([a]) => {
                return defaultResult()
            },
            verifyEd25519Signature: ([a, b, c]) => {
                if (a instanceof LiteralValue && a.bytes.length != 32) {
                    return new ErrorValue()
                } else if (c instanceof LiteralValue && c.bytes.length != 64) {
                    return new ErrorValue()
                } else {
                    return this.combineValues([
                        defaultResult(),
                        new ErrorValue()
                    ])
                }
            },
            ifThenElse: ([a, b, c]) => {
                if (a instanceof LiteralValue) {
                    if (a.bool) {
                        return b
                    } else {
                        return c
                    }
                } else {
                    if (
                        [b, c].every(
                            (arg) =>
                                arg instanceof DataValue ||
                                arg instanceof LiteralValue
                        )
                    ) {
                        if (!(a instanceof DataValue)) {
                            throw new Error("unexpected")
                        }

                        return this.#dataValueCache.getBuiltinResultValue(
                            "ifThenElse",
                            [a, b, c],
                            stack.branches
                        )
                    } else {
                        ;[b, c] = addFuncValuesBranches(
                            [b, c],
                            owner,
                            "ifThenElse",
                            a
                        )

                        return this.combineValues([b, c])
                    }
                }
            },
            chooseUnit: ([a, b]) => {
                return b
            },
            trace: ([a, b]) => {
                return b
            },
            fstPair: ([a]) => {
                return defaultResult()
            },
            sndPair: ([a]) => {
                return defaultResult()
            },
            chooseList: ([a, b, c]) => {
                if (a instanceof LiteralValue) {
                    if (a.items.length == 0) {
                        return b
                    } else {
                        return c
                    }
                } else {
                    if (
                        [b, c].every(
                            (arg) =>
                                arg instanceof DataValue ||
                                arg instanceof LiteralValue
                        )
                    ) {
                        if (!(a instanceof DataValue)) {
                            throw new Error("unexpected")
                        }

                        return defaultResult()
                    } else {
                        ;[b, c] = addFuncValuesBranches(
                            [b, c],
                            owner,
                            "chooseList",
                            a
                        )

                        return this.combineValues([b, c])
                    }
                }
            },
            mkCons: ([a, b]) => {
                return defaultResult()
            },
            headList: ([a]) => {
                return this.combineValues([defaultResult(), new ErrorValue()])
            },
            tailList: ([a]) => {
                return this.combineValues([defaultResult(), new ErrorValue()])
            },
            nullList: ([a]) => {
                return defaultResult()
            },
            chooseData: ([a, b, c, d, e, f]) => {
                if (a instanceof LiteralValue) {
                    const data = a.data

                    if (data instanceof ConstrData) {
                        return b
                    } else if (data instanceof MapData) {
                        return c
                    } else if (data instanceof ListData) {
                        return d
                    } else if (data instanceof IntData) {
                        return e
                    } else if (data instanceof ByteArrayData) {
                        return f
                    } else {
                        throw new Error("unhandled UplcData type")
                    }
                } else {
                    if (
                        [b, c, d, e, f].every(
                            (arg) =>
                                arg instanceof DataValue ||
                                arg instanceof LiteralValue
                        )
                    ) {
                        if (!(a instanceof DataValue)) {
                            throw new Error("unexpected")
                        }

                        return defaultResult()
                    } else {
                        ;[b, c, d, e, f] = addFuncValuesBranches(
                            [b, c, d, e, f],
                            owner,
                            "chooseData",
                            a
                        )

                        return this.combineValues([b, c, d, e, f])
                    }
                }
            },
            constrData: ([a, b]) => {
                return defaultResult()
            },
            mapData: ([a]) => {
                return defaultResult()
            },
            listData: ([a]) => {
                return defaultResult()
            },
            iData: ([a]) => {
                return defaultResult()
            },
            bData: ([a]) => {
                return defaultResult()
            },
            unConstrData: ([a]) => {
                return this.combineValues([defaultResult(), new ErrorValue()])
            },
            unMapData: ([a]) => {
                return this.combineValues([defaultResult(), new ErrorValue()])
            },
            unListData: ([a]) => {
                return this.combineValues([defaultResult(), new ErrorValue()])
            },
            unIData: ([a]) => {
                return this.combineValues([defaultResult(), new ErrorValue()])
            },
            unBData: ([a]) => {
                return this.combineValues([defaultResult(), new ErrorValue()])
            },
            equalsData: ([a, b]) => {
                return defaultResult()
            },
            mkPairData: ([a, b]) => {
                return defaultResult()
            },
            mkNilData: ([a]) => {
                return defaultResult()
            },
            mkNilPairData: ([a]) => {
                return defaultResult()
            },
            serialiseData: ([a]) => {
                return defaultResult()
            }
        }

        const callback = callbacks[name]

        if (!callback) {
            throw new Error(`builtin ${name} not defined in callbacks`)
        }

        return callback(args)
    }

    /**
     * @private
     * @param {FuncExpr} fn
     */
    incrCallCount(fn) {
        const tag = this.getFuncExprTag(fn)

        const prev = this.#callCount.get(tag)

        if (prev) {
            this.#callCount.set(
                tag,
                Math.min(prev + 1, Number.MAX_SAFE_INTEGER)
            )
        } else {
            this.#callCount.set(tag, 1)
        }
    }

    /**
     * @private
     * @param {Variable[]} variables
     * @param {Value[]} values
     * @returns {[Variable, Value][]}
     */
    mapVarsToValues(variables, values) {
        if (variables.length != values.length) {
            throw new Error(
                "variables and values don't have the same length([" +
                    variables.map((v) => v.name).join(",") +
                    "] vs [" +
                    values.map((v) => v.toString()).join(",") +
                    "]"
            )
        }

        /**
         * @type {[Variable, Value][]}
         */
        const m = []

        variables.forEach((variable, i) => {
            const value = values[i]

            const allValues = this.#variableValues.get(variable)

            if (allValues) {
                this.#variableValues.set(
                    variable,
                    this.combineValues([allValues, value])
                )
            } else {
                this.#variableValues.set(variable, value)
            }

            m.push([variable, value])
        })

        return m
    }

    /**
     * @private
     * @param {Stack} stack
     * @param {null | Expr} owner
     * @param {FuncExpr} fn
     * @param {Value[]} args
     */
    pushFuncCall(stack, owner, fn, args) {
        if (args.some((a) => a instanceof ErrorValue)) {
            this.pushReductionValue(owner, new ErrorValue())
        } else {
            if (args.some((a) => a.hasError(true))) {
                this.#compute.push({ multi: 2, owner: owner })
                this.#compute.push({ value: new ErrorValue(), owner: owner })
                args = args.map((a) => this.valueWithoutErrors(a))
            }

            const varsToValues = this.mapVarsToValues(fn.args, args)
            stack = stack.extend(varsToValues)

            this.incrCallCount(fn)
            this.#compute.push({ fn: fn, owner: owner, stack: stack })
            this.pushExpr(stack, fn.body)
        }
    }

    /**
     * @private
     * @param {Expr} owner for entry point ths is the entry point IRFuncExpr, for all other calls this is the IRCallExpr
     * @param {FuncValue} v
     * @param {Value[]} args
     */
    callFunc(owner, v, args) {
        const fn = v.definition
        const stack = v.stack

        if (owner instanceof CallExpr) {
            const s = this.#funcCallExprs.get(fn)

            if (!s) {
                this.#funcCallExprs.set(fn, new Set([owner]))
            } else {
                s.add(owner)
            }
        }

        this.pushFuncCall(stack, owner, fn, args)
    }

    /**
     * Call an unknown function (eg. returned at the deepest point of recursion)
     * Make sure any arguments that are functions are also called so that all possible execution paths are touched (TODO: should we also called function values returned by those calls etc.?)
     * Absorb the return values of these functions
     * @private
     * @param {Expr} owner
     * @param {AnyValue} fn
     * @param {Value[]} args
     */
    callAnyFunc(owner, fn, args) {
        if (args.some((a) => a instanceof ErrorValue)) {
            this.pushReductionValue(owner, new ErrorValue())
        } else {
            if (args.some((a) => a.hasError(false))) {
                this.#compute.push({ multi: 2, owner: owner })
                this.#compute.push({ value: new ErrorValue(), owner: owner })
                args = args.map((a) => this.valueWithoutErrors(a))
            }

            /**
             * Only user-defined functions!
             * @type {FuncValue[]}
             */
            const fnsInArgs = []

            args.forEach((a) => {
                if (a instanceof MultiValue) {
                    a.values.forEach((aa) => {
                        if (aa instanceof FuncValue) {
                            fnsInArgs.push(aa)
                        }
                    })
                } else if (a instanceof FuncValue) {
                    fnsInArgs.push(a)
                }
            })

            this.#compute.push({ ignore: fnsInArgs.length, owner: owner })

            fnsInArgs.forEach((fn) => {
                this.pushFuncCall(
                    fn.stack,
                    null,
                    fn.definition,
                    fn.definition.args.map((a) => new AnyValue())
                )
            })
        }
    }

    /**
     * @private
     * @param {CallExpr} expr
     * @param {number} code
     * @param {Value} value
     */
    cacheValue(expr, code, value) {
        const prev = this.#cachedCalls.get(expr)

        if (prev) {
            const prevPrev = prev.get(code)

            if (prevPrev && !(prevPrev instanceof AnyValue)) {
                const newValue = this.combineValues([prevPrev, value])
                prev.set(code, newValue)
            } else {
                prev.set(code, value)
            }
        } else {
            this.#cachedCalls.set(expr, new Map([[code, value]]))
        }
    }

    /**
     * @private
     * @param {CallExpr} expr
     * @param {number} code
     */
    prepareCacheValue(expr, code) {
        this.#compute.push({
            value: new AnyValue(),
            cacheExpr: expr,
            code: code
        })
    }

    /**
     * @private
     */
    evalInternal() {
        const codeMapper = new ValueCodeMapper(this.#funcExprTags)

        let head = this.#compute.pop()

        while (head) {
            if ("cacheExpr" in head) {
                this.cacheValue(head.cacheExpr, head.code, head.value)
            } else if ("expr" in head) {
                const expr = head.expr

                if (expr instanceof CallExpr) {
                    let fn = this.popLastValue()

                    /**
                     * @type {Value[]}
                     */
                    let args = []

                    for (let i = 0; i < expr.args.length; i++) {
                        args.push(this.popLastValue())
                    }

                    // don't allow partial literal args (could lead to infinite recursion where the partial literal keeps updating)
                    //  except when calling builtins (partial literals are important: eg. in divideInteger(<data>, 10) we know that the callExpr doesn't return an error)
                    const allLiteral =
                        fn.isLiteral() && args.every((a) => a.isLiteral())

                    if (
                        !allLiteral &&
                        !(fn instanceof BuiltinValue) &&
                        !(
                            fn instanceof FuncValue &&
                            fn.definition.args.length == 1 &&
                            Stack.isGlobal(fn.definition.args[0])
                        )
                    ) {
                        fn = this.valueWithoutLiterals(fn)
                        args = args.map((a) => this.valueWithoutLiterals(a))
                    }

                    const fns = fn instanceof MultiValue ? fn.values : [fn]

                    if (fns.length > 1) {
                        this.#compute.push({ multi: fns.length, owner: expr })
                    }

                    for (let fn of fns) {
                        const code = codeMapper.getCallCode(fn, args)
                        const cached = this.#cachedCalls.get(expr)?.get(code)

                        if (cached) {
                            this.pushReductionValue(expr, cached)

                            // increment the call count even though we are using a cached value
                            for (let fn of fns) {
                                if (fn instanceof FuncValue) {
                                    this.incrCallCount(fn.definition)
                                }
                            }
                        } else {
                            this.#compute.push({
                                calling: expr,
                                code: code,
                                args: args
                            })
                            //this.cacheValue(expr, code, new IRAnyValue());

                            if (fn instanceof AnyValue) {
                                this.callAnyFunc(expr, fn, args)
                            } else if (fn instanceof ErrorValue) {
                                this.pushReductionValue(expr, new ErrorValue())
                            } else if (fn instanceof FuncValue) {
                                this.callFunc(expr, fn, args)
                                this.prepareCacheValue(expr, code)
                            } else if (fn instanceof BuiltinValue) {
                                this.callBuiltin(
                                    expr,
                                    fn.builtin,
                                    args,
                                    head.stack
                                )
                                this.prepareCacheValue(expr, code)
                            } else {
                                throw CompilerError.type(
                                    expr.site,
                                    "unable to call " + fn.toString()
                                )
                            }
                        }
                    }
                } else if (expr instanceof ErrorExpr) {
                    this.pushReductionValue(expr, new ErrorValue())
                } else if (expr instanceof BuiltinExpr) {
                    this.pushReductionValue(expr, new BuiltinValue(expr))
                } else if (expr instanceof NameExpr) {
                    if (expr.isParam()) {
                        this.pushReductionValue(
                            expr,
                            this.#dataValueCache.getParamValue(expr.name)
                        )
                    } else {
                        this.pushReductionValue(
                            expr,
                            this.getValue(head.stack, expr)
                        )
                    }
                } else if (expr instanceof LiteralExpr) {
                    if (this.#evalLiterals) {
                        this.pushReductionValue(
                            expr,
                            new LiteralValue(expr.value)
                        )
                    } else {
                        // a literal unit can be used as a dummy branch function if we are sure that branch is never taken
                        if (expr.value instanceof UplcUnit) {
                            this.pushReductionValue(expr, new AnyValue())
                        } else {
                            this.pushReductionValue(
                                expr,
                                this.#dataValueCache.getFromLiteralValue(
                                    expr.value
                                )
                            )
                        }
                    }
                } else if (expr instanceof FuncExpr) {
                    // don't set owner because it is confusing wrt. return value type
                    this.#reduce.push(FuncValue.new(expr, head.stack))
                } else {
                    throw new Error("unexpected expr type")
                }
            } else if ("calling" in head) {
                // keep track of recursive calls

                const last = this.popLastValue()

                this.cacheValue(head.calling, head.code, last)
                this.pushReductionValue(head.calling, last)
            } else if ("fn" in head && head.fn instanceof FuncExpr) {
                // track the owner
                const owner = head.owner
                const last = this.popLastValue()

                this.setExprValue(head.fn, last)
                this.pushReductionValue(owner, last)
            } else if ("multi" in head) {
                // collect multiple IRValues from the reductionStack and put it back as a single IRMultiValue

                /**
                 * @type {Value[]}
                 */
                const values = []

                for (let i = 0; i < head.multi; i++) {
                    const v = this.popLastValue()

                    values.push(v)
                }

                this.pushReductionValue(head.owner, this.combineValues(values))
            } else if ("value" in head) {
                this.pushReductionValue(head.owner, head.value)
            } else if ("ignore" in head) {
                const vs = [new AnyValue()]
                for (let i = 0; i < head.ignore; i++) {
                    const x = this.popLastValue()

                    if (x instanceof ErrorValue) {
                        vs.push(new ErrorValue())
                    }
                }

                this.pushReductionValue(head.owner, this.combineValues(vs))
            } else {
                throw new Error("unexpected term")
            }

            head = this.#compute.pop()
        }
    }

    /**
     * @private
     * @param {Expr} expr entry point
     * @returns {Value}
     */
    evalFirstPass(expr) {
        this.pushExpr(Stack.empty(), expr)

        this.evalInternal()

        const res = this.popLastValue()

        if (this.#reduce.length != 0) {
            throw new Error(
                "expected a single reduction value in first phase [" +
                    this.#reduce.map((v) => v.toString()).join(", ") +
                    "]"
            )
        }

        if (res instanceof FuncValue || res instanceof BuiltinValue) {
            return res
        } else if (res instanceof LiteralValue) {
            return res // used by const
        } else if (
            res instanceof MultiValue &&
            res.values.some((v) => v instanceof AnyValue)
        ) {
            return res
        } else {
            throw new Error(
                `expected entry point function, got ${res.toString()}`
            )
        }
    }

    /**
     * @private
     * @param {FuncValue} main
     * @returns {Value}
     */
    evalSecondPass(main) {
        const definition = main.definition
        const args = definition.args.map((a, i) =>
            this.#dataValueCache.getMainArgValue(
                this.getFuncExprTag(definition),
                i
            )
        )
        this.callFunc(definition, main, args)

        this.evalInternal()

        const res = this.popLastValue()

        if (this.#reduce.length != 0) {
            throw new Error(
                "expected a single reduction value in second phase [" +
                    res.toString() +
                    ", " +
                    this.#reduce.map((v) => v.toString()).join(", ") +
                    "]"
            )
        }

        return res
    }
}

/**
 * @param {Value} v
 * @param {Branch} branch
 * @returns {Value}
 */
function addFuncValueBranch(v, branch) {
    if (v instanceof FuncValue) {
        return v.addBranch(branch)
    } else if (
        v instanceof MultiValue &&
        v.values.some((vv) => vv instanceof FuncValue)
    ) {
        return new MultiValue(
            v.values.map((vv) => addFuncValueBranch(vv, branch))
        )
    } else {
        return v
    }
}

/**
 * @param {Value[]} vs
 * @param {CallExpr} owner
 * @param {Branch["type"]} type
 * @param {Value} condition
 * @returns {Value[]}
 */
function addFuncValuesBranches(vs, owner, type, condition) {
    return vs.map((v, i) =>
        addFuncValueBranch(v, { expr: owner, type, condition, branchId: i })
    )
}
