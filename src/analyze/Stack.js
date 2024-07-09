import { Variable } from "../expressions/index.js"
import { Branches } from "./Branches.js"
import { ErrorValue } from "./ErrorValue.js"
import { MultiValue } from "./MultiValue.js"

/**
 * @typedef {import("./Branch.js").Branch} Branch
 * @typedef {import("./Value.js").StackI} StackI
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").ValueCodeMapperI} ValueCodeMapperI
 */

/**
 * @implements {StackI}
 */
export class Stack {
    /**
     * @readonly
     * @type {[Variable, Value][]}
     */
    values

    /**
     * @readonly
     * @type {Branches}
     */
    branches

    /**
     * @type {boolean}
     */
    #isLiteral

    /**
     * @param {[Variable, Value][]} values
     * @param {Branches} branches
     * @param {boolean} isLiteral
     */
    constructor(values, branches, isLiteral) {
        this.values = values
        this.branches = branches
        this.#isLiteral = isLiteral || values.length == 0
    }

    /**
     * @param {Variable} variable
     * @returns {boolean}
     */
    static isGlobal(variable) {
        return variable.name.value.match(/^__(helios|const|module)__/) !== null
    }

    /**
     * @param {ValueCodeMapperI} codeMapper
     * @param {number} depth
     * @returns {any}
     */
    dump(codeMapper, depth = 0) {
        return {
            isLiteral: this.#isLiteral,
            codes: codeMapper.getCodes(this),
            ...(depth > 0
                ? {
                      values: this.values.map(([_, arg]) => {
                          return arg.dump(codeMapper, depth - 1)
                      })
                  }
                : {})
        }
    }

    /**
     * @param {Stack} other
     * @returns {boolean}
     */
    isEqual(other) {
        return (
            this.values.length == other.values.length &&
            this.values.every(
                ([vr, vl], i) =>
                    other.values[i][0] == vr && vl.isEqual(other.values[i][1])
            )
        )
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return this.#isLiteral
    }

    /**
     * @param {Variable} v
     * @returns {Value}
     */
    getValue(v) {
        const j = this.values.findIndex(([va]) => va == v)

        if (j != -1) {
            return this.values[j][1]
        }

        throw new Error(`${v.name} not found in Stack`)
    }

    /**
     * @param {Branch} branch
     * @returns {Stack}
     */
    addBranch(branch) {
        return new Stack(
            this.values,
            this.branches.addBranch(branch),
            this.#isLiteral
        )
    }

    /**
     * @param {[Variable, Value][]} args
     * @returns {Stack}
     */
    extend(args) {
        if (!args.every(([_, v]) => !(v instanceof ErrorValue))) {
            throw new Error("unexpected")
        }

        return new Stack(
            this.values.concat(args),
            this.branches,
            this.#isLiteral && args.every(([_, v]) => v.isLiteral())
        )
    }

    /**
     * @param {Set<Variable>} irVars
     * @returns {Stack}
     */
    filter(irVars) {
        const varVals = this.values.filter(([v]) => irVars.has(v))
        return new Stack(
            varVals,
            this.branches,
            varVals.every(([_, v]) => v.isLiteral())
        )
    }

    /**
     * @returns {Stack}
     */
    static empty() {
        return new Stack([], new Branches([]), true)
    }
}
