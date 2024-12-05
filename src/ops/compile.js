import { makeWord } from "@helios-lang/compiler-utils"
import { makeUplcProgramV2 } from "@helios-lang/uplc"
import { Scope } from "../expressions/index.js"
import { format } from "../format/index.js"
import { parse, DEFAULT_PARSE_OPTIONS } from "../parse/index.js"
import { loop } from "./loop.js"
import { optimize } from "./optimize.js"
import { injectRecursiveDeps } from "./recursion.js"

/**
 * @import { Word } from "@helios-lang/compiler-utils"
 * @typedef {import("@helios-lang/uplc").UplcProgramV2} UplcProgramV2
 * @typedef {import("../expressions/index.js").Expr} Expr
 * @typedef {import("../parse/index.js").ParseOptions} ParseOptions
 * @typedef {import("../parse/index.js").SourceMappedStringI} SourceMappedStringI
 * @typedef {import("./optimize.js").OptimizeOptions} OptimizeOptions
 */

/**
 * @typedef {{
 *   optimize?: boolean
 *   parseOptions?: ParseOptions
 *   alt?: UplcProgramV2
 *   optimizeOptions?: OptimizeOptions
 * }} CompileOptions
 */

/**
 * @param {string | SourceMappedStringI | Expr} rawExpr
 * @param {CompileOptions} options
 * @returns {UplcProgramV2}
 */
export function compile(rawExpr, options = {}) {
    const expr = prepare(rawExpr, options)

    const uplc = expr.toUplc()

    return makeUplcProgramV2(uplc, {
        alt: options.alt,
        ir: () =>
            format(expr, {
                builtinsPrefix: "__core__",
                syntacticSugar: true,
                uplcDataLiterals: false // use function calls for literals, because many literals don't have a serializable representation
            })
    })
}

/**
 * @param {string | SourceMappedStringI | Expr} rawExpr
 * @param {CompileOptions} options
 * @returns {Expr}
 */
export function prepare(rawExpr, options = {}) {
    let expr =
        typeof rawExpr == "string" || "content" in rawExpr
            ? parse(rawExpr, options.parseOptions ?? DEFAULT_PARSE_OPTIONS)
            : rawExpr

    expr = injectRecursiveDeps(expr)

    expr.resolveNames(new Scope(undefined, undefined))

    giveVariablesUniqueNames(expr)

    if (options.optimize) {
        expr = optimize(expr, options.optimizeOptions ?? {})

        expr.resolveNames(new Scope(undefined, undefined))
    }

    return expr
}

/**
 * Substitution optimizations are much easier if each variable has a guaranteed globally unique name
 * Assume NameExpr variables have already been resolved
 * @param {Expr} expr
 */
function giveVariablesUniqueNames(expr) {
    let varNames = new Set()

    // mutate names in-place
    loop(expr, {
        funcExpr: (funcExpr) => {
            funcExpr.args.forEach((a) => {
                const name = a.name.value

                if (varNames.has(name)) {
                    let i = 1
                    let suffix = `_${i}`
                    let nameWithSuffix = `${name}${suffix}`

                    while (varNames.has(nameWithSuffix)) {
                        i++
                        suffix = `_${i}`
                        nameWithSuffix = `${name}${suffix}`
                    }

                    a.name = makeWord({
                        value: nameWithSuffix,
                        site: a.name.site
                    })
                    varNames.add(nameWithSuffix)
                } else {
                    varNames.add(name)
                }
            })
        }
    })

    // sync NameExprs
    loop(expr, {
        nameExpr: (nameExpr) => {
            if (nameExpr.variable.name.value != nameExpr.name) {
                nameExpr.name = nameExpr.variable.name.value
            }
        }
    })
}
