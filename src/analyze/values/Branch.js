import { CallExpr } from "../../expressions/index.js"

/**
 * @typedef {import("./BranchType.js").BranchType} BranchType
 * @typedef {import("./Value.js").AnyDataValue} AnyDataValue
 */

/**
 * @typedef {{
 *   expr: CallExpr
 *   type: BranchType
 *   condition: AnyDataValue
 *   index: number
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
        a.condition.toString() == b.condition.toString() &&
        a.index == b.index
    )
}
