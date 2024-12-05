import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { isRight, isString } from "@helios-lang/type-utils"
import {
    makeUplcBool,
    makeUplcByteArray,
    makeUplcInt,
    makeUplcList,
    makeUplcPair,
    makeUplcString,
    makeUplcType,
    DATA_TYPE
} from "@helios-lang/uplc"
import { compile } from "../ops/index.js"
import { LiteralExpr } from "./LiteralExpr.js"
import { makeDummySite } from "@helios-lang/compiler-utils"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").CekResult} CekResult
 * @typedef {import("@helios-lang/uplc").UplcValue} UplcValue
 */

/**
 * @type {Site}
 */
const site = makeDummySite()

/**
 * TODO: move this function into the uplc package, so it can be easily imported by other test-suites
 * @param {CekResult} actual
 * @param {UplcValue} expected
 */
function expectValue(actual, expected) {
    strictEqual(
        isRight(actual.result) &&
            !isString(actual.result.right) &&
            actual.result.right.isEqual(expected),
        true
    )
}

describe(LiteralExpr.name, () => {
    it("evaluates 0 correctly (ast)", () => {
        const program = compile(new LiteralExpr(makeUplcInt(0), site), {
            optimize: true
        })

        const res = program.eval(undefined)

        expectValue(res, makeUplcInt(0n))
    })

    it("evaluates 0 correctly (parsed)", () => {
        const program = compile("0", { optimize: true })

        const res = program.eval(undefined)

        expectValue(res, makeUplcInt(0n))
    })

    it("evaluates #abcd correctly (ast)", () => {
        const program = compile(
            new LiteralExpr(makeUplcByteArray("abcd"), site),
            { optimize: true }
        )

        const res = program.eval(undefined)

        expectValue(res, makeUplcByteArray("abcd"))
    })

    it("evaluates #abcd correctly (parsed)", () => {
        const program = compile("#abcd", { optimize: true })

        const res = program.eval(undefined)

        expectValue(res, makeUplcByteArray("abcd"))
    })

    it('evaluates "abcd" correctly (ast)', () => {
        const program = compile(new LiteralExpr(makeUplcString("abcd"), site), {
            optimize: true
        })

        const res = program.eval(undefined)

        expectValue(res, makeUplcString("abcd"))
    })

    it('evaluates "abcd" correctly (parsed)', () => {
        const program = compile('"abcd"', { optimize: true })

        const res = program.eval(undefined)

        expectValue(res, makeUplcString("abcd"))
    })

    it("evaluates 'true' correctly (ast)", () => {
        const program = compile(new LiteralExpr(makeUplcBool(true), site), {
            optimize: true
        })

        const res = program.eval(undefined)

        expectValue(res, makeUplcBool(true))
    })

    it("evaluates 'false' correctly (parsed)", () => {
        const program = compile("false", { optimize: true })

        const res = program.eval(undefined)

        expectValue(res, makeUplcBool(false))
    })

    it("evaluates empty list correctly (ast)", () => {
        const program = compile(
            new LiteralExpr(
                makeUplcList({ itemType: DATA_TYPE, items: [] }),
                site
            ),
            { optimize: true }
        )

        const res = program.eval(undefined)

        expectValue(res, makeUplcList({ itemType: DATA_TYPE, items: [] }))
    })

    it("evaluates pair of 0 and # correctly (ast)", () => {
        const program = compile(
            new LiteralExpr(
                makeUplcPair({
                    first: makeUplcInt(0),
                    second: makeUplcByteArray([])
                }),
                site
            ),
            { optimize: true }
        )

        const res = program.eval(undefined)

        expectValue(
            res,
            makeUplcPair({
                first: makeUplcInt(0n),
                second: makeUplcByteArray([])
            })
        )
    })
})
