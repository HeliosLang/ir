import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { isRight } from "@helios-lang/type-utils"
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
import { equalsBytes, hexToBytes } from "@helios-lang/codec-utils"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 */

/**
 * @type {Site}
 */
const site = {
    file: "",
    line: 0,
    column: 0
}

describe(LiteralExpr.name, () => {
    it("evaluates 0 correctly (ast)", () => {
        const program = compile(new LiteralExpr(new UplcInt(0), site), {
            optimize: true
        })

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcInt &&
                res.result.right.value == 0n,
            true
        )
    })

    it("evaluates 0 correctly (parsed)", () => {
        const program = compile("0", { optimize: true })

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcInt &&
                res.result.right.value == 0n,
            true
        )
    })

    it("evaluates #abcd correctly (ast)", () => {
        const program = compile(
            new LiteralExpr(new UplcByteArray("abcd"), site),
            { optimize: true }
        )

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcByteArray &&
                equalsBytes(res.result.right.bytes, hexToBytes("abcd")),
            true
        )
    })

    it("evaluates #abcd correctly (parsed)", () => {
        const program = compile("#abcd", { optimize: true })

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcByteArray &&
                equalsBytes(res.result.right.bytes, hexToBytes("abcd")),
            true
        )
    })

    it('evaluates "abcd" correctly (ast)', () => {
        const program = compile(new LiteralExpr(new UplcString("abcd"), site), {
            optimize: true
        })

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcString &&
                res.result.right.value == "abcd",
            true
        )
    })

    it('evaluates "abcd" correctly (parsed)', () => {
        const program = compile('"abcd"', { optimize: true })

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcString &&
                res.result.right.value == "abcd",
            true
        )
    })

    it("evaluates 'true' correctly (ast)", () => {
        const program = compile(new LiteralExpr(new UplcBool(true), site), {
            optimize: true
        })

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcBool &&
                res.result.right.value,
            true
        )
    })

    it("evaluates 'false' correctly (parsed)", () => {
        const program = compile("false", { optimize: true })

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcBool &&
                !res.result.right.value,
            true
        )
    })

    it("evaluates empty list correctly (ast)", () => {
        const program = compile(
            new LiteralExpr(new UplcList(UplcType.data(), []), site),
            { optimize: true }
        )

        const res = program.eval(undefined)

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcList &&
                res.result.right.items.length == 0,
            true
        )
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

        strictEqual(
            isRight(res.result) &&
                res.result.right instanceof UplcPair &&
                res.result.right.first instanceof UplcInt &&
                res.result.right.first.value == 0n &&
                res.result.right.second instanceof UplcByteArray &&
                res.result.right.second.bytes.length == 0,
            true
        )
    })
})
