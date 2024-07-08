import { UplcUnit } from "@helios-lang/uplc"
import { AnyValue } from "./AnyValue.js"
import { BuiltinValue } from "./BuiltinValue.js"
import { DataValue } from "./DataValue.js"
import { ErrorValue } from "./ErrorValue.js"
import { FuncValue } from "./FuncValue.js"
import { LiteralValue } from "./LiteralValue.js"

/**
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").ValueCodeMapperI} ValueCodeMapperI
 */

/**
 * @implements {Value}
 */
export class MultiValue {
    /**
     * @readonly
     */
    values

    /**
     * @param {Value[]} values
     */
    constructor(values) {
        if (!values.every((v) => !(v instanceof LiteralValue))) {
            throw new Error("unexpected")
        }

        this.values = values
    }

    /**
     * @param {boolean} maybe
     * @returns {boolean}
     */
    hasError(maybe = true) {
        return this.values.some((v) => v.hasError(maybe))
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return false
    }

    /**
     * @returns {boolean}
     */
    hasData() {
        return this.values.some((v) => v instanceof DataValue)
    }

    /**
     * @returns {boolean}
     */
    hasLiteral() {
        return this.values.some((v) => v instanceof LiteralValue)
    }

    /**
     * @param {ValueCodeMapperI} codeMapper
     * @param {number} depth
     * @returns {any}
     */
    dump(codeMapper, depth = 0) {
        return {
            type: "Multi",
            code: codeMapper.getCode(this),
            values: this.values.slice().map((v) => v.dump(codeMapper, depth))
        }
    }

    toString() {
        /**
         * @type {string[]}
         */
        const parts = []

        if (this.hasError()) {
            parts.push(`Error`)
        }

        if (this.hasData()) {
            parts.push(`Data`)
        }

        this.values.forEach((v) => {
            if (v instanceof FuncValue) {
                parts.push(`Fn`)
            } else if (v instanceof BuiltinValue) {
                parts.push(`Builtin_${v.builtin.name.slice("__core__".length)}`)
            }
        })

        this.values.forEach((v) => {
            if (v instanceof LiteralValue) {
                parts.push(v.toString())
            }
        })

        if (
            parts.length == 1 &&
            parts[0] == `Error` &&
            this.values.some((v) => v instanceof AnyValue)
        ) {
            parts.push("Any")
        }

        return `(${parts.join(" | ")})`
    }

    /**
     * @param {Value[]} values
     * @returns {Value[][]}
     */
    static allPermutations(values) {
        if (!values.some((v) => v instanceof MultiValue)) {
            return [values]
        } else {
            /**
             * @type {Value[][]}
             */
            const permutations = []

            let ns = values.map((v) => {
                if (v instanceof MultiValue) {
                    return v.values.length
                } else {
                    return 1
                }
            })

            let N = ns.reduce((prev, n) => {
                return prev * n
            }, 1)

            for (let i = 0; i < N; i++) {
                let j = i

                /**
                 * @type {number[]}
                 */
                const is = []

                ns.forEach((n) => {
                    is.push(j % n)

                    j = Math.floor(j / n)
                })

                permutations.push(
                    is.map((j, i) => {
                        const v = values[i]

                        if (!v) {
                            throw new Error("unexpected")
                        }

                        if (v instanceof MultiValue) {
                            return v.values[j]
                        } else {
                            if (j != 0) {
                                throw new Error("unexpected")
                            }

                            return v
                        }
                    })
                )
            }

            return permutations
        }
    }
}
