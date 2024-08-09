/**
 * @typedef {import("./ValueI.js").ValueI} ValueI
 */

/**
 * Can be Data of any function
 * Simply eliminated when encountered in an MultiValue
 * @implements {ValueI}
 */
export class AnyValue {
    /**
     * @readonly
     * @type {number}
     */
    id

    /**
     * @readonly
     * @type {boolean}
     */
    isNeverError

    /**
     * @param {number} id
     * @param {boolean} isNeverError
     */
    constructor(id, isNeverError = false) {
        this.id = id
        this.isNeverError = isNeverError
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
        return !anyAsDataOnly
    }

    /**
     * @param {boolean} anyAsFuncOnly
     * @returns {boolean}
     */
    isDataLike(anyAsFuncOnly) {
        return !anyAsFuncOnly
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
        return `Any${this.id}`
    }
}
