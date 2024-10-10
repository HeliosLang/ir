export {}

/**
 * @typedef {import("./StackValues.js").StackValuesI} StackValuesI
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 */

/**
 * @typedef {{
 *   genId(key: string): number
 *   genStackId(values: StackValuesI): number
 * }} EvalContext
 */
