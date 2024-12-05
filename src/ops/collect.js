import { expectDefined } from "@helios-lang/type-utils"
import { loop } from "./loop.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("../expressions/index.js").NameExprI} NameExprI
 * @typedef {import("../expressions/index.js").VariableI} VariableI
 */

/**
 * @param {Expr} expr
 * @returns {Set<VariableI>}
 */
export function collectDeclaredVariables(expr) {
    /**
     * @type {Set<VariableI>}
     */
    const s = new Set()

    loop(expr, {
        funcExpr: (funcExpr) => {
            funcExpr.args.forEach((a) => s.add(a))
        }
    })

    return s
}

/**
 * @param {Expr} expr
 * @returns {Set<VariableI>}
 */
export function collectUsedVariables(expr) {
    /**
     * @type {Set<VariableI>}
     */
    const s = new Set()

    /**
     * @type {Set<VariableI>}
     */
    const not = new Set()

    loop(expr, {
        nameExpr: (nameExpr) => {
            s.add(nameExpr.variable)
        },
        funcExpr: (funcExpr) => {
            funcExpr.args.forEach((a) => not.add(a))
        }
    })

    not.forEach((v) => s.delete(v))

    return s
}

/**
 *
 * @param {Expr} expr
 * @returns {[number, VariableI][]}
 */
export function collectUsedVariablesWithDepth(expr) {
    /**
     * @type {[number, VariableI][]}
     */
    const s = []

    /**
     * @type {Set<VariableI>}
     */
    const not = new Set()

    loop(expr, {
        nameExpr: (nameExpr) => {
            const idx = expectDefined(nameExpr.index)

            if (!s.some((entry) => entry[1] == nameExpr.variable)) {
                s.push([idx, nameExpr.variable])
            }
        },
        funcExpr: (funcExpr) => {
            funcExpr.args.forEach((a) => not.add(a))
        }
    })

    return s.filter(([_, v]) => !not.has(v))
}

/**
 * @param {Expr} expr - names must already be resolved
 * @returns {Map<VariableI, Set<NameExprI>>}
 */
export function collectVariableNameExprs(expr) {
    /**
     * @type {Map<VariableI, Set<NameExprI>>}
     */
    const m = new Map()

    loop(expr, {
        nameExpr: (nameExpr) => {
            const v = nameExpr.variable
            const prev = m.get(v)

            if (prev) {
                prev.add(nameExpr)
            } else {
                m.set(v, new Set([nameExpr]))
            }
        }
    })

    return m
}

/**
 * @param {Expr} expr
 * @returns {Set<string>}
 */
export function collectParams(expr) {
    /**
     * @type {Set<string>}
     */
    const s = new Set()

    loop(expr, {
        paramExpr: (paramExpr) => {
            s.add(paramExpr.name)
        }
    })

    return s
}
