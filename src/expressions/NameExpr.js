import { Word } from "@helios-lang/compiler-utils"
import { builtinsV2, UplcVar } from "@helios-lang/uplc"
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

    #name

    /**
     * Cached debruijn index
     * @type {Option<number>}
     */
    index

    /**
     * Cached variable
     * @type {Option<Variable>}
     */
    #variable

    /**
     * @param {Word} name
     * @param {Option<Variable>} variable
     */
    constructor(name, variable = null) {
        this.site = name.site

        if (name.toString() == "_" || name.toString().startsWith("undefined")) {
            throw new Error("unexpected")
        }

        this.#name = name
        this.index = null
        this.#variable = variable
    }

    /**
     * @type {string}
     */
    get name() {
        return this.#name.toString()
    }

    /**
     * isVariable() should be used to check if a IRNameExpr.variable is equal to a IRVariable (includes special handling of "__core*")
     * @type {Variable}
     */
    get variable() {
        if (!this.#variable) {
            throw new Error(`variable should be set (name: ${this.name})`)
        } else {
            return this.#variable
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
        const variable = this.#variable
            ? varMap.get(this.#variable) ?? this.#variable
            : this.#variable

        const newExpr = new NameExpr(this.#name, variable)

        notifyCopy(this, newExpr)

        return newExpr
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
        if (this.#variable == null || this.isParam()) {
            ;[this.index, this.#variable] = scope.get(this.#name)
        } else {
            ;[this.index, this.#variable] = scope.get(this.#variable)
        }
    }

    /**
     * @returns {UplcTerm}
     */
    toUplc() {
        if (!this.index) {
            // use a dummy index (for size calculation)
            return new UplcVar(0, this.name, this.site)
        } else {
            return new UplcVar(this.index, this.name, this.site)
        }
    }
}
