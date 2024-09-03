import { Branches } from "./Branches.js"
import { FuncValue } from "./FuncValue.js"

/**
 * @typedef {import("./ValueI.js").ValueI} ValueI
 */

/**
 * @implements {ValueI}
 */
export class ErrorValue {
    constructor() {}

    /**
     * @param {number} tag
     * @param {number} depth
     * @returns {boolean}
     */
    containsFunc(tag, depth) {
        return false
    }

    /**
     * @param {Set<number>} s
     */
    collectFuncTags(s) {}

    /**
     * @param {Map<string, FuncValue>} m
     */
    collectFuncValues(m) {}

    /**
     * @param {boolean} anyAsDataOnly
     * @returns {boolean}
     */
    isCallable(anyAsDataOnly) {
        return false
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
        return other instanceof ErrorValue
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return false
    }

    /**
     * @returns {string}
     */
    toString() {
        return `Error`
    }

    /**
     * @param {Branches} branches
     * @returns {ErrorValue}
     */
    withBranches(branches) {
        return this
    }
}
