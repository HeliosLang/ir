export {}

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcTerm} UplcTerm
 * @typedef {import("./Scope.js").ScopeI} ScopeI
 * @typedef {import("./Variable.js").VariableI} VariableI
 */

/**
 * The optimizer maps expressions to expected values, calling notifyCopy assures that that mapping isn't lost for copies (copying is necessary when inlining)
 * @typedef {(oldExpr: Expr, newExpr: Expr) => void} NotifyCopy
 */

/**
 * Interface for:
 *   * `ErrorExpr`
 *   * `CallExpr`
 *   * `FuncExpr`
 *   * `NameExpr`
 *   * `BuiltinExpr`
 *   * `LiteralExpr`
 *
 * The `copy()` method is needed because inlining can't use the same NameExpr twice,
 *   so any inlineable expression is copied upon inlining to assure each nested NameExpr is unique.
 *   This is important to do even if the inlined expression is only called once, because it might still be inlined into multiple other locations that are eliminated in the next iteration.
 *
 * `flatSize` returns the number of bits occupied by the equivalent UplcTerm in the final serialized UPLC program
 *   This is used to detect small FuncExprs and inline them
 *
 * `toString()` isn't defined, use the `format()` function instead
 *
 * `isEqual()` can be used for some basic optimizations
 *
 * @typedef {{
 *   site: Site
 *   flatSize: number
 *   resolveNames(scope: ScopeI): void
 *   isEqual(other: Expr): boolean
 *   copy(notifyCopy: NotifyCopy, varMap: Map<VariableI, VariableI>): Expr
 *   toUplc(): UplcTerm
 * }} Expr
 */
