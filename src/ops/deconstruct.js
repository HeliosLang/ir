import { CallExpr, FuncExpr, Variable } from "../expressions/index.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("../expressions/index.js").Expr} Expr
 */

/**
 * @typedef {{
 *   name: Variable
 *   callSite: Site
 *   funcSite: Site
 *   funcTag: number
 *   value: Expr
 *   directDeps: string[]
 *   allDeps: Set<string>
 *   recursiveDeps: string[]
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
            funcTag: expr.func.tag,
            value: expr.args[0],
            directDeps: [],
            allDeps: new Set(),
            recursiveDeps: []
        })

        expr = expr.func.body
    }

    return [defs, expr]
}
