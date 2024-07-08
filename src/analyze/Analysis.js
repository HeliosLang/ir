import { isNone } from "@helios-lang/type-utils"
import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    NameExpr,
    LiteralExpr,
    Variable
} from "../expressions/index.js"
import { AnyValue } from "./AnyValue.js"
import { ErrorValue } from "./ErrorValue.js"
import { FuncValue } from "./FuncValue.js"
import { MultiValue } from "./MultiValue.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./Value.js").Value} Value
 */

/**
 * @typedef {{
 *   callCount: Map<number, number>
 *   exprValues: Map<Expr, Value>
 *   funcCallExprs: Map<FuncExpr, Set<CallExpr>>
 *   funcExprTags: Map<FuncExpr, number>
 *   rootExpr: Expr
 *   rootValue: Value
 *   variableReferences: Map<Variable, Set<NameExpr>>
 *   variableValues: Map<Variable, Value>
 * }} AnalysisProps
 */

const TAB = "  "

export class Analysis {
    /**
     * FuncExpr tag as key
     * @type {Map<number, number>}
     */
    callCount

    /**
     * Keep track of the eval result of each expression
     * @type {Map<Expr, Value>}
     */
    exprValues

    /**
     * @type {Map<FuncExpr, Set<CallExpr>>}
     */
    funcCallExprs

    /**
     * Unique 1-based ids
     * @type {Map<FuncExpr, number>}
     */
    funcExprTags

    /**
     * @type {Expr}
     */
    rootExpr

    /**
     * @type {Value}
     */
    rootValue

    /**
     * @type {Map<Variable, Set<NameExpr>>}
     */
    variableReferences

    /**
     * Keep track of all values passed through IRVariables
     * @type {Map<Variable, Value>}
     */
    variableValues

    /**
     * @param {AnalysisProps} props
     */
    constructor({
        callCount,
        exprValues,
        funcCallExprs,
        funcExprTags,
        rootExpr,
        rootValue,
        variableReferences,
        variableValues
    }) {
        this.callCount = callCount
        this.exprValues = exprValues
        this.funcCallExprs = funcCallExprs
        this.funcExprTags = funcExprTags
        this.rootExpr = rootExpr
        this.rootValue = rootValue
        this.variableReferences = variableReferences
        this.variableValues = variableValues
    }

    /**
     * @type {FuncExpr[]}
     */
    get funcExprs() {
        return Array.from(this.funcCallExprs.keys())
    }

    /**
     * @param {FuncExpr} fn
     * @returns {number}
     */
    countFuncCalls(fn) {
        return this.callCount.get(this.getFuncExprTag(fn)) ?? 0
    }

    /**
     * @param {Variable} v
     * @returns {number}
     */
    countVariableReferences(v) {
        return this.variableReferences.get(v)?.size ?? 0
    }

    /**
     * @param {Expr} expr
     * @returns {Option<Value>}
     */
    getExprValue(expr) {
        return this.exprValues.get(expr)
    }

    /**
     * @param {FuncExpr} fn
     * @returns {CallExpr[]}
     */
    getFuncCallExprs(fn) {
        return Array.from(this.funcCallExprs.get(fn) ?? [])
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
     * @param {Variable} v
     * @returns {NameExpr[]}
     */
    getVariableReferences(v) {
        return Array.from(this.variableReferences.get(v) ?? [])
    }

    /**
     * @param {Variable} v
     * @returns {Option<Value>}
     */
    getVariableValue(v) {
        return this.variableValues.get(v)
    }

    /**
     * @param {Expr} expr
     * @returns {boolean}
     */
    expectsError(expr) {
        const v = this.getExprValue(expr)

        if (v) {
            if (v instanceof ErrorValue) {
                return true
            } else if (v instanceof MultiValue && v.hasError()) {
                return true
            } else if (v instanceof AnyValue) {
                return true
            } else {
                return false
            }
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

            if (!v) {
                return false
            } else if (v instanceof MultiValue) {
                return v.values.every(
                    (vv) => !(vv instanceof FuncValue) || vv.definition == fn
                )
            } else if (v instanceof FuncValue) {
                //assert(v.definition == fn, `expected ${fn.toString()}, not ${v.definition.toString()}`);
                return true
            } else {
                throw new Error(`unexpected ${v.toString()}`)
            }
        })
    }

    /**
     * @param {FuncExpr} first
     * @param {FuncExpr} second
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

                if (!v) {
                    return false
                } else if (v instanceof MultiValue) {
                    return v.values.every(
                        (vv) =>
                            !(vv instanceof FuncValue) || vv.definition == first
                    )
                } else if (v instanceof FuncValue) {
                    return v.definition == first
                } else {
                    throw new Error(`unexpected ${v.toString()}`)
                }
            } else {
                return false
            }
        })
    }

    /**
     * @returns {string}
     */
    annotate() {
        /**
         * @param {Expr} expr
         * @param {string} indent
         * @returns {string}
         */
        const recurse = (expr, indent) => {
            if (expr instanceof LiteralExpr) {
                return expr.value.toString()
            } else if (expr instanceof ErrorExpr) {
                return `error()`
            } else if (expr instanceof BuiltinExpr) {
                return expr.name
            } else if (expr instanceof NameExpr) {
                const output = this.getExprValue(expr)

                if (output) {
                    return `${expr.name}: ${output.toString()}`
                } else {
                    return expr.name
                }
            } else if (expr instanceof FuncExpr) {
                const output = this.getExprValue(expr)

                const isGlobalDef =
                    expr.args.length == 1 &&
                    expr.args[0].name.value.startsWith("__")
                const innerIndent = indent + (isGlobalDef ? "" : TAB)

                let countStr = ""
                const count = this.countFuncCalls(expr)
                if (count == Number.MAX_SAFE_INTEGER) {
                    countStr = "\u221e"
                } else {
                    countStr = count.toString()
                }

                return `Fn${this.getFuncExprTag(expr)}(${expr.args
                    .map((a) => {
                        const v = this.getVariableValue(a)

                        if (v) {
                            return `${a.name}: ${v.toString()}`
                        } else {
                            return a.name
                        }
                    })
                    .join(
                        ", "
                    )})${countStr} -> ${output ? output.toString() + " " : ""}{\n${innerIndent}${recurse(expr.body, innerIndent)}\n${indent}}`
            } else if (expr instanceof CallExpr) {
                if (expr.func instanceof FuncExpr && expr.args.length == 1) {
                    return `${expr.func.args[0].name} = ${recurse(expr.args[0], indent)};\n${indent}${recurse(expr.func.body, indent)}`
                } else {
                    const output = this.getExprValue(expr)

                    const isGlobalDef =
                        expr.func instanceof FuncExpr &&
                        expr.func.args.length == 1 &&
                        expr.func.args[0].name.value.startsWith("__")
                    const globalDef =
                        expr.func instanceof FuncExpr &&
                        expr.func.args.length == 1
                            ? expr.func.args[0].name
                            : ""

                    const parens = `(${isGlobalDef ? `\n${indent}${TAB}/* ${globalDef} */` : ""}${expr.args.map((a) => `\n${indent}${TAB}${recurse(a, indent + TAB)}`).join(",")}${expr.args.length > 0 || isGlobalDef ? `\n${indent}` : ""})${output ? `: ${output.toString()}` : ""}`

                    if (
                        expr.func instanceof NameExpr ||
                        expr.func instanceof BuiltinExpr
                    ) {
                        return `${expr.func.name}${parens}`
                    } else {
                        return `${recurse(expr.func, indent)}${parens}`
                    }
                }
            } else {
                throw new Error("unhandled IRExpr")
            }
        }

        return recurse(this.rootExpr, "")
    }
}
