import { describe, it } from "node:test"
import { DEFAULT_PARSE_OPTIONS, parse } from "../parse/index.js"
import { Evaluator, generateFuncTagsAndVariableIds } from "./Evaluator.js"

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

describe(`benchmark`, () => {
    const src = `(__REDEEMER, __CONTEXT) -> {
        (__helios__error) -> {
    (__helios__bool__and) -> {
    (__helios__bool____not) -> {
    (__helios__value__is_zero_inner) -> {
    (__helios__value__is_zero) -> {
    (__helios__value__get_inner_map_int) -> {
    (__helios__common__list_0) -> {
    (__helios__value__get_map_keys) -> {
    (__helios__common__any) -> {
    (__helios__common__is_in_bytearray_list) -> {
    (__helios__common__concat) -> {
    (__helios__value__merge_map_keys) -> {
    (__helios__value__compare_inner) -> {
    (__helios__value__get_inner_map) -> {
    (__helios__value__compare) -> {
    (__helios__value____gt) -> {
    (__helios__common__enum_fields) -> {
    (__helios__common__enum_fields_after_0) -> {
    (__helios__common__enum_fields_after_1) -> {
    (__helios__common__enum_fields_after_2) -> {
    (__helios__common__enum_field_3) -> {
    (__helios__tx__fee) -> {
    (__helios__common__enum_field_0) -> {
    (__helios__scriptcontext__data) -> {
    (__helios__scriptcontext__tx) -> {
    (__helios__value__ZERO) -> {
    (__module__always_succeeds__main) -> {
            __core__ifThenElse(
                __module__always_succeeds__main(0),
                () -> {()},
                () -> {__helios__error("validation returned false")}
            )()
    }(
        /*__module__always_succeeds__main*/
        (_) -> {
        __helios__value____gt(__helios__tx__fee(__helios__scriptcontext__tx), __helios__value__ZERO)
    }
    )
    }(
        /*__helios__value__ZERO*/
        __core__mkNilPairData(())
    )
    }(
        /*__helios__scriptcontext__tx*/
        __helios__common__enum_field_0(__helios__scriptcontext__data)
    )
    }(
        /*__helios__scriptcontext__data*/
        __CONTEXT
    )
    }(
        /*__helios__common__enum_field_0*/
        (self) -> {
            __core__headList(__helios__common__enum_fields(self))
        }
    )
    }(
        /*__helios__tx__fee*/
        (self) -> {
            __core__unMapData(__helios__common__enum_field_3(self))
        }
    )
    }(
        /*__helios__common__enum_field_3*/
        (self) -> {
            __core__headList(__helios__common__enum_fields_after_2(self))
        }
    )
    }(
        /*__helios__common__enum_fields_after_2*/
        (self) -> {
            __core__tailList(__helios__common__enum_fields_after_1(self))
        }
    )
    }(
        /*__helios__common__enum_fields_after_1*/
        (self) -> {
            __core__tailList(__helios__common__enum_fields_after_0(self))
        }
    )
    }(
        /*__helios__common__enum_fields_after_0*/
        (self) -> {
            __core__tailList(__helios__common__enum_fields(self))
        }
    )
    }(
        /*__helios__common__enum_fields*/
        (self) -> {
            __core__sndPair(__core__unConstrData(self))
        }
    )
    }(
        /*__helios__value____gt*/
        (a, b) -> {
            __helios__bool__and(
                () -> {
                    __helios__bool____not(
                        __helios__bool__and(
                            __helios__value__is_zero(a),
                            __helios__value__is_zero(b)
                        )
                    )
                },
                () -> {
                    __helios__value__compare(
                        a, 
                        b,
                        (a_qty, b_qty) -> {
                            __helios__bool____not(__core__lessThanEqualsInteger(a_qty, b_qty))
                        }
                    )
                }
            )
        }
    )
    }(
        /*__helios__value__compare*/
        (a, b, comp) -> {
            recurse = (recurse, keys) -> {
                __core__chooseList(
                    keys, 
                    () -> {true}, 
                    () -> {
                        key = __core__headList__safe(keys);
                        __core__ifThenElse(
                            __helios__bool____not(
                                __helios__value__compare_inner(
                                    comp, 
                                    __helios__value__get_inner_map(a, key), 
                                    __helios__value__get_inner_map(b, key)
                                )
                            ), 
                            () -> {false}, 
                            () -> {recurse(recurse, __core__tailList__safe(keys))}
                        )()
                    }
                )()
            };
            recurse(recurse, __helios__value__merge_map_keys(a, b))
        }
    )
    }(
        /*__helios__value__get_inner_map*/
        (map, mph) -> {
            recurse = (recurse, map) -> {
                __core__chooseList(
                    map, 
                    () -> {__core__mkNilPairData(())},
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(__core__fstPair(__core__headList__safe(map)), mph), 
                            () -> {__core__unMapData(__core__sndPair(__core__headList__safe(map)))},
                            () -> {recurse(recurse, __core__tailList__safe(map))}
                        )()
                    }
                )()
            };
            recurse(recurse, map)
        }
    )
    }(
        /*__helios__value__compare_inner*/
        (comp, a, b) -> {
            recurse = (recurse, keys) -> {
                __core__chooseList(
                    keys, 
                    () -> {true}, 
                    () -> {
                        key = __core__headList__safe(keys);
                        __core__ifThenElse(
                            __helios__bool____not(
                                comp(
                                    __helios__value__get_inner_map_int(a, key), 
                                    __helios__value__get_inner_map_int(b, key)
                                )
                            ), 
                            () -> {false}, 
                            () -> {recurse(recurse, __core__tailList__safe(keys))}
                        )()
                    }
                )()
            };
            recurse(recurse, __helios__value__merge_map_keys(a, b))
        }
    )
    }(
        /*__helios__value__merge_map_keys*/
        (a, b) -> {
            aKeys = __helios__value__get_map_keys(a);
            recurse = (recurse, keys, map) -> {
                __core__chooseList(
                    map, 
                    () -> {__helios__common__list_0}, 
                    () -> {
                        key = __core__fstPair(__core__headList__safe(map));
                        __core__ifThenElse(
                            __helios__common__is_in_bytearray_list(aKeys, key), 
                            () -> {recurse(recurse, keys, __core__tailList__safe(map))},
                            () -> {__core__mkCons(key, recurse(recurse, keys, __core__tailList__safe(map)))}
                        )()
                    }
                )()
            };
            uniqueBKeys = recurse(recurse, aKeys, b);
            __helios__common__concat(aKeys, uniqueBKeys)    
        }
    )
    }(
        /*__helios__common__concat*/
        (a, b) -> {
            (recurse) -> {
                recurse(recurse, b, a)
            }(
                (recurse, lst, rem) -> {
                    __core__chooseList(
                        rem,
                        () -> {lst},
                        () -> {__core__mkCons(__core__headList__safe(rem), recurse(recurse, lst, __core__tailList__safe(rem)))}
                    )()
                }
            )
        }
    )
    }(
        /*__helios__common__is_in_bytearray_list*/
        (lst, key) -> {
            __helios__common__any(lst, (item) -> {__core__equalsData(item, key)})
        }
    )
    }(
        /*__helios__common__any*/
        (self, fn) -> {
            (recurse) -> {
                recurse(recurse, self, fn)
            }(
                (recurse, self, fn) -> {
                    __core__chooseList(
                        self, 
                        () -> {false}, 
                        () -> {
                            __core__ifThenElse(
                                fn(__core__headList__safe(self)),
                                () -> {true}, 
                                () -> {recurse(recurse, __core__tailList__safe(self), fn)}
                            )()
                        }
                    )()
                }
            )
        }
    )
    }(
        /*__helios__value__get_map_keys*/
        (map) -> {
            recurse = (recurse, map) -> {
                __core__chooseList(
                    map, 
                    () -> {__helios__common__list_0}, 
                    () -> {__core__mkCons(__core__fstPair(__core__headList__safe(map)), recurse(recurse, __core__tailList__safe(map)))}
                )()
            };
            recurse(recurse, map)
        }
    )
    }(
        /*__helios__common__list_0*/
        __core__mkNilData(())
    )
    }(
        /*__helios__value__get_inner_map_int*/
        (map, key) -> {
            recurse = (recurse, map, key) -> {
                __core__chooseList(
                    map, 
                    () -> {0}, 
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(__core__fstPair(__core__headList__safe(map)), key), 
                            () -> {__core__unIData(__core__sndPair(__core__headList__safe(map)))}, 
                            () -> {recurse(recurse, __core__tailList__safe(map), key)}
                        )()
                    }
                )()
            };
            recurse(recurse, map, key)
        }
    )
    }(
        /*__helios__value__is_zero*/
        (self) -> {
            () -> {
                recurse = (recurse, map) -> {
                    __core__chooseList(
                        map,
                        () -> {
                            true
                        },
                        () -> {
                            __helios__bool__and(
                                () -> {
                                    __helios__value__is_zero_inner(__core__unMapData(__core__sndPair(__core__headList__safe(map))))
                                },
                                () -> {
                                    recurse(recurse, __core__tailList__safe(map))
                                }
                            )
                        }
                    )()
                };
                recurse(recurse, self)
            }
        }
    )
    }(
        /*__helios__value__is_zero_inner*/
        (tokens) -> {
            recurse = (recurse, tokens) -> {
                __core__chooseList(
                    tokens,
                    () -> {
                        true
                    },
                    () -> {
                        __helios__bool__and(
                            () -> {
                                __core__equalsInteger(__core__unIData(__core__sndPair(__core__headList__safe(tokens))), 0)
                            },
                            () -> {
                                recurse(recurse, __core__tailList__safe(tokens))
                            }
                        )
                    }
                )()
            };
            recurse(recurse, tokens)
        }
    )
    }(
        /*__helios__bool____not*/
        (b) -> {
            __core__ifThenElse(b, false, true)
        }
    )
    }(
        /*__helios__bool__and*/
        (a, b) -> {
            __core__ifThenElse(
                a(), 
                () -> {b()}, 
                () -> {false}
            )()
        }
    )
    }(
        /*__helios__error*/
        (msg) -> {
            __core__trace(
                msg, 
                () -> {
                    error()
                }
            )()
        }
    )
    }`

    const expr = parse(src, {
        ...DEFAULT_PARSE_OPTIONS,
        errorPrefix: "",
        builtinsPrefix: "__core__"
    })

    const [funcExprs, variables] = generateFuncTagsAndVariableIds(expr)

    const evaluator = new Evaluator({
        funcExprs,
        variables
    })

    let tick = Date.now()
    evaluator.eval(expr)

    console.log(`Evaluator benchmark completed in ${Date.now() - tick}ms`)
})
