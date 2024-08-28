import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { isRight, isString } from "@helios-lang/type-utils"
import { UplcInt } from "@helios-lang/uplc"
import { compile } from "../ops/index.js"
import { NameExpr } from "./NameExpr.js"

describe(NameExpr.name, () => {
    it("evaluates 'a=0;a' correctly", () => {
        const program = compile("a=0;a")

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                !isString(res.result.right) &&
                res.result.right.kind == "int" &&
                res.result.right.value == 0n,
            true
        )
    })

    it("evaluates 'a=b;b=0;a' correctly", () => {
        const program = compile("a=b;b=0;a")

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                !isString(res.result.right) &&
                res.result.right.kind == "int" &&
                res.result.right.value == 0n,
            true
        )
    })

    it("evaluates '(a) -> {a}' correctly", () => {
        const program = compile("(a)->{a}")

        const res = program.eval([new UplcInt(0n)])

        strictEqual(
            isRight(res.result) &&
                !isString(res.result.right) &&
                res.result.right.kind == "int" &&
                res.result.right.value == 0n,
            true
        )
    })
})
