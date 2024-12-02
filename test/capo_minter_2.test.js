import { strictEqual } from "node:assert"
import { test } from "node:test"
import { isLeft, isRight } from "@helios-lang/type-utils"
import {
    BasicUplcLogger,
    ConstrData,
    UplcDataValue,
    UplcProgramV2,
    decodeUplcData
} from "@helios-lang/uplc"
import { DEFAULT_PARSE_OPTIONS, compile } from "../src/index.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcProgramV2I} UplcProgramV2I
 */

test("unoptimized and optimized CapoMinter behave the same", () => {
    const src = `(__REDEEMER, __CONTEXT) -> {
    __helios__error = (msg) -> {
        __core__trace(msg, () -> {
            error()
        })()
    };
    __helios__assert = (cond, msg_1) -> {
        __core__ifThenElse(
            cond,
            () -> {
                ()
            },
            () -> {
                __core__trace(msg_1, () -> {
                    error()
                })()
            }
        )()
    };
    __helios__bool__or = (a, b) -> {
        __core__ifThenElse(
            a(),
            () -> {
                true
            },
            () -> {
                b()
            }
        )()
    };
    __helios__bytearray____eq = __core__equalsByteString;
    __helios__int____to_data = __core__iData;
    __helios__int__serialize = (self) -> {
        () -> {
            __core__serialiseData(__helios__int____to_data(self))
        }
    };
    __helios__print = (msg_2) -> {
        __core__trace(msg_2, ())
    };
    __helios__int__to_hex = (self_1) -> {
        () -> {
            recurse_1 = (recurse) -> {
                (self_2, bytes) -> {
                    digit = __core__modInteger(self_2, 16);
                    bytes_1 = __core__consByteString(__core__ifThenElse(
                        __core__lessThanInteger(digit, 10),
                        __core__addInteger(digit, 48),
                        __core__addInteger(digit, 87)
                    ), bytes);
                    __core__ifThenElse(
                        __core__lessThanInteger(self_2, 16),
                        () -> {
                            bytes_1
                        },
                        () -> {
                            recurse(recurse)(__core__divideInteger(self_2, 16), bytes_1)
                        }
                    )()
                }
            };
            __core__decodeUtf8__safe(__core__ifThenElse(
                __core__lessThanInteger(self_1, 0),
                () -> {
                    __core__consByteString(45, recurse_1(recurse_1)(__core__multiplyInteger(self_1, -1), #))
                },
                () -> {
                    recurse_1(recurse_1)(self_1, #)
                }
            )())
        }
    };
    __helios__bytearray__show = (self_3) -> {
        () -> {
            recurse_3 = (recurse_2, self_4) -> {
                n = __core__lengthOfByteString(self_4);
                __core__ifThenElse(
                    __core__lessThanInteger(0, n),
                    () -> {
                        __core__appendString(__core__decodeUtf8__safe(hex_bytes = __core__encodeUtf8(__helios__int__to_hex(__core__indexByteString__safe(self_4, 0))());
                        __core__ifThenElse(
                            __core__equalsInteger(__core__lengthOfByteString(hex_bytes), 1),
                            __core__consByteString(48, hex_bytes),
                            hex_bytes
                        )), recurse_2(recurse_2, __core__sliceByteString(1, n, self_4)))
                    },
                    () -> {
                        ""
                    }
                )()
            };
            recurse_3(recurse_3, self_3)
        }
    };
    __helios__mintingpolicyhash__show = __helios__bytearray__show;
    __helios__bytearray__from_data = __core__unBData;
    __helios__mintingpolicyhash__from_data = __helios__bytearray__from_data;
    __helios__common__enum_fields = (self_5) -> {
        __core__sndPair(__core__unConstrData(self_5))
    };
    __helios__common__enum_field_0 = (self_6, diag) -> {
        fields = __helios__common__enum_fields(self_6);

        __core__ifThenElse(
            __core__nullList(fields),
            () -> {
                __core__trace(__core__appendString("empty fields ", diag), () -> {
                    __core__headList(fields)
                })()
            },
            () -> {
                __core__headList(fields)
            }
        )()
    };
    __helios__common__enum_fields_after_0 = (self_7) -> {
        __core__tailList(__helios__common__enum_fields(self_7))
    };
    __helios__common__enum_field_1 = (self_8) -> {
        __core__headList(__helios__common__enum_fields_after_0(self_8))
    };
    __helios__scriptcontext__data = __CONTEXT;
    __helios__scriptcontext__purpose = __helios__common__enum_field_1(__helios__scriptcontext__data);
    __helios__scriptcontext__get_spending_purpose_output_id = () -> {
        __helios__common__enum_field_0(__helios__scriptcontext__purpose, "spending purpose output id")
    };
    __helios__scriptcontext__get_current_minting_policy_hash = () -> {
        __helios__mintingpolicyhash__from_data(__helios__scriptcontext__get_spending_purpose_output_id())
    };
    __helios__bool____not = (b_1) -> {
        __core__ifThenElse(
            b_1,
            false,
            true
        )
    };
    __helios__value__get_inner_map_int = (map, key) -> {
        recurse_5 = (recurse_4, map_1, key_1) -> {
            __core__chooseList(map_1, () -> {
                0
            }, () -> {
                __core__ifThenElse(
                    __core__equalsData(__core__fstPair(__core__headList__safe(map_1)), key_1),
                    () -> {
                        __core__unIData(__core__sndPair(__core__headList__safe(map_1)))
                    },
                    () -> {
                        recurse_4(recurse_4, __core__tailList__safe(map_1), key_1)
                    }
                )()
            })()
        };
        recurse_5(recurse_5, map, key)
    };
    __helios__common__list_0 = __core__mkNilData(());
    __helios__value__get_map_keys = (map_2) -> {
        recurse_7 = (recurse_6, map_3) -> {
            __core__chooseList(map_3, () -> {
                __helios__common__list_0
            }, () -> {
                __core__mkCons(__core__fstPair(__core__headList__safe(map_3)), recurse_6(recurse_6, __core__tailList__safe(map_3)))
            })()
        };
        recurse_7(recurse_7, map_2)
    };
    __helios__common__any = (self_9, fn) -> {
        recurse_9 = (recurse_8, self_10, fn_1) -> {
            __core__chooseList(self_10, () -> {
                false
            }, () -> {
                __core__ifThenElse(
                    fn_1(__core__headList__safe(self_10)),
                    () -> {
                        true
                    },
                    () -> {
                        recurse_8(recurse_8, __core__tailList__safe(self_10), fn_1)
                    }
                )()
            })()
        };
        recurse_9(recurse_9, self_9, fn)
    };
    __helios__common__is_in_bytearray_list = (lst, key_2) -> {
        __helios__common__any(lst, (item) -> {
            __core__equalsData(item, key_2)
        })
    };
    __helios__common__concat = (a_1, b_2) -> {
        recurse_11 = (recurse_10, lst_1, rem) -> {
            __core__chooseList(rem, () -> {
                lst_1
            }, () -> {
                __core__mkCons(__core__headList__safe(rem), recurse_10(recurse_10, lst_1, __core__tailList__safe(rem)))
            })()
        };
        recurse_11(recurse_11, b_2, a_1)
    };
    __helios__value__merge_map_keys = (a_2, b_3) -> {
        aKeys = __helios__value__get_map_keys(a_2);
        recurse_13 = (recurse_12, keys, map_4) -> {
            __core__chooseList(map_4, () -> {
                __helios__common__list_0
            }, () -> {
                key_3 = __core__fstPair(__core__headList__safe(map_4));
                __core__ifThenElse(
                    __helios__common__is_in_bytearray_list(aKeys, key_3),
                    () -> {
                        recurse_12(recurse_12, keys, __core__tailList__safe(map_4))
                    },
                    () -> {
                        __core__mkCons(key_3, recurse_12(recurse_12, keys, __core__tailList__safe(map_4)))
                    }
                )()
            })()
        };
        uniqueBKeys = recurse_13(recurse_13, aKeys, b_3);
        __helios__common__concat(aKeys, uniqueBKeys)
    };
    __helios__value__compare_inner = (comp, a_3, b_4) -> {
        recurse_15 = (recurse_14, keys_1) -> {
            __core__chooseList(keys_1, () -> {
                true
            }, () -> {
                key_4 = __core__headList__safe(keys_1);
                __core__ifThenElse(
                    __helios__bool____not(comp(__helios__value__get_inner_map_int(a_3, key_4), __helios__value__get_inner_map_int(b_4, key_4))),
                    () -> {
                        false
                    },
                    () -> {
                        recurse_14(recurse_14, __core__tailList__safe(keys_1))
                    }
                )()
            })()
        };
        recurse_15(recurse_15, __helios__value__merge_map_keys(a_3, b_4))
    };
    __helios__value__get_inner_map = (map_5, mph) -> {
        recurse_17 = (recurse_16, map_6) -> {
            __core__chooseList(map_6, () -> {
                __core__mkNilPairData(())
            }, () -> {
                __core__ifThenElse(
                    __core__equalsData(__core__fstPair(__core__headList__safe(map_6)), mph),
                    () -> {
                        __core__unMapData(__core__sndPair(__core__headList__safe(map_6)))
                    },
                    () -> {
                        recurse_16(recurse_16, __core__tailList__safe(map_6))
                    }
                )()
            })()
        };
        recurse_17(recurse_17, map_5)
    };
    __helios__value__compare = (a_4, b_5, comp_1) -> {
        recurse_19 = (recurse_18, keys_2) -> {
            __core__chooseList(keys_2, () -> {
                true
            }, () -> {
                key_5 = __core__headList__safe(keys_2);
                __core__ifThenElse(
                    __helios__bool____not(__helios__value__compare_inner(comp_1, __helios__value__get_inner_map(a_4, key_5), __helios__value__get_inner_map(b_5, key_5))),
                    () -> {
                        false
                    },
                    () -> {
                        recurse_18(recurse_18, __core__tailList__safe(keys_2))
                    }
                )()
            })()
        };
        recurse_19(recurse_19, __helios__value__merge_map_keys(a_4, b_5))
    };
    __helios__value____geq = (a_5, b_6) -> {
        __helios__value__compare(a_5, b_6, (a_qty, b_qty) -> {
            __helios__bool____not(__core__lessThanInteger(a_qty, b_qty))
        })
    };
    __helios__int____eq = __core__equalsInteger;
    __helios__string____add = __core__appendString;
    __helios__bool__show = (self_11) -> {
        () -> {
            __core__ifThenElse(
                self_11,
                "true",
                "false"
            )
        }
    };
    __helios__bool__and = (a_6, b_7) -> {
        __core__ifThenElse(
            a_6(),
            () -> {
                b_7()
            },
            () -> {
                false
            }
        )()
    };
    __helios__common__assert_constr_index = (data, i) -> {
        __core__ifThenElse(
            __core__equalsInteger(__core__fstPair(__core__unConstrData(data)), i),
            () -> {
                data
            },
            () -> {
                __helios__error("unexpected constructor index")
            }
        )()
    };
    __helios__txoutputdatum__inline = (self_12) -> {
        pair = __core__unConstrData(self_12);
        index = __core__fstPair(pair);
        fields = __core__sndPair(pair);
        __core__ifThenElse(
            __core__equalsInteger(index, 2),
            () -> {
                __core__headList(fields)
            },
            () -> {
                __helios__error("not an inline datum")
            }
        )()
    };
    __helios__common__enum_fields_after_1 = (self_13) -> {
        __core__tailList(__helios__common__enum_fields_after_0(self_13))
    };
    __helios__common__enum_field_2 = (self_14) -> {
        __core__headList(__helios__common__enum_fields_after_1(self_14))
    };
    __helios__txoutput__datum = __helios__common__enum_field_2;
    __helios__tx__outputs = (self_15) -> {
        __core__unListData(__helios__common__enum_field_2(self_15))
    };
    __helios__scriptcontext__tx = __helios__common__enum_field_0(__helios__scriptcontext__data, "scriptcontext tx");
    __helios__common____eq = __core__equalsData;
    __helios__address____eq = __helios__common____eq;
    __helios__txoutput__address = (addr) -> {__helios__common__enum_field_0(addr, "txoutput address")};
    __helios__value__contains = (self_16) -> {
        (value) -> {
            __helios__value____geq(self_16, value)
        }
    };
    __helios__txoutput__value = (self_17) -> {
        __core__unMapData(__helios__common__enum_field_1(self_17))
    };
    __helios__common__list_1 = (a_7) -> {
        __core__mkCons(a_7, __helios__common__list_0)
    };
    __helios__common__list_2 = (arg0, arg1) -> {
        __core__mkCons(arg0, __helios__common__list_1(arg1))
    };
    __helios__txoutputid__new = (tx_id, idx) -> {
        __core__constrData(0, __helios__common__list_2(tx_id, __helios__int____to_data(idx)))
    };
    __helios__string____to_data = (s) -> {
        __core__bData(__core__encodeUtf8(s))
    };
    __helios__value__ZERO = __core__mkNilPairData(());
    __helios__value__new = (assetClass, i_1) -> {
        __core__ifThenElse(
            __core__equalsInteger(0, i_1),
            () -> {
                __helios__value__ZERO
            },
            () -> {
                mph_1 = __helios__common__enum_field_0(assetClass, "asset class mph");
                tokenName = __helios__common__enum_field_1(assetClass);
                __core__mkCons(__core__mkPairData(mph_1, __core__mapData(__core__mkCons(__core__mkPairData(tokenName, __helios__int____to_data(i_1)), __core__mkNilPairData(())))), __core__mkNilPairData(()))
            }
        )()
    };
    __helios__bytearray____to_data = __core__bData;
    __helios__mintingpolicyhash____to_data = __helios__bytearray____to_data;
    __helios__assetclass__new = (mph_2, token_name) -> {
        __core__constrData(0, __helios__common__list_2(__helios__mintingpolicyhash____to_data(mph_2), __helios__bytearray____to_data(token_name)))
    };
    __helios__int____neg = (self_18) -> {
        __core__multiplyInteger(self_18, -1)
    };
    __helios__common__enum_fields_after_2 = (self_19) -> {
        __core__tailList(__helios__common__enum_fields_after_1(self_19))
    };
    __helios__common__enum_fields_after_3 = (self_20) -> {
        __core__tailList(__helios__common__enum_fields_after_2(self_20))
    };
    __helios__common__enum_field_4 = (self_21) -> {
        __core__headList(__helios__common__enum_fields_after_3(self_21))
    };
    __helios__tx__minted = (self_22) -> {
        __core__unMapData(__helios__common__enum_field_4(self_22))
    };
    __helios__common__enum_tag_equals = (data_1, i_2) -> {
        __core__equalsInteger(__core__fstPair(__core__unConstrData(data_1)), i_2)
    };
    __helios__common__length = (lst_2) -> {
        recurse_21 = (recurse_20, lst_3) -> {
            __core__chooseList(lst_3, () -> {
                0
            }, () -> {
                __core__addInteger(recurse_20(recurse_20, __core__tailList__safe(lst_3)), 1)
            })()
        };
        recurse_21(recurse_21, lst_2)
    };
    __helios__int__from_data = __core__unIData;
    __helios__common__identity = (self_23) -> {
        self_23
    };
    __helios__txid__from_data = __helios__common__identity;
    __helios__txoutputid__from_data = __helios__common__identity;
    __helios__common__test_constr_data_2 = (data_2, index_1, test_a, test_b) -> {
        __core__chooseData(data_2, () -> {
            pair_1 = __core__unConstrData__safe(data_2);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_1), index_1),
                () -> {
                    fields_1 = __core__sndPair(pair_1);
                    __core__chooseList(fields_1, () -> {
                        false
                    }, () -> {
                        __core__ifThenElse(
                            test_a(__core__headList__safe(fields_1)),
                            () -> {
                                tail = __core__tailList__safe(fields_1);
                                __core__chooseList(tail, () -> {
                                    false
                                }, () -> {
                                    __core__ifThenElse(
                                        test_b(__core__headList__safe(tail)),
                                        () -> {
                                            __core__chooseList(__core__tailList__safe(tail), () -> {
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
    __helios__bytearray__is_valid_data_fixed_length = (n_1) -> {
        (data_3) -> {
            __core__chooseData(data_3, () -> {
                false
            }, () -> {
                false
            }, () -> {
                false
            }, () -> {
                false
            }, () -> {
                bytes_2 = __core__unBData__safe(data_3);
                __core__ifThenElse(
                    __core__equalsInteger(__core__lengthOfByteString(bytes_2), n_1),
                    () -> {
                        true
                    },
                    () -> {
                        false
                    }
                )()
            })()
        }
    };
    __helios__txid__is_valid_data = (data_4) -> {
        __core__chooseData(data_4, () -> {
            pair_2 = __core__unConstrData__safe(data_4);
            index_2 = __core__fstPair(pair_2);
            fields_2 = __core__sndPair(pair_2);
            __core__ifThenElse(
                __core__equalsInteger(0, index_2),
                () -> {
                    __core__chooseList(fields_2, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_2), () -> {
                            __helios__bytearray__is_valid_data_fixed_length(32)(__core__headList__safe(fields_2))
                        }, () -> {
                            false
                        })()
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
    __helios__int__is_valid_data = (data_5) -> {
        __core__chooseData(data_5, false, false, false, true, false)
    };
    __helios__txoutputid__is_valid_data = (data_6) -> {
        __helios__common__test_constr_data_2(data_6, 0, __helios__txid__is_valid_data, __helios__int__is_valid_data)
    };
    __helios__bytearray__is_valid_data = (data_7) -> {
        __core__chooseData(data_7, false, false, false, false, true)
    };
    __helios__address__from_data = __helios__common__identity;
    __helios__validatorhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);
    __helios__pubkeyhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);
    __helios__spendingcredential__is_valid_data = (data_8) -> {
        __core__chooseData(data_8, () -> {
            pair_3 = __core__unConstrData__safe(data_8);
            index_3 = __core__fstPair(pair_3);
            fields_3 = __core__sndPair(pair_3);
            __core__ifThenElse(
                __core__equalsInteger(index_3, 0),
                () -> {
                    __core__chooseList(fields_3, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_3), () -> {
                            __helios__validatorhash__is_valid_data(__core__headList__safe(fields_3))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_3, 1),
                        () -> {
                            __core__chooseList(fields_3, () -> {
                                false
                            }, () -> {
                                __core__chooseList(__core__tailList__safe(fields_3), () -> {
                                    __helios__pubkeyhash__is_valid_data(__core__headList__safe(fields_3))
                                }, () -> {
                                    false
                                })()
                            })()
                        },
                        () -> {
                            false
                        }
                    )()
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
    __helios__common__test_list_head_data = (test_head, test_tail) -> {
        (list) -> {
            __core__chooseList(list, () -> {
                false
            }, () -> {
                __core__ifThenElse(
                    test_head(__core__headList(list)),
                    () -> {
                        test_tail(__core__tailList(list))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        }
    };
    __helios__stakinghash__is_valid_data = __helios__spendingcredential__is_valid_data;
    __helios__common__test_list_empty = (list_1) -> {
        __core__chooseList(list_1, true, false)
    };
    __helios__stakingcredential__is_valid_data = (data_9) -> {
        __core__chooseData(data_9, () -> {
            pair_4 = __core__unConstrData__safe(data_9);
            tag = __core__fstPair(pair_4);
            fields_4 = __core__sndPair(pair_4);
            __core__ifThenElse(
                __core__equalsInteger(tag, 0),
                () -> {
                    __helios__common__test_list_head_data(__helios__stakinghash__is_valid_data, __helios__common__test_list_empty)(fields_4)
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(tag, 1),
                        () -> {
                            __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_empty)))(fields_4)
                        },
                        () -> {
                            false
                        }
                    )()
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
    __helios__option[__helios__stakingcredential]__is_valid_data = (data_10) -> {
        __core__chooseData(data_10, () -> {
            pair_5 = __core__unConstrData__safe(data_10);
            index_4 = __core__fstPair(pair_5);
            fields_5 = __core__sndPair(pair_5);
            __core__ifThenElse(
                __core__equalsInteger(index_4, 0),
                () -> {
                    __core__chooseList(fields_5, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_5), () -> {
                            __helios__stakingcredential__is_valid_data(__core__headList__safe(fields_5))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_4, 1),
                        () -> {
                            __core__chooseList(fields_5, true, false)
                        },
                        () -> {
                            false
                        }
                    )()
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
    __helios__address__is_valid_data = (data_11) -> {
        __helios__common__test_constr_data_2(data_11, 0, __helios__spendingcredential__is_valid_data, __helios__option[__helios__stakingcredential]__is_valid_data)
    };
    __helios__data__constrdata____is = (data_12) -> {
        __core__chooseData(data_12, () -> {
            true
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
    __helios__int__show_digit = (x) -> {
        __core__addInteger(__core__modInteger(x, 10), 48)
    };
    __helios__int__show = (self_24) -> {
        () -> {
            __core__decodeUtf8__safe(recurse_23 = (recurse_22, i_3, bytes_3) -> {
                bytes_4 = __core__consByteString(__helios__int__show_digit(i_3), bytes_3);
                __core__ifThenElse(
                    __core__lessThanInteger(i_3, 10),
                    () -> {
                        bytes_4
                    },
                    () -> {
                        recurse_22(recurse_22, __core__divideInteger(i_3, 10), bytes_4)
                    }
                )()
            };
            __core__ifThenElse(
                __core__lessThanInteger(self_24, 0),
                () -> {
                    __core__consByteString(45, recurse_23(recurse_23, __core__multiplyInteger(self_24, -1), #))
                },
                () -> {
                    recurse_23(recurse_23, self_24, #)
                }
            )())
        }
    };
    __helios__data__constrdata__tag = (data_13) -> {
        __core__fstPair(__core__unConstrData(data_13))
    };
    __helios__tx__inputs = (self_25) -> {
        __core__unListData(__helios__common__enum_field_0(self_25, "tx inputs"))
    };
    __helios__txinput__output = __helios__common__enum_field_1;
    __helios__txinput__value = (self_26) -> {
        __helios__txoutput__value(__helios__txinput__output(self_26))
    };
    __helios__assetclass__ADA = __helios__assetclass__new(#, #);
    __helios__txinput__from_data = __helios__common__identity;
    __helios__value__contains_policy = (self_27) -> {
        (mph_3) -> {
            mph_4 = __helios__mintingpolicyhash____to_data(mph_3);
            recurse_25 = (recurse_24, map_7) -> {
                __core__chooseList(map_7, () -> {
                    false
                }, () -> {
                    __core__ifThenElse(
                        __core__equalsData(__core__fstPair(__core__headList__safe(map_7)), mph_4),
                        () -> {
                            true
                        },
                        () -> {
                            recurse_24(recurse_24, __core__tailList__safe(map_7))
                        }
                    )()
                })()
            };
            recurse_25(recurse_25, self_27)
        }
    };
    __helios__common__fold = (self_28, fn_2, z) -> {
        recurse_27 = (recurse_26, self_29, z_1) -> {
            __core__chooseList(self_29, () -> {
                z_1
            }, () -> {
                recurse_26(recurse_26, __core__tailList__safe(self_29), fn_2(z_1, __core__headList__safe(self_29)))
            })()
        };
        recurse_27(recurse_27, self_28, z)
    };
    __helios__mintingpolicyhash____eq = __helios__bytearray____eq;
    __helios__value__show = (self_30) -> {
        () -> {
            __helios__common__fold(self_30, (prev, pair_6) -> {
                mph_5 = __core__unBData__safe(__core__fstPair(pair_6));
                tokens = __core__unMapData__safe(__core__sndPair(pair_6));
                __helios__common__fold(tokens, (prev_1, pair_7) -> {
                    token_name_1 = __core__unBData__safe(__core__fstPair(pair_7));
                    qty = __core__unIData__safe(__core__sndPair(pair_7));
                    __helios__string____add(prev_1, __core__ifThenElse(
                        __helios__mintingpolicyhash____eq(mph_5, #),
                        () -> {
                            __helios__string____add("lovelace: ", __helios__string____add(__helios__int__show(qty)(), "
"))
                        },
                        () -> {
                            __helios__string____add(__helios__mintingpolicyhash__show(mph_5)(), __helios__string____add(".", __helios__string____add(__helios__bytearray__show(token_name_1)(), __helios__string____add(": ", __helios__string____add(__helios__int__show(qty)(), "
")))))
                        }
                    )())
                }, prev)
            }, "")
        }
    };
    __helios__txid__bytes = (self_31) -> {
        __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(self_31))))
    };
    __helios__txid__show = (self_32) -> {
        __helios__bytearray__show(__helios__txid__bytes(self_32))
    };
    __helios__txoutputid__tx_id = (txoutputid) -> {__helios__common__enum_field_0(txoutputid, "txoutputid tx_id")};
    __helios__txoutputid__index = (self_33) -> {
        __helios__int__from_data(__helios__common__enum_field_1(self_33))
    };
    __helios__value__get_policy = (self_34) -> {
        (mph_6) -> {
            mph_7 = __helios__mintingpolicyhash____to_data(mph_6);
            recurse_29 = (recurse_28, map_8) -> {
                __core__chooseList(map_8, () -> {
                    __helios__error("policy not found")
                }, () -> {
                    __core__ifThenElse(
                        __core__equalsData(__core__fstPair(__core__headList__safe(map_8)), mph_7),
                        () -> {
                            __core__unMapData(__core__sndPair(__core__headList__safe(map_8)))
                        },
                        () -> {
                            recurse_28(recurse_28, __core__tailList__safe(map_8))
                        }
                    )()
                })()
            };
            recurse_29(recurse_29, self_34)
        }
    };
    __helios__bytearray__decode_utf8 = (self_35) -> {
        () -> {
            __core__decodeUtf8(self_35)
        }
    };
    __helios__value__from_map = __helios__common__identity;
    __helios__value__to_map = (self_36) -> {
        () -> {
            self_36
        }
    };
    __helios__bytearray____neq = (self_37, other) -> {
        __helios__bool____not(__helios__bytearray____eq(self_37, other))
    };
    __helios__mintingpolicyhash____neq = __helios__bytearray____neq;
    __helios__value____eq = (a_8, b_8) -> {
        __helios__value__compare(a_8, b_8, __core__equalsInteger)
    };
    __helios__value__add_or_subtract_inner = (op) -> {
        (a_9, b_9) -> {
            recurse_31 = (recurse_30, keys_3, result) -> {
                __core__chooseList(keys_3, () -> {
                    result
                }, () -> {
                    key_6 = __core__headList__safe(keys_3);
                    tail_1 = recurse_30(recurse_30, __core__tailList__safe(keys_3), result);
                    sum = op(__helios__value__get_inner_map_int(a_9, key_6), __helios__value__get_inner_map_int(b_9, key_6));
                    __core__ifThenElse(
                        __core__equalsInteger(sum, 0),
                        () -> {
                            tail_1
                        },
                        () -> {
                            __core__mkCons(__core__mkPairData(key_6, __core__iData(sum)), tail_1)
                        }
                    )()
                })()
            };
            recurse_31(recurse_31, __helios__value__merge_map_keys(a_9, b_9), __core__mkNilPairData(()))
        }
    };
    __helios__value__add_or_subtract = (a_10, b_10, op_1) -> {
        recurse_33 = (recurse_32, keys_4, result_1) -> {
            __core__chooseList(keys_4, () -> {
                result_1
            }, () -> {
                key_7 = __core__headList__safe(keys_4);
                tail_2 = recurse_32(recurse_32, __core__tailList__safe(keys_4), result_1);
                item_1 = __helios__value__add_or_subtract_inner(op_1)(__helios__value__get_inner_map(a_10, key_7), __helios__value__get_inner_map(b_10, key_7));
                __core__chooseList(item_1, () -> {
                    tail_2
                }, () -> {
                    __core__mkCons(__core__mkPairData(key_7, __core__mapData(item_1)), tail_2)
                })()
            })()
        };
        recurse_33(recurse_33, __helios__value__merge_map_keys(a_10, b_10), __core__mkNilPairData(()))
    };
    __helios__value____add = (a_11, b_11) -> {
        __helios__value__add_or_subtract(a_11, b_11, __core__addInteger)
    };
    __helios__string____eq = __core__equalsString;
    __helios__string____neq = (self_38, other_1) -> {
        __helios__bool____not(__helios__string____eq(self_38, other_1))
    };
    __helios__value__is_zero_inner = (tokens_1) -> {
        recurse_35 = (recurse_34, tokens_2) -> {
            __core__chooseList(tokens_2, () -> {
                true
            }, () -> {
                __helios__bool__and(() -> {
                    __core__equalsInteger(__core__unIData(__core__sndPair(__core__headList__safe(tokens_2))), 0)
                }, () -> {
                    recurse_34(recurse_34, __core__tailList__safe(tokens_2))
                })
            })()
        };
        recurse_35(recurse_35, tokens_1)
    };
    __helios__value__is_zero = (self_39) -> {
        () -> {
            recurse_37 = (recurse_36, map_9) -> {
                __core__chooseList(map_9, () -> {
                    true
                }, () -> {
                    __helios__bool__and(() -> {
                        __helios__value__is_zero_inner(__core__unMapData(__core__sndPair(__core__headList__safe(map_9))))
                    }, () -> {
                        recurse_36(recurse_36, __core__tailList__safe(map_9))
                    })
                })()
            };
            recurse_37(recurse_37, self_39)
        }
    };
    __helios__common__insert_in_sorted = (x_1, lst_4, comp_2) -> {
        recurse_39 = (recurse_38, lst_5) -> {
            __core__chooseList(lst_5, () -> {
                __core__mkCons(x_1, lst_5)
            }, () -> {
                head = __core__headList__safe(lst_5);
                __core__ifThenElse(
                    comp_2(x_1, head),
                    () -> {
                        __core__mkCons(x_1, lst_5)
                    },
                    () -> {
                        __core__mkCons(head, recurse_38(recurse_38, __core__tailList__safe(lst_5)))
                    }
                )()
            })()
        };
        recurse_39(recurse_39, lst_4)
    };
    __helios__common__sort = (lst_6, comp_3) -> {
        recurse_41 = (recurse_40, lst_7) -> {
            __core__chooseList(lst_7, () -> {
                lst_7
            }, () -> {
                (head_1, tail_3) -> {
                    __helios__common__insert_in_sorted(head_1, tail_3, comp_3)
                }(__core__headList__safe(lst_7), recurse_40(recurse_40, __core__tailList__safe(lst_7)))
            })()
        };
        recurse_41(recurse_41, lst_6)
    };
    __helios__string__from_data = (d) -> {
        __core__decodeUtf8(__core__unBData(d))
    };
    __helios__common__map = (self_40, fn_3, init) -> {
        recurse_43 = (recurse_42, rem_1, lst_8) -> {
            __core__chooseList(rem_1, () -> {
                lst_8
            }, () -> {
                __core__mkCons(fn_3(__core__headList__safe(rem_1)), recurse_42(recurse_42, __core__tailList__safe(rem_1), lst_8))
            })()
        };
        recurse_43(recurse_43, self_40, init)
    };
    __helios__value____to_data = __core__mapData;
    __helios__value__value = __helios__common__identity;
    __helios__value__from_data = __core__unMapData;
    __helios__common__find_safe = (self_41, fn_4, callback) -> {
        recurse_45 = (recurse_44, self_42, fn_5) -> {
            __core__chooseList(self_42, () -> {
                __core__constrData(1, __helios__common__list_0)
            }, () -> {
                head_2 = __core__headList__safe(self_42);
                __core__ifThenElse(
                    fn_5(head_2),
                    () -> {
                        __core__constrData(0, __helios__common__list_1(callback(head_2)))
                    },
                    () -> {
                        recurse_44(recurse_44, __core__tailList__safe(self_42), fn_5)
                    }
                )()
            })()
        };
        recurse_45(recurse_45, self_41, fn_4)
    };
    __helios__int__max = (a_12, b_12) -> {
        __core__ifThenElse(
            __core__lessThanInteger(a_12, b_12),
            b_12,
            a_12
        )
    };
    __helios__common__slice_bytearray = (self_43, selfLengthFn) -> {
        (start, end) -> {
            normalize = (pos) -> {
                __core__ifThenElse(
                    __core__lessThanInteger(pos, 0),
                    () -> {
                        __core__addInteger(__core__addInteger(selfLengthFn(self_43), 1), pos)
                    },
                    () -> {
                        pos
                    }
                )()
            };
            fn_7 = (start_1) -> {
                fn_6 = (end_1) -> {
                    __core__sliceByteString(start_1, __core__subtractInteger(end_1, __helios__int__max(start_1, 0)), self_43)
                };
                fn_6(normalize(end))
            };
            fn_7(normalize(start))
        }
    };
    __helios__bytearray__slice = (self_44) -> {
        __helios__common__slice_bytearray(self_44, __core__lengthOfByteString)
    };
    __helios__bytearray__blake2b = (self_45) -> {
        () -> {
            __core__blake2b_256(self_45)
        }
    };
    __helios__int____gt = (a_13, b_13) -> {
        __helios__bool____not(__core__lessThanEqualsInteger(a_13, b_13))
    };
    __helios__bytearray__length = __core__lengthOfByteString;
    __helios__bytearray____add = __core__appendByteString;
    __helios__string__encode_utf8 = (self_46) -> {
        () -> {
            __core__encodeUtf8(self_46)
        }
    };
    __helios__common__serialize = (self_47) -> {
        () -> {
            __core__serialiseData(self_47)
        }
    };
    __helios__txid__serialize = __helios__common__serialize;
    __helios__data__from_data = __helios__common__identity;
    __helios__common__all = (self_48, fn_8) -> {
        recurse_47 = (recurse_46, self_49, fn_9) -> {
            __core__chooseList(self_49, () -> {
                true
            }, () -> {
                __core__ifThenElse(
                    fn_9(__core__headList__safe(self_49)),
                    () -> {
                        recurse_46(recurse_46, __core__tailList__safe(self_49), fn_9)
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_47(recurse_47, self_48, fn_8)
    };
    __helios__data__constrdata__fields = (data_14) -> {
        __core__sndPair(__core__unConstrData(data_14))
    };
    __helios__common__enum_fields_after_4 = (self_50) -> {
        __core__tailList(__helios__common__enum_fields_after_3(self_50))
    };
    __helios__common__enum_fields_after_5 = (self_51) -> {
        __core__tailList(__helios__common__enum_fields_after_4(self_51))
    };
    __helios__common__enum_fields_after_6 = (self_52) -> {
        __core__tailList(__helios__common__enum_fields_after_5(self_52))
    };
    __helios__common__enum_fields_after_7 = (self_53) -> {
        __core__tailList(__helios__common__enum_fields_after_6(self_53))
    };
    __helios__common__enum_fields_after_8 = (self_54) -> {
        __core__tailList(__helios__common__enum_fields_after_7(self_54))
    };
    __helios__common__enum_field_9 = (self_55) -> {
        __core__headList(__helios__common__enum_fields_after_8(self_55))
    };
    __helios__tx__redeemers = (self_56) -> {
        __core__unMapData(__helios__common__enum_field_9(self_56))
    };
    __helios__scriptpurpose__spending____is = (data_15) -> {
        __helios__common__enum_tag_equals(data_15, 1)
    };
    __helios__txoutputid____eq = __helios__common____eq;
    __helios__scriptpurpose__spending__output_id = (purpose) -> {__helios__common__enum_field_0(purpose, "spending purpose output id")};
    __helios__txinput__output_id = (txinput) -> {__helios__common__enum_field_0(txinput, "txinput output id")};
    __helios__common__map_get = (self_57, key_8, fnFound, fnNotFound) -> {
        recurse_49 = (recurse_48, self_58, key_9) -> {
            __core__chooseList(self_58, fnNotFound, () -> {
                head_3 = __core__headList__safe(self_58);
                __core__ifThenElse(
                    __core__equalsData(key_9, __core__fstPair(head_3)),
                    () -> {
                        fnFound(__core__sndPair(head_3))
                    },
                    () -> {
                        recurse_48(recurse_48, __core__tailList__safe(self_58), key_9)
                    }
                )()
            })()
        };
        recurse_49(recurse_49, self_57, key_8)
    };
    __helios__scriptpurpose____to_data = __helios__common__identity;
    __helios__txoutputid__show = (self_59) -> {
        () -> {
            __helios__string____add(__helios__txid__show(__helios__txoutputid__tx_id(self_59))(), __helios__string____add("#", __helios__int__show(__helios__txoutputid__index(self_59))()))
        }
    };
    __helios__txinput__datum = (self_60) -> {
        __helios__txoutput__datum(__helios__txinput__output(self_60))
    };
    __helios__common__struct_fields_after_0 = __core__tailList;
    __helios__common__struct_field_1 = (self_61) -> {
        __core__headList(__helios__common__struct_fields_after_0(self_61))
    };
    __helios__common__struct_field_0 = __core__headList;
    __helios__txoutput__is_valid_data = (data_16) -> {
        __core__chooseData(data_16, () -> {
            true
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
    __helios__txinput__is_valid_data = (data_17) -> {
        __helios__common__test_constr_data_2(data_17, 0, __helios__txoutputid__is_valid_data, __helios__txoutput__is_valid_data)
    };
    __helios__txinput____to_data = __helios__common__identity;
    __helios__common__struct_fields_after_1 = (self_62) -> {
        __core__tailList(__helios__common__struct_fields_after_0(self_62))
    };
    __helios__common__struct_field_2 = (self_63) -> {
        __core__headList(__helios__common__struct_fields_after_1(self_63))
    };
    __helios__tx__ref_inputs = (self_64) -> {
        __core__unListData(__helios__common__enum_field_1(self_64))
    };
    __helios__common__enum_field_5 = (self_65) -> {
        __core__headList(__helios__common__enum_fields_after_4(self_65))
    };
    __helios__common__enum_field_3 = (self_66) -> {
        __core__headList(__helios__common__enum_fields_after_2(self_66))
    };
    __helios__string__parse_utf8_cont_byte = (byte, callback_1) -> {
        __core__ifThenElse(
            __core__equalsInteger(__core__divideInteger(byte, 64), 2),
            () -> {
                callback_1(true, __core__modInteger(byte, 64))
            },
            () -> {
                callback_1(false, 0)
            }
        )()
    };
    __helios__string__is_valid_utf8 = (bytes_5) -> {
        n_2 = __core__lengthOfByteString(bytes_5);
        recurse_51 = (recurse_50, i_4) -> {
            __core__ifThenElse(
                __core__equalsInteger(i_4, n_2),
                () -> {
                    true
                },
                () -> {
                    b0 = __core__indexByteString__safe(bytes_5, i_4);
                    __core__ifThenElse(
                        __core__lessThanEqualsInteger(b0, 127),
                        () -> {
                            recurse_50(recurse_50, __core__addInteger(i_4, 1))
                        },
                        () -> {
                            __core__ifThenElse(
                                __core__equalsInteger(__core__divideInteger(b0, 32), 6),
                                () -> {
                                    inext_2 = __core__addInteger(i_4, 2);
                                    __core__ifThenElse(
                                        __core__lessThanEqualsInteger(inext_2, n_2),
                                        () -> {
                                            __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 1)), (valid_5, c1_2) -> {
                                                __core__ifThenElse(
                                                    valid_5,
                                                    () -> {
                                                        c_2 = __core__addInteger(__core__multiplyInteger(__core__modInteger(b0, 32), 64), c1_2);
                                                        __core__ifThenElse(
                                                            __helios__bool__and(() -> {
                                                                __core__lessThanEqualsInteger(128, c_2)
                                                            }, () -> {
                                                                __core__lessThanEqualsInteger(c_2, 2047)
                                                            }),
                                                            () -> {
                                                                recurse_50(recurse_50, inext_2)
                                                            },
                                                            () -> {
                                                                false
                                                            }
                                                        )()
                                                    },
                                                    () -> {
                                                        false
                                                    }
                                                )()
                                            })
                                        },
                                        () -> {
                                            false
                                        }
                                    )()
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __core__equalsInteger(__core__divideInteger(b0, 16), 14),
                                        () -> {
                                            inext_1 = __core__addInteger(i_4, 3);
                                            __core__ifThenElse(
                                                __core__lessThanEqualsInteger(inext_1, n_2),
                                                () -> {
                                                    __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 1)), (valid_3, c1_1) -> {
                                                        __core__ifThenElse(
                                                            valid_3,
                                                            () -> {
                                                                __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 2)), (valid_4, c2_1) -> {
                                                                    __core__ifThenElse(
                                                                        valid_4,
                                                                        () -> {
                                                                            c_1 = __core__addInteger(__core__multiplyInteger(__core__modInteger(b0, 16), 4096), __core__addInteger(__core__multiplyInteger(c1_1, 64), c2_1));
                                                                            __core__ifThenElse(
                                                                                __helios__bool__and(() -> {
                                                                                    __core__lessThanEqualsInteger(2048, c_1)
                                                                                }, () -> {
                                                                                    __core__lessThanEqualsInteger(c_1, 65535)
                                                                                }),
                                                                                () -> {
                                                                                    recurse_50(recurse_50, inext_1)
                                                                                },
                                                                                () -> {
                                                                                    false
                                                                                }
                                                                            )()
                                                                        },
                                                                        () -> {
                                                                            false
                                                                        }
                                                                    )()
                                                                })
                                                            },
                                                            () -> {
                                                                false
                                                            }
                                                        )()
                                                    })
                                                },
                                                () -> {
                                                    false
                                                }
                                            )()
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __core__equalsInteger(__core__divideInteger(b0, 8), 30),
                                                () -> {
                                                    inext = __core__addInteger(i_4, 4);
                                                    __core__ifThenElse(
                                                        __core__lessThanEqualsInteger(inext, n_2),
                                                        () -> {
                                                            __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 1)), (valid, c1) -> {
                                                                __core__ifThenElse(
                                                                    valid,
                                                                    () -> {
                                                                        __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 2)), (valid_1, c2) -> {
                                                                            __core__ifThenElse(
                                                                                valid_1,
                                                                                () -> {
                                                                                    __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 3)), (valid_2, c3) -> {
                                                                                        __core__ifThenElse(
                                                                                            valid_2,
                                                                                            () -> {
                                                                                                c = __core__addInteger(__core__multiplyInteger(__core__modInteger(b0, 8), 262144), __core__addInteger(__core__multiplyInteger(c1, 4096), __core__addInteger(__core__multiplyInteger(c2, 64), c3)));
                                                                                                __core__ifThenElse(
                                                                                                    __helios__bool__and(() -> {
                                                                                                        __core__lessThanEqualsInteger(65536, c)
                                                                                                    }, () -> {
                                                                                                        __core__lessThanEqualsInteger(c, 2097151)
                                                                                                    }),
                                                                                                    () -> {
                                                                                                        recurse_50(recurse_50, inext)
                                                                                                    },
                                                                                                    () -> {
                                                                                                        false
                                                                                                    }
                                                                                                )()
                                                                                            },
                                                                                            () -> {
                                                                                                false
                                                                                            }
                                                                                        )()
                                                                                    })
                                                                                },
                                                                                () -> {
                                                                                    false
                                                                                }
                                                                            )()
                                                                        })
                                                                    },
                                                                    () -> {
                                                                        false
                                                                    }
                                                                )()
                                                            })
                                                        },
                                                        () -> {
                                                            false
                                                        }
                                                    )()
                                                },
                                                () -> {
                                                    false
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
        };
        recurse_51(recurse_51, 0)
    };
    __helios__string__is_valid_data = (data_18) -> {
        __core__chooseData(data_18, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            __helios__string__is_valid_utf8(__core__unBData__safe(data_18))
        })()
    };
    __helios__common__filter = (self_67, fn_10, nil) -> {
        recurse_53 = (recurse_52, self_68, fn_11) -> {
            __core__chooseList(self_68, () -> {
                nil
            }, () -> {
                head_4 = __core__headList__safe(self_68);
                __core__ifThenElse(
                    fn_11(head_4),
                    () -> {
                        __core__mkCons(head_4, recurse_52(recurse_52, __core__tailList__safe(self_68), fn_11))
                    },
                    () -> {
                        recurse_52(recurse_52, __core__tailList__safe(self_68), fn_11)
                    }
                )()
            })()
        };
        recurse_53(recurse_53, self_67, fn_10)
    };
    __helios__common__filter_map = (self_69, fn_12) -> {
        __helios__common__filter(self_69, fn_12, __core__mkNilPairData(()))
    };
    __helios__int____lt = __core__lessThanInteger;
    __helios__validatorhash__show = __helios__bytearray__show;
    __helios__txoutput__sum_values = (outputs) -> {
        __helios__common__fold(outputs, (prev_2, txOutput) -> {
            __helios__value____add(prev_2, __helios__txoutput__value(txOutput))
        }, __helios__value__ZERO)
    };
    __helios__common__filter_list = (self_70, fn_13) -> {
        __helios__common__filter(self_70, fn_13, __helios__common__list_0)
    };
    __helios__tx__filter_outputs = (self_71, fn_14) -> {
        __helios__common__filter_list(__helios__tx__outputs(self_71), fn_14)
    };
    __helios__address__credential = (addr) -> {__helios__common__enum_field_0(addr, "address credential")};
    __helios__spendingcredential__is_validator = (self_72) -> {
        __core__equalsInteger(__core__fstPair(__core__unConstrData(self_72)), 1)
    };
    __helios__validatorhash____eq = __helios__bytearray____eq;
    __helios__validatorhash__from_data = __helios__bytearray__from_data;
    __helios__spendingcredential__validator__hash = (self_73) -> {
        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_73, "spending cred validator hash"))
    };
    __helios__spendingcredential__validator__cast = (data_19) -> {
        __helios__common__assert_constr_index(data_19, 1)
    };
    __helios__txoutput__is_locked_by = (self_74) -> {
        (hash) -> {
            credential = __helios__address__credential(__helios__txoutput__address(self_74));
            __core__ifThenElse(
                __helios__spendingcredential__is_validator(credential),
                () -> {
                    __helios__validatorhash____eq(hash, __helios__spendingcredential__validator__hash(__helios__spendingcredential__validator__cast(credential)))
                },
                () -> {
                    false
                }
            )()
        }
    };
    __helios__tx__outputs_locked_by = (self_75) -> {
        (vh) -> {
            __helios__tx__filter_outputs(self_75, (output) -> {
                __helios__txoutput__is_locked_by(output)(vh)
            })
        }
    };
    __helios__tx__value_locked_by = (self_76) -> {
        (vh_1) -> {
            __helios__txoutput__sum_values(__helios__tx__outputs_locked_by(self_76)(vh_1))
        }
    };
    __helios__txoutput__from_data = __helios__common__identity;
    __helios__spendingcredential____eq = __helios__common____eq;
    __helios__txinput__address = (self_77) -> {
        __helios__txoutput__address(__helios__txinput__output(self_77))
    };
    __helios__validatorhash____to_data = __helios__bytearray____to_data;
    __helios__spendingcredential__new_validator = (hash_1) -> {
        __core__constrData(1, __helios__common__list_1(__helios__validatorhash____to_data(hash_1)))
    };
    __helios__option__NONE = __core__constrData(1, __helios__common__list_0);
    __helios__struct____to_data = __core__listData;
    __helios__data__is_valid_data = (data_20) -> {
        true
    };
    __helios__scriptpurpose__from_data = __helios__common__identity;
    __module__StellarHeliosHelpers__TODO = (task) -> {
        __helios__print(__helios__string____add(__helios__string____add("  🟥  😳💦  TODO: ", task), "
"))
    };
    __module__StellarHeliosHelpers__REQT = (reqt) -> {
        __helios__print(__helios__string____add(__helios__string____add("❗ ", reqt), "
"))
    };
    __module__StellarHeliosHelpers__mkTv = (mph_8, __useopt__tn, tn, __useopt__tnBytes, tnBytes, __useopt__count, count) -> {
        tn_1 = __core__ifThenElse(
            __useopt__tn,
            () -> {
                tn
            },
            () -> {
                ""
            }
        )();
        tnBytes_1 = __core__ifThenElse(
            __useopt__tnBytes,
            () -> {
                tnBytes
            },
            () -> {
                __helios__string__encode_utf8(tn_1)()
            }
        )();
        count_1 = __core__ifThenElse(
            __useopt__count,
            () -> {
                count
            },
            () -> {
                1
            }
        )();
        __core__chooseUnit(__helios__assert(__helios__int____gt(__helios__bytearray__length(tnBytes_1), 0), "missing reqd tn or tnBytes"), __helios__value__new(__helios__assetclass__new(mph_8, tnBytes_1), count_1))
    };
    __module__StellarHeliosHelpers__tvCharter = (mph_9) -> {
        __module__StellarHeliosHelpers__mkTv(mph_9, true, "charter", false, (), false, ())
    };
    __helios__list[__helios__txoutput]__find = (self_78) -> {
        (fn_15) -> {
            recurse_55 = (recurse_54, lst_9) -> {
                __core__chooseList(lst_9, () -> {
                    __helios__error("not found")
                }, () -> {
                    item_2 = __helios__txoutput__from_data(__core__headList__safe(lst_9));
                    __core__ifThenElse(
                        fn_15(item_2),
                        () -> {
                            item_2
                        },
                        () -> {
                            recurse_54(recurse_54, __core__tailList__safe(lst_9))
                        }
                    )()
                })()
            };
            recurse_55(recurse_55, self_78)
        }
    };
    __helios__map[__helios__bytearray@__helios__int]__is_valid_data_internal = (map_10) -> {
        recurse_57 = (recurse_56, map_11) -> {
            __core__chooseList(map_11, () -> {
                true
            }, () -> {
                head_5 = __core__headList__safe(map_11);
                __core__ifThenElse(
                    __helios__bytearray__is_valid_data(__core__fstPair(head_5)),
                    () -> {
                        __core__ifThenElse(
                            __helios__int__is_valid_data(__core__sndPair(head_5)),
                            () -> {
                                recurse_56(recurse_56, __core__tailList__safe(map_11))
                            },
                            () -> {
                                false
                            }
                        )()
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_57(recurse_57, map_10)
    };
    __helios__map[__helios__bytearray@__helios__int]__from_data = (data_21) -> {
        map_12 = __core__unMapData(data_21);
        _ = __core__ifThenElse(
            __helios__map[__helios__bytearray@__helios__int]__is_valid_data_internal(map_12),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid map data", ())
            }
        )();
        map_12
    };
    __helios__map[__helios__scriptpurpose@__helios__data]__get = (self_79) -> {
        (key_10) -> {
            __helios__common__map_get(self_79, __helios__scriptpurpose____to_data(key_10), (x_2) -> {
                __helios__data__from_data(x_2)
            }, () -> {
                __helios__error("key not found")
            })
        }
    };
    __helios__map[__helios__scriptpurpose@__helios__data]__find_key = (self_80) -> {
        (fn_16) -> {
            recurse_59 = (recurse_58, map_13) -> {
                __core__chooseList(map_13, () -> {
                    __helios__error("not found")
                }, () -> {
                    item_3 = __helios__scriptpurpose__from_data(__core__fstPair(__core__headList__safe(map_13)));
                    __core__ifThenElse(
                        fn_16(item_3),
                        () -> {
                            item_3
                        },
                        () -> {
                            recurse_58(recurse_58, __core__tailList__safe(map_13))
                        }
                    )()
                })()
            };
            recurse_59(recurse_59, self_80)
        }
    };
    __module__StellarHeliosHelpers__mustFindInputRedeemer = (txInput) -> {
        targetId = __helios__txinput__output_id(txInput);
        redeemers = __helios__tx__redeemers(__helios__scriptcontext__tx);
        spendsExpectedInput = __helios__map[__helios__scriptpurpose@__helios__data]__find_key(redeemers)((purpose) -> {
            __cond = purpose;
            __core__ifThenElse(
                __helios__scriptpurpose__spending____is(__cond),
                () -> {
                    (sp) -> {
                        __helios__txoutputid____eq(__helios__scriptpurpose__spending__output_id(sp), targetId)
                    }
                },
                () -> {
                    (__1) -> {
                        false
                    }
                }
            )()(__cond)
        });
        __helios__map[__helios__scriptpurpose@__helios__data]__get(redeemers)(spendsExpectedInput)
    };
    __helios__list[__helios__data]__head = (self_81) -> {
        __helios__data__from_data(__core__headList(self_81))
    };
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data = (__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data) -> {
        (data_22) -> {
            __core__ifThenElse(
                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data(data_22),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data(data_22),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data(data_22),
                                () -> {
                                    true
                                },
                                () -> {
                                    false
                                }
                            )()
                        }
                    )()
                }
            )()
        }
    };
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__from_data = (__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_1) -> {
        (data_23) -> {
            ignore = __core__ifThenElse(
                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_1)(data_23),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid DelegateLifecycleActivity data", ())
                }
            )();
            data_23
        }
    };
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is = (data_24) -> {
        __helios__common__enum_tag_equals(data_24, 0)
    };
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2 = (data_25) -> {
        __core__chooseData(data_25, () -> {
            pair_8 = __core__unConstrData__safe(data_25);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_8), 0),
                () -> {
                    data_26 = __core__listData(__core__sndPair(pair_8));
                    __core__chooseData(data_26, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_6 = __core__unListData__safe(data_26);
                        __core__chooseList(fields_6, () -> {
                            false
                        }, () -> {
                            head_6 = __core__headList__safe(fields_6);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_6),
                                () -> {
                                    fields_7 = __core__tailList__safe(fields_6);
                                    __core__chooseList(fields_7, () -> {
                                        false
                                    }, () -> {
                                        head_7 = __core__headList__safe(fields_7);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_7),
                                            () -> {
                                                fields_8 = __core__tailList__safe(fields_7);
                                                __core__chooseList(fields_8, true, false)
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
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring____is = (data_27) -> {
        __helios__common__enum_tag_equals(data_27, 1)
    };
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2 = (data_28) -> {
        __core__chooseData(data_28, () -> {
            pair_9 = __core__unConstrData__safe(data_28);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_9), 1),
                () -> {
                    data_29 = __core__listData(__core__sndPair(pair_9));
                    __core__chooseData(data_29, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_9 = __core__unListData__safe(data_29);
                        __core__chooseList(fields_9, true, false)
                    }, () -> {
                        false
                    }, () -> {
                        false
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
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2 = (data_30) -> {
        __core__chooseData(data_30, () -> {
            pair_10 = __core__unConstrData__safe(data_30);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_10), 2),
                () -> {
                    data_31 = __core__listData(__core__sndPair(pair_10));
                    __core__chooseData(data_31, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_10 = __core__unListData__safe(data_31);
                        __core__chooseList(fields_10, true, false)
                    }, () -> {
                        false
                    }, () -> {
                        false
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
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data = (__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data) -> {
        (data_32) -> {
            __core__ifThenElse(
                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data(data_32),
                () -> {
                    true
                },
                () -> {
                    false
                }
            )()
        }
    };
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__from_data = (__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_1) -> {
        (data_33) -> {
            ignore_1 = __core__ifThenElse(
                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_1)(data_33),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid CapoLifecycleActivity data", ())
                }
            )();
            data_33
        }
    };
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2 = (data_34) -> {
        __core__chooseData(data_34, () -> {
            pair_11 = __core__unConstrData__safe(data_34);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_11), 0),
                () -> {
                    data_35 = __core__listData(__core__sndPair(pair_11));
                    __core__chooseData(data_35, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_11 = __core__unListData__safe(data_35);
                        __core__chooseList(fields_11, () -> {
                            false
                        }, () -> {
                            head_8 = __core__headList__safe(fields_11);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_8),
                                () -> {
                                    fields_12 = __core__tailList__safe(fields_11);
                                    __core__chooseList(fields_12, () -> {
                                        false
                                    }, () -> {
                                        head_9 = __core__headList__safe(fields_12);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_9),
                                            () -> {
                                                fields_13 = __core__tailList__safe(fields_12);
                                                __core__chooseList(fields_13, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]____to_data = __helios__common__identity;
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__is_valid_data = (__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data) -> {
        (data_36) -> {
            __core__ifThenElse(
                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data(data_36),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data(data_36),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data(data_36),
                                () -> {
                                    true
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data(data_36),
                                        () -> {
                                            true
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data(data_36),
                                                () -> {
                                                    true
                                                },
                                                () -> {
                                                    __core__ifThenElse(
                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data(data_36),
                                                        () -> {
                                                            true
                                                        },
                                                        () -> {
                                                            __core__ifThenElse(
                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data(data_36),
                                                                () -> {
                                                                    true
                                                                },
                                                                () -> {
                                                                    __core__ifThenElse(
                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data(data_36),
                                                                        () -> {
                                                                            true
                                                                        },
                                                                        () -> {
                                                                            __core__ifThenElse(
                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data(data_36),
                                                                                () -> {
                                                                                    true
                                                                                },
                                                                                () -> {
                                                                                    false
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
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data = (__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_1) -> {
        (data_37) -> {
            ignore_2 = __core__ifThenElse(
                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__is_valid_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_1)(data_37),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid AbstractDelegateActivitiesEnum data", ())
                }
            )();
            data_37
        }
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is = (data_38) -> {
        __helios__common__enum_tag_equals(data_38, 0)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2 = (data_39) -> {
        __core__chooseData(data_39, () -> {
            pair_12 = __core__unConstrData__safe(data_39);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_12), 0),
                () -> {
                    data_40 = __core__listData(__core__sndPair(pair_12));
                    __core__chooseData(data_40, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_14 = __core__unListData__safe(data_40);
                        __core__chooseList(fields_14, () -> {
                            false
                        }, () -> {
                            head_10 = __core__headList__safe(fields_14);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2)(head_10),
                                () -> {
                                    fields_15 = __core__tailList__safe(fields_14);
                                    __core__chooseList(fields_15, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__activity = (self_82) -> {
        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__from_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2)(__helios__common__enum_field_0(self_82, "capo lifecycle"))
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities____is = (data_41) -> {
        __helios__common__enum_tag_equals(data_41, 1)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2 = (data_42) -> {
        __core__chooseData(data_42, () -> {
            pair_13 = __core__unConstrData__safe(data_42);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_13), 1),
                () -> {
                    data_43 = __core__listData(__core__sndPair(pair_13));
                    __core__chooseData(data_43, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_16 = __core__unListData__safe(data_43);
                        __core__chooseList(fields_16, () -> {
                            false
                        }, () -> {
                            head_11 = __core__headList__safe(fields_16);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2)(head_11),
                                () -> {
                                    fields_17 = __core__tailList__safe(fields_16);
                                    __core__chooseList(fields_17, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__activity = (self_83) -> {
        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__from_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2)(__helios__common__enum_field_0(self_83, "capo lifecycle 2"))
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities____is = (data_44) -> {
        __helios__common__enum_tag_equals(data_44, 2)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2 = (data_45) -> {
        __core__chooseData(data_45, () -> {
            pair_14 = __core__unConstrData__safe(data_45);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_14), 2),
                () -> {
                    data_46 = __core__listData(__core__sndPair(pair_14));
                    __core__chooseData(data_46, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_18 = __core__unListData__safe(data_46);
                        __core__chooseList(fields_18, () -> {
                            false
                        }, () -> {
                            head_12 = __core__headList__safe(fields_18);
                            __core__ifThenElse(
                                __helios__data__is_valid_data(head_12),
                                () -> {
                                    fields_19 = __core__tailList__safe(fields_18);
                                    __core__chooseList(fields_19, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities____is = (data_47) -> {
        __helios__common__enum_tag_equals(data_47, 3)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2 = (data_48) -> {
        __core__chooseData(data_48, () -> {
            pair_15 = __core__unConstrData__safe(data_48);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_15), 3),
                () -> {
                    data_49 = __core__listData(__core__sndPair(pair_15));
                    __core__chooseData(data_49, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_20 = __core__unListData__safe(data_49);
                        __core__chooseList(fields_20, () -> {
                            false
                        }, () -> {
                            head_13 = __core__headList__safe(fields_20);
                            __core__ifThenElse(
                                __helios__data__is_valid_data(head_13),
                                () -> {
                                    fields_21 = __core__tailList__safe(fields_20);
                                    __core__chooseList(fields_21, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities____is = (data_50) -> {
        __helios__common__enum_tag_equals(data_50, 4)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2 = (data_51) -> {
        __core__chooseData(data_51, () -> {
            pair_16 = __core__unConstrData__safe(data_51);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_16), 4),
                () -> {
                    data_52 = __core__listData(__core__sndPair(pair_16));
                    __core__chooseData(data_52, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_22 = __core__unListData__safe(data_52);
                        __core__chooseList(fields_22, () -> {
                            false
                        }, () -> {
                            head_14 = __core__headList__safe(fields_22);
                            __core__ifThenElse(
                                __helios__data__is_valid_data(head_14),
                                () -> {
                                    fields_23 = __core__tailList__safe(fields_22);
                                    __core__chooseList(fields_23, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData____is = (data_53) -> {
        __helios__common__enum_tag_equals(data_53, 5)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2 = (data_54) -> {
        __core__chooseData(data_54, () -> {
            pair_17 = __core__unConstrData__safe(data_54);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_17), 5),
                () -> {
                    data_55 = __core__listData(__core__sndPair(pair_17));
                    __core__chooseData(data_55, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_24 = __core__unListData__safe(data_55);
                        __core__chooseList(fields_24, () -> {
                            false
                        }, () -> {
                            head_15 = __core__headList__safe(fields_24);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_15),
                                () -> {
                                    fields_25 = __core__tailList__safe(fields_24);
                                    __core__chooseList(fields_25, () -> {
                                        false
                                    }, () -> {
                                        head_16 = __core__headList__safe(fields_25);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_16),
                                            () -> {
                                                fields_26 = __core__tailList__safe(fields_25);
                                                __core__chooseList(fields_26, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData____is = (data_56) -> {
        __helios__common__enum_tag_equals(data_56, 6)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2 = (data_57) -> {
        __core__chooseData(data_57, () -> {
            pair_18 = __core__unConstrData__safe(data_57);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_18), 6),
                () -> {
                    data_58 = __core__listData(__core__sndPair(pair_18));
                    __core__chooseData(data_58, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_27 = __core__unListData__safe(data_58);
                        __core__chooseList(fields_27, () -> {
                            false
                        }, () -> {
                            head_17 = __core__headList__safe(fields_27);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_17),
                                () -> {
                                    fields_28 = __core__tailList__safe(fields_27);
                                    __core__chooseList(fields_28, () -> {
                                        false
                                    }, () -> {
                                        head_18 = __core__headList__safe(fields_28);
                                        __core__ifThenElse(
                                            __helios__bytearray__is_valid_data(head_18),
                                            () -> {
                                                fields_29 = __core__tailList__safe(fields_28);
                                                __core__chooseList(fields_29, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData____is = (data_59) -> {
        __helios__common__enum_tag_equals(data_59, 7)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2 = (data_60) -> {
        __core__chooseData(data_60, () -> {
            pair_19 = __core__unConstrData__safe(data_60);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_19), 7),
                () -> {
                    data_61 = __core__listData(__core__sndPair(pair_19));
                    __core__chooseData(data_61, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_30 = __core__unListData__safe(data_61);
                        __core__chooseList(fields_30, () -> {
                            false
                        }, () -> {
                            head_19 = __core__headList__safe(fields_30);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_19),
                                () -> {
                                    fields_31 = __core__tailList__safe(fields_30);
                                    __core__chooseList(fields_31, () -> {
                                        false
                                    }, () -> {
                                        head_20 = __core__headList__safe(fields_31);
                                        __core__ifThenElse(
                                            __helios__bytearray__is_valid_data(head_20),
                                            () -> {
                                                fields_32 = __core__tailList__safe(fields_31);
                                                __core__chooseList(fields_32, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities____is = (data_62) -> {
        __helios__common__enum_tag_equals(data_62, 8)
    };
    __helios__list[__helios__data]__is_valid_data_internal = (lst_10) -> {
        recurse_61 = (recurse_60, lst_11) -> {
            __core__chooseList(lst_11, () -> {
                true
            }, () -> {
                __core__ifThenElse(
                    __helios__data__is_valid_data(__core__headList__safe(lst_11)),
                    () -> {
                        recurse_60(recurse_60, __core__tailList__safe(lst_11))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_61(recurse_61, lst_10)
    };
    __helios__list[__helios__data]__is_valid_data = (data_63) -> {
        __core__chooseData(data_63, () -> {
            false
        }, () -> {
            false
        }, () -> {
            __helios__list[__helios__data]__is_valid_data_internal(__core__unListData__safe(data_63))
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2 = (data_64) -> {
        __core__chooseData(data_64, () -> {
            pair_20 = __core__unConstrData__safe(data_64);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_20), 8),
                () -> {
                    data_65 = __core__listData(__core__sndPair(pair_20));
                    __core__chooseData(data_65, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_33 = __core__unListData__safe(data_65);
                        __core__chooseList(fields_33, () -> {
                            false
                        }, () -> {
                            head_21 = __core__headList__safe(fields_33);
                            __core__ifThenElse(
                                __helios__list[__helios__data]__is_valid_data(head_21),
                                () -> {
                                    fields_34 = __core__tailList__safe(fields_33);
                                    __core__chooseList(fields_34, true, false)
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
    __helios__list[__helios__data]__from_data = (data_66) -> {
        lst_12 = __core__unListData(data_66);
        __2 = __core__ifThenElse(
            __helios__list[__helios__data]__is_valid_data_internal(lst_12),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid list data", ())
            }
        )();
        lst_12
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__activities = (self_84) -> {
        __helios__list[__helios__data]__from_data(__helios__common__enum_field_0(self_84, "multiple delegate activities"))
    };
    __helios__list[__helios__data]____to_data = __core__listData;
    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____is = (data_67) -> {
        __helios__common__enum_tag_equals(data_67, 0)
    };
    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new = () -> {
        __core__constrData(0, __core__mkNilData(()))
    };
    __module__CapoDelegateHelpers__DgTknDisposition[]__Created____is = (data_68) -> {
        __helios__common__enum_tag_equals(data_68, 1)
    };
    __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new = () -> {
        __core__constrData(1, __core__mkNilData(()))
    };
    __helios__option[__helios__validatorhash]__is_valid_data = (data_69) -> {
        __core__chooseData(data_69, () -> {
            pair_21 = __core__unConstrData__safe(data_69);
            index_5 = __core__fstPair(pair_21);
            fields_35 = __core__sndPair(pair_21);
            __core__ifThenElse(
                __core__equalsInteger(index_5, 0),
                () -> {
                    __core__chooseList(fields_35, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_35), () -> {
                            __helios__validatorhash__is_valid_data(__core__headList__safe(fields_35))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_5, 1),
                        () -> {
                            __core__chooseList(fields_35, true, false)
                        },
                        () -> {
                            false
                        }
                    )()
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
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data = (data_70) -> {
        __core__chooseData(data_70, () -> {
            false
        }, () -> {
            false
        }, () -> {
            fields_36 = __core__unListData__safe(data_70);
            __core__chooseList(fields_36, () -> {
                false
            }, () -> {
                head_22 = __core__headList__safe(fields_36);
                __core__ifThenElse(
                    __helios__string__is_valid_data(head_22),
                    () -> {
                        fields_37 = __core__tailList__safe(fields_36);
                        __core__chooseList(fields_37, () -> {
                            false
                        }, () -> {
                            head_23 = __core__headList__safe(fields_37);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_23),
                                () -> {
                                    fields_38 = __core__tailList__safe(fields_37);
                                    __core__chooseList(fields_38, () -> {
                                        false
                                    }, () -> {
                                        head_24 = __core__headList__safe(fields_38);
                                        __core__ifThenElse(
                                            __helios__option[__helios__validatorhash]__is_valid_data(head_24),
                                            () -> {
                                                fields_39 = __core__tailList__safe(fields_38);
                                                __core__chooseList(fields_39, () -> {
                                                    false
                                                }, () -> {
                                                    head_25 = __core__headList__safe(fields_39);
                                                    __core__ifThenElse(
                                                        __helios__bytearray__is_valid_data(head_25),
                                                        () -> {
                                                            fields_40 = __core__tailList__safe(fields_39);
                                                            __core__chooseList(fields_40, true, false)
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
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data = (data_71) -> {
        ignore_3 = __core__ifThenElse(
            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(data_71),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid RelativeDelegateLink data", ())
            }
        )();
        __core__unListData(data_71)
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]____to_data = __helios__struct____to_data;
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName = (self_85) -> {
        __helios__string__from_data(__helios__common__struct_field_0(self_85))
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__strategyName = (self_86) -> {
        __helios__string__from_data(__helios__common__struct_field_1(self_86))
    };
    __helios__option[__helios__validatorhash]__from_data = (data_72) -> {
        __3 = __core__ifThenElse(
            __helios__option[__helios__validatorhash]__is_valid_data(data_72),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid option data", ())
            }
        )();
        data_72
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash = (self_87) -> {
        __helios__option[__helios__validatorhash]__from_data(__helios__common__struct_field_2(self_87))
    };
    __helios__option[__helios__txinput]__some__some = (self_88) -> {
        __helios__txinput__from_data(__helios__common__enum_field_0(self_88, "option[txinput] some"))
    };
    __helios__option[__helios__validatorhash]__none____is = (data_73) -> {
        __helios__common__enum_tag_equals(data_73, 1)
    };
    __helios__option[__helios__txinput]__none____new = () -> {
        __helios__option__NONE
    };
    __helios__option[__helios__txinput]__some____is = (data_74) -> {
        __helios__common__enum_tag_equals(data_74, 0)
    };
    __helios__list[__helios__txinput]__find_safe = (self_89) -> {
        (fn_17) -> {
            __helios__common__find_safe(self_89, (item_4) -> {
                fn_17(__helios__txinput__from_data(item_4))
            }, __helios__common__identity)
        }
    };
    __helios__option[__helios__validatorhash]__some__some = (self_90) -> {
        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_90, "option[validatorhash] some"))
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput = (self_91) -> {
        (inputs, mph_10, __useopt__required, required) -> {
            required_1 = __core__ifThenElse(
                __useopt__required,
                () -> {
                    required
                },
                () -> {
                    true
                }
            )();
            __cond_1 = __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash(self_91);
            __core__ifThenElse(
                __helios__option[__helios__validatorhash]__none____is(__cond_1),
                () -> {
                    (__lhs_0_2) -> {
                        __core__ifThenElse(
                            required_1,
                            () -> {
                                __helios__error(__helios__string____add("_❌ ➡️ 💁 missing required input with dgTkn ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_91)))
                            },
                            () -> {
                                () -> {
                                    __helios__option[__helios__txinput]__none____new()
                                }()
                            }
                        )()
                    }
                },
                () -> {
                    (__lhs_0) -> {
                        vh_2 = __helios__option[__helios__validatorhash]__some__some(__lhs_0);
                        needsAddrWithCred = __helios__spendingcredential__new_validator(vh_2);
                        expectedUut = __module__StellarHeliosHelpers__mkTv(mph_10, true, __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_91), false, (), false, ());
                        __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add("  -- seeking input dgTkn: ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_91)), "
")), __cond_2 = __helios__list[__helios__txinput]__find_safe(inputs)((i_5) -> {
                            __helios__bool__and(() -> {
                                __helios__spendingcredential____eq(__helios__address__credential(__helios__txinput__address(i_5)), needsAddrWithCred)
                            }, () -> {
                                __helios__value__contains(__helios__txinput__value(i_5))(expectedUut)
                            })
                        });
                        __core__ifThenElse(
                            __helios__option[__helios__txinput]__some____is(__cond_2),
                            () -> {
                                (foundGood) -> {
                                    __core__chooseUnit(__helios__print("  ✅ ➡️  💁 found ^ input dgTkn"), foundGood)
                                }
                            },
                            () -> {
                                (__lhs_0_1) -> {
                                    __core__ifThenElse(
                                        required_1,
                                        () -> {
                                            __helios__error(__helios__string____add("_❌ ➡️  💁 missing req'd input dgTkn (at script addr) ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_91)))
                                        },
                                        () -> {
                                            () -> {
                                                __core__chooseUnit(__helios__print(" <- 🚫 ➡️ 💁 no input with ^ dgTkn; not req'd; returning false
"), __helios__option[__helios__txinput]__none____new())
                                            }()
                                        }
                                    )()
                                }
                            }
                        )()(__cond_2))
                    }
                }
            )()(__cond_1)
        }
    };
    __helios__option[__helios__validatorhash]__some____is = (data_75) -> {
        __helios__common__enum_tag_equals(data_75, 0)
    };
    __helios__option[__helios__txoutput]__some____is = (data_76) -> {
        __helios__common__enum_tag_equals(data_76, 0)
    };
    __helios__list[__helios__txoutput]__find_safe = (self_92) -> {
        (fn_18) -> {
            __helios__common__find_safe(self_92, (item_5) -> {
                fn_18(__helios__txoutput__from_data(item_5))
            }, __helios__common__identity)
        }
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput = (self_93) -> {
        (mph_11, __useopt__required_1, required_2, __useopt__createdOrReturned, createdOrReturned) -> {
            required_3 = __core__ifThenElse(
                __useopt__required_1,
                () -> {
                    required_2
                },
                () -> {
                    true
                }
            )();
            createdOrReturned_1 = __core__ifThenElse(
                __useopt__createdOrReturned,
                () -> {
                    createdOrReturned
                },
                () -> {
                    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new()
                }
            )();
            __lhs_0_3 = self_93;
            uut = __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(__lhs_0_3);
            strategy = __module__CapoDelegateHelpers__RelativeDelegateLink[]__strategyName(__lhs_0_3);
            validatorHash = __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash(__lhs_0_3);
            __core__chooseUnit(__core__ifThenElse(
                __helios__int____lt(__helios__bytearray__length(__helios__string__encode_utf8(strategy)()), 4),
                () -> {
                    __helios__error("strategy too short")
                },
                () -> {
                    () -> {
                        __helios__assert(true, "no")
                    }()
                }
            )(), v = __module__StellarHeliosHelpers__mkTv(mph_11, true, uut, false, (), false, ());
            (cOrR) -> {
                __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add(" ⬅️ 🔎 💁 expect dgTkn ", cOrR), ": "), uut)), (hasDelegate) -> {
                    __core__chooseUnit(__core__ifThenElse(
                        __helios__bool__and(() -> {
                            __helios__bool____not(hasDelegate)
                        }, () -> {
                            required_3
                        }),
                        () -> {
                            __cond_6 = createdOrReturned_1;
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__DgTknDisposition[]__Created____is(__cond_6),
                                () -> {
                                    (__lhs_0_12) -> {
                                        __helios__error(__helios__string____add("⬅️ ❌ 💁 dgTkn not created: ", uut))
                                    }
                                },
                                () -> {
                                    (__lhs_0_10) -> {
                                        __lhs_0_11 = __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput(self_93)(__helios__tx__inputs(__helios__scriptcontext__tx), mph_11, true, true);
                                        __helios__error(__helios__string____add("⬅️ ❌ 💁 dgTkn not returned: ", uut))
                                    }
                                }
                            )()(__cond_6)
                        },
                        () -> {
                            () -> {
                                __core__ifThenElse(
                                    hasDelegate,
                                    () -> {
                                        __helios__print(__helios__string____add(__helios__string____add(" ⬅️ ✅ 💁 ok:  ^ dgTkn has ", cOrR), " a valid output
"))
                                    },
                                    () -> {
                                        () -> {
                                            __helios__print(" ⬅️ 🚫 💁 no delegate but not req'd; false")
                                        }()
                                    }
                                )()
                            }()
                        }
                    )(), hasDelegate)
                }(__cond_4 = validatorHash;
                __core__ifThenElse(
                    __helios__option[__helios__validatorhash]__some____is(__cond_4),
                    () -> {
                        (__lhs_0_9) -> {
                            vh_3 = __helios__option[__helios__validatorhash]__some__some(__lhs_0_9);
                            __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(" sent to validator: ", __helios__validatorhash__show(vh_3)()), "
")), __helios__value__contains(__helios__tx__value_locked_by(__helios__scriptcontext__tx)(vh_3))(v))
                        }
                    },
                    () -> {
                        (__lhs_0_6) -> {
                            __core__chooseUnit(__helios__print(" (to anywhere)
"), __cond_5 = __helios__list[__helios__txoutput]__find_safe(__helios__tx__outputs(__helios__scriptcontext__tx))((o) -> {
                                __helios__value__contains(__helios__txoutput__value(o))(v)
                            });
                            __core__ifThenElse(
                                __helios__option[__helios__txoutput]__some____is(__cond_5),
                                () -> {
                                    (__lhs_0_8) -> {
                                        true
                                    }
                                },
                                () -> {
                                    (__lhs_0_7) -> {
                                        false
                                    }
                                }
                            )()(__cond_5))
                        }
                    }
                )()(__cond_4)))
            }(__cond_3 = createdOrReturned_1;
            __core__ifThenElse(
                __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____is(__cond_3),
                () -> {
                    (__lhs_0_5) -> {
                        "returned"
                    }
                },
                () -> {
                    (__lhs_0_4) -> {
                        "created"
                    }
                }
            )()(__cond_3)))
        }
    };
    __helios__list[__helios__txinput]__any = (self_94) -> {
        (fn_19) -> {
            __helios__common__any(self_94, (item_6) -> {
                fn_19(__helios__txinput__from_data(item_6))
            })
        }
    };
    __helios__map[__helios__mintingpolicyhash@__helios__map[__helios__bytearray@__helios__int]]__filter = (self_95) -> {
        (fn_20) -> {
            __helios__common__filter_map(self_95, (pair_22) -> {
                fn_20(__helios__mintingpolicyhash__from_data(__core__fstPair(pair_22)), __helios__map[__helios__bytearray@__helios__int]__from_data(__core__sndPair(pair_22)))
            })
        }
    };
    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal = (lst_13) -> {
        recurse_63 = (recurse_62, lst_14) -> {
            __core__chooseList(lst_14, () -> {
                true
            }, () -> {
                __core__ifThenElse(
                    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__headList__safe(lst_14)),
                    () -> {
                        recurse_62(recurse_62, __core__tailList__safe(lst_14))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_63(recurse_63, lst_13)
    };
    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_77) -> {
        __core__chooseData(data_77, () -> {
            false
        }, () -> {
            false
        }, () -> {
            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(__core__unListData__safe(data_77))
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal = (map_14) -> {
        recurse_65 = (recurse_64, map_15) -> {
            __core__chooseList(map_15, () -> {
                true
            }, () -> {
                head_26 = __core__headList__safe(map_15);
                __core__ifThenElse(
                    __helios__string__is_valid_data(__core__fstPair(head_26)),
                    () -> {
                        __core__ifThenElse(
                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__sndPair(head_26)),
                            () -> {
                                recurse_64(recurse_64, __core__tailList__safe(map_15))
                            },
                            () -> {
                                false
                            }
                        )()
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_65(recurse_65, map_14)
    };
    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_78) -> {
        __core__chooseData(data_78, () -> {
            false
        }, () -> {
            __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(__core__unMapData__safe(data_78))
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data = (data_79) -> {
        __core__chooseData(data_79, () -> {
            pair_23 = __core__unConstrData__safe(data_79);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_23), 0),
                () -> {
                    data_80 = __core__listData(__core__sndPair(pair_23));
                    __core__chooseData(data_80, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_41 = __core__unListData__safe(data_80);
                        __core__chooseList(fields_41, () -> {
                            false
                        }, () -> {
                            head_27 = __core__headList__safe(fields_41);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_27),
                                () -> {
                                    fields_42 = __core__tailList__safe(fields_41);
                                    __core__chooseList(fields_42, () -> {
                                        false
                                    }, () -> {
                                        head_28 = __core__headList__safe(fields_42);
                                        __core__ifThenElse(
                                            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_28),
                                            () -> {
                                                fields_43 = __core__tailList__safe(fields_42);
                                                __core__chooseList(fields_43, () -> {
                                                    false
                                                }, () -> {
                                                    head_29 = __core__headList__safe(fields_43);
                                                    __core__ifThenElse(
                                                        __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_29),
                                                        () -> {
                                                            fields_44 = __core__tailList__safe(fields_43);
                                                            __core__chooseList(fields_44, () -> {
                                                                false
                                                            }, () -> {
                                                                head_30 = __core__headList__safe(fields_44);
                                                                __core__ifThenElse(
                                                                    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_30),
                                                                    () -> {
                                                                        fields_45 = __core__tailList__safe(fields_44);
                                                                        __core__chooseList(fields_45, () -> {
                                                                            false
                                                                        }, () -> {
                                                                            head_31 = __core__headList__safe(fields_45);
                                                                            __core__ifThenElse(
                                                                                __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_31),
                                                                                () -> {
                                                                                    fields_46 = __core__tailList__safe(fields_45);
                                                                                    __core__chooseList(fields_46, () -> {
                                                                                        false
                                                                                    }, () -> {
                                                                                        head_32 = __core__headList__safe(fields_46);
                                                                                        __core__ifThenElse(
                                                                                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_32),
                                                                                            () -> {
                                                                                                fields_47 = __core__tailList__safe(fields_46);
                                                                                                __core__chooseList(fields_47, true, false)
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
    __module__CapoHelpers__CapoDatum[]__CharterToken__from_data = (data_81) -> {
        ignore_4 = __core__ifThenElse(
            __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data(data_81),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid CharterToken data", ())
            }
        )();
        data_81
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken____to_data = __helios__common__identity;
    __module__CapoHelpers__CapoDatum[]__CharterToken__spendDelegateLink = (self_96) -> {
        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__enum_field_0(self_96, "CharterToken relative delegate link"))
    };
    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__from_data = (data_82) -> {
        lst_15 = __core__unListData(data_82);
        __4 = __core__ifThenElse(
            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(lst_15),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid list data", ())
            }
        )();
        lst_15
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken__spendInvariants = (self_97) -> {
        __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__from_data(__helios__common__enum_field_1(self_97))
    };
    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__from_data = (data_83) -> {
        map_16 = __core__unMapData(data_83);
        __5 = __core__ifThenElse(
            __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(map_16),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid map data", ())
            }
        )();
        map_16
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken__namedDelegates = (self_98) -> {
        __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__from_data(__helios__common__enum_field_2(self_98))
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink = (self_99) -> {
        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__enum_field_3(self_99))
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken__mintInvariants = (self_100) -> {
        __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__from_data(__helios__common__enum_field_4(self_100))
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken__govAuthorityLink = (self_101) -> {
        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__enum_field_5(self_101))
    };
    __module__CapoHelpers__getRefCharterUtxo = (mph_12) -> {
        chVal = __module__StellarHeliosHelpers__tvCharter(mph_12);
        hasCharter = (txin) -> {
            __helios__value__contains(__helios__txinput__value(txin))(chVal)
        };
        __core__chooseUnit(__helios__print("getting ref_input for charter
"), (charterUtxo) -> {
            charterUtxo
        }(__cond_7 = __helios__list[__helios__txinput]__find_safe(__helios__tx__ref_inputs(__helios__scriptcontext__tx))(hasCharter);
        __core__ifThenElse(
            __helios__option[__helios__txinput]__some____is(__cond_7),
            () -> {
                (__lhs_0_14) -> {
                    ch = __helios__option[__helios__txinput]__some__some(__lhs_0_14);
                    ch
                }
            },
            () -> {
                (__lhs_0_13) -> {
                    __core__chooseUnit(__helios__print("expected charter value"), __core__chooseUnit(__helios__print(__helios__value__show(chVal)()), __core__chooseUnit(__helios__print("
"), __helios__error("Missing charter in required ref_inputs (use tcxWithCharterRef(tcx) in txn building functions)"))))
                }
            }
        )()(__cond_7)))
    };
    __module__CapoHelpers__getTxCharterDatum = (mph_13, __useopt__refInputs, refInputs) -> {
        refInputs_1 = __core__ifThenElse(
            __useopt__refInputs,
            () -> {
                refInputs
            },
            () -> {
                __helios__tx__ref_inputs(__helios__scriptcontext__tx)
            }
        )();
        chVal_1 = __module__StellarHeliosHelpers__tvCharter(mph_13);
        hasCharter_1 = (txin_1) -> {
            __helios__value__contains(__helios__txinput__value(txin_1))(chVal_1)
        };
        (charterUtxo_1) -> {
            ctd = __helios__common__assert_constr_index(__module__CapoHelpers__CapoDatum[]__CharterToken__from_data(__helios__txoutputdatum__inline(__helios__txinput__datum(charterUtxo_1))), 0);
            ctd
        }(__cond_8 = __helios__list[__helios__txinput]__find_safe(refInputs_1)(hasCharter_1);
        __core__ifThenElse(
            __helios__option[__helios__txinput]__some____is(__cond_8),
            () -> {
                (__lhs_0_18) -> {
                    ch_2 = __helios__option[__helios__txinput]__some__some(__lhs_0_18);
                    ch_2
                }
            },
            () -> {
                (__lhs_0_15) -> {
                    __cond_9 = __helios__list[__helios__txinput]__find_safe(__helios__tx__inputs(__helios__scriptcontext__tx))(hasCharter_1);
                    __core__ifThenElse(
                        __helios__option[__helios__txinput]__some____is(__cond_9),
                        () -> {
                            (__lhs_0_17) -> {
                                ch_1 = __helios__option[__helios__txinput]__some__some(__lhs_0_17);
                                ch_1
                            }
                        },
                        () -> {
                            (__lhs_0_16) -> {
                                __helios__error("Missing charter inputs / ref_inputs")
                            }
                        }
                    )()(__cond_9)
                }
            }
        )()(__cond_8))
    };
    __helios__option[__helios__txinput]__is_valid_data = (data_84) -> {
        __core__chooseData(data_84, () -> {
            pair_24 = __core__unConstrData__safe(data_84);
            index_6 = __core__fstPair(pair_24);
            fields_48 = __core__sndPair(pair_24);
            __core__ifThenElse(
                __core__equalsInteger(index_6, 0),
                () -> {
                    __core__chooseList(fields_48, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_48), () -> {
                            __helios__txinput__is_valid_data(__core__headList__safe(fields_48))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_6, 1),
                        () -> {
                            __core__chooseList(fields_48, true, false)
                        },
                        () -> {
                            false
                        }
                    )()
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
    __module__CapoHelpers__DelegateInput[]__link = (self_102) -> {
        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__struct_field_0(self_102))
    };
    __helios__option[__helios__txinput]__from_data = (data_85) -> {
        __6 = __core__ifThenElse(
            __helios__option[__helios__txinput]__is_valid_data(data_85),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid option data", ())
            }
        )();
        data_85
    };
    __module__CapoHelpers__DelegateInput[]__input = (self_103) -> {
        __helios__option[__helios__txinput]__from_data(__helios__common__struct_field_1(self_103))
    };
    __module__CapoHelpers__DelegateInput[]__mph = (self_104) -> {
        __helios__mintingpolicyhash__from_data(__helios__common__struct_field_2(self_104))
    };
    __helios__option[__helios__txinput]____to_data = __helios__common__identity;
    __module__CapoHelpers__DelegateInput[]____new = (link, input, mph_14) -> {
        __core__mkCons(__module__CapoDelegateHelpers__RelativeDelegateLink[]____to_data(link), __core__mkCons(__helios__option[__helios__txinput]____to_data(input), __core__mkCons(__helios__mintingpolicyhash____to_data(mph_14), __core__mkNilData(()))))
    };
    __helios__list[__helios__data]__length = __helios__common__length;
    __helios__option[__helios__txinput]__unwrap = (self_105) -> {
        () -> {
            __helios__txinput__from_data(__helios__common__enum_field_0(self_105, "option[txinput] unwrap"))
        }
    };
    __module__CapoHelpers__DelegateInput[]__genericDelegateActivityAsData = (self_106) -> {
        () -> {
            i_6 = __helios__option[__helios__txinput]__unwrap(__module__CapoHelpers__DelegateInput[]__input(self_106))();
            inputData = __module__StellarHeliosHelpers__mustFindInputRedeemer(i_6);
            __core__chooseUnit(__cond_10 = inputData;
            __core__ifThenElse(
                __helios__data__constrdata____is(__cond_10),
                () -> {
                    (__lhs_0_19) -> {
                        index_7 = __helios__data__constrdata__tag(__lhs_0_19);
                        fields_49 = __helios__data__constrdata__fields(__lhs_0_19);
                        __core__chooseUnit(__helios__print("    --🐞 generic delegate activity at index "), __core__chooseUnit(__helios__print(__helios__int__show(index_7)()), __core__chooseUnit(__helios__print("
    ---- from input id:"), __core__chooseUnit(__helios__print(__helios__txid__show(__helios__txoutputid__tx_id(__helios__txinput__output_id(i_6)))()), __core__chooseUnit(__helios__print("🔹#"), __core__chooseUnit(__helios__print(__helios__int__show(__helios__txoutputid__index(__helios__txinput__output_id(i_6)))()), __core__chooseUnit(__helios__print(" = "), __core__chooseUnit(__helios__print(__helios__value__show(__helios__txinput__value(i_6))()), __core__chooseUnit(__helios__print("
"), __core__chooseUnit(__helios__assert(__helios__int____eq(index_7, index_7), "no way"), __helios__assert(__helios__int____gt(__helios__list[__helios__data]__length(fields_49), 0), "no way")))))))))))
                    }
                },
                () -> {
                    (__7) -> {
                        ()
                    }
                }
            )()(__cond_10), inputData)
        }
    };
    __module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1 = (__module__CapoHelpers__DelegateInput[]__genericDelegateActivity) -> {
        (self_107) -> {
            () -> {
                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)(__module__CapoHelpers__DelegateInput[]__genericDelegateActivityAsData(self_107)())
            }
        }
    };
    __module__CapoHelpers__DelegateInput[]__requiresValidOutput = (self_108) -> {
        (__useopt__createdOrReturned_1, createdOrReturned_2) -> {
            createdOrReturned_3 = __core__ifThenElse(
                __useopt__createdOrReturned_1,
                () -> {
                    createdOrReturned_2
                },
                () -> {
                    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new()
                }
            )();
            __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(__module__CapoHelpers__DelegateInput[]__link(self_108))(__module__CapoHelpers__DelegateInput[]__mph(self_108), true, true, true, createdOrReturned_3)
        }
    };
    __module__CapoHelpers__cctx_CharterInputType[]____to_data = __helios__common__identity;
    __module__CapoHelpers__cctx_CharterInputType[]__is_valid_data = (__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data, __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data) -> {
        (data_86) -> {
            __core__ifThenElse(
                __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data(data_86),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data(data_86),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data(data_86),
                                () -> {
                                    true
                                },
                                () -> {
                                    false
                                }
                            )()
                        }
                    )()
                }
            )()
        }
    };
    __module__CapoHelpers__cctx_CharterInputType[]__from_data = (__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_1) -> {
        (data_87) -> {
            ignore_5 = __core__ifThenElse(
                __module__CapoHelpers__cctx_CharterInputType[]__is_valid_data(__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_1)(data_87),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid cctx_CharterInputType data", ())
                }
            )();
            data_87
        }
    };
    __module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_2 = (data_88) -> {
        __core__chooseData(data_88, () -> {
            pair_25 = __core__unConstrData__safe(data_88);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_25), 0),
                () -> {
                    data_89 = __core__listData(__core__sndPair(pair_25));
                    __core__chooseData(data_89, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_50 = __core__unListData__safe(data_89);
                        __core__chooseList(fields_50, true, false)
                    }, () -> {
                        false
                    }, () -> {
                        false
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
    __module__CapoHelpers__cctx_CharterInputType[]__Unk____new = () -> {
        __core__constrData(0, __core__mkNilData(()))
    };
    __module__CapoHelpers__cctx_CharterInputType[]__Ref____is = (data_90) -> {
        __helios__common__enum_tag_equals(data_90, 1)
    };
    __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data_2 = (data_91) -> {
        __core__chooseData(data_91, () -> {
            pair_26 = __core__unConstrData__safe(data_91);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_26), 1),
                () -> {
                    data_92 = __core__listData(__core__sndPair(pair_26));
                    __core__chooseData(data_92, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_51 = __core__unListData__safe(data_92);
                        __core__chooseList(fields_51, () -> {
                            false
                        }, () -> {
                            head_33 = __core__headList__safe(fields_51);
                            __core__ifThenElse(
                                __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data(head_33),
                                () -> {
                                    fields_52 = __core__tailList__safe(fields_51);
                                    __core__chooseList(fields_52, () -> {
                                        false
                                    }, () -> {
                                        head_34 = __core__headList__safe(fields_52);
                                        __core__ifThenElse(
                                            __helios__txinput__is_valid_data(head_34),
                                            () -> {
                                                fields_53 = __core__tailList__safe(fields_52);
                                                __core__chooseList(fields_53, true, false)
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
    __module__CapoHelpers__cctx_CharterInputType[]__Ref__datum = (self_109) -> {
        __module__CapoHelpers__CapoDatum[]__CharterToken__from_data(__helios__common__enum_field_0(self_109, "cctx_CharterInputType[]__Ref__datum"))
    };
    __module__CapoHelpers__cctx_CharterInputType[]__Ref____new = (datum, utxo) -> {
        __core__constrData(1, __core__mkCons(__module__CapoHelpers__CapoDatum[]__CharterToken____to_data(datum), __core__mkCons(__helios__txinput____to_data(utxo), __core__mkNilData(()))))
    };
    __module__CapoHelpers__cctx_CharterInputType[]__Input____is = (data_93) -> {
        __helios__common__enum_tag_equals(data_93, 2)
    };
    __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_2 = (data_94) -> {
        __core__chooseData(data_94, () -> {
            pair_27 = __core__unConstrData__safe(data_94);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_27), 2),
                () -> {
                    data_95 = __core__listData(__core__sndPair(pair_27));
                    __core__chooseData(data_95, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_54 = __core__unListData__safe(data_95);
                        __core__chooseList(fields_54, () -> {
                            false
                        }, () -> {
                            head_35 = __core__headList__safe(fields_54);
                            __core__ifThenElse(
                                __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data(head_35),
                                () -> {
                                    fields_55 = __core__tailList__safe(fields_54);
                                    __core__chooseList(fields_55, () -> {
                                        false
                                    }, () -> {
                                        head_36 = __core__headList__safe(fields_55);
                                        __core__ifThenElse(
                                            __helios__txinput__is_valid_data(head_36),
                                            () -> {
                                                fields_56 = __core__tailList__safe(fields_55);
                                                __core__chooseList(fields_56, true, false)
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
    __module__CapoHelpers__cctx_CharterInputType[]__Input__datum = (self_110) -> {
        __module__CapoHelpers__CapoDatum[]__CharterToken__from_data(__helios__common__enum_field_0(self_110, "CharterInputType[]__Input__datum"))
    };
    __module__CapoHelpers__CapoCtx[]__mph = (self_111) -> {
        __helios__mintingpolicyhash__from_data(__helios__common__struct_field_0(self_111))
    };
    __module__CapoHelpers__CapoCtx[]__charter = (self_112) -> {
        __module__CapoHelpers__cctx_CharterInputType[]__from_data(__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_2, __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data_2, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_2)(__helios__common__struct_field_1(self_112))
    };
    __module__CapoHelpers__CapoCtx[]____new = (mph_15, charter) -> {
        __core__mkCons(__helios__mintingpolicyhash____to_data(mph_15), __core__mkCons(__module__CapoHelpers__cctx_CharterInputType[]____to_data(charter), __core__mkNilData(())))
    };
    __module__CapoHelpers__CapoCtx[]__requiresMintDelegateInput = (__module__CapoHelpers__CapoCtx[]__resolveCharterDatum, __module__CapoHelpers__CapoCtx[]__requiresDelegateInput) -> {
        (self_113) -> {
            (__useopt__required_2, required_4) -> {
                required_5 = __core__ifThenElse(
                    __useopt__required_2,
                    () -> {
                        required_4
                    },
                    () -> {
                        true
                    }
                )();
                dgtLink = __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink(__module__CapoHelpers__CapoCtx[]__resolveCharterDatum(self_113)());
                __module__CapoHelpers__CapoCtx[]__requiresDelegateInput(self_113)(dgtLink, true, required_5)
            }
        }
    };
    __module__CapoHelpers__CapoCtx[]__resolveCharterDatum_1 = (self_114) -> {
        () -> {
            __cond_11 = __module__CapoHelpers__CapoCtx[]__charter(self_114);
            __core__ifThenElse(
                __module__CapoHelpers__cctx_CharterInputType[]__Ref____is(__cond_11),
                () -> {
                    (__lhs_0_21) -> {
                        datum_2 = __module__CapoHelpers__cctx_CharterInputType[]__Ref__datum(__lhs_0_21);
                        datum_2
                    }
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoHelpers__cctx_CharterInputType[]__Input____is(__cond_11),
                        () -> {
                            (__lhs_0_20) -> {
                                datum_1 = __module__CapoHelpers__cctx_CharterInputType[]__Input__datum(__lhs_0_20);
                                datum_1
                            }
                        },
                        () -> {
                            (__8) -> {
                                __helios__error("CapoCtx.resolveCharterDatum(): unknown charter strategy; use result of withCharterInput(), withCharterRef(), or needsCharter() to resolve charter datum first")
                            }
                        }
                    )()
                }
            )()(__cond_11)
        }
    };
    __module__CapoHelpers__CapoCtx[]__requiresDelegateInput_1 = (self_115) -> {
        (dgtLink_1, __useopt__required_3, required_6) -> {
            required_7 = __core__ifThenElse(
                __useopt__required_3,
                () -> {
                    required_6
                },
                () -> {
                    true
                }
            )();
            __module__CapoHelpers__DelegateInput[]____new(dgtLink_1, __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput(dgtLink_1)(__helios__tx__inputs(__helios__scriptcontext__tx), __module__CapoHelpers__CapoCtx[]__mph(self_115), true, required_7), __module__CapoHelpers__CapoCtx[]__mph(self_115))
        }
    };
    __module__CapoHelpers__CapoCtx[]__withCharterRef = (self_116) -> {
        () -> {
            charter_1 = __module__CapoHelpers__CapoCtx[]__charter(self_116);
            __cond_12 = charter_1;
            __core__ifThenElse(
                __module__CapoHelpers__cctx_CharterInputType[]__Ref____is(__cond_12),
                () -> {
                    (__lhs_0_25) -> {
                        self_116
                    }
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoHelpers__cctx_CharterInputType[]__Input____is(__cond_12),
                        () -> {
                            (__lhs_0_24) -> {
                                __helios__error("CapoCtx.withCharterRef(): charter is from inputs!")
                            }
                        },
                        () -> {
                            (__lhs_0_22) -> {
                                __lhs_0_23 = self_116;
                                mph_16 = __module__CapoHelpers__CapoCtx[]__mph(__lhs_0_23);
                                utxo_1 = __module__CapoHelpers__getRefCharterUtxo(mph_16);
                                datum_3 = __helios__common__assert_constr_index(__module__CapoHelpers__CapoDatum[]__CharterToken__from_data(__helios__txoutputdatum__inline(__helios__txinput__datum(utxo_1))), 0);
                                __module__CapoHelpers__CapoCtx[]____new(mph_16, __module__CapoHelpers__cctx_CharterInputType[]__Ref____new(datum_3, utxo_1))
                            }
                        }
                    )()
                }
            )()(__cond_12)
        }
    };
    __module__CapoHelpers__mkCapoCtx = (mph_17) -> {
        __module__CapoHelpers__CapoCtx[]____new(mph_17, __module__CapoHelpers__cctx_CharterInputType[]__Unk____new())
    };
    __module__CapoMintHelpers__hasSeedUtxo = (tx, seedUtxo) -> {
        __core__chooseUnit(__core__ifThenElse(
            __helios__bool____not(__helios__list[__helios__txinput]__any(__helios__tx__inputs(tx))((input_1) -> {
                __helios__txoutputid____eq(__helios__txinput__output_id(input_1), seedUtxo)
            })),
            () -> {
                __core__chooseUnit(__helios__print(" - expected seedUtxo: "), __core__chooseUnit(__helios__print(__helios__txoutputid__show(seedUtxo)()), __core__chooseUnit(__helios__print("
"), __helios__assert(false, "missing expected seed input for minting"))))
            },
            () -> {
                () -> {
                    ()
                }()
            }
        )(), __core__chooseUnit(__helios__print("  -- has seed -> ok
"), true))
    };
    __helios__option[__helios__data]__none____is = (data_96) -> {
        __helios__common__enum_tag_equals(data_96, 1)
    };
    __helios__list[__helios__data]____eq = (self_117, other_2) -> {
        __core__equalsData(__helios__list[__helios__data]____to_data(self_117), __helios__list[__helios__data]____to_data(other_2))
    };
    __helios__option[__helios__data]__some__some = (self_118) -> {
        __helios__data__from_data(__helios__common__enum_field_0(self_118, "option[data] some"))
    };
    __helios__map[__helios__scriptpurpose@__helios__data]__get_safe = (self_119) -> {
        (key_11) -> {
            __helios__common__map_get(self_119, __helios__scriptpurpose____to_data(key_11), (x_3) -> {
                __core__constrData(0, __helios__common__list_1(x_3))
            }, () -> {
                __core__constrData(1, __helios__common__list_0)
            })
        }
    };
    __module__CapoMintHelpers__requiresDelegateAuthorizingMint = (delegateLink, mph_18, __useopt__extraMintDelegateRedeemerCheck, extraMintDelegateRedeemerCheck) -> {
        extraMintDelegateRedeemerCheck_1 = __core__ifThenElse(
            __useopt__extraMintDelegateRedeemerCheck,
            () -> {
                extraMintDelegateRedeemerCheck
            },
            () -> {
                true
            }
        )();
        authzVal = __helios__value__new(__helios__assetclass__new(mph_18, __helios__string__encode_utf8(__module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink))()), 1);
        __core__chooseUnit(__helios__print("finding input dgTkn: "), __core__chooseUnit(__helios__print(__module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink)), __core__chooseUnit(__helios__print("
"), (targetId_1) -> {
            __core__chooseUnit(__helios__print("    -- found dgTkn^"), spendsAuthorityUut = __helios__map[__helios__scriptpurpose@__helios__data]__find_key(__helios__tx__redeemers(__helios__scriptcontext__tx))((purpose_1) -> {
                __cond_14 = purpose_1;
                __core__ifThenElse(
                    __helios__scriptpurpose__spending____is(__cond_14),
                    () -> {
                        (sp_1) -> {
                            __helios__txoutputid____eq(__helios__scriptpurpose__spending__output_id(sp_1), targetId_1)
                        }
                    },
                    () -> {
                        (__9) -> {
                            false
                        }
                    }
                )()(__cond_14)
            });
            err = __helios__string____add(__helios__string____add("dgTkn ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink)), " not being spent as expected");
            (maybeCheckedMintDelegateAuthority) -> {
                delegateDidAuthorize = true;
                __helios__bool__and(() -> {
                    delegateDidAuthorize
                }, () -> {
                    maybeCheckedMintDelegateAuthority
                })
            }(__cond_15 = __helios__map[__helios__scriptpurpose@__helios__data]__get_safe(__helios__tx__redeemers(__helios__scriptcontext__tx))(spendsAuthorityUut);
            __core__ifThenElse(
                __helios__option[__helios__data]__none____is(__cond_15),
                () -> {
                    (__lhs_0_33) -> {
                        __helios__error(err)
                    }
                },
                () -> {
                    (__lhs_0_28) -> {
                        x_5 = __helios__option[__helios__data]__some__some(__lhs_0_28);
                        __cond_16 = x_5;
                        __core__ifThenElse(
                            __helios__data__constrdata____is(__cond_16),
                            () -> {
                                (__lhs_0_29) -> {
                                    index_8 = __helios__data__constrdata__tag(__lhs_0_29);
                                    fields_57 = __helios__data__constrdata__fields(__lhs_0_29);
                                    __helios__bool__and(() -> {
                                        __helios__list[__helios__data]____eq(fields_57, fields_57)
                                    }, () -> {
                                        __core__ifThenElse(
                                            __helios__bool____not(extraMintDelegateRedeemerCheck_1),
                                            () -> {
                                                __core__chooseUnit(__helios__print("  -- ok, dgTkn spent
"), __core__chooseUnit(__helios__print("  ---- skip redeemer check
"), true))
                                            },
                                            () -> {
                                                () -> {
                                                    __core__ifThenElse(
                                                        __helios__int____eq(0, index_8),
                                                        () -> {
                                                            dgtActivity = __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__from_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2)(__helios__list[__helios__data]__head(fields_57));
                                                            __cond_17 = dgtActivity;
                                                            __core__ifThenElse(
                                                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is(__cond_17),
                                                                () -> {
                                                                    (__lhs_0_32) -> {
                                                                        __core__chooseUnit(__helios__print("  -- ok, dgTkn spent
"), true)
                                                                    }
                                                                },
                                                                () -> {
                                                                    __core__ifThenElse(
                                                                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring____is(__cond_17),
                                                                        () -> {
                                                                            (__lhs_0_31) -> {
                                                                                __helios__error("DLA::Retiring can't mint!")
                                                                            }
                                                                        },
                                                                        () -> {
                                                                            (__lhs_0_30) -> {
                                                                                __helios__error("DLA::ValidatingSettings can't mint!")
                                                                            }
                                                                        }
                                                                    )()
                                                                }
                                                            )()(__cond_17)
                                                        },
                                                        () -> {
                                                            () -> {
                                                                true
                                                            }()
                                                        }
                                                    )()
                                                }()
                                            }
                                        )()
                                    })
                                }
                            },
                            () -> {
                                (__10) -> {
                                    __helios__error(err)
                                }
                            }
                        )()(__cond_16)
                    }
                }
            )()(__cond_15)))
        }(__cond_13 = __helios__list[__helios__txinput]__find_safe(__helios__tx__inputs(__helios__scriptcontext__tx))((i_7) -> {
            __helios__value__contains(__helios__txinput__value(i_7))(authzVal)
        });
        __core__ifThenElse(
            __helios__option[__helios__txinput]__some____is(__cond_13),
            () -> {
                (__lhs_0_27) -> {
                    x_4 = __helios__option[__helios__txinput]__some__some(__lhs_0_27);
                    __helios__txinput__output_id(x_4)
                }
            },
            () -> {
                (__lhs_0_26) -> {
                    __helios__error(__helios__string____add("missing dgTkn ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink)))
                }
            }
        )()(__cond_13)))))
    };
    __helios__list[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]]__all = (self_120) -> {
        (fn_21) -> {
            __helios__common__all(self_120, (item_7) -> {
                fn_21(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)(item_7))
            })
        }
    };
    __helios__list[__helios__data]__map[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]] = (self_121) -> {
        (fn_22) -> {
            __helios__common__map(self_121, (item_8) -> {
                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]____to_data(fn_22(__helios__data__from_data(item_8)))
            }, __core__mkNilData(()))
        }
    };
    __module__CapoMintHelpers__requiresMintDelegateApproval = (mph_19) -> {
        cctx = __module__CapoHelpers__CapoCtx[]__withCharterRef(__module__CapoHelpers__mkCapoCtx(mph_19))();
        __core__chooseUnit(__helios__print("Minter needs mintDgt + mint activity
"), __core__chooseUnit(__module__StellarHeliosHelpers__REQT("EXPECTS the application-specific mintDelegate to explicitly check and approve the full minted value"), __core__chooseUnit(__helios__print("    -- ^ e.g. assert(tx.minted.get_policy(mph) == expectedMintedValue);
"), __core__chooseUnit(__helios__print("    ---- (if it's only responsible for one minting policy)
"), __core__chooseUnit(__module__StellarHeliosHelpers__TODO("must enforce minting invariants"), mintDgtInput = __module__CapoHelpers__CapoCtx[]__requiresMintDelegateInput(__module__CapoHelpers__CapoCtx[]__resolveCharterDatum_1, __module__CapoHelpers__CapoCtx[]__requiresDelegateInput_1)(cctx)(false, ());
        mintDgtActivity = __module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1(__module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1)(mintDgtInput)();
        __cond_18 = mintDgtActivity;
        __core__ifThenElse(
            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is(__cond_18),
            () -> {
                (__lhs_0_54) -> {
                    CLA = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__activity(__lhs_0_54);
                    __cond_21 = CLA;
                    __lhs_0_55 = __cond_21;
                    __core__chooseUnit(__helios__print("  -- minter wants mintDgt + CapoLifecycle (delegate-creation)
"), __helios__bool__and(() -> {
                        __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())
                    }, () -> {
                        true
                    }))
                }
            },
            () -> {
                __core__ifThenElse(
                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities____is(__cond_18),
                    () -> {
                        (__lhs_0_53) -> {
                            __helios__error("DelegateInput::SpendingActivity can't mint!")
                        }
                    },
                    () -> {
                        __core__ifThenElse(
                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities____is(__cond_18),
                            () -> {
                                (__lhs_0_49) -> {
                                    DLA = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__activity(__lhs_0_49);
                                    __cond_20 = DLA;
                                    __core__ifThenElse(
                                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is(__cond_20),
                                        () -> {
                                            (__lhs_0_52) -> {
                                                __core__chooseUnit(__module__StellarHeliosHelpers__TODO("relay delegate installation sequence"), __core__chooseUnit(__helios__print("  -- TEMPORARY: the mint delegate is being replaced
"), true))
                                            }
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring____is(__cond_20),
                                                () -> {
                                                    (__lhs_0_51) -> {
                                                        __helios__error("DLA::Retiring can't mint!")
                                                    }
                                                },
                                                () -> {
                                                    (__lhs_0_50) -> {
                                                        __helios__error("DLA::ValidatingSettings can't mint!")
                                                    }
                                                }
                                            )()
                                        }
                                    )()(__cond_20)
                                }
                            },
                            () -> {
                                __core__ifThenElse(
                                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities____is(__cond_18),
                                    () -> {
                                        (__lhs_0_48) -> {
                                            __core__chooseUnit(__helios__print("  -- app-specific minting; trust mintDgt
"), __helios__bool__and(() -> {
                                                __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())
                                            }, () -> {
                                                true
                                            }))
                                        }
                                    },
                                    () -> {
                                        __core__ifThenElse(
                                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities____is(__cond_18),
                                            () -> {
                                                (__lhs_0_47) -> {
                                                    __core__chooseUnit(__helios__print("  -- app-specific burning; trust mintDgt"), __helios__bool__and(() -> {
                                                        __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())
                                                    }, () -> {
                                                        true
                                                    }))
                                                }
                                            },
                                            () -> {
                                                __core__ifThenElse(
                                                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData____is(__cond_18),
                                                    () -> {
                                                        (__lhs_0_46) -> {
                                                            __core__chooseUnit(__helios__print("  -- mint for dgData; trust mintDgt"), __helios__bool__and(() -> {
                                                                __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())
                                                            }, () -> {
                                                                true
                                                            }))
                                                        }
                                                    },
                                                    () -> {
                                                        __core__ifThenElse(
                                                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData____is(__cond_18),
                                                            () -> {
                                                                (__lhs_0_45) -> {
                                                                    __core__chooseUnit(__helios__print("  -- burn for dgData; trust mintDgt"), __helios__bool__and(() -> {
                                                                        __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())
                                                                    }, () -> {
                                                                        true
                                                                    }))
                                                                }
                                                            },
                                                            () -> {
                                                                __core__ifThenElse(
                                                                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData____is(__cond_18),
                                                                    () -> {
                                                                        (__lhs_0_44) -> {
                                                                            __helios__error("invalid mint-delegate activity for minting; UpdatingDelegatedDatum can't mint")
                                                                        }
                                                                    },
                                                                    () -> {
                                                                        (__lhs_0_34) -> {
                                                                            ma = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__activities(__lhs_0_34);
                                                                            __helios__bool__and(() -> {
                                                                                __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())
                                                                            }, () -> {
                                                                                __helios__list[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]]__all(__helios__list[__helios__data]__map[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]](ma)(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)))((mintDgtActivity_1) -> {
                                                                                    __cond_19 = mintDgtActivity_1;
                                                                                    __core__ifThenElse(
                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData____is(__cond_19),
                                                                                        () -> {
                                                                                            (__lhs_0_43) -> {
                                                                                                true
                                                                                            }
                                                                                        },
                                                                                        () -> {
                                                                                            __core__ifThenElse(
                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData____is(__cond_19),
                                                                                                () -> {
                                                                                                    (__lhs_0_42) -> {
                                                                                                        true
                                                                                                    }
                                                                                                },
                                                                                                () -> {
                                                                                                    __core__ifThenElse(
                                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities____is(__cond_19),
                                                                                                        () -> {
                                                                                                            (__lhs_0_41) -> {
                                                                                                                __helios__error("mintDgt: MultipleDelegateActivities: nested MintingActivities invalid")
                                                                                                            }
                                                                                                        },
                                                                                                        () -> {
                                                                                                            __core__ifThenElse(
                                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities____is(__cond_19),
                                                                                                                () -> {
                                                                                                                    (__lhs_0_40) -> {
                                                                                                                        __helios__error("mintDgt: MultipleDelegateActivities: nested BurningActivities invalid")
                                                                                                                    }
                                                                                                                },
                                                                                                                () -> {
                                                                                                                    __core__ifThenElse(
                                                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities____is(__cond_19),
                                                                                                                        () -> {
                                                                                                                            (__lhs_0_39) -> {
                                                                                                                                __helios__error("mintDgt: MultipleDelegateActivities: nested MultipleDelegateActivities invalid")
                                                                                                                            }
                                                                                                                        },
                                                                                                                        () -> {
                                                                                                                            __core__ifThenElse(
                                                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData____is(__cond_19),
                                                                                                                                () -> {
                                                                                                                                    (__lhs_0_38) -> {
                                                                                                                                        __helios__error("mintDgt: MultipleDelegateActivities: nested UpdatingDelegatedData invalid")
                                                                                                                                    }
                                                                                                                                },
                                                                                                                                () -> {
                                                                                                                                    __core__ifThenElse(
                                                                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities____is(__cond_19),
                                                                                                                                        () -> {
                                                                                                                                            (__lhs_0_37) -> {
                                                                                                                                                __helios__error("mintDgt: MultipleDelegateActivities: nested SpendingActivities invalid")
                                                                                                                                            }
                                                                                                                                        },
                                                                                                                                        () -> {
                                                                                                                                            __core__ifThenElse(
                                                                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is(__cond_19),
                                                                                                                                                () -> {
                                                                                                                                                    (__lhs_0_36) -> {
                                                                                                                                                        __helios__error("mintDgt: MultipleDelegateActivities: nested CapoLifecycleActivities invalid")
                                                                                                                                                    }
                                                                                                                                                },
                                                                                                                                                () -> {
                                                                                                                                                    (__lhs_0_35) -> {
                                                                                                                                                        __helios__error("mintDgt: MultipleDelegateActivities: nested DelegateLifecycleActivities invalid")
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
                                                                                    )()(__cond_19)
                                                                                })
                                                                            })
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
        )()(__cond_18))))))
    };
    __module__CapoMintHelpers__mkUutTnFactory = (seed) -> {
        seedTxId = __helios__txoutputid__tx_id(seed);
        seedIdx = __helios__txoutputid__index(seed);
        idxBytes = __helios__int__serialize(seedIdx)();
        rawTxId = __helios__bytearray__slice(__helios__txid__serialize(seedTxId)())(5, 37);
        txoInfo = __core__ifThenElse(
            __helios__int____gt(__helios__bytearray__length(idxBytes), 9),
            () -> {
                __core__chooseUnit(__helios__assert(false, "cbor(txoId) len > 9 !!"), idxBytes)
            },
            () -> {
                () -> {
                    __helios__bytearray____add(__helios__bytearray____add(rawTxId, __helios__string__encode_utf8("@")()), idxBytes)
                }()
            }
        )();
        miniHash = __helios__bytearray__slice(__helios__bytearray__blake2b(txoInfo)())(0, 6);
        mhs = __helios__bytearray__show(miniHash)();
        (p) -> {
            __helios__string____add(__helios__string____add(p, "-"), mhs)
        }
    };
    __helios__map[__helios__bytearray@__helios__int]__for_each = (self_122) -> {
        (fn_23) -> {
            recurse_67 = (recurse_66, map_17) -> {
                __core__chooseList(map_17, () -> {
                    ()
                }, () -> {
                    head_37 = __core__headList__safe(map_17);
                    __core__chooseUnit(fn_23(__helios__bytearray__from_data(__core__fstPair(head_37)), __helios__int__from_data(__core__sndPair(head_37))), recurse_66(recurse_66, __core__tailList__safe(map_17)))
                })()
            };
            recurse_67(recurse_67, self_122)
        }
    };
    __helios__list[__helios__bytearray]____to_data = __core__listData;
    __helios__list[__helios__bytearray]____eq = (self_123, other_3) -> {
        __core__equalsData(__helios__list[__helios__bytearray]____to_data(self_123), __helios__list[__helios__bytearray]____to_data(other_3))
    };
    __helios__map[__helios__bytearray@__helios__int]__fold[__helios__list[__helios__bytearray]] = (self_124) -> {
        (fn_24, z_2) -> {
            __helios__common__fold(self_124, (z_3, pair_28) -> {
                fn_24(z_3, __helios__bytearray__from_data(__core__fstPair(pair_28)), __helios__int__from_data(__core__sndPair(pair_28)))
            }, z_2)
        }
    };
    __helios__option[__helios__bytearray]__none____is = (data_97) -> {
        __helios__common__enum_tag_equals(data_97, 1)
    };
    __helios__list[__helios__bytearray]__prepend = (self_125) -> {
        (item_9) -> {
            __core__mkCons(__helios__bytearray____to_data(item_9), self_125)
        }
    };
    __helios__list[__helios__bytearray]__find_safe = (self_126) -> {
        (fn_25) -> {
            __helios__common__find_safe(self_126, (item_10) -> {
                fn_25(__helios__bytearray__from_data(item_10))
            }, __helios__common__identity)
        }
    };
    __helios__value__sum[__helios__value] = (self_127) -> {
        recurse_69 = (recurse_68, lst_16) -> {
            __core__chooseList(lst_16, () -> {
                __helios__value__ZERO
            }, () -> {
                __helios__value____add(__helios__value__value(__helios__value__from_data(__core__headList__safe(lst_16))), recurse_68(recurse_68, __core__tailList__safe(lst_16)))
            })()
        };
        recurse_69(recurse_69, self_127)
    };
    __helios__list[__helios__string]__map[__helios__value] = (self_128) -> {
        (fn_26) -> {
            __helios__common__map(self_128, (item_11) -> {
                __helios__value____to_data(fn_26(__helios__string__from_data(item_11)))
            }, __core__mkNilData(()))
        }
    };
    __helios__list[__helios__string]__sort = (self_129) -> {
        (comp_4) -> {
            __helios__common__sort(self_129, (a_14, b_14) -> {
                comp_4(__helios__string__from_data(a_14), __helios__string__from_data(b_14))
            })
        }
    };
    __module__CapoMintHelpers__validateUutMinting = (mph_20, seed_1, purposes, __useopt__mkTokenName, mkTokenName, __useopt__bootstrapCharter, bootstrapCharter, __useopt__otherMintedValue, otherMintedValue, __useopt__needsMintDelegateApproval, needsMintDelegateApproval, __useopt__extraMintDelegateRedeemerCheck_1, extraMintDelegateRedeemerCheck_2) -> {
        mkTokenName_1 = __core__ifThenElse(
            __useopt__mkTokenName,
            () -> {
                mkTokenName
            },
            () -> {
                __module__CapoMintHelpers__mkUutTnFactory(seed_1)
            }
        )();
        bootstrapCharter_1 = __core__ifThenElse(
            __useopt__bootstrapCharter,
            () -> {
                bootstrapCharter
            },
            () -> {
                __helios__value__ZERO
            }
        )();
        otherMintedValue_1 = __core__ifThenElse(
            __useopt__otherMintedValue,
            () -> {
                otherMintedValue
            },
            () -> {
                __helios__value__ZERO
            }
        )();
        needsMintDelegateApproval_1 = __core__ifThenElse(
            __useopt__needsMintDelegateApproval,
            () -> {
                needsMintDelegateApproval
            },
            () -> {
                true
            }
        )();
        extraMintDelegateRedeemerCheck_3 = __core__ifThenElse(
            __useopt__extraMintDelegateRedeemerCheck_1,
            () -> {
                extraMintDelegateRedeemerCheck_2
            },
            () -> {
                true
            }
        )();
        isBootstrapping = __helios__bool____not(__helios__value__is_zero(bootstrapCharter_1)());
        delegateApproval = __core__ifThenElse(
            isBootstrapping,
            () -> {
                true
            },
            () -> {
                () -> {
                    __lhs_0_56 = __helios__common__assert_constr_index(__module__CapoHelpers__getTxCharterDatum(mph_20, false, ()), 0);
                    mintDgt = __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink(__lhs_0_56);
                    __core__ifThenElse(
                        needsMintDelegateApproval_1,
                        () -> {
                            __module__CapoMintHelpers__requiresDelegateAuthorizingMint(mintDgt, mph_20, true, extraMintDelegateRedeemerCheck_3)
                        },
                        () -> {
                            () -> {
                                true
                            }()
                        }
                    )()
                }()
            }
        )();
        valueMinted = __helios__tx__minted(__helios__scriptcontext__tx);
        expectedValue = __helios__value____add(__helios__value____add(bootstrapCharter_1, otherMintedValue_1), __helios__value__sum[__helios__value](__helios__list[__helios__string]__map[__helios__value](__helios__list[__helios__string]__sort(purposes)((a_15, b_15) -> {
            __helios__string____neq(a_15, b_15)
        }))((purpose_2) -> {
            __module__StellarHeliosHelpers__mkTv(mph_20, true, mkTokenName_1(purpose_2), false, (), false, ())
        })));
        __core__chooseUnit(__core__ifThenElse(
            __helios__bool____not(__helios__value__contains_policy(valueMinted)(mph_20)),
            () -> {
                __core__chooseUnit(__helios__print("  -- no mint from our policy at (mph, valueMinted): ( "), __core__chooseUnit(__helios__print(__helios__mintingpolicyhash__show(mph_20)()), __core__chooseUnit(__helios__print(__helios__value__show(valueMinted)()), __core__chooseUnit(__helios__print(")
"), __helios__error("validateUutMinting(): no mint")))))
            },
            () -> {
                () -> {
                    __helios__assert(true, "no")
                }()
            }
        )(), __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add("
  -- uut-minting seed: ", __helios__txid__show(__helios__txoutputid__tx_id(seed_1))()), "🔹#"), __helios__int__show(__helios__txoutputid__index(seed_1))()), "
")), __core__chooseUnit(__helios__map[__helios__bytearray@__helios__int]__for_each(__helios__value__get_policy(expectedValue)(mph_20))((b_19, i_10) -> {
            __helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add("    ℹ️ 🐞 expected: ", __helios__int__show(i_10)()), "x "), __helios__bytearray__decode_utf8(b_19)()), "
"))
        }), actualMint = __helios__value__get_policy(valueMinted)(mph_20);
        __core__chooseUnit(__core__ifThenElse(
            true,
            () -> {
                __core__chooseUnit(__helios__map[__helios__bytearray@__helios__int]__for_each(actualMint)((b_18, i_9) -> {
                    __helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add("    ℹ️ 🐞   actual: ", __helios__int__show(i_9)()), "x "), __helios__bytearray__decode_utf8(b_18)()), "
"))
                }), __core__chooseUnit(__helios__print(__helios__value__show(__helios__value__from_map(__helios__map[__helios__mintingpolicyhash@__helios__map[__helios__bytearray@__helios__int]]__filter(__helios__value__to_map(valueMinted)())((b_17, __11) -> {
                    __helios__mintingpolicyhash____neq(b_17, mph_20)
                })))()), __helios__print("^ other policy values minted 
")))
            },
            () -> {
                () -> {
                    __helios__assert(true, "never")
                }()
            }
        )(), temp = __helios__map[__helios__bytearray@__helios__int]__fold[__helios__list[__helios__bytearray]](actualMint)((l, b_16, i_8) -> {
            __cond_22 = __helios__list[__helios__bytearray]__find_safe(l)((x_6) -> {
                __helios__bytearray____eq(x_6, b_16)
            });
            __core__ifThenElse(
                __helios__option[__helios__bytearray]__none____is(__cond_22),
                () -> {
                    (__lhs_0_58) -> {
                        __helios__list[__helios__bytearray]__prepend(l)(b_16)
                    }
                },
                () -> {
                    (__lhs_0_57) -> {
                        __helios__error("UUT duplicate purpose ")
                    }
                }
            )()(__cond_22)
        }, __core__mkNilData(()));
        __core__chooseUnit(__helios__assert(__helios__bool__or(() -> {
            true
        }, () -> {
            __helios__list[__helios__bytearray]____eq(temp, temp)
        }), "prevent unused var"), expectationsMet = __helios__value____eq(valueMinted, expectedValue);
        __core__chooseUnit(__helios__assert(expectationsMet, "mismatch in UUT mint"), __core__chooseUnit(__helios__assert(__module__CapoMintHelpers__hasSeedUtxo(__helios__scriptcontext__tx, seed_1), "no seed"), __core__chooseUnit(__helios__print(" ✅ validateUutMinting:  ok!
"), __helios__bool__and(() -> {
            delegateApproval
        }, () -> {
            expectationsMet
        })))))))))
    };
    __helios__list[__helios__txinput]__find = (self_130) -> {
        (fn_27) -> {
            recurse_71 = (recurse_70, lst_17) -> {
                __core__chooseList(lst_17, () -> {
                    __helios__error("not found")
                }, () -> {
                    item_12 = __helios__txinput__from_data(__core__headList__safe(lst_17));
                    __core__ifThenElse(
                        fn_27(item_12),
                        () -> {
                            item_12
                        },
                        () -> {
                            recurse_70(recurse_70, __core__tailList__safe(lst_17))
                        }
                    )()
                })()
            };
            recurse_71(recurse_71, self_130)
        }
    };
    __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex = (mph_21, purpose_3, seed_2, charterRedeemerIndex, __useopt__otherMintedValue_1, otherMintedValue_2, __useopt__needsMintDelegateApproval_1, needsMintDelegateApproval_2, __useopt__extraMintDelegateRedeemerCheck_2, extraMintDelegateRedeemerCheck_4) -> {
        otherMintedValue_3 = __core__ifThenElse(
            __useopt__otherMintedValue_1,
            () -> {
                otherMintedValue_2
            },
            () -> {
                __helios__value__new(__helios__assetclass__ADA, 0)
            }
        )();
        needsMintDelegateApproval_3 = __core__ifThenElse(
            __useopt__needsMintDelegateApproval_1,
            () -> {
                needsMintDelegateApproval_2
            },
            () -> {
                true
            }
        )();
        extraMintDelegateRedeemerCheck_5 = __core__ifThenElse(
            __useopt__extraMintDelegateRedeemerCheck_2,
            () -> {
                extraMintDelegateRedeemerCheck_4
            },
            () -> {
                true
            }
        )();
        chVal_2 = __module__StellarHeliosHelpers__tvCharter(mph_21);
        __core__chooseUnit(__module__StellarHeliosHelpers__REQT("ensures granted authority, implied by requiring the charter to be spent with the indicated minting activity"), hasCharter_2 = (txin_2) -> {
            __helios__value__contains(__helios__txinput__value(txin_2))(chVal_2)
        };
        __core__chooseUnit(__helios__print("  --- finding required charter input
"), charterInput = __helios__list[__helios__txinput]__find(__helios__tx__inputs(__helios__scriptcontext__tx))(hasCharter_2);
        __core__chooseUnit(__helios__print("  <-- found charter input
"), charterRedeemer = __module__StellarHeliosHelpers__mustFindInputRedeemer(charterInput);
        __helios__bool__and(() -> {
            __helios__bool__and(() -> {
                __cond_23 = charterRedeemer;
                __core__ifThenElse(
                    __helios__data__constrdata____is(__cond_23),
                    () -> {
                        (__lhs_0_59) -> {
                            index_9 = __helios__data__constrdata__tag(__lhs_0_59);
                            __core__ifThenElse(
                                __helios__int____eq(index_9, charterRedeemerIndex),
                                () -> {
                                    true
                                },
                                () -> {
                                    () -> {
                                        __helios__error(__helios__string____add(__helios__string____add(__helios__string____add("wrong charter Activity for adding spend invariant; expected redeemer #", __helios__int__show(charterRedeemerIndex)()), ", got "), __helios__int__show(index_9)()))
                                    }()
                                }
                            )()
                        }
                    },
                    () -> {
                        (__12) -> {
                            __helios__error("incontheeivable!")
                        }
                    }
                )()(__cond_23)
            }, () -> {
                __module__CapoMintHelpers__validateUutMinting(mph_21, seed_2, __core__mkCons(__helios__string____to_data(purpose_3), __core__mkNilData(())), true, __module__CapoMintHelpers__mkUutTnFactory(seed_2), false, (), true, otherMintedValue_3, true, needsMintDelegateApproval_3, true, extraMintDelegateRedeemerCheck_5)
            })
        }, () -> {
            __core__ifThenElse(
                true,
                () -> {
                    __core__chooseUnit(__helios__print("  -- CMH: mint UUT "), __core__chooseUnit(__helios__print(purpose_3), __core__chooseUnit(__helios__print(" w/ charter redeemer #"), __core__chooseUnit(__helios__print(__helios__int__show(charterRedeemerIndex)()), __core__chooseUnit(__helios__print("
"), true)))))
                },
                () -> {
                    () -> {
                        true
                    }()
                }
            )()
        }))))
    };
    __module__CapoMintHelpers__MinterActivity[]__is_valid_data = (__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data) -> {
        (data_98) -> {
            __core__ifThenElse(
                __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data(data_98),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data(data_98),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data(data_98),
                                () -> {
                                    true
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data(data_98),
                                        () -> {
                                            true
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data(data_98),
                                                () -> {
                                                    true
                                                },
                                                () -> {
                                                    __core__ifThenElse(
                                                        __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data(data_98),
                                                        () -> {
                                                            true
                                                        },
                                                        () -> {
                                                            false
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
    };
    __module__CapoMintHelpers__MinterActivity[]__from_data = (__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_1) -> {
        (data_99) -> {
            ignore_6 = __core__ifThenElse(
                __module__CapoMintHelpers__MinterActivity[]__is_valid_data(__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_1)(data_99),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid MinterActivity data", ())
                }
            )();
            data_99
        }
    };
    __module__CapoMintHelpers__MinterActivity[]__mintingCharter____is = (data_100) -> {
        __helios__common__enum_tag_equals(data_100, 0)
    };
    __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_2 = (data_101) -> {
        __core__chooseData(data_101, () -> {
            pair_29 = __core__unConstrData__safe(data_101);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_29), 0),
                () -> {
                    data_102 = __core__listData(__core__sndPair(pair_29));
                    __core__chooseData(data_102, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_58 = __core__unListData__safe(data_102);
                        __core__chooseList(fields_58, () -> {
                            false
                        }, () -> {
                            head_38 = __core__headList__safe(fields_58);
                            __core__ifThenElse(
                                __helios__address__is_valid_data(head_38),
                                () -> {
                                    fields_59 = __core__tailList__safe(fields_58);
                                    __core__chooseList(fields_59, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__mintingCharter__owner = (self_131) -> {
        __helios__address__from_data(__helios__common__enum_field_0(self_131, "MinterActivity[]__mintingCharter__owner"))
    };
    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing____is = (data_103) -> {
        __helios__common__enum_tag_equals(data_103, 1)
    };
    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_2 = (data_104) -> {
        __core__chooseData(data_104, () -> {
            pair_30 = __core__unConstrData__safe(data_104);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_30), 1),
                () -> {
                    data_105 = __core__listData(__core__sndPair(pair_30));
                    __core__chooseData(data_105, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_60 = __core__unListData__safe(data_105);
                        __core__chooseList(fields_60, true, false)
                    }, () -> {
                        false
                    }, () -> {
                        false
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
    __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant____is = (data_106) -> {
        __helios__common__enum_tag_equals(data_106, 2)
    };
    __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_2 = (data_107) -> {
        __core__chooseData(data_107, () -> {
            pair_31 = __core__unConstrData__safe(data_107);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_31), 2),
                () -> {
                    data_108 = __core__listData(__core__sndPair(pair_31));
                    __core__chooseData(data_108, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_61 = __core__unListData__safe(data_108);
                        __core__chooseList(fields_61, () -> {
                            false
                        }, () -> {
                            head_39 = __core__headList__safe(fields_61);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_39),
                                () -> {
                                    fields_62 = __core__tailList__safe(fields_61);
                                    __core__chooseList(fields_62, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__seed = (self_132) -> {
        __helios__txoutputid__from_data(__helios__common__enum_field_0(self_132, "MinterActivity[]__addingMintInvariant__seed"))
    };
    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant____is = (data_109) -> {
        __helios__common__enum_tag_equals(data_109, 3)
    };
    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_2 = (data_110) -> {
        __core__chooseData(data_110, () -> {
            pair_32 = __core__unConstrData__safe(data_110);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_32), 3),
                () -> {
                    data_111 = __core__listData(__core__sndPair(pair_32));
                    __core__chooseData(data_111, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_63 = __core__unListData__safe(data_111);
                        __core__chooseList(fields_63, () -> {
                            false
                        }, () -> {
                            head_40 = __core__headList__safe(fields_63);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_40),
                                () -> {
                                    fields_64 = __core__tailList__safe(fields_63);
                                    __core__chooseList(fields_64, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__seed = (self_133) -> {
        __helios__txoutputid__from_data(__helios__common__enum_field_0(self_133, "MinterActivity[]__addingSpendInvariant__seed"))
    };
    __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate____is = (data_112) -> {
        __helios__common__enum_tag_equals(data_112, 4)
    };
    __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_2 = (data_113) -> {
        __core__chooseData(data_113, () -> {
            pair_33 = __core__unConstrData__safe(data_113);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_33), 4),
                () -> {
                    data_114 = __core__listData(__core__sndPair(pair_33));
                    __core__chooseData(data_114, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_65 = __core__unListData__safe(data_114);
                        __core__chooseList(fields_65, () -> {
                            false
                        }, () -> {
                            head_41 = __core__headList__safe(fields_65);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_41),
                                () -> {
                                    fields_66 = __core__tailList__safe(fields_65);
                                    __core__chooseList(fields_66, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__seed = (self_134) -> {
        __helios__txoutputid__from_data(__helios__common__enum_field_0(self_134, "MinterActivity[]__ForcingNewMintDelegate__seed"))
    };
    __helios__option[__helios__bytearray]__is_valid_data = (data_115) -> {
        __core__chooseData(data_115, () -> {
            pair_34 = __core__unConstrData__safe(data_115);
            index_10 = __core__fstPair(pair_34);
            fields_67 = __core__sndPair(pair_34);
            __core__ifThenElse(
                __core__equalsInteger(index_10, 0),
                () -> {
                    __core__chooseList(fields_67, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_67), () -> {
                            __helios__bytearray__is_valid_data(__core__headList__safe(fields_67))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_10, 1),
                        () -> {
                            __core__chooseList(fields_67, true, false)
                        },
                        () -> {
                            false
                        }
                    )()
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
    __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_2 = (data_116) -> {
        __core__chooseData(data_116, () -> {
            pair_35 = __core__unConstrData__safe(data_116);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_35), 5),
                () -> {
                    data_117 = __core__listData(__core__sndPair(pair_35));
                    __core__chooseData(data_117, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_68 = __core__unListData__safe(data_117);
                        __core__chooseList(fields_68, () -> {
                            false
                        }, () -> {
                            head_42 = __core__headList__safe(fields_68);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_42),
                                () -> {
                                    fields_69 = __core__tailList__safe(fields_68);
                                    __core__chooseList(fields_69, () -> {
                                        false
                                    }, () -> {
                                        head_43 = __core__headList__safe(fields_69);
                                        __core__ifThenElse(
                                            __helios__option[__helios__bytearray]__is_valid_data(head_43),
                                            () -> {
                                                fields_70 = __core__tailList__safe(fields_69);
                                                __core__chooseList(fields_70, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__seed = (self_135) -> {
        __helios__txoutputid__from_data(__helios__common__enum_field_0(self_135, "MinterActivity[]__CreatingNewSpendDelegate__seed"))
    };
    __helios__option[__helios__bytearray]__from_data = (data_118) -> {
        __13 = __core__ifThenElse(
            __helios__option[__helios__bytearray]__is_valid_data(data_118),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid option data", ())
            }
        )();
        data_118
    };
    __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__replacingUut = (self_136) -> {
        __helios__option[__helios__bytearray]__from_data(__helios__common__enum_field_1(self_136))
    };
    __module__CapoMinter__seedTxn = __helios__txid__from_data(__core__constrData(0, __core__mkCons(__core__bData(#0000000000000000000000000000000000000000000000000000000000000000), __core__mkNilData(()))));
    __module__CapoMinter__seedIndex = __helios__int__from_data(__core__iData(0));
    __module__CapoMinter__rev = __helios__int__from_data(__core__iData(1));
    __module__CapoMinter__hasContractSeedUtxo = (tx_1) -> {
        __module__CapoMintHelpers__hasSeedUtxo(tx_1, __helios__txoutputid__new(__module__CapoMinter__seedTxn, __module__CapoMinter__seedIndex))
    };
    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__length = __helios__common__length;
    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__length = (self_137) -> {
        __helios__common__length(self_137)
    };
    __helios__option[__helios__bytearray]__some____is = (data_119) -> {
        __helios__common__enum_tag_equals(data_119, 0)
    };
    __helios__option[__helios__bytearray]__some__some = (self_138) -> {
        __helios__bytearray__from_data(__helios__common__enum_field_0(self_138, "option[bytearray] some"))
    };
    __module__CapoMinter__main = (r) -> {
        mph_22 = __helios__scriptcontext__get_current_minting_policy_hash();
        value_minted = __helios__tx__minted(__helios__scriptcontext__tx);
        __core__chooseUnit(__helios__assert(__helios__bool__or(() -> {
            true
        }, () -> {
            __helios__bytearray____eq(__helios__int__serialize(__module__CapoMinter__rev)(), __helios__int__serialize(__module__CapoMinter__rev)())
        }), "no"), __core__chooseUnit(__helios__print(" 🚥❓ Capo minter: "), __core__chooseUnit(__helios__print(__helios__mintingpolicyhash__show(__helios__scriptcontext__get_current_minting_policy_hash())()), __core__chooseUnit(__helios__print("
"), (ok) -> {
            __core__chooseUnit(__helios__print("

🚥🟢 Capo minter: ok!
"), ok)
        }(__cond_24 = r;
        __core__ifThenElse(
            __module__CapoMintHelpers__MinterActivity[]__mintingCharter____is(__cond_24),
            () -> {
                (charter_2) -> {
                    charterVal = __module__StellarHeliosHelpers__mkTv(mph_22, true, "charter", false, (), false, ());
                    authTnBase = "capoGov";
                    mintDgtTnBase = "mintDgt";
                    spendDgtTnBase = "spendDgt";
                    purposes_1 = __core__mkCons(__helios__string____to_data(authTnBase), __core__mkCons(__helios__string____to_data(mintDgtTnBase), __core__mkCons(__helios__string____to_data(spendDgtTnBase), __core__mkNilData(()))));
                    __core__chooseUnit(__helios__assert(__helios__value____geq(value_minted, charterVal), "charter token not minted"), __core__chooseUnit(__helios__print("  -- creating charter"), hasSeed = __module__CapoMinter__hasContractSeedUtxo(__helios__scriptcontext__tx);
                    minterSeed = __helios__txoutputid__new(__module__CapoMinter__seedTxn, __module__CapoMinter__seedIndex);
                    mkUutName = __module__CapoMintHelpers__mkUutTnFactory(minterSeed);
                    mintsUuts = __module__CapoMintHelpers__validateUutMinting(mph_22, minterSeed, purposes_1, true, mkUutName, true, charterVal, false, (), false, (), false, ());
                    charterOutput = __helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output_1) -> {
                        __helios__bool__and(() -> {
                            __helios__address____eq(__helios__txoutput__address(output_1), __module__CapoMintHelpers__MinterActivity[]__mintingCharter__owner(charter_2))
                        }, () -> {
                            __helios__value__contains(__helios__txoutput__value(output_1))(charterVal)
                        })
                    });
                    charterData = __helios__txoutputdatum__inline(__helios__txoutput__datum(charterOutput));
                    charterDatum = __module__CapoHelpers__CapoDatum[]__CharterToken__from_data(charterData);
                    __lhs_0_67 = __helios__common__assert_constr_index(charterDatum, 0);
                    spendDgt = __module__CapoHelpers__CapoDatum[]__CharterToken__spendDelegateLink(__lhs_0_67);
                    spendInvariants = __module__CapoHelpers__CapoDatum[]__CharterToken__spendInvariants(__lhs_0_67);
                    namedDelegates = __module__CapoHelpers__CapoDatum[]__CharterToken__namedDelegates(__lhs_0_67);
                    mintDgt_1 = __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink(__lhs_0_67);
                    mintInvariants = __module__CapoHelpers__CapoDatum[]__CharterToken__mintInvariants(__lhs_0_67);
                    authDgt = __module__CapoHelpers__CapoDatum[]__CharterToken__govAuthorityLink(__lhs_0_67);
                    __core__chooseUnit(__helios__assert(__helios__int____eq(__helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__length(mintInvariants), 0), "no mint invariants allowed at charter creation"), __core__chooseUnit(__helios__assert(__helios__int____eq(__helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__length(spendInvariants), 0), "no spend invariants allowed at charter creation"), __core__chooseUnit(__helios__assert(__helios__int____eq(__helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__length(namedDelegates), 0), "no named delegates allowed at charter creation"), __core__chooseUnit(__helios__print("  -- checking for required delegates
"), hasGoodDelegates = __helios__bool__and(() -> {
                        __helios__bool__and(() -> {
                            __helios__bool__and(() -> {
                                true
                            }, () -> {
                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(authDgt)(mph_22, true, true, true, __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new())
                            })
                        }, () -> {
                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(mintDgt_1)(mph_22, true, true, true, __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new())
                        })
                    }, () -> {
                        __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(spendDgt)(mph_22, true, true, true, __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new())
                    });
                    __core__chooseUnit(__helios__print(__helios__string____add("
  -- hasSeed: ", __helios__bool__show(hasSeed)())), __core__chooseUnit(__helios__print(__helios__string____add("
  -- mintsUuts: ", __helios__bool__show(mintsUuts)())), __core__chooseUnit(__helios__print(__helios__string____add("
  -- hasGoodDelegates: ", __helios__bool__show(hasGoodDelegates)())), __helios__bool__and(() -> {
                        __helios__bool__and(() -> {
                            hasGoodDelegates
                        }, () -> {
                            mintsUuts
                        })
                    }, () -> {
                        hasSeed
                    }))))))))))
                }
            },
            () -> {
                __core__ifThenElse(
                    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing____is(__cond_24),
                    () -> {
                        (__lhs_0_66) -> {
                            __core__chooseUnit(__helios__print("mintWithDelegateAuthorizing
"), __module__CapoMintHelpers__requiresMintDelegateApproval(mph_22))
                        }
                    },
                    () -> {
                        __core__ifThenElse(
                            __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant____is(__cond_24),
                            () -> {
                                (__lhs_0_65) -> {
                                    seed_6 = __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__seed(__lhs_0_65);
                                    addMintInvariant = 3;
                                    __core__chooseUnit(__helios__print("checking for addingMintInvariant
"), __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(mph_22, "mintInvar", seed_6, addMintInvariant, false, (), false, (), false, ()))
                                }
                            },
                            () -> {
                                __core__ifThenElse(
                                    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant____is(__cond_24),
                                    () -> {
                                        (__lhs_0_64) -> {
                                            seed_5 = __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__seed(__lhs_0_64);
                                            addSpendInvariant = 4;
                                            __core__chooseUnit(__helios__print("checking for addingSpendInvariant
"), __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(mph_22, "spendInvar", seed_5, addSpendInvariant, false, (), false, (), false, ()))
                                        }
                                    },
                                    () -> {
                                        __core__ifThenElse(
                                            __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate____is(__cond_24),
                                            () -> {
                                                (__lhs_0_63) -> {
                                                    seed_4 = __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__seed(__lhs_0_63);
                                                    updatingCharter_1 = 1;
                                                    __core__chooseUnit(__helios__print("checking for ForcingNewMintDelegate
"), __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(mph_22, "mintDgt", seed_4, updatingCharter_1, false, (), true, false, false, ()))
                                                }
                                            },
                                            () -> {
                                                (__lhs_0_60) -> {
                                                    seed_3 = __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__seed(__lhs_0_60);
                                                    replaceExisting = __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__replacingUut(__lhs_0_60);
                                                    __core__chooseUnit(__helios__print("checking for CreatingNewSpendDelegate
"), (otherMintedValue_4) -> {
                                                        updatingCharter = 1;
                                                        __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(mph_22, "spendDgt", seed_3, updatingCharter, true, otherMintedValue_4, true, false, false, ())
                                                    }(__cond_25 = replaceExisting;
                                                    __core__ifThenElse(
                                                        __helios__option[__helios__bytearray]__some____is(__cond_25),
                                                        () -> {
                                                            (__lhs_0_62) -> {
                                                                oldTokenName = __helios__option[__helios__bytearray]__some__some(__lhs_0_62);
                                                                BURNED = __helios__int____neg(1);
                                                                __helios__value__new(__helios__assetclass__new(mph_22, oldTokenName), BURNED)
                                                            }
                                                        },
                                                        () -> {
                                                            (__lhs_0_61) -> {
                                                                __helios__value__ZERO
                                                            }
                                                        }
                                                    )()(__cond_25)))
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
        )()(__cond_24))))))
    };
    __core__ifThenElse(
        __module__CapoMinter__main(__module__CapoMintHelpers__MinterActivity[]__from_data(__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_2)(__REDEEMER)),
        () -> {
            ()
        },
        () -> {
            __helios__error("validation returned false")
        }
    )()
}`
    const json = {
    "version": "PlutusV2",
    "createdBy": "932",
    "optimizeOptions": {},
    "programElements": {
        "src/minting/CapoMinter.hl": "bff6dbccc6adf55a34a3c47e1f7958f83443f41c145392a3f1c2525ff2f48eb0",
        "src/CapoMintHelpers.hl": "d927ca9db0b53a9894b87c942beadda7c283cd7aec342ada3540513d15f1069f",
        "src/delegation/CapoDelegateHelpers.hl": "04e4a58bef81dbee713ca8b1cf872bbb52d5103d9a19e577e35d045e94b883d2",
        "src/StellarHeliosHelpers.hl": "3ca49c4f0f0353e07621f0eea4f9418ea0d00e4fb2f3ee335d20d65e3c9d2543",
        "src/CapoHelpers.hl": "cb754340520fa49f415a56170c2354fbc388066b05cf8634965e944bd952585b",
        "src/TypeMapMetadata.hl": "6b2e8d518b38644ca648efa5de4529469c5cdeb09360bdf4987e463078be4e4f",
        "params": {
        "CapoMinter::seedTxn": "const seedTxn: TxId = ##d8799f58200000000000000000000000000000000000000000000000000000000000000000ff;",
        "CapoMinter::seedIndex": "const seedIndex: Int = ##00;",
        "CapoMinter::rev": "const rev: Int = ##01;"
        }
    },
    "unoptimized": "59440c59440901000022323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232533357346002666666603a03603002c02602001a1e00429309877012491976616c69646174696f6e2072657475726e65642066616c73650023232335736661de04661dc0429444cc3b4094c3ac080254c3ac08025241026e6f0033573661d40492011620f09f9aa5e29d93204361706f206d696e7465723a200033573661d404a61ce04a1ba0466ae6cc3a809241010a003233573661d60492011c0a0af09f9aa5f09f9fa2204361706f206d696e7465723a206f6b210a0000132353335734603e00224646464646466ae6ccc3d808cc36008020015241186368617274657220746f6b656e206e6f74206d696e7465640033573661e20492011520202d2d206372656174696e6720636861727465720032323232323232323232323232323357366610806661ca04603800490002492e6e6f206d696e7420696e76617269616e747320616c6c6f7765642061742063686172746572206372656174696f6e003357366610806661ca04603800a90002492f6e6f207370656e6420696e76617269616e747320616c6c6f7765642061742063686172746572206372656174696f6e003357366610806661ca04603600890002492e6e6f206e616d65642064656c65676174657320616c6c6f7765642061742063686172746572206372656174696f6e0033573661fe0492012520202d2d20636865636b696e6720666f722072657175697265642064656c6567617465730a0032335736610006661ca049210f0a20202d2d20686173536565643a2000530e40200f335736610006661ca04921110a20202d2d206d696e7473557574733a2000530e40200c335736610006661ca04921180a20202d2d20686173476f6f6444656c6567617465733a2000530e402001330e3021330e3021001100c100f330e2021330e2021330e20214a226666661000200202e94528a515093011333333080010030174a294528a8498089999998400080300ba514a2945424c04c1b8018c1b8014c1b8010c1b800cc1bc008c1c0004cc368080052000307000130d70230d402001330b90130d2020d1022330d9021330d00230cf02001302800b1330ce0230cd0200100a333333333333302d00c0020044a20029440212824c941264a093181b800998630100980918078668119aba030c30200333574061860400466ae80c30c08004dd8a4c921087370656e64446774004901076d696e74446774004901076361706f476f760033333330b2010044a292010763686172746572004a09325049854ccd5cd180e0008919ab9b30ec0249011c6d696e745769746844656c6567617465417574686f72697a696e670a003031004153335734603400224646466ae6cc3b80924121636865636b696e6720666f7220616464696e674d696e74496e76617269616e740a0033333333330250064901096d696e74496e766172000020014a0932504992824c9003180c8008a999ab9a301700112323233573661dc0492122636865636b696e6720666f7220616464696e675370656e64496e76617269616e740a00333333333302500649010a7370656e64496e766172000020014a0932504992824c9004180b0008a999ab9a301400112323233573661dc0492124636865636b696e6720666f7220466f7263696e674e65774d696e7444656c65676174650a0033333333330250064901076d696e74446774000020014a0932514a09412648008c04c00448c8c8cd5cd98770124926636865636b696e6720666f72204372656174696e674e65775370656e6444656c65676174650a00323233333333330270084901087370656e64446774000040014a200494528250499200232353335734601400224646466186046618004014004002617c049001180500089061010008009807801180800080080198590106281286d81118718118700100091985701000a40004615804002154044660600026616e04008006614e04980101010030a6024c0101000030a3024c0126d8799f58200000000000000000000000000000000000000000000000000000000000000000ff002300230d602001232002533357346008002293099ab9c4911c5761726e696e673a20696e76616c6964206f7074696f6e2064617461004988c28008c3580800494cccccd5d20008992999ab9a3370e6aae74005200a1325333333574800229405280992999aab9f00114a0264a666ae68c278080044c94ccd55cf8008a50132533357346010002264666aae7c00528a50357440042940d5d08009aba200214a06ae84004dd60008a5014a06e9cd55cf0008a50375400229405280a5014a04a666666ae900044c8c8c94ccd5cd19b870024800054ccd55cf8008a50153335573e6ae880044c26c08d5d08008a5015333573466e1c009200213335573e002945280a5035573c0046aae74004dd50008a5014a029405281184e8118698100092999999aba40011325333573466e1cd55ce800a4010264a666666ae900045280a5013253335573e00229404c94ccd5cd184d81000899199aab9f0014a2940d5d10010a50357420026eb00045280a50374e6aae780045281baa00114a029405280a502330a002001480208c26808c3400800494cccccd5d20008992999ab9a3370e6aae7400520061325333333574800229405280992999aab9f00114a0264a666ae68c260080044c8ccd55cf800a514a06ae880085281aba1001375800229405281ba735573c0022940dd50008a5014a0294052811984e81000a400c4612e04619a040024a666666ae900044c94ccd5cd19b8735573a00290020992999999aba400114a029404c94ccd55cf8008a5013253335734612a04002264666aae7c00528a50357440042940d5d08009bac00114a02940dd39aab9e00114a06ea80045280a5014a029408cc268080052004253333335748002264a666ae68cdc39aab9d001480084c94cccccd5d20008a5014a0264666aae7c00528a50375800229405281ba735573c0022940dd50008a5014a0294052811984c01000a400446116046190040024a666666ae900044c94ccd5cd19b8735573a00290000992999999aba400114a029404c94ccd55cf8008a5013253335734610a04002264666aae7c00528a50357440042940d5d08009bac00114a02940dd39aab9e00114a06ea80045280a5014a029408cc25408005200022222223200253335734666666601000e00c00a008006004002293099ab9c491245761726e696e673a20696e76616c6964204d696e746572416374697669747920646174610049888888894ccd5cd18010008a511533357346006002294454ccd5cd18020008a51153335734600a002294454ccd5cd18030008a51153335734600e002294452811111111111919191919ab9b309e014916b656e7375726573206772616e74656420617574686f726974792c20696d706c69656420627920726571756972696e6720746865206368617274657220746f206265207370656e7420776974682074686520696e64696361746564206d696e74696e67206163746976697479003233573661b00492012520202d2d2d2066696e64696e67207265717569726564206368617274657220696e7075740a003233573661b20492011a20203c2d2d20666f756e64206368617274657220696e7075740a0032330bd021330bd02132353335734611a040022464a666ae68cc30c080040445288a898718119861011986101198610124814677726f6e67206368617274657220416374697669747920666f7220616464696e67207370656e6420696e76617269616e743b2065787065637465642072656465656d65722023005308d020114901062c20676f7420005308d02001308b020011230e20249110696e636f6e74686565697661626c6521000010011333333333333301301100f335740615a040206ec5264a2603c01e941264a200e944019288028a999ab9a4a2266ae6cc368092411320202d2d20434d483a206d696e7420555554200033573661b40402066ae6cc368092411620772f20636861727465722072656465656d657220230033573661b404a61140401c66ae6cc368092401010a004a22a2944c26004004cc040c218082d0080048cc2c008c21008004008c26c040354ccd5cd00208018a515333573400a200829454ccd5cd00308028998520107f00a400044646600200200644a666aae7c0044c34809241096e6f7420666f756e640013253335734600800220022660060066ae88008c3d804d5d0800911111111111119191919191919191919ab9b53335734619e046610c0400402c266ae6cc374092413620202d2d206e6f206d696e742066726f6d206f757220706f6c69637920617420286d70682c2076616c75654d696e746564293a2028200033573661ba04a61b40402c66ae6cc374094c20c08008cd5cd986e8124902290a0030e30249011d76616c69646174655575744d696e74696e6728293a206e6f206d696e7400151330e2024a2921026e6f0033573661ba0466184046618404661840466184049201180a20202d2d207575742d6d696e74696e6720736565643a20005308102308002015490105f09f94b923005308d0230ff010154901010a0033573666040661fc0200202c4461be04661880466188046618804661880492011a20202020e284b9efb88f20f09f909e2065787065637465643a20005308f02001490102782000530ff010024901010a0032335736a666ae6928899ab9b330210012230e002330c502330c502330c502330c5024911a20202020e284b9efb88f20f09f909e20202061637475616c3a2000530900200149010278200053080020024901010a0033573661bc04a61080461fa02660baa61f80200644661f80200403261bc049211e5e206f7468657220706f6c6963792076616c756573206d696e746564200a00151330e3024a2921056e657665720032335736661c804661c60429444cc08000400524011270726576656e7420756e75736564207661720032335736661ca040029201146d69736d6174636820696e20555554206d696e7400335736661ca046605a178040309201076e6f20736565640033573661c00492011e20e29c852076616c69646174655575744d696e74696e673a20206f6b210a00330c30210061001330fa0100400333301e001222323533357346042002246604200a0082461d20492116555554206475706c696361746520707572706f736520000013301e0032330e5020010033762931987f0080100b1987a009987a00803803180c1980b9980b009911987a00801000919999998518080b25130090014a093250498c290082dc094ccd5cd0008a5115132325333573400a2666604800202a9440105452898268009985e01199824009a50499200030cb02530ed010045333573400c200a29454ccd5cd00388030a5153335734010200e215004a666ae680244020429c094ccd5cd00508048980c006111986d008011119801986d80801186d808009119986b808011186b809801186c808009bb14988c8cc004004008894ccd55cf800884c8109986f80986a80986a009aba10013300200235744002446661a20200446004618404002114044466ae80c250080040088cc2280800520022223330eb010032233300400230c10235573a0026116046aae7800400488cdd798018011801800ba72232330010010032253335573e00229309919ab9b3300430be0235573a0026110046aae78004cc00c00cd5d10011aba10012323232323232322330aa02330aa02001491012d00002530c1020013330cb01530ca0100148001200c533357346619002618e020049009099ab9b330c6024a09211663626f722874786f496429206c656e203e203920212100002151330c601330c601001530c50149010140000023330c901530c20100348029204a530c00200130e00100230e001001232335736617a04921254d696e746572206e65656473206d696e74446774202b206d696e742061637469766974790a003357366108029201634558504543545320746865206170706c69636174696f6e2d7370656369666963206d696e7444656c656761746520746f206578706c696369746c7920636865636b20616e6420617070726f7665207468652066756c6c206d696e7465642076616c756500335736617a04920148202020202d2d205e20652e672e206173736572742874782e6d696e7465642e6765745f706f6c696379286d706829203d3d2065787065637465644d696e74656456616c7565293b0a00335736617a0492013b202020202d2d2d2d202869662069742773206f6e6c7920726573706f6e7369626c6520666f72206f6e65206d696e74696e6720706f6c696379290a00335736610a0292011f6d75737420656e666f726365206d696e74696e6720696e76617269616e74730032323235333573460e00022464646466ae6cc3100924013e20202d2d206d696e7465722077616e7473206d696e74446774202b204361706f4c6966656379636c65202864656c65676174652d6372656174696f6e290a00330a70213330260074a0930a51001001306f00115333573460d400224618e049212b44656c6567617465496e7075743a3a5370656e64696e6741637469766974792063616e2774206d696e74210015333573460da0022464646a666ae68c1f800448cd5cd984600a492472656c61792064656c656761746520696e7374616c6c6174696f6e2073657175656e63650033573661880492013420202d2d2054454d504f524152593a20746865206d696e742064656c6567617465206973206265696e67207265706c616365640a004a22a666ae68c1f000448c3280924119444c413a3a5265746972696e672063616e2774206d696e7421001230ca02490123444c413a3a56616c69646174696e6753657474696e67732063616e2774206d696e742100001001306c00115333573460d00022466ae6cc304092412920202d2d206170702d7370656369666963206d696e74696e673b207472757374206d696e744467740a00330a40213330230044a0930a5115333573460cc0022466ae6cc3040924012820202d2d206170702d7370656369666963206275726e696e673b207472757374206d696e7444677400330a40213330230044a0930a5115333573460c80022466ae6cc3040924012320202d2d206d696e7420666f72206467446174613b207472757374206d696e7444677400330a40213330230044a0930a5115333573460c00022466ae6cc3040924012320202d2d206275726e20666f72206467446174613b207472757374206d696e7444677400330a40213330230044a0930a5115333573460c400224618e0492014d696e76616c6964206d696e742d64656c656761746520616374697669747920666f72206d696e74696e673b205570646174696e6744656c656761746564446174756d2063616e2774206d696e74001232330a50213330240054a0930998049980400099999999983983883703583483383283183082e9191a999ab9a3068001124a22a666ae68c19000449288a999ab9a306c0011230cb02491456d696e744467743a204d756c7469706c6544656c6567617465416374697669746965733a206e6573746564204d696e74696e674163746976697469657320696e76616c69640015333573460d4002246196049201456d696e744467743a204d756c7469706c6544656c6567617465416374697669746965733a206e6573746564204275726e696e674163746976697469657320696e76616c69640015333573460c40022461960492014e6d696e744467743a204d756c7469706c6544656c6567617465416374697669746965733a206e6573746564204d756c7469706c6544656c65676174654163746976697469657320696e76616c69640015333573460cc002246196049201496d696e744467743a204d756c7469706c6544656c6567617465416374697669746965733a206e6573746564205570646174696e6744656c6567617465644461746120696e76616c69640015333573460dc002246196049201466d696e744467743a204d756c7469706c6544656c6567617465416374697669746965733a206e6573746564205370656e64696e674163746976697469657320696e76616c69640015333573460e80022461960492014b6d696e744467743a204d756c7469706c6544656c6567617465416374697669746965733a206e6573746564204361706f4c6966656379636c654163746976697469657320696e76616c6964001230cb0249014f6d696e744467743a204d756c7469706c6544656c6567617465416374697669746965733a206e65737465642044656c65676174654c6966656379636c654163746976697469657320696e76616c696400001001305a0010010015330210210013333300f00e00d0014a0932980598050009119986600801118381801185f008009bb149888cc2ec040088c008cccccccccc1b41ac1a019418c18417c17416c15c0048888c8c8cd5cd985f0124811566696e64696e6720696e707574206467546b6e3a2000335736617c04609a00c66ae6cc2f809241010a0032335736617e04920113202020202d2d20666f756e64206467546b6e5e0032323232330a602100110024a2646a666ae68c03800448c3240800c48c8c8d4ccd5cd187b8080089191919855810998098008008a999ab9a30ba0200c133573661900492011520202d2d206f6b2c206467546b6e207370656e740a0033573661900492011b20202d2d2d2d20736b69702072656465656d657220636865636b0a004a22a2a666ae68cc2b809200000213232353335734610a020022466ae6cc32c092411520202d2d206f6b2c206467546b6e207370656e740a004a22a666ae68c20c0400448c3440924119444c413a3a5265746972696e672063616e2774206d696e7421001230d102490123444c413a3a56616c69646174696e6753657474696e67732063616e2774206d696e742100001001333308401082010800107f3086010011514a2618c0200461ea020022461980400c002002601a0020026601461720213a040046614a046614a04921066467546b6e2000304f0084911c206e6f74206265696e67207370656e74206173206578706563746564003307f30b70109b02232353335734617002002246617002616e0200200824940004004c8d4ccd5cd18238008919185a8080098258008918630119852812490e6d697373696e67206467546b6e2000304f0080013304530ec0109a022330970230eb010010023308e023308b02004530c101304c005480094ccd5cd00108008a512233330ac0100230ab0100123374a9000184801000899ba5480082a4088c2e004c2c00800488cdd79827801182780091987e80800a40044466ae6d4ccd5cd1853811981a98718080111985600985500800801099ab9b30b502490116202d20657870656374656420736565645574786f3a2000335736616a04a614c0200266ae6cc2d4092401010a00330ba024a09201276d697373696e67206578706563746564207365656420696e70757420666f72206d696e74696e6700151498cd5cd985a812491420202d2d206861732073656564202d3e206f6b0a004a246600c002a0204264646a666ae68c0400044801054ccd5cd180600089185d812481314361706f4374782e776974684368617274657252656628293a20636861727465722069732066726f6d20696e70757473210012323232323300c003330120010023309a02303130990230a80100148000c098004c02c004010004004c0180048888c8ccc070010ccccc0e8010c38c0424408c028015288009805002a999ab9a002100114a242646a666ae68c03400448c8004c03000454ccd5cd18048008919000980400089185c0124819d4361706f4374782e7265736f6c766543686172746572446174756d28293a20756e6b6e6f776e20636861727465722073747261746567793b2075736520726573756c74206f66207769746843686172746572496e70757428292c20776974684368617274657252656628292c206f72206e6565647343686172746572282920746f207265736f6c7665206368617274657220646174756d20666972737400001300400122222323233330060050014a2004604ca600c008a666ae6800840045289119aba030fe0100233574060200026ec5262333300c00b008004309b01001230a7023099010012302430a402001253333335748002264a666ae68cdc39aab9d001480104c94cccccd5d20008a5014a0264a666aae7c0045280992999ab9a302800113253335573e00229404c94ccd5cd184d80800899199aab9f0014a2940d5d10010a50357420026ae880085281aba1001375800229405281ba735573c0022940dd50008a5014a0294052811987880800a40084466e952002335740604200466ae80c24c04004dd8a4c460406140040024a666666ae900044c94ccd5cd19b8735573a00290010992999999aba400114a029404c94ccd55cf8008a50132533357346048002264a666aae7c0045280992999ab9a3097010011323335573e002945281aba200214a06ae84004d5d10010a50357420026eb00045280a50374e6aae780045281baa00114a029405280a502330ed01001480084cdd2a40006ec526253333335748002264a666ae68cdc39aab9d001480004c94cccccd5d20008a5014a0264666aae7c00528a50375800229405281ba735573c0022940dd50008a5014a029405281111190012999ab9a333300500400300200114984cd5ce24812b5761726e696e673a20696e76616c696420636374785f43686172746572496e7075745479706520646174610049888894ccd5cd18010008a511533357346006002294454ccd5cd18020008a5114a01c80244464666666046601c008601600894528a510015333573400420022a06e44266666666660a009c09609008c08808408007c074a600600242646466ae6cc8d4ccd5cd18690080089191919ab9b30a30249012e202020202d2df09f909e2067656e657269632064656c656761746520616374697669747920617420696e6465782000335736614604a61a60200466ae6cc28c092401180a202020202d2d2d2d2066726f6d20696e7075742069643a00335736614604a618e02618c02612e0200c66ae6cc28c09240105f09f94b92300335736614604a61a602618a02612e0200c66ae6cc28c09240103203d2000335736614604a619202619e0200c66ae6cc28c092401010a00335736661500466112040040049201066e6f2077617900330a802330aa013009001480012401066e6f207761790030a10100230d00100112498004004004c1740054c008c01c00484c31804c2540800438404888cd5d0181600199aba0300400233574061d6020026ec5260dd01230930230800100123002308501001232002533357346006002293099ab9c49011c5761726e696e673a20696e76616c6964206f7074696f6e2064617461004988c098c2080400494cccccd5d200089919192999ab9a3370e00490000a999aab9f00114a02a666aae7cd5d100089841009aba100114a02a666ae68cdc3801240042666aae7c00528a5014a06aae78008d55ce8009baa00114a029405280a502223232323232001330fb01301230fa0130890100148000c8d4ccd5cd18108008919000981280089191a999ab9a3023001123200130270011230a2024901234d697373696e67206368617274657220696e70757473202f207265665f696e70757473000013302130c8010f6010030013301f0030012330f00130c401001002305b004533357340042002260f81e2024646466ae6cc250092411e67657474696e67207265665f696e70757420666f7220636861727465720a003200132353335734603a002246400260420022466ae6cc2580924116657870656374656420636861727465722076616c756500335736612c04a61780200866ae6cc258092401010a00309c0249015d4d697373696e67206368617274657220696e207265717569726564207265665f696e707574732028757365207463785769746843686172746572526566287463782920696e2074786e206275696c64696e672066756e6374696f6e7329000013301b307b0f0010012330ec0130c00100100230570012302230770012300630da010012302030740012300230ed0100123232002533357346014002293099ab9c4901195761726e696e673a20696e76616c6964206d6170206461746100498dd580091801184181000919190012999ab9a300a00114984cd5ce24811a5761726e696e673a20696e76616c6964206c697374206461746100498dd60009180d984181000866809190012999ab9a300200114984cd5ce249225761726e696e673a20696e76616c69642043686172746572546f6b656e20646174610049894cccccd5d20008992999ab9a3370e6aae7400520001325333333574800229405280992999aab9f00114a0264a666ae68c0740044c94ccd55cf8008a50132533357346014002264a666aae7c0045280992999ab9a300a00113253335573e00229404c94ccd5cd18118008992999aab9f00114a0264a666ae68c0400044c94ccd55cf8008a5013253335734604e002264666aae7c00528a50357440042940d5d08009aba200214a06ae84004d5d10010a50357420026ae880085281aba1001357440042940d5d08009aba200214a06ae84004dd60008a5014a06e9cd55cf0008a50375400229405280a5014a04a666666ae90004528098011bab00114a0294052811919800800801112999aab9f00114a2264a666ae68c1a8d55ce8008a999ab9a301a35573c0022660060066ae880085280a50357420024a666666ae900045280a50130023758002294052811919800800801112999aab9f00114a22a666ae68c05cd5d08008998010011aba200114a044660c600446600461fe026aae74004c118d55cf0009119878008011180118568080091111119191919191919ab9b53335734660d4612202a611e0200490040984881248112737472617465677920746f6f2073686f72740015133090024a2921026e6f003232335736611a04661e402661e402661e4029211f20e2ac85efb88f20f09f948e20f09f928120657870656374206467546b6e2000001491023a200000532335736a666ae68cc3c4044c2000800440244c8d4ccd5cd181200089184b011987a80a4923e2ac85efb88f20e29d8c20f09f9281206467546b6e206e6f7420637265617465643a20000081232309702330f601490124e2ac85efb88f20e29d8c20f09f9281206467546b6e206e6f742072657475726e65643a20000093333301501130be010ec010104a29440040205454ccd5cd000898470119879809987980a4812220e2ac85efb88f20e29c8520f09f9281206f6b3a20205e206467546b6e2068617320000024911020612076616c6964206f75747075740a00151308e024913220e2ac85efb88f20f09f9aab20f09f9281206e6f2064656c656761746520627574206e6f742072657127643b2066616c736500001323533357346024002246466ae6cc24008cc3d404cc3d405241142073656e7420746f2076616c696461746f723a20005306e0014901010a00330e801330620ec01001005301500112335736611e0492010f2028746f20616e797768657265290a00323533357346026002249444928000998089876008758091987400987380800802800801991a999ab9a30240011249010872657475726e656400124901076372656174656400001006333333305100b4a2006941264a093180b001980b801180b8008042999ab9a00310021501c533357340082006294488ccc230040088c008c148004314048cc3180400520002330c5010014800088888c8c8d4ccd5cd1806000892999ab9a0031308902330e8014901335fe29d8c20e29ea1efb88f20f09f9281206d697373696e6720726571756972656420696e7075742077697468206467546b6e20003012008151500c12323232335736610c04661d602661d60292011a20202d2d207365656b696e6720696e707574206467546b6e3a2000301500b491010a0032353335734601e0022466ae6cc220092401262020e29c8520e29ea1efb88f2020f09f928120666f756e64205e20696e707574206467546b6e0000112533357340102611c04661da0292013d5fe29d8c20e29ea1efb88f2020f09f9281206d697373696e6720726571276420696e707574206467546b6e20286174207363726970742061646472292000301700d151335736611004920147203c2d20f09f9aab20e29ea1efb88f20f09f9281206e6f20696e7075742077697468205e206467546b6e3b206e6f742072657127643b2072657475726e696e672066616c73650a0050110013300d00a2330ea01133057306130560010031330df0130b301001002333333304b0084a26028014941264a0931828800980480080098068032999ab9a002100114a2460a461e8020024466610e0200446004614c0200218002466182020029000082191985f80800a4004461400261de020024600460ba002464004a666ae68c01c00452613357389211c5761726e696e673a20696e76616c6964206f7074696f6e2064617461004988c21004c1840048c20c04c17c0040ec8c8dd60012999ab9a300200114984cd5ce24812a5761726e696e673a20696e76616c69642052656c617469766544656c65676174654c696e6b20646174610049894cccccd5d20008a5014a0264a666aae7c0045280992999ab9a305300113253335573e00229404c94ccd5cd182a8008992999aab9f00114a0264a666ae68c0200044c94ccd55cf8008a5013253335734616802002264666aae7c00528a50357440042940d5d08009aba200214a06ae84004d5d10010a50357420026ae880085281aba10013758002294052812999999aba400113232325333573466e1c0092000153335573e002294054ccd55cf9aba2001130ac0135742002294054ccd5cd19b87002480084ccd55cf800a514a02940d55cf0011aab9d001375400229405280a5014a0266e95200237629311985a00800a4004266e95200037629311985900800a4000e9c8c008c384040048c8c80094ccd5cd18028008a4c266ae7124011a5761726e696e673a20696e76616c6964206c697374206461746100498dd600092999999aba40011325333573466e1cd55ce800a4020264a666666ae900045280a5013253335573e00229404c94ccd5cd1803000899199aab9f0014a2940d5d10010a50357420026eb00045280a50374e6aae780045281baa00114a029405280a502533333357480022940528098011bac00114a029408c8cc004004008894ccd55cf8008a5115333573460606ae840044cc008008d5d10008a502330ab010014804094cccccd5d20008992999ab9a3370e6aae74005200e1325333333574800229405280992999aab9f00114a0264a666ae68c1200044c94ccd55cf8008a5013253335734614a02002264666aae7c00528a50357440042940d5d08009aba200214a06ae84004dd60008a5014a06e9cd55cf0008a50375400229405280a5014a046615202002900712999999aba40011325333573466e1cd55ce800a4018264a666666ae900045280a5013253335573e00229404c94ccd5cd18230008992999aab9f00114a0264a666ae68c28c040044c8ccd55cf800a514a06ae880085281aba1001357440042940d5d08009bac00114a02940dd39aab9e00114a06ea80045280a5014a029408cc29c04005200c253333335748002264a666ae68cdc39aab9d001480284c94cccccd5d20008a5014a0264a666aae7c0045280992999ab9a30a00100113253335573e00229404c94ccd5cd1823000899199aab9f0014a2940d5d10010a50357420026ae880085281aba1001375800229405281ba735573c0022940dd50008a5014a0294052811985280800a40144a666666ae900044c94ccd5cd19b8735573a00290040992999999aba400114a029404c94ccd55cf8008a50132533357346054002264666aae7c00528a50357440042940d5d08009bac00114a02940dd39aab9e00114a06ea80045280a5014a029408cc28c040052008253333335748002264a666ae68cdc39aab9d001480184c94cccccd5d20008a5014a0264a666aae7c0045280992999ab9a30280011323335573e002945281aba200214a06ae84004dd60008a5014a06e9cd55cf0008a50375400229405280a5014a046614202002900312999999aba40011325333573466e1cd55ce800a4008264a666666ae900045280a5013253335573e00229404c94ccd5cd1813000899199aab9f0014a2940d5d10010a50357420026eb00045280a50374e6aae780045281baa00114a029405280a5023309f01001480108cccc048040038034c33c0400494cccccd5d20008992999ab9a3370e6aae7400520021325333333574800229405280992999aab9f00114a0264a666ae68cccc05804c0440400044c8ccd55cf800a514a06ae880085281aba1001375800229405281ba735573c0022940dd50008a5014a0294052811984e00800a400446601000e6198020024a666666ae900044c94ccd5cd19b8735573a00290000992999999aba400114a029404c94ccd55cf8008a501325333573466018014002264666aae7c00528a50357440042940d5d08009bac00114a02940dd39aab9e00114a06ea80045280a5014a029408cc26404005200022222222223200253335734666666666601601401201000e00c00a008006004002293099ab9c4901345761726e696e673a20696e76616c696420416273747261637444656c656761746541637469766974696573456e756d20646174610049888888888894ccd5cd18010008a511533357346006002294454ccd5cd18020008a51153335734600a002294454ccd5cd18030008a51153335734600e002294454ccd5cd18040008a511533357346012002294454ccd5cd18050008a5114a0124024a666666ae900044c94ccd5cd19b8735573a00290000992999999aba400114a029404c94ccd55cf8008a5013253335734611e02002264a666aae7c0045280992999ab9a30350011323335573e002945281aba200214a06ae84004d5d10010a50357420026eb00045280a50374e6aae780045281baa00114a029405280a5022320025333573466006004002293099ab9c49012b5761726e696e673a20696e76616c6964204361706f4c6966656379636c654163746976697479206461746100498894ccd5cd18010008a5114a04a666666ae900044c94ccd5cd19b8735573a00290020992999999aba400114a029404c8ccd55cf800a514a06eb00045280a50374e6aae780045281baa00114a029405280a50253333335748002264a666ae68cdc39aab9d001480084c94cccccd5d20008a5014a0264666aae7c00528a50375800229405281ba735573c0022940dd50008a5014a0294052811984800800a40044a666666ae900044c94ccd5cd19b8735573a00290000992999999aba400114a029404c94ccd55cf8008a5013253335734611202002264a666aae7c0045280992999ab9a302f0011323335573e002945281aba200214a06ae84004d5d10010a50357420026eb00045280a50374e6aae780045281baa00114a029405280a5023308e01001480008888c80094ccd5cd19998028020018010008a4c266ae712412f5761726e696e673a20696e76616c69642044656c65676174654c6966656379636c65416374697669747920646174610049888894ccd5cd18010008a511533357346006002294454ccd5cd18020008a5114a0460886ae840048c8c8c8cc018008004cc0100048c8d4ccd5cd181e800891981e981e00080289250001001303b09f0130360012232330010010032253335573e0022619402921096e6f7420666f756e640013253335734600800220022660060066ae88008c034d55ce9aba1001223333034002303300123043001130c70149010d6b6579206e6f7420666f756e640023232002533357346006002293099ab9c491195761726e696e673a20696e76616c6964206d6170206461746100498dd580091919800800801112999aab9f00114a2264a666ae68c1f8d55ce8008a999ab9a30800135573c0022660060066ae880085280a503574200244646600200200644a666aae7c0044c318052401096e6f7420666f756e640013253335734600800220022660060066ae88008c044d5d080091999999801000a514910763686172746572004a0932504988888888c8c8c8cd5cd9986480998259825001240009211a6d697373696e67207265716420746e206f7220746e4279746573003309501330920100a002001533357340082006290012999ab9a00510041530460015333573400c200a292100230ba013309f013309f0149104e29d972000001491010a00230b9013309e013309e01491182020f09f9fa52020f09f98b3f09f92a62020544f444f3a2000001491010a0007c24a2e9ccdd2a400414802466e952002308a013002001082012308b01305f00108b0107422300d33003002001223300a002233004001002223253335734601000226600e004600a60080022940c020c21c040088cc2380400520022300230a4010010a5010ab0123370e6aae74dd5000a400413e0244660066108020040024466600e00400212c024666098002446607c00460fa0020ec14002e2088ccc00c008004dd924c44464666002002008006444a666aae7c00840104c94ccd5cd1801000899aba00013330040043574400600426660080086ae8800c008d5d080112999999aba400114a029405280a5013002375c00246464660020029000112999ab9a3370e00200629444c94ccd5cd19b89001483f8044cc00c00ccdc0001240042a666ae68cdc399b8300148101200c1325333573466e240040144cc01ccdc700319b8000348008894ccd5cd0010992999ab9a3308901133712904001000899b89001483f87c4cc01c01c01052819b803370466e18011204048200040045280a503370000490020a999ab9a3370e66e0c0052020480704c94ccd5cd19b890010051330073371c00c66e0000d2002225333573400426601266e38020cdc0002a400844a666ae680084c94ccd5cd1984580899b8948200800044cdc4800a41fdfe0e26601201200c2940cdc019b823370c00c9010241008066e00cdc1001a41000200229405280a503370000490030a999ab9a3370e66e0c0052010480f04c94ccd5cd19b890010051330073371c00c66e0000d2002225333573400426601266e38020cdc0002a400844a666ae680084cc02ccdc700519b8000748018894ccd5cd0010992999ab9a3308d0113371290404004000899b89001483fbfffc044cc02c02c02052819b803370466e180212010482020080cdc019b820054820100cdc019b8200348200040045280a5014a02940cdc0001240102940cdc70020009b8d001225333573466e1ccdc180124100029002099800a513370c004904000899800a50480008d5d0983400091aba130190012375861220200246ae84c0080048d5d1180380082d9199982c000a40000a80044a666666ae900045288a5014a029405282ba12357426004002ae888c1bcc0f800484cc1d54c0d0c0cc004cc1d524101230053040303200105322223233300100100500422253335573e004008264a666ae68cdd78011aab9d0011300635573c00226660080086ae8800c008d5d08010428084200832919829000a400446eacc0080048d5d0980100091aba23002001235744600400246ae88c0080048d5d1180100091aba2304e001235573c6ea800488c8ccc00400400c0088894ccd55cf8010a5115333573460026ae840084ccc00c00cd5d10010008a50044001213766002426e60005c538d22306d33712004002426e500048cc008005c69111191918009801002119180098018021199b8c0023370200266010004900000392999ab9a337100029000099b8033700600800a9001000880091199ab9a3371000400200200444464666002002008006444a666aae7c0084cdd2a40040d4264a666ae68c0080044cdd2a400060a2600a00226660080086ae8800c008d5d08013ab03774c44464666002002008004444a666aae7c00840044cd5d018029aba10023330030033574400400246e64dd7000911919800800801912999aab9f00110011332233300700200100535742002660040046ae88004888c8cc00400400c894ccd55cf800899aba0005001132533357346600800c002266ae800180084cd5d0000998018019aba20023574200242646600200200444a666aae7c004528899829098021bab35573c6ae840044cc008008d5d100091919800800801112999aab9f00114a22660a2266e1cdd69aab9e3574200290000998010011aba200122305e3300300200172e44666006004002e00888c8ccc004004cc15801000cdd924c444a666aae7c00840044c8c8c94ccd55cf8008801099aba0337600066e98004008ccc024018cc160020008cc16001c008ccc010010d5d10018011aba100222232333001001330550030023764931112999aab9f002100113232325333573466e1c00520001002133574066ec000cdd4000801198041982f8038011982f8030011998020021aba2003002357420044466609e004002e1c00488c15ccc1a00080048400409884dcc80091191919800800802112999aab9f0011306a49110706f6c696379206e6f7420666f756e640015333573466ebcd55ce9aba1001003137566aae78d5d08008998010011aba200130300012302530560010562305b30020012375c6ae84d55cf1baa0012133300300122323233300700122323233048004533357346601400c9110013304849010a6c6f76656c6163653a20003304853013001491010a001330485306000633048491012e003304853061002330484901023a20003304853013001491010a00375a6aae78008dd71aab9d00100437566aae78008dd71aab9d0014910005c2223233300100100400222253335573e004200226660060066ae88008cc014004d5d080111191919800800802112999aab9f00114a02a666ae68cdd79aab9d3574200200629444cc008008d5d1000981400080d99811a45004881002302c300200104a23758609800246aae74dd5000909b99325333573466e200092000133716902d19980080099b8200248005220100133300100100248900222325333573466e2000d20141001133300400433706006900a00099b8b300500200123370066e1800520144818094cccccd5d20008a5114a029405280a50233330100014800001c00894cccccd5d200089919192999ab9a3370e00490000a999aab9f00114a02a666aae7cd5d1000898029aba100114a02a666ae68cdc3801240042666aae7c00528a5014a06aae78008d55ce8009baa00114a029405280a502533333357480022646464a666ae68cdc380124000266600e00c00a0022a666ae68cdc380124004266600e01c6600e01c6600e01c00a0022940d55cf0011aab9d001375400229405280a5014a04666aae7c00528a5000222253335573e002294054ccd5cd18019aba10011300235744002294094cccccd5d200089919192999ab9a3370e00490000a999aab9f00114a02a666aae7cd5d1000898031aba100114a02a666ae68cdc3801240042a666aae7c0045280a999aab9f357440022600a6ae840045280a5035573c0046aae74004dd50008a5014a029405281803a4070600c901c0049199999aba40014a0941282504a24666600a00290000018011199999aba40014a0941282514a04a666666ae900044c8c8c94ccd5cd19b874800000854ccd55cf8008a50153335573e6ae880044cc01520403574200229405281aab9e00235573a0026ea80045280a5014a02940894cccccd5d20008a5014a029405280992999ab9a3370e6e3400400c5288a50375c0024444a666666ae900104c94ccd5cd19b8735573a002008264a666aae7c0045280a999ab9a300435742002264a666aae7c0045280a999ab9a3004357420022a666aae7cd5d10008a5114a02940d5d10008a5035573c0022940dd50020a5014a029405280010009000bad232330010010022253335573e00229000099b80330020023574400290011119b8735573a6ea80080048dd5980100091aba13002001235744600400246ae88c0540048cdc1000a40024466e952000330093003002300400100175244a666ae68cdc3a400000220062646466ae80cdd80011ba633574066ec0004c0d400cdd924c6ec9263029003302a00237649311ba937300024466e952000330030023030001223357400046006002466ae8000406c8dd598108009119808801000810000baf301d01a23758600600200246ae84c0080048d5d1180c80091919192999ab9a3370e004900209aba1001130294901136e6f7420616e20696e6c696e6520646174756d0035573c0046aae74004dd5000912999ab9a3370e6aae74dd50010008801098132491c756e657870656374656420636f6e7374727563746f7220696e646578002253335734a0042a002294084ccd5cd000a48104747275650049010566616c73650072ce1c88ccc00c00800488c03ccdc4001000911191980080099803802001912999aab9f00114a2264a666ae68c040ccc020010cc01c018004cc01c0140045280998018019aba20023574200244646600200200644a666aae7c0044dd924c2a666ae68cdd79aab9d3574200200626eacd55cf1aba10011330020023574400244464660020026600a00600444a666aae7c0045288992999ab9a300e330063300d0050013300d00400114a02660060066ae88008d5d080091191919198030018009998008008010019112999aab9f001100b132533357346601200a00226660080080066ae880084cd5d00009998020020019aba200235573a6ae84004c01800888c8ccc00400400800c8894ccd55cf8008801099aba0357420026660060060046ae8800488cc00c0088cdd780080111191998008008018011112999aab9f00214a02a666ae68c004d5d08010a511333003003357440040024646600200200444a666aae7c00440104cd5d01aab9d35742002660040046ae88004dd8a4c4464666002002006004444a666aae7c0085200015333573466ebcd55ce9aba10020011375a6aae78d5d080109998018019aba2002001233357340029412889804280089802800980100080891aba13002001235744600600246ae84c0080048d55cf1baa00100175c0024264660020020044464a666ae68cdc424000002266e58dcc99199ab9a3370e6e3400520023371690300008009b98530053371c004900019801801999b8c48008004008524100371a00242646e654ccd5cd19b88002480004cdc5a40b466600200266e08009200148810013330010010024890022232325333573466e2001120201001133300500533706008901000099b8b333573466e20005201433700002903019b80001482b804008cdc300124040466ae70005262137666004002ea1c7912999ab9a500214a22a00244a666ae68008526153357380022c4a66ae70004581",
    "unoptimizedIR": "(__REDEEMER, __CONTEXT) -> {\n    __helios__error = (msg) -> {\n        __core__trace(msg, () -> {\n            error()\n        })()\n    };\n    __helios__assert = (cond, msg_1) -> {\n        __core__ifThenElse(\n            cond,\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(msg_1, () -> {\n                    error()\n                })()\n            }\n        )()\n    };\n    __helios__bool__or = (a, b) -> {\n        __core__ifThenElse(\n            a(),\n            () -> {\n                true\n            },\n            () -> {\n                b()\n            }\n        )()\n    };\n    __helios__bytearray____eq = __core__equalsByteString;\n    __helios__int____to_data = __core__iData;\n    __helios__int__serialize = (self) -> {\n        () -> {\n            __core__serialiseData(__helios__int____to_data(self))\n        }\n    };\n    __helios__print = (msg_2) -> {\n        __core__trace(msg_2, ())\n    };\n    __helios__int__to_hex = (self_1) -> {\n        () -> {\n            recurse_1 = (recurse) -> {\n                (self_2, bytes) -> {\n                    digit = __core__modInteger(self_2, 16);\n                    bytes_1 = __core__consByteString(__core__ifThenElse(\n                        __core__lessThanInteger(digit, 10),\n                        __core__addInteger(digit, 48),\n                        __core__addInteger(digit, 87)\n                    ), bytes);\n                    __core__ifThenElse(\n                        __core__lessThanInteger(self_2, 16),\n                        () -> {\n                            bytes_1\n                        },\n                        () -> {\n                            recurse(recurse)(__core__divideInteger(self_2, 16), bytes_1)\n                        }\n                    )()\n                }\n            };\n            __core__decodeUtf8__safe(__core__ifThenElse(\n                __core__lessThanInteger(self_1, 0),\n                () -> {\n                    __core__consByteString(45, recurse_1(recurse_1)(__core__multiplyInteger(self_1, -1), #))\n                },\n                () -> {\n                    recurse_1(recurse_1)(self_1, #)\n                }\n            )())\n        }\n    };\n    __helios__bytearray__show = (self_3) -> {\n        () -> {\n            recurse_3 = (recurse_2, self_4) -> {\n                n = __core__lengthOfByteString(self_4);\n                __core__ifThenElse(\n                    __core__lessThanInteger(0, n),\n                    () -> {\n                        __core__appendString(__core__decodeUtf8__safe(hex_bytes = __core__encodeUtf8(__helios__int__to_hex(__core__indexByteString__safe(self_4, 0))());\n                        __core__ifThenElse(\n                            __core__equalsInteger(__core__lengthOfByteString(hex_bytes), 1),\n                            __core__consByteString(48, hex_bytes),\n                            hex_bytes\n                        )), recurse_2(recurse_2, __core__sliceByteString(1, n, self_4)))\n                    },\n                    () -> {\n                        \"\"\n                    }\n                )()\n            };\n            recurse_3(recurse_3, self_3)\n        }\n    };\n    __helios__mintingpolicyhash__show = __helios__bytearray__show;\n    __helios__bytearray__from_data = __core__unBData;\n    __helios__mintingpolicyhash__from_data = __helios__bytearray__from_data;\n    __helios__common__enum_fields = (self_5) -> {\n        __core__sndPair(__core__unConstrData(self_5))\n    };\n    __helios__common__enum_field_0 = (self_6) -> {\n        __core__headList(__helios__common__enum_fields(self_6))\n    };\n    __helios__common__enum_fields_after_0 = (self_7) -> {\n        __core__tailList(__helios__common__enum_fields(self_7))\n    };\n    __helios__common__enum_field_1 = (self_8) -> {\n        __core__headList(__helios__common__enum_fields_after_0(self_8))\n    };\n    __helios__scriptcontext__data = __CONTEXT;\n    __helios__scriptcontext__purpose = __helios__common__enum_field_1(__helios__scriptcontext__data);\n    __helios__scriptcontext__get_spending_purpose_output_id = () -> {\n        __helios__common__enum_field_0(__helios__scriptcontext__purpose)\n    };\n    __helios__scriptcontext__get_current_minting_policy_hash = () -> {\n        __helios__mintingpolicyhash__from_data(__helios__scriptcontext__get_spending_purpose_output_id())\n    };\n    __helios__bool____not = (b_1) -> {\n        __core__ifThenElse(\n            b_1,\n            false,\n            true\n        )\n    };\n    __helios__value__get_inner_map_int = (map, key) -> {\n        recurse_5 = (recurse_4, map_1, key_1) -> {\n            __core__chooseList(map_1, () -> {\n                0\n            }, () -> {\n                __core__ifThenElse(\n                    __core__equalsData(__core__fstPair(__core__headList__safe(map_1)), key_1),\n                    () -> {\n                        __core__unIData(__core__sndPair(__core__headList__safe(map_1)))\n                    },\n                    () -> {\n                        recurse_4(recurse_4, __core__tailList__safe(map_1), key_1)\n                    }\n                )()\n            })()\n        };\n        recurse_5(recurse_5, map, key)\n    };\n    __helios__common__list_0 = __core__mkNilData(());\n    __helios__value__get_map_keys = (map_2) -> {\n        recurse_7 = (recurse_6, map_3) -> {\n            __core__chooseList(map_3, () -> {\n                __helios__common__list_0\n            }, () -> {\n                __core__mkCons(__core__fstPair(__core__headList__safe(map_3)), recurse_6(recurse_6, __core__tailList__safe(map_3)))\n            })()\n        };\n        recurse_7(recurse_7, map_2)\n    };\n    __helios__common__any = (self_9, fn) -> {\n        recurse_9 = (recurse_8, self_10, fn_1) -> {\n            __core__chooseList(self_10, () -> {\n                false\n            }, () -> {\n                __core__ifThenElse(\n                    fn_1(__core__headList__safe(self_10)),\n                    () -> {\n                        true\n                    },\n                    () -> {\n                        recurse_8(recurse_8, __core__tailList__safe(self_10), fn_1)\n                    }\n                )()\n            })()\n        };\n        recurse_9(recurse_9, self_9, fn)\n    };\n    __helios__common__is_in_bytearray_list = (lst, key_2) -> {\n        __helios__common__any(lst, (item) -> {\n            __core__equalsData(item, key_2)\n        })\n    };\n    __helios__common__concat = (a_1, b_2) -> {\n        recurse_11 = (recurse_10, lst_1, rem) -> {\n            __core__chooseList(rem, () -> {\n                lst_1\n            }, () -> {\n                __core__mkCons(__core__headList__safe(rem), recurse_10(recurse_10, lst_1, __core__tailList__safe(rem)))\n            })()\n        };\n        recurse_11(recurse_11, b_2, a_1)\n    };\n    __helios__value__merge_map_keys = (a_2, b_3) -> {\n        aKeys = __helios__value__get_map_keys(a_2);\n        recurse_13 = (recurse_12, keys, map_4) -> {\n            __core__chooseList(map_4, () -> {\n                __helios__common__list_0\n            }, () -> {\n                key_3 = __core__fstPair(__core__headList__safe(map_4));\n                __core__ifThenElse(\n                    __helios__common__is_in_bytearray_list(aKeys, key_3),\n                    () -> {\n                        recurse_12(recurse_12, keys, __core__tailList__safe(map_4))\n                    },\n                    () -> {\n                        __core__mkCons(key_3, recurse_12(recurse_12, keys, __core__tailList__safe(map_4)))\n                    }\n                )()\n            })()\n        };\n        uniqueBKeys = recurse_13(recurse_13, aKeys, b_3);\n        __helios__common__concat(aKeys, uniqueBKeys)\n    };\n    __helios__value__compare_inner = (comp, a_3, b_4) -> {\n        recurse_15 = (recurse_14, keys_1) -> {\n            __core__chooseList(keys_1, () -> {\n                true\n            }, () -> {\n                key_4 = __core__headList__safe(keys_1);\n                __core__ifThenElse(\n                    __helios__bool____not(comp(__helios__value__get_inner_map_int(a_3, key_4), __helios__value__get_inner_map_int(b_4, key_4))),\n                    () -> {\n                        false\n                    },\n                    () -> {\n                        recurse_14(recurse_14, __core__tailList__safe(keys_1))\n                    }\n                )()\n            })()\n        };\n        recurse_15(recurse_15, __helios__value__merge_map_keys(a_3, b_4))\n    };\n    __helios__value__get_inner_map = (map_5, mph) -> {\n        recurse_17 = (recurse_16, map_6) -> {\n            __core__chooseList(map_6, () -> {\n                __core__mkNilPairData(())\n            }, () -> {\n                __core__ifThenElse(\n                    __core__equalsData(__core__fstPair(__core__headList__safe(map_6)), mph),\n                    () -> {\n                        __core__unMapData(__core__sndPair(__core__headList__safe(map_6)))\n                    },\n                    () -> {\n                        recurse_16(recurse_16, __core__tailList__safe(map_6))\n                    }\n                )()\n            })()\n        };\n        recurse_17(recurse_17, map_5)\n    };\n    __helios__value__compare = (a_4, b_5, comp_1) -> {\n        recurse_19 = (recurse_18, keys_2) -> {\n            __core__chooseList(keys_2, () -> {\n                true\n            }, () -> {\n                key_5 = __core__headList__safe(keys_2);\n                __core__ifThenElse(\n                    __helios__bool____not(__helios__value__compare_inner(comp_1, __helios__value__get_inner_map(a_4, key_5), __helios__value__get_inner_map(b_5, key_5))),\n                    () -> {\n                        false\n                    },\n                    () -> {\n                        recurse_18(recurse_18, __core__tailList__safe(keys_2))\n                    }\n                )()\n            })()\n        };\n        recurse_19(recurse_19, __helios__value__merge_map_keys(a_4, b_5))\n    };\n    __helios__value____geq = (a_5, b_6) -> {\n        __helios__value__compare(a_5, b_6, (a_qty, b_qty) -> {\n            __helios__bool____not(__core__lessThanInteger(a_qty, b_qty))\n        })\n    };\n    __helios__int____eq = __core__equalsInteger;\n    __helios__string____add = __core__appendString;\n    __helios__bool__show = (self_11) -> {\n        () -> {\n            __core__ifThenElse(\n                self_11,\n                \"true\",\n                \"false\"\n            )\n        }\n    };\n    __helios__bool__and = (a_6, b_7) -> {\n        __core__ifThenElse(\n            a_6(),\n            () -> {\n                b_7()\n            },\n            () -> {\n                false\n            }\n        )()\n    };\n    __helios__common__assert_constr_index = (data, i) -> {\n        __core__ifThenElse(\n            __core__equalsInteger(__core__fstPair(__core__unConstrData(data)), i),\n            () -> {\n                data\n            },\n            () -> {\n                __helios__error(\"unexpected constructor index\")\n            }\n        )()\n    };\n    __helios__txoutputdatum__inline = (self_12) -> {\n        pair = __core__unConstrData(self_12);\n        index = __core__fstPair(pair);\n        fields = __core__sndPair(pair);\n        __core__ifThenElse(\n            __core__equalsInteger(index, 2),\n            () -> {\n                __core__headList(fields)\n            },\n            () -> {\n                __helios__error(\"not an inline datum\")\n            }\n        )()\n    };\n    __helios__common__enum_fields_after_1 = (self_13) -> {\n        __core__tailList(__helios__common__enum_fields_after_0(self_13))\n    };\n    __helios__common__enum_field_2 = (self_14) -> {\n        __core__headList(__helios__common__enum_fields_after_1(self_14))\n    };\n    __helios__txoutput__datum = __helios__common__enum_field_2;\n    __helios__tx__outputs = (self_15) -> {\n        __core__unListData(__helios__common__enum_field_2(self_15))\n    };\n    __helios__scriptcontext__tx = __helios__common__enum_field_0(__helios__scriptcontext__data);\n    __helios__common____eq = __core__equalsData;\n    __helios__address____eq = __helios__common____eq;\n    __helios__txoutput__address = __helios__common__enum_field_0;\n    __helios__value__contains = (self_16) -> {\n        (value) -> {\n            __helios__value____geq(self_16, value)\n        }\n    };\n    __helios__txoutput__value = (self_17) -> {\n        __core__unMapData(__helios__common__enum_field_1(self_17))\n    };\n    __helios__common__list_1 = (a_7) -> {\n        __core__mkCons(a_7, __helios__common__list_0)\n    };\n    __helios__common__list_2 = (arg0, arg1) -> {\n        __core__mkCons(arg0, __helios__common__list_1(arg1))\n    };\n    __helios__txoutputid__new = (tx_id, idx) -> {\n        __core__constrData(0, __helios__common__list_2(tx_id, __helios__int____to_data(idx)))\n    };\n    __helios__string____to_data = (s) -> {\n        __core__bData(__core__encodeUtf8(s))\n    };\n    __helios__value__ZERO = __core__mkNilPairData(());\n    __helios__value__new = (assetClass, i_1) -> {\n        __core__ifThenElse(\n            __core__equalsInteger(0, i_1),\n            () -> {\n                __helios__value__ZERO\n            },\n            () -> {\n                mph_1 = __helios__common__enum_field_0(assetClass);\n                tokenName = __helios__common__enum_field_1(assetClass);\n                __core__mkCons(__core__mkPairData(mph_1, __core__mapData(__core__mkCons(__core__mkPairData(tokenName, __helios__int____to_data(i_1)), __core__mkNilPairData(())))), __core__mkNilPairData(()))\n            }\n        )()\n    };\n    __helios__bytearray____to_data = __core__bData;\n    __helios__mintingpolicyhash____to_data = __helios__bytearray____to_data;\n    __helios__assetclass__new = (mph_2, token_name) -> {\n        __core__constrData(0, __helios__common__list_2(__helios__mintingpolicyhash____to_data(mph_2), __helios__bytearray____to_data(token_name)))\n    };\n    __helios__int____neg = (self_18) -> {\n        __core__multiplyInteger(self_18, -1)\n    };\n    __helios__common__enum_fields_after_2 = (self_19) -> {\n        __core__tailList(__helios__common__enum_fields_after_1(self_19))\n    };\n    __helios__common__enum_fields_after_3 = (self_20) -> {\n        __core__tailList(__helios__common__enum_fields_after_2(self_20))\n    };\n    __helios__common__enum_field_4 = (self_21) -> {\n        __core__headList(__helios__common__enum_fields_after_3(self_21))\n    };\n    __helios__tx__minted = (self_22) -> {\n        __core__unMapData(__helios__common__enum_field_4(self_22))\n    };\n    __helios__common__enum_tag_equals = (data_1, i_2) -> {\n        __core__equalsInteger(__core__fstPair(__core__unConstrData(data_1)), i_2)\n    };\n    __helios__common__length = (lst_2) -> {\n        recurse_21 = (recurse_20, lst_3) -> {\n            __core__chooseList(lst_3, () -> {\n                0\n            }, () -> {\n                __core__addInteger(recurse_20(recurse_20, __core__tailList__safe(lst_3)), 1)\n            })()\n        };\n        recurse_21(recurse_21, lst_2)\n    };\n    __helios__int__from_data = __core__unIData;\n    __helios__common__identity = (self_23) -> {\n        self_23\n    };\n    __helios__txid__from_data = __helios__common__identity;\n    __helios__txoutputid__from_data = __helios__common__identity;\n    __helios__common__test_constr_data_2 = (data_2, index_1, test_a, test_b) -> {\n        __core__chooseData(data_2, () -> {\n            pair_1 = __core__unConstrData__safe(data_2);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_1), index_1),\n                () -> {\n                    fields_1 = __core__sndPair(pair_1);\n                    __core__chooseList(fields_1, () -> {\n                        false\n                    }, () -> {\n                        __core__ifThenElse(\n                            test_a(__core__headList__safe(fields_1)),\n                            () -> {\n                                tail = __core__tailList__safe(fields_1);\n                                __core__chooseList(tail, () -> {\n                                    false\n                                }, () -> {\n                                    __core__ifThenElse(\n                                        test_b(__core__headList__safe(tail)),\n                                        () -> {\n                                            __core__chooseList(__core__tailList__safe(tail), () -> {\n                                                true\n                                            }, () -> {\n                                                false\n                                            })()\n                                        },\n                                        () -> {\n                                            false\n                                        }\n                                    )()\n                                })()\n                            },\n                            () -> {\n                                false\n                            }\n                        )()\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__bytearray__is_valid_data_fixed_length = (n_1) -> {\n        (data_3) -> {\n            __core__chooseData(data_3, () -> {\n                false\n            }, () -> {\n                false\n            }, () -> {\n                false\n            }, () -> {\n                false\n            }, () -> {\n                bytes_2 = __core__unBData__safe(data_3);\n                __core__ifThenElse(\n                    __core__equalsInteger(__core__lengthOfByteString(bytes_2), n_1),\n                    () -> {\n                        true\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        }\n    };\n    __helios__txid__is_valid_data = (data_4) -> {\n        __core__chooseData(data_4, () -> {\n            pair_2 = __core__unConstrData__safe(data_4);\n            index_2 = __core__fstPair(pair_2);\n            fields_2 = __core__sndPair(pair_2);\n            __core__ifThenElse(\n                __core__equalsInteger(0, index_2),\n                () -> {\n                    __core__chooseList(fields_2, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_2), () -> {\n                            __helios__bytearray__is_valid_data_fixed_length(32)(__core__headList__safe(fields_2))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__int__is_valid_data = (data_5) -> {\n        __core__chooseData(data_5, false, false, false, true, false)\n    };\n    __helios__txoutputid__is_valid_data = (data_6) -> {\n        __helios__common__test_constr_data_2(data_6, 0, __helios__txid__is_valid_data, __helios__int__is_valid_data)\n    };\n    __helios__bytearray__is_valid_data = (data_7) -> {\n        __core__chooseData(data_7, false, false, false, false, true)\n    };\n    __helios__address__from_data = __helios__common__identity;\n    __helios__validatorhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);\n    __helios__pubkeyhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);\n    __helios__spendingcredential__is_valid_data = (data_8) -> {\n        __core__chooseData(data_8, () -> {\n            pair_3 = __core__unConstrData__safe(data_8);\n            index_3 = __core__fstPair(pair_3);\n            fields_3 = __core__sndPair(pair_3);\n            __core__ifThenElse(\n                __core__equalsInteger(index_3, 0),\n                () -> {\n                    __core__chooseList(fields_3, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_3), () -> {\n                            __helios__validatorhash__is_valid_data(__core__headList__safe(fields_3))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_3, 1),\n                        () -> {\n                            __core__chooseList(fields_3, () -> {\n                                false\n                            }, () -> {\n                                __core__chooseList(__core__tailList__safe(fields_3), () -> {\n                                    __helios__pubkeyhash__is_valid_data(__core__headList__safe(fields_3))\n                                }, () -> {\n                                    false\n                                })()\n                            })()\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__common__test_list_head_data = (test_head, test_tail) -> {\n        (list) -> {\n            __core__chooseList(list, () -> {\n                false\n            }, () -> {\n                __core__ifThenElse(\n                    test_head(__core__headList(list)),\n                    () -> {\n                        test_tail(__core__tailList(list))\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        }\n    };\n    __helios__stakinghash__is_valid_data = __helios__spendingcredential__is_valid_data;\n    __helios__common__test_list_empty = (list_1) -> {\n        __core__chooseList(list_1, true, false)\n    };\n    __helios__stakingcredential__is_valid_data = (data_9) -> {\n        __core__chooseData(data_9, () -> {\n            pair_4 = __core__unConstrData__safe(data_9);\n            tag = __core__fstPair(pair_4);\n            fields_4 = __core__sndPair(pair_4);\n            __core__ifThenElse(\n                __core__equalsInteger(tag, 0),\n                () -> {\n                    __helios__common__test_list_head_data(__helios__stakinghash__is_valid_data, __helios__common__test_list_empty)(fields_4)\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(tag, 1),\n                        () -> {\n                            __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_empty)))(fields_4)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__option[__helios__stakingcredential]__is_valid_data = (data_10) -> {\n        __core__chooseData(data_10, () -> {\n            pair_5 = __core__unConstrData__safe(data_10);\n            index_4 = __core__fstPair(pair_5);\n            fields_5 = __core__sndPair(pair_5);\n            __core__ifThenElse(\n                __core__equalsInteger(index_4, 0),\n                () -> {\n                    __core__chooseList(fields_5, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_5), () -> {\n                            __helios__stakingcredential__is_valid_data(__core__headList__safe(fields_5))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_4, 1),\n                        () -> {\n                            __core__chooseList(fields_5, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__address__is_valid_data = (data_11) -> {\n        __helios__common__test_constr_data_2(data_11, 0, __helios__spendingcredential__is_valid_data, __helios__option[__helios__stakingcredential]__is_valid_data)\n    };\n    __helios__data__constrdata____is = (data_12) -> {\n        __core__chooseData(data_12, () -> {\n            true\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__int__show_digit = (x) -> {\n        __core__addInteger(__core__modInteger(x, 10), 48)\n    };\n    __helios__int__show = (self_24) -> {\n        () -> {\n            __core__decodeUtf8__safe(recurse_23 = (recurse_22, i_3, bytes_3) -> {\n                bytes_4 = __core__consByteString(__helios__int__show_digit(i_3), bytes_3);\n                __core__ifThenElse(\n                    __core__lessThanInteger(i_3, 10),\n                    () -> {\n                        bytes_4\n                    },\n                    () -> {\n                        recurse_22(recurse_22, __core__divideInteger(i_3, 10), bytes_4)\n                    }\n                )()\n            };\n            __core__ifThenElse(\n                __core__lessThanInteger(self_24, 0),\n                () -> {\n                    __core__consByteString(45, recurse_23(recurse_23, __core__multiplyInteger(self_24, -1), #))\n                },\n                () -> {\n                    recurse_23(recurse_23, self_24, #)\n                }\n            )())\n        }\n    };\n    __helios__data__constrdata__tag = (data_13) -> {\n        __core__fstPair(__core__unConstrData(data_13))\n    };\n    __helios__tx__inputs = (self_25) -> {\n        __core__unListData(__helios__common__enum_field_0(self_25))\n    };\n    __helios__txinput__output = __helios__common__enum_field_1;\n    __helios__txinput__value = (self_26) -> {\n        __helios__txoutput__value(__helios__txinput__output(self_26))\n    };\n    __helios__assetclass__ADA = __helios__assetclass__new(#, #);\n    __helios__txinput__from_data = __helios__common__identity;\n    __helios__value__contains_policy = (self_27) -> {\n        (mph_3) -> {\n            mph_4 = __helios__mintingpolicyhash____to_data(mph_3);\n            recurse_25 = (recurse_24, map_7) -> {\n                __core__chooseList(map_7, () -> {\n                    false\n                }, () -> {\n                    __core__ifThenElse(\n                        __core__equalsData(__core__fstPair(__core__headList__safe(map_7)), mph_4),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            recurse_24(recurse_24, __core__tailList__safe(map_7))\n                        }\n                    )()\n                })()\n            };\n            recurse_25(recurse_25, self_27)\n        }\n    };\n    __helios__common__fold = (self_28, fn_2, z) -> {\n        recurse_27 = (recurse_26, self_29, z_1) -> {\n            __core__chooseList(self_29, () -> {\n                z_1\n            }, () -> {\n                recurse_26(recurse_26, __core__tailList__safe(self_29), fn_2(z_1, __core__headList__safe(self_29)))\n            })()\n        };\n        recurse_27(recurse_27, self_28, z)\n    };\n    __helios__mintingpolicyhash____eq = __helios__bytearray____eq;\n    __helios__value__show = (self_30) -> {\n        () -> {\n            __helios__common__fold(self_30, (prev, pair_6) -> {\n                mph_5 = __core__unBData__safe(__core__fstPair(pair_6));\n                tokens = __core__unMapData__safe(__core__sndPair(pair_6));\n                __helios__common__fold(tokens, (prev_1, pair_7) -> {\n                    token_name_1 = __core__unBData__safe(__core__fstPair(pair_7));\n                    qty = __core__unIData__safe(__core__sndPair(pair_7));\n                    __helios__string____add(prev_1, __core__ifThenElse(\n                        __helios__mintingpolicyhash____eq(mph_5, #),\n                        () -> {\n                            __helios__string____add(\"lovelace: \", __helios__string____add(__helios__int__show(qty)(), \"\n\"))\n                        },\n                        () -> {\n                            __helios__string____add(__helios__mintingpolicyhash__show(mph_5)(), __helios__string____add(\".\", __helios__string____add(__helios__bytearray__show(token_name_1)(), __helios__string____add(\": \", __helios__string____add(__helios__int__show(qty)(), \"\n\")))))\n                        }\n                    )())\n                }, prev)\n            }, \"\")\n        }\n    };\n    __helios__txid__bytes = (self_31) -> {\n        __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(self_31))))\n    };\n    __helios__txid__show = (self_32) -> {\n        __helios__bytearray__show(__helios__txid__bytes(self_32))\n    };\n    __helios__txoutputid__tx_id = __helios__common__enum_field_0;\n    __helios__txoutputid__index = (self_33) -> {\n        __helios__int__from_data(__helios__common__enum_field_1(self_33))\n    };\n    __helios__value__get_policy = (self_34) -> {\n        (mph_6) -> {\n            mph_7 = __helios__mintingpolicyhash____to_data(mph_6);\n            recurse_29 = (recurse_28, map_8) -> {\n                __core__chooseList(map_8, () -> {\n                    __helios__error(\"policy not found\")\n                }, () -> {\n                    __core__ifThenElse(\n                        __core__equalsData(__core__fstPair(__core__headList__safe(map_8)), mph_7),\n                        () -> {\n                            __core__unMapData(__core__sndPair(__core__headList__safe(map_8)))\n                        },\n                        () -> {\n                            recurse_28(recurse_28, __core__tailList__safe(map_8))\n                        }\n                    )()\n                })()\n            };\n            recurse_29(recurse_29, self_34)\n        }\n    };\n    __helios__bytearray__decode_utf8 = (self_35) -> {\n        () -> {\n            __core__decodeUtf8(self_35)\n        }\n    };\n    __helios__value__from_map = __helios__common__identity;\n    __helios__value__to_map = (self_36) -> {\n        () -> {\n            self_36\n        }\n    };\n    __helios__bytearray____neq = (self_37, other) -> {\n        __helios__bool____not(__helios__bytearray____eq(self_37, other))\n    };\n    __helios__mintingpolicyhash____neq = __helios__bytearray____neq;\n    __helios__value____eq = (a_8, b_8) -> {\n        __helios__value__compare(a_8, b_8, __core__equalsInteger)\n    };\n    __helios__value__add_or_subtract_inner = (op) -> {\n        (a_9, b_9) -> {\n            recurse_31 = (recurse_30, keys_3, result) -> {\n                __core__chooseList(keys_3, () -> {\n                    result\n                }, () -> {\n                    key_6 = __core__headList__safe(keys_3);\n                    tail_1 = recurse_30(recurse_30, __core__tailList__safe(keys_3), result);\n                    sum = op(__helios__value__get_inner_map_int(a_9, key_6), __helios__value__get_inner_map_int(b_9, key_6));\n                    __core__ifThenElse(\n                        __core__equalsInteger(sum, 0),\n                        () -> {\n                            tail_1\n                        },\n                        () -> {\n                            __core__mkCons(__core__mkPairData(key_6, __core__iData(sum)), tail_1)\n                        }\n                    )()\n                })()\n            };\n            recurse_31(recurse_31, __helios__value__merge_map_keys(a_9, b_9), __core__mkNilPairData(()))\n        }\n    };\n    __helios__value__add_or_subtract = (a_10, b_10, op_1) -> {\n        recurse_33 = (recurse_32, keys_4, result_1) -> {\n            __core__chooseList(keys_4, () -> {\n                result_1\n            }, () -> {\n                key_7 = __core__headList__safe(keys_4);\n                tail_2 = recurse_32(recurse_32, __core__tailList__safe(keys_4), result_1);\n                item_1 = __helios__value__add_or_subtract_inner(op_1)(__helios__value__get_inner_map(a_10, key_7), __helios__value__get_inner_map(b_10, key_7));\n                __core__chooseList(item_1, () -> {\n                    tail_2\n                }, () -> {\n                    __core__mkCons(__core__mkPairData(key_7, __core__mapData(item_1)), tail_2)\n                })()\n            })()\n        };\n        recurse_33(recurse_33, __helios__value__merge_map_keys(a_10, b_10), __core__mkNilPairData(()))\n    };\n    __helios__value____add = (a_11, b_11) -> {\n        __helios__value__add_or_subtract(a_11, b_11, __core__addInteger)\n    };\n    __helios__string____eq = __core__equalsString;\n    __helios__string____neq = (self_38, other_1) -> {\n        __helios__bool____not(__helios__string____eq(self_38, other_1))\n    };\n    __helios__value__is_zero_inner = (tokens_1) -> {\n        recurse_35 = (recurse_34, tokens_2) -> {\n            __core__chooseList(tokens_2, () -> {\n                true\n            }, () -> {\n                __helios__bool__and(() -> {\n                    __core__equalsInteger(__core__unIData(__core__sndPair(__core__headList__safe(tokens_2))), 0)\n                }, () -> {\n                    recurse_34(recurse_34, __core__tailList__safe(tokens_2))\n                })\n            })()\n        };\n        recurse_35(recurse_35, tokens_1)\n    };\n    __helios__value__is_zero = (self_39) -> {\n        () -> {\n            recurse_37 = (recurse_36, map_9) -> {\n                __core__chooseList(map_9, () -> {\n                    true\n                }, () -> {\n                    __helios__bool__and(() -> {\n                        __helios__value__is_zero_inner(__core__unMapData(__core__sndPair(__core__headList__safe(map_9))))\n                    }, () -> {\n                        recurse_36(recurse_36, __core__tailList__safe(map_9))\n                    })\n                })()\n            };\n            recurse_37(recurse_37, self_39)\n        }\n    };\n    __helios__common__insert_in_sorted = (x_1, lst_4, comp_2) -> {\n        recurse_39 = (recurse_38, lst_5) -> {\n            __core__chooseList(lst_5, () -> {\n                __core__mkCons(x_1, lst_5)\n            }, () -> {\n                head = __core__headList__safe(lst_5);\n                __core__ifThenElse(\n                    comp_2(x_1, head),\n                    () -> {\n                        __core__mkCons(x_1, lst_5)\n                    },\n                    () -> {\n                        __core__mkCons(head, recurse_38(recurse_38, __core__tailList__safe(lst_5)))\n                    }\n                )()\n            })()\n        };\n        recurse_39(recurse_39, lst_4)\n    };\n    __helios__common__sort = (lst_6, comp_3) -> {\n        recurse_41 = (recurse_40, lst_7) -> {\n            __core__chooseList(lst_7, () -> {\n                lst_7\n            }, () -> {\n                (head_1, tail_3) -> {\n                    __helios__common__insert_in_sorted(head_1, tail_3, comp_3)\n                }(__core__headList__safe(lst_7), recurse_40(recurse_40, __core__tailList__safe(lst_7)))\n            })()\n        };\n        recurse_41(recurse_41, lst_6)\n    };\n    __helios__string__from_data = (d) -> {\n        __core__decodeUtf8(__core__unBData(d))\n    };\n    __helios__common__map = (self_40, fn_3, init) -> {\n        recurse_43 = (recurse_42, rem_1, lst_8) -> {\n            __core__chooseList(rem_1, () -> {\n                lst_8\n            }, () -> {\n                __core__mkCons(fn_3(__core__headList__safe(rem_1)), recurse_42(recurse_42, __core__tailList__safe(rem_1), lst_8))\n            })()\n        };\n        recurse_43(recurse_43, self_40, init)\n    };\n    __helios__value____to_data = __core__mapData;\n    __helios__value__value = __helios__common__identity;\n    __helios__value__from_data = __core__unMapData;\n    __helios__common__find_safe = (self_41, fn_4, callback) -> {\n        recurse_45 = (recurse_44, self_42, fn_5) -> {\n            __core__chooseList(self_42, () -> {\n                __core__constrData(1, __helios__common__list_0)\n            }, () -> {\n                head_2 = __core__headList__safe(self_42);\n                __core__ifThenElse(\n                    fn_5(head_2),\n                    () -> {\n                        __core__constrData(0, __helios__common__list_1(callback(head_2)))\n                    },\n                    () -> {\n                        recurse_44(recurse_44, __core__tailList__safe(self_42), fn_5)\n                    }\n                )()\n            })()\n        };\n        recurse_45(recurse_45, self_41, fn_4)\n    };\n    __helios__int__max = (a_12, b_12) -> {\n        __core__ifThenElse(\n            __core__lessThanInteger(a_12, b_12),\n            b_12,\n            a_12\n        )\n    };\n    __helios__common__slice_bytearray = (self_43, selfLengthFn) -> {\n        (start, end) -> {\n            normalize = (pos) -> {\n                __core__ifThenElse(\n                    __core__lessThanInteger(pos, 0),\n                    () -> {\n                        __core__addInteger(__core__addInteger(selfLengthFn(self_43), 1), pos)\n                    },\n                    () -> {\n                        pos\n                    }\n                )()\n            };\n            fn_7 = (start_1) -> {\n                fn_6 = (end_1) -> {\n                    __core__sliceByteString(start_1, __core__subtractInteger(end_1, __helios__int__max(start_1, 0)), self_43)\n                };\n                fn_6(normalize(end))\n            };\n            fn_7(normalize(start))\n        }\n    };\n    __helios__bytearray__slice = (self_44) -> {\n        __helios__common__slice_bytearray(self_44, __core__lengthOfByteString)\n    };\n    __helios__bytearray__blake2b = (self_45) -> {\n        () -> {\n            __core__blake2b_256(self_45)\n        }\n    };\n    __helios__int____gt = (a_13, b_13) -> {\n        __helios__bool____not(__core__lessThanEqualsInteger(a_13, b_13))\n    };\n    __helios__bytearray__length = __core__lengthOfByteString;\n    __helios__bytearray____add = __core__appendByteString;\n    __helios__string__encode_utf8 = (self_46) -> {\n        () -> {\n            __core__encodeUtf8(self_46)\n        }\n    };\n    __helios__common__serialize = (self_47) -> {\n        () -> {\n            __core__serialiseData(self_47)\n        }\n    };\n    __helios__txid__serialize = __helios__common__serialize;\n    __helios__data__from_data = __helios__common__identity;\n    __helios__common__all = (self_48, fn_8) -> {\n        recurse_47 = (recurse_46, self_49, fn_9) -> {\n            __core__chooseList(self_49, () -> {\n                true\n            }, () -> {\n                __core__ifThenElse(\n                    fn_9(__core__headList__safe(self_49)),\n                    () -> {\n                        recurse_46(recurse_46, __core__tailList__safe(self_49), fn_9)\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_47(recurse_47, self_48, fn_8)\n    };\n    __helios__data__constrdata__fields = (data_14) -> {\n        __core__sndPair(__core__unConstrData(data_14))\n    };\n    __helios__common__enum_fields_after_4 = (self_50) -> {\n        __core__tailList(__helios__common__enum_fields_after_3(self_50))\n    };\n    __helios__common__enum_fields_after_5 = (self_51) -> {\n        __core__tailList(__helios__common__enum_fields_after_4(self_51))\n    };\n    __helios__common__enum_fields_after_6 = (self_52) -> {\n        __core__tailList(__helios__common__enum_fields_after_5(self_52))\n    };\n    __helios__common__enum_fields_after_7 = (self_53) -> {\n        __core__tailList(__helios__common__enum_fields_after_6(self_53))\n    };\n    __helios__common__enum_fields_after_8 = (self_54) -> {\n        __core__tailList(__helios__common__enum_fields_after_7(self_54))\n    };\n    __helios__common__enum_field_9 = (self_55) -> {\n        __core__headList(__helios__common__enum_fields_after_8(self_55))\n    };\n    __helios__tx__redeemers = (self_56) -> {\n        __core__unMapData(__helios__common__enum_field_9(self_56))\n    };\n    __helios__scriptpurpose__spending____is = (data_15) -> {\n        __helios__common__enum_tag_equals(data_15, 1)\n    };\n    __helios__txoutputid____eq = __helios__common____eq;\n    __helios__scriptpurpose__spending__output_id = __helios__common__enum_field_0;\n    __helios__txinput__output_id = __helios__common__enum_field_0;\n    __helios__common__map_get = (self_57, key_8, fnFound, fnNotFound) -> {\n        recurse_49 = (recurse_48, self_58, key_9) -> {\n            __core__chooseList(self_58, fnNotFound, () -> {\n                head_3 = __core__headList__safe(self_58);\n                __core__ifThenElse(\n                    __core__equalsData(key_9, __core__fstPair(head_3)),\n                    () -> {\n                        fnFound(__core__sndPair(head_3))\n                    },\n                    () -> {\n                        recurse_48(recurse_48, __core__tailList__safe(self_58), key_9)\n                    }\n                )()\n            })()\n        };\n        recurse_49(recurse_49, self_57, key_8)\n    };\n    __helios__scriptpurpose____to_data = __helios__common__identity;\n    __helios__txoutputid__show = (self_59) -> {\n        () -> {\n            __helios__string____add(__helios__txid__show(__helios__txoutputid__tx_id(self_59))(), __helios__string____add(\"#\", __helios__int__show(__helios__txoutputid__index(self_59))()))\n        }\n    };\n    __helios__txinput__datum = (self_60) -> {\n        __helios__txoutput__datum(__helios__txinput__output(self_60))\n    };\n    __helios__common__struct_fields_after_0 = __core__tailList;\n    __helios__common__struct_field_1 = (self_61) -> {\n        __core__headList(__helios__common__struct_fields_after_0(self_61))\n    };\n    __helios__common__struct_field_0 = __core__headList;\n    __helios__txoutput__is_valid_data = (data_16) -> {\n        __core__chooseData(data_16, () -> {\n            true\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__txinput__is_valid_data = (data_17) -> {\n        __helios__common__test_constr_data_2(data_17, 0, __helios__txoutputid__is_valid_data, __helios__txoutput__is_valid_data)\n    };\n    __helios__txinput____to_data = __helios__common__identity;\n    __helios__common__struct_fields_after_1 = (self_62) -> {\n        __core__tailList(__helios__common__struct_fields_after_0(self_62))\n    };\n    __helios__common__struct_field_2 = (self_63) -> {\n        __core__headList(__helios__common__struct_fields_after_1(self_63))\n    };\n    __helios__tx__ref_inputs = (self_64) -> {\n        __core__unListData(__helios__common__enum_field_1(self_64))\n    };\n    __helios__common__enum_field_5 = (self_65) -> {\n        __core__headList(__helios__common__enum_fields_after_4(self_65))\n    };\n    __helios__common__enum_field_3 = (self_66) -> {\n        __core__headList(__helios__common__enum_fields_after_2(self_66))\n    };\n    __helios__string__parse_utf8_cont_byte = (byte, callback_1) -> {\n        __core__ifThenElse(\n            __core__equalsInteger(__core__divideInteger(byte, 64), 2),\n            () -> {\n                callback_1(true, __core__modInteger(byte, 64))\n            },\n            () -> {\n                callback_1(false, 0)\n            }\n        )()\n    };\n    __helios__string__is_valid_utf8 = (bytes_5) -> {\n        n_2 = __core__lengthOfByteString(bytes_5);\n        recurse_51 = (recurse_50, i_4) -> {\n            __core__ifThenElse(\n                __core__equalsInteger(i_4, n_2),\n                () -> {\n                    true\n                },\n                () -> {\n                    b0 = __core__indexByteString__safe(bytes_5, i_4);\n                    __core__ifThenElse(\n                        __core__lessThanEqualsInteger(b0, 127),\n                        () -> {\n                            recurse_50(recurse_50, __core__addInteger(i_4, 1))\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __core__equalsInteger(__core__divideInteger(b0, 32), 6),\n                                () -> {\n                                    inext_2 = __core__addInteger(i_4, 2);\n                                    __core__ifThenElse(\n                                        __core__lessThanEqualsInteger(inext_2, n_2),\n                                        () -> {\n                                            __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 1)), (valid_5, c1_2) -> {\n                                                __core__ifThenElse(\n                                                    valid_5,\n                                                    () -> {\n                                                        c_2 = __core__addInteger(__core__multiplyInteger(__core__modInteger(b0, 32), 64), c1_2);\n                                                        __core__ifThenElse(\n                                                            __helios__bool__and(() -> {\n                                                                __core__lessThanEqualsInteger(128, c_2)\n                                                            }, () -> {\n                                                                __core__lessThanEqualsInteger(c_2, 2047)\n                                                            }),\n                                                            () -> {\n                                                                recurse_50(recurse_50, inext_2)\n                                                            },\n                                                            () -> {\n                                                                false\n                                                            }\n                                                        )()\n                                                    },\n                                                    () -> {\n                                                        false\n                                                    }\n                                                )()\n                                            })\n                                        },\n                                        () -> {\n                                            false\n                                        }\n                                    )()\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __core__equalsInteger(__core__divideInteger(b0, 16), 14),\n                                        () -> {\n                                            inext_1 = __core__addInteger(i_4, 3);\n                                            __core__ifThenElse(\n                                                __core__lessThanEqualsInteger(inext_1, n_2),\n                                                () -> {\n                                                    __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 1)), (valid_3, c1_1) -> {\n                                                        __core__ifThenElse(\n                                                            valid_3,\n                                                            () -> {\n                                                                __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 2)), (valid_4, c2_1) -> {\n                                                                    __core__ifThenElse(\n                                                                        valid_4,\n                                                                        () -> {\n                                                                            c_1 = __core__addInteger(__core__multiplyInteger(__core__modInteger(b0, 16), 4096), __core__addInteger(__core__multiplyInteger(c1_1, 64), c2_1));\n                                                                            __core__ifThenElse(\n                                                                                __helios__bool__and(() -> {\n                                                                                    __core__lessThanEqualsInteger(2048, c_1)\n                                                                                }, () -> {\n                                                                                    __core__lessThanEqualsInteger(c_1, 65535)\n                                                                                }),\n                                                                                () -> {\n                                                                                    recurse_50(recurse_50, inext_1)\n                                                                                },\n                                                                                () -> {\n                                                                                    false\n                                                                                }\n                                                                            )()\n                                                                        },\n                                                                        () -> {\n                                                                            false\n                                                                        }\n                                                                    )()\n                                                                })\n                                                            },\n                                                            () -> {\n                                                                false\n                                                            }\n                                                        )()\n                                                    })\n                                                },\n                                                () -> {\n                                                    false\n                                                }\n                                            )()\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __core__equalsInteger(__core__divideInteger(b0, 8), 30),\n                                                () -> {\n                                                    inext = __core__addInteger(i_4, 4);\n                                                    __core__ifThenElse(\n                                                        __core__lessThanEqualsInteger(inext, n_2),\n                                                        () -> {\n                                                            __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 1)), (valid, c1) -> {\n                                                                __core__ifThenElse(\n                                                                    valid,\n                                                                    () -> {\n                                                                        __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 2)), (valid_1, c2) -> {\n                                                                            __core__ifThenElse(\n                                                                                valid_1,\n                                                                                () -> {\n                                                                                    __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 3)), (valid_2, c3) -> {\n                                                                                        __core__ifThenElse(\n                                                                                            valid_2,\n                                                                                            () -> {\n                                                                                                c = __core__addInteger(__core__multiplyInteger(__core__modInteger(b0, 8), 262144), __core__addInteger(__core__multiplyInteger(c1, 4096), __core__addInteger(__core__multiplyInteger(c2, 64), c3)));\n                                                                                                __core__ifThenElse(\n                                                                                                    __helios__bool__and(() -> {\n                                                                                                        __core__lessThanEqualsInteger(65536, c)\n                                                                                                    }, () -> {\n                                                                                                        __core__lessThanEqualsInteger(c, 2097151)\n                                                                                                    }),\n                                                                                                    () -> {\n                                                                                                        recurse_50(recurse_50, inext)\n                                                                                                    },\n                                                                                                    () -> {\n                                                                                                        false\n                                                                                                    }\n                                                                                                )()\n                                                                                            },\n                                                                                            () -> {\n                                                                                                false\n                                                                                            }\n                                                                                        )()\n                                                                                    })\n                                                                                },\n                                                                                () -> {\n                                                                                    false\n                                                                                }\n                                                                            )()\n                                                                        })\n                                                                    },\n                                                                    () -> {\n                                                                        false\n                                                                    }\n                                                                )()\n                                                            })\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                },\n                                                () -> {\n                                                    false\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        };\n        recurse_51(recurse_51, 0)\n    };\n    __helios__string__is_valid_data = (data_18) -> {\n        __core__chooseData(data_18, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            __helios__string__is_valid_utf8(__core__unBData__safe(data_18))\n        })()\n    };\n    __helios__common__filter = (self_67, fn_10, nil) -> {\n        recurse_53 = (recurse_52, self_68, fn_11) -> {\n            __core__chooseList(self_68, () -> {\n                nil\n            }, () -> {\n                head_4 = __core__headList__safe(self_68);\n                __core__ifThenElse(\n                    fn_11(head_4),\n                    () -> {\n                        __core__mkCons(head_4, recurse_52(recurse_52, __core__tailList__safe(self_68), fn_11))\n                    },\n                    () -> {\n                        recurse_52(recurse_52, __core__tailList__safe(self_68), fn_11)\n                    }\n                )()\n            })()\n        };\n        recurse_53(recurse_53, self_67, fn_10)\n    };\n    __helios__common__filter_map = (self_69, fn_12) -> {\n        __helios__common__filter(self_69, fn_12, __core__mkNilPairData(()))\n    };\n    __helios__int____lt = __core__lessThanInteger;\n    __helios__validatorhash__show = __helios__bytearray__show;\n    __helios__txoutput__sum_values = (outputs) -> {\n        __helios__common__fold(outputs, (prev_2, txOutput) -> {\n            __helios__value____add(prev_2, __helios__txoutput__value(txOutput))\n        }, __helios__value__ZERO)\n    };\n    __helios__common__filter_list = (self_70, fn_13) -> {\n        __helios__common__filter(self_70, fn_13, __helios__common__list_0)\n    };\n    __helios__tx__filter_outputs = (self_71, fn_14) -> {\n        __helios__common__filter_list(__helios__tx__outputs(self_71), fn_14)\n    };\n    __helios__address__credential = __helios__common__enum_field_0;\n    __helios__spendingcredential__is_validator = (self_72) -> {\n        __core__equalsInteger(__core__fstPair(__core__unConstrData(self_72)), 1)\n    };\n    __helios__validatorhash____eq = __helios__bytearray____eq;\n    __helios__validatorhash__from_data = __helios__bytearray__from_data;\n    __helios__spendingcredential__validator__hash = (self_73) -> {\n        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_73))\n    };\n    __helios__spendingcredential__validator__cast = (data_19) -> {\n        __helios__common__assert_constr_index(data_19, 1)\n    };\n    __helios__txoutput__is_locked_by = (self_74) -> {\n        (hash) -> {\n            credential = __helios__address__credential(__helios__txoutput__address(self_74));\n            __core__ifThenElse(\n                __helios__spendingcredential__is_validator(credential),\n                () -> {\n                    __helios__validatorhash____eq(hash, __helios__spendingcredential__validator__hash(__helios__spendingcredential__validator__cast(credential)))\n                },\n                () -> {\n                    false\n                }\n            )()\n        }\n    };\n    __helios__tx__outputs_locked_by = (self_75) -> {\n        (vh) -> {\n            __helios__tx__filter_outputs(self_75, (output) -> {\n                __helios__txoutput__is_locked_by(output)(vh)\n            })\n        }\n    };\n    __helios__tx__value_locked_by = (self_76) -> {\n        (vh_1) -> {\n            __helios__txoutput__sum_values(__helios__tx__outputs_locked_by(self_76)(vh_1))\n        }\n    };\n    __helios__txoutput__from_data = __helios__common__identity;\n    __helios__spendingcredential____eq = __helios__common____eq;\n    __helios__txinput__address = (self_77) -> {\n        __helios__txoutput__address(__helios__txinput__output(self_77))\n    };\n    __helios__validatorhash____to_data = __helios__bytearray____to_data;\n    __helios__spendingcredential__new_validator = (hash_1) -> {\n        __core__constrData(1, __helios__common__list_1(__helios__validatorhash____to_data(hash_1)))\n    };\n    __helios__option__NONE = __core__constrData(1, __helios__common__list_0);\n    __helios__struct____to_data = __core__listData;\n    __helios__data__is_valid_data = (data_20) -> {\n        true\n    };\n    __helios__scriptpurpose__from_data = __helios__common__identity;\n    __module__StellarHeliosHelpers__TODO = (task) -> {\n        __helios__print(__helios__string____add(__helios__string____add(\"  🟥  😳💦  TODO: \", task), \"\n\"))\n    };\n    __module__StellarHeliosHelpers__REQT = (reqt) -> {\n        __helios__print(__helios__string____add(__helios__string____add(\"❗ \", reqt), \"\n\"))\n    };\n    __module__StellarHeliosHelpers__mkTv = (mph_8, __useopt__tn, tn, __useopt__tnBytes, tnBytes, __useopt__count, count) -> {\n        tn_1 = __core__ifThenElse(\n            __useopt__tn,\n            () -> {\n                tn\n            },\n            () -> {\n                \"\"\n            }\n        )();\n        tnBytes_1 = __core__ifThenElse(\n            __useopt__tnBytes,\n            () -> {\n                tnBytes\n            },\n            () -> {\n                __helios__string__encode_utf8(tn_1)()\n            }\n        )();\n        count_1 = __core__ifThenElse(\n            __useopt__count,\n            () -> {\n                count\n            },\n            () -> {\n                1\n            }\n        )();\n        __core__chooseUnit(__helios__assert(__helios__int____gt(__helios__bytearray__length(tnBytes_1), 0), \"missing reqd tn or tnBytes\"), __helios__value__new(__helios__assetclass__new(mph_8, tnBytes_1), count_1))\n    };\n    __module__StellarHeliosHelpers__tvCharter = (mph_9) -> {\n        __module__StellarHeliosHelpers__mkTv(mph_9, true, \"charter\", false, (), false, ())\n    };\n    __helios__list[__helios__txoutput]__find = (self_78) -> {\n        (fn_15) -> {\n            recurse_55 = (recurse_54, lst_9) -> {\n                __core__chooseList(lst_9, () -> {\n                    __helios__error(\"not found\")\n                }, () -> {\n                    item_2 = __helios__txoutput__from_data(__core__headList__safe(lst_9));\n                    __core__ifThenElse(\n                        fn_15(item_2),\n                        () -> {\n                            item_2\n                        },\n                        () -> {\n                            recurse_54(recurse_54, __core__tailList__safe(lst_9))\n                        }\n                    )()\n                })()\n            };\n            recurse_55(recurse_55, self_78)\n        }\n    };\n    __helios__map[__helios__bytearray@__helios__int]__is_valid_data_internal = (map_10) -> {\n        recurse_57 = (recurse_56, map_11) -> {\n            __core__chooseList(map_11, () -> {\n                true\n            }, () -> {\n                head_5 = __core__headList__safe(map_11);\n                __core__ifThenElse(\n                    __helios__bytearray__is_valid_data(__core__fstPair(head_5)),\n                    () -> {\n                        __core__ifThenElse(\n                            __helios__int__is_valid_data(__core__sndPair(head_5)),\n                            () -> {\n                                recurse_56(recurse_56, __core__tailList__safe(map_11))\n                            },\n                            () -> {\n                                false\n                            }\n                        )()\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_57(recurse_57, map_10)\n    };\n    __helios__map[__helios__bytearray@__helios__int]__from_data = (data_21) -> {\n        map_12 = __core__unMapData(data_21);\n        _ = __core__ifThenElse(\n            __helios__map[__helios__bytearray@__helios__int]__is_valid_data_internal(map_12),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(\"Warning: invalid map data\", ())\n            }\n        )();\n        map_12\n    };\n    __helios__map[__helios__scriptpurpose@__helios__data]__get = (self_79) -> {\n        (key_10) -> {\n            __helios__common__map_get(self_79, __helios__scriptpurpose____to_data(key_10), (x_2) -> {\n                __helios__data__from_data(x_2)\n            }, () -> {\n                __helios__error(\"key not found\")\n            })\n        }\n    };\n    __helios__map[__helios__scriptpurpose@__helios__data]__find_key = (self_80) -> {\n        (fn_16) -> {\n            recurse_59 = (recurse_58, map_13) -> {\n                __core__chooseList(map_13, () -> {\n                    __helios__error(\"not found\")\n                }, () -> {\n                    item_3 = __helios__scriptpurpose__from_data(__core__fstPair(__core__headList__safe(map_13)));\n                    __core__ifThenElse(\n                        fn_16(item_3),\n                        () -> {\n                            item_3\n                        },\n                        () -> {\n                            recurse_58(recurse_58, __core__tailList__safe(map_13))\n                        }\n                    )()\n                })()\n            };\n            recurse_59(recurse_59, self_80)\n        }\n    };\n    __module__StellarHeliosHelpers__mustFindInputRedeemer = (txInput) -> {\n        targetId = __helios__txinput__output_id(txInput);\n        redeemers = __helios__tx__redeemers(__helios__scriptcontext__tx);\n        spendsExpectedInput = __helios__map[__helios__scriptpurpose@__helios__data]__find_key(redeemers)((purpose) -> {\n            __cond = purpose;\n            __core__ifThenElse(\n                __helios__scriptpurpose__spending____is(__cond),\n                () -> {\n                    (sp) -> {\n                        __helios__txoutputid____eq(__helios__scriptpurpose__spending__output_id(sp), targetId)\n                    }\n                },\n                () -> {\n                    (__1) -> {\n                        false\n                    }\n                }\n            )()(__cond)\n        });\n        __helios__map[__helios__scriptpurpose@__helios__data]__get(redeemers)(spendsExpectedInput)\n    };\n    __helios__list[__helios__data]__head = (self_81) -> {\n        __helios__data__from_data(__core__headList(self_81))\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data = (__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data) -> {\n        (data_22) -> {\n            __core__ifThenElse(\n                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data(data_22),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data(data_22),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data(data_22),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__from_data = (__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_1) -> {\n        (data_23) -> {\n            ignore = __core__ifThenElse(\n                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_1)(data_23),\n                () -> {\n                    ()\n                },\n                () -> {\n                    __core__trace(\"Warning: invalid DelegateLifecycleActivity data\", ())\n                }\n            )();\n            data_23\n        }\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is = (data_24) -> {\n        __helios__common__enum_tag_equals(data_24, 0)\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2 = (data_25) -> {\n        __core__chooseData(data_25, () -> {\n            pair_8 = __core__unConstrData__safe(data_25);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_8), 0),\n                () -> {\n                    data_26 = __core__listData(__core__sndPair(pair_8));\n                    __core__chooseData(data_26, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_6 = __core__unListData__safe(data_26);\n                        __core__chooseList(fields_6, () -> {\n                            false\n                        }, () -> {\n                            head_6 = __core__headList__safe(fields_6);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_6),\n                                () -> {\n                                    fields_7 = __core__tailList__safe(fields_6);\n                                    __core__chooseList(fields_7, () -> {\n                                        false\n                                    }, () -> {\n                                        head_7 = __core__headList__safe(fields_7);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_7),\n                                            () -> {\n                                                fields_8 = __core__tailList__safe(fields_7);\n                                                __core__chooseList(fields_8, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring____is = (data_27) -> {\n        __helios__common__enum_tag_equals(data_27, 1)\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2 = (data_28) -> {\n        __core__chooseData(data_28, () -> {\n            pair_9 = __core__unConstrData__safe(data_28);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_9), 1),\n                () -> {\n                    data_29 = __core__listData(__core__sndPair(pair_9));\n                    __core__chooseData(data_29, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_9 = __core__unListData__safe(data_29);\n                        __core__chooseList(fields_9, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2 = (data_30) -> {\n        __core__chooseData(data_30, () -> {\n            pair_10 = __core__unConstrData__safe(data_30);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_10), 2),\n                () -> {\n                    data_31 = __core__listData(__core__sndPair(pair_10));\n                    __core__chooseData(data_31, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_10 = __core__unListData__safe(data_31);\n                        __core__chooseList(fields_10, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data = (__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data) -> {\n        (data_32) -> {\n            __core__ifThenElse(\n                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data(data_32),\n                () -> {\n                    true\n                },\n                () -> {\n                    false\n                }\n            )()\n        }\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__from_data = (__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_1) -> {\n        (data_33) -> {\n            ignore_1 = __core__ifThenElse(\n                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_1)(data_33),\n                () -> {\n                    ()\n                },\n                () -> {\n                    __core__trace(\"Warning: invalid CapoLifecycleActivity data\", ())\n                }\n            )();\n            data_33\n        }\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2 = (data_34) -> {\n        __core__chooseData(data_34, () -> {\n            pair_11 = __core__unConstrData__safe(data_34);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_11), 0),\n                () -> {\n                    data_35 = __core__listData(__core__sndPair(pair_11));\n                    __core__chooseData(data_35, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_11 = __core__unListData__safe(data_35);\n                        __core__chooseList(fields_11, () -> {\n                            false\n                        }, () -> {\n                            head_8 = __core__headList__safe(fields_11);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_8),\n                                () -> {\n                                    fields_12 = __core__tailList__safe(fields_11);\n                                    __core__chooseList(fields_12, () -> {\n                                        false\n                                    }, () -> {\n                                        head_9 = __core__headList__safe(fields_12);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_9),\n                                            () -> {\n                                                fields_13 = __core__tailList__safe(fields_12);\n                                                __core__chooseList(fields_13, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]____to_data = __helios__common__identity;\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__is_valid_data = (__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data) -> {\n        (data_36) -> {\n            __core__ifThenElse(\n                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data(data_36),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data(data_36),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data(data_36),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data(data_36),\n                                        () -> {\n                                            true\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data(data_36),\n                                                () -> {\n                                                    true\n                                                },\n                                                () -> {\n                                                    __core__ifThenElse(\n                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data(data_36),\n                                                        () -> {\n                                                            true\n                                                        },\n                                                        () -> {\n                                                            __core__ifThenElse(\n                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data(data_36),\n                                                                () -> {\n                                                                    true\n                                                                },\n                                                                () -> {\n                                                                    __core__ifThenElse(\n                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data(data_36),\n                                                                        () -> {\n                                                                            true\n                                                                        },\n                                                                        () -> {\n                                                                            __core__ifThenElse(\n                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data(data_36),\n                                                                                () -> {\n                                                                                    true\n                                                                                },\n                                                                                () -> {\n                                                                                    false\n                                                                                }\n                                                                            )()\n                                                                        }\n                                                                    )()\n                                                                }\n                                                            )()\n                                                        }\n                                                    )()\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data = (__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_1) -> {\n        (data_37) -> {\n            ignore_2 = __core__ifThenElse(\n                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__is_valid_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_1)(data_37),\n                () -> {\n                    ()\n                },\n                () -> {\n                    __core__trace(\"Warning: invalid AbstractDelegateActivitiesEnum data\", ())\n                }\n            )();\n            data_37\n        }\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is = (data_38) -> {\n        __helios__common__enum_tag_equals(data_38, 0)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2 = (data_39) -> {\n        __core__chooseData(data_39, () -> {\n            pair_12 = __core__unConstrData__safe(data_39);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_12), 0),\n                () -> {\n                    data_40 = __core__listData(__core__sndPair(pair_12));\n                    __core__chooseData(data_40, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_14 = __core__unListData__safe(data_40);\n                        __core__chooseList(fields_14, () -> {\n                            false\n                        }, () -> {\n                            head_10 = __core__headList__safe(fields_14);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2)(head_10),\n                                () -> {\n                                    fields_15 = __core__tailList__safe(fields_14);\n                                    __core__chooseList(fields_15, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__activity = (self_82) -> {\n        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__from_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2)(__helios__common__enum_field_0(self_82))\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities____is = (data_41) -> {\n        __helios__common__enum_tag_equals(data_41, 1)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2 = (data_42) -> {\n        __core__chooseData(data_42, () -> {\n            pair_13 = __core__unConstrData__safe(data_42);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_13), 1),\n                () -> {\n                    data_43 = __core__listData(__core__sndPair(pair_13));\n                    __core__chooseData(data_43, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_16 = __core__unListData__safe(data_43);\n                        __core__chooseList(fields_16, () -> {\n                            false\n                        }, () -> {\n                            head_11 = __core__headList__safe(fields_16);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2)(head_11),\n                                () -> {\n                                    fields_17 = __core__tailList__safe(fields_16);\n                                    __core__chooseList(fields_17, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__activity = (self_83) -> {\n        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__from_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2)(__helios__common__enum_field_0(self_83))\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities____is = (data_44) -> {\n        __helios__common__enum_tag_equals(data_44, 2)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2 = (data_45) -> {\n        __core__chooseData(data_45, () -> {\n            pair_14 = __core__unConstrData__safe(data_45);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_14), 2),\n                () -> {\n                    data_46 = __core__listData(__core__sndPair(pair_14));\n                    __core__chooseData(data_46, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_18 = __core__unListData__safe(data_46);\n                        __core__chooseList(fields_18, () -> {\n                            false\n                        }, () -> {\n                            head_12 = __core__headList__safe(fields_18);\n                            __core__ifThenElse(\n                                __helios__data__is_valid_data(head_12),\n                                () -> {\n                                    fields_19 = __core__tailList__safe(fields_18);\n                                    __core__chooseList(fields_19, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities____is = (data_47) -> {\n        __helios__common__enum_tag_equals(data_47, 3)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2 = (data_48) -> {\n        __core__chooseData(data_48, () -> {\n            pair_15 = __core__unConstrData__safe(data_48);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_15), 3),\n                () -> {\n                    data_49 = __core__listData(__core__sndPair(pair_15));\n                    __core__chooseData(data_49, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_20 = __core__unListData__safe(data_49);\n                        __core__chooseList(fields_20, () -> {\n                            false\n                        }, () -> {\n                            head_13 = __core__headList__safe(fields_20);\n                            __core__ifThenElse(\n                                __helios__data__is_valid_data(head_13),\n                                () -> {\n                                    fields_21 = __core__tailList__safe(fields_20);\n                                    __core__chooseList(fields_21, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities____is = (data_50) -> {\n        __helios__common__enum_tag_equals(data_50, 4)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2 = (data_51) -> {\n        __core__chooseData(data_51, () -> {\n            pair_16 = __core__unConstrData__safe(data_51);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_16), 4),\n                () -> {\n                    data_52 = __core__listData(__core__sndPair(pair_16));\n                    __core__chooseData(data_52, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_22 = __core__unListData__safe(data_52);\n                        __core__chooseList(fields_22, () -> {\n                            false\n                        }, () -> {\n                            head_14 = __core__headList__safe(fields_22);\n                            __core__ifThenElse(\n                                __helios__data__is_valid_data(head_14),\n                                () -> {\n                                    fields_23 = __core__tailList__safe(fields_22);\n                                    __core__chooseList(fields_23, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData____is = (data_53) -> {\n        __helios__common__enum_tag_equals(data_53, 5)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2 = (data_54) -> {\n        __core__chooseData(data_54, () -> {\n            pair_17 = __core__unConstrData__safe(data_54);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_17), 5),\n                () -> {\n                    data_55 = __core__listData(__core__sndPair(pair_17));\n                    __core__chooseData(data_55, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_24 = __core__unListData__safe(data_55);\n                        __core__chooseList(fields_24, () -> {\n                            false\n                        }, () -> {\n                            head_15 = __core__headList__safe(fields_24);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_15),\n                                () -> {\n                                    fields_25 = __core__tailList__safe(fields_24);\n                                    __core__chooseList(fields_25, () -> {\n                                        false\n                                    }, () -> {\n                                        head_16 = __core__headList__safe(fields_25);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_16),\n                                            () -> {\n                                                fields_26 = __core__tailList__safe(fields_25);\n                                                __core__chooseList(fields_26, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData____is = (data_56) -> {\n        __helios__common__enum_tag_equals(data_56, 6)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2 = (data_57) -> {\n        __core__chooseData(data_57, () -> {\n            pair_18 = __core__unConstrData__safe(data_57);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_18), 6),\n                () -> {\n                    data_58 = __core__listData(__core__sndPair(pair_18));\n                    __core__chooseData(data_58, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_27 = __core__unListData__safe(data_58);\n                        __core__chooseList(fields_27, () -> {\n                            false\n                        }, () -> {\n                            head_17 = __core__headList__safe(fields_27);\n                            __core__ifThenElse(\n                                __helios__string__is_valid_data(head_17),\n                                () -> {\n                                    fields_28 = __core__tailList__safe(fields_27);\n                                    __core__chooseList(fields_28, () -> {\n                                        false\n                                    }, () -> {\n                                        head_18 = __core__headList__safe(fields_28);\n                                        __core__ifThenElse(\n                                            __helios__bytearray__is_valid_data(head_18),\n                                            () -> {\n                                                fields_29 = __core__tailList__safe(fields_28);\n                                                __core__chooseList(fields_29, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData____is = (data_59) -> {\n        __helios__common__enum_tag_equals(data_59, 7)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2 = (data_60) -> {\n        __core__chooseData(data_60, () -> {\n            pair_19 = __core__unConstrData__safe(data_60);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_19), 7),\n                () -> {\n                    data_61 = __core__listData(__core__sndPair(pair_19));\n                    __core__chooseData(data_61, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_30 = __core__unListData__safe(data_61);\n                        __core__chooseList(fields_30, () -> {\n                            false\n                        }, () -> {\n                            head_19 = __core__headList__safe(fields_30);\n                            __core__ifThenElse(\n                                __helios__string__is_valid_data(head_19),\n                                () -> {\n                                    fields_31 = __core__tailList__safe(fields_30);\n                                    __core__chooseList(fields_31, () -> {\n                                        false\n                                    }, () -> {\n                                        head_20 = __core__headList__safe(fields_31);\n                                        __core__ifThenElse(\n                                            __helios__bytearray__is_valid_data(head_20),\n                                            () -> {\n                                                fields_32 = __core__tailList__safe(fields_31);\n                                                __core__chooseList(fields_32, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities____is = (data_62) -> {\n        __helios__common__enum_tag_equals(data_62, 8)\n    };\n    __helios__list[__helios__data]__is_valid_data_internal = (lst_10) -> {\n        recurse_61 = (recurse_60, lst_11) -> {\n            __core__chooseList(lst_11, () -> {\n                true\n            }, () -> {\n                __core__ifThenElse(\n                    __helios__data__is_valid_data(__core__headList__safe(lst_11)),\n                    () -> {\n                        recurse_60(recurse_60, __core__tailList__safe(lst_11))\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_61(recurse_61, lst_10)\n    };\n    __helios__list[__helios__data]__is_valid_data = (data_63) -> {\n        __core__chooseData(data_63, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            __helios__list[__helios__data]__is_valid_data_internal(__core__unListData__safe(data_63))\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2 = (data_64) -> {\n        __core__chooseData(data_64, () -> {\n            pair_20 = __core__unConstrData__safe(data_64);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_20), 8),\n                () -> {\n                    data_65 = __core__listData(__core__sndPair(pair_20));\n                    __core__chooseData(data_65, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_33 = __core__unListData__safe(data_65);\n                        __core__chooseList(fields_33, () -> {\n                            false\n                        }, () -> {\n                            head_21 = __core__headList__safe(fields_33);\n                            __core__ifThenElse(\n                                __helios__list[__helios__data]__is_valid_data(head_21),\n                                () -> {\n                                    fields_34 = __core__tailList__safe(fields_33);\n                                    __core__chooseList(fields_34, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__list[__helios__data]__from_data = (data_66) -> {\n        lst_12 = __core__unListData(data_66);\n        __2 = __core__ifThenElse(\n            __helios__list[__helios__data]__is_valid_data_internal(lst_12),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(\"Warning: invalid list data\", ())\n            }\n        )();\n        lst_12\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__activities = (self_84) -> {\n        __helios__list[__helios__data]__from_data(__helios__common__enum_field_0(self_84))\n    };\n    __helios__list[__helios__data]____to_data = __core__listData;\n    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____is = (data_67) -> {\n        __helios__common__enum_tag_equals(data_67, 0)\n    };\n    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new = () -> {\n        __core__constrData(0, __core__mkNilData(()))\n    };\n    __module__CapoDelegateHelpers__DgTknDisposition[]__Created____is = (data_68) -> {\n        __helios__common__enum_tag_equals(data_68, 1)\n    };\n    __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new = () -> {\n        __core__constrData(1, __core__mkNilData(()))\n    };\n    __helios__option[__helios__validatorhash]__is_valid_data = (data_69) -> {\n        __core__chooseData(data_69, () -> {\n            pair_21 = __core__unConstrData__safe(data_69);\n            index_5 = __core__fstPair(pair_21);\n            fields_35 = __core__sndPair(pair_21);\n            __core__ifThenElse(\n                __core__equalsInteger(index_5, 0),\n                () -> {\n                    __core__chooseList(fields_35, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_35), () -> {\n                            __helios__validatorhash__is_valid_data(__core__headList__safe(fields_35))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_5, 1),\n                        () -> {\n                            __core__chooseList(fields_35, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data = (data_70) -> {\n        __core__chooseData(data_70, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            fields_36 = __core__unListData__safe(data_70);\n            __core__chooseList(fields_36, () -> {\n                false\n            }, () -> {\n                head_22 = __core__headList__safe(fields_36);\n                __core__ifThenElse(\n                    __helios__string__is_valid_data(head_22),\n                    () -> {\n                        fields_37 = __core__tailList__safe(fields_36);\n                        __core__chooseList(fields_37, () -> {\n                            false\n                        }, () -> {\n                            head_23 = __core__headList__safe(fields_37);\n                            __core__ifThenElse(\n                                __helios__string__is_valid_data(head_23),\n                                () -> {\n                                    fields_38 = __core__tailList__safe(fields_37);\n                                    __core__chooseList(fields_38, () -> {\n                                        false\n                                    }, () -> {\n                                        head_24 = __core__headList__safe(fields_38);\n                                        __core__ifThenElse(\n                                            __helios__option[__helios__validatorhash]__is_valid_data(head_24),\n                                            () -> {\n                                                fields_39 = __core__tailList__safe(fields_38);\n                                                __core__chooseList(fields_39, () -> {\n                                                    false\n                                                }, () -> {\n                                                    head_25 = __core__headList__safe(fields_39);\n                                                    __core__ifThenElse(\n                                                        __helios__bytearray__is_valid_data(head_25),\n                                                        () -> {\n                                                            fields_40 = __core__tailList__safe(fields_39);\n                                                            __core__chooseList(fields_40, true, false)\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                })()\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data = (data_71) -> {\n        ignore_3 = __core__ifThenElse(\n            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(data_71),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(\"Warning: invalid RelativeDelegateLink data\", ())\n            }\n        )();\n        __core__unListData(data_71)\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]____to_data = __helios__struct____to_data;\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName = (self_85) -> {\n        __helios__string__from_data(__helios__common__struct_field_0(self_85))\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__strategyName = (self_86) -> {\n        __helios__string__from_data(__helios__common__struct_field_1(self_86))\n    };\n    __helios__option[__helios__validatorhash]__from_data = (data_72) -> {\n        __3 = __core__ifThenElse(\n            __helios__option[__helios__validatorhash]__is_valid_data(data_72),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(\"Warning: invalid option data\", ())\n            }\n        )();\n        data_72\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash = (self_87) -> {\n        __helios__option[__helios__validatorhash]__from_data(__helios__common__struct_field_2(self_87))\n    };\n    __helios__option[__helios__txinput]__some__some = (self_88) -> {\n        __helios__txinput__from_data(__helios__common__enum_field_0(self_88))\n    };\n    __helios__option[__helios__validatorhash]__none____is = (data_73) -> {\n        __helios__common__enum_tag_equals(data_73, 1)\n    };\n    __helios__option[__helios__txinput]__none____new = () -> {\n        __helios__option__NONE\n    };\n    __helios__option[__helios__txinput]__some____is = (data_74) -> {\n        __helios__common__enum_tag_equals(data_74, 0)\n    };\n    __helios__list[__helios__txinput]__find_safe = (self_89) -> {\n        (fn_17) -> {\n            __helios__common__find_safe(self_89, (item_4) -> {\n                fn_17(__helios__txinput__from_data(item_4))\n            }, __helios__common__identity)\n        }\n    };\n    __helios__option[__helios__validatorhash]__some__some = (self_90) -> {\n        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_90))\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput = (self_91) -> {\n        (inputs, mph_10, __useopt__required, required) -> {\n            required_1 = __core__ifThenElse(\n                __useopt__required,\n                () -> {\n                    required\n                },\n                () -> {\n                    true\n                }\n            )();\n            __cond_1 = __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash(self_91);\n            __core__ifThenElse(\n                __helios__option[__helios__validatorhash]__none____is(__cond_1),\n                () -> {\n                    (__lhs_0_2) -> {\n                        __core__ifThenElse(\n                            required_1,\n                            () -> {\n                                __helios__error(__helios__string____add(\"_❌ ➡️ 💁 missing required input with dgTkn \", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_91)))\n                            },\n                            () -> {\n                                () -> {\n                                    __helios__option[__helios__txinput]__none____new()\n                                }()\n                            }\n                        )()\n                    }\n                },\n                () -> {\n                    (__lhs_0) -> {\n                        vh_2 = __helios__option[__helios__validatorhash]__some__some(__lhs_0);\n                        needsAddrWithCred = __helios__spendingcredential__new_validator(vh_2);\n                        expectedUut = __module__StellarHeliosHelpers__mkTv(mph_10, true, __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_91), false, (), false, ());\n                        __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(\"  -- seeking input dgTkn: \", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_91)), \"\n\")), __cond_2 = __helios__list[__helios__txinput]__find_safe(inputs)((i_5) -> {\n                            __helios__bool__and(() -> {\n                                __helios__spendingcredential____eq(__helios__address__credential(__helios__txinput__address(i_5)), needsAddrWithCred)\n                            }, () -> {\n                                __helios__value__contains(__helios__txinput__value(i_5))(expectedUut)\n                            })\n                        });\n                        __core__ifThenElse(\n                            __helios__option[__helios__txinput]__some____is(__cond_2),\n                            () -> {\n                                (foundGood) -> {\n                                    __core__chooseUnit(__helios__print(\"  ✅ ➡️  💁 found ^ input dgTkn\"), foundGood)\n                                }\n                            },\n                            () -> {\n                                (__lhs_0_1) -> {\n                                    __core__ifThenElse(\n                                        required_1,\n                                        () -> {\n                                            __helios__error(__helios__string____add(\"_❌ ➡️  💁 missing req'd input dgTkn (at script addr) \", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_91)))\n                                        },\n                                        () -> {\n                                            () -> {\n                                                __core__chooseUnit(__helios__print(\" <- 🚫 ➡️ 💁 no input with ^ dgTkn; not req'd; returning false\n\"), __helios__option[__helios__txinput]__none____new())\n                                            }()\n                                        }\n                                    )()\n                                }\n                            }\n                        )()(__cond_2))\n                    }\n                }\n            )()(__cond_1)\n        }\n    };\n    __helios__option[__helios__validatorhash]__some____is = (data_75) -> {\n        __helios__common__enum_tag_equals(data_75, 0)\n    };\n    __helios__option[__helios__txoutput]__some____is = (data_76) -> {\n        __helios__common__enum_tag_equals(data_76, 0)\n    };\n    __helios__list[__helios__txoutput]__find_safe = (self_92) -> {\n        (fn_18) -> {\n            __helios__common__find_safe(self_92, (item_5) -> {\n                fn_18(__helios__txoutput__from_data(item_5))\n            }, __helios__common__identity)\n        }\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput = (self_93) -> {\n        (mph_11, __useopt__required_1, required_2, __useopt__createdOrReturned, createdOrReturned) -> {\n            required_3 = __core__ifThenElse(\n                __useopt__required_1,\n                () -> {\n                    required_2\n                },\n                () -> {\n                    true\n                }\n            )();\n            createdOrReturned_1 = __core__ifThenElse(\n                __useopt__createdOrReturned,\n                () -> {\n                    createdOrReturned\n                },\n                () -> {\n                    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new()\n                }\n            )();\n            __lhs_0_3 = self_93;\n            uut = __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(__lhs_0_3);\n            strategy = __module__CapoDelegateHelpers__RelativeDelegateLink[]__strategyName(__lhs_0_3);\n            validatorHash = __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash(__lhs_0_3);\n            __core__chooseUnit(__core__ifThenElse(\n                __helios__int____lt(__helios__bytearray__length(__helios__string__encode_utf8(strategy)()), 4),\n                () -> {\n                    __helios__error(\"strategy too short\")\n                },\n                () -> {\n                    () -> {\n                        __helios__assert(true, \"no\")\n                    }()\n                }\n            )(), v = __module__StellarHeliosHelpers__mkTv(mph_11, true, uut, false, (), false, ());\n            (cOrR) -> {\n                __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add(\" ⬅️ 🔎 💁 expect dgTkn \", cOrR), \": \"), uut)), (hasDelegate) -> {\n                    __core__chooseUnit(__core__ifThenElse(\n                        __helios__bool__and(() -> {\n                            __helios__bool____not(hasDelegate)\n                        }, () -> {\n                            required_3\n                        }),\n                        () -> {\n                            __cond_6 = createdOrReturned_1;\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__DgTknDisposition[]__Created____is(__cond_6),\n                                () -> {\n                                    (__lhs_0_12) -> {\n                                        __helios__error(__helios__string____add(\"⬅️ ❌ 💁 dgTkn not created: \", uut))\n                                    }\n                                },\n                                () -> {\n                                    (__lhs_0_10) -> {\n                                        __lhs_0_11 = __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput(self_93)(__helios__tx__inputs(__helios__scriptcontext__tx), mph_11, true, true);\n                                        __helios__error(__helios__string____add(\"⬅️ ❌ 💁 dgTkn not returned: \", uut))\n                                    }\n                                }\n                            )()(__cond_6)\n                        },\n                        () -> {\n                            () -> {\n                                __core__ifThenElse(\n                                    hasDelegate,\n                                    () -> {\n                                        __helios__print(__helios__string____add(__helios__string____add(\" ⬅️ ✅ 💁 ok:  ^ dgTkn has \", cOrR), \" a valid output\n\"))\n                                    },\n                                    () -> {\n                                        () -> {\n                                            __helios__print(\" ⬅️ 🚫 💁 no delegate but not req'd; false\")\n                                        }()\n                                    }\n                                )()\n                            }()\n                        }\n                    )(), hasDelegate)\n                }(__cond_4 = validatorHash;\n                __core__ifThenElse(\n                    __helios__option[__helios__validatorhash]__some____is(__cond_4),\n                    () -> {\n                        (__lhs_0_9) -> {\n                            vh_3 = __helios__option[__helios__validatorhash]__some__some(__lhs_0_9);\n                            __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(\" sent to validator: \", __helios__validatorhash__show(vh_3)()), \"\n\")), __helios__value__contains(__helios__tx__value_locked_by(__helios__scriptcontext__tx)(vh_3))(v))\n                        }\n                    },\n                    () -> {\n                        (__lhs_0_6) -> {\n                            __core__chooseUnit(__helios__print(\" (to anywhere)\n\"), __cond_5 = __helios__list[__helios__txoutput]__find_safe(__helios__tx__outputs(__helios__scriptcontext__tx))((o) -> {\n                                __helios__value__contains(__helios__txoutput__value(o))(v)\n                            });\n                            __core__ifThenElse(\n                                __helios__option[__helios__txoutput]__some____is(__cond_5),\n                                () -> {\n                                    (__lhs_0_8) -> {\n                                        true\n                                    }\n                                },\n                                () -> {\n                                    (__lhs_0_7) -> {\n                                        false\n                                    }\n                                }\n                            )()(__cond_5))\n                        }\n                    }\n                )()(__cond_4)))\n            }(__cond_3 = createdOrReturned_1;\n            __core__ifThenElse(\n                __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____is(__cond_3),\n                () -> {\n                    (__lhs_0_5) -> {\n                        \"returned\"\n                    }\n                },\n                () -> {\n                    (__lhs_0_4) -> {\n                        \"created\"\n                    }\n                }\n            )()(__cond_3)))\n        }\n    };\n    __helios__list[__helios__txinput]__any = (self_94) -> {\n        (fn_19) -> {\n            __helios__common__any(self_94, (item_6) -> {\n                fn_19(__helios__txinput__from_data(item_6))\n            })\n        }\n    };\n    __helios__map[__helios__mintingpolicyhash@__helios__map[__helios__bytearray@__helios__int]]__filter = (self_95) -> {\n        (fn_20) -> {\n            __helios__common__filter_map(self_95, (pair_22) -> {\n                fn_20(__helios__mintingpolicyhash__from_data(__core__fstPair(pair_22)), __helios__map[__helios__bytearray@__helios__int]__from_data(__core__sndPair(pair_22)))\n            })\n        }\n    };\n    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal = (lst_13) -> {\n        recurse_63 = (recurse_62, lst_14) -> {\n            __core__chooseList(lst_14, () -> {\n                true\n            }, () -> {\n                __core__ifThenElse(\n                    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__headList__safe(lst_14)),\n                    () -> {\n                        recurse_62(recurse_62, __core__tailList__safe(lst_14))\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_63(recurse_63, lst_13)\n    };\n    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_77) -> {\n        __core__chooseData(data_77, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(__core__unListData__safe(data_77))\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal = (map_14) -> {\n        recurse_65 = (recurse_64, map_15) -> {\n            __core__chooseList(map_15, () -> {\n                true\n            }, () -> {\n                head_26 = __core__headList__safe(map_15);\n                __core__ifThenElse(\n                    __helios__string__is_valid_data(__core__fstPair(head_26)),\n                    () -> {\n                        __core__ifThenElse(\n                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__sndPair(head_26)),\n                            () -> {\n                                recurse_64(recurse_64, __core__tailList__safe(map_15))\n                            },\n                            () -> {\n                                false\n                            }\n                        )()\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_65(recurse_65, map_14)\n    };\n    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_78) -> {\n        __core__chooseData(data_78, () -> {\n            false\n        }, () -> {\n            __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(__core__unMapData__safe(data_78))\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data = (data_79) -> {\n        __core__chooseData(data_79, () -> {\n            pair_23 = __core__unConstrData__safe(data_79);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_23), 0),\n                () -> {\n                    data_80 = __core__listData(__core__sndPair(pair_23));\n                    __core__chooseData(data_80, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_41 = __core__unListData__safe(data_80);\n                        __core__chooseList(fields_41, () -> {\n                            false\n                        }, () -> {\n                            head_27 = __core__headList__safe(fields_41);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_27),\n                                () -> {\n                                    fields_42 = __core__tailList__safe(fields_41);\n                                    __core__chooseList(fields_42, () -> {\n                                        false\n                                    }, () -> {\n                                        head_28 = __core__headList__safe(fields_42);\n                                        __core__ifThenElse(\n                                            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_28),\n                                            () -> {\n                                                fields_43 = __core__tailList__safe(fields_42);\n                                                __core__chooseList(fields_43, () -> {\n                                                    false\n                                                }, () -> {\n                                                    head_29 = __core__headList__safe(fields_43);\n                                                    __core__ifThenElse(\n                                                        __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_29),\n                                                        () -> {\n                                                            fields_44 = __core__tailList__safe(fields_43);\n                                                            __core__chooseList(fields_44, () -> {\n                                                                false\n                                                            }, () -> {\n                                                                head_30 = __core__headList__safe(fields_44);\n                                                                __core__ifThenElse(\n                                                                    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_30),\n                                                                    () -> {\n                                                                        fields_45 = __core__tailList__safe(fields_44);\n                                                                        __core__chooseList(fields_45, () -> {\n                                                                            false\n                                                                        }, () -> {\n                                                                            head_31 = __core__headList__safe(fields_45);\n                                                                            __core__ifThenElse(\n                                                                                __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_31),\n                                                                                () -> {\n                                                                                    fields_46 = __core__tailList__safe(fields_45);\n                                                                                    __core__chooseList(fields_46, () -> {\n                                                                                        false\n                                                                                    }, () -> {\n                                                                                        head_32 = __core__headList__safe(fields_46);\n                                                                                        __core__ifThenElse(\n                                                                                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_32),\n                                                                                            () -> {\n                                                                                                fields_47 = __core__tailList__safe(fields_46);\n                                                                                                __core__chooseList(fields_47, true, false)\n                                                                                            },\n                                                                                            () -> {\n                                                                                                false\n                                                                                            }\n                                                                                        )()\n                                                                                    })()\n                                                                                },\n                                                                                () -> {\n                                                                                    false\n                                                                                }\n                                                                            )()\n                                                                        })()\n                                                                    },\n                                                                    () -> {\n                                                                        false\n                                                                    }\n                                                                )()\n                                                            })()\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                })()\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterToken__from_data = (data_81) -> {\n        ignore_4 = __core__ifThenElse(\n            __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data(data_81),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(\"Warning: invalid CharterToken data\", ())\n            }\n        )();\n        data_81\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterToken____to_data = __helios__common__identity;\n    __module__CapoHelpers__CapoDatum[]__CharterToken__spendDelegateLink = (self_96) -> {\n        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__enum_field_0(self_96))\n    };\n    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__from_data = (data_82) -> {\n        lst_15 = __core__unListData(data_82);\n        __4 = __core__ifThenElse(\n            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(lst_15),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(\"Warning: invalid list data\", ())\n            }\n        )();\n        lst_15\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterToken__spendInvariants = (self_97) -> {\n        __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__from_data(__helios__common__enum_field_1(self_97))\n    };\n    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__from_data = (data_83) -> {\n        map_16 = __core__unMapData(data_83);\n        __5 = __core__ifThenElse(\n            __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(map_16),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(\"Warning: invalid map data\", ())\n            }\n        )();\n        map_16\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterToken__namedDelegates = (self_98) -> {\n        __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__from_data(__helios__common__enum_field_2(self_98))\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink = (self_99) -> {\n        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__enum_field_3(self_99))\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterToken__mintInvariants = (self_100) -> {\n        __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__from_data(__helios__common__enum_field_4(self_100))\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterToken__govAuthorityLink = (self_101) -> {\n        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__enum_field_5(self_101))\n    };\n    __module__CapoHelpers__getRefCharterUtxo = (mph_12) -> {\n        chVal = __module__StellarHeliosHelpers__tvCharter(mph_12);\n        hasCharter = (txin) -> {\n            __helios__value__contains(__helios__txinput__value(txin))(chVal)\n        };\n        __core__chooseUnit(__helios__print(\"getting ref_input for charter\n\"), (charterUtxo) -> {\n            charterUtxo\n        }(__cond_7 = __helios__list[__helios__txinput]__find_safe(__helios__tx__ref_inputs(__helios__scriptcontext__tx))(hasCharter);\n        __core__ifThenElse(\n            __helios__option[__helios__txinput]__some____is(__cond_7),\n            () -> {\n                (__lhs_0_14) -> {\n                    ch = __helios__option[__helios__txinput]__some__some(__lhs_0_14);\n                    ch\n                }\n            },\n            () -> {\n                (__lhs_0_13) -> {\n                    __core__chooseUnit(__helios__print(\"expected charter value\"), __core__chooseUnit(__helios__print(__helios__value__show(chVal)()), __core__chooseUnit(__helios__print(\"\n\"), __helios__error(\"Missing charter in required ref_inputs (use tcxWithCharterRef(tcx) in txn building functions)\"))))\n                }\n            }\n        )()(__cond_7)))\n    };\n    __module__CapoHelpers__getTxCharterDatum = (mph_13, __useopt__refInputs, refInputs) -> {\n        refInputs_1 = __core__ifThenElse(\n            __useopt__refInputs,\n            () -> {\n                refInputs\n            },\n            () -> {\n                __helios__tx__ref_inputs(__helios__scriptcontext__tx)\n            }\n        )();\n        chVal_1 = __module__StellarHeliosHelpers__tvCharter(mph_13);\n        hasCharter_1 = (txin_1) -> {\n            __helios__value__contains(__helios__txinput__value(txin_1))(chVal_1)\n        };\n        (charterUtxo_1) -> {\n            ctd = __helios__common__assert_constr_index(__module__CapoHelpers__CapoDatum[]__CharterToken__from_data(__helios__txoutputdatum__inline(__helios__txinput__datum(charterUtxo_1))), 0);\n            ctd\n        }(__cond_8 = __helios__list[__helios__txinput]__find_safe(refInputs_1)(hasCharter_1);\n        __core__ifThenElse(\n            __helios__option[__helios__txinput]__some____is(__cond_8),\n            () -> {\n                (__lhs_0_18) -> {\n                    ch_2 = __helios__option[__helios__txinput]__some__some(__lhs_0_18);\n                    ch_2\n                }\n            },\n            () -> {\n                (__lhs_0_15) -> {\n                    __cond_9 = __helios__list[__helios__txinput]__find_safe(__helios__tx__inputs(__helios__scriptcontext__tx))(hasCharter_1);\n                    __core__ifThenElse(\n                        __helios__option[__helios__txinput]__some____is(__cond_9),\n                        () -> {\n                            (__lhs_0_17) -> {\n                                ch_1 = __helios__option[__helios__txinput]__some__some(__lhs_0_17);\n                                ch_1\n                            }\n                        },\n                        () -> {\n                            (__lhs_0_16) -> {\n                                __helios__error(\"Missing charter inputs / ref_inputs\")\n                            }\n                        }\n                    )()(__cond_9)\n                }\n            }\n        )()(__cond_8))\n    };\n    __helios__option[__helios__txinput]__is_valid_data = (data_84) -> {\n        __core__chooseData(data_84, () -> {\n            pair_24 = __core__unConstrData__safe(data_84);\n            index_6 = __core__fstPair(pair_24);\n            fields_48 = __core__sndPair(pair_24);\n            __core__ifThenElse(\n                __core__equalsInteger(index_6, 0),\n                () -> {\n                    __core__chooseList(fields_48, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_48), () -> {\n                            __helios__txinput__is_valid_data(__core__headList__safe(fields_48))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_6, 1),\n                        () -> {\n                            __core__chooseList(fields_48, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__DelegateInput[]__link = (self_102) -> {\n        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__struct_field_0(self_102))\n    };\n    __helios__option[__helios__txinput]__from_data = (data_85) -> {\n        __6 = __core__ifThenElse(\n            __helios__option[__helios__txinput]__is_valid_data(data_85),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(\"Warning: invalid option data\", ())\n            }\n        )();\n        data_85\n    };\n    __module__CapoHelpers__DelegateInput[]__input = (self_103) -> {\n        __helios__option[__helios__txinput]__from_data(__helios__common__struct_field_1(self_103))\n    };\n    __module__CapoHelpers__DelegateInput[]__mph = (self_104) -> {\n        __helios__mintingpolicyhash__from_data(__helios__common__struct_field_2(self_104))\n    };\n    __helios__option[__helios__txinput]____to_data = __helios__common__identity;\n    __module__CapoHelpers__DelegateInput[]____new = (link, input, mph_14) -> {\n        __core__mkCons(__module__CapoDelegateHelpers__RelativeDelegateLink[]____to_data(link), __core__mkCons(__helios__option[__helios__txinput]____to_data(input), __core__mkCons(__helios__mintingpolicyhash____to_data(mph_14), __core__mkNilData(()))))\n    };\n    __helios__list[__helios__data]__length = __helios__common__length;\n    __helios__option[__helios__txinput]__unwrap = (self_105) -> {\n        () -> {\n            __helios__txinput__from_data(__helios__common__enum_field_0(self_105))\n        }\n    };\n    __module__CapoHelpers__DelegateInput[]__genericDelegateActivityAsData = (self_106) -> {\n        () -> {\n            i_6 = __helios__option[__helios__txinput]__unwrap(__module__CapoHelpers__DelegateInput[]__input(self_106))();\n            inputData = __module__StellarHeliosHelpers__mustFindInputRedeemer(i_6);\n            __core__chooseUnit(__cond_10 = inputData;\n            __core__ifThenElse(\n                __helios__data__constrdata____is(__cond_10),\n                () -> {\n                    (__lhs_0_19) -> {\n                        index_7 = __helios__data__constrdata__tag(__lhs_0_19);\n                        fields_49 = __helios__data__constrdata__fields(__lhs_0_19);\n                        __core__chooseUnit(__helios__print(\"    --🐞 generic delegate activity at index \"), __core__chooseUnit(__helios__print(__helios__int__show(index_7)()), __core__chooseUnit(__helios__print(\"\n    ---- from input id:\"), __core__chooseUnit(__helios__print(__helios__txid__show(__helios__txoutputid__tx_id(__helios__txinput__output_id(i_6)))()), __core__chooseUnit(__helios__print(\"🔹#\"), __core__chooseUnit(__helios__print(__helios__int__show(__helios__txoutputid__index(__helios__txinput__output_id(i_6)))()), __core__chooseUnit(__helios__print(\" = \"), __core__chooseUnit(__helios__print(__helios__value__show(__helios__txinput__value(i_6))()), __core__chooseUnit(__helios__print(\"\n\"), __core__chooseUnit(__helios__assert(__helios__int____eq(index_7, index_7), \"no way\"), __helios__assert(__helios__int____gt(__helios__list[__helios__data]__length(fields_49), 0), \"no way\")))))))))))\n                    }\n                },\n                () -> {\n                    (__7) -> {\n                        ()\n                    }\n                }\n            )()(__cond_10), inputData)\n        }\n    };\n    __module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1 = (__module__CapoHelpers__DelegateInput[]__genericDelegateActivity) -> {\n        (self_107) -> {\n            () -> {\n                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)(__module__CapoHelpers__DelegateInput[]__genericDelegateActivityAsData(self_107)())\n            }\n        }\n    };\n    __module__CapoHelpers__DelegateInput[]__requiresValidOutput = (self_108) -> {\n        (__useopt__createdOrReturned_1, createdOrReturned_2) -> {\n            createdOrReturned_3 = __core__ifThenElse(\n                __useopt__createdOrReturned_1,\n                () -> {\n                    createdOrReturned_2\n                },\n                () -> {\n                    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new()\n                }\n            )();\n            __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(__module__CapoHelpers__DelegateInput[]__link(self_108))(__module__CapoHelpers__DelegateInput[]__mph(self_108), true, true, true, createdOrReturned_3)\n        }\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]____to_data = __helios__common__identity;\n    __module__CapoHelpers__cctx_CharterInputType[]__is_valid_data = (__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data, __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data) -> {\n        (data_86) -> {\n            __core__ifThenElse(\n                __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data(data_86),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data(data_86),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data(data_86),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__from_data = (__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_1) -> {\n        (data_87) -> {\n            ignore_5 = __core__ifThenElse(\n                __module__CapoHelpers__cctx_CharterInputType[]__is_valid_data(__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_1)(data_87),\n                () -> {\n                    ()\n                },\n                () -> {\n                    __core__trace(\"Warning: invalid cctx_CharterInputType data\", ())\n                }\n            )();\n            data_87\n        }\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_2 = (data_88) -> {\n        __core__chooseData(data_88, () -> {\n            pair_25 = __core__unConstrData__safe(data_88);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_25), 0),\n                () -> {\n                    data_89 = __core__listData(__core__sndPair(pair_25));\n                    __core__chooseData(data_89, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_50 = __core__unListData__safe(data_89);\n                        __core__chooseList(fields_50, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Unk____new = () -> {\n        __core__constrData(0, __core__mkNilData(()))\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Ref____is = (data_90) -> {\n        __helios__common__enum_tag_equals(data_90, 1)\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data_2 = (data_91) -> {\n        __core__chooseData(data_91, () -> {\n            pair_26 = __core__unConstrData__safe(data_91);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_26), 1),\n                () -> {\n                    data_92 = __core__listData(__core__sndPair(pair_26));\n                    __core__chooseData(data_92, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_51 = __core__unListData__safe(data_92);\n                        __core__chooseList(fields_51, () -> {\n                            false\n                        }, () -> {\n                            head_33 = __core__headList__safe(fields_51);\n                            __core__ifThenElse(\n                                __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data(head_33),\n                                () -> {\n                                    fields_52 = __core__tailList__safe(fields_51);\n                                    __core__chooseList(fields_52, () -> {\n                                        false\n                                    }, () -> {\n                                        head_34 = __core__headList__safe(fields_52);\n                                        __core__ifThenElse(\n                                            __helios__txinput__is_valid_data(head_34),\n                                            () -> {\n                                                fields_53 = __core__tailList__safe(fields_52);\n                                                __core__chooseList(fields_53, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Ref__datum = (self_109) -> {\n        __module__CapoHelpers__CapoDatum[]__CharterToken__from_data(__helios__common__enum_field_0(self_109))\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Ref____new = (datum, utxo) -> {\n        __core__constrData(1, __core__mkCons(__module__CapoHelpers__CapoDatum[]__CharterToken____to_data(datum), __core__mkCons(__helios__txinput____to_data(utxo), __core__mkNilData(()))))\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Input____is = (data_93) -> {\n        __helios__common__enum_tag_equals(data_93, 2)\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_2 = (data_94) -> {\n        __core__chooseData(data_94, () -> {\n            pair_27 = __core__unConstrData__safe(data_94);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_27), 2),\n                () -> {\n                    data_95 = __core__listData(__core__sndPair(pair_27));\n                    __core__chooseData(data_95, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_54 = __core__unListData__safe(data_95);\n                        __core__chooseList(fields_54, () -> {\n                            false\n                        }, () -> {\n                            head_35 = __core__headList__safe(fields_54);\n                            __core__ifThenElse(\n                                __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data(head_35),\n                                () -> {\n                                    fields_55 = __core__tailList__safe(fields_54);\n                                    __core__chooseList(fields_55, () -> {\n                                        false\n                                    }, () -> {\n                                        head_36 = __core__headList__safe(fields_55);\n                                        __core__ifThenElse(\n                                            __helios__txinput__is_valid_data(head_36),\n                                            () -> {\n                                                fields_56 = __core__tailList__safe(fields_55);\n                                                __core__chooseList(fields_56, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Input__datum = (self_110) -> {\n        __module__CapoHelpers__CapoDatum[]__CharterToken__from_data(__helios__common__enum_field_0(self_110))\n    };\n    __module__CapoHelpers__CapoCtx[]__mph = (self_111) -> {\n        __helios__mintingpolicyhash__from_data(__helios__common__struct_field_0(self_111))\n    };\n    __module__CapoHelpers__CapoCtx[]__charter = (self_112) -> {\n        __module__CapoHelpers__cctx_CharterInputType[]__from_data(__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_2, __module__CapoHelpers__cctx_CharterInputType[]__Ref__is_valid_data_2, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_2)(__helios__common__struct_field_1(self_112))\n    };\n    __module__CapoHelpers__CapoCtx[]____new = (mph_15, charter) -> {\n        __core__mkCons(__helios__mintingpolicyhash____to_data(mph_15), __core__mkCons(__module__CapoHelpers__cctx_CharterInputType[]____to_data(charter), __core__mkNilData(())))\n    };\n    __module__CapoHelpers__CapoCtx[]__requiresMintDelegateInput = (__module__CapoHelpers__CapoCtx[]__resolveCharterDatum, __module__CapoHelpers__CapoCtx[]__requiresDelegateInput) -> {\n        (self_113) -> {\n            (__useopt__required_2, required_4) -> {\n                required_5 = __core__ifThenElse(\n                    __useopt__required_2,\n                    () -> {\n                        required_4\n                    },\n                    () -> {\n                        true\n                    }\n                )();\n                dgtLink = __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink(__module__CapoHelpers__CapoCtx[]__resolveCharterDatum(self_113)());\n                __module__CapoHelpers__CapoCtx[]__requiresDelegateInput(self_113)(dgtLink, true, required_5)\n            }\n        }\n    };\n    __module__CapoHelpers__CapoCtx[]__resolveCharterDatum_1 = (self_114) -> {\n        () -> {\n            __cond_11 = __module__CapoHelpers__CapoCtx[]__charter(self_114);\n            __core__ifThenElse(\n                __module__CapoHelpers__cctx_CharterInputType[]__Ref____is(__cond_11),\n                () -> {\n                    (__lhs_0_21) -> {\n                        datum_2 = __module__CapoHelpers__cctx_CharterInputType[]__Ref__datum(__lhs_0_21);\n                        datum_2\n                    }\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoHelpers__cctx_CharterInputType[]__Input____is(__cond_11),\n                        () -> {\n                            (__lhs_0_20) -> {\n                                datum_1 = __module__CapoHelpers__cctx_CharterInputType[]__Input__datum(__lhs_0_20);\n                                datum_1\n                            }\n                        },\n                        () -> {\n                            (__8) -> {\n                                __helios__error(\"CapoCtx.resolveCharterDatum(): unknown charter strategy; use result of withCharterInput(), withCharterRef(), or needsCharter() to resolve charter datum first\")\n                            }\n                        }\n                    )()\n                }\n            )()(__cond_11)\n        }\n    };\n    __module__CapoHelpers__CapoCtx[]__requiresDelegateInput_1 = (self_115) -> {\n        (dgtLink_1, __useopt__required_3, required_6) -> {\n            required_7 = __core__ifThenElse(\n                __useopt__required_3,\n                () -> {\n                    required_6\n                },\n                () -> {\n                    true\n                }\n            )();\n            __module__CapoHelpers__DelegateInput[]____new(dgtLink_1, __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput(dgtLink_1)(__helios__tx__inputs(__helios__scriptcontext__tx), __module__CapoHelpers__CapoCtx[]__mph(self_115), true, required_7), __module__CapoHelpers__CapoCtx[]__mph(self_115))\n        }\n    };\n    __module__CapoHelpers__CapoCtx[]__withCharterRef = (self_116) -> {\n        () -> {\n            charter_1 = __module__CapoHelpers__CapoCtx[]__charter(self_116);\n            __cond_12 = charter_1;\n            __core__ifThenElse(\n                __module__CapoHelpers__cctx_CharterInputType[]__Ref____is(__cond_12),\n                () -> {\n                    (__lhs_0_25) -> {\n                        self_116\n                    }\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoHelpers__cctx_CharterInputType[]__Input____is(__cond_12),\n                        () -> {\n                            (__lhs_0_24) -> {\n                                __helios__error(\"CapoCtx.withCharterRef(): charter is from inputs!\")\n                            }\n                        },\n                        () -> {\n                            (__lhs_0_22) -> {\n                                __lhs_0_23 = self_116;\n                                mph_16 = __module__CapoHelpers__CapoCtx[]__mph(__lhs_0_23);\n                                utxo_1 = __module__CapoHelpers__getRefCharterUtxo(mph_16);\n                                datum_3 = __helios__common__assert_constr_index(__module__CapoHelpers__CapoDatum[]__CharterToken__from_data(__helios__txoutputdatum__inline(__helios__txinput__datum(utxo_1))), 0);\n                                __module__CapoHelpers__CapoCtx[]____new(mph_16, __module__CapoHelpers__cctx_CharterInputType[]__Ref____new(datum_3, utxo_1))\n                            }\n                        }\n                    )()\n                }\n            )()(__cond_12)\n        }\n    };\n    __module__CapoHelpers__mkCapoCtx = (mph_17) -> {\n        __module__CapoHelpers__CapoCtx[]____new(mph_17, __module__CapoHelpers__cctx_CharterInputType[]__Unk____new())\n    };\n    __module__CapoMintHelpers__hasSeedUtxo = (tx, seedUtxo) -> {\n        __core__chooseUnit(__core__ifThenElse(\n            __helios__bool____not(__helios__list[__helios__txinput]__any(__helios__tx__inputs(tx))((input_1) -> {\n                __helios__txoutputid____eq(__helios__txinput__output_id(input_1), seedUtxo)\n            })),\n            () -> {\n                __core__chooseUnit(__helios__print(\" - expected seedUtxo: \"), __core__chooseUnit(__helios__print(__helios__txoutputid__show(seedUtxo)()), __core__chooseUnit(__helios__print(\"\n\"), __helios__assert(false, \"missing expected seed input for minting\"))))\n            },\n            () -> {\n                () -> {\n                    ()\n                }()\n            }\n        )(), __core__chooseUnit(__helios__print(\"  -- has seed -> ok\n\"), true))\n    };\n    __helios__option[__helios__data]__none____is = (data_96) -> {\n        __helios__common__enum_tag_equals(data_96, 1)\n    };\n    __helios__list[__helios__data]____eq = (self_117, other_2) -> {\n        __core__equalsData(__helios__list[__helios__data]____to_data(self_117), __helios__list[__helios__data]____to_data(other_2))\n    };\n    __helios__option[__helios__data]__some__some = (self_118) -> {\n        __helios__data__from_data(__helios__common__enum_field_0(self_118))\n    };\n    __helios__map[__helios__scriptpurpose@__helios__data]__get_safe = (self_119) -> {\n        (key_11) -> {\n            __helios__common__map_get(self_119, __helios__scriptpurpose____to_data(key_11), (x_3) -> {\n                __core__constrData(0, __helios__common__list_1(x_3))\n            }, () -> {\n                __core__constrData(1, __helios__common__list_0)\n            })\n        }\n    };\n    __module__CapoMintHelpers__requiresDelegateAuthorizingMint = (delegateLink, mph_18, __useopt__extraMintDelegateRedeemerCheck, extraMintDelegateRedeemerCheck) -> {\n        extraMintDelegateRedeemerCheck_1 = __core__ifThenElse(\n            __useopt__extraMintDelegateRedeemerCheck,\n            () -> {\n                extraMintDelegateRedeemerCheck\n            },\n            () -> {\n                true\n            }\n        )();\n        authzVal = __helios__value__new(__helios__assetclass__new(mph_18, __helios__string__encode_utf8(__module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink))()), 1);\n        __core__chooseUnit(__helios__print(\"finding input dgTkn: \"), __core__chooseUnit(__helios__print(__module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink)), __core__chooseUnit(__helios__print(\"\n\"), (targetId_1) -> {\n            __core__chooseUnit(__helios__print(\"    -- found dgTkn^\"), spendsAuthorityUut = __helios__map[__helios__scriptpurpose@__helios__data]__find_key(__helios__tx__redeemers(__helios__scriptcontext__tx))((purpose_1) -> {\n                __cond_14 = purpose_1;\n                __core__ifThenElse(\n                    __helios__scriptpurpose__spending____is(__cond_14),\n                    () -> {\n                        (sp_1) -> {\n                            __helios__txoutputid____eq(__helios__scriptpurpose__spending__output_id(sp_1), targetId_1)\n                        }\n                    },\n                    () -> {\n                        (__9) -> {\n                            false\n                        }\n                    }\n                )()(__cond_14)\n            });\n            err = __helios__string____add(__helios__string____add(\"dgTkn \", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink)), \" not being spent as expected\");\n            (maybeCheckedMintDelegateAuthority) -> {\n                delegateDidAuthorize = true;\n                __helios__bool__and(() -> {\n                    delegateDidAuthorize\n                }, () -> {\n                    maybeCheckedMintDelegateAuthority\n                })\n            }(__cond_15 = __helios__map[__helios__scriptpurpose@__helios__data]__get_safe(__helios__tx__redeemers(__helios__scriptcontext__tx))(spendsAuthorityUut);\n            __core__ifThenElse(\n                __helios__option[__helios__data]__none____is(__cond_15),\n                () -> {\n                    (__lhs_0_33) -> {\n                        __helios__error(err)\n                    }\n                },\n                () -> {\n                    (__lhs_0_28) -> {\n                        x_5 = __helios__option[__helios__data]__some__some(__lhs_0_28);\n                        __cond_16 = x_5;\n                        __core__ifThenElse(\n                            __helios__data__constrdata____is(__cond_16),\n                            () -> {\n                                (__lhs_0_29) -> {\n                                    index_8 = __helios__data__constrdata__tag(__lhs_0_29);\n                                    fields_57 = __helios__data__constrdata__fields(__lhs_0_29);\n                                    __helios__bool__and(() -> {\n                                        __helios__list[__helios__data]____eq(fields_57, fields_57)\n                                    }, () -> {\n                                        __core__ifThenElse(\n                                            __helios__bool____not(extraMintDelegateRedeemerCheck_1),\n                                            () -> {\n                                                __core__chooseUnit(__helios__print(\"  -- ok, dgTkn spent\n\"), __core__chooseUnit(__helios__print(\"  ---- skip redeemer check\n\"), true))\n                                            },\n                                            () -> {\n                                                () -> {\n                                                    __core__ifThenElse(\n                                                        __helios__int____eq(0, index_8),\n                                                        () -> {\n                                                            dgtActivity = __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__from_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2)(__helios__list[__helios__data]__head(fields_57));\n                                                            __cond_17 = dgtActivity;\n                                                            __core__ifThenElse(\n                                                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is(__cond_17),\n                                                                () -> {\n                                                                    (__lhs_0_32) -> {\n                                                                        __core__chooseUnit(__helios__print(\"  -- ok, dgTkn spent\n\"), true)\n                                                                    }\n                                                                },\n                                                                () -> {\n                                                                    __core__ifThenElse(\n                                                                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring____is(__cond_17),\n                                                                        () -> {\n                                                                            (__lhs_0_31) -> {\n                                                                                __helios__error(\"DLA::Retiring can't mint!\")\n                                                                            }\n                                                                        },\n                                                                        () -> {\n                                                                            (__lhs_0_30) -> {\n                                                                                __helios__error(\"DLA::ValidatingSettings can't mint!\")\n                                                                            }\n                                                                        }\n                                                                    )()\n                                                                }\n                                                            )()(__cond_17)\n                                                        },\n                                                        () -> {\n                                                            () -> {\n                                                                true\n                                                            }()\n                                                        }\n                                                    )()\n                                                }()\n                                            }\n                                        )()\n                                    })\n                                }\n                            },\n                            () -> {\n                                (__10) -> {\n                                    __helios__error(err)\n                                }\n                            }\n                        )()(__cond_16)\n                    }\n                }\n            )()(__cond_15)))\n        }(__cond_13 = __helios__list[__helios__txinput]__find_safe(__helios__tx__inputs(__helios__scriptcontext__tx))((i_7) -> {\n            __helios__value__contains(__helios__txinput__value(i_7))(authzVal)\n        });\n        __core__ifThenElse(\n            __helios__option[__helios__txinput]__some____is(__cond_13),\n            () -> {\n                (__lhs_0_27) -> {\n                    x_4 = __helios__option[__helios__txinput]__some__some(__lhs_0_27);\n                    __helios__txinput__output_id(x_4)\n                }\n            },\n            () -> {\n                (__lhs_0_26) -> {\n                    __helios__error(__helios__string____add(\"missing dgTkn \", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink)))\n                }\n            }\n        )()(__cond_13)))))\n    };\n    __helios__list[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]]__all = (self_120) -> {\n        (fn_21) -> {\n            __helios__common__all(self_120, (item_7) -> {\n                fn_21(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)(item_7))\n            })\n        }\n    };\n    __helios__list[__helios__data]__map[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]] = (self_121) -> {\n        (fn_22) -> {\n            __helios__common__map(self_121, (item_8) -> {\n                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]____to_data(fn_22(__helios__data__from_data(item_8)))\n            }, __core__mkNilData(()))\n        }\n    };\n    __module__CapoMintHelpers__requiresMintDelegateApproval = (mph_19) -> {\n        cctx = __module__CapoHelpers__CapoCtx[]__withCharterRef(__module__CapoHelpers__mkCapoCtx(mph_19))();\n        __core__chooseUnit(__helios__print(\"Minter needs mintDgt + mint activity\n\"), __core__chooseUnit(__module__StellarHeliosHelpers__REQT(\"EXPECTS the application-specific mintDelegate to explicitly check and approve the full minted value\"), __core__chooseUnit(__helios__print(\"    -- ^ e.g. assert(tx.minted.get_policy(mph) == expectedMintedValue);\n\"), __core__chooseUnit(__helios__print(\"    ---- (if it's only responsible for one minting policy)\n\"), __core__chooseUnit(__module__StellarHeliosHelpers__TODO(\"must enforce minting invariants\"), mintDgtInput = __module__CapoHelpers__CapoCtx[]__requiresMintDelegateInput(__module__CapoHelpers__CapoCtx[]__resolveCharterDatum_1, __module__CapoHelpers__CapoCtx[]__requiresDelegateInput_1)(cctx)(false, ());\n        mintDgtActivity = __module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1(__module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1)(mintDgtInput)();\n        __cond_18 = mintDgtActivity;\n        __core__ifThenElse(\n            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is(__cond_18),\n            () -> {\n                (__lhs_0_54) -> {\n                    CLA = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__activity(__lhs_0_54);\n                    __cond_21 = CLA;\n                    __lhs_0_55 = __cond_21;\n                    __core__chooseUnit(__helios__print(\"  -- minter wants mintDgt + CapoLifecycle (delegate-creation)\n\"), __helios__bool__and(() -> {\n                        __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                    }, () -> {\n                        true\n                    }))\n                }\n            },\n            () -> {\n                __core__ifThenElse(\n                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities____is(__cond_18),\n                    () -> {\n                        (__lhs_0_53) -> {\n                            __helios__error(\"DelegateInput::SpendingActivity can't mint!\")\n                        }\n                    },\n                    () -> {\n                        __core__ifThenElse(\n                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities____is(__cond_18),\n                            () -> {\n                                (__lhs_0_49) -> {\n                                    DLA = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__activity(__lhs_0_49);\n                                    __cond_20 = DLA;\n                                    __core__ifThenElse(\n                                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is(__cond_20),\n                                        () -> {\n                                            (__lhs_0_52) -> {\n                                                __core__chooseUnit(__module__StellarHeliosHelpers__TODO(\"relay delegate installation sequence\"), __core__chooseUnit(__helios__print(\"  -- TEMPORARY: the mint delegate is being replaced\n\"), true))\n                                            }\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring____is(__cond_20),\n                                                () -> {\n                                                    (__lhs_0_51) -> {\n                                                        __helios__error(\"DLA::Retiring can't mint!\")\n                                                    }\n                                                },\n                                                () -> {\n                                                    (__lhs_0_50) -> {\n                                                        __helios__error(\"DLA::ValidatingSettings can't mint!\")\n                                                    }\n                                                }\n                                            )()\n                                        }\n                                    )()(__cond_20)\n                                }\n                            },\n                            () -> {\n                                __core__ifThenElse(\n                                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities____is(__cond_18),\n                                    () -> {\n                                        (__lhs_0_48) -> {\n                                            __core__chooseUnit(__helios__print(\"  -- app-specific minting; trust mintDgt\n\"), __helios__bool__and(() -> {\n                                                __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                            }, () -> {\n                                                true\n                                            }))\n                                        }\n                                    },\n                                    () -> {\n                                        __core__ifThenElse(\n                                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities____is(__cond_18),\n                                            () -> {\n                                                (__lhs_0_47) -> {\n                                                    __core__chooseUnit(__helios__print(\"  -- app-specific burning; trust mintDgt\"), __helios__bool__and(() -> {\n                                                        __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                                    }, () -> {\n                                                        true\n                                                    }))\n                                                }\n                                            },\n                                            () -> {\n                                                __core__ifThenElse(\n                                                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData____is(__cond_18),\n                                                    () -> {\n                                                        (__lhs_0_46) -> {\n                                                            __core__chooseUnit(__helios__print(\"  -- mint for dgData; trust mintDgt\"), __helios__bool__and(() -> {\n                                                                __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                                            }, () -> {\n                                                                true\n                                                            }))\n                                                        }\n                                                    },\n                                                    () -> {\n                                                        __core__ifThenElse(\n                                                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData____is(__cond_18),\n                                                            () -> {\n                                                                (__lhs_0_45) -> {\n                                                                    __core__chooseUnit(__helios__print(\"  -- burn for dgData; trust mintDgt\"), __helios__bool__and(() -> {\n                                                                        __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                                                    }, () -> {\n                                                                        true\n                                                                    }))\n                                                                }\n                                                            },\n                                                            () -> {\n                                                                __core__ifThenElse(\n                                                                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData____is(__cond_18),\n                                                                    () -> {\n                                                                        (__lhs_0_44) -> {\n                                                                            __helios__error(\"invalid mint-delegate activity for minting; UpdatingDelegatedDatum can't mint\")\n                                                                        }\n                                                                    },\n                                                                    () -> {\n                                                                        (__lhs_0_34) -> {\n                                                                            ma = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__activities(__lhs_0_34);\n                                                                            __helios__bool__and(() -> {\n                                                                                __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                                                            }, () -> {\n                                                                                __helios__list[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]]__all(__helios__list[__helios__data]__map[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]](ma)(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)))((mintDgtActivity_1) -> {\n                                                                                    __cond_19 = mintDgtActivity_1;\n                                                                                    __core__ifThenElse(\n                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData____is(__cond_19),\n                                                                                        () -> {\n                                                                                            (__lhs_0_43) -> {\n                                                                                                true\n                                                                                            }\n                                                                                        },\n                                                                                        () -> {\n                                                                                            __core__ifThenElse(\n                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData____is(__cond_19),\n                                                                                                () -> {\n                                                                                                    (__lhs_0_42) -> {\n                                                                                                        true\n                                                                                                    }\n                                                                                                },\n                                                                                                () -> {\n                                                                                                    __core__ifThenElse(\n                                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities____is(__cond_19),\n                                                                                                        () -> {\n                                                                                                            (__lhs_0_41) -> {\n                                                                                                                __helios__error(\"mintDgt: MultipleDelegateActivities: nested MintingActivities invalid\")\n                                                                                                            }\n                                                                                                        },\n                                                                                                        () -> {\n                                                                                                            __core__ifThenElse(\n                                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities____is(__cond_19),\n                                                                                                                () -> {\n                                                                                                                    (__lhs_0_40) -> {\n                                                                                                                        __helios__error(\"mintDgt: MultipleDelegateActivities: nested BurningActivities invalid\")\n                                                                                                                    }\n                                                                                                                },\n                                                                                                                () -> {\n                                                                                                                    __core__ifThenElse(\n                                                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities____is(__cond_19),\n                                                                                                                        () -> {\n                                                                                                                            (__lhs_0_39) -> {\n                                                                                                                                __helios__error(\"mintDgt: MultipleDelegateActivities: nested MultipleDelegateActivities invalid\")\n                                                                                                                            }\n                                                                                                                        },\n                                                                                                                        () -> {\n                                                                                                                            __core__ifThenElse(\n                                                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData____is(__cond_19),\n                                                                                                                                () -> {\n                                                                                                                                    (__lhs_0_38) -> {\n                                                                                                                                        __helios__error(\"mintDgt: MultipleDelegateActivities: nested UpdatingDelegatedData invalid\")\n                                                                                                                                    }\n                                                                                                                                },\n                                                                                                                                () -> {\n                                                                                                                                    __core__ifThenElse(\n                                                                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities____is(__cond_19),\n                                                                                                                                        () -> {\n                                                                                                                                            (__lhs_0_37) -> {\n                                                                                                                                                __helios__error(\"mintDgt: MultipleDelegateActivities: nested SpendingActivities invalid\")\n                                                                                                                                            }\n                                                                                                                                        },\n                                                                                                                                        () -> {\n                                                                                                                                            __core__ifThenElse(\n                                                                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is(__cond_19),\n                                                                                                                                                () -> {\n                                                                                                                                                    (__lhs_0_36) -> {\n                                                                                                                                                        __helios__error(\"mintDgt: MultipleDelegateActivities: nested CapoLifecycleActivities invalid\")\n                                                                                                                                                    }\n                                                                                                                                                },\n                                                                                                                                                () -> {\n                                                                                                                                                    (__lhs_0_35) -> {\n                                                                                                                                                        __helios__error(\"mintDgt: MultipleDelegateActivities: nested DelegateLifecycleActivities invalid\")\n                                                                                                                                                    }\n                                                                                                                                                }\n                                                                                                                                            )()\n                                                                                                                                        }\n                                                                                                                                    )()\n                                                                                                                                }\n                                                                                                                            )()\n                                                                                                                        }\n                                                                                                                    )()\n                                                                                                                }\n                                                                                                            )()\n                                                                                                        }\n                                                                                                    )()\n                                                                                                }\n                                                                                            )()\n                                                                                        }\n                                                                                    )()(__cond_19)\n                                                                                })\n                                                                            })\n                                                                        }\n                                                                    }\n                                                                )()\n                                                            }\n                                                        )()\n                                                    }\n                                                )()\n                                            }\n                                        )()\n                                    }\n                                )()\n                            }\n                        )()\n                    }\n                )()\n            }\n        )()(__cond_18))))))\n    };\n    __module__CapoMintHelpers__mkUutTnFactory = (seed) -> {\n        seedTxId = __helios__txoutputid__tx_id(seed);\n        seedIdx = __helios__txoutputid__index(seed);\n        idxBytes = __helios__int__serialize(seedIdx)();\n        rawTxId = __helios__bytearray__slice(__helios__txid__serialize(seedTxId)())(5, 37);\n        txoInfo = __core__ifThenElse(\n            __helios__int____gt(__helios__bytearray__length(idxBytes), 9),\n            () -> {\n                __core__chooseUnit(__helios__assert(false, \"cbor(txoId) len > 9 !!\"), idxBytes)\n            },\n            () -> {\n                () -> {\n                    __helios__bytearray____add(__helios__bytearray____add(rawTxId, __helios__string__encode_utf8(\"@\")()), idxBytes)\n                }()\n            }\n        )();\n        miniHash = __helios__bytearray__slice(__helios__bytearray__blake2b(txoInfo)())(0, 6);\n        mhs = __helios__bytearray__show(miniHash)();\n        (p) -> {\n            __helios__string____add(__helios__string____add(p, \"-\"), mhs)\n        }\n    };\n    __helios__map[__helios__bytearray@__helios__int]__for_each = (self_122) -> {\n        (fn_23) -> {\n            recurse_67 = (recurse_66, map_17) -> {\n                __core__chooseList(map_17, () -> {\n                    ()\n                }, () -> {\n                    head_37 = __core__headList__safe(map_17);\n                    __core__chooseUnit(fn_23(__helios__bytearray__from_data(__core__fstPair(head_37)), __helios__int__from_data(__core__sndPair(head_37))), recurse_66(recurse_66, __core__tailList__safe(map_17)))\n                })()\n            };\n            recurse_67(recurse_67, self_122)\n        }\n    };\n    __helios__list[__helios__bytearray]____to_data = __core__listData;\n    __helios__list[__helios__bytearray]____eq = (self_123, other_3) -> {\n        __core__equalsData(__helios__list[__helios__bytearray]____to_data(self_123), __helios__list[__helios__bytearray]____to_data(other_3))\n    };\n    __helios__map[__helios__bytearray@__helios__int]__fold[__helios__list[__helios__bytearray]] = (self_124) -> {\n        (fn_24, z_2) -> {\n            __helios__common__fold(self_124, (z_3, pair_28) -> {\n                fn_24(z_3, __helios__bytearray__from_data(__core__fstPair(pair_28)), __helios__int__from_data(__core__sndPair(pair_28)))\n            }, z_2)\n        }\n    };\n    __helios__option[__helios__bytearray]__none____is = (data_97) -> {\n        __helios__common__enum_tag_equals(data_97, 1)\n    };\n    __helios__list[__helios__bytearray]__prepend = (self_125) -> {\n        (item_9) -> {\n            __core__mkCons(__helios__bytearray____to_data(item_9), self_125)\n        }\n    };\n    __helios__list[__helios__bytearray]__find_safe = (self_126) -> {\n        (fn_25) -> {\n            __helios__common__find_safe(self_126, (item_10) -> {\n                fn_25(__helios__bytearray__from_data(item_10))\n            }, __helios__common__identity)\n        }\n    };\n    __helios__value__sum[__helios__value] = (self_127) -> {\n        recurse_69 = (recurse_68, lst_16) -> {\n            __core__chooseList(lst_16, () -> {\n                __helios__value__ZERO\n            }, () -> {\n                __helios__value____add(__helios__value__value(__helios__value__from_data(__core__headList__safe(lst_16))), recurse_68(recurse_68, __core__tailList__safe(lst_16)))\n            })()\n        };\n        recurse_69(recurse_69, self_127)\n    };\n    __helios__list[__helios__string]__map[__helios__value] = (self_128) -> {\n        (fn_26) -> {\n            __helios__common__map(self_128, (item_11) -> {\n                __helios__value____to_data(fn_26(__helios__string__from_data(item_11)))\n            }, __core__mkNilData(()))\n        }\n    };\n    __helios__list[__helios__string]__sort = (self_129) -> {\n        (comp_4) -> {\n            __helios__common__sort(self_129, (a_14, b_14) -> {\n                comp_4(__helios__string__from_data(a_14), __helios__string__from_data(b_14))\n            })\n        }\n    };\n    __module__CapoMintHelpers__validateUutMinting = (mph_20, seed_1, purposes, __useopt__mkTokenName, mkTokenName, __useopt__bootstrapCharter, bootstrapCharter, __useopt__otherMintedValue, otherMintedValue, __useopt__needsMintDelegateApproval, needsMintDelegateApproval, __useopt__extraMintDelegateRedeemerCheck_1, extraMintDelegateRedeemerCheck_2) -> {\n        mkTokenName_1 = __core__ifThenElse(\n            __useopt__mkTokenName,\n            () -> {\n                mkTokenName\n            },\n            () -> {\n                __module__CapoMintHelpers__mkUutTnFactory(seed_1)\n            }\n        )();\n        bootstrapCharter_1 = __core__ifThenElse(\n            __useopt__bootstrapCharter,\n            () -> {\n                bootstrapCharter\n            },\n            () -> {\n                __helios__value__ZERO\n            }\n        )();\n        otherMintedValue_1 = __core__ifThenElse(\n            __useopt__otherMintedValue,\n            () -> {\n                otherMintedValue\n            },\n            () -> {\n                __helios__value__ZERO\n            }\n        )();\n        needsMintDelegateApproval_1 = __core__ifThenElse(\n            __useopt__needsMintDelegateApproval,\n            () -> {\n                needsMintDelegateApproval\n            },\n            () -> {\n                true\n            }\n        )();\n        extraMintDelegateRedeemerCheck_3 = __core__ifThenElse(\n            __useopt__extraMintDelegateRedeemerCheck_1,\n            () -> {\n                extraMintDelegateRedeemerCheck_2\n            },\n            () -> {\n                true\n            }\n        )();\n        isBootstrapping = __helios__bool____not(__helios__value__is_zero(bootstrapCharter_1)());\n        delegateApproval = __core__ifThenElse(\n            isBootstrapping,\n            () -> {\n                true\n            },\n            () -> {\n                () -> {\n                    __lhs_0_56 = __helios__common__assert_constr_index(__module__CapoHelpers__getTxCharterDatum(mph_20, false, ()), 0);\n                    mintDgt = __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink(__lhs_0_56);\n                    __core__ifThenElse(\n                        needsMintDelegateApproval_1,\n                        () -> {\n                            __module__CapoMintHelpers__requiresDelegateAuthorizingMint(mintDgt, mph_20, true, extraMintDelegateRedeemerCheck_3)\n                        },\n                        () -> {\n                            () -> {\n                                true\n                            }()\n                        }\n                    )()\n                }()\n            }\n        )();\n        valueMinted = __helios__tx__minted(__helios__scriptcontext__tx);\n        expectedValue = __helios__value____add(__helios__value____add(bootstrapCharter_1, otherMintedValue_1), __helios__value__sum[__helios__value](__helios__list[__helios__string]__map[__helios__value](__helios__list[__helios__string]__sort(purposes)((a_15, b_15) -> {\n            __helios__string____neq(a_15, b_15)\n        }))((purpose_2) -> {\n            __module__StellarHeliosHelpers__mkTv(mph_20, true, mkTokenName_1(purpose_2), false, (), false, ())\n        })));\n        __core__chooseUnit(__core__ifThenElse(\n            __helios__bool____not(__helios__value__contains_policy(valueMinted)(mph_20)),\n            () -> {\n                __core__chooseUnit(__helios__print(\"  -- no mint from our policy at (mph, valueMinted): ( \"), __core__chooseUnit(__helios__print(__helios__mintingpolicyhash__show(mph_20)()), __core__chooseUnit(__helios__print(__helios__value__show(valueMinted)()), __core__chooseUnit(__helios__print(\")\n\"), __helios__error(\"validateUutMinting(): no mint\")))))\n            },\n            () -> {\n                () -> {\n                    __helios__assert(true, \"no\")\n                }()\n            }\n        )(), __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add(\"\n  -- uut-minting seed: \", __helios__txid__show(__helios__txoutputid__tx_id(seed_1))()), \"🔹#\"), __helios__int__show(__helios__txoutputid__index(seed_1))()), \"\n\")), __core__chooseUnit(__helios__map[__helios__bytearray@__helios__int]__for_each(__helios__value__get_policy(expectedValue)(mph_20))((b_19, i_10) -> {\n            __helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add(\"    ℹ️ 🐞 expected: \", __helios__int__show(i_10)()), \"x \"), __helios__bytearray__decode_utf8(b_19)()), \"\n\"))\n        }), actualMint = __helios__value__get_policy(valueMinted)(mph_20);\n        __core__chooseUnit(__core__ifThenElse(\n            true,\n            () -> {\n                __core__chooseUnit(__helios__map[__helios__bytearray@__helios__int]__for_each(actualMint)((b_18, i_9) -> {\n                    __helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add(\"    ℹ️ 🐞   actual: \", __helios__int__show(i_9)()), \"x \"), __helios__bytearray__decode_utf8(b_18)()), \"\n\"))\n                }), __core__chooseUnit(__helios__print(__helios__value__show(__helios__value__from_map(__helios__map[__helios__mintingpolicyhash@__helios__map[__helios__bytearray@__helios__int]]__filter(__helios__value__to_map(valueMinted)())((b_17, __11) -> {\n                    __helios__mintingpolicyhash____neq(b_17, mph_20)\n                })))()), __helios__print(\"^ other policy values minted \n\")))\n            },\n            () -> {\n                () -> {\n                    __helios__assert(true, \"never\")\n                }()\n            }\n        )(), temp = __helios__map[__helios__bytearray@__helios__int]__fold[__helios__list[__helios__bytearray]](actualMint)((l, b_16, i_8) -> {\n            __cond_22 = __helios__list[__helios__bytearray]__find_safe(l)((x_6) -> {\n                __helios__bytearray____eq(x_6, b_16)\n            });\n            __core__ifThenElse(\n                __helios__option[__helios__bytearray]__none____is(__cond_22),\n                () -> {\n                    (__lhs_0_58) -> {\n                        __helios__list[__helios__bytearray]__prepend(l)(b_16)\n                    }\n                },\n                () -> {\n                    (__lhs_0_57) -> {\n                        __helios__error(\"UUT duplicate purpose \")\n                    }\n                }\n            )()(__cond_22)\n        }, __core__mkNilData(()));\n        __core__chooseUnit(__helios__assert(__helios__bool__or(() -> {\n            true\n        }, () -> {\n            __helios__list[__helios__bytearray]____eq(temp, temp)\n        }), \"prevent unused var\"), expectationsMet = __helios__value____eq(valueMinted, expectedValue);\n        __core__chooseUnit(__helios__assert(expectationsMet, \"mismatch in UUT mint\"), __core__chooseUnit(__helios__assert(__module__CapoMintHelpers__hasSeedUtxo(__helios__scriptcontext__tx, seed_1), \"no seed\"), __core__chooseUnit(__helios__print(\" ✅ validateUutMinting:  ok!\n\"), __helios__bool__and(() -> {\n            delegateApproval\n        }, () -> {\n            expectationsMet\n        })))))))))\n    };\n    __helios__list[__helios__txinput]__find = (self_130) -> {\n        (fn_27) -> {\n            recurse_71 = (recurse_70, lst_17) -> {\n                __core__chooseList(lst_17, () -> {\n                    __helios__error(\"not found\")\n                }, () -> {\n                    item_12 = __helios__txinput__from_data(__core__headList__safe(lst_17));\n                    __core__ifThenElse(\n                        fn_27(item_12),\n                        () -> {\n                            item_12\n                        },\n                        () -> {\n                            recurse_70(recurse_70, __core__tailList__safe(lst_17))\n                        }\n                    )()\n                })()\n            };\n            recurse_71(recurse_71, self_130)\n        }\n    };\n    __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex = (mph_21, purpose_3, seed_2, charterRedeemerIndex, __useopt__otherMintedValue_1, otherMintedValue_2, __useopt__needsMintDelegateApproval_1, needsMintDelegateApproval_2, __useopt__extraMintDelegateRedeemerCheck_2, extraMintDelegateRedeemerCheck_4) -> {\n        otherMintedValue_3 = __core__ifThenElse(\n            __useopt__otherMintedValue_1,\n            () -> {\n                otherMintedValue_2\n            },\n            () -> {\n                __helios__value__new(__helios__assetclass__ADA, 0)\n            }\n        )();\n        needsMintDelegateApproval_3 = __core__ifThenElse(\n            __useopt__needsMintDelegateApproval_1,\n            () -> {\n                needsMintDelegateApproval_2\n            },\n            () -> {\n                true\n            }\n        )();\n        extraMintDelegateRedeemerCheck_5 = __core__ifThenElse(\n            __useopt__extraMintDelegateRedeemerCheck_2,\n            () -> {\n                extraMintDelegateRedeemerCheck_4\n            },\n            () -> {\n                true\n            }\n        )();\n        chVal_2 = __module__StellarHeliosHelpers__tvCharter(mph_21);\n        __core__chooseUnit(__module__StellarHeliosHelpers__REQT(\"ensures granted authority, implied by requiring the charter to be spent with the indicated minting activity\"), hasCharter_2 = (txin_2) -> {\n            __helios__value__contains(__helios__txinput__value(txin_2))(chVal_2)\n        };\n        __core__chooseUnit(__helios__print(\"  --- finding required charter input\n\"), charterInput = __helios__list[__helios__txinput]__find(__helios__tx__inputs(__helios__scriptcontext__tx))(hasCharter_2);\n        __core__chooseUnit(__helios__print(\"  <-- found charter input\n\"), charterRedeemer = __module__StellarHeliosHelpers__mustFindInputRedeemer(charterInput);\n        __helios__bool__and(() -> {\n            __helios__bool__and(() -> {\n                __cond_23 = charterRedeemer;\n                __core__ifThenElse(\n                    __helios__data__constrdata____is(__cond_23),\n                    () -> {\n                        (__lhs_0_59) -> {\n                            index_9 = __helios__data__constrdata__tag(__lhs_0_59);\n                            __core__ifThenElse(\n                                __helios__int____eq(index_9, charterRedeemerIndex),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    () -> {\n                                        __helios__error(__helios__string____add(__helios__string____add(__helios__string____add(\"wrong charter Activity for adding spend invariant; expected redeemer #\", __helios__int__show(charterRedeemerIndex)()), \", got \"), __helios__int__show(index_9)()))\n                                    }()\n                                }\n                            )()\n                        }\n                    },\n                    () -> {\n                        (__12) -> {\n                            __helios__error(\"incontheeivable!\")\n                        }\n                    }\n                )()(__cond_23)\n            }, () -> {\n                __module__CapoMintHelpers__validateUutMinting(mph_21, seed_2, __core__mkCons(__helios__string____to_data(purpose_3), __core__mkNilData(())), true, __module__CapoMintHelpers__mkUutTnFactory(seed_2), false, (), true, otherMintedValue_3, true, needsMintDelegateApproval_3, true, extraMintDelegateRedeemerCheck_5)\n            })\n        }, () -> {\n            __core__ifThenElse(\n                true,\n                () -> {\n                    __core__chooseUnit(__helios__print(\"  -- CMH: mint UUT \"), __core__chooseUnit(__helios__print(purpose_3), __core__chooseUnit(__helios__print(\" w/ charter redeemer #\"), __core__chooseUnit(__helios__print(__helios__int__show(charterRedeemerIndex)()), __core__chooseUnit(__helios__print(\"\n\"), true)))))\n                },\n                () -> {\n                    () -> {\n                        true\n                    }()\n                }\n            )()\n        }))))\n    };\n    __module__CapoMintHelpers__MinterActivity[]__is_valid_data = (__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data) -> {\n        (data_98) -> {\n            __core__ifThenElse(\n                __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data(data_98),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data(data_98),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data(data_98),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data(data_98),\n                                        () -> {\n                                            true\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data(data_98),\n                                                () -> {\n                                                    true\n                                                },\n                                                () -> {\n                                                    __core__ifThenElse(\n                                                        __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data(data_98),\n                                                        () -> {\n                                                            true\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoMintHelpers__MinterActivity[]__from_data = (__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_1) -> {\n        (data_99) -> {\n            ignore_6 = __core__ifThenElse(\n                __module__CapoMintHelpers__MinterActivity[]__is_valid_data(__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_1)(data_99),\n                () -> {\n                    ()\n                },\n                () -> {\n                    __core__trace(\"Warning: invalid MinterActivity data\", ())\n                }\n            )();\n            data_99\n        }\n    };\n    __module__CapoMintHelpers__MinterActivity[]__mintingCharter____is = (data_100) -> {\n        __helios__common__enum_tag_equals(data_100, 0)\n    };\n    __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_2 = (data_101) -> {\n        __core__chooseData(data_101, () -> {\n            pair_29 = __core__unConstrData__safe(data_101);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_29), 0),\n                () -> {\n                    data_102 = __core__listData(__core__sndPair(pair_29));\n                    __core__chooseData(data_102, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_58 = __core__unListData__safe(data_102);\n                        __core__chooseList(fields_58, () -> {\n                            false\n                        }, () -> {\n                            head_38 = __core__headList__safe(fields_58);\n                            __core__ifThenElse(\n                                __helios__address__is_valid_data(head_38),\n                                () -> {\n                                    fields_59 = __core__tailList__safe(fields_58);\n                                    __core__chooseList(fields_59, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__mintingCharter__owner = (self_131) -> {\n        __helios__address__from_data(__helios__common__enum_field_0(self_131))\n    };\n    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing____is = (data_103) -> {\n        __helios__common__enum_tag_equals(data_103, 1)\n    };\n    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_2 = (data_104) -> {\n        __core__chooseData(data_104, () -> {\n            pair_30 = __core__unConstrData__safe(data_104);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_30), 1),\n                () -> {\n                    data_105 = __core__listData(__core__sndPair(pair_30));\n                    __core__chooseData(data_105, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_60 = __core__unListData__safe(data_105);\n                        __core__chooseList(fields_60, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant____is = (data_106) -> {\n        __helios__common__enum_tag_equals(data_106, 2)\n    };\n    __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_2 = (data_107) -> {\n        __core__chooseData(data_107, () -> {\n            pair_31 = __core__unConstrData__safe(data_107);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_31), 2),\n                () -> {\n                    data_108 = __core__listData(__core__sndPair(pair_31));\n                    __core__chooseData(data_108, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_61 = __core__unListData__safe(data_108);\n                        __core__chooseList(fields_61, () -> {\n                            false\n                        }, () -> {\n                            head_39 = __core__headList__safe(fields_61);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_39),\n                                () -> {\n                                    fields_62 = __core__tailList__safe(fields_61);\n                                    __core__chooseList(fields_62, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__seed = (self_132) -> {\n        __helios__txoutputid__from_data(__helios__common__enum_field_0(self_132))\n    };\n    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant____is = (data_109) -> {\n        __helios__common__enum_tag_equals(data_109, 3)\n    };\n    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_2 = (data_110) -> {\n        __core__chooseData(data_110, () -> {\n            pair_32 = __core__unConstrData__safe(data_110);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_32), 3),\n                () -> {\n                    data_111 = __core__listData(__core__sndPair(pair_32));\n                    __core__chooseData(data_111, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_63 = __core__unListData__safe(data_111);\n                        __core__chooseList(fields_63, () -> {\n                            false\n                        }, () -> {\n                            head_40 = __core__headList__safe(fields_63);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_40),\n                                () -> {\n                                    fields_64 = __core__tailList__safe(fields_63);\n                                    __core__chooseList(fields_64, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__seed = (self_133) -> {\n        __helios__txoutputid__from_data(__helios__common__enum_field_0(self_133))\n    };\n    __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate____is = (data_112) -> {\n        __helios__common__enum_tag_equals(data_112, 4)\n    };\n    __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_2 = (data_113) -> {\n        __core__chooseData(data_113, () -> {\n            pair_33 = __core__unConstrData__safe(data_113);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_33), 4),\n                () -> {\n                    data_114 = __core__listData(__core__sndPair(pair_33));\n                    __core__chooseData(data_114, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_65 = __core__unListData__safe(data_114);\n                        __core__chooseList(fields_65, () -> {\n                            false\n                        }, () -> {\n                            head_41 = __core__headList__safe(fields_65);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_41),\n                                () -> {\n                                    fields_66 = __core__tailList__safe(fields_65);\n                                    __core__chooseList(fields_66, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__seed = (self_134) -> {\n        __helios__txoutputid__from_data(__helios__common__enum_field_0(self_134))\n    };\n    __helios__option[__helios__bytearray]__is_valid_data = (data_115) -> {\n        __core__chooseData(data_115, () -> {\n            pair_34 = __core__unConstrData__safe(data_115);\n            index_10 = __core__fstPair(pair_34);\n            fields_67 = __core__sndPair(pair_34);\n            __core__ifThenElse(\n                __core__equalsInteger(index_10, 0),\n                () -> {\n                    __core__chooseList(fields_67, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_67), () -> {\n                            __helios__bytearray__is_valid_data(__core__headList__safe(fields_67))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_10, 1),\n                        () -> {\n                            __core__chooseList(fields_67, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_2 = (data_116) -> {\n        __core__chooseData(data_116, () -> {\n            pair_35 = __core__unConstrData__safe(data_116);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_35), 5),\n                () -> {\n                    data_117 = __core__listData(__core__sndPair(pair_35));\n                    __core__chooseData(data_117, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_68 = __core__unListData__safe(data_117);\n                        __core__chooseList(fields_68, () -> {\n                            false\n                        }, () -> {\n                            head_42 = __core__headList__safe(fields_68);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_42),\n                                () -> {\n                                    fields_69 = __core__tailList__safe(fields_68);\n                                    __core__chooseList(fields_69, () -> {\n                                        false\n                                    }, () -> {\n                                        head_43 = __core__headList__safe(fields_69);\n                                        __core__ifThenElse(\n                                            __helios__option[__helios__bytearray]__is_valid_data(head_43),\n                                            () -> {\n                                                fields_70 = __core__tailList__safe(fields_69);\n                                                __core__chooseList(fields_70, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__seed = (self_135) -> {\n        __helios__txoutputid__from_data(__helios__common__enum_field_0(self_135))\n    };\n    __helios__option[__helios__bytearray]__from_data = (data_118) -> {\n        __13 = __core__ifThenElse(\n            __helios__option[__helios__bytearray]__is_valid_data(data_118),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(\"Warning: invalid option data\", ())\n            }\n        )();\n        data_118\n    };\n    __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__replacingUut = (self_136) -> {\n        __helios__option[__helios__bytearray]__from_data(__helios__common__enum_field_1(self_136))\n    };\n    __module__CapoMinter__seedTxn = __helios__txid__from_data(__core__constrData(0, __core__mkCons(__core__bData(#0000000000000000000000000000000000000000000000000000000000000000), __core__mkNilData(()))));\n    __module__CapoMinter__seedIndex = __helios__int__from_data(__core__iData(0));\n    __module__CapoMinter__rev = __helios__int__from_data(__core__iData(1));\n    __module__CapoMinter__hasContractSeedUtxo = (tx_1) -> {\n        __module__CapoMintHelpers__hasSeedUtxo(tx_1, __helios__txoutputid__new(__module__CapoMinter__seedTxn, __module__CapoMinter__seedIndex))\n    };\n    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__length = __helios__common__length;\n    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__length = (self_137) -> {\n        __helios__common__length(self_137)\n    };\n    __helios__option[__helios__bytearray]__some____is = (data_119) -> {\n        __helios__common__enum_tag_equals(data_119, 0)\n    };\n    __helios__option[__helios__bytearray]__some__some = (self_138) -> {\n        __helios__bytearray__from_data(__helios__common__enum_field_0(self_138))\n    };\n    __module__CapoMinter__main = (r) -> {\n        mph_22 = __helios__scriptcontext__get_current_minting_policy_hash();\n        value_minted = __helios__tx__minted(__helios__scriptcontext__tx);\n        __core__chooseUnit(__helios__assert(__helios__bool__or(() -> {\n            true\n        }, () -> {\n            __helios__bytearray____eq(__helios__int__serialize(__module__CapoMinter__rev)(), __helios__int__serialize(__module__CapoMinter__rev)())\n        }), \"no\"), __core__chooseUnit(__helios__print(\" 🚥❓ Capo minter: \"), __core__chooseUnit(__helios__print(__helios__mintingpolicyhash__show(__helios__scriptcontext__get_current_minting_policy_hash())()), __core__chooseUnit(__helios__print(\"\n\"), (ok) -> {\n            __core__chooseUnit(__helios__print(\"\n\n🚥🟢 Capo minter: ok!\n\"), ok)\n        }(__cond_24 = r;\n        __core__ifThenElse(\n            __module__CapoMintHelpers__MinterActivity[]__mintingCharter____is(__cond_24),\n            () -> {\n                (charter_2) -> {\n                    charterVal = __module__StellarHeliosHelpers__mkTv(mph_22, true, \"charter\", false, (), false, ());\n                    authTnBase = \"capoGov\";\n                    mintDgtTnBase = \"mintDgt\";\n                    spendDgtTnBase = \"spendDgt\";\n                    purposes_1 = __core__mkCons(__helios__string____to_data(authTnBase), __core__mkCons(__helios__string____to_data(mintDgtTnBase), __core__mkCons(__helios__string____to_data(spendDgtTnBase), __core__mkNilData(()))));\n                    __core__chooseUnit(__helios__assert(__helios__value____geq(value_minted, charterVal), \"charter token not minted\"), __core__chooseUnit(__helios__print(\"  -- creating charter\"), hasSeed = __module__CapoMinter__hasContractSeedUtxo(__helios__scriptcontext__tx);\n                    minterSeed = __helios__txoutputid__new(__module__CapoMinter__seedTxn, __module__CapoMinter__seedIndex);\n                    mkUutName = __module__CapoMintHelpers__mkUutTnFactory(minterSeed);\n                    mintsUuts = __module__CapoMintHelpers__validateUutMinting(mph_22, minterSeed, purposes_1, true, mkUutName, true, charterVal, false, (), false, (), false, ());\n                    charterOutput = __helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output_1) -> {\n                        __helios__bool__and(() -> {\n                            __helios__address____eq(__helios__txoutput__address(output_1), __module__CapoMintHelpers__MinterActivity[]__mintingCharter__owner(charter_2))\n                        }, () -> {\n                            __helios__value__contains(__helios__txoutput__value(output_1))(charterVal)\n                        })\n                    });\n                    charterData = __helios__txoutputdatum__inline(__helios__txoutput__datum(charterOutput));\n                    charterDatum = __module__CapoHelpers__CapoDatum[]__CharterToken__from_data(charterData);\n                    __lhs_0_67 = __helios__common__assert_constr_index(charterDatum, 0);\n                    spendDgt = __module__CapoHelpers__CapoDatum[]__CharterToken__spendDelegateLink(__lhs_0_67);\n                    spendInvariants = __module__CapoHelpers__CapoDatum[]__CharterToken__spendInvariants(__lhs_0_67);\n                    namedDelegates = __module__CapoHelpers__CapoDatum[]__CharterToken__namedDelegates(__lhs_0_67);\n                    mintDgt_1 = __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink(__lhs_0_67);\n                    mintInvariants = __module__CapoHelpers__CapoDatum[]__CharterToken__mintInvariants(__lhs_0_67);\n                    authDgt = __module__CapoHelpers__CapoDatum[]__CharterToken__govAuthorityLink(__lhs_0_67);\n                    __core__chooseUnit(__helios__assert(__helios__int____eq(__helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__length(mintInvariants), 0), \"no mint invariants allowed at charter creation\"), __core__chooseUnit(__helios__assert(__helios__int____eq(__helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__length(spendInvariants), 0), \"no spend invariants allowed at charter creation\"), __core__chooseUnit(__helios__assert(__helios__int____eq(__helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__length(namedDelegates), 0), \"no named delegates allowed at charter creation\"), __core__chooseUnit(__helios__print(\"  -- checking for required delegates\n\"), hasGoodDelegates = __helios__bool__and(() -> {\n                        __helios__bool__and(() -> {\n                            __helios__bool__and(() -> {\n                                true\n                            }, () -> {\n                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(authDgt)(mph_22, true, true, true, __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new())\n                            })\n                        }, () -> {\n                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(mintDgt_1)(mph_22, true, true, true, __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new())\n                        })\n                    }, () -> {\n                        __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(spendDgt)(mph_22, true, true, true, __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new())\n                    });\n                    __core__chooseUnit(__helios__print(__helios__string____add(\"\n  -- hasSeed: \", __helios__bool__show(hasSeed)())), __core__chooseUnit(__helios__print(__helios__string____add(\"\n  -- mintsUuts: \", __helios__bool__show(mintsUuts)())), __core__chooseUnit(__helios__print(__helios__string____add(\"\n  -- hasGoodDelegates: \", __helios__bool__show(hasGoodDelegates)())), __helios__bool__and(() -> {\n                        __helios__bool__and(() -> {\n                            hasGoodDelegates\n                        }, () -> {\n                            mintsUuts\n                        })\n                    }, () -> {\n                        hasSeed\n                    }))))))))))\n                }\n            },\n            () -> {\n                __core__ifThenElse(\n                    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing____is(__cond_24),\n                    () -> {\n                        (__lhs_0_66) -> {\n                            __core__chooseUnit(__helios__print(\"mintWithDelegateAuthorizing\n\"), __module__CapoMintHelpers__requiresMintDelegateApproval(mph_22))\n                        }\n                    },\n                    () -> {\n                        __core__ifThenElse(\n                            __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant____is(__cond_24),\n                            () -> {\n                                (__lhs_0_65) -> {\n                                    seed_6 = __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__seed(__lhs_0_65);\n                                    addMintInvariant = 3;\n                                    __core__chooseUnit(__helios__print(\"checking for addingMintInvariant\n\"), __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(mph_22, \"mintInvar\", seed_6, addMintInvariant, false, (), false, (), false, ()))\n                                }\n                            },\n                            () -> {\n                                __core__ifThenElse(\n                                    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant____is(__cond_24),\n                                    () -> {\n                                        (__lhs_0_64) -> {\n                                            seed_5 = __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__seed(__lhs_0_64);\n                                            addSpendInvariant = 4;\n                                            __core__chooseUnit(__helios__print(\"checking for addingSpendInvariant\n\"), __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(mph_22, \"spendInvar\", seed_5, addSpendInvariant, false, (), false, (), false, ()))\n                                        }\n                                    },\n                                    () -> {\n                                        __core__ifThenElse(\n                                            __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate____is(__cond_24),\n                                            () -> {\n                                                (__lhs_0_63) -> {\n                                                    seed_4 = __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__seed(__lhs_0_63);\n                                                    updatingCharter_1 = 1;\n                                                    __core__chooseUnit(__helios__print(\"checking for ForcingNewMintDelegate\n\"), __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(mph_22, \"mintDgt\", seed_4, updatingCharter_1, false, (), true, false, false, ()))\n                                                }\n                                            },\n                                            () -> {\n                                                (__lhs_0_60) -> {\n                                                    seed_3 = __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__seed(__lhs_0_60);\n                                                    replaceExisting = __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__replacingUut(__lhs_0_60);\n                                                    __core__chooseUnit(__helios__print(\"checking for CreatingNewSpendDelegate\n\"), (otherMintedValue_4) -> {\n                                                        updatingCharter = 1;\n                                                        __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(mph_22, \"spendDgt\", seed_3, updatingCharter, true, otherMintedValue_4, true, false, false, ())\n                                                    }(__cond_25 = replaceExisting;\n                                                    __core__ifThenElse(\n                                                        __helios__option[__helios__bytearray]__some____is(__cond_25),\n                                                        () -> {\n                                                            (__lhs_0_62) -> {\n                                                                oldTokenName = __helios__option[__helios__bytearray]__some__some(__lhs_0_62);\n                                                                BURNED = __helios__int____neg(1);\n                                                                __helios__value__new(__helios__assetclass__new(mph_22, oldTokenName), BURNED)\n                                                            }\n                                                        },\n                                                        () -> {\n                                                            (__lhs_0_61) -> {\n                                                                __helios__value__ZERO\n                                                            }\n                                                        }\n                                                    )()(__cond_25)))\n                                                }\n                                            }\n                                        )()\n                                    }\n                                )()\n                            }\n                        )()\n                    }\n                )()\n            }\n        )()(__cond_24))))))\n    };\n    __core__ifThenElse(\n        __module__CapoMinter__main(__module__CapoMintHelpers__MinterActivity[]__from_data(__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_2)(__REDEEMER)),\n        () -> {\n            ()\n        },\n        () -> {\n            __helios__error(\"validation returned false\")\n        }\n    )()\n}",
    "optimized": "59155059154d010000223232323232323232323232323232323232323232323232323232323232323232323232323232323232323232533357346a666ae68cdc381524000246466ae6cc94ccd5cd0008a4c2c6604203200264646464646464646464646464646466ae6d4ccd5cd19b8730270024800052616335736a666ae68cdc39813802a40002930b19ab9b5333573466e1cc09c0112000149858c94ccd5cd2999ab9a001100f14a029445282999ab9a533357346603200206c26603200606c29404cc0640180d85281bac35742603e0126eb0c0a0020c05401cdd59aba1357440066eb0d5d08011bac357420046ae88004d55cf0009baa0013302500148000cc09000520003022357426ae88d5d11aab9e375400264646600200200444a666aae7c004584c94ccd5cd2999ab9a3375e6ae84d55cf1baa001357426aae78dd50040998139bab357426ae88d55cf1baa00100714a020022660060066ae88008d5d08009bac357426ae88d5d11aab9e3754040666666666600a0509812bd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ff004bd70908476361706f476f76008108476d696e74446774008109487370656e64446774001803a6012bd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ff004a2004941264a0931980380f26012bd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ff003300c026490107636861727465720015333573466e1c0a920021323223232323235333573466e1c0052000123253335734601e00a29445281aba135573c6ea800454ccd5cd19b870014801049854ccd5cd19b870014800848c8c8c8d4ccd5cd19b870014800049288a999ab9a3370e00290010930930019aab9d00137540026ae84d55cf1baa00115333573466e1c00520061253335734601c00829445280a999ab9a3370e0029004092999ab9a300e00414a2294054ccd5cd19b8700148028494ccd5cd18070020a5114a02a666ae68cdc3800a401c24a666ae68c0380105288a5015333573466e1c005200c126123253335734601e00a26466600200266036004400246a666ae68cdc39aab9d375400290050925115333573466e1cd55ce9baa0014803849288a999ab9a3370e6aae74dd5000a400c24c2a666ae68cdc39aab9d375400290040930a999ab9a3370e6aae74dd5000a402024c2a666ae68cdc39aab9d375400290060930a999ab9a3370e6aae74dd5000a400824c2a666ae68cdc39aab9d375400290000930930009112999aab9f00214a22a666ae68c004d5d080109998018019aba200200114a02940dd61aba135573c6ea8004008d55ce9baa001300e32357426aae78dd50009aba1357440026464646466ae80dd380219aba00013357406ea40092f5c064646a666ae68cdc39aab9d3754002900109309919191191919191a999ab9a3370e6aae74dd5000a40002400224c002660400124a666ae68cdd7991aba135573c6ea8004c8d5d09aab9e37540026ae84d5d11aab9e3754002006266060646eacd5d09aba235573c6ea8004d5d09aba235573c6ea80040085281980d00480219ba548008cd5d01ba90014bd701bae357426aae78dd50009b99001375c0026ae84014004d5d09aba2357440086eb0d5d08031bae00135742004601664646a666ae68cdc3800a400424646604c00290001aba135573c6ea800454ccd5cd19b870014801048c8cc0980052000357426aae78dd50008930011aab9d37540026ae84d5d1000991919191a999ab9a3370e0029001090028a999ab9a3370e00290020930919191919aba0375200666ae80cdd2a400466ae80004cd5d000125eb812f5c066050646605200290001813991aba1357446ae88d55cf1baa001357426ae88d55cf1baa00148000c8c8d4ccd5cd19b8735573a6ea8005200012357426aae78dd5000893000991980d800919815991bab357426ae88d55cf1baa001357426ae88d55cf1baa00100337586ae84d5d10049980a000a481076368617274657200375c6ae8401400cd55ce8009baa001357426ae88004cd5d01ba90284bd708103d87980001aab9e00137540382a666ae68cdc3815240082464666666600604e9201096d696e74496e76617200001480192824c940d5d09aab9e37540022a666ae68cdc38152400c2464666666600604e9210a7370656e64496e76617200001480212824c940d5d09aab9e37540022a666ae68cdc3815240102464666666600604e921076d696e7444677400001480092824c944d5d09aab9e37540022464646464666666600c0549201087370656e64446774000034800928800a5135333573466e1cd55ce9baa0014800048c8cc084cc0800ac0052001375c6ae84d55cf1baa001124bd6f7b6300009aba1357440046ae84004d55cf1baa00102e1498588888888c8c8c8c8c94ccd5cd2999ab9a353335734a666666ae900045288a5014a0294052809192999ab9a3370e002016294458d55ce9baa0011260011333333333300d00c00a3357406ea4dcc005a5eb80c03c0292824c944015288020a5014a22940c04c004c8c8cc004004008894ccd55cf8008b0992999ab9a3302c3237566ae84d5d11aab9e37540026ae84d5d11aab9e375400200a20022660060066ae88008d5d08009bac357426aae78dd501299809804a49076368617274657200533357340042940528a999ab9a003100214bd6f7b630111111111119191919191919ab9b53335734666ae68c8c8cc00400409c894ccd55cf8008a5015333573466ebcd55ce9aba100100314a22660040046ae88004dd48082504a22c29319ab9b32498cdcb19b963372c66e59241180a20202d2d207575742d6d696e74696e6720736565643a20005323038375c6ae84d55cf1baa001357426aae78dd5007a4905f09f94b923003023375a6ae84d5d11aab9e375401e9201010a00335736660226604200202044649319b963372c66e58cdcb2491a20202020e284b9efb88f20f09f909e2065787065637465643a20003025001491027820003732004921010a003233573666ae6ccc04800488c9263372c66e58cdcb19b964911a20202020e284b9efb88f20f09f909e20202061637475616c3a20003026001491027820003732004921010a0032498c8ccc09000488c8ccc09cdd59aab9e0022232323372c008a666ae68cdc7802a450013372c92010a6c6f76656c6163653a20003372c60580029201010a0013372ca608000a66e59241012e003372ca608000466e592401023a20003372c60580029201010a00375a6aae78008dd71aab9d001003375c6aae74005241003301b02623322333573466e3c00805128251375c6aae74004dd59aab9e0013232335736a666ae680045261633573664931980b0168092999ab9a005100114a066606004e006e1cccc08c00488cc88c8d4ccd5cd19b8735573a6ea80052002123357406ea4010018498004cc08c0108c8cdc78008021bae001375c6aae74004dd69aab9e0014bd70198108128081980f9980f802802191919800800801112999aab9f00114bd6f7b6300998111bab35742002660040046ae88004cc078c8cc004004038894ccd55cf8008a5eb804c8c94ccd55cf800899aba00024bd70099aba000200133003003357440046ae840048dd3191980d00898070009b99375c002a666ae68004528899192999ab9a0041323357366493191b99375c0026ae84008c8c8c8c8d4ccd5cd19b8735573a6ea800520021261232353335734a666666ae900045288a5014a02940528091919192999ab9a3375e0020022a666ae68cdc3a40006aae7400c4c8c8c8d4ccd5cd19b870014800049288a999ab9a3370e00290010930930019aab9d00137540026ae840085288a50374e0026aae78004dd50008930009aba135573c6ea8004004c8cccc08000400c8cdd2a400066ae800052f5c02980103d87a8000302002e3372c66e59241066467546b6e20003237326eb8004d5d080224811c206e6f74206265696e67207370656e74206173206578706563746564003301a301e02c235333573466e1cd55ce9baa0014800848cdd79aba135573c6ea800400c4928000991a999ab9a3370e6aae74dd5000a400024646ae84d55cf1baa001357426aae78dd50008930009919810000919818191bab357426ae88d55cf1baa001357426ae88d55cf1baa00100337586ae84d55cf1baa02b33029330280103730646e64dd70009aba100148008528980a0009981519191919198171919817800a4000605a646ae84d5d11aba235573c6ea8004d5d09aba235573c6ea800520003235333573466e1cd55ce9baa0014800048d5d09aab9e375400224646a666ae68cdc39aab9d37540029000091aba135573c6ea8004498004c8cc088004010dd61aba135573c6ea80b4004cc07c00c0048cc0b8c8dd59aba1357446aae78dd50009aba1357446aae78dd50008011980c007a4907636861727465720037586ae84d5d11aab9e3754050900019199ab9a0014a0944c8cc004004010894ccd55cf8008a5115333573464646600200200444a666aae7c0045288a999ab9a3370e6eb4d55cf1aba1001480004cc008008d5d10008a5037566aae78d5d08008998010011aba200114a0a666ae68010400c528a999ab9a005100414bd6f7b6302999ab9a006100514bd6f7b630111919800800801912999aab9f00114984c8cd5cd998021bae35573a0026eb4d55cf000998018019aba2002357420024646464646464466e58cdcb000a481012d000025302b3337189000240186e500054ccd5cd199ab9a337126e3400920124a0944584cdc519b8a0014890140000023337189005240806ecc00cdd99ba8001375a6ae84d5d11aab9e37540046ae84d55cf1baa00122335736a666ae68c8ccd5cd000a504a2660406eb0d5d09aab9e3754004466ebcd5d09aab9e37540020042c29325123300337586ae84004dd71aba1357446ae880048dd61aba1357446ae88d5d11aab9e37540024464646466ae6d4ccd5cd19b88371a6e600092008161498c8c8cd5cda999ab9a53335734666ae680052825114a229405852600135333573466e1cd55ce9baa0024800048c8cc07cc8ccc05400488cc054008dd59aba1357446aae78dd5000a5eb7bdb180c8cc0340048c94ccd5cd19b8735573a6ea8005200213371e008646eb8d5d09aab9e37540026604200290010a5032357426aae78dd50009aba135573c6ea8004dd61aba1357446ae88d55cf1baa01c003375c6ae84d55cf1baa001123235333573466e1cd55ce9baa00148000492889250001323301000123302037566ae84d5d11aab9e37540020086eb0d5d09aba2357446aae78dd500d801198040020019aba1357446ae88010c8dcc9bae001357426ae8800cc8dcc9bae001357420044646464666601000400240022c6600800246a666ae68cdc39aab9d375400290010919baf357426aae78dd5000802092500013007015357426aae78dd5000911919800800801912999aab9f0011613253335734600800220022660060066ae88008d55ce9aba10012232335736a666ae68ccd5cd19b89371a00290002504a22930b1980999809001800a40046e6000488c8ccc00400400c0088894ccd55cf8010a5eb7bdb1804c94ccd5cd1801000899aba00013330040043574400600426660080086ae8800c008d5d08011111191998008008028021112999aab9f0020041325333573466ebc008d55ce800898031aab9e0011333004004357440060046ae840088dd59aba1357446ae88d5d11aba230020012357446ae88d5d11aba2357446aae78dd500091191998008008018011112999aab9f00214c0103d87a8000132533357346004002266e95200033574000297ae01333004004357440060046ae8400888c8cc00400400c894ccd55cf8008a5eb804cd5d018019aba100133002002357440024464660020026602600600444a666aae7c00452f5bded8c02646464a666aae7c00440084cd5d019bb0003374c002004664464660020026603200600444a666aae7c00452f5bded8c02646464a666ae68cdc3800a40002004266ae80cdd80019ba8001002337006603c00c0046603c00a004660060066ae88008d5d08009980a8030011980a802801198018019aba2002357420024464646600200200844a666aae7c0045854ccd5cd19baf35573a6ae8400400c4dd59aab9e357420022660040046ae88004dd4800911191998008008020011112999aab9f00210011333003003357440046600a0026ae840088dcc992999ab9a337100049000099b8b48168ccc004004cdc10012400291100133300100100248900222325333573466e2000d20141001133300400433706006900a00099b8b3370066e180092014481800048c8cc004004008894ccd55cf8008a4000266e00cc008008d5d1000a40046eac004c0040108d5d09aba2357446ae88d5d11aab9e37540024466e9520003357406ea4008cd5d01ba90014bd7011191919aba0337600046e98cd5d019bb0001375000697adef6c604bd6f7b6301aba1357446aae78dd50019aba135573c6ea8008d5d080791919192999ab9a3370e004900209aba10011635573c0046aae74004dd5000912999ab9a3370e6aae74dd500100088010b1119980180100091199ab9a3371000400294128911191980080099803002001912999aab9f00114a2264a666ae68c8ccd5cd000a504a2664464660020026601600600444a666aae7c0045288992999ab9a323335734002941289980499807802800998078020008a50133003003357440046ae84004cc01c018004cc01c0140045280998018019aba20023574200244646600200200644a666aae7c00452f5bded8c02a666ae68cdd79aab9d3574200200626eacd55cf1aba1001133002002357440024464646464666002002004008444a666aae7c00440084cd5d01aba100133300300300235744002666002002004006444a666aae7c00452f5c0264a666ae68cc0200148cdd780080109998020020019aba200213357400026660080080066ae88008d55ce9aba100132330010010032253335573e002297ae013357406aae74d5d0800998010011aba2001223233300100100300222253335573e004294054ccd5cd18009aba100214a226660060066ae8800800488c8ccc00400400c0088894ccd55cf8010a40002a666ae68cdd79aab9d3574200400226eb4d55cf1aba10021333003003357440040026eb8004d5d09aab9e00137540026ae84d5d100190991980080080111192999ab9a337109000000899b96373264666ae68cdc39b8d00148008cdc5a40c00020026e60c8c8dcca999ab9a337100049000099b8b48168ccc004004cdc1001240029110013330010010024890022232325333573466e2001120201001133300500533706008901000099b8b333573466e20005201433700002903019b80001482b804008cdc30012404066e3800920003300300333371890010008010a4900371a0026aae74dd50021aab9e00137540021",
    "optimizedIR": "(__REDEEMER, __CONTEXT) -> {\n    __common13 = __core__unConstrData(__CONTEXT);\n    __common14 = __core__sndPair(__common13);\n    __common7 = __core__fstPair(__core__unConstrData(__REDEEMER));\n    __helios__bytearray__show = (self_3) -> {\n        () -> {\n            recurse_3 = (recurse_2, self_4) -> {\n                n = __core__lengthOfByteString(self_4);\n                __core__ifThenElse(\n                    __core__lessThanInteger(0, n),\n                    () -> {\n                        __core__appendString(__core__decodeUtf8__safe(hex_bytes = __core__encodeUtf8(self_1 = __core__indexByteString__safe(self_4, 0);\n                        recurse_1 = (recurse, self_2, bytes) -> {\n                            digit = __core__modInteger(self_2, 16);\n                            bytes_1 = __core__consByteString(__core__ifThenElse(\n                                __core__lessThanInteger(digit, 10),\n                                __core__addInteger(digit, 48),\n                                __core__addInteger(digit, 87)\n                            ), bytes);\n                            __core__ifThenElse(\n                                __core__lessThanInteger(self_2, 16),\n                                () -> {\n                                    bytes_1\n                                },\n                                () -> {\n                                    recurse(recurse, __core__divideInteger(self_2, 16), bytes_1)\n                                }\n                            )()\n                        };\n                        __core__decodeUtf8__safe(__core__ifThenElse(\n                            __core__lessThanInteger(self_1, 0),\n                            () -> {\n                                __core__consByteString(45, recurse_1(recurse_1, __core__multiplyInteger(self_1, -1), #))\n                            },\n                            () -> {\n                                recurse_1(recurse_1, self_1, #)\n                            }\n                        )()));\n                        __core__ifThenElse(\n                            __core__equalsInteger(__core__lengthOfByteString(hex_bytes), 1),\n                            __core__consByteString(48, hex_bytes),\n                            hex_bytes\n                        )), recurse_2(recurse_2, __core__sliceByteString(1, n, self_4)))\n                    },\n                    () -> {\n                        \"\"\n                    }\n                )()\n            };\n            recurse_3(recurse_3, self_3)\n        }\n    };\n    __helios__scriptcontext__purpose = __core__headList(__core__tailList(__common14));\n    __common1 = __core__unConstrData(__helios__scriptcontext__purpose);\n    __common3 = __core__headList(__core__sndPair(__common1));\n    __common4 = __core__unBData(__common3);\n    __helios__value__get_inner_map_int = (map, key) -> {\n        recurse_5 = (recurse_4, map_1, key_1) -> {\n            __core__chooseList(map_1, () -> {\n                0\n            }, () -> {\n                __core__ifThenElse(\n                    __core__equalsData(__core__fstPair(__core__headList__safe(map_1)), key_1),\n                    () -> {\n                        __core__unIData(__core__sndPair(__core__headList__safe(map_1)))\n                    },\n                    () -> {\n                        recurse_4(recurse_4, __core__tailList__safe(map_1), key_1)\n                    }\n                )()\n            })()\n        };\n        recurse_5(recurse_5, map, key)\n    };\n    __helios__common__any = (self_9, fn) -> {\n        recurse_9 = (recurse_8, self_10, fn_1) -> {\n            __core__chooseList(self_10, () -> {\n                false\n            }, () -> {\n                __core__ifThenElse(\n                    fn_1(__core__headList__safe(self_10)),\n                    () -> {\n                        true\n                    },\n                    () -> {\n                        recurse_8(recurse_8, __core__tailList__safe(self_10), fn_1)\n                    }\n                )()\n            })()\n        };\n        recurse_9(recurse_9, self_9, fn)\n    };\n    __helios__value__merge_map_keys = (a_2, b_3) -> {\n        (aKeys) -> {\n            recurse_13 = (recurse_12, keys, map_4) -> {\n                __core__chooseList(map_4, () -> {\n                    __core__mkNilData(())\n                }, () -> {\n                    key_3 = __core__fstPair(__core__headList__safe(map_4));\n                    __core__ifThenElse(\n                        __helios__common__any(aKeys, (item) -> {\n                            __core__equalsData(item, key_3)\n                        }),\n                        () -> {\n                            recurse_12(recurse_12, keys, __core__tailList__safe(map_4))\n                        },\n                        () -> {\n                            __core__mkCons(key_3, recurse_12(recurse_12, keys, __core__tailList__safe(map_4)))\n                        }\n                    )()\n                })()\n            };\n            b_2 = recurse_13(recurse_13, aKeys, b_3);\n            recurse_11 = (recurse_10, lst_1, rem) -> {\n                __core__chooseList(rem, () -> {\n                    lst_1\n                }, () -> {\n                    __core__mkCons(__core__headList__safe(rem), recurse_10(recurse_10, lst_1, __core__tailList__safe(rem)))\n                })()\n            };\n            recurse_11(recurse_11, b_2, aKeys)\n        }(recurse_7 = (recurse_6, map_3) -> {\n            __core__chooseList(map_3, () -> {\n                __core__mkNilData(())\n            }, () -> {\n                __core__mkCons(__core__fstPair(__core__headList__safe(map_3)), recurse_6(recurse_6, __core__tailList__safe(map_3)))\n            })()\n        };\n        recurse_7(recurse_7, a_2))\n    };\n    __helios__value__get_inner_map = (map_5, mph) -> {\n        recurse_17 = (recurse_16, map_6) -> {\n            __core__chooseList(map_6, () -> {\n                __core__mkNilPairData(())\n            }, () -> {\n                __core__ifThenElse(\n                    __core__equalsData(__core__fstPair(__core__headList__safe(map_6)), mph),\n                    () -> {\n                        __core__unMapData(__core__sndPair(__core__headList__safe(map_6)))\n                    },\n                    () -> {\n                        recurse_16(recurse_16, __core__tailList__safe(map_6))\n                    }\n                )()\n            })()\n        };\n        recurse_17(recurse_17, map_5)\n    };\n    __helios__value__compare = (a_4, b_5, comp_1) -> {\n        recurse_19 = (recurse_18, keys_2) -> {\n            __core__chooseList(keys_2, () -> {\n                true\n            }, () -> {\n                key_5 = __core__headList__safe(keys_2);\n                __core__ifThenElse(\n                    b_1 = (a_3, b_4) -> {\n                        recurse_15 = (recurse_14, keys_1) -> {\n                            __core__chooseList(keys_1, () -> {\n                                true\n                            }, () -> {\n                                key_4 = __core__headList__safe(keys_1);\n                                __core__ifThenElse(\n                                    b_1 = comp_1(__helios__value__get_inner_map_int(a_3, key_4), __helios__value__get_inner_map_int(b_4, key_4));\n                                    __core__ifThenElse(\n                                        b_1,\n                                        false,\n                                        true\n                                    ),\n                                    () -> {\n                                        false\n                                    },\n                                    () -> {\n                                        recurse_14(recurse_14, __core__tailList__safe(keys_1))\n                                    }\n                                )()\n                            })()\n                        };\n                        recurse_15(recurse_15, __helios__value__merge_map_keys(a_3, b_4))\n                    }(__helios__value__get_inner_map(a_4, key_5), __helios__value__get_inner_map(b_5, key_5));\n                    __core__ifThenElse(\n                        b_1,\n                        false,\n                        true\n                    ),\n                    () -> {\n                        false\n                    },\n                    () -> {\n                        recurse_18(recurse_18, __core__tailList__safe(keys_2))\n                    }\n                )()\n            })()\n        };\n        recurse_19(recurse_19, __helios__value__merge_map_keys(a_4, b_5))\n    };\n    __helios__value____geq = (a_5, b_6) -> {\n        __helios__value__compare(a_5, b_6, (a_qty, b_qty) -> {\n            __core__ifThenElse(\n                __core__lessThanInteger(a_qty, b_qty),\n                false,\n                true\n            )\n        })\n    };\n    __helios__common__assert_constr_index = (data, i) -> {\n        __core__ifThenElse(\n            __core__equalsInteger(__core__fstPair(__core__unConstrData(data)), i),\n            () -> {\n                data\n            },\n            () -> {\n                error()\n            }\n        )()\n    };\n    __helios__txoutputdatum__inline = (self_12) -> {\n        pair = __core__unConstrData(self_12);\n        index = __core__fstPair(pair);\n        fields = __core__sndPair(pair);\n        __core__ifThenElse(\n            __core__equalsInteger(index, 2),\n            () -> {\n                __core__headList(fields)\n            },\n            () -> {\n                error()\n            }\n        )()\n    };\n    __helios__scriptcontext__tx = __core__headList(__common14);\n    __helios__value__new = (assetClass, i_1) -> {\n        mph_1 = __core__headList(__core__sndPair(__core__unConstrData(assetClass)));\n        tokenName = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(assetClass))));\n        __core__mkCons(__core__mkPairData(mph_1, __core__mapData(__core__mkCons(__core__mkPairData(tokenName, __core__iData(i_1)), __core__mkNilPairData(())))), __core__mkNilPairData(()))\n    };\n    __helios__assetclass__new = (mph_2, token_name) -> {\n        __core__constrData(0, __core__mkCons(__core__bData(mph_2), __core__mkCons(__core__bData(token_name), __core__mkNilData(()))))\n    };\n    __helios__common__enum_field_4 = (self_21) -> {\n        __core__headList(__core__tailList(__core__tailList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(self_21)))))))\n    };\n    __common5 = __helios__common__enum_field_4(__helios__scriptcontext__tx);\n    __common6 = __core__unMapData(__common5);\n    __helios__common__length = (lst_2) -> {\n        recurse_21 = (recurse_20, lst_3) -> {\n            __core__chooseList(lst_3, () -> {\n                0\n            }, () -> {\n                __core__addInteger(recurse_20(recurse_20, __core__tailList__safe(lst_3)), 1)\n            })()\n        };\n        recurse_21(recurse_21, lst_2)\n    };\n    __helios__int__show = (self_24) -> {\n        __core__decodeUtf8__safe(recurse_23 = (recurse_22, i_3, bytes_2) -> {\n            bytes_3 = __core__consByteString(__core__addInteger(__core__modInteger(i_3, 10), 48), bytes_2);\n            __core__ifThenElse(\n                __core__lessThanInteger(i_3, 10),\n                () -> {\n                    bytes_3\n                },\n                () -> {\n                    recurse_22(recurse_22, __core__divideInteger(i_3, 10), bytes_3)\n                }\n            )()\n        };\n        __core__ifThenElse(\n            __core__lessThanInteger(self_24, 0),\n            () -> {\n                __core__consByteString(45, recurse_23(recurse_23, __core__multiplyInteger(self_24, -1), #))\n            },\n            () -> {\n                recurse_23(recurse_23, self_24, #)\n            }\n        )())\n    };\n    __helios__common__fold = (self_28, fn_2, z) -> {\n        recurse_27 = (recurse_26, self_29, z_1) -> {\n            __core__chooseList(self_29, () -> {\n                z_1\n            }, () -> {\n                recurse_26(recurse_26, __core__tailList__safe(self_29), fn_2(z_1, __core__headList__safe(self_29)))\n            })()\n        };\n        recurse_27(recurse_27, self_28, z)\n    };\n    __helios__value__get_policy = (self_34, mph_6) -> {\n        mph_7 = __core__bData(mph_6);\n        recurse_29 = (recurse_28, map_8) -> {\n            __core__chooseList(map_8, () -> {\n                error()\n            }, () -> {\n                __core__ifThenElse(\n                    __core__equalsData(__core__fstPair(__core__headList__safe(map_8)), mph_7),\n                    () -> {\n                        __core__unMapData(__core__sndPair(__core__headList__safe(map_8)))\n                    },\n                    () -> {\n                        recurse_28(recurse_28, __core__tailList__safe(map_8))\n                    }\n                )()\n            })()\n        };\n        recurse_29(recurse_29, self_34)\n    };\n    __helios__value____add = (a_11, b_11) -> {\n        recurse_33 = (recurse_32, keys_4) -> {\n            __core__chooseList(keys_4, () -> {\n                __core__mkNilPairData(())\n            }, () -> {\n                key_7 = __core__headList__safe(keys_4);\n                tail_1 = recurse_32(recurse_32, __core__tailList__safe(keys_4));\n                item_1 = (a_9, b_9) -> {\n                    recurse_31 = (recurse_30, keys_3) -> {\n                        __core__chooseList(keys_3, () -> {\n                            __core__mkNilPairData(())\n                        }, () -> {\n                            key_6 = __core__headList__safe(keys_3);\n                            tail = recurse_30(recurse_30, __core__tailList__safe(keys_3));\n                            sum = __core__addInteger(__helios__value__get_inner_map_int(a_9, key_6), __helios__value__get_inner_map_int(b_9, key_6));\n                            __core__ifThenElse(\n                                __core__equalsInteger(sum, 0),\n                                () -> {\n                                    tail\n                                },\n                                () -> {\n                                    __core__mkCons(__core__mkPairData(key_6, __core__iData(sum)), tail)\n                                }\n                            )()\n                        })()\n                    };\n                    recurse_31(recurse_31, __helios__value__merge_map_keys(a_9, b_9))\n                }(__helios__value__get_inner_map(a_11, key_7), __helios__value__get_inner_map(b_11, key_7));\n                __core__chooseList(item_1, () -> {\n                    tail_1\n                }, () -> {\n                    __core__mkCons(__core__mkPairData(key_7, __core__mapData(item_1)), tail_1)\n                })()\n            })()\n        };\n        recurse_33(recurse_33, __helios__value__merge_map_keys(a_11, b_11))\n    };\n    __helios__common__map = (self_40, fn_3) -> {\n        recurse_43 = (recurse_42, rem_1) -> {\n            __core__chooseList(rem_1, () -> {\n                __core__mkNilData(())\n            }, () -> {\n                __core__mkCons(fn_3(__core__headList__safe(rem_1)), recurse_42(recurse_42, __core__tailList__safe(rem_1)))\n            })()\n        };\n        recurse_43(recurse_43, self_40)\n    };\n    __helios__common__find_safe = (self_41, fn_4) -> {\n        recurse_45 = (recurse_44, self_42, fn_5) -> {\n            __core__chooseList(self_42, () -> {\n                __core__constrData(1, __core__mkNilData(()))\n            }, () -> {\n                head_2 = __core__headList__safe(self_42);\n                __core__ifThenElse(\n                    fn_5(head_2),\n                    () -> {\n                        __core__constrData(0, __core__mkCons(head_2, __core__mkNilData(())))\n                    },\n                    () -> {\n                        recurse_44(recurse_44, __core__tailList__safe(self_42), fn_5)\n                    }\n                )()\n            })()\n        };\n        recurse_45(recurse_45, self_41, fn_4)\n    };\n    __helios__common__enum_fields_after_4 = (self_50) -> {\n        __core__tailList(__core__tailList(__core__tailList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(self_50)))))))\n    };\n    __helios__tx__redeemers = (self_56) -> {\n        __core__unMapData(__core__headList(__core__tailList(__core__tailList(__core__tailList(__core__tailList(__helios__common__enum_fields_after_4(self_56)))))))\n    };\n    __helios__common__map_get = (self_57, key_8, fnFound, fnNotFound) -> {\n        recurse_49 = (recurse_48, self_58, key_9) -> {\n            __core__chooseList(self_58, fnNotFound, () -> {\n                head_3 = __core__headList__safe(self_58);\n                __core__ifThenElse(\n                    __core__equalsData(key_9, __core__fstPair(head_3)),\n                    () -> {\n                        fnFound(__core__sndPair(head_3))\n                    },\n                    () -> {\n                        recurse_48(recurse_48, __core__tailList__safe(self_58), key_9)\n                    }\n                )()\n            })()\n        };\n        recurse_49(recurse_49, self_57, key_8)\n    };\n    __helios__common__filter = (self_67, fn_10) -> {\n        recurse_53 = (recurse_52, self_68, fn_11) -> {\n            __core__chooseList(self_68, () -> {\n                __core__mkNilPairData(())\n            }, () -> {\n                head_4 = __core__headList__safe(self_68);\n                __core__ifThenElse(\n                    fn_11(head_4),\n                    () -> {\n                        __core__mkCons(head_4, recurse_52(recurse_52, __core__tailList__safe(self_68), fn_11))\n                    },\n                    () -> {\n                        recurse_52(recurse_52, __core__tailList__safe(self_68), fn_11)\n                    }\n                )()\n            })()\n        };\n        recurse_53(recurse_53, self_67, fn_10)\n    };\n    __module__StellarHeliosHelpers__mkTv = (mph_8, tn) -> {\n        tnBytes_1 = __core__encodeUtf8(tn);\n        __core__chooseUnit(__core__ifThenElse(\n            __core__ifThenElse(\n                __core__lessThanEqualsInteger(__core__lengthOfByteString(tnBytes_1), 0),\n                false,\n                true\n            ),\n            () -> {\n                ()\n            },\n            () -> {\n                error()\n            }\n        )(), __helios__value__new(__helios__assetclass__new(mph_8, tnBytes_1), 1))\n    };\n    __helios__map[__helios__scriptpurpose@__helios__data]__find_key = (self_80, fn_16) -> {\n        recurse_59 = (recurse_58, map_13) -> {\n            __core__chooseList(map_13, () -> {\n                error()\n            }, () -> {\n                item_3 = __core__fstPair(__core__headList__safe(map_13));\n                __core__ifThenElse(\n                    fn_16(item_3),\n                    () -> {\n                        item_3\n                    },\n                    () -> {\n                        recurse_58(recurse_58, __core__tailList__safe(map_13))\n                    }\n                )()\n            })()\n        };\n        recurse_59(recurse_59, self_80)\n    };\n    __module__StellarHeliosHelpers__mustFindInputRedeemer = (txInput) -> {\n        targetId = __core__headList(__core__sndPair(__core__unConstrData(txInput)));\n        redeemers = __helios__tx__redeemers(__helios__scriptcontext__tx);\n        spendsExpectedInput = __helios__map[__helios__scriptpurpose@__helios__data]__find_key(redeemers, (purpose) -> {\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(__core__unConstrData(purpose)), 1),\n                () -> {\n                    (sp) -> {\n                        __core__equalsData(__core__headList(__core__sndPair(__core__unConstrData(sp))), targetId)\n                    }\n                },\n                () -> {\n                    (__1) -> {\n                        false\n                    }\n                }\n            )()(purpose)\n        });\n        __helios__common__map_get(redeemers, spendsExpectedInput, (x_2) -> {\n            x_2\n        }, () -> {\n            error()\n        })\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput = (self_93, mph_11) -> {\n        (uut) -> {\n            (strategy) -> {\n                validatorHash = __core__headList(__core__tailList(__core__tailList(self_93)));\n                __core__chooseUnit(__core__ifThenElse(\n                    __core__lessThanInteger(__core__lengthOfByteString(__core__encodeUtf8(strategy)), 4),\n                    () -> {\n                        error()\n                    },\n                    () -> {\n                        ()\n                    }\n                )(), v = __module__StellarHeliosHelpers__mkTv(mph_11, uut);\n                hasDelegate = __core__ifThenElse(\n                    __core__equalsInteger(__core__fstPair(__core__unConstrData(validatorHash)), 0),\n                    () -> {\n                        (__lhs_0_9) -> {\n                            vh_3 = __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(__lhs_0_9))));\n                            __helios__value____geq((outputs) -> {\n                                __helios__common__fold(outputs, (prev_2, txOutput) -> {\n                                    __helios__value____add(prev_2, __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(txOutput))))))\n                                }, __core__mkNilPairData(()))\n                            }(self_70 = __core__unListData(__core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))))));\n                            __helios__common__filter(self_70, (output) -> {\n                                (credential) -> {\n                                    __core__ifThenElse(\n                                        __core__equalsInteger(__core__fstPair(__core__unConstrData(credential)), 1),\n                                        () -> {\n                                            __core__equalsByteString(vh_3, self_73 = __helios__common__assert_constr_index(credential, 1);\n                                            __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(self_73)))))\n                                        },\n                                        () -> {\n                                            false\n                                        }\n                                    )()\n                                }(self_6 = __core__headList(__core__sndPair(__core__unConstrData(output)));\n                                __core__headList(__core__sndPair(__core__unConstrData(self_6))))\n                            })), v)\n                        }\n                    },\n                    () -> {\n                        (__lhs_0_6) -> {\n                            (__cond_5) -> {\n                                __core__ifThenElse(\n                                    __core__equalsInteger(__core__fstPair(__core__unConstrData(__cond_5)), 0),\n                                    () -> {\n                                        (__lhs_0_8) -> {\n                                            true\n                                        }\n                                    },\n                                    () -> {\n                                        (__lhs_0_7) -> {\n                                            false\n                                        }\n                                    }\n                                )()(__cond_5)\n                            }(self_92 = __core__unListData(__core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))))));\n                            __helios__common__find_safe(self_92, (o) -> {\n                                __helios__value____geq(__core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(o))))), v)\n                            }))\n                        }\n                    }\n                )()(validatorHash);\n                __core__chooseUnit(__core__ifThenElse(\n                    __core__ifThenElse(\n                        __core__ifThenElse(\n                            hasDelegate,\n                            false,\n                            true\n                        ),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            false\n                        }\n                    )(),\n                    () -> {\n                        error()\n                    },\n                    () -> {\n                        ()\n                    }\n                )(), hasDelegate))\n            }(d = __core__headList(__core__tailList(self_93));\n            __core__decodeUtf8(__core__unBData(d)))\n        }(d = __core__headList(self_93);\n        __core__decodeUtf8(__core__unBData(d)))\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink = (self_99) -> {\n        __core__unListData(__core__headList(__core__tailList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(self_99)))))))\n    };\n    __module__CapoHelpers__DelegateInput[]__requiresValidOutput = (self_108) -> {\n        __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(__core__unListData(__core__headList(self_108)), __core__unBData(__core__headList(__core__tailList(__core__tailList(self_108)))))\n    };\n    __module__CapoMintHelpers__hasSeedUtxo = (tx, seedUtxo) -> {\n        __core__chooseUnit(__core__ifThenElse(\n            b_1 = __helios__common__any(__core__unListData(__core__headList(__core__sndPair(__core__unConstrData(tx)))), (input_1) -> {\n                __core__equalsData(__core__headList(__core__sndPair(__core__unConstrData(input_1))), seedUtxo)\n            });\n            __core__ifThenElse(\n                b_1,\n                false,\n                true\n            ),\n            () -> {\n                error()\n            },\n            () -> {\n                ()\n            }\n        )(), true)\n    };\n    __module__CapoMintHelpers__mkUutTnFactory = (seed) -> {\n        seedTxId = __core__headList(__core__sndPair(__core__unConstrData(seed)));\n        seedIdx = __core__unIData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(seed)))));\n        idxBytes = __core__serialiseData(__core__iData(seedIdx));\n        rawTxId = __core__sliceByteString(5, 32, __core__serialiseData(seedTxId));\n        txoInfo = __core__ifThenElse(\n            __core__ifThenElse(\n                __core__lessThanEqualsInteger(__core__lengthOfByteString(idxBytes), 9),\n                false,\n                true\n            ),\n            () -> {\n                error()\n            },\n            () -> {\n                __core__appendByteString(__core__appendByteString(rawTxId, #40), idxBytes)\n            }\n        )();\n        mhs = __helios__bytearray__show(__core__sliceByteString(0, 6, __core__blake2b_256(txoInfo)))();\n        (p) -> {\n            __core__appendString(__core__appendString(p, \"-\"), mhs)\n        }\n    };\n    __helios__map[__helios__bytearray@__helios__int]__for_each = (self_122, fn_23) -> {\n        recurse_67 = (recurse_66, map_17) -> {\n            __core__chooseList(map_17, () -> {\n                ()\n            }, () -> {\n                head_11 = __core__headList__safe(map_17);\n                __core__chooseUnit(fn_23(__core__unBData(__core__fstPair(head_11)), __core__unIData(__core__sndPair(head_11))), recurse_66(recurse_66, __core__tailList__safe(map_17)))\n            })()\n        };\n        recurse_67(recurse_67, self_122)\n    };\n    __module__CapoMintHelpers__validateUutMinting = (mph_20, seed_1, purposes, mkTokenName, __useopt__bootstrapCharter, bootstrapCharter, __useopt__otherMintedValue, otherMintedValue, __useopt__needsMintDelegateApproval, needsMintDelegateApproval) -> {\n        bootstrapCharter_1 = __core__ifThenElse(\n            __useopt__bootstrapCharter,\n            () -> {\n                bootstrapCharter\n            },\n            () -> {\n                __core__mkNilPairData(())\n            }\n        )();\n        otherMintedValue_1 = __core__ifThenElse(\n            __useopt__otherMintedValue,\n            () -> {\n                otherMintedValue\n            },\n            () -> {\n                __core__mkNilPairData(())\n            }\n        )();\n        needsMintDelegateApproval_1 = __core__ifThenElse(\n            __useopt__needsMintDelegateApproval,\n            () -> {\n                needsMintDelegateApproval\n            },\n            () -> {\n                true\n            }\n        )();\n        (isBootstrapping) -> {\n            delegateApproval = __core__ifThenElse(\n                isBootstrapping,\n                () -> {\n                    true\n                },\n                () -> {\n                    __lhs_0_56 = __helios__common__assert_constr_index(refInputs_1 = __core__unListData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx)))));\n                    chVal_1 = __module__StellarHeliosHelpers__mkTv(mph_20, \"charter\");\n                    hasCharter_1 = (txin_1) -> {\n                        __helios__value____geq(self_17 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(txin_1))));\n                        __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_17))))), chVal_1)\n                    };\n                    (charterUtxo_1) -> {\n                        __helios__common__assert_constr_index(data_39 = __helios__txoutputdatum__inline(self_14 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(charterUtxo_1))));\n                        __core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(self_14))))));\n                        __helios__common__assert_constr_index(data_39, 0), 0)\n                    }(__cond_8 = __helios__common__find_safe(refInputs_1, hasCharter_1);\n                    __core__ifThenElse(\n                        __core__equalsInteger(__core__fstPair(__core__unConstrData(__cond_8)), 0),\n                        () -> {\n                            (self_6) -> {\n                                __core__headList(__core__sndPair(__core__unConstrData(self_6)))\n                            }\n                        },\n                        () -> {\n                            (__lhs_0_15) -> {\n                                (__cond_9) -> {\n                                    __core__ifThenElse(\n                                        __core__equalsInteger(__core__fstPair(__core__unConstrData(__cond_9)), 0),\n                                        () -> {\n                                            (self_6) -> {\n                                                __core__headList(__core__sndPair(__core__unConstrData(self_6)))\n                                            }\n                                        },\n                                        () -> {\n                                            (__lhs_0_16) -> {\n                                                error()\n                                            }\n                                        }\n                                    )()(__cond_9)\n                                }(self_89 = __core__unListData(__core__headList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))));\n                                __helios__common__find_safe(self_89, hasCharter_1))\n                            }\n                        }\n                    )()(__cond_8)), 0);\n                    mintDgt = __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink(__lhs_0_56);\n                    __core__ifThenElse(\n                        needsMintDelegateApproval_1,\n                        () -> {\n                            authzVal = __helios__value__new(__helios__assetclass__new(mph_20, __core__encodeUtf8(d = __core__headList(mintDgt);\n                            __core__decodeUtf8(__core__unBData(d)))), 1);\n                            __core__chooseUnit((msg_2) -> {\n                                ()\n                            }(d = __core__headList(mintDgt);\n                            __core__decodeUtf8(__core__unBData(d))), (targetId_1) -> {\n                                spendsAuthorityUut = __helios__map[__helios__scriptpurpose@__helios__data]__find_key(__helios__tx__redeemers(__helios__scriptcontext__tx), (purpose_1) -> {\n                                    __core__ifThenElse(\n                                        __core__equalsInteger(__core__fstPair(__core__unConstrData(purpose_1)), 1),\n                                        () -> {\n                                            (sp_1) -> {\n                                                __core__equalsData(__core__headList(__core__sndPair(__core__unConstrData(sp_1))), targetId_1)\n                                            }\n                                        },\n                                        () -> {\n                                            (__9) -> {\n                                                false\n                                            }\n                                        }\n                                    )()(purpose_1)\n                                });\n                                err = __core__appendString(__core__appendString(\"dgTkn \", d = __core__headList(mintDgt);\n                                __core__decodeUtf8(__core__unBData(d))), \" not being spent as expected\");\n                                (__cond_15) -> {\n                                    __core__ifThenElse(\n                                        __core__equalsInteger(__core__fstPair(__core__unConstrData(__cond_15)), 1),\n                                        () -> {\n                                            (__lhs_0_33) -> {\n                                                error()\n                                            }\n                                        },\n                                        () -> {\n                                            (__lhs_0_28) -> {\n                                                x_5 = __core__headList(__core__sndPair(__core__unConstrData(__lhs_0_28)));\n                                                __core__ifThenElse(\n                                                    __core__chooseData(x_5, () -> {\n                                                        true\n                                                    }, () -> {\n                                                        false\n                                                    }, () -> {\n                                                        false\n                                                    }, () -> {\n                                                        false\n                                                    }, () -> {\n                                                        false\n                                                    })(),\n                                                    () -> {\n                                                        (__lhs_0_29) -> {\n                                                            __common8 = __core__unConstrData(__lhs_0_29);\n                                                            fields_11 = __core__sndPair(__common8);\n                                                            __common9 = __core__listData(fields_11);\n                                                            __core__ifThenElse(\n                                                                __core__equalsData(__common9, __common9),\n                                                                () -> {\n                                                                    __core__ifThenElse(\n                                                                        __core__equalsInteger(0, __core__fstPair(__common8)),\n                                                                        () -> {\n                                                                            dgtActivity = __core__headList(fields_11);\n                                                                            __common18 = __core__unConstrData(dgtActivity);\n                                                                            __common19 = __core__fstPair(__common18);\n                                                                            __core__ifThenElse(\n                                                                                __core__equalsInteger(__common19, 0),\n                                                                                () -> {\n                                                                                    (__lhs_0_32) -> {\n                                                                                        true\n                                                                                    }\n                                                                                },\n                                                                                () -> {\n                                                                                    __core__ifThenElse(\n                                                                                        __core__equalsInteger(__common19, 1),\n                                                                                        () -> {\n                                                                                            (__lhs_0_31) -> {\n                                                                                                error()\n                                                                                            }\n                                                                                        },\n                                                                                        () -> {\n                                                                                            (__lhs_0_30) -> {\n                                                                                                error()\n                                                                                            }\n                                                                                        }\n                                                                                    )()\n                                                                                }\n                                                                            )()(dgtActivity)\n                                                                        },\n                                                                        () -> {\n                                                                            true\n                                                                        }\n                                                                    )()\n                                                                },\n                                                                () -> {\n                                                                    false\n                                                                }\n                                                            )()\n                                                        }\n                                                    },\n                                                    () -> {\n                                                        (__10) -> {\n                                                            error()\n                                                        }\n                                                    }\n                                                )()(x_5)\n                                            }\n                                        }\n                                    )()(__cond_15)\n                                }(self_119 = __helios__tx__redeemers(__helios__scriptcontext__tx);\n                                __helios__common__map_get(self_119, spendsAuthorityUut, (x_3) -> {\n                                    __core__constrData(0, __core__mkCons(x_3, __core__mkNilData(())))\n                                }, () -> {\n                                    __core__constrData(1, __core__mkNilData(()))\n                                }))\n                            }((__cond_13) -> {\n                                __core__ifThenElse(\n                                    __core__equalsInteger(__core__fstPair(__core__unConstrData(__cond_13)), 0),\n                                    () -> {\n                                        (__lhs_0_27) -> {\n                                            self_6 = __core__headList(__core__sndPair(__core__unConstrData(__lhs_0_27)));\n                                            __core__headList(__core__sndPair(__core__unConstrData(self_6)))\n                                        }\n                                    },\n                                    () -> {\n                                        (__lhs_0_26) -> {\n                                            error()\n                                        }\n                                    }\n                                )()(__cond_13)\n                            }(self_89 = __core__unListData(__core__headList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))));\n                            __helios__common__find_safe(self_89, (i_7) -> {\n                                __helios__value____geq(self_17 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(i_7))));\n                                __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_17))))), authzVal)\n                            }))))\n                        },\n                        () -> {\n                            true\n                        }\n                    )()\n                }\n            )();\n            expectedValue = __helios__value____add(__helios__value____add(bootstrapCharter_1, otherMintedValue_1), self_127 = __helios__common__map(recurse_41 = (recurse_40, lst_7) -> {\n                __core__chooseList(lst_7, () -> {\n                    __core__mkNilData(())\n                }, () -> {\n                    x_1 = __core__headList__safe(lst_7);\n                    lst_5 = recurse_40(recurse_40, __core__tailList__safe(lst_7));\n                    __core__chooseList(lst_5, () -> {\n                        __core__mkCons(x_1, __core__mkNilData(()))\n                    }, () -> {\n                        __core__mkCons(x_1, lst_5)\n                    })()\n                })()\n            };\n            recurse_41(recurse_41, purposes), (item_11) -> {\n                __core__mapData(purpose_2 = __core__decodeUtf8(__core__unBData(item_11));\n                __module__StellarHeliosHelpers__mkTv(mph_20, mkTokenName(purpose_2)))\n            });\n            recurse_69 = (recurse_68, lst_16) -> {\n                __core__chooseList(lst_16, () -> {\n                    __core__mkNilPairData(())\n                }, () -> {\n                    __helios__value____add(__core__unMapData(__core__headList__safe(lst_16)), recurse_68(recurse_68, __core__tailList__safe(lst_16)))\n                })()\n            };\n            recurse_69(recurse_69, self_127));\n            __core__chooseUnit(__core__ifThenElse(\n                __core__ifThenElse(\n                    mph_4 = __core__bData(mph_20);\n                    recurse_25 = (recurse_24, map_7) -> {\n                        __core__chooseList(map_7, () -> {\n                            false\n                        }, () -> {\n                            __core__ifThenElse(\n                                __core__equalsData(__core__fstPair(__core__headList__safe(map_7)), mph_4),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    recurse_24(recurse_24, __core__tailList__safe(map_7))\n                                }\n                            )()\n                        })()\n                    };\n                    recurse_25(recurse_25, __common6),\n                    false,\n                    true\n                ),\n                () -> {\n                    error()\n                },\n                () -> {\n                    ()\n                }\n            )(), __core__chooseUnit(msg_2 = __core__appendString(__core__appendString(__core__appendString(__core__appendString(\"\n  -- uut-minting seed: \", self_32 = __core__headList(__core__sndPair(__core__unConstrData(seed_1)));\n            __helios__bytearray__show(__core__unBData(__core__headList(__core__sndPair(__core__unConstrData(self_32)))))()), \"🔹#\"), __helios__int__show(__core__unIData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(seed_1))))))), \"\n\");\n            (), __core__chooseUnit(__helios__map[__helios__bytearray@__helios__int]__for_each(__helios__value__get_policy(expectedValue, mph_20), (b_19, i_10) -> {\n                msg_2 = __core__appendString(__core__appendString(__core__appendString(__core__appendString(\"    ℹ️ 🐞 expected: \", __helios__int__show(i_10)), \"x \"), __core__decodeUtf8(b_19)), \"\n\");\n                ()\n            }), actualMint = __helios__value__get_policy(__common6, mph_20);\n            __core__chooseUnit(__core__chooseUnit(__helios__map[__helios__bytearray@__helios__int]__for_each(actualMint, (b_18, i_9) -> {\n                msg_2 = __core__appendString(__core__appendString(__core__appendString(__core__appendString(\"    ℹ️ 🐞   actual: \", __helios__int__show(i_9)), \"x \"), __core__decodeUtf8(b_18)), \"\n\");\n                ()\n            }), (msg_2) -> {\n                ()\n            }(self_30 = __helios__common__filter(__common6, (pair_6) -> {\n                (b_17, __11) -> {\n                    __core__ifThenElse(\n                        __core__equalsByteString(b_17, mph_20),\n                        false,\n                        true\n                    )\n                }(__core__unBData(__core__fstPair(pair_6)), __core__unMapData(__core__sndPair(pair_6)))\n            });\n            __helios__common__fold(self_30, (prev, pair_1) -> {\n                mph_5 = __core__unBData__safe(__core__fstPair(pair_1));\n                __helios__common__fold(__core__unMapData__safe(__core__sndPair(pair_1)), (prev_1, pair_2) -> {\n                    token_name_1 = __core__unBData__safe(__core__fstPair(pair_2));\n                    qty = __core__unIData__safe(__core__sndPair(pair_2));\n                    __core__appendString(prev_1, __core__ifThenElse(\n                        __core__equalsByteString(mph_5, #),\n                        () -> {\n                            __core__appendString(\"lovelace: \", __core__appendString(__helios__int__show(qty), \"\n\"))\n                        },\n                        () -> {\n                            __core__appendString(__helios__bytearray__show(mph_5)(), __core__appendString(\".\", __core__appendString(__helios__bytearray__show(token_name_1)(), __core__appendString(\": \", __core__appendString(__helios__int__show(qty), \"\n\")))))\n                        }\n                    )())\n                }, prev)\n            }, \"\"))), temp = __helios__common__fold(actualMint, (z_3, pair_8) -> {\n                (b_16, i_8) -> {\n                    __cond_22 = __helios__common__find_safe(z_3, (item_10) -> {\n                        x_6 = __core__unBData(item_10);\n                        __core__equalsByteString(x_6, b_16)\n                    });\n                    __core__ifThenElse(\n                        __core__equalsInteger(__core__fstPair(__core__unConstrData(__cond_22)), 1),\n                        () -> {\n                            (__lhs_0_58) -> {\n                                __core__mkCons(__core__bData(b_16), z_3)\n                            }\n                        },\n                        () -> {\n                            (__lhs_0_57) -> {\n                                error()\n                            }\n                        }\n                    )()(__cond_22)\n                }(__core__unBData(__core__fstPair(pair_8)), __core__unIData(__core__sndPair(pair_8)))\n            }, __core__mkNilData(()));\n            expectationsMet = __helios__value__compare(__common6, expectedValue, __core__equalsInteger);\n            __core__chooseUnit(__core__ifThenElse(\n                expectationsMet,\n                () -> {\n                    ()\n                },\n                () -> {\n                    error()\n                }\n            )(), __core__chooseUnit(cond = __module__CapoMintHelpers__hasSeedUtxo(__helios__scriptcontext__tx, seed_1);\n            (), __core__ifThenElse(\n                delegateApproval,\n                () -> {\n                    expectationsMet\n                },\n                () -> {\n                    false\n                }\n            )()))))))\n        }((b_1) -> {\n            __core__ifThenElse(\n                b_1,\n                false,\n                true\n            )\n        }(recurse_37 = (recurse_36, map_9) -> {\n            __core__chooseList(map_9, () -> {\n                true\n            }, () -> {\n                __core__ifThenElse(\n                    tokens_1 = __core__unMapData(__core__sndPair(__core__headList__safe(map_9)));\n                    recurse_35 = (recurse_34, tokens_2) -> {\n                        __core__chooseList(tokens_2, () -> {\n                            true\n                        }, () -> {\n                            __core__ifThenElse(\n                                __core__equalsInteger(__core__unIData(__core__sndPair(__core__headList__safe(tokens_2))), 0),\n                                () -> {\n                                    recurse_34(recurse_34, __core__tailList__safe(tokens_2))\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    };\n                    recurse_35(recurse_35, tokens_1),\n                    () -> {\n                        recurse_36(recurse_36, __core__tailList__safe(map_9))\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_37(recurse_37, bootstrapCharter_1)))\n    };\n    __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex = (mph_21, purpose_3, seed_2, charterRedeemerIndex, __useopt__otherMintedValue_1, otherMintedValue_2, __useopt__needsMintDelegateApproval_1) -> {\n        otherMintedValue_3 = __core__ifThenElse(\n            __useopt__otherMintedValue_1,\n            () -> {\n                otherMintedValue_2\n            },\n            () -> {\n                __core__mkNilPairData(())\n            }\n        )();\n        needsMintDelegateApproval_3 = __core__ifThenElse(\n            __useopt__needsMintDelegateApproval_1,\n            () -> {\n                false\n            },\n            () -> {\n                true\n            }\n        )();\n        chVal_2 = __module__StellarHeliosHelpers__mkTv(mph_21, \"charter\");\n        (charterInput) -> {\n            charterRedeemer = __module__StellarHeliosHelpers__mustFindInputRedeemer(charterInput);\n            __core__ifThenElse(\n                __core__ifThenElse(\n                    __core__ifThenElse(\n                        __core__chooseData(charterRedeemer, () -> {\n                            true\n                        }, () -> {\n                            false\n                        }, () -> {\n                            false\n                        }, () -> {\n                            false\n                        }, () -> {\n                            false\n                        })(),\n                        () -> {\n                            (__lhs_0_59) -> {\n                                index_7 = __core__fstPair(__core__unConstrData(__lhs_0_59));\n                                __core__ifThenElse(\n                                    __core__equalsInteger(index_7, charterRedeemerIndex),\n                                    () -> {\n                                        true\n                                    },\n                                    () -> {\n                                        error()\n                                    }\n                                )()\n                            }\n                        },\n                        () -> {\n                            (__12) -> {\n                                error()\n                            }\n                        }\n                    )()(charterRedeemer),\n                    () -> {\n                        __module__CapoMintHelpers__validateUutMinting(mph_21, seed_2, __core__mkCons(__core__bData(__core__encodeUtf8(purpose_3)), __core__mkNilData(())), __module__CapoMintHelpers__mkUutTnFactory(seed_2), false, (), true, otherMintedValue_3, true, needsMintDelegateApproval_3)\n                    },\n                    () -> {\n                        false\n                    }\n                )(),\n                () -> {\n                    true\n                },\n                () -> {\n                    false\n                }\n            )()\n        }(self_130 = __core__unListData(__core__headList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))));\n        recurse_71 = (recurse_70, lst_17) -> {\n            __core__chooseList(lst_17, () -> {\n                error()\n            }, () -> {\n                item_12 = __core__headList__safe(lst_17);\n                __core__ifThenElse(\n                    __helios__value____geq(self_17 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(item_12))));\n                    __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_17))))), chVal_2),\n                    () -> {\n                        item_12\n                    },\n                    () -> {\n                        recurse_70(recurse_70, __core__tailList__safe(lst_17))\n                    }\n                )()\n            })()\n        };\n        recurse_71(recurse_71, self_130))\n    };\n    __core__ifThenElse(\n        __core__ifThenElse(\n            __core__equalsInteger(__common7, 0),\n            () -> {\n                (charter_2) -> {\n                    charterVal = __module__StellarHeliosHelpers__mkTv(__common4, \"charter\");\n                    __core__chooseUnit(cond = __helios__value____geq(__common6, charterVal);\n                    __core__ifThenElse(\n                        cond,\n                        () -> {\n                            ()\n                        },\n                        () -> {\n                            error()\n                        }\n                    )(), hasSeed = __module__CapoMintHelpers__hasSeedUtxo(__helios__scriptcontext__tx, __core__constrData(0, __core__mkCons(__core__constrData(0, __core__mkCons(__core__bData(#0000000000000000000000000000000000000000000000000000000000000000), __core__mkNilData(()))), __core__mkCons(__core__iData(0), __core__mkNilData(())))));\n                    mintsUuts = __module__CapoMintHelpers__validateUutMinting(__common4, __core__constrData(0, __core__mkCons(__core__constrData(0, __core__mkCons(__core__bData(#0000000000000000000000000000000000000000000000000000000000000000), __core__mkNilData(()))), __core__mkCons(__core__iData(0), __core__mkNilData(())))), __core__mkCons(__core__bData(#6361706f476f76), __core__mkCons(__core__bData(#6d696e74446774), __core__mkCons(__core__bData(#7370656e64446774), __core__mkNilData(())))), __module__CapoMintHelpers__mkUutTnFactory(__core__constrData(0, __core__mkCons(__core__constrData(0, __core__mkCons(__core__bData(#0000000000000000000000000000000000000000000000000000000000000000), __core__mkNilData(()))), __core__mkCons(__core__iData(0), __core__mkNilData(()))))), true, charterVal, false, (), false, ());\n                    (charterOutput) -> {\n                        charterData = __helios__txoutputdatum__inline(__core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(charterOutput))))));\n                        charterDatum = __helios__common__assert_constr_index(charterData, 0);\n                        __lhs_0_67 = __helios__common__assert_constr_index(charterDatum, 0);\n                        __common28 = __core__unConstrData(__lhs_0_67);\n                        __common29 = __core__sndPair(__common28);\n                        __common30 = __core__tailList(__common29);\n                        spendDgt = __core__unListData(__core__headList(__common29));\n                        spendInvariants = __core__unListData(__core__headList(__common30));\n                        namedDelegates = __core__unMapData(__core__headList(__core__tailList(__common30)));\n                        mintDgt_1 = __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink(__lhs_0_67);\n                        mintInvariants = __core__unListData(__helios__common__enum_field_4(__lhs_0_67));\n                        authDgt = __core__unListData(__core__headList(__helios__common__enum_fields_after_4(__lhs_0_67)));\n                        __core__chooseUnit(__core__ifThenElse(\n                            __core__equalsInteger(__helios__common__length(mintInvariants), 0),\n                            () -> {\n                                ()\n                            },\n                            () -> {\n                                error()\n                            }\n                        )(), __core__chooseUnit(__core__ifThenElse(\n                            __core__equalsInteger(__helios__common__length(spendInvariants), 0),\n                            () -> {\n                                ()\n                            },\n                            () -> {\n                                error()\n                            }\n                        )(), __core__chooseUnit(__core__ifThenElse(\n                            __core__equalsInteger(__helios__common__length(namedDelegates), 0),\n                            () -> {\n                                ()\n                            },\n                            () -> {\n                                error()\n                            }\n                        )(), hasGoodDelegates = __core__ifThenElse(\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(authDgt, __common4),\n                                () -> {\n                                    __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(mintDgt_1, __common4)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )(),\n                            () -> {\n                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(spendDgt, __common4)\n                            },\n                            () -> {\n                                false\n                            }\n                        )();\n                        __core__ifThenElse(\n                            __core__ifThenElse(\n                                hasGoodDelegates,\n                                () -> {\n                                    mintsUuts\n                                },\n                                () -> {\n                                    false\n                                }\n                            )(),\n                            () -> {\n                                true\n                            },\n                            () -> {\n                                false\n                            }\n                        )())))\n                    }(self_78 = __core__unListData(__core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))))));\n                    recurse_55 = (recurse_54, lst_9) -> {\n                        __core__chooseList(lst_9, () -> {\n                            error()\n                        }, () -> {\n                            item_2 = __core__headList__safe(lst_9);\n                            __core__ifThenElse(\n                                __core__ifThenElse(\n                                    __core__equalsData(__core__headList(__core__sndPair(__core__unConstrData(item_2))), __core__headList(__core__sndPair(__core__unConstrData(charter_2)))),\n                                    () -> {\n                                        __helios__value____geq(__core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(item_2))))), charterVal)\n                                    },\n                                    () -> {\n                                        false\n                                    }\n                                )(),\n                                () -> {\n                                    item_2\n                                },\n                                () -> {\n                                    recurse_54(recurse_54, __core__tailList__safe(lst_9))\n                                }\n                            )()\n                        })()\n                    };\n                    recurse_55(recurse_55, self_78)))\n                }\n            },\n            () -> {\n                __core__ifThenElse(\n                    __core__equalsInteger(__common7, 1),\n                    () -> {\n                        __common15 = __core__unConstrData(__helios__scriptcontext__tx);\n                        __common16 = __core__sndPair(__common15);\n                        (__lhs_0_66) -> {\n                            (cctx) -> {\n                                (mintDgtInput) -> {\n                                    mintDgtActivity = __module__StellarHeliosHelpers__mustFindInputRedeemer(self_6 = __core__headList(__core__tailList(mintDgtInput));\n                                    __core__headList(__core__sndPair(__core__unConstrData(self_6))));\n                                    __common25 = __core__fstPair(__core__unConstrData(mintDgtActivity));\n                                    __core__ifThenElse(\n                                        __core__equalsInteger(__common25, 0),\n                                        () -> {\n                                            (__lhs_0_54) -> {\n                                                CLA = __core__headList(__core__sndPair(__core__unConstrData(__lhs_0_54)));\n                                                __core__ifThenElse(\n                                                    __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput),\n                                                    () -> {\n                                                        true\n                                                    },\n                                                    () -> {\n                                                        false\n                                                    }\n                                                )()\n                                            }\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __core__equalsInteger(__common25, 2),\n                                                () -> {\n                                                    (__lhs_0_53) -> {\n                                                        error()\n                                                    }\n                                                },\n                                                () -> {\n                                                    __core__ifThenElse(\n                                                        __core__equalsInteger(__common25, 1),\n                                                        () -> {\n                                                            (__lhs_0_49) -> {\n                                                                DLA = __core__headList(__core__sndPair(__core__unConstrData(__lhs_0_49)));\n                                                                __common26 = __core__unConstrData(DLA);\n                                                                __common27 = __core__fstPair(__common26);\n                                                                __core__ifThenElse(\n                                                                    __core__equalsInteger(__common27, 0),\n                                                                    () -> {\n                                                                        (__lhs_0_52) -> {\n                                                                            true\n                                                                        }\n                                                                    },\n                                                                    () -> {\n                                                                        __core__ifThenElse(\n                                                                            __core__equalsInteger(__common27, 1),\n                                                                            () -> {\n                                                                                (__lhs_0_51) -> {\n                                                                                    error()\n                                                                                }\n                                                                            },\n                                                                            () -> {\n                                                                                (__lhs_0_50) -> {\n                                                                                    error()\n                                                                                }\n                                                                            }\n                                                                        )()\n                                                                    }\n                                                                )()(DLA)\n                                                            }\n                                                        },\n                                                        () -> {\n                                                            __core__ifThenElse(\n                                                                __core__equalsInteger(__common25, 3),\n                                                                () -> {\n                                                                    (__lhs_0_48) -> {\n                                                                        __core__ifThenElse(\n                                                                            __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput),\n                                                                            () -> {\n                                                                                true\n                                                                            },\n                                                                            () -> {\n                                                                                false\n                                                                            }\n                                                                        )()\n                                                                    }\n                                                                },\n                                                                () -> {\n                                                                    __core__ifThenElse(\n                                                                        __core__equalsInteger(__common25, 4),\n                                                                        () -> {\n                                                                            (__lhs_0_47) -> {\n                                                                                __core__ifThenElse(\n                                                                                    __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput),\n                                                                                    () -> {\n                                                                                        true\n                                                                                    },\n                                                                                    () -> {\n                                                                                        false\n                                                                                    }\n                                                                                )()\n                                                                            }\n                                                                        },\n                                                                        () -> {\n                                                                            __core__ifThenElse(\n                                                                                __core__equalsInteger(__common25, 5),\n                                                                                () -> {\n                                                                                    (__lhs_0_46) -> {\n                                                                                        __core__ifThenElse(\n                                                                                            __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput),\n                                                                                            () -> {\n                                                                                                true\n                                                                                            },\n                                                                                            () -> {\n                                                                                                false\n                                                                                            }\n                                                                                        )()\n                                                                                    }\n                                                                                },\n                                                                                () -> {\n                                                                                    __core__ifThenElse(\n                                                                                        __core__equalsInteger(__common25, 7),\n                                                                                        () -> {\n                                                                                            (__lhs_0_45) -> {\n                                                                                                __core__ifThenElse(\n                                                                                                    __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput),\n                                                                                                    () -> {\n                                                                                                        true\n                                                                                                    },\n                                                                                                    () -> {\n                                                                                                        false\n                                                                                                    }\n                                                                                                )()\n                                                                                            }\n                                                                                        },\n                                                                                        () -> {\n                                                                                            __core__ifThenElse(\n                                                                                                __core__equalsInteger(__common25, 6),\n                                                                                                () -> {\n                                                                                                    (__lhs_0_44) -> {\n                                                                                                        error()\n                                                                                                    }\n                                                                                                },\n                                                                                                () -> {\n                                                                                                    (__lhs_0_34) -> {\n                                                                                                        ma = __core__unListData(__core__headList(__core__sndPair(__core__unConstrData(__lhs_0_34))));\n                                                                                                        __core__ifThenElse(\n                                                                                                            __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput),\n                                                                                                            () -> {\n                                                                                                                recurse_47 = (recurse_46, self_49, fn_9) -> {\n                                                                                                                    __core__chooseList(self_49, () -> {\n                                                                                                                        true\n                                                                                                                    }, () -> {\n                                                                                                                        __core__ifThenElse(\n                                                                                                                            fn_9(__core__headList__safe(self_49)),\n                                                                                                                            () -> {\n                                                                                                                                recurse_46(recurse_46, __core__tailList__safe(self_49), fn_9)\n                                                                                                                            },\n                                                                                                                            () -> {\n                                                                                                                                false\n                                                                                                                            }\n                                                                                                                        )()\n                                                                                                                    })()\n                                                                                                                };\n                                                                                                                recurse_47(recurse_47, __helios__common__map(ma, (item_8) -> {\n                                                                                                                    item_8\n                                                                                                                }), (mintDgtActivity_1) -> {\n                                                                                                                    __core__ifThenElse(\n                                                                                                                        __core__equalsInteger(__core__fstPair(__core__unConstrData(mintDgtActivity_1)), 5),\n                                                                                                                        () -> {\n                                                                                                                            (__lhs_0_43) -> {\n                                                                                                                                true\n                                                                                                                            }\n                                                                                                                        },\n                                                                                                                        () -> {\n                                                                                                                            __core__ifThenElse(\n                                                                                                                                __core__equalsInteger(__core__fstPair(__core__unConstrData(mintDgtActivity_1)), 7),\n                                                                                                                                () -> {\n                                                                                                                                    (__lhs_0_42) -> {\n                                                                                                                                        true\n                                                                                                                                    }\n                                                                                                                                },\n                                                                                                                                () -> {\n                                                                                                                                    __core__ifThenElse(\n                                                                                                                                        __core__equalsInteger(__core__fstPair(__core__unConstrData(mintDgtActivity_1)), 3),\n                                                                                                                                        () -> {\n                                                                                                                                            (__lhs_0_41) -> {\n                                                                                                                                                error()\n                                                                                                                                            }\n                                                                                                                                        },\n                                                                                                                                        () -> {\n                                                                                                                                            __core__ifThenElse(\n                                                                                                                                                __core__equalsInteger(__core__fstPair(__core__unConstrData(mintDgtActivity_1)), 4),\n                                                                                                                                                () -> {\n                                                                                                                                                    (__lhs_0_40) -> {\n                                                                                                                                                        error()\n                                                                                                                                                    }\n                                                                                                                                                },\n                                                                                                                                                () -> {\n                                                                                                                                                    __core__ifThenElse(\n                                                                                                                                                        __core__equalsInteger(__core__fstPair(__core__unConstrData(mintDgtActivity_1)), 8),\n                                                                                                                                                        () -> {\n                                                                                                                                                            (__lhs_0_39) -> {\n                                                                                                                                                                error()\n                                                                                                                                                            }\n                                                                                                                                                        },\n                                                                                                                                                        () -> {\n                                                                                                                                                            __core__ifThenElse(\n                                                                                                                                                                __core__equalsInteger(__core__fstPair(__core__unConstrData(mintDgtActivity_1)), 6),\n                                                                                                                                                                () -> {\n                                                                                                                                                                    (__lhs_0_38) -> {\n                                                                                                                                                                        error()\n                                                                                                                                                                    }\n                                                                                                                                                                },\n                                                                                                                                                                () -> {\n                                                                                                                                                                    __core__ifThenElse(\n                                                                                                                                                                        __core__equalsInteger(__core__fstPair(__core__unConstrData(mintDgtActivity_1)), 2),\n                                                                                                                                                                        () -> {\n                                                                                                                                                                            (__lhs_0_37) -> {\n                                                                                                                                                                                error()\n                                                                                                                                                                            }\n                                                                                                                                                                        },\n                                                                                                                                                                        () -> {\n                                                                                                                                                                            __core__ifThenElse(\n                                                                                                                                                                                __core__equalsInteger(__core__fstPair(__core__unConstrData(mintDgtActivity_1)), 0),\n                                                                                                                                                                                () -> {\n                                                                                                                                                                                    (__lhs_0_36) -> {\n                                                                                                                                                                                        error()\n                                                                                                                                                                                    }\n                                                                                                                                                                                },\n                                                                                                                                                                                () -> {\n                                                                                                                                                                                    (__lhs_0_35) -> {\n                                                                                                                                                                                        error()\n                                                                                                                                                                                    }\n                                                                                                                                                                                }\n                                                                                                                                                                            )()\n                                                                                                                                                                        }\n                                                                                                                                                                    )()\n                                                                                                                                                                }\n                                                                                                                                                            )()\n                                                                                                                                                        }\n                                                                                                                                                    )()\n                                                                                                                                                }\n                                                                                                                                            )()\n                                                                                                                                        }\n                                                                                                                                    )()\n                                                                                                                                }\n                                                                                                                            )()\n                                                                                                                        }\n                                                                                                                    )()(mintDgtActivity_1)\n                                                                                                                })\n                                                                                                            },\n                                                                                                            () -> {\n                                                                                                                false\n                                                                                                            }\n                                                                                                        )()\n                                                                                                    }\n                                                                                                }\n                                                                                            )()\n                                                                                        }\n                                                                                    )()\n                                                                                }\n                                                                            )()\n                                                                        }\n                                                                    )()\n                                                                }\n                                                            )()\n                                                        }\n                                                    )()\n                                                }\n                                            )()\n                                        }\n                                    )()(mintDgtActivity)\n                                }(dgtLink = __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink(__cond_11 = __core__headList(__core__tailList(cctx));\n                                __common22 = __core__fstPair(__core__unConstrData(__cond_11));\n                                __core__ifThenElse(\n                                    __core__equalsInteger(__common22, 1),\n                                    () -> {\n                                        (self_109) -> {\n                                            data_39 = __core__headList(__core__sndPair(__core__unConstrData(self_109)));\n                                            __helios__common__assert_constr_index(data_39, 0)\n                                        }\n                                    },\n                                    () -> {\n                                        __core__ifThenElse(\n                                            __core__equalsInteger(__common22, 2),\n                                            () -> {\n                                                (self_110) -> {\n                                                    data_39 = __core__headList(__core__sndPair(__core__unConstrData(self_110)));\n                                                    __helios__common__assert_constr_index(data_39, 0)\n                                                }\n                                            },\n                                            () -> {\n                                                (__8) -> {\n                                                    error()\n                                                }\n                                            }\n                                        )()\n                                    }\n                                )()(__cond_11));\n                                __common10 = __core__headList(cctx);\n                                __common11 = __core__unBData(__common10);\n                                (input) -> {\n                                    __core__mkCons(__core__listData(dgtLink), __core__mkCons(input, __core__mkCons(__core__bData(__common11), __core__mkNilData(()))))\n                                }(inputs = __core__unListData(__core__headList(__common16));\n                                __cond_1 = __core__headList(__core__tailList(__core__tailList(dgtLink)));\n                                __core__ifThenElse(\n                                    __core__equalsInteger(__core__fstPair(__core__unConstrData(__cond_1)), 1),\n                                    () -> {\n                                        (__lhs_0_2) -> {\n                                            error()\n                                        }\n                                    },\n                                    () -> {\n                                        __common12 = __core__headList(dgtLink);\n                                        __common23 = __core__unBData(__common12);\n                                        __common24 = __core__decodeUtf8(__common23);\n                                        (__lhs_0) -> {\n                                            vh_2 = __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(__lhs_0))));\n                                            needsAddrWithCred = __core__constrData(1, __core__mkCons(__core__bData(vh_2), __core__mkNilData(())));\n                                            expectedUut = __module__StellarHeliosHelpers__mkTv(__common11, __common24);\n                                            __cond_2 = __helios__common__find_safe(inputs, (i_5) -> {\n                                                __core__ifThenElse(\n                                                    __core__equalsData((self_6) -> {\n                                                        __core__headList(__core__sndPair(__core__unConstrData(self_6)))\n                                                    }(self_6 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(i_5))));\n                                                    __core__headList(__core__sndPair(__core__unConstrData(self_6)))), needsAddrWithCred),\n                                                    () -> {\n                                                        __helios__value____geq(self_17 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(i_5))));\n                                                        __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_17))))), expectedUut)\n                                                    },\n                                                    () -> {\n                                                        false\n                                                    }\n                                                )()\n                                            });\n                                            __core__ifThenElse(\n                                                __core__equalsInteger(__core__fstPair(__core__unConstrData(__cond_2)), 0),\n                                                () -> {\n                                                    (foundGood) -> {\n                                                        foundGood\n                                                    }\n                                                },\n                                                () -> {\n                                                    (__lhs_0_1) -> {\n                                                        error()\n                                                    }\n                                                }\n                                            )()(__cond_2)\n                                        }\n                                    }\n                                )()(__cond_1)))\n                            }(self_116 = __core__mkCons(__core__bData(__common4), __core__mkCons(__core__constrData(0, __core__mkNilData(())), __core__mkNilData(())));\n                            charter_1 = __core__headList(__core__tailList(self_116));\n                            __common20 = __core__unConstrData(charter_1);\n                            __common21 = __core__fstPair(__common20);\n                            __core__ifThenElse(\n                                __core__equalsInteger(__common21, 1),\n                                () -> {\n                                    (__lhs_0_25) -> {\n                                        self_116\n                                    }\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __core__equalsInteger(__common21, 2),\n                                        () -> {\n                                            (__lhs_0_24) -> {\n                                                error()\n                                            }\n                                        },\n                                        () -> {\n                                            (__lhs_0_22) -> {\n                                                mph_16 = __core__unBData(__core__headList(self_116));\n                                                (utxo_1) -> {\n                                                    datum_3 = __helios__common__assert_constr_index(data_39 = __helios__txoutputdatum__inline(self_14 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(utxo_1))));\n                                                    __core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(self_14))))));\n                                                    __helios__common__assert_constr_index(data_39, 0), 0);\n                                                    __core__mkCons(__core__bData(mph_16), __core__mkCons(__core__constrData(1, __core__mkCons(datum_3, __core__mkCons(utxo_1, __core__mkNilData(())))), __core__mkNilData(())))\n                                                }(chVal = __module__StellarHeliosHelpers__mkTv(mph_16, \"charter\");\n                                                (__cond_7) -> {\n                                                    __core__ifThenElse(\n                                                        __core__equalsInteger(__core__fstPair(__core__unConstrData(__cond_7)), 0),\n                                                        () -> {\n                                                            (self_6) -> {\n                                                                __core__headList(__core__sndPair(__core__unConstrData(self_6)))\n                                                            }\n                                                        },\n                                                        () -> {\n                                                            (__lhs_0_13) -> {\n                                                                error()\n                                                            }\n                                                        }\n                                                    )()(__cond_7)\n                                                }(self_89 = __core__unListData(__core__headList(__core__tailList(__common16)));\n                                                __helios__common__find_safe(self_89, (txin) -> {\n                                                    __helios__value____geq(self_17 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(txin))));\n                                                    __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_17))))), chVal)\n                                                })))\n                                            }\n                                        }\n                                    )()\n                                }\n                            )()(charter_1))\n                        }\n                    },\n                    () -> {\n                        __core__ifThenElse(\n                            __core__equalsInteger(__common7, 2),\n                            () -> {\n                                (__lhs_0_65) -> {\n                                    seed_6 = __core__headList(__core__sndPair(__core__unConstrData(__lhs_0_65)));\n                                    __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(__common4, \"mintInvar\", seed_6, 3, false, (), false)\n                                }\n                            },\n                            () -> {\n                                __core__ifThenElse(\n                                    __core__equalsInteger(__common7, 3),\n                                    () -> {\n                                        (__lhs_0_64) -> {\n                                            seed_5 = __core__headList(__core__sndPair(__core__unConstrData(__lhs_0_64)));\n                                            __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(__common4, \"spendInvar\", seed_5, 4, false, (), false)\n                                        }\n                                    },\n                                    () -> {\n                                        __core__ifThenElse(\n                                            __core__equalsInteger(__common7, 4),\n                                            () -> {\n                                                (__lhs_0_63) -> {\n                                                    seed_4 = __core__headList(__core__sndPair(__core__unConstrData(__lhs_0_63)));\n                                                    __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(__common4, \"mintDgt\", seed_4, 1, false, (), true)\n                                                }\n                                            },\n                                            () -> {\n                                                (__lhs_0_60) -> {\n                                                    __common17 = __core__sndPair(__core__unConstrData(__lhs_0_60));\n                                                    seed_3 = __core__headList(__common17);\n                                                    replaceExisting = __core__headList(__core__tailList(__common17));\n                                                    otherMintedValue_4 = __core__ifThenElse(\n                                                        __core__equalsInteger(__core__fstPair(__core__unConstrData(replaceExisting)), 0),\n                                                        () -> {\n                                                            (__lhs_0_62) -> {\n                                                                oldTokenName = __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(__lhs_0_62))));\n                                                                __helios__value__new(__helios__assetclass__new(__common4, oldTokenName), -1)\n                                                            }\n                                                        },\n                                                        () -> {\n                                                            (__lhs_0_61) -> {\n                                                                __core__mkNilPairData(())\n                                                            }\n                                                        }\n                                                    )()(replaceExisting);\n                                                    __module__CapoMintHelpers__mintsUutForCharterUsingRedeemerIndex(__common4, \"spendDgt\", seed_3, 1, true, otherMintedValue_4, true)\n                                                }\n                                            }\n                                        )()\n                                    }\n                                )()\n                            }\n                        )()\n                    }\n                )()\n            }\n        )()(__REDEEMER),\n        () -> {\n            ()\n        },\n        () -> {\n            error()\n        }\n    )()\n}"
    }

    const uplcProgram0 = compile(json.unoptimizedIR, {
        optimize: false,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })
    const uplcProgram1 = compile(json.unoptimizedIR, {
        optimize: true,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })

    const args = [
        new ConstrData(0, []).toCbor(),
        "d8799fd8799f9fd8799fd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa140a1401b000000028fa6ae00d87980d87a80ffffff809fd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa240a1401a00128bbc581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275a1546361706f476f762d65643930353863373663313601d87980d87a80ffd8799fd8799fd87a9f581cc809320d42ac95a8cc89a12374dfeac496caebb3388413a1225db010ffd87a80ffa240a1401a00179c1a581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275a1546d696e744467742d65643930353863373663313601d87b9fd87a9f9fd8799fd87a9f581c87f24430a20462a8cd9dd64dea3becb35802b2af778a209b1c35a9cdffd87a80ff581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275546d696e744467742d656439303538633736633136ffffffd87a80ffd8799fd8799fd87a9f581cb5f8f61599c1a60c004be3dfc72e8a7b4fe41e07e9e2fa4a1f15d25dffd87a80ffa240a1401a0017bdc6581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275a1557370656e644467742d65643930353863373663313601d87b9fd87a9f9fd8799fd87a9f581c87f24430a20462a8cd9dd64dea3becb35802b2af778a209b1c35a9cdffd87a80ff581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275557370656e644467742d656439303538633736633136ffffffd87a80ffd8799fd8799fd87a9f581c87f24430a20462a8cd9dd64dea3becb35802b2af778a209b1c35a9cdffd87a80ffa240a1401a0031421e581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275a1476368617274657201d87b9fd8799f9f557370656e644467742d6564393035386337366331364964656661756c745631d8799f581cb5f8f61599c1a60c004be3dfc72e8a7b4fe41e07e9e2fa4a1f15d25dff5f58407b22726576223a2231222c2269735370656e6444656c6567617465223a747275652c2264656c65676174654e616d65223a226d696e7444656c6567617465222c562269734d696e7444656c6567617465223a747275657dffff80a09f546d696e744467742d6564393035386337366331364964656661756c745631d8799f581cc809320d42ac95a8cc89a12374dfeac496caebb3388413a1225db010ff5f58407b22726576223a2231222c2269735370656e6444656c6567617465223a747275652c2264656c65676174654e616d65223a226d696e7444656c6567617465222c562269734d696e7444656c6567617465223a747275657dffff809f546361706f476f762d6564393035386337366331364761646472657373d87a805f58407b22726576223a2231222c226164647248696e74223a5b22616464725f746573743171727030653432703366656c7a6c6379636a71686b7975657875706a65615840617970667261746c7a7034676436367036307276617138387a34376c347376667274677278306c72687472397778616475666a3535737572706a783070736634476a717771225d7dffffffffd87a80ffd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa140a1401b000000028f28ec5fd87980d87a80ffffa140a1401a000a99e7a240a14000581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275a4476368617274657201546361706f476f762d65643930353863373663313601546d696e744467742d65643930353863373663313601557370656e644467742d6564393035386337366331360180a0d8799fd8799fd87980d87a80ffd8799fd87b80d87a80ffff9f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffa1d8799f581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275ffd8799fd8799fd87a9f581c87f24430a20462a8cd9dd64dea3becb35802b2af778a209b1c35a9cdffd87a80ffffa0d8799f582015281849515b1d7345b6f8fcd82f1b98904439ecafaca5861de622190bc2ce17ffffd8799f581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275ffff"
    ].map((cbor) => new UplcDataValue(decodeUplcData(cbor)))

    /**
     * @param {UplcProgramV2I} program
     */
    const evalProgram = (program) => {
        const res = program.eval(args, { logOptions: new BasicUplcLogger() })

        if (isRight(res.result)) {
            console.log("result: ", res.result.right.toString())
            return "result: " + res.result.right.toString()
        } else if (isLeft(res.result)) {
            console.log("error: ", res.result.left.error)
            return "error: " + res.result.left.error
        }
    }

    strictEqual(evalProgram(uplcProgram0), evalProgram(uplcProgram1))
})
