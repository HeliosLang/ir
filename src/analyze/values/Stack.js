import { None, isNone } from "@helios-lang/type-utils"
import { Branches } from "./Branches.js"
import { StackValues } from "./StackValues.js"

/**
 * @typedef {import("./Branch.js").Branch} Branch
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 * @typedef {import("./ValueI.js").ValueI} ValueI
 */

/**
 * @typedef {{
 *   branches: Branches
 *   recursive?: boolean
 * }} StackProps
 */

/**
 * A Stack doesn't have a unique id because it can be different per function
 */
export class Stack {
    /**
     * @readonly
     * @type {StackValues}
     */
    values

    /**
     * @readonly
     * @type {Branches}
     */
    branches

    /**
     * Lazily calculated
     * @private
     * @type {Option<boolean>}
     */
    _isLiteral

    /**
     * @param {StackValues} values
     * @param {Branches} branches
     */
    constructor(values, branches) {
        this.values = values
        this.branches = branches
        this._isLiteral = None
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
        if (isNone(this._isLiteral)) {
            this._isLiteral = this.values.isLiteral()
        }

        return this._isLiteral
    }

    /**
     * @param {Branches} branches
     * @returns {Stack}
     */
    withBranches(branches) {
        const stack = new Stack(this.values, branches)
        stack._isLiteral = this._isLiteral
        return stack
    }
}
