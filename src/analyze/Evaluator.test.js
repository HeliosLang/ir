import { describe, it } from "node:test"
import { parse } from "../parse/index.js"
import { Evaluator, generateFuncTagsAndVariableIds } from "./Evaluator.js"
import { removeWhitespace } from "@helios-lang/codec-utils"

/**
 * @type {{
 *   description: string,
 *   source: string
 * }[]}
 */
const testVector = [
    {
        description: "many repeated operations",
        source: `(a) -> {
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
    },
    {
        description: "basic recursion",
        source: `
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
    },
    {
        description: "recursive int to hex algorithm",
        source: `(a) -> {
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
    },
    {
        description: "zigzap roundtrip",
        source: `(arg0) -> {
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
    },
    {
        description: "int parsing",
        source: `(__helios__int____to_data) -> {
    (__helios__string__from_data) -> {
    (__helios__error) -> {
    (__helios__int__parse_digit) -> {
    (__helios__int__parse) -> {
    (__module__int_parse__main) -> {
        /*entry point*/
        (arg0) -> {
            __helios__int____to_data(__module__int_parse__main(__helios__string__from_data(arg0)))
        }
    }(
        /*__module__int_parse__main*/
        (a) -> {
        __helios__int__parse(a)
    }
    )
    }(
        /*__helios__int__parse*/
        (string) -> {
            bytes = encodeUtf8(string);
            n = lengthOfByteString(bytes);
            b0 = indexByteString(bytes, 0);
            recurse = (recurse, acc, i) -> {
                ifThenElse(
                    equalsInteger(i, n),
                    () -> {
                        acc
                    },
                    () -> {
                        new_acc = addInteger(
                            multiplyInteger(acc, 10), 
                            __helios__int__parse_digit(indexByteString(bytes, i))
                        );
                        recurse(recurse, new_acc, addInteger(i, 1))
                    }
                )()
            };
            ifThenElse(
                equalsInteger(b0, 48),
                () -> {
                    ifThenElse(
                        equalsInteger(n, 1),
                        () -> {
                            0
                        },
                        () -> {
                            __helios__error("zero padded integer can't be parsed")
                        }
                    )()
                },
                () -> {
                    ifThenElse(
                        equalsInteger(b0, 45),
                        () -> {
                            ifThenElse(
                                equalsInteger(indexByteString(bytes, 1), 48),
                                () -> {
                                    __helios__error("-0 not allowed")
                                },
                                () -> {
                                    multiplyInteger(
                                        recurse(recurse, 0, 1),
                                        -1
                                    )
                                }
                            )()
                        },
                        () -> {
                            recurse(recurse, 0, 0)
                        }
                    )()
                }
            )()
        }
    )
    }(
        /*__helios__int__parse_digit*/
        (digit) -> {
            ifThenElse(
                lessThanEqualsInteger(digit, 57),
                () -> {
                    ifThenElse(
                        lessThanEqualsInteger(48, digit),
                        () -> {
                            subtractInteger(digit, 48)
                        },
                        () -> {
                            __helios__error("not a digit")
                        }
                    )()
                },
                () -> {
                    __helios__error("not a digit")
                }
            )()
        }
    )
    }(
        /*__helios__error*/
        (msg) -> {
            trace(
                msg, 
                () -> {
                    error()
                }
            )()
        }
    )
    }(
        /*__helios__string__from_data*/
        (d) -> {
            decodeUtf8(unBData(d))
        }
    )
    }(
        /*__helios__int____to_data*/
        iData
    )`
    }
]

describe(Evaluator.name, () => {
    testVector.forEach((t) => {
        it(t.description, () => {
            const expr = parse(t.source)

            const [funcExprs, variables] = generateFuncTagsAndVariableIds(expr)

            const evaluator = new Evaluator({
                funcExprs,
                variables
            })

            evaluator.eval(expr)
        })
    })
})
