import { describe, it } from "node:test"
import { CallExpr, FuncExpr } from "../expressions/index.js"
import { parse } from "../parse/index.js"
import { Analyzer } from "./Analyzer.js"
import { strictEqual } from "node:assert"
import { annotate } from "./annotate.js"

describe(Analyzer.name, () => {
    it("doesn't detect common values spuriously", () => {
        const src = `
        (i) -> {
            (id) -> {
                (recurse) -> {
                    recurse(recurse, i)
                }(
                    (recurse, x) -> {
                        ifThenElse(
                            lessThanInteger(0, x),
                            () -> {
                                recurse(recurse, subtractInteger(x, 1))
                            },
                            () -> {
                                id
                            }
                        )()
                    }
                )
            }(addInteger(i, i))
        }`

        const root = parse(src)

        const analyzer = new Analyzer(root, { debug: true })
        const analysis = analyzer.analyze()

        console.log(annotate(analysis, { debug: true }))
    })

    it("detects deep, non-recursive, common values", () => {
        const src = `(a) -> {
            ifThenElse(
                a,
                () -> {
                    (b, c) -> {
                        addInteger(
                            addInteger(
                                addInteger(headList(b), c), addInteger(headList(b), c)
                            ), 
                            addInteger(
                                addInteger(headList(b), c), addInteger(headList(b), c)
                            )
                        )
                    }
                },
                () -> {
                    error()
                }
            )()
        }`

        const root = parse(src)

        const analyzer = new Analyzer(root)
        const analysis = analyzer.analyze()

        console.log(annotate(analysis))
    })

    it("complete a complex recursive analysis", () => {
        const src = `(a) -> {
            __helios__int__to_hex = (self) -> {
                () -> {
                    recurse = (recurse) -> {
                        (self, bytes) -> {
                            digit = modInteger(self, 16);
                            bytes = consByteString(
                                ifThenElse(
                                    lessThanInteger(digit, 10),
                                    addInteger(digit, 48),
                                    addInteger(digit, 87)
                                ),
                                bytes
                            );
                            ifThenElse(
                                lessThanInteger(self, 16),
                                () -> {
                                    bytes
                                },
                                () -> {
                                    recurse(recurse)(divideInteger(self, 16), bytes)
                                }
                            )()
                        }
                    };
                    decodeUtf8__safe(
                        ifThenElse(
                            lessThanInteger(self, 0),
                            () -> {
                                consByteString(
                                    45,
                                    recurse(recurse)(multiplyInteger(self, -1), #)
                                )
                            },
                            () -> {
                                recurse(recurse)(self, #)
                            }
                        )()
                    )
                }
            };
            __helios__int__to_hex(a)()
        }`

        const root = parse(src)

        const analyzer = new Analyzer(root, { debug: true })
        const analysis = analyzer.analyze()

        console.log(annotate(analysis))
    })

    it("complete another complex recursive analysis", () => {
        const src = `(arg0) -> {
            (b) -> {
                constrData(ifThenElse(
                    b,
                    1,
                    0
                ), mkNilData(()))
            }((a) -> {
                equalsInteger((self) -> {
                    () -> {
                        ifThenElse(
                            lessThanInteger(self, 0),
                            () -> {
                                error()
                            },
                            () -> {
                                ifThenElse(
                                    equalsInteger(modInteger(self, 2), 0),
                                    () -> {
                                        divideInteger(self, 2)
                                    },
                                    () -> {
                                        divideInteger(addInteger(self, 1), -2)
                                    }
                                )()
                            }
                        )()
                    }
                }(ifThenElse(
                    lessThanInteger(a, 0),
                    () -> {
                        subtractInteger(multiplyInteger(a, -2), 1)
                    },
                    () -> {
                        multiplyInteger(a, 2)
                    }
                )())(), a)
            }(unIData(arg0)))
        }`

        const root = parse(src)

        const analyzer = new Analyzer(root, { debug: true })
        const analysis = analyzer.analyze()

        console.log(annotate(analysis, { debug: true, syntacticSugar: false }))
    })

    it("evaluates both passes", () => {
        const root = parse(`(x) -> {x}`)

        if (!(root instanceof FuncExpr)) {
            throw new Error("unexpected")
        }

        const analyzer = new Analyzer(root)
        const analysis = analyzer.analyze()

        strictEqual(analysis.countFuncCalls(root), 1)
    })

    it("evaluates internal function", () => {
        const root = parse(`
        (x) -> {
            fn = (a) -> {
                addInteger(a, a)
            };
            fn(x)
        }`)

        const analyzer = new Analyzer(root)
        const analysis = analyzer.analyze()

        if (
            root instanceof FuncExpr &&
            root.body instanceof CallExpr &&
            root.body.args[0] instanceof FuncExpr
        ) {
            const arg = root.body.args[0]

            if (!(arg instanceof FuncExpr)) {
                throw new Error("unexpected")
            }

            strictEqual(analysis.countFuncCalls(root), 1)
            strictEqual(analysis.countFuncCalls(arg), 1)
        } else {
            throw new Error("unexpected")
        }
    })
})
