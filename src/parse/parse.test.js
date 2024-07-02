import { strictEqual, throws } from "node:assert"
import { describe, it } from "node:test"
import {
    IntData,
    UplcBool,
    UplcByteArray,
    UplcDataValue,
    UplcInt,
    UplcUnit,
    builtinsV2
} from "@helios-lang/uplc"
import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    LiteralExpr,
    NameExpr
} from "../expressions/index.js"
import { DEFAULT_PARSE_OPTIONS, parse } from "./parse.js"
import { $ } from "./SourceMappedString.js"
import { bytesToHex, equalsBytes, hexToBytes } from "@helios-lang/codec-utils"
import { ExprTagger } from "./ExprTagger.js"

/**
 * @typedef {import("./parse.js").ParseOptions} ParseOptions
 */

describe(parse.name, () => {
    it("parses 'x' as NameExpr", () => {
        const expr = parse("x")

        strictEqual(expr instanceof NameExpr && expr.name == "x", true)
    })

    it("parses SourceMappedString(x) as NameExpr", () => {
        const expr = parse($("x"))

        strictEqual(expr instanceof NameExpr && expr.name == "x", true)
    })

    it("parses SourceMappedString(x) as NameExpr with custom funcTagger", () => {
        const funcTagger = new ExprTagger()
        funcTagger.genTag()

        const expr = parse($("x"), {
            ...DEFAULT_PARSE_OPTIONS,
            funcTagger
        })

        strictEqual(expr instanceof NameExpr && expr.name == "x", true)
    })

    it("parses 'true' as LiteralExpr", () => {
        const expr = parse("true")

        strictEqual(
            expr instanceof LiteralExpr &&
                expr.value instanceof UplcBool &&
                expr.value.value === true,
            true
        )
    })

    it("parses 'false' as LiteralExpr", () => {
        const expr = parse("false")

        strictEqual(
            expr instanceof LiteralExpr &&
                expr.value instanceof UplcBool &&
                expr.value.value === false,
            true
        )
    })

    it("fails to parse 'true false'", () => {
        throws(() => {
            parse("true false")
        })
    })

    it("parses '() -> {false}' as FuncExpr", () => {
        const expr = parse("() -> {false}")

        strictEqual(
            expr instanceof FuncExpr &&
                expr.body instanceof LiteralExpr &&
                expr.body.value instanceof UplcBool &&
                expr.body.value.value === false,
            true
        )
    })

    it("parses '(a, b) -> {addInteger(a, b)}' as FuncExpr", () => {
        const expr = parse("(a, b) -> {addInteger(a, b)}")

        strictEqual(expr instanceof FuncExpr && expr.args.length == 2, true)
    })

    it("fails to parse '(a, error) -> {addInteger(a, error)}'", () => {
        throws(() => {
            parse("(a, error) -> {addInteger(a, error)}")
        })
    })

    it("fails to parse '(a,) -> {a}'", () => {
        throws(() => {
            parse("(a,) -> {a}")
        })
    })

    const testData = new IntData(0)
    const testDataSrc = `##${bytesToHex(testData.toCbor())}`

    it("parses #(IntData) as LiteralExpr", () => {
        const expr = parse(testDataSrc)

        strictEqual(
            expr instanceof LiteralExpr &&
                expr.value instanceof UplcDataValue &&
                expr.value.value instanceof IntData &&
                expr.value.value.value == testData.value,
            true
        )
    })

    it("fails to parse #(IntData) #(IntData)", () => {
        throws(() => {
            parse(`${testDataSrc} ${testDataSrc}`)
        })
    })

    it("fails to parse #ab#cd", () => {
        throws(() => {
            parse("#ab#cd")
        })
    })

    it("fails to parse ab#cd", () => {
        throws(() => {
            parse("ab#cd")
        })
    })

    it('fails to parse ab"cd"', () => {
        throws(() => {
            parse('ab"cd"')
        })
    })

    it("fails to parse '() -> {false};'", () => {
        throws(() => {
            parse("() -> {false};")
        })
    })

    it("fails to parse 'b\"hello world\" () -> {false}'", () => {
        throws(() => {
            parse('b"hello world" () -> {false}')
        })
    })

    it("fails to parse '-'", () => {
        throws(() => {
            parse("-")
        })
    })

    it("parses -100 as LiteralExpr", () => {
        const expr = parse("-100")

        strictEqual(
            expr instanceof LiteralExpr &&
                expr.value instanceof UplcInt &&
                expr.value.value === -100n,
            true
        )
    })

    it("parses - 100 as LiteralExpr", () => {
        const expr = parse("- 100")

        strictEqual(
            expr instanceof LiteralExpr &&
                expr.value instanceof UplcInt &&
                expr.value.value === -100n,
            true
        )
    })

    it("parses '(- 100)' as LiteralExpr", () => {
        const expr = parse("(- 100)")

        strictEqual(
            expr instanceof LiteralExpr &&
                expr.value instanceof UplcInt &&
                expr.value.value === -100n,
            true
        )
    })

    it("parses '()' as LiteralExpr", () => {
        const expr = parse("()")

        strictEqual(
            expr instanceof LiteralExpr && expr.value instanceof UplcUnit,
            true
        )
    })

    it("fails to parse '(1, 2)'", () => {
        throws(() => {
            parse("(1, 2)")
        })
    })

    it("fails to parse '1 - 2'", () => {
        throws(() => {
            parse("1 - 2")
        })
    })

    it("parses #abcd as LiteralExpr", () => {
        const expr = parse("#abcd")

        strictEqual(
            expr instanceof LiteralExpr &&
                expr.value instanceof UplcByteArray &&
                equalsBytes(expr.value.bytes, hexToBytes("abcd")),
            true
        )
    })

    it("parses ifThenElse(cond, () -> {a}, () -> {b}) as CallExpr(BuiltinExpr)", () => {
        const expr = parse("ifThenElse(cond, () -> {a}, () -> {b})")

        strictEqual(
            expr instanceof CallExpr &&
                expr.func instanceof BuiltinExpr &&
                expr.func.name == "ifThenElse",
            true
        )
    })

    it("fails to parse ifThenElse()0", () => {
        throws(() => {
            parse("ifThenElse()0")
        })
    })

    it("parses 'a = false; a' as CallExpr(FuncExpr)", () => {
        const expr = parse("a = false; a")

        strictEqual(
            expr instanceof CallExpr &&
                expr.func instanceof FuncExpr &&
                expr.args.length == 1 &&
                expr.args[0] instanceof LiteralExpr &&
                expr.func.body instanceof NameExpr &&
                expr.func.body.name == "a",
            true
        )
    })

    it("fails to parse 'a = false'", () => {
        throws(() => {
            parse("a = false")
        })
    })

    it("fails to parse 'a = false;'", () => {
        throws(() => {
            parse("a = false;")
        })
    })

    it("fails to parse '\"hello world\" a = false'", () => {
        throws(() => {
            parse('"hello world" a = false;')
        })
    })

    it("fails to parse 'error = false; error'", () => {
        throws(() => {
            parse("error = false; error")
        })
    })

    it("parses 'error()' as ErrorExpr", () => {
        const expr = parse("error()")

        strictEqual(expr instanceof ErrorExpr, true)
    })

    it("fails to parse 'error'", () => {
        throws(() => {
            parse("error")
        })
    })

    it("fails to parse '\"hello world\" error()'", () => {
        throws(() => {
            parse('"hello world" error()')
        })
    })

    it("fails to parse '\"hello world\" a'", () => {
        throws(() => {
            parse('"hello world" a')
        })
    })

    it("parses 'divideInteger__safe(a, b)' as CallExpr(BuiltinExpr)", () => {
        const expr = parse("divideInteger__safe(a, b)")

        strictEqual(
            expr instanceof CallExpr &&
                expr.func instanceof BuiltinExpr &&
                expr.func.name == "divideInteger" &&
                expr.func.safe === true,
            true
        )
    })
})
