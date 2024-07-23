import { expectSome } from "@helios-lang/type-utils"
import { CallExpr, FuncExpr, Variable } from "../expressions/index.js"
import { Analysis } from "./Analysis.js"
import { collectFuncTags } from "./values/index.js"
import { Evaluator, generateFuncTagsAndVariableIds } from "./Evaluator.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./values/index.js").NonErrorValue} NonErrorValue
 * @typedef {import("./values/index.js").Value} Value
 */

/**
 * @typedef {{
 *   debug?: boolean
 * }} AnalyzerOptions
 */

export class Analyzer {
    /**
     * An Evaluator can only run once per expression
     * @type {Expr}
     */
    #root

    /**
     * @type {AnalyzerOptions}
     */
    #options

    /**
     * @param {Expr} expr
     * @param {AnalyzerOptions} options
     */
    constructor(expr, options = {}) {
        this.#root = expr
        this.#options = options
    }

    /**
     * @returns {Analysis}
     */
    analyze() {
        /**
         * @type {Map<FuncExpr, number>}
         */
        const callCount = new Map()

        /**
         * @type {Map<Expr, Value[]>}
         */
        const exprValues = new Map()

        /**
         * @type {Map<FuncExpr, Set<CallExpr>>}
         */
        const funcCallExprs = new Map()

        /**
         * @type {Map<Variable, NonErrorValue[]>}
         */
        const variableValues = new Map()

        const [funcExprs, variables] = generateFuncTagsAndVariableIds(
            this.#root
        )

        if (this.#options.debug) {
            variables.keyValues.forEach((v, i) =>
                console.log(`Var ${i}: ${v.name}`)
            )
        }

        /**
         * @param {number | FuncExpr} exprOrTag
         * @param {number} incr
         */
        const incrCallCount = (exprOrTag, incr) => {
            const expr =
                typeof exprOrTag == "number"
                    ? expectSome(funcExprs.getValueByKey(exprOrTag))
                    : exprOrTag

            const prev = callCount.get(expr)

            if (prev) {
                callCount.set(expr, prev + 1)
            } else {
                callCount.set(expr, 1)
            }
        }

        const evaluator = new Evaluator({
            funcExprs,
            variables,
            debug: this.#options.debug,
            onCallAny: (args, owner) => {
                const s = collectFuncTags(...args)

                Array.from(s).forEach((tag) => {
                    incrCallCount(tag, 2)
                })
            },
            onCallFunc: (expr, owner) => {
                incrCallCount(expr, 1)

                if (owner) {
                    const prev = funcCallExprs.get(expr)

                    if (prev) {
                        prev.add(owner)
                    } else {
                        funcCallExprs.set(expr, new Set([owner]))
                    }
                }
            },
            onEvalExpr: (expr, value) => {
                const prev = exprValues.get(expr)

                if (prev) {
                    prev.push(value)
                } else {
                    exprValues.set(expr, [value])
                }
            },
            onPassArg: (variable, value) => {
                const prev = variableValues.get(variable)

                if (prev) {
                    prev.push(value)
                } else {
                    variableValues.set(variable, [value])
                }
            }
        })

        evaluator.eval(this.#root)

        return new Analysis({
            callCount: callCount,
            exprValues: exprValues,
            funcCallExprs: funcCallExprs,
            funcDefinitions: funcExprs.keyValues,
            funcExprTags: funcExprs.valueKeys,
            rootExpr: this.#root,
            variableValues: variableValues
        })
    }
}
