import { strictEqual } from "node:assert"
import { test } from "node:test"
import { isLeft, isRight } from "@helios-lang/type-utils"
import {
    makeBasicUplcLogger,
    makeConstrData,
    makeUplcDataValue,
    decodeUplcData
} from "@helios-lang/uplc"
import { DEFAULT_PARSE_OPTIONS, compile } from "../src/index.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcProgramV2} UplcProgramV2
 */

test("unoptimized and optimized CapoMinter behave the same", () => {
    let unoptimizedIR = '(__REDEEMER, __CONTEXT) -> {\n    __helios__error = (msg) -> {\n        __core__trace(msg, () -> {\n            error()\n        })()\n    };\n    __helios__assert = (cond, msg_1) -> {\n        __core__ifThenElse(\n            cond,\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace(msg_1, () -> {\n                    error()\n                })()\n            }\n        )()\n    };\n    __helios__bool__or = (a, b) -> {\n        __core__ifThenElse(\n            a(),\n            () -> {\n                true\n            },\n            () -> {\n                b()\n            }\n        )()\n    };\n    __helios__bytearray____eq = __core__equalsByteString;\n    __helios__int____to_data = __core__iData;\n    __helios__int__serialize = (self) -> {\n        () -> {\n            __core__serialiseData(__helios__int____to_data(self))\n        }\n    };\n    __helios__common__serialize = (self_1) -> {\n        () -> {\n            __core__serialiseData(self_1)\n        }\n    };\n    __helios__txid__serialize = __helios__common__serialize;\n    __helios__print = (msg_2) -> {\n        __core__trace(msg_2, ())\n    };\n    __helios__string____add = __core__appendString;\n    __helios__int__to_hex = (self_2) -> {\n        () -> {\n            recurse_1 = (recurse) -> {\n                (self_3, bytes) -> {\n                    digit = __core__modInteger(self_3, 16);\n                    bytes_1 = __core__consByteString(__core__ifThenElse(\n                        __core__lessThanInteger(digit, 10),\n                        __core__addInteger(digit, 48),\n                        __core__addInteger(digit, 87)\n                    ), bytes);\n                    __core__ifThenElse(\n                        __core__lessThanInteger(self_3, 16),\n                        () -> {\n                            bytes_1\n                        },\n                        () -> {\n                            recurse(recurse)(__core__divideInteger(self_3, 16), bytes_1)\n                        }\n                    )()\n                }\n            };\n            __core__decodeUtf8__safe(__core__ifThenElse(\n                __core__lessThanInteger(self_2, 0),\n                () -> {\n                    __core__consByteString(45, recurse_1(recurse_1)(__core__multiplyInteger(self_2, -1), #))\n                },\n                () -> {\n                    recurse_1(recurse_1)(self_2, #)\n                }\n            )())\n        }\n    };\n    __helios__bytearray__show = (self_4) -> {\n        () -> {\n            recurse_3 = (recurse_2, self_5) -> {\n                n = __core__lengthOfByteString(self_5);\n                __core__ifThenElse(\n                    __core__lessThanInteger(0, n),\n                    () -> {\n                        __core__appendString(__core__decodeUtf8__safe(hex_bytes = __core__encodeUtf8(__helios__int__to_hex(__core__indexByteString__safe(self_5, 0))());\n                        __core__ifThenElse(\n                            __core__equalsInteger(__core__lengthOfByteString(hex_bytes), 1),\n                            __core__consByteString(48, hex_bytes),\n                            hex_bytes\n                        )), recurse_2(recurse_2, __core__sliceByteString(1, n, self_5)))\n                    },\n                    () -> {\n                        ""\n                    }\n                )()\n            };\n            recurse_3(recurse_3, self_4)\n        }\n    };\n    __helios__mintingpolicyhash__show = __helios__bytearray__show;\n    __helios__bytearray__from_data = __core__unBData;\n    __helios__mintingpolicyhash__from_data = __helios__bytearray__from_data;\n    __helios__common__enum_fields = (self_6) -> {\n        __core__sndPair(__core__unConstrData(self_6))\n    };\n    __helios__common__enum_field_0 = (self_7) -> {\n        __core__headList(__helios__common__enum_fields(self_7))\n    };\n    __helios__common__enum_fields_after_0 = (self_8) -> {\n        __core__tailList(__helios__common__enum_fields(self_8))\n    };\n    __helios__common__enum_field_1 = (self_9) -> {\n        __core__headList(__helios__common__enum_fields_after_0(self_9))\n    };\n    __helios__scriptcontext__data = __CONTEXT;\n    __helios__scriptcontext__purpose = __helios__common__enum_field_1(__helios__scriptcontext__data);\n    __helios__scriptcontext__get_spending_purpose_output_id = () -> {\n        __helios__common__enum_field_0(__helios__scriptcontext__purpose)\n    };\n    __helios__scriptcontext__get_current_minting_policy_hash = () -> {\n        __helios__mintingpolicyhash__from_data(__helios__scriptcontext__get_spending_purpose_output_id())\n    };\n    __helios__bool____not = (b_1) -> {\n        __core__ifThenElse(\n            b_1,\n            false,\n            true\n        )\n    };\n    __helios__value__get_inner_map_int = (map, key) -> {\n        recurse_5 = (recurse_4, map_1, key_1) -> {\n            __core__chooseList(map_1, () -> {\n                0\n            }, () -> {\n                __core__ifThenElse(\n                    __core__equalsData(__core__fstPair(__core__headList__safe(map_1)), key_1),\n                    () -> {\n                        __core__unIData(__core__sndPair(__core__headList__safe(map_1)))\n                    },\n                    () -> {\n                        recurse_4(recurse_4, __core__tailList__safe(map_1), key_1)\n                    }\n                )()\n            })()\n        };\n        recurse_5(recurse_5, map, key)\n    };\n    __helios__common__list_0 = __core__mkNilData(());\n    __helios__value__get_map_keys = (map_2) -> {\n        recurse_7 = (recurse_6, map_3) -> {\n            __core__chooseList(map_3, () -> {\n                __helios__common__list_0\n            }, () -> {\n                __core__mkCons(__core__fstPair(__core__headList__safe(map_3)), recurse_6(recurse_6, __core__tailList__safe(map_3)))\n            })()\n        };\n        recurse_7(recurse_7, map_2)\n    };\n    __helios__common__any = (self_10, fn) -> {\n        recurse_9 = (recurse_8, self_11, fn_1) -> {\n            __core__chooseList(self_11, () -> {\n                false\n            }, () -> {\n                __core__ifThenElse(\n                    fn_1(__core__headList__safe(self_11)),\n                    () -> {\n                        true\n                    },\n                    () -> {\n                        recurse_8(recurse_8, __core__tailList__safe(self_11), fn_1)\n                    }\n                )()\n            })()\n        };\n        recurse_9(recurse_9, self_10, fn)\n    };\n    __helios__common__is_in_bytearray_list = (lst, key_2) -> {\n        __helios__common__any(lst, (item) -> {\n            __core__equalsData(item, key_2)\n        })\n    };\n    __helios__common__concat = (a_1, b_2) -> {\n        recurse_11 = (recurse_10, lst_1, rem) -> {\n            __core__chooseList(rem, () -> {\n                lst_1\n            }, () -> {\n                __core__mkCons(__core__headList__safe(rem), recurse_10(recurse_10, lst_1, __core__tailList__safe(rem)))\n            })()\n        };\n        recurse_11(recurse_11, b_2, a_1)\n    };\n    __helios__value__merge_map_keys = (a_2, b_3) -> {\n        aKeys = __helios__value__get_map_keys(a_2);\n        recurse_13 = (recurse_12, keys, map_4) -> {\n            __core__chooseList(map_4, () -> {\n                __helios__common__list_0\n            }, () -> {\n                key_3 = __core__fstPair(__core__headList__safe(map_4));\n                __core__ifThenElse(\n                    __helios__common__is_in_bytearray_list(aKeys, key_3),\n                    () -> {\n                        recurse_12(recurse_12, keys, __core__tailList__safe(map_4))\n                    },\n                    () -> {\n                        __core__mkCons(key_3, recurse_12(recurse_12, keys, __core__tailList__safe(map_4)))\n                    }\n                )()\n            })()\n        };\n        uniqueBKeys = recurse_13(recurse_13, aKeys, b_3);\n        __helios__common__concat(aKeys, uniqueBKeys)\n    };\n    __helios__value__compare_inner = (comp, a_3, b_4) -> {\n        recurse_15 = (recurse_14, keys_1) -> {\n            __core__chooseList(keys_1, () -> {\n                true\n            }, () -> {\n                key_4 = __core__headList__safe(keys_1);\n                __core__ifThenElse(\n                    __helios__bool____not(comp(__helios__value__get_inner_map_int(a_3, key_4), __helios__value__get_inner_map_int(b_4, key_4))),\n                    () -> {\n                        false\n                    },\n                    () -> {\n                        recurse_14(recurse_14, __core__tailList__safe(keys_1))\n                    }\n                )()\n            })()\n        };\n        recurse_15(recurse_15, __helios__value__merge_map_keys(a_3, b_4))\n    };\n    __helios__value__get_inner_map = (map_5, mph) -> {\n        recurse_17 = (recurse_16, map_6) -> {\n            __core__chooseList(map_6, () -> {\n                __core__mkNilPairData(())\n            }, () -> {\n                __core__ifThenElse(\n                    __core__equalsData(__core__fstPair(__core__headList__safe(map_6)), mph),\n                    () -> {\n                        __core__unMapData(__core__sndPair(__core__headList__safe(map_6)))\n                    },\n                    () -> {\n                        recurse_16(recurse_16, __core__tailList__safe(map_6))\n                    }\n                )()\n            })()\n        };\n        recurse_17(recurse_17, map_5)\n    };\n    __helios__value__compare = (a_4, b_5, comp_1) -> {\n        recurse_19 = (recurse_18, keys_2) -> {\n            __core__chooseList(keys_2, () -> {\n                true\n            }, () -> {\n                key_5 = __core__headList__safe(keys_2);\n                __core__ifThenElse(\n                    __helios__bool____not(__helios__value__compare_inner(comp_1, __helios__value__get_inner_map(a_4, key_5), __helios__value__get_inner_map(b_5, key_5))),\n                    () -> {\n                        false\n                    },\n                    () -> {\n                        recurse_18(recurse_18, __core__tailList__safe(keys_2))\n                    }\n                )()\n            })()\n        };\n        recurse_19(recurse_19, __helios__value__merge_map_keys(a_4, b_5))\n    };\n    __helios__value____geq = (a_5, b_6) -> {\n        __helios__value__compare(a_5, b_6, (a_qty, b_qty) -> {\n            __helios__bool____not(__core__lessThanInteger(a_qty, b_qty))\n        })\n    };\n    __helios__bool__show = (self_12) -> {\n        () -> {\n            __core__ifThenElse(\n                self_12,\n                "true",\n                "false"\n            )\n        }\n    };\n    __helios__bool__and = (a_6, b_7) -> {\n        __core__ifThenElse(\n            a_6(),\n            () -> {\n                b_7()\n            },\n            () -> {\n                false\n            }\n        )()\n    };\n    __helios__common__list_1 = (a_7) -> {\n        __core__mkCons(a_7, __helios__common__list_0)\n    };\n    __helios__common__list_2 = (arg0, arg1) -> {\n        __core__mkCons(arg0, __helios__common__list_1(arg1))\n    };\n    __helios__txoutputid__new = (tx_id, idx) -> {\n        __core__constrData(0, __helios__common__list_2(tx_id, __helios__int____to_data(idx)))\n    };\n    __helios__string____to_data = (s) -> {\n        __core__bData(__core__encodeUtf8(s))\n    };\n    __helios__common__enum_fields_after_1 = (self_13) -> {\n        __core__tailList(__helios__common__enum_fields_after_0(self_13))\n    };\n    __helios__common__enum_fields_after_2 = (self_14) -> {\n        __core__tailList(__helios__common__enum_fields_after_1(self_14))\n    };\n    __helios__common__enum_fields_after_3 = (self_15) -> {\n        __core__tailList(__helios__common__enum_fields_after_2(self_15))\n    };\n    __helios__common__enum_field_4 = (self_16) -> {\n        __core__headList(__helios__common__enum_fields_after_3(self_16))\n    };\n    __helios__tx__minted = (self_17) -> {\n        __core__unMapData(__helios__common__enum_field_4(self_17))\n    };\n    __helios__scriptcontext__tx = __helios__common__enum_field_0(__helios__scriptcontext__data);\n    __helios__int__from_data = __core__unIData;\n    __helios__common__identity = (self_18) -> {\n        self_18\n    };\n    __helios__txid__from_data = __helios__common__identity;\n    __helios__common__test_constr_data_2 = (data, index, test_a, test_b) -> {\n        __core__chooseData(data, () -> {\n            pair = __core__unConstrData__safe(data);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair), index),\n                () -> {\n                    fields = __core__sndPair(pair);\n                    __core__chooseList(fields, () -> {\n                        false\n                    }, () -> {\n                        __core__ifThenElse(\n                            test_a(__core__headList__safe(fields)),\n                            () -> {\n                                tail = __core__tailList__safe(fields);\n                                __core__chooseList(tail, () -> {\n                                    false\n                                }, () -> {\n                                    __core__ifThenElse(\n                                        test_b(__core__headList__safe(tail)),\n                                        () -> {\n                                            __core__chooseList(__core__tailList__safe(tail), () -> {\n                                                true\n                                            }, () -> {\n                                                false\n                                            })()\n                                        },\n                                        () -> {\n                                            false\n                                        }\n                                    )()\n                                })()\n                            },\n                            () -> {\n                                false\n                            }\n                        )()\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__bytearray__is_valid_data_fixed_length = (n_1) -> {\n        (data_1) -> {\n            __core__chooseData(data_1, () -> {\n                false\n            }, () -> {\n                false\n            }, () -> {\n                false\n            }, () -> {\n                false\n            }, () -> {\n                bytes_2 = __core__unBData__safe(data_1);\n                __core__ifThenElse(\n                    __core__equalsInteger(__core__lengthOfByteString(bytes_2), n_1),\n                    () -> {\n                        true\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        }\n    };\n    __helios__txid__is_valid_data = (data_2) -> {\n        __core__chooseData(data_2, () -> {\n            pair_1 = __core__unConstrData__safe(data_2);\n            index_1 = __core__fstPair(pair_1);\n            fields_1 = __core__sndPair(pair_1);\n            __core__ifThenElse(\n                __core__equalsInteger(0, index_1),\n                () -> {\n                    __core__chooseList(fields_1, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_1), () -> {\n                            __helios__bytearray__is_valid_data_fixed_length(32)(__core__headList__safe(fields_1))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__int__is_valid_data = (data_3) -> {\n        __core__chooseData(data_3, false, false, false, true, false)\n    };\n    __helios__txoutputid__is_valid_data = (data_4) -> {\n        __helios__common__test_constr_data_2(data_4, 0, __helios__txid__is_valid_data, __helios__int__is_valid_data)\n    };\n    __helios__bytearray__is_valid_data = (data_5) -> {\n        __core__chooseData(data_5, false, false, false, false, true)\n    };\n    __helios__common__enum_tag_equals = (data_6, i) -> {\n        __core__equalsInteger(__core__fstPair(__core__unConstrData(data_6)), i)\n    };\n    __helios__validatorhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);\n    __helios__pubkeyhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);\n    __helios__spendingcredential__is_valid_data = (data_7) -> {\n        __core__chooseData(data_7, () -> {\n            pair_2 = __core__unConstrData__safe(data_7);\n            index_2 = __core__fstPair(pair_2);\n            fields_2 = __core__sndPair(pair_2);\n            __core__ifThenElse(\n                __core__equalsInteger(index_2, 0),\n                () -> {\n                    __core__chooseList(fields_2, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_2), () -> {\n                            __helios__validatorhash__is_valid_data(__core__headList__safe(fields_2))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_2, 1),\n                        () -> {\n                            __core__chooseList(fields_2, () -> {\n                                false\n                            }, () -> {\n                                __core__chooseList(__core__tailList__safe(fields_2), () -> {\n                                    __helios__pubkeyhash__is_valid_data(__core__headList__safe(fields_2))\n                                }, () -> {\n                                    false\n                                })()\n                            })()\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__common__test_list_head_data = (test_head, test_tail) -> {\n        (list) -> {\n            __core__chooseList(list, () -> {\n                false\n            }, () -> {\n                __core__ifThenElse(\n                    test_head(__core__headList(list)),\n                    () -> {\n                        test_tail(__core__tailList(list))\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        }\n    };\n    __helios__stakinghash__is_valid_data = __helios__spendingcredential__is_valid_data;\n    __helios__common__test_list_empty = (list_1) -> {\n        __core__chooseList(list_1, true, false)\n    };\n    __helios__stakingcredential__is_valid_data = (data_8) -> {\n        __core__chooseData(data_8, () -> {\n            pair_3 = __core__unConstrData__safe(data_8);\n            tag = __core__fstPair(pair_3);\n            fields_3 = __core__sndPair(pair_3);\n            __core__ifThenElse(\n                __core__equalsInteger(tag, 0),\n                () -> {\n                    __helios__common__test_list_head_data(__helios__stakinghash__is_valid_data, __helios__common__test_list_empty)(fields_3)\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(tag, 1),\n                        () -> {\n                            __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_empty)))(fields_3)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__option[__helios__stakingcredential]__is_valid_data = (data_9) -> {\n        __core__chooseData(data_9, () -> {\n            pair_4 = __core__unConstrData__safe(data_9);\n            index_3 = __core__fstPair(pair_4);\n            fields_4 = __core__sndPair(pair_4);\n            __core__ifThenElse(\n                __core__equalsInteger(index_3, 0),\n                () -> {\n                    __core__chooseList(fields_4, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_4), () -> {\n                            __helios__stakingcredential__is_valid_data(__core__headList__safe(fields_4))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_3, 1),\n                        () -> {\n                            __core__chooseList(fields_4, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__address__is_valid_data = (data_10) -> {\n        __helios__common__test_constr_data_2(data_10, 0, __helios__spendingcredential__is_valid_data, __helios__option[__helios__stakingcredential]__is_valid_data)\n    };\n    __helios__bytearray____to_data = __core__bData;\n    __helios__mintingpolicyhash____to_data = __helios__bytearray____to_data;\n    __helios__value__contains_policy = (self_19) -> {\n        (mph_1) -> {\n            mph_2 = __helios__mintingpolicyhash____to_data(mph_1);\n            recurse_21 = (recurse_20, map_7) -> {\n                __core__chooseList(map_7, () -> {\n                    false\n                }, () -> {\n                    __core__ifThenElse(\n                        __core__equalsData(__core__fstPair(__core__headList__safe(map_7)), mph_2),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            recurse_20(recurse_20, __core__tailList__safe(map_7))\n                        }\n                    )()\n                })()\n            };\n            recurse_21(recurse_21, self_19)\n        }\n    };\n    __helios__common__fold = (self_20, fn_2, z) -> {\n        recurse_23 = (recurse_22, self_21, z_1) -> {\n            __core__chooseList(self_21, () -> {\n                z_1\n            }, () -> {\n                recurse_22(recurse_22, __core__tailList__safe(self_21), fn_2(z_1, __core__headList__safe(self_21)))\n            })()\n        };\n        recurse_23(recurse_23, self_20, z)\n    };\n    __helios__mintingpolicyhash____eq = __helios__bytearray____eq;\n    __helios__int__show_digit = (x) -> {\n        __core__addInteger(__core__modInteger(x, 10), 48)\n    };\n    __helios__int__show = (self_22) -> {\n        () -> {\n            __core__decodeUtf8__safe(recurse_25 = (recurse_24, i_1, bytes_3) -> {\n                bytes_4 = __core__consByteString(__helios__int__show_digit(i_1), bytes_3);\n                __core__ifThenElse(\n                    __core__lessThanInteger(i_1, 10),\n                    () -> {\n                        bytes_4\n                    },\n                    () -> {\n                        recurse_24(recurse_24, __core__divideInteger(i_1, 10), bytes_4)\n                    }\n                )()\n            };\n            __core__ifThenElse(\n                __core__lessThanInteger(self_22, 0),\n                () -> {\n                    __core__consByteString(45, recurse_25(recurse_25, __core__multiplyInteger(self_22, -1), #))\n                },\n                () -> {\n                    recurse_25(recurse_25, self_22, #)\n                }\n            )())\n        }\n    };\n    __helios__value__show = (self_23) -> {\n        () -> {\n            __helios__common__fold(self_23, (prev, pair_5) -> {\n                mph_3 = __core__unBData__safe(__core__fstPair(pair_5));\n                tokens = __core__unMapData__safe(__core__sndPair(pair_5));\n                __helios__common__fold(tokens, (prev_1, pair_6) -> {\n                    token_name = __core__unBData__safe(__core__fstPair(pair_6));\n                    qty = __core__unIData__safe(__core__sndPair(pair_6));\n                    __helios__string____add(prev_1, __core__ifThenElse(\n                        __helios__mintingpolicyhash____eq(mph_3, #),\n                        () -> {\n                            __helios__string____add("lovelace: ", __helios__string____add(__helios__int__show(qty)(), "\n"))\n                        },\n                        () -> {\n                            __helios__string____add(__helios__mintingpolicyhash__show(mph_3)(), __helios__string____add(".", __helios__string____add(__helios__bytearray__show(token_name)(), __helios__string____add(": ", __helios__string____add(__helios__int__show(qty)(), "\n")))))\n                        }\n                    )())\n                }, prev)\n            }, "")\n        }\n    };\n    __helios__txid__bytes = (self_24) -> {\n        __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(self_24))))\n    };\n    __helios__txid__show = (self_25) -> {\n        __helios__bytearray__show(__helios__txid__bytes(self_25))\n    };\n    __helios__txoutputid__tx_id = __helios__common__enum_field_0;\n    __helios__txoutputid__index = (self_26) -> {\n        __helios__int__from_data(__helios__common__enum_field_1(self_26))\n    };\n    __helios__value__get_policy = (self_27) -> {\n        (mph_4) -> {\n            mph_5 = __helios__mintingpolicyhash____to_data(mph_4);\n            recurse_27 = (recurse_26, map_8) -> {\n                __core__chooseList(map_8, () -> {\n                    __helios__error("policy not found")\n                }, () -> {\n                    __core__ifThenElse(\n                        __core__equalsData(__core__fstPair(__core__headList__safe(map_8)), mph_5),\n                        () -> {\n                            __core__unMapData(__core__sndPair(__core__headList__safe(map_8)))\n                        },\n                        () -> {\n                            recurse_26(recurse_26, __core__tailList__safe(map_8))\n                        }\n                    )()\n                })()\n            };\n            recurse_27(recurse_27, self_27)\n        }\n    };\n    __helios__bytearray__decode_utf8 = (self_28) -> {\n        () -> {\n            __core__decodeUtf8(self_28)\n        }\n    };\n    __helios__value__from_map = __helios__common__identity;\n    __helios__value__to_map = (self_29) -> {\n        () -> {\n            self_29\n        }\n    };\n    __helios__bytearray____neq = (self_30, other) -> {\n        __helios__bool____not(__helios__bytearray____eq(self_30, other))\n    };\n    __helios__mintingpolicyhash____neq = __helios__bytearray____neq;\n    __helios__value____eq = (a_8, b_8) -> {\n        __helios__value__compare(a_8, b_8, __core__equalsInteger)\n    };\n    __helios__value__add_or_subtract_inner = (op) -> {\n        (a_9, b_9) -> {\n            recurse_29 = (recurse_28, keys_3, result) -> {\n                __core__chooseList(keys_3, () -> {\n                    result\n                }, () -> {\n                    key_6 = __core__headList__safe(keys_3);\n                    tail_1 = recurse_28(recurse_28, __core__tailList__safe(keys_3), result);\n                    sum = op(__helios__value__get_inner_map_int(a_9, key_6), __helios__value__get_inner_map_int(b_9, key_6));\n                    __core__ifThenElse(\n                        __core__equalsInteger(sum, 0),\n                        () -> {\n                            tail_1\n                        },\n                        () -> {\n                            __core__mkCons(__core__mkPairData(key_6, __core__iData(sum)), tail_1)\n                        }\n                    )()\n                })()\n            };\n            recurse_29(recurse_29, __helios__value__merge_map_keys(a_9, b_9), __core__mkNilPairData(()))\n        }\n    };\n    __helios__value__add_or_subtract = (a_10, b_10, op_1) -> {\n        recurse_31 = (recurse_30, keys_4, result_1) -> {\n            __core__chooseList(keys_4, () -> {\n                result_1\n            }, () -> {\n                key_7 = __core__headList__safe(keys_4);\n                tail_2 = recurse_30(recurse_30, __core__tailList__safe(keys_4), result_1);\n                item_1 = __helios__value__add_or_subtract_inner(op_1)(__helios__value__get_inner_map(a_10, key_7), __helios__value__get_inner_map(b_10, key_7));\n                __core__chooseList(item_1, () -> {\n                    tail_2\n                }, () -> {\n                    __core__mkCons(__core__mkPairData(key_7, __core__mapData(item_1)), tail_2)\n                })()\n            })()\n        };\n        recurse_31(recurse_31, __helios__value__merge_map_keys(a_10, b_10), __core__mkNilPairData(()))\n    };\n    __helios__value____add = (a_11, b_11) -> {\n        __helios__value__add_or_subtract(a_11, b_11, __core__addInteger)\n    };\n    __helios__string____eq = __core__equalsString;\n    __helios__string____neq = (self_31, other_1) -> {\n        __helios__bool____not(__helios__string____eq(self_31, other_1))\n    };\n    __helios__common__assert_constr_index = (data_11, i_2) -> {\n        __core__ifThenElse(\n            __core__equalsInteger(__core__fstPair(__core__unConstrData(data_11)), i_2),\n            () -> {\n                data_11\n            },\n            () -> {\n                __helios__error("unexpected constructor index")\n            }\n        )()\n    };\n    __helios__value__is_zero_inner = (tokens_1) -> {\n        recurse_33 = (recurse_32, tokens_2) -> {\n            __core__chooseList(tokens_2, () -> {\n                true\n            }, () -> {\n                __helios__bool__and(() -> {\n                    __core__equalsInteger(__core__unIData(__core__sndPair(__core__headList__safe(tokens_2))), 0)\n                }, () -> {\n                    recurse_32(recurse_32, __core__tailList__safe(tokens_2))\n                })\n            })()\n        };\n        recurse_33(recurse_33, tokens_1)\n    };\n    __helios__value__is_zero = (self_32) -> {\n        () -> {\n            recurse_35 = (recurse_34, map_9) -> {\n                __core__chooseList(map_9, () -> {\n                    true\n                }, () -> {\n                    __helios__bool__and(() -> {\n                        __helios__value__is_zero_inner(__core__unMapData(__core__sndPair(__core__headList__safe(map_9))))\n                    }, () -> {\n                        recurse_34(recurse_34, __core__tailList__safe(map_9))\n                    })\n                })()\n            };\n            recurse_35(recurse_35, self_32)\n        }\n    };\n    __helios__value__ZERO = __core__mkNilPairData(());\n    __helios__common__insert_in_sorted = (x_1, lst_2, comp_2) -> {\n        recurse_37 = (recurse_36, lst_3) -> {\n            __core__chooseList(lst_3, () -> {\n                __core__mkCons(x_1, lst_3)\n            }, () -> {\n                head = __core__headList__safe(lst_3);\n                __core__ifThenElse(\n                    comp_2(x_1, head),\n                    () -> {\n                        __core__mkCons(x_1, lst_3)\n                    },\n                    () -> {\n                        __core__mkCons(head, recurse_36(recurse_36, __core__tailList__safe(lst_3)))\n                    }\n                )()\n            })()\n        };\n        recurse_37(recurse_37, lst_2)\n    };\n    __helios__common__sort = (lst_4, comp_3) -> {\n        recurse_39 = (recurse_38, lst_5) -> {\n            __core__chooseList(lst_5, () -> {\n                lst_5\n            }, () -> {\n                (head_1, tail_3) -> {\n                    __helios__common__insert_in_sorted(head_1, tail_3, comp_3)\n                }(__core__headList__safe(lst_5), recurse_38(recurse_38, __core__tailList__safe(lst_5)))\n            })()\n        };\n        recurse_39(recurse_39, lst_4)\n    };\n    __helios__string__from_data = (d) -> {\n        __core__decodeUtf8(__core__unBData(d))\n    };\n    __helios__common__map = (self_33, fn_3, init) -> {\n        recurse_41 = (recurse_40, rem_1, lst_6) -> {\n            __core__chooseList(rem_1, () -> {\n                lst_6\n            }, () -> {\n                __core__mkCons(fn_3(__core__headList__safe(rem_1)), recurse_40(recurse_40, __core__tailList__safe(rem_1), lst_6))\n            })()\n        };\n        recurse_41(recurse_41, self_33, init)\n    };\n    __helios__value____to_data = __core__mapData;\n    __helios__value__value = __helios__common__identity;\n    __helios__value__from_data = __core__unMapData;\n    __helios__common__find_safe = (self_34, fn_4, callback) -> {\n        recurse_43 = (recurse_42, self_35, fn_5) -> {\n            __core__chooseList(self_35, () -> {\n                __core__constrData(1, __helios__common__list_0)\n            }, () -> {\n                head_2 = __core__headList__safe(self_35);\n                __core__ifThenElse(\n                    fn_5(head_2),\n                    () -> {\n                        __core__constrData(0, __helios__common__list_1(callback(head_2)))\n                    },\n                    () -> {\n                        recurse_42(recurse_42, __core__tailList__safe(self_35), fn_5)\n                    }\n                )()\n            })()\n        };\n        recurse_43(recurse_43, self_34, fn_4)\n    };\n    __helios__int__max = (a_12, b_12) -> {\n        __core__ifThenElse(\n            __core__lessThanInteger(a_12, b_12),\n            b_12,\n            a_12\n        )\n    };\n    __helios__common__slice_bytearray = (self_36, selfLengthFn) -> {\n        (start, end) -> {\n            normalize = (pos) -> {\n                __core__ifThenElse(\n                    __core__lessThanInteger(pos, 0),\n                    () -> {\n                        __core__addInteger(__core__addInteger(selfLengthFn(self_36), 1), pos)\n                    },\n                    () -> {\n                        pos\n                    }\n                )()\n            };\n            fn_7 = (start_1) -> {\n                fn_6 = (end_1) -> {\n                    __core__sliceByteString(start_1, __core__subtractInteger(end_1, __helios__int__max(start_1, 0)), self_36)\n                };\n                fn_6(normalize(end))\n            };\n            fn_7(normalize(start))\n        }\n    };\n    __helios__bytearray__slice = (self_37) -> {\n        __helios__common__slice_bytearray(self_37, __core__lengthOfByteString)\n    };\n    __helios__bytearray__blake2b = (self_38) -> {\n        () -> {\n            __core__blake2b_256(self_38)\n        }\n    };\n    __helios__int____gt = (a_13, b_13) -> {\n        __helios__bool____not(__core__lessThanEqualsInteger(a_13, b_13))\n    };\n    __helios__bytearray__length = __core__lengthOfByteString;\n    __helios__bytearray____add = __core__appendByteString;\n    __helios__string__encode_utf8 = (self_39) -> {\n        () -> {\n            __core__encodeUtf8(self_39)\n        }\n    };\n    __helios__data__from_data = __helios__common__identity;\n    __helios__common__all = (self_40, fn_8) -> {\n        recurse_45 = (recurse_44, self_41, fn_9) -> {\n            __core__chooseList(self_41, () -> {\n                true\n            }, () -> {\n                __core__ifThenElse(\n                    fn_9(__core__headList__safe(self_41)),\n                    () -> {\n                        recurse_44(recurse_44, __core__tailList__safe(self_41), fn_9)\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_45(recurse_45, self_40, fn_8)\n    };\n    __helios__common__enum_fields_after_4 = (self_42) -> {\n        __core__tailList(__helios__common__enum_fields_after_3(self_42))\n    };\n    __helios__common__enum_fields_after_5 = (self_43) -> {\n        __core__tailList(__helios__common__enum_fields_after_4(self_43))\n    };\n    __helios__common__enum_fields_after_6 = (self_44) -> {\n        __core__tailList(__helios__common__enum_fields_after_5(self_44))\n    };\n    __helios__common__enum_fields_after_7 = (self_45) -> {\n        __core__tailList(__helios__common__enum_fields_after_6(self_45))\n    };\n    __helios__common__enum_fields_after_8 = (self_46) -> {\n        __core__tailList(__helios__common__enum_fields_after_7(self_46))\n    };\n    __helios__common__enum_field_9 = (self_47) -> {\n        __core__headList(__helios__common__enum_fields_after_8(self_47))\n    };\n    __helios__tx__redeemers = (self_48) -> {\n        __core__unMapData(__helios__common__enum_field_9(self_48))\n    };\n    __helios__scriptpurpose__spending____is = (data_12) -> {\n        __helios__common__enum_tag_equals(data_12, 1)\n    };\n    __helios__common____eq = __core__equalsData;\n    __helios__txoutputid____eq = __helios__common____eq;\n    __helios__scriptpurpose__spending__output_id = __helios__common__enum_field_0;\n    __helios__txinput__output_id = __helios__common__enum_field_0;\n    __helios__tx__inputs = (self_49) -> {\n        __core__unListData(__helios__common__enum_field_0(self_49))\n    };\n    __helios__value__contains = (self_50) -> {\n        (value) -> {\n            __helios__value____geq(self_50, value)\n        }\n    };\n    __helios__txoutput__value = (self_51) -> {\n        __core__unMapData(__helios__common__enum_field_1(self_51))\n    };\n    __helios__txinput__output = __helios__common__enum_field_1;\n    __helios__txinput__value = (self_52) -> {\n        __helios__txoutput__value(__helios__txinput__output(self_52))\n    };\n    __helios__value__new = (assetClass, i_3) -> {\n        __core__ifThenElse(\n            __core__equalsInteger(0, i_3),\n            () -> {\n                __helios__value__ZERO\n            },\n            () -> {\n                mph_6 = __helios__common__enum_field_0(assetClass);\n                tokenName = __helios__common__enum_field_1(assetClass);\n                __core__mkCons(__core__mkPairData(mph_6, __core__mapData(__core__mkCons(__core__mkPairData(tokenName, __helios__int____to_data(i_3)), __core__mkNilPairData(())))), __core__mkNilPairData(()))\n            }\n        )()\n    };\n    __helios__assetclass__new = (mph_7, token_name_1) -> {\n        __core__constrData(0, __helios__common__list_2(__helios__mintingpolicyhash____to_data(mph_7), __helios__bytearray____to_data(token_name_1)))\n    };\n    __helios__common__map_get = (self_53, key_8, fnFound, fnNotFound) -> {\n        recurse_47 = (recurse_46, self_54, key_9) -> {\n            __core__chooseList(self_54, fnNotFound, () -> {\n                head_3 = __core__headList__safe(self_54);\n                __core__ifThenElse(\n                    __core__equalsData(key_9, __core__fstPair(head_3)),\n                    () -> {\n                        fnFound(__core__sndPair(head_3))\n                    },\n                    () -> {\n                        recurse_46(recurse_46, __core__tailList__safe(self_54), key_9)\n                    }\n                )()\n            })()\n        };\n        recurse_47(recurse_47, self_53, key_8)\n    };\n    __helios__scriptpurpose____to_data = __helios__common__identity;\n    __helios__txoutputid__show = (self_55) -> {\n        () -> {\n            __helios__string____add(__helios__txid__show(__helios__txoutputid__tx_id(self_55))(), __helios__string____add("#", __helios__int__show(__helios__txoutputid__index(self_55))()))\n        }\n    };\n    __helios__txoutputdatum__inline = (self_56) -> {\n        pair_7 = __core__unConstrData(self_56);\n        index_4 = __core__fstPair(pair_7);\n        fields_5 = __core__sndPair(pair_7);\n        __core__ifThenElse(\n            __core__equalsInteger(index_4, 2),\n            () -> {\n                __core__headList(fields_5)\n            },\n            () -> {\n                __helios__error("not an inline datum")\n            }\n        )()\n    };\n    __helios__common__enum_field_2 = (self_57) -> {\n        __core__headList(__helios__common__enum_fields_after_1(self_57))\n    };\n    __helios__txoutput__datum = __helios__common__enum_field_2;\n    __helios__txinput__datum = (self_58) -> {\n        __helios__txoutput__datum(__helios__txinput__output(self_58))\n    };\n    __helios__option__NONE = __core__constrData(1, __helios__common__list_0);\n    __helios__common__struct_fields_after_0 = __core__tailList;\n    __helios__common__struct_field_1 = (self_59) -> {\n        __core__headList(__helios__common__struct_fields_after_0(self_59))\n    };\n    __helios__common__struct_field_0 = __core__headList;\n    __helios__data__constrdata____is = (data_13) -> {\n        __core__chooseData(data_13, () -> {\n            true\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__int____eq = __core__equalsInteger;\n    __helios__data__constrdata__fields = (data_14) -> {\n        __core__sndPair(__core__unConstrData(data_14))\n    };\n    __helios__data__constrdata__tag = (data_15) -> {\n        __core__fstPair(__core__unConstrData(data_15))\n    };\n    __helios__txinput__from_data = __helios__common__identity;\n    __helios__common__length = (lst_7) -> {\n        recurse_49 = (recurse_48, lst_8) -> {\n            __core__chooseList(lst_8, () -> {\n                0\n            }, () -> {\n                __core__addInteger(recurse_48(recurse_48, __core__tailList__safe(lst_8)), 1)\n            })()\n        };\n        recurse_49(recurse_49, lst_7)\n    };\n    __helios__common__struct_fields_after_1 = (self_60) -> {\n        __core__tailList(__helios__common__struct_fields_after_0(self_60))\n    };\n    __helios__common__struct_fields_after_2 = (self_61) -> {\n        __core__tailList(__helios__common__struct_fields_after_1(self_61))\n    };\n    __helios__common__struct_fields_after_3 = (self_62) -> {\n        __core__tailList(__helios__common__struct_fields_after_2(self_62))\n    };\n    __helios__common__struct_field_4 = (self_63) -> {\n        __core__headList(__helios__common__struct_fields_after_3(self_63))\n    };\n    __helios__common__struct_field_3 = (self_64) -> {\n        __core__headList(__helios__common__struct_fields_after_2(self_64))\n    };\n    __helios__txoutput__is_valid_data = (data_16) -> {\n        __core__chooseData(data_16, () -> {\n            true\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__txinput__is_valid_data = (data_17) -> {\n        __helios__common__test_constr_data_2(data_17, 0, __helios__txoutputid__is_valid_data, __helios__txoutput__is_valid_data)\n    };\n    __helios__tx__ref_inputs = (self_65) -> {\n        __core__unListData(__helios__common__enum_field_1(self_65))\n    };\n    __helios__txinput____to_data = __helios__common__identity;\n    __helios__common__enum_field_3 = (self_66) -> {\n        __core__headList(__helios__common__enum_fields_after_2(self_66))\n    };\n    __helios__string__parse_utf8_cont_byte = (byte, callback_1) -> {\n        __core__ifThenElse(\n            __core__equalsInteger(__core__divideInteger(byte, 64), 2),\n            () -> {\n                callback_1(true, __core__modInteger(byte, 64))\n            },\n            () -> {\n                callback_1(false, 0)\n            }\n        )()\n    };\n    __helios__string__is_valid_utf8 = (bytes_5) -> {\n        n_2 = __core__lengthOfByteString(bytes_5);\n        recurse_51 = (recurse_50, i_4) -> {\n            __core__ifThenElse(\n                __core__equalsInteger(i_4, n_2),\n                () -> {\n                    true\n                },\n                () -> {\n                    b0 = __core__indexByteString__safe(bytes_5, i_4);\n                    __core__ifThenElse(\n                        __core__lessThanEqualsInteger(b0, 127),\n                        () -> {\n                            recurse_50(recurse_50, __core__addInteger(i_4, 1))\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __core__equalsInteger(__core__divideInteger(b0, 32), 6),\n                                () -> {\n                                    inext_2 = __core__addInteger(i_4, 2);\n                                    __core__ifThenElse(\n                                        __core__lessThanEqualsInteger(inext_2, n_2),\n                                        () -> {\n                                            __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 1)), (valid_5, c1_2) -> {\n                                                __core__ifThenElse(\n                                                    valid_5,\n                                                    () -> {\n                                                        c_2 = __core__addInteger(__core__multiplyInteger(__core__modInteger(b0, 32), 64), c1_2);\n                                                        __core__ifThenElse(\n                                                            __helios__bool__and(() -> {\n                                                                __core__lessThanEqualsInteger(128, c_2)\n                                                            }, () -> {\n                                                                __core__lessThanEqualsInteger(c_2, 2047)\n                                                            }),\n                                                            () -> {\n                                                                recurse_50(recurse_50, inext_2)\n                                                            },\n                                                            () -> {\n                                                                false\n                                                            }\n                                                        )()\n                                                    },\n                                                    () -> {\n                                                        false\n                                                    }\n                                                )()\n                                            })\n                                        },\n                                        () -> {\n                                            false\n                                        }\n                                    )()\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __core__equalsInteger(__core__divideInteger(b0, 16), 14),\n                                        () -> {\n                                            inext_1 = __core__addInteger(i_4, 3);\n                                            __core__ifThenElse(\n                                                __core__lessThanEqualsInteger(inext_1, n_2),\n                                                () -> {\n                                                    __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 1)), (valid_3, c1_1) -> {\n                                                        __core__ifThenElse(\n                                                            valid_3,\n                                                            () -> {\n                                                                __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 2)), (valid_4, c2_1) -> {\n                                                                    __core__ifThenElse(\n                                                                        valid_4,\n                                                                        () -> {\n                                                                            c_1 = __core__addInteger(__core__multiplyInteger(__core__modInteger(b0, 16), 4096), __core__addInteger(__core__multiplyInteger(c1_1, 64), c2_1));\n                                                                            __core__ifThenElse(\n                                                                                __helios__bool__and(() -> {\n                                                                                    __core__lessThanEqualsInteger(2048, c_1)\n                                                                                }, () -> {\n                                                                                    __core__lessThanEqualsInteger(c_1, 65535)\n                                                                                }),\n                                                                                () -> {\n                                                                                    recurse_50(recurse_50, inext_1)\n                                                                                },\n                                                                                () -> {\n                                                                                    false\n                                                                                }\n                                                                            )()\n                                                                        },\n                                                                        () -> {\n                                                                            false\n                                                                        }\n                                                                    )()\n                                                                })\n                                                            },\n                                                            () -> {\n                                                                false\n                                                            }\n                                                        )()\n                                                    })\n                                                },\n                                                () -> {\n                                                    false\n                                                }\n                                            )()\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __core__equalsInteger(__core__divideInteger(b0, 8), 30),\n                                                () -> {\n                                                    inext = __core__addInteger(i_4, 4);\n                                                    __core__ifThenElse(\n                                                        __core__lessThanEqualsInteger(inext, n_2),\n                                                        () -> {\n                                                            __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 1)), (valid, c1) -> {\n                                                                __core__ifThenElse(\n                                                                    valid,\n                                                                    () -> {\n                                                                        __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 2)), (valid_1, c2) -> {\n                                                                            __core__ifThenElse(\n                                                                                valid_1,\n                                                                                () -> {\n                                                                                    __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_5, __core__addInteger(i_4, 3)), (valid_2, c3) -> {\n                                                                                        __core__ifThenElse(\n                                                                                            valid_2,\n                                                                                            () -> {\n                                                                                                c = __core__addInteger(__core__multiplyInteger(__core__modInteger(b0, 8), 262144), __core__addInteger(__core__multiplyInteger(c1, 4096), __core__addInteger(__core__multiplyInteger(c2, 64), c3)));\n                                                                                                __core__ifThenElse(\n                                                                                                    __helios__bool__and(() -> {\n                                                                                                        __core__lessThanEqualsInteger(65536, c)\n                                                                                                    }, () -> {\n                                                                                                        __core__lessThanEqualsInteger(c, 2097151)\n                                                                                                    }),\n                                                                                                    () -> {\n                                                                                                        recurse_50(recurse_50, inext)\n                                                                                                    },\n                                                                                                    () -> {\n                                                                                                        false\n                                                                                                    }\n                                                                                                )()\n                                                                                            },\n                                                                                            () -> {\n                                                                                                false\n                                                                                            }\n                                                                                        )()\n                                                                                    })\n                                                                                },\n                                                                                () -> {\n                                                                                    false\n                                                                                }\n                                                                            )()\n                                                                        })\n                                                                    },\n                                                                    () -> {\n                                                                        false\n                                                                    }\n                                                                )()\n                                                            })\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                },\n                                                () -> {\n                                                    false\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        };\n        recurse_51(recurse_51, 0)\n    };\n    __helios__string__is_valid_data = (data_18) -> {\n        __core__chooseData(data_18, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            __helios__string__is_valid_utf8(__core__unBData__safe(data_18))\n        })()\n    };\n    __helios__common__filter = (self_67, fn_10, nil) -> {\n        recurse_53 = (recurse_52, self_68, fn_11) -> {\n            __core__chooseList(self_68, () -> {\n                nil\n            }, () -> {\n                head_4 = __core__headList__safe(self_68);\n                __core__ifThenElse(\n                    fn_11(head_4),\n                    () -> {\n                        __core__mkCons(head_4, recurse_52(recurse_52, __core__tailList__safe(self_68), fn_11))\n                    },\n                    () -> {\n                        recurse_52(recurse_52, __core__tailList__safe(self_68), fn_11)\n                    }\n                )()\n            })()\n        };\n        recurse_53(recurse_53, self_67, fn_10)\n    };\n    __helios__common__filter_map = (self_69, fn_12) -> {\n        __helios__common__filter(self_69, fn_12, __core__mkNilPairData(()))\n    };\n    __helios__common__test_mStruct_field = (self_70, name, inner_test) -> {\n        __core__chooseData(self_70, () -> {\n            false\n        }, () -> {\n            map_10 = __core__unMapData__safe(self_70);\n            recurse_55 = (recurse_54, map_11) -> {\n                __core__chooseList(map_11, () -> {\n                    __core__trace(__core__appendString("Warning: field not found: ", __core__decodeUtf8__safe(__core__unBData__safe(name))), () -> {\n                        false\n                    })()\n                }, () -> {\n                    head_5 = __core__headList__safe(map_11);\n                    key_10 = __core__fstPair(head_5);\n                    value_1 = __core__sndPair(head_5);\n                    __core__ifThenElse(\n                        __core__equalsData(key_10, name),\n                        () -> {\n                            inner_test(value_1)\n                        },\n                        () -> {\n                            recurse_54(recurse_54, __core__tailList__safe(map_11))\n                        }\n                    )()\n                })()\n            };\n            recurse_55(recurse_55, map_10)\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__mintingpolicyhash__is_valid_data = (data_19) -> {\n        __core__chooseData(data_19, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            bytes_6 = __core__unBData__safe(data_19);\n            n_3 = __core__lengthOfByteString(bytes_6);\n            __core__ifThenElse(\n                __core__equalsInteger(n_3, 0),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(n_3, 28),\n                        true,\n                        false\n                    )\n                }\n            )()\n        })()\n    };\n    __helios__validatorhash__show = __helios__bytearray__show;\n    __helios__txoutput__sum_values = (outputs) -> {\n        __helios__common__fold(outputs, (prev_2, txOutput) -> {\n            __helios__value____add(prev_2, __helios__txoutput__value(txOutput))\n        }, __helios__value__ZERO)\n    };\n    __helios__common__filter_list = (self_71, fn_13) -> {\n        __helios__common__filter(self_71, fn_13, __helios__common__list_0)\n    };\n    __helios__tx__outputs = (self_72) -> {\n        __core__unListData(__helios__common__enum_field_2(self_72))\n    };\n    __helios__tx__filter_outputs = (self_73, fn_14) -> {\n        __helios__common__filter_list(__helios__tx__outputs(self_73), fn_14)\n    };\n    __helios__address__credential = __helios__common__enum_field_0;\n    __helios__txoutput__address = __helios__common__enum_field_0;\n    __helios__spendingcredential__is_validator = (self_74) -> {\n        __core__equalsInteger(__core__fstPair(__core__unConstrData(self_74)), 1)\n    };\n    __helios__validatorhash____eq = __helios__bytearray____eq;\n    __helios__validatorhash__from_data = __helios__bytearray__from_data;\n    __helios__spendingcredential__validator__hash = (self_75) -> {\n        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_75))\n    };\n    __helios__spendingcredential__validator__cast = (data_20) -> {\n        __helios__common__assert_constr_index(data_20, 1)\n    };\n    __helios__txoutput__is_locked_by = (self_76) -> {\n        (hash) -> {\n            credential = __helios__address__credential(__helios__txoutput__address(self_76));\n            __core__ifThenElse(\n                __helios__spendingcredential__is_validator(credential),\n                () -> {\n                    __helios__validatorhash____eq(hash, __helios__spendingcredential__validator__hash(__helios__spendingcredential__validator__cast(credential)))\n                },\n                () -> {\n                    false\n                }\n            )()\n        }\n    };\n    __helios__tx__outputs_locked_by = (self_77) -> {\n        (vh) -> {\n            __helios__tx__filter_outputs(self_77, (output) -> {\n                __helios__txoutput__is_locked_by(output)(vh)\n            })\n        }\n    };\n    __helios__tx__value_locked_by = (self_78) -> {\n        (vh_1) -> {\n            __helios__txoutput__sum_values(__helios__tx__outputs_locked_by(self_78)(vh_1))\n        }\n    };\n    __helios__txoutput__from_data = __helios__common__identity;\n    __helios__spendingcredential____eq = __helios__common____eq;\n    __helios__txinput__address = (self_79) -> {\n        __helios__txoutput__address(__helios__txinput__output(self_79))\n    };\n    __helios__validatorhash____to_data = __helios__bytearray____to_data;\n    __helios__spendingcredential__new_validator = (hash_1) -> {\n        __core__constrData(1, __helios__common__list_1(__helios__validatorhash____to_data(hash_1)))\n    };\n    __helios__struct____to_data = __core__listData;\n    __helios__data__is_valid_data = (data_21) -> {\n        true\n    };\n    __helios__bytearray__is_valid_data_max_length = (n_4) -> {\n        (data_22) -> {\n            __core__chooseData(data_22, () -> {\n                false\n            }, () -> {\n                false\n            }, () -> {\n                false\n            }, () -> {\n                false\n            }, () -> {\n                bytes_7 = __core__unBData__safe(data_22);\n                __core__ifThenElse(\n                    __core__lessThanEqualsInteger(__core__lengthOfByteString(bytes_7), n_4),\n                    () -> {\n                        true\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        }\n    };\n    __helios__assetclass__is_valid_data = (data_23) -> {\n        __helios__common__test_constr_data_2(data_23, 0, __helios__mintingpolicyhash__is_valid_data, __helios__bytearray__is_valid_data_max_length(32))\n    };\n    __helios__scriptpurpose__from_data = __helios__common__identity;\n    __module__StellarHeliosHelpers__TODO = (task) -> {\n        __helios__print(__helios__string____add(__helios__string____add("  🟥  😳💦  TODO: ", task), "\n"))\n    };\n    __module__StellarHeliosHelpers__REQT = (reqt, __useopt__assertion, assertion) -> {\n        assertion_1 = __core__ifThenElse(\n            __useopt__assertion,\n            () -> {\n                assertion\n            },\n            () -> {\n                true\n            }\n        )();\n        __core__chooseUnit(__helios__print(__helios__string____add("❗ ", reqt)), __helios__assert(assertion_1, __helios__string____add("  ❌❌ ^ failed: ", reqt)))\n    };\n    __module__StellarHeliosHelpers__mkTv = (mph_8, __useopt__tn, tn, __useopt__tnBytes, tnBytes, __useopt__count, count) -> {\n        tn_1 = __core__ifThenElse(\n            __useopt__tn,\n            () -> {\n                tn\n            },\n            () -> {\n                ""\n            }\n        )();\n        tnBytes_1 = __core__ifThenElse(\n            __useopt__tnBytes,\n            () -> {\n                tnBytes\n            },\n            () -> {\n                __helios__string__encode_utf8(tn_1)()\n            }\n        )();\n        count_1 = __core__ifThenElse(\n            __useopt__count,\n            () -> {\n                count\n            },\n            () -> {\n                1\n            }\n        )();\n        __core__chooseUnit(__helios__assert(__helios__int____gt(__helios__bytearray__length(tnBytes_1), 0), "missing reqd tn or tnBytes"), __helios__value__new(__helios__assetclass__new(mph_8, tnBytes_1), count_1))\n    };\n    __module__StellarHeliosHelpers__tvCharter = (mph_9) -> {\n        __module__StellarHeliosHelpers__mkTv(mph_9, true, "charter", false, (), false, ())\n    };\n    __helios__map[__helios__bytearray@__helios__int]__is_valid_data_internal = (map_12) -> {\n        recurse_57 = (recurse_56, map_13) -> {\n            __core__chooseList(map_13, () -> {\n                true\n            }, () -> {\n                head_6 = __core__headList__safe(map_13);\n                __core__ifThenElse(\n                    __helios__bytearray__is_valid_data(__core__fstPair(head_6)),\n                    () -> {\n                        __core__ifThenElse(\n                            __helios__int__is_valid_data(__core__sndPair(head_6)),\n                            () -> {\n                                recurse_56(recurse_56, __core__tailList__safe(map_13))\n                            },\n                            () -> {\n                                false\n                            }\n                        )()\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_57(recurse_57, map_12)\n    };\n    __helios__map[__helios__bytearray@__helios__int]__from_data = (data_24) -> {\n        map_14 = __core__unMapData(data_24);\n        _ = __core__ifThenElse(\n            __helios__map[__helios__bytearray@__helios__int]__is_valid_data_internal(map_14),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace("Warning: invalid map data", ())\n            }\n        )();\n        map_14\n    };\n    __helios__map[__helios__scriptpurpose@__helios__data]__get = (self_80) -> {\n        (key_11) -> {\n            __helios__common__map_get(self_80, __helios__scriptpurpose____to_data(key_11), (x_2) -> {\n                __helios__data__from_data(x_2)\n            }, () -> {\n                __helios__error("key not found")\n            })\n        }\n    };\n    __helios__map[__helios__scriptpurpose@__helios__data]__find_key = (self_81) -> {\n        (fn_15) -> {\n            recurse_59 = (recurse_58, map_15) -> {\n                __core__chooseList(map_15, () -> {\n                    __helios__error("not found")\n                }, () -> {\n                    item_2 = __helios__scriptpurpose__from_data(__core__fstPair(__core__headList__safe(map_15)));\n                    __core__ifThenElse(\n                        fn_15(item_2),\n                        () -> {\n                            item_2\n                        },\n                        () -> {\n                            recurse_58(recurse_58, __core__tailList__safe(map_15))\n                        }\n                    )()\n                })()\n            };\n            recurse_59(recurse_59, self_81)\n        }\n    };\n    __module__StellarHeliosHelpers__mustFindInputRedeemer = (txInput) -> {\n        targetId = __helios__txinput__output_id(txInput);\n        redeemers = __helios__tx__redeemers(__helios__scriptcontext__tx);\n        spendsExpectedInput = __helios__map[__helios__scriptpurpose@__helios__data]__find_key(redeemers)((purpose) -> {\n            __cond = purpose;\n            __core__ifThenElse(\n                __helios__scriptpurpose__spending____is(__cond),\n                () -> {\n                    (sp) -> {\n                        __helios__txoutputid____eq(__helios__scriptpurpose__spending__output_id(sp), targetId)\n                    }\n                },\n                () -> {\n                    (__1) -> {\n                        false\n                    }\n                }\n            )()(__cond)\n        });\n        __helios__map[__helios__scriptpurpose@__helios__data]__get(redeemers)(spendsExpectedInput)\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data = (__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data) -> {\n        (data_25) -> {\n            __core__ifThenElse(\n                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data(data_25),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data(data_25),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data(data_25),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__from_data = (__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_1) -> {\n        (data_26) -> {\n            ignore = __core__ifThenElse(\n                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_1)(data_26),\n                () -> {\n                    ()\n                },\n                () -> {\n                    __core__trace("Warning: invalid DelegateLifecycleActivity data", ())\n                }\n            )();\n            data_26\n        }\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is = (data_27) -> {\n        __helios__common__enum_tag_equals(data_27, 0)\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2 = (data_28) -> {\n        __core__chooseData(data_28, () -> {\n            pair_8 = __core__unConstrData__safe(data_28);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_8), 0),\n                () -> {\n                    data_29 = __core__listData(__core__sndPair(pair_8));\n                    __core__chooseData(data_29, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_6 = __core__unListData__safe(data_29);\n                        __core__chooseList(fields_6, () -> {\n                            false\n                        }, () -> {\n                            head_7 = __core__headList__safe(fields_6);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_7),\n                                () -> {\n                                    fields_7 = __core__tailList__safe(fields_6);\n                                    __core__chooseList(fields_7, () -> {\n                                        false\n                                    }, () -> {\n                                        head_8 = __core__headList__safe(fields_7);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_8),\n                                            () -> {\n                                                fields_8 = __core__tailList__safe(fields_7);\n                                                __core__chooseList(fields_8, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring____is = (data_30) -> {\n        __helios__common__enum_tag_equals(data_30, 1)\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2 = (data_31) -> {\n        __core__chooseData(data_31, () -> {\n            pair_9 = __core__unConstrData__safe(data_31);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_9), 1),\n                () -> {\n                    data_32 = __core__listData(__core__sndPair(pair_9));\n                    __core__chooseData(data_32, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_9 = __core__unListData__safe(data_32);\n                        __core__chooseList(fields_9, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2 = (data_33) -> {\n        __core__chooseData(data_33, () -> {\n            pair_10 = __core__unConstrData__safe(data_33);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_10), 2),\n                () -> {\n                    data_34 = __core__listData(__core__sndPair(pair_10));\n                    __core__chooseData(data_34, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_10 = __core__unListData__safe(data_34);\n                        __core__chooseList(fields_10, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateRole[]____to_data = __helios__common__identity;\n    __module__CapoDelegateHelpers__DelegateRole[]__is_valid_data = (__module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data) -> {\n        (data_35) -> {\n            __core__ifThenElse(\n                __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data(data_35),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data(data_35),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data(data_35),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data(data_35),\n                                        () -> {\n                                            true\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data(data_35),\n                                                () -> {\n                                                    true\n                                                },\n                                                () -> {\n                                                    __core__ifThenElse(\n                                                        __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data(data_35),\n                                                        () -> {\n                                                            true\n                                                        },\n                                                        () -> {\n                                                            __core__ifThenElse(\n                                                                __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data(data_35),\n                                                                () -> {\n                                                                    true\n                                                                },\n                                                                () -> {\n                                                                    __core__ifThenElse(\n                                                                        __module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data(data_35),\n                                                                        () -> {\n                                                                            true\n                                                                        },\n                                                                        () -> {\n                                                                            false\n                                                                        }\n                                                                    )()\n                                                                }\n                                                            )()\n                                                        }\n                                                    )()\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data_1 = (data_36) -> {\n        __core__chooseData(data_36, () -> {\n            pair_11 = __core__unConstrData__safe(data_36);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_11), 0),\n                () -> {\n                    data_37 = __core__listData(__core__sndPair(pair_11));\n                    __core__chooseData(data_37, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_11 = __core__unListData__safe(data_37);\n                        __core__chooseList(fields_11, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateRole[]__MintDgt____new = () -> {\n        __core__constrData(0, __core__mkNilData(()))\n    };\n    __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data_1 = (data_38) -> {\n        __core__chooseData(data_38, () -> {\n            pair_12 = __core__unConstrData__safe(data_38);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_12), 1),\n                () -> {\n                    data_39 = __core__listData(__core__sndPair(pair_12));\n                    __core__chooseData(data_39, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_12 = __core__unListData__safe(data_39);\n                        __core__chooseList(fields_12, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data_1 = (data_40) -> {\n        __core__chooseData(data_40, () -> {\n            pair_13 = __core__unConstrData__safe(data_40);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_13), 2),\n                () -> {\n                    data_41 = __core__listData(__core__sndPair(pair_13));\n                    __core__chooseData(data_41, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_13 = __core__unListData__safe(data_41);\n                        __core__chooseList(fields_13, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data_1 = (data_42) -> {\n        __core__chooseData(data_42, () -> {\n            pair_14 = __core__unConstrData__safe(data_42);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_14), 3),\n                () -> {\n                    data_43 = __core__listData(__core__sndPair(pair_14));\n                    __core__chooseData(data_43, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_14 = __core__unListData__safe(data_43);\n                        __core__chooseList(fields_14, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data_1 = (data_44) -> {\n        __core__chooseData(data_44, () -> {\n            pair_15 = __core__unConstrData__safe(data_44);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_15), 4),\n                () -> {\n                    data_45 = __core__listData(__core__sndPair(pair_15));\n                    __core__chooseData(data_45, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_15 = __core__unListData__safe(data_45);\n                        __core__chooseList(fields_15, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data_1 = (data_46) -> {\n        __core__chooseData(data_46, () -> {\n            pair_16 = __core__unConstrData__safe(data_46);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_16), 5),\n                () -> {\n                    data_47 = __core__listData(__core__sndPair(pair_16));\n                    __core__chooseData(data_47, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_16 = __core__unListData__safe(data_47);\n                        __core__chooseList(fields_16, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data_1 = (data_48) -> {\n        __core__chooseData(data_48, () -> {\n            pair_17 = __core__unConstrData__safe(data_48);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_17), 6),\n                () -> {\n                    data_49 = __core__listData(__core__sndPair(pair_17));\n                    __core__chooseData(data_49, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_17 = __core__unListData__safe(data_49);\n                        __core__chooseList(fields_17, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data_1 = (data_50) -> {\n        __core__chooseData(data_50, () -> {\n            pair_18 = __core__unConstrData__safe(data_50);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_18), 7),\n                () -> {\n                    data_51 = __core__listData(__core__sndPair(pair_18));\n                    __core__chooseData(data_51, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_18 = __core__unListData__safe(data_51);\n                        __core__chooseList(fields_18, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__ManifestActivity[]__is_valid_data = (__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry__is_valid_data, __module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry__is_valid_data, __module__CapoDelegateHelpers__ManifestActivity[]__addingEntry__is_valid_data, __module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken__is_valid_data, __module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken__is_valid_data) -> {\n        (data_52) -> {\n            __core__ifThenElse(\n                __module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken__is_valid_data(data_52),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken__is_valid_data(data_52),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__ManifestActivity[]__addingEntry__is_valid_data(data_52),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry__is_valid_data(data_52),\n                                        () -> {\n                                            true\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry__is_valid_data(data_52),\n                                                () -> {\n                                                    true\n                                                },\n                                                () -> {\n                                                    false\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry__is_valid_data_1 = (data_53) -> {\n        __core__chooseData(data_53, () -> {\n            pair_19 = __core__unConstrData__safe(data_53);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_19), 0),\n                () -> {\n                    data_54 = __core__listData(__core__sndPair(pair_19));\n                    __core__chooseData(data_54, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_19 = __core__unListData__safe(data_54);\n                        __core__chooseList(fields_19, () -> {\n                            false\n                        }, () -> {\n                            head_9 = __core__headList__safe(fields_19);\n                            __core__ifThenElse(\n                                __helios__string__is_valid_data(head_9),\n                                () -> {\n                                    fields_20 = __core__tailList__safe(fields_19);\n                                    __core__chooseList(fields_20, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry__is_valid_data_1 = (data_55) -> {\n        __core__chooseData(data_55, () -> {\n            pair_20 = __core__unConstrData__safe(data_55);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_20), 1),\n                () -> {\n                    data_56 = __core__listData(__core__sndPair(pair_20));\n                    __core__chooseData(data_56, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_21 = __core__unListData__safe(data_56);\n                        __core__chooseList(fields_21, () -> {\n                            false\n                        }, () -> {\n                            head_10 = __core__headList__safe(fields_21);\n                            __core__ifThenElse(\n                                __helios__string__is_valid_data(head_10),\n                                () -> {\n                                    fields_22 = __core__tailList__safe(fields_21);\n                                    __core__chooseList(fields_22, () -> {\n                                        false\n                                    }, () -> {\n                                        head_11 = __core__headList__safe(fields_22);\n                                        __core__ifThenElse(\n                                            __helios__bytearray__is_valid_data(head_11),\n                                            () -> {\n                                                fields_23 = __core__tailList__safe(fields_22);\n                                                __core__chooseList(fields_23, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__ManifestActivity[]__addingEntry__is_valid_data_1 = (data_57) -> {\n        __core__chooseData(data_57, () -> {\n            pair_21 = __core__unConstrData__safe(data_57);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_21), 2),\n                () -> {\n                    data_58 = __core__listData(__core__sndPair(pair_21));\n                    __core__chooseData(data_58, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_24 = __core__unListData__safe(data_58);\n                        __core__chooseList(fields_24, () -> {\n                            false\n                        }, () -> {\n                            head_12 = __core__headList__safe(fields_24);\n                            __core__ifThenElse(\n                                __helios__string__is_valid_data(head_12),\n                                () -> {\n                                    fields_25 = __core__tailList__safe(fields_24);\n                                    __core__chooseList(fields_25, () -> {\n                                        false\n                                    }, () -> {\n                                        head_13 = __core__headList__safe(fields_25);\n                                        __core__ifThenElse(\n                                            __helios__bytearray__is_valid_data(head_13),\n                                            () -> {\n                                                fields_26 = __core__tailList__safe(fields_25);\n                                                __core__chooseList(fields_26, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken__is_valid_data_1 = (data_59) -> {\n        __core__chooseData(data_59, () -> {\n            pair_22 = __core__unConstrData__safe(data_59);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_22), 3),\n                () -> {\n                    data_60 = __core__listData(__core__sndPair(pair_22));\n                    __core__chooseData(data_60, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_27 = __core__unListData__safe(data_60);\n                        __core__chooseList(fields_27, () -> {\n                            false\n                        }, () -> {\n                            head_14 = __core__headList__safe(fields_27);\n                            __core__ifThenElse(\n                                __helios__string__is_valid_data(head_14),\n                                () -> {\n                                    fields_28 = __core__tailList__safe(fields_27);\n                                    __core__chooseList(fields_28, () -> {\n                                        false\n                                    }, () -> {\n                                        head_15 = __core__headList__safe(fields_28);\n                                        __core__ifThenElse(\n                                            __helios__int__is_valid_data(head_15),\n                                            () -> {\n                                                fields_29 = __core__tailList__safe(fields_28);\n                                                __core__chooseList(fields_29, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken__is_valid_data_1 = (data_61) -> {\n        __core__chooseData(data_61, () -> {\n            pair_23 = __core__unConstrData__safe(data_61);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_23), 4),\n                () -> {\n                    data_62 = __core__listData(__core__sndPair(pair_23));\n                    __core__chooseData(data_62, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_30 = __core__unListData__safe(data_62);\n                        __core__chooseList(fields_30, () -> {\n                            false\n                        }, () -> {\n                            head_16 = __core__headList__safe(fields_30);\n                            __core__ifThenElse(\n                                __helios__string__is_valid_data(head_16),\n                                () -> {\n                                    fields_31 = __core__tailList__safe(fields_30);\n                                    __core__chooseList(fields_31, () -> {\n                                        false\n                                    }, () -> {\n                                        head_17 = __core__headList__safe(fields_31);\n                                        __core__ifThenElse(\n                                            __helios__int__is_valid_data(head_17),\n                                            () -> {\n                                                fields_32 = __core__tailList__safe(fields_31);\n                                                __core__chooseList(fields_32, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__PendingDelegateAction[]__is_valid_data = (__module__CapoDelegateHelpers__PendingDelegateAction[]__Add__is_valid_data, __module__CapoDelegateHelpers__PendingDelegateAction[]__Remove__is_valid_data, __module__CapoDelegateHelpers__PendingDelegateAction[]__Replace__is_valid_data) -> {\n        (data_63) -> {\n            __core__ifThenElse(\n                __module__CapoDelegateHelpers__PendingDelegateAction[]__Replace__is_valid_data(data_63),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoDelegateHelpers__PendingDelegateAction[]__Remove__is_valid_data(data_63),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__PendingDelegateAction[]__Add__is_valid_data(data_63),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoDelegateHelpers__PendingDelegateAction[]__Add__is_valid_data_1 = (data_64) -> {\n        __core__chooseData(data_64, () -> {\n            pair_24 = __core__unConstrData__safe(data_64);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_24), 0),\n                () -> {\n                    data_65 = __core__listData(__core__sndPair(pair_24));\n                    __core__chooseData(data_65, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_33 = __core__unListData__safe(data_65);\n                        __core__chooseList(fields_33, () -> {\n                            false\n                        }, () -> {\n                            head_18 = __core__headList__safe(fields_33);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_18),\n                                () -> {\n                                    fields_34 = __core__tailList__safe(fields_33);\n                                    __core__chooseList(fields_34, () -> {\n                                        false\n                                    }, () -> {\n                                        head_19 = __core__headList__safe(fields_34);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_19),\n                                            () -> {\n                                                fields_35 = __core__tailList__safe(fields_34);\n                                                __core__chooseList(fields_35, () -> {\n                                                    false\n                                                }, () -> {\n                                                    head_20 = __core__headList__safe(fields_35);\n                                                    __core__ifThenElse(\n                                                        __helios__string__is_valid_data(head_20),\n                                                        () -> {\n                                                            fields_36 = __core__tailList__safe(fields_35);\n                                                            __core__chooseList(fields_36, true, false)\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                })()\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__PendingDelegateAction[]__Remove__is_valid_data_1 = (data_66) -> {\n        __core__chooseData(data_66, () -> {\n            pair_25 = __core__unConstrData__safe(data_66);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_25), 1),\n                () -> {\n                    data_67 = __core__listData(__core__sndPair(pair_25));\n                    __core__chooseData(data_67, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_37 = __core__unListData__safe(data_67);\n                        __core__chooseList(fields_37, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__PendingDelegateAction[]__Replace__is_valid_data_1 = (data_68) -> {\n        __core__chooseData(data_68, () -> {\n            pair_26 = __core__unConstrData__safe(data_68);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_26), 2),\n                () -> {\n                    data_69 = __core__listData(__core__sndPair(pair_26));\n                    __core__chooseData(data_69, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_38 = __core__unListData__safe(data_69);\n                        __core__chooseList(fields_38, () -> {\n                            false\n                        }, () -> {\n                            head_21 = __core__headList__safe(fields_38);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_21),\n                                () -> {\n                                    fields_39 = __core__tailList__safe(fields_38);\n                                    __core__chooseList(fields_39, () -> {\n                                        false\n                                    }, () -> {\n                                        head_22 = __core__headList__safe(fields_39);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_22),\n                                            () -> {\n                                                fields_40 = __core__tailList__safe(fields_39);\n                                                __core__chooseList(fields_40, () -> {\n                                                    false\n                                                }, () -> {\n                                                    head_23 = __core__headList__safe(fields_40);\n                                                    __core__ifThenElse(\n                                                        __helios__string__is_valid_data(head_23),\n                                                        () -> {\n                                                            fields_41 = __core__tailList__safe(fields_40);\n                                                            __core__chooseList(fields_41, () -> {\n                                                                false\n                                                            }, () -> {\n                                                                head_24 = __core__headList__safe(fields_41);\n                                                                __core__ifThenElse(\n                                                                    __helios__assetclass__is_valid_data(head_24),\n                                                                    () -> {\n                                                                        fields_42 = __core__tailList__safe(fields_41);\n                                                                        __core__chooseList(fields_42, true, false)\n                                                                    },\n                                                                    () -> {\n                                                                        false\n                                                                    }\n                                                                )()\n                                                            })()\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                })()\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data = (__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data) -> {\n        (data_70) -> {\n            __core__ifThenElse(\n                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data(data_70),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data(data_70),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data(data_70),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data(data_70),\n                                        () -> {\n                                            true\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data(data_70),\n                                                () -> {\n                                                    true\n                                                },\n                                                () -> {\n                                                    __core__ifThenElse(\n                                                        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data(data_70),\n                                                        () -> {\n                                                            true\n                                                        },\n                                                        () -> {\n                                                            __core__ifThenElse(\n                                                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data(data_70),\n                                                                () -> {\n                                                                    true\n                                                                },\n                                                                () -> {\n                                                                    false\n                                                                }\n                                                            )()\n                                                        }\n                                                    )()\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__from_data = (__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data_1) -> {\n        (data_71) -> {\n            ignore_1 = __core__ifThenElse(\n                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data_1)(data_71),\n                () -> {\n                    ()\n                },\n                () -> {\n                    __core__trace("Warning: invalid CapoLifecycleActivity data", ())\n                }\n            )();\n            data_71\n        }\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate____is = (data_72) -> {\n        __helios__common__enum_tag_equals(data_72, 0)\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2 = (data_73) -> {\n        __core__chooseData(data_73, () -> {\n            pair_27 = __core__unConstrData__safe(data_73);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_27), 0),\n                () -> {\n                    data_74 = __core__listData(__core__sndPair(pair_27));\n                    __core__chooseData(data_74, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_43 = __core__unListData__safe(data_74);\n                        __core__chooseList(fields_43, () -> {\n                            false\n                        }, () -> {\n                            head_25 = __core__headList__safe(fields_43);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_25),\n                                () -> {\n                                    fields_44 = __core__tailList__safe(fields_43);\n                                    __core__chooseList(fields_44, () -> {\n                                        false\n                                    }, () -> {\n                                        head_26 = __core__headList__safe(fields_44);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_26),\n                                            () -> {\n                                                fields_45 = __core__tailList__safe(fields_44);\n                                                __core__chooseList(fields_45, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange____is = (data_75) -> {\n        __helios__common__enum_tag_equals(data_75, 1)\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data_2 = (data_76) -> {\n        __core__chooseData(data_76, () -> {\n            pair_28 = __core__unConstrData__safe(data_76);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_28), 1),\n                () -> {\n                    data_77 = __core__listData(__core__sndPair(pair_28));\n                    __core__chooseData(data_77, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_46 = __core__unListData__safe(data_77);\n                        __core__chooseList(fields_46, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__option[__helios__string]__is_valid_data = (data_78) -> {\n        __core__chooseData(data_78, () -> {\n            pair_29 = __core__unConstrData__safe(data_78);\n            index_5 = __core__fstPair(pair_29);\n            fields_47 = __core__sndPair(pair_29);\n            __core__ifThenElse(\n                __core__equalsInteger(index_5, 0),\n                () -> {\n                    __core__chooseList(fields_47, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_47), () -> {\n                            __helios__string__is_valid_data(__core__headList__safe(fields_47))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_5, 1),\n                        () -> {\n                            __core__chooseList(fields_47, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data_2 = (data_79) -> {\n        __core__chooseData(data_79, () -> {\n            pair_30 = __core__unConstrData__safe(data_79);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_30), 2),\n                () -> {\n                    data_80 = __core__listData(__core__sndPair(pair_30));\n                    __core__chooseData(data_80, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_48 = __core__unListData__safe(data_80);\n                        __core__chooseList(fields_48, () -> {\n                            false\n                        }, () -> {\n                            head_27 = __core__headList__safe(fields_48);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__DelegateRole[]__is_valid_data(__module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data_1)(head_27),\n                                () -> {\n                                    fields_49 = __core__tailList__safe(fields_48);\n                                    __core__chooseList(fields_49, () -> {\n                                        false\n                                    }, () -> {\n                                        head_28 = __core__headList__safe(fields_49);\n                                        __core__ifThenElse(\n                                            __helios__option[__helios__string]__is_valid_data(head_28),\n                                            () -> {\n                                                fields_50 = __core__tailList__safe(fields_49);\n                                                __core__chooseList(fields_50, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__option[__helios__string]____to_data = __helios__common__identity;\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data_2 = (data_81) -> {\n        __core__chooseData(data_81, () -> {\n            pair_31 = __core__unConstrData__safe(data_81);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_31), 3),\n                () -> {\n                    data_82 = __core__listData(__core__sndPair(pair_31));\n                    __core__chooseData(data_82, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_51 = __core__unListData__safe(data_82);\n                        __core__chooseList(fields_51, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate____is = (data_83) -> {\n        __helios__common__enum_tag_equals(data_83, 4)\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data_2 = (data_84) -> {\n        __core__chooseData(data_84, () -> {\n            pair_32 = __core__unConstrData__safe(data_84);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_32), 4),\n                () -> {\n                    data_85 = __core__listData(__core__sndPair(pair_32));\n                    __core__chooseData(data_85, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_52 = __core__unListData__safe(data_85);\n                        __core__chooseList(fields_52, () -> {\n                            false\n                        }, () -> {\n                            head_29 = __core__headList__safe(fields_52);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_29),\n                                () -> {\n                                    fields_53 = __core__tailList__safe(fields_52);\n                                    __core__chooseList(fields_53, () -> {\n                                        false\n                                    }, () -> {\n                                        head_30 = __core__headList__safe(fields_53);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_30),\n                                            () -> {\n                                                fields_54 = __core__tailList__safe(fields_53);\n                                                __core__chooseList(fields_54, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate____is = (data_86) -> {\n        __helios__common__enum_tag_equals(data_86, 5)\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data_2 = (data_87) -> {\n        __core__chooseData(data_87, () -> {\n            pair_33 = __core__unConstrData__safe(data_87);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_33), 5),\n                () -> {\n                    data_88 = __core__listData(__core__sndPair(pair_33));\n                    __core__chooseData(data_88, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_55 = __core__unListData__safe(data_88);\n                        __core__chooseList(fields_55, () -> {\n                            false\n                        }, () -> {\n                            head_31 = __core__headList__safe(fields_55);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_31),\n                                () -> {\n                                    fields_56 = __core__tailList__safe(fields_55);\n                                    __core__chooseList(fields_56, () -> {\n                                        false\n                                    }, () -> {\n                                        head_32 = __core__headList__safe(fields_56);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_32),\n                                            () -> {\n                                                fields_57 = __core__tailList__safe(fields_56);\n                                                __core__chooseList(fields_57, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data_2 = (data_89) -> {\n        __core__chooseData(data_89, () -> {\n            pair_34 = __core__unConstrData__safe(data_89);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_34), 6),\n                () -> {\n                    data_90 = __core__listData(__core__sndPair(pair_34));\n                    __core__chooseData(data_90, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_58 = __core__unListData__safe(data_90);\n                        __core__chooseList(fields_58, () -> {\n                            false\n                        }, () -> {\n                            head_33 = __core__headList__safe(fields_58);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__ManifestActivity[]__is_valid_data(__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry__is_valid_data_1, __module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry__is_valid_data_1, __module__CapoDelegateHelpers__ManifestActivity[]__addingEntry__is_valid_data_1, __module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken__is_valid_data_1, __module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken__is_valid_data_1)(head_33),\n                                () -> {\n                                    fields_59 = __core__tailList__safe(fields_58);\n                                    __core__chooseList(fields_59, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]____to_data = __helios__common__identity;\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__is_valid_data = (__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data) -> {\n        (data_91) -> {\n            __core__ifThenElse(\n                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data(data_91),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data(data_91),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data(data_91),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data(data_91),\n                                        () -> {\n                                            true\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data(data_91),\n                                                () -> {\n                                                    true\n                                                },\n                                                () -> {\n                                                    __core__ifThenElse(\n                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data(data_91),\n                                                        () -> {\n                                                            true\n                                                        },\n                                                        () -> {\n                                                            __core__ifThenElse(\n                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data(data_91),\n                                                                () -> {\n                                                                    true\n                                                                },\n                                                                () -> {\n                                                                    __core__ifThenElse(\n                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data(data_91),\n                                                                        () -> {\n                                                                            true\n                                                                        },\n                                                                        () -> {\n                                                                            __core__ifThenElse(\n                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data(data_91),\n                                                                                () -> {\n                                                                                    true\n                                                                                },\n                                                                                () -> {\n                                                                                    false\n                                                                                }\n                                                                            )()\n                                                                        }\n                                                                    )()\n                                                                }\n                                                            )()\n                                                        }\n                                                    )()\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data = (__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_1) -> {\n        (data_92) -> {\n            ignore_2 = __core__ifThenElse(\n                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__is_valid_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_1)(data_92),\n                () -> {\n                    ()\n                },\n                () -> {\n                    __core__trace("Warning: invalid AbstractDelegateActivitiesEnum data", ())\n                }\n            )();\n            data_92\n        }\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is = (data_93) -> {\n        __helios__common__enum_tag_equals(data_93, 0)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2 = (data_94) -> {\n        __core__chooseData(data_94, () -> {\n            pair_35 = __core__unConstrData__safe(data_94);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_35), 0),\n                () -> {\n                    data_95 = __core__listData(__core__sndPair(pair_35));\n                    __core__chooseData(data_95, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_60 = __core__unListData__safe(data_95);\n                        __core__chooseList(fields_60, () -> {\n                            false\n                        }, () -> {\n                            head_34 = __core__headList__safe(fields_60);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data_2)(head_34),\n                                () -> {\n                                    fields_61 = __core__tailList__safe(fields_60);\n                                    __core__chooseList(fields_61, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__activity = (self_82) -> {\n        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__from_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data_2)(__helios__common__enum_field_0(self_82))\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities____is = (data_96) -> {\n        __helios__common__enum_tag_equals(data_96, 1)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2 = (data_97) -> {\n        __core__chooseData(data_97, () -> {\n            pair_36 = __core__unConstrData__safe(data_97);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_36), 1),\n                () -> {\n                    data_98 = __core__listData(__core__sndPair(pair_36));\n                    __core__chooseData(data_98, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_62 = __core__unListData__safe(data_98);\n                        __core__chooseList(fields_62, () -> {\n                            false\n                        }, () -> {\n                            head_35 = __core__headList__safe(fields_62);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2)(head_35),\n                                () -> {\n                                    fields_63 = __core__tailList__safe(fields_62);\n                                    __core__chooseList(fields_63, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__activity = (self_83) -> {\n        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__from_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2)(__helios__common__enum_field_0(self_83))\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities____is = (data_99) -> {\n        __helios__common__enum_tag_equals(data_99, 2)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2 = (data_100) -> {\n        __core__chooseData(data_100, () -> {\n            pair_37 = __core__unConstrData__safe(data_100);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_37), 2),\n                () -> {\n                    data_101 = __core__listData(__core__sndPair(pair_37));\n                    __core__chooseData(data_101, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_64 = __core__unListData__safe(data_101);\n                        __core__chooseList(fields_64, () -> {\n                            false\n                        }, () -> {\n                            head_36 = __core__headList__safe(fields_64);\n                            __core__ifThenElse(\n                                __helios__data__is_valid_data(head_36),\n                                () -> {\n                                    fields_65 = __core__tailList__safe(fields_64);\n                                    __core__chooseList(fields_65, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities____is = (data_102) -> {\n        __helios__common__enum_tag_equals(data_102, 3)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2 = (data_103) -> {\n        __core__chooseData(data_103, () -> {\n            pair_38 = __core__unConstrData__safe(data_103);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_38), 3),\n                () -> {\n                    data_104 = __core__listData(__core__sndPair(pair_38));\n                    __core__chooseData(data_104, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_66 = __core__unListData__safe(data_104);\n                        __core__chooseList(fields_66, () -> {\n                            false\n                        }, () -> {\n                            head_37 = __core__headList__safe(fields_66);\n                            __core__ifThenElse(\n                                __helios__data__is_valid_data(head_37),\n                                () -> {\n                                    fields_67 = __core__tailList__safe(fields_66);\n                                    __core__chooseList(fields_67, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities____is = (data_105) -> {\n        __helios__common__enum_tag_equals(data_105, 4)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2 = (data_106) -> {\n        __core__chooseData(data_106, () -> {\n            pair_39 = __core__unConstrData__safe(data_106);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_39), 4),\n                () -> {\n                    data_107 = __core__listData(__core__sndPair(pair_39));\n                    __core__chooseData(data_107, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_68 = __core__unListData__safe(data_107);\n                        __core__chooseList(fields_68, () -> {\n                            false\n                        }, () -> {\n                            head_38 = __core__headList__safe(fields_68);\n                            __core__ifThenElse(\n                                __helios__data__is_valid_data(head_38),\n                                () -> {\n                                    fields_69 = __core__tailList__safe(fields_68);\n                                    __core__chooseList(fields_69, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData____is = (data_108) -> {\n        __helios__common__enum_tag_equals(data_108, 5)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2 = (data_109) -> {\n        __core__chooseData(data_109, () -> {\n            pair_40 = __core__unConstrData__safe(data_109);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_40), 5),\n                () -> {\n                    data_110 = __core__listData(__core__sndPair(pair_40));\n                    __core__chooseData(data_110, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_70 = __core__unListData__safe(data_110);\n                        __core__chooseList(fields_70, () -> {\n                            false\n                        }, () -> {\n                            head_39 = __core__headList__safe(fields_70);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_39),\n                                () -> {\n                                    fields_71 = __core__tailList__safe(fields_70);\n                                    __core__chooseList(fields_71, () -> {\n                                        false\n                                    }, () -> {\n                                        head_40 = __core__headList__safe(fields_71);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_40),\n                                            () -> {\n                                                fields_72 = __core__tailList__safe(fields_71);\n                                                __core__chooseList(fields_72, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData____is = (data_111) -> {\n        __helios__common__enum_tag_equals(data_111, 6)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2 = (data_112) -> {\n        __core__chooseData(data_112, () -> {\n            pair_41 = __core__unConstrData__safe(data_112);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_41), 6),\n                () -> {\n                    data_113 = __core__listData(__core__sndPair(pair_41));\n                    __core__chooseData(data_113, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_73 = __core__unListData__safe(data_113);\n                        __core__chooseList(fields_73, () -> {\n                            false\n                        }, () -> {\n                            head_41 = __core__headList__safe(fields_73);\n                            __core__ifThenElse(\n                                __helios__string__is_valid_data(head_41),\n                                () -> {\n                                    fields_74 = __core__tailList__safe(fields_73);\n                                    __core__chooseList(fields_74, () -> {\n                                        false\n                                    }, () -> {\n                                        head_42 = __core__headList__safe(fields_74);\n                                        __core__ifThenElse(\n                                            __helios__bytearray__is_valid_data(head_42),\n                                            () -> {\n                                                fields_75 = __core__tailList__safe(fields_74);\n                                                __core__chooseList(fields_75, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData____is = (data_114) -> {\n        __helios__common__enum_tag_equals(data_114, 7)\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2 = (data_115) -> {\n        __core__chooseData(data_115, () -> {\n            pair_42 = __core__unConstrData__safe(data_115);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_42), 7),\n                () -> {\n                    data_116 = __core__listData(__core__sndPair(pair_42));\n                    __core__chooseData(data_116, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_76 = __core__unListData__safe(data_116);\n                        __core__chooseList(fields_76, () -> {\n                            false\n                        }, () -> {\n                            head_43 = __core__headList__safe(fields_76);\n                            __core__ifThenElse(\n                                __helios__string__is_valid_data(head_43),\n                                () -> {\n                                    fields_77 = __core__tailList__safe(fields_76);\n                                    __core__chooseList(fields_77, () -> {\n                                        false\n                                    }, () -> {\n                                        head_44 = __core__headList__safe(fields_77);\n                                        __core__ifThenElse(\n                                            __helios__bytearray__is_valid_data(head_44),\n                                            () -> {\n                                                fields_78 = __core__tailList__safe(fields_77);\n                                                __core__chooseList(fields_78, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities____is = (data_117) -> {\n        __helios__common__enum_tag_equals(data_117, 8)\n    };\n    __helios__list[__helios__data]__is_valid_data_internal = (lst_9) -> {\n        recurse_61 = (recurse_60, lst_10) -> {\n            __core__chooseList(lst_10, () -> {\n                true\n            }, () -> {\n                __core__ifThenElse(\n                    __helios__data__is_valid_data(__core__headList__safe(lst_10)),\n                    () -> {\n                        recurse_60(recurse_60, __core__tailList__safe(lst_10))\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_61(recurse_61, lst_9)\n    };\n    __helios__list[__helios__data]__is_valid_data = (data_118) -> {\n        __core__chooseData(data_118, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            __helios__list[__helios__data]__is_valid_data_internal(__core__unListData__safe(data_118))\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2 = (data_119) -> {\n        __core__chooseData(data_119, () -> {\n            pair_43 = __core__unConstrData__safe(data_119);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_43), 8),\n                () -> {\n                    data_120 = __core__listData(__core__sndPair(pair_43));\n                    __core__chooseData(data_120, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_79 = __core__unListData__safe(data_120);\n                        __core__chooseList(fields_79, () -> {\n                            false\n                        }, () -> {\n                            head_45 = __core__headList__safe(fields_79);\n                            __core__ifThenElse(\n                                __helios__list[__helios__data]__is_valid_data(head_45),\n                                () -> {\n                                    fields_80 = __core__tailList__safe(fields_79);\n                                    __core__chooseList(fields_80, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__list[__helios__data]__from_data = (data_121) -> {\n        lst_11 = __core__unListData(data_121);\n        __2 = __core__ifThenElse(\n            __helios__list[__helios__data]__is_valid_data_internal(lst_11),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace("Warning: invalid list data", ())\n            }\n        )();\n        lst_11\n    };\n    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__activities = (self_84) -> {\n        __helios__list[__helios__data]__from_data(__helios__common__enum_field_0(self_84))\n    };\n    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____is = (data_122) -> {\n        __helios__common__enum_tag_equals(data_122, 0)\n    };\n    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new = () -> {\n        __core__constrData(0, __core__mkNilData(()))\n    };\n    __module__CapoDelegateHelpers__DgTknDisposition[]__Created____is = (data_123) -> {\n        __helios__common__enum_tag_equals(data_123, 1)\n    };\n    __helios__option[__helios__validatorhash]__is_valid_data = (data_124) -> {\n        __core__chooseData(data_124, () -> {\n            pair_44 = __core__unConstrData__safe(data_124);\n            index_6 = __core__fstPair(pair_44);\n            fields_81 = __core__sndPair(pair_44);\n            __core__ifThenElse(\n                __core__equalsInteger(index_6, 0),\n                () -> {\n                    __core__chooseList(fields_81, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_81), () -> {\n                            __helios__validatorhash__is_valid_data(__core__headList__safe(fields_81))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_6, 1),\n                        () -> {\n                            __core__chooseList(fields_81, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data = (data_125) -> {\n        __core__chooseData(data_125, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            fields_82 = __core__unListData__safe(data_125);\n            __core__chooseList(fields_82, () -> {\n                false\n            }, () -> {\n                head_46 = __core__headList__safe(fields_82);\n                __core__ifThenElse(\n                    __helios__string__is_valid_data(head_46),\n                    () -> {\n                        fields_83 = __core__tailList__safe(fields_82);\n                        __core__chooseList(fields_83, () -> {\n                            false\n                        }, () -> {\n                            head_47 = __core__headList__safe(fields_83);\n                            __core__ifThenElse(\n                                __helios__option[__helios__validatorhash]__is_valid_data(head_47),\n                                () -> {\n                                    fields_84 = __core__tailList__safe(fields_83);\n                                    __core__chooseList(fields_84, () -> {\n                                        false\n                                    }, () -> {\n                                        head_48 = __core__headList__safe(fields_84);\n                                        __core__ifThenElse(\n                                            __helios__bytearray__is_valid_data(head_48),\n                                            () -> {\n                                                fields_85 = __core__tailList__safe(fields_84);\n                                                __core__chooseList(fields_85, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data = (data_126) -> {\n        ignore_3 = __core__ifThenElse(\n            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(data_126),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace("Warning: invalid RelativeDelegateLink data", ())\n            }\n        )();\n        __core__unListData(data_126)\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]____to_data = __helios__struct____to_data;\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName = (self_85) -> {\n        __helios__string__from_data(__helios__common__struct_field_0(self_85))\n    };\n    __helios__option[__helios__validatorhash]__from_data = (data_127) -> {\n        __3 = __core__ifThenElse(\n            __helios__option[__helios__validatorhash]__is_valid_data(data_127),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace("Warning: invalid option data", ())\n            }\n        )();\n        data_127\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash = (self_86) -> {\n        __helios__option[__helios__validatorhash]__from_data(__helios__common__struct_field_1(self_86))\n    };\n    __helios__option[__helios__validatorhash]__none____is = (data_128) -> {\n        __helios__common__enum_tag_equals(data_128, 1)\n    };\n    __helios__option[__helios__txinput]__none____new = () -> {\n        __helios__option__NONE\n    };\n    __helios__option[__helios__txinput]__some____is = (data_129) -> {\n        __helios__common__enum_tag_equals(data_129, 0)\n    };\n    __helios__list[__helios__txinput]__find_safe = (self_87) -> {\n        (fn_16) -> {\n            __helios__common__find_safe(self_87, (item_3) -> {\n                fn_16(__helios__txinput__from_data(item_3))\n            }, __helios__common__identity)\n        }\n    };\n    __helios__option[__helios__validatorhash]__some__some = (self_88) -> {\n        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_88))\n    };\n    __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput = (self_89) -> {\n        (inputs, mph_10, __useopt__required, required) -> {\n            required_1 = __core__ifThenElse(\n                __useopt__required,\n                () -> {\n                    required\n                },\n                () -> {\n                    true\n                }\n            )();\n            __cond_1 = __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash(self_89);\n            __core__ifThenElse(\n                __helios__option[__helios__validatorhash]__none____is(__cond_1),\n                () -> {\n                    (__lhs_0_2) -> {\n                        __core__ifThenElse(\n                            required_1,\n                            () -> {\n                                __helios__error(__helios__string____add("_❌ ➡️ 💁 missing required input with dgTkn ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_89)))\n                            },\n                            () -> {\n                                () -> {\n                                    __helios__option[__helios__txinput]__none____new()\n                                }()\n                            }\n                        )()\n                    }\n                },\n                () -> {\n                    (__lhs_0) -> {\n                        vh_2 = __helios__option[__helios__validatorhash]__some__some(__lhs_0);\n                        needsAddrWithCred = __helios__spendingcredential__new_validator(vh_2);\n                        expectedUut = __module__StellarHeliosHelpers__mkTv(mph_10, true, __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_89), false, (), false, ());\n                        __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add("  -- seeking input dgTkn: ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_89)), "\n")), __cond_2 = __helios__list[__helios__txinput]__find_safe(inputs)((i_5) -> {\n                            __helios__bool__and(() -> {\n                                __helios__spendingcredential____eq(__helios__address__credential(__helios__txinput__address(i_5)), needsAddrWithCred)\n                            }, () -> {\n                                __helios__value__contains(__helios__txinput__value(i_5))(expectedUut)\n                            })\n                        });\n                        __core__ifThenElse(\n                            __helios__option[__helios__txinput]__some____is(__cond_2),\n                            () -> {\n                                (foundGood) -> {\n                                    __core__chooseUnit(__helios__print("  ✅ ➡️  💁 found ^ input dgTkn"), foundGood)\n                                }\n                            },\n                            () -> {\n                                (__lhs_0_1) -> {\n                                    __core__ifThenElse(\n                                        required_1,\n                                        () -> {\n                                            __helios__error(__helios__string____add("_❌ ➡️  💁 missing req\'d input dgTkn (at script addr) ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_89)))\n                                        },\n                                        () -> {\n                                            () -> {\n                                                __core__chooseUnit(__helios__print(" <- 🚫 ➡️ 💁 no input with ^ dgTkn; not req\'d; returning false\n"), __helios__option[__helios__txinput]__none____new())\n                                            }()\n                                        }\n                                    )()\n                                }\n                            }\n                        )()(__cond_2))\n                    }\n                }\n            )()(__cond_1)\n        }\n    };\n    __helios__option[__helios__validatorhash]__some____is = (data_130) -> {\n        __helios__common__enum_tag_equals(data_130, 0)\n    };\n    __helios__option[__helios__txoutput]__some____is = (data_131) -> {\n        __helios__common__enum_tag_equals(data_131, 0)\n    };\n    __helios__list[__helios__txoutput]__find_safe = (self_90) -> {\n        (fn_17) -> {\n            __helios__common__find_safe(self_90, (item_4) -> {\n                fn_17(__helios__txoutput__from_data(item_4))\n            }, __helios__common__identity)\n        }\n    };\n    __module__CapoDelegateHelpers__linkHasValidOutput = (delegateLink, mph_11, __useopt__required_1, required_2, __useopt__createdOrReturned, createdOrReturned) -> {\n        required_3 = __core__ifThenElse(\n            __useopt__required_1,\n            () -> {\n                required_2\n            },\n            () -> {\n                true\n            }\n        )();\n        createdOrReturned_1 = __core__ifThenElse(\n            __useopt__createdOrReturned,\n            () -> {\n                createdOrReturned\n            },\n            () -> {\n                __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new()\n            }\n        )();\n        __core__chooseUnit(__helios__print("aaaa"), __lhs_0_3 = delegateLink;\n        uut = __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(__lhs_0_3);\n        validatorHash = __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash(__lhs_0_3);\n        __core__chooseUnit(__helios__print("bbbb"), v = __module__StellarHeliosHelpers__mkTv(mph_11, true, uut, false, (), false, ());\n        (cOrR) -> {\n            __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add(" ⬅️ 🔎 💁 expect dgTkn ", cOrR), ": "), uut)), (hasDelegate) -> {\n                __core__chooseUnit(__helios__print("um, here"), __core__chooseUnit(__core__ifThenElse(\n                    __helios__bool__and(() -> {\n                        __helios__bool____not(hasDelegate)\n                    }, () -> {\n                        required_3\n                    }),\n                    () -> {\n                        __cond_6 = createdOrReturned_1;\n                        __core__ifThenElse(\n                            __module__CapoDelegateHelpers__DgTknDisposition[]__Created____is(__cond_6),\n                            () -> {\n                                (__lhs_0_12) -> {\n                                    __helios__error(__helios__string____add("⬅️ ❌ 💁 dgTkn not created: ", uut))\n                                }\n                            },\n                            () -> {\n                                (__lhs_0_10) -> {\n                                    __lhs_0_11 = __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput(delegateLink)(__helios__tx__inputs(__helios__scriptcontext__tx), mph_11, true, true);\n                                    __helios__error(__helios__string____add("⬅️ ❌ 💁 dgTkn not returned: ", uut))\n                                }\n                            }\n                        )()(__cond_6)\n                    },\n                    () -> {\n                        () -> {\n                            __core__ifThenElse(\n                                hasDelegate,\n                                () -> {\n                                    __helios__print(__helios__string____add(__helios__string____add(" ⬅️ ✅ 💁 ok:  ^ dgTkn has ", cOrR), " a valid output\n"))\n                                },\n                                () -> {\n                                    () -> {\n                                        __helios__print(" ⬅️ 🚫 💁 no delegate but not req\'d; false")\n                                    }()\n                                }\n                            )()\n                        }()\n                    }\n                )(), __core__chooseUnit(__helios__print("cccc"), hasDelegate)))\n            }(__cond_4 = validatorHash;\n            __core__ifThenElse(\n                __helios__option[__helios__validatorhash]__some____is(__cond_4),\n                () -> {\n                    (__lhs_0_9) -> {\n                        vh_3 = __helios__option[__helios__validatorhash]__some__some(__lhs_0_9);\n                        __core__chooseUnit(__helios__print(__helios__string____add("  ... ^ sent to validator: ", __helios__validatorhash__show(vh_3)())), t = __helios__tx__value_locked_by(__helios__scriptcontext__tx)(vh_3);\n                        __helios__value__contains(t)(v))\n                    }\n                },\n                () -> {\n                    (__lhs_0_6) -> {\n                        __core__chooseUnit(__helios__print("   (to anywhere)\n"), __cond_5 = __helios__list[__helios__txoutput]__find_safe(__helios__tx__outputs(__helios__scriptcontext__tx))((o) -> {\n                            __helios__value__contains(__helios__txoutput__value(o))(v)\n                        });\n                        __core__ifThenElse(\n                            __helios__option[__helios__txoutput]__some____is(__cond_5),\n                            () -> {\n                                (__lhs_0_8) -> {\n                                    true\n                                }\n                            },\n                            () -> {\n                                (__lhs_0_7) -> {\n                                    false\n                                }\n                            }\n                        )()(__cond_5))\n                    }\n                }\n            )()(__cond_4)))\n        }(__cond_3 = createdOrReturned_1;\n        __core__ifThenElse(\n            __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____is(__cond_3),\n            () -> {\n                (__lhs_0_5) -> {\n                    "returned"\n                }\n            },\n            () -> {\n                (__lhs_0_4) -> {\n                    "created"\n                }\n            }\n        )()(__cond_3))))\n    };\n    __helios__option[__helios__txinput]__some__some = (self_91) -> {\n        __helios__txinput__from_data(__helios__common__enum_field_0(self_91))\n    };\n    __helios__option[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_132) -> {\n        __core__chooseData(data_132, () -> {\n            pair_45 = __core__unConstrData__safe(data_132);\n            index_7 = __core__fstPair(pair_45);\n            fields_86 = __core__sndPair(pair_45);\n            __core__ifThenElse(\n                __core__equalsInteger(index_7, 0),\n                () -> {\n                    __core__chooseList(fields_86, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_86), () -> {\n                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__headList__safe(fields_86))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_7, 1),\n                        () -> {\n                            __core__chooseList(fields_86, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoDelegateHelpers__PendingDelegateChange[]__is_valid_data = (data_133) -> {\n        __core__chooseData(data_133, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            fields_87 = __core__unListData__safe(data_133);\n            __core__chooseList(fields_87, () -> {\n                false\n            }, () -> {\n                head_49 = __core__headList__safe(fields_87);\n                __core__ifThenElse(\n                    __module__CapoDelegateHelpers__PendingDelegateAction[]__is_valid_data(__module__CapoDelegateHelpers__PendingDelegateAction[]__Add__is_valid_data_1, __module__CapoDelegateHelpers__PendingDelegateAction[]__Remove__is_valid_data_1, __module__CapoDelegateHelpers__PendingDelegateAction[]__Replace__is_valid_data_1)(head_49),\n                    () -> {\n                        fields_88 = __core__tailList__safe(fields_87);\n                        __core__chooseList(fields_88, () -> {\n                            false\n                        }, () -> {\n                            head_50 = __core__headList__safe(fields_88);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__DelegateRole[]__is_valid_data(__module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data_1)(head_50),\n                                () -> {\n                                    fields_89 = __core__tailList__safe(fields_88);\n                                    __core__chooseList(fields_89, () -> {\n                                        false\n                                    }, () -> {\n                                        head_51 = __core__headList__safe(fields_89);\n                                        __core__ifThenElse(\n                                            __helios__option[__helios__string]__is_valid_data(head_51),\n                                            () -> {\n                                                fields_90 = __core__tailList__safe(fields_89);\n                                                __core__chooseList(fields_90, () -> {\n                                                    false\n                                                }, () -> {\n                                                    head_52 = __core__headList__safe(fields_90);\n                                                    __core__ifThenElse(\n                                                        __helios__option[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_52),\n                                                        () -> {\n                                                            fields_91 = __core__tailList__safe(fields_90);\n                                                            __core__chooseList(fields_91, true, false)\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                })()\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__list[__helios__txinput]__any = (self_92) -> {\n        (fn_18) -> {\n            __helios__common__any(self_92, (item_5) -> {\n                fn_18(__helios__txinput__from_data(item_5))\n            })\n        }\n    };\n    __module__CapoHelpers__ManifestEntryType[]__is_valid_data = (__module__CapoHelpers__ManifestEntryType[]__NamedTokenRef__is_valid_data, __module__CapoHelpers__ManifestEntryType[]__DgDataPolicy__is_valid_data, __module__CapoHelpers__ManifestEntryType[]__DelegateThreads__is_valid_data, __module__CapoHelpers__ManifestEntryType[]__MerkleMembership__is_valid_data, __module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot__is_valid_data) -> {\n        (data_134) -> {\n            __core__ifThenElse(\n                __module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot__is_valid_data(data_134),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoHelpers__ManifestEntryType[]__MerkleMembership__is_valid_data(data_134),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoHelpers__ManifestEntryType[]__DelegateThreads__is_valid_data(data_134),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __module__CapoHelpers__ManifestEntryType[]__DgDataPolicy__is_valid_data(data_134),\n                                        () -> {\n                                            true\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoHelpers__ManifestEntryType[]__NamedTokenRef__is_valid_data(data_134),\n                                                () -> {\n                                                    true\n                                                },\n                                                () -> {\n                                                    false\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoHelpers__ManifestEntryType[]__NamedTokenRef__is_valid_data_1 = (data_135) -> {\n        __core__chooseData(data_135, () -> {\n            pair_46 = __core__unConstrData__safe(data_135);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_46), 0),\n                () -> {\n                    data_136 = __core__listData(__core__sndPair(pair_46));\n                    __core__chooseData(data_136, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_92 = __core__unListData__safe(data_136);\n                        __core__chooseList(fields_92, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__ManifestEntryType[]__DgDataPolicy__is_valid_data_1 = (data_137) -> {\n        __core__chooseData(data_137, () -> {\n            pair_47 = __core__unConstrData__safe(data_137);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_47), 1),\n                () -> {\n                    data_138 = __core__listData(__core__sndPair(pair_47));\n                    __core__chooseData(data_138, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_93 = __core__unListData__safe(data_138);\n                        __core__chooseList(fields_93, () -> {\n                            false\n                        }, () -> {\n                            head_53 = __core__headList__safe(fields_93);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_53),\n                                () -> {\n                                    fields_94 = __core__tailList__safe(fields_93);\n                                    __core__chooseList(fields_94, () -> {\n                                        false\n                                    }, () -> {\n                                        head_54 = __core__headList__safe(fields_94);\n                                        __core__ifThenElse(\n                                            __helios__string__is_valid_data(head_54),\n                                            () -> {\n                                                fields_95 = __core__tailList__safe(fields_94);\n                                                __core__chooseList(fields_95, () -> {\n                                                    false\n                                                }, () -> {\n                                                    head_55 = __core__headList__safe(fields_95);\n                                                    __core__ifThenElse(\n                                                        __helios__int__is_valid_data(head_55),\n                                                        () -> {\n                                                            fields_96 = __core__tailList__safe(fields_95);\n                                                            __core__chooseList(fields_96, true, false)\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                })()\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__ManifestEntryType[]__DelegateThreads__is_valid_data_1 = (data_139) -> {\n        __core__chooseData(data_139, () -> {\n            pair_48 = __core__unConstrData__safe(data_139);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_48), 2),\n                () -> {\n                    data_140 = __core__listData(__core__sndPair(pair_48));\n                    __core__chooseData(data_140, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_97 = __core__unListData__safe(data_140);\n                        __core__chooseList(fields_97, () -> {\n                            false\n                        }, () -> {\n                            head_56 = __core__headList__safe(fields_97);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__DelegateRole[]__is_valid_data(__module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data_1)(head_56),\n                                () -> {\n                                    fields_98 = __core__tailList__safe(fields_97);\n                                    __core__chooseList(fields_98, () -> {\n                                        false\n                                    }, () -> {\n                                        head_57 = __core__headList__safe(fields_98);\n                                        __core__ifThenElse(\n                                            __helios__int__is_valid_data(head_57),\n                                            () -> {\n                                                fields_99 = __core__tailList__safe(fields_98);\n                                                __core__chooseList(fields_99, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__ManifestEntryType[]__MerkleMembership__is_valid_data_1 = (data_141) -> {\n        __core__chooseData(data_141, () -> {\n            pair_49 = __core__unConstrData__safe(data_141);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_49), 3),\n                () -> {\n                    data_142 = __core__listData(__core__sndPair(pair_49));\n                    __core__chooseData(data_142, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_100 = __core__unListData__safe(data_142);\n                        __core__chooseList(fields_100, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot__is_valid_data_1 = (data_143) -> {\n        __core__chooseData(data_143, () -> {\n            pair_50 = __core__unConstrData__safe(data_143);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_50), 4),\n                () -> {\n                    data_144 = __core__listData(__core__sndPair(pair_50));\n                    __core__chooseData(data_144, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_101 = __core__unListData__safe(data_144);\n                        __core__chooseList(fields_101, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__option[__helios__mintingpolicyhash]__is_valid_data = (data_145) -> {\n        __core__chooseData(data_145, () -> {\n            pair_51 = __core__unConstrData__safe(data_145);\n            index_8 = __core__fstPair(pair_51);\n            fields_102 = __core__sndPair(pair_51);\n            __core__ifThenElse(\n                __core__equalsInteger(index_8, 0),\n                () -> {\n                    __core__chooseList(fields_102, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_102), () -> {\n                            __helios__mintingpolicyhash__is_valid_data(__core__headList__safe(fields_102))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_8, 1),\n                        () -> {\n                            __core__chooseList(fields_102, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__CapoManifestEntry[]__is_valid_data = (data_146) -> {\n        __core__ifThenElse(\n            __helios__common__test_mStruct_field(data_146, __core__bData(#6d7068), __helios__option[__helios__mintingpolicyhash]__is_valid_data),\n            () -> {\n                __core__ifThenElse(\n                    __helios__common__test_mStruct_field(data_146, __core__bData(#746e), __helios__bytearray__is_valid_data),\n                    () -> {\n                        __core__ifThenElse(\n                            __helios__common__test_mStruct_field(data_146, __core__bData(#747065), __module__CapoHelpers__ManifestEntryType[]__is_valid_data(__module__CapoHelpers__ManifestEntryType[]__NamedTokenRef__is_valid_data_1, __module__CapoHelpers__ManifestEntryType[]__DgDataPolicy__is_valid_data_1, __module__CapoHelpers__ManifestEntryType[]__DelegateThreads__is_valid_data_1, __module__CapoHelpers__ManifestEntryType[]__MerkleMembership__is_valid_data_1, __module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot__is_valid_data_1)),\n                            () -> {\n                                true\n                            },\n                            () -> {\n                                __core__trace("Warning: invalid CapoManifestEntry data", () -> {\n                                    false\n                                })()\n                            }\n                        )()\n                    },\n                    () -> {\n                        __core__trace("Warning: invalid CapoManifestEntry data", () -> {\n                            false\n                        })()\n                    }\n                )()\n            },\n            () -> {\n                __core__trace("Warning: invalid CapoManifestEntry data", () -> {\n                    false\n                })()\n            }\n        )()\n    };\n    __helios__map[__helios__mintingpolicyhash@__helios__map[__helios__bytearray@__helios__int]]__filter = (self_93) -> {\n        (fn_19) -> {\n            __helios__common__filter_map(self_93, (pair_52) -> {\n                fn_19(__helios__mintingpolicyhash__from_data(__core__fstPair(pair_52)), __helios__map[__helios__bytearray@__helios__int]__from_data(__core__sndPair(pair_52)))\n            })\n        }\n    };\n    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal = (lst_12) -> {\n        recurse_63 = (recurse_62, lst_13) -> {\n            __core__chooseList(lst_13, () -> {\n                true\n            }, () -> {\n                __core__ifThenElse(\n                    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__headList__safe(lst_13)),\n                    () -> {\n                        recurse_62(recurse_62, __core__tailList__safe(lst_13))\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_63(recurse_63, lst_12)\n    };\n    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_147) -> {\n        __core__chooseData(data_147, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(__core__unListData__safe(data_147))\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal = (map_16) -> {\n        recurse_65 = (recurse_64, map_17) -> {\n            __core__chooseList(map_17, () -> {\n                true\n            }, () -> {\n                head_58 = __core__headList__safe(map_17);\n                __core__ifThenElse(\n                    __helios__string__is_valid_data(__core__fstPair(head_58)),\n                    () -> {\n                        __core__ifThenElse(\n                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__sndPair(head_58)),\n                            () -> {\n                                recurse_64(recurse_64, __core__tailList__safe(map_17))\n                            },\n                            () -> {\n                                false\n                            }\n                        )()\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_65(recurse_65, map_16)\n    };\n    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_148) -> {\n        __core__chooseData(data_148, () -> {\n            false\n        }, () -> {\n            __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(__core__unMapData__safe(data_148))\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__map[__helios__string@__module__CapoHelpers__CapoManifestEntry[]]__is_valid_data_internal = (map_18) -> {\n        recurse_67 = (recurse_66, map_19) -> {\n            __core__chooseList(map_19, () -> {\n                true\n            }, () -> {\n                head_59 = __core__headList__safe(map_19);\n                __core__ifThenElse(\n                    __helios__string__is_valid_data(__core__fstPair(head_59)),\n                    () -> {\n                        __core__ifThenElse(\n                            __module__CapoHelpers__CapoManifestEntry[]__is_valid_data(__core__sndPair(head_59)),\n                            () -> {\n                                recurse_66(recurse_66, __core__tailList__safe(map_19))\n                            },\n                            () -> {\n                                false\n                            }\n                        )()\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_67(recurse_67, map_18)\n    };\n    __helios__map[__helios__string@__module__CapoHelpers__CapoManifestEntry[]]__is_valid_data = (data_149) -> {\n        __core__chooseData(data_149, () -> {\n            false\n        }, () -> {\n            __helios__map[__helios__string@__module__CapoHelpers__CapoManifestEntry[]]__is_valid_data_internal(__core__unMapData__safe(data_149))\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__list[__module__CapoDelegateHelpers__PendingDelegateChange[]]__is_valid_data_internal = (lst_14) -> {\n        recurse_69 = (recurse_68, lst_15) -> {\n            __core__chooseList(lst_15, () -> {\n                true\n            }, () -> {\n                __core__ifThenElse(\n                    __module__CapoDelegateHelpers__PendingDelegateChange[]__is_valid_data(__core__headList__safe(lst_15)),\n                    () -> {\n                        recurse_68(recurse_68, __core__tailList__safe(lst_15))\n                    },\n                    () -> {\n                        false\n                    }\n                )()\n            })()\n        };\n        recurse_69(recurse_69, lst_14)\n    };\n    __helios__list[__module__CapoDelegateHelpers__PendingDelegateChange[]]__is_valid_data = (data_150) -> {\n        __core__chooseData(data_150, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            __helios__list[__module__CapoDelegateHelpers__PendingDelegateChange[]]__is_valid_data_internal(__core__unListData__safe(data_150))\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterData__is_valid_data = (data_151) -> {\n        __core__chooseData(data_151, () -> {\n            pair_53 = __core__unConstrData__safe(data_151);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_53), 0),\n                () -> {\n                    data_152 = __core__listData(__core__sndPair(pair_53));\n                    __core__chooseData(data_152, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_103 = __core__unListData__safe(data_152);\n                        __core__chooseList(fields_103, () -> {\n                            false\n                        }, () -> {\n                            head_60 = __core__headList__safe(fields_103);\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_60),\n                                () -> {\n                                    fields_104 = __core__tailList__safe(fields_103);\n                                    __core__chooseList(fields_104, () -> {\n                                        false\n                                    }, () -> {\n                                        head_61 = __core__headList__safe(fields_104);\n                                        __core__ifThenElse(\n                                            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_61),\n                                            () -> {\n                                                fields_105 = __core__tailList__safe(fields_104);\n                                                __core__chooseList(fields_105, () -> {\n                                                    false\n                                                }, () -> {\n                                                    head_62 = __core__headList__safe(fields_105);\n                                                    __core__ifThenElse(\n                                                        __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_62),\n                                                        () -> {\n                                                            fields_106 = __core__tailList__safe(fields_105);\n                                                            __core__chooseList(fields_106, () -> {\n                                                                false\n                                                            }, () -> {\n                                                                head_63 = __core__headList__safe(fields_106);\n                                                                __core__ifThenElse(\n                                                                    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_63),\n                                                                    () -> {\n                                                                        fields_107 = __core__tailList__safe(fields_106);\n                                                                        __core__chooseList(fields_107, () -> {\n                                                                            false\n                                                                        }, () -> {\n                                                                            head_64 = __core__headList__safe(fields_107);\n                                                                            __core__ifThenElse(\n                                                                                __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_64),\n                                                                                () -> {\n                                                                                    fields_108 = __core__tailList__safe(fields_107);\n                                                                                    __core__chooseList(fields_108, () -> {\n                                                                                        false\n                                                                                    }, () -> {\n                                                                                        head_65 = __core__headList__safe(fields_108);\n                                                                                        __core__ifThenElse(\n                                                                                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_65),\n                                                                                            () -> {\n                                                                                                fields_109 = __core__tailList__safe(fields_108);\n                                                                                                __core__chooseList(fields_109, () -> {\n                                                                                                    false\n                                                                                                }, () -> {\n                                                                                                    head_66 = __core__headList__safe(fields_109);\n                                                                                                    __core__ifThenElse(\n                                                                                                        __helios__map[__helios__string@__module__CapoHelpers__CapoManifestEntry[]]__is_valid_data(head_66),\n                                                                                                        () -> {\n                                                                                                            fields_110 = __core__tailList__safe(fields_109);\n                                                                                                            __core__chooseList(fields_110, () -> {\n                                                                                                                false\n                                                                                                            }, () -> {\n                                                                                                                head_67 = __core__headList__safe(fields_110);\n                                                                                                                __core__ifThenElse(\n                                                                                                                    __helios__list[__module__CapoDelegateHelpers__PendingDelegateChange[]]__is_valid_data(head_67),\n                                                                                                                    () -> {\n                                                                                                                        fields_111 = __core__tailList__safe(fields_110);\n                                                                                                                        __core__chooseList(fields_111, true, false)\n                                                                                                                    },\n                                                                                                                    () -> {\n                                                                                                                        false\n                                                                                                                    }\n                                                                                                                )()\n                                                                                                            })()\n                                                                                                        },\n                                                                                                        () -> {\n                                                                                                            false\n                                                                                                        }\n                                                                                                    )()\n                                                                                                })()\n                                                                                            },\n                                                                                            () -> {\n                                                                                                false\n                                                                                            }\n                                                                                        )()\n                                                                                    })()\n                                                                                },\n                                                                                () -> {\n                                                                                    false\n                                                                                }\n                                                                            )()\n                                                                        })()\n                                                                    },\n                                                                    () -> {\n                                                                        false\n                                                                    }\n                                                                )()\n                                                            })()\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                })()\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterData__from_data = (data_153) -> {\n        ignore_4 = __core__ifThenElse(\n            __module__CapoHelpers__CapoDatum[]__CharterData__is_valid_data(data_153),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace("Warning: invalid CharterData data", ())\n            }\n        )();\n        data_153\n    };\n    __module__CapoHelpers__CapoDatum[]__CharterData____to_data = __helios__common__identity;\n    __module__CapoHelpers__CapoDatum[]__CharterData__mintDelegateLink = (self_94) -> {\n        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__enum_field_3(self_94))\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]____to_data = __helios__common__identity;\n    __module__CapoHelpers__cctx_CharterInputType[]__is_valid_data = (__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data, __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data) -> {\n        (data_154) -> {\n            __core__ifThenElse(\n                __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data(data_154),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data(data_154),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data(data_154),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__from_data = (__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_1) -> {\n        (data_155) -> {\n            ignore_5 = __core__ifThenElse(\n                __module__CapoHelpers__cctx_CharterInputType[]__is_valid_data(__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_1)(data_155),\n                () -> {\n                    ()\n                },\n                () -> {\n                    __core__trace("Warning: invalid cctx_CharterInputType data", ())\n                }\n            )();\n            data_155\n        }\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_2 = (data_156) -> {\n        __core__chooseData(data_156, () -> {\n            pair_54 = __core__unConstrData__safe(data_156);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_54), 0),\n                () -> {\n                    data_157 = __core__listData(__core__sndPair(pair_54));\n                    __core__chooseData(data_157, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_112 = __core__unListData__safe(data_157);\n                        __core__chooseList(fields_112, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Unk____new = () -> {\n        __core__constrData(0, __core__mkNilData(()))\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__RefInput____is = (data_158) -> {\n        __helios__common__enum_tag_equals(data_158, 1)\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data_2 = (data_159) -> {\n        __core__chooseData(data_159, () -> {\n            pair_55 = __core__unConstrData__safe(data_159);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_55), 1),\n                () -> {\n                    data_160 = __core__listData(__core__sndPair(pair_55));\n                    __core__chooseData(data_160, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_113 = __core__unListData__safe(data_160);\n                        __core__chooseList(fields_113, () -> {\n                            false\n                        }, () -> {\n                            head_68 = __core__headList__safe(fields_113);\n                            __core__ifThenElse(\n                                __module__CapoHelpers__CapoDatum[]__CharterData__is_valid_data(head_68),\n                                () -> {\n                                    fields_114 = __core__tailList__safe(fields_113);\n                                    __core__chooseList(fields_114, () -> {\n                                        false\n                                    }, () -> {\n                                        head_69 = __core__headList__safe(fields_114);\n                                        __core__ifThenElse(\n                                            __helios__txinput__is_valid_data(head_69),\n                                            () -> {\n                                                fields_115 = __core__tailList__safe(fields_114);\n                                                __core__chooseList(fields_115, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__RefInput__datum = (self_95) -> {\n        __module__CapoHelpers__CapoDatum[]__CharterData__from_data(__helios__common__enum_field_0(self_95))\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__RefInput____new = (datum, utxo) -> {\n        __core__constrData(1, __core__mkCons(__module__CapoHelpers__CapoDatum[]__CharterData____to_data(datum), __core__mkCons(__helios__txinput____to_data(utxo), __core__mkNilData(()))))\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Input____is = (data_161) -> {\n        __helios__common__enum_tag_equals(data_161, 2)\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_2 = (data_162) -> {\n        __core__chooseData(data_162, () -> {\n            pair_56 = __core__unConstrData__safe(data_162);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_56), 2),\n                () -> {\n                    data_163 = __core__listData(__core__sndPair(pair_56));\n                    __core__chooseData(data_163, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_116 = __core__unListData__safe(data_163);\n                        __core__chooseList(fields_116, () -> {\n                            false\n                        }, () -> {\n                            head_70 = __core__headList__safe(fields_116);\n                            __core__ifThenElse(\n                                __module__CapoHelpers__CapoDatum[]__CharterData__is_valid_data(head_70),\n                                () -> {\n                                    fields_117 = __core__tailList__safe(fields_116);\n                                    __core__chooseList(fields_117, () -> {\n                                        false\n                                    }, () -> {\n                                        head_71 = __core__headList__safe(fields_117);\n                                        __core__ifThenElse(\n                                            __helios__txinput__is_valid_data(head_71),\n                                            () -> {\n                                                fields_118 = __core__tailList__safe(fields_117);\n                                                __core__chooseList(fields_118, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__cctx_CharterInputType[]__Input__datum = (self_96) -> {\n        __module__CapoHelpers__CapoDatum[]__CharterData__from_data(__helios__common__enum_field_0(self_96))\n    };\n    __module__CapoHelpers__getRefCharterUtxo = (mph_12) -> {\n        chVal = __module__StellarHeliosHelpers__tvCharter(mph_12);\n        hasCharter = (txin) -> {\n            __helios__value__contains(__helios__txinput__value(txin))(chVal)\n        };\n        __core__chooseUnit(__helios__print("getting ref_input for charter\n"), (charterUtxo) -> {\n            charterUtxo\n        }(__cond_7 = __helios__list[__helios__txinput]__find_safe(__helios__tx__ref_inputs(__helios__scriptcontext__tx))(hasCharter);\n        __core__ifThenElse(\n            __helios__option[__helios__txinput]__some____is(__cond_7),\n            () -> {\n                (__lhs_0_14) -> {\n                    ch = __helios__option[__helios__txinput]__some__some(__lhs_0_14);\n                    ch\n                }\n            },\n            () -> {\n                (__lhs_0_13) -> {\n                    __core__chooseUnit(__helios__print("expected charter value"), __core__chooseUnit(__helios__print(__helios__value__show(chVal)()), __core__chooseUnit(__helios__print("\n"), __helios__error("Missing charter in required ref_inputs (use tcxWithCharterRef(tcx) in txn building functions)"))))\n                }\n            }\n        )()(__cond_7)))\n    };\n    __module__CapoHelpers__getTxCharterData = (mph_13, __useopt__refInputs, refInputs) -> {\n        refInputs_1 = __core__ifThenElse(\n            __useopt__refInputs,\n            () -> {\n                refInputs\n            },\n            () -> {\n                __helios__tx__ref_inputs(__helios__scriptcontext__tx)\n            }\n        )();\n        chVal_1 = __module__StellarHeliosHelpers__tvCharter(mph_13);\n        hasCharter_1 = (txin_1) -> {\n            __helios__value__contains(__helios__txinput__value(txin_1))(chVal_1)\n        };\n        (charterUtxo_1) -> {\n            ctd = __helios__common__assert_constr_index(__module__CapoHelpers__CapoDatum[]__CharterData__from_data(__helios__txoutputdatum__inline(__helios__txinput__datum(charterUtxo_1))), 0);\n            ctd\n        }(__cond_8 = __helios__list[__helios__txinput]__find_safe(refInputs_1)(hasCharter_1);\n        __core__ifThenElse(\n            __helios__option[__helios__txinput]__some____is(__cond_8),\n            () -> {\n                (__lhs_0_18) -> {\n                    ch_2 = __helios__option[__helios__txinput]__some__some(__lhs_0_18);\n                    ch_2\n                }\n            },\n            () -> {\n                (__lhs_0_15) -> {\n                    __cond_9 = __helios__list[__helios__txinput]__find_safe(__helios__tx__inputs(__helios__scriptcontext__tx))(hasCharter_1);\n                    __core__ifThenElse(\n                        __helios__option[__helios__txinput]__some____is(__cond_9),\n                        () -> {\n                            (__lhs_0_17) -> {\n                                ch_1 = __helios__option[__helios__txinput]__some__some(__lhs_0_17);\n                                ch_1\n                            }\n                        },\n                        () -> {\n                            (__lhs_0_16) -> {\n                                __helios__error("Missing charter inputs / ref_inputs")\n                            }\n                        }\n                    )()(__cond_9)\n                }\n            }\n        )()(__cond_8))\n    };\n    __helios__option[__helios__txinput]__is_valid_data = (data_164) -> {\n        __core__chooseData(data_164, () -> {\n            pair_57 = __core__unConstrData__safe(data_164);\n            index_9 = __core__fstPair(pair_57);\n            fields_119 = __core__sndPair(pair_57);\n            __core__ifThenElse(\n                __core__equalsInteger(index_9, 0),\n                () -> {\n                    __core__chooseList(fields_119, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_119), () -> {\n                            __helios__txinput__is_valid_data(__core__headList__safe(fields_119))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_9, 1),\n                        () -> {\n                            __core__chooseList(fields_119, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoHelpers__DelegateInput[]__link = (self_97) -> {\n        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__struct_field_0(self_97))\n    };\n    __helios__option[__helios__txinput]__from_data = (data_165) -> {\n        __4 = __core__ifThenElse(\n            __helios__option[__helios__txinput]__is_valid_data(data_165),\n            () -> {\n                ()\n            },\n            () -> {\n                __core__trace("Warning: invalid option data", ())\n            }\n        )();\n        data_165\n    };\n    __module__CapoHelpers__DelegateInput[]__input = (self_98) -> {\n        __helios__option[__helios__txinput]__from_data(__helios__common__struct_field_3(self_98))\n    };\n    __module__CapoHelpers__DelegateInput[]__mph = (self_99) -> {\n        __helios__mintingpolicyhash__from_data(__helios__common__struct_field_4(self_99))\n    };\n    __helios__option[__helios__txinput]____to_data = __helios__common__identity;\n    __module__CapoHelpers__DelegateInput[]____new = (link, role, idPrefix, input, mph_14) -> {\n        __core__mkCons(__module__CapoDelegateHelpers__RelativeDelegateLink[]____to_data(link), __core__mkCons(__module__CapoDelegateHelpers__DelegateRole[]____to_data(role), __core__mkCons(__helios__option[__helios__string]____to_data(idPrefix), __core__mkCons(__helios__option[__helios__txinput]____to_data(input), __core__mkCons(__helios__mintingpolicyhash____to_data(mph_14), __core__mkNilData(()))))))\n    };\n    __helios__list[__helios__data]__length = __helios__common__length;\n    __helios__option[__helios__txinput]__unwrap = (self_100) -> {\n        () -> {\n            __helios__txinput__from_data(__helios__common__enum_field_0(self_100))\n        }\n    };\n    __module__CapoHelpers__DelegateInput[]__genericDelegateActivityAsData = (self_101) -> {\n        () -> {\n            i_6 = __helios__option[__helios__txinput]__unwrap(__module__CapoHelpers__DelegateInput[]__input(self_101))();\n            inputData = __module__StellarHeliosHelpers__mustFindInputRedeemer(i_6);\n            __core__chooseUnit(__cond_10 = inputData;\n            __core__ifThenElse(\n                __helios__data__constrdata____is(__cond_10),\n                () -> {\n                    (__lhs_0_19) -> {\n                        index_10 = __helios__data__constrdata__tag(__lhs_0_19);\n                        fields_120 = __helios__data__constrdata__fields(__lhs_0_19);\n                        __core__chooseUnit(__helios__print(__helios__string____add("    --🐞 generic delegate activity at index ", __helios__int__show(index_10)())), __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add("    ---- from input id:", __helios__txid__show(__helios__txoutputid__tx_id(__helios__txinput__output_id(i_6)))()), "🔹#"), __helios__int__show(__helios__txoutputid__index(__helios__txinput__output_id(i_6)))())), __core__chooseUnit(__helios__print(__helios__string____add("       = ", __helios__value__show(__helios__txinput__value(i_6))())), __core__chooseUnit(__helios__assert(__helios__int____eq(index_10, index_10), "no way"), __helios__assert(__helios__int____gt(__helios__list[__helios__data]__length(fields_120), 0), "no way")))))\n                    }\n                },\n                () -> {\n                    (__5) -> {\n                        ()\n                    }\n                }\n            )()(__cond_10), inputData)\n        }\n    };\n    __module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1 = (__module__CapoHelpers__DelegateInput[]__genericDelegateActivity) -> {\n        (self_102) -> {\n            () -> {\n                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)(__module__CapoHelpers__DelegateInput[]__genericDelegateActivityAsData(self_102)())\n            }\n        }\n    };\n    __module__CapoHelpers__DelegateInput[]__requiresValidOutput = (self_103) -> {\n        (__useopt__createdOrReturned_1, createdOrReturned_2) -> {\n            createdOrReturned_3 = __core__ifThenElse(\n                __useopt__createdOrReturned_1,\n                () -> {\n                    createdOrReturned_2\n                },\n                () -> {\n                    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new()\n                }\n            )();\n            __module__CapoDelegateHelpers__linkHasValidOutput(__module__CapoHelpers__DelegateInput[]__link(self_103), __module__CapoHelpers__DelegateInput[]__mph(self_103), true, true, true, createdOrReturned_3)\n        }\n    };\n    __module__CapoHelpers__CapoCtx[]__mph = (self_104) -> {\n        __helios__mintingpolicyhash__from_data(__helios__common__struct_field_0(self_104))\n    };\n    __module__CapoHelpers__CapoCtx[]__charter = (self_105) -> {\n        __module__CapoHelpers__cctx_CharterInputType[]__from_data(__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_2, __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data_2, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_2)(__helios__common__struct_field_1(self_105))\n    };\n    __module__CapoHelpers__CapoCtx[]____new = (mph_15, charter) -> {\n        __core__mkCons(__helios__mintingpolicyhash____to_data(mph_15), __core__mkCons(__module__CapoHelpers__cctx_CharterInputType[]____to_data(charter), __core__mkNilData(())))\n    };\n    __module__CapoHelpers__CapoCtx[]__requiresMintDelegateInput = (__module__CapoHelpers__CapoCtx[]__getCharterData, __module__CapoHelpers__CapoCtx[]__requiresDelegateInput) -> {\n        (self_106) -> {\n            (__useopt__required_2, required_4) -> {\n                required_5 = __core__ifThenElse(\n                    __useopt__required_2,\n                    () -> {\n                        required_4\n                    },\n                    () -> {\n                        true\n                    }\n                )();\n                dgtLink = __module__CapoHelpers__CapoDatum[]__CharterData__mintDelegateLink(__module__CapoHelpers__CapoCtx[]__getCharterData(self_106)());\n                __module__CapoHelpers__CapoCtx[]__requiresDelegateInput(self_106)(dgtLink, __module__CapoDelegateHelpers__DelegateRole[]__MintDgt____new(), true, required_5, false, ())\n            }\n        }\n    };\n    __module__CapoHelpers__CapoCtx[]__getCharterData_1 = (self_107) -> {\n        () -> {\n            __cond_11 = __module__CapoHelpers__CapoCtx[]__charter(self_107);\n            __core__ifThenElse(\n                __module__CapoHelpers__cctx_CharterInputType[]__RefInput____is(__cond_11),\n                () -> {\n                    (__lhs_0_21) -> {\n                        datum_2 = __module__CapoHelpers__cctx_CharterInputType[]__RefInput__datum(__lhs_0_21);\n                        datum_2\n                    }\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoHelpers__cctx_CharterInputType[]__Input____is(__cond_11),\n                        () -> {\n                            (__lhs_0_20) -> {\n                                datum_1 = __module__CapoHelpers__cctx_CharterInputType[]__Input__datum(__lhs_0_20);\n                                datum_1\n                            }\n                        },\n                        () -> {\n                            (__6) -> {\n                                __helios__error("CapoCtx.getCharterData(): unknown charter strategy; use result of withCharterInput(), withCharterRef(), or needsCharter() to resolve charter datum first")\n                            }\n                        }\n                    )()\n                }\n            )()(__cond_11)\n        }\n    };\n    __helios__option[__helios__string]__none____new = () -> {\n        __helios__option__NONE\n    };\n    __module__CapoHelpers__CapoCtx[]__requiresDelegateInput_1 = (self_108) -> {\n        (dgtLink_1, role_1, __useopt__required_3, required_6, __useopt__idPrefix, idPrefix_1) -> {\n            required_7 = __core__ifThenElse(\n                __useopt__required_3,\n                () -> {\n                    required_6\n                },\n                () -> {\n                    true\n                }\n            )();\n            idPrefix_2 = __core__ifThenElse(\n                __useopt__idPrefix,\n                () -> {\n                    idPrefix_1\n                },\n                () -> {\n                    __helios__option[__helios__string]__none____new()\n                }\n            )();\n            __module__CapoHelpers__DelegateInput[]____new(dgtLink_1, role_1, idPrefix_2, __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput(dgtLink_1)(__helios__tx__inputs(__helios__scriptcontext__tx), __module__CapoHelpers__CapoCtx[]__mph(self_108), true, required_7), __module__CapoHelpers__CapoCtx[]__mph(self_108))\n        }\n    };\n    __module__CapoHelpers__CapoCtx[]__withCharterRef = (self_109) -> {\n        () -> {\n            __core__chooseUnit(__module__StellarHeliosHelpers__REQT("requires the charter to be referenced in the txn, but unspent", false, ()), charter_1 = __module__CapoHelpers__CapoCtx[]__charter(self_109);\n            __cond_12 = charter_1;\n            __core__ifThenElse(\n                __module__CapoHelpers__cctx_CharterInputType[]__RefInput____is(__cond_12),\n                () -> {\n                    (__lhs_0_25) -> {\n                        self_109\n                    }\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoHelpers__cctx_CharterInputType[]__Input____is(__cond_12),\n                        () -> {\n                            (__lhs_0_24) -> {\n                                __helios__error("CapoCtx.withCharterRef(): charter is from inputs!")\n                            }\n                        },\n                        () -> {\n                            (__lhs_0_22) -> {\n                                __lhs_0_23 = self_109;\n                                mph_16 = __module__CapoHelpers__CapoCtx[]__mph(__lhs_0_23);\n                                utxo_1 = __module__CapoHelpers__getRefCharterUtxo(mph_16);\n                                datum_3 = __helios__common__assert_constr_index(__module__CapoHelpers__CapoDatum[]__CharterData__from_data(__helios__txoutputdatum__inline(__helios__txinput__datum(utxo_1))), 0);\n                                __module__CapoHelpers__CapoCtx[]____new(mph_16, __module__CapoHelpers__cctx_CharterInputType[]__RefInput____new(datum_3, utxo_1))\n                            }\n                        }\n                    )()\n                }\n            )()(__cond_12))\n        }\n    };\n    __module__CapoHelpers__mkCapoCtx = (mph_17) -> {\n        __module__CapoHelpers__CapoCtx[]____new(mph_17, __module__CapoHelpers__cctx_CharterInputType[]__Unk____new())\n    };\n    __module__CapoMintHelpers__hasSeedUtxo = (tx, seedUtxo) -> {\n        __core__chooseUnit(__core__ifThenElse(\n            __helios__bool____not(__helios__list[__helios__txinput]__any(__helios__tx__inputs(tx))((input_1) -> {\n                __helios__txoutputid____eq(__helios__txinput__output_id(input_1), seedUtxo)\n            })),\n            () -> {\n                __core__chooseUnit(__helios__print(" - expected seedUtxo: "), __core__chooseUnit(__helios__print(__helios__txoutputid__show(seedUtxo)()), __core__chooseUnit(__helios__print("\n"), __helios__assert(false, "missing expected seed input for minting"))))\n            },\n            () -> {\n                () -> {\n                    ()\n                }()\n            }\n        )(), __core__chooseUnit(__helios__print("  -- has seed -> ok\n"), true))\n    };\n    __module__CapoMintHelpers__noOtherActivitiesSupported = (__7) -> {\n        __core__chooseUnit(__helios__print("yikes, expected DelegateLifecycleActivities:ReplacingMe or authorizingDelegate  \n"), __core__chooseUnit(__helios__print("   -- note: for other cases, the checkMintDgtActivity( (AbstractDelegateActivitiesEnum) -> Bool): option can provide context-specific checks\n"), __core__chooseUnit(__helios__assert(false, "unexpected delegate activity"), false)))\n    };\n    __helios__option[__helios__data]__none____is = (data_166) -> {\n        __helios__common__enum_tag_equals(data_166, 1)\n    };\n    __helios__option[__helios__data]__some__some = (self_110) -> {\n        __helios__data__from_data(__helios__common__enum_field_0(self_110))\n    };\n    __helios__map[__helios__scriptpurpose@__helios__data]__get_safe = (self_111) -> {\n        (key_12) -> {\n            __helios__common__map_get(self_111, __helios__scriptpurpose____to_data(key_12), (x_3) -> {\n                __core__constrData(0, __helios__common__list_1(x_3))\n            }, () -> {\n                __core__constrData(1, __helios__common__list_0)\n            })\n        }\n    };\n    __module__CapoMintHelpers__requiresDelegateAuthorizingMint = (delegateLink_1, mph_18, __useopt__extraMintDelegateRedeemerCheck, extraMintDelegateRedeemerCheck, __useopt__checkMintDgtActivity, checkMintDgtActivity) -> {\n        extraMintDelegateRedeemerCheck_1 = __core__ifThenElse(\n            __useopt__extraMintDelegateRedeemerCheck,\n            () -> {\n                extraMintDelegateRedeemerCheck\n            },\n            () -> {\n                true\n            }\n        )();\n        checkMintDgtActivity_1 = __core__ifThenElse(\n            __useopt__checkMintDgtActivity,\n            () -> {\n                checkMintDgtActivity\n            },\n            () -> {\n                __module__CapoMintHelpers__noOtherActivitiesSupported\n            }\n        )();\n        authzVal = __helios__value__new(__helios__assetclass__new(mph_18, __helios__string__encode_utf8(__module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink_1))()), 1);\n        __core__chooseUnit(__module__StellarHeliosHelpers__REQT("requires the charter\'s mint-delegate to authorize this mint activity", false, ()), __core__chooseUnit(__helios__print(__helios__string____add("  -- finding input dgTkn: ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink_1))), (targetId_1) -> {\n            __core__chooseUnit(__helios__print("    -- ✅ ➡️  💁found dgTkn ^"), spendsAuthorityUut = __helios__map[__helios__scriptpurpose@__helios__data]__find_key(__helios__tx__redeemers(__helios__scriptcontext__tx))((purpose_1) -> {\n                __cond_14 = purpose_1;\n                __core__ifThenElse(\n                    __helios__scriptpurpose__spending____is(__cond_14),\n                    () -> {\n                        (sp_1) -> {\n                            __helios__txoutputid____eq(__helios__scriptpurpose__spending__output_id(sp_1), targetId_1)\n                        }\n                    },\n                    () -> {\n                        (__8) -> {\n                            false\n                        }\n                    }\n                )()(__cond_14)\n            });\n            err = __helios__string____add(__helios__string____add("dgTkn ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink_1)), " not being spent as expected");\n            (maybeCheckedMintDelegateAuthority) -> {\n                delegateDidAuthorize = true;\n                __helios__bool__and(() -> {\n                    delegateDidAuthorize\n                }, () -> {\n                    maybeCheckedMintDelegateAuthority\n                })\n            }(__cond_15 = __helios__map[__helios__scriptpurpose@__helios__data]__get_safe(__helios__tx__redeemers(__helios__scriptcontext__tx))(spendsAuthorityUut);\n            __core__ifThenElse(\n                __helios__option[__helios__data]__none____is(__cond_15),\n                () -> {\n                    (__lhs_0_33) -> {\n                        __helios__error(err)\n                    }\n                },\n                () -> {\n                    (__lhs_0_28) -> {\n                        x_5 = __helios__option[__helios__data]__some__some(__lhs_0_28);\n                        activity = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)(x_5);\n                        __cond_16 = activity;\n                        __core__ifThenElse(\n                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities____is(__cond_16),\n                            () -> {\n                                (__lhs_0_29) -> {\n                                    DLA = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__activity(__lhs_0_29);\n                                    __core__chooseUnit(__module__StellarHeliosHelpers__TODO("VERIFY we ---------------- don\'t need the funny redeemer-check skipping"), __core__chooseUnit(__core__ifThenElse(\n                                        __helios__bool____not(extraMintDelegateRedeemerCheck_1),\n                                        () -> {\n                                            __core__chooseUnit(__helios__print(" vvv wherever it is, probably best it uses the checkMintDgtActivity option"), __helios__error("where is extraMintDelegateRedeemerCheck=false really needed?"))\n                                        },\n                                        () -> {\n                                            () -> {\n                                                ()\n                                            }()\n                                        }\n                                    )(), __cond_17 = DLA;\n                                    __core__ifThenElse(\n                                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is(__cond_17),\n                                        () -> {\n                                            (__lhs_0_32) -> {\n                                                __core__chooseUnit(__helios__print("  -- ok, dgTkn spent\n"), true)\n                                            }\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring____is(__cond_17),\n                                                () -> {\n                                                    (__lhs_0_31) -> {\n                                                        __helios__error("DLA::Retiring can\'t mint!")\n                                                    }\n                                                },\n                                                () -> {\n                                                    (__lhs_0_30) -> {\n                                                        __helios__error("DLA::ValidatingSettings can\'t mint!")\n                                                    }\n                                                }\n                                            )()\n                                        }\n                                    )()(__cond_17)))\n                                }\n                            },\n                            () -> {\n                                (__9) -> {\n                                    checkMintDgtActivity_1(activity)\n                                }\n                            }\n                        )()(__cond_16)\n                    }\n                }\n            )()(__cond_15)))\n        }(__cond_13 = __helios__list[__helios__txinput]__find_safe(__helios__tx__inputs(__helios__scriptcontext__tx))((i_7) -> {\n            __helios__value__contains(__helios__txinput__value(i_7))(authzVal)\n        });\n        __core__ifThenElse(\n            __helios__option[__helios__txinput]__some____is(__cond_13),\n            () -> {\n                (__lhs_0_27) -> {\n                    x_4 = __helios__option[__helios__txinput]__some__some(__lhs_0_27);\n                    __helios__txinput__output_id(x_4)\n                }\n            },\n            () -> {\n                (__lhs_0_26) -> {\n                    __helios__error(__helios__string____add("  ❌❌ missing dgTkn ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink_1)))\n                }\n            }\n        )()(__cond_13))))\n    };\n    __helios__list[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]]__all = (self_112) -> {\n        (fn_20) -> {\n            __helios__common__all(self_112, (item_6) -> {\n                fn_20(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)(item_6))\n            })\n        }\n    };\n    __helios__list[__helios__data]__map[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]] = (self_113) -> {\n        (fn_21) -> {\n            __helios__common__map(self_113, (item_7) -> {\n                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]____to_data(fn_21(__helios__data__from_data(item_7)))\n            }, __core__mkNilData(()))\n        }\n    };\n    __module__CapoMintHelpers__requiresMintDelegateApproval = (mph_19) -> {\n        cctx = __module__CapoHelpers__CapoCtx[]__withCharterRef(__module__CapoHelpers__mkCapoCtx(mph_19))();\n        __core__chooseUnit(__helios__print("Minter needs mintDgt + mint activity\n"), __core__chooseUnit(__module__StellarHeliosHelpers__REQT("EXPECTS the application-specific mintDelegate to explicitly check and approve the full minted value", false, ()), __core__chooseUnit(__helios__print("    -- ^ e.g. assert(tx.minted.get_policy(mph) == expectedMintedValue);\n"), __core__chooseUnit(__helios__print("    ---- (if it\'s only responsible for one minting policy)\n"), __core__chooseUnit(__module__StellarHeliosHelpers__TODO("must enforce minting invariants"), mintDgtInput = __module__CapoHelpers__CapoCtx[]__requiresMintDelegateInput(__module__CapoHelpers__CapoCtx[]__getCharterData_1, __module__CapoHelpers__CapoCtx[]__requiresDelegateInput_1)(cctx)(false, ());\n        mintDgtActivity = __module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1(__module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1)(mintDgtInput)();\n        __cond_18 = mintDgtActivity;\n        __core__ifThenElse(\n            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is(__cond_18),\n            () -> {\n                (__lhs_0_54) -> {\n                    CLA = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__activity(__lhs_0_54);\n                    __cond_21 = CLA;\n                    __core__ifThenElse(\n                        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate____is(__cond_21),\n                        () -> {\n                            (__lhs_0_58) -> {\n                                __core__chooseUnit(__module__StellarHeliosHelpers__TODO("make this obsolete: generic creatingDelegate (use queuePendingDgtChange and committingPendingDgtChanges in sequence)"), __helios__bool__and(() -> {\n                                    __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                }, () -> {\n                                    true\n                                }))\n                            }\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange____is(__cond_21),\n                                () -> {\n                                    (__lhs_0_57) -> {\n                                        __core__chooseUnit(__helios__print("  -- ok: mintDgt using CapoLifecycle.queuePendingDgtChange)\n"), __helios__bool__and(() -> {\n                                            __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                        }, () -> {\n                                            true\n                                        }))\n                                    }\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate____is(__cond_21),\n                                        () -> {\n                                            (__lhs_0_56) -> {\n                                                __helios__error("invalid forcingNewSpendDelegate activity on mintDgt (escape-hatch reserved for Minter/Capo pair)")\n                                            }\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate____is(__cond_21),\n                                                () -> {\n                                                    (__lhs_0_55) -> {\n                                                        __helios__error("invalid forcingNewMintDelegate activity on mintDgt (escape-hatch reserved for Minter/Capo pair)")\n                                                    }\n                                                },\n                                                () -> {\n                                                    (__10) -> {\n                                                        __helios__error("mint dgt can only approve CapoLifecycleActivities.queuePendingDgtChange or non-CLA activities")\n                                                    }\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()(__cond_21)\n                }\n            },\n            () -> {\n                __core__ifThenElse(\n                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities____is(__cond_18),\n                    () -> {\n                        (__lhs_0_53) -> {\n                            __helios__error("DelegateInput::SpendingActivity can\'t mint!")\n                        }\n                    },\n                    () -> {\n                        __core__ifThenElse(\n                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities____is(__cond_18),\n                            () -> {\n                                (__lhs_0_49) -> {\n                                    DLA_1 = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__activity(__lhs_0_49);\n                                    __cond_20 = DLA_1;\n                                    __core__ifThenElse(\n                                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is(__cond_20),\n                                        () -> {\n                                            (__lhs_0_52) -> {\n                                                __core__chooseUnit(__module__StellarHeliosHelpers__TODO("relay delegate installation sequence"), __core__chooseUnit(__helios__print("  -- TEMPORARY: the mint delegate is being replaced\n"), true))\n                                            }\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring____is(__cond_20),\n                                                () -> {\n                                                    (__lhs_0_51) -> {\n                                                        __helios__error("DLA::Retiring can\'t mint!")\n                                                    }\n                                                },\n                                                () -> {\n                                                    (__lhs_0_50) -> {\n                                                        __helios__error("DLA::ValidatingSettings can\'t mint!")\n                                                    }\n                                                }\n                                            )()\n                                        }\n                                    )()(__cond_20)\n                                }\n                            },\n                            () -> {\n                                __core__ifThenElse(\n                                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities____is(__cond_18),\n                                    () -> {\n                                        (__lhs_0_48) -> {\n                                            __core__chooseUnit(__helios__print("  -- app-specific minting; trust mintDgt\n"), __helios__bool__and(() -> {\n                                                __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                            }, () -> {\n                                                true\n                                            }))\n                                        }\n                                    },\n                                    () -> {\n                                        __core__ifThenElse(\n                                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities____is(__cond_18),\n                                            () -> {\n                                                (__lhs_0_47) -> {\n                                                    __core__chooseUnit(__helios__print("  -- app-specific burning; trust mintDgt"), __helios__bool__and(() -> {\n                                                        __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                                    }, () -> {\n                                                        true\n                                                    }))\n                                                }\n                                            },\n                                            () -> {\n                                                __core__ifThenElse(\n                                                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData____is(__cond_18),\n                                                    () -> {\n                                                        (__lhs_0_46) -> {\n                                                            __core__chooseUnit(__helios__print("  -- mint for dgData; trust mintDgt"), __helios__bool__and(() -> {\n                                                                __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                                            }, () -> {\n                                                                true\n                                                            }))\n                                                        }\n                                                    },\n                                                    () -> {\n                                                        __core__ifThenElse(\n                                                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData____is(__cond_18),\n                                                            () -> {\n                                                                (__lhs_0_45) -> {\n                                                                    __core__chooseUnit(__helios__print("  -- burn for dgData; trust mintDgt"), __helios__bool__and(() -> {\n                                                                        __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                                                    }, () -> {\n                                                                        true\n                                                                    }))\n                                                                }\n                                                            },\n                                                            () -> {\n                                                                __core__ifThenElse(\n                                                                    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData____is(__cond_18),\n                                                                    () -> {\n                                                                        (__lhs_0_44) -> {\n                                                                            __helios__error("invalid mint-delegate activity for minting; UpdatingDelegatedDatum can\'t mint")\n                                                                        }\n                                                                    },\n                                                                    () -> {\n                                                                        (__lhs_0_34) -> {\n                                                                            ma = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__activities(__lhs_0_34);\n                                                                            __helios__bool__and(() -> {\n                                                                                __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())\n                                                                            }, () -> {\n                                                                                __helios__list[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]]__all(__helios__list[__helios__data]__map[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]](ma)(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)))((mintDgtActivity_1) -> {\n                                                                                    __cond_19 = mintDgtActivity_1;\n                                                                                    __core__ifThenElse(\n                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData____is(__cond_19),\n                                                                                        () -> {\n                                                                                            (__lhs_0_43) -> {\n                                                                                                true\n                                                                                            }\n                                                                                        },\n                                                                                        () -> {\n                                                                                            __core__ifThenElse(\n                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData____is(__cond_19),\n                                                                                                () -> {\n                                                                                                    (__lhs_0_42) -> {\n                                                                                                        true\n                                                                                                    }\n                                                                                                },\n                                                                                                () -> {\n                                                                                                    __core__ifThenElse(\n                                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities____is(__cond_19),\n                                                                                                        () -> {\n                                                                                                            (__lhs_0_41) -> {\n                                                                                                                __helios__error("mintDgt: MultipleDelegateActivities: nested MintingActivities invalid")\n                                                                                                            }\n                                                                                                        },\n                                                                                                        () -> {\n                                                                                                            __core__ifThenElse(\n                                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities____is(__cond_19),\n                                                                                                                () -> {\n                                                                                                                    (__lhs_0_40) -> {\n                                                                                                                        __helios__error("mintDgt: MultipleDelegateActivities: nested BurningActivities invalid")\n                                                                                                                    }\n                                                                                                                },\n                                                                                                                () -> {\n                                                                                                                    __core__ifThenElse(\n                                                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities____is(__cond_19),\n                                                                                                                        () -> {\n                                                                                                                            (__lhs_0_39) -> {\n                                                                                                                                __helios__error("mintDgt: MultipleDelegateActivities: nested MultipleDelegateActivities invalid")\n                                                                                                                            }\n                                                                                                                        },\n                                                                                                                        () -> {\n                                                                                                                            __core__ifThenElse(\n                                                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData____is(__cond_19),\n                                                                                                                                () -> {\n                                                                                                                                    (__lhs_0_38) -> {\n                                                                                                                                        __helios__error("mintDgt: MultipleDelegateActivities: nested UpdatingDelegatedData invalid")\n                                                                                                                                    }\n                                                                                                                                },\n                                                                                                                                () -> {\n                                                                                                                                    __core__ifThenElse(\n                                                                                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities____is(__cond_19),\n                                                                                                                                        () -> {\n                                                                                                                                            (__lhs_0_37) -> {\n                                                                                                                                                __helios__error("mintDgt: MultipleDelegateActivities: nested SpendingActivities invalid")\n                                                                                                                                            }\n                                                                                                                                        },\n                                                                                                                                        () -> {\n                                                                                                                                            __core__ifThenElse(\n                                                                                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is(__cond_19),\n                                                                                                                                                () -> {\n                                                                                                                                                    (__lhs_0_36) -> {\n                                                                                                                                                        __helios__error("mintDgt: MultipleDelegateActivities: nested CapoLifecycleActivities invalid")\n                                                                                                                                                    }\n                                                                                                                                                },\n                                                                                                                                                () -> {\n                                                                                                                                                    (__lhs_0_35) -> {\n                                                                                                                                                        __helios__error("mintDgt: MultipleDelegateActivities: nested DelegateLifecycleActivities invalid")\n                                                                                                                                                    }\n                                                                                                                                                }\n                                                                                                                                            )()\n                                                                                                                                        }\n                                                                                                                                    )()\n                                                                                                                                }\n                                                                                                                            )()\n                                                                                                                        }\n                                                                                                                    )()\n                                                                                                                }\n                                                                                                            )()\n                                                                                                        }\n                                                                                                    )()\n                                                                                                }\n                                                                                            )()\n                                                                                        }\n                                                                                    )()(__cond_19)\n                                                                                })\n                                                                            })\n                                                                        }\n                                                                    }\n                                                                )()\n                                                            }\n                                                        )()\n                                                    }\n                                                )()\n                                            }\n                                        )()\n                                    }\n                                )()\n                            }\n                        )()\n                    }\n                )()\n            }\n        )()(__cond_18))))))\n    };\n    __module__CapoMintHelpers__mkUutTnFactory = (seed) -> {\n        seedTxId = __helios__txoutputid__tx_id(seed);\n        seedIdx = __helios__txoutputid__index(seed);\n        idxBytes = __helios__int__serialize(seedIdx)();\n        rawTxId = __helios__bytearray__slice(__helios__txid__serialize(seedTxId)())(5, 37);\n        txoInfo = __core__ifThenElse(\n            __helios__int____gt(__helios__bytearray__length(idxBytes), 9),\n            () -> {\n                __core__chooseUnit(__helios__assert(false, "cbor(txoId) len > 9 !!"), idxBytes)\n            },\n            () -> {\n                () -> {\n                    __helios__bytearray____add(__helios__bytearray____add(rawTxId, __helios__string__encode_utf8("@")()), idxBytes)\n                }()\n            }\n        )();\n        miniHash = __helios__bytearray__slice(__helios__bytearray__blake2b(txoInfo)())(0, 6);\n        mhs = __helios__bytearray__show(miniHash)();\n        (p) -> {\n            __helios__string____add(__helios__string____add(p, "-"), mhs)\n        }\n    };\n    __helios__map[__helios__bytearray@__helios__int]__for_each = (self_114) -> {\n        (fn_22) -> {\n            recurse_71 = (recurse_70, map_20) -> {\n                __core__chooseList(map_20, () -> {\n                    ()\n                }, () -> {\n                    head_72 = __core__headList__safe(map_20);\n                    __core__chooseUnit(fn_22(__helios__bytearray__from_data(__core__fstPair(head_72)), __helios__int__from_data(__core__sndPair(head_72))), recurse_70(recurse_70, __core__tailList__safe(map_20)))\n                })()\n            };\n            recurse_71(recurse_71, self_114)\n        }\n    };\n    __helios__list[__helios__bytearray]____to_data = __core__listData;\n    __helios__list[__helios__bytearray]____eq = (self_115, other_2) -> {\n        __core__equalsData(__helios__list[__helios__bytearray]____to_data(self_115), __helios__list[__helios__bytearray]____to_data(other_2))\n    };\n    __helios__map[__helios__bytearray@__helios__int]__fold[__helios__list[__helios__bytearray]] = (self_116) -> {\n        (fn_23, z_2) -> {\n            __helios__common__fold(self_116, (z_3, pair_58) -> {\n                fn_23(z_3, __helios__bytearray__from_data(__core__fstPair(pair_58)), __helios__int__from_data(__core__sndPair(pair_58)))\n            }, z_2)\n        }\n    };\n    __helios__option[__helios__bytearray]__none____is = (data_167) -> {\n        __helios__common__enum_tag_equals(data_167, 1)\n    };\n    __helios__list[__helios__bytearray]__prepend = (self_117) -> {\n        (item_8) -> {\n            __core__mkCons(__helios__bytearray____to_data(item_8), self_117)\n        }\n    };\n    __helios__list[__helios__bytearray]__find_safe = (self_118) -> {\n        (fn_24) -> {\n            __helios__common__find_safe(self_118, (item_9) -> {\n                fn_24(__helios__bytearray__from_data(item_9))\n            }, __helios__common__identity)\n        }\n    };\n    __helios__value__sum[__helios__value] = (self_119) -> {\n        recurse_73 = (recurse_72, lst_16) -> {\n            __core__chooseList(lst_16, () -> {\n                __helios__value__ZERO\n            }, () -> {\n                __helios__value____add(__helios__value__value(__helios__value__from_data(__core__headList__safe(lst_16))), recurse_72(recurse_72, __core__tailList__safe(lst_16)))\n            })()\n        };\n        recurse_73(recurse_73, self_119)\n    };\n    __helios__list[__helios__string]__map[__helios__value] = (self_120) -> {\n        (fn_25) -> {\n            __helios__common__map(self_120, (item_10) -> {\n                __helios__value____to_data(fn_25(__helios__string__from_data(item_10)))\n            }, __core__mkNilData(()))\n        }\n    };\n    __helios__list[__helios__string]__sort = (self_121) -> {\n        (comp_4) -> {\n            __helios__common__sort(self_121, (a_14, b_14) -> {\n                comp_4(__helios__string__from_data(a_14), __helios__string__from_data(b_14))\n            })\n        }\n    };\n    __module__CapoMintHelpers__validateUutMinting = (mph_20, seed_1, purposes, __useopt__mkTokenName, mkTokenName, __useopt__bootstrapCharter, bootstrapCharter, __useopt__otherMintedValue, otherMintedValue, __useopt__needsMintDelegateApproval, needsMintDelegateApproval, __useopt__extraMintDelegateRedeemerCheck_1, extraMintDelegateRedeemerCheck_2, __useopt__checkMintDgtActivity_1, checkMintDgtActivity_2) -> {\n        mkTokenName_1 = __core__ifThenElse(\n            __useopt__mkTokenName,\n            () -> {\n                mkTokenName\n            },\n            () -> {\n                __module__CapoMintHelpers__mkUutTnFactory(seed_1)\n            }\n        )();\n        bootstrapCharter_1 = __core__ifThenElse(\n            __useopt__bootstrapCharter,\n            () -> {\n                bootstrapCharter\n            },\n            () -> {\n                __helios__value__ZERO\n            }\n        )();\n        otherMintedValue_1 = __core__ifThenElse(\n            __useopt__otherMintedValue,\n            () -> {\n                otherMintedValue\n            },\n            () -> {\n                __helios__value__ZERO\n            }\n        )();\n        needsMintDelegateApproval_1 = __core__ifThenElse(\n            __useopt__needsMintDelegateApproval,\n            () -> {\n                needsMintDelegateApproval\n            },\n            () -> {\n                true\n            }\n        )();\n        extraMintDelegateRedeemerCheck_3 = __core__ifThenElse(\n            __useopt__extraMintDelegateRedeemerCheck_1,\n            () -> {\n                extraMintDelegateRedeemerCheck_2\n            },\n            () -> {\n                true\n            }\n        )();\n        checkMintDgtActivity_3 = __core__ifThenElse(\n            __useopt__checkMintDgtActivity_1,\n            () -> {\n                checkMintDgtActivity_2\n            },\n            () -> {\n                __module__CapoMintHelpers__noOtherActivitiesSupported\n            }\n        )();\n        isBootstrapping = __helios__bool____not(__helios__value__is_zero(bootstrapCharter_1)());\n        delegateApproval = __core__ifThenElse(\n            isBootstrapping,\n            () -> {\n                true\n            },\n            () -> {\n                () -> {\n                    __lhs_0_59 = __helios__common__assert_constr_index(__module__CapoHelpers__getTxCharterData(mph_20, false, ()), 0);\n                    mintDgt = __module__CapoHelpers__CapoDatum[]__CharterData__mintDelegateLink(__lhs_0_59);\n                    __core__ifThenElse(\n                        needsMintDelegateApproval_1,\n                        () -> {\n                            __module__CapoMintHelpers__requiresDelegateAuthorizingMint(mintDgt, mph_20, true, extraMintDelegateRedeemerCheck_3, true, checkMintDgtActivity_3)\n                        },\n                        () -> {\n                            () -> {\n                                true\n                            }()\n                        }\n                    )()\n                }()\n            }\n        )();\n        valueMinted = __helios__tx__minted(__helios__scriptcontext__tx);\n        expectedValue = __helios__value____add(__helios__value____add(bootstrapCharter_1, otherMintedValue_1), __helios__value__sum[__helios__value](__helios__list[__helios__string]__map[__helios__value](__helios__list[__helios__string]__sort(purposes)((a_15, b_15) -> {\n            __helios__string____neq(a_15, b_15)\n        }))((purpose_2) -> {\n            __module__StellarHeliosHelpers__mkTv(mph_20, true, mkTokenName_1(purpose_2), false, (), false, ())\n        })));\n        __core__chooseUnit(__core__ifThenElse(\n            __helios__bool____not(__helios__value__contains_policy(valueMinted)(mph_20)),\n            () -> {\n                __core__chooseUnit(__helios__print("  -- no mint from our policy at (mph, valueMinted): ( "), __core__chooseUnit(__helios__print(__helios__mintingpolicyhash__show(mph_20)()), __core__chooseUnit(__helios__print(__helios__value__show(valueMinted)()), __core__chooseUnit(__helios__print(")\n"), __helios__error("validateUutMinting(): no mint")))))\n            },\n            () -> {\n                () -> {\n                    __helios__assert(true, "no")\n                }()\n            }\n        )(), __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add("\n  -- uut-minting seed: ", __helios__txid__show(__helios__txoutputid__tx_id(seed_1))()), "🔹#"), __helios__int__show(__helios__txoutputid__index(seed_1))()), "\n")), __core__chooseUnit(__helios__map[__helios__bytearray@__helios__int]__for_each(__helios__value__get_policy(expectedValue)(mph_20))((b_19, i_10) -> {\n            __helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add("    ℹ️ 🐞 expected: ", __helios__int__show(i_10)()), "x "), __helios__bytearray__decode_utf8(b_19)()), "\n"))\n        }), actualMint = __helios__value__get_policy(valueMinted)(mph_20);\n        __core__chooseUnit(__core__ifThenElse(\n            true,\n            () -> {\n                __core__chooseUnit(__helios__map[__helios__bytearray@__helios__int]__for_each(actualMint)((b_18, i_9) -> {\n                    __helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add("    ℹ️ 🐞   actual: ", __helios__int__show(i_9)()), "x "), __helios__bytearray__decode_utf8(b_18)()), "\n"))\n                }), __core__chooseUnit(__helios__print(__helios__value__show(__helios__value__from_map(__helios__map[__helios__mintingpolicyhash@__helios__map[__helios__bytearray@__helios__int]]__filter(__helios__value__to_map(valueMinted)())((b_17, __11) -> {\n                    __helios__mintingpolicyhash____neq(b_17, mph_20)\n                })))()), __helios__print("^ other policy values minted \n")))\n            },\n            () -> {\n                () -> {\n                    __helios__assert(true, "never")\n                }()\n            }\n        )(), temp = __helios__map[__helios__bytearray@__helios__int]__fold[__helios__list[__helios__bytearray]](actualMint)((l, b_16, i_8) -> {\n            __cond_22 = __helios__list[__helios__bytearray]__find_safe(l)((x_6) -> {\n                __helios__bytearray____eq(x_6, b_16)\n            });\n            __core__ifThenElse(\n                __helios__option[__helios__bytearray]__none____is(__cond_22),\n                () -> {\n                    (__lhs_0_61) -> {\n                        __helios__list[__helios__bytearray]__prepend(l)(b_16)\n                    }\n                },\n                () -> {\n                    (__lhs_0_60) -> {\n                        __helios__error("UUT duplicate purpose ")\n                    }\n                }\n            )()(__cond_22)\n        }, __core__mkNilData(()));\n        __core__chooseUnit(__helios__assert(__helios__bool__or(() -> {\n            true\n        }, () -> {\n            __helios__list[__helios__bytearray]____eq(temp, temp)\n        }), "prevent unused var"), expectationsMet = __helios__value____eq(valueMinted, expectedValue);\n        __core__chooseUnit(__helios__assert(expectationsMet, "mismatch in UUT mint"), __core__chooseUnit(__helios__assert(__module__CapoMintHelpers__hasSeedUtxo(__helios__scriptcontext__tx, seed_1), "no seed"), __core__chooseUnit(__helios__print(" ✅ validateUutMinting:  ok!\n"), __helios__bool__and(() -> {\n            delegateApproval\n        }, () -> {\n            expectationsMet\n        })))))))))\n    };\n    __module__CapoMintHelpers__MinterActivity[]__is_valid_data = (__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data) -> {\n        (data_168) -> {\n            __core__ifThenElse(\n                __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data(data_168),\n                () -> {\n                    true\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data(data_168),\n                        () -> {\n                            true\n                        },\n                        () -> {\n                            __core__ifThenElse(\n                                __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data(data_168),\n                                () -> {\n                                    true\n                                },\n                                () -> {\n                                    __core__ifThenElse(\n                                        __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data(data_168),\n                                        () -> {\n                                            true\n                                        },\n                                        () -> {\n                                            __core__ifThenElse(\n                                                __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data(data_168),\n                                                () -> {\n                                                    true\n                                                },\n                                                () -> {\n                                                    __core__ifThenElse(\n                                                        __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data(data_168),\n                                                        () -> {\n                                                            true\n                                                        },\n                                                        () -> {\n                                                            false\n                                                        }\n                                                    )()\n                                                }\n                                            )()\n                                        }\n                                    )()\n                                }\n                            )()\n                        }\n                    )()\n                }\n            )()\n        }\n    };\n    __module__CapoMintHelpers__MinterActivity[]__from_data = (__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_1) -> {\n        (data_169) -> {\n            ignore_6 = __core__ifThenElse(\n                __module__CapoMintHelpers__MinterActivity[]__is_valid_data(__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_1)(data_169),\n                () -> {\n                    ()\n                },\n                () -> {\n                    __core__trace("Warning: invalid MinterActivity data", ())\n                }\n            )();\n            data_169\n        }\n    };\n    __module__CapoMintHelpers__MinterActivity[]__mintingCharter____is = (data_170) -> {\n        __helios__common__enum_tag_equals(data_170, 0)\n    };\n    __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_2 = (data_171) -> {\n        __core__chooseData(data_171, () -> {\n            pair_59 = __core__unConstrData__safe(data_171);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_59), 0),\n                () -> {\n                    data_172 = __core__listData(__core__sndPair(pair_59));\n                    __core__chooseData(data_172, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_121 = __core__unListData__safe(data_172);\n                        __core__chooseList(fields_121, () -> {\n                            false\n                        }, () -> {\n                            head_73 = __core__headList__safe(fields_121);\n                            __core__ifThenElse(\n                                __helios__address__is_valid_data(head_73),\n                                () -> {\n                                    fields_122 = __core__tailList__safe(fields_121);\n                                    __core__chooseList(fields_122, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing____is = (data_173) -> {\n        __helios__common__enum_tag_equals(data_173, 1)\n    };\n    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_2 = (data_174) -> {\n        __core__chooseData(data_174, () -> {\n            pair_60 = __core__unConstrData__safe(data_174);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_60), 1),\n                () -> {\n                    data_175 = __core__listData(__core__sndPair(pair_60));\n                    __core__chooseData(data_175, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_123 = __core__unListData__safe(data_175);\n                        __core__chooseList(fields_123, true, false)\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_2 = (data_176) -> {\n        __core__chooseData(data_176, () -> {\n            pair_61 = __core__unConstrData__safe(data_176);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_61), 2),\n                () -> {\n                    data_177 = __core__listData(__core__sndPair(pair_61));\n                    __core__chooseData(data_177, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_124 = __core__unListData__safe(data_177);\n                        __core__chooseList(fields_124, () -> {\n                            false\n                        }, () -> {\n                            head_74 = __core__headList__safe(fields_124);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_74),\n                                () -> {\n                                    fields_125 = __core__tailList__safe(fields_124);\n                                    __core__chooseList(fields_125, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_2 = (data_178) -> {\n        __core__chooseData(data_178, () -> {\n            pair_62 = __core__unConstrData__safe(data_178);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_62), 3),\n                () -> {\n                    data_179 = __core__listData(__core__sndPair(pair_62));\n                    __core__chooseData(data_179, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_126 = __core__unListData__safe(data_179);\n                        __core__chooseList(fields_126, () -> {\n                            false\n                        }, () -> {\n                            head_75 = __core__headList__safe(fields_126);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_75),\n                                () -> {\n                                    fields_127 = __core__tailList__safe(fields_126);\n                                    __core__chooseList(fields_127, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data_2 = (data_180) -> {\n        __core__chooseData(data_180, () -> {\n            pair_63 = __core__unConstrData__safe(data_180);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_63), 4),\n                () -> {\n                    data_181 = __core__listData(__core__sndPair(pair_63));\n                    __core__chooseData(data_181, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_128 = __core__unListData__safe(data_181);\n                        __core__chooseList(fields_128, () -> {\n                            false\n                        }, () -> {\n                            head_76 = __core__headList__safe(fields_128);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_76),\n                                () -> {\n                                    fields_129 = __core__tailList__safe(fields_128);\n                                    __core__chooseList(fields_129, true, false)\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __helios__option[__helios__bytearray]__is_valid_data = (data_182) -> {\n        __core__chooseData(data_182, () -> {\n            pair_64 = __core__unConstrData__safe(data_182);\n            index_11 = __core__fstPair(pair_64);\n            fields_130 = __core__sndPair(pair_64);\n            __core__ifThenElse(\n                __core__equalsInteger(index_11, 0),\n                () -> {\n                    __core__chooseList(fields_130, () -> {\n                        false\n                    }, () -> {\n                        __core__chooseList(__core__tailList__safe(fields_130), () -> {\n                            __helios__bytearray__is_valid_data(__core__headList__safe(fields_130))\n                        }, () -> {\n                            false\n                        })()\n                    })()\n                },\n                () -> {\n                    __core__ifThenElse(\n                        __core__equalsInteger(index_11, 1),\n                        () -> {\n                            __core__chooseList(fields_130, true, false)\n                        },\n                        () -> {\n                            false\n                        }\n                    )()\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_2 = (data_183) -> {\n        __core__chooseData(data_183, () -> {\n            pair_65 = __core__unConstrData__safe(data_183);\n            __core__ifThenElse(\n                __core__equalsInteger(__core__fstPair(pair_65), 5),\n                () -> {\n                    data_184 = __core__listData(__core__sndPair(pair_65));\n                    __core__chooseData(data_184, () -> {\n                        false\n                    }, () -> {\n                        false\n                    }, () -> {\n                        fields_131 = __core__unListData__safe(data_184);\n                        __core__chooseList(fields_131, () -> {\n                            false\n                        }, () -> {\n                            head_77 = __core__headList__safe(fields_131);\n                            __core__ifThenElse(\n                                __helios__txoutputid__is_valid_data(head_77),\n                                () -> {\n                                    fields_132 = __core__tailList__safe(fields_131);\n                                    __core__chooseList(fields_132, () -> {\n                                        false\n                                    }, () -> {\n                                        head_78 = __core__headList__safe(fields_132);\n                                        __core__ifThenElse(\n                                            __helios__option[__helios__bytearray]__is_valid_data(head_78),\n                                            () -> {\n                                                fields_133 = __core__tailList__safe(fields_132);\n                                                __core__chooseList(fields_133, true, false)\n                                            },\n                                            () -> {\n                                                false\n                                            }\n                                        )()\n                                    })()\n                                },\n                                () -> {\n                                    false\n                                }\n                            )()\n                        })()\n                    }, () -> {\n                        false\n                    }, () -> {\n                        false\n                    })()\n                },\n                () -> {\n                    false\n                }\n            )()\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        }, () -> {\n            false\n        })()\n    };\n    __module__CapoMinter__seedTxn = __helios__txid__from_data(__core__constrData(0, __core__mkCons(__core__bData(#0000000000000000000000000000000000000000000000000000000000000000), __core__mkNilData(()))));\n    __module__CapoMinter__seedIndex = __helios__int__from_data(__core__iData(0));\n    __module__CapoMinter__rev = __helios__int__from_data(__core__iData(1));\n    __module__CapoMinter__main = (r) -> {\n        mph_21 = __helios__scriptcontext__get_current_minting_policy_hash();\n        value_minted = __helios__tx__minted(__helios__scriptcontext__tx);\n        __core__chooseUnit(__helios__assert(__helios__bool__or(() -> {\n            true\n        }, () -> {\n            __helios__bytearray____eq(__helios__int__serialize(__module__CapoMinter__rev)(), __helios__int__serialize(__module__CapoMinter__rev)())\n        }), "no"), __core__chooseUnit(__helios__assert(__helios__bool__or(() -> {\n            true\n        }, () -> {\n            __helios__bytearray____eq(__helios__txid__serialize(__module__CapoMinter__seedTxn)(), __helios__txid__serialize(__module__CapoMinter__seedTxn)())\n        }), "no"), __core__chooseUnit(__helios__print(__helios__string____add(" 🚥❓ Capo minter: policy id: ", __helios__mintingpolicyhash__show(__helios__scriptcontext__get_current_minting_policy_hash())())), (ok) -> {\n            __core__chooseUnit(__helios__print("\n\n🚥🟢 Capo minter: ok!\n"), ok)\n        }(__cond_23 = r;\n        __core__ifThenElse(\n            __module__CapoMintHelpers__MinterActivity[]__mintingCharter____is(__cond_23),\n            () -> {\n                (__lhs_0_63) -> {\n                    charterVal = __module__StellarHeliosHelpers__mkTv(mph_21, true, "charter", false, (), false, ());\n                    authTnBase = "capoGov";\n                    mintDgtTnBase = "mintDgt";\n                    spendDgtTnBase = "spendDgt";\n                    purposes_1 = __core__mkCons(__helios__string____to_data(authTnBase), __core__mkCons(__helios__string____to_data(mintDgtTnBase), __core__mkCons(__helios__string____to_data(spendDgtTnBase), __core__mkNilData(()))));\n                    __core__chooseUnit(__helios__print("  -- creating Capo charter"), __core__chooseUnit(__module__StellarHeliosHelpers__REQT("must mint the charter token", false, ()), __core__chooseUnit(__helios__assert(__helios__value____geq(value_minted, charterVal), "charter token not minted"), minterSeed = __helios__txoutputid__new(__module__CapoMinter__seedTxn, __module__CapoMinter__seedIndex);\n                    mkUutName = __module__CapoMintHelpers__mkUutTnFactory(minterSeed);\n                    __core__chooseUnit(__module__StellarHeliosHelpers__REQT("must mint uuts for mintDgt, spendDgt, and govAuth using the same seed", false, ()), mintsUuts = __module__CapoMintHelpers__validateUutMinting(mph_21, minterSeed, purposes_1, true, mkUutName, true, charterVal, false, (), false, (), false, (), false, ());\n                    __core__chooseUnit(__helios__print(__helios__string____add("\n  -- mintsUuts: ", __helios__bool__show(mintsUuts)())), __helios__bool__and(() -> {\n                        true\n                    }, () -> {\n                        mintsUuts\n                    }))))))\n                }\n            },\n            () -> {\n                __core__ifThenElse(\n                    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing____is(__cond_23),\n                    () -> {\n                        (__lhs_0_62) -> {\n                            __core__chooseUnit(__helios__print("mintWithDelegateAuthorizing\n"), __module__CapoMintHelpers__requiresMintDelegateApproval(mph_21))\n                        }\n                    },\n                    () -> {\n                        (__12) -> {\n                            true\n                        }\n                    }\n                )()\n            }\n        )()(__cond_23)))))\n    };\n    __core__ifThenElse(\n        __module__CapoMinter__main(__module__CapoMintHelpers__MinterActivity[]__from_data(__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_2)(__REDEEMER)),\n        () -> {\n            ()\n        },\n        () -> {\n            __helios__error("validation returned false")\n        }\n    )()\n}';

    unoptimizedIR = `(__REDEEMER, __CONTEXT) -> {
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
    __helios__common__serialize = (self_1) -> {
        () -> {
            __core__serialiseData(self_1)
        }
    };
    __helios__txid__serialize = __helios__common__serialize;
    __helios__print = (msg_2) -> {
        __core__trace(msg_2, ())
    };
    __helios__string____add = __core__appendString;
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
                    __core__consByteString(45, recurse_1(recurse_1)(__core__multiplyInteger(self_2, -1), \#))
                },
                () -> {
                    recurse_1(recurse_1)(self_2, \#)
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
    __helios__common__enum_field_0 = (self_7) -> {
        __core__headList(__helios__common__enum_fields(self_7))
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
        __helios__common__enum_field_0(__helios__scriptcontext__purpose)
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
    __helios__bool__show = (self_12) -> {
        () -> {
            __core__ifThenElse(
                self_12,
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
    __helios__common__enum_fields_after_1 = (self_13) -> {
        __core__tailList(__helios__common__enum_fields_after_0(self_13))
    };
    __helios__common__enum_fields_after_2 = (self_14) -> {
        __core__tailList(__helios__common__enum_fields_after_1(self_14))
    };
    __helios__common__enum_fields_after_3 = (self_15) -> {
        __core__tailList(__helios__common__enum_fields_after_2(self_15))
    };
    __helios__common__enum_field_4 = (self_16) -> {
        __core__headList(__helios__common__enum_fields_after_3(self_16))
    };
    __helios__tx__minted = (self_17) -> {
        __core__unMapData(__helios__common__enum_field_4(self_17))
    };
    __helios__scriptcontext__tx = __helios__common__enum_field_0(__helios__scriptcontext__data);
    __helios__int__from_data = __core__unIData;
    __helios__common__identity = (self_18) -> {
        self_18
    };
    __helios__txid__from_data = __helios__common__identity;
    __helios__common__test_constr_data_2 = (data, index, test_a, test_b) -> {
        __core__chooseData(data, () -> {
            pair = __core__unConstrData__safe(data);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair), index),
                () -> {
                    fields = __core__sndPair(pair);
                    __core__chooseList(fields, () -> {
                        false
                    }, () -> {
                        __core__ifThenElse(
                            test_a(__core__headList__safe(fields)),
                            () -> {
                                tail = __core__tailList__safe(fields);
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
        (data_1) -> {
            __core__chooseData(data_1, () -> {
                false
            }, () -> {
                false
            }, () -> {
                false
            }, () -> {
                false
            }, () -> {
                bytes_2 = __core__unBData__safe(data_1);
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
    __helios__txid__is_valid_data = (data_2) -> {
        __core__chooseData(data_2, () -> {
            pair_1 = __core__unConstrData__safe(data_2);
            index_1 = __core__fstPair(pair_1);
            fields_1 = __core__sndPair(pair_1);
            __core__ifThenElse(
                __core__equalsInteger(0, index_1),
                () -> {
                    __core__chooseList(fields_1, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_1), () -> {
                            __helios__bytearray__is_valid_data_fixed_length(32)(__core__headList__safe(fields_1))
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
    __helios__int__is_valid_data = (data_3) -> {
        __core__chooseData(data_3, false, false, false, true, false)
    };
    __helios__txoutputid__is_valid_data = (data_4) -> {
        __helios__common__test_constr_data_2(data_4, 0, __helios__txid__is_valid_data, __helios__int__is_valid_data)
    };
    __helios__bytearray__is_valid_data = (data_5) -> {
        __core__chooseData(data_5, false, false, false, false, true)
    };
    __helios__common__enum_tag_equals = (data_6, i) -> {
        __core__equalsInteger(__core__fstPair(__core__unConstrData(data_6)), i)
    };
    __helios__validatorhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);
    __helios__pubkeyhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);
    __helios__spendingcredential__is_valid_data = (data_7) -> {
        __core__chooseData(data_7, () -> {
            pair_2 = __core__unConstrData__safe(data_7);
            index_2 = __core__fstPair(pair_2);
            fields_2 = __core__sndPair(pair_2);
            __core__ifThenElse(
                __core__equalsInteger(index_2, 0),
                () -> {
                    __core__chooseList(fields_2, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_2), () -> {
                            __helios__validatorhash__is_valid_data(__core__headList__safe(fields_2))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_2, 1),
                        () -> {
                            __core__chooseList(fields_2, () -> {
                                false
                            }, () -> {
                                __core__chooseList(__core__tailList__safe(fields_2), () -> {
                                    __helios__pubkeyhash__is_valid_data(__core__headList__safe(fields_2))
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
    __helios__stakingcredential__is_valid_data = (data_8) -> {
        __core__chooseData(data_8, () -> {
            pair_3 = __core__unConstrData__safe(data_8);
            tag = __core__fstPair(pair_3);
            fields_3 = __core__sndPair(pair_3);
            __core__ifThenElse(
                __core__equalsInteger(tag, 0),
                () -> {
                    __helios__common__test_list_head_data(__helios__stakinghash__is_valid_data, __helios__common__test_list_empty)(fields_3)
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(tag, 1),
                        () -> {
                            __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_empty)))(fields_3)
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
    __helios__option[__helios__stakingcredential]__is_valid_data = (data_9) -> {
        __core__chooseData(data_9, () -> {
            pair_4 = __core__unConstrData__safe(data_9);
            index_3 = __core__fstPair(pair_4);
            fields_4 = __core__sndPair(pair_4);
            __core__ifThenElse(
                __core__equalsInteger(index_3, 0),
                () -> {
                    __core__chooseList(fields_4, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_4), () -> {
                            __helios__stakingcredential__is_valid_data(__core__headList__safe(fields_4))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_3, 1),
                        () -> {
                            __core__chooseList(fields_4, true, false)
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
    __helios__address__is_valid_data = (data_10) -> {
        __helios__common__test_constr_data_2(data_10, 0, __helios__spendingcredential__is_valid_data, __helios__option[__helios__stakingcredential]__is_valid_data)
    };
    __helios__bytearray____to_data = __core__bData;
    __helios__mintingpolicyhash____to_data = __helios__bytearray____to_data;
    __helios__value__contains_policy = (self_19) -> {
        (mph_1) -> {
            mph_2 = __helios__mintingpolicyhash____to_data(mph_1);
            recurse_21 = (recurse_20, map_7) -> {
                __core__chooseList(map_7, () -> {
                    false
                }, () -> {
                    __core__ifThenElse(
                        __core__equalsData(__core__fstPair(__core__headList__safe(map_7)), mph_2),
                        () -> {
                            true
                        },
                        () -> {
                            recurse_20(recurse_20, __core__tailList__safe(map_7))
                        }
                    )()
                })()
            };
            recurse_21(recurse_21, self_19)
        }
    };
    __helios__common__fold = (self_20, fn_2, z) -> {
        recurse_23 = (recurse_22, self_21, z_1) -> {
            __core__chooseList(self_21, () -> {
                z_1
            }, () -> {
                recurse_22(recurse_22, __core__tailList__safe(self_21), fn_2(z_1, __core__headList__safe(self_21)))
            })()
        };
        recurse_23(recurse_23, self_20, z)
    };
    __helios__mintingpolicyhash____eq = __helios__bytearray____eq;
    __helios__int__show_digit = (x) -> {
        __core__addInteger(__core__modInteger(x, 10), 48)
    };
    __helios__int__show = (self_22) -> {
        () -> {
            __core__decodeUtf8__safe(recurse_25 = (recurse_24, i_1, bytes_3) -> {
                bytes_4 = __core__consByteString(__helios__int__show_digit(i_1), bytes_3);
                __core__ifThenElse(
                    __core__lessThanInteger(i_1, 10),
                    () -> {
                        bytes_4
                    },
                    () -> {
                        recurse_24(recurse_24, __core__divideInteger(i_1, 10), bytes_4)
                    }
                )()
            };
            __core__ifThenElse(
                __core__lessThanInteger(self_22, 0),
                () -> {
                    __core__consByteString(45, recurse_25(recurse_25, __core__multiplyInteger(self_22, -1), \#))
                },
                () -> {
                    recurse_25(recurse_25, self_22, \#)
                }
            )())
        }
    };
    __helios__value__show = (self_23) -> {
        () -> {
            __helios__common__fold(self_23, (prev, pair_5) -> {
                mph_3 = __core__unBData__safe(__core__fstPair(pair_5));
                tokens = __core__unMapData__safe(__core__sndPair(pair_5));
                __helios__common__fold(tokens, (prev_1, pair_6) -> {
                    token_name = __core__unBData__safe(__core__fstPair(pair_6));
                    qty = __core__unIData__safe(__core__sndPair(pair_6));
                    __helios__string____add(prev_1, __core__ifThenElse(
                        __helios__mintingpolicyhash____eq(mph_3, \#),
                        () -> {
                            __helios__string____add("lovelace: ", __helios__string____add(__helios__int__show(qty)(), "
"))
                        },
                        () -> {
                            __helios__string____add(__helios__mintingpolicyhash__show(mph_3)(), __helios__string____add(".", __helios__string____add(__helios__bytearray__show(token_name)(), __helios__string____add(": ", __helios__string____add(__helios__int__show(qty)(), "
")))))
                        }
                    )())
                }, prev)
            }, "")
        }
    };
    __helios__txid__bytes = (self_24) -> {
        __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(self_24))))
    };
    __helios__txid__show = (self_25) -> {
        __helios__bytearray__show(__helios__txid__bytes(self_25))
    };
    __helios__txoutputid__tx_id = __helios__common__enum_field_0;
    __helios__txoutputid__index = (self_26) -> {
        __helios__int__from_data(__helios__common__enum_field_1(self_26))
    };
    __helios__value__get_policy = (self_27) -> {
        (mph_4) -> {
            mph_5 = __helios__mintingpolicyhash____to_data(mph_4);
            recurse_27 = (recurse_26, map_8) -> {
                __core__chooseList(map_8, () -> {
                    __helios__error("policy not found")
                }, () -> {
                    __core__ifThenElse(
                        __core__equalsData(__core__fstPair(__core__headList__safe(map_8)), mph_5),
                        () -> {
                            __core__unMapData(__core__sndPair(__core__headList__safe(map_8)))
                        },
                        () -> {
                            recurse_26(recurse_26, __core__tailList__safe(map_8))
                        }
                    )()
                })()
            };
            recurse_27(recurse_27, self_27)
        }
    };
    __helios__bytearray__decode_utf8 = (self_28) -> {
        () -> {
            __core__decodeUtf8(self_28)
        }
    };
    __helios__value__from_map = __helios__common__identity;
    __helios__value__to_map = (self_29) -> {
        () -> {
            self_29
        }
    };
    __helios__bytearray____neq = (self_30, other) -> {
        __helios__bool____not(__helios__bytearray____eq(self_30, other))
    };
    __helios__mintingpolicyhash____neq = __helios__bytearray____neq;
    __helios__value____eq = (a_8, b_8) -> {
        __helios__value__compare(a_8, b_8, __core__equalsInteger)
    };
    __helios__value__add_or_subtract_inner = (op) -> {
        (a_9, b_9) -> {
            recurse_29 = (recurse_28, keys_3, result) -> {
                __core__chooseList(keys_3, () -> {
                    result
                }, () -> {
                    key_6 = __core__headList__safe(keys_3);
                    tail_1 = recurse_28(recurse_28, __core__tailList__safe(keys_3), result);
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
            recurse_29(recurse_29, __helios__value__merge_map_keys(a_9, b_9), __core__mkNilPairData(()))
        }
    };
    __helios__value__add_or_subtract = (a_10, b_10, op_1) -> {
        recurse_31 = (recurse_30, keys_4, result_1) -> {
            __core__chooseList(keys_4, () -> {
                result_1
            }, () -> {
                key_7 = __core__headList__safe(keys_4);
                tail_2 = recurse_30(recurse_30, __core__tailList__safe(keys_4), result_1);
                item_1 = __helios__value__add_or_subtract_inner(op_1)(__helios__value__get_inner_map(a_10, key_7), __helios__value__get_inner_map(b_10, key_7));
                __core__chooseList(item_1, () -> {
                    tail_2
                }, () -> {
                    __core__mkCons(__core__mkPairData(key_7, __core__mapData(item_1)), tail_2)
                })()
            })()
        };
        recurse_31(recurse_31, __helios__value__merge_map_keys(a_10, b_10), __core__mkNilPairData(()))
    };
    __helios__value____add = (a_11, b_11) -> {
        __helios__value__add_or_subtract(a_11, b_11, __core__addInteger)
    };
    __helios__string____eq = __core__equalsString;
    __helios__string____neq = (self_31, other_1) -> {
        __helios__bool____not(__helios__string____eq(self_31, other_1))
    };
    __helios__common__assert_constr_index = (data_11, i_2) -> {
        __core__ifThenElse(
            __core__equalsInteger(__core__fstPair(__core__unConstrData(data_11)), i_2),
            () -> {
                data_11
            },
            () -> {
                __helios__error("unexpected constructor index")
            }
        )()
    };
    __helios__value__is_zero_inner = (tokens_1) -> {
        recurse_33 = (recurse_32, tokens_2) -> {
            __core__chooseList(tokens_2, () -> {
                true
            }, () -> {
                __helios__bool__and(() -> {
                    __core__equalsInteger(__core__unIData(__core__sndPair(__core__headList__safe(tokens_2))), 0)
                }, () -> {
                    recurse_32(recurse_32, __core__tailList__safe(tokens_2))
                })
            })()
        };
        recurse_33(recurse_33, tokens_1)
    };
    __helios__value__is_zero = (self_32) -> {
        () -> {
            recurse_35 = (recurse_34, map_9) -> {
                __core__chooseList(map_9, () -> {
                    true
                }, () -> {
                    __helios__bool__and(() -> {
                        __helios__value__is_zero_inner(__core__unMapData(__core__sndPair(__core__headList__safe(map_9))))
                    }, () -> {
                        recurse_34(recurse_34, __core__tailList__safe(map_9))
                    })
                })()
            };
            recurse_35(recurse_35, self_32)
        }
    };
    __helios__value__ZERO = __core__mkNilPairData(());
    __helios__common__insert_in_sorted = (x_1, lst_2, comp_2) -> {
        recurse_37 = (recurse_36, lst_3) -> {
            __core__chooseList(lst_3, () -> {
                __core__mkCons(x_1, lst_3)
            }, () -> {
                head = __core__headList__safe(lst_3);
                __core__ifThenElse(
                    comp_2(x_1, head),
                    () -> {
                        __core__mkCons(x_1, lst_3)
                    },
                    () -> {
                        __core__mkCons(head, recurse_36(recurse_36, __core__tailList__safe(lst_3)))
                    }
                )()
            })()
        };
        recurse_37(recurse_37, lst_2)
    };
    __helios__common__sort = (lst_4, comp_3) -> {
        recurse_39 = (recurse_38, lst_5) -> {
            __core__chooseList(lst_5, () -> {
                lst_5
            }, () -> {
                (head_1, tail_3) -> {
                    __helios__common__insert_in_sorted(head_1, tail_3, comp_3)
                }(__core__headList__safe(lst_5), recurse_38(recurse_38, __core__tailList__safe(lst_5)))
            })()
        };
        recurse_39(recurse_39, lst_4)
    };
    __helios__string__from_data = (d) -> {
        __core__decodeUtf8(__core__unBData(d))
    };
    __helios__common__map = (self_33, fn_3, init) -> {
        recurse_41 = (recurse_40, rem_1, lst_6) -> {
            __core__chooseList(rem_1, () -> {
                lst_6
            }, () -> {
                __core__mkCons(fn_3(__core__headList__safe(rem_1)), recurse_40(recurse_40, __core__tailList__safe(rem_1), lst_6))
            })()
        };
        recurse_41(recurse_41, self_33, init)
    };
    __helios__value____to_data = __core__mapData;
    __helios__value__value = __helios__common__identity;
    __helios__value__from_data = __core__unMapData;
    __helios__common__find_safe = (self_34, fn_4, callback) -> {
        recurse_43 = (recurse_42, self_35, fn_5) -> {
            __core__chooseList(self_35, () -> {
                __core__constrData(1, __helios__common__list_0)
            }, () -> {
                head_2 = __core__headList__safe(self_35);
                __core__ifThenElse(
                    fn_5(head_2),
                    () -> {
                        __core__constrData(0, __helios__common__list_1(callback(head_2)))
                    },
                    () -> {
                        recurse_42(recurse_42, __core__tailList__safe(self_35), fn_5)
                    }
                )()
            })()
        };
        recurse_43(recurse_43, self_34, fn_4)
    };
    __helios__int__max = (a_12, b_12) -> {
        __core__ifThenElse(
            __core__lessThanInteger(a_12, b_12),
            b_12,
            a_12
        )
    };
    __helios__common__slice_bytearray = (self_36, selfLengthFn) -> {
        (start, end) -> {
            normalize = (pos) -> {
                __core__ifThenElse(
                    __core__lessThanInteger(pos, 0),
                    () -> {
                        __core__addInteger(__core__addInteger(selfLengthFn(self_36), 1), pos)
                    },
                    () -> {
                        pos
                    }
                )()
            };
            fn_7 = (start_1) -> {
                fn_6 = (end_1) -> {
                    __core__sliceByteString(start_1, __core__subtractInteger(end_1, __helios__int__max(start_1, 0)), self_36)
                };
                fn_6(normalize(end))
            };
            fn_7(normalize(start))
        }
    };
    __helios__bytearray__slice = (self_37) -> {
        __helios__common__slice_bytearray(self_37, __core__lengthOfByteString)
    };
    __helios__bytearray__blake2b = (self_38) -> {
        () -> {
            __core__blake2b_256(self_38)
        }
    };
    __helios__int____gt = (a_13, b_13) -> {
        __helios__bool____not(__core__lessThanEqualsInteger(a_13, b_13))
    };
    __helios__bytearray__length = __core__lengthOfByteString;
    __helios__bytearray____add = __core__appendByteString;
    __helios__string__encode_utf8 = (self_39) -> {
        () -> {
            __core__encodeUtf8(self_39)
        }
    };
    __helios__data__from_data = __helios__common__identity;
    __helios__common__all = (self_40, fn_8) -> {
        recurse_45 = (recurse_44, self_41, fn_9) -> {
            __core__chooseList(self_41, () -> {
                true
            }, () -> {
                __core__ifThenElse(
                    fn_9(__core__headList__safe(self_41)),
                    () -> {
                        recurse_44(recurse_44, __core__tailList__safe(self_41), fn_9)
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_45(recurse_45, self_40, fn_8)
    };
    __helios__common__enum_fields_after_4 = (self_42) -> {
        __core__tailList(__helios__common__enum_fields_after_3(self_42))
    };
    __helios__common__enum_fields_after_5 = (self_43) -> {
        __core__tailList(__helios__common__enum_fields_after_4(self_43))
    };
    __helios__common__enum_fields_after_6 = (self_44) -> {
        __core__tailList(__helios__common__enum_fields_after_5(self_44))
    };
    __helios__common__enum_fields_after_7 = (self_45) -> {
        __core__tailList(__helios__common__enum_fields_after_6(self_45))
    };
    __helios__common__enum_fields_after_8 = (self_46) -> {
        __core__tailList(__helios__common__enum_fields_after_7(self_46))
    };
    __helios__common__enum_field_9 = (self_47) -> {
        __core__headList(__helios__common__enum_fields_after_8(self_47))
    };
    __helios__tx__redeemers = (self_48) -> {
        __core__unMapData(__helios__common__enum_field_9(self_48))
    };
    __helios__scriptpurpose__spending____is = (data_12) -> {
        __helios__common__enum_tag_equals(data_12, 1)
    };
    __helios__common____eq = __core__equalsData;
    __helios__txoutputid____eq = __helios__common____eq;
    __helios__scriptpurpose__spending__output_id = __helios__common__enum_field_0;
    __helios__txinput__output_id = __helios__common__enum_field_0;
    __helios__tx__inputs = (self_49) -> {
        __core__unListData(__helios__common__enum_field_0(self_49))
    };
    __helios__value__contains = (self_50) -> {
        (value) -> {
            __helios__value____geq(self_50, value)
        }
    };
    __helios__txoutput__value = (self_51) -> {
        __core__unMapData(__helios__common__enum_field_1(self_51))
    };
    __helios__txinput__output = __helios__common__enum_field_1;
    __helios__txinput__value = (self_52) -> {
        __helios__txoutput__value(__helios__txinput__output(self_52))
    };
    __helios__value__new = (assetClass, i_3) -> {
        __core__ifThenElse(
            __core__equalsInteger(0, i_3),
            () -> {
                __helios__value__ZERO
            },
            () -> {
                mph_6 = __helios__common__enum_field_0(assetClass);
                tokenName = __helios__common__enum_field_1(assetClass);
                __core__mkCons(__core__mkPairData(mph_6, __core__mapData(__core__mkCons(__core__mkPairData(tokenName, __helios__int____to_data(i_3)), __core__mkNilPairData(())))), __core__mkNilPairData(()))
            }
        )()
    };
    __helios__assetclass__new = (mph_7, token_name_1) -> {
        __core__constrData(0, __helios__common__list_2(__helios__mintingpolicyhash____to_data(mph_7), __helios__bytearray____to_data(token_name_1)))
    };
    __helios__common__map_get = (self_53, key_8, fnFound, fnNotFound) -> {
        recurse_47 = (recurse_46, self_54, key_9) -> {
            __core__chooseList(self_54, fnNotFound, () -> {
                head_3 = __core__headList__safe(self_54);
                __core__ifThenElse(
                    __core__equalsData(key_9, __core__fstPair(head_3)),
                    () -> {
                        fnFound(__core__sndPair(head_3))
                    },
                    () -> {
                        recurse_46(recurse_46, __core__tailList__safe(self_54), key_9)
                    }
                )()
            })()
        };
        recurse_47(recurse_47, self_53, key_8)
    };
    __helios__scriptpurpose____to_data = __helios__common__identity;
    __helios__txoutputid__show = (self_55) -> {
        () -> {
            __helios__string____add(__helios__txid__show(__helios__txoutputid__tx_id(self_55))(), __helios__string____add("\#", __helios__int__show(__helios__txoutputid__index(self_55))()))
        }
    };
    __helios__txoutputdatum__inline = (self_56) -> {
        pair_7 = __core__unConstrData(self_56);
        index_4 = __core__fstPair(pair_7);
        fields_5 = __core__sndPair(pair_7);
        __core__ifThenElse(
            __core__equalsInteger(index_4, 2),
            () -> {
                __core__headList(fields_5)
            },
            () -> {
                __helios__error("not an inline datum")
            }
        )()
    };
    __helios__common__enum_field_2 = (self_57) -> {
        __core__headList(__helios__common__enum_fields_after_1(self_57))
    };
    __helios__txoutput__datum = __helios__common__enum_field_2;
    __helios__txinput__datum = (self_58) -> {
        __helios__txoutput__datum(__helios__txinput__output(self_58))
    };
    __helios__option__NONE = __core__constrData(1, __helios__common__list_0);
    __helios__common__struct_fields_after_0 = __core__tailList;
    __helios__common__struct_field_1 = (self_59) -> {
        __core__headList(__helios__common__struct_fields_after_0(self_59))
    };
    __helios__common__struct_field_0 = __core__headList;
    __helios__data__constrdata____is = (data_13) -> {
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
    __helios__int____eq = __core__equalsInteger;
    __helios__data__constrdata__fields = (data_14) -> {
        __core__sndPair(__core__unConstrData(data_14))
    };
    __helios__data__constrdata__tag = (data_15) -> {
        __core__fstPair(__core__unConstrData(data_15))
    };
    __helios__txinput__from_data = __helios__common__identity;
    __helios__common__length = (lst_7) -> {
        recurse_49 = (recurse_48, lst_8) -> {
            __core__chooseList(lst_8, () -> {
                0
            }, () -> {
                __core__addInteger(recurse_48(recurse_48, __core__tailList__safe(lst_8)), 1)
            })()
        };
        recurse_49(recurse_49, lst_7)
    };
    __helios__common__struct_fields_after_1 = (self_60) -> {
        __core__tailList(__helios__common__struct_fields_after_0(self_60))
    };
    __helios__common__struct_fields_after_2 = (self_61) -> {
        __core__tailList(__helios__common__struct_fields_after_1(self_61))
    };
    __helios__common__struct_fields_after_3 = (self_62) -> {
        __core__tailList(__helios__common__struct_fields_after_2(self_62))
    };
    __helios__common__struct_field_4 = (self_63) -> {
        __core__headList(__helios__common__struct_fields_after_3(self_63))
    };
    __helios__common__struct_field_3 = (self_64) -> {
        __core__headList(__helios__common__struct_fields_after_2(self_64))
    };
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
    __helios__tx__ref_inputs = (self_65) -> {
        __core__unListData(__helios__common__enum_field_1(self_65))
    };
    __helios__txinput____to_data = __helios__common__identity;
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
    __helios__common__test_mStruct_field = (self_70, name, inner_test) -> {
        __core__chooseData(self_70, () -> {
            false
        }, () -> {
            map_10 = __core__unMapData__safe(self_70);
            recurse_55 = (recurse_54, map_11) -> {
                __core__chooseList(map_11, () -> {
                    __core__trace(__core__appendString("Warning: field not found: ", __core__decodeUtf8__safe(__core__unBData__safe(name))), () -> {
                        false
                    })()
                }, () -> {
                    head_5 = __core__headList__safe(map_11);
                    key_10 = __core__fstPair(head_5);
                    value_1 = __core__sndPair(head_5);
                    __core__ifThenElse(
                        __core__equalsData(key_10, name),
                        () -> {
                            inner_test(value_1)
                        },
                        () -> {
                            recurse_54(recurse_54, __core__tailList__safe(map_11))
                        }
                    )()
                })()
            };
            recurse_55(recurse_55, map_10)
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__mintingpolicyhash__is_valid_data = (data_19) -> {
        __core__chooseData(data_19, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            bytes_6 = __core__unBData__safe(data_19);
            n_3 = __core__lengthOfByteString(bytes_6);
            __core__ifThenElse(
                __core__equalsInteger(n_3, 0),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(n_3, 28),
                        true,
                        false
                    )
                }
            )()
        })()
    };
    __helios__validatorhash__show = __helios__bytearray__show;
    __helios__txoutput__sum_values = (outputs) -> {
        __helios__common__fold(outputs, (prev_2, txOutput) -> {
            __helios__value____add(prev_2, __helios__txoutput__value(txOutput))
        }, __helios__value__ZERO)
    };
    __helios__common__filter_list = (self_71, fn_13) -> {
        __helios__common__filter(self_71, fn_13, __helios__common__list_0)
    };
    __helios__tx__outputs = (self_72) -> {
        __core__unListData(__helios__common__enum_field_2(self_72))
    };
    __helios__tx__filter_outputs = (self_73, fn_14) -> {
        __helios__common__filter_list(__helios__tx__outputs(self_73), fn_14)
    };
    __helios__address__credential = __helios__common__enum_field_0;
    __helios__txoutput__address = __helios__common__enum_field_0;
    __helios__spendingcredential__is_validator = (self_74) -> {
        __core__equalsInteger(__core__fstPair(__core__unConstrData(self_74)), 1)
    };
    __helios__validatorhash____eq = __helios__bytearray____eq;
    __helios__validatorhash__from_data = __helios__bytearray__from_data;
    __helios__spendingcredential__validator__hash = (self_75) -> {
        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_75))
    };
    __helios__spendingcredential__validator__cast = (data_20) -> {
        __helios__common__assert_constr_index(data_20, 1)
    };
    __helios__txoutput__is_locked_by = (self_76) -> {
        (hash) -> {
            credential = __helios__address__credential(__helios__txoutput__address(self_76));
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
    __helios__tx__outputs_locked_by = (self_77) -> {
        (vh) -> {
            __helios__tx__filter_outputs(self_77, (output) -> {
                __helios__txoutput__is_locked_by(output)(vh)
            })
        }
    };
    __helios__tx__value_locked_by = (self_78) -> {
        (vh_1) -> {
            __helios__txoutput__sum_values(__helios__tx__outputs_locked_by(self_78)(vh_1))
        }
    };
    __helios__txoutput__from_data = __helios__common__identity;
    __helios__spendingcredential____eq = __helios__common____eq;
    __helios__txinput__address = (self_79) -> {
        __helios__txoutput__address(__helios__txinput__output(self_79))
    };
    __helios__validatorhash____to_data = __helios__bytearray____to_data;
    __helios__spendingcredential__new_validator = (hash_1) -> {
        __core__constrData(1, __helios__common__list_1(__helios__validatorhash____to_data(hash_1)))
    };
    __helios__struct____to_data = __core__listData;
    __helios__data__is_valid_data = (data_21) -> {
        true
    };
    __helios__bytearray__is_valid_data_max_length = (n_4) -> {
        (data_22) -> {
            __core__chooseData(data_22, () -> {
                false
            }, () -> {
                false
            }, () -> {
                false
            }, () -> {
                false
            }, () -> {
                bytes_7 = __core__unBData__safe(data_22);
                __core__ifThenElse(
                    __core__lessThanEqualsInteger(__core__lengthOfByteString(bytes_7), n_4),
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
    __helios__assetclass__is_valid_data = (data_23) -> {
        __helios__common__test_constr_data_2(data_23, 0, __helios__mintingpolicyhash__is_valid_data, __helios__bytearray__is_valid_data_max_length(32))
    };
    __helios__scriptpurpose__from_data = __helios__common__identity;
    __module__StellarHeliosHelpers__TODO = (task) -> {
        __helios__print(__helios__string____add(__helios__string____add("  🟥  😳💦  TODO: ", task), ""))
    };
    __module__StellarHeliosHelpers__REQT = (reqt, __useopt__assertion, assertion) -> {
        assertion_1 = __core__ifThenElse(
            __useopt__assertion,
            () -> {
                assertion
            },
            () -> {
                true
            }
        )();
        __core__chooseUnit(__helios__print(__helios__string____add("❗ ", reqt)), __helios__assert(assertion_1, __helios__string____add("  ❌❌ ^ failed: ", reqt)))
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
    __helios__map[__helios__bytearray@__helios__int]__is_valid_data_internal = (map_12) -> {
        recurse_57 = (recurse_56, map_13) -> {
            __core__chooseList(map_13, () -> {
                true
            }, () -> {
                head_6 = __core__headList__safe(map_13);
                __core__ifThenElse(
                    __helios__bytearray__is_valid_data(__core__fstPair(head_6)),
                    () -> {
                        __core__ifThenElse(
                            __helios__int__is_valid_data(__core__sndPair(head_6)),
                            () -> {
                                recurse_56(recurse_56, __core__tailList__safe(map_13))
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
        recurse_57(recurse_57, map_12)
    };
    __helios__map[__helios__bytearray@__helios__int]__from_data = (data_24) -> {
        map_14 = __core__unMapData(data_24);
        _ = __core__ifThenElse(
            __helios__map[__helios__bytearray@__helios__int]__is_valid_data_internal(map_14),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid map data", ())
            }
        )();
        map_14
    };
    __helios__map[__helios__scriptpurpose@__helios__data]__get = (self_80) -> {
        (key_11) -> {
            __helios__common__map_get(self_80, __helios__scriptpurpose____to_data(key_11), (x_2) -> {
                __helios__data__from_data(x_2)
            }, () -> {
                __helios__error("key not found")
            })
        }
    };
    __helios__map[__helios__scriptpurpose@__helios__data]__find_key = (self_81) -> {
        (fn_15) -> {
            recurse_59 = (recurse_58, map_15) -> {
                __core__chooseList(map_15, () -> {
                    __helios__error("not found")
                }, () -> {
                    item_2 = __helios__scriptpurpose__from_data(__core__fstPair(__core__headList__safe(map_15)));
                    __core__ifThenElse(
                        fn_15(item_2),
                        () -> {
                            item_2
                        },
                        () -> {
                            recurse_58(recurse_58, __core__tailList__safe(map_15))
                        }
                    )()
                })()
            };
            recurse_59(recurse_59, self_81)
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
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data = (__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data) -> {
        (data_25) -> {
            __core__ifThenElse(
                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data(data_25),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data(data_25),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data(data_25),
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
        (data_26) -> {
            ignore = __core__ifThenElse(
                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_1, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_1)(data_26),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid DelegateLifecycleActivity data", ())
                }
            )();
            data_26
        }
    };
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is = (data_27) -> {
        __helios__common__enum_tag_equals(data_27, 0)
    };
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2 = (data_28) -> {
        __core__chooseData(data_28, () -> {
            pair_8 = __core__unConstrData__safe(data_28);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_8), 0),
                () -> {
                    data_29 = __core__listData(__core__sndPair(pair_8));
                    __core__chooseData(data_29, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_6 = __core__unListData__safe(data_29);
                        __core__chooseList(fields_6, () -> {
                            false
                        }, () -> {
                            head_7 = __core__headList__safe(fields_6);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_7),
                                () -> {
                                    fields_7 = __core__tailList__safe(fields_6);
                                    __core__chooseList(fields_7, () -> {
                                        false
                                    }, () -> {
                                        head_8 = __core__headList__safe(fields_7);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_8),
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
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring____is = (data_30) -> {
        __helios__common__enum_tag_equals(data_30, 1)
    };
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2 = (data_31) -> {
        __core__chooseData(data_31, () -> {
            pair_9 = __core__unConstrData__safe(data_31);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_9), 1),
                () -> {
                    data_32 = __core__listData(__core__sndPair(pair_9));
                    __core__chooseData(data_32, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_9 = __core__unListData__safe(data_32);
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
    __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2 = (data_33) -> {
        __core__chooseData(data_33, () -> {
            pair_10 = __core__unConstrData__safe(data_33);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_10), 2),
                () -> {
                    data_34 = __core__listData(__core__sndPair(pair_10));
                    __core__chooseData(data_34, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_10 = __core__unListData__safe(data_34);
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
    __module__CapoDelegateHelpers__DelegateRole[]____to_data = __helios__common__identity;
    __module__CapoDelegateHelpers__DelegateRole[]__is_valid_data = (__module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data, __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data) -> {
        (data_35) -> {
            __core__ifThenElse(
                __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data(data_35),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data(data_35),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data(data_35),
                                () -> {
                                    true
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data(data_35),
                                        () -> {
                                            true
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data(data_35),
                                                () -> {
                                                    true
                                                },
                                                () -> {
                                                    __core__ifThenElse(
                                                        __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data(data_35),
                                                        () -> {
                                                            true
                                                        },
                                                        () -> {
                                                            __core__ifThenElse(
                                                                __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data(data_35),
                                                                () -> {
                                                                    true
                                                                },
                                                                () -> {
                                                                    __core__ifThenElse(
                                                                        __module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data(data_35),
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
    };
    __module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data_1 = (data_36) -> {
        __core__chooseData(data_36, () -> {
            pair_11 = __core__unConstrData__safe(data_36);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_11), 0),
                () -> {
                    data_37 = __core__listData(__core__sndPair(pair_11));
                    __core__chooseData(data_37, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_11 = __core__unListData__safe(data_37);
                        __core__chooseList(fields_11, true, false)
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
    __module__CapoDelegateHelpers__DelegateRole[]__MintDgt____new = () -> {
        __core__constrData(0, __core__mkNilData(()))
    };
    __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data_1 = (data_38) -> {
        __core__chooseData(data_38, () -> {
            pair_12 = __core__unConstrData__safe(data_38);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_12), 1),
                () -> {
                    data_39 = __core__listData(__core__sndPair(pair_12));
                    __core__chooseData(data_39, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_12 = __core__unListData__safe(data_39);
                        __core__chooseList(fields_12, true, false)
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
    __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data_1 = (data_40) -> {
        __core__chooseData(data_40, () -> {
            pair_13 = __core__unConstrData__safe(data_40);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_13), 2),
                () -> {
                    data_41 = __core__listData(__core__sndPair(pair_13));
                    __core__chooseData(data_41, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_13 = __core__unListData__safe(data_41);
                        __core__chooseList(fields_13, true, false)
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
    __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data_1 = (data_42) -> {
        __core__chooseData(data_42, () -> {
            pair_14 = __core__unConstrData__safe(data_42);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_14), 3),
                () -> {
                    data_43 = __core__listData(__core__sndPair(pair_14));
                    __core__chooseData(data_43, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_14 = __core__unListData__safe(data_43);
                        __core__chooseList(fields_14, true, false)
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
    __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data_1 = (data_44) -> {
        __core__chooseData(data_44, () -> {
            pair_15 = __core__unConstrData__safe(data_44);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_15), 4),
                () -> {
                    data_45 = __core__listData(__core__sndPair(pair_15));
                    __core__chooseData(data_45, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_15 = __core__unListData__safe(data_45);
                        __core__chooseList(fields_15, true, false)
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
    __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data_1 = (data_46) -> {
        __core__chooseData(data_46, () -> {
            pair_16 = __core__unConstrData__safe(data_46);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_16), 5),
                () -> {
                    data_47 = __core__listData(__core__sndPair(pair_16));
                    __core__chooseData(data_47, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_16 = __core__unListData__safe(data_47);
                        __core__chooseList(fields_16, true, false)
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
    __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data_1 = (data_48) -> {
        __core__chooseData(data_48, () -> {
            pair_17 = __core__unConstrData__safe(data_48);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_17), 6),
                () -> {
                    data_49 = __core__listData(__core__sndPair(pair_17));
                    __core__chooseData(data_49, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_17 = __core__unListData__safe(data_49);
                        __core__chooseList(fields_17, true, false)
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
    __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data_1 = (data_50) -> {
        __core__chooseData(data_50, () -> {
            pair_18 = __core__unConstrData__safe(data_50);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_18), 7),
                () -> {
                    data_51 = __core__listData(__core__sndPair(pair_18));
                    __core__chooseData(data_51, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_18 = __core__unListData__safe(data_51);
                        __core__chooseList(fields_18, true, false)
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
    __module__CapoDelegateHelpers__ManifestActivity[]__is_valid_data = (__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry__is_valid_data, __module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry__is_valid_data, __module__CapoDelegateHelpers__ManifestActivity[]__addingEntry__is_valid_data, __module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken__is_valid_data, __module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken__is_valid_data) -> {
        (data_52) -> {
            __core__ifThenElse(
                __module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken__is_valid_data(data_52),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken__is_valid_data(data_52),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__ManifestActivity[]__addingEntry__is_valid_data(data_52),
                                () -> {
                                    true
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry__is_valid_data(data_52),
                                        () -> {
                                            true
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry__is_valid_data(data_52),
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
    __module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry__is_valid_data_1 = (data_53) -> {
        __core__chooseData(data_53, () -> {
            pair_19 = __core__unConstrData__safe(data_53);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_19), 0),
                () -> {
                    data_54 = __core__listData(__core__sndPair(pair_19));
                    __core__chooseData(data_54, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_19 = __core__unListData__safe(data_54);
                        __core__chooseList(fields_19, () -> {
                            false
                        }, () -> {
                            head_9 = __core__headList__safe(fields_19);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_9),
                                () -> {
                                    fields_20 = __core__tailList__safe(fields_19);
                                    __core__chooseList(fields_20, true, false)
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
    __module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry__is_valid_data_1 = (data_55) -> {
        __core__chooseData(data_55, () -> {
            pair_20 = __core__unConstrData__safe(data_55);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_20), 1),
                () -> {
                    data_56 = __core__listData(__core__sndPair(pair_20));
                    __core__chooseData(data_56, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_21 = __core__unListData__safe(data_56);
                        __core__chooseList(fields_21, () -> {
                            false
                        }, () -> {
                            head_10 = __core__headList__safe(fields_21);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_10),
                                () -> {
                                    fields_22 = __core__tailList__safe(fields_21);
                                    __core__chooseList(fields_22, () -> {
                                        false
                                    }, () -> {
                                        head_11 = __core__headList__safe(fields_22);
                                        __core__ifThenElse(
                                            __helios__bytearray__is_valid_data(head_11),
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
    __module__CapoDelegateHelpers__ManifestActivity[]__addingEntry__is_valid_data_1 = (data_57) -> {
        __core__chooseData(data_57, () -> {
            pair_21 = __core__unConstrData__safe(data_57);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_21), 2),
                () -> {
                    data_58 = __core__listData(__core__sndPair(pair_21));
                    __core__chooseData(data_58, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_24 = __core__unListData__safe(data_58);
                        __core__chooseList(fields_24, () -> {
                            false
                        }, () -> {
                            head_12 = __core__headList__safe(fields_24);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_12),
                                () -> {
                                    fields_25 = __core__tailList__safe(fields_24);
                                    __core__chooseList(fields_25, () -> {
                                        false
                                    }, () -> {
                                        head_13 = __core__headList__safe(fields_25);
                                        __core__ifThenElse(
                                            __helios__bytearray__is_valid_data(head_13),
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
    __module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken__is_valid_data_1 = (data_59) -> {
        __core__chooseData(data_59, () -> {
            pair_22 = __core__unConstrData__safe(data_59);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_22), 3),
                () -> {
                    data_60 = __core__listData(__core__sndPair(pair_22));
                    __core__chooseData(data_60, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_27 = __core__unListData__safe(data_60);
                        __core__chooseList(fields_27, () -> {
                            false
                        }, () -> {
                            head_14 = __core__headList__safe(fields_27);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_14),
                                () -> {
                                    fields_28 = __core__tailList__safe(fields_27);
                                    __core__chooseList(fields_28, () -> {
                                        false
                                    }, () -> {
                                        head_15 = __core__headList__safe(fields_28);
                                        __core__ifThenElse(
                                            __helios__int__is_valid_data(head_15),
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
    __module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken__is_valid_data_1 = (data_61) -> {
        __core__chooseData(data_61, () -> {
            pair_23 = __core__unConstrData__safe(data_61);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_23), 4),
                () -> {
                    data_62 = __core__listData(__core__sndPair(pair_23));
                    __core__chooseData(data_62, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_30 = __core__unListData__safe(data_62);
                        __core__chooseList(fields_30, () -> {
                            false
                        }, () -> {
                            head_16 = __core__headList__safe(fields_30);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_16),
                                () -> {
                                    fields_31 = __core__tailList__safe(fields_30);
                                    __core__chooseList(fields_31, () -> {
                                        false
                                    }, () -> {
                                        head_17 = __core__headList__safe(fields_31);
                                        __core__ifThenElse(
                                            __helios__int__is_valid_data(head_17),
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
    __module__CapoDelegateHelpers__PendingDelegateAction[]__is_valid_data = (__module__CapoDelegateHelpers__PendingDelegateAction[]__Add__is_valid_data, __module__CapoDelegateHelpers__PendingDelegateAction[]__Remove__is_valid_data, __module__CapoDelegateHelpers__PendingDelegateAction[]__Replace__is_valid_data) -> {
        (data_63) -> {
            __core__ifThenElse(
                __module__CapoDelegateHelpers__PendingDelegateAction[]__Replace__is_valid_data(data_63),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoDelegateHelpers__PendingDelegateAction[]__Remove__is_valid_data(data_63),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__PendingDelegateAction[]__Add__is_valid_data(data_63),
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
    __module__CapoDelegateHelpers__PendingDelegateAction[]__Add__is_valid_data_1 = (data_64) -> {
        __core__chooseData(data_64, () -> {
            pair_24 = __core__unConstrData__safe(data_64);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_24), 0),
                () -> {
                    data_65 = __core__listData(__core__sndPair(pair_24));
                    __core__chooseData(data_65, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_33 = __core__unListData__safe(data_65);
                        __core__chooseList(fields_33, () -> {
                            false
                        }, () -> {
                            head_18 = __core__headList__safe(fields_33);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_18),
                                () -> {
                                    fields_34 = __core__tailList__safe(fields_33);
                                    __core__chooseList(fields_34, () -> {
                                        false
                                    }, () -> {
                                        head_19 = __core__headList__safe(fields_34);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_19),
                                            () -> {
                                                fields_35 = __core__tailList__safe(fields_34);
                                                __core__chooseList(fields_35, () -> {
                                                    false
                                                }, () -> {
                                                    head_20 = __core__headList__safe(fields_35);
                                                    __core__ifThenElse(
                                                        __helios__string__is_valid_data(head_20),
                                                        () -> {
                                                            fields_36 = __core__tailList__safe(fields_35);
                                                            __core__chooseList(fields_36, true, false)
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
    __module__CapoDelegateHelpers__PendingDelegateAction[]__Remove__is_valid_data_1 = (data_66) -> {
        __core__chooseData(data_66, () -> {
            pair_25 = __core__unConstrData__safe(data_66);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_25), 1),
                () -> {
                    data_67 = __core__listData(__core__sndPair(pair_25));
                    __core__chooseData(data_67, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_37 = __core__unListData__safe(data_67);
                        __core__chooseList(fields_37, true, false)
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
    __module__CapoDelegateHelpers__PendingDelegateAction[]__Replace__is_valid_data_1 = (data_68) -> {
        __core__chooseData(data_68, () -> {
            pair_26 = __core__unConstrData__safe(data_68);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_26), 2),
                () -> {
                    data_69 = __core__listData(__core__sndPair(pair_26));
                    __core__chooseData(data_69, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_38 = __core__unListData__safe(data_69);
                        __core__chooseList(fields_38, () -> {
                            false
                        }, () -> {
                            head_21 = __core__headList__safe(fields_38);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_21),
                                () -> {
                                    fields_39 = __core__tailList__safe(fields_38);
                                    __core__chooseList(fields_39, () -> {
                                        false
                                    }, () -> {
                                        head_22 = __core__headList__safe(fields_39);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_22),
                                            () -> {
                                                fields_40 = __core__tailList__safe(fields_39);
                                                __core__chooseList(fields_40, () -> {
                                                    false
                                                }, () -> {
                                                    head_23 = __core__headList__safe(fields_40);
                                                    __core__ifThenElse(
                                                        __helios__string__is_valid_data(head_23),
                                                        () -> {
                                                            fields_41 = __core__tailList__safe(fields_40);
                                                            __core__chooseList(fields_41, () -> {
                                                                false
                                                            }, () -> {
                                                                head_24 = __core__headList__safe(fields_41);
                                                                __core__ifThenElse(
                                                                    __helios__assetclass__is_valid_data(head_24),
                                                                    () -> {
                                                                        fields_42 = __core__tailList__safe(fields_41);
                                                                        __core__chooseList(fields_42, true, false)
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
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data = (__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data) -> {
        (data_70) -> {
            __core__ifThenElse(
                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data(data_70),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data(data_70),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data(data_70),
                                () -> {
                                    true
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data(data_70),
                                        () -> {
                                            true
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data(data_70),
                                                () -> {
                                                    true
                                                },
                                                () -> {
                                                    __core__ifThenElse(
                                                        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data(data_70),
                                                        () -> {
                                                            true
                                                        },
                                                        () -> {
                                                            __core__ifThenElse(
                                                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data(data_70),
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
    };
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__from_data = (__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data_1) -> {
        (data_71) -> {
            ignore_1 = __core__ifThenElse(
                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data_1, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data_1)(data_71),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid CapoLifecycleActivity data", ())
                }
            )();
            data_71
        }
    };
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate____is = (data_72) -> {
        __helios__common__enum_tag_equals(data_72, 0)
    };
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2 = (data_73) -> {
        __core__chooseData(data_73, () -> {
            pair_27 = __core__unConstrData__safe(data_73);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_27), 0),
                () -> {
                    data_74 = __core__listData(__core__sndPair(pair_27));
                    __core__chooseData(data_74, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_43 = __core__unListData__safe(data_74);
                        __core__chooseList(fields_43, () -> {
                            false
                        }, () -> {
                            head_25 = __core__headList__safe(fields_43);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_25),
                                () -> {
                                    fields_44 = __core__tailList__safe(fields_43);
                                    __core__chooseList(fields_44, () -> {
                                        false
                                    }, () -> {
                                        head_26 = __core__headList__safe(fields_44);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_26),
                                            () -> {
                                                fields_45 = __core__tailList__safe(fields_44);
                                                __core__chooseList(fields_45, true, false)
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
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange____is = (data_75) -> {
        __helios__common__enum_tag_equals(data_75, 1)
    };
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data_2 = (data_76) -> {
        __core__chooseData(data_76, () -> {
            pair_28 = __core__unConstrData__safe(data_76);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_28), 1),
                () -> {
                    data_77 = __core__listData(__core__sndPair(pair_28));
                    __core__chooseData(data_77, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_46 = __core__unListData__safe(data_77);
                        __core__chooseList(fields_46, true, false)
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
    __helios__option[__helios__string]__is_valid_data = (data_78) -> {
        __core__chooseData(data_78, () -> {
            pair_29 = __core__unConstrData__safe(data_78);
            index_5 = __core__fstPair(pair_29);
            fields_47 = __core__sndPair(pair_29);
            __core__ifThenElse(
                __core__equalsInteger(index_5, 0),
                () -> {
                    __core__chooseList(fields_47, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_47), () -> {
                            __helios__string__is_valid_data(__core__headList__safe(fields_47))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_5, 1),
                        () -> {
                            __core__chooseList(fields_47, true, false)
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
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data_2 = (data_79) -> {
        __core__chooseData(data_79, () -> {
            pair_30 = __core__unConstrData__safe(data_79);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_30), 2),
                () -> {
                    data_80 = __core__listData(__core__sndPair(pair_30));
                    __core__chooseData(data_80, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_48 = __core__unListData__safe(data_80);
                        __core__chooseList(fields_48, () -> {
                            false
                        }, () -> {
                            head_27 = __core__headList__safe(fields_48);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__DelegateRole[]__is_valid_data(__module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data_1)(head_27),
                           
     () -> {
                                    fields_49 = __core__tailList__safe(fields_48);
                                    __core__chooseList(fields_49, () -> {
                                        false
                                    }, () -> {
                                        head_28 = __core__headList__safe(fields_49);
                                        __core__ifThenElse(
                                            __helios__option[__helios__string]__is_valid_data(head_28),
                                            () -> {
                                                fields_50 = __core__tailList__safe(fields_49);
                                                __core__chooseList(fields_50, true, false)
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
    __helios__option[__helios__string]____to_data = __helios__common__identity;
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data_2 = (data_81) -> {
        __core__chooseData(data_81, () -> {
            pair_31 = __core__unConstrData__safe(data_81);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_31), 3),
                () -> {
                    data_82 = __core__listData(__core__sndPair(pair_31));
                    __core__chooseData(data_82, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_51 = __core__unListData__safe(data_82);
                        __core__chooseList(fields_51, true, false)
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
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate____is = (data_83) -> {
        __helios__common__enum_tag_equals(data_83, 4)
    };
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data_2 = (data_84) -> {
        __core__chooseData(data_84, () -> {
            pair_32 = __core__unConstrData__safe(data_84);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_32), 4),
                () -> {
                    data_85 = __core__listData(__core__sndPair(pair_32));
                    __core__chooseData(data_85, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_52 = __core__unListData__safe(data_85);
                        __core__chooseList(fields_52, () -> {
                            false
                        }, () -> {
                            head_29 = __core__headList__safe(fields_52);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_29),
                                () -> {
                                    fields_53 = __core__tailList__safe(fields_52);
                                    __core__chooseList(fields_53, () -> {
                                        false
                                    }, () -> {
                                        head_30 = __core__headList__safe(fields_53);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_30),
                                            () -> {
                                                fields_54 = __core__tailList__safe(fields_53);
                                                __core__chooseList(fields_54, true, false)
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
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate____is = (data_86) -> {
        __helios__common__enum_tag_equals(data_86, 5)
    };
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data_2 = (data_87) -> {
        __core__chooseData(data_87, () -> {
            pair_33 = __core__unConstrData__safe(data_87);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_33), 5),
                () -> {
                    data_88 = __core__listData(__core__sndPair(pair_33));
                    __core__chooseData(data_88, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_55 = __core__unListData__safe(data_88);
                        __core__chooseList(fields_55, () -> {
                            false
                        }, () -> {
                            head_31 = __core__headList__safe(fields_55);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_31),
                                () -> {
                                    fields_56 = __core__tailList__safe(fields_55);
                                    __core__chooseList(fields_56, () -> {
                                        false
                                    }, () -> {
                                        head_32 = __core__headList__safe(fields_56);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_32),
                                            () -> {
                                                fields_57 = __core__tailList__safe(fields_56);
                                                __core__chooseList(fields_57, true, false)
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
    __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data_2 = (data_89) -> {
        __core__chooseData(data_89, () -> {
            pair_34 = __core__unConstrData__safe(data_89);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_34), 6),
                () -> {
                    data_90 = __core__listData(__core__sndPair(pair_34));
                    __core__chooseData(data_90, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_58 = __core__unListData__safe(data_90);
                        __core__chooseList(fields_58, () -> {
                            false
                        }, () -> {
                            head_33 = __core__headList__safe(fields_58);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__ManifestActivity[]__is_valid_data(__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry__is_valid_data_1, __module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry__is_valid_data_1, __module__CapoDelegateHelpers__ManifestActivity[]__addingEntry__is_valid_data_1, __module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken__is_valid_data_1, __module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken__is_valid_data_1)(head_33),
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]____to_data = __helios__common__identity;
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__is_valid_data = (__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data) -> {
        (data_91) -> {
            __core__ifThenElse(
                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data(data_91),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data(data_91),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data(data_91),
                                () -> {
                                    true
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data(data_91),
                                        () -> {
                                            true
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data(data_91),
                                                () -> {
                                                    true
                                                },
                                                () -> {
                                                    __core__ifThenElse(
                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data(data_91),
                                                        () -> {
                                                            true
                                                        },
                                                        () -> {
                                                            __core__ifThenElse(
                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data(data_91),
                                                                () -> {
                                                                    true
                                                                },
                                                                () -> {
                                                                    __core__ifThenElse(
                                                                        __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data(data_91),
                                                                        () -> {
                                                                            true
                                                                        },
                                                                        () -> {
                                                                            __core__ifThenElse(
                                                                                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data(data_91),
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
        (data_92) -> {
            ignore_2 = __core__ifThenElse(
                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__is_valid_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_1, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_1)(data_92),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid AbstractDelegateActivitiesEnum data", ())
                }
            )();
            data_92
        }
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is = (data_93) -> {
        __helios__common__enum_tag_equals(data_93, 0)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2 = (data_94) -> {
        __core__chooseData(data_94, () -> {
            pair_35 = __core__unConstrData__safe(data_94);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_35), 0),
                () -> {
                    data_95 = __core__listData(__core__sndPair(pair_35));
                    __core__chooseData(data_95, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_60 = __core__unListData__safe(data_95);
                        __core__chooseList(fields_60, () -> {
                            false
                        }, () -> {
                            head_34 = __core__headList__safe(fields_60);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data_2)(head_34),
                                () -> {
                                    fields_61 = __core__tailList__safe(fields_60);
                                    __core__chooseList(fields_61, true, false)
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
        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__from_data(__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingDgtChange__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingDgtChanges__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate__is_valid_data_2, __module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest__is_valid_data_2)(__helios__common__enum_field_0(self_82))
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities____is = (data_96) -> {
        __helios__common__enum_tag_equals(data_96, 1)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2 = (data_97) -> {
        __core__chooseData(data_97, () -> {
            pair_36 = __core__unConstrData__safe(data_97);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_36), 1),
                () -> {
                    data_98 = __core__listData(__core__sndPair(pair_36));
                    __core__chooseData(data_98, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_62 = __core__unListData__safe(data_98);
                        __core__chooseList(fields_62, () -> {
                            false
                        }, () -> {
                            head_35 = __core__headList__safe(fields_62);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__is_valid_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2)(head_35),
                                () -> {
                                    fields_63 = __core__tailList__safe(fields_62);
                                    __core__chooseList(fields_63, true, false)
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
        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__from_data(__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring__is_valid_data_2, __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings__is_valid_data_2)(__helios__common__enum_field_0(self_83))
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities____is = (data_99) -> {
        __helios__common__enum_tag_equals(data_99, 2)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2 = (data_100) -> {
        __core__chooseData(data_100, () -> {
            pair_37 = __core__unConstrData__safe(data_100);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_37), 2),
                () -> {
                    data_101 = __core__listData(__core__sndPair(pair_37));
                    __core__chooseData(data_101, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_64 = __core__unListData__safe(data_101);
                        __core__chooseList(fields_64, () -> {
                            false
                        }, () -> {
                            head_36 = __core__headList__safe(fields_64);
                            __core__ifThenElse(
                                __helios__data__is_valid_data(head_36),
                                () -> {
                                    fields_65 = __core__tailList__safe(fields_64);
                                    __core__chooseList(fields_65, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities____is = (data_102) -> {
        __helios__common__enum_tag_equals(data_102, 3)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2 = (data_103) -> {
        __core__chooseData(data_103, () -> {
            pair_38 = __core__unConstrData__safe(data_103);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_38), 3),
                () -> {
                    data_104 = __core__listData(__core__sndPair(pair_38));
                    __core__chooseData(data_104, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_66 = __core__unListData__safe(data_104);
                        __core__chooseList(fields_66, () -> {
                            false
                        }, () -> {
                            head_37 = __core__headList__safe(fields_66);
                            __core__ifThenElse(
                                __helios__data__is_valid_data(head_37),
                                () -> {
                                    fields_67 = __core__tailList__safe(fields_66);
                                    __core__chooseList(fields_67, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities____is = (data_105) -> {
        __helios__common__enum_tag_equals(data_105, 4)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2 = (data_106) -> {
        __core__chooseData(data_106, () -> {
            pair_39 = __core__unConstrData__safe(data_106);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_39), 4),
                () -> {
                    data_107 = __core__listData(__core__sndPair(pair_39));
                    __core__chooseData(data_107, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_68 = __core__unListData__safe(data_107);
                        __core__chooseList(fields_68, () -> {
                            false
                        }, () -> {
                            head_38 = __core__headList__safe(fields_68);
                            __core__ifThenElse(
                                __helios__data__is_valid_data(head_38),
                                () -> {
                                    fields_69 = __core__tailList__safe(fields_68);
                                    __core__chooseList(fields_69, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData____is = (data_108) -> {
        __helios__common__enum_tag_equals(data_108, 5)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2 = (data_109) -> {
        __core__chooseData(data_109, () -> {
            pair_40 = __core__unConstrData__safe(data_109);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_40), 5),
                () -> {
                    data_110 = __core__listData(__core__sndPair(pair_40));
                    __core__chooseData(data_110, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_70 = __core__unListData__safe(data_110);
                        __core__chooseList(fields_70, () -> {
                            false
                        }, () -> {
                            head_39 = __core__headList__safe(fields_70);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_39),
                                () -> {
                                    fields_71 = __core__tailList__safe(fields_70);
                                    __core__chooseList(fields_71, () -> {
                                        false
                                    }, () -> {
                                        head_40 = __core__headList__safe(fields_71);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_40),
                                            () -> {
                                                fields_72 = __core__tailList__safe(fields_71);
                                                __core__chooseList(fields_72, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData____is = (data_111) -> {
        __helios__common__enum_tag_equals(data_111, 6)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2 = (data_112) -> {
        __core__chooseData(data_112, () -> {
            pair_41 = __core__unConstrData__safe(data_112);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_41), 6),
                () -> {
                    data_113 = __core__listData(__core__sndPair(pair_41));
                    __core__chooseData(data_113, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_73 = __core__unListData__safe(data_113);
                        __core__chooseList(fields_73, () -> {
                            false
                        }, () -> {
                            head_41 = __core__headList__safe(fields_73);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_41),
                                () -> {
                                    fields_74 = __core__tailList__safe(fields_73);
                                    __core__chooseList(fields_74, () -> {
                                        false
                                    }, () -> {
                                        head_42 = __core__headList__safe(fields_74);
                                        __core__ifThenElse(
                                            __helios__bytearray__is_valid_data(head_42),
                                            () -> {
                                                fields_75 = __core__tailList__safe(fields_74);
                                                __core__chooseList(fields_75, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData____is = (data_114) -> {
        __helios__common__enum_tag_equals(data_114, 7)
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2 = (data_115) -> {
        __core__chooseData(data_115, () -> {
            pair_42 = __core__unConstrData__safe(data_115);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_42), 7),
                () -> {
                    data_116 = __core__listData(__core__sndPair(pair_42));
                    __core__chooseData(data_116, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_76 = __core__unListData__safe(data_116);
                        __core__chooseList(fields_76, () -> {
                            false
                        }, () -> {
                            head_43 = __core__headList__safe(fields_76);
                            __core__ifThenElse(
                                __helios__string__is_valid_data(head_43),
                                () -> {
                                    fields_77 = __core__tailList__safe(fields_76);
                                    __core__chooseList(fields_77, () -> {
                                        false
                                    }, () -> {
                                        head_44 = __core__headList__safe(fields_77);
                                        __core__ifThenElse(
                                            __helios__bytearray__is_valid_data(head_44),
                                            () -> {
                                                fields_78 = __core__tailList__safe(fields_77);
                                                __core__chooseList(fields_78, true, false)
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
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities____is = (data_117) -> {
        __helios__common__enum_tag_equals(data_117, 8)
    };
    __helios__list[__helios__data]__is_valid_data_internal = (lst_9) -> {
        recurse_61 = (recurse_60, lst_10) -> {
            __core__chooseList(lst_10, () -> {
                true
            }, () -> {
                __core__ifThenElse(
                    __helios__data__is_valid_data(__core__headList__safe(lst_10)),
                    () -> {
                        recurse_60(recurse_60, __core__tailList__safe(lst_10))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_61(recurse_61, lst_9)
    };
    __helios__list[__helios__data]__is_valid_data = (data_118) -> {
        __core__chooseData(data_118, () -> {
            false
        }, () -> {
            false
        }, () -> {
            __helios__list[__helios__data]__is_valid_data_internal(__core__unListData__safe(data_118))
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2 = (data_119) -> {
        __core__chooseData(data_119, () -> {
            pair_43 = __core__unConstrData__safe(data_119);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_43), 8),
                () -> {
                    data_120 = __core__listData(__core__sndPair(pair_43));
                    __core__chooseData(data_120, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_79 = __core__unListData__safe(data_120);
                        __core__chooseList(fields_79, () -> {
                            false
                        }, () -> {
                            head_45 = __core__headList__safe(fields_79);
                            __core__ifThenElse(
                                __helios__list[__helios__data]__is_valid_data(head_45),
                                () -> {
                                    fields_80 = __core__tailList__safe(fields_79);
                                    __core__chooseList(fields_80, true, false)
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
    __helios__list[__helios__data]__from_data = (data_121) -> {
        lst_11 = __core__unListData(data_121);
        __2 = __core__ifThenElse(
            __helios__list[__helios__data]__is_valid_data_internal(lst_11),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid list data", ())
            }
        )();
        lst_11
    };
    __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__activities = (self_84) -> {
        __helios__list[__helios__data]__from_data(__helios__common__enum_field_0(self_84))
    };
    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____is = (data_122) -> {
        __helios__common__enum_tag_equals(data_122, 0)
    };
    __module__CapoDelegateHelpers__DgTknDisposition[]__Returned____new = () -> {
        __core__constrData(0, __core__mkNilData(()))
    };
    __module__CapoDelegateHelpers__DgTknDisposition[]__Created____is = (data_123) -> {
        __helios__common__enum_tag_equals(data_123, 1)
    };
    __helios__option[__helios__validatorhash]__is_valid_data = (data_124) -> {
        __core__chooseData(data_124, () -> {
            pair_44 = __core__unConstrData__safe(data_124);
            index_6 = __core__fstPair(pair_44);
            fields_81 = __core__sndPair(pair_44);
            __core__ifThenElse(
                __core__equalsInteger(index_6, 0),
                () -> {
                    __core__chooseList(fields_81, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_81), () -> {
                            __helios__validatorhash__is_valid_data(__core__headList__safe(fields_81))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_6, 1),
                        () -> {
                            __core__chooseList(fields_81, true, false)
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
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data = (data_125) -> {
        __core__chooseData(data_125, () -> {
            false
        }, () -> {
            false
        }, () -> {
            fields_82 = __core__unListData__safe(data_125);
            __core__chooseList(fields_82, () -> {
                false
            }, () -> {
                head_46 = __core__headList__safe(fields_82);
                __core__ifThenElse(
                    __helios__string__is_valid_data(head_46),
                    () -> {
                        fields_83 = __core__tailList__safe(fields_82);
                        __core__chooseList(fields_83, () -> {
                            false
                        }, () -> {
                            head_47 = __core__headList__safe(fields_83);
                            __core__ifThenElse(
                                __helios__option[__helios__validatorhash]__is_valid_data(head_47),
                                () -> {
                                    fields_84 = __core__tailList__safe(fields_83);
                                    __core__chooseList(fields_84, () -> {
                                        false
                                    }, () -> {
                                        head_48 = __core__headList__safe(fields_84);
                                        __core__ifThenElse(
                                            __helios__bytearray__is_valid_data(head_48),
                                            () -> {
                                                fields_85 = __core__tailList__safe(fields_84);
                                                __core__chooseList(fields_85, true, false)
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
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data = (data_126) -> {
        ignore_3 = __core__ifThenElse(
            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(data_126),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid RelativeDelegateLink data", ())
            }
        )();
        __core__unListData(data_126)
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]____to_data = __helios__struct____to_data;
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName = (self_85) -> {
        __helios__string__from_data(__helios__common__struct_field_0(self_85))
    };
    __helios__option[__helios__validatorhash]__from_data = (data_127) -> {
        __3 = __core__ifThenElse(
            __helios__option[__helios__validatorhash]__is_valid_data(data_127),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid option data", ())
            }
        )();
        data_127
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash = (self_86) -> {
        __helios__option[__helios__validatorhash]__from_data(__helios__common__struct_field_1(self_86))
    };
    __helios__option[__helios__validatorhash]__none____is = (data_128) -> {
        __helios__common__enum_tag_equals(data_128, 1)
    };
    __helios__option[__helios__txinput]__none____new = () -> {
        __helios__option__NONE
    };
    __helios__option[__helios__txinput]__some____is = (data_129) -> {
        __helios__common__enum_tag_equals(data_129, 0)
    };
    __helios__list[__helios__txinput]__find_safe = (self_87) -> {
        (fn_16) -> {
            __helios__common__find_safe(self_87, (item_3) -> {
                fn_16(__helios__txinput__from_data(item_3))
            }, __helios__common__identity)
        }
    };
    __helios__option[__helios__validatorhash]__some__some = (self_88) -> {
        __helios__validatorhash__from_data(__helios__common__enum_field_0(self_88))
    };
    __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput = (self_89) -> {
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
            __cond_1 = __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash(self_89);
            __core__ifThenElse(
                __helios__option[__helios__validatorhash]__none____is(__cond_1),
                () -> {
                    (__lhs_0_2) -> {
                        __core__ifThenElse(
                            required_1,
                            () -> {
                                __helios__error(__helios__string____add("_❌ ➡️ 💁 missing required input with dgTkn ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_89)))
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
                        expectedUut = __module__StellarHeliosHelpers__mkTv(mph_10, true, __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_89), false, (), false, ());
                        __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add("  -- seeking input dgTkn: ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_89)), "
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
                                            __helios__error(__helios__string____add("_❌ ➡️  💁 missing req'd input dgTkn (at script addr) ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(self_89)))
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
    __helios__option[__helios__validatorhash]__some____is = (data_130) -> {
        __helios__common__enum_tag_equals(data_130, 0)
    };
    __helios__option[__helios__txoutput]__some____is = (data_131) -> {
        __helios__common__enum_tag_equals(data_131, 0)
    };
    __helios__list[__helios__txoutput]__find_safe = (self_90) -> {
        (fn_17) -> {
            __helios__common__find_safe(self_90, (item_4) -> {
                fn_17(__helios__txoutput__from_data(item_4))
            }, __helios__common__identity)
        }
    };
    __module__CapoDelegateHelpers__linkHasValidOutput = (delegateLink, mph_11, __useopt__required_1, required_2, __useopt__createdOrReturned, createdOrReturned) -> {
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
        __core__chooseUnit(__helios__print("aaaa"), __lhs_0_3 = delegateLink;
        uut = __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(__lhs_0_3);
        validatorHash = __module__CapoDelegateHelpers__RelativeDelegateLink[]__delegateValidatorHash(__lhs_0_3);
        __core__chooseUnit(__helios__print("bbbb"), v = __module__StellarHeliosHelpers__mkTv(mph_11, true, uut, false, (), false, ());
        (cOrR) -> {
            __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add(" ⬅️ 🔎 💁 expect dgTkn ", cOrR), ": "), uut)), (hasDelegate) -> {
                __core__chooseUnit(__helios__print("um, here"), __core__chooseUnit(__core__ifThenElse(
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
                                    __lhs_0_11 = __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput(delegateLink)(__helios__tx__inputs(__helios__scriptcontext__tx), mph_11, true, true);
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
                )(), __core__chooseUnit(__helios__print("cccc"), hasDelegate)))
            }(__cond_4 = validatorHash;
            __core__ifThenElse(
                __helios__option[__helios__validatorhash]__some____is(__cond_4),
                () -> {
                    (__lhs_0_9) -> {
                        vh_3 = __helios__option[__helios__validatorhash]__some__some(__lhs_0_9);
                        __core__chooseUnit(__helios__print(__helios__string____add("  ... ^ sent to validator: ", __helios__validatorhash__show(vh_3)())), t = __helios__tx__value_locked_by(__helios__scriptcontext__tx)(vh_3);
                        __helios__value__contains(t)(v))
                    }
                },
                () -> {
                    (__lhs_0_6) -> {
                        __core__chooseUnit(__helios__print("   (to anywhere)
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
        )()(__cond_3))))
    };
    __helios__option[__helios__txinput]__some__some = (self_91) -> {
        __helios__txinput__from_data(__helios__common__enum_field_0(self_91))
    };
    __helios__option[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_132) -> {
        __core__chooseData(data_132, () -> {
            pair_45 = __core__unConstrData__safe(data_132);
            index_7 = __core__fstPair(pair_45);
            fields_86 = __core__sndPair(pair_45);
            __core__ifThenElse(
                __core__equalsInteger(index_7, 0),
                () -> {
                    __core__chooseList(fields_86, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_86), () -> {
                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__headList__safe(fields_86))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_7, 1),
                        () -> {
                            __core__chooseList(fields_86, true, false)
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
    __module__CapoDelegateHelpers__PendingDelegateChange[]__is_valid_data = (data_133) -> {
        __core__chooseData(data_133, () -> {
            false
        }, () -> {
            false
        }, () -> {
            fields_87 = __core__unListData__safe(data_133);
            __core__chooseList(fields_87, () -> {
                false
            }, () -> {
                head_49 = __core__headList__safe(fields_87);
                __core__ifThenElse(
                    __module__CapoDelegateHelpers__PendingDelegateAction[]__is_valid_data(__module__CapoDelegateHelpers__PendingDelegateAction[]__Add__is_valid_data_1, __module__CapoDelegateHelpers__PendingDelegateAction[]__Remove__is_valid_data_1, __module__CapoDelegateHelpers__PendingDelegateAction[]__Replace__is_valid_data_1)(head_49),
                    () -> {
                        fields_88 = __core__tailList__safe(fields_87);
                        __core__chooseList(fields_88, () -> {
                            false
                        }, () -> {
                            head_50 = __core__headList__safe(fields_88);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__DelegateRole[]__is_valid_data(__module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data_1)(head_50),
                                () -> {
                                    fields_89 = __core__tailList__safe(fields_88);
                                    __core__chooseList(fields_89, () -> {
                                        false
                                    }, () -> {
                                        head_51 = __core__headList__safe(fields_89);
                                        __core__ifThenElse(
                                            __helios__option[__helios__string]__is_valid_data(head_51),
                                            () -> {
                                                fields_90 = __core__tailList__safe(fields_89);
                                                __core__chooseList(fields_90, () -> {
                                                    false
                                                }, () -> {
                                                    head_52 = __core__headList__safe(fields_90);
                                                    __core__ifThenElse(
                                                        __helios__option[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_52),
                                                        () -> {
                                                            fields_91 = __core__tailList__safe(fields_90);
                                                            __core__chooseList(fields_91, true, false)
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
    __helios__list[__helios__txinput]__any = (self_92) -> {
        (fn_18) -> {
            __helios__common__any(self_92, (item_5) -> {
                fn_18(__helios__txinput__from_data(item_5))
            })
        }
    };
    __module__CapoHelpers__ManifestEntryType[]__is_valid_data = (__module__CapoHelpers__ManifestEntryType[]__NamedTokenRef__is_valid_data, __module__CapoHelpers__ManifestEntryType[]__DgDataPolicy__is_valid_data, __module__CapoHelpers__ManifestEntryType[]__DelegateThreads__is_valid_data, __module__CapoHelpers__ManifestEntryType[]__MerkleMembership__is_valid_data, __module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot__is_valid_data) -> {
        (data_134) -> {
            __core__ifThenElse(
                __module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot__is_valid_data(data_134),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoHelpers__ManifestEntryType[]__MerkleMembership__is_valid_data(data_134),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoHelpers__ManifestEntryType[]__DelegateThreads__is_valid_data(data_134),
                                () -> {
                                    true
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoHelpers__ManifestEntryType[]__DgDataPolicy__is_valid_data(data_134),
                                        () -> {
                                            true
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoHelpers__ManifestEntryType[]__NamedTokenRef__is_valid_data(data_134),
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
    __module__CapoHelpers__ManifestEntryType[]__NamedTokenRef__is_valid_data_1 = (data_135) -> {
        __core__chooseData(data_135, () -> {
            pair_46 = __core__unConstrData__safe(data_135);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_46), 0),
                () -> {
                    data_136 = __core__listData(__core__sndPair(pair_46));
                    __core__chooseData(data_136, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_92 = __core__unListData__safe(data_136);
                        __core__chooseList(fields_92, true, false)
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
    __module__CapoHelpers__ManifestEntryType[]__DgDataPolicy__is_valid_data_1 = (data_137) -> {
        __core__chooseData(data_137, () -> {
            pair_47 = __core__unConstrData__safe(data_137);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_47), 1),
                () -> {
                    data_138 = __core__listData(__core__sndPair(pair_47));
                    __core__chooseData(data_138, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_93 = __core__unListData__safe(data_138);
                        __core__chooseList(fields_93, () -> {
                            false
                        }, () -> {
                            head_53 = __core__headList__safe(fields_93);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_53),
                                () -> {
                                    fields_94 = __core__tailList__safe(fields_93);
                                    __core__chooseList(fields_94, () -> {
                                        false
                                    }, () -> {
                                        head_54 = __core__headList__safe(fields_94);
                                        __core__ifThenElse(
                                            __helios__string__is_valid_data(head_54),
                                            () -> {
                                                fields_95 = __core__tailList__safe(fields_94);
                                                __core__chooseList(fields_95, () -> {
                                                    false
                                                }, () -> {
                                                    head_55 = __core__headList__safe(fields_95);
                                                    __core__ifThenElse(
                                                        __helios__int__is_valid_data(head_55),
                                                        () -> {
                                                            fields_96 = __core__tailList__safe(fields_95);
                                                            __core__chooseList(fields_96, true, false)
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
    __module__CapoHelpers__ManifestEntryType[]__DelegateThreads__is_valid_data_1 = (data_139) -> {
        __core__chooseData(data_139, () -> {
            pair_48 = __core__unConstrData__safe(data_139);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_48), 2),
                () -> {
                    data_140 = __core__listData(__core__sndPair(pair_48));
                    __core__chooseData(data_140, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_97 = __core__unListData__safe(data_140);
                        __core__chooseList(fields_97, () -> {
                            false
                        }, () -> {
                            head_56 = __core__headList__safe(fields_97);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__DelegateRole[]__is_valid_data(__module__CapoDelegateHelpers__DelegateRole[]__MintDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__MintInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt__is_valid_data_1, __module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly__is_valid_data_1)(head_56),
                                () -> {
                                    fields_98 = __core__tailList__safe(fields_97);
                                    __core__chooseList(fields_98, () -> {
                                        false
                                    }, () -> {
                                        head_57 = __core__headList__safe(fields_98);
                                        __core__ifThenElse(
                                            __helios__int__is_valid_data(head_57),
                                            () -> {
                                                fields_99 = __core__tailList__safe(fields_98);
                                                __core__chooseList(fields_99, true, false)
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
    __module__CapoHelpers__ManifestEntryType[]__MerkleMembership__is_valid_data_1 = (data_141) -> {
        __core__chooseData(data_141, () -> {
            pair_49 = __core__unConstrData__safe(data_141);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_49), 3),
                () -> {
                    data_142 = __core__listData(__core__sndPair(pair_49));
                    __core__chooseData(data_142, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_100 = __core__unListData__safe(data_142);
                        __core__chooseList(fields_100, true, false)
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
    __module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot__is_valid_data_1 = (data_143) -> {
        __core__chooseData(data_143, () -> {
            pair_50 = __core__unConstrData__safe(data_143);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_50), 4),
                () -> {
                    data_144 = __core__listData(__core__sndPair(pair_50));
                    __core__chooseData(data_144, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_101 = __core__unListData__safe(data_144);
                        __core__chooseList(fields_101, true, false)
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
    __helios__option[__helios__mintingpolicyhash]__is_valid_data = (data_145) -> {
        __core__chooseData(data_145, () -> {
            pair_51 = __core__unConstrData__safe(data_145);
            index_8 = __core__fstPair(pair_51);
            fields_102 = __core__sndPair(pair_51);
            __core__ifThenElse(
                __core__equalsInteger(index_8, 0),
                () -> {
                    __core__chooseList(fields_102, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_102), () -> {
                            __helios__mintingpolicyhash__is_valid_data(__core__headList__safe(fields_102))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_8, 1),
                        () -> {
                            __core__chooseList(fields_102, true, false)
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
    __module__CapoHelpers__CapoManifestEntry[]__is_valid_data = (data_146) -> {
        __core__ifThenElse(
            __helios__common__test_mStruct_field(data_146, __core__bData(\#6d7068), __helios__option[__helios__mintingpolicyhash]__is_valid_data),
            () -> {
                __core__ifThenElse(
                    __helios__common__test_mStruct_field(data_146, __core__bData(\#746e), __helios__bytearray__is_valid_data),
                    () -> {
                        __core__ifThenElse(
                            __helios__common__test_mStruct_field(data_146, __core__bData(\#747065), __module__CapoHelpers__ManifestEntryType[]__is_valid_data(__module__CapoHelpers__ManifestEntryType[]__NamedTokenRef__is_valid_data_1, __module__CapoHelpers__ManifestEntryType[]__DgDataPolicy__is_valid_data_1, __module__CapoHelpers__ManifestEntryType[]__DelegateThreads__is_valid_data_1, __module__CapoHelpers__ManifestEntryType[]__MerkleMembership__is_valid_data_1, __module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot__is_valid_data_1)),
                            () -> {
                                true
                            },
                            () -> {
                                __core__trace("Warning: invalid CapoManifestEntry data", () -> {
                                    false
                                })()
                            }
                        )()
                    },
                    () -> {
                        __core__trace("Warning: invalid CapoManifestEntry data", () -> {
                            false
                        })()
                    }
                )()
            },
            () -> {
                __core__trace("Warning: invalid CapoManifestEntry data", () -> {
                    false
                })()
            }
        )()
    };
    __helios__map[__helios__mintingpolicyhash@__helios__map[__helios__bytearray@__helios__int]]__filter = (self_93) -> {
        (fn_19) -> {
            __helios__common__filter_map(self_93, (pair_52) -> {
                fn_19(__helios__mintingpolicyhash__from_data(__core__fstPair(pair_52)), __helios__map[__helios__bytearray@__helios__int]__from_data(__core__sndPair(pair_52)))
            })
        }
    };
    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal = (lst_12) -> {
        recurse_63 = (recurse_62, lst_13) -> {
            __core__chooseList(lst_13, () -> {
                true
            }, () -> {
                __core__ifThenElse(
                    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__headList__safe(lst_13)),
                    () -> {
                        recurse_62(recurse_62, __core__tailList__safe(lst_13))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_63(recurse_63, lst_12)
    };
    __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_147) -> {
        __core__chooseData(data_147, () -> {
            false
        }, () -> {
            false
        }, () -> {
            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(__core__unListData__safe(data_147))
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal = (map_16) -> {
        recurse_65 = (recurse_64, map_17) -> {
            __core__chooseList(map_17, () -> {
                true
            }, () -> {
                head_58 = __core__headList__safe(map_17);
                __core__ifThenElse(
                    __helios__string__is_valid_data(__core__fstPair(head_58)),
                    () -> {
                        __core__ifThenElse(
                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(__core__sndPair(head_58)),
                            () -> {
                                recurse_64(recurse_64, __core__tailList__safe(map_17))
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
        recurse_65(recurse_65, map_16)
    };
    __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data = (data_148) -> {
        __core__chooseData(data_148, () -> {
            false
        }, () -> {
            __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data_internal(__core__unMapData__safe(data_148))
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__map[__helios__string@__module__CapoHelpers__CapoManifestEntry[]]__is_valid_data_internal = (map_18) -> {
        recurse_67 = (recurse_66, map_19) -> {
            __core__chooseList(map_19, () -> {
                true
            }, () -> {
                head_59 = __core__headList__safe(map_19);
                __core__ifThenElse(
                    __helios__string__is_valid_data(__core__fstPair(head_59)),
                    () -> {
                        __core__ifThenElse(
                            __module__CapoHelpers__CapoManifestEntry[]__is_valid_data(__core__sndPair(head_59)),
                            () -> {
                                recurse_66(recurse_66, __core__tailList__safe(map_19))
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
        recurse_67(recurse_67, map_18)
    };
    __helios__map[__helios__string@__module__CapoHelpers__CapoManifestEntry[]]__is_valid_data = (data_149) -> {
        __core__chooseData(data_149, () -> {
            false
        }, () -> {
            __helios__map[__helios__string@__module__CapoHelpers__CapoManifestEntry[]]__is_valid_data_internal(__core__unMapData__safe(data_149))
        }, () -> {
            false
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __helios__list[__module__CapoDelegateHelpers__PendingDelegateChange[]]__is_valid_data_internal = (lst_14) -> {
        recurse_69 = (recurse_68, lst_15) -> {
            __core__chooseList(lst_15, () -> {
                true
            }, () -> {
                __core__ifThenElse(
                    __module__CapoDelegateHelpers__PendingDelegateChange[]__is_valid_data(__core__headList__safe(lst_15)),
                    () -> {
                        recurse_68(recurse_68, __core__tailList__safe(lst_15))
                    },
                    () -> {
                        false
                    }
                )()
            })()
        };
        recurse_69(recurse_69, lst_14)
    };
    __helios__list[__module__CapoDelegateHelpers__PendingDelegateChange[]]__is_valid_data = (data_150) -> {
        __core__chooseData(data_150, () -> {
            false
        }, () -> {
            false
        }, () -> {
            __helios__list[__module__CapoDelegateHelpers__PendingDelegateChange[]]__is_valid_data_internal(__core__unListData__safe(data_150))
        }, () -> {
            false
        }, () -> {
            false
        })()
    };
    __module__CapoHelpers__CapoDatum[]__CharterData__is_valid_data = (data_151) -> {
        __core__chooseData(data_151, () -> {
            pair_53 = __core__unConstrData__safe(data_151);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_53), 0),
                () -> {
                    data_152 = __core__listData(__core__sndPair(pair_53));
                    __core__chooseData(data_152, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_103 = __core__unListData__safe(data_152);
                        __core__chooseList(fields_103, () -> {
                            false
                        }, () -> {
                            head_60 = __core__headList__safe(fields_103);
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_60),
                                () -> {
                                    fields_104 = __core__tailList__safe(fields_103);
                                    __core__chooseList(fields_104, () -> {
                                        false
                                    }, () -> {
                                        head_61 = __core__headList__safe(fields_104);
                                        __core__ifThenElse(
                                            __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_61),
                                            () -> {
                                                fields_105 = __core__tailList__safe(fields_104);
                                                __core__chooseList(fields_105, () -> {
                                                    false
                                                }, () -> {
                                                    head_62 = __core__headList__safe(fields_105);
                                                    __core__ifThenElse(
                                                        __helios__map[__helios__string@__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_62),
                                                        () -> {
                                                            fields_106 = __core__tailList__safe(fields_105);
                                                            __core__chooseList(fields_106, () -> {
                                                                false
                                                            }, () -> {
                                                                head_63 = __core__headList__safe(fields_106);
                                                                __core__ifThenElse(
                                                                    __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_63),
                                                                    () -> {
                                                                        fields_107 = __core__tailList__safe(fields_106);
                                                                        __core__chooseList(fields_107, () -> {
                                                                            false
                                                                        }, () -> {
                                                                            head_64 = __core__headList__safe(fields_107);
                                                                            __core__ifThenElse(
                                                                                __helios__list[__module__CapoDelegateHelpers__RelativeDelegateLink[]]__is_valid_data(head_64),
                                                                                () -> {
                                                                                    fields_108 = __core__tailList__safe(fields_107);
                                                                                    __core__chooseList(fields_108, () -> {
                                                                                        false
                                                                                    }, () -> {
                                                                                        head_65 = __core__headList__safe(fields_108);
                                                                                        __core__ifThenElse(
                                                                                            __module__CapoDelegateHelpers__RelativeDelegateLink[]__is_valid_data(head_65),
                                                                                            () -> {
                                                                                                fields_109 = __core__tailList__safe(fields_108);
                                                                                                __core__chooseList(fields_109, () -> {
                                                                                                    false
                                                                                                }, () -> {
                                                                                                    head_66 = __core__headList__safe(fields_109);
                                                                                                    __core__ifThenElse(
                                                                                                        __helios__map[__helios__string@__module__CapoHelpers__CapoManifestEntry[]]__is_valid_data(head_66),
                                                                                                        () -> {
                                                                                                            fields_110 = __core__tailList__safe(fields_109);
                                                                                                            __core__chooseList(fields_110, () -> {
                                                                                                                false
                                                                                                            }, () -> {
                                                                                                                head_67 = __core__headList__safe(fields_110);
                                                                                                                __core__ifThenElse(
                                                                                                                    __helios__list[__module__CapoDelegateHelpers__PendingDelegateChange[]]__is_valid_data(head_67),
                                                                                                                    () -> {
                                                                                                                        fields_111 = __core__tailList__safe(fields_110);
                                                                                                                        __core__chooseList(fields_111, true, false)
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
    __module__CapoHelpers__CapoDatum[]__CharterData__from_data = (data_153) -> {
        ignore_4 = __core__ifThenElse(
            __module__CapoHelpers__CapoDatum[]__CharterData__is_valid_data(data_153),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid CharterData data", ())
            }
        )();
        data_153
    };
    __module__CapoHelpers__CapoDatum[]__CharterData____to_data = __helios__common__identity;
    __module__CapoHelpers__CapoDatum[]__CharterData__mintDelegateLink = (self_94) -> {
        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__enum_field_3(self_94))
    };
    __module__CapoHelpers__cctx_CharterInputType[]____to_data = __helios__common__identity;
    __module__CapoHelpers__cctx_CharterInputType[]__is_valid_data = (__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data, __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data) -> {
        (data_154) -> {
            __core__ifThenElse(
                __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data(data_154),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data(data_154),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data(data_154),
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
    __module__CapoHelpers__cctx_CharterInputType[]__from_data = (__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_1) -> {
        (data_155) -> {
            ignore_5 = __core__ifThenElse(
                __module__CapoHelpers__cctx_CharterInputType[]__is_valid_data(__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data_1, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_1)(data_155),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid cctx_CharterInputType data", ())
                }
            )();
            data_155
        }
    };
    __module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_2 = (data_156) -> {
        __core__chooseData(data_156, () -> {
            pair_54 = __core__unConstrData__safe(data_156);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_54), 0),
                () -> {
                    data_157 = __core__listData(__core__sndPair(pair_54));
                    __core__chooseData(data_157, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_112 = __core__unListData__safe(data_157);
                        __core__chooseList(fields_112, true, false)
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
    __module__CapoHelpers__cctx_CharterInputType[]__RefInput____is = (data_158) -> {
        __helios__common__enum_tag_equals(data_158, 1)
    };
    __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data_2 = (data_159) -> {
        __core__chooseData(data_159, () -> {
            pair_55 = __core__unConstrData__safe(data_159);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_55), 1),
                () -> {
                    data_160 = __core__listData(__core__sndPair(pair_55));
                    __core__chooseData(data_160, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_113 = __core__unListData__safe(data_160);
                        __core__chooseList(fields_113, () -> {
                            false
                        }, () -> {
                            head_68 = __core__headList__safe(fields_113);
                            __core__ifThenElse(
                                __module__CapoHelpers__CapoDatum[]__CharterData__is_valid_data(head_68),
                                () -> {
                                    fields_114 = __core__tailList__safe(fields_113);
                                    __core__chooseList(fields_114, () -> {
                                        false
                                    }, () -> {
                                        head_69 = __core__headList__safe(fields_114);
                                        __core__ifThenElse(
                                            __helios__txinput__is_valid_data(head_69),
                                            () -> {
                                                fields_115 = __core__tailList__safe(fields_114);
                                                __core__chooseList(fields_115, true, false)
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
    __module__CapoHelpers__cctx_CharterInputType[]__RefInput__datum = (self_95) -> {
        __module__CapoHelpers__CapoDatum[]__CharterData__from_data(__helios__common__enum_field_0(self_95))
    };
    __module__CapoHelpers__cctx_CharterInputType[]__RefInput____new = (datum, utxo) -> {
        __core__constrData(1, __core__mkCons(__module__CapoHelpers__CapoDatum[]__CharterData____to_data(datum), __core__mkCons(__helios__txinput____to_data(utxo), __core__mkNilData(()))))
    };
    __module__CapoHelpers__cctx_CharterInputType[]__Input____is = (data_161) -> {
        __helios__common__enum_tag_equals(data_161, 2)
    };
    __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_2 = (data_162) -> {
        __core__chooseData(data_162, () -> {
            pair_56 = __core__unConstrData__safe(data_162);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_56), 2),
                () -> {
                    data_163 = __core__listData(__core__sndPair(pair_56));
                    __core__chooseData(data_163, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_116 = __core__unListData__safe(data_163);
                        __core__chooseList(fields_116, () -> {
                            false
                        }, () -> {
                            head_70 = __core__headList__safe(fields_116);
                            __core__ifThenElse(
                                __module__CapoHelpers__CapoDatum[]__CharterData__is_valid_data(head_70),
                                () -> {
                                    fields_117 = __core__tailList__safe(fields_116);
                                    __core__chooseList(fields_117, () -> {
                                        false
                                    }, () -> {
                                        head_71 = __core__headList__safe(fields_117);
                                        __core__ifThenElse(
                                            __helios__txinput__is_valid_data(head_71),
                                            () -> {
                                                fields_118 = __core__tailList__safe(fields_117);
                                                __core__chooseList(fields_118, true, false)
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
    __module__CapoHelpers__cctx_CharterInputType[]__Input__datum = (self_96) -> {
        __module__CapoHelpers__CapoDatum[]__CharterData__from_data(__helios__common__enum_field_0(self_96))
    };
    __module__CapoHelpers__getRefCharterUtxo = (mph_12) -> {
        chVal = __module__StellarHeliosHelpers__tvCharter(mph_12);
        hasCharter = (txin) -> {
            __helios__value__contains(__helios__txinput__value(txin))(chVal)
        };
        __core__chooseUnit(__helios__print("getting ref_input for charter"), (charterUtxo) -> {
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
                    __core__chooseUnit(__helios__print("expected charter value"), __core__chooseUnit(__helios__print(__helios__value__show(chVal)()), __core__chooseUnit(__helios__print(""), __helios__error("Missing charter in required ref_inputs (use tcxWithCharterRef(tcx) in txn building functions)"))))
                }
            }
        )()(__cond_7)))
    };
    __module__CapoHelpers__getTxCharterData = (mph_13, __useopt__refInputs, refInputs) -> {
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
            ctd = __helios__common__assert_constr_index(__module__CapoHelpers__CapoDatum[]__CharterData__from_data(__helios__txoutputdatum__inline(__helios__txinput__datum(charterUtxo_1))), 0);
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
    __helios__option[__helios__txinput]__is_valid_data = (data_164) -> {
        __core__chooseData(data_164, () -> {
            pair_57 = __core__unConstrData__safe(data_164);
            index_9 = __core__fstPair(pair_57);
            fields_119 = __core__sndPair(pair_57);
            __core__ifThenElse(
                __core__equalsInteger(index_9, 0),
                () -> {
                    __core__chooseList(fields_119, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_119), () -> {
                            __helios__txinput__is_valid_data(__core__headList__safe(fields_119))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_9, 1),
                        () -> {
                            __core__chooseList(fields_119, true, false)
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
    __module__CapoHelpers__DelegateInput[]__link = (self_97) -> {
        __module__CapoDelegateHelpers__RelativeDelegateLink[]__from_data(__helios__common__struct_field_0(self_97))
    };
    __helios__option[__helios__txinput]__from_data = (data_165) -> {
        __4 = __core__ifThenElse(
            __helios__option[__helios__txinput]__is_valid_data(data_165),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid option data", ())
            }
        )();
        data_165
    };
    __module__CapoHelpers__DelegateInput[]__input = (self_98) -> {
        __helios__option[__helios__txinput]__from_data(__helios__common__struct_field_3(self_98))
    };
    __module__CapoHelpers__DelegateInput[]__mph = (self_99) -> {
        __helios__mintingpolicyhash__from_data(__helios__common__struct_field_4(self_99))
    };
    __helios__option[__helios__txinput]____to_data = __helios__common__identity;
    __module__CapoHelpers__DelegateInput[]____new = (link, role, idPrefix, input, mph_14) -> {
        __core__mkCons(__module__CapoDelegateHelpers__RelativeDelegateLink[]____to_data(link), __core__mkCons(__module__CapoDelegateHelpers__DelegateRole[]____to_data(role), __core__mkCons(__helios__option[__helios__string]____to_data(idPrefix), __core__mkCons(__helios__option[__helios__txinput]____to_data(input), __core__mkCons(__helios__mintingpolicyhash____to_data(mph_14), __core__mkNilData(()))))))
    };
    __helios__list[__helios__data]__length = __helios__common__length;
    __helios__option[__helios__txinput]__unwrap = (self_100) -> {
        () -> {
            __helios__txinput__from_data(__helios__common__enum_field_0(self_100))
        }
    };
    __module__CapoHelpers__DelegateInput[]__genericDelegateActivityAsData = (self_101) -> {
        () -> {
            i_6 = __helios__option[__helios__txinput]__unwrap(__module__CapoHelpers__DelegateInput[]__input(self_101))();
            inputData = __module__StellarHeliosHelpers__mustFindInputRedeemer(i_6);
            __core__chooseUnit(__cond_10 = inputData;
            __core__ifThenElse(
                __helios__data__constrdata____is(__cond_10),
                () -> {
                    (__lhs_0_19) -> {
                        index_10 = __helios__data__constrdata__tag(__lhs_0_19);
                        fields_120 = __helios__data__constrdata__fields(__lhs_0_19);
                        __core__chooseUnit(__helios__print(__helios__string____add("    --🐞 generic delegate activity at index ", __helios__int__show(index_10)())), __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add("    ---- from input id:", __helios__txid__show(__helios__txoutputid__tx_id(__helios__txinput__output_id(i_6)))()), "🔹\#"), __helios__int__show(__helios__txoutputid__index(__helios__txinput__output_id(i_6)))())), __core__chooseUnit(__helios__print(__helios__string____add("       = ", __helios__value__show(__helios__txinput__value(i_6))())), __core__chooseUnit(__helios__assert(__helios__int____eq(index_10, index_10), "no way"), __helios__assert(__helios__int____gt(__helios__list[__helios__data]__length(fields_120), 0), "no way")))))
                    }
                },
                () -> {
                    (__5) -> {
                        ()
                    }
                }
            )()(__cond_10), inputData)
        }
    };
    __module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1 = (__module__CapoHelpers__DelegateInput[]__genericDelegateActivity) -> {
        (self_102) -> {
            () -> {
                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)(__module__CapoHelpers__DelegateInput[]__genericDelegateActivityAsData(self_102)())
            }
        }
    };
    __module__CapoHelpers__DelegateInput[]__requiresValidOutput = (self_103) -> {
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
            __module__CapoDelegateHelpers__linkHasValidOutput(__module__CapoHelpers__DelegateInput[]__link(self_103), __module__CapoHelpers__DelegateInput[]__mph(self_103), true, true, true, createdOrReturned_3)
        }
    };
    __module__CapoHelpers__CapoCtx[]__mph = (self_104) -> {
        __helios__mintingpolicyhash__from_data(__helios__common__struct_field_0(self_104))
    };
    __module__CapoHelpers__CapoCtx[]__charter = (self_105) -> {
        __module__CapoHelpers__cctx_CharterInputType[]__from_data(__module__CapoHelpers__cctx_CharterInputType[]__Unk__is_valid_data_2, __module__CapoHelpers__cctx_CharterInputType[]__RefInput__is_valid_data_2, __module__CapoHelpers__cctx_CharterInputType[]__Input__is_valid_data_2)(__helios__common__struct_field_1(self_105))
    };
    __module__CapoHelpers__CapoCtx[]____new = (mph_15, charter) -> {
        __core__mkCons(__helios__mintingpolicyhash____to_data(mph_15), __core__mkCons(__module__CapoHelpers__cctx_CharterInputType[]____to_data(charter), __core__mkNilData(())))
    };
    __module__CapoHelpers__CapoCtx[]__requiresMintDelegateInput = (__module__CapoHelpers__CapoCtx[]__getCharterData, __module__CapoHelpers__CapoCtx[]__requiresDelegateInput) -> {
        (self_106) -> {
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
                dgtLink = __module__CapoHelpers__CapoDatum[]__CharterData__mintDelegateLink(__module__CapoHelpers__CapoCtx[]__getCharterData(self_106)());
                __module__CapoHelpers__CapoCtx[]__requiresDelegateInput(self_106)(dgtLink, __module__CapoDelegateHelpers__DelegateRole[]__MintDgt____new(), true, required_5, false, ())
            }
        }
    };
    __module__CapoHelpers__CapoCtx[]__getCharterData_1 = (self_107) -> {
        () -> {
            __cond_11 = __module__CapoHelpers__CapoCtx[]__charter(self_107);
            __core__ifThenElse(
                __module__CapoHelpers__cctx_CharterInputType[]__RefInput____is(__cond_11),
                () -> {
                    (__lhs_0_21) -> {
                        datum_2 = __module__CapoHelpers__cctx_CharterInputType[]__RefInput__datum(__lhs_0_21);
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
                            (__6) -> {
                                __helios__error("CapoCtx.getCharterData(): unknown charter strategy; use result of withCharterInput(), withCharterRef(), or needsCharter() to resolve charter datum first")
                            }
                        }
                    )()
                }
            )()(__cond_11)
        }
    };
    __helios__option[__helios__string]__none____new = () -> {
        __helios__option__NONE
    };
    __module__CapoHelpers__CapoCtx[]__requiresDelegateInput_1 = (self_108) -> {
        (dgtLink_1, role_1, __useopt__required_3, required_6, __useopt__idPrefix, idPrefix_1) -> {
            required_7 = __core__ifThenElse(
                __useopt__required_3,
                () -> {
                    required_6
                },
                () -> {
                    true
                }
            )();
            idPrefix_2 = __core__ifThenElse(
                __useopt__idPrefix,
                () -> {
                    idPrefix_1
                },
                () -> {
                    __helios__option[__helios__string]__none____new()
                }
            )();
            __module__CapoHelpers__DelegateInput[]____new(dgtLink_1, role_1, idPrefix_2, __module__CapoDelegateHelpers__RelativeDelegateLink[]__hasDelegateInput(dgtLink_1)(__helios__tx__inputs(__helios__scriptcontext__tx), __module__CapoHelpers__CapoCtx[]__mph(self_108), true, required_7), __module__CapoHelpers__CapoCtx[]__mph(self_108))
        }
    };
    __module__CapoHelpers__CapoCtx[]__withCharterRef = (self_109) -> {
        () -> {
            __core__chooseUnit(__module__StellarHeliosHelpers__REQT("requires the charter to be referenced in the txn, but unspent", false, ()), charter_1 = __module__CapoHelpers__CapoCtx[]__charter(self_109);
            __cond_12 = charter_1;
            __core__ifThenElse(
                __module__CapoHelpers__cctx_CharterInputType[]__RefInput____is(__cond_12),
                () -> {
                    (__lhs_0_25) -> {
                        self_109
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
                                __lhs_0_23 = self_109;
                                mph_16 = __module__CapoHelpers__CapoCtx[]__mph(__lhs_0_23);
                                utxo_1 = __module__CapoHelpers__getRefCharterUtxo(mph_16);
                                datum_3 = __helios__common__assert_constr_index(__module__CapoHelpers__CapoDatum[]__CharterData__from_data(__helios__txoutputdatum__inline(__helios__txinput__datum(utxo_1))), 0);
                                __module__CapoHelpers__CapoCtx[]____new(mph_16, __module__CapoHelpers__cctx_CharterInputType[]__RefInput____new(datum_3, utxo_1))
                            }
                        }
                    )()
                }
            )()(__cond_12))
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
                __core__chooseUnit(__helios__print(" - expected seedUtxo: "), __core__chooseUnit(__helios__print(__helios__txoutputid__show(seedUtxo)()), __core__chooseUnit(__helios__print(""), __helios__assert(false, "missing expected seed input for minting"))))
            },
            () -> {
                () -> {
                    ()
                }()
            }
        )(), __core__chooseUnit(__helios__print("  -- has seed -> ok"), true))
    };
    __module__CapoMintHelpers__noOtherActivitiesSupported = (__7) -> {
        __core__chooseUnit(__helios__print("yikes, expected DelegateLifecycleActivities:ReplacingMe or authorizingDelegate  "), __core__chooseUnit(__helios__print("   -- note: for other cases, the checkMintDgtActivity( (AbstractDelegateActivitiesEnum) -> Bool): option can providecontext-specific checks"), __core__chooseUnit(__helios__assert(false, "unexpected delegate activity"), false)))
    };
    __helios__option[__helios__data]__none____is = (data_166) -> {
        __helios__common__enum_tag_equals(data_166, 1)
    };
    __helios__option[__helios__data]__some__some = (self_110) -> {
        __helios__data__from_data(__helios__common__enum_field_0(self_110))
    };
    __helios__map[__helios__scriptpurpose@__helios__data]__get_safe = (self_111) -> {
        (key_12) -> {
            __helios__common__map_get(self_111, __helios__scriptpurpose____to_data(key_12), (x_3) -> {
                __core__constrData(0, __helios__common__list_1(x_3))
            }, () -> {
                __core__constrData(1, __helios__common__list_0)
            })
        }
    };
    __module__CapoMintHelpers__requiresDelegateAuthorizingMint = (delegateLink_1, mph_18, __useopt__extraMintDelegateRedeemerCheck, extraMintDelegateRedeemerCheck, __useopt__checkMintDgtActivity, checkMintDgtActivity) -> {
        extraMintDelegateRedeemerCheck_1 = __core__ifThenElse(
            __useopt__extraMintDelegateRedeemerCheck,
            () -> {
                extraMintDelegateRedeemerCheck
            },
            () -> {
                true
            }
        )();
        checkMintDgtActivity_1 = __core__ifThenElse(
            __useopt__checkMintDgtActivity,
            () -> {
                checkMintDgtActivity
            },
            () -> {
                __module__CapoMintHelpers__noOtherActivitiesSupported
            }
        )();
        authzVal = __helios__value__new(__helios__assetclass__new(mph_18, __helios__string__encode_utf8(__module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink_1))()), 1);
        __core__chooseUnit(__module__StellarHeliosHelpers__REQT("requires the charter's mint-delegate to authorize this mint activity", false, ()), __core__chooseUnit(__helios__print(__helios__string____add("  -- finding input dgTkn: ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink_1))), (targetId_1) -> {
            __core__chooseUnit(__helios__print("    -- ✅ ➡️  💁found dgTkn ^"), spendsAuthorityUut = __helios__map[__helios__scriptpurpose@__helios__data]__find_key(__helios__tx__redeemers(__helios__scriptcontext__tx))((purpose_1) -> {
                __cond_14 = purpose_1;
                __core__ifThenElse(
                    __helios__scriptpurpose__spending____is(__cond_14),
                    () -> {
                        (sp_1) -> {
                            __helios__txoutputid____eq(__helios__scriptpurpose__spending__output_id(sp_1), targetId_1)
                        }
                    },
                    () -> {
                        (__8) -> {
                            false
                        }
                    }
                )()(__cond_14)
            });
            err = __helios__string____add(__helios__string____add("dgTkn ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink_1)), " not being spent as expected");
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
                        activity = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)(x_5);
                        __cond_16 = activity;
                        __core__ifThenElse(
                            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities____is(__cond_16),
                            () -> {
                                (__lhs_0_29) -> {
                                    DLA = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__activity(__lhs_0_29);
                                    __core__chooseUnit(__module__StellarHeliosHelpers__TODO("VERIFY we ---------------- don't need the funny redeemer-check skipping"), __core__chooseUnit(__core__ifThenElse(
                                        __helios__bool____not(extraMintDelegateRedeemerCheck_1),
                                        () -> {
                                            __core__chooseUnit(__helios__print(" vvv wherever it is, probably best it uses the checkMintDgtActivity option"), __helios__error("where is extraMintDelegateRedeemerCheck=false really needed?"))
                                        },
                                        () -> {
                                            () -> {
                                                ()
                                            }()
                                        }
                                    )(), __cond_17 = DLA;
                                    __core__ifThenElse(
                                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is(__cond_17),
                                        () -> {
                                            (__lhs_0_32) -> {
                                                __core__chooseUnit(__helios__print("  -- ok, dgTkn spent"), true)
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
                                    )()(__cond_17)))
                                }
                            },
                            () -> {
                                (__9) -> {
                                    checkMintDgtActivity_1(activity)
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
                    __helios__error(__helios__string____add("  ❌❌ missing dgTkn ", __module__CapoDelegateHelpers__RelativeDelegateLink[]__uutName(delegateLink_1)))
                }
            }
        )()(__cond_13))))
    };
    __helios__list[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]]__all = (self_112) -> {
        (fn_20) -> {
            __helios__common__all(self_112, (item_6) -> {
                fn_20(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__from_data(__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__SpendingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MintingActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__BurningActivities__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CreatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__UpdatingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DeletingDelegatedData__is_valid_data_2, __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__MultipleDelegateActivities__is_valid_data_2)(item_6))
            })
        }
    };
    __helios__list[__helios__data]__map[__module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]] = (self_113) -> {
        (fn_21) -> {
            __helios__common__map(self_113, (item_7) -> {
                __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]____to_data(fn_21(__helios__data__from_data(item_7)))
            }, __core__mkNilData(()))
        }
    };
    __module__CapoMintHelpers__requiresMintDelegateApproval = (mph_19) -> {
        cctx = __module__CapoHelpers__CapoCtx[]__withCharterRef(__module__CapoHelpers__mkCapoCtx(mph_19))();
        __core__chooseUnit(__helios__print("Minter needs mintDgt + mint activity"), __core__chooseUnit(__module__StellarHeliosHelpers__REQT("EXPECTS the application-specific mintDelegate to explicitly check and approve the full minted value", false, ()), __core__chooseUnit(__helios__print("    -- ^ e.g. assert(tx.minted.get_policy(mph) == expectedMintedValue);"), __core__chooseUnit(__helios__print("    ---- (if it's only responsible for one minting policy)"), __core__chooseUnit(__module__StellarHeliosHelpers__TODO("must enforce minting invariants"), mintDgtInput = __module__CapoHelpers__CapoCtx[]__requiresMintDelegateInput(__module__CapoHelpers__CapoCtx[]__getCharterData_1, __module__CapoHelpers__CapoCtx[]__requiresDelegateInput_1)(cctx)(false, ());
        mintDgtActivity = __module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1(__module__CapoHelpers__DelegateInput[]__genericDelegateActivity_1)(mintDgtInput)();
        __cond_18 = mintDgtActivity;
        __core__ifThenElse(
            __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities____is(__cond_18),
            () -> {
                (__lhs_0_54) -> {
                    CLA = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__CapoLifecycleActivities__activity(__lhs_0_54);
                    __cond_21 = CLA;
                    __core__ifThenElse(
                        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate____is(__cond_21),
                        () -> {
                            (__lhs_0_58) -> {
                                __core__chooseUnit(__module__StellarHeliosHelpers__TODO("make this obsolete: generic creatingDelegate (use queuePendingDgtChange and committingPendingDgtChanges in sequence)"), __helios__bool__and(() -> {
                                    __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())
                                }, () -> {
                                    true
                                }))
                            }
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingDgtChange____is(__cond_21),
                                () -> {
                                    (__lhs_0_57) -> {
                                        __core__chooseUnit(__helios__print("  -- ok: mintDgt using CapoLifecycle.queuePendingDgtChange)"), __helios__bool__and(() -> {
                                            __module__CapoHelpers__DelegateInput[]__requiresValidOutput(mintDgtInput)(false, ())
                                        }, () -> {
                                            true
                                        }))
                                    }
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate____is(__cond_21),
                                        () -> {
                                            (__lhs_0_56) -> {
                                                __helios__error("invalid forcingNewSpendDelegate activity on mintDgt (escape-hatch reserved for Minter/Capo pair)")
                                            }
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate____is(__cond_21),
                                                () -> {
                                                    (__lhs_0_55) -> {
                                                        __helios__error("invalid forcingNewMintDelegate activity on mintDgt (escape-hatch reserved for Minter/Capo pair)")
                                                    }
                                                },
                                                () -> {
                                                    (__10) -> {
                                                        __helios__error("mint dgt can only approve CapoLifecycleActivities.queuePendingDgtChange or non-CLA activities")
                                                    }
                                                }
                                            )()
                                        }
                                    )()
                                }
                            )()
                        }
                    )()(__cond_21)
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
                                    DLA_1 = __module__CapoDelegateHelpers__AbstractDelegateActivitiesEnum[]__DelegateLifecycleActivities__activity(__lhs_0_49);
                                    __cond_20 = DLA_1;
                                    __core__ifThenElse(
                                        __module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe____is(__cond_20),
                                        () -> {
                                            (__lhs_0_52) -> {
                                                __core__chooseUnit(__module__StellarHeliosHelpers__TODO("relay delegate installation sequence"), __core__chooseUnit(__helios__print("  -- TEMPORARY: the mint delegate is being replaced"), true))
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
                                            __core__chooseUnit(__helios__print("  -- app-specific minting; trust mintDgt"), __helios__bool__and(() -> {
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
    __helios__map[__helios__bytearray@__helios__int]__for_each = (self_114) -> {
        (fn_22) -> {
            recurse_71 = (recurse_70, map_20) -> {
                __core__chooseList(map_20, () -> {
                    ()
                }, () -> {
                    head_72 = __core__headList__safe(map_20);
                    __core__chooseUnit(fn_22(__helios__bytearray__from_data(__core__fstPair(head_72)), __helios__int__from_data(__core__sndPair(head_72))), recurse_70(recurse_70, __core__tailList__safe(map_20)))
                })()
            };
            recurse_71(recurse_71, self_114)
        }
    };
    __helios__list[__helios__bytearray]____to_data = __core__listData;
    __helios__list[__helios__bytearray]____eq = (self_115, other_2) -> {
        __core__equalsData(__helios__list[__helios__bytearray]____to_data(self_115), __helios__list[__helios__bytearray]____to_data(other_2))
    };
    __helios__map[__helios__bytearray@__helios__int]__fold[__helios__list[__helios__bytearray]] = (self_116) -> {
        (fn_23, z_2) -> {
            __helios__common__fold(self_116, (z_3, pair_58) -> {
                fn_23(z_3, __helios__bytearray__from_data(__core__fstPair(pair_58)), __helios__int__from_data(__core__sndPair(pair_58)))
            }, z_2)
        }
    };
    __helios__option[__helios__bytearray]__none____is = (data_167) -> {
        __helios__common__enum_tag_equals(data_167, 1)
    };
    __helios__list[__helios__bytearray]__prepend = (self_117) -> {
        (item_8) -> {
            __core__mkCons(__helios__bytearray____to_data(item_8), self_117)
        }
    };
    __helios__list[__helios__bytearray]__find_safe = (self_118) -> {
        (fn_24) -> {
            __helios__common__find_safe(self_118, (item_9) -> {
                fn_24(__helios__bytearray__from_data(item_9))
            }, __helios__common__identity)
        }
    };
    __helios__value__sum[__helios__value] = (self_119) -> {
        recurse_73 = (recurse_72, lst_16) -> {
            __core__chooseList(lst_16, () -> {
                __helios__value__ZERO
            }, () -> {
                __helios__value____add(__helios__value__value(__helios__value__from_data(__core__headList__safe(lst_16))), recurse_72(recurse_72, __core__tailList__safe(lst_16)))
            })()
        };
        recurse_73(recurse_73, self_119)
    };
    __helios__list[__helios__string]__map[__helios__value] = (self_120) -> {
        (fn_25) -> {
            __helios__common__map(self_120, (item_10) -> {
                __helios__value____to_data(fn_25(__helios__string__from_data(item_10)))
            }, __core__mkNilData(()))
        }
    };
    __helios__list[__helios__string]__sort = (self_121) -> {
        (comp_4) -> {
            __helios__common__sort(self_121, (a_14, b_14) -> {
                comp_4(__helios__string__from_data(a_14), __helios__string__from_data(b_14))
            })
        }
    };
    __module__CapoMintHelpers__validateUutMinting = (mph_20, seed_1, purposes, __useopt__mkTokenName, mkTokenName, __useopt__bootstrapCharter, bootstrapCharter, __useopt__otherMintedValue, otherMintedValue, __useopt__needsMintDelegateApproval, needsMintDelegateApproval, __useopt__extraMintDelegateRedeemerCheck_1, extraMintDelegateRedeemerCheck_2, __useopt__checkMintDgtActivity_1, checkMintDgtActivity_2) -> {
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
        checkMintDgtActivity_3 = __core__ifThenElse(
            __useopt__checkMintDgtActivity_1,
            () -> {
                checkMintDgtActivity_2
            },
            () -> {
                __module__CapoMintHelpers__noOtherActivitiesSupported
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
                    __lhs_0_59 = __helios__common__assert_constr_index(__module__CapoHelpers__getTxCharterData(mph_20, false, ()), 0);
                    mintDgt = __module__CapoHelpers__CapoDatum[]__CharterData__mintDelegateLink(__lhs_0_59);
                    __core__ifThenElse(
                        needsMintDelegateApproval_1,
                        () -> {
                            __module__CapoMintHelpers__requiresDelegateAuthorizingMint(mintDgt, mph_20, true, extraMintDelegateRedeemerCheck_3, true, checkMintDgtActivity_3)
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
                __core__chooseUnit(__helios__print("  -- no mint from our policy at (mph, valueMinted): ( "), __core__chooseUnit(__helios__print(__helios__mintingpolicyhash__show(mph_20)()), __core__chooseUnit(__helios__print(__helios__value__show(valueMinted)()), __core__chooseUnit(__helios__print(")"), __helios__error("validateUutMinting(): no mint")))))
            },
            () -> {
                () -> {
                    __helios__assert(true, "no")
                }()
            }
        )(), __core__chooseUnit(__helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add("-- uut-minting seed: ", __helios__txid__show(__helios__txoutputid__tx_id(seed_1))()), "🔹\#"), __helios__int__show(__helios__txoutputid__index(seed_1))()), "")), __core__chooseUnit(__helios__map[__helios__bytearray@__helios__int]__for_each(__helios__value__get_policy(expectedValue)(mph_20))((b_19, i_10) -> {
            __helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add("    ℹ️ 🐞 expected: ", __helios__int__show(i_10)()), "x "), __helios__bytearray__decode_utf8(b_19)()), ""))
        }), actualMint = __helios__value__get_policy(valueMinted)(mph_20);
        __core__chooseUnit(__core__ifThenElse(
            true,
            () -> {
                __core__chooseUnit(__helios__map[__helios__bytearray@__helios__int]__for_each(actualMint)((b_18, i_9) -> {
                    __helios__print(__helios__string____add(__helios__string____add(__helios__string____add(__helios__string____add("    ℹ️ 🐞   actual: ", __helios__int__show(i_9)()), "x "), __helios__bytearray__decode_utf8(b_18)()), ""))
                }), __core__chooseUnit(__helios__print(__helios__value__show(__helios__value__from_map(__helios__map[__helios__mintingpolicyhash@__helios__map[__helios__bytearray@__helios__int]]__filter(__helios__value__to_map(valueMinted)())((b_17, __11) -> {
                    __helios__mintingpolicyhash____neq(b_17, mph_20)
                })))()), __helios__print("^ other policy values minted ")))
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
                    (__lhs_0_61) -> {
                        __helios__list[__helios__bytearray]__prepend(l)(b_16)
                    }
                },
                () -> {
                    (__lhs_0_60) -> {
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
        __core__chooseUnit(__helios__assert(expectationsMet, "mismatch in UUT mint"), __core__chooseUnit(__helios__assert(__module__CapoMintHelpers__hasSeedUtxo(__helios__scriptcontext__tx, seed_1), "no seed"), __core__chooseUnit(__helios__print(" ✅ validateUutMinting:  ok!"), __helios__bool__and(() -> {
            delegateApproval
        }, () -> {
            expectationsMet
        })))))))))
    };
    __module__CapoMintHelpers__MinterActivity[]__is_valid_data = (__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data) -> {
        (data_168) -> {
            __core__ifThenElse(
                __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data(data_168),
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data(data_168),
                        () -> {
                            true
                        },
                        () -> {
                            __core__ifThenElse(
                                __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data(data_168),
                                () -> {
                                    true
                                },
                                () -> {
                                    __core__ifThenElse(
                                        __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data(data_168),
                                        () -> {
                                            true
                                        },
                                        () -> {
                                            __core__ifThenElse(
                                                __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data(data_168),
                                                () -> {
                                                    true
                                                },
                                                () -> {
                                                    __core__ifThenElse(
                                                        __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data(data_168),
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
    __module__CapoMintHelpers__MinterActivity[]__from_data = (__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_1) -> {
        (data_169) -> {
            ignore_6 = __core__ifThenElse(
                __module__CapoMintHelpers__MinterActivity[]__is_valid_data(__module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data_1, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_1)(data_169),
                () -> {
                    ()
                },
                () -> {
                    __core__trace("Warning: invalid MinterActivity data", ())
                }
            )();
            data_169
        }
    };
    __module__CapoMintHelpers__MinterActivity[]__mintingCharter____is = (data_170) -> {
        __helios__common__enum_tag_equals(data_170, 0)
    };
    __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_2 = (data_171) -> {
        __core__chooseData(data_171, () -> {
            pair_59 = __core__unConstrData__safe(data_171);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_59), 0),
                () -> {
                    data_172 = __core__listData(__core__sndPair(pair_59));
                    __core__chooseData(data_172, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_121 = __core__unListData__safe(data_172);
                        __core__chooseList(fields_121, () -> {
                            false
                        }, () -> {
                            head_73 = __core__headList__safe(fields_121);
                            __core__ifThenElse(
                                __helios__address__is_valid_data(head_73),
                                () -> {
                                    fields_122 = __core__tailList__safe(fields_121);
                                    __core__chooseList(fields_122, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing____is = (data_173) -> {
        __helios__common__enum_tag_equals(data_173, 1)
    };
    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_2 = (data_174) -> {
        __core__chooseData(data_174, () -> {
            pair_60 = __core__unConstrData__safe(data_174);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_60), 1),
                () -> {
                    data_175 = __core__listData(__core__sndPair(pair_60));
                    __core__chooseData(data_175, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_123 = __core__unListData__safe(data_175);
                        __core__chooseList(fields_123, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_2 = (data_176) -> {
        __core__chooseData(data_176, () -> {
            pair_61 = __core__unConstrData__safe(data_176);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_61), 2),
                () -> {
                    data_177 = __core__listData(__core__sndPair(pair_61));
                    __core__chooseData(data_177, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_124 = __core__unListData__safe(data_177);
                        __core__chooseList(fields_124, () -> {
                            false
                        }, () -> {
                            head_74 = __core__headList__safe(fields_124);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_74),
                                () -> {
                                    fields_125 = __core__tailList__safe(fields_124);
                                    __core__chooseList(fields_125, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_2 = (data_178) -> {
        __core__chooseData(data_178, () -> {
            pair_62 = __core__unConstrData__safe(data_178);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_62), 3),
                () -> {
                    data_179 = __core__listData(__core__sndPair(pair_62));
                    __core__chooseData(data_179, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_126 = __core__unListData__safe(data_179);
                        __core__chooseList(fields_126, () -> {
                            false
                        }, () -> {
                            head_75 = __core__headList__safe(fields_126);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_75),
                                () -> {
                                    fields_127 = __core__tailList__safe(fields_126);
                                    __core__chooseList(fields_127, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data_2 = (data_180) -> {
        __core__chooseData(data_180, () -> {
            pair_63 = __core__unConstrData__safe(data_180);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_63), 4),
                () -> {
                    data_181 = __core__listData(__core__sndPair(pair_63));
                    __core__chooseData(data_181, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_128 = __core__unListData__safe(data_181);
                        __core__chooseList(fields_128, () -> {
                            false
                        }, () -> {
                            head_76 = __core__headList__safe(fields_128);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_76),
                                () -> {
                                    fields_129 = __core__tailList__safe(fields_128);
                                    __core__chooseList(fields_129, true, false)
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
    __helios__option[__helios__bytearray]__is_valid_data = (data_182) -> {
        __core__chooseData(data_182, () -> {
            pair_64 = __core__unConstrData__safe(data_182);
            index_11 = __core__fstPair(pair_64);
            fields_130 = __core__sndPair(pair_64);
            __core__ifThenElse(
                __core__equalsInteger(index_11, 0),
                () -> {
                    __core__chooseList(fields_130, () -> {
                        false
                    }, () -> {
                        __core__chooseList(__core__tailList__safe(fields_130), () -> {
                            __helios__bytearray__is_valid_data(__core__headList__safe(fields_130))
                        }, () -> {
                            false
                        })()
                    })()
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(index_11, 1),
                        () -> {
                            __core__chooseList(fields_130, true, false)
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
    __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_2 = (data_183) -> {
        __core__chooseData(data_183, () -> {
            pair_65 = __core__unConstrData__safe(data_183);
            __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(pair_65), 5),
                () -> {
                    data_184 = __core__listData(__core__sndPair(pair_65));
                    __core__chooseData(data_184, () -> {
                        false
                    }, () -> {
                        false
                    }, () -> {
                        fields_131 = __core__unListData__safe(data_184);
                        __core__chooseList(fields_131, () -> {
                            false
                        }, () -> {
                            head_77 = __core__headList__safe(fields_131);
                            __core__ifThenElse(
                                __helios__txoutputid__is_valid_data(head_77),
                                () -> {
                                    fields_132 = __core__tailList__safe(fields_131);
                                    __core__chooseList(fields_132, () -> {
                                        false
                                    }, () -> {
                                        head_78 = __core__headList__safe(fields_132);
                                        __core__ifThenElse(
                                            __helios__option[__helios__bytearray]__is_valid_data(head_78),
                                            () -> {
                                                fields_133 = __core__tailList__safe(fields_132);
                                                __core__chooseList(fields_133, true, false)
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
    __module__CapoMinter__seedTxn = __helios__txid__from_data(__core__constrData(0, __core__mkCons(__core__bData(\#0000000000000000000000000000000000000000000000000000000000000000), __core__mkNilData(()))));
    __module__CapoMinter__seedIndex = __helios__int__from_data(__core__iData(0));
    __module__CapoMinter__rev = __helios__int__from_data(__core__iData(1));
    __module__CapoMinter__main = (r) -> {
        mph_21 = __helios__scriptcontext__get_current_minting_policy_hash();
        value_minted = __helios__tx__minted(__helios__scriptcontext__tx);
        __core__chooseUnit(__helios__assert(__helios__bool__or(() -> {
            true
        }, () -> {
            __helios__bytearray____eq(__helios__int__serialize(__module__CapoMinter__rev)(), __helios__int__serialize(__module__CapoMinter__rev)())
        }), "no"), __core__chooseUnit(__helios__assert(__helios__bool__or(() -> {
            true
        }, () -> {
            __helios__bytearray____eq(__helios__txid__serialize(__module__CapoMinter__seedTxn)(), __helios__txid__serialize(__module__CapoMinter__seedTxn)())
        }), "no"), __core__chooseUnit(__helios__print(__helios__string____add(" 🚥❓ Capo minter: policy id: ", __helios__mintingpolicyhash__show(__helios__scriptcontext__get_current_minting_policy_hash())())), (ok) -> {
            __core__chooseUnit(__helios__print("🚥🟢 Capo minter: ok!"), ok)
        }(__cond_23 = r;
        __core__ifThenElse(
            __module__CapoMintHelpers__MinterActivity[]__mintingCharter____is(__cond_23),
            () -> {
                (__lhs_0_63) -> {
                    charterVal = __module__StellarHeliosHelpers__mkTv(mph_21, true, "charter", false, (), false, ());
                    authTnBase = "capoGov";
                    mintDgtTnBase = "mintDgt";
                    spendDgtTnBase = "spendDgt";
                    purposes_1 = __core__mkCons(__helios__string____to_data(authTnBase), __core__mkCons(__helios__string____to_data(mintDgtTnBase), __core__mkCons(__helios__string____to_data(spendDgtTnBase), __core__mkNilData(()))));
                    __core__chooseUnit(__helios__print("  -- creating Capo charter"), __core__chooseUnit(__module__StellarHeliosHelpers__REQT("must mint the charter token", false, ()), __core__chooseUnit(__helios__assert(__helios__value____geq(value_minted, charterVal), "charter token not minted"), minterSeed = __helios__txoutputid__new(__module__CapoMinter__seedTxn, __module__CapoMinter__seedIndex);
                    mkUutName = __module__CapoMintHelpers__mkUutTnFactory(minterSeed);
                    __core__chooseUnit(__module__StellarHeliosHelpers__REQT("must mint uuts for mintDgt, spendDgt, and govAuth using the same seed", false, ()), mintsUuts = __module__CapoMintHelpers__validateUutMinting(mph_21, minterSeed, purposes_1, true, mkUutName, true, charterVal, false, (), false, (), false, (), false, ());
                    __core__chooseUnit(__helios__print(__helios__string____add("-- mintsUuts: ", __helios__bool__show(mintsUuts)())), __helios__bool__and(() -> {
                        true
                    }, () -> {
                        mintsUuts
                    }))))))
                }
            },
            () -> {
                __core__ifThenElse(
                    __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing____is(__cond_23),
                    () -> {
                        (__lhs_0_62) -> {
                            __core__chooseUnit(__helios__print("mintWithDelegateAuthorizing"), __module__CapoMintHelpers__requiresMintDelegateApproval(mph_21))
                        }
                    },
                    () -> {
                        (__12) -> {
                            true
                        }
                    }
                )()
            }
        )()(__cond_23)))))
    };
    __core__ifThenElse(
        __module__CapoMinter__main(__module__CapoMintHelpers__MinterActivity[]__from_data(
            __module__CapoMintHelpers__MinterActivity[]__mintingCharter__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__mintWithDelegateAuthorizing__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__addingMintInvariant__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__addingSpendInvariant__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__forcingNewMintDelegate__is_valid_data_2, __module__CapoMintHelpers__MinterActivity[]__CreatingNewSpendDelegate__is_valid_data_2)(__REDEEMER)),
        () -> {
            ()
        },
        () -> {
            __helios__error("validation returned false")
        }
    )()
}
`
    //console.log(unoptimizedIR)

    const uplcProgram0 = compile(unoptimizedIR, {
        optimize: false,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })
    const uplcProgram1 = compile(unoptimizedIR, {
        optimize: true,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })

    const args = [
        makeConstrData(0, []).toCbor(),
        "d8799fd8799f9fd8799fd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa140a1401b000000028fa6ae00d87980d87a80ffffff809fd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa240a1401a00128bbc581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cca1546361706f476f762d65643930353863373663313601d87980d87a80ffd8799fd8799fd87a9f581c91d21b8eda2ee72418c970251d9e0b30b008cfe6f0bbcd34e301ef98ffd87a80ffa240a1401a00179c1a581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cca1546d696e744467742d65643930353863373663313601d87b9fd87a9f9fd8799fd87a9f581cc203839eea509d3dba3c15f0f6241153785ea7619cdc654636fc88aeffd87a80ff581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cc546d696e744467742d656439303538633736633136ffffffd87a80ffd8799fd8799fd87a9f581c91d21b8eda2ee72418c970251d9e0b30b008cfe6f0bbcd34e301ef98ffd87a80ffa240a1401a0017bdc6581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cca1557370656e644467742d65643930353863373663313601d87b9fd87a9f9fd8799fd87a9f581cc203839eea509d3dba3c15f0f6241153785ea7619cdc654636fc88aeffd87a80ff581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cc557370656e644467742d656439303538633736633136ffffffd87a80ffd8799fd8799fd87a9f581cc203839eea509d3dba3c15f0f6241153785ea7619cdc654636fc88aeffd87a80ffa240a1401a002f8c62581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cca1476368617274657201d87b9fd8799f9f557370656e644467742d656439303538633736633136d8799f581c91d21b8eda2ee72418c970251d9e0b30b008cfe6f0bbcd34e301ef98ff5f58407b22726576223a2231222c2269735370656e6444656c6567617465223a747275652c2264656c65676174654e616d65223a226d696e7444656c6567617465222c562269734d696e7444656c6567617465223a747275657dffff80a09f546d696e744467742d656439303538633736633136d8799f581c91d21b8eda2ee72418c970251d9e0b30b008cfe6f0bbcd34e301ef98ff5f58407b22726576223a2231222c2269735370656e6444656c6567617465223a747275652c2264656c65676174654e616d65223a226d696e7444656c6567617465222c562269734d696e7444656c6567617465223a747275657dffff809f546361706f476f762d656439303538633736633136d87a805f58407b22726576223a2231222c226164647248696e74223a5b22616464725f746573743171727030653432703366656c7a6c6379636a71686b7975657875706a65615840617970667261746c7a7034676436367036307276617138387a34376c347376667274677278306c72687472397778616475666a3535737572706a783070736634476a717771225d7dffffa080ffffd87a80ffd8799fd8799fd8799f581cc2fcd5418a73f17f04c4817b139937032cf7a40a47d5fc41aa1bad07ffd8799fd8799fd8799f581c4f1b3a039c55f7eb06246b40ccff8eeb195c6eb78995290e0c3233c3ffffffffa140a1401b000000028f2d54cbd87980d87a80ffffa140a1401a0007e737a240a14000581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312cca4476368617274657201546361706f476f762d65643930353863373663313601546d696e744467742d65643930353863373663313601557370656e644467742d6564393035386337366331360180a0d8799fd8799fd87980d87a80ffd8799fd87b80d87a80ffff80a1d8799f581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312ccffd8799fd8799fd87a9f581cc203839eea509d3dba3c15f0f6241153785ea7619cdc654636fc88aeffd87a80ffffa0d8799f5820e4eb1c812aad514d8a18dbe44ee4dac38eab540883f652ddd123fbec3dec1130ffffd8799f581cc3a22129a59eec88f94fe20cb57da7f1fa698f1b6a3a278d991312ccffff"
    ].map((cbor) => makeUplcDataValue(decodeUplcData(cbor)))

    /**
     * @param {UplcProgramV2} program
     */
    const evalProgram = (program) => {
        const res = program.eval(args, { logOptions: makeBasicUplcLogger() })

        if (isRight(res.result)) {
            console.log("result: ", res.result.right.toString())
            return "result: " + res.result.right.toString()
        } else if (isLeft(res.result)) {
            console.log("error: ", res.result.left.error)
            return "error: " + res.result.left.error
        }
    }

    // the unoptimized is succeeding, the optimized is failing (this is BAD!)
    strictEqual(evalProgram(uplcProgram0), evalProgram(uplcProgram1))
})
