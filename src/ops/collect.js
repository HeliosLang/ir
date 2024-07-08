import { Variable } from "../expressions/index.js"
import { loop } from "./loop.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 */

/**
 * @param {Expr} expr
 * @returns {Set<Variable>}
 */
export function collectVariables(expr) {
    /**
     * @type {Set<Variable>}
     */
    const s = new Set()

    loop(expr, {
        nameExpr: (nameExpr) => {
            s.add(nameExpr.variable)
        }
    })

    return s
}
