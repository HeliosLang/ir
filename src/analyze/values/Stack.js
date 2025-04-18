/**
 * @typedef {import("./Branch.js").Branch} Branch
 * @typedef {import("./Branches.js").BranchesI} BranchesI
 * @typedef {import("./StackValues.js").StackValuesI} StackValuesI
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 * @typedef {import("./ValueI.js").ValueI} ValueI
 */

/**
 * @typedef {{
 *   branches: BranchesI
 *   recursive?: boolean
 * }} StackProps
 */

/**
 * A Stack doesn't have a unique id because it can be different per function
 */
export class Stack {
    /**
     * @readonly
     * @type {StackValuesI}
     */
    values

    /**
     * @readonly
     * @type {BranchesI}
     */
    branches

    /**
     * Lazily calculated
     * @private
     * @type {boolean | undefined}
     */
    _isLiteral

    /**
     * @param {StackValuesI} values
     * @param {BranchesI} branches
     */
    constructor(values, branches) {
        this.values = values
        this.branches = branches
        this._isLiteral = undefined
    }

    /**
     * @param {Branch} branch
     * @returns {Stack}
     */
    addBranch(branch) {
        const stack = new Stack(this.values, this.branches.addBranch(branch))
        stack._isLiteral = this._isLiteral
        return stack
    }

    /**
     * @param {Set<number>} s
     */
    collectFuncTags(s) {
        this.values.collectFuncTags(s)
    }

    /**
     * @param {number} tag
     * @param {number} depth
     * @returns {boolean}
     */
    containsFunc(tag, depth) {
        return this.values.containsFunc(tag, depth)
    }

    /**
     * @param {number} v
     * @returns {NonErrorValue}
     */
    getValue(v) {
        return this.values.getValue(v).withBranches(this.branches)
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        if (this._isLiteral === undefined) {
            this._isLiteral = this.values.isLiteral()
        }

        return this._isLiteral
    }

    /**
     * @param {BranchesI} branches
     * @returns {Stack}
     */
    withBranches(branches) {
        const stack = new Stack(this.values, branches)
        stack._isLiteral = this._isLiteral
        return stack
    }
}
