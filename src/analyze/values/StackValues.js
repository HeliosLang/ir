/**
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 */

/**
 * @typedef {[number, NonErrorValue][]} StackValuesArray
 */

/**
 * @typedef {{
 *   values: StackValuesArray
 *   collectFuncTags(s: Set<number>): void
 *   containsFunc(tag: number, depth: number): boolean
 *   extend(items: StackValuesArray, keep: Set<number>): StackValuesI
 *   filter(keep: Set<number>): StackValuesI
 *   getValue(v: number): NonErrorValue
 *   isLiteral(): boolean
 *   toString(altValueKeys?: Map<number, string>): string
 * }} StackValuesI
 */

/**
 * @implements {StackValuesI}
 */
export class StackValues {
    /**
     * @type {StackValuesArray}
     */
    values

    /**
     * `values` is immediately sorted
     * @param {StackValuesArray} values
     */
    constructor(values) {
        this.values = values.slice().sort(([a], [b]) => a - b)
    }

    /**
     * @returns {StackValues}
     */
    static empty() {
        return new StackValues([])
    }

    /**
     * @param {Set<number>} s
     */
    collectFuncTags(s) {
        this.values.forEach((v) => v[1].collectFuncTags(s))
    }

    /**
     * @param {number} tag
     * @param {number} depth
     * @returns {boolean}
     */
    containsFunc(tag, depth) {
        return this.values.some((v) => v[1].containsFunc(tag, depth))
    }

    /**
     * @param {StackValuesArray} items
     * @param {Set<number>} keep
     * @returns {StackValuesI}
     */
    extend(items, keep) {
        const values = this.values.concat(items).filter(([id]) => keep.has(id))

        return new StackValues(values)
    }

    /**
     * @param {Set<number>} keep
     * @returns {StackValuesI}
     */
    filter(keep) {
        const values = this.values.filter(([id]) => keep.has(id))
        return new StackValues(values)
    }

    /**
     * @param {number} v
     * @returns {NonErrorValue}
     */
    getValue(v) {
        const j = this.values.findIndex(([va]) => va == v)

        if (j != -1) {
            return this.values[j][1]
        }

        throw new Error(
            `${v} not found in Stack (have: ${this.values.map((v) => v[0]).join(", ")})`
        )
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return this.values.every((v) => v[1].isLiteral())
    }

    /**
     * @param {Map<number, string>} altValueKeys - TODO: ugly, get rid of this
     * @returns {string}
     */
    toString(altValueKeys = new Map()) {
        return `[${this.values
            .map(([id, vl]) => {
                return `${id}: ${altValueKeys.get(id) ?? vl.toString()}`
            })
            .join(", ")}]`
    }
}
