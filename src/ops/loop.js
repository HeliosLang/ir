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
 * @typedef {import("../expressions/Expr.js").Expr} Expr
 */

/**
 * Non-recursive stack-based algorithm
 * @param {Expr} root
 * @param {{
 *   builtinExpr?: (expr: BuiltinExpr) => void
 *   nameExpr?: (expr: NameExpr) => void
 *   errorExpr?: (expr: ErrorExpr) => void
 *   literalExpr?: (expr: LiteralExpr) => void
 *   callExpr?: (expr: CallExpr) => void
 *   funcExpr?: (expr: FuncExpr) => void
 *   paramExpr?: (expr: ParamExpr) => void
 *   exit?: () => boolean
 * }} callbacks
 * @returns {void}
 */
export function loop(root, callbacks) {
    const stack = [root]

    let expr = stack.pop()

    while (expr) {
        if (expr instanceof BuiltinExpr) {
            if (callbacks.builtinExpr) {
                callbacks.builtinExpr(expr)
            }
        } else if (expr instanceof NameExpr) {
            if (callbacks.nameExpr) {
                callbacks.nameExpr(expr)
            }
        } else if (expr instanceof ErrorExpr) {
            if (callbacks.errorExpr) {
                callbacks.errorExpr(expr)
            }
        } else if (expr instanceof LiteralExpr) {
            if (callbacks.literalExpr) {
                callbacks.literalExpr(expr)
            }
        } else if (expr instanceof CallExpr) {
            stack.push(expr.func)
            expr.args.forEach((a) => stack.push(a))

            if (callbacks.callExpr) {
                callbacks.callExpr(expr)
            }
        } else if (expr instanceof ParamExpr) {
            stack.push(expr.expr)

            if (callbacks.paramExpr) {
                callbacks.paramExpr(expr)
            }
        } else if (expr instanceof FuncExpr) {
            stack.push(expr.body)

            if (callbacks.funcExpr) {
                callbacks.funcExpr(expr)
            }
        }

        if (callbacks.exit && callbacks.exit()) {
            return
        }

        expr = stack.pop()
    }
}

/**
 * @param {CallExpr} expr
 * @param {CallExpr} contained
 * @returns {boolean}
 */
export function callExprContains(expr, contained) {
    let found = false

    loop(expr, {
        callExpr: (callExpr) => {
            if (callExpr == contained) {
                found = true
            }
        },
        exit: () => found
    })

    return found
}

/**
 * It is very important that each NameExpr is unique so they can resolve to different Debruijn indices
 * @param {Expr} expr
 */
export function assertNoDuplicateExprs(expr) {
    /**
     * @type {Set<Expr>}
     */
    const s = new Set()

    loop(expr, {
        nameExpr: (nameExpr) => {
            if (s.has(nameExpr)) {
                throw new Error("duplicate NameExpr " + nameExpr.name)
            }

            s.add(nameExpr)
        },
        callExpr: (callExpr) => {
            if (s.has(callExpr)) {
                throw new Error("duplicate CallExpr")
            }

            s.add(callExpr)
        },
        funcExpr: (funcExpr) => {
            if (s.has(funcExpr)) {
                throw new Error("duplicate FuncExpr")
            }

            s.add(funcExpr)
        },
        errorExpr: (errorExpr) => {
            if (s.has(errorExpr)) {
                throw new Error("duplicate ErrorExpr")
            }

            s.add(errorExpr)
        },
        paramExpr: (paramExpr) => {
            if (s.has(paramExpr)) {
                throw new Error("duplicate ParamExpr")
            }

            s.add(paramExpr)
        }
    })
}
