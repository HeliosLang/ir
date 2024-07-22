export {}

/**
 * @typedef {import("./IdGenerator.js").IdGenerator} IdGenerator
 */

/**
 * @typedef {{
 *   keyPath: string
 *   blockFunc?: {
 *     tag: number
 *     depth: number
 *   }
 *   genId: IdGenerator
 * }} BlockRecursionProps
 */
/**
 * `blockRecursion`: if stack recursion is detected all nested stack must have the `recursive` flag set to true, and the stack ids must be based on more opaque nested ids (eg. `Data` instead of `Data1`)
 * @typedef {{
 *   blockRecursion(props: BlockRecursionProps): [ValueI, string]
 *   collectFuncTags(s: Set<number>): void
 *   containsFunc(tag: number, depth: number): boolean
 *   isCallable(anyAsDataOnly: boolean): boolean
 *   isDataLike(anyAsFuncOnly: boolean): boolean
 *   isLiteral(): boolean
 *   toString(): string
 * }} ValueI
 */
