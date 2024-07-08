import { Word } from "@helios-lang/compiler-utils"
import { CallExpr, FuncExpr, Variable } from "../expressions/index.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./deconstruct.js").DeconstructedDef} DeconstructedDef
 */

/**
 * @param {DeconstructedDef[]} defs
 * @param {Expr} final
 * @returns {Expr}
 */
export function reconstructFuncBody(defs, final) {
    let body = final

    for (let i = defs.length - 1; i >= 0; i--) {
        const def = defs[i]

        body = new CallExpr(
            def.callSite,
            new FuncExpr(def.funcSite, [def.name], body),
            [
                def.recursiveDeps.length > 0
                    ? new FuncExpr(def.callSite, def.recursiveDeps, def.value)
                    : def.value
            ]
        )
    }

    return body
}
