import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { CallExpr, FuncExpr } from "../expressions/index.js"
import { parse } from "../parse/index.js"
import { Analyzer } from "./Analyzer.js"

describe(Analyzer.name, () => {
    it("evaluates both passes", () => {
        const root = parse(`(x) -> {x}`)

        if (!(root instanceof FuncExpr)) {
            throw new Error("unexpected")
        }

        const analyzer = new Analyzer(root)
        const analysis = analyzer.analyze()

        strictEqual(analysis.countFuncCalls(root), 1)
    })

    it("evaluates internal function", () => {
        const root = parse(`
        (x) -> {
            fn = (a) -> {
                addInteger(a, a)
            };
            fn(x)
        }`)

        const analyzer = new Analyzer(root)
        const analysis = analyzer.analyze()

        if (
            root instanceof FuncExpr &&
            root.body instanceof CallExpr &&
            root.body.args[0] instanceof FuncExpr
        ) {
            const arg = root.body.args[0]

            if (!(arg instanceof FuncExpr)) {
                throw new Error("unexpected")
            }

            strictEqual(analysis.countFuncCalls(root), 1)
            strictEqual(analysis.countFuncCalls(arg), 1)
        } else {
            throw new Error("unexpected")
        }
    })
})
