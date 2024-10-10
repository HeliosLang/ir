import { FuncValue } from "./FuncValue.js"

/**
 * @typedef {import("./Branches.js").BranchesI} BranchesI
 * @typedef {import("./ValueI.js").ValueI} ValueI
 */

/**
 * @implements {ValueI}
 */
export class ErrorValue {
    constructor() {}

    /**
     * @param {number} _tag
     * @param {number} _depth
     * @returns {boolean}
     */
    containsFunc(_tag, _depth) {
        return false
    }

    /**
     * @param {Set<number>} _s
     */
    collectFuncTags(_s) {}

    /**
     * @param {Map<string, FuncValue>} _m
     */
    collectFuncValues(_m) {}

    /**
     * @param {boolean} _anyAsDataOnly
     * @returns {boolean}
     */
    isCallable(_anyAsDataOnly) {
        return false
    }

    /**
     * @param {boolean} _anyAsFuncOnly
     * @returns {boolean}
     */
    isDataLike(_anyAsFuncOnly) {
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
     * @param {BranchesI} _branches
     * @returns {ErrorValue}
     */
    withBranches(_branches) {
        return this
    }
}
