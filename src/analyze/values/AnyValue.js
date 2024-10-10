/**
 * @typedef {import("./Branches.js").BranchesI} BranchesI
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
     * @param {Set<number>} _s
     */
    collectFuncTags(_s) {}

    collectFuncValues() {}

    /**
     * @param {number} _tag
     * @param {number} _depth
     * @returns {boolean}
     */
    containsFunc(_tag, _depth) {
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
     * @param {ValueI} other
     * @returns {boolean}
     */
    isEqual(other) {
        if (other instanceof AnyValue) {
            if (this.id == -1) {
                return false
            } else {
                return this.id == other.id
            }
        } else {
            return false
        }
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

    /**
     * @param {BranchesI} _branches
     * @returns {AnyValue}
     */
    withBranches(_branches) {
        return this
    }
}
