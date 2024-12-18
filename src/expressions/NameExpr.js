import { isDummySite, makeWord } from "@helios-lang/compiler-utils"
import { makeUplcVar } from "@helios-lang/uplc"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/compiler-utils").Word} Word
 * @typedef {import("@helios-lang/uplc").UplcTerm} UplcTerm
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
 * @typedef {import("./Scope.js").ScopeI} ScopeI
 * @typedef {import("./Variable.js").VariableI} VariableI
 */

/**
 * @typedef {Expr & {
 *   index: number | undefined
 *   name: string
 *   variable: VariableI
 *   isVariable(ref: VariableI): boolean
 * }} NameExprI
 */

/**
 * Intermediate Representation variable reference expressions
 * @implements {NameExprI}
 */
export class NameExpr {
    /**
     * @readonly
     * @type {Site}
     */
    site

    /**
     * Cached debruijn index
     * @type {number | undefined}
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
     * @type {VariableI | undefined}
     */
    _variable

    /**
     * @param {Word} name
     * @param {VariableI | undefined} variable
     */
    constructor(name, variable = undefined) {
        this.site = name.site

        if (name.toString() == "_" || name.toString().startsWith("undefined")) {
            throw new Error("unexpected")
        }

        this.index = undefined
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
        this._name = makeWord({ value: n, site: this._name.site })
    }

    /**
     * isVariable() should be used to check if a IRNameExpr.variable is equal to a IRVariable (includes special handling of "__core*")
     * @type {VariableI}
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
     * @param {Map<VariableI, VariableI>} varMap
     * @returns {NameExprI}
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
        // TODO: give NameExpr a `kind` field
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
     * @param {VariableI} ref
     * @returns {boolean}
     */
    isVariable(ref) {
        return this.variable === ref
    }

    /**
     * @param {ScopeI} scope
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
        const s = isDummySite(this.site) ? undefined : this.site

        // prefer the description if it is available (only used for debugging anyway, not for name resolution)
        let name = this.name
        if (this._variable && this._variable.name.site.description) {
            name = this._variable.name.site.description
        }

        if (!this.index) {
            // use a dummy index (for program size calculation)
            return makeUplcVar({ index: 0, name, site: s })
        } else {
            return makeUplcVar({ index: this.index, name, site: s })
        }
    }
}
