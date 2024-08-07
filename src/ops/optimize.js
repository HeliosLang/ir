import { format } from "../format/format.js"
import { Optimizer, DEFAULT_OPTIMIZER_OPTIONS } from "./Optimizer.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./Optimizer.js").OptimizerOptions} OptimizerOptions
 */

/**
 * @param {Expr} expr
 * @param {OptimizerOptions} options
 * @returns {Expr}
 */
export function optimize(expr, options = DEFAULT_OPTIMIZER_OPTIONS) {
    const formatOptions = { syntacticSugar: false }

    let dirty = true
    let oldState = format(expr, formatOptions)
    let commonSubExprCount = 0

    while (dirty) {
        dirty = false

        const optimizer = new Optimizer(expr, options, commonSubExprCount)

        expr = optimizer.optimize()
        commonSubExprCount = optimizer.commonSubExprCount

        const newState = format(expr, formatOptions)

        if (newState != oldState) {
            dirty = true
            oldState = newState
        }
    }

    return expr
}
