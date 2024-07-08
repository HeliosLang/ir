import { FuncExpr } from "../expressions/index.js"
import { collectVariables } from "../ops/index.js"
import { Stack } from "./Stack.js"

/**
 * @typedef {import("./Value.js").Value} Value
 * @typedef {import("./Value.js").ValueCodeMapperI} ValueCodeMapperI
 */

/**
 * @implements {Value}
 */
export class FuncValue {
    /**
     * @readonly
     * @type {Stack}
     */
    stack

    /**
     * @readonly
     * @type {FuncExpr}
     */
    definition

    /**
     * @param {FuncExpr} definition
     * @param {Stack} stack
     */
    constructor(definition, stack) {
        this.definition = definition
        const irVars = collectVariables(definition)
        this.stack = stack.filter(irVars)
    }

    /**
     * @param {FuncExpr} definition
     * @param {Stack} stack
     * @returns {FuncValue}
     */
    static new(definition, stack) {
        return new FuncValue(definition, stack)
    }

    /**
     * @returns {boolean}
     */
    isLiteral() {
        return this.stack.isLiteral()
    }

    /**
     * @param {boolean} maybe
     * @returns {boolean}
     */
    hasError(maybe = true) {
        return false
    }

    /**
     * @param {ValueCodeMapperI} codeMapper
     * @param {number} depth
     * @returns {any}
     */
    dump(codeMapper, depth = 0) {
        return {
            type: "Fn",
            codes: codeMapper.getCodes(this),
            definition: this.definition.toString(),
            stack: this.stack.dump(codeMapper, depth)
        }
    }

    /**
     * @returns {string}
     */
    toString() {
        return `Fn`
    }
}
