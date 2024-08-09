import { None } from "@helios-lang/type-utils"
import { UplcProgramV2 } from "@helios-lang/uplc"
import { Scope } from "../expressions/index.js"
import {
    SourceMappedString,
    parse,
    DEFAULT_PARSE_OPTIONS
} from "../parse/index.js"
import { optimize } from "./optimize.js"
import { injectRecursiveDeps } from "./recursion.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("../parse/index.js").ParseOptions} ParseOptions
 */

/**
 * @typedef {{
 *   optimize?: boolean
 *   parseOptions?: ParseOptions
 *   alt?: UplcProgramV2
 * }} CompileOptions
 */

/**
 * @param {string | SourceMappedString | Expr} rawExpr
 * @param {CompileOptions} options
 * @returns {UplcProgramV2}
 */
export function compile(rawExpr, options = {}) {
    const expr = prepare(rawExpr, options)

    const uplc = expr.toUplc()

    return new UplcProgramV2(uplc, options.alt)
}

/**
 * @param {string | SourceMappedString | Expr} rawExpr
 * @param {CompileOptions} options
 * @returns {Expr}
 */
export function prepare(rawExpr, options = {}) {
    let expr =
        typeof rawExpr == "string" || rawExpr instanceof SourceMappedString
            ? parse(rawExpr, options.parseOptions ?? DEFAULT_PARSE_OPTIONS)
            : rawExpr

    expr = injectRecursiveDeps(expr)

    expr.resolveNames(new Scope(None, None))

    if (options.optimize) {
        expr = optimize(expr)

        expr.resolveNames(new Scope(None, None))
    }

    return expr
}
