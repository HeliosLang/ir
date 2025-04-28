import { expectDefined } from "@helios-lang/type-utils"
import {
    makeUplcByteArray,
    makeUplcInt,
    builtinsV2Map
} from "@helios-lang/uplc"
import { CallExpr } from "../../expressions/index.js"
import { ValueGenerator } from "../ValueGenerator.js"
import { AnyValue } from "./AnyValue.js"
import { BranchedValue } from "./BranchedValue.js"
import { BuiltinValue } from "./BuiltinValue.js"
import { DataValue } from "./DataValue.js"
import { ErrorValue } from "./ErrorValue.js"
import { FuncValue } from "./FuncValue.js"
import { LiteralValue } from "./LiteralValue.js"
import { MaybeErrorValue } from "./MaybeErrorValue.js"
import { Stack } from "./Stack.js"
import {
    isAllLiteral,
    isLiteralValue,
    isAllDataLike,
    isDataLikeValue,
    isNonLiteralDataLikeValue
} from "./Value.js"

/**
 * @typedef {import("./BranchType.js").BranchType} BranchType
 * @typedef {import("./EvalContext.js").EvalContext} EvalContext
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").DataLikeValue} DataLikeValue
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 */

/**
 * @param {CallExpr} expr
 * @param {BuiltinValue} builtin
 * @param {NonErrorValue[]} args
 * @param {Stack} stack
 * @param {ValueGenerator} ctx
 * @returns {Value}
 */
export function evalBuiltin(expr, builtin, args, stack, ctx) {
    return isBranchingBuiltin(builtin.name)
        ? evalBranchingBuiltin(expr, builtin.name, args, stack, ctx)
        : isIdentityBuiltin(builtin.name)
          ? evalIdentityBuiltin(builtin.name, args)
          : evalDataBuiltin(builtin, args, stack, ctx)
}

/**
 * @param {string} name
 * @returns {name is BranchType}
 */
function isBranchingBuiltin(name) {
    return ["ifThenElse", "chooseList", "chooseData"].includes(name)
}

/**
 * @param {string} name
 * @returns {boolean}
 */
function isIdentityBuiltin(name) {
    return ["chooseUnit", "trace"].includes(name)
}

/**
 * @param {CallExpr} expr
 * @param {BranchType} name
 * @param {NonErrorValue[]} args
 * @param {Stack} stack
 * @param {ValueGenerator} ctx
 * @returns {Value}
 */
function evalBranchingBuiltin(expr, name, args, stack, ctx) {
    if (args.length < 2) {
        throw new Error("unexpected")
    }

    const cond = args[0]
    args = args.slice(1)

    if (isLiteralValue(cond)) {
        return evalLiteralCondBranchingBuiltin(name, cond, args)
    } else if (isNonLiteralDataLikeValue(cond)) {
        // assume cond has the correct type
        return evalDataCondBranchingBuiltin(expr, name, cond, args, stack, ctx)
    } else {
        return new ErrorValue()
    }
}

/**
 * @param {string} name
 * @param {LiteralValue} cond
 * @param {Value[]} args
 * @returns {Value}
 */
function evalLiteralCondBranchingBuiltin(name, cond, args) {
    switch (name) {
        case "trace":
            if (args.length != 1) {
                throw new Error("unexpected")
            }

            if (cond.value.kind == "string") {
                return args[0]
            } else {
                return new ErrorValue()
            }
        case "chooseUnit":
            if (args.length != 1) {
                throw new Error("unexpected")
            }

            if (cond.value.kind == "unit") {
                return args[0]
            } else {
                return new ErrorValue()
            }
        case "ifThenElse":
            if (args.length != 2) {
                throw new Error("unexpected")
            }

            if (cond.value.kind == "bool") {
                if (cond.value.value) {
                    return args[0]
                } else {
                    return args[1]
                }
            } else {
                return new ErrorValue()
            }
        case "chooseList":
            if (args.length != 2) {
                throw new Error("unexpected")
            }

            if (cond.value.kind == "list") {
                if (cond.value.items.length == 0) {
                    return args[0]
                } else {
                    return args[1]
                }
            } else {
                return new ErrorValue()
            }
        case "chooseData":
            if (args.length != 5) {
                throw new Error("unexpected")
            }

            if (cond.value.kind == "data") {
                switch (cond.value.value.kind) {
                    case "constr":
                        return args[0]
                    case "map":
                        return args[1]
                    case "list":
                        return args[2]
                    case "int":
                        return args[3]
                    case "bytes":
                        return args[4]
                    default:
                        throw new Error("unhandled data type")
                }
            } else {
                return new ErrorValue()
            }
        default:
            throw new Error("unhandled branching function")
    }
}

/**
 * @param {CallExpr} expr
 * @param {BranchType} name
 * @param {DataValue | AnyValue} cond
 * @param {NonErrorValue[]} args
 * @param {Stack} stack
 * @param {ValueGenerator} ctx
 * @returns {NonErrorValue}
 */
function evalDataCondBranchingBuiltin(expr, name, cond, args, stack, ctx) {
    if (isAllDataLike(args)) {
        const key = `${name}(${cond.toString()}, ${args.map((a) => a.toString()).join(", ")})`
        return ctx.genData(key, stack.branches)
    } else {
        args = /** @type {NonErrorValue[]} */ (args).map((a, i) => {
            if (a instanceof FuncValue || a instanceof BranchedValue) {
                // TODO: should this be moved into the ValueI interface?
                return a.addBranch({
                    expr: expr,
                    type: /** @type {any} */ (name),
                    condition: cond,
                    index: i
                })
            } else {
                return a
            }
        })

        return new BranchedValue(name, cond, args, expr)
    }
}

/**
 * @param {string} name
 * @param {NonErrorValue[]} args
 * @returns {Value}
 */
function evalIdentityBuiltin(name, args) {
    const [a, b] = args

    switch (name) {
        case "trace": {
            if (a instanceof LiteralValue) {
                if (a.value.kind == "string") {
                    return b
                } else {
                    return new ErrorValue()
                }
            } else if (a instanceof DataValue || a instanceof AnyValue) {
                return b
            } else {
                return new ErrorValue()
            }
        }
        case "chooseUnit": {
            if (a instanceof LiteralValue) {
                if (a.value.kind == "unit") {
                    return b
                } else {
                    return new ErrorValue()
                }
            } else if (a instanceof DataValue || a instanceof AnyValue) {
                return b
            } else {
                return new ErrorValue()
            }
        }
        default:
            throw new Error("unhandled identity function")
    }
}

/**
 * @param {BuiltinValue} builtin
 * @param {Value[]} args
 * @param {Stack} stack
 * @param {ValueGenerator} ctx
 * @returns {Value}
 */
function evalDataBuiltin(builtin, args, stack, ctx) {
    if (isAllLiteral(args)) {
        return evalLiteralDataBuiltin(builtin.name, args)
    } else if (isAllDataLike(args)) {
        const res = evalNonLiteralDataBuiltin(builtin, args, stack, ctx)

        if (
            builtin.safe &&
            res instanceof MaybeErrorValue &&
            isDataLikeValue(res.value)
        ) {
            return res.value
        } else {
            return res
        }
    } else {
        return new ErrorValue()
    }
}

/**
 * @param {string} name
 * @param {LiteralValue[]} args
 * @returns {LiteralValue | ErrorValue}
 */
function evalLiteralDataBuiltin(name, args) {
    const callback = expectDefined(builtinsV2Map.get(name)).call

    let res

    try {
        res = callback(
            args.map((a) => ({ kind: "const", value: a.value })),
            { print: () => {} }
        )
    } catch (e) {
        return new ErrorValue()
    }

    if ("value" in res) {
        return new LiteralValue(res.value)
    } else {
        throw new Error("unexpected return value")
    }
}

/**
 * @param {BuiltinValue} builtin
 * @param {DataLikeValue[]} args
 * @param {Stack} stack
 * @param {ValueGenerator} ctx
 * @returns {DataLikeValue | ErrorValue}
 */
function evalNonLiteralDataBuiltin(builtin, args, stack, ctx) {
    const name = builtin.name

    const defaultResult = () => {
        const key = `${builtin.toString()}(${args.map((a) => a.toString()).join(", ")})`
        return ctx.genData(key, stack.branches)
    }

    /**
     * @type {{[name: string]: (args: DataLikeValue[]) => (DataLikeValue | ErrorValue)}}
     */
    const callbacks = {
        addInteger: ([_a, _b]) => {
            return defaultResult()
        },
        subtractInteger: ([_a, _b]) => {
            return defaultResult()
        },
        multiplyInteger: ([a, b]) => {
            if (a instanceof LiteralValue) {
                if (a.int == 0n) {
                    return a
                } else if (a.int == 1n) {
                    return b
                }
            } else if (b instanceof LiteralValue) {
                if (b.int == 0n) {
                    return b
                } else if (b.int == 1n) {
                    return a
                }
            }

            return defaultResult()
        },
        divideInteger: ([a, b]) => {
            if (a instanceof LiteralValue && a.int == 0n) {
                return new MaybeErrorValue(a)
            } else if (b instanceof LiteralValue) {
                if (b.int == 0n) {
                    return new ErrorValue()
                } else if (b.int == 1n) {
                    return a
                } else {
                    return defaultResult()
                }
            } else {
                return new MaybeErrorValue(defaultResult())
            }
        },
        modInteger: ([_a, b]) => {
            if (b instanceof LiteralValue) {
                if (b.int == 1n) {
                    return new LiteralValue(
                        makeUplcInt({ value: 0n, signed: true })
                    )
                } else if (b.int == 0n) {
                    return new ErrorValue()
                } else {
                    return defaultResult()
                }
            } else {
                return new MaybeErrorValue(defaultResult())
            }
        },
        quotientInteger: ([a, b]) => {
            if (a instanceof LiteralValue && a.int == 0n) {
                return new MaybeErrorValue(a)
            } else if (b instanceof LiteralValue) {
                if (b.int == 0n) {
                    return new ErrorValue()
                } else if (b.int == 1n) {
                    return a
                } else {
                    return defaultResult()
                }
            } else {
                return new MaybeErrorValue(defaultResult())
            }
        },
        remainderInteger: ([_a, b]) => {
            if (b instanceof LiteralValue) {
                if (b.int == 1n) {
                    return new LiteralValue(
                        makeUplcInt({ value: 0n, signed: true })
                    )
                } else if (b.int == 0n) {
                    return new ErrorValue()
                } else {
                    return defaultResult()
                }
            } else {
                return new MaybeErrorValue(defaultResult())
            }
        },
        equalsInteger: ([_a, _b]) => {
            return defaultResult()
        },
        lessThanInteger: ([_a, _b]) => {
            return defaultResult()
        },
        lessThanEqualsInteger: ([_a, _b]) => {
            return defaultResult()
        },
        appendByteString: ([_a, _b]) => {
            return defaultResult()
        },
        consByteString: ([_a, _b]) => {
            return defaultResult()
        },
        sliceByteString: ([_a, b, _c]) => {
            if (b instanceof LiteralValue && b.int <= 0n) {
                return new LiteralValue(makeUplcByteArray([]))
            } else {
                return defaultResult()
            }
        },
        lengthOfByteString: ([_a]) => {
            return defaultResult()
        },
        indexByteString: ([a, b]) => {
            if (b instanceof LiteralValue && b.int < 0n) {
                return new ErrorValue()
            } else if (a instanceof LiteralValue && a.bytes.length == 0) {
                return new ErrorValue()
            } else {
                return new MaybeErrorValue(defaultResult())
            }
        },
        equalsByteString: ([_a, _b]) => {
            return defaultResult()
        },
        lessThanByteString: ([_a, _b]) => {
            return defaultResult()
        },
        lessThanEqualsByteString: ([_a, _b]) => {
            return defaultResult()
        },
        appendString: ([_a, _b]) => {
            return defaultResult()
        },
        equalsString: ([_a, _b]) => {
            return defaultResult()
        },
        encodeUtf8: ([_a]) => {
            return defaultResult()
        },
        decodeUtf8: ([_a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        sha2_256: ([_a]) => {
            return defaultResult()
        },
        sha3_256: ([_a]) => {
            return defaultResult()
        },
        blake2b_256: ([_a]) => {
            return defaultResult()
        },
        verifyEd25519Signature: ([a, _b, c]) => {
            if (a instanceof LiteralValue && a.bytes.length != 32) {
                return new ErrorValue()
            } else if (c instanceof LiteralValue && c.bytes.length != 64) {
                return new ErrorValue()
            } else {
                return new MaybeErrorValue(defaultResult())
            }
        },
        trace: ([_a, b]) => {
            return b
        },
        fstPair: ([_a]) => {
            return defaultResult()
        },
        sndPair: ([_a]) => {
            return defaultResult()
        },
        mkCons: ([_a, _b]) => {
            return defaultResult()
        },
        headList: ([_a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        tailList: ([_a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        nullList: ([_a]) => {
            return defaultResult()
        },
        constrData: ([_a, _b]) => {
            return defaultResult()
        },
        mapData: ([_a]) => {
            return defaultResult()
        },
        listData: ([_a]) => {
            return defaultResult()
        },
        iData: ([_a]) => {
            return defaultResult()
        },
        bData: ([_a]) => {
            return defaultResult()
        },
        unConstrData: ([_a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        unMapData: ([_a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        unListData: ([_a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        unIData: ([_a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        unBData: ([_a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        equalsData: ([_a, _b]) => {
            return defaultResult()
        },
        mkPairData: ([_a, _b]) => {
            return defaultResult()
        },
        mkNilData: ([_a]) => {
            return defaultResult()
        },
        mkNilPairData: ([_a]) => {
            return defaultResult()
        },
        serialiseData: ([_a]) => {
            return defaultResult()
        }
    }

    const callback = callbacks[name]

    if (!callback) {
        throw new Error(`builtin ${name} not defined in callbacks`)
    }

    return callback(args)
}
