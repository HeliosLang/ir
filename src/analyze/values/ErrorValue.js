import { FuncValue } from "./FuncValue.js"

/**
 * @typedef {import("./IdGenerator.js").IdGenerator} IdGenerator
 * @typedef {import("./ValueI.js").BlockRecursionProps} BlockRecursionProps
 * @typedef {import("./ValueI.js").ValueI} ValueI
 */

/**
 * @implements {ValueI}
 */
export class ErrorValue {
    constructor() {}

    /**
     * @param {BlockRecursionProps} props
     * @returns {[ErrorValue, string]}
     */
    blockRecursion(props) {
        return [this, this.toString()]
    }

    /**
     * @param {number} tag
     * @param {number} depth
     * @returns {boolean}
     */
    containsFunc(tag, depth) {
        return false
    }

    /**
     * @param {Set<number>} s
     */
    collectFuncTags(s) {}

    /**
     * @param {Map<string, FuncValue>} m
     */
    collectFuncValues(m) {}

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
        return false
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
        return `Error`
    }
}
