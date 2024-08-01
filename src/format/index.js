import { DEFAULT_PARSE_OPTIONS, parse } from "../parse/index.js"
import { format as formatInternal } from "./format.js"

/**
 * @typedef {import("../expressions/Expr.js").Expr} Expr
 * @typedef {import("./format.js").PartialFormatOptions} FormatOptions
 */

/**
 * @param {string | Expr} rawExpr
 * @param {FormatOptions} options
 * @returns {string}
 */
export function format(rawExpr, options = {}) {
    const expr =
        typeof rawExpr == "string"
            ? parse(rawExpr, {
                  ...DEFAULT_PARSE_OPTIONS,
                  ...(options.builtinsPrefix
                      ? { builtinsPrefix: options.builtinsPrefix }
                      : {}),
                  ...(options.errorPrefix
                      ? { errorPrefix: options.errorPrefix }
                      : {}),
                  ...(options.safeBuiltinSuffix
                      ? { safeBuitinSuffix: options.safeBuiltinSuffix }
                      : {})
              })
            : rawExpr

    return formatInternal(expr, options)
}
