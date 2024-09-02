import { bytesToHex } from "@helios-lang/codec-utils"
import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    LiteralExpr,
    NameExpr,
    ParamExpr
} from "../expressions/index.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcData} UplcData
 * @typedef {import("../expressions/index.js").Expr} Expr
 */

/**
 * @typedef {{
 *   builtinsPrefix?: string
 *   safeBuiltinSuffix?: string
 *   errorPrefix?: string
 *   tab?: string
 *   syntacticSugar?: boolean
 *   uplcDataLiterals?: boolean
 * }} PartialFormatOptions
 */

/**
 * @typedef {{
 *   builtinsPrefix?: string
 *   safeBuiltinSuffix: string
 *   errorPrefix?: string
 *   tab: string
 *   syntacticSugar?: boolean
 *   uplcDataLiterals?: boolean
 * }} FormatOptions
 */

/**
 * @type {FormatOptions}
 */
const DEFAULT_FORMAT_OPTIONS = {
    safeBuiltinSuffix: "__safe",
    tab: "    ",
    uplcDataLiterals: true
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
 * @returns {boolean}
 */
function isAssignmentLike(expr) {
    return (
        expr instanceof CallExpr &&
        expr.func instanceof FuncExpr &&
        expr.func.args.length == 1
    )
}

/**
 * @param {UplcData[]} items
 * @param {FormatOptions} options
 * @returns {string}
 */
function formatDataList(items, options) {
    if (items.length == 0) {
        return `${options.builtinsPrefix ?? ""}mkNilData(())`
    } else {
        return `${options.builtinsPrefix ?? ""}mkCons(${formatData(items[0], options)}, ${formatDataList(items.slice(1), options)})`
    }
}

/**
 * @param {[UplcData, UplcData][]} pairs
 * @param {FormatOptions} options
 * @returns {string}
 */
function formatDataMap(pairs, options) {
    if (pairs.length == 0) {
        return `${options.builtinsPrefix ?? ""}mkNilPairData(())`
    } else {
        return `${options.builtinsPrefix ?? ""}mkCons(${options.builtinsPrefix ?? ""}mkPairData(${formatData(pairs[0][0], options)}, ${formatData(pairs[0][1], options)}), ${formatDataMap(pairs.slice(1), options)})`
    }
}

/**
 * @param {UplcData} d
 * @param {FormatOptions} options
 * @returns {string}
 */
function formatData(d, options) {
    switch (d.kind) {
        case "bytes":
            return `${options.builtinsPrefix ?? ""}bData(#${bytesToHex(d.bytes)})`
        case "int":
            return `${options.builtinsPrefix ?? ""}iData(${d.value.toString()})`
        case "constr":
            return `${options.builtinsPrefix ?? ""}constrData(${d.tag}, ${formatDataList(d.fields, options)})`
        case "list":
            return `${options.builtinsPrefix ?? ""}listData(${formatDataList(d.items, options)})`
        case "map":
            return `${options.builtinsPrefix ?? ""}mapData(${formatDataMap(d.list, options)})`
    }
}

/**
 * @param {Expr} expr
 * @param {string} indent
 * @param {FormatOptions} options
 * @returns {string}
 */
function formatInternal(expr, indent, options) {
    const syntacticSugar = options.syntacticSugar ?? true

    if (expr instanceof LiteralExpr) {
        if (expr.value.kind == "data" && !(options.uplcDataLiterals ?? true)) {
            return formatData(expr.value.value, options)
        } else if (
            expr.value.kind == "list" &&
            !(options.uplcDataLiterals ?? true) &&
            expr.value.length == 0
        ) {
            return `${options.builtinsPrefix ?? ""}mkNilData(())`
        } else {
            return expr.value.toString()
        }
    } else if (expr instanceof ParamExpr) {
        return `param("${expr.name}", ${formatInternal(expr.expr, indent, options)})`
    } else if (expr instanceof NameExpr) {
        return expr.name
    } else if (expr instanceof BuiltinExpr) {
        return `${options.builtinsPrefix ?? ""}${expr.name}${expr.safe ? options.safeBuiltinSuffix : ""}`
    } else if (expr instanceof ErrorExpr) {
        return `${options.errorPrefix ?? ""}error()`
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
            expr.func.args.length == 1 &&
            !isAssignmentLike(expr.args[0]) &&
            syntacticSugar
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
