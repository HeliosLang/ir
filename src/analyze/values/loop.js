import { AnyValue } from "./AnyValue.js"
import { BranchedValue } from "./BranchedValue.js"
import { BuiltinValue } from "./BuiltinValue.js"
import { DataValue } from "./DataValue.js"
import { ErrorValue } from "./ErrorValue.js"
import { FuncValue } from "./FuncValue.js"
import { LiteralValue } from "./LiteralValue.js"
import { MaybeErrorValue } from "./MaybeErrorValue.js"

/**
 * @typedef {import("./Value.js").Value} Value
 */

/**
 * @param {string[]} rootPath
 * @param {Value} root
 * @param {{
 *   anyValue?: (path: string[], value: AnyValue) => void
 *   branchedValue?: (path: string[], value: BranchedValue) => void
 *   builtinValue?: (path: string[], value: BuiltinValue) => void
 *   dataValue?: (path: string[], value: DataValue) => void
 *   errorValue?: (path: string[], value: ErrorValue) => void
 *   funcValue?: (path: string[], value: FuncValue) => void
 *   literalValue?: (path: string[], value: LiteralValue) => void
 *   maybeErrorValue?: (path: string[], value: MaybeErrorValue) => void
 *   exit?: () => boolean
 * }} callbacks
 */
export function loop(rootPath, root, callbacks) {
    /**
     * @type {[string[], Value][]}
     */
    const stack = [[rootPath, root]]

    let head = stack.pop()

    while (head) {
        const [valuePath, value] = head

        if (value instanceof AnyValue) {
            if (callbacks.anyValue) {
                callbacks.anyValue(valuePath, value)
            }
        } else if (value instanceof BranchedValue) {
            stack.push([
                valuePath.concat([`${value.prefix}Cond`]),
                value.condition
            ])
            value.cases.forEach((c, i) =>
                stack.push([valuePath.concat([`${value.prefix}Case${i}`]), c])
            )

            if (callbacks.branchedValue) {
                callbacks.branchedValue(valuePath, value)
            }
        } else if (value instanceof BuiltinValue) {
            if (callbacks.builtinValue) {
                callbacks.builtinValue(valuePath, value)
            }
        } else if (value instanceof DataValue) {
            if (callbacks.dataValue) {
                callbacks.dataValue(valuePath, value)
            }
        } else if (value instanceof ErrorValue) {
            if (callbacks.errorValue) {
                callbacks.errorValue(valuePath, value)
            }
        } else if (value instanceof FuncValue) {
            value.stack.values.values.forEach(([id, v]) =>
                stack.push([initValuePath(id), v])
            )

            if (callbacks.funcValue) {
                callbacks.funcValue(valuePath, value)
            }
        } else if (value instanceof LiteralValue) {
            if (callbacks.literalValue) {
                callbacks.literalValue(valuePath, value)
            }
        } else if (value instanceof MaybeErrorValue) {
            stack.push([valuePath, value.value])

            if (callbacks.maybeErrorValue) {
                callbacks.maybeErrorValue(valuePath, value)
            }
        }

        if (callbacks.exit && callbacks.exit()) {
            return
        }

        head = stack.pop()
    }
}

/**
 * @param {number} id
 * @returns {string[]}
 */
export function initValuePath(id) {
    return [`Arg${id}`]
}

/**
 * @param {string[]} path
 * @returns {string}
 */
export function pathToKey(path) {
    return path.join("_")
}
