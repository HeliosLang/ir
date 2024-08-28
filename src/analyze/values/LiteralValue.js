import {
    UplcBool,
    UplcByteArray,
    UplcDataValue,
    UplcInt,
    UplcList
} from "@helios-lang/uplc"

/**
 * @typedef {import("@helios-lang/uplc").UplcData} UplcData
 * @typedef {import("@helios-lang/uplc").UplcValue} UplcValue
 * @typedef {import("./ValueI.js").ValueI} ValueI
 */

/**
 * @implements {ValueI}
 */
export class LiteralValue {
    /**
     * @readonly
     * @type {UplcValue}
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
        if (this.value.kind != "bool") {
            throw new Error("unexpected")
        }

        return this.value.bool
    }

    /**
     * @type {number[]}
     */
    get bytes() {
        if (this.value.kind != "bytes") {
            throw new Error("expected bytes")
        }

        return this.value.bytes
    }

    /**
     * @type {UplcData}
     */
    get data() {
        if (this.value.kind != "data") {
            throw new Error("expected data")
        }

        return this.value.value
    }

    /**
     * @type {bigint}
     */
    get int() {
        if (this.value.kind != "int") {
            throw new Error("expected int")
        }

        return this.value.value
    }

    /**
     * @type {UplcValue[]}
     */
    get items() {
        if (this.value.kind != "list") {
            throw new Error("expected list")
        }

        return this.value.items
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
        return true
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.value.toString()
    }
}
