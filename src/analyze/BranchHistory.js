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
 * }} BranchHistory
 */
