import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { equalsBytes, hexToBytes } from "@helios-lang/codec-utils"
import { isRight, isString } from "@helios-lang/type-utils"
import {
    UplcBool,
    UplcByteArray,
    UplcInt,
    UplcList,
    UplcPair,
    UplcString,
    UplcType
} from "@helios-lang/uplc"
import { compile } from "../ops/index.js"
import { LiteralExpr } from "./LiteralExpr.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 * @typedef {import("@helios-lang/uplc").CekResult} CekResult
 * @typedef {import("@helios-lang/uplc").UplcValue} UplcValue
 */

/**
 * @type {Site}
 */
const site = {
    file: "",
    line: 0,
    column: 0
}

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
        const program = compile(new LiteralExpr(new UplcInt(0), site), {
            optimize: true
        })

        const res = program.eval(undefined)

        expectValue(res, new UplcInt(0n))
    })

    it("evaluates 0 correctly (parsed)", () => {
        const program = compile("0", { optimize: true })

        const res = program.eval(undefined)

        expectValue(res, new UplcInt(0n))
    })

    it("evaluates #abcd correctly (ast)", () => {
        const program = compile(
            new LiteralExpr(new UplcByteArray("abcd"), site),
            { optimize: true }
        )

        const res = program.eval(undefined)

        expectValue(res, new UplcByteArray("abcd"))
    })

    it("evaluates #abcd correctly (parsed)", () => {
        const program = compile("#abcd", { optimize: true })

        const res = program.eval(undefined)

        expectValue(res, new UplcByteArray("abcd"))
    })

    it('evaluates "abcd" correctly (ast)', () => {
        const program = compile(new LiteralExpr(new UplcString("abcd"), site), {
            optimize: true
        })

        const res = program.eval(undefined)

        expectValue(res, new UplcString("abcd"))
    })

    it('evaluates "abcd" correctly (parsed)', () => {
        const program = compile('"abcd"', { optimize: true })

        const res = program.eval(undefined)

        expectValue(res, new UplcString("abcd"))
    })

    it("evaluates 'true' correctly (ast)", () => {
        const program = compile(new LiteralExpr(new UplcBool(true), site), {
            optimize: true
        })

        const res = program.eval(undefined)

        expectValue(res, new UplcBool(true))
    })

    it("evaluates 'false' correctly (parsed)", () => {
        const program = compile("false", { optimize: true })

        const res = program.eval(undefined)

        expectValue(res, new UplcBool(false))
    })

    it("evaluates empty list correctly (ast)", () => {
        const program = compile(
            new LiteralExpr(new UplcList(UplcType.data(), []), site),
            { optimize: true }
        )

        const res = program.eval(undefined)

        expectValue(res, new UplcList(UplcType.data(), []))
    })

    it("evaluates pair of 0 and # correctly (ast)", () => {
        const program = compile(
            new LiteralExpr(
                new UplcPair(new UplcInt(0), new UplcByteArray([])),
                site
            ),
            { optimize: true }
        )

        const res = program.eval(undefined)

        expectValue(res, new UplcPair(new UplcInt(0n), new UplcByteArray([])))
    })
})
