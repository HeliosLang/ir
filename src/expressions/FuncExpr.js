import { UplcDelay, UplcLambda } from "@helios-lang/uplc"
import { CallExpr } from "./CallExpr.js"
import { Scope } from "./Scope.js"
import { Variable } from "./Variable.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcTerm} UplcTerm
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
 */

/**
 * IR function expression with some args, that act as the header, and a body expression
 * @implements {Expr}
 */
export class FuncExpr {
    /**
     * @readonly
     * @type {Site}
     */
    site

    /**
     * Mutation is more convenient and much faster when applying some optimizations.
     * @readwrite
     * @type {Variable[]}
     */
    args

    /**
     * Mutation is more convenient and much faster when applying some optimizations.
     * @readwrite
     * @type {Expr}
     */
    body

    /**
     * @param {Site} site
     * @param {Variable[]} args
     * @param {Expr} body
     */
    constructor(site, args, body) {
        this.site = site
        this.args = args
        this.body = body
    }

    /**
     * @type {number}
     */
    get flatSize() {
        const nArgs = this.args.length
        return 4 + (nArgs > 0 ? (nArgs - 1) * 4 : 0) + this.body.flatSize
    }

    /**
     * @param {NotifyCopy} notifyCopy
     * @param {Map<Variable, Variable>} varMap
     * @returns {FuncExpr}
     */
    copy(notifyCopy, varMap) {
        const args = this.args.map((a) => a.copy(varMap))
        const newExpr = new FuncExpr(
            this.site,
            args,
            this.body.copy(notifyCopy, varMap)
        )

        notifyCopy(this, newExpr)

        return newExpr
    }

    /**
     * @returns {boolean}
     */
    hasOptArgs() {
        const b = this.args.some((a) =>
            a.name.toString().startsWith("__useopt__")
        )

        if (b) {
            return b
        }

        if (this.body instanceof FuncExpr) {
            return this.body.hasOptArgs()
        } else {
            return false
        }
    }

    /**
     * @param {Expr} other
     * @returns {boolean}
     */
    isEqual(other) {
        return (
            other instanceof FuncExpr &&
            this.body.isEqual(other.body) &&
            this.args.length == other.args.length &&
            this.args.every(
                (arg, i) => arg.name.value == other.args[i].name.value
            )
        )
    }

    /**
     * @param {Scope} scope
     */
    resolveNames(scope) {
        // in the zero-arg case no Debruijn indices need to be added because we use Delay/Force

        for (let arg of this.args) {
            scope = new Scope(scope, arg)
        }

        this.body.resolveNames(scope)
    }

    /**
     * @returns {UplcTerm}
     */
    toUplc() {
        let term = this.body.toUplc()

        if (this.args.length == 0) {
            // a zero-arg func is turned into a UplcDelay term
            term = new UplcDelay(term, this.site)
        } else {
            for (let i = this.args.length - 1; i >= 0; i--) {
                term = new UplcLambda(term, this.args[i].toString(), this.site)
            }
        }

        return term
    }
}
