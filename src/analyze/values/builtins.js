import { None, expectSome } from "@helios-lang/type-utils"
import {
    ByteArrayData,
    ConstrData,
    IntData,
    ListData,
    MapData,
    UplcBool,
    UplcByteArray,
    UplcDataValue,
    UplcInt,
    UplcList,
    UplcString,
    UplcUnit,
    builtinsV2Map
} from "@helios-lang/uplc"
import { CallExpr } from "../../expressions/index.js"
import { BuiltinValue } from "./BuiltinValue.js"
import { DataValue } from "./DataValue.js"
import { LiteralValue } from "./LiteralValue.js"
import { FuncValue, Stack } from "./FuncValue.js"
import { ErrorValue } from "./ErrorValue.js"
import { AnyValue } from "./AnyValue.js"
import { BranchedValue } from "./BranchedValue.js"
import {
    isAllLiteral,
    isLiteralValue,
    isAllDataLike,
    isDataLikeValue,
    isNonLiteralDataLikeValue
} from "./Value.js"
import { MaybeErrorValue } from "./MaybeErrorValue.js"

/**
 * @typedef {import("./BranchType.js").BranchType} BranchType
 * @typedef {import("./IdGenerator.js").IdGenerator} IdGenerator
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").BranchableValue} BranchableValue
 * @typedef {import("./Value.js").DataLikeValue} DataLikeValue
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 */

/**
 * @param {Option<CallExpr>} expr
 * @param {BuiltinValue} builtin
 * @param {NonErrorValue[]} args
 * @param {Stack} stack
 * @param {IdGenerator} ctx
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
 *
 * @param {string} name
 * @returns {name is BranchType}
 */
function isBranchingBuiltin(name) {
    return ["ifThenElse", "chooseList", "chooseData"].includes(name)
}

function isIdentityBuiltin(name) {
    return ["chooseUnit", "trace"].includes(name)
}

/**
 * @param {Option<CallExpr>} expr
 * @param {BranchType} name
 * @param {NonErrorValue[]} args
 * @param {Stack} stack
 * @param {IdGenerator} ctx
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

            if (cond.value instanceof UplcString) {
                return args[0]
            } else {
                return new ErrorValue()
            }
        case "chooseUnit":
            if (args.length != 1) {
                throw new Error("unexpected")
            }

            if (cond.value instanceof UplcUnit) {
                return args[0]
            } else {
                return new ErrorValue()
            }
        case "ifThenElse":
            if (args.length != 2) {
                throw new Error("unexpected")
            }

            if (cond.value instanceof UplcBool) {
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

            if (cond.value instanceof UplcList) {
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

            if (cond.value instanceof UplcDataValue) {
                if (cond.value.value instanceof ConstrData) {
                    return args[0]
                } else if (cond.value.value instanceof MapData) {
                    return args[1]
                } else if (cond.value.value instanceof ListData) {
                    return args[2]
                } else if (cond.value.value instanceof IntData) {
                    return args[3]
                } else if (cond.value.value instanceof ByteArrayData) {
                    return args[4]
                } else {
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
 *
 * @param {Option<CallExpr>} expr
 * @param {BranchType} name
 * @param {DataValue | AnyValue} cond
 * @param {NonErrorValue[]} args
 * @param {Stack} stack
 * @param {IdGenerator} ctx
 * @returns {NonErrorValue}
 */
function evalDataCondBranchingBuiltin(expr, name, cond, args, stack, ctx) {
    if (isAllDataLike(args)) {
        const key = `${name}(${cond.toString()}, ${args.map((a) => a.toString()).join(", ")})`
        const id = ctx.genId(key)

        return new DataValue(id, stack.branches)
    } else {
        const key = `${name}(${cond.toString()})`
        const id = ctx.genId(key)

        args = /** @type {NonErrorValue[]} */ (args).map((a, i) => {
            if (a instanceof FuncValue || a instanceof BranchedValue) {
                return a.addBranch({
                    expr: expectSome(expr),
                    type: /** @type {any} */ (name),
                    condition: cond,
                    index: i
                })
            } else {
                return a
            }
        })

        return new BranchedValue(name, cond, args)
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
                if (a.value instanceof UplcString) {
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
                if (a.value instanceof UplcUnit) {
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
 * @param {IdGenerator} ctx
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
    const callback = expectSome(builtinsV2Map.get(name)).call

    let res

    try {
        res = callback(args, { print: () => {} })
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
 * @param {IdGenerator} ctx
 * @returns {DataLikeValue | ErrorValue}
 */
function evalNonLiteralDataBuiltin(builtin, args, stack, ctx) {
    const name = builtin.name

    const defaultResult = () => {
        const key = `${builtin.toString()}(${args.map((a) => a.toString()).join(", ")})`
        const id = ctx.genId(key)

        return new DataValue(id, stack.branches)
    }

    /**
     * @type {{[name: string]: (args: DataLikeValue[]) => (DataLikeValue | ErrorValue)}}
     */
    const callbacks = {
        addInteger: ([a, b]) => {
            return defaultResult()
        },
        subtractInteger: ([a, b]) => {
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
        modInteger: ([a, b]) => {
            if (b instanceof LiteralValue) {
                if (b.int == 1n) {
                    return new LiteralValue(new UplcInt(0n, true))
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
        remainderInteger: ([a, b]) => {
            if (b instanceof LiteralValue) {
                if (b.int == 1n) {
                    return new LiteralValue(new UplcInt(0n, true))
                } else if (b.int == 0n) {
                    return new ErrorValue()
                } else {
                    return defaultResult()
                }
            } else {
                return new MaybeErrorValue(defaultResult())
            }
        },
        equalsInteger: ([a, b]) => {
            return defaultResult()
        },
        lessThanInteger: ([a, b]) => {
            return defaultResult()
        },
        lessThanEqualsInteger: ([a, b]) => {
            return defaultResult()
        },
        appendByteString: ([a, b]) => {
            return defaultResult()
        },
        consByteString: ([a, b]) => {
            return defaultResult()
        },
        sliceByteString: ([a, b, c]) => {
            if (b instanceof LiteralValue && b.int <= 0n) {
                return new LiteralValue(new UplcByteArray([]))
            } else {
                return defaultResult()
            }
        },
        lengthOfByteString: ([a]) => {
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
        equalsByteString: ([a, b]) => {
            return defaultResult()
        },
        lessThanByteString: ([a, b]) => {
            return defaultResult()
        },
        lessThanEqualsByteString: ([a, b]) => {
            return defaultResult()
        },
        appendString: ([a, b]) => {
            return defaultResult()
        },
        equalsString: ([a, b]) => {
            return defaultResult()
        },
        encodeUtf8: ([a]) => {
            return defaultResult()
        },
        decodeUtf8: ([a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        sha2_256: ([a]) => {
            return defaultResult()
        },
        sha3_256: ([a]) => {
            return defaultResult()
        },
        blake2b_256: ([a]) => {
            return defaultResult()
        },
        verifyEd25519Signature: ([a, b, c]) => {
            if (a instanceof LiteralValue && a.bytes.length != 32) {
                return new ErrorValue()
            } else if (c instanceof LiteralValue && c.bytes.length != 64) {
                return new ErrorValue()
            } else {
                return new MaybeErrorValue(defaultResult())
            }
        },
        trace: ([a, b]) => {
            return b
        },
        fstPair: ([a]) => {
            return defaultResult()
        },
        sndPair: ([a]) => {
            return defaultResult()
        },
        mkCons: ([a, b]) => {
            return defaultResult()
        },
        headList: ([a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        tailList: ([a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        nullList: ([a]) => {
            return defaultResult()
        },
        constrData: ([a, b]) => {
            return defaultResult()
        },
        mapData: ([a]) => {
            return defaultResult()
        },
        listData: ([a]) => {
            return defaultResult()
        },
        iData: ([a]) => {
            return defaultResult()
        },
        bData: ([a]) => {
            return defaultResult()
        },
        unConstrData: ([a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        unMapData: ([a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        unListData: ([a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        unIData: ([a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        unBData: ([a]) => {
            return new MaybeErrorValue(defaultResult())
        },
        equalsData: ([a, b]) => {
            return defaultResult()
        },
        mkPairData: ([a, b]) => {
            return defaultResult()
        },
        mkNilData: ([a]) => {
            return defaultResult()
        },
        mkNilPairData: ([a]) => {
            return defaultResult()
        },
        serialiseData: ([a]) => {
            return defaultResult()
        }
    }

    const callback = callbacks[name]

    if (!callback) {
        throw new Error(`builtin ${name} not defined in callbacks`)
    }

    return callback(args)
}
