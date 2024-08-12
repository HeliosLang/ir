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
        description: "optimizes simple literal sum",
        input: `() -> {
            addInteger(1, 1)
        }`,
        expectedOutput: `() -> {
            2
        }`
    },
    {
        description: "unused Error branch is eliminated",
        input: `ifThenElse(false, () -> {error()}, () -> {0})()`,
        expectedOutput: "0"
    },
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
        description: "doesn't optimize param",
        input: `() -> {
            addInteger(param("literal", 1), 1)
        }`,
        expectedOutput: `() -> {
            addInteger(param("literal", 1), 1)
        }`
    },
    {
        description: "optimizes expression nested in param",
        input: `() -> {
            addInteger(param("literal", 1), addInteger(1, 1))
        }`,
        expectedOutput: `() -> {
            addInteger(param("literal", 1), 2)
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
        description:
            "don't eliminate arg that is only used in builtin func value call when calling a branched value",
        input: `(arg0) -> {
            iData(ifThenElse(
                chooseData(arg0, () -> {
                    false
                }, () -> {
                    false
                }, () -> {
                    false
                }, () -> {
                    true
                }, () -> {
                    false
                })(),
                () -> {
                    unIData
                },
                () -> {
                    (_) -> {
                        error()
                    }
                }
            )()(arg0))
        }`,
        expectedOutput: `(arg0) -> {
            iData(ifThenElse(
                chooseData(arg0, () -> {
                    false
                }, () -> {
                    false
                }, () -> {
                    false
                }, () -> {
                    true
                }, () -> {
                    false
                })(),
                () -> {
                    unIData
                },
                () -> {
                    (_) -> {
                        error()
                    }
                }
            )()(arg0))
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
            (b) ->{
                constrData(
                    ifThenElse(
                        b,
                        1,
                        0
                    ), 
                    []
                )
            }(
                a = unIData(arg0);
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
                )
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
    },
    {
        description: "optimizer correctly inlines a recursive function",
        input: `(a) -> {
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
        }`,
        expectedOutput: `(self) -> {
            recurse = (recurse, self, bytes) -> {
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
                        recurse(recurse,divideInteger(self, 16), bytes)
                    }
                )()
            };
            decodeUtf8__safe(
                ifThenElse(
                    lessThanInteger(self, 0),
                    () -> {
                        consByteString(
                            45,
                            recurse(recurse,multiplyInteger(self, -1), #)
                        )
                    },
                    () -> {
                        recurse(recurse,self, #)
                    }
                )()
            )
        }`
    },
    {
        description: "real script 3",
        input: `(__helios__string____to_data) -> {
            (__helios__int__show_digit) -> {
            (__helios__int__show) -> {
            (__helios__int__from_data) -> {
            (__helios__common__enum_fields) -> {
            (__helios__common__enum_field_0) -> {
            (__helios__common__enum_tag_equals) -> {
            (__helios__common__identity) -> {
            (__module__match_string__Datum[]__from_data) -> {
            (__module__match_string__Datum[]__One____is) -> {
            (__module__match_string__Datum[]__Two__code) -> {
            (__module__match_string__main) -> {
                (arg0) -> {
                    __helios__string____to_data(__module__match_string__main(__module__match_string__Datum[]__from_data(arg0)))
                }
            }(
                (datum) -> {
                    (e0) -> {
                        (
                            ifThenElse(
                                __module__match_string__Datum[]__One____is(e0),
                                () -> {
                                    (__lhs_0) -> {
                                        ""
                                    }
                                }, 
                                () -> {
                                    (d) -> {
                                        __helios__int__show(__module__match_string__Datum[]__Two__code(d))()
                                    }
                                }
                            )()
                        )(e0)
                    }(datum)
                }
            )
            }(
                (self) -> {
                    __helios__int__from_data(__helios__common__enum_field_0(self))
                }
            )
            }(
                (data) -> {
                            __helios__common__enum_tag_equals(data, 0)
                        }
            )
            }(
                __helios__common__identity
            )
            }(
                (self) -> {self}
            )
            }(
                (data, i) -> {
                        equalsInteger(fstPair(unConstrData(data)), i)
                    }
            )
            }(
                (self) -> {
                    headList(__helios__common__enum_fields(self))
                }
            )
            }(
                (self) -> {
                    sndPair(unConstrData(self))
                }
            )
            }(
                unIData
            )
            }(
                (self) -> {
                    () -> {
                        decodeUtf8__safe(
                            recurse = (recurse, i, bytes) -> {
                                (bytes) -> {
                                    ifThenElse(
                                        lessThanInteger(i, 10),
                                        () -> {
                                            bytes
                                        },
                                        () -> {
                                            recurse(recurse, divideInteger(i, 10), bytes)
                                        }
                                    )()
                                }(consByteString(__helios__int__show_digit(i), bytes))
                            };
                            ifThenElse(
                                lessThanInteger(self, 0),
                                () -> {consByteString(45, recurse(recurse, multiplyInteger(self, -1), #))},
                                () -> {recurse(recurse, self, #)}
                            )()
                        )
                    }
                }
            )
            }(
                (x) -> {
                    addInteger(modInteger(x, 10), 48)
                }
            )
            }(
                (s) -> {
                    bData(encodeUtf8(s))
                }
            )`,
        expectedOutput: `(arg0) -> {
            s = ifThenElse(
                equalsInteger(fstPair(unConstrData(arg0)), 0),
                () -> {
                    (__lhs_0) -> {
                        ""
                    }
                },
                () -> {
                    (d) -> {
                        self = unIData(headList(sndPair(unConstrData(d))));
                        decodeUtf8__safe(
                            recurse = (recurse, i, bytes) -> {
                                bytes = consByteString(addInteger(modInteger(i, 10), 48), bytes);
                                ifThenElse(
                                    lessThanInteger(i, 10),
                                    () -> {
                                        bytes
                                    },
                                    () -> {
                                        recurse(recurse, divideInteger(i, 10), bytes)
                                    }
                                )()
                            };
                            ifThenElse(
                                lessThanInteger(self, 0),
                                () -> {
                                    consByteString(45, recurse(recurse, multiplyInteger(self, -1), #))
                                },
                                () -> {
                                    recurse(recurse, self, #)
                                }
                            )()
                        )
                    }
                }
            )()(arg0);
            bData(encodeUtf8(s))
        }`
    },
    {
        description: "real script 4",
        input: `
        (arg0) -> {
            (b) -> {
                constrData(
                    ifThenElse(b, 1, 0), 
                    mkNilData(())
                )
            }(
                vh = unBData(arg0);
                (addr) -> {
                    (a, b) -> {
                        ifThenElse(
                            a(),
                            b,
                            () -> {
                                false
                            }
                        )()
                    }(
                        () -> {
                            (b) -> {
                                ifThenElse(
                                    b,
                                    false,
                                    true
                                )
                            }(
                                equalsInteger(
                                    fstPair(
                                        unConstrData(
                                            headList(
                                                tailList(
                                                    sndPair(
                                                        unConstrData(addr)
                                                    )
                                                )
                                            )
                                        )
                                    ), 0
                                )
                            )
                        }, 
                        () -> {
                            (e0) -> {
                                ifThenElse(
                                    equalsInteger(fstPair(unConstrData(e0)), 1),
                                    () -> {
                                        (__lhs_0) -> {
                                            (v) -> {
                                                equalsByteString(v, vh)
                                            }(
                                                unBData(
                                                    headList(
                                                        sndPair(
                                                            unConstrData(__lhs_0)
                                                        )
                                                    )
                                                )
                                            )
                                        }
                                    },
                                    () -> {
                                        (_) -> {
                                            error()
                                        }
                                    }
                                )()(e0)
                            }(
                                headList(
                                    sndPair(
                                        unConstrData(addr)
                                    )
                                )
                            )
                        }
                    )
                }(
                    (cred) -> {
                        constrData(
                            0, 
                            mkCons(
                                cred, 
                                constrData(1, mkNilData(()))
                            )
                        )
                    }(
                        constrData(
                            1,
                            mkCons(bData(vh), mkNilData(()))
                        )
                    )
                )
            )
        }
        `,
        expectedOutput: `(arg0)->{
            (b)->{
                constrData(
                    ifThenElse(b,1,0),[])
                }(
                    vh=unBData(arg0);
                    x0=unConstrData(
                        constrData(
                            0,
                            mkCons(
                                constrData(
                                    1,
                                    mkCons(
                                        bData(vh),
                                        []
                                    )
                                ),
                                (
                                    Constr1[]
                                )
                            )
                        )
                    );
                    x1=sndPair(x0);
                    ifThenElse(
                        b=equalsInteger(
                            fstPair(
                                unConstrData(
                                    headList(
                                        tailList(
                                            x1
                                        )
                                    )
                                )
                            ),
                            0
                        );
                        ifThenElse(
                            b,
                            false,
                            true
                        ),
                        ()->{
                            e0=headList(x1);
                            ifThenElse(
                                equalsInteger(
                                    fstPair(unConstrData(e0)),
                                    1
                                ),
                                ()->{
                                    (__lhs_0)->{
                                        v=unBData(
                                            headList(
                                                sndPair(
                                                    unConstrData(__lhs_0)
                                                )
                                            )
                                        );
                                        equalsByteString(v,vh)
                                    }
                                },
                                ()->{
                                    (_)->{
                                        error()
                                    }
                                }
                            )()(e0)
                        },
                        ()->{
                            false
                        }
                    )()
                )
            }`
    },
    {
        description: "real script 5",
        input: `
        (arg0) -> {
            (b) -> {
                constrData(
                    ifThenElse(b, 1, 0), 
                    mkNilData(())
                )
            }(
                vh = unBData(arg0);
                (addr) -> {
                    (a, b) -> {
                        ifThenElse(
                            a(),
                            b,
                            () -> {
                                false
                            }
                        )()
                    }(
                        () -> {
                            (b) -> {
                                ifThenElse(b, false, true)
                            }(
                                self = addr;
                                equalsInteger(
                                    fstPair(
                                        unConstrData(
                                            self = self;
                                            headList(
                                                self = self;
                                                tailList(
                                                    self = self;
                                                    sndPair(
                                                        unConstrData(self)
                                                    )
                                                )
                                            )
                                        )
                                    ), 
                                    0
                                )
                            )
                        }, 
                        () -> {
                            (e0) -> {
                                ifThenElse(
                                    data = e0;
                                    data = data;
                                    equalsInteger(fstPair(unConstrData(data)), 1),
                                    () -> {
                                        (__lhs_0) -> {
                                            (v) -> {
                                                equalsByteString(v, vh)
                                            }(
                                                self = __lhs_0;
                                                unBData(
                                                    self = self;
                                                    headList(
                                                        self = self;
                                                        sndPair(unConstrData(e0))
                                                    )
                                                )
                                            )
                                        }
                                    },
                                    () -> {
                                        (_) -> {
                                            error()
                                        }
                                    }
                                )()(e0)
                            }(
                                self = addr;
                                headList(
                                    self = self;
                                    sndPair(unConstrData(self))
                                )
                            )
                        }
                    )
                }(
                    vh = vh;
                    (cred) -> {
                        constrData(0, 
                            arg0 = cred;
                            mkCons(
                                arg0, constrData(1, mkNilData(()))
                            )
                        )
                    }(
                        hash = vh;
                        constrData(
                            1, 
                            a = bData(hash);
                            mkCons(a, mkNilData(()))
                        )
                    )
                )
            )
        }
        `,
        expectedOutput: `(arg0)->{
            (b)->{
                constrData(
                    ifThenElse(b,1,0),
                    []
                )
            }(
                vh=unBData(arg0);
                x0=unConstrData(
                    constrData(
                        0,
                        mkCons(
                            constrData(
                                1,
                                mkCons(
                                    bData(vh),
                                    []
                                )
                            ),
                            (Constr1[])
                        )
                    )
                );
                x1=sndPair(x0);
                ifThenElse(
                    b=equalsInteger(
                        fstPair(
                            unConstrData(
                                headList(
                                    tailList(x1)
                                )
                            )
                        ),
                        0
                    );
                    ifThenElse(b,false,true),
                    ()->{
                        e0=headList(x1);
                        x2=unConstrData(e0);
                        ifThenElse(
                            equalsInteger(
                                fstPair(x2),
                                1
                            ),
                            ()->{
                                (__lhs_0)->{
                                    v=unBData(
                                        headList(
                                            sndPair(x2)
                                        )
                                    );
                                    equalsByteString(v,vh)
                                }
                            },
                            ()->{
                                (_)->{
                                    error()
                                }
                            }
                        )()(e0)
                    },
                    ()->{
                        false
                    }
                )()
            )
        }`
    }
]

describe(optimize.name, () => {
    testVector.forEach((entry) => {
        it(entry.description, () => {
            const expr = parse(entry.input)

            const optExpr = optimize(expr, {
                commonSubExprPrefix: "x"
            })

            strictEqual(
                removeWhitespace(format(optExpr)),
                removeWhitespace(entry.expectedOutput)
            )
        })
    })
})
