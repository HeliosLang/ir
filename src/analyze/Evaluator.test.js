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
        variables,
    })

    evaluator.eval(expr)
})