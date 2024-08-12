import { Word } from "@helios-lang/compiler-utils"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/compiler-utils").Token} Token
 */

/**
 * Represents a function argument
 * @implements {Token}
 */
export class Variable {
    /**
     * Mutation of `name` is used to change the name to a globally unique name
     * (mutation of this field is much easier and faster than creating a new Variable instance)
     * @readwrite
     * @type {Word}
     */
    name

    /**
     * @param {Word} name
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
     * @param {Map<Variable, Variable>} newVars
     * @returns {Variable}
     */
    copy(newVars) {
        const newVar = new Variable(this.name)

        newVars.set(this, newVar)

        return newVar
    }

    /**
     * @param {Word | Variable} other
     * @returns {boolean}
     */
    isEqual(other) {
        return other instanceof Word
            ? this.name.isEqual(other)
            : this.name.isEqual(other.name)
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.name.toString()
    }
}
