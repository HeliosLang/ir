import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { isLeft, isRight, isString } from "@helios-lang/type-utils"
import { compile } from "../ops/index.js"
import { BuiltinExpr } from "./BuiltinExpr.js"

describe(BuiltinExpr.name, () => {
    it("evaluates 'addInteger(1,2)' correctly", () => {
        const program = compile("addInteger(1,2)", { optimize: true })

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                !isString(res.result.right) &&
                res.result.right.kind == "int" &&
                res.result.right.value == 3n,
            true
        )
    })

    it("evaluates 'divideInteger(1,0)' as error", () => {
        const program = compile("divideInteger(1,0)", { optimize: false }) // optimize: true fails due to division by 0

        const res = program.eval(undefined)

        strictEqual(isLeft(res.result), true)
    })
})
