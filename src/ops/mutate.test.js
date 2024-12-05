import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { makeDummySite, makeWord } from "@helios-lang/compiler-utils"
import { CallExpr, ErrorExpr, NameExpr } from "../expressions/index.js"
import { format } from "../format/index.js"
import { parse, DEFAULT_PARSE_OPTIONS } from "../parse/index.js"
import { mutate } from "./mutate.js"

/**
 * @typedef {import("@helios-lang/compiler-utils").Site} Site
 */

/**
 * @type {Site}
 */
const site = makeDummySite()

describe(mutate.name, () => {
    it(`converts error() to CallExpr(error, [])`, () => {
        const expr = new ErrorExpr(site)

        const newExpr = mutate(expr, {
            errorExpr: (_errorExpr) => {
                return new CallExpr(
                    site,
                    new NameExpr(makeWord({ value: "error", site })),
                    []
                )
            }
        })

        strictEqual(
            newExpr instanceof CallExpr && newExpr.func instanceof NameExpr,
            true
        )
    })

    it(`converts () -> {addInteger(a, b)} to () -> {subtractInteger(c, d)}`, () => {
        const expr = parse(`() -> {addInteger(a, b)}`, {
            ...DEFAULT_PARSE_OPTIONS,
            builtins: {}
        })

        const newExpr = mutate(expr, {
            nameExpr: (nameExpr) => {
                switch (nameExpr.name) {
                    case "addInteger":
                        return new NameExpr(
                            makeWord({ value: "subtractInteger", site })
                        )
                    case "a":
                        return new NameExpr(makeWord({ value: "c", site }))
                    case "b":
                        return new NameExpr(makeWord({ value: "d", site }))
                    default:
                        return nameExpr
                }
            }
        })

        const result = format(newExpr, { tab: "  " })

        strictEqual(
            result,
            `() -> {
  subtractInteger(c, d)
}`
        )
    })
})
