import { Branches } from "./Branches.js"
import { AnyValue } from "./AnyValue.js"
import { LiteralValue } from "./LiteralValue.js"

/**
 * @typedef {import("./IdGenerator.js").IdGenerator} IdGenerator
 * @typedef {import("./ValueI.js").BlockRecursionProps} BlockRecursionProps
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
     * @param {BlockRecursionProps} props
     * @returns {[DataValue, string]}
     */
    blockRecursion({ keyPath, genId }) {
        const key = keyPath
        const id = genId.genId(key)
        const v = new DataValue(id, Branches.empty())

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
