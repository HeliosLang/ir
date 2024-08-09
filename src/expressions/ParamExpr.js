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
export class ParamExpr {
    /**
     * @readonly
     * @type {Site}
     */
    site

    /**
     * @readonly
     * @type {string}
     */
    name

    /**
     * @readwrite
     * @type {Expr}
     */
    expr

    /**
     * @param {Site} site
     * @param {string} name
     * @param {Expr} expr
     */
    constructor(site, name, expr) {
        this.site = site
        this.name = name
        this.expr = expr
    }

    /**
     * @type {number}
     */
    get flatSize() {
        return this.expr.flatSize
    }

    /**
     * @param {Scope} scope
     */
    resolveNames(scope) {
        this.expr.resolveNames(scope)
    }

    /**
     * @param {Expr} other
     * @returns {boolean}
     */
    isEqual(other) {
        if (other instanceof ParamExpr) {
            return this.name == other.name && this.expr.isEqual(other.expr)
        } else {
            return false
        }
    }

    /**
     *
     * @param {import("./Expr.js").NotifyCopy} notifyCopy
     * @param {Map<Variable, Variable>} varMap
     * @returns {ParamExpr}
     */
    copy(notifyCopy, varMap) {
        const newExpr = new ParamExpr(
            this.site,
            this.name,
            this.expr.copy(notifyCopy, varMap)
        )

        notifyCopy(this, newExpr)

        return newExpr
    }

    /**
     * @returns {UplcTerm}
     */
    toUplc() {
        return this.expr.toUplc()
    }
}
