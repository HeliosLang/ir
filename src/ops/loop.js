import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    LiteralExpr,
    NameExpr
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
