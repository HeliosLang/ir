/**
 * A Bidirectional or Bijective map, mapping an instance of any type to a unique integer
 * Doesn't support removal
 * @template T
 */
export class BiMap {
    /**
     * @readonly
     * @type {Map<T, number>}
     */
    valueKeys

    /**
     * @readonly
     * @type {T[]}
     */
    keyValues

    constructor() {
        this.valueKeys = new Map()
        this.keyValues = []
    }

    /**
     * @param {T} value
     * @returns {number}
     */
    add(value) {
        let key = this.valueKeys.get(value)

        if (key === undefined) {
            key = this.keyValues.length
            this.keyValues.push(value)
            this.valueKeys.set(value, key)
        }

        return key
    }

    /**
     * @param {T} value
     * @returns {number | undefined}
     */
    getKeyByValue(value) {
        return this.valueKeys.get(value)
    }

    /**
     * @param {number} key
     * @returns {T | undefined}
     */
    getValueByKey(key) {
        return this.keyValues[key]
    }

    /**
     * @param {number} key
     * @returns {boolean}
     */
    hasKey(key) {
        return key >= 0 && key < this.keyValues.length
    }

    /**
     * @param {T} value
     * @returns {boolean}
     */
    hasValue(value) {
        return this.valueKeys.has(value)
    }
}
