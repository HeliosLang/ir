import { isSome } from "@helios-lang/type-utils"
import { DataValue } from "./DataValue.js"
import { LiteralValue } from "./LiteralValue.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcValue} UplcValue
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./BranchHistory.js").BranchHistory} BranchHistory
 */

/**
 * @typedef {{
 *   branches: BranchHistory[]
 * }} DataValueDetails
 */

export class DataValueCache {
    /**
     * Map string keys to data values
     * @readonly
     * @type {Map<string, number>}
     */
    dataValueMap

    /**
     * @readonly
     * @type {DataValueDetails[]}
     */
    dataValueDetails

    constructor() {
        this.dataValueMap = new Map()
        this.dataValueDetails = []
    }

    /**
     * @param {DataValueDetails} details
     * @returns {DataValue}
     */
    newValue(details = { branches: [] }) {
        const id = this.dataValueDetails.length

        this.dataValueDetails.push(details)

        return new DataValue(id)
    }

    /**
     * @param {string} builtin
     * @param {Value[]} args
     * @returns {DataValue}
     */
    getBuiltinResultValue(builtin, args) {
        /**
         * @type {DataValueDetails}
         */
        const details = {
            branches: []
        }

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

            return this.getValue(key, details)
        } else {
            return this.newValue(details)
        }
    }

    /**
     * @param {UplcValue} uplcValue
     * @returns {DataValue}
     */
    getFromLiteralValue(uplcValue) {
        return this.getValue(generateLiteralKey(uplcValue), {
            branches: []
        })
    }

    /**
     * @param {number} i
     * @returns {DataValue}
     */
    getMainArgValue(i) {
        return this.getValue(generateMainArgKey(i), {
            branches: []
        })
    }

    /**
     * @param {string} name
     * @returns {DataValue}
     */
    getParamValue(name) {
        return this.getValue(generateParamKey(name), {
            branches: []
        })
    }

    /**
     * @param {number} i
     * @returns {DataValueDetails}
     */
    getMainArgDetails(i) {
        return this.getDetails(generateMainArgKey(i), {
            branches: []
        })
    }

    /**
     * @param {string} name
     * @returns {DataValueDetails}
     */
    getParamDetails(name) {
        return this.getDetails(generateParamKey(name), {
            branches: []
        })
    }

    /**
     * @private
     * @param {string} key
     * @param {DataValueDetails} details
     * @return {DataValueDetails}
     */
    getDetails(key, details) {
        const id = this.dataValueMap.get(key)

        if (isSome(id)) {
            return this.dataValueDetails[id]
        } else {
            const value = this.newValue(details)

            this.dataValueMap.set(key, value.id)

            return details
        }
    }

    /**
     * @private
     * @param {string} key
     * @param {DataValueDetails} details
     * @returns {DataValue}
     */
    getValue(key, details) {
        const id = this.dataValueMap.get(key)

        if (isSome(id)) {
            return new DataValue(id)
        } else {
            const value = this.newValue(details)

            this.dataValueMap.set(key, value.id)

            return value
        }
    }
}

/**
 * @param {number} i
 * @returns {string}
 */
function generateMainArgKey(i) {
    return `Main${i}`
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
