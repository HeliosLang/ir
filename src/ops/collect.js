import { expectSome } from "@helios-lang/type-utils"
import { NameExpr, Variable } from "../expressions/index.js"
import { loop } from "./loop.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 */

/**
 * @param {Expr} expr
 * @returns {Set<Variable>}
 */
export function collectDeclaredVariables(expr) {
    /**
     * @type {Set<Variable>}
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
 * @returns {Set<Variable>}
 */
export function collectUsedVariables(expr) {
    /**
     * @type {Set<Variable>}
     */
    const s = new Set()

    /**
     * @type {Set<Variable>}
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
 * @returns {[number, Variable][]}
 */
export function collectUsedVariablesWithDepth(expr) {
    /**
     * @type {[number, Variable][]}
     */
    const s = []

    /**
     * @type {Set<Variable>}
     */
    const not = new Set()

    loop(expr, {
        nameExpr: (nameExpr) => {
            const idx = expectSome(nameExpr.index)

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
 * @returns {Map<Variable, Set<NameExpr>>}
 */
export function collectVariableNameExprs(expr) {
    /**
     * @type {Map<Variable, Set<NameExpr>>}
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
