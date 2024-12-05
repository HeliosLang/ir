import { isDummySite } from "@helios-lang/compiler-utils"
import { makeUplcBuiltin, makeUplcForce } from "@helios-lang/uplc"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcTerm} UplcTerm
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
 * @typedef {import("./Scope.js").ScopeI} ScopeI
 * @typedef {import("./Variable.js").VariableI} VariableI
 */

/**
 * @implements {Expr}
 */
export class BuiltinExpr {
    /**
     * Builtin name without builtinsPrefix and without safeBuiltinSuffix
     * @readonly
     * @type {string}
     */
    name

    /**
     * @readonly
     * @type {number}
     */
    id

    /**
     * @readonly
     * @type {boolean}
     */
    safe

    /**
     * @readonly
     * @type {number}
     */
    nForce

    /**
     * @readonly
     * @type {Site}
     */
    site

    /**
     * @param {string} name - without builtinsPrefix and without safeBuiltinSuffix
     * @param {number} id
     * @param {boolean} safe
     * @param {number} nForce
     * @param {Site} site
     */
    constructor(name, id, safe, nForce, site) {
        this.name = name
        this.id = id
        this.safe = safe
        this.nForce = nForce
        this.site = site
    }

    get flatSize() {
        return 13 + 4 * this.nForce
    }

    /**
     * Used when inlining
     * @param {NotifyCopy} _notifyCopy
     * @param {Map<VariableI, VariableI>} _varMap
     * @returns {BuiltinExpr}
     */
    copy(_notifyCopy, _varMap) {
        return this
    }

    /**
     * @param {Expr} other
     * @returns {boolean}
     */
    isEqual(other) {
        return (
            other instanceof BuiltinExpr &&
            this.name == other.name &&
            this.id == other.id &&
            this.safe === other.safe &&
            this.nForce === other.nForce
        )
    }

    /**
     * @param {ScopeI} _scope
     */
    resolveNames(_scope) {}

    /**
     * @returns {UplcTerm}
     */
    toUplc() {
        const s = isDummySite(this.site) ? undefined : this.site

        /**
         * @type {UplcTerm}
         */
        let term = makeUplcBuiltin({ id: this.id, name: this.name, site: s })

        for (let i = 0; i < this.nForce; i++) {
            term = makeUplcForce({ arg: term, site: s })
        }

        return term
    }
}
