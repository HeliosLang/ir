import { Word } from "@helios-lang/compiler-utils"
import { None } from "@helios-lang/type-utils"
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
    builtinsV2
} from "@helios-lang/uplc"
import {
    Analysis,
    Analyzer,
    Branches,
    DataValue,
    ErrorValue,
    FuncValue,
    LiteralValue
} from "../analyze/index.js"
import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    LiteralExpr,
    NameExpr,
    Variable
} from "../expressions/index.js"
import { format } from "../format/format.js"
import { collectVariables, collectVariablesWithDepth } from "./collect.js"
import { loop } from "./loop.js"
import { mutate } from "./mutate.js"
import { Factorizer } from "./Factorizer.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 */

/**
 * Any FuncExpr that is smaller or equal to this number will be inlined.
 *
 * Examples of helios builtin functions that should be inlined:
 *   * __helios__bool__and
 *   * __helios__common__enum_field_0
 *
 * This is a number of bits
 */
const INLINE_MAX_SIZE = 128

/**
 * @param {Expr} func
 * @returns {boolean}
 */
function isIdentityFunc(func) {
    if (
        func instanceof FuncExpr &&
        func.args.length == 1 &&
        func.body instanceof NameExpr &&
        func.body.isVariable(func.args[0])
    ) {
        return true
    } else {
        return false
    }
}

/**
 * @typedef {{
 *   commonSubExpressionPrefix: string
 * }} OptimizerOptions
 */

/**
 * @type {OptimizerOptions}
 */
const DEFAULT_OPTIMIZER_OPTIONS = {
    commonSubExpressionPrefix: "__common"
}

/**
 * Recursive algorithm that performs the following optimizations:
 *   - replace `NameExpr` by `LiteralExpr` if the expected value is LiteralValue
 *   - replace `CallExpr` by `LiteralExpr` if the expected value is LiteralValue
 *   - replace `NameExpr` by `ErrorExpr` if the expected value is ErrorValue
 *   - replace `CallExpr` by `ErrorExpr` if the expected value is ErrorValue
 *   - replace `addInteger(<expr>, 0)` or `addInteger(0, <expr>)` by `<expr>`
 *   - replace `subtractInteger(<expr>, 0)` by `<expr>`
 *   - replace `multiplyInteger(<expr>, 1)` or `multiplyInteger(1, <expr>)` by `<expr>`
 *   - replace `divideInteger(<expr>, 1)` by `<expr>`
 *   - replace `quotientInteger(<expr>, 1)` by `<expr>`
 *   - replace `appendByteString(<expr>, #)` or `appendByteString(#, <expr>)` by `<expr>`
 *   - replace `appendString(<expr>, "")` or `appendString("", <expr>)` by `<expr>`
 *   - replace `decodeUtf8(encodeUtf8(<expr>))` by `<expr>`
 *   - replace `ifThenElse(true, <expr-a>, <expr-b>)` by `<expr-a>` if `<expr-b>` doesn't expect ErrorValue
 *   - replace `ifThenElse(false, <expr-a>, <expr-b>)` by `<expr-b>` if `<expr-a>` doesn't expect ErrorValue
 *   - replace `ifThenElse(nullList(<lst-expr>), <expr-a>, <expr-b>)` by `chooseList(<lst-expr>, <expr-a>, <expr-b>)`
 *   - replace `ifThenElse(<cond-expr>, <expr-a>, <expr-a>)` by `<expr-a>` if `<cond-expr>` doesn't expect ErrorValue
 *   - replace `chooseUnit(<expr>, ())` by `<expr>` (because `<expr>` is expected to return unit as well)
 *   - replace `chooseUnit((), <expr>)` by `<expr>`
 *   - replace `trace(<msg-expr>, <ret-expr>)` by `<ret_expr>` if `<msg-expr>` doesn't expect ErrorValue
 *   - replace `chooseList([], <expr-a>, <expr-b>)` by `<expr-a>` if `<expr-b>` doesn't expect ErrorValue
 *   - replace `chooseList([...], <expr-a>, <expr-b>)` by `<expr-b>` if `<expr-a>` doesn't expect ErrorValue
 *   - replace `chooseData(ConstrData, <C-expr>, <M-expr>, <L-expr>, <I-expr>, <B-expr>)` by `<C-expr>` if none of the other expressions expect ErrorValue
 *   - replace `chooseData(constrData(<index-expr>, <fields-expr>), <C-expr>, <M-expr>, <L-expr>, <I-expr>, <B-expr>)` by `<C-expr>` if none of the other expressions expect ErrorValue
 *   - replace `chooseData(MapData, <C-expr>, <M-expr>, <L-expr>, <I-expr>, <B-expr>)` by `<M-expr>` if none of the other expression expect ErrorValue
 *   - replace `chooseData(mapData(<data-expr>), <C-expr>, <M-expr>, <L-expr>, <I-expr>, <B-expr>)` by `<M-expr>` if none of the other expression expect ErrorValue
 *   - replace `chooseData(ListData, <C-expr>, <M-expr>, <L-expr>, <I-expr>, <B-expr>)` by `<L-expr>` if none of the other expression expect ErrorValue
 *   - replace `chooseData(listData(<data-expr>), <C-expr>, <M-expr>, <L-expr>, <I-expr>, <B-expr>)` by `<L-expr>` if none of the other expression expect ErrorValue
 *   - replace `chooseData(IntData, <C-expr>, <M-expr>, <L-expr>, <I-expr>, <B-expr>)` by `<I-expr>` if none of the other expression expect ErrorValue
 *   - replace `chooseData(iData(<data-expr>), <C-expr>, <M-expr>, <L-expr>, <I-expr>, <B-expr>)` by `<I-expr>` if none of the other expression expect ErrorValue
 *   - replace `chooseData(ByteArrayData, <C-expr>, <M-expr>, <L-expr>, <I-expr>, <B-expr>)` by `<B-expr>` if none of the other expression expect ErrorValue
 *   - replace `chooseData(bData(<data-expr>), <C-expr>, <M-expr>, <L-expr>, <I-expr>, <B-expr>)` by `<B-expr>` if none of the other expression expect ErrorValue
 *   - replace `unMapData(mapData(<expr>))` by `<expr>`
 *   - replace `unListData(listData(<expr>))` by `<expr>`
 *   - replace `unIData(iData(<expr>))` by `<expr>`
 *   - replace `unBData(bData(<expr>))` by `<expr>`
 *   - replace `equalsData(iData(<expr-a>), iData(<expr-b>))` by `equalsInteger(<expr-a>, <expr-b>)`
 *   - replace `equalsData(bData(<expr-a>), bData(<expr-b>))` by `equalsByteString(<expr-a>, <expr-b>)`
 *   - remove unused FuncExpr arg variables if none if the corresponding CallExpr args expect errors and if all the the CallExprs expect only this FuncExpr
 *   - replace CallExpr args that are uncalled FuncExprs with `()`
 *   - flatten nested FuncExprs if the correspondng CallExprs always call them in succession
 *   - replace `(<vars>) -> {<name-expr>(<vars>)}` by `<name-expr>` if each var is only referenced once (i.e. only referenced in the call)
 *   - replace `(<var>) -> {<var>}(<arg-expr>)` by `<arg-expr>`
 *   - replace `<name-expr>(<arg-expr>)` by `<arg-expr>` if the expected value of `<name-expr>` is the identity function
 *   - replace `(<vars>) -> {<func-expr>(<vars>)}` by `<func-expr>` if each var is only referenced once (i.e. only referenced in the call)
 *   - inline (copies) of `<name-expr>` in `(<vars>) -> {...}(<name-expr>, ...)`
 *   - inline `<fn-expr>` in `(<vars>) -> {...}(<fn-expr>, ...)` if the corresponding var is only referenced once
 *   - inline `<fn-expr>` in `(<vars>) -> {...}(<fn-expr>, ...)` if `<fn-expr>` has a Uplc flat size smaller than INLINE_MAX_SIZE
 *   - inline `<call-expr>` in `(<vars>) -> {...}(<call-expr>, ...)` if the corresponding var is only referenced once and if all the nested FuncExprs are only evaluated once and if the CallExpr doesn't expect an error
 *   - replace `() -> {<expr>}()` by `<expr>`
 *   - factorize common sub-expressions
 *
 * Optimizations that we have considered, but are NOT performed:
 *   * replace `subtractInteger(0, <expr>)` by `multiplyInteger(<expr>, -1)`
 *       reason: it is unclear if either method is cheaper for the majority of cases
 *   * replace `multiplyInteger(<expr>, -1)` by `subtractInteger(0, <expr>)`
 *       reason: it is unclear if either method is cheaper for the majority of cases
 */
export class Optimizer {
    /**
     * @type {Expr}
     */
    #root

    /**
     * @type {Map<Variable, Expr>}
     */
    #inlining

    /**
     * @readonly
     * @type {OptimizerOptions}
     */
    options

    /**
     * @param {Expr} root
     * @param {OptimizerOptions} options
     */
    constructor(root, options = DEFAULT_OPTIMIZER_OPTIONS) {
        this.#root = root

        assertNoDuplicateExprs(root)

        this.#inlining = new Map()
        this.options = options
    }

    /**
     * First apply following optimizations:
     *   - flatten nested FuncExpr where possible
     *   - remove unused FuncExpr variables
     *   - factorize common sub-expressions
     * @returns {Expr}
     */
    optimize() {
        let analyzer = new Analyzer(this.#root)
        let analysis = analyzer.analyze()

        this.removeUnusedArgs(analysis)
        this.replaceUncalledArgsWithUnit(analysis)
        this.factorizeCommon(analysis)

        // rerun analysis
        analyzer = new Analyzer(this.#root)
        analysis = analyzer.analyze()

        this.flattenNestedFuncExprs(analysis)

        const expr = this.optimizeInternal(analysis, this.#root)

        assertNoDuplicateExprs(expr)

        return expr
    }

    /**
     * Makes sure the callCount is copied from IREvaluator
     * @private
     * @param {Analysis} analysis
     * @param {FuncExpr} old
     * @param {Variable[]} args
     * @param {Expr} body
     * @returns {FuncExpr}
     */
    newFuncExpr(analysis, old, args, body) {
        const funcExpr = new FuncExpr(old.site, args, body)

        analysis.notifyCopyExpr(old, funcExpr)

        return funcExpr
    }

    /**
     * Mutates
     * @private
     * @param {Analysis} analysis
     */
    removeUnusedArgs(analysis) {
        const funcExprs = analysis.funcExprs.filter((expr) => {
            const unusedIndices = analysis.getUnusedFuncVariables(expr)

            return (
                unusedIndices.length > 0 &&
                analysis.onlyDedicatedCallExprs(expr) &&
                analysis.noUnusedArgErrors(expr, unusedIndices)
            )
        })

        funcExprs.forEach((expr) => {
            const unusedIndices = analysis.getUnusedFuncVariables(expr)
            const unused = new Set(unusedIndices)

            const callExprs = analysis.getFuncCallExprs(expr)

            callExprs.forEach((callExpr) => {
                callExpr.args = callExpr.args.filter((a, i) => !unused.has(i))
            })

            expr.args = expr.args.filter((a, i) => !unused.has(i))
        })
    }

    /**
     * TODO: improve Analyzer to make sure all possible FuncExpr calls are evaluated
     * @private
     * @param {Analysis} analysis
     */
    replaceUncalledArgsWithUnit(analysis) {
        loop(this.#root, {
            callExpr: (callExpr) => {
                callExpr.args = callExpr.args.map((a) => {
                    if (
                        a instanceof FuncExpr &&
                        analysis.countFuncCalls(a) == 0
                    ) {
                        return new LiteralExpr(new UplcUnit(), a.site)
                    } else {
                        return a
                    }
                })
            }
        })
    }

    /**
     * TODO: properly take care of the branches
     * @private
     * @param {Analysis} analysis
     */
    factorizeCommon(analysis) {
        const factorizer = new Factorizer(this.#root, analysis, this.options)

        factorizer.factorize()

        this.#root = factorizer.root
    }

    /**
     * In scope order, call func before call args
     * @private
     * @returns {FuncExpr[]}
     */
    collectFuncExprs() {
        /**
         * @type {FuncExpr[]}
         */
        const funcExprs = []

        loop(this.#root, {
            funcExpr: (funcExpr) => {
                funcExprs.push(funcExpr)
            }
        })

        return funcExprs
    }

    /**
   
     * @private
     * @param {Analysis} analysis
     */
    flattenNestedFuncExprs(analysis) {
        const funcExprs = this.collectFuncExprs()

        /**
         * @type {Set<FuncExpr>}
         */
        const done = new Set()

        funcExprs.forEach((expr) => {
            if (done.has(expr)) {
                return
            }

            let last = expr
            let args = expr.args.slice()
            let depth = 1

            while (
                last.body instanceof FuncExpr &&
                analysis.onlyDedicatedCallExprs(last.body) &&
                analysis.onlyNestedCalls(last, last.body)
            ) {
                depth += 1
                last = last.body
                args = args.concat(last.args.slice())
                done.add(last)
            }

            if (depth == 1) {
                // don't do anything
                return
            }

            const callExprs = analysis.getFuncCallExprs(last)

            if (callExprs.length <= 0) {
                throw new Error("unexpected")
            }

            callExprs.forEach((callExpr) => {
                let inner = callExpr

                /**
                 * @type {Expr[][]}
                 */
                let allArgs = []

                for (let i = 0; i < depth; i++) {
                    allArgs.push(inner.args.slice())

                    if (i < depth - 1) {
                        if (!(inner.func instanceof CallExpr)) {
                            throw new Error("unexpected")
                        }

                        inner = inner.func
                    }
                }

                callExpr.func = inner.func
                callExpr.args = allArgs.reverse().flat()
            })

            expr.args = args
            expr.body = last.body
        })
    }

    /**
     * @private
     * @param {Analysis} analysis
     * @param {Expr} expr
     * @returns {Option<Expr>}
     */
    replaceByErrorOrLiteral(analysis, expr) {
        const v = analysis.getExprValue(expr)

        if (v && v.length == 1) {
            const vv = v[0]
            if (vv instanceof LiteralValue) {
                return new LiteralExpr(vv.value, expr.site)
            } else if (vv instanceof ErrorValue) {
                return new ErrorExpr(expr.site)
            }
        }

        return None
    }

    /**
     * @private
     * @param {Analysis} analysis
     * @param {FuncExpr} start
     * @param {NameExpr} nameExpr
     * @returns {boolean}
     */
    isEvaluatedMoreThanOnce(analysis, start, nameExpr) {
        /**
         * @type {Map<Expr, CallExpr | FuncExpr>}
         */
        const parents = new Map()

        let foundNameExpr = false

        loop(start, {
            funcExpr: (funcExpr) => {
                parents.set(funcExpr.body, funcExpr)
            },
            callExpr: (callExpr) => {
                parents.set(callExpr.func, callExpr)
                callExpr.args.forEach((a) => {
                    parents.set(a, callExpr)
                })
            },
            nameExpr: (ne) => {
                foundNameExpr = ne == nameExpr
            },
            exit: () => {
                return foundNameExpr
            }
        })

        let parent = parents.get(nameExpr)

        while (parent && parent != start) {
            if (
                parent instanceof FuncExpr &&
                analysis.countFuncCalls(parent) > 1
            ) {
                return true
            }

            parent = parents.get(parent)
        }

        return false
    }

    /**
     * @private
     * @param {Variable} v
     * @param {Expr} expr
     */
    inline(v, expr) {
        this.#inlining.set(v, expr)
    }

    /**
     * @private
     * @param {Analysis} analysis
     * @param {NameExpr} expr
     * @returns {Expr}
     */
    optimizeNameExpr(analysis, expr) {
        let newExpr = this.replaceByErrorOrLiteral(analysis, expr)

        if (newExpr) {
            return newExpr
        }

        newExpr = this.#inlining.get(expr.variable)

        if (newExpr) {
            // always copy to make sure any (nested) NameExpr is unique (=> unique DeBruijn index)
            //  also so that functions that are inlined multiple times each get unique variables
            return newExpr.copy((oldExpr, newExpr) => {
                analysis.notifyCopyExpr(oldExpr, newExpr)
            }, new Map())
        }

        return expr
    }

    /**
     * @private
     * @param {Analysis} analysis
     * @param {BuiltinExpr} expr
     * @returns {Expr}
     */
    optimizeBuiltinExpr(analysis, expr) {
        let newExpr = this.replaceByErrorOrLiteral(analysis, expr)

        if (newExpr) {
            return newExpr
        }

        return expr
    }

    /**
     * @private
     * @param {Analysis} analysis
     * @param {CallExpr} expr
     * @returns {Expr}
     */
    optimizeBuiltinCallExpr(analysis, expr) {
        if (!(expr.func instanceof BuiltinExpr)) {
            throw new Error("unexpected")
        }

        const builtinName = expr.func.name

        const args = expr.args

        switch (builtinName) {
            case "addInteger": {
                const [a, b] = args

                if (
                    a instanceof LiteralExpr &&
                    a.value instanceof UplcInt &&
                    a.value.value == 0n
                ) {
                    return b
                } else if (
                    b instanceof LiteralExpr &&
                    b.value instanceof UplcInt &&
                    b.value.value == 0n
                ) {
                    return a
                }

                break
            }
            case "subtractInteger": {
                const [a, b] = args

                if (
                    b instanceof LiteralExpr &&
                    b.value instanceof UplcInt &&
                    b.value.value == 0n
                ) {
                    return a
                }

                break
            }
            case "multiplyInteger": {
                const [a, b] = args

                if (
                    a instanceof LiteralExpr &&
                    a.value instanceof UplcInt &&
                    a.value.value == 1n
                ) {
                    return b
                } else if (
                    b instanceof LiteralExpr &&
                    b.value instanceof UplcInt &&
                    b.value.value == 1n
                ) {
                    return a
                }

                break
            }
            case "divideInteger": {
                const [a, b] = args

                if (
                    b instanceof LiteralExpr &&
                    b.value instanceof UplcInt &&
                    b.value.value == 1n
                ) {
                    return a
                }

                break
            }
            case "quotientInteger": {
                const [a, b] = args

                if (
                    b instanceof LiteralExpr &&
                    b.value instanceof UplcInt &&
                    b.value.value == 1n
                ) {
                    return a
                }

                break
            }
            case "appendByteString": {
                const [a, b] = args

                if (
                    a instanceof LiteralExpr &&
                    a.value instanceof UplcByteArray &&
                    a.value.bytes.length == 0
                ) {
                    return b
                } else if (
                    b instanceof LiteralExpr &&
                    b.value instanceof UplcByteArray &&
                    b.value.bytes.length == 0
                ) {
                    return a
                }

                break
            }
            case "appendString": {
                const [a, b] = args

                if (
                    a instanceof LiteralExpr &&
                    a.value instanceof UplcString &&
                    a.value.string == ""
                ) {
                    return b
                } else if (
                    b instanceof LiteralExpr &&
                    b.value instanceof UplcString &&
                    b.value.string == ""
                ) {
                    return a
                }

                break
            }
            case "decodeUtf8": {
                const [arg] = args

                if (
                    arg instanceof CallExpr &&
                    arg.func instanceof BuiltinExpr &&
                    arg.func.name == "encodeUtf8"
                ) {
                    return arg.args[0]
                }

                break
            }
            case "ifThenElse": {
                const [cond, a, b] = args

                if (cond instanceof LiteralExpr) {
                    if (!(cond.value instanceof UplcBool)) {
                        throw new Error("unexpected")
                    }

                    if (cond.value.bool && !analysis.expectsError(b)) {
                        return a
                    } else if (!cond.value.bool && !analysis.expectsError(a)) {
                        return b
                    }
                } else if (!analysis.expectsError(cond) && a.isEqual(b)) {
                    return a
                } else if (
                    cond instanceof CallExpr &&
                    cond.func instanceof BuiltinExpr &&
                    cond.func.name == "nullList"
                ) {
                    const newExpr = new CallExpr(
                        expr.site,
                        new BuiltinExpr(
                            "chooseList",
                            builtinsV2.findIndex((b) => b.name == "chooseList"),
                            true,
                            1,
                            expr.site
                        ),
                        [cond.args[0], a, b]
                    )

                    analysis.notifyCopyExpr(expr, newExpr)

                    return newExpr
                }

                break
            }
            case "chooseUnit": {
                const [a, b] = args

                if (a instanceof LiteralExpr && a.value instanceof UplcUnit) {
                    return b
                } else if (
                    b instanceof LiteralExpr &&
                    b.value instanceof UplcUnit
                ) {
                    return a
                }

                break
            }
            case "trace": {
                const [a, b] = args

                if (!analysis.expectsError(a)) {
                    return b
                }

                break
            }
            case "chooseList": {
                const [lst, a, b] = args

                if (lst instanceof LiteralExpr) {
                    if (!(lst.value instanceof UplcList)) {
                        throw new Error("unexpected")
                    }

                    if (
                        lst.value.items.length == 0 &&
                        !analysis.expectsError(b)
                    ) {
                        return a
                    } else if (
                        lst.value.items.length > 0 &&
                        !analysis.expectsError(a)
                    ) {
                        return b
                    }
                }

                break
            }
            case "chooseData": {
                const [cond, C, M, L, I, B] = args

                if (cond instanceof LiteralExpr) {
                    if (!(cond.value instanceof UplcDataValue)) {
                        throw new Error("unexpected")
                    }

                    if (
                        cond.value.value instanceof ConstrData &&
                        !analysis.expectsError(M) &&
                        !analysis.expectsError(L) &&
                        !analysis.expectsError(I) &&
                        !analysis.expectsError(B)
                    ) {
                        return C
                    } else if (
                        cond.value.value instanceof MapData &&
                        !analysis.expectsError(C) &&
                        !analysis.expectsError(L) &&
                        !analysis.expectsError(I) &&
                        !analysis.expectsError(B)
                    ) {
                        return M
                    } else if (
                        cond.value.value instanceof ListData &&
                        !analysis.expectsError(C) &&
                        !analysis.expectsError(M) &&
                        !analysis.expectsError(I) &&
                        !analysis.expectsError(B)
                    ) {
                        return L
                    } else if (
                        cond.value.value instanceof IntData &&
                        !analysis.expectsError(C) &&
                        !analysis.expectsError(M) &&
                        !analysis.expectsError(L) &&
                        !analysis.expectsError(B)
                    ) {
                        return I
                    } else if (
                        cond.value.value instanceof ByteArrayData &&
                        !analysis.expectsError(C) &&
                        !analysis.expectsError(M) &&
                        !analysis.expectsError(L) &&
                        !analysis.expectsError(I)
                    ) {
                        return B
                    }
                } else if (
                    cond instanceof CallExpr &&
                    cond.func instanceof BuiltinExpr &&
                    !analysis.expectsError(cond)
                ) {
                    if (
                        cond.func.name == "constrData" &&
                        !analysis.expectsError(M) &&
                        !analysis.expectsError(L) &&
                        !analysis.expectsError(I) &&
                        !analysis.expectsError(B)
                    ) {
                        return C
                    } else if (
                        cond.func.name == "mapData" &&
                        !analysis.expectsError(C) &&
                        !analysis.expectsError(L) &&
                        !analysis.expectsError(I) &&
                        !analysis.expectsError(B)
                    ) {
                        return M
                    } else if (
                        cond.func.name == "listData" &&
                        !analysis.expectsError(C) &&
                        !analysis.expectsError(M) &&
                        !analysis.expectsError(I) &&
                        !analysis.expectsError(B)
                    ) {
                        return L
                    } else if (
                        cond.func.name == "iData" &&
                        !analysis.expectsError(C) &&
                        !analysis.expectsError(M) &&
                        !analysis.expectsError(L) &&
                        !analysis.expectsError(B)
                    ) {
                        return I
                    } else if (
                        cond.func.name == "bData" &&
                        !analysis.expectsError(C) &&
                        !analysis.expectsError(M) &&
                        !analysis.expectsError(L) &&
                        !analysis.expectsError(I)
                    ) {
                        return B
                    }
                }

                break
            }
            case "unMapData": {
                const [arg] = args

                if (
                    arg instanceof CallExpr &&
                    arg.func instanceof BuiltinExpr &&
                    arg.func.name == "mapData"
                ) {
                    return arg.args[0]
                }

                break
            }
            case "unListData": {
                const [arg] = args

                if (
                    arg instanceof CallExpr &&
                    arg.func instanceof BuiltinExpr &&
                    arg.func.name == "listData"
                ) {
                    return arg.args[0]
                }

                break
            }
            case "unIData": {
                const [arg] = args

                if (
                    arg instanceof CallExpr &&
                    arg.func instanceof BuiltinExpr &&
                    arg.func.name == "iData"
                ) {
                    return arg.args[0]
                }

                break
            }
            case "unBData": {
                const [arg] = args

                if (
                    arg instanceof CallExpr &&
                    arg.func instanceof BuiltinExpr &&
                    arg.func.name == "bData"
                ) {
                    return arg.args[0]
                }

                break
            }
            case "equalsData": {
                const [a, b] = args

                if (
                    a instanceof CallExpr &&
                    a.func instanceof BuiltinExpr &&
                    a.func.name == "iData" &&
                    b instanceof CallExpr &&
                    b.func instanceof BuiltinExpr &&
                    b.func.name == "iData"
                ) {
                    const newExpr = new CallExpr(
                        expr.site,
                        new BuiltinExpr(
                            "equalsInteger",
                            builtinsV2.findIndex(
                                (b) => b.name == "equalsInteger"
                            ),
                            false,
                            0,
                            expr.site
                        ),
                        [a.args[0], b.args[0]]
                    )

                    analysis.notifyCopyExpr(expr, newExpr)

                    return newExpr
                } else if (
                    a instanceof CallExpr &&
                    a.func instanceof BuiltinExpr &&
                    a.func.name == "bData" &&
                    b instanceof CallExpr &&
                    b.func instanceof BuiltinExpr &&
                    b.func.name == "bData"
                ) {
                    const newExpr = new CallExpr(
                        expr.site,
                        new BuiltinExpr(
                            "equalsByteString",
                            builtinsV2.findIndex(
                                (b) => b.name == "equalsByteString"
                            ),
                            false,
                            0,
                            expr.site
                        ),
                        [a.args[0], b.args[0]]
                    )

                    analysis.notifyCopyExpr(expr, newExpr)

                    return newExpr
                }

                break
            }
        }

        return expr
    }

    /**
     * @private
     * @param {Analysis} analysis
     * @param {CallExpr} expr
     * @returns {Expr}
     */
    optimizeCallExpr(analysis, expr) {
        const newExprErrorOrLiteral = this.replaceByErrorOrLiteral(
            analysis,
            expr
        )

        if (newExprErrorOrLiteral) {
            return newExprErrorOrLiteral
        }

        let func = expr.func

        let args = expr.args.map((a) => this.optimizeInternal(analysis, a))

        if (isIdentityFunc(func)) {
            if (args.length != 1) {
                throw new Error("unexpected")
            }

            return args[0]
        } else if (func instanceof NameExpr) {
            const v = analysis.getExprValue(func)

            if (
                v &&
                v.every(
                    (v) =>
                        v instanceof FuncValue &&
                        isIdentityFunc(
                            analysis.getFuncDefinition(v.definitionTag)
                        )
                )
            ) {
                if (args.length != 1) {
                    throw new Error("unexpected")
                }

                return args[0]
            }
        }

        // see if any arguments can be inlined
        if (func instanceof FuncExpr) {
            let unused = new Set()

            const funcExpr = func
            const variables = func.args

            args.forEach((a, i) => {
                const v = variables[i]

                if (a instanceof NameExpr || a instanceof BuiltinExpr) {
                    // inline all NameExprs
                    unused.add(i)
                    this.inline(v, a)
                } else if (
                    a instanceof FuncExpr &&
                    (analysis.countVariableReferences(v) == 1 ||
                        a.flatSize <= INLINE_MAX_SIZE)
                ) {
                    // inline FuncExpr if it is only reference once
                    unused.add(i)
                    this.inline(v, a)
                } else if (
                    a instanceof CallExpr &&
                    analysis.countVariableReferences(v) == 1 &&
                    !analysis.expectsError(a)
                ) {
                    const nameExpr = analysis.getVariableReferences(v)[0]

                    if (
                        !this.isEvaluatedMoreThanOnce(
                            analysis,
                            funcExpr,
                            nameExpr
                        )
                    ) {
                        unused.add(i)
                        this.inline(v, a)
                    }
                }
            })

            if (unused.size > 0) {
                args = args.filter((a, i) => !unused.has(i))

                const newFuncExpr = this.newFuncExpr(
                    analysis,
                    func,
                    func.args.filter((a, i) => !unused.has(i)),
                    func.body
                )

                func = newFuncExpr
            }
        }

        if (
            args.length == 0 &&
            func instanceof FuncExpr &&
            func.args.length == 0
        ) {
            return this.optimizeInternal(analysis, func.body)
        }

        const newExpr = new CallExpr(
            expr.site,
            this.optimizeInternal(analysis, func),
            args
        )

        analysis.notifyCopyExpr(expr, newExpr)

        if (newExpr.func instanceof BuiltinExpr) {
            return this.optimizeBuiltinCallExpr(analysis, newExpr)
        }

        return newExpr
    }

    /**
     * @private
     * @param {Analysis} analysis
     * @param {FuncExpr} expr
     * @returns {Expr}
     */
    optimizeFuncExpr(analysis, expr) {
        expr = this.newFuncExpr(
            analysis,
            expr,
            expr.args,
            this.optimizeInternal(analysis, expr.body)
        )

        if (
            expr.body instanceof CallExpr &&
            (expr.body.func instanceof NameExpr ||
                expr.body.func instanceof BuiltinExpr ||
                expr.body.func instanceof FuncExpr) &&
            expr.body.args.length == expr.args.length &&
            expr.body.args.every((a, i) => {
                return (
                    a instanceof NameExpr &&
                    a.isVariable(expr.args[i]) &&
                    analysis.countVariableReferences(expr.args[i]) == 1
                )
            })
        ) {
            return expr.body.func
        }

        return expr
    }

    /**
     * @private
     * @param {Analysis} analysis
     * @param {Expr} expr
     */
    optimizeInternal(analysis, expr) {
        const newExpr = (() => {
            if (expr instanceof LiteralExpr) {
                // already optimal
                return expr
            } else if (expr instanceof ErrorExpr) {
                // already optimal
                return expr
            } else if (expr instanceof NameExpr) {
                return this.optimizeNameExpr(analysis, expr)
            } else if (expr instanceof BuiltinExpr) {
                return this.optimizeBuiltinExpr(analysis, expr)
            } else if (expr instanceof CallExpr) {
                return this.optimizeCallExpr(analysis, expr)
            } else if (expr instanceof FuncExpr) {
                return this.optimizeFuncExpr(analysis, expr)
            } else {
                throw new Error("unhandled IRExpr")
            }
        })()

        return newExpr
    }
}

/**
 * @param {Expr} expr
 * @param {OptimizerOptions} options
 * @returns {Expr}
 */
export function optimize(expr, options = DEFAULT_OPTIMIZER_OPTIONS) {
    const formatOptions = { syntacticSugar: false }

    let dirty = true
    let oldState = format(expr, formatOptions)

    while (dirty) {
        dirty = false

        const optimizer = new Optimizer(expr, options)

        expr = optimizer.optimize()

        const newState = format(expr, formatOptions)

        if (newState != oldState) {
            dirty = true
            oldState = newState
        }
    }

    return expr
}

/**
 * It is very important that each NameExpr is unique so they can resolve to different Debruijn indices
 * @param {Expr} expr
 */
function assertNoDuplicateExprs(expr) {
    /**
     * @type {Set<Expr>}
     */
    const s = new Set()

    loop(expr, {
        nameExpr: (nameExpr) => {
            if (s.has(nameExpr)) {
                throw new Error("duplicate NameExpr " + nameExpr.name)
            }

            s.add(nameExpr)
        }
    })
}
