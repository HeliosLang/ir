import { UplcConst } from "@helios-lang/uplc"
import { Scope } from "./Scope.js"
import { Variable } from "./Variable.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcValue} UplcValue
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
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
     * @param {NotifyCopy} notifyCopy
     * @param {Map<Variable, Variable>} varMap
     * @returns {LiteralExpr}
     */
    copy(notifyCopy, varMap) {
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
     * @param {Scope} scope
     */
    resolveNames(scope) {}

    /**
     * @returns {UplcConst}
     */
    toUplc() {
        return new UplcConst(this.value)
    }
}
