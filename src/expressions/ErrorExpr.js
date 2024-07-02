import { UplcError } from "@helios-lang/uplc"
import { Scope } from "./Scope.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcTerm} UplcTerm
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
 */

/**
 * Intermediate Representation error call (with optional literal error message)
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
     * @readonly
     * @type {string}
     */
    message

    /**
     * @param {Site} site
     * @param {string} message
     */
    constructor(site, message = "") {
        this.site = site
        this.message = message
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
     * @param {NotifyCopy} notifyCopy
     * @returns {Expr}
     */
    copy(notifyCopy) {
        const newExpr = new ErrorExpr(this.site, this.message)

        notifyCopy(this, newExpr)

        return newExpr
    }

    /**
     * @returns {UplcTerm}
     */
    toUplc() {
        return new UplcError(this.message, this.site)
    }
}
