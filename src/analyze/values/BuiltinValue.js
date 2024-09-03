import { Branches } from "./Branches.js"

/**
 * @typedef {import("./ValueI.js").ValueI} ValueI
 */

/**
 * @implements {ValueI}
 */
export class BuiltinValue {
    /**
     * @readonly
     * @type {string}
     */
    name

    /**
     * @readonly
     * @type {boolean}
     */
    safe

    /**
     * @param {string} name
     * @param {boolean} safe
     */
    constructor(name, safe) {
        this.name = name
        this.safe = safe
    }

    /**
     * @param {Set<number>} s
     */
    collectFuncTags(s) {}

    collectFuncValues() {}

    /**
     * @param {number} tag
     * @param {number} depth
     * @returns {boolean}
     */
    containsFunc(tag, depth) {
        return false
    }

    /**
     * @param {boolean} anyAsDataOnly
     * @returns {boolean}
     */
    isCallable(anyAsDataOnly) {
        return true
    }

    /**
     * @param {boolean} anyAsFuncOnly
     * @returns {boolean}
     */
    isDataLike(anyAsFuncOnly) {
        return false
    }

    /**
     * @param {ValueI} other
     * @returns {boolean}
     */
    isEqual(other) {
        return (
            other instanceof BuiltinValue &&
            this.name == other.name &&
            this.safe === other.safe
        )
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return true
    }

    /**
     * @returns {string}
     */
    toString() {
        if (this.safe) {
            return `${this.name}__safe`
        } else {
            return this.name
        }
    }

    /**
     * @param {Branches} branches
     * @returns {BuiltinValue}
     */
    withBranches(branches) {
        return this
    }
}
