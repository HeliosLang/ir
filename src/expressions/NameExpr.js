import { TokenSite, Word } from "@helios-lang/compiler-utils"
import { None } from "@helios-lang/type-utils"
import { UplcVar } from "@helios-lang/uplc"
import { Scope } from "./Scope.js"
import { Variable } from "./Variable.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcTerm} UplcTerm
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
 */

/**
 * Intermediate Representation variable reference expressions
 * @implements {Expr}
 */
export class NameExpr {
    /**
     * @readonly
     * @type {Site}
     */
    site

    /**
     * Cached debruijn index
     * @type {Option<number>}
     */
    index

    /**
     * @private
     * @readwrite
     * @type {Word}
     */
    _name

    /**
     * Cached variable
     * @private
     * @type {Option<Variable>}
     */
    _variable

    /**
     * @param {Word} name
     * @param {Option<Variable>} variable
     */
    constructor(name, variable = null) {
        this.site = name.site

        if (name.toString() == "_" || name.toString().startsWith("undefined")) {
            throw new Error("unexpected")
        }

        this.index = null
        this._name = name
        this._variable = variable
    }

    /**
     * @type {string}
     */
    get name() {
        return this._name.toString()
    }

    /**
     * @param {string} n
     */
    set name(n) {
        this._name = new Word(n, this._name.site)
    }

    /**
     * isVariable() should be used to check if a IRNameExpr.variable is equal to a IRVariable (includes special handling of "__core*")
     * @type {Variable}
     */
    get variable() {
        if (!this._variable) {
            throw new Error(`variable should be set (name: ${this.name})`)
        } else {
            return this._variable
        }
    }

    /**
     * @type {number}
     */
    get flatSize() {
        return 13 // 4 for term header, and assume DeBruijn index fits in 7 bits
    }

    /**
     * Used when inlining
     * @param {NotifyCopy} notifyCopy
     * @param {Map<Variable, Variable>} varMap
     * @returns {NameExpr}
     */
    copy(notifyCopy, varMap) {
        const variable = this._variable
            ? (varMap.get(this._variable) ?? this._variable)
            : this._variable

        const newExpr = new NameExpr(this._name, variable)

        notifyCopy(this, newExpr)

        return newExpr
    }

    /**
     * @param {Expr} other
     * @returns {boolean}
     */
    isEqual(other) {
        return other instanceof NameExpr && this.name == other.name
    }

    /**
     * @internal
     * @returns {boolean}
     */
    isParam() {
        return this.name.startsWith("__PARAM")
    }

    /**
     * @param {Variable} ref
     * @returns {boolean}
     */
    isVariable(ref) {
        return this.variable === ref
    }

    /**
     * @param {Scope} scope
     */
    resolveNames(scope) {
        if (this._variable == null || this.isParam()) {
            ;[this.index, this._variable] = scope.get(this._name)
        } else {
            try {
                ;[this.index, this._variable] = scope.get(this._variable)
            } catch (_e) {
                ;[this.index, this._variable] = scope.get(this._name)
            }
        }
    }

    /**
     * @returns {UplcTerm}
     */
    toUplc() {
        const s = TokenSite.isDummy(this.site) ? None : this.site

        // prefer the alias if it is available (only used for debugging anyway, not for name resolution)
        let name = this.name
        if (this._variable && this._variable.name.site.alias) {
            name = this._variable.name.site.alias
        }

        if (!this.index) {
            // use a dummy index (for program size calculation)
            return new UplcVar(0, name, s)
        } else {
            return new UplcVar(this.index, name, s)
        }
    }
}
