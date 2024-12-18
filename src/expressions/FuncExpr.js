import { isDummySite } from "@helios-lang/compiler-utils"
import { makeUplcDelay, makeUplcLambda } from "@helios-lang/uplc"
import { NameExpr } from "./NameExpr.js"
import { Scope } from "./Scope.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").UplcTerm} UplcTerm
 * @typedef {import("./Expr.js").Expr} Expr
 * @typedef {import("./Expr.js").NotifyCopy} NotifyCopy
 * @typedef {import("./Scope.js").ScopeI} ScopeI
 * @typedef {import("./Variable.js").VariableI} VariableI
 */

/**
 * IR function expression with some args, that act as the header, and a body expression
 * @implements {Expr}
 */
export class FuncExpr {
    /**
     * @readonly
     * @type {Site}
     */
    site

    /**
     * Mutation is more convenient and much faster when applying some optimizations.
     * @readwrite
     * @type {VariableI[]}
     */
    args

    /**
     * Mutation is more convenient and much faster when applying some optimizations.
     * @readwrite
     * @type {Expr}
     */
    body

    /**
     * Variables referenced anywhere in the body
     * @readonly
     * @type {Set<VariableI>}
     */
    bodyVars

    /**
     * @param {Site} site
     * @param {VariableI[]} args
     * @param {Expr} body
     */
    constructor(site, args, body) {
        this.site = site
        this.args = args
        this.body = body
        this.bodyVars = new Set()
    }

    /**
     * @type {number}
     */
    get flatSize() {
        const nArgs = this.args.length
        return 4 + (nArgs > 0 ? (nArgs - 1) * 4 : 0) + this.body.flatSize
    }

    /**
     * @param {NotifyCopy} notifyCopy
     * @param {Map<VariableI, VariableI>} varMap
     * @returns {FuncExpr}
     */
    copy(notifyCopy, varMap) {
        const args = this.args.map((a) => a.copy(varMap))
        const newExpr = new FuncExpr(
            this.site,
            args,
            this.body.copy(notifyCopy, varMap)
        )

        notifyCopy(this, newExpr)

        return newExpr
    }

    /**
     * @returns {boolean}
     */
    hasOptArgs() {
        const b = this.args.some((a) =>
            a.name.toString().startsWith("__useopt__")
        )

        if (b) {
            return b
        }

        if (this.body instanceof FuncExpr) {
            return this.body.hasOptArgs()
        } else {
            return false
        }
    }

    /**
     * @param {Expr} other
     * @returns {boolean}
     */
    isEqual(other) {
        return (
            other instanceof FuncExpr &&
            this.body.isEqual(other.body) &&
            this.args.length == other.args.length &&
            this.args.every(
                (arg, i) => arg.name.value == other.args[i].name.value
            )
        )
    }

    /**
     * @param {ScopeI} scope
     */
    resolveNames(scope) {
        // in the zero-arg case no Debruijn indices need to be added because we use Delay/Force

        // notifyFuncExpr is always set so that the all the referenced variables can easily be collected in the bodyVars set

        // bodyVars must be reset so that old unused variables are purged
        this.bodyVars.clear()

        this.args.forEach((arg, i) => {
            scope = new Scope(
                scope,
                arg,
                i == 0 ? { notifyFuncExpr: (v) => this.bodyVars.add(v) } : {}
            )
        })

        if (this.args.length == 0) {
            scope = new Scope(scope, undefined, {
                notifyFuncExpr: (v) => this.bodyVars.add(v)
            })
        }

        this.body.resolveNames(scope)
    }

    /**
     * @returns {UplcTerm}
     */
    toUplc() {
        let term = this.body.toUplc()

        const nArgs = this.args.length

        const s = isDummySite(this.site) ? undefined : this.site

        if (nArgs == 0) {
            // a zero-arg func is turned into a UplcDelay term
            term = makeUplcDelay({ arg: term, site: s })
        } else {
            for (let i = nArgs - 1; i >= 0; i--) {
                // TODO: only give the site if i == 0?
                term = makeUplcLambda({
                    body: term,
                    argName: this.args[i].toString(true),
                    site: s
                })
            }
        }

        return term
    }
}

/**
 * @param {Expr} func
 * @returns {boolean}
 */
export function isIdentityFunc(func) {
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
