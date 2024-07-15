import { strictEqual, throws } from "node:assert"
import { describe, it } from "node:test"
import { removeWhitespace } from "@helios-lang/codec-utils"
import { format } from "../format/index.js"
import { parse, DEFAULT_PARSE_OPTIONS } from "../parse/index.js"
import { injectRecursiveDeps } from "./recursion.js"

/**
 * @typedef {import("../parse/index.js").ParseOptions} ParseOptions
 */

describe(injectRecursiveDeps.name, () => {
    it("correctly orders two functions where the former depends on the latter", () => {
        const expr = parse(
            `a = b;
            b = 0;
            a`
        )

        const newExpr = injectRecursiveDeps(expr)

        strictEqual(format(newExpr), `b = 0;\na = b;\na`)
    })

    it("correctly inject 'a' into 'a = (list) -> {...}; a(makeEmptyList(()))'", () => {
        const expr = parse(
            `a = (list) -> {chooseList(list,0,addInteger(1, a(tailList__safe(list))))}; a(mkNilData(()))`
        )

        const newExpr = injectRecursiveDeps(expr)

        strictEqual(
            format(newExpr),
            `a = (a) -> {
    (list) -> {
        chooseList(list, 0, addInteger(1, a(a)(tailList__safe(list))))
    }
};
a(a)(mkNilData(()))`
        )
    })

    it("fails for (a, b) -> {addInteger(a,b)}(0)", () => {
        throws(() => {
            const expr = parse(`(a, b) -> {addInteger(a,b)}(0)`)

            injectRecursiveDeps(expr)
        })
    })

    it("works for 'a=b;b=addInteger(c,d);c=addInteger(a,e);d=0;e=1;f=c;f'", () => {
        const expr = parse(
            "a=b;b=addInteger(c,d);c=addInteger(a,e);d=0;e=1;f=c;f"
        )

        const newExpr = injectRecursiveDeps(expr)

        strictEqual(
            format(newExpr),
            `d = 0;
e = 1;
a = (a, b, c) -> {
    b(a, b, c)
};
b = (a, b, c) -> {
    addInteger(c(a, b, c), d)
};
c = (a, b, c) -> {
    addInteger(a(a, b, c), e)
};
f = c(a, b, c);
f`
        )
    })

    it("works for name that is internally shadowed", () => {
        const expr = parse(
            "a = (list) -> {chooseList(list, (a) -> {a}, (b) -> {addInteger(a(tailList__safe(list)), b)})(1)}; a(mkNilData(()))"
        )

        const newExpr = injectRecursiveDeps(expr)

        strictEqual(
            format(newExpr),
            `a = (a) -> {
    (list) -> {
        chooseList(list, (a) -> {
            a
        }, (b) -> {
            addInteger(a(a)(tailList__safe(list)), b)
        })(1)
    }
};
a(a)(mkNilData(()))`
        )
    })

    it("works for real-life recursive function", () => {
        const expr = parse(
            `(a) -> {
                __helios__int__to_hex = (self) -> {
                    () -> {
                        recurse = (self, bytes) -> {
                            digit = __core__modInteger(self, 16);
                            bytes = __core__consByteString(
                                __core__ifThenElse(
                                    __core__lessThanInteger(digit, 10),
                                    __core__addInteger(digit, 48),
                                    __core__addInteger(digit, 87)
                                ),
                                bytes
                            );
                            __core__ifThenElse(
                                __core__lessThanInteger(self, 16),
                                () -> {
                                    bytes
                                },
                                () -> {
                                    recurse(__core__divideInteger(self, 16), bytes)
                                }
                            )()
                        };
                        __core__decodeUtf8__safe(
                            __core__ifThenElse(
                                __core__lessThanInteger(self, 0),
                                () -> {
                                    __core__consByteString(
                                        45,
                                        recurse(__core__multiplyInteger(self, -1), #)
                                    )
                                },
                                () -> {
                                    recurse(self, #)
                                }
                            )()
                        )
                    }
                };
                __helios__int__to_hex(a)()
            }`,
            {
                ...DEFAULT_PARSE_OPTIONS,
                builtinsPrefix: "__core__"
            }
        )

        const newExpr = injectRecursiveDeps(expr)

        strictEqual(
            removeWhitespace(format(newExpr, { builtinsPrefix: "__core__" })),
            removeWhitespace(`(a) -> {
                __helios__int__to_hex = (self) -> {
                    () -> {
                        recurse = (recurse) -> {
                            (self, bytes) -> {
                                digit = __core__modInteger(self, 16);
                                bytes = __core__consByteString(
                                    __core__ifThenElse(
                                        __core__lessThanInteger(digit, 10),
                                        __core__addInteger(digit, 48),
                                        __core__addInteger(digit, 87)
                                    ), 
                                    bytes
                                );
                                __core__ifThenElse(
                                    __core__lessThanInteger(self, 16),
                                    () -> {
                                        bytes
                                    },
                                    () -> {
                                        recurse(recurse)(__core__divideInteger(self, 16), bytes)
                                    }
                                )()
                            }
                        };
                        __core__decodeUtf8__safe(
                            __core__ifThenElse(
                                __core__lessThanInteger(self, 0),
                                () -> {
                                    __core__consByteString(
                                        45, 
                                        recurse(recurse)(__core__multiplyInteger(self, -1), #)
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
            }`)
        )
    })
})
