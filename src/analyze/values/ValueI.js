export {}

/**
 * @typedef {import("./Branches.js").BranchesI} BranchesI
 */

/**
 * `collectFuncTags` and `containsFunc` are redundant since switching to non-recursive algorithms, but are kept for easier debugging
 * @typedef {{
 *   collectFuncTags(s: Set<number>): void
 *   containsFunc(tag: number, depth: number): boolean
 *   isCallable(anyAsDataOnly: boolean): boolean
 *   isDataLike(anyAsFuncOnly: boolean): boolean
 *   isEqual(other: ValueI): boolean
 *   isLiteral(): boolean
 *   toString(): string
 *   withBranches(braches: BranchesI): ValueI
 * }} ValueI
 */
