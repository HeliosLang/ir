import { strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { UplcInt } from "@helios-lang/uplc"
import { AnyValue } from "./AnyValue.js"
import { BranchedValue } from "./BranchedValue.js"
import { Branches } from "./Branches.js"
import { DataValue } from "./DataValue.js"
import { FuncValue } from "./FuncValue.js"
import { LiteralValue } from "./LiteralValue.js"
import { Stack } from "./Stack.js"
import { StackValues } from "./StackValues.js"
import { stringifyValue } from "./stringify.js"

describe(stringifyValue.name, () => {
    it(`returns Fn0[] for function with empty stack`, () => {
        const value = new FuncValue(
            0,
            new Stack(StackValues.empty(), Branches.empty()),
            0
        )

        const summary = stringifyValue(value, { tag: 1, maxDepth: 0 })

        strictEqual(summary, `Fn0[]`)
    })

    it(`returns Fn0[0: Any0], for function with single entry in stack`, () => {
        const value = new FuncValue(
            0,
            new Stack(
                new StackValues([[0, new AnyValue(0)]]),
                Branches.empty()
            ),
            0
        )

        const summary = stringifyValue(value, { tag: 1, maxDepth: 0 })

        strictEqual(summary, `Fn0[0: Any0]`)
    })

    it(`returns Fn0 for recursive function`, () => {
        const value = new FuncValue(
            0,
            new Stack(StackValues.empty(), Branches.empty()),
            0
        )

        const summary = stringifyValue(value, { tag: 0, maxDepth: 0 })

        strictEqual(summary, `Fn0`)
    })

    it(`returns Data0 when stringifying Data`, () => {
        const value = new DataValue(0, Branches.empty())

        const summary = stringifyValue(value, { tag: 0, maxDepth: 0 })

        strictEqual(summary, `Data0`)
    })

    it(`returns Ite(Data0, Fn0, Fn1[]) for basic branched value if Fn0 is recursive`, () => {
        const value = new BranchedValue(
            "ifThenElse",
            new DataValue(0, Branches.empty()),
            [
                new FuncValue(
                    0,
                    new Stack(StackValues.empty(), Branches.empty()),
                    0
                ),
                new FuncValue(
                    1,
                    new Stack(StackValues.empty(), Branches.empty()),
                    0
                )
            ],
            /** @type {any} */ (null)
        )

        const summary = stringifyValue(value, { tag: 0, maxDepth: 0 })

        strictEqual(summary, `Ite(Data0, Fn0, Fn1[])`)
    })

    it(`returns Ite(Data0, Fn0[], Fn1) for basic branched value if Fn1 is recursive`, () => {
        const value = new BranchedValue(
            "ifThenElse",
            new DataValue(0, Branches.empty()),
            [
                new FuncValue(
                    0,
                    new Stack(StackValues.empty(), Branches.empty()),
                    0
                ),
                new FuncValue(
                    1,
                    new Stack(StackValues.empty(), Branches.empty()),
                    0
                )
            ],
            /** @type {any} */ (null)
        )

        const summary = stringifyValue(value, { tag: 1, maxDepth: 0 })

        strictEqual(summary, `Ite(Data0, Fn0[], Fn1)`)
    })

    it(`returns Fn0[0: Data0, 1: Ite(Data1, Fn1[], Fn2[0: 0])] for more complex value`, () => {
        const value = new FuncValue(
            0,
            new Stack(
                new StackValues([
                    [0, new DataValue(0, Branches.empty())],
                    [
                        1,
                        new BranchedValue(
                            "ifThenElse",
                            new DataValue(1, Branches.empty()),
                            [
                                new FuncValue(
                                    1,
                                    new Stack(
                                        StackValues.empty(),
                                        Branches.empty()
                                    ),
                                    0
                                ),
                                new FuncValue(
                                    2,
                                    new Stack(
                                        new StackValues([
                                            [
                                                0,
                                                new LiteralValue(new UplcInt(0))
                                            ]
                                        ]),
                                        Branches.empty()
                                    ),
                                    0
                                )
                            ],
                            /** @type {any} */ (null)
                        )
                    ]
                ]),
                Branches.empty()
            ),
            0
        )

        const summary = stringifyValue(value)

        strictEqual(summary, `Fn0[0: Data0, 1: Ite(Data1, Fn1[], Fn2[0: 0])]`)
    })

    it(`returns Fn0[0: Data0, 1: Ite(Data1, Fn1[], Fn2[0: 0, 3: Fn10[]])] for more complex value, iterated 10000 times`, () => {
        const value = new FuncValue(
            0,
            new Stack(
                new StackValues([
                    [0, new DataValue(0, Branches.empty())],
                    [
                        1,
                        new BranchedValue(
                            "ifThenElse",
                            new DataValue(1, Branches.empty()),
                            [
                                new FuncValue(
                                    1,
                                    new Stack(
                                        StackValues.empty(),
                                        Branches.empty()
                                    ),
                                    0
                                ),
                                new FuncValue(
                                    2,
                                    new Stack(
                                        new StackValues([
                                            [
                                                0,
                                                new LiteralValue(new UplcInt(0))
                                            ],
                                            [
                                                3,
                                                new FuncValue(
                                                    10,
                                                    new Stack(
                                                        StackValues.empty(),
                                                        Branches.empty()
                                                    ),
                                                    0
                                                )
                                            ]
                                        ]),
                                        Branches.empty()
                                    ),
                                    0
                                )
                            ],
                            /** @type {any} */ (null)
                        )
                    ]
                ]),
                Branches.empty()
            ),
            0
        )

        for (let iter = 0; iter < 10000; iter++) {
            const summary = stringifyValue(value)
            strictEqual(
                summary,
                `Fn0[0: Data0, 1: Ite(Data1, Fn1[], Fn2[0: 0, 3: Fn10[]])]`
            )
        }
    })
})
