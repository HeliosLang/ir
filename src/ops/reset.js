import { Word } from "@helios-lang/compiler-utils"
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
            return new NameExpr(new Word(nameExpr.name, nameExpr.site))
        }
    })
}
