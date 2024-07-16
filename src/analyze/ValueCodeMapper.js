import { isNone } from "@helios-lang/type-utils"
import { FuncExpr } from "../expressions/index.js"
import { Stack } from "./Stack.js"
import { AnyValue } from "./AnyValue.js"
import { DataValue } from "./DataValue.js"
import { BuiltinValue } from "./BuiltinValue.js"
import { FuncValue } from "./FuncValue.js"
import { LiteralValue } from "./LiteralValue.js"
import { ErrorValue } from "./ErrorValue.js"
import { MultiValue } from "./MultiValue.js"

/**
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").ValueCodeMapperI} ValueCodeMapperI
 */

/**
 * Codes are used to combine multiple Values (including nested Stacks that are part of FuncValues) into a single number.
 *
 * We can't have however use the full depth of Stack values because there could be callback-recursion.
 * @implements {ValueCodeMapperI}
 */
export class ValueCodeMapper {
    /**
     * @type {number}
     */
    #nextUnused

    /**
     * @type {Map<string, number>}
     */
    #usedCodes

    /**
     * @type {Map<Value | Stack, number[]>}
     */
    #valueCodes

    /**
     * @readonly
     * @type {Map<FuncExpr, number>}
     */
    #funcExprTags

    /**
     * @param {Map<FuncExpr, number>} funcExprTags
     */
    constructor(funcExprTags) {
        this.#usedCodes = new Map([
            ["Any", 0],
            ["Data", 1],
            ["Error", 2]
        ])
        this.#nextUnused = 3
        this.#valueCodes = new Map()
        this.#funcExprTags = funcExprTags
    }

    static get maxDepth() {
        return 10
    }

    /**
     * @private
     * @param {string} key
     * @returns {number}
     */
    genCode(key) {
        let code = this.#usedCodes.get(key)

        if (code !== undefined) {
            return code
        }

        code = this.#nextUnused
        this.#nextUnused += 1

        this.#usedCodes.set(key, code)

        return code
    }

    /**
     * @private
     * @param {Value | Stack} v
     * @returns {number[]}
     */
    genCodes(v) {
        if (v instanceof BuiltinValue) {
            return new Array(ValueCodeMapper.maxDepth).fill(
                this.genCode(v.builtinName)
            )
        } else if (v instanceof DataValue) {
            return new Array(ValueCodeMapper.maxDepth).fill(
                this.genCode(`Data`)
            )
        } else if (v instanceof ErrorValue) {
            return new Array(ValueCodeMapper.maxDepth).fill(
                this.genCode("Error")
            )
        } else if (v instanceof AnyValue) {
            return new Array(ValueCodeMapper.maxDepth).fill(this.genCode("Any"))
        } else if (v instanceof LiteralValue) {
            return new Array(ValueCodeMapper.maxDepth).fill(
                this.genCode(v.value.toString())
            )
        } else if (v instanceof FuncValue) {
            const tagId = this.#funcExprTags.get(v.definition)
            if (isNone(tagId)) {
                throw new Error("unexpected")
            }

            const tag = `Fn${tagId}`
            const stackCodes = this.getCodes(v.stack)

            /**
             * @type {number[]}
             */
            const codes = []

            for (let i = 0; i < ValueCodeMapper.maxDepth; i++) {
                const key = i == 0 ? tag : `${tag}(${stackCodes[i - 1]})`

                codes.push(this.genCode(key))
            }

            return codes
        } else if (v instanceof Stack) {
            const valueCodes = v.values.map(([_, v]) => this.getCodes(v))

            /**
             * @type {number[]}
             */
            const codes = []

            for (let i = 0; i < ValueCodeMapper.maxDepth - 1; i++) {
                const key = `[${valueCodes.map((vc) => vc[i]).join(",")}]`
                codes.push(this.genCode(key))
            }

            return codes
        } else if (v instanceof MultiValue) {
            const valueCodes = v.values.map((v) => this.getCodes(v))

            /**
             * @type {number[]}
             */
            const codes = []

            for (let i = 0; i < ValueCodeMapper.maxDepth; i++) {
                const key = `{${valueCodes
                    .map((vc) => vc[i])
                    .sort()
                    .join(",")}}`
                codes.push(this.genCode(key))
            }

            return codes
        } else {
            throw new Error("unhandled")
        }
    }

    /**
     * @param {Value | Stack} v
     * @returns {number[]}
     */
    getCodes(v) {
        const cached = this.#valueCodes.get(v)

        if (cached) {
            return cached
        }

        const codes = this.genCodes(v)

        this.#valueCodes.set(v, codes)

        return codes
    }

    /**
     * @param {Value} v
     * @returns {number}
     */
    getCode(v) {
        const codes = this.getCodes(v)

        return codes[ValueCodeMapper.maxDepth - 1]
    }

    /**
     * @param {Value} fn
     * @param {Value[]} args
     */
    getCallCode(fn, args) {
        const code = this.getCode(fn)

        if (isNone(code)) {
            throw new Error("unexpected")
        }

        const key = `${code}(${args.map((a) => this.getCode(a)).join(",")})`
        return this.genCode(key)
    }

    /**
     * @param {Value} a
     * @param {Value} b
     * @returns {boolean}
     */
    eq(a, b) {
        const ca = this.getCode(a)
        const cb = this.getCode(b)

        return ca == cb
    }
}
