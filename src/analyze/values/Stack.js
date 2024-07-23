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
     * @type {Option<boolean>}
     */
    #isLiteral

    /**
     * @param {StackValues} values
     * @param {Branches} branches
     */
    constructor(values, branches) {
        this.values = values
        this.branches = branches
        this.#isLiteral = None
    }

    /**
     * @param {Branch} branch
     * @returns {Stack}
     */
    addBranch(branch) {
        const stack = new Stack(this.values, this.branches.addBranch(branch))
        stack.#isLiteral = this.#isLiteral
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
        return this.values.getValue(v)
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        if (isNone(this.#isLiteral)) {
            this.#isLiteral = this.values.isLiteral()
        }

        return this.#isLiteral
    }
}
