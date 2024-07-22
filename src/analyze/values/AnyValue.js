/**
 * @typedef {import("./IdGenerator.js").IdGenerator} IdGenerator
 * @typedef {import("./ValueI.js").BlockRecursionProps} BlockRecursionProps
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
     * @param {number} id
     */
    constructor(id) {
        this.id = id
    }

    /**
     * @param {BlockRecursionProps} props
     * @returns {[AnyValue, string]}
     */
    blockRecursion({ keyPath, genId }) {
        const key = keyPath
        const id = genId.genId(key)
        const v = new AnyValue(id)

        return [v, v.toString()]
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
}
