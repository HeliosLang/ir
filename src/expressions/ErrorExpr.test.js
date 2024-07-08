import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { isLeft, isRight } from "@helios-lang/type-utils"
import { UplcInt } from "@helios-lang/uplc"
import { compile } from "../ops/index.js"
import { ErrorExpr } from "./ErrorExpr.js"

describe(ErrorExpr.name, () => {
    it("evaluates 'error()' correctly", () => {
        const program = compile("error()")

        const res = program.eval(undefined)

        strictEqual(isLeft(res.result), true)
    })

    it("evaluates 'ifThenElse(false, () -> {error()}, () -> {0})()' correctly", () => {
        const program = compile(
            "ifThenElse(false, () -> {error()}, () -> {0})()",
            { optimize: true }
        )

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcInt &&
                res.result.right.value == 0n,
            true
        )
    })
})
