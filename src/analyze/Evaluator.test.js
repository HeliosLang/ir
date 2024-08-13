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
        (_) -> {
        __helios__value____gt(__helios__tx__fee(__helios__scriptcontext__tx), __helios__value__ZERO)
    }
    )
    }(
        __core__mkNilPairData(())
    )
    }(
        __helios__common__enum_field_0(__helios__scriptcontext__data)
    )
    }(
        __CONTEXT
    )
    }(
        (self) -> {
            __core__headList(__helios__common__enum_fields(self))
        }
    )
    }(
        (self) -> {
            __core__unMapData(__helios__common__enum_field_3(self))
        }
    )
    }(
        (self) -> {
            __core__headList(__helios__common__enum_fields_after_2(self))
        }
    )
    }(
        (self) -> {
            __core__tailList(__helios__common__enum_fields_after_1(self))
        }
    )
    }(
        (self) -> {
            __core__tailList(__helios__common__enum_fields_after_0(self))
        }
    )
    }(
        (self) -> {
            __core__tailList(__helios__common__enum_fields(self))
        }
    )
    }(
        (self) -> {
            __core__sndPair(__core__unConstrData(self))
        }
    )
    }(
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
        (lst, key) -> {
            __helios__common__any(lst, (item) -> {__core__equalsData(item, key)})
        }
    )
    }(
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
        __core__mkNilData(())
    )
    }(
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
        (b) -> {
            __core__ifThenElse(b, false, true)
        }
    )
    }(
        (a, b) -> {
            __core__ifThenElse(
                a(), 
                () -> {b()}, 
                () -> {false}
            )()
        }
    )
    }(
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

describe("not too much memory usage when there are many stack interdependencies", () => {
    const src = `(__helios__common__list_0) -> {
        (__helios__bool____to_data) -> {
        (__helios__int__from_data) -> {
        (__helios__common____eq) -> {
        (__helios__assetclass____eq) -> {
        (__helios__common__list_1) -> {
        (__helios__common__list_2) -> {
        (__helios__common__list_3) -> {
        (__helios__common__list_4) -> {
        (__helios__option__NONE) -> {
        (__helios__txoutput__new) -> {
        (__helios__txoutputdatum__new_none) -> {
        (__helios__value__get_inner_map_int) -> {
        (__helios__value__get_map_keys) -> {
        (__helios__common__any) -> {
        (__helios__common__is_in_bytearray_list) -> {
        (__helios__common__concat) -> {
        (__helios__value__merge_map_keys) -> {
        (__helios__value__add_or_subtract_inner) -> {
        (__helios__value__get_inner_map) -> {
        (__helios__value__add_or_subtract) -> {
        (__helios__value____add) -> {
        (__helios__value__ZERO) -> {
        (__helios__common__enum_fields) -> {
        (__helios__common__enum_field_0) -> {
        (__helios__common__enum_fields_after_0) -> {
        (__helios__common__enum_field_1) -> {
        (__helios__int____to_data) -> {
        (__helios__value__new) -> {
        (__helios__bytearray____to_data) -> {
        (__helios__mintingpolicyhash____to_data) -> {
        (__helios__assetclass__new) -> {
        (__helios__assetclass__ADA) -> {
        (__helios__value__lovelace) -> {
        (__helios__common__identity) -> {
        (__helios__mintingpolicyhash__new) -> {
        (__helios__address__new) -> {
        (__helios__pubkeyhash____to_data) -> {
        (__helios__spendingcredential__new_pubkey) -> {
        (__helios__pubkeyhash__new) -> {
        (__helios__error) -> {
        (__helios__value__get_singleton_asset_class) -> {
        (__helios__txoutput__value) -> {
        (__module__valuable_singleton_script__get_singleton_wrapper[__helios__txoutput]) -> {
        (__helios__option[__helios__stakingcredential]__none____new) -> {
        (__module__valuable_singleton_script__main) -> {
            (arg0) -> {
                __helios__bool____to_data(__module__valuable_singleton_script__main(__helios__int__from_data(arg0)))
            }
        }(
            (lovelace) -> {
            (pub_key_hash_bytes) -> {
                (address) -> {
                    (asset_class) -> {
                        (value) -> {
                            (output) -> {
                                __helios__assetclass____eq(__module__valuable_singleton_script__get_singleton_wrapper[__helios__txoutput](output), asset_class)
                            }(__helios__txoutput__new(address, value, __helios__txoutputdatum__new_none()))
                        }(__helios__value____add(__helios__value__lovelace(lovelace), __helios__value__new(asset_class, 1)))
                    }(__helios__assetclass__new(__helios__mintingpolicyhash__new(#abcd), #abcd))
                }(__helios__address__new(__helios__spendingcredential__new_pubkey(__helios__pubkeyhash__new(pub_key_hash_bytes)), __helios__option[__helios__stakingcredential]__none____new()))
            }(#01234567890123456789012345678901234567890123456789012345)
        }
        )
        }(
            () -> {
                __helios__option__NONE
            }
        )
        }(
            (v) -> {
            __helios__value__get_singleton_asset_class(__helios__txoutput__value(v))()
        }
        )
        }(
            (self) -> {
                __core__unMapData(__helios__common__enum_field_1(self))
            }
        )
        }(
            (self) -> {
                    () -> {
                        recurse = (recurse, map, found, asset_class) -> {
                            __core__chooseList(
                                map,
                                () -> {
                                    __core__ifThenElse(
                                        found,
                                        () -> {
                                            asset_class
                                        },
                                        () -> {
                                            __helios__error("doesn't contain a singleton asset class")
                                        }
                                    )()
                                },
                                () -> {
                                    head = __core__headList(map);
                                    tail = __core__tailList(map);
                                    mph = __core__unBData(__core__fstPair(head));
                                    __core__ifThenElse(
                                        // ignore ada
                                        __core__equalsByteString(mph, #),
                                        () -> {
                                            recurse(recurse, tail, found, asset_class)
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                found,
                                                () -> {
                                                    __helios__error("not singleton, contains multiple assetclasses")
                                                },
                                                () -> {
                                                    // parse asset class entry
                                                    tokens = __core__unMapData(__core__sndPair(head));
                    
                                                    // assert no other tokens
                                                    __core__chooseList(
                                                        __core__tailList(tokens),
                                                        () -> {
                                                            first = __core__headList(tokens);
                                                            qty = __core__unIData(__core__sndPair(first));
                                                            // assert qty is 1
                                                            __core__ifThenElse(
                                                                __core__equalsInteger(qty, 1),
                                                                () -> {
                                                                    name = __core__unBData(__core__fstPair(first));
                                                                    recurse(recurse, tail, true, __helios__assetclass__new(mph, name))
                                                                },
                                                                () -> {
                                                                    __helios__error("not singleton, qty is not 1")
                                                                }
                                                            )()
                                                        },
                                                        () -> {
                                                            __helios__error("not singleton, has other token names")
                                                        }
                                                    )()
                                                }
                                            )()
                                        }
                                    )()
                                }
                            )()
                        };
                        recurse(recurse, self, false, ())
                    }
                }
        )
        }(
            (msg) -> {
                __core__trace(
                    msg, 
                    () -> {
                        error()
                    }
                )()
            }
        )
        }(
            __helios__common__identity
        )
        }(
            (hash) -> {
                __core__constrData(0, __helios__common__list_1(__helios__pubkeyhash____to_data(hash)))
            }
        )
        }(
            __helios__bytearray____to_data
        )
        }(
            (cred, staking_cred) -> {
                __core__constrData(0, __helios__common__list_2(cred, staking_cred))
            }
        )
        }(
            __helios__common__identity
        )
        }(
            (self) -> {self}
        )
        }(
            (i) -> {
                __helios__value__new(__helios__assetclass__ADA, i)
            }
        )
        }(
            __helios__assetclass__new(#, #)
        )
        }(
            (mph, token_name) -> {
                __core__constrData(0, __helios__common__list_2(
                    __helios__mintingpolicyhash____to_data(mph), 
                    __helios__bytearray____to_data(token_name)
                ))
            }
        )
        }(
            __helios__bytearray____to_data
        )
        }(
            __core__bData
        )
        }(
            (assetClass, i) -> {
                __core__ifThenElse(
                    __core__equalsInteger(0, i),
                    () -> {
                        __helios__value__ZERO
                    },
                    () -> {
                        mph = __helios__common__enum_field_0(assetClass);
                        tokenName = __helios__common__enum_field_1(assetClass);
                        __core__mkCons(
                            __core__mkPairData(
                                mph, 
                                __core__mapData(
                                    __core__mkCons(
                                        __core__mkPairData(tokenName, __helios__int____to_data(i)), 
                                        __core__mkNilPairData(())
                                    )
                                )
                            ), 
                            __core__mkNilPairData(())
                        )
                    }
                )()
            }
        )
        }(
            __core__iData
        )
        }(
            (self) -> {
                __core__headList(__helios__common__enum_fields_after_0(self))
            }
        )
        }(
            (self) -> {
                __core__tailList(__helios__common__enum_fields(self))
            }
        )
        }(
            (self) -> {
                __core__headList(__helios__common__enum_fields(self))
            }
        )
        }(
            (self) -> {
                __core__sndPair(__core__unConstrData(self))
            }
        )
        }(
            __core__mkNilPairData(())
        )
        }(
            (a, b) -> {
                __helios__value__add_or_subtract(a, b, __core__addInteger)
            }
        )
        }(
            (a, b, op) -> {
                recurse = (recurse, keys, result) -> {
                    __core__chooseList(
                        keys, 
                        () -> {result}, 
                        () -> {
                            key = __core__headList__safe(keys);
                            tail = recurse(recurse, __core__tailList__safe(keys), result);
                            item = __helios__value__add_or_subtract_inner(op)(__helios__value__get_inner_map(a, key), __helios__value__get_inner_map(b, key));
                            __core__chooseList(
                                item, 
                                () -> {tail}, 
                                () -> {__core__mkCons(__core__mkPairData(key, __core__mapData(item)), tail)}
                            )()
                        }
                    )()
                };
                recurse(recurse, __helios__value__merge_map_keys(a, b), __core__mkNilPairData(()))
            }
        )
        }(
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
            (op) -> {
                (a, b) -> {
                    recurse = (recurse, keys, result) -> {
                        __core__chooseList(
                            keys, 
                            () -> {result}, 
                            () -> {
                                key = __core__headList__safe(keys);
                                tail = recurse(recurse, __core__tailList__safe(keys), result);
                                sum = op(__helios__value__get_inner_map_int(a, key), __helios__value__get_inner_map_int(b, key));
                                __core__ifThenElse(
                                    __core__equalsInteger(sum, 0), 
                                    () -> {tail}, 
                                    () -> {__core__mkCons(__core__mkPairData(key, __core__iData(sum)), tail)}
                                )()
                            }
                        )()
                    };
                    recurse(recurse, __helios__value__merge_map_keys(a, b), __core__mkNilPairData(()))
                }
            }
        )
        }(
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
            (lst, key) -> {
                __helios__common__any(lst, (item) -> {__core__equalsData(item, key)})
            }
        )
        }(
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
            () -> {
                __core__constrData(0, __helios__common__list_0)
            }
        )
        }(
            (address, value, datum) -> {
                __core__constrData(0, __helios__common__list_4(address, __core__mapData(value), datum, __helios__option__NONE))
            }
        )
        }(
            __core__constrData(1, __helios__common__list_0)
        )
        }(
            (arg0, arg1, arg2, arg3) -> {
                __core__mkCons(arg0, __helios__common__list_3(arg1, arg2, arg3))
            }
        )
        }(
            (arg0, arg1, arg2) -> {
                __core__mkCons(arg0, __helios__common__list_2(arg1, arg2))
            }
        )
        }(
            (arg0, arg1) -> {
                __core__mkCons(arg0, __helios__common__list_1(arg1))
            }
        )
        }(
            (a) -> {
                __core__mkCons(a, __helios__common__list_0)
            }
        )
        }(
            __helios__common____eq
        )
        }(
            __core__equalsData
        )
        }(
            __core__unIData
        )
        }(
            (b) -> {
                __core__constrData(__core__ifThenElse(b, 1, 0), __helios__common__list_0)
            }
        )
        }(
            __core__mkNilData(())
        )`

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

    evaluator.eval(expr)
})

describe("no infinite branch-recursion", () => {
	const src =`(__DATUM, __REDEEMER, __CONTEXT) -> {
    __helios__error = (msg) -> {
        trace(msg, () -> {
            error()
        })()
    };
    __helios__bool__and = (a, b) -> {
        ifThenElse(
            a(),
            () -> {
                b()
            },
            () -> {
                false
            }
        )()
    };
    __helios__bool____not = (b_1) -> {
        ifThenElse(
            b_1,
            false,
            true
        )
    };
    __helios__assert = (cond, msg_1) -> {
        ifThenElse(
            cond,
            () -> {
                ()
            },
            () -> {
                trace(msg_1, () -> {
                    error()
                })()
            }
        )()
    };
    __helios__int____eq = equalsInteger;
    __helios__int____neg = (self) -> {
        multiplyInteger(self, -1)
    };
    __helios__bool__and2 = (a_1, b_2) -> {
        ifThenElse(
            a_1,
            b_2,
            false
        )
    };
    __helios__common__assert_constr_index = (data, i) -> {
        ifThenElse(
            equalsInteger(fstPair(unConstrData(data)), i),
            () -> {
                data
            },
            () -> {
                __helios__error("unexpected constructor index")
            }
        )()
    };
    __helios__common__enum_fields = (self_1) -> {
        sndPair(unConstrData(self_1))
    };
    __helios__common__enum_fields_after_0 = (self_2) -> {
        tailList(__helios__common__enum_fields(self_2))
    };
    __helios__common__enum_fields_after_1 = (self_3) -> {
        tailList(__helios__common__enum_fields_after_0(self_3))
    };
    __helios__common__enum_field_2 = (self_4) -> {
        headList(__helios__common__enum_fields_after_1(self_4))
    };
    __helios__tx__outputs = (self_5) -> {
        unListData(__helios__common__enum_field_2(self_5))
    };
    __helios__common__enum_field_0 = (self_6) -> {
        headList(__helios__common__enum_fields(self_6))
    };
    __helios__scriptcontext__data = __CONTEXT;
    __helios__scriptcontext__tx = __helios__common__enum_field_0(__helios__scriptcontext__data);
    __helios__common____eq = equalsData;
    __helios__address____eq = __helios__common____eq;
    __helios__txoutput__address = __helios__common__enum_field_0;
    __helios__int____add = addInteger;
    __helios__txoutputdatum__inline = (self_7) -> {
        pair = unConstrData(self_7);
        index = fstPair(pair);
        fields = sndPair(pair);
        ifThenElse(
            equalsInteger(index, 2),
            () -> {
                headList(fields)
            },
            () -> {
                __helios__error("not an inline datum")
            }
        )()
    };
    __helios__txoutput__datum = __helios__common__enum_field_2;
    __helios__tx__inputs = (self_8) -> {
        unListData(__helios__common__enum_field_0(self_8))
    };
    __helios__common__enum_field_1 = (self_9) -> {
        headList(__helios__common__enum_fields_after_0(self_9))
    };
    __helios__txinput__output = __helios__common__enum_field_1;
    __helios__txinput__address = (self_10) -> {
        __helios__txoutput__address(__helios__txinput__output(self_10))
    };
    __helios__txinput__datum = (self_11) -> {
        __helios__txoutput__datum(__helios__txinput__output(self_11))
    };
    __helios__common__fold = (self_12, fn, z) -> {
        recurse_1 = (recurse, self_13, z_1) -> {
            chooseList(self_13, () -> {
                z_1
            }, () -> {
                recurse(recurse, tailList__safe(self_13), fn(z_1, headList__safe(self_13)))
            })()
        };
        recurse_1(recurse_1, self_12, z)
    };
    __helios__common__identity = (self_14) -> {
        self_14
    };
    __helios__txinput__from_data = __helios__common__identity;
    __helios__txoutput__from_data = __helios__common__identity;
    __helios__iterator__2__all = (self_15) -> {
        (fn_1) -> {
            recurse_3 = (recurse_2, iterator) -> {
                iterator((is_null, head0, head1, next_iterator) -> {
                    ifThenElse(
                        is_null,
                        () -> {
                            true
                        },
                        () -> {
                            ifThenElse(
                                fn_1(head0, head1),
                                () -> {
                                    recurse_2(recurse_2, next_iterator)
                                },
                                () -> {
                                    false
                                }
                            )()
                        }
                    )()
                })
            };
            recurse_3(recurse_3, self_15)
        }
    };
    __helios__assetclass____eq = __helios__common____eq;
    __helios__common____neq = (a_2, b_3) -> {
        __helios__bool____not(equalsData(a_2, b_3))
    };
    __helios__assetclass____neq = __helios__common____neq;
    __helios__common__filter = (self_16, fn_2, nil) -> {
        recurse_5 = (recurse_4, self_17, fn_3) -> {
            chooseList(self_17, () -> {
                nil
            }, () -> {
                head = headList__safe(self_17);
                ifThenElse(
                    fn_3(head),
                    () -> {
                        mkCons(head, recurse_4(recurse_4, tailList__safe(self_17), fn_3))
                    },
                    () -> {
                        recurse_4(recurse_4, tailList__safe(self_17), fn_3)
                    }
                )()
            })()
        };
        recurse_5(recurse_5, self_16, fn_2)
    };
    __helios__common__list_0 = mkNilData(());
    __helios__common__filter_list = (self_18, fn_4) -> {
        __helios__common__filter(self_18, fn_4, __helios__common__list_0)
    };
    __helios__time____eq = __helios__int____eq;
    __helios__int____lt = lessThanInteger;
    __helios__time____lt = __helios__int____lt;
    __helios__bool____eq = (a_3, b_4) -> {
        ifThenElse(
            a_3,
            b_4,
            __helios__bool____not(b_4)
        )
    };
    __helios__bool__or = (a_4, b_5) -> {
        ifThenElse(
            a_4(),
            () -> {
                true
            },
            () -> {
                b_5()
            }
        )()
    };
    __helios__common__length = (lst) -> {
        recurse_7 = (recurse_6, lst_1) -> {
            chooseList(lst_1, () -> {
                0
            }, () -> {
                addInteger(recurse_6(recurse_6, tailList__safe(lst_1)), 1)
            })()
        };
        recurse_7(recurse_7, lst)
    };
    __helios__int____sub = subtractInteger;
    __helios__int__is_valid_data = (data_1) -> {
        chooseData(data_1, false, false, false, true, false)
    };
    __helios__common__enum_tag_equals = (data_2, i_1) -> {
        equalsInteger(fstPair(unConstrData(data_2)), i_1)
    };
    __helios__tx__ref_inputs = (self_19) -> {
        unListData(__helios__common__enum_field_1(self_19))
    };
    __helios__int__from_data = unIData;
    __helios__common__struct_field_0 = headList;
    __helios__struct__from_data = unListData;
    __helios__common__struct_fields_after_0 = tailList;
    __helios__common__struct_field_1 = (self_20) -> {
        headList(__helios__common__struct_fields_after_0(self_20))
    };
    __helios__assetclass__from_data = __helios__common__identity;
    __helios__bool__from_data = (d) -> {
        ifThenElse(
            equalsInteger(fstPair(unConstrData(d)), 0),
            false,
            true
        )
    };
    __helios__time__from_data = __helios__int__from_data;
    __helios__common__enum_fields_after_2 = (self_21) -> {
        tailList(__helios__common__enum_fields_after_1(self_21))
    };
    __helios__common__enum_fields_after_3 = (self_22) -> {
        tailList(__helios__common__enum_fields_after_2(self_22))
    };
    __helios__common__enum_fields_after_4 = (self_23) -> {
        tailList(__helios__common__enum_fields_after_3(self_23))
    };
    __helios__common__enum_fields_after_5 = (self_24) -> {
        tailList(__helios__common__enum_fields_after_4(self_24))
    };
    __helios__common__enum_field_6 = (self_25) -> {
        headList(__helios__common__enum_fields_after_5(self_25))
    };
    __helios__tx__withdrawals = (self_26) -> {
        unMapData(__helios__common__enum_field_6(self_26))
    };
    __helios__stakingcredential__hash____is = (data_3) -> {
        __helios__common__enum_tag_equals(data_3, 0)
    };
    __helios__stakinghash__validator____is = (data_4) -> {
        __helios__common__enum_tag_equals(data_4, 1)
    };
    __helios__bytearray____eq = equalsByteString;
    __helios__stakingvalidatorhash____eq = __helios__bytearray____eq;
    __helios__bytearray__from_data = unBData;
    __helios__validatorhash__from_data = __helios__bytearray__from_data;
    __helios__spendingcredential__validator__hash = (self_27) -> {
        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_27))
    };
    __helios__stakinghash__validator__hash = __helios__spendingcredential__validator__hash;
    __helios__stakingcredential__hash__hash = __helios__common__enum_field_0;
    __helios__stakingcredential__from_data = __helios__common__identity;
    __helios__common__any = (self_28, fn_5) -> {
        recurse_9 = (recurse_8, self_29, fn_6) -> {
            chooseList(self_29, () -> {
                false
            }, () -> {
                ifThenElse(
                    fn_6(headList__safe(self_29)),
                    () -> {
                        true
                    },
                    () -> {
                        recurse_8(recurse_8, tailList__safe(self_29), fn_6)
                    }
                )()
            })()
        };
        recurse_9(recurse_9, self_28, fn_5)
    };
    __helios__bytearray____to_data = bData;
    __helios__pubkeyhash____to_data = __helios__bytearray____to_data;
    __helios__common__enum_fields_after_6 = (self_30) -> {
        tailList(__helios__common__enum_fields_after_5(self_30))
    };
    __helios__common__enum_fields_after_7 = (self_31) -> {
        tailList(__helios__common__enum_fields_after_6(self_31))
    };
    __helios__common__enum_field_8 = (self_32) -> {
        headList(__helios__common__enum_fields_after_7(self_32))
    };
    __helios__tx__signatories = (self_33) -> {
        unListData(__helios__common__enum_field_8(self_33))
    };
    __helios__tx__is_signed_by = (self_34) -> {
        (hash) -> {
            hash_1 = __helios__pubkeyhash____to_data(hash);
            __helios__common__any(__helios__tx__signatories(self_34), (signatory) -> {
                equalsData(signatory, hash_1)
            })
        }
    };
    __helios__scriptcontext__purpose = __helios__common__enum_field_1(__helios__scriptcontext__data);
    __helios__scriptcontext__get_spending_purpose_output_id = () -> {
        __helios__common__enum_field_0(__helios__scriptcontext__purpose)
    };
    __helios__txinput__output_id = __helios__common__enum_field_0;
    __helios__scriptcontext__get_current_input = () -> {
        id = __helios__scriptcontext__get_spending_purpose_output_id();
        recurse_11 = (recurse_10, lst_2) -> {
            chooseList(lst_2, () -> {
                __helios__error("not found")
            }, () -> {
                item = headList__safe(lst_2);
                ifThenElse(
                    equalsData(__helios__txinput__output_id(item), id),
                    () -> {
                        item
                    },
                    () -> {
                        recurse_10(recurse_10, tailList__safe(lst_2))
                    }
                )()
            })()
        };
        recurse_11(recurse_11, __helios__tx__inputs(__helios__scriptcontext__tx))
    };
    __helios__int____gt = (a_5, b_6) -> {
        __helios__bool____not(lessThanEqualsInteger(a_5, b_6))
    };
    __helios__value__get_safe = (self_35) -> {
        (assetClass) -> {
            mintingPolicyHash = __helios__common__enum_field_0(assetClass);
            tokenName = __helios__common__enum_field_1(assetClass);
            outer_1 = (outer, inner, map) -> {
                chooseList(map, () -> {
                    0
                }, () -> {
                    ifThenElse(
                        equalsData(fstPair(headList__safe(map)), mintingPolicyHash),
                        () -> {
                            inner(inner, unMapData(sndPair(headList__safe(map))))
                        },
                        () -> {
                            outer(outer, inner, tailList__safe(map))
                        }
                    )()
                })()
            };
            inner_2 = (inner_1, map_1) -> {
                chooseList(map_1, () -> {
                    0
                }, () -> {
                    ifThenElse(
                        equalsData(fstPair(headList__safe(map_1)), tokenName),
                        () -> {
                            unIData(sndPair(headList__safe(map_1)))
                        },
                        () -> {
                            inner_1(inner_1, tailList__safe(map_1))
                        }
                    )()
                })()
            };
            outer_1(outer_1, inner_2, self_35)
        }
    };
    __helios__txoutput__value = (self_36) -> {
        unMapData(__helios__common__enum_field_1(self_36))
    };
    __helios__txinput__value = (self_37) -> {
        __helios__txoutput__value(__helios__txinput__output(self_37))
    };
    __helios__common__list_1 = (a_6) -> {
        mkCons(a_6, __helios__common__list_0)
    };
    __helios__common__find_safe = (self_38, fn_7, callback) -> {
        recurse_13 = (recurse_12, self_39, fn_8) -> {
            chooseList(self_39, () -> {
                constrData(1, __helios__common__list_0)
            }, () -> {
                head_1 = headList__safe(self_39);
                ifThenElse(
                    fn_8(head_1),
                    () -> {
                        constrData(0, __helios__common__list_1(callback(head_1)))
                    },
                    () -> {
                        recurse_12(recurse_12, tailList__safe(self_39), fn_8)
                    }
                )()
            })()
        };
        recurse_13(recurse_13, self_38, fn_7)
    };
    __helios__common__struct_fields_after_1 = (self_40) -> {
        tailList(__helios__common__struct_fields_after_0(self_40))
    };
    __helios__common__struct_fields_after_2 = (self_41) -> {
        tailList(__helios__common__struct_fields_after_1(self_41))
    };
    __helios__common__struct_fields_after_3 = (self_42) -> {
        tailList(__helios__common__struct_fields_after_2(self_42))
    };
    __helios__common__struct_fields_after_4 = (self_43) -> {
        tailList(__helios__common__struct_fields_after_3(self_43))
    };
    __helios__common__struct_field_5 = (self_44) -> {
        headList(__helios__common__struct_fields_after_4(self_44))
    };
    __helios__stakingvalidatorhash__from_data = __helios__bytearray__from_data;
    __helios__common__struct_field_3 = (self_45) -> {
        headList(__helios__common__struct_fields_after_2(self_45))
    };
    __helios__pubkeyhash__from_data = __helios__bytearray__from_data;
    __helios__int____leq = lessThanEqualsInteger;
    __helios__option__NONE = constrData(1, __helios__common__list_0);
    __helios__int____to_data = iData;
    __helios__time____to_data = __helios__int____to_data;
    __helios__common__fold_lazy = (self_46, fn_9, z_2) -> {
        recurse_15 = (recurse_14, self_47) -> {
            chooseList(self_47, () -> {
                z_2
            }, () -> {
                fn_9(headList__safe(self_47), () -> {
                    recurse_14(recurse_14, tailList__safe(self_47))
                })
            })()
        };
        recurse_15(recurse_15, self_46)
    };
    __helios__address____neq = __helios__common____neq;
    __helios__common__all = (self_48, fn_10) -> {
        recurse_17 = (recurse_16, self_49, fn_11) -> {
            chooseList(self_49, () -> {
                true
            }, () -> {
                ifThenElse(
                    fn_11(headList__safe(self_49)),
                    () -> {
                        recurse_16(recurse_16, tailList__safe(self_49), fn_11)
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_17(recurse_17, self_48, fn_10)
    };
    __helios__mintingpolicyhash____to_data = __helios__bytearray____to_data;
    __helios__value__get_policy = (self_50) -> {
        (mph) -> {
            mph_1 = __helios__mintingpolicyhash____to_data(mph);
            recurse_19 = (recurse_18, map_2) -> {
                chooseList(map_2, () -> {
                    __helios__error("policy not found")
                }, () -> {
                    ifThenElse(
                        equalsData(fstPair(headList__safe(map_2)), mph_1),
                        () -> {
                            unMapData(sndPair(headList__safe(map_2)))
                        },
                        () -> {
                            recurse_18(recurse_18, tailList__safe(map_2))
                        }
                    )()
                })()
            };
            recurse_19(recurse_19, self_50)
        }
    };
    __helios__int____neq = (self_51, other) -> {
        __helios__bool____not(__helios__int____eq(self_51, other))
    };
    __helios__common__list_2 = (arg0, arg1) -> {
        mkCons(arg0, __helios__common__list_1(arg1))
    };
    __helios__assetclass__new = (mph_2, token_name) -> {
        constrData(0, __helios__common__list_2(__helios__mintingpolicyhash____to_data(mph_2), __helios__bytearray____to_data(token_name)))
    };
    __helios__value__get_singleton_asset_class = (self_52) -> {
        () -> {
            recurse_21 = (recurse_20) -> {
                (map_3, found, asset_class) -> {
                    chooseList(map_3, () -> {
                        ifThenElse(
                            found,
                            () -> {
                                asset_class
                            },
                            () -> {
                                __helios__error("doesn't contain a singleton asset class")
                            }
                        )()
                    }, () -> {
                        head_2 = headList(map_3);
                        tail = tailList(map_3);
                        mph_3 = unBData(fstPair(head_2));
                        ifThenElse(
                            equalsByteString(mph_3, #),
                            () -> {
                                recurse_20(recurse_20)(tail, found, asset_class)
                            },
                            () -> {
                                ifThenElse(
                                    found,
                                    () -> {
                                        __helios__error("not singleton, contains multiple assetclasses")
                                    },
                                    () -> {
                                        tokens = unMapData(sndPair(head_2));
                                        chooseList(tailList(tokens), () -> {
                                            first = headList(tokens);
                                            qty = unIData(sndPair(first));
                                            ifThenElse(
                                                equalsInteger(qty, 1),
                                                () -> {
                                                    name = unBData(fstPair(first));
                                                    recurse_20(recurse_20)(tail, true, __helios__assetclass__new(mph_3, name))
                                                },
                                                () -> {
                                                    __helios__error("not singleton, qty is not 1")
                                                }
                                            )()
                                        }, () -> {
                                            __helios__error("not singleton, has other token names")
                                        })()
                                    }
                                )()
                            }
                        )()
                    })()
                }
            };
            recurse_21(recurse_21)(self_52, false, ())
        }
    };
    __helios__ratio__top = (self_53) -> {
        unIData(headList(unListData(self_53)))
    };
    __helios__ratio__bottom = (self_54) -> {
        unIData(headList(tailList(unListData(self_54))))
    };
    __helios__ratio__floor = (self_55) -> {
        () -> {
            top = __helios__ratio__top(self_55);
            bottom = __helios__ratio__bottom(self_55);
            divideInteger(top, bottom)
        }
    };
    __helios__int____mul = multiplyInteger;
    __helios__ratio__new = (top_1, bottom_1) -> {
        listData(mkCons(iData(top_1), mkCons(iData(bottom_1), mkNilData(()))))
    };
    __helios__ratio____mul1 = (a_7, b_7) -> {
        at = __helios__ratio__top(a_7);
        ab = __helios__ratio__bottom(a_7);
        new_top = __helios__int____mul(at, b_7);
        __helios__ratio__new(new_top, ab)
    };
    __helios__time__new = __helios__common__identity;
    __helios__assetclass____to_data = __helios__common__identity;
    __helios__ratio____to_data = __helios__common__identity;
    __helios__common__struct_field_4 = (self_56) -> {
        headList(__helios__common__struct_fields_after_3(self_56))
    };
    __helios__ratio__from_data = __helios__common__identity;
    __helios__common__struct_field_2 = (self_57) -> {
        headList(__helios__common__struct_fields_after_1(self_57))
    };
    __helios__struct____to_data = listData;
    __helios__struct____eq = (self_58, other_1) -> {
        equalsData(__helios__struct____to_data(self_58), __helios__struct____to_data(other_1))
    };
    __helios__common__test_constr_data_2 = (data_5, index_1, test_a, test_b) -> {
        chooseData(data_5, () -> {
            pair_1 = unConstrData__safe(data_5);
            ifThenElse(
                equalsInteger(fstPair(pair_1), index_1),
                () -> {
                    fields_1 = sndPair(pair_1);
                    chooseList(fields_1, () -> {
                        false
                    }, () -> {
                        ifThenElse(
                            test_a(headList__safe(fields_1)),
                            () -> {
                                tail_1 = tailList__safe(fields_1);
                                chooseList(tail_1, () -> {
                                    false
                                }, () -> {
                                    ifThenElse(
                                        test_b(headList__safe(tail_1)),
                                        () -> {
                                            chooseList(tailList__safe(tail_1), () -> {
                                                true
                                            }, () -> {
                                                false
                                            })()
                                        },
                                        () -> {
                                            false
                                        }
                                    )()
                                })()
                            },
                            () -> {
                                false
                            }
                        )()
                    })()
                },
                () -> {
                    false
                }
            )()
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__bytearray__is_valid_data_fixed_length = (data_6, n) -> {
        chooseData(data_6, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            bytes = unBData__safe(data_6);
            ifThenElse(
                equalsInteger(lengthOfByteString(bytes), n),
                () -> {
                    true
                },
                () -> {
                    false
                }
            )()
        })()
    };
    __helios__mintingpolicyhash__is_valid_data = (data_7) -> {
        __helios__bytearray__is_valid_data_fixed_length(data_7, 28)
    };
    __helios__bytearray__is_valid_data = (data_8) -> {
        chooseData(data_8, false, false, false, false, true)
    };
    __helios__assetclass__is_valid_data = (data_9) -> {
        __helios__common__test_constr_data_2(data_9, 0, __helios__mintingpolicyhash__is_valid_data, __helios__bytearray__is_valid_data)
    };
    __helios__common__test_list_data = (data_10, fn_12) -> {
        chooseData(data_10, () -> {
            false
        }, () -> {
            false
        }, () -> {
            fn_12(unListData(data_10))
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__common__test_list_head_data = (test_head, test_tail) -> {
        (list) -> {
            chooseList(list, () -> {
                false
            }, () -> {
                ifThenElse(
                    test_head(headList(list)),
                    () -> {
                        test_tail(tailList(list))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        }
    };
    __helios__common__test_list_empty = (list_1) -> {
        chooseList(list_1, true, false)
    };
    __helios__ratio__is_valid_data = (data_11) -> {
        __helios__common__test_list_data(data_11, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_empty)))
    };
    __helios__time__is_valid_data = __helios__int__is_valid_data;
    __helios__address__new = (cred, staking_cred) -> {
        constrData(0, __helios__common__list_2(cred, staking_cred))
    };
    __helios__validatorhash____to_data = __helios__bytearray____to_data;
    __helios__spendingcredential__new_validator = (hash_2) -> {
        constrData(1, __helios__common__list_1(__helios__validatorhash____to_data(hash_2)))
    };
    __helios__address__from_validator = (vh) -> {
        __helios__address__new(__helios__spendingcredential__new_validator(vh), __helios__option__NONE)
    };
    __helios__common__enum_field_4 = (self_59) -> {
        headList(__helios__common__enum_fields_after_3(self_59))
    };
    __helios__tx__minted = (self_60) -> {
        unMapData(__helios__common__enum_field_4(self_60))
    };
    __helios__mintingpolicyhash__from_data = __helios__bytearray__from_data;
    __helios__assetclass__mph = (self_61) -> {
        __helios__mintingpolicyhash__from_data(__helios__common__enum_field_0(self_61))
    };
    __helios__mintingpolicyhash__from_script_hash = __helios__common__identity;
    __helios__string__encode_utf8 = (self_62) -> {
        () -> {
            encodeUtf8(self_62)
        }
    };
    __helios__common__starts_with = (self_63, selfLengthFn) -> {
        (prefix) -> {
            (n_1, m) -> {
                ifThenElse(
                    lessThanInteger(n_1, m),
                    () -> {
                        false
                    },
                    () -> {
                        equalsByteString(prefix, sliceByteString(0, m, self_63))
                    }
                )()
            }(selfLengthFn(self_63), lengthOfByteString(prefix))
        }
    };
    __helios__bytearray__starts_with = (self_64) -> {
        __helios__common__starts_with(self_64, lengthOfByteString)
    };
    __helios__int__parse_digit = (digit) -> {
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
    };
    __helios__int__parse = (string) -> {
        bytes_1 = encodeUtf8(string);
        n_2 = lengthOfByteString(bytes_1);
        b0 = indexByteString(bytes_1, 0);
        recurse_23 = (recurse_22, acc, i_2) -> {
            ifThenElse(
                equalsInteger(i_2, n_2),
                () -> {
                    acc
                },
                () -> {
                    new_acc = addInteger(multiplyInteger(acc, 10), __helios__int__parse_digit(indexByteString(bytes_1, i_2)));
                    recurse_22(recurse_22, new_acc, addInteger(i_2, 1))
                }
            )()
        };
        ifThenElse(
            equalsInteger(b0, 48),
            () -> {
                ifThenElse(
                    equalsInteger(n_2, 1),
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
                            equalsInteger(indexByteString(bytes_1, 1), 48),
                            () -> {
                                __helios__error("-0 not allowed")
                            },
                            () -> {
                                multiplyInteger(recurse_23(recurse_23, 0, 1), -1)
                            }
                        )()
                    },
                    () -> {
                        recurse_23(recurse_23, 0, 0)
                    }
                )()
            }
        )()
    };
    __helios__bytearray__decode_utf8 = (self_65) -> {
        () -> {
            decodeUtf8(self_65)
        }
    };
    __helios__int__max = (a_8, b_8) -> {
        ifThenElse(
            lessThanInteger(a_8, b_8),
            b_8,
            a_8
        )
    };
    __helios__common__slice_bytearray = (self_66, selfLengthFn_1) -> {
        (start, end) -> {
            normalize = (pos) -> {
                ifThenElse(
                    lessThanInteger(pos, 0),
                    () -> {
                        addInteger(addInteger(selfLengthFn_1(self_66), 1), pos)
                    },
                    () -> {
                        pos
                    }
                )()
            };
            fn_14 = (start_1) -> {
                fn_13 = (end_1) -> {
                    sliceByteString(start_1, subtractInteger(end_1, __helios__int__max(start_1, 0)), self_66)
                };
                fn_13(normalize(end))
            };
            fn_14(normalize(start))
        }
    };
    __helios__bytearray__slice = (self_67) -> {
        __helios__common__slice_bytearray(self_67, lengthOfByteString)
    };
    __helios__bytearray__length = lengthOfByteString;
    __helios__bytearray____add = appendByteString;
    __helios__int__show_digit = (x) -> {
        addInteger(modInteger(x, 10), 48)
    };
    __helios__int__show = (self_68) -> {
        () -> {
            decodeUtf8__safe(recurse_25 = (recurse_24, i_3, bytes_2) -> {
                bytes_3 = consByteString(__helios__int__show_digit(i_3), bytes_2);
                ifThenElse(
                    lessThanInteger(i_3, 10),
                    () -> {
                        bytes_3
                    },
                    () -> {
                        recurse_24(recurse_24, divideInteger(i_3, 10), bytes_3)
                    }
                )()
            };
            ifThenElse(
                lessThanInteger(self_68, 0),
                () -> {
                    consByteString(45, recurse_25(recurse_25, multiplyInteger(self_68, -1), #))
                },
                () -> {
                    recurse_25(recurse_25, self_68, #)
                }
            )())
        }
    };
    __helios__scripts__assets_validator = param("__helios__scripts__assets_validator", #);
    __helios__scripts__config_validator = param("__helios__scripts__config_validator", #);
    __helios__scripts__fund_policy = param("__helios__scripts__fund_policy", #);
    __helios__scripts__portfolio_validator = param("__helios__scripts__portfolio_validator", #);
    __helios__script__assets_validator____is = (_) -> {
        false
    };
    __helios__script__benchmark_delegate____is = (__1) -> {
        false
    };
    __helios__script__burn_order_validator____is = (__2) -> {
        false
    };
    __helios__script__config_validator____is = (__3) -> {
        false
    };
    __helios__script__fund_policy____is = (__4) -> {
        false
    };
    __helios__script__metadata_validator____is = (__5) -> {
        false
    };
    __helios__script__mint_order_validator____is = (__6) -> {
        false
    };
    __helios__script__oracle_delegate____is = (__7) -> {
        false
    };
    __helios__script__portfolio_validator____is = (__8) -> {
        true
    };
    __helios__script__price_validator____is = (__9) -> {
        false
    };
    __helios__script__reimbursement_validator____is = (__10) -> {
        false
    };
    __helios__script__supply_validator____is = (__11) -> {
        false
    };
    __helios__script__voucher_validator____is = (__12) -> {
        false
    };
    __module__TokenNames__assets_prefix_1 = (__module__TokenNames__assets_prefix) -> {
        param("__module__TokenNames__assets_prefix(__module__TokenNames__assets_prefix)", __helios__string__encode_utf8("assets ")())
    };
    __module__TokenNames__assets_1 = (__module__TokenNames__assets) -> {
        (group_id) -> {
            __helios__bytearray____add(__module__TokenNames__assets_prefix_1(__module__TokenNames__assets_prefix_1), __helios__string__encode_utf8(__helios__int__show(group_id)())())
        }
    };
    __helios__option[__helios__int]__some____new = (some) -> {
        constrData(0, __helios__common__list_1(__helios__int____to_data(some)))
    };
    __helios__option[__helios__int]__none____new = () -> {
        __helios__option__NONE
    };
    __module__TokenNames__parse_series = (prefix_1, token_name_1) -> {
        ifThenElse(
            __helios__bytearray__starts_with(token_name_1)(prefix_1),
            () -> {
                id_1 = __helios__bytearray__slice(token_name_1)(__helios__bytearray__length(prefix_1), __helios__bytearray__length(token_name_1));
                __helios__option[__helios__int]__some____new(__helios__int__parse(__helios__bytearray__decode_utf8(id_1)()))
            },
            () -> {
                () -> {
                    __helios__option[__helios__int]__none____new()
                }()
            }
        )()
    };
    __module__TokenNames__parse_assets = (token_name_2) -> {
        __module__TokenNames__parse_series(__module__TokenNames__assets_prefix_1(__module__TokenNames__assets_prefix_1), token_name_2)
    };
    __module__TokenNames__has_assets_prefix = (token_name_3) -> {
        __helios__bytearray__starts_with(token_name_3)(__module__TokenNames__assets_prefix_1(__module__TokenNames__assets_prefix_1))
    };
    __module__TokenNames__config_1 = (__module__TokenNames__config) -> {
        param("__module__TokenNames__config(__module__TokenNames__config)", __helios__string__encode_utf8("config")())
    };
    __module__TokenNames__portfolio_1 = (__module__TokenNames__portfolio) -> {
        param("__module__TokenNames__portfolio(__module__TokenNames__portfolio)", __helios__string__encode_utf8("portfolio")())
    };
    __module__TokenNames__supply_1 = (__module__TokenNames__supply) -> {
        param("__module__TokenNames__supply(__module__TokenNames__supply)", __helios__string__encode_utf8("supply")())
    };
    __module__Tokens__direct_policy_1 = (__module__Tokens__direct_policy) -> {
        param("__module__Tokens__direct_policy(__module__Tokens__direct_policy)", __helios__mintingpolicyhash__from_script_hash(__helios__scripts__fund_policy))
    };
    __module__Tokens__indirect_policy = () -> {
        input = __helios__scriptcontext__get_current_input();
        __helios__assetclass__mph(__helios__value__get_singleton_asset_class(__helios__txinput__value(input))())
    };
    __helios__map[__helios__bytearray@__helios__int]__length = (self_69) -> {
        __helios__common__length(self_69)
    };
    __helios__map[__helios__bytearray@__helios__int]__head = (self_70) -> {
        head_3 = headList(self_70);
        (callback_1) -> {
            callback_1(__helios__bytearray__from_data(fstPair(head_3)), __helios__int__from_data(sndPair(head_3)))
        }
    };
    __helios__option[__helios__int]__some____is = (data_12) -> {
        __helios__common__enum_tag_equals(data_12, 0)
    };
    __helios__option[__helios__int]__unwrap = (self_71) -> {
        () -> {
            __helios__int__from_data(__helios__common__enum_field_0(self_71))
        }
    };
    __helios__map[__helios__bytearray@__helios__int]__is_empty = (self_72) -> {
        () -> {
            nullList(self_72)
        }
    };
    __module__Addresses__assets_1 = (__module__Addresses__assets) -> {
        param("__module__Addresses__assets(__module__Addresses__assets)", __helios__address__from_validator(__helios__scripts__assets_validator))
    };
    __module__Addresses__config_1 = (__module__Addresses__config) -> {
        param("__module__Addresses__config(__module__Addresses__config)", __helios__address__from_validator(__helios__scripts__config_validator))
    };
    __module__Addresses__portfolio_1 = (__module__Addresses__portfolio) -> {
        param("__module__Addresses__portfolio(__module__Addresses__portfolio)", __helios__address__from_validator(__helios__scripts__portfolio_validator))
    };
    __module__AssetModule__Asset[]__is_valid_data = (data_13) -> {
        chooseData(data_13, () -> {
            false
        }, () -> {
            false
        }, () -> {
            fields_2 = unListData__safe(data_13);
            chooseList(fields_2, () -> {
                false
            }, () -> {
                head_4 = headList__safe(fields_2);
                ifThenElse(
                    __helios__assetclass__is_valid_data(head_4),
                    () -> {
                        fields_3 = tailList__safe(fields_2);
                        chooseList(fields_3, () -> {
                            false
                        }, () -> {
                            head_5 = headList__safe(fields_3);
                            ifThenElse(
                                __helios__int__is_valid_data(head_5),
                                () -> {
                                    fields_4 = tailList__safe(fields_3);
                                    chooseList(fields_4, () -> {
                                        false
                                    }, () -> {
                                        head_6 = headList__safe(fields_4);
                                        ifThenElse(
                                            __helios__int__is_valid_data(head_6),
                                            () -> {
                                                fields_5 = tailList__safe(fields_4);
                                                chooseList(fields_5, () -> {
                                                    false
                                                }, () -> {
                                                    head_7 = headList__safe(fields_5);
                                                    ifThenElse(
                                                        __helios__ratio__is_valid_data(head_7),
                                                        () -> {
                                                            fields_6 = tailList__safe(fields_5);
                                                            chooseList(fields_6, () -> {
                                                                false
                                                            }, () -> {
                                                                head_8 = headList__safe(fields_6);
                                                                ifThenElse(
                                                                    __helios__time__is_valid_data(head_8),
                                                                    () -> {
                                                                        fields_7 = tailList__safe(fields_6);
                                                                        chooseList(fields_7, true, false)
                                                                    },
                                                                    () -> {
                                                                        false
                                                                    }
                                                                )()
                                                            })()
                                                        },
                                                        () -> {
                                                            false
                                                        }
                                                    )()
                                                })()
                                            },
                                            () -> {
                                                false
                                            }
                                        )()
                                    })()
                                },
                                () -> {
                                    false
                                }
                            )()
                        })()
                    },
                    () -> {
                        false
                    }
                )()
            })()
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __module__AssetModule__Asset[]____eq = __helios__struct____eq;
    __module__AssetModule__Asset[]__from_data = __helios__struct__from_data;
    __module__AssetModule__Asset[]____to_data = __helios__struct____to_data;
    __module__AssetModule__Asset[]__asset_class = (self_73) -> {
        __helios__assetclass__from_data(__helios__common__struct_field_0(self_73))
    };
    __module__AssetModule__Asset[]__count = (self_74) -> {
        __helios__int__from_data(__helios__common__struct_field_1(self_74))
    };
    __module__AssetModule__Asset[]__count_tick = (self_75) -> {
        __helios__int__from_data(__helios__common__struct_field_2(self_75))
    };
    __module__AssetModule__Asset[]__price = (self_76) -> {
        __helios__ratio__from_data(__helios__common__struct_field_3(self_76))
    };
    __module__AssetModule__Asset[]__price_timestamp = (self_77) -> {
        __helios__time__from_data(__helios__common__struct_field_4(self_77))
    };
    __module__AssetModule__Asset[]____new = (asset_class_1, count, count_tick, price, price_timestamp) -> {
        mkCons(__helios__assetclass____to_data(asset_class_1), mkCons(__helios__int____to_data(count), mkCons(__helios__int____to_data(count_tick), mkCons(__helios__ratio____to_data(price), mkCons(__helios__time____to_data(price_timestamp), mkNilData(()))))))
    };
    __module__AssetModule__Asset[]__new = (asset_class_2) -> {
        __module__AssetModule__Asset[]____new(asset_class_2, 0, 0, __helios__ratio__new(1, 1), __helios__time__new(0))
    };
    __module__AssetModule__Asset[]__calc_value = (self_78) -> {
        () -> {
            __helios__ratio__floor(__helios__ratio____mul1(__module__AssetModule__Asset[]__price(self_78), __module__AssetModule__Asset[]__count(self_78)))()
        }
    };
    __helios__list[__module__AssetModule__Asset[]]__is_valid_data_internal = (lst_3) -> {
        recurse_27 = (recurse_26, lst_4) -> {
            chooseList(lst_4, () -> {
                true
            }, () -> {
                ifThenElse(
                    __module__AssetModule__Asset[]__is_valid_data(headList__safe(lst_4)),
                    () -> {
                        recurse_26(recurse_26, tailList__safe(lst_4))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_27(recurse_27, lst_3)
    };
    __helios__list[__module__AssetModule__Asset[]]____to_data = listData;
    __helios__list[__module__AssetModule__Asset[]]____eq = (self_79, other_2) -> {
        equalsData(__helios__list[__module__AssetModule__Asset[]]____to_data(self_79), __helios__list[__module__AssetModule__Asset[]]____to_data(other_2))
    };
    __helios__list[__module__AssetModule__Asset[]]__from_data = (data_14) -> {
        lst_5 = unListData(data_14);
        __13 = ifThenElse(
            __helios__list[__module__AssetModule__Asset[]]__is_valid_data_internal(lst_5),
            () -> {
                ()
            },
            () -> {
                trace("Warning: invalid list data", ())
            }
        )();
        lst_5
    };
    __module__AssetGroupModule__AssetGroup[]__from_data = __helios__list[__module__AssetModule__Asset[]]__from_data;
    __module__AssetGroupModule__AssetGroup[]__assets = __helios__common__identity;
    __module__AssetGroupModule__AssetGroup[]__MAX_SIZE_1 = (__module__AssetGroupModule__AssetGroup[]__MAX_SIZE) -> {
        param("__module__AssetGroupModule__AssetGroup[]__MAX_SIZE(__module__AssetGroupModule__AssetGroup[]__MAX_SIZE)", 3)
    };
    __helios__data__as[__module__AssetGroupModule__AssetGroup[]] = (data_15) -> {
        __module__AssetGroupModule__AssetGroup[]__from_data(data_15)
    };
    __helios__list[__helios__txoutput]__find = (self_80) -> {
        (fn_15) -> {
            recurse_29 = (recurse_28, lst_6) -> {
                chooseList(lst_6, () -> {
                    __helios__error("not found")
                }, () -> {
                    item_1 = __helios__txoutput__from_data(headList__safe(lst_6));
                    ifThenElse(
                        fn_15(item_1),
                        () -> {
                            item_1
                        },
                        () -> {
                            recurse_28(recurse_28, tailList__safe(lst_6))
                        }
                    )()
                })()
            };
            recurse_29(recurse_29, self_80)
        }
    };
    __module__Tokens__contains_only[__helios__txoutput] = (v, asset_class_3) -> {
        __helios__assetclass____eq(__helios__value__get_singleton_asset_class(__helios__txoutput__value(v))(), asset_class_3)
    };
    __helios__option[__module__AssetModule__Asset[]]__some____is = (data_16) -> {
        __helios__common__enum_tag_equals(data_16, 0)
    };
    __helios__option[__module__AssetModule__Asset[]]__some__some = (self_81) -> {
        __module__AssetModule__Asset[]__from_data(__helios__common__enum_field_0(self_81))
    };
    __helios__list[__helios__txoutput]__fold_lazy[__helios__option[__module__AssetModule__Asset[]]] = (self_82) -> {
        (fn_16, a0) -> {
            __helios__common__fold_lazy(self_82, (item_2, next) -> {
                fn_16(__helios__txoutput__from_data(item_2), next)
            }, a0)
        }
    };
    __helios__option[__module__AssetModule__Asset[]]__none____new = () -> {
        __helios__option__NONE
    };
    __helios__option[__module__AssetModule__Asset[]]__unwrap = (self_83) -> {
        () -> {
            __module__AssetModule__Asset[]__from_data(__helios__common__enum_field_0(self_83))
        }
    };
    __helios__list[__helios__txinput]__fold_lazy[__helios__option[__module__AssetModule__Asset[]]] = (self_84) -> {
        (fn_17, a0_1) -> {
            __helios__common__fold_lazy(self_84, (item_3, next_1) -> {
                fn_17(__helios__txinput__from_data(item_3), next_1)
            }, a0_1)
        }
    };
    __helios__list[__helios__data]__get_singleton = (self_85) -> {
        () -> {
            chooseUnit(__helios__assert(nullList(tailList(self_85)), "not a singleton list"), headList(self_85))
        }
    };
    __helios__list[__helios__txinput]__get_singleton = (self_86) -> {
        () -> {
            __helios__txinput__from_data(__helios__list[__helios__data]__get_singleton(self_86)())
        }
    };
    __helios__list[__helios__txinput]__filter = (self_87) -> {
        (fn_18) -> {
            __helios__common__filter_list(self_87, (item_4) -> {
                fn_18(__helios__txinput__from_data(item_4))
            })
        }
    };
    __helios__map[__helios__bytearray@__helios__int]__any_key = (self_88) -> {
        (fn_19) -> {
            fn_20 = (pair_2) -> {
                fn_19(__helios__bytearray__from_data(fstPair(pair_2)))
            };
            __helios__common__any(self_88, fn_20)
        }
    };
    __helios__list[__module__AssetModule__Asset[]]__find_safe = (self_89) -> {
        (fn_21) -> {
            __helios__common__find_safe(self_89, (item_5) -> {
                fn_21(__module__AssetModule__Asset[]__from_data(item_5))
            }, __helios__common__identity)
        }
    };
    __module__AssetGroupModule__AssetGroup[]__find_asset = (self_90) -> {
        (asset_class_4) -> {
            __helios__list[__module__AssetModule__Asset[]]__find_safe(__module__AssetGroupModule__AssetGroup[]__assets(self_90))((asset) -> {
                __helios__assetclass____eq(__module__AssetModule__Asset[]__asset_class(asset), asset_class_4)
            })
        }
    };
    __helios__list[__module__AssetModule__Asset[]]__length = __helios__common__length;
    __module__AssetGroupModule__AssetGroup[]__is_empty = (self_91) -> {
        () -> {
            __helios__int____eq(__helios__list[__module__AssetModule__Asset[]]__length(__module__AssetGroupModule__AssetGroup[]__assets(self_91)), 0)
        }
    };
    __module__AssetGroupModule__AssetGroup[]__is_not_overfull = (self_92) -> {
        () -> {
            __helios__int____leq(__helios__list[__module__AssetModule__Asset[]]__length(__module__AssetGroupModule__AssetGroup[]__assets(self_92)), __module__AssetGroupModule__AssetGroup[]__MAX_SIZE_1(__module__AssetGroupModule__AssetGroup[]__MAX_SIZE_1))
        }
    };
    __helios__list[__helios__txinput]__all = (self_93) -> {
        (fn_22) -> {
            __helios__common__all(self_93, (item_6) -> {
                fn_22(__helios__txinput__from_data(item_6))
            })
        }
    };
    __module__AssetGroupModule__AssetGroup[]__nothing_spent = () -> {
        __helios__list[__helios__txinput]__all(__helios__tx__inputs(__helios__scriptcontext__tx))((input_1) -> {
            __helios__address____neq(__helios__txinput__address(input_1), __module__Addresses__assets_1(__module__Addresses__assets_1))
        })
    };
    __helios__list[__helios__int]__fold2[__helios__int@__helios__bool] = (self_94) -> {
        (fn_23, a0_2, b0_1) -> {
            __helios__common__fold(self_94, (prev, item_7) -> {
                prev((a_9, b_9) -> {
                    fn_23(a_9, b_9, __helios__int__from_data(item_7))
                })
            }, (callback_2) -> {
                callback_2(a0_2, b0_1)
            })
        }
    };
    __helios__list[__module__AssetModule__Asset[]]__fold_lazy[__helios__bool] = (self_95) -> {
        (fn_24, a0_3) -> {
            __helios__common__fold_lazy(self_95, (item_8, next_2) -> {
                fn_24(__module__AssetModule__Asset[]__from_data(item_8), next_2)
            }, a0_3)
        }
    };
    __helios__list[__helios__data]__get = (self_96) -> {
        (index_2) -> {
            recurse_31 = (recurse_30, self_97, i_4) -> {
                chooseList(self_97, () -> {
                    __helios__error("index out of range")
                }, () -> {
                    ifThenElse(
                        equalsInteger(index_2, i_4),
                        () -> {
                            headList__safe(self_97)
                        },
                        () -> {
                            recurse_30(recurse_30, tailList__safe(self_97), addInteger(i_4, 1))
                        }
                    )()
                })()
            };
            recurse_31(recurse_31, self_96, 0)
        }
    };
    __helios__list[__helios__txinput]__get = (self_98) -> {
        (index_3) -> {
            __helios__txinput__from_data(__helios__list[__helios__data]__get(self_98)(index_3))
        }
    };
    __helios__list[__helios__int]__fold3[__helios__int@__helios__option[__helios__time]@__helios__int] = (self_99) -> {
        (fn_25, a0_4, b0_2, c0) -> {
            __helios__common__fold(self_99, (prev_1, item_9) -> {
                prev_1((a_10, b_10, c) -> {
                    fn_25(a_10, b_10, c, __helios__int__from_data(item_9))
                })
            }, (callback_3) -> {
                callback_3(a0_4, b0_2, c0)
            })
        }
    };
    __helios__list[__module__AssetModule__Asset[]]__fold2[__helios__option[__helios__time]@__helios__int] = (self_100) -> {
        (fn_26, a0_5, b0_3) -> {
            __helios__common__fold(self_100, (prev_2, item_10) -> {
                prev_2((a_11, b_11) -> {
                    fn_26(a_11, b_11, __module__AssetModule__Asset[]__from_data(item_10))
                })
            }, (callback_4) -> {
                callback_4(a0_5, b0_3)
            })
        }
    };
    __helios__option[__helios__time]__none____is = (data_17) -> {
        __helios__common__enum_tag_equals(data_17, 1)
    };
    __helios__option[__helios__time]__some____new = (some_1) -> {
        constrData(0, __helios__common__list_1(__helios__time____to_data(some_1)))
    };
    __helios__option[__helios__time]__some__some = (self_101) -> {
        __helios__time__from_data(__helios__common__enum_field_0(self_101))
    };
    __helios__option[__helios__time]__none____new = () -> {
        __helios__option__NONE
    };
    __helios__option[__helios__time]__unwrap = (self_102) -> {
        () -> {
            __helios__time__from_data(__helios__common__enum_field_0(self_102))
        }
    };
    __module__ConfigModule__ConfigChangeProposal[]__from_data = __helios__common__identity;
    __module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__asset_class = (self_103) -> {
        __helios__assetclass__from_data(__helios__common__enum_field_0(self_103))
    };
    __module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__asset_class = (self_104) -> {
        __helios__assetclass__from_data(__helios__common__enum_field_0(self_104))
    };
    __module__ConfigModule__ConfigState[]__from_data = __helios__common__identity;
    __module__ConfigModule__ConfigState[]__Idle____is = (data_18) -> {
        __helios__common__enum_tag_equals(data_18, 0)
    };
    __module__ConfigModule__ConfigState[]__Changing__proposal = (self_105) -> {
        __module__ConfigModule__ConfigChangeProposal[]__from_data(__helios__common__enum_field_1(self_105))
    };
    __module__ConfigModule__ConfigState[]__get_proposal = (self_106) -> {
        () -> {
            e0 = self_106;
            ifThenElse(
                __module__ConfigModule__ConfigState[]__Idle____is(e0),
                () -> {
                    (__lhs_0_1) -> {
                        __helios__error("Idle")
                    }
                },
                () -> {
                    (__lhs_0) -> {
                        proposal = __module__ConfigModule__ConfigState[]__Changing__proposal(__lhs_0);
                        proposal
                    }
                }
            )()(e0)
        }
    };
    __module__ConfigModule__Config[]__from_data = __helios__struct__from_data;
    __module__ConfigModule__Config[]__agent = (self_107) -> {
        __helios__pubkeyhash__from_data(__helios__common__struct_field_0(self_107))
    };
    __module__ConfigModule__Config[]__oracle = (self_108) -> {
        __helios__stakingvalidatorhash__from_data(__helios__common__struct_field_3(self_108))
    };
    __module__ConfigModule__Config[]__state = (self_109) -> {
        __module__ConfigModule__ConfigState[]__from_data(__helios__common__struct_field_5(self_109))
    };
    __helios__list[__helios__txinput]__find = (self_110) -> {
        (fn_27) -> {
            recurse_33 = (recurse_32, lst_7) -> {
                chooseList(lst_7, () -> {
                    __helios__error("not found")
                }, () -> {
                    item_11 = __helios__txinput__from_data(headList__safe(lst_7));
                    ifThenElse(
                        fn_27(item_11),
                        () -> {
                            item_11
                        },
                        () -> {
                            recurse_32(recurse_32, tailList__safe(lst_7))
                        }
                    )()
                })()
            };
            recurse_33(recurse_33, self_110)
        }
    };
    __helios__option[__helios__txinput]__some____is = (data_19) -> {
        __helios__common__enum_tag_equals(data_19, 0)
    };
    __helios__option[__helios__txinput]__some__some = (self_111) -> {
        __helios__txinput__from_data(__helios__common__enum_field_0(self_111))
    };
    __helios__list[__helios__txinput]__find_safe = (self_112) -> {
        (fn_28) -> {
            __helios__common__find_safe(self_112, (item_12) -> {
                fn_28(__helios__txinput__from_data(item_12))
            }, __helios__common__identity)
        }
    };
    __module__Tokens__contains[__helios__txinput] = (v_1, asset_class_5) -> {
        __helios__int____gt(__helios__value__get_safe(__helios__txinput__value(v_1))(asset_class_5), 0)
    };
    __helios__data__as[__module__ConfigModule__Config[]] = (data_20) -> {
        __module__ConfigModule__Config[]__from_data(data_20)
    };
    __helios__map[__helios__stakingcredential@__helios__int]__any = (self_113) -> {
        (fn_29) -> {
            fn_30 = (pair_3) -> {
                fn_29(__helios__stakingcredential__from_data(fstPair(pair_3)), __helios__int__from_data(sndPair(pair_3)))
            };
            __helios__common__any(self_113, fn_30)
        }
    };
    __module__PortfolioModule__PortfolioReductionMode[]__from_data = __helios__common__identity;
    __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue____is = (data_21) -> {
        __helios__common__enum_tag_equals(data_21, 0)
    };
    __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__total = (self_114) -> {
        __helios__int__from_data(__helios__common__enum_field_0(self_114))
    };
    __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__oldest_timestamp = (self_115) -> {
        __helios__time__from_data(__helios__common__enum_field_1(self_115))
    };
    __module__PortfolioModule__PortfolioReductionMode[]__Exists____is = (data_22) -> {
        __helios__common__enum_tag_equals(data_22, 1)
    };
    __module__PortfolioModule__PortfolioReductionMode[]__Exists__asset_class = (self_116) -> {
        __helios__assetclass__from_data(__helios__common__enum_field_0(self_116))
    };
    __module__PortfolioModule__PortfolioReductionMode[]__Exists__found = (self_117) -> {
        __helios__bool__from_data(__helios__common__enum_field_1(self_117))
    };
    __module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist____is = (data_23) -> {
        __helios__common__enum_tag_equals(data_23, 2)
    };
    __module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__asset_class = (self_118) -> {
        __helios__assetclass__from_data(__helios__common__enum_field_0(self_118))
    };
    __module__PortfolioModule__PortfolioReduction[]__from_data = __helios__common__identity;
    __module__PortfolioModule__PortfolioReduction[]__Idle____is = (data_24) -> {
        __helios__common__enum_tag_equals(data_24, 0)
    };
    __module__PortfolioModule__PortfolioReduction[]__Reducing____is = (data_25) -> {
        __helios__common__enum_tag_equals(data_25, 1)
    };
    __module__PortfolioModule__PortfolioReduction[]__Reducing__group_iter = (self_119) -> {
        __helios__int__from_data(__helios__common__enum_field_0(self_119))
    };
    __module__PortfolioModule__PortfolioReduction[]__Reducing__start_tick = (self_120) -> {
        __helios__int__from_data(__helios__common__enum_field_1(self_120))
    };
    __module__PortfolioModule__PortfolioReduction[]__Reducing__mode = (self_121) -> {
        __module__PortfolioModule__PortfolioReductionMode[]__from_data(__helios__common__enum_field_2(self_121))
    };
    __module__PortfolioModule__PortfolioReduction[]__is_idle = (self_122) -> {
        () -> {
            e0_1 = self_122;
            ifThenElse(
                __module__PortfolioModule__PortfolioReduction[]__Idle____is(e0_1),
                () -> {
                    (__lhs_0_2) -> {
                        true
                    }
                },
                () -> {
                    (__14) -> {
                        false
                    }
                }
            )()(e0_1)
        }
    };
    __module__PortfolioModule__Portfolio[]__from_data = __helios__struct__from_data;
    __module__PortfolioModule__Portfolio[]__n_groups = (self_123) -> {
        __helios__int__from_data(__helios__common__struct_field_0(self_123))
    };
    __module__PortfolioModule__Portfolio[]__reduction = (self_124) -> {
        __module__PortfolioModule__PortfolioReduction[]__from_data(__helios__common__struct_field_1(self_124))
    };
    __helios__data__as[__module__PortfolioModule__Portfolio[]] = (data_26) -> {
        __module__PortfolioModule__Portfolio[]__from_data(data_26)
    };
    __module__PortfolioModule__Portfolio[]__get_reduction_result = (self_125) -> {
        () -> {
            e0_2 = __module__PortfolioModule__Portfolio[]__reduction(self_125);
            ifThenElse(
                __module__PortfolioModule__PortfolioReduction[]__Idle____is(e0_2),
                () -> {
                    (__lhs_0_4) -> {
                        __helios__error("expected Reducing")
                    }
                },
                () -> {
                    (__lhs_0_3) -> {
                        ig = __module__PortfolioModule__PortfolioReduction[]__Reducing__group_iter(__lhs_0_3);
                        mode = __module__PortfolioModule__PortfolioReduction[]__Reducing__mode(__lhs_0_3);
                        chooseUnit(__helios__assert(__helios__int____eq(ig, __module__PortfolioModule__Portfolio[]__n_groups(self_125)), "reduction is incomplete"), mode)
                    }
                }
            )()(e0_2)
        }
    };
    __module__SupplyModule__Supply[]__from_data = __helios__struct__from_data;
    __module__SupplyModule__Supply[]__tick = (self_126) -> {
        __helios__int__from_data(__helios__common__struct_field_0(self_126))
    };
    __helios__data__as[__module__SupplyModule__Supply[]] = (data_27) -> {
        __module__SupplyModule__Supply[]__from_data(data_27)
    };
    __module__portfolio_validator__Action[]__from_data = __helios__common__identity;
    __module__portfolio_validator__Action[]__AddAssetClass____is = (data_28) -> {
        __helios__common__enum_tag_equals(data_28, 0)
    };
    __module__portfolio_validator__Action[]__RemoveAssetClass____is = (data_29) -> {
        __helios__common__enum_tag_equals(data_29, 1)
    };
    __module__portfolio_validator__Action[]__UpdatePrices____is = (data_30) -> {
        __helios__common__enum_tag_equals(data_30, 2)
    };
    __module__portfolio_validator__Action[]__MoveAssets____is = (data_31) -> {
        __helios__common__enum_tag_equals(data_31, 3)
    };
    __module__portfolio_validator__Action[]__Reset____is = (data_32) -> {
        __helios__common__enum_tag_equals(data_32, 4)
    };
    __helios__list[__helios__int]__is_valid_data_internal = (lst_8) -> {
        recurse_35 = (recurse_34, lst_9) -> {
            chooseList(lst_9, () -> {
                true
            }, () -> {
                ifThenElse(
                    __helios__int__is_valid_data(headList__safe(lst_9)),
                    () -> {
                        recurse_34(recurse_34, tailList__safe(lst_9))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_35(recurse_35, lst_8)
    };
    __helios__list[__helios__int]__from_data = (data_33) -> {
        lst_10 = unListData(data_33);
        __15 = ifThenElse(
            __helios__list[__helios__int]__is_valid_data_internal(lst_10),
            () -> {
                ()
            },
            () -> {
                trace("Warning: invalid list data", ())
            }
        )();
        lst_10
    };
    __module__portfolio_validator__Action[]__Reduce__group_ptrs = (self_127) -> {
        __helios__list[__helios__int]__from_data(__helios__common__enum_field_0(self_127))
    };
    __helios__list[__helios__int]__length = __helios__common__length;
    __helios__list[__helios__data]__append = (self_128) -> {
        (item_13) -> {
            recurse_37 = (recurse_36, lst_11) -> {
                chooseList(lst_11, () -> {
                    mkCons(item_13, lst_11)
                }, () -> {
                    mkCons(headList__safe(lst_11), recurse_36(recurse_36, tailList__safe(lst_11)))
                })()
            };
            recurse_37(recurse_37, self_128)
        }
    };
    __helios__list[__module__AssetModule__Asset[]]__append = (self_129) -> {
        (item_14) -> {
            __helios__list[__helios__data]__append(self_129)(__module__AssetModule__Asset[]____to_data(item_14))
        }
    };
    __helios__list[__module__AssetModule__Asset[]]__filter = (self_130) -> {
        (fn_31) -> {
            __helios__common__filter_list(self_130, (item_15) -> {
                fn_31(__module__AssetModule__Asset[]__from_data(item_15))
            })
        }
    };
    __helios__list[__module__AssetModule__Asset[]]__get_singleton = (self_131) -> {
        () -> {
            __module__AssetModule__Asset[]__from_data(__helios__list[__helios__data]__get_singleton(self_131)())
        }
    };
    __helios__list[__module__AssetModule__Asset[]]__zip[__module__AssetModule__Asset[]] = (self_132) -> {
        (other_3) -> {
            recurse_39 = (recurse_38, lst1, lst2) -> {
                chooseList(lst1, (callback_6) -> {
                    callback_6(true, (), (), ())
                }, (callback_5) -> {
                    chooseList(lst2, () -> {
                        callback_5(true, (), (), ())
                    }, () -> {
                        callback_5(false, __module__AssetModule__Asset[]__from_data(headList__safe(lst1)), __module__AssetModule__Asset[]__from_data(headList__safe(lst2)), recurse_38(recurse_38, tailList__safe(lst1), tailList__safe(lst2)))
                    })()
                })
            };
            recurse_39(recurse_39, self_132, other_3)
        }
    };
    __helios__list[__helios__txoutput]__fold[__helios__int] = (self_133) -> {
        (fn_32, a0_6) -> {
            __helios__common__fold(self_133, (prev_3, item_16) -> {
                fn_32(prev_3, __helios__txoutput__from_data(item_16))
            }, a0_6)
        }
    };
    __helios__list[__module__AssetModule__Asset[]]__fold[__helios__int] = (self_134) -> {
        (fn_33, a0_7) -> {
            __helios__common__fold(self_134, (prev_4, item_17) -> {
                fn_33(prev_4, __module__AssetModule__Asset[]__from_data(item_17))
            }, a0_7)
        }
    };
    __helios__list[__helios__txinput]__fold[__helios__int] = (self_135) -> {
        (fn_34, a0_8) -> {
            __helios__common__fold(self_135, (prev_5, item_18) -> {
                fn_34(prev_5, __helios__txinput__from_data(item_18))
            }, a0_8)
        }
    };
    __module__portfolio_validator__validate_reset_reduction = (portfolio0) -> {
        __helios__bool__and(() -> {
            __helios__bool____not(__module__PortfolioModule__PortfolioReduction[]__is_idle(__module__PortfolioModule__Portfolio[]__reduction(portfolio0))())
        }, () -> {
            __module__AssetGroupModule__AssetGroup[]__nothing_spent()
        })
    };
    __helios__scriptcontext__current_script = constrData(9, mkNilData(()));
    __module__Tokens__policy_1 = (__module__Tokens__policy) -> {
        param("__module__Tokens__policy(__module__Tokens__policy)", e0_3 = __helios__scriptcontext__current_script;
        ifThenElse(
            __helios__script__fund_policy____is(e0_3),
            () -> {
                (__lhs_0_18) -> {
                    __module__Tokens__direct_policy_1(__module__Tokens__direct_policy_1)
                }
            },
            () -> {
                ifThenElse(
                    __helios__script__mint_order_validator____is(e0_3),
                    () -> {
                        (__lhs_0_17) -> {
                            __module__Tokens__direct_policy_1(__module__Tokens__direct_policy_1)
                        }
                    },
                    () -> {
                        ifThenElse(
                            __helios__script__burn_order_validator____is(e0_3),
                            () -> {
                                (__lhs_0_16) -> {
                                    __module__Tokens__direct_policy_1(__module__Tokens__direct_policy_1)
                                }
                            },
                            () -> {
                                ifThenElse(
                                    __helios__script__supply_validator____is(e0_3),
                                    () -> {
                                        (__lhs_0_15) -> {
                                            __module__Tokens__indirect_policy()
                                        }
                                    },
                                    () -> {
                                        ifThenElse(
                                            __helios__script__assets_validator____is(e0_3),
                                            () -> {
                                                (__lhs_0_14) -> {
                                                    __module__Tokens__indirect_policy()
                                                }
                                            },
                                            () -> {
                                                ifThenElse(
                                                    __helios__script__portfolio_validator____is(e0_3),
                                                    () -> {
                                                        (__lhs_0_13) -> {
                                                            __module__Tokens__indirect_policy()
                                                        }
                                                    },
                                                    () -> {
                                                        ifThenElse(
                                                            __helios__script__price_validator____is(e0_3),
                                                            () -> {
                                                                (__lhs_0_12) -> {
                                                                    __module__Tokens__indirect_policy()
                                                                }
                                                            },
                                                            () -> {
                                                                ifThenElse(
                                                                    __helios__script__reimbursement_validator____is(e0_3),
                                                                    () -> {
                                                                        (__lhs_0_11) -> {
                                                                            input_2 = __helios__scriptcontext__get_current_input();
                                                                            __helios__assetclass__mph(__helios__value__get_singleton_asset_class(__helios__txinput__value(input_2))())
                                                                        }
                                                                    },
                                                                    () -> {
                                                                        ifThenElse(
                                                                            __helios__script__voucher_validator____is(e0_3),
                                                                            () -> {
                                                                                (__lhs_0_10) -> {
                                                                                    __module__Tokens__indirect_policy()
                                                                                }
                                                                            },
                                                                            () -> {
                                                                                ifThenElse(
                                                                                    __helios__script__config_validator____is(e0_3),
                                                                                    () -> {
                                                                                        (__lhs_0_9) -> {
                                                                                            __module__Tokens__indirect_policy()
                                                                                        }
                                                                                    },
                                                                                    () -> {
                                                                                        ifThenElse(
                                                                                            __helios__script__metadata_validator____is(e0_3),
                                                                                            () -> {
                                                                                                (__lhs_0_8) -> {
                                                                                                    __module__Tokens__indirect_policy()
                                                                                                }
                                                                                            },
                                                                                            () -> {
                                                                                                ifThenElse(
                                                                                                    __helios__script__oracle_delegate____is(e0_3),
                                                                                                    () -> {
                                                                                                        (__lhs_0_7) -> {
                                                                                                            __module__Tokens__direct_policy_1(__module__Tokens__direct_policy_1)
                                                                                                        }
                                                                                                    },
                                                                                                    () -> {
                                                                                                        ifThenElse(
                                                                                                            __helios__script__benchmark_delegate____is(e0_3),
                                                                                                            () -> {
                                                                                                                (__lhs_0_6) -> {
                                                                                                                    __module__Tokens__direct_policy_1(__module__Tokens__direct_policy_1)
                                                                                                                }
                                                                                                            },
                                                                                                            () -> {
                                                                                                                (__lhs_0_5) -> {
                                                                                                                    __module__Tokens__direct_policy_1(__module__Tokens__direct_policy_1)
                                                                                                                }
                                                                                                            }
                                                                                                        )()
                                                                                                    }
                                                                                                )()
                                                                                            }
                                                                                        )()
                                                                                    }
                                                                                )()
                                                                            }
                                                                        )()
                                                                    }
                                                                )()
                                                            }
                                                        )()
                                                    }
                                                )()
                                            }
                                        )()
                                    }
                                )()
                            }
                        )()
                    }
                )()
            }
        )()(e0_3))
    };
    __module__Tokens__config_1 = (__module__Tokens__config) -> {
        param("__module__Tokens__config(__module__Tokens__config)", __helios__assetclass__new(__module__Tokens__policy_1(__module__Tokens__policy_1), __module__TokenNames__config_1(__module__TokenNames__config_1)))
    };
    __module__Tokens__portfolio_1 = (__module__Tokens__portfolio) -> {
        param("__module__Tokens__portfolio(__module__Tokens__portfolio)", __helios__assetclass__new(__module__Tokens__policy_1(__module__Tokens__policy_1), __module__TokenNames__portfolio_1(__module__TokenNames__portfolio_1)))
    };
    __module__Tokens__supply_1 = (__module__Tokens__supply) -> {
        param("__module__Tokens__supply(__module__Tokens__supply)", __helios__assetclass__new(__module__Tokens__policy_1(__module__Tokens__policy_1), __module__TokenNames__supply_1(__module__TokenNames__supply_1)))
    };
    __module__Tokens__assets = (id_2) -> {
        __helios__assetclass__new(__module__Tokens__policy_1(__module__Tokens__policy_1), __module__TokenNames__assets_1(__module__TokenNames__assets_1)(id_2))
    };
    __module__Tokens__get_minted = () -> {
        __helios__value__get_policy(__helios__tx__minted(__helios__scriptcontext__tx))(__module__Tokens__policy_1(__module__Tokens__policy_1))
    };
    __module__Tokens__nothing_minted = () -> {
        __helios__map[__helios__bytearray@__helios__int]__is_empty(__module__Tokens__get_minted())()
    };
    __module__Tokens__parse_assets[__helios__txinput] = (v_2) -> {
        tokens_1 = __helios__value__get_policy(__helios__txinput__value(v_2))(__module__Tokens__policy_1(__module__Tokens__policy_1));
        chooseUnit(__helios__assert(__helios__int____eq(__helios__map[__helios__bytearray@__helios__int]__length(tokens_1), 1), "can only contain one assets token"), __helios__map[__helios__bytearray@__helios__int]__head(tokens_1)((token_name_4, qty_1) -> {
            chooseUnit(__helios__assert(__helios__int____eq(qty_1, 1), "expected only 1 assets token"), __helios__option[__helios__int]__unwrap(__module__TokenNames__parse_assets(token_name_4))())
        }))
    };
    __module__AssetGroupModule__AssetGroup[]__find_output = (id_3) -> {
        assets_token = __module__Tokens__assets(id_3);
        output_1 = __helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output) -> {
            __helios__bool__and(() -> {
                __helios__address____eq(__helios__txoutput__address(output), __module__Addresses__assets_1(__module__Addresses__assets_1))
            }, () -> {
                __module__Tokens__contains_only[__helios__txoutput](output, assets_token)
            })
        });
        __helios__data__as[__module__AssetGroupModule__AssetGroup[]](__helios__txoutputdatum__inline(__helios__txoutput__datum(output_1)))
    };
    __module__Tokens__contains_only_any_assets[__helios__txoutput] = (v_3) -> {
        tokens_2 = __helios__value__get_policy(__helios__txoutput__value(v_3))(__module__Tokens__policy_1(__module__Tokens__policy_1));
        ifThenElse(
            __helios__int____neq(__helios__map[__helios__bytearray@__helios__int]__length(tokens_2), 1),
            () -> {
                false
            },
            () -> {
                () -> {
                    __helios__map[__helios__bytearray@__helios__int]__head(tokens_2)((token_name_5, qty_2) -> {
                        ifThenElse(
                            __helios__int____neq(qty_2, 1),
                            () -> {
                                __helios__error("expected only 1 assets token")
                            },
                            () -> {
                                () -> {
                                    e0_4 = __module__TokenNames__parse_assets(token_name_5);
                                    ifThenElse(
                                        __helios__option[__helios__int]__some____is(e0_4),
                                        () -> {
                                            (__lhs_0_20) -> {
                                                true
                                            }
                                        },
                                        () -> {
                                            (__lhs_0_19) -> {
                                                false
                                            }
                                        }
                                    )()(e0_4)
                                }()
                            }
                        )()
                    })
                }()
            }
        )()
    };
    __module__AssetGroupModule__AssetGroup[]__find_output_asset = (__module__AssetGroupModule__AssetGroup[]__find_asset_1) -> {
        (asset_class_6) -> {
            result = __helios__list[__helios__txoutput]__fold_lazy[__helios__option[__module__AssetModule__Asset[]]](__helios__tx__outputs(__helios__scriptcontext__tx))((output_2, next_3) -> {
                ifThenElse(
                    __helios__address____eq(__helios__txoutput__address(output_2), __module__Addresses__assets_1(__module__Addresses__assets_1)),
                    () -> {
                        chooseUnit(__helios__assert(__module__Tokens__contains_only_any_assets[__helios__txoutput](output_2), "doesn't only contain assets token"), group = __helios__data__as[__module__AssetGroupModule__AssetGroup[]](__helios__txoutputdatum__inline(__helios__txoutput__datum(output_2)));
                        __module__AssetGroupModule__AssetGroup[]__find_asset_1(group)(asset_class_6))
                    },
                    () -> {
                        () -> {
                            next_3()
                        }()
                    }
                )()
            }, __helios__option[__module__AssetModule__Asset[]]__none____new());
            e0_5 = result;
            ifThenElse(
                __helios__option[__module__AssetModule__Asset[]]__some____is(e0_5),
                () -> {
                    (__lhs_0_22) -> {
                        asset_1 = __helios__option[__module__AssetModule__Asset[]]__some__some(__lhs_0_22);
                        asset_1
                    }
                },
                () -> {
                    (__lhs_0_21) -> {
                        __helios__error("asset not found")
                    }
                }
            )()(e0_5)
        }
    };
    __module__Tokens__contains_only_any_assets[__helios__txinput] = (v_4) -> {
        tokens_3 = __helios__value__get_policy(__helios__txinput__value(v_4))(__module__Tokens__policy_1(__module__Tokens__policy_1));
        ifThenElse(
            __helios__int____neq(__helios__map[__helios__bytearray@__helios__int]__length(tokens_3), 1),
            () -> {
                false
            },
            () -> {
                () -> {
                    __helios__map[__helios__bytearray@__helios__int]__head(tokens_3)((token_name_6, qty_3) -> {
                        ifThenElse(
                            __helios__int____neq(qty_3, 1),
                            () -> {
                                __helios__error("expected only 1 assets token")
                            },
                            () -> {
                                () -> {
                                    e0_6 = __module__TokenNames__parse_assets(token_name_6);
                                    ifThenElse(
                                        __helios__option[__helios__int]__some____is(e0_6),
                                        () -> {
                                            (__lhs_0_24) -> {
                                                true
                                            }
                                        },
                                        () -> {
                                            (__lhs_0_23) -> {
                                                false
                                            }
                                        }
                                    )()(e0_6)
                                }()
                            }
                        )()
                    })
                }()
            }
        )()
    };
    __module__AssetGroupModule__AssetGroup[]__find_input_asset = (__module__AssetGroupModule__AssetGroup[]__find_asset_2) -> {
        (asset_class_7) -> {
            result_1 = __helios__list[__helios__txinput]__fold_lazy[__helios__option[__module__AssetModule__Asset[]]](__helios__tx__inputs(__helios__scriptcontext__tx))((input_3, next_4) -> {
                ifThenElse(
                    __helios__address____eq(__helios__txinput__address(input_3), __module__Addresses__assets_1(__module__Addresses__assets_1)),
                    () -> {
                        chooseUnit(__helios__assert(__module__Tokens__contains_only_any_assets[__helios__txinput](input_3), "doesn't only contain assets token"), group_1 = __helios__data__as[__module__AssetGroupModule__AssetGroup[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_3)));
                        __module__AssetGroupModule__AssetGroup[]__find_asset_2(group_1)(asset_class_7))
                    },
                    () -> {
                        () -> {
                            next_4()
                        }()
                    }
                )()
            }, __helios__option[__module__AssetModule__Asset[]]__none____new());
            __helios__option[__module__AssetModule__Asset[]]__unwrap(result_1)()
        }
    };
    __module__AssetGroupModule__AssetGroup[]__find_single_input = () -> {
        (input_6) -> {
            id_4 = __module__Tokens__parse_assets[__helios__txinput](input_6);
            (callback_7) -> {
                callback_7(id_4, __helios__data__as[__module__AssetGroupModule__AssetGroup[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_6))))
            }
        }(e0_7 = __helios__scriptcontext__current_script;
        ifThenElse(
            __helios__script__config_validator____is(e0_7),
            () -> {
                (__lhs_0_25) -> {
                    __helios__list[__helios__txinput]__get_singleton(__helios__list[__helios__txinput]__filter(__helios__tx__inputs(__helios__scriptcontext__tx))((input_5) -> {
                        policy_tokens = __helios__value__get_policy(__helios__txinput__value(input_5))(__module__Tokens__policy_1(__module__Tokens__policy_1));
                        __helios__map[__helios__bytearray@__helios__int]__any_key(policy_tokens)((token_name_7) -> {
                            __module__TokenNames__has_assets_prefix(token_name_7)
                        })
                    }))()
                }
            },
            () -> {
                (__16) -> {
                    __helios__list[__helios__txinput]__get_singleton(__helios__list[__helios__txinput]__filter(__helios__tx__inputs(__helios__scriptcontext__tx))((input_4) -> {
                        __helios__address____eq(__helios__txinput__address(input_4), __module__Addresses__assets_1(__module__Addresses__assets_1))
                    }))()
                }
            }
        )()(e0_7))
    };
    __module__AssetGroupModule__search_for_asset_class = (asset_class_8, group_ptrs, first_id) -> {
        ref_inputs = __helios__tx__ref_inputs(__helios__scriptcontext__tx);
        __helios__list[__helios__int]__fold2[__helios__int@__helios__bool](group_ptrs)((expected_id, found_2, ptr) -> {
            input_7 = __helios__list[__helios__txinput]__get(ref_inputs)(ptr);
            id_5 = __module__Tokens__parse_assets[__helios__txinput](input_7);
            chooseUnit(__helios__assert(__helios__address____eq(__helios__txinput__address(input_7), __module__Addresses__assets_1(__module__Addresses__assets_1)), "asset group not at correct address"), chooseUnit(__helios__assert(__helios__int____eq(id_5, expected_id), "assets id doesn't match expected id (asset groups not iterated in order)"), (callback_8) -> {
                callback_8(__helios__int____add(expected_id, 1), ifThenElse(
                    found_2,
                    () -> {
                        true
                    },
                    () -> {
                        () -> {
                            group_2 = __helios__data__as[__module__AssetGroupModule__AssetGroup[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_7)));
                            __helios__list[__module__AssetModule__Asset[]]__fold_lazy[__helios__bool](__module__AssetGroupModule__AssetGroup[]__assets(group_2))((asset_2, next_5) -> {
                                ifThenElse(
                                    __helios__assetclass____eq(asset_class_8, __module__AssetModule__Asset[]__asset_class(asset_2)),
                                    () -> {
                                        true
                                    },
                                    () -> {
                                        () -> {
                                            next_5()
                                        }()
                                    }
                                )()
                            }, false)
                        }()
                    }
                )())
            }))
        }, first_id, false)((__lhs_0_26, found_1) -> {
            found_1
        })
    };
    __module__AssetGroupModule__sum_total_asset_value = (group_ptrs_1, first_id_1, max_tick) -> {
        ref_inputs_1 = __helios__tx__ref_inputs(__helios__scriptcontext__tx);
        __helios__list[__helios__int]__fold3[__helios__int@__helios__option[__helios__time]@__helios__int](group_ptrs_1)((expected_id_1, tp_1, dV_1, ptr_1) -> {
            input_8 = __helios__list[__helios__txinput]__get(ref_inputs_1)(ptr_1);
            id_6 = __module__Tokens__parse_assets[__helios__txinput](input_8);
            chooseUnit(__helios__assert(__helios__address____eq(__helios__txinput__address(input_8), __module__Addresses__assets_1(__module__Addresses__assets_1)), "asset group not at correct address"), chooseUnit(__helios__assert(__helios__int____eq(id_6, expected_id_1), "assets id doesn't match expected id (asset groups not iterated in order)"), group_3 = __helios__data__as[__module__AssetGroupModule__AssetGroup[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_8)));
            __helios__list[__module__AssetModule__Asset[]]__fold2[__helios__option[__helios__time]@__helios__int](__module__AssetGroupModule__AssetGroup[]__assets(group_3))((tp_3, dV_3, asset_3) -> {
                chooseUnit(__helios__assert(__helios__int____leq(__module__AssetModule__Asset[]__count_tick(asset_3), max_tick), "asset changed count after reduction start"), (callback_11) -> {
                    callback_11(e0_8 = tp_3;
                    ifThenElse(
                        __helios__option[__helios__time]__none____is(e0_8),
                        () -> {
                            (__lhs_0_29) -> {
                                __helios__option[__helios__time]__some____new(__module__AssetModule__Asset[]__price_timestamp(asset_3))
                            }
                        },
                        () -> {
                            (__lhs_0_28) -> {
                                tp_old = __helios__option[__helios__time]__some__some(__lhs_0_28);
                                __helios__option[__helios__time]__some____new(ifThenElse(
                                    __helios__time____lt(__module__AssetModule__Asset[]__price_timestamp(asset_3), tp_old),
                                    () -> {
                                        __module__AssetModule__Asset[]__price_timestamp(asset_3)
                                    },
                                    () -> {
                                        () -> {
                                            tp_old
                                        }()
                                    }
                                )())
                            }
                        }
                    )()(e0_8), __helios__int____add(dV_3, __module__AssetModule__Asset[]__calc_value(asset_3)()))
                })
            }, tp_1, dV_1)((tp_2, dV_2) -> {
                (callback_10) -> {
                    callback_10(__helios__int____add(expected_id_1, 1), tp_2, dV_2)
                }
            })))
        }, first_id_1, __helios__option[__helios__time]__none____new(), 0)((__lhs_0_27, tp, dV) -> {
            (callback_9) -> {
                callback_9(__helios__option[__helios__time]__unwrap(tp)(), dV)
            }
        })
    };
    __module__Tokens__contains_config[__helios__txinput] = (v_5) -> {
        __module__Tokens__contains[__helios__txinput](v_5, __module__Tokens__config_1(__module__Tokens__config_1))
    };
    __module__ConfigModule__Config[]__find = () -> {
        e0_9 = __helios__scriptcontext__current_script;
        ifThenElse(
            __helios__script__config_validator____is(e0_9),
            () -> {
                (__lhs_0_33) -> {
                    (callback_17) -> {
                        callback_17(__helios__scriptcontext__get_current_input(), true)
                    }
                }
            },
            () -> {
                ifThenElse(
                    __helios__script__mint_order_validator____is(e0_9),
                    () -> {
                        (__lhs_0_32) -> {
                            (callback_16) -> {
                                callback_16(__helios__list[__helios__txinput]__find(__helios__tx__ref_inputs(__helios__scriptcontext__tx))((input_13) -> {
                                    __helios__address____eq(__helios__txinput__address(input_13), __module__Addresses__config_1(__module__Addresses__config_1))
                                }), false)
                            }
                        }
                    },
                    () -> {
                        ifThenElse(
                            __helios__script__burn_order_validator____is(e0_9),
                            () -> {
                                (__lhs_0_31) -> {
                                    (callback_15) -> {
                                        callback_15(__helios__list[__helios__txinput]__find(__helios__tx__ref_inputs(__helios__scriptcontext__tx))((input_12) -> {
                                            __helios__address____eq(__helios__txinput__address(input_12), __module__Addresses__config_1(__module__Addresses__config_1))
                                        }), false)
                                    }
                                }
                            },
                            () -> {
                                (__17) -> {
                                    e0_10 = __helios__list[__helios__txinput]__find_safe(__helios__tx__ref_inputs(__helios__scriptcontext__tx))((input_10) -> {
                                        __helios__address____eq(__helios__txinput__address(input_10), __module__Addresses__config_1(__module__Addresses__config_1))
                                    });
                                    ifThenElse(
                                        __helios__option[__helios__txinput]__some____is(e0_10),
                                        () -> {
                                            (__lhs_0_30) -> {
                                                ref_input = __helios__option[__helios__txinput]__some__some(__lhs_0_30);
                                                (callback_14) -> {
                                                    callback_14(ref_input, false)
                                                }
                                            }
                                        },
                                        () -> {
                                            (__18) -> {
                                                (callback_13) -> {
                                                    callback_13(__helios__list[__helios__txinput]__find(__helios__tx__inputs(__helios__scriptcontext__tx))((input_11) -> {
                                                        __helios__address____eq(__helios__txinput__address(input_11), __module__Addresses__config_1(__module__Addresses__config_1))
                                                    }), true)
                                                }
                                            }
                                        }
                                    )()(e0_10)
                                }
                            }
                        )()
                    }
                )()
            }
        )()(e0_9)((input_9, is_spent) -> {
            chooseUnit(__helios__assert(__module__Tokens__contains_config[__helios__txinput](input_9), "doesn't contain the config token"), (callback_12) -> {
                callback_12(__helios__data__as[__module__ConfigModule__Config[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_9))), is_spent)
            })
        })
    };
    __module__ConfigModule__Config[]__find_input = () -> {
        (input_15) -> {
            chooseUnit(__helios__assert(__module__Tokens__contains_config[__helios__txinput](input_15), "doesn't contain the config token"), __helios__data__as[__module__ConfigModule__Config[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_15))))
        }(e0_11 = __helios__scriptcontext__current_script;
        ifThenElse(
            __helios__script__config_validator____is(e0_11),
            () -> {
                (__lhs_0_34) -> {
                    __helios__scriptcontext__get_current_input()
                }
            },
            () -> {
                (__19) -> {
                    __helios__list[__helios__txinput]__find(__helios__tx__inputs(__helios__scriptcontext__tx))((input_14) -> {
                        __helios__address____eq(__helios__txinput__address(input_14), __module__Addresses__config_1(__module__Addresses__config_1))
                    })
                }
            }
        )()(e0_11))
    };
    __module__ConfigModule__signed_by_agent = (__useopt__agent, agent) -> {
        agent_1 = ifThenElse(
            __useopt__agent,
            () -> {
                agent
            },
            () -> {
                __module__ConfigModule__Config[]__agent(__module__ConfigModule__Config[]__find_input())
            }
        )();
        __helios__tx__is_signed_by(__helios__scriptcontext__tx)(agent_1)
    };
    __module__ConfigModule__witnessed_by_oracle = (__useopt__oracle, oracle) -> {
        oracle_1 = ifThenElse(
            __useopt__oracle,
            () -> {
                oracle
            },
            () -> {
                __module__ConfigModule__Config[]__oracle(__module__ConfigModule__Config[]__find_input())
            }
        )();
        __helios__map[__helios__stakingcredential@__helios__int]__any(__helios__tx__withdrawals(__helios__scriptcontext__tx))((scred, __20) -> {
            e0_12 = scred;
            ifThenElse(
                __helios__stakingcredential__hash____is(e0_12),
                () -> {
                    (__lhs_0_35) -> {
                        h = __helios__stakingcredential__hash__hash(__lhs_0_35);
                        e0_13 = h;
                        ifThenElse(
                            __helios__stakinghash__validator____is(e0_13),
                            () -> {
                                (__lhs_0_36) -> {
                                    svh = __helios__stakinghash__validator__hash(__lhs_0_36);
                                    __helios__stakingvalidatorhash____eq(svh, oracle_1)
                                }
                            },
                            () -> {
                                (__22) -> {
                                    false
                                }
                            }
                        )()(e0_13)
                    }
                },
                () -> {
                    (__21) -> {
                        false
                    }
                }
            )()(e0_12)
        })
    };
    __module__Tokens__contains_portfolio[__helios__txinput] = (v_6) -> {
        __module__Tokens__contains[__helios__txinput](v_6, __module__Tokens__portfolio_1(__module__Tokens__portfolio_1))
    };
    __module__PortfolioModule__Portfolio[]__find_input = () -> {
        input_17 = __helios__list[__helios__txinput]__find(__helios__tx__inputs(__helios__scriptcontext__tx))((input_16) -> {
            __helios__address____eq(__helios__txinput__address(input_16), __module__Addresses__portfolio_1(__module__Addresses__portfolio_1))
        });
        chooseUnit(__helios__assert(__module__Tokens__contains_portfolio[__helios__txinput](input_17), "doesn't contain the portfolio token"), __helios__data__as[__module__PortfolioModule__Portfolio[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_17))))
    };
    __module__Tokens__contains_only_portfolio[__helios__txoutput] = (v_7) -> {
        __module__Tokens__contains_only[__helios__txoutput](v_7, __module__Tokens__portfolio_1(__module__Tokens__portfolio_1))
    };
    __module__PortfolioModule__Portfolio[]__find_output = () -> {
        output_4 = __helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output_3) -> {
            __helios__address____eq(__helios__txoutput__address(output_3), __module__Addresses__portfolio_1(__module__Addresses__portfolio_1))
        });
        chooseUnit(__helios__assert(__module__Tokens__contains_only_portfolio[__helios__txoutput](output_4), "doesn't contain only the portfolio token"), __helios__data__as[__module__PortfolioModule__Portfolio[]](__helios__txoutputdatum__inline(__helios__txoutput__datum(output_4))))
    };
    __module__PortfolioModule__Portfolio[]__find_thread = () -> {
        (callback_18) -> {
            callback_18(__module__PortfolioModule__Portfolio[]__find_input(), __module__PortfolioModule__Portfolio[]__find_output())
        }
    };
    __module__Tokens__contains_supply[__helios__txinput] = (v_8) -> {
        __module__Tokens__contains[__helios__txinput](v_8, __module__Tokens__supply_1(__module__Tokens__supply_1))
    };
    __module__SupplyModule__Supply[]__find_ref = () -> {
        input_18 = __helios__list[__helios__txinput]__find(__helios__tx__ref_inputs(__helios__scriptcontext__tx))(__module__Tokens__contains_supply[__helios__txinput]);
        __helios__data__as[__module__SupplyModule__Supply[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_18)))
    };
    __module__portfolio_validator__validate_add_asset_group = (portfolio0_1, portfolio1, added_id) -> {
        added_group = __module__AssetGroupModule__AssetGroup[]__find_output(added_id);
        __helios__bool__and(() -> {
            __helios__bool__and(() -> {
                __helios__bool__and(() -> {
                    __helios__bool__and(() -> {
                        __helios__bool__and(() -> {
                            __module__AssetGroupModule__AssetGroup[]__nothing_spent()
                        }, () -> {
                            __module__PortfolioModule__PortfolioReduction[]__is_idle(__module__PortfolioModule__Portfolio[]__reduction(portfolio0_1))()
                        })
                    }, () -> {
                        __module__PortfolioModule__PortfolioReduction[]__is_idle(__module__PortfolioModule__Portfolio[]__reduction(portfolio1))()
                    })
                }, () -> {
                    __helios__int____eq(__module__PortfolioModule__Portfolio[]__n_groups(portfolio1), added_id)
                })
            }, () -> {
                __helios__int____eq(__module__PortfolioModule__Portfolio[]__n_groups(portfolio1), __helios__int____add(__module__PortfolioModule__Portfolio[]__n_groups(portfolio0_1), 1))
            })
        }, () -> {
            __module__AssetGroupModule__AssetGroup[]__is_empty(added_group)()
        })
    };
    __module__portfolio_validator__validate_remove_asset_group = (portfolio0_2, portfolio1_1, burned_id) -> {
        __module__AssetGroupModule__AssetGroup[]__find_single_input()((removed_id, removed_group) -> {
            __helios__bool__and(() -> {
                __helios__bool__and(() -> {
                    __helios__bool__and(() -> {
                        __helios__bool__and(() -> {
                            __helios__bool__and(() -> {
                                __module__PortfolioModule__PortfolioReduction[]__is_idle(__module__PortfolioModule__Portfolio[]__reduction(portfolio0_2))()
                            }, () -> {
                                __module__PortfolioModule__PortfolioReduction[]__is_idle(__module__PortfolioModule__Portfolio[]__reduction(portfolio1_1))()
                            })
                        }, () -> {
                            __helios__int____eq(burned_id, removed_id)
                        })
                    }, () -> {
                        __helios__int____eq(__module__PortfolioModule__Portfolio[]__n_groups(portfolio0_2), removed_id)
                    })
                }, () -> {
                    __helios__int____eq(__module__PortfolioModule__Portfolio[]__n_groups(portfolio1_1), __helios__int____sub(__module__PortfolioModule__Portfolio[]__n_groups(portfolio0_2), 1))
                })
            }, () -> {
                __module__AssetGroupModule__AssetGroup[]__is_empty(removed_group)()
            })
        })
    };
    __module__portfolio_validator__validate_start_reduction = (ig1, kp1, mode1, group_ptrs_2) -> {
        supply = __module__SupplyModule__Supply[]__find_ref();
        n_groups = __helios__list[__helios__int]__length(group_ptrs_2);
        __helios__bool__and(() -> {
            __helios__bool__and(() -> {
                __module__AssetGroupModule__AssetGroup[]__nothing_spent()
            }, () -> {
                __helios__int____eq(kp1, __module__SupplyModule__Supply[]__tick(supply))
            })
        }, () -> {
            e0_14 = mode1;
            ifThenElse(
                __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue____is(e0_14),
                () -> {
                    (__lhs_0_39) -> {
                        V1 = __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__total(__lhs_0_39);
                        tp1 = __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__oldest_timestamp(__lhs_0_39);
                        __module__AssetGroupModule__sum_total_asset_value(group_ptrs_2, 1, kp1)((tp_oldest, dV_4) -> {
                            __helios__bool__and(() -> {
                                __helios__bool__and(() -> {
                                    __helios__int____eq(V1, dV_4)
                                }, () -> {
                                    __helios__time____eq(tp1, tp_oldest)
                                })
                            }, () -> {
                                __helios__int____eq(ig1, n_groups)
                            })
                        })
                    }
                },
                () -> {
                    ifThenElse(
                        __module__PortfolioModule__PortfolioReductionMode[]__Exists____is(e0_14),
                        () -> {
                            (__lhs_0_38) -> {
                                asset_class_10 = __module__PortfolioModule__PortfolioReductionMode[]__Exists__asset_class(__lhs_0_38);
                                found1 = __module__PortfolioModule__PortfolioReductionMode[]__Exists__found(__lhs_0_38);
                                found_4 = __module__AssetGroupModule__search_for_asset_class(asset_class_10, group_ptrs_2, 1);
                                __helios__bool__and(() -> {
                                    __helios__int____eq(ig1, n_groups)
                                }, () -> {
                                    __helios__bool____eq(found1, found_4)
                                })
                            }
                        },
                        () -> {
                            (__lhs_0_37) -> {
                                asset_class_9 = __module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__asset_class(__lhs_0_37);
                                found_3 = __module__AssetGroupModule__search_for_asset_class(asset_class_9, group_ptrs_2, 1);
                                __helios__bool__and(() -> {
                                    __helios__int____eq(ig1, n_groups)
                                }, () -> {
                                    __helios__bool____not(found_3)
                                })
                            }
                        }
                    )()
                }
            )()(e0_14)
        })
    };
    __module__portfolio_validator__validate_continue_reduction = (ig0, kp0, mode0, ig1_1, kp1_1, mode1_1, group_ptrs_3) -> {
        n_groups_1 = __helios__list[__helios__int]__length(group_ptrs_3);
        next_id = __helios__int____add(ig0, 1);
        __helios__bool__and(() -> {
            __helios__bool__and(() -> {
                __module__AssetGroupModule__AssetGroup[]__nothing_spent()
            }, () -> {
                __helios__int____eq(kp1_1, kp0)
            })
        }, () -> {
            e = (callback_19) -> {
                callback_19(mode0, mode1_1)
            };
            e((e0_15, e1) -> {
                ifThenElse(
                    __helios__bool__and2(__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue____is(e0_15), __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue____is(e1)),
                    () -> {
                        (__lhs_0_44) -> {
                            __lhs_0_44((__lhs_0_45, __lhs_1_2) -> {
                                __lhs_0_0_2 = __helios__common__assert_constr_index(__lhs_0_45, 0);
                                V0 = __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__total(__lhs_0_0_2);
                                tp0 = __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__oldest_timestamp(__lhs_0_0_2);
                                __lhs_0_1_3 = __helios__common__assert_constr_index(__lhs_1_2, 0);
                                V1_1 = __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__total(__lhs_0_1_3);
                                tp1_1 = __module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__oldest_timestamp(__lhs_0_1_3);
                                __module__AssetGroupModule__sum_total_asset_value(group_ptrs_3, next_id, kp1_1)((tp_oldest_1, dV_5) -> {
                                    __helios__bool__and(() -> {
                                        __helios__bool__and(() -> {
                                            __helios__int____eq(V1_1, __helios__int____add(V0, dV_5))
                                        }, () -> {
                                            __helios__time____eq(tp1_1, ifThenElse(
                                                __helios__time____lt(tp_oldest_1, tp0),
                                                () -> {
                                                    tp_oldest_1
                                                },
                                                () -> {
                                                    () -> {
                                                        tp0
                                                    }()
                                                }
                                            )())
                                        })
                                    }, () -> {
                                        __helios__int____eq(ig1_1, __helios__int____add(ig0, n_groups_1))
                                    })
                                })
                            })
                        }
                    },
                    () -> {
                        ifThenElse(
                            __helios__bool__and2(__module__PortfolioModule__PortfolioReductionMode[]__Exists____is(e0_15), __module__PortfolioModule__PortfolioReductionMode[]__Exists____is(e1)),
                            () -> {
                                (__lhs_0_42) -> {
                                    __lhs_0_42((__lhs_0_43, __lhs_1_1) -> {
                                        __lhs_0_0_1 = __helios__common__assert_constr_index(__lhs_0_43, 1);
                                        asset_class0_1 = __module__PortfolioModule__PortfolioReductionMode[]__Exists__asset_class(__lhs_0_0_1);
                                        found0 = __module__PortfolioModule__PortfolioReductionMode[]__Exists__found(__lhs_0_0_1);
                                        __lhs_0_1_2 = __helios__common__assert_constr_index(__lhs_1_1, 1);
                                        asset_class1_1 = __module__PortfolioModule__PortfolioReductionMode[]__Exists__asset_class(__lhs_0_1_2);
                                        found1_1 = __module__PortfolioModule__PortfolioReductionMode[]__Exists__found(__lhs_0_1_2);
                                        found_6 = __module__AssetGroupModule__search_for_asset_class(asset_class0_1, group_ptrs_3, next_id);
                                        __helios__bool__and(() -> {
                                            __helios__bool__and(() -> {
                                                __helios__assetclass____eq(asset_class0_1, asset_class1_1)
                                            }, () -> {
                                                __helios__int____eq(ig1_1, __helios__int____add(ig0, n_groups_1))
                                            })
                                        }, () -> {
                                            __helios__bool____eq(found1_1, __helios__bool__or(() -> {
                                                found0
                                            }, () -> {
                                                found_6
                                            }))
                                        })
                                    })
                                }
                            },
                            () -> {
                                ifThenElse(
                                    __helios__bool__and2(__module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist____is(e0_15), __module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist____is(e1)),
                                    () -> {
                                        (__lhs_0_40) -> {
                                            __lhs_0_40((__lhs_0_41, __lhs_1) -> {
                                                __lhs_0_0 = __helios__common__assert_constr_index(__lhs_0_41, 2);
                                                asset_class0 = __module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__asset_class(__lhs_0_0);
                                                __lhs_0_1_1 = __helios__common__assert_constr_index(__lhs_1, 2);
                                                asset_class1 = __module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__asset_class(__lhs_0_1_1);
                                                found_5 = __module__AssetGroupModule__search_for_asset_class(asset_class0, group_ptrs_3, next_id);
                                                __helios__bool__and(() -> {
                                                    __helios__bool__and(() -> {
                                                        __helios__assetclass____eq(asset_class0, asset_class1)
                                                    }, () -> {
                                                        __helios__int____eq(ig1_1, __helios__int____add(ig0, n_groups_1))
                                                    })
                                                }, () -> {
                                                    __helios__bool____not(found_5)
                                                })
                                            })
                                        }
                                    },
                                    () -> {
                                        (__23) -> {
                                            false
                                        }
                                    }
                                )()
                            }
                        )()
                    }
                )()
            })(e)
        })
    };
    __module__portfolio_validator__validate_add_asset_class = (config0, config_is_spent, portfolio0_3, _portfolio1) -> {
        __module__AssetGroupModule__AssetGroup[]__find_single_input()((id_7, group0) -> {
            group1 = __module__AssetGroupModule__AssetGroup[]__find_output(id_7);
            __lhs_0_46 = __helios__common__assert_constr_index(__module__PortfolioModule__Portfolio[]__get_reduction_result(portfolio0_3)(), 2);
            asset_class_11 = __module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__asset_class(__lhs_0_46);
            __lhs_0_47 = __helios__common__assert_constr_index(__module__ConfigModule__ConfigState[]__get_proposal(__module__ConfigModule__Config[]__state(config0))(), 0);
            expected_asset_class = __module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__asset_class(__lhs_0_47);
            __helios__bool__and(() -> {
                __helios__bool__and(() -> {
                    __helios__bool__and(() -> {
                        __helios__bool__and(() -> {
                            __helios__list[__module__AssetModule__Asset[]]____eq(__module__AssetGroupModule__AssetGroup[]__assets(group1), __helios__list[__module__AssetModule__Asset[]]__append(__module__AssetGroupModule__AssetGroup[]__assets(group0))(__module__AssetModule__Asset[]__new(asset_class_11)))
                        }, () -> {
                            __module__AssetGroupModule__AssetGroup[]__is_not_overfull(group1)()
                        })
                    }, () -> {
                        __helios__assetclass____eq(asset_class_11, expected_asset_class)
                    })
                }, () -> {
                    config_is_spent
                })
            }, () -> {
                __module__Tokens__nothing_minted()
            })
        })
    };
    __module__portfolio_validator__validate_remove_asset_class = (config0_1, config_is_spent_1, portfolio0_4, _portfolio1_1) -> {
        __module__AssetGroupModule__AssetGroup[]__find_single_input()((id_8, group0_1) -> {
            group1_1 = __module__AssetGroupModule__AssetGroup[]__find_output(id_8);
            __lhs_0_48 = __helios__common__assert_constr_index(__module__PortfolioModule__Portfolio[]__get_reduction_result(portfolio0_4)(), 1);
            asset_class_12 = __module__PortfolioModule__PortfolioReductionMode[]__Exists__asset_class(__lhs_0_48);
            found_7 = __module__PortfolioModule__PortfolioReductionMode[]__Exists__found(__lhs_0_48);
            __lhs_0_49 = __helios__common__assert_constr_index(__module__ConfigModule__ConfigState[]__get_proposal(__module__ConfigModule__Config[]__state(config0_1))(), 1);
            expected_asset_class_1 = __module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__asset_class(__lhs_0_49);
            asset_5 = __helios__list[__module__AssetModule__Asset[]]__get_singleton(__helios__list[__module__AssetModule__Asset[]]__filter(__module__AssetGroupModule__AssetGroup[]__assets(group0_1))((asset_4) -> {
                __helios__assetclass____eq(__module__AssetModule__Asset[]__asset_class(asset_4), asset_class_12)
            }))();
            __helios__bool__and(() -> {
                __helios__bool__and(() -> {
                    __helios__bool__and(() -> {
                        __helios__bool__and(() -> {
                            __helios__bool__and(() -> {
                                found_7
                            }, () -> {
                                __helios__int____eq(__module__AssetModule__Asset[]__count(asset_5), 0)
                            })
                        }, () -> {
                            __helios__list[__module__AssetModule__Asset[]]____eq(__module__AssetGroupModule__AssetGroup[]__assets(group1_1), __helios__list[__module__AssetModule__Asset[]]__filter(__module__AssetGroupModule__AssetGroup[]__assets(group0_1))((asset_6) -> {
                                __helios__assetclass____neq(__module__AssetModule__Asset[]__asset_class(asset_6), asset_class_12)
                            }))
                        })
                    }, () -> {
                        __helios__assetclass____eq(asset_class_12, expected_asset_class_1)
                    })
                }, () -> {
                    config_is_spent_1
                })
            }, () -> {
                __module__Tokens__nothing_minted()
            })
        })
    };
    __module__portfolio_validator__validate_update_prices = (portfolio0_5) -> {
        __helios__bool__and(() -> {
            __helios__bool__and(() -> {
                __module__PortfolioModule__PortfolioReduction[]__is_idle(__module__PortfolioModule__Portfolio[]__reduction(portfolio0_5))()
            }, () -> {
                __module__ConfigModule__witnessed_by_oracle(false, ())
            })
        }, () -> {
            __helios__list[__helios__txinput]__all(__helios__tx__inputs(__helios__scriptcontext__tx))((input_19) -> {
                ifThenElse(
                    __helios__address____eq(__helios__txinput__address(input_19), __module__Addresses__assets_1(__module__Addresses__assets_1)),
                    () -> {
                        id_9 = __module__Tokens__parse_assets[__helios__txinput](input_19);
                        group0_2 = __helios__data__as[__module__AssetGroupModule__AssetGroup[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_19)));
                        group1_2 = __module__AssetGroupModule__AssetGroup[]__find_output(id_9);
                        __helios__iterator__2__all(__helios__list[__module__AssetModule__Asset[]]__zip[__module__AssetModule__Asset[]](__module__AssetGroupModule__AssetGroup[]__assets(group0_2))(__module__AssetGroupModule__AssetGroup[]__assets(group1_2)))((asset0, asset1) -> {
                            __helios__bool__and(() -> {
                                __helios__bool__and(() -> {
                                    __helios__assetclass____eq(__module__AssetModule__Asset[]__asset_class(asset1), __module__AssetModule__Asset[]__asset_class(asset0))
                                }, () -> {
                                    __helios__int____eq(__module__AssetModule__Asset[]__count(asset1), __module__AssetModule__Asset[]__count(asset0))
                                })
                            }, () -> {
                                __helios__int____eq(__module__AssetModule__Asset[]__count_tick(asset1), __module__AssetModule__Asset[]__count_tick(asset0))
                            })
                        })
                    },
                    () -> {
                        () -> {
                            true
                        }()
                    }
                )()
            })
        })
    };
    __module__portfolio_validator__validate_move_assets = (portfolio0_6) -> {
        n_assets_in_inputs = __helios__list[__helios__txinput]__fold[__helios__int](__helios__tx__inputs(__helios__scriptcontext__tx))((n_assets, input_20) -> {
            ifThenElse(
                __helios__address____eq(__helios__txinput__address(input_20), __module__Addresses__assets_1(__module__Addresses__assets_1)),
                () -> {
                    chooseUnit(__helios__assert(__module__Tokens__contains_only_any_assets[__helios__txinput](input_20), "doesn't contain only 1 assets token"), group_4 = __helios__data__as[__module__AssetGroupModule__AssetGroup[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_20)));
                    __helios__list[__module__AssetModule__Asset[]]__fold[__helios__int](__module__AssetGroupModule__AssetGroup[]__assets(group_4))((n_assets_1, asset0_1) -> {
                        asset1_1 = __module__AssetGroupModule__AssetGroup[]__find_output_asset(__module__AssetGroupModule__AssetGroup[]__find_asset)(__module__AssetModule__Asset[]__asset_class(asset0_1));
                        chooseUnit(__helios__assert(__module__AssetModule__Asset[]____eq(asset1_1, asset0_1), "asset can't change"), __helios__int____add(n_assets_1, 1))
                    }, n_assets))
                },
                () -> {
                    () -> {
                        n_assets
                    }()
                }
            )()
        }, 0);
        n_assets_in_outputs = __helios__list[__helios__txoutput]__fold[__helios__int](__helios__tx__outputs(__helios__scriptcontext__tx))((n_assets_2, output_5) -> {
            ifThenElse(
                __helios__address____eq(__helios__txoutput__address(output_5), __module__Addresses__assets_1(__module__Addresses__assets_1)),
                () -> {
                    chooseUnit(__helios__assert(__module__Tokens__contains_only_any_assets[__helios__txoutput](output_5), "doesn't contain only 1 assets token"), group_5 = __helios__data__as[__module__AssetGroupModule__AssetGroup[]](__helios__txoutputdatum__inline(__helios__txoutput__datum(output_5)));
                    chooseUnit(__helios__assert(__module__AssetGroupModule__AssetGroup[]__is_not_overfull(group_5)(), "output assetgroup is overfull"), __helios__list[__module__AssetModule__Asset[]]__fold[__helios__int](__module__AssetGroupModule__AssetGroup[]__assets(group_5))((n_assets_3, asset1_2) -> {
                        asset0_2 = __module__AssetGroupModule__AssetGroup[]__find_input_asset(__module__AssetGroupModule__AssetGroup[]__find_asset)(__module__AssetModule__Asset[]__asset_class(asset1_2));
                        chooseUnit(__helios__assert(__module__AssetModule__Asset[]____eq(asset0_2, asset1_2), "asset can't change"), __helios__int____add(n_assets_3, 1))
                    }, n_assets_2)))
                },
                () -> {
                    () -> {
                        n_assets_2
                    }()
                }
            )()
        }, 0);
        __helios__bool__and(() -> {
            __module__PortfolioModule__PortfolioReduction[]__is_idle(__module__PortfolioModule__Portfolio[]__reduction(portfolio0_6))()
        }, () -> {
            __helios__int____eq(n_assets_in_inputs, n_assets_in_outputs)
        })
    };
    __module__portfolio_validator__main = (__24, action) -> {
        __module__ConfigModule__Config[]__find()((config0_2, config_is_spent_2) -> {
            __module__PortfolioModule__Portfolio[]__find_thread()((portfolio0_7, portfolio1_2) -> {
                minted_tokens = __module__Tokens__get_minted();
                __helios__bool__and(() -> {
                    __module__ConfigModule__signed_by_agent(false, ())
                }, () -> {
                    ifThenElse(
                        __helios__bool____not(__helios__map[__helios__bytearray@__helios__int]__is_empty(minted_tokens)()),
                        () -> {
                            chooseUnit(__helios__assert(__helios__int____eq(__helios__map[__helios__bytearray@__helios__int]__length(minted_tokens), 1), "only a single asset counter can be minted or burned"), __helios__map[__helios__bytearray@__helios__int]__head(minted_tokens)((token_name_8, qty_4) -> {
                                id_10 = __helios__option[__helios__int]__unwrap(__module__TokenNames__parse_assets(token_name_8))();
                                ifThenElse(
                                    __helios__int____eq(qty_4, 1),
                                    () -> {
                                        __module__portfolio_validator__validate_add_asset_group(portfolio0_7, portfolio1_2, id_10)
                                    },
                                    () -> {
                                        ifThenElse(
                                            __helios__int____eq(qty_4, __helios__int____neg(1)),
                                            () -> {
                                                __module__portfolio_validator__validate_remove_asset_group(portfolio0_7, portfolio1_2, id_10)
                                            },
                                            () -> {
                                                () -> {
                                                    false
                                                }()
                                            }
                                        )()
                                    }
                                )()
                            }))
                        },
                        () -> {
                            () -> {
                                __helios__bool__and(() -> {
                                    __helios__int____eq(__module__PortfolioModule__Portfolio[]__n_groups(portfolio1_2), __module__PortfolioModule__Portfolio[]__n_groups(portfolio0_7))
                                }, () -> {
                                    e_1 = (callback_20) -> {
                                        callback_20(__module__PortfolioModule__Portfolio[]__reduction(portfolio0_7), __module__PortfolioModule__Portfolio[]__reduction(portfolio1_2))
                                    };
                                    e_1((e0_16, e1_1) -> {
                                        ifThenElse(
                                            __helios__bool__and2(__module__PortfolioModule__PortfolioReduction[]__Idle____is(e0_16), __module__PortfolioModule__PortfolioReduction[]__Reducing____is(e1_1)),
                                            () -> {
                                                (__lhs_0_60) -> {
                                                    __lhs_0_60((__lhs_0_61, __lhs_1_5) -> {
                                                        __lhs_0_1_5 = __helios__common__assert_constr_index(__lhs_1_5, 1);
                                                        ig1_3 = __module__PortfolioModule__PortfolioReduction[]__Reducing__group_iter(__lhs_0_1_5);
                                                        kp1_3 = __module__PortfolioModule__PortfolioReduction[]__Reducing__start_tick(__lhs_0_1_5);
                                                        mode1_3 = __module__PortfolioModule__PortfolioReduction[]__Reducing__mode(__lhs_0_1_5);
                                                        __lhs_0_62 = __helios__common__assert_constr_index(action, 5);
                                                        ptrs_1 = __module__portfolio_validator__Action[]__Reduce__group_ptrs(__lhs_0_62);
                                                        __module__portfolio_validator__validate_start_reduction(ig1_3, kp1_3, mode1_3, ptrs_1)
                                                    })
                                                }
                                            },
                                            () -> {
                                                ifThenElse(
                                                    __helios__bool__and2(__module__PortfolioModule__PortfolioReduction[]__Reducing____is(e0_16), __module__PortfolioModule__PortfolioReduction[]__Reducing____is(e1_1)),
                                                    () -> {
                                                        (__lhs_0_57) -> {
                                                            __lhs_0_57((__lhs_0_58, __lhs_1_4) -> {
                                                                __lhs_0_0_3 = __helios__common__assert_constr_index(__lhs_0_58, 1);
                                                                ig0_1 = __module__PortfolioModule__PortfolioReduction[]__Reducing__group_iter(__lhs_0_0_3);
                                                                kp0_1 = __module__PortfolioModule__PortfolioReduction[]__Reducing__start_tick(__lhs_0_0_3);
                                                                mode0_1 = __module__PortfolioModule__PortfolioReduction[]__Reducing__mode(__lhs_0_0_3);
                                                                __lhs_0_1_4 = __helios__common__assert_constr_index(__lhs_1_4, 1);
                                                                ig1_2 = __module__PortfolioModule__PortfolioReduction[]__Reducing__group_iter(__lhs_0_1_4);
                                                                kp1_2 = __module__PortfolioModule__PortfolioReduction[]__Reducing__start_tick(__lhs_0_1_4);
                                                                mode1_2 = __module__PortfolioModule__PortfolioReduction[]__Reducing__mode(__lhs_0_1_4);
                                                                __lhs_0_59 = __helios__common__assert_constr_index(action, 5);
                                                                ptrs = __module__portfolio_validator__Action[]__Reduce__group_ptrs(__lhs_0_59);
                                                                __module__portfolio_validator__validate_continue_reduction(ig0_1, kp0_1, mode0_1, ig1_2, kp1_2, mode1_2, ptrs)
                                                            })
                                                        }
                                                    },
                                                    () -> {
                                                        (__lhs_0_50) -> {
                                                            __lhs_0_50((__lhs_0_51, __lhs_1_3) -> {
                                                                e0_17 = action;
                                                                ifThenElse(
                                                                    __module__portfolio_validator__Action[]__AddAssetClass____is(e0_17),
                                                                    () -> {
                                                                        (__lhs_0_56) -> {
                                                                            __module__portfolio_validator__validate_add_asset_class(config0_2, config_is_spent_2, portfolio0_7, portfolio1_2)
                                                                        }
                                                                    },
                                                                    () -> {
                                                                        ifThenElse(
                                                                            __module__portfolio_validator__Action[]__RemoveAssetClass____is(e0_17),
                                                                            () -> {
                                                                                (__lhs_0_55) -> {
                                                                                    __module__portfolio_validator__validate_remove_asset_class(config0_2, config_is_spent_2, portfolio0_7, portfolio1_2)
                                                                                }
                                                                            },
                                                                            () -> {
                                                                                ifThenElse(
                                                                                    __module__portfolio_validator__Action[]__UpdatePrices____is(e0_17),
                                                                                    () -> {
                                                                                        (__lhs_0_54) -> {
                                                                                            __module__portfolio_validator__validate_update_prices(portfolio0_7)
                                                                                        }
                                                                                    },
                                                                                    () -> {
                                                                                        ifThenElse(
                                                                                            __module__portfolio_validator__Action[]__MoveAssets____is(e0_17),
                                                                                            () -> {
                                                                                                (__lhs_0_53) -> {
                                                                                                    __module__portfolio_validator__validate_move_assets(portfolio0_7)
                                                                                                }
                                                                                            },
                                                                                            () -> {
                                                                                                ifThenElse(
                                                                                                    __module__portfolio_validator__Action[]__Reset____is(e0_17),
                                                                                                    () -> {
                                                                                                        (__lhs_0_52) -> {
                                                                                                            __module__portfolio_validator__validate_reset_reduction(portfolio0_7)
                                                                                                        }
                                                                                                    },
                                                                                                    () -> {
                                                                                                        (__25) -> {
                                                                                                            __helios__error("invalid action during Idle state")
                                                                                                        }
                                                                                                    }
                                                                                                )()
                                                                                            }
                                                                                        )()
                                                                                    }
                                                                                )()
                                                                            }
                                                                        )()
                                                                    }
                                                                )()(e0_17)
                                                            })
                                                        }
                                                    }
                                                )()
                                            }
                                        )()
                                    })(e_1)
                                })
                            }()
                        }
                    )()
                })
            })
        })
    };
    ifThenElse(
        __module__portfolio_validator__main(__module__PortfolioModule__Portfolio[]__from_data(__DATUM), __module__portfolio_validator__Action[]__from_data(__REDEEMER)),
        () -> {
            ()
        },
        () -> {
            __helios__error("validation returned false")
        }
    )()
    }`

    const expr = parse(src, {
        ...DEFAULT_PARSE_OPTIONS,
        errorPrefix: "",
        builtinsPrefix: ""
    })

    const [funcExprs, variables] = generateFuncTagsAndVariableIds(expr)

    const evaluator = new Evaluator({
        funcExprs,
        variables
    })

    evaluator.eval(expr)
})
