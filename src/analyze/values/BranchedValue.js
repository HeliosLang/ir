import { branchTypeToPrefix } from "./BranchType.js"
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
     * @param {BranchType} type
     * @param {AnyDataValue} condition
     * @param {Value[]} cases
     */
    constructor(type, condition, cases) {
        this.type = type
        this.condition = condition
        this.cases = cases

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
            })
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
