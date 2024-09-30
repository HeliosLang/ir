import { UplcError } from "@helios-lang/uplc"
import { Scope } from "./Scope.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcTerm} UplcTerm
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
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
     * @param {Scope} scope
     */
    resolveNames(scope) {}

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
        return new UplcError(this.site)
    }
}
