import {
    UplcBool,
    UplcByteArray,
    UplcDataValue,
    UplcInt,
    UplcList,
    UplcUnit
} from "@helios-lang/uplc"
import { DataValue } from "./DataValue.js"
import { AnyValue } from "./AnyValue.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcData} UplcData
 * @typedef {import("@helios-lang/uplc").UplcValue} UplcValue
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").ValueCodeMapperI} ValueCodeMapperI
 */

/**
 * @implements {Value}
 */
export class LiteralValue {
    /**
     * @readonly
     */
    value

    /**
     * @param {UplcValue} value
     */
    constructor(value) {
        this.value = value
    }

    /**
     * @type {boolean}
     */
    get bool() {
        if (!(this.value instanceof UplcBool)) {
            throw new Error("unexpected")
        }

        return this.value.bool
    }

    /**
     * @type {number[]}
     */
    get bytes() {
        if (!(this.value instanceof UplcByteArray)) {
            throw new Error("expected bytes")
        }

        return this.value.bytes
    }

    /**
     * @type {UplcData}
     */
    get data() {
        if (!(this.value instanceof UplcDataValue)) {
            throw new Error("expected data")
        }

        return this.value.value
    }

    /**
     * @type {bigint}
     */
    get int() {
        if (!(this.value instanceof UplcInt)) {
            throw new Error("expected int")
        }

        return this.value.value
    }

    /**
     * @type {UplcValue[]}
     */
    get items() {
        if (!(this.value instanceof UplcList)) {
            throw new Error("expected list")
        }

        return this.value.items
    }

    /**
     * @param {boolean} maybe
     * @returns {boolean}
     */
    hasError(maybe = true) {
        return false
    }

    /**
     * @param {Value} other
     * @returns {boolean}
     */
    isEqual(other) {
        return other instanceof LiteralValue && other.value.isEqual(this.value)
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return true
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.value.toString()
    }

    /**
     * @param {ValueCodeMapperI} codeMapper
     * @param {number} depth
     * @returns {any}
     */
    dump(codeMapper, depth = 0) {
        return {
            type: "Literal",
            code: codeMapper.getCode(this),
            value: this.toString()
        }
    }
}
