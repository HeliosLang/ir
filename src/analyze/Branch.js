import { CallExpr } from "../expressions/index.js"

/**
 * @typedef {import("./Value.js").Value} Value
 */

/**
 * @typedef {{
 *   expr: CallExpr
 *   type: "ifThenElse" | "chooseList" | "chooseData"
 *   condition: Value
 *   branchId: number
 * }} Branch
 */

/**
 * @param {Branch} a
 * @param {Branch} b
 * @returns {boolean}
 */
export function branchesAreEqual(a, b) {
    return (
        a.expr == b.expr &&
        a.type == b.type &&
        a.condition.isEqual(b.condition) &&
        a.branchId == b.branchId
    )
}
