import { expectDefined } from "@helios-lang/type-utils"
import { CallExpr, FuncExpr } from "../expressions/index.js"
import { loop } from "../ops/index.js"
import { Analysis } from "./Analysis.js"
import { AnyValue, collectFuncTags } from "./values/index.js"
import { Evaluator, generateFuncTagsAndVariableIds } from "./Evaluator.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("../expressions/index.js").VariableI} VariableI
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
     * @private
     * @type {Expr}
     */
    _root

    /**
     * @private
     * @type {AnalyzerOptions}
     */
    _options

    /**
     * @param {Expr} expr
     * @param {AnalyzerOptions} options
     */
    constructor(expr, options = {}) {
        this._root = expr
        this._options = options
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
         * @type {Map<VariableI, NonErrorValue[]>}
         */
        const variableValues = new Map()

        const [funcExprs, variables] = generateFuncTagsAndVariableIds(
            this._root
        )

        if (this._options.debug) {
            variables.keyValues.forEach((v, i) =>
                console.log(`Var ${i}: ${v.name}`)
            )
        }

        /**
         * @param {number | FuncExpr} exprOrTag
         * @param {number} _incr
         */
        const incrCallCount = (exprOrTag, _incr) => {
            const expr =
                typeof exprOrTag == "number"
                    ? expectDefined(funcExprs.getValueByKey(exprOrTag))
                    : exprOrTag

            const prev = callCount.get(expr)

            if (prev) {
                callCount.set(expr, prev + 1)
            } else {
                callCount.set(expr, 1)
            }
        }

        /**
         * @param {Expr} expr
         * @param {Value} value
         */
        const onEvalExpr = (expr, value) => {
            const prev = exprValues.get(expr)

            if (prev) {
                prev.push(value)
            } else {
                exprValues.set(expr, [value])
            }
        }

        const evaluator = new Evaluator({
            funcExprs,
            variables,
            debug: this._options.debug,
            onCallAny: (args, _owner) => {
                const s = collectFuncTags(...args)

                /**
                 * @param {number} tag
                 */
                const onCallFuncInsideAny = (tag) => {
                    incrCallCount(tag, 2)

                    /**
                     * @param {Expr} expr
                     */
                    const onEvalExprInsideAny = (expr) => {
                        onEvalExpr(expr, new AnyValue(-1))
                    }

                    // also add AnyValue | ErrorValue to each internal expression of these functions
                    loop(expectDefined(funcExprs.getValueByKey(tag)).body, {
                        nameExpr: onEvalExprInsideAny,
                        callExpr: onEvalExprInsideAny,
                        funcExpr: (expr) => {
                            const tag = expectDefined(
                                funcExprs.getKeyByValue(expr)
                            )

                            incrCallCount(tag, 2)
                        }
                    })
                }

                Array.from(s).forEach(onCallFuncInsideAny)
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
            onEvalExpr: onEvalExpr,
            onPassArg: (variable, value) => {
                const prev = variableValues.get(variable)

                if (prev) {
                    prev.push(value)
                } else {
                    variableValues.set(variable, [value])
                }
            }
        })

        evaluator.eval(this._root)

        return new Analysis({
            callCount: callCount,
            exprValues: exprValues,
            funcCallExprs: funcCallExprs,
            funcDefinitions: funcExprs.keyValues,
            funcExprTags: funcExprs.valueKeys,
            rootExpr: this._root,
            variableValues: variableValues
        })
    }
}
