/**
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").ValueCodeMapperI} ValueCodeMapperI
 */

/**
 * @implements {Value}
 */
export class ErrorValue {
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
        return true
    }

    /**
     * @returns {string}
     */
    toString() {
        return `Error`
    }

    /**
     * @param {ValueCodeMapperI} codeMapper
     * @param {number} depth
     * @returns {any}
     */
    dump(codeMapper, depth = 0) {
        return {
            type: "Error",
            code: codeMapper.getCode(this)
        }
    }
}
