import {
    makeSource,
    makeTokenReader,
    makeTokenizer,
    anyWord,
    boollit,
    byteslit,
    group,
    intlit,
    strlit,
    symbol,
    word
} from "@helios-lang/compiler-utils"
import {
    makeUplcBool,
    makeUplcByteArray,
    makeUplcDataValue,
    makeUplcInt,
    makeUplcString,
    UNIT_VALUE,
    builtinsV2,
    decodeUplcData
} from "@helios-lang/uplc"
import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    LiteralExpr,
    NameExpr,
    ParamExpr,
    Variable
} from "../expressions/index.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Token} Token
 * @typedef {import("@helios-lang/compiler-utils").TokenReader} TokenReader
 * @typedef {import("@helios-lang/compiler-utils").Word} Word
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("./SourceMappedString.js").SourceMappedStringI} SourceMappedStringI
 */

/**
 * @typedef {{
 *   builtinsPrefix: string
 *   errorPrefix: string
 *   paramPrefix: string
 *   safeBuitinSuffix: string
 *   builtins: Record<string, {
 *     id: number
 *     nForce: number
 *     canFail: boolean
 *     nArgs: number
 *     sideEffects?: boolean
 *   }>
 * }} ParseOptions
 */

/**
 * @type {ParseOptions}
 */
export const DEFAULT_PARSE_OPTIONS = {
    builtinsPrefix: "",
    errorPrefix: "",
    paramPrefix: "",
    safeBuitinSuffix: "__safe",
    builtins: Object.fromEntries(
        builtinsV2.map((b, id) => [
            b.name,
            {
                id: id,
                nForce: b.forceCount,
                nArgs: b.nArgs,
                canFail: false,
                sideEffects: false
            }
        ])
    )
}

/**
 * @param {string | SourceMappedStringI} ir
 * @param {ParseOptions} options
 * @returns {Expr}
 */
export function parse(ir, options = DEFAULT_PARSE_OPTIONS) {
    let [raw, sourceMap] =
        typeof ir == "string" ? [ir, undefined] : ir.toStringWithSourceMap()

    const src = makeSource(raw)

    const tokenizer = makeTokenizer(src, {
        sourceMap,
        extraValidFirstLetters: "[@$]",
        tokenizeReal: false,
        preserveComments: false,
        allowLeadingZeroes: false
    })

    const ts = tokenizer.tokenize()

    const reader = makeTokenReader({ tokens: ts, errors: tokenizer.errors })

    const expr = parseInternal(reader, options)

    return expr
}

/**
 * TODO: should this take into account the prefix?
 * @param {Word} w
 * @returns {boolean}
 */
function isReserved(w) {
    return ["error"].includes(w.value)
}

/**
 *
 * @param {TokenReader} r
 * @param {ParseOptions} options
 * @returns {Expr}
 */
function parseInternal(r, options) {
    /**
     * @type {Expr | undefined}
     */
    let expr = undefined

    let m

    while (!r.isEof()) {
        if ((m = r.matches(anyWord, symbol("=")))) {
            const [w, equals] = m

            if (expr) {
                r.errors.syntax(w.site, "unexpected expression")
            }

            if (isReserved(w)) {
                r.errors.syntax(w.site, "reserved keyword")
            }

            m = r.findNext(symbol(";"))

            if (!m) {
                r.errors.throw()
                throw new Error("unexpected")
            }

            const [upstreamReader, semicolon] = m

            const upstreamExpr = parseInternal(upstreamReader, options)
            const downstreamExpr = parseInternal(r, options)

            expr = new CallExpr(
                equals.site,
                new FuncExpr(semicolon.site, [new Variable(w)], downstreamExpr),
                [upstreamExpr]
            )
        } else if (
            (m = r.matches(group("("), symbol("->"), group("{", { length: 1 })))
        ) {
            const [parens, arrow, braces] = m

            if (expr) {
                r.errors.syntax(parens.site, "unexpected expression")
            }

            /**
             * @type {Variable[]}
             */
            const args = []

            parens.fields.forEach((f) => {
                const w = f.matches(anyWord)

                f.end()

                if (w) {
                    if (isReserved(w)) {
                        f.errors.syntax(w.site, "reserved keyword")
                    }

                    args.push(new Variable(w))
                }
            })

            const bodyExpr = parseInternal(braces.fields[0], options)

            expr = new FuncExpr(arrow.site, args, bodyExpr)
        } else if ((m = r.matches(group("(")))) {
            if (!expr) {
                if (m.fields.length == 1) {
                    expr = parseInternal(m.fields[0], options)
                } else if (m.fields.length == 0) {
                    expr = new LiteralExpr(UNIT_VALUE, m.site)
                } else {
                    r.errors.syntax(
                        m.site,
                        "unexpected parentheses with multiple fields"
                    )
                }
            } else {
                let args = []
                for (let f of m.fields) {
                    args.push(parseInternal(f, options))
                }

                expr = new CallExpr(m.site, expr, args)
            }
        } else if ((m = r.matches(symbol("-"), intlit()))) {
            const [minus, x] = m

            if (expr) {
                r.errors.syntax(minus.site, "unexpected expression")
            }

            expr = new LiteralExpr(makeUplcInt(-x.value), minus.site)
        } else if ((m = r.matches(boollit()))) {
            if (expr) {
                r.errors.syntax(m.site, "unexpected expression")
            }

            expr = new LiteralExpr(makeUplcBool(m.value), m.site)
        } else if ((m = r.matches(intlit()))) {
            if (expr) {
                r.errors.syntax(m.site, "unexpected expression")
            }

            expr = new LiteralExpr(makeUplcInt(m.value), m.site)
        } else if ((m = r.matches(byteslit(), byteslit()))) {
            const [a, b] = m

            if (expr) {
                r.errors.syntax(a.site, "unexpected expression")
            }

            if (a.value.length != 0) {
                r.errors.syntax(b.site, "unexpected expression")
            }

            expr = new LiteralExpr(
                makeUplcDataValue(decodeUplcData(b.value)),
                a.site
            )
        } else if ((m = r.matches(byteslit()))) {
            if (expr) {
                r.errors.syntax(m.site, "unexpected expression")
            }

            expr = new LiteralExpr(makeUplcByteArray(m.value), m.site)
        } else if ((m = r.matches(strlit()))) {
            if (expr) {
                r.errors.syntax(m.site, "unexpected expression")
            }

            expr = new LiteralExpr(makeUplcString(m.value), m.site)
        } else if (
            (m = r.matches(
                word(options.errorPrefix + "error"),
                group("(", { length: 0 })
            ))
        ) {
            const [w, _parens] = m

            if (expr) {
                r.errors.syntax(w.site, "unexpected expression")
            }

            expr = new ErrorExpr(w.site)
        } else if (
            (m = r.matches(
                word(options.paramPrefix + "param"),
                group("(", { length: 2 })
            ))
        ) {
            const [w, parens] = m

            const f0 = parens.fields[0]
            let s = f0.matches(strlit())
            f0.end()

            const innerExpr = parseInternal(parens.fields[1], options)

            expr = new ParamExpr(w.site, s ? s.value : "", innerExpr)
        } else if ((m = r.matches(anyWord))) {
            if (expr) {
                r.errors.syntax(m.site, "unexpected expression")
            }

            if (isReserved(m)) {
                r.errors.syntax(m.site, `reserved keyword ${m.value}`)
            }

            let builtinName = m.value.slice(options.builtinsPrefix.length)
            let safe = false

            if (builtinName.endsWith(options.safeBuitinSuffix)) {
                safe = true
                builtinName = builtinName.slice(
                    0,
                    builtinName.length - options.safeBuitinSuffix.length
                )
            }

            if (
                m.value.startsWith(options.builtinsPrefix) &&
                builtinName in options.builtins
            ) {
                const builtin = options.builtins[builtinName]

                expr = new BuiltinExpr(
                    builtinName,
                    builtin.id,
                    safe,
                    builtin.nForce,
                    m.site
                )
            } else {
                expr = new NameExpr(m)
            }
        } else {
            r.endMatch()
            break
        }
    }

    r.errors.throw()

    if (!expr) {
        throw new Error("expr is None")
    }

    return expr
}
