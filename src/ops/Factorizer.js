import { Word } from "@helios-lang/compiler-utils"
import { Analysis, Branches, DataValue } from "../analyze/index.js"
import { CallExpr, FuncExpr, NameExpr, Variable } from "../expressions/index.js"
import { format } from "../format/index.js"
import { collectVariablesWithDepth } from "./collect.js"
import { collectVariables } from "./collect.js"
import { mutate } from "./mutate.js"
import { loop } from "./loop.js"
import { expectSome } from "@helios-lang/type-utils"

/**
 * @typedef {import("../analyze/index.js").Branch} Branch
 * @typedef {import("../analyze/index.js").BranchesGroup} BranchesGroup
 * @typedef {import("../expressions/index.js").Expr} Expr
 */

/**
 * @typedef {{commonSubExpressionPrefix: string}} FactorizerOptions
 */

export class Factorizer {
    /**
     * @type {Expr}
     */
    root

    /**
     * @readonly
     * @type {Analysis}
     */
    analysis

    /**
     * @readonly
     * @type {FactorizerOptions}
     */
    options

    /**
     * @private
     * @type {number}
     */
    commonCount

    /**
     * @private
     * @type {Map<CallExpr, NameExpr>}
     */
    substitutions

    /**
     * @private
     * @type {Map<Variable, {vars: Variable[], injected: Variable, expr: CallExpr}[]>}
     */
    injections

    /**
     * @private
     * @type {Map<FuncExpr, {root: Branches, vars: Variable[], injected: Variable, expr: CallExpr}[]>}
     */
    branchInjections

    /**
     * @param {Expr} root 
     * @param {Analysis} analysis 
     * @param {FactorizerOptions} options
     */
    constructor(root, analysis, options) {
        this.root = root
        this.analysis = analysis
        this.options = options

        this.commonCount = 0
        this.substitutions = new Map()
        this.injections = new Map()
        this.branchInjections = new Map()
    }

    /**
     * @returns {void}
     */
    factorize() {
        this.detectCommonExpressions()

        this.root = this.applySubstitutions(this.root)
        this.applyRegularSubstitutions()
        this.applyBranchedSubsititions()

        this.injectBranchedCommonExpressions()
        this.injectRegularCommonExpressions()
    }

    
    /**
     * @private
     * @param {Expr} expr
     * @returns {Expr}
     */
    applySubstitutions = (expr) => {
        return mutate(expr, {
            callExpr: (callExpr, oldCallExpr) => {
                const nameExpr = this.substitutions.get(oldCallExpr)

                if (nameExpr) {
                    return nameExpr
                } else {
                    return callExpr
                }
            },
            funcExpr: (funcExpr, oldFuncExpr) => {
                const old = this.branchInjections.get(oldFuncExpr)

                if (old) {
                    this.branchInjections.set(funcExpr, old)
                    this.branchInjections.delete(oldFuncExpr)
                }

                return funcExpr
            }
        })
    }

    /**
     * @private
     */
    applyRegularSubstitutions() {
        this.injections.forEach((entry) => {
            entry.forEach((entry) => {
                entry.expr.args = entry.expr.args.map((a) =>
                    this.applySubstitutions(a)
                )
            })
        })
    }

    /**
     * @private
     */
    applyBranchedSubsititions() {
        this.branchInjections.forEach((entry) => {
            entry.forEach((entry) => {
                entry.expr.args = entry.expr.args.map((a) => 
                    this.applySubstitutions(a))
            })
        })
    }

    /**
     * @private
     */
    detectCommonExpressions() {
        const callExprs = this.analysis.collectFactorizableDataCallExprs()

        Array.from(callExprs.entries())
            .sort((a, b) => a[0] - b[0])
            .forEach(([key, callExprs]) => {
                const callExprsArray = Array.from(callExprs)

                const dataValues = callExprsArray.map((ce) => {
                    return expectSome(this.analysis.getSingleExprDataValue(ce))
                })

                if (dataValues.some((dv) => dv.branches.isEmpty())) {
                    this.detectRegularCommonExpression(callExprsArray)
                } else {
                    this.detectBranchCommonExpression(callExprsArray, dataValues)
                }

            })
    }

    /**
     * @private
     * @param {CallExpr[]} callExprs
     */
    detectRegularCommonExpression(callExprs) {
        const injectedId = this.commonCount
        this.commonCount++

        const injectedName = new Word(
            `${this.options.commonSubExpressionPrefix}${injectedId}`
        )
        const injectedVar = new Variable(injectedName)
        const firstCallExpr = callExprs[0] //
        const variables = collectVariablesWithDepth(firstCallExpr)

        // sort lower Debruijn indices first
        variables.sort((a, b) => a[0] - b[0])

        const deepest = variables[0][1]
        const allVars = variables.map((v) => v[1])

        // make sure the other call expressions depend on the same deepest variable
        if (
            !callExprs.slice(1).every((ce) => {
                const vs = collectVariables(ce)

                return vs.has(deepest)
            })
        ) {
            this.commonCount--
            return
        }

        const prev = this.injections.get(deepest)

        const entry = {
            vars: allVars,
            injected: injectedVar,
            expr: firstCallExpr // for nested substitions we must also apply all substitutions to this expression
        }

        if (prev) {
            prev.push(entry)
        } else {
            this.injections.set(deepest, [entry])
        }

        // because each CallExpr returns the same runtime value, they can be replaced by the variable pointing to the common value
        callExprs.forEach((ce, i) => {
            this.substitutions.set(
                ce,
                new NameExpr(injectedName, injectedVar)
            )
        })
    }

    /**
     * @private
     * @param {CallExpr[]} callExprsArray 
     * @param {DataValue[]} dataValues
     */
    detectBranchCommonExpression(callExprsArray, dataValues) {
        // split branches, only handle groups with at least 2 entries
        const groups = Branches.group(
            dataValues.map((dv) => dv.branches)
        ).filter((g) => g.entries.length > 1)

        groups.forEach((group) => {
            this.detectBranchGroupCommonExpression(group.root, group.entries.map(
                (i) => callExprsArray[i]
            ))
        })
    }

    /**
     * @private
     * @param {Branch} branch
     * @returns {FuncExpr}
     */
    resolveBranchFuncExpr(branch) {
        const callExpr = branch.expr // typically `ifThenElse(cond, branch1, branch2)`

        // TODO: this is a very bad way of detecting where to inject the common expression because it assumes everything has already been inlined
        const branchExpr =
            callExpr.args[branch.index + 1]

        // a () -> {...} expression is expected
        if (branchExpr instanceof FuncExpr) {
            return branchExpr
        } else {
            const fn = this.analysis.getSingleExprFuncValue(branchExpr)

            if (fn) {
                const tag = fn.definitionTag

                return this.analysis.getFuncDefinition(tag)
            } else {
                console.log(format(branchExpr))
                throw new Error("FuncExpr for branch not found")
            }
        }
    }

    /**
     * Each call Expr returns the same value (i.e. resulting from the identical calculation)
     * The last branch determines where the injections can be made
     * @private
     * @param {Branches} rootBranches
     * @param {CallExpr[]} groupCallExprs 
     */
    detectBranchGroupCommonExpression(rootBranches, groupCallExprs) {
        const lastBranch =
            rootBranches.branches[
                rootBranches.branches.length - 1
            ]

        const injectedId = this.commonCount
        this.commonCount++

        const injectedName = new Word(
            `${this.options.commonSubExpressionPrefix}${injectedId}`
        )

        
        const injectedVar = new Variable(injectedName)
        const firstCallExpr = groupCallExprs[0] // the first call expr is used as the common expression
        const variables =
            collectVariablesWithDepth(firstCallExpr)

        // sort lower Debruijn indices first (deeper variables have lower Debruijn indices compared to `firstCallExpr`)
        variables.sort((a, b) => a[0] - b[0])

        // the common expression (i.e. `firstCallExpr`) must be injected after the deepest variable on which it depends
        const allVars = variables.map((v) => v[1])

        const keyExpr = this.resolveBranchFuncExpr(lastBranch)

        const prev = this.branchInjections.get(keyExpr)

        const entry = {
            root: rootBranches,
            vars: allVars,
            injected: injectedVar, // we must use this variable when creating the common expression definition, so we can avoid another pass of resolveNames()
            expr: firstCallExpr // for nested substitions we must also apply all substitutions to this expression
        }

        if (prev) {
            prev.push(entry)
        } else {
            this.branchInjections.set(keyExpr, [entry])
        }

        // because each CallExpr returns the same runtime value, they can be replaced by the variable pointing to the common value
        Array.from(groupCallExprs).forEach((ce, i) => {
            this.substitutions.set(
                ce,
                new NameExpr(injectedName, injectedVar)
            )
        })
    }

    /**
     * @private
     */
    injectBranchedCommonExpressions() {
        loop(this.root, {
            funcExpr: (funcExpr) => {
                const inj = this.branchInjections.get(funcExpr)

                if (inj) {
                    inj.slice()
                        .reverse()
                        .forEach((entry) => {
                            const branchExpr = funcExpr

                            let body = branchExpr.body

                            let foundDeepestVar = false

                            body = mutate(body, {
                                funcExpr: (funcExpr) => {
                                    if (
                                        funcExpr.args.some(
                                            (a) => a == entry.vars[0]
                                        )
                                    ) {
                                        foundDeepestVar = true

                                        return new FuncExpr(
                                            funcExpr.site,
                                            funcExpr.args,
                                            new CallExpr(
                                                entry.expr.site,
                                                new FuncExpr(
                                                    entry.expr.site,
                                                    [entry.injected],
                                                    funcExpr.body
                                                ),
                                                [entry.expr]
                                            )
                                        )
                                    } else {
                                        return funcExpr
                                    }
                                }
                            })

                            if (!foundDeepestVar) {
                                body = new CallExpr(
                                    entry.expr.site,
                                    new FuncExpr(
                                        entry.expr.site,
                                        [entry.injected],
                                        branchExpr.body
                                    ),
                                    [entry.expr]
                                )
                            }

                            branchExpr.body = body
                        })
                }
            }
        })
    }

    /**
     * @private
     */
    injectRegularCommonExpressions() {
        this.root = mutate(this.root, {
            funcExpr: (funcExpr) => {
                if (funcExpr.args.some((a) => this.injections.has(a))) {
                    /**
                     * @type {{vars: Variable[], injected: Variable, expr: CallExpr}[]}
                     */
                    let funcInjections = []

                    funcExpr.args.forEach((a) => {
                        const inj = this.injections.get(a)

                        if (inj) {
                            funcInjections = funcInjections.concat(inj)
                        }
                    })

                    let body = funcExpr.body

                    funcInjections.reverse()

                    funcInjections.forEach((inj) => {
                        const site = inj.expr.site
                        body = new CallExpr(
                            site,
                            new FuncExpr(site, [inj.injected], body),
                            [inj.expr]
                        )
                    })

                    return new FuncExpr(funcExpr.site, funcExpr.args, body)
                } else {
                    return funcExpr
                }
            }
        })
    }
}
