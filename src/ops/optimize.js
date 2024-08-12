import { isNone } from "@helios-lang/type-utils"
import { format } from "../format/format.js"
import { Optimizer, DEFAULT_OPTIMIZER_OPTIONS } from "./Optimizer.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./Optimizer.js").OptimizerOptions} OptimizerOptions
 */

/**
 * These options can be used to try different configurations to pinpoint an optimization error
 * @typedef {OptimizerOptions & {
 *   maxIters?: number
 *   iterSpecificOptions?: OptimizerOptions[]
 * }} OptimizeOptions
 */

/**
 * @param {Expr} expr
 * @param {OptimizeOptions} options
 * @returns {Expr}
 */
export function optimize(expr, options = DEFAULT_OPTIMIZER_OPTIONS) {
    const formatOptions = { syntacticSugar: false }

    let dirty = true
    let iter = 0
    let oldState = format(expr, formatOptions)
    let commonSubExprCount = 0

    while (dirty && (isNone(options.maxIters) || iter < options.maxIters)) {
        dirty = false

        /**
         * @type {OptimizerOptions}
         */
        let optimizerOptions = options

        if (options.iterSpecificOptions && options.iterSpecificOptions[iter]) {
            optimizerOptions = options.iterSpecificOptions[iter]
        }

        const optimizer = new Optimizer(
            expr,
            optimizerOptions,
            commonSubExprCount
        )

        expr = optimizer.optimize()
        commonSubExprCount = optimizer.commonSubExprCount

        const newState = format(expr, formatOptions)

        if (newState != oldState) {
            dirty = true
            oldState = newState
        }

        iter++
    }

    return expr
}
