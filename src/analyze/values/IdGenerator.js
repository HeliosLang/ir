export {}

/**
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 */

/**
 * @typedef {{
 *   genId(key: string): number
 *   genOpaqueStackValueId(stackId: number, variableId: number): number
 *   genStackId(values: [number, NonErrorValue][]): number
 * }} IdGenerator
 */
