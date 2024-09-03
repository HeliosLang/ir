import { Branches } from "./Branches.js"
import { Stack } from "./Stack.js"
/**
 * @typedef {import("./Branch.js").Branch} Branch
 * @typedef {import("./ValueI.js").ValueI} ValueI
 * @typedef {import("./Value.js").DataLikeValue} DataLikeValue
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 */

/**
 * @implements {ValueI}
 */
export class FuncValue {
    /**
     * @readonly
     * @type {number}
     */
    definitionTag

    /**
     * @readonly
     * @type {Stack}
     */
    stack

    /**
     * Stringifying a Stack and giving it a unique id is a complex process, and left to the caller
     * @readonly
     * @type {number}
     */
    stackSummary

    /**
     * @param {number} definitionTag
     * @param {Stack} stack
     * @param {number} stackSummary
     */
    constructor(definitionTag, stack, stackSummary) {
        this.definitionTag = definitionTag
        this.stack = stack
        this.stackSummary = stackSummary
    }

    /**
     * @param {Branch} branch
     * @returns {FuncValue}
     */
    addBranch(branch) {
        return new FuncValue(
            this.definitionTag,
            this.stack.addBranch(branch),
            this.stackSummary
        )
    }

    /**
     * @param {Branches} branches
     * @returns {FuncValue}
     */
    withBranches(branches) {
        return new FuncValue(
            this.definitionTag,
            this.stack.withBranches(branches),
            this.stackSummary
        )
    }

    /**
     * @param {Set<number>} s
     */
    collectFuncTags(s) {
        s.add(this.definitionTag)
    }

    /**
     * @param {Map<string, FuncValue>} m
     */
    collectFuncValues(m) {
        m.set(this.toString(), this)
    }

    /**
     * @param {number} tag
     * @param {number} depth
     * @returns {boolean}
     */
    containsFunc(tag, depth) {
        if (this.definitionTag == tag) {
            return depth == 0 ? true : this.stack.containsFunc(tag, depth - 1)
        } else {
            return this.stack.containsFunc(tag, depth)
        }
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
            other instanceof FuncValue &&
            this.definitionTag == other.definitionTag &&
            this.stackSummary == other.stackSummary
        )
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return this.stack.isLiteral()
    }

    /**
     * @returns {string}
     */
    toString() {
        return `Fn${this.definitionTag}.${this.stackSummary}`
    }
}
