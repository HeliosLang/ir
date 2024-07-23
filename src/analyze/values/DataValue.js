import { Branches } from "./Branches.js"
import { AnyValue } from "./AnyValue.js"
import { LiteralValue } from "./LiteralValue.js"

/**
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
     * @type {Branches}
     */
    branches

    /**
     * @param {number} id
     * @param {Branches} branches
     */
    constructor(id, branches) {
        this.id = id
        this.branches = branches
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
        return false
    }

    /**
     * @param {boolean} anyAsFuncOnly
     * @returns {boolean}
     */
    isDataLike(anyAsFuncOnly) {
        return true
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
}