import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    LiteralExpr,
    NameExpr
} from "../expressions/index.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 */

/**
 * @typedef {{
 *   builtinsPrefix?: string
 *   safeBuiltinSuffix?: string
 *   tab?: string
 * }} PartialFormatOptions
 */

/**
 * @typedef {{
 *   builtinsPrefix?: string
 *   safeBuiltinSuffix: string
 *   tab: string
 * }} FormatOptions
 */

/**
 * @type {FormatOptions}
 */
const DEFAULT_FORMAT_OPTIONS = {
    safeBuiltinSuffix: "__safe",
    tab: "    "
}

/**
 * @param {Expr} expr
 * @param {PartialFormatOptions} partialOptions
 * @returns {string}
 */
export function format(expr, partialOptions = {}) {
    const options = { ...DEFAULT_FORMAT_OPTIONS, ...partialOptions }

    return formatInternal(expr, "", options)
}

/**
 * @param {Expr} expr
 * @param {string} indent
 * @param {FormatOptions} options
 * @returns {string}
 */
function formatInternal(expr, indent, options) {
    if (expr instanceof LiteralExpr) {
        return expr.value.toString()
    } else if (expr instanceof NameExpr) {
        return expr.name
    } else if (expr instanceof BuiltinExpr) {
        return `${options.builtinsPrefix ?? ""}${expr.name}${expr.safe ? options.safeBuiltinSuffix : ""}`
    } else if (expr instanceof ErrorExpr) {
        return "error()"
    } else if (expr instanceof CallExpr) {
        if (expr.func instanceof BuiltinExpr) {
            if (expr.func.name == "ifThenElse") {
                return [
                    `${formatInternal(expr.func, indent, options)}(`,
                    `${indent}${options.tab}${formatInternal(expr.args[0], indent + options.tab, options)},`,
                    `${indent}${options.tab}${formatInternal(expr.args[1], indent + options.tab, options)},`,
                    `${indent}${options.tab}${formatInternal(expr.args[2], indent + options.tab, options)}`,
                    `${indent})`
                ].join("\n")
            } else {
                return `${formatInternal(expr.func, indent, options)}(${expr.args.map((arg) => formatInternal(arg, indent, options)).join(", ")})`
            }
        } else if (
            expr.func instanceof FuncExpr &&
            expr.func.args.length == 1
        ) {
            return [
                `${expr.func.args[0].name} = ${formatInternal(expr.args[0], indent, options)};`,
                `${indent}${formatInternal(expr.func.body, indent, options)}`
            ].join("\n")
        } else {
            return `${formatInternal(expr.func, indent, options)}(${expr.args.map((arg) => formatInternal(arg, indent, options)).join(", ")})`
        }
    } else if (expr instanceof FuncExpr) {
        return [
            `(${expr.args.map((arg) => arg.toString()).join(", ")}) -> {`,
            `${indent + options.tab}${formatInternal(expr.body, indent + options.tab, options)}`,
            `${indent}}`
        ].join("\n")
    } else {
        throw new Error("unhandled IR expression type")
    }
}
