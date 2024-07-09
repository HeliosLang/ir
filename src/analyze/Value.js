import { Variable } from "../expressions/index.js"

/**
 * @typedef {{
 *   toString(): string
 *   isLiteral(): boolean
 *   hasError(maybe: boolean): boolean
 *   isEqual(other: Value): boolean
 *   dump(codeMapper: ValueCodeMapperI, depth?: number): any
 * }} Value
 */

/**
 * @typedef {{
 *   getCode(v: Value): number
 *   getCodes(v: Value | StackI): number[]
 * }} ValueCodeMapperI
 */

/**
 * @typedef {{
 *   getValue(v: Variable): Value
 * }} StackI
 */
