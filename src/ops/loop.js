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

    let head = stack.pop()

    while (head) {
        if (head instanceof BuiltinExpr) {
            if (callbacks.builtinExpr) {
                callbacks.builtinExpr(head)
            }
        } else if (head instanceof NameExpr) {
            if (callbacks.nameExpr) {
                callbacks.nameExpr(head)
            }
        } else if (head instanceof ErrorExpr) {
            if (callbacks.errorExpr) {
                callbacks.errorExpr(head)
            }
        } else if (head instanceof LiteralExpr) {
            if (callbacks.literalExpr) {
                callbacks.literalExpr(head)
            }
        } else if (head instanceof CallExpr) {
            stack.push(head.func)

            for (let a of head.args) {
                stack.push(a)
            }

            if (callbacks.callExpr) {
                callbacks.callExpr(head)
            }
        } else if (head instanceof FuncExpr) {
            if (callbacks.funcExpr) {
                callbacks.funcExpr(head)
            }

            stack.push(head.body)
        }

        if (callbacks.exit && callbacks.exit()) {
            return
        }

        head = stack.pop()
    }
}
