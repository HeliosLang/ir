import { makeReferenceError } from "@helios-lang/compiler-utils"

/**
 * @import { CompilerError, Word } from "@helios-lang/compiler-utils"
 * @typedef {import("./Variable.js").VariableI} VariableI
 */

/**
 * Setting the dummy variable allows resolving names before injecting the recursive dependencies
 * Setting variable==None and notifyFuncExpr allows a Scope to be used for functions that don't have any arguments but still would like to know about all the variables being referenced in their scope
 * @typedef {{
 *   dummyVariable?: VariableI
 *   notifyFuncExpr?: (v: VariableI) => void
 * }} ScopeOptions
 */

/**
 * TODO: cleanup getInternal() and notifyFuncExprInternal so that it makes more sense to someone implementing this interface
 * @typedef {{
 *   parent: ScopeI | undefined
 *   variable: VariableI | undefined
 *   get(name: Word | VariableI): [number, VariableI]
 *   notifyFuncExprInternal(variable: VariableI): void
 *   getInternal(name: Word | VariableI, index: number): [number, VariableI]
 * }} ScopeI
 */

/**
 * Scope for IR names.
 * Works like a stack of named values from which a Debruijn index can be derived
 */
export class Scope {
    /**
     * @readonly
     * @type {ScopeI | undefined}
     */
    parent

    /**
     * Variable name (can be null if no usable variable defined at this level)
     * @readonly
     * @type {VariableI | undefined}
     */
    variable

    /**
     * @readonly
     * @type {ScopeOptions}
     */
    options

    /**
     * @param {ScopeI | undefined} parent
     * @param {VariableI | undefined} variable
     * @param {ScopeOptions} options
     */
    constructor(parent, variable, options = {}) {
        this.parent = parent
        this.variable = variable
        this.options = options
    }

    /**
     * Calculates the Debruijn index of a named value. Internal method
     * @internal
     * @param {Word | VariableI} name
     * @param {number} index
     * @returns {[number, VariableI]}
     */
    getInternal(name, index) {
        if (this.variable && this.variable.isEqual(name)) {
            return [index, this.variable]
        } else if (!this.parent) {
            if (this.options.dummyVariable) {
                return [-1, this.options.dummyVariable]
            } else {
                throw makeReferenceError(
                    name.site,
                    `variable ${name.toString()} not found`
                )
            }
        } else {
            return this.parent.getInternal(
                name,
                this.variable ? index + 1 : index
            )
        }
    }

    /**
     * Calculates the Debruijn index.
     * @param {Word | VariableI} name
     * @returns {[number, VariableI]}
     */
    get(name) {
        // one-based
        const [index, variable] = this.getInternal(name, 1)

        this.notifyFuncExprInternal(variable)

        return [index, variable]
    }

    /**
     * @internal
     * @param {VariableI} variable
     */
    notifyFuncExprInternal(variable) {
        if (this.options.notifyFuncExpr) {
            this.options.notifyFuncExpr(variable)
        }

        if (this.parent) {
            this.parent.notifyFuncExprInternal(variable)
        }
    }

    /**
     * @param {ScopeOptions} options
     * @returns {Scope}
     */
    withOptions(options) {
        return new Scope(this.parent, this.variable, options)
    }
}
