/**
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").ValueCodeMapperI} ValueCodeMapperI
 */

/**
 * Can be Data of any function
 * Simply eliminated when encountered in an MultiValue
 * @implements {Value}
 */
export class AnyValue {
    /**
     * @param {Value} other
     * @returns {boolean}
     */
    isEqual(other) {
        return true
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return false
    }

    /**
     * Maybe this IRAnyValue instance represents an Error, we can't know for sure.
     * @param {boolean} maybe
     * @returns {boolean}
     */
    hasError(maybe = true) {
        return maybe
    }

    /**
     * @returns {string}
     */
    toString() {
        return `Any`
    }

    /**
     * @param {ValueCodeMapperI} codeMapper
     * @param {number} depth
     * @returns {any}
     */
    dump(codeMapper, depth = 0) {
        return {
            type: "Any",
            code: codeMapper.getCode(this)
        }
    }
}
