/**
 * @typedef {import("./Branches.js").BranchesI} BranchesI
 * @typedef {import("./ValueI.js").ValueI} ValueI
 */

/**
 * @implements {ValueI}
 */
export class DataValue {
    /**
     * @readonly
     * @type {number}
     */
    id

    /**
     * TODO: can we do this elsewhere? (this field polutes the evaluation process)
     * @readonly
     * @type {BranchesI}
     */
    branches

    /**
     * @param {number} id
     * @param {BranchesI} branches
     */
    constructor(id, branches) {
        this.id = id
        this.branches = branches
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
        return false
    }

    /**
     * @param {boolean} _anyAsFuncOnly
     * @returns {boolean}
     */
    isDataLike(_anyAsFuncOnly) {
        return true
    }

    /**
     * @param {ValueI} other
     * @returns {boolean}
     */
    isEqual(other) {
        if (other instanceof DataValue) {
            if (this.id != -1) {
                return other.id == this.id
            } else {
                return false
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
        if (this.id == -1) {
            return `Data`
        } else {
            return `Data${this.id}`
        }
    }

    /**
     * @param {BranchesI} branches
     * @returns {DataValue}
     */
    withBranches(branches) {
        return new DataValue(this.id, branches)
    }
}
