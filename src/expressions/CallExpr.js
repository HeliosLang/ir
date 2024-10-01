import { TokenSite } from "@helios-lang/compiler-utils"
import { None } from "@helios-lang/type-utils"
import { UplcCall, UplcForce } from "@helios-lang/uplc"
import { Scope } from "./Scope.js"
import { Variable } from "./Variable.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcTerm} UplcTerm
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
 */

/**
 * @implements {Expr}
 */
export class CallExpr {
    /**
     * @readonly
     * @type {Site}
     */
    site

    /**
     * Mutation is more convenient and much faster when applying some optimizations.
     * @readwrite
     * @type {Expr}
     */
    func

    /**
     * Mutation is more convenient and much faster when applying some optimizations.
     * @readwrite
     * @type {Expr[]}
     */
    args

    /**
     * @param {Site} site
     * @param {Expr} func
     * @param {Expr[]} args
     */
    constructor(site, func, args) {
        this.site = site
        this.func = func
        this.args = args
    }

    /**
     * @type {number}
     */
    get flatSize() {
        return (
            4 +
            this.args.reduce((prev, arg) => arg.flatSize + prev, 0) +
            this.func.flatSize
        )
    }

    /**
     * @param {Scope} scope
     */
    resolveNamesInArgs(scope) {
        for (let argExpr of this.args) {
            argExpr.resolveNames(scope)
        }
    }

    /**
     * @param {Scope} scope
     */
    resolveNames(scope) {
        this.func.resolveNames(scope)
        this.resolveNamesInArgs(scope)
    }

    /**
     * @param {Expr} other
     * @returns {boolean}
     */
    isEqual(other) {
        if (other instanceof CallExpr) {
            return (
                this.func.isEqual(other.func) &&
                this.args.length == other.args.length &&
                this.args.every((arg, i) => arg.isEqual(other.args[i]))
            )
        } else {
            return false
        }
    }

    /**
     * @param {NotifyCopy} notifyCopy
     * @param {Map<Variable, Variable>} varMap
     * @returns {CallExpr}
     */
    copy(notifyCopy, varMap) {
        const newExpr = new CallExpr(
            this.site,
            this.func.copy(notifyCopy, varMap),
            this.args.map((a) => a.copy(notifyCopy, varMap))
        )

        notifyCopy(this, newExpr)

        return newExpr
    }

    /**
     * @returns {UplcTerm}
     */
    toUplc() {
        let term = this.func.toUplc()

        const s = TokenSite.isDummy(this.site) ? None : this.site

        const nArgs = this.args.length

        if (nArgs == 0) {
            // assuming underlying zero-arg function has been converted into a UplcDelay term
            term = new UplcForce(term, s)
        } else {
            for (let i = 0; i < nArgs; i++) {
                const argExpr = this.args[i]
                const isLast = i == nArgs - 1

                term = new UplcCall(term, argExpr.toUplc(), isLast ? s : None)
            }
        }

        return term
    }
}
