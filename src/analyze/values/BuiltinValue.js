/**
 * @typedef {import("./Branches.js").BranchesI} BranchesI
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
     * @param {boolean} _anyAsDataOnly
     * @returns {boolean}
     */
    isCallable(_anyAsDataOnly) {
        return true
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
     * @param {BranchesI} _branches
     * @returns {BuiltinValue}
     */
    withBranches(_branches) {
        return this
    }
}
