/**
 * @typedef {import("@helios-lang/uplc").UplcData} UplcData
 * @typedef {import("@helios-lang/uplc").UplcValue} UplcValue
 * @typedef {import("./Branches.js").BranchesI} BranchesI
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
     * @param {Set<number>} _s
     */
    collectFuncTags(_s) {}

    collectFuncValues() {}

    /**
     * @param {number} _tag
     * @param {number} _depth
     * @returns {boolean}
     */
    containsFunc(_tag, _depth) {
        return false
    }

    /**
     * @param {boolean} _anyAsDataOnly
     * @returns {boolean}
     */
    isCallable(_anyAsDataOnly) {
        return false
    }

    /**
     * @param {boolean} _anyAsFuncOnly
     * @returns {boolean}
     */
    isDataLike(_anyAsFuncOnly) {
        return true
    }

    /**
     * @param {ValueI} other
     * @returns {boolean}
     */
    isEqual(other) {
        return other instanceof LiteralValue && this.value.isEqual(other.value)
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
     * @param {BranchesI} _branches
     * @returns {LiteralValue}
     */
    withBranches(_branches) {
        return this
    }
}
