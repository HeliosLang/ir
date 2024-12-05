import { makeWord } from "@helios-lang/compiler-utils"
import { NameExpr } from "../expressions/index.js"
import { mutate } from "./mutate.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 */

/**
 * @param {Expr} expr
 * @returns {Expr}
 */
export function resetVariables(expr) {
    return mutate(expr, {
        nameExpr: (nameExpr) => {
            return new NameExpr(
                makeWord({ value: nameExpr.name, site: nameExpr.site })
            )
        }
    })
}
