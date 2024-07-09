import { Branches } from "./Branches.js"

/**
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").ValueCodeMapperI} ValueCodeMapperI
 */

/**
 * @implements {Value}
 */
export class DataValue {
    /**
     * @readonly
     * @type {number}
     */
    id

    /**
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
     * @param {Value} other
     * @returns {boolean}
     */
    isEqual(other) {
        return other instanceof DataValue && other.id == this.id
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return false
    }

    /**
     * @param {boolean} maybe
     * @returns {boolean}
     */
    hasError(maybe = true) {
        return false
    }

    /**
     * @returns {string}
     */
    toString() {
        return `Data${this.id}`
    }

    /**
     * @param {ValueCodeMapperI} codeMapper
     * @param {number} depth
     * @returns
     */
    dump(codeMapper, depth = 0) {
        return {
            code: codeMapper.getCode(this),
            type: "Data"
        }
    }
}
