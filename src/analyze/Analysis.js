import { None, expectSome, isNone } from "@helios-lang/type-utils"
import { CallExpr, FuncExpr } from "../expressions/index.js"
import { containsCallExprs, collectVariableNameExprs } from "../ops/index.js"
import {
    DataValue,
    FuncValue,
    uniqueFlattenedValues,
    uniqueValues,
    MaybeErrorValue,
    BuiltinValue,
    AnyValue,
    ErrorValue
} from "./values/index.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("../expressions/index.js").NameExprI} NameExprI
 * @typedef {import("../expressions/index.js").VariableI} VariableI
 * @typedef {import("./values/index.js").Value} Value
 */

/**
 * @typedef {{
 *   callCount: Map<FuncExpr, number>
 *   exprValues: Map<Expr, Value[]>
 *   funcCallExprs: Map<FuncExpr, Set<CallExpr>>
 *   funcDefinitions: FuncExpr[]
 *   funcExprTags: Map<FuncExpr, number>
 *   rootExpr: Expr
 *   variableValues: Map<VariableI, Value[]>
 * }} AnalysisProps
 */

export class Analysis {
    /**
     * FuncExpr tag as key
     * @type {Map<FuncExpr, number>}
     */
    callCount

    /**
     * Keep track of the eval result of each expression
     * @type {Map<Expr, Value[]>}
     */
    exprValues

    /**
     * @type {Map<FuncExpr, Set<CallExpr>>}
     */
    funcCallExprs

    /**
     * Unique 0-based ids
     * @type {Map<FuncExpr, number>}
     */
    funcExprTags

    /**
     * @type {FuncExpr[]}
     */
    funcDefinitions

    /**
     * @type {Expr}
     */
    rootExpr

    /**
     * @type {Map<VariableI, Set<NameExprI>>}
     */
    variableReferences

    /**
     * Keep track of all values passed through IRVariables
     * @type {Map<VariableI, Value[]>}
     */
    variableValues

    /**
     * @param {AnalysisProps} props
     */
    constructor({
        callCount,
        exprValues,
        funcCallExprs,
        funcDefinitions,
        funcExprTags,
        rootExpr,
        variableValues
    }) {
        this.callCount = callCount
        this.exprValues = exprValues
        this.funcCallExprs = funcCallExprs
        this.funcDefinitions = funcDefinitions
        this.funcExprTags = funcExprTags
        this.rootExpr = rootExpr
        this.variableValues = variableValues
        this.variableReferences = collectVariableNameExprs(rootExpr)
    }

    /**
     * @type {FuncExpr[]}
     */
    get funcExprs() {
        return Array.from(this.funcCallExprs.keys())
    }

    /**
     * TODO: extend this to FuncValues with unique ids
     * @returns {Map<number, Set<CallExpr>>} - the key is the id of the DataValue
     */
    collectDataCallExprs() {
        /**
         * @type {Map<number, Set<CallExpr>>}
         */
        let callExprs = new Map()

        /**
         * @param {CallExpr} expr
         * @param {DataValue} dv
         */
        const addDataValue = (expr, dv) => {
            const id = dv.id

            const s = callExprs.get(id)
            if (s) {
                s.add(expr)
            } else {
                callExprs.set(id, new Set([expr]))
            }
        }

        this.exprValues.forEach((values, expr) => {
            const uvs = uniqueValues(values)
            if (uvs.length == 1) {
                const v = uvs[0]
                if (
                    expr instanceof CallExpr &&
                    !(expr.func instanceof FuncExpr)
                ) {
                    if (v instanceof DataValue) {
                        addDataValue(expr, v)
                    } else if (
                        v instanceof MaybeErrorValue &&
                        v.value instanceof DataValue
                    ) {
                        addDataValue(expr, v.value)
                    }
                }
            }
        })

        return callExprs
    }

    /**
     * TODO: extend this to FuncValues with unique ids
     * @returns {Map<number, Set<CallExpr>>} - the key is the id of the DataValue
     */
    collectFactorizableDataCallExprs() {
        let callExprs = this.collectDataCallExprs()

        // filter out callExprs that contain any of the other callExprs
        callExprs = new Map(
            Array.from(callExprs.entries()).map(([key, s]) => {
                const ces = Array.from(s)

                s = new Set(
                    ces.filter((ce) => {
                        return !ces.some((contained) => {
                            if (contained == ce) {
                                return false
                            } else {
                                return containsCallExprs(ce, [contained])
                            }
                        })
                    })
                )

                return [key, s]
            })
        )
        // only keep the entries with 2 or more CallExprs
        callExprs = new Map(
            Array.from(callExprs.entries()).filter(([_key, value]) => {
                return value.size > 1
            })
        )

        return callExprs
    }

    /**
     * @param {FuncExpr} fn
     * @returns {number}
     */
    countFuncCalls(fn) {
        return this.callCount.get(fn) ?? 0
    }

    /**
     * @param {VariableI} v
     * @returns {number}
     */
    countVariableReferences(v) {
        return this.variableReferences.get(v)?.size ?? 0
    }

    /**
     * @param {Expr} expr
     * @param {boolean} raw
     * @returns {Option<Value[]>}
     */
    getExprValue(expr, raw = false) {
        const values = this.exprValues.get(expr)

        if (values) {
            if (raw) {
                return values
            } else {
                return uniqueFlattenedValues(values)
            }
        } else {
            return None
        }
    }

    /**
     * @param {Expr} expr
     * @returns {Option<DataValue>}
     */
    getSingleExprDataValue(expr) {
        const dv = this.getExprValue(expr)

        if (dv && dv.length == 1 && dv[0] instanceof DataValue) {
            return dv[0]
        } else if (dv && dv.length > 1) {
            const dvv = dv.find((dvv) => dvv instanceof DataValue)

            if (dvv instanceof DataValue) {
                return dvv
            } else {
                return None
            }
        } else {
            return None
        }
    }

    /**
     * @param {Expr} expr
     * @returns {Option<FuncValue>}
     */
    getSingleExprFuncValue(expr) {
        const dv = this.getExprValue(expr)

        if (dv && dv.length == 1 && dv[0] instanceof FuncValue) {
            return dv[0]
        } else if (dv && dv.length > 1) {
            const dvv = dv.find((dvv) => dvv instanceof FuncValue)

            if (dvv instanceof FuncValue) {
                return dvv
            } else {
                return None
            }
        } else {
            return None
        }
    }

    /**
     * @param {FuncExpr} fn
     * @returns {CallExpr[]}
     */
    getFuncCallExprs(fn) {
        return Array.from(this.funcCallExprs.get(fn) ?? [])
    }

    /**
     * @param {number} tag
     * @returns {FuncExpr}
     */
    getFuncDefinition(tag) {
        return expectSome(this.funcDefinitions[tag])
    }

    /**
     * @param {FuncExpr} expr
     * @returns {number}
     */
    getFuncExprTag(expr) {
        const tag = this.funcExprTags.get(expr)

        if (isNone(tag)) {
            throw new Error("tag not generated")
        }

        return tag
    }

    /**
     * @param {FuncExpr} fn
     * @returns {number[]} indices
     */
    getUnusedFuncVariables(fn) {
        /**
         * @type {number[]}
         */
        const indices = []

        fn.args.forEach((a, i) => {
            const s = this.variableReferences.get(a)
            if (!s || s.size == 0) {
                indices.push(i)
            }
        })

        return indices
    }

    /**
     * @param {VariableI} v
     * @returns {NameExprI[]}
     */
    getVariableReferences(v) {
        return Array.from(this.variableReferences.get(v) ?? [])
    }

    /**
     * @param {VariableI} v
     * @returns {Option<Value[]>}
     */
    getVariableValues(v) {
        const values = this.variableValues.get(v)

        if (values) {
            return uniqueFlattenedValues(values)
        } else {
            return None
        }
    }

    /**
     * @param {Expr} expr
     * @returns {boolean}
     */
    expectsError(expr) {
        const v = this.getExprValue(expr)

        if (v && v.length > 0) {
            return v.some(isMaybeError)
        } else {
            // the expression might be recently formed, so if not found, better be on the safe side
            return true
        }
    }

    /**
     * The newExpr should evaluate to exactly the same values etc. as the oldExpr
     * @param {Expr} oldExpr
     * @param {Expr} newExpr
     */
    notifyCopyExpr(oldExpr, newExpr) {
        const oldValue = this.exprValues.get(oldExpr)
        if (oldValue) {
            this.exprValues.set(newExpr, oldValue)

            if (oldExpr instanceof FuncExpr && newExpr instanceof FuncExpr) {
                this.funcExprTags.set(newExpr, this.getFuncExprTag(oldExpr))
            }
        }
    }

    /**
     * @param {FuncExpr} fn
     * @param {number[]} unused
     * @returns {boolean}
     */
    noUnusedArgErrors(fn, unused) {
        const callExprs = this.getFuncCallExprs(fn)

        return callExprs.every((ce) => {
            return unused.every((i) => {
                return !this.expectsError(ce.args[i])
            })
        })
    }

    /**
     * @param {FuncExpr} fn
     * @returns {boolean}
     */
    onlyDedicatedCallExprs(fn) {
        const callExprs = this.getFuncCallExprs(fn)

        // if there are no callExprs then we don't know exactly how the function is called (eg. main), and we can't flatten
        if (callExprs.length == 0) {
            return false
        }

        return callExprs.every((ce) => {
            if (ce.func == fn) {
                // literally calling fn directly
                return true
            }

            const v = this.getExprValue(ce.func)

            if (!v || v.length == 0) {
                return false
            } else if (v.length == 1 && v[0] instanceof FuncValue) {
                return true
            } else if (v.length > 1) {
                return v.every(
                    (vv) =>
                        !(vv instanceof BuiltinValue) &&
                        (!(vv instanceof FuncValue) ||
                            vv.definitionTag == this.getFuncExprTag(fn))
                )
            } else {
                throw new Error(`unexpected ${v.toString()}`)
            }
        })
    }

    /**
     * Imagine the following expressions:
     * `(first) -> {
     *   (second) -> {
     *   }
     * }`
     *
     * `onlyNestedCalls` returns true if this expression is always called as <expr>(a)(b)
     *
     * @param {FuncExpr} first
     * @param {FuncExpr} second
     * @returns {boolean}
     */
    onlyNestedCalls(first, second) {
        const callExprs = this.getFuncCallExprs(second)

        // if there are no callExprs then we don't know exactly how the function is called (eg. main), and we can't flatten
        if (callExprs.length == 0) {
            return false
        }

        return callExprs.every((ce) => {
            if (ce.func instanceof CallExpr) {
                const v = this.getExprValue(ce.func.func)

                if (!v || v.length == 0) {
                    return false
                } else if (v.length == 1 && v[0] instanceof FuncValue) {
                    return v[0].definitionTag == this.getFuncExprTag(first)
                } else {
                    return v.every(
                        (vv) =>
                            !(vv instanceof FuncValue) ||
                            vv.definitionTag == this.getFuncExprTag(first)
                    )
                }
            } else {
                return false
            }
        })
    }
}

/**
 * @param {Value} value
 * @returns {boolean}
 */
function isMaybeError(value) {
    return (
        (value instanceof AnyValue && !value.isNeverError) ||
        value instanceof ErrorValue ||
        value instanceof MaybeErrorValue
    )
}
