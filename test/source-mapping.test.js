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
        strictEqual(err.callSites.length, 7)

        const cs0 = err.callSites[0]
        strictEqual(cs0.line, 1)
        strictEqual(cs0.column, 16)

        const cs1 = err.callSites[1]
        strictEqual(cs1.line, 6)
        strictEqual(cs1.column, 16)

        const cs2 = err.callSites[2]
        strictEqual(cs2.line, 9)
        strictEqual(cs2.column, 16)

        const cs3 = err.callSites[3]
        strictEqual(cs3.line, 12)
        strictEqual(cs3.column, 15)

        const cs4 = err.callSites[4]
        strictEqual(cs4.line, 10)
        strictEqual(cs4.column, 19)

        const cs5 = err.callSites[5]
        strictEqual(cs5.line, 7)
        strictEqual(cs5.column, 19)

        const cs6 = err.callSites[6]
        strictEqual(cs6.line, 4)
        strictEqual(cs6.column, 18)

        strictEqual(res.logs.length, 0)
    })
})
