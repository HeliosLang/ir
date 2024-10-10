/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/compiler-utils").Token} Token
 * @typedef {import("@helios-lang/compiler-utils").WordI} WordI
 */

/**
 * @typedef {{
 *   name: WordI
 *   site: Site
 *   copy(newVars: Map<VariableI, VariableI>): VariableI
 *   isEqual(other: WordI | VariableI): boolean
 *   toString(preferAlias?: boolean): string
 * }} VariableI
 */

/**
 * Represents a function argument
 * @implements {VariableI}
 */
export class Variable {
    /**
     * Mutation of `name` is used to change the name to a globally unique name
     * (mutation of this field is much easier and faster than creating a new Variable instance)
     * @readwrite
     * @type {WordI}
     */
    name

    /**
     * @param {WordI} name
     */
    constructor(name) {
        this.name = name
    }

    /**
     * @type {Site}
     */
    get site() {
        return this.name.site
    }

    /**
     * @param {Map<VariableI, VariableI>} newVars
     * @returns {VariableI}
     */
    copy(newVars) {
        const newVar = new Variable(this.name)

        newVars.set(this, newVar)

        return newVar
    }

    /**
     * @param {WordI | VariableI} other
     * @returns {boolean}
     */
    isEqual(other) {
        if ("kind" in other) {
            return this.name.isEqual(other)
        } else {
            return this.name.isEqual(other.name)
        }
    }

    /**
     * @param {boolean} preferAlias
     * @returns {string}
     */
    toString(preferAlias = false) {
        const alias = this.name.site.alias

        if (alias && preferAlias) {
            return alias
        } else {
            return this.name.toString()
        }
    }
}
