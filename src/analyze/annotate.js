import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    NameExpr,
    LiteralExpr,
    ParamExpr
} from "../expressions/index.js"
import { Analysis } from "./Analysis.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("../format/index.js").FormatOptions} FormatOptions
 */

/**
 * @typedef {FormatOptions & {
 *   debug?: boolean
 * }} AnnotateAnalysisOptions
 */

/**
 * @param {Analysis} analysis
 * @param {AnnotateAnalysisOptions} options
 * @returns {string}
 */
export function annotate(analysis, options = {}) {
    const TAB = options.tab ?? "  "
    const debug = options.debug
    const syntacticSugar = options.syntacticSugar ?? true

    /**
     * @param {Expr} expr
     * @param {string} indent
     * @returns {string}
     */
    const recurse = (expr, indent) => {
        if (expr instanceof LiteralExpr) {
            return expr.value.toString()
        } else if (expr instanceof ErrorExpr) {
            return `error()`
        } else if (expr instanceof BuiltinExpr) {
            return expr.name
        } else if (expr instanceof ParamExpr) {
            const output = analysis.getExprValue(expr, debug)
            return `param("${expr.name}", ${recurse(expr.expr, indent)})${output ? ": " + output.toString() : ""}`
        } else if (expr instanceof NameExpr) {
            const output = analysis.getExprValue(expr, debug)

            if (output) {
                return `${expr.name}: ${output.map((o) => o.toString()).join("|")}`
            } else {
                return expr.name
            }
        } else if (expr instanceof FuncExpr) {
            const output = analysis.getExprValue(expr, debug)

            const isGlobalDef =
                expr.args.length == 1 &&
                expr.args[0].name.value.startsWith("__")
            const innerIndent = indent + (isGlobalDef ? "" : TAB)

            let countStr = ""
            const count = analysis.countFuncCalls(expr)
            if (count == Number.MAX_SAFE_INTEGER) {
                countStr = "\u221e"
            } else {
                countStr = count.toString()
            }

            return `Fn${analysis.getFuncExprTag(expr)}(${expr.args
                .map((a) => {
                    const v = analysis.getVariableValues(a)

                    if (v) {
                        return `${a.name}: ${v.map((vv) => vv.toString()).join("|")}`
                    } else {
                        return a.name
                    }
                })
                .join(
                    ", "
                )})${countStr} -> ${output ? output.map((o) => o.toString()).join("|") + " " : ""}{\n${innerIndent}${recurse(expr.body, innerIndent)}\n${indent}}`
        } else if (expr instanceof CallExpr) {
            if (
                expr.func instanceof FuncExpr &&
                expr.args.length == 1 &&
                syntacticSugar
            ) {
                return `${expr.func.args[0].name} = ${recurse(expr.args[0], indent)};\n${indent}${recurse(expr.func.body, indent)}`
            } else {
                const output = analysis.getExprValue(expr, debug)

                const isGlobalDef =
                    expr.func instanceof FuncExpr &&
                    expr.func.args.length == 1 &&
                    expr.func.args[0].name.value.startsWith("__")
                const globalDef =
                    expr.func instanceof FuncExpr && expr.func.args.length == 1
                        ? expr.func.args[0].name
                        : ""

                const parens = `(${isGlobalDef ? `\n${indent}${TAB}/* ${globalDef} */` : ""}${expr.args.map((a) => `\n${indent}${TAB}${recurse(a, indent + TAB)}`).join(",")}${expr.args.length > 0 || isGlobalDef ? `\n${indent}` : ""})${output ? `: ${output.map((o) => o.toString()).join("|")}` : ""}`

                if (
                    expr.func instanceof NameExpr ||
                    expr.func instanceof BuiltinExpr
                ) {
                    return `${expr.func.name}${parens}`
                } else {
                    return `${recurse(expr.func, indent)}${parens}`
                }
            }
        } else {
            throw new Error("unhandled IRExpr")
        }
    }

    return recurse(analysis.rootExpr, "")
}
