import {
    AnyValue,
    Branches,
    DataValue,
    Stack,
    StackValues,
    stringifyStackValues
} from "./values/index.js"
import { BiMap } from "./BiMap.js"

/**
 * @typedef {import("./values/index.js").NonErrorValue} NonErrorValue
 * @typedef {import("./values/index.js").Value} Value
 */

/**
 * @typedef {{debug?: boolean}} ValueGeneratorOptions
 */
/**
 * @typedef {"Any" | "Data" | "Stack"} ValueGeneratorGroupNames
 */

/**
 * @typedef {{[name in ValueGeneratorGroupNames]: BiMap<string>}} ValueGeneratorGroups
 */

export class ValueGenerator {
    /**
     * @type {ValueGeneratorOptions}
     */
    options

    /**
     * @type {ValueGeneratorGroups}
     */
    groups

    /**
     * @private
     * @type {Map<number, Map<Value, string>>}
     */
    stringifyCache

    /**
     * @param {ValueGeneratorOptions} options
     */
    constructor(options = {}) {
        this.options = options
        this.groups = {
            Any: new BiMap(),
            Data: new BiMap(),
            Stack: new BiMap()
        }

        this.stringifyCache = new Map()
    }

    /**
     * @param {string} key
     * @returns {AnyValue}
     */
    genAny(key) {
        const id = this.groups.Any.add(key)

        return new AnyValue(id)
    }

    /**
     * @param {string} key
     * @param {Branches} branches
     */
    genData(key, branches) {
        const id = this.groups.Data.add(key)

        if (this.options.debug) {
            console.log("Data " + id + " = " + key)
        }

        return new DataValue(id, branches)
    }

    /**
     * @param {StackValues} values
     * @param {number} blockRecursionTag
     * @returns {number}
     */
    genStackSummary(values, blockRecursionTag) {
        const key = stringifyStackValues(
            values, {
                tag: blockRecursionTag,
                maxDepth: 0
            },
            this.getStringifyCache(blockRecursionTag)
        )

        const id = this.groups.Stack.add(key)

        if (this.options.debug) {
            console.log("Stack " + id + " = " + key)
        }

        return id
    }

    /**
     * @param {number} blockRecursionTag 
     * @returns {Map<Value, string>}
     */
    getStringifyCache(blockRecursionTag) {
        const cache = this.stringifyCache.get(blockRecursionTag)

        if (cache) {
            return cache
        } else {
            /**
             * @type {Map<Value, string>}
             */
            const cache = new Map()

            this.stringifyCache.set(blockRecursionTag, cache)

            return cache
        }
    }
}

/**
 * @param {Value} fn
 * @param {NonErrorValue[]} args
 */
export function makeCallKey(fn, args) {
    return `${fn.toString()}(${args.map((a) => a.toString()).join(", ")})`
}
