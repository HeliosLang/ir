import { CallExpr } from "../../expressions/index.js"
import { branchTypeToPrefix } from "./BranchType.js"
import { Branches } from "./Branches.js"
import { DataValue } from "./DataValue.js"
import { FuncValue } from "./FuncValue.js"

/**
 * @typedef {import("../../expressions/index.js").Expr} Expr
 * @typedef {import("./Branch.js").Branch} Branch
 * @typedef {import("./BranchType.js").BranchType} BranchType
 * @typedef {import("./ValueI.js").ValueI} ValueI
 * @typedef {import("./Value.js").AnyDataValue} AnyDataValue
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").NonBranchedValue} NonBranchedValue
 */

/**
 * @implements {ValueI}
 */
export class BranchedValue {
    /**
     * @readonly
     * @type {BranchType}
     */
    type

    /**
     * @readonly
     * @type {AnyDataValue}
     */
    condition

    /**
     * @readonly
     * @type {Value[]}
     */
    cases

    /**
     * Needed so we can reconstruct all the Branch details in this.withBranches()
     * @readonly
     * @type {CallExpr}
     */
    expr

    /**
     * @param {BranchType} type
     * @param {AnyDataValue} condition
     * @param {Value[]} cases
     * @param {CallExpr} expr
     */
    constructor(type, condition, cases, expr) {
        this.type = type
        this.condition = condition
        this.cases = cases
        this.expr = expr

        if (this.cases.every((v) => v instanceof DataValue)) {
            throw new Error("shouldn't be pure DataValue")
        }
    }

    /**
     * @type {number}
     */
    get nCases() {
        return this.cases.length
    }

    /**
     * `Ite`, `Cl` or `Cd`
     * @type {string}
     */
    get prefix() {
        return branchTypeToPrefix(this.type)
    }

    /**
     * @param {Branch} branch
     * @returns {BranchedValue}
     */
    addBranch(branch) {
        return new BranchedValue(
            this.type,
            this.condition,
            this.cases.map((v) => {
                if (v instanceof FuncValue || v instanceof BranchedValue) {
                    return v.addBranch(branch)
                } else {
                    return v
                }
            }),
            this.expr
        )
    }

    /**
     * @param {Set<number>} s
     */
    collectFuncTags(s) {
        this.cases.forEach((v) => v.collectFuncTags(s))
    }

    /**
     * @param {Map<string, FuncValue>} m
     */
    collectFuncValues(m) {
        this.cases.forEach((v) => v.collectFuncValues(m))
    }

    /**
     * @param {number} tag
     * @param {number} depth
     * @returns {boolean}
     */
    containsFunc(tag, depth) {
        return this.cases.some((v) => v.containsFunc(tag, depth))
    }

    /**
     * @param {boolean} anyAsDataOnly
     * @returns {boolean}
     */
    isCallable(anyAsDataOnly) {
        return this.cases.some((c) => c.isCallable(anyAsDataOnly))
    }

    /**
     * @param {boolean} anyAsFuncOnly
     * @returns {boolean}
     */
    isDataLike(anyAsFuncOnly) {
        return this.cases.some((c) => c.isDataLike(anyAsFuncOnly))
    }

    /**
     * @param {ValueI} other
     * @returns {boolean}
     */
    isEqual(other) {
        if (
            other instanceof BranchedValue &&
            this.type == other.type &&
            this.condition.isEqual(other.condition)
        ) {
            return (
                this.nCases == other.nCases &&
                this.cases.every((c, i) => c.isEqual(other.cases[i]))
            )
        } else {
            return false
        }
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return false
    }

    /**
     * @returns {string}
     */
    toString() {
        return makeBranchedValueKey(
            this.prefix,
            this.condition.toString(),
            this.cases.map((c) => c.toString())
        )
    }

    /**
     * @param {Branches} branches
     * @returns {BranchedValue}
     */
    withBranches(branches) {
        return new BranchedValue(
            this.type,
            this.condition,
            this.cases.map((c, i) => {
                /**
                 * @type {Branch}
                 */
                const b = {
                    expr: this.expr,
                    type: this.type,
                    condition: this.condition,
                    index: i - 1
                }

                return c.withBranches(branches.prependBranch(b))
            }),
            this.expr
        )
    }
}

/**
 * @param {string} prefix
 * @param {string} condition
 * @param {string[]} cases
 * @returns {string}
 */
function makeBranchedValueKey(prefix, condition, cases) {
    return `${prefix}(${condition}, ${cases.join(", ")})`
}
