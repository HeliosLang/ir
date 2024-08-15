import { AnyValue } from "./AnyValue.js"
import { BranchedValue } from "./BranchedValue.js"
import { BuiltinValue } from "./BuiltinValue.js"
import { DataValue } from "./DataValue.js"
import { ErrorValue } from "./ErrorValue.js"
import { FuncValue } from "./FuncValue.js"
import { LiteralValue } from "./LiteralValue.js"
import { MaybeErrorValue } from "./MaybeErrorValue.js"

// Note: circular imports of the following typedefs are allowed

/**
 * @typedef {AnyValue | BranchedValue | BuiltinValue | DataValue | ErrorValue | FuncValue | LiteralValue | MaybeErrorValue} Value
 */

/**
 * @typedef {AnyValue | BranchedValue | BuiltinValue | DataValue | FuncValue | LiteralValue | MaybeErrorValue} MaybeNonErrorValue
 */

/**
 * @typedef {AnyValue | BranchedValue | BuiltinValue | DataValue | FuncValue | LiteralValue} NonErrorValue
 */

/**
 * @typedef {BuiltinValue | DataValue | FuncValue | LiteralValue} NonBranchedValue
 */

/**
 * @typedef {DataValue | AnyValue | LiteralValue} DataLikeValue
 */

/**
 * @typedef {AnyValue | DataValue} AnyDataValue
 */

/**
 * @param {Value[]} values
 * @returns {boolean}
 */
export function isAnyError(values) {
    return values.some(
        (v) => v instanceof ErrorValue || v instanceof MaybeErrorValue
    )
}

/**
 * @param {Value[]} values
 * @returns {values is NonErrorValue[]}
 */
export function isAllNonError(values) {
    return !isAnyError(values)
}

/**
 * @param {Value[]} values
 * @returns {boolean}
 */
export function isAllError(values) {
    return values.every((v) => v instanceof ErrorValue)
}

/**
 * @param {Value[]} values
 * @returns {values is (MaybeNonErrorValue[])}
 */
export function isAllMaybeNonError(values) {
    return !values.some((v) => v instanceof ErrorValue)
}

/**
 * @param {Value} value
 * @returns {value is ErrorValue}
 */
export function isError(value) {
    return value instanceof ErrorValue
}

/**
 * @param {Value} value
 * @returns {value is DataLikeValue}
 */
export function isDataLikeValue(value) {
    return (
        value instanceof DataValue ||
        value instanceof LiteralValue ||
        value instanceof AnyValue
    )
}

/**
 * @param {Value} value
 * @returns {value is (DataValue | AnyValue)}
 */
export function isNonLiteralDataLikeValue(value) {
    return value instanceof DataValue || value instanceof AnyValue
}

/**
 *
 * @param {Value[]} values
 * @returns {values is DataLikeValue[]}
 */
export function isAllDataLike(values) {
    return values.every(isDataLikeValue)
}

/**
 * @param {Value[]} values
 * @returns {values is (LiteralValue | DataValue)[]}
 */
export function isAllData(values) {
    return values.every(
        (v) => v instanceof LiteralValue || v instanceof DataValue
    )
}

/**
 * @param {Value} value
 * @returns {value is NonBranchedValue}
 */
export function isNonBranchedValue(value) {
    if (
        value instanceof BuiltinValue ||
        value instanceof LiteralValue ||
        value instanceof DataValue ||
        value instanceof FuncValue
    ) {
        return true
    } else {
        return false
    }
}

/**
 * @param {Value[]} vs
 * @returns {NonBranchedValue[]}
 */
export function expectAllNonBranchedValues(vs) {
    return vs.map((v) => {
        if (isNonBranchedValue(v)) {
            return v
        } else {
            throw new Error(`unexpected ${v.toString()}`)
        }
    })
}

/**
 * @param {Value[]} values
 * @returns {values is LiteralValue[]}
 */
export function isAllLiteral(values) {
    return values.every((v) => v instanceof LiteralValue)
}

/**
 * @param {Value} value
 * @returns {value is LiteralValue}
 */
export function isLiteralValue(value) {
    return value instanceof LiteralValue
}

/**
 * @param {MaybeNonErrorValue[]} values
 * @returns {NonErrorValue[]}
 */
export function flattenMaybeError(values) {
    return values.map((v) => (v instanceof MaybeErrorValue ? v.value : v))
}

/**
 * @param {Value[]} values 
 * @returns {NonErrorValue[]}
 */
export function filterErrorAndMaybeError(values) {
    return flattenMaybeError(/** @type {MaybeNonErrorValue[]} */ (values.filter(v => !(v instanceof ErrorValue))))
}

/**
 * @param {Value[]} values
 * @returns {Value[]}
 */
export function uniqueFlattenedValues(values) {
    values = flattenValues(values)

    let hasError = false

    const map = new Map(
        values.map((v) => {
            if (v instanceof MaybeErrorValue && v.value) {
                v = v.value
                hasError = true
            }

            return [v.toString(), v]
        })
    )

    if (hasError) {
        const ev = new ErrorValue()
        map.set(ev.toString(), ev)
    }

    if (map.size > 1 + (map.has("Error") ? 1 : 0) && map.has("Any")) {
        map.delete("Any")
    }

    return Array.from(map.values())
}

/**
 * @param {Value[]} values
 * @returns {Value[]}
 */
export function uniqueValues(values) {
    const map = new Map(
        values.map((v) => {
            return [v.toString(), v]
        })
    )

    return Array.from(map.values())
}

/**
 *
 * @param {Value[]} values
 * @returns {Value[]}
 */
function flattenValues(values) {
    /**
     * @type {Value[]}
     */
    let result = []

    values.forEach((v) => {
        result = result.concat(flattenValue(v))
    })

    return result
}

/**
 * @param {Value} v
 * @returns {Value[]}
 */
function flattenValue(v) {
    let result = []

    if (v instanceof MaybeErrorValue && v.value) {
        if (v.value) {
            result = result
                .concat(flattenValue(v.value))
                .concat([new ErrorValue()])
        } else {
            result = result.concat([v])
        }
    } else if (v instanceof BranchedValue) {
        v.cases.forEach((vv) => {
            if (vv) {
                result = result.concat(flattenValue(vv))
            }
        })
    } else {
        result.push(v)
    }

    return result
}
