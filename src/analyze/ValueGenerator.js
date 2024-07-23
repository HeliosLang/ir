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
 * @typedef {"Any" | "Data" | "Stack"} ValueGeneratorGroupNames
 */

/**
 * @typedef {{[name in ValueGeneratorGroupNames]: BiMap<string>}} ValueGeneratorGroups
 */

export class ValueGenerator {
    /**
     * @type {ValueGeneratorGroups}
     */
    groups

    constructor() {
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

        return new AnyValue(id)
    }

    /**
     * @param {string} key
     * @param {Branches} branches
     */
    genData(key, branches) {
        const id = this.groups.Data.add(key)

        return new DataValue(id, branches)
    }

    /**
     * @param {StackValues} values
     * @param {number} blockRecursionTag
     * @returns {number}
     */
    genStackSummary(values, blockRecursionTag) {
        const key = stringifyStackValues(values, {
            tag: blockRecursionTag,
            maxDepth: 0
        })
        const id = this.groups.Stack.add(key)

        return id
    }
}

/**
 * @param {Value} fn
 * @param {NonErrorValue[]} args
 */
export function makeCallKey(fn, args) {
    return `${fn.toString()}(${args.map((a) => a.toString()).join(", ")})`
}
