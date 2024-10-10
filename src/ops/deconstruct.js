import { CallExpr, FuncExpr } from "../expressions/index.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("../expressions/index.js").VariableI} VariableI
 */

/**
 * @typedef {{
 *   name: VariableI
 *   callSite: Site
 *   funcSite: Site
 *   value: Expr
 *   directDeps: Set<VariableI>
 *   allDeps: Set<VariableI>
 *   recursiveDeps: VariableI[]
 * }} DeconstructedDef
 */

/**
 * @param {Expr} body
 * @returns {[DeconstructedDef[], Expr]}
 */
export function deconstructFuncBody(body) {
    /**
     * @type {DeconstructedDef[]}
     */
    const defs = []

    let expr = body

    while (
        expr instanceof CallExpr &&
        expr.args.length == 1 &&
        expr.func instanceof FuncExpr
    ) {
        if (expr.func.args.length != 1) {
            throw new Error("expected 1 func arg")
        }

        defs.push({
            name: expr.func.args[0],
            callSite: expr.site,
            funcSite: expr.func.site,
            value: expr.args[0],
            directDeps: new Set(),
            allDeps: new Set(),
            recursiveDeps: []
        })

        expr = expr.func.body
    }

    return [defs, expr]
}
