import { None, isNone } from "@helios-lang/type-utils"
import { Branches } from "./Branches.js"
import { BuiltinValue } from "./BuiltinValue.js"
import { DataValue } from "./DataValue.js"
import { LiteralValue } from "./LiteralValue.js"

/**
 * @typedef {import("./Branch.js").Branch} Branch
 * @typedef {import("./IdGenerator.js").IdGenerator} IdGenerator
 * @typedef {import("./ValueI.js").BlockRecursionProps} BlockRecursionProps
 * @typedef {import("./ValueI.js").ValueI} ValueI
 * @typedef {import("./Value.js").DataLikeValue} DataLikeValue
 * @typedef {import("./Value.js").NonErrorValue} NonErrorValue
 */

/**
 * @implements {ValueI}
 */
export class FuncValue {
    /**
     * @readonly
     * @type {number}
     */
    definitionTag

    /**
     * @readonly
     * @type {Stack}
     */
    stack

    /**
     * @param {number} definitionTag
     * @param {Stack} stack
     */
    constructor(definitionTag, stack) {
        this.definitionTag = definitionTag
        this.stack = stack
    }

    /**
     * @param {Branch} branch
     * @returns {FuncValue}
     */
    addBranch(branch) {
        return new FuncValue(this.definitionTag, this.stack.addBranch(branch))
    }

    /**
     * @param {Omit<BlockRecursionProps, "keyPath">} props
     * @returns {[FuncValue, string]}
     */
    blockRecursion({ blockFunc, genId }) {
        const isRecursive = blockFunc
            ? blockFunc.tag == this.definitionTag && blockFunc.depth == 0
            : false

        // TODO: no every nested stack needs to block recursion
        const stack = this.stack.blockRecursion({
            blockFunc:
                blockFunc && !isRecursive
                    ? {
                          tag: blockFunc.tag,
                          depth:
                              blockFunc.tag == this.definitionTag
                                  ? blockFunc.depth - 1
                                  : blockFunc.depth
                      }
                    : undefined,
            genId: genId
        })

        const v = new FuncValue(this.definitionTag, stack)
        const key = isRecursive ? `Fn${this.definitionTag}` : v.toString()

        return [v, key]
    }

    /**
     * @param {Set<number>} s
     */
    collectFuncTags(s) {
        s.add(this.definitionTag)
    }

    /**
     * @param {Map<string, FuncValue>} m
     */
    collectFuncValues(m) {
        m.set(this.toString(), this)
    }

    /**
     * @param {number} tag
     * @param {number} depth
     * @returns {boolean}
     */
    containsFunc(tag, depth) {
        if (this.definitionTag == tag) {
            return depth == 0 ? true : this.stack.containsFunc(tag, depth - 1)
        } else {
            return this.stack.containsFunc(tag, depth)
        }
    }

    /**
     * @param {boolean} anyAsDataOnly
     * @returns {boolean}
     */
    isCallable(anyAsDataOnly) {
        return true
    }

    /**
     * @param {boolean} anyAsFuncOnly
     * @returns {boolean}
     */
    isDataLike(anyAsFuncOnly) {
        return false
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return this.stack.isLiteral()
    }

    /**
     * @returns {boolean}
     */
    isRecursive() {
        return this.stack.recursive
    }

    /**
     * @returns {string}
     */
    toString() {
        return `Fn${this.definitionTag}.${this.stack.id}`
    }
}

/**
 * @typedef {BuiltinValue | DataValue | FuncValue | LiteralValue} StackableValue
 */

/**
 * @typedef {{
 *   branches: Branches
 *   recursive?: boolean
 * }} StackProps
 */

export class Stack {
    /**
     * @readonly
     * @type {number}
     */
    id

    /**
     * @readonly
     * @type {[number, NonErrorValue][]}
     */
    values

    /**
     * @readonly
     * @type {Branches}
     */
    branches

    /**
     * @readonly
     * @type {boolean}
     */
    recursive

    /**
     * Lazily calculated
     * @type {Option<boolean>}
     */
    #isLiteral

    /**
     * @param {number} id
     * @param {[number, NonErrorValue][]} values
     * @param {Branches} branches
     * @param {boolean} recursive
     */
    constructor(id, values, branches, recursive = false) {
        this.id = id
        this.values = values
        this.branches = branches
        this.recursive = recursive
        this.#isLiteral = None
    }

    /**
     *
     * @param {[number, NonErrorValue][]} values
     * @param {StackProps} props
     * @param {IdGenerator} genId
     * @returns {Stack}
     */
    static new(values, props, genId) {
        const id = genId.genStackId(values)

        return new Stack(id, values, props.branches, props.recursive ?? false)
    }

    /**
     * @param {Branch} branch
     * @returns {Stack}
     */
    addBranch(branch) {
        const stack = new Stack(
            this.id,
            this.values,
            this.branches.addBranch(branch),
            this.recursive
        )
        stack.#isLiteral = this.#isLiteral
        return stack
    }

    /**
     * @param {Omit<BlockRecursionProps, "keyPath">} props
     * @returns {Stack}
     */
    blockRecursion({ genId, blockFunc }) {
        const values = this.values
            .map(([id, v]) => {
                return /** @type {[number, [ValueI, string]]} */ ([
                    id,
                    v.blockRecursion({
                        keyPath: `Arg${id}`,
                        blockFunc: blockFunc,
                        genId: genId
                    })
                ])
            })
            .sort(([a], [b]) => a - b)

        const key = `[${values
            .map(([id, vl]) => `${id}: ${vl[1]}`)
            .join(", ")}]`
        const id = genId.genId(key)

        return new Stack(
            id,
            values.map((v) => [v[0], /** @type {NonErrorValue} */ (v[1][0])]),
            this.branches,
            true
        )
    }

    /**
     * @param {Set<number>} s
     */
    collectFuncTags(s) {
        this.values.forEach((v) => v[1].collectFuncTags(s))
    }

    /**
     * @param {number} tag
     * @param {number} depth
     * @returns {boolean}
     */
    containsFunc(tag, depth) {
        return this.values.some((v) => v[1].containsFunc(tag, depth))
    }

    /**
     * @param {number} v
     * @param {IdGenerator} genId
     * @returns {NonErrorValue}
     */
    getValue(v, genId) {
        const j = this.values.findIndex(([va]) => va == v)

        if (j != -1) {
            let [varId, v] = this.values[j]

            if (this.recursive && v instanceof DataValue) {
                const id = genId.genOpaqueStackValueId(this.id, varId)
                return new DataValue(id, this.branches)
            } else if (v instanceof DataValue && v.id == -1) {
                throw new Error(
                    "unexpected DataValue with id -1 in stack.getValue()"
                )
            }

            return v
        }

        throw new Error(
            `${v} not found in Stack (have: ${this.values.map((v) => v[0]).join(", ")})`
        )
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        if (isNone(this.#isLiteral)) {
            this.#isLiteral = this.values.every((v) => v[1].isLiteral())
        }

        return this.#isLiteral
    }
}
