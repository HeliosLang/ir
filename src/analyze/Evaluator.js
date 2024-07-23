import { None, expectSome } from "@helios-lang/type-utils"
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
import { loop } from "../ops/loop.js"
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
    StackValues,
    stringifyCall,
    collectFuncValues,
    evalBuiltin,
    flattenMaybeError,
    isAllMaybeNonError,
    isAllNonError,
    isAnyError
} from "./values/index.js"
import { BiMap } from "./BiMap.js"
import { ValueGenerator } from "./ValueGenerator.js"
import { makeRecursiveDataOpaque } from "./recursion.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcData} UplcData
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./values/index.js").NonErrorValue} NonErrorValue
 * @typedef {import("./values/index.js").Value} Value
 */

/**
 * Each FuncExpr and Variable must given a unique integer tag/id
 * @typedef {{
 *   funcExprs: BiMap<FuncExpr>
 *   variables: BiMap<Variable>
 *   debug?: boolean
 *   onCallAny?: (args: NonErrorValue[], owner: Option<CallExpr>) => void
 *   onCallFunc?: (expr: FuncExpr, owner: Option<CallExpr>) => void
 *   onEvalExpr?: (expr: Expr, value: Value) => void
 *   onPassArg?: (variable: Variable, value: NonErrorValue) => void
 * }} EvaluatorProps
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

export class Evaluator {
    /**
     * @type {EvaluatorProps}
     */
    props

    /**
     * @private
     * @type {ComputeOp[]}
     */
    compute

    /**
     * @private
     * @type {Value[]}
     */
    reduce

    /**
     * @private
     * @type {Map<string, Value>}
     */
    cachedValues

    /**
     * @private
     * @type {ValueGenerator}
     */
    valueGenerator

    /**
     * @param {EvaluatorProps} props
     */
    constructor(props) {
        this.props = props

        this.compute = []
        this.reduce = []

        this.cachedValues = new Map()
        this.valueGenerator = new ValueGenerator()
    }

    /**
     * Runs the CEK machine for an expression, and for every nested FuncValue
     * @param {Expr} expr
     */
    eval(expr) {
        expr.resolveNames(new Scope(None, None))

        const v = this.evalRootExpr(expr)

        /**
         * @type {FuncValue[]}
         */
        let fns = collectFuncValues(v)

        let fn = fns.shift()
        while (fn) {
            const v = this.evalFuncValue(fn)

            fns = fns.concat(collectFuncValues(v))

            fn = fns.shift()
        }
    }

    /**
     * @private
     * @param {FuncValue} fn
     * @returns {Value}
     */
    evalFuncValue(fn) {
        const def = this.getFuncDef(fn)

        const args = def.args.map((a) => {
            const id = this.getVarId(a)
            return this.valueGenerator.genData(`Arg${id}`, Branches.empty())
        })

        this.computeCallFuncValue(fn, args, def)

        return this.evalCek()
    }

    /**
     * @private
     * @param {Expr} expr
     * @returns {Value}
     */
    evalRootExpr(expr) {
        const stack = new Stack(StackValues.empty(), Branches.empty())

        this.pushExpr(expr, stack)

        return this.evalCek()
    }

    /**
     * @private
     * @returns {Value}
     */
    evalCek() {
        let action = this.compute.pop()

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

            action = this.compute.pop()
        }

        return this.popFinalValue()
    }

    /**
     * @private
     * @param {FuncValue} fn
     * @returns {FuncExpr}
     */
    getFuncDef(fn) {
        const tag = fn.definitionTag

        return expectSome(
            this.props.funcExprs.getValueByKey(tag),
            `invalid func tag '${tag}'`
        )
    }

    /**
     * @private
     * @param {FuncExpr} expr
     * @returns {number}
     */
    getFuncTag(expr) {
        return expectSome(
            this.props.funcExprs.getKeyByValue(expr),
            `no tag found for FuncExpr`
        )
    }

    /**
     * @private
     * @param {number} id
     * @returns {Variable}
     */
    getVar(id) {
        return expectSome(
            this.props.variables.getValueByKey(id),
            `invalid variable id '${id}'`
        )
    }

    /**
     * @private
     * @param {Variable} v
     * @returns {number}
     */
    getVarId(v) {
        return expectSome(
            this.props.variables.getKeyByValue(v),
            `variable id not found`
        )
    }

    /**
     * @private
     * @param {string} key
     * @returns {Option<Value>}
     */
    getCachedValue(key) {
        return this.cachedValues.get(key)
    }

    /**
     * @private
     * @param {string} key
     * @param {Value} value
     */
    setCachedValue(key, value) {
        const prev = this.cachedValues.get(key)

        if (prev && !(prev instanceof AnyValue)) {
            if (prev.toString() != value.toString()) {
                throw new Error(
                    `unexpected, ${prev.toString()} != ${value.toString()}`
                )
            }
        } else {
            if (this.props.debug && !(value instanceof AnyValue)) {
                console.log(`%% ${key}: ${value.toString()}`)
            }

            this.cachedValues.set(key, value)
        }
    }

    /**
     * @private
     * @param {string} key
     */
    setAnyCachedValue(key) {
        const v = this.valueGenerator.genAny(key)

        if (this.cachedValues.has(key)) {
            throw new Error("unexpected")
        }

        this.cachedValues.set(key, v)

        if (this.props.debug) {
            console.log(`%% ${key}: ${v.toString()} (temp)`)
        }
    }

    /**
     * Throws an error if there are still values left in the `this.reduce` list
     * @private
     * @returns {Value}
     */
    popFinalValue() {
        const v = this.popValue()

        if (this.reduce.length != 0) {
            throw new Error("not all reduction values consumed")
        }

        return v
    }

    /**
     * @private
     * @returns {Value}
     */
    popValue() {
        return expectSome(
            this.reduce.pop(),
            "no more reduction values available"
        )
    }

    /**
     * @private
     * @param {Value} fn
     * @param {NonErrorValue[]} args
     * @param {Stack} stack - needed for the branches
     * @param {Option<CallExpr>} owner
     */
    pushCall(fn, args, stack, owner) {
        this.compute.push({
            call: fn,
            args: args,
            stack: stack,
            owner: owner
        })
    }

    /**
     * @private
     * @param {number} n
     * @param {ValueCombiner} combine
     * @param {Option<CallExpr>} owner
     */
    pushCollect(n, combine, owner) {
        this.compute.push({
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
     * Push an IR expression onto `this.compute`, unwrapping CallExprs
     * @private
     * @param {Expr} expr
     * @param {Stack} stack
     */
    pushExpr(expr, stack) {
        if (
            expr instanceof ErrorExpr ||
            expr instanceof LiteralExpr ||
            expr instanceof BuiltinExpr ||
            expr instanceof NameExpr ||
            expr instanceof FuncExpr
        ) {
            this.compute.push({ stack: stack, expr: expr })
        } else if (expr instanceof CallExpr) {
            this.compute.push({ stack: stack, expr: expr })

            this.pushExpr(expr.func, stack)

            expr.args.forEach((a) => this.pushExpr(a, stack))
        } else {
            throw new Error("unhandled expression type")
        }
    }

    /**
     * @private
     * @param {Value} value
     * @param {Option<Expr>} owner
     */
    pushValue(value, owner) {
        if (owner && this.props.onEvalExpr) {
            this.props.onEvalExpr(owner, value)
        }

        this.reduce.push(value)
    }

    /**
     * @private
     * @param {Option<Expr>} owner
     */
    pushErrorValue(owner) {
        const v = new ErrorValue()

        this.pushValue(v, owner)
    }

    /**
     * @private
     * @param {AnyExpr} expr
     * @param {Stack} stack
     */
    computeExpr(expr, stack) {
        if (expr instanceof BuiltinExpr) {
            this.computeBuiltinExpr(expr)
        } else if (expr instanceof CallExpr) {
            this.computeCallExpr(expr, stack)
        } else if (expr instanceof ErrorExpr) {
            this.computeErrorExpr(expr)
        } else if (expr instanceof FuncExpr) {
            this.computeFuncExpr(expr, stack)
        } else if (expr instanceof LiteralExpr) {
            this.computeLiteralExpr(expr)
        } else if (expr instanceof NameExpr) {
            this.computeNameExpr(expr, stack)
        } else {
            throw new Error("unhandled expression")
        }
    }

    /**
     * @private
     * @param {BuiltinExpr} expr
     */
    computeBuiltinExpr(expr) {
        const v = new BuiltinValue(expr.name, expr.safe)

        this.pushValue(v, expr)
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
        let fn = this.popValue()

        /**
         * @type {Value[]}
         */
        let args = []
        for (let i = 0; i < expr.args.length; i++) {
            args.push(this.popValue())
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
     * @param {ErrorExpr} expr
     */
    computeErrorExpr(expr) {
        this.pushErrorValue(expr)
    }

    /**
     * @private
     * @param {FuncExpr} expr
     * @param {Stack} stack
     */
    computeFuncExpr(expr, stack) {
        const tag = this.getFuncTag(expr)
        const stackSummary = this.valueGenerator.genStackSummary(
            stack.values,
            tag
        )
        const v = new FuncValue(tag, stack, stackSummary)

        // don't set owner because it is confusing wrt. return value type
        this.pushValue(v, expr)
    }

    /**
     * @private
     * @param {LiteralExpr} expr
     */
    computeLiteralExpr(expr) {
        const v = new LiteralValue(expr.value)

        this.pushValue(v, expr)
    }

    /**
     * @private
     * @param {NameExpr} expr
     * @param {Stack} stack
     */
    computeNameExpr(expr, stack) {
        const id = this.getVarId(expr.variable)
        const v = stack.getValue(id)

        this.pushValue(v, expr)
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
                    const key = stringifyCall(
                        new BuiltinValue(fn.type, false),
                        [/** @type {Value} */ (fn.condition)].concat(cases)
                    )
                    res = this.valueGenerator.genData(key, stack.branches)
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
     * @param {NonErrorValue[]} args
     * @param {Option<CallExpr>} owner
     */
    computeCallAny(fn, args, owner) {
        if (this.props.onCallAny) {
            this.props.onCallAny(args, owner)
        }

        const key = stringifyCall(fn, args)
        const v = new MaybeErrorValue(this.valueGenerator.genAny(key))

        this.pushValue(v, owner)
    }

    /**
     * @private
     * @param {BuiltinValue} builtin
     * @param {NonErrorValue[]} args
     * @param {Stack} stack
     * @param {Option<CallExpr>} owner
     */
    computeCallBuiltinValue(builtin, args, stack, owner) {
        const result = evalBuiltin(
            owner,
            builtin,
            args,
            stack,
            this.valueGenerator
        )

        this.pushValue(result, owner)
    }

    /**
     * @private
     * @param {FuncValue} fn
     * @param {NonErrorValue[]} args
     * @param {Option<FuncExpr | CallExpr>} owner for entry point ths is the entry point FuncExpr, for all other calls this is the CallExpr
     */
    computeCallFuncValue(fn, args, owner) {
        const key = stringifyCall(fn, args)
        const cached = this.getCachedValue(key)

        const fnDef = this.getFuncDef(fn)
        const callExprOwner = owner instanceof CallExpr ? owner : None

        if (args.length != fnDef.args.length) {
            throw new Error("invalid number of arguments")
        }

        if (this.props.onCallFunc) {
            this.props.onCallFunc(fnDef, callExprOwner)
        }

        if (cached) {
            this.pushValue(cached, owner)
        } else {
            const varsToValues = fnDef.args.map((a, i) => {
                const v = args[i]

                if (this.props.onPassArg) {
                    this.props.onPassArg(a, args[i])
                }

                return /** @type {[number, NonErrorValue]} */ ([
                    this.getVarId(a),
                    v
                ])
            })

            const bodyVarIds = new Set(
                Array.from(fnDef.bodyVars).map((v) => this.getVarId(v))
            )
            const allVars = fn.stack.values.extend(varsToValues, bodyVarIds)
            const allVarsBlockedRecursion = makeRecursiveDataOpaque(
                allVars,
                this.valueGenerator
            )
            const stack = new Stack(allVarsBlockedRecursion, fn.stack.branches)

            this.pushCollect(
                1,
                ([v]) => {
                    this.setCachedValue(key, v)
                    return v
                },
                callExprOwner
            )

            this.pushExpr(fnDef.body, stack)

            this.setAnyCachedValue(key)
        }
    }

    /**
     * @private
     * @param {number} nValues
     * @param {ValueCombiner} combine
     * @param {Option<CallExpr>} owner
     */
    computeCollect(nValues, combine, owner) {
        // collect multiple Values from the reductionStack and put it back as a single Value

        /**
         * @type {Value[]}
         */
        const values = []

        for (let i = 0; i < nValues; i++) {
            const v = this.popValue()

            values.push(v)
        }

        // values popped like this have inverse order of the branches, so must be reversed
        //  (reversal isn't needed when evaluating expressions and returning values, because that is push-pop-push-pop, and here it is just a single push-pop)
        values.reverse()

        const res = combine(values)

        this.pushValue(res, owner)
    }
}

/**
 * @param {Expr} root
 * @returns {[BiMap<FuncExpr>, BiMap<Variable>]}
 */
export function generateFuncTagsAndVariableIds(root) {
    /**
     * @type {BiMap<FuncExpr>}
     */
    const funcExprs = new BiMap()

    /**
     * @type {BiMap<Variable>}
     */
    const variables = new BiMap()

    loop(root, {
        funcExpr: (funcExpr) => {
            funcExprs.add(funcExpr)

            funcExpr.args.forEach((arg) => {
                variables.add(arg)
            })
        }
    })

    return [funcExprs, variables]
}
