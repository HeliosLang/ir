import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { expectLeft } from "@helios-lang/type-utils"
import { UplcBool } from "@helios-lang/uplc"
import { DEFAULT_PARSE_OPTIONS, compile } from "../src/index.js"

describe("Source mapping", () => {
    it("correct info site", () => {
        const src = `(b) -> {
            __core__ifThenElse(
                b,
                () -> {
                    __core__trace("message 1", ())
                },
                () -> {
                    __core__trace("message 2", ())
                }
            )()
        }`

        const program = compile(src, {
            optimize: false,
            parseOptions: {
                ...DEFAULT_PARSE_OPTIONS,
                builtinsPrefix: "__core__"
            }
        })

        const resTrue = program.eval([new UplcBool(true)])
        const siteTrue = resTrue.logs[0].site
        strictEqual(siteTrue?.line, 4)
        strictEqual(siteTrue?.column, 33)

        const resFalse = program.eval([new UplcBool(false)])
        const siteFalse = resFalse.logs[0].site
        strictEqual(siteFalse?.line, 7)
        strictEqual(siteFalse?.column, 33)
    })

    it("correct stack trace", () => {
        const src = `() -> {
            fn3 = () -> {
                __core__trace("my error", () -> {
                    error()
                })()
            };
            fn2 = () -> {
                fn3()
            };
            fn1 = () -> {
                fn2()
            };
            fn1()
        }`

        const program = compile(src, {
            optimize: false,
            parseOptions: {
                ...DEFAULT_PARSE_OPTIONS,
                builtinsPrefix: "__core__"
            }
        })

        const res = program.eval([])

        const err = expectLeft(res.result)

        strictEqual(err.error, "my error")
        strictEqual(err.callSites.length, 4)

        const cs0 = err.callSites[0]
        strictEqual(cs0.line, 12)
        strictEqual(cs0.column, 15)

        const cs1 = err.callSites[1]
        strictEqual(cs1.line, 10)
        strictEqual(cs1.column, 19)

        const cs2 = err.callSites[2]
        strictEqual(cs2.line, 7)
        strictEqual(cs2.column, 19)

        const cs3 = err.callSites[3]
        strictEqual(cs3.line, 4)
        strictEqual(cs3.column, 18)

        strictEqual(res.logs.length, 0)
    })
})
