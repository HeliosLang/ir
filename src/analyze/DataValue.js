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
     * @param {number} id
     */
    constructor(id) {
        this.id = id
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
