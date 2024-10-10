import { TokenSite } from "@helios-lang/compiler-utils"
import { None } from "@helios-lang/type-utils"
import { UplcConst } from "@helios-lang/uplc"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcValue} UplcValue
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
 * @typedef {import("./Scope.js").ScopeI} ScopeI
 * @typedef {import("./Variable.js").VariableI} VariableI
 */

/**
 * Wrapper for UplcValues, representing literals
 * @implements {Expr}
 */
export class LiteralExpr {
    /**
     * @readonly
     * @type {Site}
     */
    site

    /**
     * @readonly
     * @type {UplcValue}
     */
    value

    /**
     * @param {UplcValue} value
     * @param {Site} site
     */
    constructor(value, site) {
        this.site = site
        this.value = value
    }

    /**
     * @type {number}
     */
    get flatSize() {
        return new UplcConst(this.value).flatSize
    }

    /**
     * @param {NotifyCopy} _notifyCopy
     * @param {Map<VariableI, VariableI>} _varMap
     * @returns {LiteralExpr}
     */
    copy(_notifyCopy, _varMap) {
        return this
    }

    /**
     * @param {Expr} other
     * @returns {boolean}
     */
    isEqual(other) {
        return other instanceof LiteralExpr && this.value.isEqual(other.value)
    }

    /**
     * Linking doesn't do anything for literals
     * @param {ScopeI} _scope
     */
    resolveNames(_scope) {}

    /**
     * @returns {UplcConst}
     */
    toUplc() {
        const s = TokenSite.isDummy(this.site) ? None : this.site

        return new UplcConst(this.value, s)
    }
}
