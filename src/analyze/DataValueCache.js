import { isSome } from "@helios-lang/type-utils"
import { DataValue } from "./DataValue.js"
import { LiteralValue } from "./LiteralValue.js"
import { Branches } from "./Branches.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcValue} UplcValue
 * @typedef {import("./Value.js").Value} Value
 */

export class DataValueCache {
    /**
     * Map string keys to data values
     * @readonly
     * @type {Map<string, number>}
     */
    dataValueMap

    /**
     * @type {number}
     */
    count

    constructor() {
        this.dataValueMap = new Map()
        this.count = 0
    }

    /**
     * @param {Branches} branches
     * @returns {DataValue}
     */
    newValue(branches) {
        const id = this.count
        this.count += 1

        return new DataValue(id, branches)
    }

    /**
     * @param {string} builtin
     * @param {Value[]} args
     * @param {Branches} branches
     * @returns {DataValue}
     */
    getBuiltinResultValue(builtin, args, branches) {
        if (
            args.every(
                (arg) => arg instanceof DataValue || arg instanceof LiteralValue
            )
        ) {
            const key = `${builtin}(${args
                .map((arg) => {
                    if (arg instanceof DataValue) {
                        return generateDataKey(arg.id)
                    } else if (arg instanceof LiteralValue) {
                        return generateLiteralKey(arg.value)
                    } else {
                        throw new Error("unexpected")
                    }
                })
                .join(",")})`

            return this.getValue(key, branches)
        } else {
            return this.newValue(branches)
        }
    }

    /**
     * @param {UplcValue} uplcValue
     * @returns {DataValue}
     */
    getFromLiteralValue(uplcValue) {
        return this.getValue(generateLiteralKey(uplcValue), Branches.empty())
    }

    /**
     * @param {number} tag
     * @param {number} argIndex
     * @returns {DataValue}
     */
    getMainArgValue(tag, argIndex) {
        return this.getValue(generateMainArgKey(tag, argIndex), Branches.empty())
    }

    /**
     * @param {string} name
     * @returns {DataValue}
     */
    getParamValue(name) {
        return this.getValue(generateParamKey(name), Branches.empty())
    }

    /**
     * @private
     * @param {string} key
     * @param {Branches} branches
     * @returns {DataValue}
     */
    getValue(key, branches) {
        const id = this.dataValueMap.get(key)

        if (isSome(id)) {
            return new DataValue(id, branches)
        } else {
            const value = this.newValue(branches)

            this.dataValueMap.set(key, value.id)

            return value
        }
    }
}

/**
 * @param {number} tag
 * @param {number} argIndex
 * @returns {string}
 */
function generateMainArgKey(tag,argIndex) {
    return `Main${tag}.${argIndex}`
}

/**
 * @param {string} name
 * @returns {string}
 */
function generateParamKey(name) {
    return `Param${name}`
}

/**
 * @param {number} id
 * @returns {string}
 */
function generateDataKey(id) {
    return `Data${id}`
}

/**
 * @param {UplcValue} v
 * @returns {string}
 */
function generateLiteralKey(v) {
    return `Literal${v.toString()}`
}
