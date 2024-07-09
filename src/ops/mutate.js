import { deconstructFuncBody } from "./deconstruct.js"
import { reconstructFuncBody } from "./reconstruct.js"
import { BuiltinExpr } from "../expressions/BuiltinExpr.js"
import { CallExpr } from "../expressions/CallExpr.js"
import { ErrorExpr } from "../expressions/ErrorExpr.js"
import { FuncExpr } from "../expressions/FuncExpr.js"
import { LiteralExpr } from "../expressions/LiteralExpr.js"
import { NameExpr } from "../expressions/NameExpr.js"
import { format } from "../format/index.js"

/**
 * @typedef {import("../expressions/Expr.js").Expr} Expr
 */

/**
 * Is a stack-based approach possible that allows mutation
 * @param {Expr} root
 * @param {{
 *   builtinExpr?: (expr: BuiltinExpr) => Expr
 *   nameExpr?: (expr: NameExpr) => Expr
 *   errorExpr?: (expr: ErrorExpr) => Expr
 *   literalExpr?: (expr: LiteralExpr) => Expr
 *   callExpr?: (expr: CallExpr, oldExpr: CallExpr) => Expr
 *   funcExpr?: (expr: FuncExpr, oldExpr: FuncExpr) => Expr
 *   flattenDefs?: boolean
 * }} callbacks
 */
export function mutate(root, callbacks) {
    /**
     * @type {{
     *   compute: Expr
     * } | {
     *   reduce: Expr
     * }}
     */
    let state = { compute: root }

    /**
     * @typedef {{nArgs: number, args: Expr[], mutatedArgs: Expr[], fn: (args: Expr[]) => Expr}} Frame
     */

    /**
     * @type {Frame[]}
     */
    let frames = []

    while (true) {
        if ("compute" in state) {
            const expr = state.compute

            if (expr instanceof BuiltinExpr) {
                state = {
                    reduce: callbacks.builtinExpr
                        ? callbacks.builtinExpr(expr)
                        : expr
                }
            } else if (expr instanceof NameExpr) {
                state = {
                    reduce: callbacks.nameExpr ? callbacks.nameExpr(expr) : expr
                }
            } else if (expr instanceof ErrorExpr) {
                state = {
                    reduce: callbacks.errorExpr
                        ? callbacks.errorExpr(expr)
                        : expr
                }
            } else if (expr instanceof LiteralExpr) {
                state = {
                    reduce: callbacks.literalExpr
                        ? callbacks.literalExpr(expr)
                        : expr
                }
            } else if (expr instanceof CallExpr) {
                state = {
                    compute: expr.func
                }

                frames.push({
                    nArgs: 1 + expr.args.length,
                    args: [expr.func].concat(expr.args),
                    mutatedArgs: [],
                    fn: (exprs) => {
                        const func = exprs[0]
                        const args = exprs.slice(1)

                        let newExpr = new CallExpr(expr.site, func, args)

                        return callbacks.callExpr
                            ? callbacks.callExpr(newExpr, expr)
                            : newExpr
                    }
                })
            } else if (expr instanceof FuncExpr) {
                if (callbacks.flattenDefs) {
                    const [defs, final] = deconstructFuncBody(expr.body)

                    state = {
                        compute: defs.length > 0 ? defs[0].value : final
                    }
                    frames.push({
                        nArgs: defs.length + 1,
                        args: defs.map((d) => d.value).concat(final),
                        mutatedArgs: [],
                        fn: (exprs) => {
                            const values = exprs.slice(0, exprs.length - 1)
                            const final = exprs[exprs.length - 1]

                            defs.forEach((d, i) => (d.value = values[i]))

                            const body = reconstructFuncBody(defs, final)

                            let newExpr = new FuncExpr(
                                expr.site,
                                expr.args,
                                body
                            )

                            return callbacks.funcExpr
                                ? callbacks.funcExpr(newExpr, expr)
                                : newExpr
                        }
                    })
                } else {
                    state = {
                        compute: expr.body
                    }

                    frames.push({
                        nArgs: 1,
                        args: [expr.body],
                        mutatedArgs: [],
                        fn: (exprs) => {
                            const body = exprs[0]
                            let newExpr = new FuncExpr(
                                expr.site,
                                expr.args,
                                body
                            )

                            return callbacks.funcExpr
                                ? callbacks.funcExpr(newExpr, expr)
                                : newExpr
                        }
                    })
                }
            } else {
                throw new Error("unhandled expression type")
            }
        } else {
            const frame = frames.pop()

            if (!frame) {
                break
            }

            frame.mutatedArgs.push(state.reduce)

            if (frame.mutatedArgs.length == frame.nArgs) {
                state = {
                    reduce: frame.fn(frame.mutatedArgs)
                }
            } else {
                state = {
                    compute: frame.args[frame.mutatedArgs.length]
                }

                frames.push(frame)
            }
        }
    }

    if (!("reduce" in state)) {
        throw new Error("unexpected")
    }

    return state.reduce
}
