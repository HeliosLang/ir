import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { None } from "@helios-lang/type-utils"
import { parse } from "../parse/index.js"
import { FuncExpr } from "./FuncExpr.js"
import { Scope } from "./Scope.js"

describe(FuncExpr.name, () => {
    it("all vars correctly collected", () => {
        const expr = parse(`(a, b, c, d) -> {
            multiplyInteger(addInteger(a, b), c)
        }`)

        if (!(expr instanceof FuncExpr)) {
            throw new Error("unexpected")
        }

        expr.resolveNames(new Scope(None, None))

        strictEqual(expr.bodyVars.size, 3)
    })
})
