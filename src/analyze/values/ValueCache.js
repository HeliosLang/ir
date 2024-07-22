import { isNone } from "@helios-lang/type-utils"
import { AnyValue } from "./AnyValue.js"

/**
 * @typedef {import("./Value.js").Value} Value
 */

/**
 * A string key can be generated for each call, allowing it to be uniquely mapped to a real value
 * Also use this cache to keep track of unique ids
 */
export class ValueCache {
    /**
     * @private
     * @type {Map<string, Value>}
     */
    cache

    /**
     * @readonly
     * @type {Map<string, number>}
     */
    ids

    /**
     * @private
     * @type {number}
     */
    count

    constructor() {
        this.cache = new Map()
        this.ids = new Map()
        this.count = 0
    }

    /**
     * @param {string} key
     * @param {Value} value
     */
    set(key, value) {
        this.cache.set(key, value)
    }

    /**
     * @param {string} key
     * @returns {Option<Value>}
     */
    get(key) {
        return this.cache.get(key)
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return this.cache.has(key)
    }

    /**
     * @param {string} key
     */
    remove(key) {
        this.cache.delete(key)
    }

    /**
     * @param {string} key
     * @returns {number}
     */
    genId(key) {
        let id = this.ids.get(key)

        if (isNone(id)) {
            id = this.count

            this.ids.set(key, id)

            this.count += 1
        }
        return id
    }

    /**
     * @returns {string[]}
     */
    valueOrigins() {
        const keysAndIds = Array.from(this.ids.entries()).sort(
            (a, b) => a[1] - b[1]
        )

        if (
            !keysAndIds.every(([_, id], i) => {
                return i == id
            })
        ) {
            throw new Error("unexpected")
        }

        return keysAndIds.map(([key]) => key)
    }
}

/**
 * @param {Value} fn
 * @param {Value[]} args
 * @returns {string}
 */
export function makeCallKey(fn, args) {
    return `${fn.toString()}(${args.map((a) => a.toString()).join(", ")})`
}
