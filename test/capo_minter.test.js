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
    __helios__common__identity = (self) -> {
        self
    };
    __helios__data__from_data = __helios__common__identity;
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
    __helios__int__serialize = (self_1) -> {
        () -> {
            __core__serialiseData(__helios__int____to_data(self_1))
        }
    };
    __helios__print = (msg_2) -> {
        __core__trace(msg_2, ())
    };
    __helios__int__to_hex = (self_2) -> {
        () -> {
            recurse_1 = (recurse) -> {
                (self_3, bytes) -> {
                    digit = __core__modInteger(self_3, 16);
                    bytes_1 = __core__consByteString(__core__ifThenElse(
                        __core__lessThanInteger(digit, 10),
                        __core__addInteger(digit, 48),
                        __core__addInteger(digit, 87)
                    ), bytes);
                    __core__ifThenElse(
                        __core__lessThanInteger(self_3, 16),
                        () -> {
                            bytes_1
                        },
                        () -> {
                            recurse(recurse)(__core__divideInteger(self_3, 16), bytes_1)
                        }
                    )()
                }
            };
            __core__decodeUtf8__safe(__core__ifThenElse(
                __core__lessThanInteger(self_2, 0),
                () -> {
                    __core__consByteString(45, recurse_1(recurse_1)(__core__multiplyInteger(self_2, -1), #))
                },
                () -> {
                    recurse_1(recurse_1)(self_2, #)
                }
            )())
        }
    };
    __helios__bytearray__show = (self_4) -> {
        () -> {
            recurse_3 = (recurse_2, self_5) -> {
                n = __core__lengthOfByteString(self_5);
                __core__ifThenElse(
                    __core__lessThanInteger(0, n),
                    () -> {
                        __core__appendString(__core__decodeUtf8__safe(hex_bytes = __core__encodeUtf8(__helios__int__to_hex(__core__indexByteString__safe(self_5, 0))());
                        __core__ifThenElse(
                            __core__equalsInteger(__core__lengthOfByteString(hex_bytes), 1),
                            __core__consByteString(48, hex_bytes),
                            hex_bytes
                        )), recurse_2(recurse_2, __core__sliceByteString(1, n, self_5)))
                    },
                    () -> {
                        ""
                    }
                )()
            };
            recurse_3(recurse_3, self_4)
        }
    };
    __helios__mintingpolicyhash__show = __helios__bytearray__show;
    __helios__bytearray__from_data = __core__unBData;
    __helios__mintingpolicyhash__from_data = __helios__bytearray__from_data;
    __helios__common__enum_fields = (self_6) -> {
        __core__sndPair(__core__unConstrData(self_6))
    };
    __helios__common__enum_field_0 = (self_7, diag) -> {
        fields = __helios__common__enum_fields(self_7);
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
    __helios__common__enum_fields_after_0 = (self_8) -> {
        __core__tailList(__helios__common__enum_fields(self_8))
    };
    __helios__common__enum_field_1 = (self_9) -> {
        __core__headList(__helios__common__enum_fields_after_0(self_9))
    };
    __helios__scriptcontext__data = __CONTEXT;
    __helios__scriptcontext__purpose = __helios__common__enum_field_1(__helios__scriptcontext__data);
    __helios__scriptcontext__get_spending_purpose_output_id = () -> {
        __helios__common__enum_field_0(__helios__scriptcontext__purpose, "purpose")
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
    __helios__common__any = (self_10, fn) -> {
        recurse_9 = (recurse_8, self_11, fn_1) -> {
            __core__chooseList(self_11, () -> {
                false
            }, () -> {
                __core__ifThenElse(
                    fn_1(__core__headList__safe(self_11)),
                    () -> {
                        true
                    },
                    () -> {
                        recurse_8(recurse_8, __core__tailList__safe(self_11), fn_1)
                    }
                )()
            })()
        };
        recurse_9(recurse_9, self_10, fn)
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
    __helios__common__serialize = (self_12) -> {
        () -> {
            __core__serialiseData(self_12)
        }
    };
    __helios__txoutput__serialize = __helios__common__serialize;
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
    __helios__txoutputdatum__inline = (self_13) -> {
        pair = __core__unConstrData(self_13);
        index = __core__fstPair(pair);
        fields = __core__sndPair(pair);
        __core__ifThenElse(
            __core__equalsInteger(index, 2),
            () -> {
                __core__ifThenElse(
                    __core__nullList(fields), 
                    () -> {
                        __helios__error("no inline datum")
                    },
                    () -> {
                        __core__headList(fields)
                    }
                )()
            },
            () -> {
                __helios__error("not an inline datum")
            }
        )()
    };
    __helios__common__enum_fields_after_1 = (self_14) -> {
        __core__tailList(__helios__common__enum_fields_after_0(self_14))
    };
    __helios__common__enum_field_2 = (self_15) -> {
        __core__headList(__helios__common__enum_fields_after_1(self_15))
    };
    __helios__txoutput__datum = __helios__common__enum_field_2;
    __helios__tx__outputs = (self_16) -> {
        __core__unListData(__helios__common__enum_field_2(self_16))
    };
    __helios__scriptcontext__tx = __helios__common__enum_field_0(__helios__scriptcontext__data, "tx");
    __helios__common____eq = __core__equalsData;
    __helios__address____eq = __helios__common____eq;
    __helios__txoutput__address = (output) -> {__helios__common__enum_field_0(output, "output address")};
    __helios__value__contains = (self_17) -> {
        (value) -> {
            __helios__value____geq(self_17, value)
        }
    };
    __helios__txoutput__value = (self_18) -> {
        __core__unMapData(__helios__common__enum_field_1(self_18))
    };
    __helios__data__constrdata____is = (data_1) -> {
        __core__chooseData(data_1, () -> {
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
    __helios__string____add = __core__appendString;
    __helios__int__show_digit = (x) -> {
        __core__addInteger(__core__modInteger(x, 10), 48)
    };
    __helios__int__show = (self_19) -> {
        () -> {
            __core__decodeUtf8__safe(recurse_21 = (recurse_20, i_1, bytes_2) -> {
                bytes_3 = __core__consByteString(__helios__int__show_digit(i_1), bytes_2);
                __core__ifThenElse(
                    __core__lessThanInteger(i_1, 10),
                    () -> {
                        bytes_3
                    },
                    () -> {
                        recurse_20(recurse_20, __core__divideInteger(i_1, 10), bytes_3)
                    }
                )()
            };
            __core__ifThenElse(
                __core__lessThanInteger(self_19, 0),
                () -> {
                    __core__consByteString(45, recurse_21(recurse_21, __core__multiplyInteger(self_19, -1), #))
                },
                () -> {
                    recurse_21(recurse_21, self_19, #)
                }
            )())
        }
    };
    __helios__data__constrdata__tag = (data_2) -> {
        __core__fstPair(__core__unConstrData(data_2))
    };
    __helios__common__enum_fields_after_2 = (self_20) -> {
        __core__tailList(__helios__common__enum_fields_after_1(self_20))
    };
    __helios__common__enum_fields_after_3 = (self_21) -> {
        __core__tailList(__helios__common__enum_fields_after_2(self_21))
    };
    __helios__common__enum_field_4 = (self_22) -> {
        __core__headList(__helios__common__enum_fields_after_3(self_22))
    };
    __helios__tx__minted = (self_23) -> {
        __core__unMapData(__helios__common__enum_field_4(self_23))
    };
    __helios__struct____to_data = __core__listData;
    __helios__struct____eq = (self_24, other) -> {
        __core__equalsData(__helios__struct____to_data(self_24), __helios__struct____to_data(other))
    };
    __helios__int__from_data = __core__unIData;
    __helios__common__test_constr_data_2 = (data_3, index_1, test_a, test_b) -> {
        __core__chooseData(data_3, () -> {
            pair_1 = __core__unConstrData__safe(data_3);
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
        (data_4) -> {
            __core__chooseData(data_4, () -> {
                false
            }, () -> {
                false
            }, () -> {
                false
            }, () -> {
                false
            }, () -> {
                bytes_4 = __core__unBData__safe(data_4);
                __core__ifThenElse(
                    __core__equalsInteger(__core__lengthOfByteString(bytes_4), n_1),
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
    __helios__txid__is_valid_data = (data_5) -> {
        __core__chooseData(data_5, () -> {
            pair_2 = __core__unConstrData__safe(data_5);
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
    __helios__int__is_valid_data = (data_6) -> {
        __core__chooseData(data_6, false, false, false, true, false)
    };
    __helios__txoutputid__is_valid_data = (data_7) -> {
        __helios__common__test_constr_data_2(data_7, 0, __helios__txid__is_valid_data, __helios__int__is_valid_data)
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
    __helios__common__enum_tag_equals = (data_12, i_2) -> {
        __core__equalsInteger(__core__fstPair(__core__unConstrData(data_12)), i_2)
    };
    __helios__int____lt = __core__lessThanInteger;
    __helios__int____eq = __core__equalsInteger;
    __helios__common__filter = (self_25, fn_2, nil) -> {
        recurse_23 = (recurse_22, self_26, fn_3) -> {
            __core__chooseList(self_26, () -> {
                nil
            }, () -> {
                head = __core__headList__safe(self_26);
                __core__ifThenElse(
                    fn_3(head),
                    () -> {
                        __core__mkCons(head, recurse_22(recurse_22, __core__tailList__safe(self_26), fn_3))
                    },
                    () -> {
                        recurse_22(recurse_22, __core__tailList__safe(self_26), fn_3)
                    }
                )()
            })()
        };
        recurse_23(recurse_23, self_25, fn_2)
    };
    __helios__common__filter_map = (self_27, fn_4) -> {
        __helios__common__filter(self_27, fn_4, __core__mkNilPairData(()))
    };
    __helios__value__get_assets = (self_28) -> {
        () -> {
            __helios__common__filter_map(self_28, (pair_6) -> {
                __helios__bool____not(__core__equalsByteString(__core__unBData(__core__fstPair(pair_6)), #))
            })
        }
    };
    __helios__common__fold = (self_29, fn_5, z) -> {
        recurse_25 = (recurse_24, self_30, z_1) -> {
            __core__chooseList(self_30, () -> {
                z_1
            }, () -> {
                recurse_24(recurse_24, __core__tailList__safe(self_30), fn_5(z_1, __core__headList__safe(self_30)))
            })()
        };
        recurse_25(recurse_25, self_29, z)
    };
    __helios__mintingpolicyhash____eq = __helios__bytearray____eq;
    __helios__value__show = (self_31) -> {
        () -> {
            __helios__common__fold(self_31, (prev, pair_7) -> {
                mph_1 = __core__unBData__safe(__core__fstPair(pair_7));
                tokens = __core__unMapData__safe(__core__sndPair(pair_7));
                __helios__common__fold(tokens, (prev_1, pair_8) -> {
                    token_name = __core__unBData__safe(__core__fstPair(pair_8));
                    qty = __core__unIData__safe(__core__sndPair(pair_8));
                    __helios__string____add(prev_1, __core__ifThenElse(
                        __helios__mintingpolicyhash____eq(mph_1, #),
                        () -> {
                            __helios__string____add("lovelace: ", __helios__string____add(__helios__int__show(qty)(), "
"))
                        },
                        () -> {
                            __helios__string____add(__helios__mintingpolicyhash__show(mph_1)(), __helios__string____add(".", __helios__string____add(__helios__bytearray__show(token_name)(), __helios__string____add(": ", __helios__string____add(__helios__int__show(qty)(), "
")))))
                        }
                    )())
                }, prev)
            }, "")
        }
    };
    __helios__value__add_or_subtract_inner = (op) -> {
        (a_7, b_8) -> {
            recurse_27 = (recurse_26, keys_3, result) -> {
                __core__chooseList(keys_3, () -> {
                    result
                }, () -> {
                    key_6 = __core__headList__safe(keys_3);
                    tail_1 = recurse_26(recurse_26, __core__tailList__safe(keys_3), result);
                    sum = op(__helios__value__get_inner_map_int(a_7, key_6), __helios__value__get_inner_map_int(b_8, key_6));
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
            recurse_27(recurse_27, __helios__value__merge_map_keys(a_7, b_8), __core__mkNilPairData(()))
        }
    };
    __helios__value__add_or_subtract = (a_8, b_9, op_1) -> {
        recurse_29 = (recurse_28, keys_4, result_1) -> {
            __core__chooseList(keys_4, () -> {
                result_1
            }, () -> {
                key_7 = __core__headList__safe(keys_4);
                tail_2 = recurse_28(recurse_28, __core__tailList__safe(keys_4), result_1);
                item_1 = __helios__value__add_or_subtract_inner(op_1)(__helios__value__get_inner_map(a_8, key_7), __helios__value__get_inner_map(b_9, key_7));
                __core__chooseList(item_1, () -> {
                    tail_2
                }, () -> {
                    __core__mkCons(__core__mkPairData(key_7, __core__mapData(item_1)), tail_2)
                })()
            })()
        };
        recurse_29(recurse_29, __helios__value__merge_map_keys(a_8, b_9), __core__mkNilPairData(()))
    };
    __helios__value____sub = (a_9, b_10) -> {
        __helios__value__add_or_subtract(a_9, b_10, __core__subtractInteger)
    };
    __helios__common____neq = (a_10, b_11) -> {
        __helios__bool____not(__core__equalsData(a_10, b_11))
    };
    __helios__address____neq = __helios__common____neq;
    __helios__bytearray__decode_utf8 = (self_32) -> {
        () -> {
            __core__decodeUtf8(self_32)
        }
    };
    __helios__option__NONE = __core__constrData(1, __helios__common__list_0);
    __helios__txoutput____to_data = __helios__common__identity;
    __helios__data____to_data = __helios__common__identity;
    __helios__common__list_1 = (a_11) -> {
        __core__mkCons(a_11, __helios__common__list_0)
    };
    __helios__txoutput__from_data = __helios__common__identity;
    __helios__common__struct_field_0 = __core__headList;
    __helios__txoutput__is_valid_data = (data_13) -> {
        __core__chooseData(data_13, () -> {
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
    __helios__data__is_valid_data = (data_14) -> {
        true
    };
    __helios__common__length = (lst_2) -> {
        recurse_31 = (recurse_30, lst_3) -> {
            __core__chooseList(lst_3, () -> {
                0
            }, () -> {
                __core__addInteger(recurse_30(recurse_30, __core__tailList__safe(lst_3)), 1)
            })()
        };
        recurse_31(recurse_31, lst_2)
    };
    __helios__string__parse_utf8_cont_byte = (byte, callback) -> {
        __core__ifThenElse(
            __core__equalsInteger(__core__divideInteger(byte, 64), 2),
            () -> {
                callback(true, __core__modInteger(byte, 64))
            },
            () -> {
                callback(false, 0)
            }
        )()
    };
    __helios__string__is_valid_utf8 = (bytes_5) -> {
        n_2 = __core__lengthOfByteString(bytes_5);
        recurse_33 = (recurse_32, i_3) -> {
            __core__ifThenElse(
                __core__equalsInteger(i_3, n_2),
                () -> {
                    true
                },
                () -> {
                    b0 = __core__indexByteString__safe(bytes_5, i_3);
                    __core__ifThenElse(
                        __core__lessThanEqualsInteger(b0, 127),
                        () -> {
                            recurse_32(recurse_32, __core__addInteger(i_3, 1))
                        },
                        () -> {
                            __core__ifThenElse(
                                __core__equalsInteger(__core__divideInteger(b0, 32), 6),
                                () -> {
                                    inext_2 = __core__addInteger(i_3, 2);
                                    __core__ifThenElse(
                                        __core__lessThanEqualsInteger(inext_2, n_2),
                                        () -> {
                                            __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_3, 1)), (valid_5, c1_2) -> {
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
                                                                recurse_32(recurse_32, inext_2)
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
                                            inext_1 = __core__addInteger(i_3, 3);
                                            __core__ifThenElse(
                                                __core__lessThanEqualsInteger(inext_1, n_2),
                                                () -> {
                                                    __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_3, 1)), (valid_3, c1_1) -> {
                                                        __core__ifThenElse(
                                                            valid_3,
                                                            () -> {
                                                                __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_3, 2)), (valid_4, c2_1) -> {
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
                                                                                    recurse_32(recurse_32, inext_1)
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
                                                    inext = __core__addInteger(i_3, 4);
                                                    __core__ifThenElse(
                                                        __core__lessThanEqualsInteger(inext, n_2),
                                                        () -> {
                                                            __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_3, 1)), (valid, c1) -> {
                                                                __core__ifThenElse(
                                                                    valid,
                                                                    () -> {
                                                                        __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_3, 2)), (valid_1, c2) -> {
                                                                            __core__ifThenElse(
                                                                                valid_1,
                                                                                () -> {
                                                                                    __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_3, 3)), (valid_2, c3) -> {
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
                                                                                                        recurse_32(recurse_32, inext)
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
        recurse_33(recurse_33, 0)
    };
    __helios__string__is_valid_data = (data_15) -> {
        __core__chooseData(data_15, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            __helios__string__is_valid_utf8(__core__unBData__safe(data_15))
        })()
    };
    __helios__bytearray__is_valid_data = (data_16) -> {
        __core__chooseData(data_16, false, false, false, false, true)
    };
    __helios__tx__inputs = (self_33) -> {
        __core__unListData(__helios__common__enum_field_0(self_33, "inputs"))
    };
    __helios__validatorhash__show = __helios__bytearray__show;
    __helios__value____add = (a_12, b_12) -> {
        __helios__value__add_or_subtract(a_12, b_12, __core__addInteger)
    };
    __helios__value__ZERO = __core__mkNilPairData(());
    __helios__txoutput__sum_values = (outputs) -> {
        __helios__common__fold(outputs, (prev_2, txOutput) -> {
            __helios__value____add(prev_2, __helios__txoutput__value(txOutput))
        }, __helios__value__ZERO)
    };
    __helios__common__filter_list = (self_34, fn_6) -> {
        __helios__common__filter(self_34, fn_6, __helios__common__list_0)
    };
    __helios__tx__filter_outputs = (self_35, fn_7) -> {
        __helios__common__filter_list(__helios__tx__outputs(self_35), fn_7)
    };
    __helios__address__credential = (addr) -> {__helios__common__enum_field_0(addr, "address credential")};
    __helios__spendingcredential__is_validator = (self_36) -> {
        __core__equalsInteger(__core__fstPair(__core__unConstrData(self_36)), 1)
    };
    __helios__validatorhash____eq = __helios__bytearray____eq;
    __helios__validatorhash__from_data = __helios__bytearray__from_data;
    __helios__spendingcredential__validator__hash = (self_37) -> {
        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_37, "spendingcred validator hash"))
    };
    __helios__spendingcredential__validator__cast = (data_17) -> {
        __helios__common__assert_constr_index(data_17, 1)
    };
    __helios__txoutput__is_locked_by = (self_38) -> {
        (hash) -> {
            credential = __helios__address__credential(__helios__txoutput__address(self_38));
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
    __helios__tx__outputs_locked_by = (self_39) -> {
        (vh) -> {
            __helios__tx__filter_outputs(self_39, (output) -> {
                __helios__txoutput__is_locked_by(output)(vh)
            })
        }
    };
    __helios__tx__value_locked_by = (self_40) -> {
        (vh_1) -> {
            __helios__txoutput__sum_values(__helios__tx__outputs_locked_by(self_40)(vh_1))
        }
    };
    __helios__common__find_safe = (self_41, fn_8, callback_1) -> {
        recurse_35 = (recurse_34, self_42, fn_9) -> {
            __core__chooseList(self_42, () -> {
                __core__constrData(1, __helios__common__list_0)
            }, () -> {
                head_1 = __core__headList__safe(self_42);
                __core__ifThenElse(
                    fn_9(head_1),
                    () -> {
                        __core__constrData(0, __helios__common__list_1(callback_1(head_1)))
                    },
                    () -> {
                        recurse_34(recurse_34, __core__tailList__safe(self_42), fn_9)
                    }
                )()
            })()
        };
        recurse_35(recurse_35, self_41, fn_8)
    };
    __helios__spendingcredential____eq = __helios__common____eq;
    __helios__txinput__output = __helios__common__enum_field_1;
    __helios__txinput__address = (self_43) -> {
        __helios__txoutput__address(__helios__txinput__output(self_43))
    };
    __helios__txinput__value = (self_44) -> {
        __helios__txoutput__value(__helios__txinput__output(self_44))
    };
    __helios__bytearray____to_data = __core__bData;
    __helios__validatorhash____to_data = __helios__bytearray____to_data;
    __helios__spendingcredential__new_validator = (hash_1) -> {
        __core__constrData(1, __helios__common__list_1(__helios__validatorhash____to_data(hash_1)))
    };
    __helios__txinput__from_data = __helios__common__identity;
    __helios__common__struct_fields_after_0 = __core__tailList;
    __helios__common__struct_fields_after_1 = (self_45) -> {
        __core__tailList(__helios__common__struct_fields_after_0(self_45))
    };
    __helios__common__struct_field_2 = (self_46) -> {
        __core__headList(__helios__common__struct_fields_after_1(self_46))
    };
    __helios__string__from_data = (d) -> {
        __core__decodeUtf8(__core__unBData(d))
    };
    __helios__common__test_mStruct_field = (self_47, name, inner_test) -> {
        __core__chooseData(self_47, () -> {
            false
        }, () -> {
            map_7 = __core__unMapData__safe(self_47);
            recurse_37 = (recurse_36, map_8) -> {
                __core__chooseList(map_8, () -> {
                    __core__trace(__core__appendString("Warning: field not found: ", __core__decodeUtf8__safe(__core__unBData__safe(name))), () -> {
                        false
                    })()
                }, () -> {
                    head_2 = __core__headList__safe(map_8);
                    key_8 = __core__fstPair(head_2);
                    value_1 = __core__sndPair(head_2);
                    __core__ifThenElse(
                        __core__equalsData(key_8, name),
                        () -> {
                            inner_test(value_1)
                        },
                        () -> {
                            recurse_36(recurse_36, __core__tailList__safe(map_8))
                        }
                    )()
                })()
            };
            recurse_37(recurse_37, map_7)
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__int____gt = (a_13, b_13) -> {
        __helios__bool____not(__core__lessThanEqualsInteger(a_13, b_13))
    };
    __helios__bytearray__length = __core__lengthOfByteString;
    __helios__value__new = (assetClass, i_4) -> {
        __core__ifThenElse(
            __core__equalsInteger(0, i_4),
            () -> {
                __helios__value__ZERO
            },
            () -> {
                mph_2 = __helios__common__enum_field_0(assetClass, "assetclass mph");
                tokenName = __helios__common__enum_field_1(assetClass);
                __core__mkCons(__core__mkPairData(mph_2, __core__mapData(__core__mkCons(__core__mkPairData(tokenName, __helios__int____to_data(i_4)), __core__mkNilPairData(())))), __core__mkNilPairData(()))
            }
        )()
    };
    __helios__common__list_2 = (arg0, arg1) -> {
        __core__mkCons(arg0, __helios__common__list_1(arg1))
    };
    __helios__mintingpolicyhash____to_data = __helios__bytearray____to_data;
    __helios__assetclass__new = (mph_3, token_name_1) -> {
        __core__constrData(0, __helios__common__list_2(__helios__mintingpolicyhash____to_data(mph_3), __helios__bytearray____to_data(token_name_1)))
    };
    __helios__string__encode_utf8 = (self_48) -> {
        () -> {
            __core__encodeUtf8(self_48)
        }
    };
    __module__StellarHeliosHelpers__mkTv = (mph_4, __useopt__tn, tn, __useopt__tnBytes, tnBytes, __useopt__count, count) -> {
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
        __core__chooseUnit(__helios__assert(__helios__int____gt(__helios__bytearray__length(tnBytes_1), 0), "missing reqd tn or tnBytes"), __helios__value__new(__helios__assetclass__new(mph_4, tnBytes_1), count_1))
    };
    __helios__list[__helios__txoutput]__find = (self_49) -> {
        (fn_10) -> {
            recurse_39 = (recurse_38, lst_4) -> {
                __core__chooseList(lst_4, () -> {
                    __helios__error("not found")
                }, () -> {
                    item_2 = __helios__txoutput__from_data(__core__headList__safe(lst_4));
                    __core__ifThenElse(
                        fn_10(item_2),
                        () -> {
                            item_2
                        },
                        () -> {
                            recurse_38(recurse_38, __core__tailList__safe(lst_4))
                        }
                    )()
                })()
            };
            recurse_39(recurse_39, self_49)
        }
    };
    __module__StellarHeliosHelpers__AnyData[]__is_valid_data = (data_18) -> {
        __core__ifThenElse(
            __helios__common__test_mStruct_field(data_18, __core__bData(#747065), __helios__string__is_valid_data),
            () -> {
                __core__ifThenElse(
                    __helios__common__test_mStruct_field(data_18, __core__bData(#406964), __helios__bytearray__is_valid_data),
                    () -> {
                        true
                    },
                    () -> {
                        __core__trace("Warning: invalid AnyData data", () -> {
                            false
                        })()
                    }
                )()
            },
            () -> {
                __core__trace("Warning: invalid AnyData data", () -> {
                    false
                })()
            }
        )()
    };
    __module__TypeMapMetadata__TypeInfo[]__is_valid_data = (data_19) -> {
        __core__chooseData(data_19, () -> {
            false
        }, () -> {
            false
        }, () -> {
            fields_6 = __core__unListData__safe(data_19);
            __core__chooseList(fields_6, () -> {
                false
            }, () -> {
                head_3 = __core__headList__safe(fields_6);
                __core__ifThenElse(
                    __helios__string__is_valid_data(head_3),
                    () -> {
                        fields_7 = __core__tailList__safe(fields_6);
                        __core__chooseList(fields_7, () -> {
                            false
                        }, () -> {
                            head_4 = __core__headList__safe(fields_7);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_4),
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
    };
    __module__TypeMapMetadata__TypeRefImportDetails[]__is_valid_data = (__module__TypeMapMetadata__TypeRefImportDetails[]__ImportType__is_valid_data, __module__TypeMapMetadata__TypeRefImportDetails[]__ImportAs__is_valid_data) -> {
        (data_20) -> {
            __core__ifThenElse(
                __module__TypeMapMetadata__TypeRefImportDetails[]__ImportAs__is_valid_data(data_20),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__TypeMapMetadata__TypeRefImportDetails[]__ImportType__is_valid_data(data_20),
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
    };
    __module__TypeMapMetadata__TypeRefImportDetails[]__ImportType__is_valid_data_1 = (data_21) -> {
        __core__chooseData(data_21, () -> {
            pair_9 = __core__unConstrData__safe(data_21);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_9), 0),
                () -> {
                    data_22 = __core__listData(__core__sndPair(pair_9));
                    __core__chooseData(data_22, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_9 = __core__unListData__safe(data_22);
                        __core__chooseList(fields_9, () -> {
                            false
                        }, () -> {
                            head_5 = __core__headList__safe(fields_9);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_5),
                                () -> {
                                    fields_10 = __core__tailList__safe(fields_9);
                                    __core__chooseList(fields_10, true, false)
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
    __helios__map[__helios__string@__helios__string]__is_valid_data_internal = (map_9) -> {
        recurse_41 = (recurse_40, map_10) -> {
            __core__chooseList(map_10, () -> {
                true
            }, () -> {
                head_6 = __core__headList__safe(map_10);
                __core__ifThenElse(
                    __helios__string__is_valid_data(__core__fstPair(head_6)),
                    () -> {
                        __core__ifThenElse(
                            __helios__string__is_valid_data(__core__sndPair(head_6)),
                            () -> {
                                recurse_40(recurse_40, __core__tailList__safe(map_10))
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
        recurse_41(recurse_41, map_9)
    };
    __helios__map[__helios__string@__helios__string]__is_valid_data = (data_23) -> {
        __core__chooseData(data_23, () -> {
            false
        }, () -> {
            __helios__map[__helios__string@__helios__string]__is_valid_data_internal(__core__unMapData__safe(data_23))
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __module__TypeMapMetadata__TypeRefImportDetails[]__ImportAs__is_valid_data_1 = (data_24) -> {
        __core__chooseData(data_24, () -> {
            pair_10 = __core__unConstrData__safe(data_24);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_10), 1),
                () -> {
                    data_25 = __core__listData(__core__sndPair(pair_10));
                    __core__chooseData(data_25, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_11 = __core__unListData__safe(data_25);
                        __core__chooseList(fields_11, () -> {
                            false
                        }, () -> {
                            head_7 = __core__headList__safe(fields_11);
                            __core__ifThenElse(
                                __helios__map[__helios__string@__helios__string]__is_valid_data(head_7),
                                () -> {
                                    fields_12 = __core__tailList__safe(fields_11);
                                    __core__chooseList(fields_12, true, false)
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
    __helios__option[__helios__txoutputid]__is_valid_data = (data_26) -> {
        __core__chooseData(data_26, () -> {
            pair_11 = __core__unConstrData__safe(data_26);
            index_5 = __core__fstPair(pair_11);
            fields_13 = __core__sndPair(pair_11);
            __core__ifThenElse(
                __core__equalsInteger(index_5, 0),
                () -> {
                    __core__chooseList(fields_13, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_13), () -> {
                            __helios__txoutputid__is_valid_data(__core__headList__safe(fields_13))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_5, 1),
                        () -> {
                            __core__chooseList(fields_13, true, false)
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
    __module__TypeMapMetadata__TypeMapRef[]__is_valid_data = (data_27) -> {
        __core__ifThenElse(
            __helios__common__test_mStruct_field(data_27, __core__bData(#726566), __helios__string__is_valid_data),
            () -> {
                __core__ifThenElse(
                    __helios__common__test_mStruct_field(data_27, __core__bData(#747276), __helios__string__is_valid_data),
                    () -> {
                        __core__ifThenElse(
                            __helios__common__test_mStruct_field(data_27, __core__bData(#7574786f), __helios__option[__helios__txoutputid]__is_valid_data),
                            () -> {
                                __core__ifThenElse(
                                    __helios__common__test_mStruct_field(data_27, __core__bData(#696d70), __module__TypeMapMetadata__TypeRefImportDetails[]__is_valid_data(__module__TypeMapMetadata__TypeRefImportDetails[]__ImportType__is_valid_data_1, __module__TypeMapMetadata__TypeRefImportDetails[]__ImportAs__is_valid_data_1)),
                                    () -> {
                                        true
                                    },
                                    () -> {
                                        __core__trace("Warning: invalid TypeMapRef data", () -> {
                                            false
                                        })()
                                    }
                                )()
                            },
                            () -> {
                                __core__trace("Warning: invalid TypeMapRef data", () -> {
                                    false
                                })()
                            }
                        )()
                    },
                    () -> {
                        __core__trace("Warning: invalid TypeMapRef data", () -> {
                            false
                        })()
                    }
                )()
            },
            () -> {
                __core__trace("Warning: invalid TypeMapRef data", () -> {
                    false
                })()
            }
        )()
    };
    __helios__map[__helios__string@__module__TypeMapMetadata__TypeInfo[]]__is_valid_data_internal = (map_11) -> {
        recurse_43 = (recurse_42, map_12) -> {
            __core__chooseList(map_12, () -> {
                true
            }, () -> {
                head_8 = __core__headList__safe(map_12);
                __core__ifThenElse(
                    __helios__string__is_valid_data(__core__fstPair(head_8)),
                    () -> {
                        __core__ifThenElse(
                            __module__TypeMapMetadata__TypeInfo[]__is_valid_data(__core__sndPair(head_8)),
                            () -> {
                                recurse_42(recurse_42, __core__tailList__safe(map_12))
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
        recurse_43(recurse_43, map_11)
    };
    __helios__map[__helios__string@__module__TypeMapMetadata__TypeInfo[]]__is_valid_data = (data_28) -> {
        __core__chooseData(data_28, () -> {
            false
        }, () -> {
            __helios__map[__helios__string@__module__TypeMapMetadata__TypeInfo[]]__is_valid_data_internal(__core__unMapData__safe(data_28))
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__list[__module__TypeMapMetadata__TypeMapRef[]]__is_valid_data_internal = (lst_5) -> {
        recurse_45 = (recurse_44, lst_6) -> {
            __core__chooseList(lst_6, () -> {
                true
            }, () -> {
                __core__ifThenElse(
                    __module__TypeMapMetadata__TypeMapRef[]__is_valid_data(__core__headList__safe(lst_6)),
                    () -> {
                        recurse_44(recurse_44, __core__tailList__safe(lst_6))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_45(recurse_45, lst_5)
    };
    __helios__list[__module__TypeMapMetadata__TypeMapRef[]]__is_valid_data = (data_29) -> {
        __core__chooseData(data_29, () -> {
            false
        }, () -> {
            false
        }, () -> {
            __helios__list[__module__TypeMapMetadata__TypeMapRef[]]__is_valid_data_internal(__core__unListData__safe(data_29))
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __module__TypeMapMetadata__TypeMap[]__is_valid_data = (data_30) -> {
        __core__chooseData(data_30, () -> {
            false
        }, () -> {
            false
        }, () -> {
            fields_14 = __core__unListData__safe(data_30);
            __core__chooseList(fields_14, () -> {
                false
            }, () -> {
                head_9 = __core__headList__safe(fields_14);
                __core__ifThenElse(
                    __helios__map[__helios__string@__module__TypeMapMetadata__TypeInfo[]]__is_valid_data(head_9),
                    () -> {
                        fields_15 = __core__tailList__safe(fields_14);
                        __core__chooseList(fields_15, () -> {
                            false
                        }, () -> {
                            head_10 = __core__headList__safe(fields_15);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_10),
                                () -> {
                                    fields_16 = __core__tailList__safe(fields_15);
                                    __core__chooseList(fields_16, () -> {
                                        false
                                    }, () -> {
                                        head_11 = __core__headList__safe(fields_16);
                                        __core__ifThenElse(
                                            __helios__list[__module__TypeMapMetadata__TypeMapRef[]]__is_valid_data(head_11),
                                            () -> {
                                                fields_17 = __core__tailList__safe(fields_16);
                                                __core__chooseList(fields_17, true, false)
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
    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____is = (data_31) -> {
        __helios__common__enum_tag_equals(data_31, 0)
    };
    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new = () -> {
        __core__constrData(0, __core__mkNilData(()))
    };
    __module__CapoDelegateHelpers__DgTknDisposition[]__Created____is = (data_32) -> {
        __helios__common__enum_tag_equals(data_32, 1)
    };
    __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new = () -> {
        __core__constrData(1, __core__mkNilData(()))
    };
    __helios__option[__helios__validatorhash]__is_valid_data = (data_33) -> {
        __core__chooseData(data_33, () -> {
            pair_12 = __core__unConstrData__safe(data_33);
            index_6 = __core__fstPair(pair_12);
            fields_18 = __core__sndPair(pair_12);
            __core__ifThenElse(
                __core__equalsInteger(index_6, 0),
                () -> {
                    __core__chooseList(fields_18, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_18), () -> {
                            __helios__validatorhash__is_valid_data(__core__headList__safe(fields_18))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_6, 1),
                        () -> {
                            __core__chooseList(fields_18, true, false)
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
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data = (data_34) -> {
        __core__chooseData(data_34, () -> {
            false
        }, () -> {
            false
        }, () -> {
            fields_19 = __core__unListData__safe(data_34);
            __core__chooseList(fields_19, () -> {
                false
            }, () -> {
                head_12 = __core__headList__safe(fields_19);
                __core__ifThenElse(
                    __helios__string__is_valid_data(head_12),
                    () -> {
                        fields_20 = __core__tailList__safe(fields_19);
                        __core__chooseList(fields_20, () -> {
                            false
                        }, () -> {
                            head_13 = __core__headList__safe(fields_20);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_13),
                                () -> {
                                    fields_21 = __core__tailList__safe(fields_20);
                                    __core__chooseList(fields_21, () -> {
                                        false
                                    }, () -> {
                                        head_14 = __core__headList__safe(fields_21);
                                        __core__ifThenElse(
                                            __helios__option[__helios__validatorhash]__is_valid_data(head_14),
                                            () -> {
                                                fields_22 = __core__tailList__safe(fields_21);
                                                __core__chooseList(fields_22, () -> {
                                                    false
                                                }, () -> {
                                                    head_15 = __core__headList__safe(fields_22);
                                                    __core__ifThenElse(
                                                        __helios__bytearray__is_valid_data(head_15),
                                                        () -> {
                                                            fields_23 = __core__tailList__safe(fields_22);
                                                            __core__chooseList(fields_23, true, false)
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
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data = (data_35) -> {
        ignore = __core__ifThenElse(
            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(data_35),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid RelativeDelegateLink data", ())
            }
        )();
        __core__unListData(data_35)
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName = (self_50) -> {
        __helios__string__from_data(__helios__common__struct_field_0(self_50))
    };
    __helios__option[__helios__validatorhash]__from_data = (data_36) -> {
        _ = __core__ifThenElse(
            __helios__option[__helios__validatorhash]__is_valid_data(data_36),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid option data", ())
            }
        )();
        data_36
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash = (self_51) -> {
        __helios__option[__helios__validatorhash]__from_data(__helios__common__struct_field_2(self_51))
    };
    __helios__option[__helios__validatorhash]__none____is = (data_37) -> {
        __helios__common__enum_tag_equals(data_37, 1)
    };
    __helios__option[__helios__txinput]__none____new = () -> {
        __helios__option__NONE
    };
    __helios__option[__helios__txinput]__some____is = (data_38) -> {
        __helios__common__enum_tag_equals(data_38, 0)
    };
    __helios__list[__helios__txinput]__find_safe = (self_52) -> {
        (fn_11) -> {
            __helios__common__find_safe(self_52, (item_3) -> {
                fn_11(__helios__txinput__from_data(item_3))
            }, __helios__common__identity)
        }
    };
    __helios__option[__helios__validatorhash]__some__some = (self_53) -> {
        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_53, "some from option[ValidatorHash]"))
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput = (self_54) -> {
        (inputs, mph_5, __useopt__required, required) -> {
            required_1 = __core__ifThenElse(
                __useopt__required,
                () -> {
                    required
                },
                () -> {
                    true
                }
            )();
            __cond = __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash(self_54);
            __core__ifThenElse(
                __helios__option[__helios__validatorhash]__none____is(__cond),
                () -> {
                    (__lhs_0_2) -> {
                        __core__ifThenElse(
                            required_1,
                            () -> {
                                __helios__error(__helios__string____add("_❌ ➡️ 💁 missing required input with dgTkn ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_54)))
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
                        expectedUut = __module__StellarHeliosHelpers__mkTv(mph_5, true, __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_54), false, (), false, ());
                        __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add("  -- seeking input dgTkn: ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_54)), "
")), __cond_1 = __helios__list[__helios__txinput]__find_safe(inputs)((i_5) -> {
                            __helios__bool__and(() -> {
                                __helios__spendingcredential____eq(__helios__address__credential(__helios__txinput__address(i_5)), needsAddrWithCred)
                            }, () -> {
                                __helios__value__contains(__helios__txinput__value(i_5))(expectedUut)
                            })
                        });
                        __core__ifThenElse(
                            __helios__option[__helios__txinput]__some____is(__cond_1),
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
                                            __helios__error(__helios__string____add("_❌ ➡️  💁 missing req'd input dgTkn (at script addr) ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_54)))
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
                        )()(__cond_1))
                    }
                }
            )()(__cond)
        }
    };
    __helios__option[__helios__validatorhash]__some____is = (data_39) -> {
        __helios__common__enum_tag_equals(data_39, 0)
    };
    __helios__option[__helios__txoutput]__some____is = (data_40) -> {
        __helios__common__enum_tag_equals(data_40, 0)
    };
    __helios__list[__helios__txoutput]__find_safe = (self_55) -> {
        (fn_12) -> {
            __helios__common__find_safe(self_55, (item_4) -> {
                fn_12(__helios__txoutput__from_data(item_4))
            }, __helios__common__identity)
        }
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput = (self_56) -> {
        (mph_6, __useopt__required_1, required_2, __useopt__createdOrReturned, createdOrReturned) -> {
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
            __lhs_0_3 = self_56;
            uut = __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(__lhs_0_3);
            validatorHash = __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash(__lhs_0_3);
            v = __module__StellarHeliosHelpers__mkTv(mph_6, true, uut, false, (), false, ());
            (cOrR) -> {
                __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add(" ⬅️ 🔎 💁 expect dgTkn ", cOrR), ": "), uut)), (hasDelegate) -> {
                    __core__chooseUnit(__core__ifThenElse(
                        __helios__bool__and(() -> {
                            __helios__bool____not(hasDelegate)
                        }, () -> {
                            required_3
                        }),
                        () -> {
                            __cond_5 = createdOrReturned_1;
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__DgTknDisposition[]__Created____is(__cond_5),
                                () -> {
                                    (__lhs_0_12) -> {
                                        __helios__error(__helios__string____add("⬅️ ❌ 💁 dgTkn not created: ", uut))
                                    }
                                },
                                () -> {
                                    (__lhs_0_10) -> {
                                        __lhs_0_11 = __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput(self_56)(__helios__tx__inputs(__helios__scriptcontext__tx), mph_6, true, true);
                                        __helios__error(__helios__string____add("⬅️ ❌ 💁 dgTkn not returned: ", uut))
                                    }
                                }
                            )()(__cond_5)
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
                }(__cond_3 = validatorHash;
                __core__ifThenElse(
                    __helios__option[__helios__validatorhash]__some____is(__cond_3),
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
"), __cond_4 = __helios__list[__helios__txoutput]__find_safe(__helios__tx__outputs(__helios__scriptcontext__tx))((o) -> {
                                __helios__value__contains(__helios__txoutput__value(o))(v)
                            });
                            __core__ifThenElse(
                                __helios__option[__helios__txoutput]__some____is(__cond_4),
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
                            )()(__cond_4))
                        }
                    }
                )()(__cond_3)))
            }(__cond_2 = createdOrReturned_1;
            __core__ifThenElse(
                __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____is(__cond_2),
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
            )()(__cond_2))
        }
    };
    __module__CapoHelpers__CapoDatum[]__is_valid_data = (__module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data, __module__CapoHelpers__CapoDatum[]__ScriptReference__is_valid_data, __module__CapoHelpers__CapoDatum[]__SettingsData__is_valid_data, __module__CapoHelpers__CapoDatum[]__DelegatedData__is_valid_data, __module__CapoHelpers__CapoDatum[]__TypeMapInfo__is_valid_data) -> {
        (data_41) -> {
            __core__ifThenElse(
                __module__CapoHelpers__CapoDatum[]__TypeMapInfo__is_valid_data(data_41),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoHelpers__CapoDatum[]__DelegatedData__is_valid_data(data_41),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoHelpers__CapoDatum[]__SettingsData__is_valid_data(data_41),
                                () -> {
                                    true
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoHelpers__CapoDatum[]__ScriptReference__is_valid_data(data_41),
                                        () -> {
                                            true
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data(data_41),
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
    };
    __module__CapoHelpers__CapoDatum[]__from_data = (__module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data_1, __module__CapoHelpers__CapoDatum[]__ScriptReference__is_valid_data_1, __module__CapoHelpers__CapoDatum[]__SettingsData__is_valid_data_1, __module__CapoHelpers__CapoDatum[]__DelegatedData__is_valid_data_1, __module__CapoHelpers__CapoDatum[]__TypeMapInfo__is_valid_data_1) -> {
        (data_42) -> {
            ignore_1 = __core__ifThenElse(
                __module__CapoHelpers__CapoDatum[]__is_valid_data(__module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data_1, __module__CapoHelpers__CapoDatum[]__ScriptReference__is_valid_data_1, __module__CapoHelpers__CapoDatum[]__SettingsData__is_valid_data_1, __module__CapoHelpers__CapoDatum[]__DelegatedData__is_valid_data_1, __module__CapoHelpers__CapoDatum[]__TypeMapInfo__is_valid_data_1)(data_42),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid CapoDatum data", ())
                }
            )();
            data_42
        }
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken____is = (data_43) -> {
        __helios__common__enum_tag_equals(data_43, 0)
    };
    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal = (lst_7) -> {
        recurse_47 = (recurse_46, lst_8) -> {
            __core__chooseList(lst_8, () -> {
                true
            }, () -> {
                __core__ifThenElse(
                    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__headList__safe(lst_8)),
                    () -> {
                        recurse_46(recurse_46, __core__tailList__safe(lst_8))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_47(recurse_47, lst_7)
    };
    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_44) -> {
        __core__chooseData(data_44, () -> {
            false
        }, () -> {
            false
        }, () -> {
            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(__core__unListData__safe(data_44))
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal = (map_13) -> {
        recurse_49 = (recurse_48, map_14) -> {
            __core__chooseList(map_14, () -> {
                true
            }, () -> {
                head_16 = __core__headList__safe(map_14);
                __core__ifThenElse(
                    __helios__string__is_valid_data(__core__fstPair(head_16)),
                    () -> {
                        __core__ifThenElse(
                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__sndPair(head_16)),
                            () -> {
                                recurse_48(recurse_48, __core__tailList__safe(map_14))
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
        recurse_49(recurse_49, map_13)
    };
    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_45) -> {
        __core__chooseData(data_45, () -> {
            false
        }, () -> {
            __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(__core__unMapData__safe(data_45))
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__option[__helios__bytearray]__is_valid_data = (data_46) -> {
        __core__chooseData(data_46, () -> {
            pair_13 = __core__unConstrData__safe(data_46);
            index_7 = __core__fstPair(pair_13);
            fields_24 = __core__sndPair(pair_13);
            __core__ifThenElse(
                __core__equalsInteger(index_7, 0),
                () -> {
                    __core__chooseList(fields_24, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_24), () -> {
                            __helios__bytearray__is_valid_data(__core__headList__safe(fields_24))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_7, 1),
                        () -> {
                            __core__chooseList(fields_24, true, false)
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
    __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data_2 = (data_47) -> {
        __core__chooseData(data_47, () -> {
            pair_14 = __core__unConstrData__safe(data_47);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_14), 0),
                () -> {
                    data_48 = __core__listData(__core__sndPair(pair_14));
                    __core__chooseData(data_48, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_25 = __core__unListData__safe(data_48);
                        __core__chooseList(fields_25, () -> {
                            false
                        }, () -> {
                            head_17 = __core__headList__safe(fields_25);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_17),
                                () -> {
                                    fields_26 = __core__tailList__safe(fields_25);
                                    __core__chooseList(fields_26, () -> {
                                        false
                                    }, () -> {
                                        head_18 = __core__headList__safe(fields_26);
                                        __core__ifThenElse(
                                            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_18),
                                            () -> {
                                                fields_27 = __core__tailList__safe(fields_26);
                                                __core__chooseList(fields_27, () -> {
                                                    false
                                                }, () -> {
                                                    head_19 = __core__headList__safe(fields_27);
                                                    __core__ifThenElse(
                                                        __helios__bytearray__is_valid_data(head_19),
                                                        () -> {
                                                            fields_28 = __core__tailList__safe(fields_27);
                                                            __core__chooseList(fields_28, () -> {
                                                                false
                                                            }, () -> {
                                                                head_20 = __core__headList__safe(fields_28);
                                                                __core__ifThenElse(
                                                                    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_20),
                                                                    () -> {
                                                                        fields_29 = __core__tailList__safe(fields_28);
                                                                        __core__chooseList(fields_29, () -> {
                                                                            false
                                                                        }, () -> {
                                                                            head_21 = __core__headList__safe(fields_29);
                                                                            __core__ifThenElse(
                                                                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_21),
                                                                                () -> {
                                                                                    fields_30 = __core__tailList__safe(fields_29);
                                                                                    __core__chooseList(fields_30, () -> {
                                                                                        false
                                                                                    }, () -> {
                                                                                        head_22 = __core__headList__safe(fields_30);
                                                                                        __core__ifThenElse(
                                                                                            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_22),
                                                                                            () -> {
                                                                                                fields_31 = __core__tailList__safe(fields_30);
                                                                                                __core__chooseList(fields_31, () -> {
                                                                                                    false
                                                                                                }, () -> {
                                                                                                    head_23 = __core__headList__safe(fields_31);
                                                                                                    __core__ifThenElse(
                                                                                                        __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_23),
                                                                                                        () -> {
                                                                                                            fields_32 = __core__tailList__safe(fields_31);
                                                                                                            __core__chooseList(fields_32, () -> {
                                                                                                                false
                                                                                                            }, () -> {
                                                                                                                head_24 = __core__headList__safe(fields_32);
                                                                                                                __core__ifThenElse(
                                                                                                                    __helios__option[__helios__bytearray]__is_valid_data(head_24),
                                                                                                                    () -> {
                                                                                                                        fields_33 = __core__tailList__safe(fields_32);
                                                                                                                        __core__chooseList(fields_33, true, false)
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
    __module__CapoHelpers__CapoDatum[]__CharterToken__from_data = (data_49) -> {
        ignore_2 = __core__ifThenElse(
            __module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data_2(data_49),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid CharterToken data", ())
            }
        )();
        data_49
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken__spendDelegateLink = (self_57) -> {
        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__enum_field_0(self_57, "CharterToken spendDelegateLink"))
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken__settingsUut = (self_58) -> {
        __helios__bytearray__from_data(__helios__common__enum_field_2(self_58))
    };
    __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink = (self_59) -> {
        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__enum_field_4(self_59))
    };
    __module__CapoHelpers__CapoDatum[]__ScriptReference__is_valid_data_2 = (data_50) -> {
        __core__chooseData(data_50, () -> {
            pair_15 = __core__unConstrData__safe(data_50);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_15), 1),
                () -> {
                    data_51 = __core__listData(__core__sndPair(pair_15));
                    __core__chooseData(data_51, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_34 = __core__unListData__safe(data_51);
                        __core__chooseList(fields_34, true, false)
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
    __module__CapoHelpers__CapoDatum[]__SettingsData____is = (data_52) -> {
        __helios__common__enum_tag_equals(data_52, 2)
    };
    __helios__map[__helios__string@__helios__data]__is_valid_data_internal = (map_15) -> {
        recurse_51 = (recurse_50, map_16) -> {
            __core__chooseList(map_16, () -> {
                true
            }, () -> {
                head_25 = __core__headList__safe(map_16);
                __core__ifThenElse(
                    __helios__string__is_valid_data(__core__fstPair(head_25)),
                    () -> {
                        __core__ifThenElse(
                            __helios__data__is_valid_data(__core__sndPair(head_25)),
                            () -> {
                                recurse_50(recurse_50, __core__tailList__safe(map_16))
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
        recurse_51(recurse_51, map_15)
    };
    __helios__map[__helios__string@__helios__data]__is_valid_data = (data_53) -> {
        __core__chooseData(data_53, () -> {
            false
        }, () -> {
            __helios__map[__helios__string@__helios__data]__is_valid_data_internal(__core__unMapData__safe(data_53))
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __module__CapoHelpers__CapoDatum[]__SettingsData__is_valid_data_2 = (data_54) -> {
        __core__chooseData(data_54, () -> {
            pair_16 = __core__unConstrData__safe(data_54);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_16), 2),
                () -> {
                    data_55 = __core__listData(__core__sndPair(pair_16));
                    __core__chooseData(data_55, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_35 = __core__unListData__safe(data_55);
                        __core__chooseList(fields_35, () -> {
                            false
                        }, () -> {
                            head_26 = __core__headList__safe(fields_35);
                            __core__ifThenElse(
                                __helios__map[__helios__string@__helios__data]__is_valid_data(head_26),
                                () -> {
                                    fields_36 = __core__tailList__safe(fields_35);
                                    __core__chooseList(fields_36, true, false)
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
    __module__CapoHelpers__CapoDatum[]__SettingsData____to_data = __helios__common__identity;
    __module__CapoHelpers__CapoDatum[]__DelegatedData__is_valid_data_2 = (data_56) -> {
        __core__chooseData(data_56, () -> {
            pair_17 = __core__unConstrData__safe(data_56);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_17), 3),
                () -> {
                    data_57 = __core__listData(__core__sndPair(pair_17));
                    __core__chooseData(data_57, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_37 = __core__unListData__safe(data_57);
                        __core__chooseList(fields_37, () -> {
                            false
                        }, () -> {
                            head_27 = __core__headList__safe(fields_37);
                            __core__ifThenElse(
                                __module__StellarHeliosHelpers__AnyData[]__is_valid_data(head_27),
                                () -> {
                                    fields_38 = __core__tailList__safe(fields_37);
                                    __core__chooseList(fields_38, () -> {
                                        false
                                    }, () -> {
                                        head_28 = __core__headList__safe(fields_38);
                                        __core__ifThenElse(
                                            __helios__int__is_valid_data(head_28),
                                            () -> {
                                                fields_39 = __core__tailList__safe(fields_38);
                                                __core__chooseList(fields_39, () -> {
                                                    false
                                                }, () -> {
                                                    head_29 = __core__headList__safe(fields_39);
                                                    __core__ifThenElse(
                                                        __helios__data__is_valid_data(head_29),
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
    __module__CapoHelpers__CapoDatum[]__TypeMapInfo__is_valid_data_2 = (data_58) -> {
        __core__chooseData(data_58, () -> {
            pair_18 = __core__unConstrData__safe(data_58);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_18), 4),
                () -> {
                    data_59 = __core__listData(__core__sndPair(pair_18));
                    __core__chooseData(data_59, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_41 = __core__unListData__safe(data_59);
                        __core__chooseList(fields_41, () -> {
                            false
                        }, () -> {
                            head_30 = __core__headList__safe(fields_41);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_30),
                                () -> {
                                    fields_42 = __core__tailList__safe(fields_41);
                                    __core__chooseList(fields_42, () -> {
                                        false
                                    }, () -> {
                                        head_31 = __core__headList__safe(fields_42);
                                        __core__ifThenElse(
                                            __module__TypeMapMetadata__TypeMap[]__is_valid_data(head_31),
                                            () -> {
                                                fields_43 = __core__tailList__safe(fields_42);
                                                __core__chooseList(fields_43, true, false)
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
    __helios__list[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]]__length = __helios__common__length;
    __module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]__is_valid_data = (data_60) -> {
        __core__chooseData(data_60, () -> {
            false
        }, () -> {
            false
        }, () -> {
            fields_44 = __core__unListData__safe(data_60);
            __core__chooseList(fields_44, () -> {
                false
            }, () -> {
                head_32 = __core__headList__safe(fields_44);
                __core__ifThenElse(
                    __helios__txoutput__is_valid_data(head_32),
                    () -> {
                        fields_45 = __core__tailList__safe(fields_44);
                        __core__chooseList(fields_45, () -> {
                            false
                        }, () -> {
                            head_33 = __core__headList__safe(fields_45);
                            __core__ifThenElse(
                                __module__CapoHelpers__CapoDatum[]__SettingsData__is_valid_data_2(head_33),
                                () -> {
                                    fields_46 = __core__tailList__safe(fields_45);
                                    __core__chooseList(fields_46, () -> {
                                        false
                                    }, () -> {
                                        head_34 = __core__headList__safe(fields_46);
                                        __core__ifThenElse(
                                            __helios__data__is_valid_data(head_34),
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
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]__from_data = (data_61) -> {
        ignore_3 = __core__ifThenElse(
            __module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]__is_valid_data(data_61),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid outputAndDatum data", ())
            }
        )();
        __core__unListData(data_61)
    };
    __helios__list[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]]__head = (self_60) -> {
        __module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]__from_data(__core__headList(self_60))
    };
    __module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]__output = (self_61) -> {
        __helios__txoutput__from_data(__helios__common__struct_field_0(self_61))
    };
    __helios__list[__helios__txoutput]__map_option[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]] = (self_62) -> {
        (fn_13) -> {
            recurse_53 = (recurse_52, lst_9) -> {
                __core__chooseList(lst_9, () -> {
                    lst_9
                }, () -> {
                    head_35 = __helios__txoutput__from_data(__core__headList__safe(lst_9));
                    tail_3 = recurse_52(recurse_52, __core__tailList__safe(lst_9));
                    opt = __core__unConstrData(fn_13(head_35));
                    __core__ifThenElse(
                        __core__equalsInteger(__core__fstPair(opt), 0),
                        () -> {
                            __core__mkCons(__core__headList(__core__sndPair(opt)), tail_3)
                        },
                        () -> {
                            tail_3
                        }
                    )()
                })()
            };
            recurse_53(recurse_53, self_62)
        }
    };
    __module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]____to_data = __helios__struct____to_data;
    __helios__option[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]]__some____new = (some) -> {
        __core__constrData(0, __helios__common__list_1(__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]____to_data(some)))
    };
    __module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]____new = (output_1, datum, rawData) -> {
        __core__mkCons(__helios__txoutput____to_data(output_1), __core__mkCons(__module__CapoHelpers__CapoDatum[]__SettingsData____to_data(datum), __core__mkCons(__helios__data____to_data(rawData), __core__mkNilData(()))))
    };
    __helios__option[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]]__none____new = () -> {
        __helios__option__NONE
    };
    __module__CapoHelpers__CapoDatum[]__mustFindSettingsOutput = (self_63) -> {
        (mph_7, inAddr) -> {
            settingsVal = __module__StellarHeliosHelpers__mkTv(mph_7, false, (), true, __cond_6 = self_63;
            __core__ifThenElse(
                __module__CapoHelpers__CapoDatum[]__CharterToken____is(__cond_6),
                () -> {
                    (ct) -> {
                        __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(" ⬅️ 🔎 finding settings output: ", __helios__bytearray__decode_utf8(__module__CapoHelpers__CapoDatum[]__CharterToken__settingsUut(ct))()), "
")), __module__CapoHelpers__CapoDatum[]__CharterToken__settingsUut(ct))
                    }
                },
                () -> {
                    (__1) -> {
                        __helios__error("mustFindSettings - only valid on CharterToken datum")
                    }
                }
            )()(__cond_6), false, ());
            notFound = __helios__option[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]]__none____new();
            foundSettings = __helios__list[__helios__txoutput]__map_option[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]](__helios__tx__outputs(__helios__scriptcontext__tx))((output_2) -> {
                __core__ifThenElse(
                    __helios__address____neq(__helios__txoutput__address(output_2), inAddr),
                    () -> {
                        notFound
                    },
                    () -> {
                        () -> {
                            rawDatum = __helios__txoutputdatum__inline(__helios__txoutput__datum(output_2));
                            __cond_7 = __module__CapoHelpers__CapoDatum[]__from_data(__module__CapoHelpers__CapoDatum[]__CharterToken__is_valid_data_2, __module__CapoHelpers__CapoDatum[]__ScriptReference__is_valid_data_2, __module__CapoHelpers__CapoDatum[]__SettingsData__is_valid_data_2, __module__CapoHelpers__CapoDatum[]__DelegatedData__is_valid_data_2, __module__CapoHelpers__CapoDatum[]__TypeMapInfo__is_valid_data_2)(rawDatum);
                            __core__ifThenElse(
                                __module__CapoHelpers__CapoDatum[]__SettingsData____is(__cond_7),
                                () -> {
                                    (settings) -> {
                                        __helios__option[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]]__some____new(__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]____new(output_2, settings, rawDatum))
                                    }
                                },
                                () -> {
                                    (__2) -> {
                                        notFound
                                    }
                                }
                            )()(__cond_7)
                        }()
                    }
                )()
            });
            __core__chooseUnit(__helios__assert(__helios__int____lt(__helios__list[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]]__length(foundSettings), 2), "too many settings outputs"), __core__chooseUnit(__helios__assert(__helios__int____eq(__helios__list[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]]__length(foundSettings), 1), "no settings output"), settingsOutput = __module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]__output(__helios__list[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]]__head(foundSettings));
            __core__chooseUnit(__helios__assert(__helios__value__contains(__helios__txoutput__value(settingsOutput))(settingsVal), "settings output not found in contract with expected UUT"), __core__chooseUnit(__helios__assert(__helios__value__contains(settingsVal)(__helios__value__get_assets(__helios__txoutput__value(settingsOutput))()), __helios__string____add("excess value in settings output: ", __helios__value__show(__helios__value____sub(__helios__txoutput__value(settingsOutput), settingsVal))())), __core__chooseUnit(__helios__print("
 ⬅️ ✅ found CapoDatum::SettingsData
"), __helios__list[__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]]__head(foundSettings))))))
        }
    };
    __module__CapoMintHelpers__MinterActivity[]__is_valid_data = (__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data) -> {
        (data_62) -> {
            __core__ifThenElse(
                __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data(data_62),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data(data_62),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data(data_62),
                                () -> {
                                    true
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data(data_62),
                                        () -> {
                                            true
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data(data_62),
                                                () -> {
                                                    true
                                                },
                                                () -> {
                                                    __core__ifThenElse(
                                                        __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data(data_62),
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
        (data_63) -> {
            ignore_4 = __core__ifThenElse(
                __module__CapoMintHelpers__MinterActivity[]__is_valid_data(__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_1)(data_63),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid MinterActivity data", ())
                }
            )();
            data_63
        }
    };
    __module__CapoMintHelpers__MinterActivity[]__mintingCharter____is = (data_64) -> {
        __helios__common__enum_tag_equals(data_64, 0)
    };
    __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_2 = (data_65) -> {
        __core__chooseData(data_65, () -> {
            pair_19 = __core__unConstrData__safe(data_65);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_19), 0),
                () -> {
                    data_66 = __core__listData(__core__sndPair(pair_19));
                    __core__chooseData(data_66, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_48 = __core__unListData__safe(data_66);
                        __core__chooseList(fields_48, () -> {
                            false
                        }, () -> {
                            head_36 = __core__headList__safe(fields_48);
                            __core__ifThenElse(
                                __helios__address__is_valid_data(head_36),
                                () -> {
                                    fields_49 = __core__tailList__safe(fields_48);
                                    __core__chooseList(fields_49, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__mintingCharter__owner = (self_64) -> {
        __helios__address__from_data(__helios__common__enum_field_0(self_64, "mintingCharter owner"))
    };
    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_2 = (data_67) -> {
        __core__chooseData(data_67, () -> {
            pair_20 = __core__unConstrData__safe(data_67);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_20), 1),
                () -> {
                    data_68 = __core__listData(__core__sndPair(pair_20));
                    __core__chooseData(data_68, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_50 = __core__unListData__safe(data_68);
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
    __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_2 = (data_69) -> {
        __core__chooseData(data_69, () -> {
            pair_21 = __core__unConstrData__safe(data_69);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_21), 2),
                () -> {
                    data_70 = __core__listData(__core__sndPair(pair_21));
                    __core__chooseData(data_70, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_51 = __core__unListData__safe(data_70);
                        __core__chooseList(fields_51, () -> {
                            false
                        }, () -> {
                            head_37 = __core__headList__safe(fields_51);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_37),
                                () -> {
                                    fields_52 = __core__tailList__safe(fields_51);
                                    __core__chooseList(fields_52, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_2 = (data_71) -> {
        __core__chooseData(data_71, () -> {
            pair_22 = __core__unConstrData__safe(data_71);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_22), 3),
                () -> {
                    data_72 = __core__listData(__core__sndPair(pair_22));
                    __core__chooseData(data_72, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_53 = __core__unListData__safe(data_72);
                        __core__chooseList(fields_53, () -> {
                            false
                        }, () -> {
                            head_38 = __core__headList__safe(fields_53);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_38),
                                () -> {
                                    fields_54 = __core__tailList__safe(fields_53);
                                    __core__chooseList(fields_54, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_2 = (data_73) -> {
        __core__chooseData(data_73, () -> {
            pair_23 = __core__unConstrData__safe(data_73);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_23), 4),
                () -> {
                    data_74 = __core__listData(__core__sndPair(pair_23));
                    __core__chooseData(data_74, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_55 = __core__unListData__safe(data_74);
                        __core__chooseList(fields_55, () -> {
                            false
                        }, () -> {
                            head_39 = __core__headList__safe(fields_55);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_39),
                                () -> {
                                    fields_56 = __core__tailList__safe(fields_55);
                                    __core__chooseList(fields_56, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_2 = (data_75) -> {
        __core__chooseData(data_75, () -> {
            pair_24 = __core__unConstrData__safe(data_75);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_24), 5),
                () -> {
                    data_76 = __core__listData(__core__sndPair(pair_24));
                    __core__chooseData(data_76, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_57 = __core__unListData__safe(data_76);
                        __core__chooseList(fields_57, () -> {
                            false
                        }, () -> {
                            head_40 = __core__headList__safe(fields_57);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_40),
                                () -> {
                                    fields_58 = __core__tailList__safe(fields_57);
                                    __core__chooseList(fields_58, () -> {
                                        false
                                    }, () -> {
                                        head_41 = __core__headList__safe(fields_58);
                                        __core__ifThenElse(
                                            __helios__option[__helios__bytearray]__is_valid_data(head_41),
                                            () -> {
                                                fields_59 = __core__tailList__safe(fields_58);
                                                __core__chooseList(fields_59, true, false)
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
    __module__CapoMinter__rev = __helios__int__from_data(__core__iData(1));
    __module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]____eq = __helios__struct____eq;
    __module__CapoMinter__main = (rd) -> {
        r = __module__CapoMintHelpers__MinterActivity[]__from_data(__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__ForcingNewMintDelegate__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_2)(rd);
        mph_8 = __helios__scriptcontext__get_current_minting_policy_hash();
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
        }(__cond_8 = r;
        __core__ifThenElse(
            __module__CapoMintHelpers__MinterActivity[]__mintingCharter____is(__cond_8),
            () -> {
                (charter) -> {
                    charterVal = __module__StellarHeliosHelpers__mkTv(mph_8, true, "charter", false, (), false, ());
                    __core__chooseUnit(__helios__assert(__helios__value____geq(value_minted, charterVal), "charter token not minted"), __core__chooseUnit(__helios__print("  -- creating charter"), hasSeed = true;
                    mintsUuts = true;
                    charterOutput = __helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output_3) -> {
                        __helios__bool__and(() -> {
                            __helios__address____eq(__helios__txoutput__address(output_3), __module__CapoMintHelpers__MinterActivity[]__mintingCharter__owner(charter))
                        }, () -> {
                            __helios__value__contains(__helios__txoutput__value(output_3))(charterVal)
                        })
                    });
                    __core__chooseUnit(__helios__assert(__helios__bytearray____eq(__helios__txoutput__serialize(charterOutput)(), __helios__txoutput__serialize(charterOutput)()), "no way"), charterData = __helios__txoutputdatum__inline(__helios__txoutput__datum(charterOutput));
                    charterDatum = __module__CapoHelpers__CapoDatum[]__CharterToken__from_data(charterData);
                    __lhs_0_14 = __helios__common__assert_constr_index(charterDatum, 0);
                    spendDgt = __module__CapoHelpers__CapoDatum[]__CharterToken__spendDelegateLink(__lhs_0_14);
                    mintDgt = __module__CapoHelpers__CapoDatum[]__CharterToken__mintDelegateLink(__lhs_0_14);
                    foundSettings_1 = __module__CapoHelpers__CapoDatum[]__mustFindSettingsOutput(charterDatum)(mph_8, __module__CapoMintHelpers__MinterActivity[]__mintingCharter__owner(charter));
                    __core__chooseUnit(__helios__assert(__module__StellarHeliosHelpers__outputAndDatum[__module__CapoHelpers__CapoDatum[]__SettingsData]____eq(foundSettings_1, foundSettings_1), "no way"), __core__chooseUnit(__helios__print("  -- checking for required delegates
"), hasGoodDelegates = __helios__bool__and(() -> {
                        __helios__bool__and(() -> {
                            true
                        }, () -> {
                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(mintDgt)(mph_8, true, true, true, __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new())
                        })
                    }, () -> {
                        __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasValidOutput(spendDgt)(mph_8, true, true, true, __module__CapoDelegateHelpers__DgTknDisposition[]__Created____new())
                    });
                    __helios__bool__and(() -> {
                        __helios__bool__and(() -> {
                            hasGoodDelegates
                        }, () -> {
                            mintsUuts
                        })
                    }, () -> {
                        hasSeed
                    }))))))
                }
            },
            () -> {
                (__3) -> {
                    __cond_9 = rd;
                    __core__ifThenElse(
                        __helios__data__constrdata____is(__cond_9),
                        () -> {
                            (__lhs_0_13) -> {
                                index_8 = __helios__data__constrdata__tag(__lhs_0_13);
                                __helios__error(__helios__string____add("no way, got index ", __helios__int__show(index_8)()))
                            }
                        },
                        () -> {
                            (__4) -> {
                                __helios__error("bologna")
                            }
                        }
                    )()(__cond_9)
                }
            }
        )()(__cond_8))))))
    };
    __core__ifThenElse(
        __module__CapoMinter__main(__helios__data__from_data(__REDEEMER)),
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
