import { AnyValue, DataValue, stringifyStackValues } from "./values/index.js"
import { BiMap } from "./BiMap.js"

/**
 * @typedef {import("./values/index.js").BranchesI} BranchesI
 * @typedef {import("./values/index.js").NonErrorValue} NonErrorValue
 * @typedef {import("./values/index.js").StackValuesI} StackValuesI
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
     * @param {ValueGeneratorOptions} options
     */
    constructor(options = {}) {
        this.options = options
        this.groups = {
            Any: new BiMap(),
            Data: new BiMap(),
            Stack: new BiMap()
        }
    }

    /**
     * @param {string} key
     * @returns {AnyValue}
     */
    genAny(key) {
        const id = this.groups.Any.add(key)

        if (this.options.debug) {
            console.log("Any" + id + " = " + key)
        }

        return new AnyValue(id)
    }

    /**
     * @param {string} key
     * @param {BranchesI} branches
     * @returns {DataValue}
     */
    genData(key, branches) {
        const id = this.groups.Data.add(key)

        if (this.options.debug) {
            console.log("Data" + id + " = " + key)
        }

        return new DataValue(id, branches)
    }

    /**
     * @param {string} key
     * @returns {AnyValue}
     */
    genParam(key) {
        key = `param${key}`
        const id = this.groups.Any.add(key)

        if (this.options.debug) {
            console.log("Any" + id + " = " + key)
        }

        return new AnyValue(id, true)
    }

    /**
     * @param {StackValuesI} values
     * @param {number} blockRecursionTag
     * @returns {number}
     */
    genStackSummary(values, blockRecursionTag) {
        const key = stringifyStackValues(values, {
            tag: blockRecursionTag,
            maxDepth: 0
        })

        const id = this.groups.Stack.add(key)

        if (this.options.debug) {
            console.log("Stack " + id + " = " + key)
        }

        return id
    }
}

/**
 * @param {Value} fn
 * @param {NonErrorValue[]} args
 * @returns {string}
 */
export function makeCallKey(fn, args) {
    return `${fn.toString()}(${args.map((a) => a.toString()).join(", ")})`
}
