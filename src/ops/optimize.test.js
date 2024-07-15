import { strictEqual } from "node:assert"
import { describe, it, test } from "node:test"
import { removeWhitespace } from "@helios-lang/codec-utils"
import { format } from "../format/index.js"
import { parse } from "../parse/index.js"
import { optimize } from "./optimize.js"

/**
 * @type {{description: string, input: string, expectedOutput: string}[]}
 */
const testVector = [
    {
        description: "multiplication by literal 0 becomes literal 0",
        input: `(a, b) -> {
            multiplyInteger(addInteger(a, b), 0)
        }`,
        expectedOutput: `(a, b) -> {
            0
        }`
    },
    {
        description:
            "multiplication by literal 0 doesn't 0 if other arg expects an error",
        input: `(a, b) -> {
            multiplyInteger(divideInteger(a, b), 0)
        }`,
        expectedOutput: `(a, b) -> {
            multiplyInteger(divideInteger(a, b), 0)
        }`
    },
    {
        description: "function is inlined and args/calls are flattened",
        input: `
        (a, b) -> {
            fn = (a, b) -> {
                () -> {
                    addInteger(a, b)
                }
            };
            fn(a, b)()
        }`,
        expectedOutput: "addInteger"
    },
    {
        description: "nested function is inlined and args/calls are flattened",
        input: `(a, b) -> {
            (fn) -> {
                fn(a, b)()(a)
            }(
                (a, b) -> {
                    () -> {
                        (c) -> {
                            addInteger(a, b)
                        }
                    }
                }
            )
        }`,
        expectedOutput: "addInteger"
    },
    {
        description:
            "multiple calls of same function are inlined if small enough",
        input: `
        (a, b) -> {
            (fn) -> {
                addInteger(
                    fn(a, b)()(a), 
                    fn(b, a)()(b)
                )
            }(
                (a, b) -> {
                    () -> {
                        (c) -> {
                            addInteger(a, b)
                        }
                    }
                }
            )
        }`,
        expectedOutput: `(a, b) -> {
            addInteger(addInteger(a, b), addInteger(b, a))
        }`
    },
    {
        description: "can handle recursive functions",
        input: `
        (i) -> {
            id = addInteger(i, i);
            recurse = (recurse, x) -> {
                ifThenElse(
                    lessThanInteger(0, x),
                    () -> {
                        recurse(recurse, subtractInteger(x, 1))
                    },
                    () -> {
                        x
                    }
                )()
            };
            recurse(recurse, id)
        }`,
        expectedOutput: `(i) -> {
            recurse = (recurse, x) -> {
              ifThenElse(
                lessThanInteger(0, x),
                () -> {
                  recurse(recurse, subtractInteger(x, 1))
                },
                () -> {
                  x
                }
              )()
            };
            recurse(recurse, addInteger(i, i))
        }`
    },
    {
        description: "doesn't inline variable that is used twice",
        input: `
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
        }`,
        expectedOutput: `(i) -> {
            id = addInteger(i, i);
            recurse = (recurse, x) -> {
                ifThenElse(
                    lessThanInteger(0, x),
                    () -> {
                        recurse(recurse, subtractInteger(x, 1))
                    },
                    () -> {
                        id
                    }
                )()
            };
            recurse(recurse, i)
        }`
    },
    {
        description: "inlines empty list",
        input: `(__helios__common__list_0) -> {
            (arg0, arg1) -> {
              (b) -> {
                constrData(ifThenElse(
                  b,
                  1,
                  0
                ), __helios__common__list_0)
              }(equalsInteger(unIData(arg0), unIData(arg1)))
            }
          }(mkNilData(()))`,
        expectedOutput: `(arg0, arg1) -> {
            b = equalsInteger(unIData(arg0), unIData(arg1));
            constrData(ifThenElse(
                b,
                1,
                0
            ), [])
        }`
    },
    {
        description:
            "doesn't eliminate unused result of unIData because it expects error",
        input: `(arg0) -> {
            iData((a) -> {
              0
            }(unIData(arg0)))
          }`,
        expectedOutput: `(arg0) -> {
            iData(
                a = unIData(arg0);
                0
            )
        }`
    },
    {
        description: "factorizes simple common subexpression",
        input: `(a, b) -> {
            addInteger(addInteger(a, b), addInteger(a, b))
        }`,
        expectedOutput: `(a, b) -> {
            x0 = addInteger(a, b);
            addInteger(x0, x0)
        }`
    },
    {
        description: "factorizes simple error-throwing common subexpression",
        input: `(a, b) -> {
            addInteger(divideInteger(a, b), divideInteger(a, b))
        }`,
        expectedOutput: `(a, b) -> {
            x0 = divideInteger(a, b);
            addInteger(x0, x0)
        }`
    },
    {
        description: "factorizes two nested common subexpressions",
        input: `(a, b) -> {
            addInteger(addInteger(addInteger(a, b), addInteger(a, b)), addInteger(addInteger(a, b), addInteger(a, b)))
        }`,
        expectedOutput: `(a, b) -> {
            x0 = addInteger(a, b);
            x1 = addInteger(x0, x0);
            addInteger(x1, x1)
        }`
    },
    {
        description: "eliminates ifThenElse if branches are the same",
        input: `(a, b, c) -> {
            ifThenElse(
                a, 
                () -> {
                    addInteger(b, c)
                }, 
                () -> {
                    addInteger(b, c)
                }
            )()
        }`,
        expectedOutput: `(a, b, c) -> {
            addInteger(b, c)
        }`
    },
    {
        description:
            "doesn't factorize a common subexpression in different branches",
        input: `(a, b, c) -> {
            ifThenElse(
                a,
                () -> {
                    addInteger(b, c)
                },
                () -> {
                    addInteger(addInteger(b, c), 1)
                }
            )()
        }`,
        expectedOutput: `(a, b, c) -> {
            ifThenElse(
                a,
                () -> {
                    addInteger(b, c)
                },
                () -> {
                    addInteger(addInteger(b, c), 1)
                }
            )()
        }`
    },
    {
        description: "factorizes a common subexpression in the same branch",
        input: `(a, b, c) -> {
            ifThenElse(
                a,
                () -> {
                    addInteger(addInteger(b, c), addInteger(b, c))
                },
                () -> {
                    addInteger(b, c)
                }
            )()
        }`,
        expectedOutput: `(a, b, c) -> {
            ifThenElse(
                a,
                () -> {
                    x0 = addInteger(b, c);
                    addInteger(x0, x0)
                },
                () -> {
                    addInteger(b, c)
                }
            )()
        }`
    },
    {
        description:
            "factorizes a common subexpression in the same branch within a callback",
        input: `(a) -> {
            ifThenElse(
                a,
                () -> {
                    (b, c) -> {
                        addInteger(addInteger(b, c), addInteger(b, c))
                    }
                },
                () -> {
                    (b, c) -> {
                        addInteger(b, c)
                    }
                }
            )()
        }`,
        expectedOutput: `(a) -> {
            ifThenElse(
                a,
                () -> {
                    (b, c) -> {
                        x0 = addInteger(b, c);
                        addInteger(x0, x0)
                    }
                },
                () -> {
                    addInteger
                }
            )()
        }`
    },
    {
        description:
            "factorizes nested common subexpressions in the same branch",
        input: `(a) -> {
            ifThenElse(
                a,
                () -> {
                    (b, c) -> {
                        addInteger(
                            addInteger(
                                addInteger(b, c), addInteger(b, c)
                            ), 
                            addInteger(
                                addInteger(b, c), addInteger(b, c)
                            )
                        )
                    }
                },
                () -> {
                    (b, c) -> {
                        addInteger(b, c)
                    }
                }
            )()
        }`,
        expectedOutput: `(a) -> {
            ifThenElse(
                a,
                () -> {
                    (b, c) -> {
                        x0 = addInteger(b, c);
                        x1 = addInteger(x0, x0);
                        addInteger(x1, x1)
                    }
                },
                () -> {
                    addInteger
                }
            )()
        }`
    },
    {
        description:
            "factorizes triple nested common subexpressions in the same branch",
        input: `(a) -> {
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
        }`,
        expectedOutput: `(a) -> {
            ifThenElse(
                a,
                () -> {
                    (b, c) -> {
                        x0 = headList(b);
                        x1 = addInteger(x0, c);
                        x2 = addInteger(x1, x1);
                        addInteger(x2, x2)
                    }
                },
                () -> {
                    error()
                }
            )()
        }`
    },
    {
        description: "real script 1",
        input: `(__helios__common__list_0) -> {
            (__helios__bool____to_data) -> {
            (__helios__int__from_data) -> {
            (__helios__int____eq) -> {
            (__helios__error) -> {
            (__helios__int__decode_zigzag) -> {
            (__helios__int__encode_zigzag) -> {
            (__module__int_encode_decode_zigzag__main) -> {
              (arg0) -> {
                __helios__bool____to_data(__module__int_encode_decode_zigzag__main(__helios__int__from_data(arg0)))
              }
            }((a) -> {
              __helios__int____eq(__helios__int__decode_zigzag(__helios__int__encode_zigzag(a)())(), a)
            })
            }((self) -> {
              () -> {
                ifThenElse(
                  lessThanInteger(self, 0),
                  () -> {
                    subtractInteger(multiplyInteger(self, -2), 1)
                  },
                  () -> {
                    multiplyInteger(self, 2)
                  }
                )()
              }
            })
            }((self) -> {
              () -> {
                ifThenElse(
                  lessThanInteger(self, 0),
                  () -> {
                    __helios__error("expected positive int")
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
            })
            }((msg) -> {
              trace(msg, () -> {
                error()
              })()
            })
            }(equalsInteger)
            }(unIData)
            }((b) -> {
              constrData(ifThenElse(
                b,
                1,
                0
              ), __helios__common__list_0)
            })
            }(mkNilData(()))
          `,
        expectedOutput: `(arg0) -> {
            b = a = unIData(arg0);
            equalsInteger(
                self = ifThenElse(
                    lessThanInteger(a, 0),
                    () -> {
                        subtractInteger(multiplyInteger(a, -2), 1)
                    },
                    () -> {
                        multiplyInteger(a, 2)
                    }
                )();
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
                )(), 
                a
            );
            constrData(
                ifThenElse(
                    b,
                    1,
                    0
                ), 
                []
            )
        }`
    },
    {
        description: "real script 2",
        input: `(__helios__int____to_data) -> {
            (__helios__int__from_data) -> {
            (__helios__int__min) -> {
            (__helios__int__bound_max) -> {
            (__module__int_bound_max__main) -> {
              (arg0, arg1) -> {
                __helios__int____to_data(__module__int_bound_max__main(__helios__int__from_data(arg0), __helios__int__from_data(arg1)))
              }
            }((a, b) -> {
              __helios__int__bound_max(a)(b)
            })
            }((self) -> {
              (other) -> {
                __helios__int__min(self, other)
              }
            })
            }((a, b) -> {
              ifThenElse(
                lessThanInteger(a, b),
                a,
                b
              )
            })
            }(unIData)
            }(iData)
        `,
        expectedOutput: `(arg0, arg1) -> {
            iData((a, b) -> {
              ifThenElse(
                lessThanInteger(a, b),
                a,
                b
              )
            }(unIData(arg0), unIData(arg1)))
        }`
    },
    {
        description:
            "optimizer correctly evaluates Int.to_hex() recursive function",
        input: `() -> {
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
            __helios__int__to_hex(-1)()
        }`,
        expectedOutput: `() -> {
            "-1"
        }`
    }
]

describe(optimize.name, () => {
    testVector.forEach((entry) => {
        it(entry.description, () => {
            const expr = parse(entry.input)

            const optExpr = optimize(expr, {
                commonSubExpressionPrefix: "x"
            })

            strictEqual(
                removeWhitespace(format(optExpr)),
                removeWhitespace(entry.expectedOutput)
            )
        })
    })
})
