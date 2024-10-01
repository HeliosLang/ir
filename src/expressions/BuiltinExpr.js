import { TokenSite } from "@helios-lang/compiler-utils"
import { None } from "@helios-lang/type-utils"
import { UplcBuiltin, UplcForce } from "@helios-lang/uplc"
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
export class BuiltinExpr {
    /**
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
     * @param {NotifyCopy} notifyCopy
     * @param {Map<Variable, Variable>} varMap
     * @returns {BuiltinExpr}
     */
    copy(notifyCopy, varMap) {
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
     * @param {Scope} scope
     */
    resolveNames(scope) {}

    /**
     * @returns {UplcTerm}
     */
    toUplc() {
        const s = TokenSite.isDummy(this.site) ? None : this.site

        /**
         * @type {UplcTerm}
         */
        let term = new UplcBuiltin(this.id, s)

        for (let i = 0; i < this.nForce; i++) {
            term = new UplcForce(term, s)
        }

        return term
    }
}
