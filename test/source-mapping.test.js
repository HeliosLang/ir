import { match, strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { expectLeft, expectSome } from "@helios-lang/type-utils"
import { UplcRuntimeError, UplcBool } from "@helios-lang/uplc"
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
        const callSites = err.callSites.filter((cs) => !!cs.site)

        strictEqual(callSites.length, 7)

        const cs0 = callSites[0]
        strictEqual(cs0.site?.line, 1)
        strictEqual(cs0.site?.column, 16)

        const cs1 = callSites[1]
        strictEqual(cs1.site?.line, 6)
        strictEqual(cs1.site?.column, 16)

        const cs2 = callSites[2]
        strictEqual(cs2.site?.line, 9)
        strictEqual(cs2.site?.column, 16)

        const cs3 = callSites[3]
        strictEqual(cs3.site?.line, 12)
        strictEqual(cs3.site?.column, 15)

        const cs4 = callSites[4]
        strictEqual(cs4.site?.line, 10)
        strictEqual(cs4.site?.column, 19)

        const cs5 = callSites[5]
        strictEqual(cs5.site?.line, 7)
        strictEqual(cs5.site?.column, 19)

        const cs6 = callSites[6]
        strictEqual(cs6.site?.line, 4)
        strictEqual(cs6.site?.column, 18)

        strictEqual(res.logs.length, 0)

        console.log(callSites)
        try {
            throw new UplcRuntimeError(err.error, err.callSites)
        } catch (err) {
            if (err instanceof Error) {
                const stack = expectSome(err.stack)

                // in Node the error message is part of the stack itself, so we ignore it for the sake of the test (checking the err.message field directly instead)
                strictEqual(err.message, "my error")

                const lines = stack.split("\n").slice(1)

                strictEqual(lines[0].trim(), "at fn3 (helios:unknown:5:19)")
                strictEqual(lines[1].trim(), "at fn2 (helios:unknown:8:20)")
                strictEqual(lines[2].trim(), "at fn1 (helios:unknown:11:20)")
                strictEqual(
                    lines[3].trim(),
                    "at <anonymous> (helios:unknown:13:16)"
                )
                strictEqual(
                    lines[4].trim(),
                    "at <anonymous> (helios:unknown:10:17) [fn1=(delay (force fn2))]"
                )
                strictEqual(
                    lines[5].trim(),
                    "at <anonymous> (helios:unknown:7:17) [fn2=(delay (force fn3))]"
                )
                strictEqual(
                    lines[6].trim(),
                    'at <anonymous> (helios:unknown:2:17) [fn3=(delay (force [[(force (builtin 28)) (con string "my error")] (delay (error))]))]'
                )
                match(lines[7], /source-mapping.test.js/)
            } else {
                throw new Error(
                    "expected an instance of Error, got " + err.toString()
                )
            }
        }
    })
})
