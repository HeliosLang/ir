import { isDummySite } from "@helios-lang/compiler-utils"
import { makeUplcError } from "@helios-lang/uplc"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcTerm} UplcTerm
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
 * @typedef {import("./Scope.js").ScopeI} ScopeI
 */

/**
 * Intermediate Representation error call
 * @internal
 * @implements {Expr}
 */
export class ErrorExpr {
    /**
     * @readonly
     * @type {Site}
     */
    site

    /**
     * @param {Site} site
     */
    constructor(site) {
        this.site = site
    }

    /**
     * @type {number}
     */
    get flatSize() {
        return 4
    }

    /**
     * @param {ScopeI} _scope
     */
    resolveNames(_scope) {}

    /**
     * @param {ErrorExpr} other
     * @returns {boolean}
     */
    isEqual(other) {
        return other instanceof ErrorExpr
    }

    /**
     * @param {NotifyCopy} notifyCopy
     * @returns {Expr}
     */
    copy(notifyCopy) {
        const newExpr = new ErrorExpr(this.site)

        notifyCopy(this, newExpr)

        return newExpr
    }

    /**
     * @returns {UplcTerm}
     */
    toUplc() {
        const s = isDummySite(this.site) ? undefined : this.site

        return makeUplcError({ site: s })
    }
}
