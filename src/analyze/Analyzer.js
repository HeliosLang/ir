import { encodeUtf8, removeWhitespace } from "@helios-lang/codec-utils"
import { CompilerError, TokenSite } from "@helios-lang/compiler-utils"
import { None, expectSome, isNone, isSome } from "@helios-lang/type-utils"
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
    UplcPair,
    UplcString
} from "@helios-lang/uplc"
import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    LiteralExpr,
    NameExpr,
    Scope,
    Variable
} from "../expressions/index.js"
import { format } from "../format/index.js"
import { loop } from "../ops/loop.js"
import { Analysis } from "./Analysis.js"
import {
    AnyValue,
    BranchedValue,
    Branches,
    BuiltinValue,
    DataValue,
    ErrorValue,
    FuncValue,
    LiteralValue,
    MaybeErrorValue,
    Stack,
    ValueCache,
    evalBuiltin,
    makeCallKey,
    isAllError,
    isAnyError
} from "./values/index.js"
import {
    isAllNonError,
    isAllMaybeNonError,
    flattenMaybeError
} from "./values/Value.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcData} UplcData
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./values/Branch.js").Branch} Branch
 * @typedef {import("./values/index.js").IdGenerator} IdGenerator
 * @typedef {import("./values/index.js").NonErrorValue} NonErrorValue
 * @typedef {import("./values/index.js").Value} Value
 * @typedef {import("./values/BranchedValue.js").Reconstructor} Reconstructor
 * @typedef {import("./values/Value.js").NonBranchedValue} NonBranchedValue
 */

/**
 * evalLiterals defaults to true
 * @typedef {{
 *   evalLiteral?: boolean
 *   debug?: boolean
 * }} AnalyzerOptions
 */

/**
 * @typedef {ErrorExpr | LiteralExpr | NameExpr | FuncExpr | BuiltinExpr | CallExpr} AnyExpr
 */

/**
 * @typedef {(values: Value[]) => Value} ValueCombiner
 */

/**
 * @typedef {{
 *   expr: AnyExpr
 *   stack: Stack
 * }} ComputeExpr
 */

/**
 * @typedef {{
 *   collect: number
 *   combine: ValueCombiner
 *   owner: Option<CallExpr>
 * }} ComputeCollect
 */

/**
 * @typedef {{
 *   call: Value
 *   args: NonErrorValue[]
 *   stack: Stack
 *   owner: Option<CallExpr>
 * }} ComputeCall
 */

/**
 * @typedef {(
 *   ComputeExpr |
 *   ComputeCollect |
 *   ComputeCall
 * )} ComputeOp
 */

/**
 * @implements {IdGenerator}
 */
export class Analyzer {
    /**
     * An Evaluator can only run once per expression
     * @type {Expr}
     */
    #root

    /**
     * @type {AnalyzerOptions}
     */
    #options

    /**
     * Unwraps an IR AST
     * @type {ComputeOp[]}
     */
    #compute

    /**
     * @type {Value[]}
     */
    #reduce

    /**
     * Keep track of the eval result of each expression
     * @type {Map<Expr, Value[]>}
     */
    #exprValues

    /**
     * Keep track of all values passed through Variables
     * @type {Map<Variable, NonErrorValue[]>}
     */
    #variableValues

    /**
     * FuncExpr tag as key
     * @type {Map<number, number>}
     */
    #callCount

    /**
     * Unique 0-based ids, which doubles as index in #funcDefinitions
     * @type {Map<FuncExpr, number>}
     */
    #funcExprTags

    /**
     * Inverse map of #funcExprTags
     * @type {FuncExpr[]}
     */
    #funcDefinitions

    /**
     * Unique 0-based ids
     * @type {Map<Variable, number>}
     */
    #variableTags

    /**
     * @type {Variable[]}
     */
    #variables

    /**
     * @type {Map<FuncExpr, Set<CallExpr>>}
     */
    #funcCallExprs

    /**
     * @type {Map<Variable, Set<NameExpr>>}
     */
    #variableReferences

    /**
     * @type {ValueCache}
     */
    #cachedValues

    /**
     * @param {Expr} expr
     * @param {AnalyzerOptions} options
     */
    constructor(expr, options = {}) {
        this.#root = expr
        this.#options = options

        this.reset()
        this.init()
    }

    /**
     * @returns {Analysis}
     */
    analyze() {
        this.#root.resolveNames(new Scope(None, None))

        let res = this.evalFirstPass(this.#root)

        /**
         * @type {FuncValue[]}
         */
        let fns = []

        /**
         * @param {Value} res
         */
        const addFns = (res) => {
            /**
             * @type {Map<string, FuncValue>}
             */
            const m = new Map()
            res.collectFuncValues(m)
            Array.from(m.values()).forEach((fn) => fns.push(fn))
        }

        addFns(res)

        let fn = fns.shift()
        while (fn) {
            let res = this.evalSecondPass(fn)
            addFns(res)
            fn = fns.shift()
        }

        return new Analysis({
            callCount: this.#callCount,
            exprValues: this.#exprValues,
            funcCallExprs: this.#funcCallExprs,
            funcDefinitions: this.#funcDefinitions,
            funcExprTags: this.#funcExprTags,
            rootExpr: this.#root,
            variableReferences: this.#variableReferences,
            variableValues: this.#variableValues,
            valueOrigins: this.#cachedValues.valueOrigins()
        })
    }

    /**
     * @returns {UplcData}
     */
    evalConst() {
        const res = this.evalFirstPass(this.#root)

        if (res instanceof LiteralValue) {
            let v = res.value

            if (v instanceof UplcDataValue) {
                return v.value
            } else if (v instanceof UplcInt) {
                return new IntData(v.value)
            } else if (v instanceof UplcBool) {
                return new ConstrData(v.bool ? 1 : 0, [])
            } else if (v instanceof UplcList) {
                if (v.isDataList()) {
                    return new ListData(
                        v.items.map((item) => {
                            if (!(item instanceof UplcDataValue)) {
                                throw new Error("unexpected")
                            }

                            return item.value
                        })
                    )
                } else if (v.isDataMap()) {
                    return new MapData(
                        v.items.map((item) => {
                            const pair = item

                            if (!(pair instanceof UplcPair)) {
                                throw new Error("unexpected")
                            }

                            if (!(pair.first instanceof UplcDataValue)) {
                                throw new Error("unexpected")
                            }

                            if (!(pair.second instanceof UplcDataValue)) {
                                throw new Error("unexpected")
                            }

                            return [pair.first.value, pair.second.value]
                        })
                    )
                }
            } else if (v instanceof UplcString) {
                return new ByteArrayData(encodeUtf8(v.string))
            } else if (v instanceof UplcByteArray) {
                return new ByteArrayData(v.bytes)
            }

            throw new Error(`unable to turn '${v.toString()}' into data`)
        } else {
            throw new Error("expected LiteralValue")
        }
    }

    /**
     * @private
     */
    reset() {
        this.#compute = []
        this.#reduce = []

        // data structures used by optimization
        this.#exprValues = new Map()
        this.#variableValues = new Map()
        this.#callCount = new Map()
        this.#funcExprTags = new Map()
        this.#funcDefinitions = []
        this.#variableTags = new Map()
        this.#variables = []
        this.#funcCallExprs = new Map()
        this.#variableReferences = new Map()
        this.#cachedValues = new ValueCache()
    }

    /**
     * @private
     */
    init() {
        this.generateTags()
    }

    /**
     * fill #funcExprTags and #variableTags
     * @private
     */
    generateTags() {
        loop(this.#root, {
            funcExpr: (funcExpr) => {
                if (!this.#funcExprTags.has(funcExpr)) {
                    const funcTag = this.#funcDefinitions.length
                    this.#funcExprTags.set(funcExpr, funcTag)
                    this.#funcDefinitions.push(funcExpr)
                }

                funcExpr.args.forEach((arg) => {
                    if (!this.#variableTags.has(arg)) {
                        const varTag = this.#variables.length
                        this.#variableTags.set(arg, varTag)
                        this.#variables.push(arg)
                    }
                })
            }
        })
    }

    /**
     * @param {string} key
     * @returns {number}
     */
    genId(key) {
        return this.#cachedValues.genId(key)
    }

    /**
     * @param {number} stackId
     * @param {number} variableId
     * @returns number
     */
    genOpaqueStackValueId(stackId, variableId) {
        const key = `Stack${stackId}[${this.#variables[variableId].name.value}(${variableId})]`

        return this.genId(key)
    }

    /**
     * @param {[number, NonErrorValue][]} values
     * @returns {number}
     */
    genStackId(values) {
        values = values.slice().sort(([a], [b]) => a - b)

        const key = `[${values
            .map(([id, vl]) => {
                return `${this.#variables[id].name.value}(${id}): ${vl.toString()}`
            })
            .join(", ")}]`

        return this.genId(key)
    }

    /**
     * @private
     * @param {number} tag
     * @returns {FuncExpr}
     */
    getFuncDefinition(tag) {
        return expectSome(
            this.#funcDefinitions[tag],
            "Func definition not registered (tag not generated?)"
        )
    }

    /**
     * @private
     * @param {FuncExpr} expr
     * @returns {number}
     */
    getFuncExprTag(expr) {
        return expectSome(
            this.#funcExprTags.get(expr),
            "FuncExpr tag not generated"
        )
    }

    /**
     * @private
     * @param {Variable} v
     * @returns {number}
     */
    getVariableTag(v) {
        return expectSome(
            this.#variableTags.get(v),
            "Variable tag not generated"
        )
    }

    /**
     * @private
     * @returns {Value}
     */
    popLastValue() {
        return expectSome(this.#reduce.pop())
    }

    /**
     * Push onto the computeStack, unwrapping CallExprs
     * @private
     * @param {Expr} expr
     * @param {Stack} stack
     * @param {Option<(value: Value) => void>} onReturn
     */
    pushExpr(expr, stack, onReturn = None) {
        if (
            expr instanceof ErrorExpr ||
            expr instanceof LiteralExpr ||
            expr instanceof BuiltinExpr ||
            expr instanceof NameExpr ||
            expr instanceof FuncExpr
        ) {
            this.#compute.push({ stack: stack, expr: expr })
        } else if (expr instanceof CallExpr) {
            this.#compute.push({ stack: stack, expr: expr })

            this.pushExpr(expr.func, stack)

            expr.args.forEach((a) => this.pushExpr(a, stack))
        } else {
            throw new Error("unhandled expression type")
        }
    }

    /**
     * @private
     * @param {Expr} expr
     * @param {Value} value
     */
    notifyExprValue(expr, value) {
        if (expr instanceof FuncExpr && !(value instanceof FuncValue)) {
            throw new Error("unexpected")
        }

        const outputs = this.#exprValues.get(expr)

        if (outputs) {
            outputs.push(value)
        } else {
            this.#exprValues.set(expr, [value])
        }
    }

    /**
     * @private
     * @param {Stack} stack
     * @param {NameExpr} nameExpr
     * @returns {NonErrorValue}
     */
    getValue(stack, nameExpr) {
        const variable = nameExpr.variable

        const s = this.#variableReferences.get(variable)

        if (s) {
            s.add(nameExpr)
        } else {
            this.#variableReferences.set(variable, new Set([nameExpr]))
        }

        const id = this.getVariableTag(variable)

        const res = stack.getValue(id, this)

        if (res instanceof DataValue && res.id == -1) {
            throw new Error(
                `unexpected DataValue with id -1 when resolving '${nameExpr.name}' (stack.recursive: ${stack.recursive})`
            )
        }

        return res
    }

    /**
     * @private
     * @param {number} tag
     * @param {number} incr
     * @param {Option<CallExpr>} owner
     */
    incrCallCount(tag, incr, owner) {
        const prev = this.#callCount.get(tag)

        if (prev) {
            this.#callCount.set(
                tag,
                Math.min(prev + incr, Number.MAX_SAFE_INTEGER)
            )
        } else {
            this.#callCount.set(tag, incr)
        }

        const fnDef = this.getFuncDefinition(tag)

        if (owner instanceof CallExpr) {
            const s = this.#funcCallExprs.get(fnDef)

            if (!s) {
                this.#funcCallExprs.set(fnDef, new Set([owner]))
            } else {
                s.add(owner)
            }
        }
    }

    /**
     * @private
     * @param {Variable[]} variables
     * @param {NonErrorValue[]} values
     * @returns {[number, NonErrorValue][]}
     */
    mapVarsToValues(variables, values) {
        if (variables.length != values.length) {
            throw new Error(
                "variables and values don't have the same length([" +
                    variables.map((v) => v.name).join(",") +
                    "] vs [" +
                    values.map((v) => v.toString()).join(",") +
                    "]"
            )
        }

        /**
         * @type {[Variable, NonErrorValue][]}
         */
        const m = []

        variables.forEach((variable, i) => {
            const value = values[i]

            const allValues = this.#variableValues.get(variable)

            if (allValues) {
                this.#variableValues.set(variable, allValues.concat([value]))
            } else {
                this.#variableValues.set(variable, [value])
            }

            m.push([variable, value])
        })

        return m.map(([vr, vl]) => [this.getVariableTag(vr), vl])
    }

    /**
     * @private
     * @param {Stack} stack
     * @param {[number, NonErrorValue][]} vs
     * @param {FuncExpr} expr
     * @returns {Stack}
     */
    extendStack(stack, vs, expr) {
        const allVars = stack.values.concat(vs).filter(([id]) => {
            const v = this.#variables[id]
            return expr.bodyVars.has(v)
        })

        return Stack.new(
            allVars,
            {
                branches: stack.branches,
                recursive: stack.recursive
            },
            this
        )
    }

    /**
     * @private
     * @param {Value} value
     * @param {Option<Expr>} owner
     */
    pushReductionValue(value, owner) {
        if (owner) {
            this.notifyExprValue(owner, value)
        }

        this.#reduce.push(value)
    }

    /**
     * @private
     * @param {Value} value
     * @param {Option<Expr>} owner
     * @param {boolean} isFromCache
     */
    pushNewReductionValue(value, owner, isFromCache = false) {
        if (owner) {
            if (this.#options.debug) {
                console.log(
                    `% ${removeWhitespace(format(owner))}: ${value.toString()}${isFromCache ? ` (cached)` : ""}`
                )
            }
        }

        this.pushReductionValue(value, owner)
    }

    /**
     * @private
     * @param {Option<Expr>} owner
     */
    pushErrorValue(owner) {
        const v = new ErrorValue()

        this.pushReductionValue(v, owner)
    }

    /**
     * @private
     * @param {Value} fn
     * @param {NonErrorValue[]} args
     * @param {Stack} stack - needed for the branches
     * @param {Option<CallExpr>} owner
     */
    pushCall(fn, args, stack, owner) {
        this.#compute.push({
            call: fn,
            args: args,
            stack: stack,
            owner: owner
        })
    }

    /**
     * @private
     * @param {number} n
     * @param {(values: Value[]) => Value} combine
     * @param {Option<CallExpr>} owner
     */
    pushCollect(n, combine, owner) {
        this.#compute.push({
            collect: n,
            combine: combine,
            owner: owner
        })
    }

    /**
     * @private
     * @param {Option<CallExpr>} owner
     */
    pushCollectMaybeError(owner) {
        this.pushCollect(
            1,
            ([v]) => {
                if (v instanceof ErrorValue || v instanceof MaybeErrorValue) {
                    return v
                } else {
                    return new MaybeErrorValue(v)
                }
            },
            owner
        )
    }

    /**
     * @private
     * @param {string} key
     * @param {Value} value
     */
    setCacheValue(key, value) {
        const prev = this.#cachedValues.get(key)

        if (prev && !(prev instanceof AnyValue)) {
            if (prev.toString() != value.toString()) {
                throw new Error(
                    `unexpected, ${prev.toString()} != ${value.toString()}`
                )
            }
        } else {
            if (this.#options.debug && !(value instanceof AnyValue)) {
                console.log(`%% ${key}: ${value.toString()}`)
            }

            this.#cachedValues.set(key, value)
        }
    }

    /**
     * @private
     * @param {string} key
     */
    prepareCacheValue(key) {
        const id = this.genId(key)
        const v = new AnyValue(id)

        if (this.#cachedValues.has(key)) {
            throw new Error("unexpected")
        }

        this.#cachedValues.set(key, v)

        if (this.#options.debug) {
            console.log(`%% ${key}: Any${id} (temp)`)
        }
    }

    /**
     * It is important that DataValue branches are set to the current Stack branches
     * @private
     * @param {string} key
     * @param {Stack} stack
     * @returns {Option<Value>}
     */
    getCachedValue(key, stack) {
        let cached = this.#cachedValues.get(key)

        if (cached instanceof DataValue) {
            if (cached.id == -1) {
                throw new Error("unexpected")
            }
            return new DataValue(cached.id, stack.branches)
        } else {
            return cached
        }
    }

    /**
     * @private
     */
    evalInternal() {
        let action = this.#compute.pop()

        while (action) {
            if ("expr" in action) {
                this.computeExpr(action.expr, action.stack)
            } else if ("collect" in action) {
                this.computeCollect(
                    action.collect,
                    action.combine,
                    action.owner
                )
            } else if ("call" in action) {
                this.computeCallValue(
                    action.call,
                    action.args,
                    action.stack,
                    action.owner
                )
            } else {
                throw new Error("unexpected term")
            }

            action = this.#compute.pop()
        }
    }

    /**
     * @private
     * @param {AnyExpr} expr
     * @param {Stack} stack
     */
    computeExpr(expr, stack) {
        if (expr instanceof LiteralExpr) {
            this.computeLiteralExpr(expr)
        } else if (expr instanceof ErrorExpr) {
            this.computeErrorExpr(expr)
        } else if (expr instanceof BuiltinExpr) {
            this.computeBuiltinExpr(expr)
        } else if (expr instanceof NameExpr) {
            this.computeNameExpr(expr, stack)
        } else if (expr instanceof FuncExpr) {
            this.computeFuncExpr(expr, stack)
        } else if (expr instanceof CallExpr) {
            this.computeCallExpr(expr, stack)
        } else {
            throw new Error("unhandled expression")
        }
    }

    /**
     * @private
     * @param {LiteralExpr} expr
     */
    computeLiteralExpr(expr) {
        const v = new LiteralValue(expr.value)

        this.pushReductionValue(v, expr)
    }

    /**
     * @private
     * @param {ErrorExpr} expr
     */
    computeErrorExpr(expr) {
        this.pushErrorValue(expr)
    }

    /**
     * @private
     * @param {BuiltinExpr} expr
     */
    computeBuiltinExpr(expr) {
        const v = new BuiltinValue(expr.name, expr.safe)

        this.pushReductionValue(v, expr)
    }

    /**
     * @private
     * @param {NameExpr} expr
     * @param {Stack} stack
     */
    computeNameExpr(expr, stack) {
        const v = this.getValue(stack, expr)

        this.pushNewReductionValue(v, expr)
    }

    /**
     * @private
     * @param {FuncExpr} expr
     * @param {Stack} stack
     */
    computeFuncExpr(expr, stack) {
        const tag = this.getFuncExprTag(expr)

        /**
         * @type {FuncValue}
         */
        let v

        if (!stack.isLiteral() && stack.containsFunc(tag, 0)) {
            // TODO: this is problematic because it doesn't allow filtering out unchanged stack variables which then remain unchanged
            const recStack = stack.blockRecursion({
                genId: this,
                blockFunc: { tag: tag, depth: 0 }
            })

            v = new FuncValue(tag, recStack)
        } else {
            v = new FuncValue(tag, stack)
        }

        // don't set owner because it is confusing wrt. return value type
        this.pushReductionValue(v, expr)
    }

    /**
     * @private
     * @param {CallExpr} expr
     * @param {Stack} stack
     */
    computeCallExpr(expr, stack) {
        /**
         * @type {Value}
         */
        let fn = this.popLastValue()

        /**
         * @type {Value[]}
         */
        let args = []
        for (let i = 0; i < expr.args.length; i++) {
            args.push(this.popLastValue())
        }

        if (isAllNonError(args)) {
            this.pushCall(fn, args, stack, expr)
        } else if (isAllMaybeNonError(args)) {
            const argsWithoutMaybeError = flattenMaybeError(args)

            this.pushCollectMaybeError(expr)
            this.pushCall(fn, argsWithoutMaybeError, stack, None)
        } else {
            this.pushErrorValue(expr)
        }
    }

    /**
     * @private
     * @param {number} nValues
     * @param {(values: Value[]) => Value} combine
     * @param {Option<CallExpr>} owner
     */
    computeCollect(nValues, combine, owner) {
        // collect multiple Values from the reductionStack and put it back as a single Value

        /**
         * @type {Value[]}
         */
        const values = []

        for (let i = 0; i < nValues; i++) {
            const v = this.popLastValue()

            values.push(v)
        }

        // values popped like this have inverse order of the branches, so must be reversed
        //  (reversal isn't needed when evaluating expressions and returning values, because that is push-pop-push-pop, and here it is just a single push-pop)
        values.reverse()

        const res = combine(values)

        this.pushNewReductionValue(res, owner)
    }

    /**
     * @param {Value} fn
     * @param {NonErrorValue[]} args
     * @param {Stack} stack
     * @param {Option<CallExpr>}  owner
     */
    computeCallValue(fn, args, stack, owner) {
        if (
            fn instanceof ErrorValue ||
            fn instanceof LiteralValue ||
            fn instanceof DataValue
        ) {
            this.computeCallNonCallableValue(owner)
        } else if (fn instanceof MaybeErrorValue) {
            this.computeCallMaybeErrorValue(fn, args, stack, owner)
        } else if (fn instanceof BranchedValue) {
            this.computeCallBranchedValue(fn, args, stack, owner)
        } else if (fn instanceof AnyValue) {
            this.computeCallAny(fn, args, owner)
        } else if (fn instanceof BuiltinValue) {
            this.computeCallBuiltinValue(fn, args, stack, owner)
        } else if (fn instanceof FuncValue) {
            this.computeCallFuncValue(fn, args, owner)
        } else {
            throw new Error("unhandled Value type")
        }
    }

    /**
     * @private
     * @param {Option<CallExpr>} owner
     */
    computeCallNonCallableValue(owner) {
        this.pushErrorValue(owner)
    }

    /**
     * @private
     * @param {MaybeErrorValue} fn
     * @param {NonErrorValue[]} args
     * @param {Stack} stack
     * @param {Option<CallExpr>} owner
     */
    computeCallMaybeErrorValue(fn, args, stack, owner) {
        this.pushCollectMaybeError(owner)
        this.pushCall(fn.value, args, stack, None)
    }

    /**
     * @private
     * @param {BranchedValue} fn
     * @param {NonErrorValue[]} args
     * @param {Stack} stack
     * @param {Option<CallExpr>} owner
     */
    computeCallBranchedValue(fn, args, stack, owner) {
        this.pushCollect(
            fn.nCases,
            (cases) => {
                /**
                 * @type {DataValue | BranchedValue}
                 */
                let res

                if (
                    !cases.some((c) => c.isCallable(true)) &&
                    cases.some((c) => c.isDataLike(true))
                ) {
                    const key = makeCallKey(
                        new BuiltinValue(fn.type, false),
                        [/** @type {Value} */ (fn.condition)].concat(cases)
                    )
                    const id = this.genId(key)

                    res = new DataValue(id, stack.branches)
                } else {
                    res = new BranchedValue(fn.type, fn.condition, cases)
                }

                if (isAnyError(cases)) {
                    return new MaybeErrorValue(res)
                } else {
                    return res
                }
            },
            owner
        )

        fn.cases.forEach((c) => {
            this.pushCall(c, args, stack, None)
        })
    }

    /**
     * TODO: perform the analytics collects elsewhere
     * @private
     * @param {AnyValue} fn
     * @param {Value[]} args
     * @param {Option<CallExpr>} owner
     */
    computeCallAny(fn, args, owner) {
        /**
         * @type {Set<number>}
         */
        const s = new Set()

        args.forEach((a) => a.collectFuncTags(s))

        Array.from(s).forEach((tag) => {
            // twice, to make sure optimizer doesn't touch these functions
            this.incrCallCount(tag, 2, None)
        })

        const key = makeCallKey(fn, args)
        const id = this.genId(key)
        const v = new MaybeErrorValue(new AnyValue(id))

        this.pushNewReductionValue(v, owner)
    }

    /**
     * @private
     * @param {BuiltinValue} builtin
     * @param {NonErrorValue[]} args
     * @param {Stack} stack
     * @param {Option<CallExpr>} owner
     */
    computeCallBuiltinValue(builtin, args, stack, owner) {
        const result = evalBuiltin(owner, builtin, args, stack, this)

        this.pushNewReductionValue(result, owner)
    }

    /**
     * @private
     * @param {FuncValue} fn
     * @param {NonErrorValue[]} args
     * @param {Option<FuncExpr | CallExpr>} owner for entry point ths is the entry point FuncExpr, for all other calls this is the CallExpr
     */
    computeCallFuncValue(fn, args, owner) {
        const key = makeCallKey(fn, args)
        const cached = this.#cachedValues.get(key)

        const fnDef = this.getFuncDefinition(fn.definitionTag)
        const callExprOwner = owner instanceof CallExpr ? owner : None
        this.incrCallCount(this.getFuncExprTag(fnDef), 1, callExprOwner)

        if (cached) {
            this.pushNewReductionValue(cached, owner)
        } else {
            let recursive = fn.stack.recursive

            let argKeys = args.map((a) => a.toString())

            if (
                args.some((a) => !a.isLiteral()) &&
                args.some((a) => a.containsFunc(fn.definitionTag, 0))
            ) {
                // TODO: is this really needed?
                if (!fn.isRecursive()) {
                    ;[fn] = fn.blockRecursion({
                        genId: this
                    })
                }

                const argsAndKeys = args.map((a, i) =>
                    a.blockRecursion({
                        keyPath: `Arg${this.getVariableTag(fnDef.args[i])}`,
                        blockFunc: { tag: fn.definitionTag, depth: 0 },
                        genId: this
                    })
                )

                args = argsAndKeys.map(([a, k]) => a)
                argKeys = argsAndKeys.map(([a, k]) => k)

                recursive = true
            } else if (recursive) {
                const argsAndKeys = args.map((a, i) =>
                    a.blockRecursion({
                        keyPath: `Arg${this.getVariableTag(fnDef.args[i])}`,
                        genId: this
                    })
                )

                args = argsAndKeys.map(([a, k]) => a)
                argKeys = argsAndKeys.map(([a, k]) => k)
            }

            const varsToValues = this.mapVarsToValues(fnDef.args, args)

            const argKeysMap = new Map(
                fnDef.args.map((a, i) => {
                    return [this.getVariableTag(a), argKeys[i]]
                })
            )

            const allVars = fn.stack.values
                .concat(varsToValues)
                .filter(([id]) => {
                    const v = this.#variables[id]
                    return fnDef.bodyVars.has(v)
                })

            const stackKey = `[${allVars
                .map((v) => {
                    const vKey = argKeysMap.get(v[0]) ?? v[1].toString()
                    return `${v[0]}: ${vKey}`
                })
                .join(", ")}]`
            const id = this.genId(stackKey)

            const stack = new Stack(id, allVars, fn.stack.branches, recursive)

            this.pushCollect(
                1,
                ([v]) => {
                    this.setCacheValue(key, v)
                    return v
                },
                callExprOwner
            )

            this.pushExpr(fnDef.body, stack)

            this.prepareCacheValue(key)
        }
    }

    /**
     * @private
     * @param {Expr} expr entry point
     * @returns {Value}
     */
    evalFirstPass(expr) {
        const stack = Stack.new([], { branches: Branches.empty() }, this)

        this.pushExpr(expr, stack)

        this.evalInternal()

        const res = this.popLastValue()

        if (this.#reduce.length != 0) {
            throw new Error("expected consumption of all reduction values")
        }

        return res
    }

    /**
     * @private
     * @param {FuncValue} main
     * @returns {Value}
     */
    evalSecondPass(main) {
        const definition = this.getFuncDefinition(main.definitionTag)
        const args = definition.args.map((a, i) => {
            const key = `Arg${main.definitionTag}.${i}`
            const id = this.#cachedValues.genId(key)

            return new DataValue(id, Branches.empty())
        })

        this.computeCallFuncValue(main, args, definition)

        this.evalInternal()

        const res = this.popLastValue()

        if (this.#reduce.length != 0) {
            throw new Error(
                "expected a single reduction value in second phase [" +
                    res.toString() +
                    ", " +
                    this.#reduce.map((v) => v.toString()).join(", ") +
                    "]"
            )
        }

        return res
    }
}
