import { FuncValue } from "./FuncValue.js"
import { Branches } from "./Branches.js"
import { DataValue } from "./DataValue.js"

/**
 * @typedef {import("./ValueI.js").ValueI} ValueI
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 */

/**
 * @implements {ValueI}
 */
export class MaybeErrorValue {
    /**
     * @readonly
     * @type {NonErrorValue}
     */
    value

    /**
     * @param {NonErrorValue} value
     */
    constructor(value) {
        this.value = value
    }

    /**
     * @param {Set<number>} s
     */
    collectFuncTags(s) {
        this.value.collectFuncTags(s)
    }

    /**
     * @param {Map<string, FuncValue>} m
     */
    collectFuncValues(m) {
        this.value.collectFuncValues(m)
    }

    /**
     * @param {number} tag
     * @param {number} depth
     * @returns {boolean}
     */
    containsFunc(tag, depth) {
        return this.value.containsFunc(tag, depth)
    }

    /**
     * @param {boolean} anyAsDataOnly
     * @returns {boolean}
     */
    isCallable(anyAsDataOnly) {
        return this.value.isCallable(anyAsDataOnly)
    }

    /**
     * @param {boolean} anyAsFuncOnly
     * @returns {boolean}
     */
    isDataLike(anyAsFuncOnly) {
        return this.value.isDataLike(anyAsFuncOnly)
    }

    /**
     * @param {ValueI} other
     * @returns {boolean}
     */
    isEqual(other) {
        if (other instanceof MaybeErrorValue) {
            return this.value.isEqual(other.value)
        } else {
            return false
        }
    }

    /**
     *
     * @returns {boolean}
     */
    isLiteral() {
        return false
    }

    /**
     * @returns {string}
     */
    toString() {
        return makeMaybeErrorKey(this.value.toString())
    }

    /**
     * @param {Branches} branches
     * @returns {MaybeErrorValue}
     */
    withBranches(branches) {
        return new MaybeErrorValue(this.value.withBranches(branches))
    }
}

/**
 * @param {string} valueKey
 * @returns {string}
 */
function makeMaybeErrorKey(valueKey) {
    return `(${valueKey} | Error)`
}
