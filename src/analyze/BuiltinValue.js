import { BuiltinExpr } from "../expressions/index.js"

/**
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").ValueCodeMapperI} ValueCodeMapperI
 */

/**
 * @implements {Value}
 */
export class BuiltinValue {
    /**
     * @readonly
     * @type {BuiltinExpr}
     */
    builtin

    /**
     * @param {BuiltinExpr} builtin
     */
    constructor(builtin) {
        this.builtin = builtin
    }

    /**
     * @type {string}
     */
    get builtinName() {
        return this.builtin.name
    }

    /**
     * @param {Value} other
     * @returns {boolean}
     */
    isEqual(other) {
        return (
            other instanceof BuiltinValue &&
            other.builtinName == this.builtinName
        )
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return true
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
        return `Builtin__${this.builtinName}`
    }

    /**
     * @param {ValueCodeMapperI} codeMapper
     * @param {number} depth
     * @returns {any}
     */
    dump(codeMapper, depth = 0) {
        return {
            type: "Builtin",
            code: codeMapper.getCode(this),
            name: this.builtin.name
        }
    }
}
