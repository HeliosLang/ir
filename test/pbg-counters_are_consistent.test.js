import { strictEqual } from "node:assert"
import { test } from "node:test"
import { DEFAULT_PARSE_OPTIONS, compile } from "../src/index.js"
import { UplcDataValue, UplcProgramV2, decodeUplcData } from "@helios-lang/uplc"
import { isLeft, isRight } from "@helios-lang/type-utils"

test("PBG::Vault::counters_are_consistent()", () => {
    const src = `(__CONTEXT) -> {
    sort = (self_2, comp_2) -> {
        recurse_3 = (recurse_2, lst_3) -> {
            __core__chooseList(
                lst_3, 
                () -> {
                    lst_3
                }, 
                () -> {
                    tail = recurse_2(recurse_2, __core__tailList__safe(lst_3));
                    x = __core__headList__safe(lst_3);
                    recurse_1 = (recurse, lst_1) -> {
                        __core__chooseList(lst_1, () -> {
                            __core__mkCons(x, lst_1)
                        }, () -> {
                            head = __core__headList__safe(lst_1);
                            __core__ifThenElse(
                                comp_2(__core__fstPair(x), __core__unIData(__core__sndPair(x)), __core__fstPair(head), __core__unIData(__core__sndPair(head))),
                                () -> {
                                    __core__mkCons(x, lst_1)
                                },
                                () -> {
                                    __core__mkCons(head, recurse(recurse, __core__tailList__safe(lst_1)))
                                }
                            )()
                        })()
                    };
                    recurse_1(recurse_1, tail)
                }
            )()
        };
        recurse_3(recurse_3, self_2)
    };
    __helios__assetclass__mph = (self_5) -> {
        __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(self_5))))
    };
    __helios__common__enum_field_1 = (self_7) -> {
        __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_7))))
    };
    __helios__assetclass____lt = (a_1, b_2) -> {
        mpha = __helios__assetclass__mph(a_1);
        mphb = __helios__assetclass__mph(b_2);
        __core__ifThenElse(
            __core__equalsByteString(mpha, mphb),
            () -> {
                __core__lessThanByteString(
                __core__unBData(__helios__common__enum_field_1(a_1)), 
                __core__unBData(__helios__common__enum_field_1(b_2)))
            },
            () -> {
                __core__lessThanByteString(mpha, mphb)
            }
        )()
    };
    __helios__value__prepend_outer = (outer_tail, mph_data, tokens) -> {
        __core__chooseList(
            tokens, 
            () -> {
                outer_tail
            }, 
            () -> {
                __core__mkCons(__core__mkPairData(mph_data, __core__mapData(tokens)), outer_tail)
            }
        )()
    };
    __helios__value__prepend_inner = (inner_tail, token_name_data, qty_data) -> {
        __core__ifThenElse(
            __core__equalsData(qty_data, __core__iData(0)),
            () -> {
                inner_tail
            },
            () -> {
                __core__mkCons(__core__mkPairData(token_name_data, qty_data), inner_tail)
            }
        )()
    };
    __helios__scriptcontext__tx = __core__headList(__core__sndPair(__core__unConstrData(__CONTEXT)));
    __helios__txinput__address = (self_14) -> {
        __core__headList(__core__sndPair(__core__unConstrData(__helios__common__enum_field_1(self_14))))
    };
    __helios__txoutputdatum__inline = (self_15) -> {
        pair = __core__unConstrData(self_15);
        __core__headList(__core__sndPair(pair))
    };
    __helios__common__enum_field_2 = (self_17) -> {
        __core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(self_17)))))
    };
    fold = (self_24, fn) -> {
        recurse_7 = (recurse_6, self_25, z_1) -> {
            __core__chooseList(self_25, () -> {
                z_1
            }, () -> {
                recurse_6(recurse_6, __core__tailList__safe(self_25), fn(z_1, __core__headList__safe(self_25)))
            })()
        };
        recurse_7(recurse_7, self_24, __core__mkNilPairData(()))
    };
    __helios__value__get_inner_map_int = (map_3, key) -> {
        recurse_9 = (recurse_8, map_4, key_1) -> {
            __core__chooseList(map_4, () -> {
                0
            }, () -> {
                __core__ifThenElse(
                    __core__equalsData(__core__fstPair(__core__headList__safe(map_4)), key_1),
                    () -> {
                        __core__unIData(__core__sndPair(__core__headList__safe(map_4)))
                    },
                    () -> {
                        recurse_8(recurse_8, __core__tailList__safe(map_4), key_1)
                    }
                )()
            })()
        };
        recurse_9(recurse_9, map_3, key)
    };
    __helios__value__merge_map_keys = (a_6, b_7) -> {
        recurse_11 = (recurse_10, map_6) -> {
            __core__chooseList(
                map_6, 
                () -> {
                    __core__mkNilData(())
                }, 
                () -> {
                    __core__mkCons(__core__fstPair(__core__headList__safe(map_6)), recurse_10(recurse_10, __core__tailList__safe(map_6)))
                }
            )()
        };
        aKeys = recurse_11(recurse_11, a_6);
        recurse_17 = (recurse_16, keys, map_7) -> {
            __core__chooseList(
                map_7, 
                () -> {
                    __core__mkNilData(())
                }, 
                () -> {
                    key_3 = __core__fstPair(__core__headList__safe(map_7));
                    __core__ifThenElse(
                        recurse_13 = (recurse_12, self_27, fn_2) -> {
                            __core__chooseList(self_27, () -> {
                                false
                            }, () -> {
                                __core__ifThenElse(
                                    fn_2(__core__headList__safe(self_27)),
                                    () -> {
                                        true
                                    },
                                    () -> {
                                        recurse_12(recurse_12, __core__tailList__safe(self_27), fn_2)
                                    }
                                )()
                            })()
                        };
                        recurse_13(recurse_13, aKeys, (item) -> {
                            __core__equalsData(item, key_3)
                        }),
                        () -> {
                            recurse_16(recurse_16, keys, __core__tailList__safe(map_7))
                        },
                        () -> {
                            __core__mkCons(key_3, recurse_16(recurse_16, keys, __core__tailList__safe(map_7)))
                        }
                    )()
                }
            )()
        };
        recurse_15 = (recurse_14, lst_5, rem) -> {
            __core__chooseList(
                rem, 
                () -> {
                    lst_5
                }, 
                () -> {
                    __core__mkCons(__core__headList__safe(rem), recurse_14(recurse_14, lst_5, __core__tailList__safe(rem)))
                }
            )()
        };
        recurse_15(recurse_15, recurse_17(recurse_17, aKeys, b_7), aKeys)
    };
    __helios__value__get_inner_map = (map_8, mph_3) -> {
        recurse_21 = (recurse_20, map_9) -> {
            __core__chooseList(map_9, () -> {
                __core__mkNilPairData(())
            }, () -> {
                __core__ifThenElse(
                    __core__equalsData(__core__fstPair(__core__headList__safe(map_9)), mph_3),
                    () -> {
                        __core__unMapData(__core__sndPair(__core__headList__safe(map_9)))
                    },
                    () -> {
                        recurse_20(recurse_20, __core__tailList__safe(map_9))
                    }
                )()
            })()
        };
        recurse_21(recurse_21, map_8)
    };
    __helios__value__add_or_subtract = (a_8, b_9, op_1) -> {
        recurse_23 = (recurse_22, keys_2, result_1) -> {
            __core__chooseList(
                keys_2, 
                () -> {
                    __core__mkNilPairData(())
                }, 
                () -> {
                    key_5 = __core__headList__safe(keys_2);
                    tail_8 = recurse_22(recurse_22, __core__tailList__safe(keys_2), __core__mkNilPairData(()));
                    a_7 = __helios__value__get_inner_map(a_8, key_5);
                    b_8 = __helios__value__get_inner_map(b_9, key_5);
                    recurse_19 = (recurse_18, keys_1, result) -> {
                        __core__chooseList(
                            keys_1, 
                            () -> {
                                __core__mkNilPairData(())
                            }, 
                            () -> {
                                key_4 = __core__headList__safe(keys_1);
                                tail_7 = recurse_18(recurse_18, __core__tailList__safe(keys_1), __core__mkNilPairData(()));
                                sum = op_1(__helios__value__get_inner_map_int(a_7, key_4), __helios__value__get_inner_map_int(b_8, key_4));
                                __core__ifThenElse(
                                    __core__equalsInteger(sum, 0),
                                    () -> {
                                        tail_7
                                    },
                                    () -> {
                                        __core__mkCons(__core__mkPairData(key_4, __core__iData(sum)), tail_7)
                                    }
                                )()
                            }
                        )()
                    };
                    item_1 = recurse_19(recurse_19, __helios__value__merge_map_keys(a_7, b_8), __core__mkNilPairData(()));
                    __core__chooseList(
                        item_1, 
                        () -> {
                            tail_8
                        }, 
                        () -> {
                            __core__mkCons(__core__mkPairData(key_5, __core__mapData(item_1)), tail_8)
                        }
                    )()
                }
            )()
        };
        recurse_23(recurse_23, __helios__value__merge_map_keys(a_8, b_9), __core__mkNilPairData(()))
    };
    __helios__bytearray__starts_with = (self_41) -> {
        __core__ifThenElse(
            __core__lessThanInteger(__core__lengthOfByteString(self_41), 7),
            () -> {
                false
            },
            () -> {
                __core__equalsByteString(#61737365747320, __core__sliceByteString(0, 7, self_41))
            }
        )()
    };
    append = (self_59, key_7, value_1) -> {
        recurse_41 = (recurse_40, lst_13) -> {
            __core__chooseList(
                lst_13, 
                () -> {
                    __core__mkCons(__core__mkPairData(key_7, __core__iData(value_1)), lst_13)
                }, 
                () -> {
                    __core__mkCons(__core__headList__safe(lst_13), recurse_40(recurse_40, __core__tailList__safe(lst_13)))
                }
            )()
        };
        recurse_41(recurse_41, self_59)
    };
    tx_inputs = __core__unListData(__core__headList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))));
    recurse_inner_3 = (recurse_inner_2, mph_data_1, inner_1, tail_3) -> {
        __core__chooseList(inner_1, () -> {
            tail_3
        }, () -> {
            token_qty = __core__headList(inner_1);
            __core__mkCons(
                __core__mkPairData(
                    __core__constrData(
                        0,
                        __core__mkCons(
                            mph_data_1,
                            __core__mkCons(
                                __core__fstPair(token_qty), 
                                __core__mkNilData(())
                            )
                        )
                    ), 
                    __core__sndPair(token_qty)
                ),
                recurse_inner_2(recurse_inner_2, mph_data_1, __core__tailList(inner_1), tail_3)
            )
        })()
    };
    recurse_outer_3 = (recurse_outer_2, outer) -> {
        __core__chooseList(outer, () -> {
            __core__mkNilPairData(())
        }, () -> {
            tail_4 = recurse_outer_2(recurse_outer_2, __core__tailList(outer));
            mph_tokens = __core__headList(outer);
            mph_data_2 = __core__fstPair(mph_tokens);
            tokens_1 = __core__unMapData(__core__sndPair(mph_tokens));
            __core__ifThenElse(
                __core__equalsData(mph_data_2, __core__bData(#)),
                () -> {
                    __core__mkCons(__core__mkPairData(__core__constrData(0, __core__mkCons(__core__bData(#), __core__mkCons(__core__bData(#), __core__mkNilData(())))), __core__sndPair(__core__headList(tokens_1))), tail_4)
                },
                () -> {
                    recurse_inner_3(recurse_inner_3, mph_data_2, tokens_1, tail_4)
                }
            )()
        })()
    };
    flat_map = recurse_outer_3(
        recurse_outer_3, 
        __helios__value__add_or_subtract(
            fold(
                __core__unListData(__helios__common__enum_field_2(__helios__scriptcontext__tx)), 
                (prev_3, output) -> {
                    __core__ifThenElse(
                        __core__equalsData(
                            __core__headList(__core__sndPair(__core__unConstrData(output))), 
                            __core__constrData(0, __core__mkCons(__core__constrData(1, __core__mkCons(__core__bData(#8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358), __core__mkNilData(()))), __core__mkCons(__core__constrData(1, __core__mkNilData(())), __core__mkNilData(()))))
                            ),
                        () -> {
                            __helios__value__add_or_subtract(prev_3, __core__unMapData(__helios__common__enum_field_1(output)), __core__addInteger)
                        },
                        () -> {
                            prev_3
                        }
                    )()
                }
            ), 
            fold(
                tx_inputs, 
                (prev_2, input_2) -> {
                    __core__ifThenElse(
                        __core__equalsData(
                            __core__headList(__core__sndPair(__core__unConstrData(__helios__txinput__address(input_2)))), 
                            __core__constrData(1, __core__mkCons(__core__bData(#8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358), __core__mkNilData(())))
                        ),
                        () -> {
                            __helios__value__add_or_subtract(prev_2, __core__unMapData(__helios__common__enum_field_1(__helios__common__enum_field_1(input_2))), __core__addInteger)
                        },
                        () -> {
                            prev_2
                        }
                    )()
                }
            ), 
            __core__subtractInteger
        )
    );
    sorted_map = sort(flat_map, (keya, _, keyb, __1) -> {
        __helios__assetclass____lt(keya, keyb)
    });
    head_2 = __core__headList(sorted_map);
    head_assetclass = __core__fstPair(head_2);
    recurse_outer_1 = (recurse_outer, flat_map_1, this_mph_data, this_token_name_data, this_qty_data) -> {
        __core__chooseList(
            flat_map_1, 
            () -> {
                __helios__value__prepend_outer(__core__mkNilPairData(()), this_mph_data, __helios__value__prepend_inner(__core__mkNilPairData(()), this_token_name_data, this_qty_data))
            }, 
            () -> {
                head_3 = __core__headList(flat_map_1);
                tail_1 = __core__tailList(flat_map_1);
                next_assetclass = __core__fstPair(head_3);
                next_mph_data = __core__headList(__core__sndPair(__core__unConstrData(next_assetclass)));
                next_token_name_data = __helios__common__enum_field_1(next_assetclass);
                next_qty_data = __core__sndPair(head_3);
                __core__ifThenElse(
                    __core__equalsData(this_mph_data, next_mph_data),
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(this_token_name_data, next_token_name_data),
                            () -> {
                                recurse_outer(recurse_outer, tail_1, this_mph_data, this_token_name_data, __core__iData(__core__addInteger(__core__unIData(this_qty_data), __core__unIData(next_qty_data))))
                            },
                            () -> {
                                recurse_inner_1 = (recurse_inner, flat_map_2, this_mph_data_1, this_token_name_data_1, this_qty_data_1) -> {
                                    __core__chooseList(
                                        flat_map_2, 
                                        () -> {
                                            (callback_2) -> {
                                                callback_2(__helios__value__prepend_inner(__core__mkNilPairData(()), this_token_name_data_1, this_qty_data_1), __core__mkNilPairData(()))
                                            }
                                        }, 
                                        () -> {
                                            head_4 = __core__headList(flat_map_2);
                                            tail_2 = __core__tailList(flat_map_2);
                                            next_assetclass_1 = __core__fstPair(head_4);
                                            next_mph_data_1 = __core__headList(__core__sndPair(__core__unConstrData(next_assetclass_1)));
                                            next_token_name_data_1 = __helios__common__enum_field_1(next_assetclass_1);
                                            next_qty_data_1 = __core__sndPair(head_4);
                                            __core__ifThenElse(
                                                __core__equalsData(this_mph_data_1, next_mph_data_1),
                                                () -> {
                                                    __core__ifThenElse(
                                                        __core__equalsData(this_token_name_data_1, next_token_name_data_1),
                                                        () -> {
                                                            recurse_inner(recurse_inner, tail_2, this_mph_data_1, this_token_name_data_1, __core__iData(__core__addInteger(__core__unIData(this_qty_data_1), __core__unIData(next_qty_data_1))))
                                                        },
                                                        () -> {
                                                            callback_tail = recurse_inner(recurse_inner, tail_2, next_mph_data_1, next_token_name_data_1, next_qty_data_1);
                                                            callback_tail((inner_tail_1, outer_tail_3) -> {
                                                                (callback_1) -> {
                                                                    callback_1(__helios__value__prepend_inner(inner_tail_1, this_token_name_data_1, this_qty_data_1), outer_tail_3)
                                                                }
                                                            })
                                                        }
                                                    )()
                                                },
                                                () -> {
                                                    outer_tail_2 = recurse_outer(recurse_outer, tail_2, next_mph_data_1, next_token_name_data_1, next_qty_data_1);
                                                    (callback) -> {
                                                        callback(__helios__value__prepend_inner(__core__mkNilPairData(()), this_token_name_data_1, this_qty_data_1), outer_tail_2)
                                                    }
                                                }
                                            )()
                                        }
                                    )()
                                };
                                recurse_inner_1(
                                    recurse_inner_1, 
                                    tail_1, 
                                    next_mph_data, 
                                    next_token_name_data, 
                                    next_qty_data
                                )(
                                    (inner_tail_2, outer_tail_4) -> {
                                        __helios__value__prepend_outer(
                                            outer_tail_4, 
                                            this_mph_data, 
                                            __helios__value__prepend_inner(inner_tail_2, this_token_name_data, this_qty_data)
                                        )
                                    }
                                )
                            }
                        )()
                    },
                    () -> {
                        __helios__value__prepend_outer(
                            recurse_outer(
                                recurse_outer, 
                                __core__tailList(flat_map_1), 
                                next_mph_data, 
                                next_token_name_data, 
                                next_qty_data
                            ), 
                            this_mph_data, 
                            __helios__value__prepend_inner(
                                __core__mkNilPairData(()), 
                                this_token_name_data, this_qty_data
                            )
                        )
                    }
                )()
            }
        )()
    };
    d = recurse_outer_1(
        recurse_outer_1, 
        __core__tailList(sorted_map),
        __core__headList(__core__sndPair(__core__unConstrData(head_assetclass))), 
        __helios__common__enum_field_1(head_assetclass), 
        __core__sndPair(head_2)
    );
    m_1 = fold(
        tx_inputs, 
        (mo, input_3) -> {
            __core__ifThenElse(
                __core__equalsData(__helios__txinput__address(input_3), __core__constrData(0, __core__mkCons(__core__constrData(1, __core__mkCons(__core__bData(#a652d053c3a8d37a8a28b5b6cdf0b1dfa3f9341098eac0e929b5d436), __core__mkNilData(()))), __core__mkCons(__core__constrData(1, __core__mkNilData(())), __core__mkNilData(()))))),
                () -> {
                    tokens_3 = (
                        recurse_5 = (recurse_4, map_2) -> {
                            __core__ifThenElse(
                                __core__equalsData(__core__fstPair(__core__headList__safe(map_2)), __core__bData(#8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358)),
                                () -> {
                                    __core__unMapData(__core__sndPair(__core__headList__safe(map_2)))
                                },
                                () -> {
                                    recurse_4(recurse_4, __core__tailList__safe(map_2))
                                }
                            )()
                        };
                        recurse_5(recurse_5, __core__unMapData(__helios__common__enum_field_1(__helios__common__enum_field_1(input_3))))
                    );
                    fn_10 = __helios__bytearray__starts_with;
                    recurse_43 = (recurse_42, self_62) -> {
                        head_15 = __core__headList__safe(self_62);
                        key_8 = __core__unBData(__core__fstPair(head_15));
                        value_2 = __core__unIData(__core__sndPair(head_15));
                        __core__ifThenElse(
                            fn_10(key_8),
                            () -> {
                                (callback_8) -> {
                                    callback_8(key_8)
                                }
                            },
                            () -> {
                                recurse_42(recurse_42, __core__tailList__safe(self_62))
                            }
                        )()
                    };
                    recurse_43(recurse_43, tokens_3)(
                        (token_name_4) -> {
                        id_3 =  __core__unIData(__core__headList(__core__sndPair(__core__unConstrData(__core__ifThenElse(
                            __helios__bytearray__starts_with(token_name_4),
                            () -> {
                                bytes_1 = __core__sliceByteString(
                                    7, 
                                    __core__subtractInteger(
                                        pos = __core__lengthOfByteString(token_name_4);
                                        __core__ifThenElse(
                                            __core__lessThanInteger(pos, 0),
                                            () -> {
                                                __core__addInteger(__core__addInteger(__core__lengthOfByteString(token_name_4), 1), pos)
                                            },
                                            () -> {
                                                pos
                                            }
                                        )(), 
                                        7
                                    ), 
                                    token_name_4
                                );
                                b0 = __core__indexByteString(bytes_1, 0);
                                recurse_33 = (recurse_32, acc, i) -> {
                                    __core__ifThenElse(
                                        __core__equalsInteger(i, __core__lengthOfByteString(bytes_1)),
                                        () -> {
                                            acc
                                        },
                                        () -> {
                                            new_acc = __core__addInteger(
                                                __core__multiplyInteger(acc, 10),
                                                __core__subtractInteger(__core__indexByteString(bytes_1, i), 48)
                                            );
                                            recurse_32(recurse_32, new_acc, __core__addInteger(i, 1))
                                        }
                                    )()
                                };
                                __core__constrData(
                                    0, 
                                    __core__mkCons(
                                        __core__iData(
                                            __core__ifThenElse(
                                                __core__equalsInteger(b0, 48),
                                                () -> {
                                                    0
                                                },
                                                () -> {
                                                    __core__ifThenElse(
                                                        __core__equalsInteger(b0, 45),
                                                        () -> {
                                                            __core__multiplyInteger(recurse_33(recurse_33, 0, 1), -1)
                                                        },
                                                        () -> {
                                                            recurse_33(recurse_33, 0, 0)
                                                        }
                                                    )()
                                                }
                                            )()
                                        ), 
                                        __core__mkNilData(())
                                    )
                                )
                            },
                            () -> {
                                __core__constrData(1, __core__mkNilData(()))
                            }
                        )()))));
                        
                        group_asset_class =  __core__constrData(
                            0,
                            __core__mkCons(
                                __core__bData(#8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358),
                                __core__mkCons(
                                    __core__bData(
                                        __core__appendByteString(
                                            #61737365747320, 
                                            __core__consByteString(__core__addInteger(__core__modInteger(id_3, 10), 48), #)
                                        )
                                    ), 
                                    __core__mkNilData(())
                                )
                            )
                        );
                        recurse_39 = (recurse_38, lst_12) -> {
                            item_3 = __core__headList__safe(lst_12);
                            __core__ifThenElse(
                                __core__equalsInteger(
                                    outer_2 = (outer_1, inner_3, map) -> {
                                        __core__chooseList(
                                            map, 
                                            () -> {
                                                0
                                            }, () -> {
                                                __core__ifThenElse(
                                                    __core__equalsData(__core__fstPair(__core__headList__safe(map)), __core__headList(__core__sndPair(__core__unConstrData(group_asset_class)))),
                                                    () -> {
                                                        inner_3(inner_3, __core__unMapData(__core__sndPair(__core__headList__safe(map))))
                                                    },
                                                    () -> {
                                                        outer_1(outer_1, inner_3, __core__tailList__safe(map))
                                                    }
                                                )()
                                            }
                                        )()
                                    };
                                    outer_2(
                                        outer_2, 
                                        (inner_4, map_1) -> {
                                            __core__chooseList(
                                                map_1, 
                                                () -> {
                                                    0
                                                }, 
                                                () -> {
                                                    __core__ifThenElse(
                                                        __core__equalsData(__core__fstPair(__core__headList__safe(map_1)), __helios__common__enum_field_1(group_asset_class)),
                                                        () -> {
                                                            __core__unIData(__core__sndPair(__core__headList__safe(map_1)))
                                                        },
                                                        () -> {
                                                            inner_4(inner_4, __core__tailList__safe(map_1))
                                                        }
                                                    )()
                                                }
                                            )()
                                        }, 
                                        __core__unMapData(__helios__common__enum_field_1(item_3))
                                    ), 
                                    1
                                ),
                                () -> {
                                    item_3
                                },
                                () -> {
                                    recurse_38(recurse_38, __core__tailList__safe(lst_12))
                                }
                            )()
                        };
                        recurse_45 = (recurse_44, iterator, z_2) -> {
                            iterator((is_null, head0, head1, next_iterator) -> {
                                __core__ifThenElse(
                                    is_null,
                                    () -> {
                                        z_2
                                    },
                                    () -> {
                                        recurse_44(
                                            recurse_44, 
                                            next_iterator,
                                            append(
                                                z_2, 
                                                __core__headList(head0), 
                                                __core__subtractInteger(
                                                    __core__unIData(__core__headList(__core__tailList(head1))), 
                                                    __core__unIData(__core__headList(__core__tailList(head0)))
                                                )
                                            )
                                        )
                                    }
                                )()
                            })
                        };
                        recurse_45(
                            recurse_45, 
                            recurse_47 = (recurse_46, lst1, lst2) -> {
                                __core__chooseList(
                                    lst1, 
                                    (callback_10) -> {
                                        callback_10(true, (), (), ())
                                    }, 
                                    (callback_9) -> {
                                        __core__chooseList(
                                            lst2, 
                                            () -> {
                                                callback_9(true, (), (), ())
                                            }, 
                                            () -> {
                                                callback_9(false, __core__unListData(__core__headList__safe(lst1)), __core__unListData(__core__headList__safe(lst2)), recurse_46(recurse_46, __core__tailList__safe(lst1), __core__tailList__safe(lst2)))
                                            }
                                        )()
                                    }
                                )
                            };
                            recurse_47(recurse_47, __core__unListData(__helios__txoutputdatum__inline(__helios__common__enum_field_2(__helios__common__enum_field_1(input_3)))), __core__unListData(__helios__txoutputdatum__inline(__helios__common__enum_field_2(recurse_39(recurse_39, __core__unListData(__helios__common__enum_field_2(__helios__scriptcontext__tx))))))), 
                            mo
                        )
                        }
                    )
                },
                () -> {
                    mo
                }
            )()
        }
    );
    flat_map_3 = append(m_1, __core__constrData(0, __core__mkCons(__core__bData(#), __core__mkCons(__core__bData(#), __core__mkNilData(())))), 0);
    dc = __core__chooseList(
        flat_map_3, 
        () -> {
            __core__mkNilPairData(())
        }, () -> {
            sorted_map_1 = sort(flat_map_3, (keya_1, __2, keyb_1, __3) -> {
                __helios__assetclass____lt(keya_1, keyb_1)
            });
            head_5 = __core__headList(sorted_map_1);
            head_assetclass_1 = __core__fstPair(head_5);
            recurse_outer_5 = (recurse_outer_4, flat_map_4, this_mph_data_2, this_token_name_data_2, this_qty_data_2) -> {
                __core__chooseList(
                    flat_map_4, 
                    () -> {
                        __helios__value__prepend_outer(__core__mkNilPairData(()), this_mph_data_2, __helios__value__prepend_inner(__core__mkNilPairData(()), this_token_name_data_2, this_qty_data_2))
                    }, 
                    () -> {
                        head_6 = __core__headList(flat_map_4);
                        tail_5 = __core__tailList(flat_map_4);
                        next_assetclass_2 = __core__fstPair(head_6);
                        next_mph_data_2 = __core__headList(__core__sndPair(__core__unConstrData(next_assetclass_2)));
                        next_token_name_data_2 = __helios__common__enum_field_1(next_assetclass_2);
                        next_qty_data_2 = __core__sndPair(head_6);
                        __core__ifThenElse(
                            __core__equalsData(this_mph_data_2, next_mph_data_2),
                            () -> {
                                recurse_inner_5 = (recurse_inner_4, flat_map_5, this_mph_data_3, this_token_name_data_3, this_qty_data_3) -> {
                                    __core__chooseList(
                                        flat_map_5, 
                                        () -> {
                                            (callback_6) -> {
                                                callback_6(__helios__value__prepend_inner(__core__mkNilPairData(()), this_token_name_data_3, this_qty_data_3), __core__mkNilPairData(()))
                                            }
                                        }, 
                                        () -> {
                                            head_7 = __core__headList(flat_map_5);
                                            tail_6 = __core__tailList(flat_map_5);
                                            next_assetclass_3 = __core__fstPair(head_7);
                                            next_mph_data_3 = __core__headList(__core__sndPair(__core__unConstrData(next_assetclass_3)));
                                            next_token_name_data_3 = __helios__common__enum_field_1(next_assetclass_3);
                                            next_qty_data_3 = __core__sndPair(head_7);
                                            __core__ifThenElse(
                                                __core__equalsData(this_mph_data_3, next_mph_data_3),
                                                () -> {
                                                    recurse_inner_4(
                                                        recurse_inner_4, 
                                                        tail_6, 
                                                        next_mph_data_3, 
                                                        next_token_name_data_3, 
                                                        next_qty_data_3
                                                    )(
                                                        (inner_tail_3, outer_tail_7) -> {
                                                            (callback_5) -> {
                                                                callback_5(__helios__value__prepend_inner(inner_tail_3, this_token_name_data_3, this_qty_data_3), outer_tail_7)
                                                            }
                                                        }
                                                    )
                                                },
                                                () -> {
                                                    (callback_4) -> {
                                                        callback_4(
                                                            __helios__value__prepend_inner(
                                                                __core__mkNilPairData(()),
                                                                this_token_name_data_3, 
                                                                this_qty_data_3
                                                            ), 
                                                            recurse_outer_4(
                                                                recurse_outer_4, 
                                                                tail_6, 
                                                                next_mph_data_3, 
                                                                next_token_name_data_3, 
                                                                next_qty_data_3
                                                            )
                                                        )
                                                    }
                                                }
                                            )()
                                        }
                                    )()
                                };
                                recurse_inner_5(
                                    recurse_inner_5, 
                                    tail_5, 
                                    next_mph_data_2, 
                                    next_token_name_data_2, 
                                    next_qty_data_2
                                )(
                                    (inner_tail_4, outer_tail_8) -> {
                                        __helios__value__prepend_outer(
                                            outer_tail_8, 
                                            this_mph_data_2, 
                                            __helios__value__prepend_inner(
                                                inner_tail_4, 
                                                this_token_name_data_2, 
                                                this_qty_data_2
                                            )
                                        )
                                    }
                                )
                            },
                            () -> {
                                __helios__value__prepend_outer(
                                    recurse_outer_4(
                                        recurse_outer_4, 
                                        __core__tailList(flat_map_4), 
                                        next_mph_data_2, 
                                        next_token_name_data_2, 
                                        next_qty_data_2
                                    ), 
                                    this_mph_data_2, 
                                    __helios__value__prepend_inner(
                                        __core__mkNilPairData(()), 
                                        this_token_name_data_2, 
                                        this_qty_data_2
                                    )
                                )
                            }
                        )()
                    }
                )()
            };
            recurse_outer_5(
                recurse_outer_5, 
                __core__tailList(sorted_map_1),
                __core__headList(__core__sndPair(__core__unConstrData(head_assetclass_1))), 
                __helios__common__enum_field_1(head_assetclass_1), 
                __core__sndPair(head_5)
            )
        }
    )();
    __core__constrData(
        __core__ifThenElse(
            __core__equalsData(__core__mapData(d), __core__mapData(dc)),
            1,
            0
        ), 
        __core__mkNilData(())
    )
}`

    const uplcProgram0 = compile(src, {
        optimize: false,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })
    const uplcProgram1 = compile(src, {
        optimize: true,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })

    const args = [
        "d8799fd8799f9fd8799fd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd87a9f581c8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358ffd87a80ffa2581c02000000000000000000000000000000000000000000000000000000a14014581c03000000000000000000000000000000000000000000000000000000a140181ed87b9f40ffd87a80ffffd8799fd8799fd8799f58200101010101010101010101010101010101010101010101010101010101010101ff00ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffffd8799fd8799fd8799f58200202020202020202020202020202020202020202020202020202020202020202ff00ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffffd8799fd8799fd8799f58200303030303030303030303030303030303030303030303030303030303030303ff00ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffffd8799fd8799fd8799f58200404040404040404040404040404040404040404040404040404040404040404ff00ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffffd8799fd8799fd8799f58200505050505050505050505050505050505050505050505050505050505050505ff00ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffffd8799fd8799fd8799f58200606060606060606060606060606060606060606060606060606060606060606ff00ffd8799fd8799fd87a9f581ca652d053c3a8d37a8a28b5b6cdf0b1dfa3f9341098eac0e929b5d436ffd87a80ffa240a1401a001e8480581c8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358a148617373657473203001d87b9f9f9fd8799f581c0000000000000000000000000000000000000000000000000000000040ff00009f0101ff187bffffffd87a80ffffd8799fd8799fd8799f58200707070707070707070707070707070707070707070707070707070707070707ff00ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffffd8799fd8799fd8799f58200808080808080808080808080808080808080808080808080808080808080808ff00ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffffd8799fd8799fd8799f58200909090909090909090909090909090909090909090909090909090909090909ff00ffd8799fd8799fd87a9f581ca652d053c3a8d37a8a28b5b6cdf0b1dfa3f9341098eac0e929b5d436ffd87a80ffa240a1401a001e8480581c8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358a148617373657473203101d87b9f9f9fd8799f581c0100000000000000000000000000000000000000000000000000000040ff0a009f0201ff187bff9fd8799f581c0200000000000000000000000000000000000000000000000000000040ff14009f0301ff187bff9fd8799f581c0300000000000000000000000000000000000000000000000000000040ff181e009f0401ff187bffffffd87a80ffffd8799fd8799fd8799f58200a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0aff00ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa240a1401a001e8480581c8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358a1582044003925778b9da674943f19e768b8a8cea0911f3dd05216cae88d785b18c08601d87980d87a80ffffff809fd8799fd8799fd87a9f581c8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358ffd87a80ffa1581c00000000000000000000000000000000000000000000000000000000a1400cd87b9f40ffd87a80ffd8799fd8799fd87a9f581c8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358ffd87a80ffa1581c01000000000000000000000000000000000000000000000000000000a14005d87b9f40ffd87a80ffd8799fd8799fd87a9f581c8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358ffd87a80ffa1581c02000000000000000000000000000000000000000000000000000000a1401819d87b9f40ffd87a80ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffd8799fd8799fd87a9f581ca652d053c3a8d37a8a28b5b6cdf0b1dfa3f9341098eac0e929b5d436ffd87a80ffa240a1401a001e8480581c8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358a148617373657473203001d87b9f9f9fd8799f581c0000000000000000000000000000000000000000000000000000000040ff0c009f0101ff187bffffffd87a80ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a001e8480d87980d87a80ffd8799fd8799fd87a9f581ca652d053c3a8d37a8a28b5b6cdf0b1dfa3f9341098eac0e929b5d436ffd87a80ffa240a1401a001e8480581c8286498706197f60a12da1b4bc0f8b8856c49d7ec62194f9966f8358a148617373657473203101d87b9f9f9fd8799f581c0100000000000000000000000000000000000000000000000000000040ff0f009f0201ff187bff9fd8799f581c0200000000000000000000000000000000000000000000000000000040ff1819009f0301ff187bff9fd8799f581c0300000000000000000000000000000000000000000000000000000040ff00009f0401ff187bffffffd87a80ffffa0a140a1400080a0d8799fd8799fd87980d87a80ffd8799fd87b80d87a80ffff80a0a0d8799f5820ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd87a9fd8799fd8799f58200a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0aff00ffffff"
    ].map((cbor) => new UplcDataValue(decodeUplcData(cbor)))

    /**
     * @param {UplcProgramV2} program
     */
    const evalProgram = (program) => {
        const res = program.eval(args)

        if (isRight(res.result)) {
            return "result: " + res.result.right.toString()
        } else if (isLeft(res.result)) {
            return "error: " + res.result.left.error
        }
    }

    strictEqual(evalProgram(uplcProgram0), evalProgram(uplcProgram1))
})
