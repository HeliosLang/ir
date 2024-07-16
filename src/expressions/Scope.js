import { CompilerError, Word } from "@helios-lang/compiler-utils"
import { Variable } from "./Variable.js"

/**
 * Setting the dummy variable allows resolving names before injecting the recursive dependencies
 * Setting variable==None and notifyFuncExpr allows a Scope to be used for functions that don't have any arguments but still would like to know about all the variables being referenced in their scope
 * @typedef {{
 *   dummyVariable?: Variable
 *   notifyFuncExpr?: (v: Variable) => void
 * }} ScopeOptions
 */

/**
 * Scope for IR names.
 * Works like a stack of named values from which a Debruijn index can be derived
 */
export class Scope {
    /**
     * @readonly
     * @type {Option<Scope>}
     */
    parent

    /**
     * Variable name (can be null if no usable variable defined at this level)
     * @readonly
     * @type {Option<Variable>}
     */
    variable

    /**
     * @type {ScopeOptions}
     */

    /**
     * @param {Option<Scope>} parent
     * @param {Option<Variable>} variable
     * @param {ScopeOptions} options
     */
    constructor(parent, variable, options = {}) {
        this.parent = parent
        this.variable = variable
        this.options = options
    }

    /**
     * Calculates the Debruijn index of a named value. Internal method
     * @param {Word | Variable} name
     * @param {number} index
     * @returns {[number, Variable]}
     */
    getInternal(name, index) {
        /**
         * @type {Variable}
         */
        let variable

        if (this.variable && this.variable.isEqual(name)) {
            variable = this.variable
        } else if (!this.parent) {
            if (this.options.dummyVariable) {
                index = -1
                variable = this.options.dummyVariable
            } else {
                throw CompilerError.reference(
                    name.site,
                    `variable ${name.toString()} not found`
                )
            }
        } else {
            ;[index, variable] = this.parent.getInternal(
                name,
                this.variable ? index + 1 : index
            )
        }

        if (this.options.notifyFuncExpr) {
            this.options.notifyFuncExpr(variable)
        }

        return [index, variable]
    }

    /**
     * Calculates the Debruijn index.
     * @param {Word | Variable} name
     * @returns {[number, Variable]}
     */
    get(name) {
        // one-based
        return this.getInternal(name, 1)
    }

    /**
     * @param {ScopeOptions} options
     * @returns {Scope}
     */
    withOptions(options) {
        return new Scope(this.parent, this.variable, options)
    }
}
