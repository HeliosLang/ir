import {
    Source,
    TokenReader,
    Tokenizer,
    Word,
    anyWord,
    boollit,
    byteslit,
    group,
    intlit,
    oneOf,
    strlit,
    symbol,
    word
} from "@helios-lang/compiler-utils"
import { None } from "@helios-lang/type-utils"
import {
    BuiltinExpr,
    CallExpr,
    ErrorExpr,
    FuncExpr,
    LiteralExpr,
    NameExpr,
    Variable
} from "../expressions/index.js"
import { SourceMappedString } from "./SourceMappedString.js"
import {
    UplcBool,
    UplcByteArray,
    UplcDataValue,
    UplcInt,
    UplcString,
    UplcUnit,
    builtinsV2,
    decodeUplcData
} from "@helios-lang/uplc"

/**
 * @typedef {import("@helios-lang/compiler-utils").Token} Token
 * @typedef {import("../expressions/index.js").Expr} Expr
 */

/**
 * @typedef {{
 *   builtinsPrefix: string
 *   errorPrefix: string
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
 * @param {string | SourceMappedString} ir
 * @param {ParseOptions} options
 * @returns {Expr}
 */
export function parse(ir, options = DEFAULT_PARSE_OPTIONS) {
    let [raw, sourceMap] =
        typeof ir == "string" ? [ir, new Map()] : ir.toStringWithSourceMap()

    const src = new Source("", raw)

    const tokenizer = new Tokenizer(src, {
        sourceMap,
        extraValidFirstLetters: "[@$]",
        tokenizeReal: false,
        preserveComments: false,
        allowLeadingZeroes: false
    })

    const ts = tokenizer.tokenize()

    const reader = new TokenReader(ts, tokenizer.errors)

    const expr = parseInternal(reader, options)

    return expr
}

/**
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
     * @type {Option<Expr>}
     */
    let expr = None

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

            const [semicolon, upstreamReader] = r.find(symbol(";"))

            if (!semicolon) {
                r.errors.throw()
                throw new Error("unexpected")
            }

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

            expr = new FuncExpr(parens.site, args, bodyExpr)
        } else if ((m = r.matches(group("(")))) {
            if (!expr) {
                if (m.fields.length == 1) {
                    expr = parseInternal(m.fields[0], options)
                } else if (m.fields.length == 0) {
                    expr = new LiteralExpr(new UplcUnit(), m.site)
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

            expr = new LiteralExpr(new UplcInt(-x.value), minus.site)
        } else if ((m = r.matches(boollit()))) {
            if (expr) {
                r.errors.syntax(m.site, "unexpected expression")
            }

            expr = new LiteralExpr(new UplcBool(m.value), m.site)
        } else if ((m = r.matches(intlit()))) {
            if (expr) {
                r.errors.syntax(m.site, "unexpected expression")
            }

            expr = new LiteralExpr(new UplcInt(m.value), m.site)
        } else if ((m = r.matches(byteslit(), byteslit()))) {
            const [a, b] = m

            if (expr) {
                r.errors.syntax(a.site, "unexpected expression")
            }

            if (a.value.length != 0) {
                r.errors.syntax(b.site, "unexpected expression")
            }

            expr = new LiteralExpr(
                new UplcDataValue(decodeUplcData(b.value)),
                a.site
            )
        } else if ((m = r.matches(byteslit()))) {
            if (expr) {
                r.errors.syntax(m.site, "unexpected expression")
            }

            expr = new LiteralExpr(new UplcByteArray(m.value), m.site)
        } else if ((m = r.matches(strlit()))) {
            if (expr) {
                r.errors.syntax(m.site, "unexpected expression")
            }

            expr = new LiteralExpr(new UplcString(m.value), m.site)
        } else if (
            (m = r.matches(
                word(options.errorPrefix + "error"),
                group("(", { length: 0 })
            ))
        ) {
            const [w, parens] = m

            if (expr) {
                r.errors.syntax(w.site, "unexpected expression")
            }

            expr = new ErrorExpr(w.site)
        } else if ((m = r.matches(anyWord))) {
            if (expr) {
                r.errors.syntax(m.site, "unexpected expression")
            }

            if (isReserved(m)) {
                r.errors.syntax(m.site, "reserved keyword")
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
