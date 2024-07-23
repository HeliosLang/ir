import { StackValues } from "./StackValues.js"

/**
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 */

/**
 * @typedef {{
 *   genId(key: string): number
 *   genStackId(values: StackValues): number
 * }} EvalContext
 */
