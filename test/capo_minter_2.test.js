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
        new ConstrData(0, []).toCbor(),
        "d8799fd8799f9fd8799fd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa140a1401b000000028fa6ae00d87980d87a80ffffff809fd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa240a1401a00128bbc581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275a1546361706f476f762d65643930353863373663313601d87980d87a80ffd8799fd8799fd87a9f581c396e0ceeca377e970f4a7b57bea4083092d0e352c54ee7a840f93c11ffd87a80ffa240a1401a00179c1a581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275a1546d696e744467742d65643930353863373663313601d87b9fd8799f9fd8799fd87a9f581c87f24430a20462a8cd9dd64dea3becb35802b2af778a209b1c35a9cdffd87a80ff581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275546d696e744467742d656439303538633736633136ffffffd87a80ffd8799fd8799fd87a9f581c4efe13db634ff3e494ffc33f9122c7c332f3f47a6ab5c7537c004e9fffd87a80ffa240a1401a0017bdc6581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275a1557370656e644467742d65643930353863373663313601d87b9fd87a9f9fd8799fd87a9f581c87f24430a20462a8cd9dd64dea3becb35802b2af778a209b1c35a9cdffd87a80ff581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275557370656e644467742d656439303538633736633136ffffffd87a80ffd8799fd8799fd87a9f581c87f24430a20462a8cd9dd64dea3becb35802b2af778a209b1c35a9cdffd87a80ffa240a1401a0031421e581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275a1476368617274657201d87b9fd8799f9f557370656e644467742d6564393035386337366331364964656661756c745631d8799f581c4efe13db634ff3e494ffc33f9122c7c332f3f47a6ab5c7537c004e9fff5f58407b22726576223a2231222c2269735370656e6444656c6567617465223a747275652c2264656c65676174654e616d65223a226d696e7444656c6567617465222c562269734d696e7444656c6567617465223a747275657dffff80a09f546d696e744467742d6564393035386337366331364964656661756c745631d8799f581c396e0ceeca377e970f4a7b57bea4083092d0e352c54ee7a840f93c11ff5f58407b22726576223a2231222c2269735370656e6444656c6567617465223a747275652c2264656c65676174654e616d65223a226d696e7444656c6567617465222c562269734d696e7444656c6567617465223a747275657dffff809f546361706f476f762d6564393035386337366331364761646472657373d87a805f58407b22726576223a2231222c226164647248696e74223a5b22616464725f746573743171727030653432703366656c7a6c6379636a71686b7975657875706a65615840617970667261746c7a7034676436367036307276617138387a34376c347376667274677278306c72687472397778616475666a3535737572706a783070736634476a717771225d7dffffffffd87a80ffd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa140a1401b000000028f28ec5fd87980d87a80ffffa140a1401a000a99e7a240a14000581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275a4476368617274657201546361706f476f762d65643930353863373663313601546d696e744467742d65643930353863373663313601557370656e644467742d6564393035386337366331360180a0d8799fd8799fd87980d87a80ffd8799fd87b80d87a80ffff9f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffa1d8799f581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275ffd8799fd8799fd87a9f581c87f24430a20462a8cd9dd64dea3becb35802b2af778a209b1c35a9cdffd87a80ffffa0d8799f5820d3389b4898457a93e744b881aeeb2b3ce83d8c6b7dacd95e1cd35e55df2af944ffffd8799f581c38590227f09a12998cca80adb6355da9e7f832e349cf2872f775f275ffff"
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
