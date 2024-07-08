import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { isLeft, isRight } from "@helios-lang/type-utils"
import { UplcInt } from "@helios-lang/uplc"
import { compile } from "../ops/index.js"
import { ErrorExpr } from "./ErrorExpr.js"
import { CallExpr } from "./CallExpr.js"

describe(CallExpr.name, () => {
    it("evaluates '(a) -> {a()}' as error", () => {
        const program = compile("(a) -> {a()}", { optimize: false }) // optimize: true would fail due to trying to call data

        const res = program.eval([new UplcInt(0)])

        strictEqual(isLeft(res.result), true)
    })

    it("evaluates 'pow2(3)' correctly", () => {
        const program = compile(
            `pow2 = (n) -> {
                fn = (i) -> {
                    ifThenElse(
                        lessThanInteger(i, n),  
                        () -> {
                            multiplyInteger(2, fn(addInteger(i, 1)))
                        },
                        () -> {
                            1
                        }
                    )()
                }; 
                fn(0)
            };
            pow2(3)
        `,
            { optimize: true }
        )

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcInt &&
                res.result.right.value == 8n,
            true
        )
    })
})
