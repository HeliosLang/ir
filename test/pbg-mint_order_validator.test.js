import { strictEqual } from "node:assert"
import { test } from "node:test"
import { isLeft, isRight } from "@helios-lang/type-utils"
import { makeUplcDataValue, decodeUplcData } from "@helios-lang/uplc"
import { DEFAULT_PARSE_OPTIONS, compile } from "../src/index.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcProgramV2} UplcProgramV2
 */

test("PBG::fund_policy::main", () => {
    const src = `(__DATUM, __REDEEMER, __CONTEXT) -> {
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
     __helios__common__any = (self, fn) -> {
         recurse_1 = (recurse, self_1, fn_1) -> {
             __core__chooseList(self_1, () -> {
                 false
             }, () -> {
                 __core__ifThenElse(
                     fn_1(__core__headList__safe(self_1)),
                     () -> {
                         true
                     },
                     () -> {
                         recurse(recurse, __core__tailList__safe(self_1), fn_1)
                     }
                 )()
             })()
         };
         recurse_1(recurse_1, self, fn)
     };
     __helios__common__enum_fields = (self_2) -> {
         __core__sndPair(__core__unConstrData(self_2))
     };
     __helios__common__enum_field_0 = (self_3) -> {
         __core__headList(__helios__common__enum_fields(self_3))
     };
     __helios__tx__inputs = (self_4) -> {
         __core__unListData(__helios__common__enum_field_0(self_4))
     };
     __helios__common__identity = (self_5) -> {
         self_5
     };
     __helios__txinput__from_data = __helios__common__identity;
     __helios__address__credential = __helios__common__enum_field_0;
     __helios__txoutput__address = __helios__common__enum_field_0;
     __helios__common__enum_fields_after_0 = (self_6) -> {
         __core__tailList(__helios__common__enum_fields(self_6))
     };
     __helios__common__enum_field_1 = (self_7) -> {
         __core__headList(__helios__common__enum_fields_after_0(self_7))
     };
     __helios__txinput__output = __helios__common__enum_field_1;
     __helios__txinput__address = (self_8) -> {
         __helios__txoutput__address(__helios__txinput__output(self_8))
     };
     __helios__bytearray__from_data = __core__unBData;
     __helios__pubkeyhash__from_data = __helios__bytearray__from_data;
     __helios__bytearray____to_data = __core__bData;
     __helios__pubkeyhash____to_data = __helios__bytearray____to_data;
     __helios__common__enum_fields_after_1 = (self_9) -> {
         __core__tailList(__helios__common__enum_fields_after_0(self_9))
     };
     __helios__common__enum_fields_after_2 = (self_10) -> {
         __core__tailList(__helios__common__enum_fields_after_1(self_10))
     };
     __helios__common__enum_fields_after_3 = (self_11) -> {
         __core__tailList(__helios__common__enum_fields_after_2(self_11))
     };
     __helios__common__enum_fields_after_4 = (self_12) -> {
         __core__tailList(__helios__common__enum_fields_after_3(self_12))
     };
     __helios__common__enum_fields_after_5 = (self_13) -> {
         __core__tailList(__helios__common__enum_fields_after_4(self_13))
     };
     __helios__common__enum_fields_after_6 = (self_14) -> {
         __core__tailList(__helios__common__enum_fields_after_5(self_14))
     };
     __helios__common__enum_fields_after_7 = (self_15) -> {
         __core__tailList(__helios__common__enum_fields_after_6(self_15))
     };
     __helios__common__enum_field_8 = (self_16) -> {
         __core__headList(__helios__common__enum_fields_after_7(self_16))
     };
     __helios__tx__signatories = (self_17) -> {
         __core__unListData(__helios__common__enum_field_8(self_17))
     };
     __helios__tx__is_signed_by = (self_18) -> {
         (hash) -> {
             hash_1 = __helios__pubkeyhash____to_data(hash);
             __helios__common__any(__helios__tx__signatories(self_18), (signatory) -> {
                 __core__equalsData(signatory, hash_1)
             })
         }
     };
     __helios__tx__is_approved_by = (self_19) -> {
         (cred) -> {
             spends_from_cred = () -> {
                 __helios__common__any(__helios__tx__inputs(self_19), (input_data) -> {
                     input = __helios__txinput__from_data(input_data);
                     input_cred = __helios__address__credential(__helios__txinput__address(input));
                     __core__equalsData(cred, input_cred)
                 })
             };
             pair = __core__unConstrData(cred);
             tag = __core__fstPair(pair);
             __core__ifThenElse(
                 __core__equalsInteger(tag, 0),
                 () -> {
                     pkh = __helios__pubkeyhash__from_data(__core__headList(__core__sndPair(pair)));
                     __core__ifThenElse(
                         __helios__tx__is_signed_by(self_19)(pkh),
                         () -> {
                             true
                         },
                         spends_from_cred
                     )()
                 },
                 spends_from_cred
             )()
         }
     };
     __helios__scriptcontext__data = __CONTEXT;
     __helios__scriptcontext__tx = __helios__common__enum_field_0(__helios__scriptcontext__data);
     __helios__print = (msg_2) -> {
         __core__trace(msg_2, ())
     };
     __helios__string____add = __core__appendString;
     __helios__int__show_digit = (x) -> {
         __core__addInteger(__core__modInteger(x, 10), 48)
     };
     __helios__int__show = (self_20) -> {
         () -> {
             __core__decodeUtf8__safe(recurse_3 = (recurse_2, i, bytes) -> {
                 bytes_1 = __core__consByteString(__helios__int__show_digit(i), bytes);
                 __core__ifThenElse(
                     __core__lessThanInteger(i, 10),
                     () -> {
                         bytes_1
                     },
                     () -> {
                         recurse_2(recurse_2, __core__divideInteger(i, 10), bytes_1)
                     }
                 )()
             };
             __core__ifThenElse(
                 __core__lessThanInteger(self_20, 0),
                 () -> {
                     __core__consByteString(45, recurse_3(recurse_3, __core__multiplyInteger(self_20, -1), \#))
                 },
                 () -> {
                     recurse_3(recurse_3, self_20, \#)
                 }
             )())
         }
     };
     __helios__bool____not = (b) -> {
         __core__ifThenElse(
             b,
             false,
             true
         )
     };
     __helios__int____geq = (a, b_1) -> {
         __helios__bool____not(__core__lessThanInteger(a, b_1))
     };
     __helios__common____eq = __core__equalsData;
     __helios__address____eq = __helios__common____eq;
     __helios__data____eq = __helios__common____eq;
     __helios__int____eq = __core__equalsInteger;
     __helios__ratio__top = (self_21) -> {
         __core__unIData(__core__headList(__core__unListData(self_21)))
     };
     __helios__ratio__bottom = (self_22) -> {
         __core__unIData(__core__headList(__core__tailList(__core__unListData(self_22))))
     };
     __helios__ratio__floor = (self_23) -> {
         () -> {
             top = __helios__ratio__top(self_23);
             bottom = __helios__ratio__bottom(self_23);
             __core__divideInteger(top, bottom)
         }
     };
     __helios__ratio__new_internal = (top_1, bottom_1) -> {
         __core__listData(__core__mkCons(__core__iData(top_1), __core__mkCons(__core__iData(bottom_1), __core__mkNilData(()))))
     };
     __helios__ratio__new = (top_2, bottom_2) -> {
         __core__ifThenElse(
             __core__lessThanInteger(bottom_2, 0),
             () -> {
                 __helios__ratio__new_internal(__core__multiplyInteger(top_2, -1), __core__multiplyInteger(bottom_2, -1))
             },
             () -> {
                 __helios__ratio__new_internal(top_2, bottom_2)
             }
         )()
     };
     __helios__int____mul = __core__multiplyInteger;
     __helios__int____div2 = (a_1, b_2) -> {
         bt = __helios__ratio__top(b_2);
         bb = __helios__ratio__bottom(b_2);
         __helios__ratio__new(__helios__int____mul(a_1, bb), bt)
     };
     __helios__common__enum_tag_equals = (data, i_1) -> {
         __core__equalsInteger(__core__fstPair(__core__unConstrData(data)), i_1)
     };
     __helios__txoutputdatum__inline = (self_24) -> {
         pair_1 = __core__unConstrData(self_24);
         index = __core__fstPair(pair_1);
         fields = __core__sndPair(pair_1);
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
     __helios__common__enum_field_2 = (self_25) -> {
         __core__headList(__helios__common__enum_fields_after_1(self_25))
     };
     __helios__txoutput__datum = __helios__common__enum_field_2;
     __helios__tx__outputs = (self_26) -> {
         __core__unListData(__helios__common__enum_field_2(self_26))
     };
     __helios__bool__and = (a_2, b_3) -> {
         __core__ifThenElse(
             a_2(),
             () -> {
                 b_3()
             },
             () -> {
                 false
             }
         )()
     };
     __helios__int__from_data = __core__unIData;
     __helios__common__mStruct_field_internal = (map, name) -> {
         name_data = __core__bData(name);
         recurse_5 = (recurse_4, map_1) -> {
             __core__chooseList(map_1, () -> {
                 __helios__error(__core__appendString(__core__decodeUtf8__safe(__core__unBData__safe(__core__bData(name))), ": field not found"))
             }, () -> {
                 head = __core__headList__safe(map_1);
                 key = __core__fstPair(head);
                 value = __core__sndPair(head);
                 __core__ifThenElse(
                     __core__equalsData(key, name_data),
                     () -> {
                         value
                     },
                     () -> {
                         recurse_4(recurse_4, __core__tailList__safe(map_1))
                     }
                 )()
             })()
         };
         recurse_5(recurse_5, map)
     };
     __helios__common__mStruct_field = (self_27, name_1) -> {
         __helios__common__mStruct_field_internal(__core__unMapData(self_27), name_1)
     };
     __helios__data__from_data = __helios__common__identity;
     __helios__address__from_data = __helios__common__identity;
     __helios__common__test_mStruct_field = (self_28, name_2, inner_test) -> {
         __core__chooseData(self_28, () -> {
             false
         }, () -> {
             map_2 = __core__unMapData__safe(self_28);
             recurse_7 = (recurse_6, map_3) -> {
                 __core__chooseList(map_3, () -> {
                     __core__trace(__core__appendString("Warning: field not found: ", __core__decodeUtf8__safe(__core__unBData__safe(name_2))), () -> {
                         false
                     })()
                 }, () -> {
                     head_1 = __core__headList__safe(map_3);
                     key_1 = __core__fstPair(head_1);
                     value_1 = __core__sndPair(head_1);
                     __core__ifThenElse(
                         __core__equalsData(key_1, name_2),
                         () -> {
                             inner_test(value_1)
                         },
                         () -> {
                             recurse_6(recurse_6, __core__tailList__safe(map_3))
                         }
                     )()
                 })()
             };
             recurse_7(recurse_7, map_2)
         }, () -> {
             false
         }, () -> {
             false
         }, () -> {
             false
         })()
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
     __helios__string__is_valid_utf8 = (bytes_2) -> {
         n = __core__lengthOfByteString(bytes_2);
         recurse_9 = (recurse_8, i_2) -> {
             __core__ifThenElse(
                 __core__equalsInteger(i_2, n),
                 () -> {
                     true
                 },
                 () -> {
                     b0 = __core__indexByteString__safe(bytes_2, i_2);
                     __core__ifThenElse(
                         __core__lessThanEqualsInteger(b0, 127),
                         () -> {
                             recurse_8(recurse_8, __core__addInteger(i_2, 1))
                         },
                         () -> {
                             __core__ifThenElse(
                                 __core__equalsInteger(__core__divideInteger(b0, 32), 6),
                                 () -> {
                                     inext_2 = __core__addInteger(i_2, 2);
                                     __core__ifThenElse(
                                         __core__lessThanEqualsInteger(inext_2, n),
                                         () -> {
                                             __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_2, __core__addInteger(i_2, 1)), (valid_5, c1_2) -> {
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
                                                                 recurse_8(recurse_8, inext_2)
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
                                             inext_1 = __core__addInteger(i_2, 3);
                                             __core__ifThenElse(
                                                 __core__lessThanEqualsInteger(inext_1, n),
                                                 () -> {
                                                     __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_2, __core__addInteger(i_2, 1)), (valid_3, c1_1) -> {
                                                         __core__ifThenElse(
                                                             valid_3,
                                                             () -> {
                                                                 __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_2, __core__addInteger(i_2, 2)), (valid_4, c2_1) -> {
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
                                                                                     recurse_8(recurse_8, inext_1)
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
                                                     inext = __core__addInteger(i_2, 4);
                                                     __core__ifThenElse(
                                                         __core__lessThanEqualsInteger(inext, n),
                                                         () -> {
                                                             __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_2, __core__addInteger(i_2, 1)), (valid, c1) -> {
                                                                 __core__ifThenElse(
                                                                     valid,
                                                                     () -> {
                                                                         __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_2, __core__addInteger(i_2, 2)), (valid_1, c2) -> {
                                                                             __core__ifThenElse(
                                                                                 valid_1,
                                                                                 () -> {
                                                                                     __helios__string__parse_utf8_cont_byte(__core__indexByteString__safe(bytes_2, __core__addInteger(i_2, 3)), (valid_2, c3) -> {
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
                                                                                                         recurse_8(recurse_8, inext)
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
         recurse_9(recurse_9, 0)
     };
     __helios__string__is_valid_data = (data_1) -> {
         __core__chooseData(data_1, () -> {
             false
         }, () -> {
             false
         }, () -> {
             false
         }, () -> {
             false
         }, () -> {
             __helios__string__is_valid_utf8(__core__unBData__safe(data_1))
         })()
     };
     __helios__int__is_valid_data = (data_2) -> {
         __core__chooseData(data_2, false, false, false, true, false)
     };
     __helios__common__test_list_data = (data_3, fn_2) -> {
         __core__chooseData(data_3, () -> {
             false
         }, () -> {
             false
         }, () -> {
             fn_2(__core__unListData(data_3))
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
     __helios__common__test_list_empty = (list_1) -> {
         __core__chooseList(list_1, true, false)
     };
     __helios__ratio__is_valid_data = (data_4) -> {
         __helios__common__test_list_data(data_4, __helios__common__test_list_head_data(__helios__int__is_valid_data, __helios__common__test_list_head_data((bottom_data) -> {
             __core__chooseData(bottom_data, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 bottom_3 = __core__unIData__safe(bottom_data);
                 __core__ifThenElse(
                     __core__lessThanInteger(0, bottom_3),
                     () -> {
                         true
                     },
                     () -> {
                         false
                     }
                 )()
             }, () -> {
                 false
             })()
         }, __helios__common__test_list_empty)))
     };
     __helios__data__is_valid_data = (data_5) -> {
         true
     };
     __helios__common__test_constr_data_2 = (data_6, index_1, test_a, test_b) -> {
         __core__chooseData(data_6, () -> {
             pair_2 = __core__unConstrData__safe(data_6);
             __core__ifThenElse(
                 __core__equalsInteger(__core__fstPair(pair_2), index_1),
                 () -> {
                     fields_1 = __core__sndPair(pair_2);
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
         (data_7) -> {
             __core__chooseData(data_7, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 bytes_3 = __core__unBData__safe(data_7);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__lengthOfByteString(bytes_3), n_1),
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
     __helios__validatorhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);
     __helios__pubkeyhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);
     __helios__spendingcredential__is_valid_data = (data_8) -> {
         __core__chooseData(data_8, () -> {
             pair_3 = __core__unConstrData__safe(data_8);
             index_2 = __core__fstPair(pair_3);
             fields_2 = __core__sndPair(pair_3);
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
     __helios__stakinghash__is_valid_data = __helios__spendingcredential__is_valid_data;
     __helios__stakingcredential__is_valid_data = (data_9) -> {
         __core__chooseData(data_9, () -> {
             pair_4 = __core__unConstrData__safe(data_9);
             tag_1 = __core__fstPair(pair_4);
             fields_3 = __core__sndPair(pair_4);
             __core__ifThenElse(
                 __core__equalsInteger(tag_1, 0),
                 () -> {
                     __helios__common__test_list_head_data(__helios__stakinghash__is_valid_data, __helios__common__test_list_empty)(fields_3)
                 },
                 () -> {
                     __core__ifThenElse(
                         __core__equalsInteger(tag_1, 1),
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
     __helios__option[__helios__stakingcredential]__is_valid_data = (data_10) -> {
         __core__chooseData(data_10, () -> {
             pair_5 = __core__unConstrData__safe(data_10);
             index_3 = __core__fstPair(pair_5);
             fields_4 = __core__sndPair(pair_5);
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
     __helios__address__is_valid_data = (data_11) -> {
         __helios__common__test_constr_data_2(data_11, 0, __helios__spendingcredential__is_valid_data, __helios__option[__helios__stakingcredential]__is_valid_data)
     };
     __helios__ratio____gt = (a_3, b_4) -> {
         at = __helios__ratio__top(a_3);
         ab = __helios__ratio__bottom(a_3);
         bt_1 = __helios__ratio__top(b_4);
         bb_1 = __helios__ratio__bottom(b_4);
         __core__lessThanInteger(__core__multiplyInteger(bt_1, ab), __core__multiplyInteger(at, bb_1))
     };
     __helios__txinput__datum = (self_29) -> {
         __helios__txoutput__datum(__helios__txinput__output(self_29))
     };
     __helios__common__struct_fields_after_0 = __core__tailList;
     __helios__common__struct_fields_after_1 = (self_30) -> {
         __core__tailList(__helios__common__struct_fields_after_0(self_30))
     };
     __helios__common__struct_fields_after_2 = (self_31) -> {
         __core__tailList(__helios__common__struct_fields_after_1(self_31))
     };
     __helios__common__struct_fields_after_3 = (self_32) -> {
         __core__tailList(__helios__common__struct_fields_after_2(self_32))
     };
     __helios__common__struct_fields_after_4 = (self_33) -> {
         __core__tailList(__helios__common__struct_fields_after_3(self_33))
     };
     __helios__common__struct_fields_after_5 = (self_34) -> {
         __core__tailList(__helios__common__struct_fields_after_4(self_34))
     };
     __helios__common__struct_field_6 = (self_35) -> {
         __core__headList(__helios__common__struct_fields_after_5(self_35))
     };
     __helios__time__is_valid_data = __helios__int__is_valid_data;
     __helios__ratio__from_data = __helios__common__identity;
     __helios__common__struct_field_3 = (self_36) -> {
         __core__headList(__helios__common__struct_fields_after_2(self_36))
     };
     __helios__duration__is_valid_data = __helios__int__is_valid_data;
     __helios__time____geq = __helios__int____geq;
     __helios__tx__ref_inputs = (self_37) -> {
         __core__unListData(__helios__common__enum_field_1(self_37))
     };
     __helios__assetclass____eq = __helios__common____eq;
     __helios__common__list_0 = __core__mkNilData(());
     __helios__common__list_1 = (a_4) -> {
         __core__mkCons(a_4, __helios__common__list_0)
     };
     __helios__common__list_2 = (arg0, arg1) -> {
         __core__mkCons(arg0, __helios__common__list_1(arg1))
     };
     __helios__mintingpolicyhash____to_data = __helios__bytearray____to_data;
     __helios__assetclass__new = (mph, token_name) -> {
         __core__constrData(0, __helios__common__list_2(__helios__mintingpolicyhash____to_data(mph), __helios__bytearray____to_data(token_name)))
     };
     __helios__value__get_singleton_asset_class = (self_38) -> {
         () -> {
             recurse_11 = (recurse_10) -> {
                 (map_4, found, asset_class) -> {
                     __core__chooseList(map_4, () -> {
                         __core__ifThenElse(
                             found,
                             () -> {
                                 asset_class
                             },
                             () -> {
                                 __helios__error("doesn't contain a singleton asset class")
                             }
                         )()
                     }, () -> {
                         head_2 = __core__headList(map_4);
                         tail_1 = __core__tailList(map_4);
                         mph_1 = __core__unBData(__core__fstPair(head_2));
                         __core__ifThenElse(
                             __core__equalsByteString(mph_1, \#),
                             () -> {
                                 recurse_10(recurse_10)(tail_1, found, asset_class)
                             },
                             () -> {
                                 __core__ifThenElse(
                                     found,
                                     () -> {
                                         __helios__error("not singleton, contains multiple assetclasses")
                                     },
                                     () -> {
                                         tokens = __core__unMapData(__core__sndPair(head_2));
                                         __core__chooseList(__core__tailList(tokens), () -> {
                                             first = __core__headList(tokens);
                                             qty = __core__unIData(__core__sndPair(first));
                                             __core__ifThenElse(
                                                 __core__equalsInteger(qty, 1),
                                                 () -> {
                                                     name_3 = __core__unBData(__core__fstPair(first));
                                                     recurse_10(recurse_10)(tail_1, true, __helios__assetclass__new(mph_1, name_3))
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
             recurse_11(recurse_11)(self_38, false, ())
         }
     };
     __helios__txoutput__value = (self_39) -> {
         __core__unMapData(__helios__common__enum_field_1(self_39))
     };
     __helios__txinput__value = (self_40) -> {
         __helios__txoutput__value(__helios__txinput__output(self_40))
     };
     __helios__time__from_data = __helios__int__from_data;
     __helios__common__struct_field_1 = (self_41) -> {
         __core__headList(__helios__common__struct_fields_after_0(self_41))
     };
     __helios__common__struct_field_0 = __core__headList;
     __helios__value__get_policy = (self_42) -> {
         (mph_2) -> {
             mph_3 = __helios__mintingpolicyhash____to_data(mph_2);
             recurse_13 = (recurse_12, map_5) -> {
                 __core__chooseList(map_5, () -> {
                     __helios__error("policy not found")
                 }, () -> {
                     __core__ifThenElse(
                         __core__equalsData(__core__fstPair(__core__headList__safe(map_5)), mph_3),
                         () -> {
                             __core__unMapData(__core__sndPair(__core__headList__safe(map_5)))
                         },
                         () -> {
                             recurse_12(recurse_12, __core__tailList__safe(map_5))
                         }
                     )()
                 })()
             };
             recurse_13(recurse_13, self_42)
         }
     };
     __helios__int____leq = __core__lessThanEqualsInteger;
     __helios__int____neg = (self_43) -> {
         __core__multiplyInteger(self_43, -1)
     };
     __helios__mintingpolicyhash__from_data = __helios__bytearray__from_data;
     __helios__value__delete_policy = (self_44) -> {
         (mph_4) -> {
             recurse_15 = (recurse_14) -> {
                 (map_6) -> {
                     __core__chooseList(map_6, () -> {
                         map_6
                     }, () -> {
                         head_3 = __core__headList(map_6);
                         head_mph = __helios__mintingpolicyhash__from_data(__core__fstPair(head_3));
                         tail_2 = recurse_14(recurse_14)(__core__tailList(map_6));
                         __core__ifThenElse(
                             __core__equalsByteString(mph_4, head_mph),
                             () -> {
                                 tail_2
                             },
                             () -> {
                                 __core__mkCons(head_3, tail_2)
                             }
                         )()
                     })()
                 }
             };
             recurse_15(recurse_15)(self_44)
         }
     };
     __helios__int__to_hex = (self_45) -> {
         () -> {
             recurse_17 = (recurse_16) -> {
                 (self_46, bytes_4) -> {
                     digit = __core__modInteger(self_46, 16);
                     bytes_5 = __core__consByteString(__core__ifThenElse(
                         __core__lessThanInteger(digit, 10),
                         __core__addInteger(digit, 48),
                         __core__addInteger(digit, 87)
                     ), bytes_4);
                     __core__ifThenElse(
                         __core__lessThanInteger(self_46, 16),
                         () -> {
                             bytes_5
                         },
                         () -> {
                             recurse_16(recurse_16)(__core__divideInteger(self_46, 16), bytes_5)
                         }
                     )()
                 }
             };
             __core__decodeUtf8__safe(__core__ifThenElse(
                 __core__lessThanInteger(self_45, 0),
                 () -> {
                     __core__consByteString(45, recurse_17(recurse_17)(__core__multiplyInteger(self_45, -1), \#))
                 },
                 () -> {
                     recurse_17(recurse_17)(self_45, \#)
                 }
             )())
         }
     };
     __helios__bytearray__show = (self_47) -> {
         () -> {
             recurse_19 = (recurse_18, self_48) -> {
                 n_2 = __core__lengthOfByteString(self_48);
                 __core__ifThenElse(
                     __core__lessThanInteger(0, n_2),
                     () -> {
                         __core__appendString(__core__decodeUtf8__safe(hex_bytes = __core__encodeUtf8(__helios__int__to_hex(__core__indexByteString__safe(self_48, 0))());
                         __core__ifThenElse(
                             __core__equalsInteger(__core__lengthOfByteString(hex_bytes), 1),
                             __core__consByteString(48, hex_bytes),
                             hex_bytes
                         )), recurse_18(recurse_18, __core__sliceByteString(1, n_2, self_48)))
                     },
                     () -> {
                         ""
                     }
                 )()
             };
             recurse_19(recurse_19, self_47)
         }
     };
     __helios__mintingpolicyhash__show = __helios__bytearray__show;
     __helios__value__get = (self_49) -> {
         (assetClass) -> {
             mph_5 = __helios__common__enum_field_0(assetClass);
             tokenName = __helios__common__enum_field_1(assetClass);
             outer_1 = (outer, inner, map_7) -> {
                 __core__chooseList(map_7, () -> {
                     __helios__error(__helios__string____add(__helios__string____add("policy ", __helios__mintingpolicyhash__show(__core__unBData(mph_5))()), " not found"))
                 }, () -> {
                     __core__ifThenElse(
                         __core__equalsData(__core__fstPair(__core__headList__safe(map_7)), mph_5),
                         () -> {
                             inner(inner, __core__unMapData(__core__sndPair(__core__headList__safe(map_7))))
                         },
                         () -> {
                             outer(outer, inner, __core__tailList__safe(map_7))
                         }
                     )()
                 })()
             };
             inner_2 = (inner_1, map_8) -> {
                 __core__chooseList(map_8, () -> {
                     __helios__error("tokenName not found")
                 }, () -> {
                     __core__ifThenElse(
                         __core__equalsData(__core__fstPair(__core__headList__safe(map_8)), tokenName),
                         () -> {
                             __core__unIData(__core__sndPair(__core__headList__safe(map_8)))
                         },
                         () -> {
                             inner_1(inner_1, __core__tailList__safe(map_8))
                         }
                     )()
                 })()
             };
             outer_1(outer_1, inner_2, self_49)
         }
     };
     __helios__int____sub = __core__subtractInteger;
     __helios__time____sub1 = __helios__int____sub;
     __helios__timerange__end = (self_50) -> {
         __helios__time__from_data(__helios__common__enum_field_0(__helios__common__enum_field_0(__helios__common__enum_field_1(self_50))))
     };
     __helios__common__enum_field_7 = (self_51) -> {
         __core__headList(__helios__common__enum_fields_after_6(self_51))
     };
     __helios__tx__time_range = __helios__common__enum_field_7;
     __helios__value__get_inner_map_int = (map_9, key_2) -> {
         recurse_21 = (recurse_20, map_10, key_3) -> {
             __core__chooseList(map_10, () -> {
                 0
             }, () -> {
                 __core__ifThenElse(
                     __core__equalsData(__core__fstPair(__core__headList__safe(map_10)), key_3),
                     () -> {
                         __core__unIData(__core__sndPair(__core__headList__safe(map_10)))
                     },
                     () -> {
                         recurse_20(recurse_20, __core__tailList__safe(map_10), key_3)
                     }
                 )()
             })()
         };
         recurse_21(recurse_21, map_9, key_2)
     };
     __helios__value__get_map_keys = (map_11) -> {
         recurse_23 = (recurse_22, map_12) -> {
             __core__chooseList(map_12, () -> {
                 __helios__common__list_0
             }, () -> {
                 __core__mkCons(__core__fstPair(__core__headList__safe(map_12)), recurse_22(recurse_22, __core__tailList__safe(map_12)))
             })()
         };
         recurse_23(recurse_23, map_11)
     };
     __helios__common__is_in_bytearray_list = (lst, key_4) -> {
         __helios__common__any(lst, (item) -> {
             __core__equalsData(item, key_4)
         })
     };
     __helios__common__concat = (a_5, b_5) -> {
         recurse_25 = (recurse_24, lst_1, rem) -> {
             __core__chooseList(rem, () -> {
                 lst_1
             }, () -> {
                 __core__mkCons(__core__headList__safe(rem), recurse_24(recurse_24, lst_1, __core__tailList__safe(rem)))
             })()
         };
         recurse_25(recurse_25, b_5, a_5)
     };
     __helios__value__merge_map_keys = (a_6, b_6) -> {
         aKeys = __helios__value__get_map_keys(a_6);
         recurse_27 = (recurse_26, keys, map_13) -> {
             __core__chooseList(map_13, () -> {
                 __helios__common__list_0
             }, () -> {
                 key_5 = __core__fstPair(__core__headList__safe(map_13));
                 __core__ifThenElse(
                     __helios__common__is_in_bytearray_list(aKeys, key_5),
                     () -> {
                         recurse_26(recurse_26, keys, __core__tailList__safe(map_13))
                     },
                     () -> {
                         __core__mkCons(key_5, recurse_26(recurse_26, keys, __core__tailList__safe(map_13)))
                     }
                 )()
             })()
         };
         uniqueBKeys = recurse_27(recurse_27, aKeys, b_6);
         __helios__common__concat(aKeys, uniqueBKeys)
     };
     __helios__value__add_or_subtract_inner = (op) -> {
         (a_7, b_7) -> {
             recurse_29 = (recurse_28, keys_1, result) -> {
                 __core__chooseList(keys_1, () -> {
                     result
                 }, () -> {
                     key_6 = __core__headList__safe(keys_1);
                     tail_3 = recurse_28(recurse_28, __core__tailList__safe(keys_1), result);
                     sum = op(__helios__value__get_inner_map_int(a_7, key_6), __helios__value__get_inner_map_int(b_7, key_6));
                     __core__ifThenElse(
                         __core__equalsInteger(sum, 0),
                         () -> {
                             tail_3
                         },
                         () -> {
                             __core__mkCons(__core__mkPairData(key_6, __core__iData(sum)), tail_3)
                         }
                     )()
                 })()
             };
             recurse_29(recurse_29, __helios__value__merge_map_keys(a_7, b_7), __core__mkNilPairData(()))
         }
     };
     __helios__value__get_inner_map = (map_14, mph_6) -> {
         recurse_31 = (recurse_30, map_15) -> {
             __core__chooseList(map_15, () -> {
                 __core__mkNilPairData(())
             }, () -> {
                 __core__ifThenElse(
                     __core__equalsData(__core__fstPair(__core__headList__safe(map_15)), mph_6),
                     () -> {
                         __core__unMapData(__core__sndPair(__core__headList__safe(map_15)))
                     },
                     () -> {
                         recurse_30(recurse_30, __core__tailList__safe(map_15))
                     }
                 )()
             })()
         };
         recurse_31(recurse_31, map_14)
     };
     __helios__value__add_or_subtract = (a_8, b_8, op_1) -> {
         recurse_33 = (recurse_32, keys_2, result_1) -> {
             __core__chooseList(keys_2, () -> {
                 result_1
             }, () -> {
                 key_7 = __core__headList__safe(keys_2);
                 tail_4 = recurse_32(recurse_32, __core__tailList__safe(keys_2), result_1);
                 item_1 = __helios__value__add_or_subtract_inner(op_1)(__helios__value__get_inner_map(a_8, key_7), __helios__value__get_inner_map(b_8, key_7));
                 __core__chooseList(item_1, () -> {
                     tail_4
                 }, () -> {
                     __core__mkCons(__core__mkPairData(key_7, __core__mapData(item_1)), tail_4)
                 })()
             })()
         };
         recurse_33(recurse_33, __helios__value__merge_map_keys(a_8, b_8), __core__mkNilPairData(()))
     };
     __helios__value____sub = (a_9, b_9) -> {
         __helios__value__add_or_subtract(a_9, b_9, __core__subtractInteger)
     };
     __helios__scriptcontext__purpose = __helios__common__enum_field_1(__helios__scriptcontext__data);
     __helios__scriptcontext__get_spending_purpose_output_id = () -> {
         __helios__common__enum_field_0(__helios__scriptcontext__purpose)
     };
     __helios__txinput__output_id = __helios__common__enum_field_0;
     __helios__scriptcontext__get_current_input = () -> {
         id = __helios__scriptcontext__get_spending_purpose_output_id();
         recurse_35 = (recurse_34, lst_2) -> {
             __core__chooseList(lst_2, () -> {
                 __helios__error("not found")
             }, () -> {
                 item_2 = __core__headList__safe(lst_2);
                 __core__ifThenElse(
                     __core__equalsData(__helios__txinput__output_id(item_2), id),
                     () -> {
                         item_2
                     },
                     () -> {
                         recurse_34(recurse_34, __core__tailList__safe(lst_2))
                     }
                 )()
             })()
         };
         recurse_35(recurse_35, __helios__tx__inputs(__helios__scriptcontext__tx))
     };
     __helios__value__to_map = (self_52) -> {
         () -> {
             self_52
         }
     };
     __helios__bytearray____eq = __core__equalsByteString;
     __helios__mintingpolicyhash____eq = __helios__bytearray____eq;
     __helios__mintingpolicyhash__new = __helios__common__identity;
     __helios__txoutputdatum__inline____is = (data_12) -> {
         __helios__common__enum_tag_equals(data_12, 2)
     };
     __helios__txoutputdatum__inline__data = __helios__common__enum_field_0;
     __helios__common__all = (self_53, fn_3) -> {
         recurse_37 = (recurse_36, self_54, fn_4) -> {
             __core__chooseList(self_54, () -> {
                 true
             }, () -> {
                 __core__ifThenElse(
                     fn_4(__core__headList__safe(self_54)),
                     () -> {
                         recurse_36(recurse_36, __core__tailList__safe(self_54), fn_4)
                     },
                     () -> {
                         false
                     }
                 )()
             })()
         };
         recurse_37(recurse_37, self_53, fn_3)
     };
     __helios__bytearray__is_valid_data = (data_13) -> {
         __core__chooseData(data_13, false, false, false, false, true)
     };
     __helios__duration__from_data = __helios__int__from_data;
     __helios__common__struct_field_2 = (self_55) -> {
         __core__headList(__helios__common__struct_fields_after_1(self_55))
     };
     __helios__assetclass__ADA = __helios__assetclass__new(\#, \#);
     __helios__value__flatten = (self_56) -> {
         () -> {
             recurse_inner_1 = (recurse_inner) -> {
                 (mph_data, inner_3, tail_5) -> {
                     __core__chooseList(inner_3, () -> {
                         tail_5
                     }, () -> {
                         token_qty = __core__headList(inner_3);
                         token_name_data = __core__fstPair(token_qty);
                         qty_data = __core__sndPair(token_qty);
                         asset_class_1 = __core__constrData(0, __helios__common__list_2(mph_data, token_name_data));
                         entry = __core__mkPairData(asset_class_1, qty_data);
                         __core__mkCons(entry, recurse_inner(recurse_inner)(mph_data, __core__tailList(inner_3), tail_5))
                     })()
                 }
             };
             recurse_outer_1 = (recurse_outer) -> {
                 (outer_2) -> {
                     __core__chooseList(outer_2, () -> {
                         __core__mkNilPairData(())
                     }, () -> {
                         tail_6 = recurse_outer(recurse_outer)(__core__tailList(outer_2));
                         mph_tokens = __core__headList(outer_2);
                         mph_data_1 = __core__fstPair(mph_tokens);
                         tokens_1 = __core__unMapData(__core__sndPair(mph_tokens));
                         __core__ifThenElse(
                             __core__equalsData(mph_data_1, __core__bData(\#)),
                             () -> {
                                 lovelace_data = __core__sndPair(__core__headList(tokens_1));
                                 entry_1 = __core__mkPairData(__helios__assetclass__ADA, lovelace_data);
                                 __core__mkCons(entry_1, tail_6)
                             },
                             () -> {
                                 recurse_inner_1(recurse_inner_1)(mph_data_1, tokens_1, tail_6)
                             }
                         )()
                     })()
                 }
             };
             recurse_outer_1(recurse_outer_1)(self_56)
         }
     };
     __helios__int____add = __core__addInteger;
     __helios__ratio____mul1 = (a_10, b_10) -> {
         at_1 = __helios__ratio__top(a_10);
         ab_1 = __helios__ratio__bottom(a_10);
         new_top = __helios__int____mul(at_1, b_10);
         __helios__ratio__new_internal(new_top, ab_1)
     };
     __helios__assetclass__from_data = __helios__common__identity;
     __helios__int____gt = (a_11, b_11) -> {
         __helios__bool____not(__core__lessThanEqualsInteger(a_11, b_11))
     };
     __helios__value__get_safe = (self_57) -> {
         (assetClass_1) -> {
             mintingPolicyHash = __helios__common__enum_field_0(assetClass_1);
             tokenName_1 = __helios__common__enum_field_1(assetClass_1);
             outer_4 = (outer_3, inner_4, map_16) -> {
                 __core__chooseList(map_16, () -> {
                     0
                 }, () -> {
                     __core__ifThenElse(
                         __core__equalsData(__core__fstPair(__core__headList__safe(map_16)), mintingPolicyHash),
                         () -> {
                             inner_4(inner_4, __core__unMapData(__core__sndPair(__core__headList__safe(map_16))))
                         },
                         () -> {
                             outer_3(outer_3, inner_4, __core__tailList__safe(map_16))
                         }
                     )()
                 })()
             };
             inner_6 = (inner_5, map_17) -> {
                 __core__chooseList(map_17, () -> {
                     0
                 }, () -> {
                     __core__ifThenElse(
                         __core__equalsData(__core__fstPair(__core__headList__safe(map_17)), tokenName_1),
                         () -> {
                             __core__unIData(__core__sndPair(__core__headList__safe(map_17)))
                         },
                         () -> {
                             inner_5(inner_5, __core__tailList__safe(map_17))
                         }
                     )()
                 })()
             };
             outer_4(outer_4, inner_6, self_57)
         }
     };
     __helios__common__find_safe = (self_58, fn_5, callback_1) -> {
         recurse_39 = (recurse_38, self_59, fn_6) -> {
             __core__chooseList(self_59, () -> {
                 __core__constrData(1, __helios__common__list_0)
             }, () -> {
                 head_4 = __core__headList__safe(self_59);
                 __core__ifThenElse(
                     fn_6(head_4),
                     () -> {
                         __core__constrData(0, __helios__common__list_1(callback_1(head_4)))
                     },
                     () -> {
                         recurse_38(recurse_38, __core__tailList__safe(self_59), fn_6)
                     }
                 )()
             })()
         };
         recurse_39(recurse_39, self_58, fn_5)
     };
     __helios__stakingvalidatorhash__is_valid_data = __helios__bytearray__is_valid_data_fixed_length(28);
     __helios__real__is_valid_data = __helios__int__is_valid_data;
     __helios__mintingpolicyhash__is_valid_data = (data_14) -> {
         __core__chooseData(data_14, () -> {
             false
         }, () -> {
             false
         }, () -> {
             false
         }, () -> {
             false
         }, () -> {
             bytes_6 = __core__unBData__safe(data_14);
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
     __helios__bytearray__is_valid_data_max_length = (n_4) -> {
         (data_15) -> {
             __core__chooseData(data_15, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 bytes_7 = __core__unBData__safe(data_15);
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
     __helios__assetclass__is_valid_data = (data_16) -> {
         __helios__common__test_constr_data_2(data_16, 0, __helios__mintingpolicyhash__is_valid_data, __helios__bytearray__is_valid_data_max_length(32))
     };
     __helios__ratio____mul = (a_12, b_12) -> {
         at_2 = __helios__ratio__top(a_12);
         ab_2 = __helios__ratio__bottom(a_12);
         bt_2 = __helios__ratio__top(b_12);
         bb_2 = __helios__ratio__bottom(b_12);
         new_bottom = __helios__int____mul(ab_2, bb_2);
         new_top_1 = __helios__int____mul(at_2, bt_2);
         __helios__ratio__new_internal(new_top_1, new_bottom)
     };
     __helios__common__enum_fields_after_8 = (self_60) -> {
         __core__tailList(__helios__common__enum_fields_after_7(self_60))
     };
     __helios__common__enum_field_9 = (self_61) -> {
         __core__headList(__helios__common__enum_fields_after_8(self_61))
     };
     __helios__tx__redeemers = (self_62) -> {
         __core__unMapData(__helios__common__enum_field_9(self_62))
     };
     __helios__scriptpurpose__new_rewarding = (cred_1) -> {
         __core__constrData(2, __helios__common__list_1(cred_1))
     };
     __helios__stakingcredential__new_hash = (cred_2) -> {
         __core__constrData(0, __helios__common__list_1(cred_2))
     };
     __helios__validatorhash____to_data = __helios__bytearray____to_data;
     __helios__spendingcredential__new_validator = (hash_2) -> {
         __core__constrData(1, __helios__common__list_1(__helios__validatorhash____to_data(hash_2)))
     };
     __helios__stakinghash__new_validator = __helios__spendingcredential__new_validator;
     __helios__common__map_get = (self_63, key_8, fnFound, fnNotFound) -> {
         recurse_41 = (recurse_40, self_64, key_9) -> {
             __core__chooseList(self_64, fnNotFound, () -> {
                 head_5 = __core__headList__safe(self_64);
                 __core__ifThenElse(
                     __core__equalsData(key_9, __core__fstPair(head_5)),
                     () -> {
                         fnFound(__core__sndPair(head_5))
                     },
                     () -> {
                         recurse_40(recurse_40, __core__tailList__safe(self_64), key_9)
                     }
                 )()
             })()
         };
         recurse_41(recurse_41, self_63, key_8)
     };
     __helios__scriptpurpose____to_data = __helios__common__identity;
     __helios__stakingvalidatorhash__from_data = __helios__bytearray__from_data;
     __helios__int__max = (a_13, b_13) -> {
         __core__ifThenElse(
             __core__lessThanInteger(a_13, b_13),
             b_13,
             a_13
         )
     };
     __helios__int__bound_min = (self_65) -> {
         (other) -> {
             __helios__int__max(self_65, other)
         }
     };
     __helios__real__ONE = 1000000;
     __helios__real__floor = (self_66) -> {
         () -> {
             __core__divideInteger(self_66, __helios__real__ONE)
         }
     };
     __helios__int____mul1 = __helios__int____mul;
     __helios__real__from_data = __helios__int__from_data;
     __helios__txoutput__from_data = __helios__common__identity;
     __helios__address__new = (cred_3, staking_cred) -> {
         __core__constrData(0, __helios__common__list_2(cred_3, staking_cred))
     };
     __helios__option__NONE = __core__constrData(1, __helios__common__list_0);
     __helios__address__from_validator = (vh) -> {
         __helios__address__new(__helios__spendingcredential__new_validator(vh), __helios__option__NONE)
     };
     __helios__common__length = (lst_3) -> {
         recurse_43 = (recurse_42, lst_4) -> {
             __core__chooseList(lst_4, () -> {
                 0
             }, () -> {
                 __core__addInteger(recurse_42(recurse_42, __core__tailList__safe(lst_4)), 1)
             })()
         };
         recurse_43(recurse_43, lst_3)
     };
     __helios__value__get_singleton_policy = (self_67) -> {
         () -> {
             __core__chooseList(self_67, () -> {
                 __helios__error("value doesn't contain a policy")
             }, () -> {
                 mph_7 = __helios__mintingpolicyhash__from_data(__core__fstPair(__core__headList(self_67)));
                 tail_7 = __core__tailList(self_67);
                 __core__ifThenElse(
                     __core__equalsByteString(mph_7, \#),
                     () -> {
                         __core__chooseList(tail_7, () -> {
                             __helios__error("value contains only lovelace and no other minting policy")
                         }, () -> {
                             mph_8 = __helios__mintingpolicyhash__from_data(__core__fstPair(__core__headList(tail_7)));
                             __core__chooseList(__core__tailList(tail_7), () -> {
                                 mph_8
                             }, () -> {
                                 __helios__error("value contains more than 1 minting policy")
                             })()
                         })()
                     },
                     () -> {
                         __core__chooseList(tail_7, () -> {
                             mph_7
                         }, () -> {
                             next_mph = __helios__mintingpolicyhash__from_data(__core__fstPair(__core__headList(tail_7)));
                             __core__ifThenElse(
                                 __core__equalsByteString(next_mph, \#),
                                 () -> {
                                     __core__chooseList(__core__tailList(tail_7), () -> {
                                         mph_7
                                     }, () -> {
                                         __helios__error("value contains more than 1 minting policy")
                                     })()
                                 },
                                 () -> {
                                     __helios__error("value contains more than 1 minting policy")
                                 }
                             )()
                         })()
                     }
                 )()
             })()
         }
     };
     __helios__assetclass__mph = (self_68) -> {
         __helios__mintingpolicyhash__from_data(__helios__common__enum_field_0(self_68))
     };
     __helios__mintingpolicyhash__from_script_hash = __helios__common__identity;
     __helios__bytearray____add = __core__appendByteString;
     __helios__string__encode_utf8 = (self_69) -> {
         () -> {
             __core__encodeUtf8(self_69)
         }
     };
     __helios__common__starts_with = (self_70, selfLengthFn) -> {
         (prefix) -> {
             (n_5, m) -> {
                 __core__ifThenElse(
                     __core__lessThanInteger(n_5, m),
                     () -> {
                         false
                     },
                     () -> {
                         __core__equalsByteString(prefix, __core__sliceByteString(0, m, self_70))
                     }
                 )()
             }(selfLengthFn(self_70), __core__lengthOfByteString(prefix))
         }
     };
     __helios__bytearray__starts_with = (self_71) -> {
         __helios__common__starts_with(self_71, __core__lengthOfByteString)
     };
     __helios__cip67__user_token_label = \#000de140;
     __helios__cip67__reference_token_label = \#000643b0;
     __helios__int__parse_digit = (digit_1) -> {
         __core__ifThenElse(
             __core__lessThanEqualsInteger(digit_1, 57),
             () -> {
                 __core__ifThenElse(
                     __core__lessThanEqualsInteger(48, digit_1),
                     () -> {
                         __core__subtractInteger(digit_1, 48)
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
         bytes_8 = __core__encodeUtf8(string);
         n_6 = __core__lengthOfByteString(bytes_8);
         b0_1 = __core__indexByteString(bytes_8, 0);
         recurse_45 = (recurse_44, acc, i_3) -> {
             __core__ifThenElse(
                 __core__equalsInteger(i_3, n_6),
                 () -> {
                     acc
                 },
                 () -> {
                     new_acc = __core__addInteger(__core__multiplyInteger(acc, 10), __helios__int__parse_digit(__core__indexByteString(bytes_8, i_3)));
                     recurse_44(recurse_44, new_acc, __core__addInteger(i_3, 1))
                 }
             )()
         };
         __core__ifThenElse(
             __core__equalsInteger(b0_1, 48),
             () -> {
                 __core__ifThenElse(
                     __core__equalsInteger(n_6, 1),
                     () -> {
                         0
                     },
                     () -> {
                         __helios__error("zero padded integer can't be parsed")
                     }
                 )()
             },
             () -> {
                 __core__ifThenElse(
                     __core__equalsInteger(b0_1, 45),
                     () -> {
                         __core__ifThenElse(
                             __core__equalsInteger(__core__indexByteString(bytes_8, 1), 48),
                             () -> {
                                 __helios__error("-0 not allowed")
                             },
                             () -> {
                                 __core__multiplyInteger(recurse_45(recurse_45, 0, 1), -1)
                             }
                         )()
                     },
                     () -> {
                         recurse_45(recurse_45, 0, 0)
                     }
                 )()
             }
         )()
     };
     __helios__bytearray__decode_utf8 = (self_72) -> {
         () -> {
             __core__decodeUtf8(self_72)
         }
     };
     __helios__common__slice_bytearray = (self_73, selfLengthFn_1) -> {
         (start, end) -> {
             normalize = (pos) -> {
                 __core__ifThenElse(
                     __core__lessThanInteger(pos, 0),
                     () -> {
                         __core__addInteger(__core__addInteger(selfLengthFn_1(self_73), 1), pos)
                     },
                     () -> {
                         pos
                     }
                 )()
             };
             fn_8 = (start_1) -> {
                 fn_7 = (end_1) -> {
                     __core__sliceByteString(start_1, __core__subtractInteger(end_1, __helios__int__max(start_1, 0)), self_73)
                 };
                 fn_7(normalize(end))
             };
             fn_8(normalize(start))
         }
     };
     __helios__bytearray__slice = (self_74) -> {
         __helios__common__slice_bytearray(self_74, __core__lengthOfByteString)
     };
     __helios__bytearray__length = __core__lengthOfByteString;
     __helios__int____to_data = __core__iData;
     __helios__cip67__fungible_token_label = \#0014df10;
     __helios__scripts__config_validator = \#e7582f42ddf89748625b58f5272b0047c21b038d2732aead9a02de9e;
     __helios__scripts__fund_policy = \#b37901c0280d6afdea22e8aab77695d4d3d3124cda611dba2268e7ad;
     __helios__scripts__price_validator = \#ac29f69bbce0ac371ec2d1ea0ed07daa130c21964271e8e1e9d91dbd;
     __helios__scripts__supply_validator = \#d57844b24c6b01987d3abb78fac622e0b8a4bd22dca114a6bed3a23d;
     __helios__scripts__voucher_validator = \#42d81c6c2db917b86c2ff15b92b5681a23bc663d96e3fa586d586505;
     __helios__scriptcontext__current_script = __core__constrData(7, __core__mkNilData(()));
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
     __helios__script__oracle_delegate____is = (__6) -> {
         false
     };
     __helios__script__portfolio_validator____is = (__7) -> {
         false
     };
     __helios__script__price_validator____is = (__8) -> {
         false
     };
     __helios__script__supply_validator____is = (__9) -> {
         false
     };
     __helios__script__reimbursement_validator____is = (__10) -> {
         false
     };
     __helios__script__voucher_validator____is = (__11) -> {
         false
     };
     __helios__script__mint_order_validator____is = (__12) -> {
         true
     };
     __module__AssetModule__Asset[]__is_valid_data = (data_17) -> {
         __core__chooseData(data_17, () -> {
             false
         }, () -> {
             false
         }, () -> {
             fields_5 = __core__unListData__safe(data_17);
             __core__chooseList(fields_5, () -> {
                 false
             }, () -> {
                 head_6 = __core__headList__safe(fields_5);
                 __core__ifThenElse(
                     __helios__assetclass__is_valid_data(head_6),
                     () -> {
                         fields_6 = __core__tailList__safe(fields_5);
                         __core__chooseList(fields_6, () -> {
                             false
                         }, () -> {
                             head_7 = __core__headList__safe(fields_6);
                             __core__ifThenElse(
                                 __helios__int__is_valid_data(head_7),
                                 () -> {
                                     fields_7 = __core__tailList__safe(fields_6);
                                     __core__chooseList(fields_7, () -> {
                                         false
                                     }, () -> {
                                         head_8 = __core__headList__safe(fields_7);
                                         __core__ifThenElse(
                                             __helios__ratio__is_valid_data(head_8),
                                             () -> {
                                                 fields_8 = __core__tailList__safe(fields_7);
                                                 __core__chooseList(fields_8, () -> {
                                                     false
                                                 }, () -> {
                                                     head_9 = __core__headList__safe(fields_8);
                                                     __core__ifThenElse(
                                                         __helios__time__is_valid_data(head_9),
                                                         () -> {
                                                             fields_9 = __core__tailList__safe(fields_8);
                                                             __core__chooseList(fields_9, true, false)
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
     __module__AssetModule__Asset[]__from_data = (data_18) -> {
         ignore = __core__ifThenElse(
             __module__AssetModule__Asset[]__is_valid_data(data_18),
             () -> {
                 ()
             },
             () -> {
                 __core__trace("Warning: invalid Asset data", ())
             }
         )();
         __core__unListData(data_18)
     };
     __module__AssetModule__Asset[]__asset_class = (self_75) -> {
         __helios__assetclass__from_data(__helios__common__struct_field_0(self_75))
     };
     __module__AssetModule__Asset[]__price = (self_76) -> {
         __helios__ratio__from_data(__helios__common__struct_field_2(self_76))
     };
     __module__AssetModule__Asset[]__price_timestamp = (self_77) -> {
         __helios__time__from_data(__helios__common__struct_field_3(self_77))
     };
     __module__TokenNames__dvp_token = __helios__cip67__fungible_token_label;
     __module__TokenNames__assets_prefix = __helios__string__encode_utf8("assets ")();
     __helios__option[__helios__int]__some____new = (some) -> {
         __core__constrData(0, __helios__common__list_1(__helios__int____to_data(some)))
     };
     __helios__option[__helios__int]__none____new = () -> {
         __helios__option__NONE
     };
     __module__TokenNames__parse_series = (prefix_1, token_name_1) -> {
         __core__ifThenElse(
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
     __module__TokenNames__has_assets_prefix = (token_name_2) -> {
         __helios__bytearray__starts_with(token_name_2)(__module__TokenNames__assets_prefix)
     };
     __module__TokenNames__config = __helios__string__encode_utf8("config")();
     __module__TokenNames__price = __helios__string__encode_utf8("price")();
     __module__TokenNames__supply = __helios__string__encode_utf8("supply")();
     __module__TokenNames__voucher_infix = __helios__string__encode_utf8("voucher ")();
     __module__TokenNames__voucher_ref_prefix = __helios__bytearray____add(__helios__cip67__reference_token_label, __module__TokenNames__voucher_infix);
     __module__TokenNames__voucher_nft_prefix = __helios__bytearray____add(__helios__cip67__user_token_label, __module__TokenNames__voucher_infix);
     __module__TokenNames__parse_voucher_nft = (token_name_3) -> {
         __module__TokenNames__parse_series(__module__TokenNames__voucher_nft_prefix, token_name_3)
     };
     __module__TokenNames__has_voucher_nft_prefix = (token_name_4) -> {
         __helios__bytearray__starts_with(token_name_4)(__module__TokenNames__voucher_nft_prefix)
     };
     __module__TokenNames__voucher_ref_1 = (__module__TokenNames__voucher_ref) -> {
         (id_2) -> {
             __helios__bytearray____add(__module__TokenNames__voucher_ref_prefix, __helios__string__encode_utf8(__helios__int__show(id_2)())())
         }
     };
     __module__Tokens__direct_policy = __helios__mintingpolicyhash__from_script_hash(__helios__scripts__fund_policy);
     __module__Tokens__indirect_policy = () -> {
         input_1 = __helios__scriptcontext__get_current_input();
         __helios__assetclass__mph(__helios__value__get_singleton_asset_class(__helios__txinput__value(input_1))())
     };
     (__module__Tokens__policy) -> {
         __module__Tokens__dvp_token = __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__dvp_token);
         __module__Tokens__config = __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__config);
         __module__Tokens__price = __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__price);
         __module__Tokens__supply = __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__supply);
         __module__Tokens__voucher_ref_token = (id_3) -> {
             __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__voucher_ref_1(__module__TokenNames__voucher_ref_1)(id_3))
         };
         __helios__map[__helios__bytearray@__helios__int]__length = (self_78) -> {
             __helios__common__length(self_78)
         };
         __helios__option[__helios__int]__unwrap = (self_79) -> {
             () -> {
                 __helios__int__from_data(__helios__common__enum_field_0(self_79))
             }
         };
         __module__Addresses__config = __helios__address__from_validator(__helios__scripts__config_validator);
         __module__Addresses__price = __helios__address__from_validator(__helios__scripts__price_validator);
         __module__Addresses__supply = __helios__address__from_validator(__helios__scripts__supply_validator);
         __module__Addresses__voucher = __helios__address__from_validator(__helios__scripts__voucher_validator);
         __helios__list[__module__AssetModule__Asset[]]__is_valid_data_internal = (lst_5) -> {
             recurse_47 = (recurse_46, lst_6) -> {
                 __core__chooseList(lst_6, () -> {
                     true
                 }, () -> {
                     __core__ifThenElse(
                         __module__AssetModule__Asset[]__is_valid_data(__core__headList__safe(lst_6)),
                         () -> {
                             recurse_46(recurse_46, __core__tailList__safe(lst_6))
                         },
                         () -> {
                             false
                         }
                     )()
                 })()
             };
             recurse_47(recurse_47, lst_5)
         };
         __helios__list[__module__AssetModule__Asset[]]__from_data = (data_19) -> {
             lst_7 = __core__unListData(data_19);
             __13 = __core__ifThenElse(
                 __helios__list[__module__AssetModule__Asset[]]__is_valid_data_internal(lst_7),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid list data", ())
                 }
             )();
             lst_7
         };
         __module__AssetGroupModule__AssetGroup[]__from_data = __helios__list[__module__AssetModule__Asset[]]__from_data;
         __module__AssetGroupModule__AssetGroup[]__assets = __helios__common__identity;
         __helios__data__as[__module__AssetGroupModule__AssetGroup[]] = (data_20) -> {
             __module__AssetGroupModule__AssetGroup[]__from_data(data_20)
         };
         __helios__list[__helios__txoutput]__find = (self_80) -> {
             (fn_9) -> {
                 recurse_49 = (recurse_48, lst_8) -> {
                     __core__chooseList(lst_8, () -> {
                         __helios__error("not found")
                     }, () -> {
                         item_3 = __helios__txoutput__from_data(__core__headList__safe(lst_8));
                         __core__ifThenElse(
                             fn_9(item_3),
                             () -> {
                                 item_3
                             },
                             () -> {
                                 recurse_48(recurse_48, __core__tailList__safe(lst_8))
                             }
                         )()
                     })()
                 };
                 recurse_49(recurse_49, self_80)
             }
         };
         __module__Tokens__contains_only[__helios__txoutput] = (v, asset_class_2) -> {
             __helios__assetclass____eq(__helios__value__get_singleton_asset_class(__helios__txoutput__value(v))(), asset_class_2)
         };
         __helios__list[__helios__data]__get = (self_81) -> {
             (index_4) -> {
                 recurse_51 = (recurse_50, self_82, i_4) -> {
                     __core__chooseList(self_82, () -> {
                         __helios__error("index out of range")
                     }, () -> {
                         __core__ifThenElse(
                             __core__equalsInteger(index_4, i_4),
                             () -> {
                                 __core__headList__safe(self_82)
                             },
                             () -> {
                                 recurse_50(recurse_50, __core__tailList__safe(self_82), __core__addInteger(i_4, 1))
                             }
                         )()
                     })()
                 };
                 recurse_51(recurse_51, self_81, 0)
             }
         };
         __helios__list[__helios__txinput]__get = (self_83) -> {
             (index_5) -> {
                 __helios__txinput__from_data(__helios__list[__helios__data]__get(self_83)(index_5))
             }
         };
         __module__AssetPtrModule__AssetPtr[]__is_valid_data = (data_21) -> {
             __core__chooseData(data_21, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_10 = __core__unListData__safe(data_21);
                 __core__chooseList(fields_10, () -> {
                     false
                 }, () -> {
                     head_10 = __core__headList__safe(fields_10);
                     __core__ifThenElse(
                         __helios__int__is_valid_data(head_10),
                         () -> {
                             fields_11 = __core__tailList__safe(fields_10);
                             __core__chooseList(fields_11, () -> {
                                 false
                             }, () -> {
                                 head_11 = __core__headList__safe(fields_11);
                                 __core__ifThenElse(
                                     __helios__int__is_valid_data(head_11),
                                     () -> {
                                         fields_12 = __core__tailList__safe(fields_11);
                                         __core__chooseList(fields_12, true, false)
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
         __module__AssetPtrModule__AssetPtr[]__from_data = (data_22) -> {
             ignore_1 = __core__ifThenElse(
                 __module__AssetPtrModule__AssetPtr[]__is_valid_data(data_22),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid AssetPtr data", ())
                 }
             )();
             __core__unListData(data_22)
         };
         __module__AssetPtrModule__AssetPtr[]__group_index = (self_84) -> {
             __helios__int__from_data(__helios__common__struct_field_0(self_84))
         };
         __module__AssetPtrModule__AssetPtr[]__asset_class_index = (self_85) -> {
             __helios__int__from_data(__helios__common__struct_field_1(self_85))
         };
         __helios__map[__helios__bytearray@__helios__int]__any = (self_86) -> {
             (fn_10) -> {
                 fn_11 = (pair_6) -> {
                     fn_10(__helios__bytearray__from_data(__core__fstPair(pair_6)), __helios__int__from_data(__core__sndPair(pair_6)))
                 };
                 __helios__common__any(self_86, fn_11)
             }
         };
         __helios__list[__module__AssetModule__Asset[]]__get = (self_87) -> {
             (index_6) -> {
                 __module__AssetModule__Asset[]__from_data(__helios__list[__helios__data]__get(self_87)(index_6))
             }
         };
         __module__AssetPtrModule__AssetPtr[]__resolve_input = (self_88) -> {
             (inputs, asset_class_3) -> {
                 input_3 = __helios__list[__helios__txinput]__get(inputs)(__module__AssetPtrModule__AssetPtr[]__group_index(self_88));
                 tokens_2 = __helios__value__get_policy(__helios__txinput__value(input_3))(__module__Tokens__policy);
                 __core__chooseUnit(__helios__assert(__helios__map[__helios__bytearray@__helios__int]__any(tokens_2)((token_name_5, __14) -> {
                     __module__TokenNames__has_assets_prefix(token_name_5)
                 }), "assets token not found"), group = __helios__data__as[__module__AssetGroupModule__AssetGroup[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_3)));
                 asset = __helios__list[__module__AssetModule__Asset[]]__get(__module__AssetGroupModule__AssetGroup[]__assets(group))(__module__AssetPtrModule__AssetPtr[]__asset_class_index(self_88));
                 __core__chooseUnit(__helios__assert(__helios__assetclass____eq(__module__AssetModule__Asset[]__asset_class(asset), asset_class_3), "unexpected asset class"), asset))
             }
         };
         __module__SuccessFeeModule__SuccessFeeStep[]__is_valid_data = (data_23) -> {
             __core__chooseData(data_23, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_13 = __core__unListData__safe(data_23);
                 __core__chooseList(fields_13, () -> {
                     false
                 }, () -> {
                     head_12 = __core__headList__safe(fields_13);
                     __core__ifThenElse(
                         __helios__real__is_valid_data(head_12),
                         () -> {
                             fields_14 = __core__tailList__safe(fields_13);
                             __core__chooseList(fields_14, () -> {
                                 false
                             }, () -> {
                                 head_13 = __core__headList__safe(fields_14);
                                 __core__ifThenElse(
                                     __helios__real__is_valid_data(head_13),
                                     () -> {
                                         fields_15 = __core__tailList__safe(fields_14);
                                         __core__chooseList(fields_15, true, false)
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
         __helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data_internal = (lst_9) -> {
             recurse_53 = (recurse_52, lst_10) -> {
                 __core__chooseList(lst_10, () -> {
                     true
                 }, () -> {
                     __core__ifThenElse(
                         __module__SuccessFeeModule__SuccessFeeStep[]__is_valid_data(__core__headList__safe(lst_10)),
                         () -> {
                             recurse_52(recurse_52, __core__tailList__safe(lst_10))
                         },
                         () -> {
                             false
                         }
                     )()
                 })()
             };
             recurse_53(recurse_53, lst_9)
         };
         __helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data = (data_24) -> {
             __core__chooseData(data_24, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 __helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data_internal(__core__unListData__safe(data_24))
             }, () -> {
                 false
             }, () -> {
                 false
             })()
         };
         __module__SuccessFeeModule__SuccessFee[]__is_valid_data = (data_25) -> {
             __core__chooseData(data_25, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_16 = __core__unListData__safe(data_25);
                 __core__chooseList(fields_16, () -> {
                     false
                 }, () -> {
                     head_14 = __core__headList__safe(fields_16);
                     __core__ifThenElse(
                         __helios__real__is_valid_data(head_14),
                         () -> {
                             fields_17 = __core__tailList__safe(fields_16);
                             __core__chooseList(fields_17, () -> {
                                 false
                             }, () -> {
                                 head_15 = __core__headList__safe(fields_17);
                                 __core__ifThenElse(
                                     __helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data(head_15),
                                     () -> {
                                         fields_18 = __core__tailList__safe(fields_17);
                                         __core__chooseList(fields_18, true, false)
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
         __module__ConfigModule__MintFeeConfig[]__is_valid_data = (data_26) -> {
             __core__chooseData(data_26, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_19 = __core__unListData__safe(data_26);
                 __core__chooseList(fields_19, () -> {
                     false
                 }, () -> {
                     head_16 = __core__headList__safe(fields_19);
                     __core__ifThenElse(
                         __helios__real__is_valid_data(head_16),
                         () -> {
                             fields_20 = __core__tailList__safe(fields_19);
                             __core__chooseList(fields_20, () -> {
                                 false
                             }, () -> {
                                 head_17 = __core__headList__safe(fields_20);
                                 __core__ifThenElse(
                                     __helios__int__is_valid_data(head_17),
                                     () -> {
                                         fields_21 = __core__tailList__safe(fields_20);
                                         __core__chooseList(fields_21, true, false)
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
         __module__ConfigModule__MintFeeConfig[]__from_data = (data_27) -> {
             ignore_2 = __core__ifThenElse(
                 __module__ConfigModule__MintFeeConfig[]__is_valid_data(data_27),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid MintFeeConfig data", ())
                 }
             )();
             __core__unListData(data_27)
         };
         __module__ConfigModule__MintFeeConfig[]__relative = (self_89) -> {
             __helios__real__from_data(__helios__common__struct_field_0(self_89))
         };
         __module__ConfigModule__MintFeeConfig[]__minimum = (self_90) -> {
             __helios__int__from_data(__helios__common__struct_field_1(self_90))
         };
         __module__ConfigModule__MintFeeConfig[]__apply = (self_91) -> {
             (n_7) -> {
                 __helios__int__bound_min(__helios__real__floor(__helios__int____mul1(n_7, __module__ConfigModule__MintFeeConfig[]__relative(self_91)))())(__module__ConfigModule__MintFeeConfig[]__minimum(self_91))
             }
         };
         __module__ConfigModule__MintFeeConfig[]__deduct = (self_92) -> {
             (n_8) -> {
                 __helios__int____sub(n_8, __module__ConfigModule__MintFeeConfig[]__apply(self_92)(n_8))
             }
         };
         __module__ConfigModule__BurnFeeConfig[]__is_valid_data = (data_28) -> {
             __core__chooseData(data_28, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_22 = __core__unListData__safe(data_28);
                 __core__chooseList(fields_22, () -> {
                     false
                 }, () -> {
                     head_18 = __core__headList__safe(fields_22);
                     __core__ifThenElse(
                         __helios__real__is_valid_data(head_18),
                         () -> {
                             fields_23 = __core__tailList__safe(fields_22);
                             __core__chooseList(fields_23, () -> {
                                 false
                             }, () -> {
                                 head_19 = __core__headList__safe(fields_23);
                                 __core__ifThenElse(
                                     __helios__int__is_valid_data(head_19),
                                     () -> {
                                         fields_24 = __core__tailList__safe(fields_23);
                                         __core__chooseList(fields_24, true, false)
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
         __module__ConfigModule__ManagementFeeConfig[]__is_valid_data = (data_29) -> {
             __core__chooseData(data_29, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_25 = __core__unListData__safe(data_29);
                 __core__chooseList(fields_25, () -> {
                     false
                 }, () -> {
                     head_20 = __core__headList__safe(fields_25);
                     __core__ifThenElse(
                         __helios__real__is_valid_data(head_20),
                         () -> {
                             fields_26 = __core__tailList__safe(fields_25);
                             __core__chooseList(fields_26, () -> {
                                 false
                             }, () -> {
                                 head_21 = __core__headList__safe(fields_26);
                                 __core__ifThenElse(
                                     __helios__duration__is_valid_data(head_21),
                                     () -> {
                                         fields_27 = __core__tailList__safe(fields_26);
                                         __core__chooseList(fields_27, true, false)
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
         __module__ConfigModule__SuccessFeeConfig[]__is_valid_data = (data_30) -> {
             __core__chooseData(data_30, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_28 = __core__unListData__safe(data_30);
                 __core__chooseList(fields_28, () -> {
                     false
                 }, () -> {
                     head_22 = __core__headList__safe(fields_28);
                     __core__ifThenElse(
                         __module__SuccessFeeModule__SuccessFee[]__is_valid_data(head_22),
                         () -> {
                             fields_29 = __core__tailList__safe(fields_28);
                             __core__chooseList(fields_29, () -> {
                                 false
                             }, () -> {
                                 head_23 = __core__headList__safe(fields_29);
                                 __core__ifThenElse(
                                     __helios__stakingvalidatorhash__is_valid_data(head_23),
                                     () -> {
                                         fields_30 = __core__tailList__safe(fields_29);
                                         __core__chooseList(fields_30, () -> {
                                             false
                                         }, () -> {
                                             head_24 = __core__headList__safe(fields_30);
                                             __core__ifThenElse(
                                                 __helios__int__is_valid_data(head_24),
                                                 () -> {
                                                     fields_31 = __core__tailList__safe(fields_30);
                                                     __core__chooseList(fields_31, true, false)
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
         __module__ConfigModule__SuccessFeeConfig[]__from_data = (data_31) -> {
             ignore_3 = __core__ifThenElse(
                 __module__ConfigModule__SuccessFeeConfig[]__is_valid_data(data_31),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid SuccessFeeConfig data", ())
                 }
             )();
             __core__unListData(data_31)
         };
         __module__ConfigModule__SuccessFeeConfig[]__benchmark = (self_93) -> {
             __helios__stakingvalidatorhash__from_data(__helios__common__struct_field_1(self_93))
         };
         __helios__data__as[__helios__ratio] = (data_32) -> {
             __helios__ratio__from_data(data_32)
         };
         __helios__map[__helios__scriptpurpose@__helios__data]__get = (self_94) -> {
             (key_10) -> {
                 __helios__common__map_get(self_94, __helios__scriptpurpose____to_data(key_10), (x_1) -> {
                     __helios__data__from_data(x_1)
                 }, () -> {
                     __helios__error("key not found")
                 })
             }
         };
         __module__ConfigModule__SuccessFeeConfig[]__get_benchmark_price = (self_95) -> {
             (lovelace_price, __useopt__benchmark, benchmark) -> {
                 benchmark_1 = __core__ifThenElse(
                     __useopt__benchmark,
                     () -> {
                         benchmark
                     },
                     () -> {
                         __module__ConfigModule__SuccessFeeConfig[]__benchmark(self_95)
                     }
                 )();
                 benchmark_price = __helios__data__as[__helios__ratio](__helios__map[__helios__scriptpurpose@__helios__data]__get(__helios__tx__redeemers(__helios__scriptcontext__tx))(__helios__scriptpurpose__new_rewarding(__helios__stakingcredential__new_hash(__helios__stakinghash__new_validator(benchmark_1)))));
                 __helios__ratio____mul(lovelace_price, benchmark_price)
             }
         };
         __module__ConfigModule__FeesConfig[]__is_valid_data = (data_33) -> {
             __core__chooseData(data_33, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_32 = __core__unListData__safe(data_33);
                 __core__chooseList(fields_32, () -> {
                     false
                 }, () -> {
                     head_25 = __core__headList__safe(fields_32);
                     __core__ifThenElse(
                         __module__ConfigModule__MintFeeConfig[]__is_valid_data(head_25),
                         () -> {
                             fields_33 = __core__tailList__safe(fields_32);
                             __core__chooseList(fields_33, () -> {
                                 false
                             }, () -> {
                                 head_26 = __core__headList__safe(fields_33);
                                 __core__ifThenElse(
                                     __module__ConfigModule__BurnFeeConfig[]__is_valid_data(head_26),
                                     () -> {
                                         fields_34 = __core__tailList__safe(fields_33);
                                         __core__chooseList(fields_34, () -> {
                                             false
                                         }, () -> {
                                             head_27 = __core__headList__safe(fields_34);
                                             __core__ifThenElse(
                                                 __module__ConfigModule__ManagementFeeConfig[]__is_valid_data(head_27),
                                                 () -> {
                                                     fields_35 = __core__tailList__safe(fields_34);
                                                     __core__chooseList(fields_35, () -> {
                                                         false
                                                     }, () -> {
                                                         head_28 = __core__headList__safe(fields_35);
                                                         __core__ifThenElse(
                                                             __module__ConfigModule__SuccessFeeConfig[]__is_valid_data(head_28),
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
         __module__ConfigModule__FeesConfig[]__from_data = (data_34) -> {
             ignore_4 = __core__ifThenElse(
                 __module__ConfigModule__FeesConfig[]__is_valid_data(data_34),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid FeesConfig data", ())
                 }
             )();
             __core__unListData(data_34)
         };
         __module__ConfigModule__FeesConfig[]__mint_fee = (self_96) -> {
             __module__ConfigModule__MintFeeConfig[]__from_data(__helios__common__struct_field_0(self_96))
         };
         __module__ConfigModule__FeesConfig[]__success_fee = (self_97) -> {
             __module__ConfigModule__SuccessFeeConfig[]__from_data(__helios__common__struct_field_3(self_97))
         };
         __module__ConfigModule__TokenConfig[]__is_valid_data = (data_35) -> {
             __core__chooseData(data_35, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_37 = __core__unListData__safe(data_35);
                 __core__chooseList(fields_37, () -> {
                     false
                 }, () -> {
                     head_29 = __core__headList__safe(fields_37);
                     __core__ifThenElse(
                         __helios__int__is_valid_data(head_29),
                         () -> {
                             fields_38 = __core__tailList__safe(fields_37);
                             __core__chooseList(fields_38, () -> {
                                 false
                             }, () -> {
                                 head_30 = __core__headList__safe(fields_38);
                                 __core__ifThenElse(
                                     __helios__duration__is_valid_data(head_30),
                                     () -> {
                                         fields_39 = __core__tailList__safe(fields_38);
                                         __core__chooseList(fields_39, true, false)
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
         __module__ConfigModule__TokenConfig[]__from_data = (data_36) -> {
             ignore_5 = __core__ifThenElse(
                 __module__ConfigModule__TokenConfig[]__is_valid_data(data_36),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid TokenConfig data", ())
                 }
             )();
             __core__unListData(data_36)
         };
         __module__ConfigModule__TokenConfig[]__max_price_age = (self_98) -> {
             __helios__duration__from_data(__helios__common__struct_field_1(self_98))
         };
         __module__ConfigModule__GovernanceConfig[]__is_valid_data = (data_37) -> {
             __core__chooseData(data_37, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_40 = __core__unListData__safe(data_37);
                 __core__chooseList(fields_40, () -> {
                     false
                 }, () -> {
                     head_31 = __core__headList__safe(fields_40);
                     __core__ifThenElse(
                         __helios__duration__is_valid_data(head_31),
                         () -> {
                             fields_41 = __core__tailList__safe(fields_40);
                             __core__chooseList(fields_41, () -> {
                                 false
                             }, () -> {
                                 head_32 = __core__headList__safe(fields_41);
                                 __core__ifThenElse(
                                     __helios__stakingvalidatorhash__is_valid_data(head_32),
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
             }, () -> {
                 false
             }, () -> {
                 false
             })()
         };
         __module__ConfigModule__ConfigChangeProposal[]__is_valid_data = (__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMinReimbursement__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data) -> {
             (data_38) -> {
                 __core__ifThenElse(
                     __module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data(data_38),
                     () -> {
                         true
                     },
                     () -> {
                         __core__ifThenElse(
                             __module__ConfigModule__ConfigChangeProposal[]__ChangingMinReimbursement__is_valid_data(data_38),
                             () -> {
                                 true
                             },
                             () -> {
                                 __core__ifThenElse(
                                     __module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data(data_38),
                                     () -> {
                                         true
                                     },
                                     () -> {
                                         __core__ifThenElse(
                                             __module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data(data_38),
                                             () -> {
                                                 true
                                             },
                                             () -> {
                                                 __core__ifThenElse(
                                                     __module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data(data_38),
                                                     () -> {
                                                         true
                                                     },
                                                     () -> {
                                                         __core__ifThenElse(
                                                             __module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data(data_38),
                                                             () -> {
                                                                 true
                                                             },
                                                             () -> {
                                                                 __core__ifThenElse(
                                                                     __module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data(data_38),
                                                                     () -> {
                                                                         true
                                                                     },
                                                                     () -> {
                                                                         __core__ifThenElse(
                                                                             __module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data(data_38),
                                                                             () -> {
                                                                                 true
                                                                             },
                                                                             () -> {
                                                                                 __core__ifThenElse(
                                                                                     __module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data(data_38),
                                                                                     () -> {
                                                                                         true
                                                                                     },
                                                                                     () -> {
                                                                                         __core__ifThenElse(
                                                                                             __module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data(data_38),
                                                                                             () -> {
                                                                                                 true
                                                                                             },
                                                                                             () -> {
                                                                                                 __core__ifThenElse(
                                                                                                     __module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data(data_38),
                                                                                                     () -> {
                                                                                                         true
                                                                                                     },
                                                                                                     () -> {
                                                                                                         __core__ifThenElse(
                                                                                                             __module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data(data_38),
                                                                                                             () -> {
                                                                                                                 true
                                                                                                             },
                                                                                                             () -> {
                                                                                                                 __core__ifThenElse(
                                                                                                                     __module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data(data_38),
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
                                         )()
                                     }
                                 )()
                             }
                         )()
                     }
                 )()
             }
         };
         __module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data_1 = (data_39) -> {
             __core__chooseData(data_39, () -> {
                 pair_7 = __core__unConstrData__safe(data_39);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_7), 0),
                     () -> {
                         data_40 = __core__listData(__core__sndPair(pair_7));
                         __core__chooseData(data_40, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_43 = __core__unListData__safe(data_40);
                             __core__chooseList(fields_43, () -> {
                                 false
                             }, () -> {
                                 head_33 = __core__headList__safe(fields_43);
                                 __core__ifThenElse(
                                     __helios__assetclass__is_valid_data(head_33),
                                     () -> {
                                         fields_44 = __core__tailList__safe(fields_43);
                                         __core__chooseList(fields_44, true, false)
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
         __module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data_1 = (data_41) -> {
             __core__chooseData(data_41, () -> {
                 pair_8 = __core__unConstrData__safe(data_41);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_8), 1),
                     () -> {
                         data_42 = __core__listData(__core__sndPair(pair_8));
                         __core__chooseData(data_42, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_45 = __core__unListData__safe(data_42);
                             __core__chooseList(fields_45, () -> {
                                 false
                             }, () -> {
                                 head_34 = __core__headList__safe(fields_45);
                                 __core__ifThenElse(
                                     __helios__assetclass__is_valid_data(head_34),
                                     () -> {
                                         fields_46 = __core__tailList__safe(fields_45);
                                         __core__chooseList(fields_46, true, false)
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
         __module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data_1 = (data_43) -> {
             __core__chooseData(data_43, () -> {
                 pair_9 = __core__unConstrData__safe(data_43);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_9), 2),
                     () -> {
                         data_44 = __core__listData(__core__sndPair(pair_9));
                         __core__chooseData(data_44, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_47 = __core__unListData__safe(data_44);
                             __core__chooseList(fields_47, () -> {
                                 false
                             }, () -> {
                                 head_35 = __core__headList__safe(fields_47);
                                 __core__ifThenElse(
                                     __helios__duration__is_valid_data(head_35),
                                     () -> {
                                         fields_48 = __core__tailList__safe(fields_47);
                                         __core__chooseList(fields_48, () -> {
                                             false
                                         }, () -> {
                                             head_36 = __core__headList__safe(fields_48);
                                             __core__ifThenElse(
                                                 __helios__stakingvalidatorhash__is_valid_data(head_36),
                                                 () -> {
                                                     fields_49 = __core__tailList__safe(fields_48);
                                                     __core__chooseList(fields_49, () -> {
                                                         false
                                                     }, () -> {
                                                         head_37 = __core__headList__safe(fields_49);
                                                         __core__ifThenElse(
                                                             __module__SuccessFeeModule__SuccessFee[]__is_valid_data(head_37),
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
         __module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data_1 = (data_45) -> {
             __core__chooseData(data_45, () -> {
                 pair_10 = __core__unConstrData__safe(data_45);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_10), 3),
                     () -> {
                         data_46 = __core__listData(__core__sndPair(pair_10));
                         __core__chooseData(data_46, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_51 = __core__unListData__safe(data_46);
                             __core__chooseList(fields_51, () -> {
                                 false
                             }, () -> {
                                 head_38 = __core__headList__safe(fields_51);
                                 __core__ifThenElse(
                                     __helios__int__is_valid_data(head_38),
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
         __module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data_1 = (data_47) -> {
             __core__chooseData(data_47, () -> {
                 pair_11 = __core__unConstrData__safe(data_47);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_11), 4),
                     () -> {
                         data_48 = __core__listData(__core__sndPair(pair_11));
                         __core__chooseData(data_48, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_53 = __core__unListData__safe(data_48);
                             __core__chooseList(fields_53, () -> {
                                 false
                             }, () -> {
                                 head_39 = __core__headList__safe(fields_53);
                                 __core__ifThenElse(
                                     __helios__pubkeyhash__is_valid_data(head_39),
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
         __module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data_1 = (data_49) -> {
             __core__chooseData(data_49, () -> {
                 pair_12 = __core__unConstrData__safe(data_49);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_12), 5),
                     () -> {
                         data_50 = __core__listData(__core__sndPair(pair_12));
                         __core__chooseData(data_50, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_55 = __core__unListData__safe(data_50);
                             __core__chooseList(fields_55, () -> {
                                 false
                             }, () -> {
                                 head_40 = __core__headList__safe(fields_55);
                                 __core__ifThenElse(
                                     __helios__stakingvalidatorhash__is_valid_data(head_40),
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
         __module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data_1 = (data_51) -> {
             __core__chooseData(data_51, () -> {
                 pair_13 = __core__unConstrData__safe(data_51);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_13), 6),
                     () -> {
                         data_52 = __core__listData(__core__sndPair(pair_13));
                         __core__chooseData(data_52, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_57 = __core__unListData__safe(data_52);
                             __core__chooseList(fields_57, () -> {
                                 false
                             }, () -> {
                                 head_41 = __core__headList__safe(fields_57);
                                 __core__ifThenElse(
                                     __helios__stakingvalidatorhash__is_valid_data(head_41),
                                     () -> {
                                         fields_58 = __core__tailList__safe(fields_57);
                                         __core__chooseList(fields_58, () -> {
                                             false
                                         }, () -> {
                                             head_42 = __core__headList__safe(fields_58);
                                             __core__ifThenElse(
                                                 __helios__duration__is_valid_data(head_42),
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
         __module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data_1 = (data_53) -> {
             __core__chooseData(data_53, () -> {
                 pair_14 = __core__unConstrData__safe(data_53);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_14), 7),
                     () -> {
                         data_54 = __core__listData(__core__sndPair(pair_14));
                         __core__chooseData(data_54, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_60 = __core__unListData__safe(data_54);
                             __core__chooseList(fields_60, () -> {
                                 false
                             }, () -> {
                                 head_43 = __core__headList__safe(fields_60);
                                 __core__ifThenElse(
                                     __helios__real__is_valid_data(head_43),
                                     () -> {
                                         fields_61 = __core__tailList__safe(fields_60);
                                         __core__chooseList(fields_61, () -> {
                                             false
                                         }, () -> {
                                             head_44 = __core__headList__safe(fields_61);
                                             __core__ifThenElse(
                                                 __helios__int__is_valid_data(head_44),
                                                 () -> {
                                                     fields_62 = __core__tailList__safe(fields_61);
                                                     __core__chooseList(fields_62, true, false)
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
         __module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data_1 = (data_55) -> {
             __core__chooseData(data_55, () -> {
                 pair_15 = __core__unConstrData__safe(data_55);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_15), 8),
                     () -> {
                         data_56 = __core__listData(__core__sndPair(pair_15));
                         __core__chooseData(data_56, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_63 = __core__unListData__safe(data_56);
                             __core__chooseList(fields_63, () -> {
                                 false
                             }, () -> {
                                 head_45 = __core__headList__safe(fields_63);
                                 __core__ifThenElse(
                                     __helios__real__is_valid_data(head_45),
                                     () -> {
                                         fields_64 = __core__tailList__safe(fields_63);
                                         __core__chooseList(fields_64, () -> {
                                             false
                                         }, () -> {
                                             head_46 = __core__headList__safe(fields_64);
                                             __core__ifThenElse(
                                                 __helios__int__is_valid_data(head_46),
                                                 () -> {
                                                     fields_65 = __core__tailList__safe(fields_64);
                                                     __core__chooseList(fields_65, true, false)
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
         __module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data_1 = (data_57) -> {
             __core__chooseData(data_57, () -> {
                 pair_16 = __core__unConstrData__safe(data_57);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_16), 9),
                     () -> {
                         data_58 = __core__listData(__core__sndPair(pair_16));
                         __core__chooseData(data_58, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_66 = __core__unListData__safe(data_58);
                             __core__chooseList(fields_66, () -> {
                                 false
                             }, () -> {
                                 head_47 = __core__headList__safe(fields_66);
                                 __core__ifThenElse(
                                     __helios__real__is_valid_data(head_47),
                                     () -> {
                                         fields_67 = __core__tailList__safe(fields_66);
                                         __core__chooseList(fields_67, () -> {
                                             false
                                         }, () -> {
                                             head_48 = __core__headList__safe(fields_67);
                                             __core__ifThenElse(
                                                 __helios__duration__is_valid_data(head_48),
                                                 () -> {
                                                     fields_68 = __core__tailList__safe(fields_67);
                                                     __core__chooseList(fields_68, true, false)
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
         __module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data_1 = (data_59) -> {
             __core__chooseData(data_59, () -> {
                 pair_17 = __core__unConstrData__safe(data_59);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_17), 10),
                     () -> {
                         data_60 = __core__listData(__core__sndPair(pair_17));
                         __core__chooseData(data_60, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_69 = __core__unListData__safe(data_60);
                             __core__chooseList(fields_69, () -> {
                                 false
                             }, () -> {
                                 head_49 = __core__headList__safe(fields_69);
                                 __core__ifThenElse(
                                     __helios__duration__is_valid_data(head_49),
                                     () -> {
                                         fields_70 = __core__tailList__safe(fields_69);
                                         __core__chooseList(fields_70, true, false)
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
         __module__ConfigModule__ConfigChangeProposal[]__ChangingMinReimbursement__is_valid_data_1 = (data_61) -> {
             __core__chooseData(data_61, () -> {
                 pair_18 = __core__unConstrData__safe(data_61);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_18), 11),
                     () -> {
                         data_62 = __core__listData(__core__sndPair(pair_18));
                         __core__chooseData(data_62, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_71 = __core__unListData__safe(data_62);
                             __core__chooseList(fields_71, () -> {
                                 false
                             }, () -> {
                                 head_50 = __core__headList__safe(fields_71);
                                 __core__ifThenElse(
                                     __helios__int__is_valid_data(head_50),
                                     () -> {
                                         fields_72 = __core__tailList__safe(fields_71);
                                         __core__chooseList(fields_72, true, false)
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
         __module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data_1 = (data_63) -> {
             __core__chooseData(data_63, () -> {
                 pair_19 = __core__unConstrData__safe(data_63);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_19), 12),
                     () -> {
                         data_64 = __core__listData(__core__sndPair(pair_19));
                         __core__chooseData(data_64, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_73 = __core__unListData__safe(data_64);
                             __core__chooseList(fields_73, () -> {
                                 false
                             }, () -> {
                                 head_51 = __core__headList__safe(fields_73);
                                 __core__ifThenElse(
                                     __helios__bytearray__is_valid_data(head_51),
                                     () -> {
                                         fields_74 = __core__tailList__safe(fields_73);
                                         __core__chooseList(fields_74, true, false)
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
         __module__ConfigModule__ConfigState[]__is_valid_data = (__module__ConfigModule__ConfigState[]__Idle__is_valid_data, __module__ConfigModule__ConfigState[]__Changing__is_valid_data) -> {
             (data_65) -> {
                 __core__ifThenElse(
                     __module__ConfigModule__ConfigState[]__Changing__is_valid_data(data_65),
                     () -> {
                         true
                     },
                     () -> {
                         __core__ifThenElse(
                             __module__ConfigModule__ConfigState[]__Idle__is_valid_data(data_65),
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
         __module__ConfigModule__ConfigState[]__Idle__is_valid_data_1 = (data_66) -> {
             __core__chooseData(data_66, () -> {
                 pair_20 = __core__unConstrData__safe(data_66);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_20), 0),
                     () -> {
                         data_67 = __core__listData(__core__sndPair(pair_20));
                         __core__chooseData(data_67, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_75 = __core__unListData__safe(data_67);
                             __core__chooseList(fields_75, true, false)
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
         __module__ConfigModule__ConfigState[]__Changing__is_valid_data_1 = (data_68) -> {
             __core__chooseData(data_68, () -> {
                 pair_21 = __core__unConstrData__safe(data_68);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_21), 1),
                     () -> {
                         data_69 = __core__listData(__core__sndPair(pair_21));
                         __core__chooseData(data_69, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_76 = __core__unListData__safe(data_69);
                             __core__chooseList(fields_76, () -> {
                                 false
                             }, () -> {
                                 head_52 = __core__headList__safe(fields_76);
                                 __core__ifThenElse(
                                     __helios__time__is_valid_data(head_52),
                                     () -> {
                                         fields_77 = __core__tailList__safe(fields_76);
                                         __core__chooseList(fields_77, () -> {
                                             false
                                         }, () -> {
                                             head_53 = __core__headList__safe(fields_77);
                                             __core__ifThenElse(
                                                 __module__ConfigModule__ConfigChangeProposal[]__is_valid_data(__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__ChangingMinReimbursement__is_valid_data_1, __module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data_1)(head_53),
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
         __module__ConfigModule__Config[]__is_valid_data = (data_70) -> {
             __core__chooseData(data_70, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_79 = __core__unListData__safe(data_70);
                 __core__chooseList(fields_79, () -> {
                     false
                 }, () -> {
                     head_54 = __core__headList__safe(fields_79);
                     __core__ifThenElse(
                         __helios__pubkeyhash__is_valid_data(head_54),
                         () -> {
                             fields_80 = __core__tailList__safe(fields_79);
                             __core__chooseList(fields_80, () -> {
                                 false
                             }, () -> {
                                 head_55 = __core__headList__safe(fields_80);
                                 __core__ifThenElse(
                                     __module__ConfigModule__FeesConfig[]__is_valid_data(head_55),
                                     () -> {
                                         fields_81 = __core__tailList__safe(fields_80);
                                         __core__chooseList(fields_81, () -> {
                                             false
                                         }, () -> {
                                             head_56 = __core__headList__safe(fields_81);
                                             __core__ifThenElse(
                                                 __module__ConfigModule__TokenConfig[]__is_valid_data(head_56),
                                                 () -> {
                                                     fields_82 = __core__tailList__safe(fields_81);
                                                     __core__chooseList(fields_82, () -> {
                                                         false
                                                     }, () -> {
                                                         head_57 = __core__headList__safe(fields_82);
                                                         __core__ifThenElse(
                                                             __helios__stakingvalidatorhash__is_valid_data(head_57),
                                                             () -> {
                                                                 fields_83 = __core__tailList__safe(fields_82);
                                                                 __core__chooseList(fields_83, () -> {
                                                                     false
                                                                 }, () -> {
                                                                     head_58 = __core__headList__safe(fields_83);
                                                                     __core__ifThenElse(
                                                                         __module__ConfigModule__GovernanceConfig[]__is_valid_data(head_58),
                                                                         () -> {
                                                                             fields_84 = __core__tailList__safe(fields_83);
                                                                             __core__chooseList(fields_84, () -> {
                                                                                 false
                                                                             }, () -> {
                                                                                 head_59 = __core__headList__safe(fields_84);
                                                                                 __core__ifThenElse(
                                                                                     __module__ConfigModule__ConfigState[]__is_valid_data(__module__ConfigModule__ConfigState[]__Idle__is_valid_data_1, __module__ConfigModule__ConfigState[]__Changing__is_valid_data_1)(head_59),
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
         __module__ConfigModule__Config[]__from_data = (data_71) -> {
             ignore_6 = __core__ifThenElse(
                 __module__ConfigModule__Config[]__is_valid_data(data_71),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid Config data", ())
                 }
             )();
             __core__unListData(data_71)
         };
         __module__ConfigModule__Config[]__agent = (self_99) -> {
             __helios__pubkeyhash__from_data(__helios__common__struct_field_0(self_99))
         };
         __module__ConfigModule__Config[]__fees = (self_100) -> {
             __module__ConfigModule__FeesConfig[]__from_data(__helios__common__struct_field_1(self_100))
         };
         __module__ConfigModule__Config[]__token = (self_101) -> {
             __module__ConfigModule__TokenConfig[]__from_data(__helios__common__struct_field_2(self_101))
         };
         __helios__list[__helios__txinput]__find = (self_102) -> {
             (fn_12) -> {
                 recurse_55 = (recurse_54, lst_11) -> {
                     __core__chooseList(lst_11, () -> {
                         __helios__error("not found")
                     }, () -> {
                         item_4 = __helios__txinput__from_data(__core__headList__safe(lst_11));
                         __core__ifThenElse(
                             fn_12(item_4),
                             () -> {
                                 item_4
                             },
                             () -> {
                                 recurse_54(recurse_54, __core__tailList__safe(lst_11))
                             }
                         )()
                     })()
                 };
                 recurse_55(recurse_55, self_102)
             }
         };
         __helios__option[__helios__txinput]__some____is = (data_72) -> {
             __helios__common__enum_tag_equals(data_72, 0)
         };
         __helios__option[__helios__txinput]__some__some = (self_103) -> {
             __helios__txinput__from_data(__helios__common__enum_field_0(self_103))
         };
         __helios__list[__helios__txinput]__find_safe = (self_104) -> {
             (fn_13) -> {
                 __helios__common__find_safe(self_104, (item_5) -> {
                     fn_13(__helios__txinput__from_data(item_5))
                 }, __helios__common__identity)
             }
         };
         __module__Tokens__contains[__helios__txinput] = (v_1, asset_class_4) -> {
             __helios__int____gt(__helios__value__get_safe(__helios__txinput__value(v_1))(asset_class_4), 0)
         };
         __module__Tokens__contains_config[__helios__txinput] = (v_2) -> {
             __module__Tokens__contains[__helios__txinput](v_2, __module__Tokens__config)
         };
         __helios__data__as[__module__ConfigModule__Config[]] = (data_73) -> {
             __module__ConfigModule__Config[]__from_data(data_73)
         };
         __module__ConfigModule__Config[]__find = () -> {
             __cond_1 = __helios__scriptcontext__current_script;
             __core__ifThenElse(
                 __helios__script__config_validator____is(__cond_1),
                 () -> {
                     (__lhs_0_17) -> {
                         (callback_7) -> {
                             callback_7(__helios__scriptcontext__get_current_input(), true)
                         }
                     }
                 },
                 () -> {
                     __core__ifThenElse(
                         __helios__script__mint_order_validator____is(__cond_1),
                         () -> {
                             (__lhs_0_16) -> {
                                 (callback_6) -> {
                                     callback_6(__helios__list[__helios__txinput]__find(__helios__tx__ref_inputs(__helios__scriptcontext__tx))((input_8) -> {
                                         __helios__address____eq(__helios__txinput__address(input_8), __module__Addresses__config)
                                     }), false)
                                 }
                             }
                         },
                         () -> {
                             __core__ifThenElse(
                                 __helios__script__burn_order_validator____is(__cond_1),
                                 () -> {
                                     (__lhs_0_15) -> {
                                         (callback_5) -> {
                                             callback_5(__helios__list[__helios__txinput]__find(__helios__tx__ref_inputs(__helios__scriptcontext__tx))((input_7) -> {
                                                 __helios__address____eq(__helios__txinput__address(input_7), __module__Addresses__config)
                                             }), false)
                                         }
                                     }
                                 },
                                 () -> {
                                     (__15) -> {
                                         __cond_2 = __helios__list[__helios__txinput]__find_safe(__helios__tx__ref_inputs(__helios__scriptcontext__tx))((input_5) -> {
                                             __helios__address____eq(__helios__txinput__address(input_5), __module__Addresses__config)
                                         });
                                         __core__ifThenElse(
                                             __helios__option[__helios__txinput]__some____is(__cond_2),
                                             () -> {
                                                 (__lhs_0_14) -> {
                                                     ref_input = __helios__option[__helios__txinput]__some__some(__lhs_0_14);
                                                     (callback_4) -> {
                                                         callback_4(ref_input, false)
                                                     }
                                                 }
                                             },
                                             () -> {
                                                 (__16) -> {
                                                     (callback_3) -> {
                                                         callback_3(__helios__list[__helios__txinput]__find(__helios__tx__inputs(__helios__scriptcontext__tx))((input_6) -> {
                                                             __helios__address____eq(__helios__txinput__address(input_6), __module__Addresses__config)
                                                         }), true)
                                                     }
                                                 }
                                             }
                                         )()(__cond_2)
                                     }
                                 }
                             )()
                         }
                     )()
                 }
             )()(__cond_1)((input_4, is_spent) -> {
                 __core__chooseUnit(__helios__assert(__module__Tokens__contains_config[__helios__txinput](input_4), "doesn't contain the config token"), (callback_2) -> {
                     callback_2(__helios__data__as[__module__ConfigModule__Config[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_4))), is_spent)
                 })
             })
         };
         __module__ConfigModule__deduct_mint_fee = (n_9) -> {
             __module__ConfigModule__Config[]__find()((config, __lhs_1) -> {
                 __module__ConfigModule__MintFeeConfig[]__deduct(__module__ConfigModule__FeesConfig[]__mint_fee(__module__ConfigModule__Config[]__fees(config)))(n_9)
             })
         };
         __module__ConfigModule__price_expiry = () -> {
             __module__ConfigModule__Config[]__find()((config_1, __lhs_1_1) -> {
                 __helios__time____sub1(__helios__timerange__end(__helios__tx__time_range(__helios__scriptcontext__tx)), __module__ConfigModule__TokenConfig[]__max_price_age(__module__ConfigModule__Config[]__token(config_1)))
             })
         };
         __helios__tuple[__module__ConfigModule__Config[]@__helios__bool]__first = (tuple) -> {
             tuple((x0, x1) -> {
                 x0
             })
         };
         __module__ConfigModule__signed_by_agent = (__useopt__agent, agent) -> {
             agent_1 = __core__ifThenElse(
                 __useopt__agent,
                 () -> {
                     agent
                 },
                 () -> {
                     __module__ConfigModule__Config[]__agent(__helios__tuple[__module__ConfigModule__Config[]@__helios__bool]__first(__module__ConfigModule__Config[]__find()))
                 }
             )();
             __helios__tx__is_signed_by(__helios__scriptcontext__tx)(agent_1)
         };
         __helios__map[__helios__assetclass@__helios__int]__fold_with_list[__helios__int@__module__AssetPtrModule__AssetPtr[]] = (self_105) -> {
             (fn_14, z0, list_2) -> {
                 recurse_57 = (recurse_56) -> {
                     (map_18, list_3) -> {
                         __core__chooseList(map_18, () -> {
                             z0
                         }, () -> {
                             z = recurse_56(recurse_56)(__core__tailList(map_18), __core__tailList(list_3));
                             item_6 = __module__AssetPtrModule__AssetPtr[]__from_data(__core__headList(list_3));
                             key_value = __core__headList(map_18);
                             key_11 = __helios__assetclass__from_data(__core__fstPair(key_value));
                             value_2 = __helios__int__from_data(__core__sndPair(key_value));
                             fn_14(z, key_11, value_2, item_6)
                         })()
                     }
                 };
                 recurse_57(recurse_57)(self_105, list_2)
             }
         };
         __module__PortfolioModule__sum_lovelace = (v_3, inputs_1, ptrs, price_expiry) -> {
             __helios__map[__helios__assetclass@__helios__int]__fold_with_list[__helios__int@__module__AssetPtrModule__AssetPtr[]](__helios__value__flatten(v_3)())((sum_1, asset_class_5, qty_1, ptr) -> {
                 __core__ifThenElse(
                     __helios__assetclass____eq(asset_class_5, __helios__assetclass__ADA),
                     () -> {
                         __helios__int____add(sum_1, qty_1)
                     },
                     () -> {
                         () -> {
                             asset_1 = __module__AssetPtrModule__AssetPtr[]__resolve_input(ptr)(inputs_1, asset_class_5);
                             __core__chooseUnit(__helios__assert(__helios__time____geq(__module__AssetModule__Asset[]__price_timestamp(asset_1), price_expiry), "price expired"), __helios__int____add(sum_1, __helios__ratio__floor(__helios__ratio____mul1(__module__AssetModule__Asset[]__price(asset_1), qty_1))()))
                         }()
                     }
                 )()
             }, 0, ptrs)
         };
         __module__MintOrderModule__MintOrder[]__is_valid_data = (data_74) -> {
             __core__chooseData(data_74, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_86 = __core__unListData__safe(data_74);
                 __core__chooseList(fields_86, () -> {
                     false
                 }, () -> {
                     head_60 = __core__headList__safe(fields_86);
                     __core__ifThenElse(
                         __helios__address__is_valid_data(head_60),
                         () -> {
                             fields_87 = __core__tailList__safe(fields_86);
                             __core__chooseList(fields_87, () -> {
                                 false
                             }, () -> {
                                 head_61 = __core__headList__safe(fields_87);
                                 __core__ifThenElse(
                                     __helios__data__is_valid_data(head_61),
                                     () -> {
                                         fields_88 = __core__tailList__safe(fields_87);
                                         __core__chooseList(fields_88, () -> {
                                             false
                                         }, () -> {
                                             head_62 = __core__headList__safe(fields_88);
                                             __core__ifThenElse(
                                                 __helios__int__is_valid_data(head_62),
                                                 () -> {
                                                     fields_89 = __core__tailList__safe(fields_88);
                                                     __core__chooseList(fields_89, () -> {
                                                         false
                                                     }, () -> {
                                                         head_63 = __core__headList__safe(fields_89);
                                                         __core__ifThenElse(
                                                             __helios__duration__is_valid_data(head_63),
                                                             () -> {
                                                                 fields_90 = __core__tailList__safe(fields_89);
                                                                 __core__chooseList(fields_90, true, false)
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
         __module__MintOrderModule__MintOrder[]__from_data = (data_75) -> {
             ignore_7 = __core__ifThenElse(
                 __module__MintOrderModule__MintOrder[]__is_valid_data(data_75),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid MintOrder data", ())
                 }
             )();
             __core__unListData(data_75)
         };
         __module__MintOrderModule__MintOrder[]__return_address = (self_106) -> {
             __helios__address__from_data(__helios__common__struct_field_0(self_106))
         };
         __module__MintOrderModule__MintOrder[]__return_datum = (self_107) -> {
             __helios__data__from_data(__helios__common__struct_field_1(self_107))
         };
         __module__MintOrderModule__MintOrder[]__min_tokens = (self_108) -> {
             __helios__int__from_data(__helios__common__struct_field_2(self_108))
         };
         __module__MintOrderModule__MintOrder[]__max_price_age = (self_109) -> {
             __helios__duration__from_data(__helios__common__struct_field_3(self_109))
         };
         __helios__map[__helios__bytearray@__helios__int]__is_valid_data_internal = (map_19) -> {
             recurse_59 = (recurse_58, map_20) -> {
                 __core__chooseList(map_20, () -> {
                     true
                 }, () -> {
                     head_64 = __core__headList__safe(map_20);
                     __core__ifThenElse(
                         __helios__bytearray__is_valid_data(__core__fstPair(head_64)),
                         () -> {
                             __core__ifThenElse(
                                 __helios__int__is_valid_data(__core__sndPair(head_64)),
                                 () -> {
                                     recurse_58(recurse_58, __core__tailList__safe(map_20))
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
             recurse_59(recurse_59, map_19)
         };
         __helios__map[__helios__bytearray@__helios__int]__from_data = (data_76) -> {
             map_21 = __core__unMapData(data_76);
             __17 = __core__ifThenElse(
                 __helios__map[__helios__bytearray@__helios__int]__is_valid_data_internal(map_21),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid map data", ())
                 }
             )();
             map_21
         };
         __helios__map[__helios__mintingpolicyhash@__helios__map[__helios__bytearray@__helios__int]]__all = (self_110) -> {
             (fn_15) -> {
                 fn_16 = (pair_22) -> {
                     fn_15(__helios__mintingpolicyhash__from_data(__core__fstPair(pair_22)), __helios__map[__helios__bytearray@__helios__int]__from_data(__core__sndPair(pair_22)))
                 };
                 __helios__common__all(self_110, fn_16)
             }
         };
         __module__MintOrderModule__MintOrder[]__find_return = (self_111) -> {
             () -> {
                 return_address = __module__MintOrderModule__MintOrder[]__return_address(self_111);
                 return_datum = __module__MintOrderModule__MintOrder[]__return_datum(self_111);
                 return = __helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output) -> {
                     __helios__bool__and(() -> {
                         __helios__address____eq(__helios__txoutput__address(output), return_address)
                     }, () -> {
                         __cond_3 = __helios__txoutput__datum(output);
                         __core__ifThenElse(
                             __helios__txoutputdatum__inline____is(__cond_3),
                             () -> {
                                 (__lhs_0_18) -> {
                                     d = __helios__txoutputdatum__inline__data(__lhs_0_18);
                                     __helios__data____eq(d, return_datum)
                                 }
                             },
                             () -> {
                                 (__18) -> {
                                     false
                                 }
                             }
                         )()(__cond_3)
                     })
                 });
                 __core__chooseUnit(__helios__assert(__helios__map[__helios__mintingpolicyhash@__helios__map[__helios__bytearray@__helios__int]]__all(__helios__value__to_map(__helios__txoutput__value(return))())((mph_9, tokens_3) -> {
                     __core__ifThenElse(
                         __helios__mintingpolicyhash____eq(mph_9, __helios__mintingpolicyhash__new(\#)),
                         () -> {
                             true
                         },
                         () -> {
                             __core__ifThenElse(
                                 __helios__mintingpolicyhash____eq(mph_9, __module__Tokens__policy),
                                 () -> {
                                     __helios__int____leq(__helios__map[__helios__bytearray@__helios__int]__length(tokens_3), 2)
                                 },
                                 () -> {
                                     () -> {
                                         false
                                     }()
                                 }
                             )()
                         }
                     )()
                 }), "can only return ADA and DVP tokens"), return)
             }
         };
         __module__MintOrderModule__MintOrder[]__diff = (self_112) -> {
             () -> {
                 (input_9) -> {
                     return_1 = __module__MintOrderModule__MintOrder[]__find_return(self_112)();
                     __helios__value____sub(__helios__txinput__value(input_9), __helios__txoutput__value(return_1))
                 }(__cond_4 = __helios__scriptcontext__current_script;
                 __core__ifThenElse(
                     __helios__script__mint_order_validator____is(__cond_4),
                     () -> {
                         (__lhs_0_19) -> {
                             __helios__scriptcontext__get_current_input()
                         }
                     },
                     () -> {
                         (__19) -> {
                             __helios__error("unexpected")
                         }
                     }
                 )()(__cond_4))
             }
         };
         __module__MintOrderModule__MintOrder[]__price_expiry = (self_113) -> {
             () -> {
                 __helios__time____sub1(__helios__timerange__end(__helios__tx__time_range(__helios__scriptcontext__tx)), __module__MintOrderModule__MintOrder[]__max_price_age(self_113))
             }
         };
         __module__MintOrderModule__MintOrder[]__returned_tokens = (self_114) -> {
             () -> {
                 __helios__int____mul(__helios__int____neg(1), __helios__value__get(__module__MintOrderModule__MintOrder[]__diff(self_114)())(__module__Tokens__dvp_token))
             }
         };
         __module__MintOrderModule__MintOrder[]__value = (self_115) -> {
             () -> {
                 __helios__value__delete_policy(__module__MintOrderModule__MintOrder[]__diff(self_115)())(__module__Tokens__policy)
             }
         };
         __module__MintOrderModule__MintOrder[]__value_lovelace = (self_116) -> {
             (ptrs_1) -> {
                 __module__PortfolioModule__sum_lovelace(__module__MintOrderModule__MintOrder[]__value(self_116)(), __helios__tx__inputs(__helios__scriptcontext__tx), ptrs_1, __module__MintOrderModule__MintOrder[]__price_expiry(self_116)())
             }
         };
         __helios__map[__helios__bytearray@__helios__int]__find = (self_117) -> {
             (fn_17) -> {
                 recurse_61 = (recurse_60, self_118) -> {
                     __core__chooseList(self_118, () -> {
                         __helios__error("not found")
                     }, () -> {
                         head_65 = __core__headList__safe(self_118);
                         key_12 = __helios__bytearray__from_data(__core__fstPair(head_65));
                         value_3 = __helios__int__from_data(__core__sndPair(head_65));
                         __core__ifThenElse(
                             fn_17(key_12, value_3),
                             () -> {
                                 (callback_8) -> {
                                     callback_8(key_12, value_3)
                                 }
                             },
                             () -> {
                                 recurse_60(recurse_60, __core__tailList__safe(self_118))
                             }
                         )()
                     })()
                 };
                 recurse_61(recurse_61, self_117)
             }
         };
         __module__MintOrderModule__MintOrder[]__voucher_id = (self_119) -> {
             () -> {
                 __helios__map[__helios__bytearray@__helios__int]__find(__helios__value__get_policy(__module__MintOrderModule__MintOrder[]__diff(self_119)())(__module__Tokens__policy))((token_name_6, __20) -> {
                     __module__TokenNames__has_voucher_nft_prefix(token_name_6)
                 })((voucher_nft_name, qty_2) -> {
                     __core__chooseUnit(__helios__assert(__helios__int____leq(qty_2, __helios__int____neg(1)), "expected at least one token returned"), __helios__option[__helios__int]__unwrap(__module__TokenNames__parse_voucher_nft(voucher_nft_name))())
                 })
             }
         };
         __module__PriceModule__Price[]__is_valid_data = (data_77) -> {
             __core__chooseData(data_77, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_91 = __core__unListData__safe(data_77);
                 __core__chooseList(fields_91, () -> {
                     false
                 }, () -> {
                     head_66 = __core__headList__safe(fields_91);
                     __core__ifThenElse(
                         __helios__ratio__is_valid_data(head_66),
                         () -> {
                             fields_92 = __core__tailList__safe(fields_91);
                             __core__chooseList(fields_92, () -> {
                                 false
                             }, () -> {
                                 head_67 = __core__headList__safe(fields_92);
                                 __core__ifThenElse(
                                     __helios__time__is_valid_data(head_67),
                                     () -> {
                                         fields_93 = __core__tailList__safe(fields_92);
                                         __core__chooseList(fields_93, true, false)
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
         __module__PriceModule__Price[]__from_data = (data_78) -> {
             ignore_8 = __core__ifThenElse(
                 __module__PriceModule__Price[]__is_valid_data(data_78),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid Price data", ())
                 }
             )();
             __core__unListData(data_78)
         };
         __module__PriceModule__Price[]__value = (self_120) -> {
             __helios__ratio__from_data(__helios__common__struct_field_0(self_120))
         };
         __module__PriceModule__Price[]__timestamp = (self_121) -> {
             __helios__time__from_data(__helios__common__struct_field_1(self_121))
         };
         __module__Tokens__contains_only[__helios__txinput] = (v_4, asset_class_6) -> {
             __helios__assetclass____eq(__helios__value__get_singleton_asset_class(__helios__txinput__value(v_4))(), asset_class_6)
         };
         __module__Tokens__contains_only_price[__helios__txinput] = (v_5) -> {
             __module__Tokens__contains_only[__helios__txinput](v_5, __module__Tokens__price)
         };
         __helios__data__as[__module__PriceModule__Price[]] = (data_79) -> {
             __module__PriceModule__Price[]__from_data(data_79)
         };
         __module__PriceModule__Price[]__find_ref = () -> {
             input_11 = __helios__list[__helios__txinput]__find(__helios__tx__ref_inputs(__helios__scriptcontext__tx))((input_10) -> {
                 __helios__address____eq(__helios__txinput__address(input_10), __module__Addresses__price)
             });
             __core__chooseUnit(__helios__assert(__module__Tokens__contains_only_price[__helios__txinput](input_11), "doesn't contain only the price token"), __helios__data__as[__module__PriceModule__Price[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_11))))
         };
         __module__PriceModule__Price[]__is_not_expired = (self_122) -> {
             (__useopt__expiry, expiry) -> {
                 expiry_1 = __core__ifThenElse(
                     __useopt__expiry,
                     () -> {
                         expiry
                     },
                     () -> {
                         __module__ConfigModule__price_expiry()
                     }
                 )();
                 __helios__time____geq(__module__PriceModule__Price[]__timestamp(self_122), expiry_1)
             }
         };
         __module__PriceModule__Price[]__relative_to_benchmark = (self_123) -> {
             () -> {
                 __module__ConfigModule__Config[]__find()((config_2, __lhs_1_2) -> {
                     __module__ConfigModule__SuccessFeeConfig[]__get_benchmark_price(__module__ConfigModule__FeesConfig[]__success_fee(__module__ConfigModule__Config[]__fees(config_2)))(__module__PriceModule__Price[]__value(self_123), false, ())
                 })
             }
         };
         __module__SupplyModule__SuccessFeeState[]__is_valid_data = (data_80) -> {
             __core__chooseData(data_80, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_94 = __core__unListData__safe(data_80);
                 __core__chooseList(fields_94, () -> {
                     false
                 }, () -> {
                     head_68 = __core__headList__safe(fields_94);
                     __core__ifThenElse(
                         __helios__int__is_valid_data(head_68),
                         () -> {
                             fields_95 = __core__tailList__safe(fields_94);
                             __core__chooseList(fields_95, () -> {
                                 false
                             }, () -> {
                                 head_69 = __core__headList__safe(fields_95);
                                 __core__ifThenElse(
                                     __helios__time__is_valid_data(head_69),
                                     () -> {
                                         fields_96 = __core__tailList__safe(fields_95);
                                         __core__chooseList(fields_96, () -> {
                                             false
                                         }, () -> {
                                             head_70 = __core__headList__safe(fields_96);
                                             __core__ifThenElse(
                                                 __helios__duration__is_valid_data(head_70),
                                                 () -> {
                                                     fields_97 = __core__tailList__safe(fields_96);
                                                     __core__chooseList(fields_97, () -> {
                                                         false
                                                     }, () -> {
                                                         head_71 = __core__headList__safe(fields_97);
                                                         __core__ifThenElse(
                                                             __helios__ratio__is_valid_data(head_71),
                                                             () -> {
                                                                 fields_98 = __core__tailList__safe(fields_97);
                                                                 __core__chooseList(fields_98, true, false)
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
         __module__SupplyModule__SuccessFeeState[]__from_data = (data_81) -> {
             ignore_9 = __core__ifThenElse(
                 __module__SupplyModule__SuccessFeeState[]__is_valid_data(data_81),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid SuccessFeeState data", ())
                 }
             )();
             __core__unListData(data_81)
         };
         __module__SupplyModule__SuccessFeeState[]__start_price = (self_124) -> {
             __helios__ratio__from_data(__helios__common__struct_field_3(self_124))
         };
         __module__SupplyModule__Supply[]__is_valid_data = (data_82) -> {
             __core__chooseData(data_82, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 fields_99 = __core__unListData__safe(data_82);
                 __core__chooseList(fields_99, () -> {
                     false
                 }, () -> {
                     head_72 = __core__headList__safe(fields_99);
                     __core__ifThenElse(
                         __helios__int__is_valid_data(head_72),
                         () -> {
                             fields_100 = __core__tailList__safe(fields_99);
                             __core__chooseList(fields_100, () -> {
                                 false
                             }, () -> {
                                 head_73 = __core__headList__safe(fields_100);
                                 __core__ifThenElse(
                                     __helios__int__is_valid_data(head_73),
                                     () -> {
                                         fields_101 = __core__tailList__safe(fields_100);
                                         __core__chooseList(fields_101, () -> {
                                             false
                                         }, () -> {
                                             head_74 = __core__headList__safe(fields_101);
                                             __core__ifThenElse(
                                                 __helios__int__is_valid_data(head_74),
                                                 () -> {
                                                     fields_102 = __core__tailList__safe(fields_101);
                                                     __core__chooseList(fields_102, () -> {
                                                         false
                                                     }, () -> {
                                                         head_75 = __core__headList__safe(fields_102);
                                                         __core__ifThenElse(
                                                             __helios__int__is_valid_data(head_75),
                                                             () -> {
                                                                 fields_103 = __core__tailList__safe(fields_102);
                                                                 __core__chooseList(fields_103, () -> {
                                                                     false
                                                                 }, () -> {
                                                                     head_76 = __core__headList__safe(fields_103);
                                                                     __core__ifThenElse(
                                                                         __helios__int__is_valid_data(head_76),
                                                                         () -> {
                                                                             fields_104 = __core__tailList__safe(fields_103);
                                                                             __core__chooseList(fields_104, () -> {
                                                                                 false
                                                                             }, () -> {
                                                                                 head_77 = __core__headList__safe(fields_104);
                                                                                 __core__ifThenElse(
                                                                                     __helios__time__is_valid_data(head_77),
                                                                                     () -> {
                                                                                         fields_105 = __core__tailList__safe(fields_104);
                                                                                         __core__chooseList(fields_105, () -> {
                                                                                             false
                                                                                         }, () -> {
                                                                                             head_78 = __core__headList__safe(fields_105);
                                                                                             __core__ifThenElse(
                                                                                                 __module__SupplyModule__SuccessFeeState[]__is_valid_data(head_78),
                                                                                                 () -> {
                                                                                                     fields_106 = __core__tailList__safe(fields_105);
                                                                                                     __core__chooseList(fields_106, true, false)
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
         };
         __module__SupplyModule__Supply[]__from_data = (data_83) -> {
             ignore_10 = __core__ifThenElse(
                 __module__SupplyModule__Supply[]__is_valid_data(data_83),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid Supply data", ())
                 }
             )();
             __core__unListData(data_83)
         };
         __module__SupplyModule__Supply[]__success_fee = (self_125) -> {
             __module__SupplyModule__SuccessFeeState[]__from_data(__helios__common__struct_field_6(self_125))
         };
         __helios__data__as[__module__SupplyModule__Supply[]] = (data_84) -> {
             __module__SupplyModule__Supply[]__from_data(data_84)
         };
         __module__Tokens__contains_supply[__helios__txinput] = (v_6) -> {
             __module__Tokens__contains[__helios__txinput](v_6, __module__Tokens__supply)
         };
         __module__SupplyModule__Supply[]__find_input = () -> {
             (input_14) -> {
                 __helios__data__as[__module__SupplyModule__Supply[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input_14)))
             }(__cond_5 = __helios__scriptcontext__current_script;
             __core__ifThenElse(
                 __helios__script__config_validator____is(__cond_5),
                 () -> {
                     (__lhs_0_20) -> {
                         __helios__list[__helios__txinput]__find(__helios__tx__inputs(__helios__scriptcontext__tx))(__module__Tokens__contains_supply[__helios__txinput])
                     }
                 },
                 () -> {
                     (__21) -> {
                         input_13 = __helios__list[__helios__txinput]__find(__helios__tx__inputs(__helios__scriptcontext__tx))((input_12) -> {
                             __helios__address____eq(__helios__txinput__address(input_12), __module__Addresses__supply)
                         });
                         __core__chooseUnit(__helios__assert(__module__Tokens__contains_supply[__helios__txinput](input_13), "doesn't contain the supply token"), input_13)
                     }
                 }
             )()(__cond_5))
         };
         __module__SupplyModule__Supply[]__is_successful = (self_126) -> {
             (price_relative_to_benchmark) -> {
                 __helios__ratio____gt(price_relative_to_benchmark, __module__SupplyModule__SuccessFeeState[]__start_price(__module__SupplyModule__Supply[]__success_fee(self_126)))
             }
         };
         __module__VoucherModule__Voucher[]__is_valid_data = (data_85) -> {
             __core__ifThenElse(
                 __helios__common__test_mStruct_field(data_85, __core__bData(\#75726c), __helios__string__is_valid_data),
                 () -> {
                     __core__ifThenElse(
                         __helios__common__test_mStruct_field(data_85, __core__bData(\#696d616765), __helios__string__is_valid_data),
                         () -> {
                             __core__ifThenElse(
                                 __helios__common__test_mStruct_field(data_85, __core__bData(\#6465736372697074696f6e), __helios__string__is_valid_data),
                                 () -> {
                                     __core__ifThenElse(
                                         __helios__common__test_mStruct_field(data_85, __core__bData(\#6e616d65), __helios__string__is_valid_data),
                                         () -> {
                                             __core__ifThenElse(
                                                 __helios__common__test_mStruct_field(data_85, __core__bData(\#706572696f64), __helios__int__is_valid_data),
                                                 () -> {
                                                     __core__ifThenElse(
                                                         __helios__common__test_mStruct_field(data_85, __core__bData(\#7072696365), __helios__ratio__is_valid_data),
                                                         () -> {
                                                             __core__ifThenElse(
                                                                 __helios__common__test_mStruct_field(data_85, __core__bData(\#746f6b656e73), __helios__int__is_valid_data),
                                                                 () -> {
                                                                     __core__ifThenElse(
                                                                         __helios__common__test_mStruct_field(data_85, __core__bData(\#646174756d), __helios__data__is_valid_data),
                                                                         () -> {
                                                                             __core__ifThenElse(
                                                                                 __helios__common__test_mStruct_field(data_85, __core__bData(\#6f776e6572), __helios__address__is_valid_data),
                                                                                 () -> {
                                                                                     true
                                                                                 },
                                                                                 () -> {
                                                                                     __core__trace("Warning: invalid Voucher data", () -> {
                                                                                         false
                                                                                     })()
                                                                                 }
                                                                             )()
                                                                         },
                                                                         () -> {
                                                                             __core__trace("Warning: invalid Voucher data", () -> {
                                                                                 false
                                                                             })()
                                                                         }
                                                                     )()
                                                                 },
                                                                 () -> {
                                                                     __core__trace("Warning: invalid Voucher data", () -> {
                                                                         false
                                                                     })()
                                                                 }
                                                             )()
                                                         },
                                                         () -> {
                                                             __core__trace("Warning: invalid Voucher data", () -> {
                                                                 false
                                                             })()
                                                         }
                                                     )()
                                                 },
                                                 () -> {
                                                     __core__trace("Warning: invalid Voucher data", () -> {
                                                         false
                                                     })()
                                                 }
                                             )()
                                         },
                                         () -> {
                                             __core__trace("Warning: invalid Voucher data", () -> {
                                                 false
                                             })()
                                         }
                                     )()
                                 },
                                 () -> {
                                     __core__trace("Warning: invalid Voucher data", () -> {
                                         false
                                     })()
                                 }
                             )()
                         },
                         () -> {
                             __core__trace("Warning: invalid Voucher data", () -> {
                                 false
                             })()
                         }
                     )()
                 },
                 () -> {
                     __core__trace("Warning: invalid Voucher data", () -> {
                         false
                     })()
                 }
             )()
         };
         __module__VoucherModule__Voucher[]__from_data = (data_86) -> {
             ignore_11 = __core__ifThenElse(
                 __module__VoucherModule__Voucher[]__is_valid_data(data_86),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid Voucher data", ())
                 }
             )();
             data_86
         };
         __module__VoucherModule__Voucher[]__return_address = (self_127) -> {
             __helios__address__from_data(__helios__common__mStruct_field(self_127, \#6f776e6572))
         };
         __module__VoucherModule__Voucher[]__return_datum = (self_128) -> {
             __helios__data__from_data(__helios__common__mStruct_field(self_128, \#646174756d))
         };
         __module__VoucherModule__Voucher[]__tokens = (self_129) -> {
             __helios__int__from_data(__helios__common__mStruct_field(self_129, \#746f6b656e73))
         };
         __helios__data__as_strictly[__module__VoucherModule__Voucher[]] = (data_87) -> {
             __core__ifThenElse(
                 __module__VoucherModule__Voucher[]__is_valid_data(data_87),
                 () -> {
                     __module__VoucherModule__Voucher[]__from_data(data_87)
                 },
                 () -> {
                     __helios__error("invalid data structure")
                 }
             )()
         };
         __module__Tokens__contains_only_voucher_ref[__helios__txoutput] = (v_7, id_4) -> {
             __module__Tokens__contains_only[__helios__txoutput](v_7, __module__Tokens__voucher_ref_token(id_4))
         };
         __module__VoucherModule__Voucher[]__find_output = (id_5) -> {
             output_2 = __helios__list[__helios__txoutput]__find(__helios__tx__outputs(__helios__scriptcontext__tx))((output_1) -> {
                 __helios__bool__and(() -> {
                     __helios__address____eq(__helios__txoutput__address(output_1), __module__Addresses__voucher)
                 }, () -> {
                     __module__Tokens__contains_only_voucher_ref[__helios__txoutput](output_1, id_5)
                 })
             });
             __helios__data__as_strictly[__module__VoucherModule__Voucher[]](__helios__txoutputdatum__inline(__helios__txoutput__datum(output_2)))
         };
         __module__mint_order_validator__Redeemer[]__is_valid_data = (__module__mint_order_validator__Redeemer[]__Cancel__is_valid_data, __module__mint_order_validator__Redeemer[]__Fulfill__is_valid_data) -> {
             (data_88) -> {
                 __core__ifThenElse(
                     __module__mint_order_validator__Redeemer[]__Fulfill__is_valid_data(data_88),
                     () -> {
                         true
                     },
                     () -> {
                         __core__ifThenElse(
                             __module__mint_order_validator__Redeemer[]__Cancel__is_valid_data(data_88),
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
         __module__mint_order_validator__Redeemer[]__from_data = (__module__mint_order_validator__Redeemer[]__Cancel__is_valid_data_1, __module__mint_order_validator__Redeemer[]__Fulfill__is_valid_data_1) -> {
             (data_89) -> {
                 ignore_12 = __core__ifThenElse(
                     __module__mint_order_validator__Redeemer[]__is_valid_data(__module__mint_order_validator__Redeemer[]__Cancel__is_valid_data_1, __module__mint_order_validator__Redeemer[]__Fulfill__is_valid_data_1)(data_89),
                     () -> {
                         ()
                     },
                     () -> {
                         __core__trace("Warning: invalid Redeemer data", ())
                     }
                 )();
                 data_89
             }
         };
         __module__mint_order_validator__Redeemer[]__Cancel____is = (data_90) -> {
             __helios__common__enum_tag_equals(data_90, 0)
         };
         __module__mint_order_validator__Redeemer[]__Cancel__is_valid_data_2 = (data_91) -> {
             __core__chooseData(data_91, () -> {
                 pair_23 = __core__unConstrData__safe(data_91);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_23), 0),
                     () -> {
                         data_92 = __core__listData(__core__sndPair(pair_23));
                         __core__chooseData(data_92, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_107 = __core__unListData__safe(data_92);
                             __core__chooseList(fields_107, true, false)
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
         __helios__list[__module__AssetPtrModule__AssetPtr[]]__is_valid_data_internal = (lst_12) -> {
             recurse_63 = (recurse_62, lst_13) -> {
                 __core__chooseList(lst_13, () -> {
                     true
                 }, () -> {
                     __core__ifThenElse(
                         __module__AssetPtrModule__AssetPtr[]__is_valid_data(__core__headList__safe(lst_13)),
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
         __helios__list[__module__AssetPtrModule__AssetPtr[]]__is_valid_data = (data_93) -> {
             __core__chooseData(data_93, () -> {
                 false
             }, () -> {
                 false
             }, () -> {
                 __helios__list[__module__AssetPtrModule__AssetPtr[]]__is_valid_data_internal(__core__unListData__safe(data_93))
             }, () -> {
                 false
             }, () -> {
                 false
             })()
         };
         __module__mint_order_validator__Redeemer[]__Fulfill__is_valid_data_2 = (data_94) -> {
             __core__chooseData(data_94, () -> {
                 pair_24 = __core__unConstrData__safe(data_94);
                 __core__ifThenElse(
                     __core__equalsInteger(__core__fstPair(pair_24), 1),
                     () -> {
                         data_95 = __core__listData(__core__sndPair(pair_24));
                         __core__chooseData(data_95, () -> {
                             false
                         }, () -> {
                             false
                         }, () -> {
                             fields_108 = __core__unListData__safe(data_95);
                             __core__chooseList(fields_108, () -> {
                                 false
                             }, () -> {
                                 head_79 = __core__headList__safe(fields_108);
                                 __core__ifThenElse(
                                     __helios__list[__module__AssetPtrModule__AssetPtr[]]__is_valid_data(head_79),
                                     () -> {
                                         fields_109 = __core__tailList__safe(fields_108);
                                         __core__chooseList(fields_109, true, false)
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
         __helios__list[__module__AssetPtrModule__AssetPtr[]]__from_data = (data_96) -> {
             lst_14 = __core__unListData(data_96);
             __22 = __core__ifThenElse(
                 __helios__list[__module__AssetPtrModule__AssetPtr[]]__is_valid_data_internal(lst_14),
                 () -> {
                     ()
                 },
                 () -> {
                     __core__trace("Warning: invalid list data", ())
                 }
             )();
             lst_14
         };
         __module__mint_order_validator__Redeemer[]__Fulfill__ptrs = (self_130) -> {
             __helios__list[__module__AssetPtrModule__AssetPtr[]]__from_data(__helios__common__enum_field_0(self_130))
         };
         __module__mint_order_validator__main = (order, redeemer) -> {
             __core__chooseUnit(__cond_6 = redeemer;
             __core__ifThenElse(
                 __module__mint_order_validator__Redeemer[]__Cancel____is(__cond_6),
                 () -> {
                     (__lhs_0_22) -> {
                         __helios__assert(__helios__tx__is_approved_by(__helios__scriptcontext__tx)(__helios__address__credential(__module__MintOrderModule__MintOrder[]__return_address(order))), "not approved by owner")
                     }
                 },
                 () -> {
                     (__lhs_0_21) -> {
                         ptrs_2 = __module__mint_order_validator__Redeemer[]__Fulfill__ptrs(__lhs_0_21);
                         price = __module__PriceModule__Price[]__find_ref();
                         supply = __module__SupplyModule__Supply[]__find_input();
                         n_actual = __module__MintOrderModule__MintOrder[]__returned_tokens(order)();
                         __core__chooseUnit(__helios__print(__helios__string____add("actual returned tokens: ", __helios__int__show(n_actual)())), n_expected = __module__ConfigModule__deduct_mint_fee(__helios__ratio__floor(__helios__int____div2(__module__MintOrderModule__MintOrder[]__value_lovelace(order)(ptrs_2), __module__PriceModule__Price[]__value(price)))());
                         __core__chooseUnit(__helios__print(__helios__string____add("expected min returned tokens: ", __helios__int__show(n_expected)())), __core__chooseUnit(__helios__assert(__module__ConfigModule__signed_by_agent(false, ()), "not signed by agent"), __core__chooseUnit(__helios__assert(__module__PriceModule__Price[]__is_not_expired(price)(true, __module__MintOrderModule__MintOrder[]__price_expiry(order)()), "token price too old"), __core__chooseUnit(__helios__assert(__helios__int____geq(n_actual, __module__MintOrderModule__MintOrder[]__min_tokens(order)), "not enough tokens returned wrt. order"), __core__chooseUnit(__helios__assert(__helios__int____geq(n_actual, n_expected), "not enough tokens returned wrt. contract price"), __core__ifThenElse(
                             __module__SupplyModule__Supply[]__is_successful(supply)(__module__PriceModule__Price[]__relative_to_benchmark(price)()),
                             () -> {
                                 voucher_id = __module__MintOrderModule__MintOrder[]__voucher_id(order)();
                                 __core__chooseUnit(__helios__print(__helios__string____add("created voucher: ", __helios__int__show(voucher_id)())), voucher = __module__VoucherModule__Voucher[]__find_output(voucher_id);
                                 __core__chooseUnit(__helios__assert(__helios__address____eq(__module__VoucherModule__Voucher[]__return_address(voucher), __module__MintOrderModule__MintOrder[]__return_address(order)), "wrong voucher return address"), __core__chooseUnit(__helios__assert(__helios__data____eq(__module__VoucherModule__Voucher[]__return_datum(voucher), __module__MintOrderModule__MintOrder[]__return_datum(order)), "wrong voucher datum"), __helios__assert(__helios__int____eq(__module__VoucherModule__Voucher[]__tokens(voucher), n_expected), "unexpected number of tokens in voucher"))))
                             },
                             () -> {
                                 () -> {
                                     ()
                                 }()
                             }
                         )()))))))
                     }
                 }
             )()(__cond_6), true)
         };
         __core__ifThenElse(
             __module__mint_order_validator__main(__module__MintOrderModule__MintOrder[]__from_data(__DATUM), __module__mint_order_validator__Redeemer[]__from_data(__module__mint_order_validator__Redeemer[]__Cancel__is_valid_data_2, __module__mint_order_validator__Redeemer[]__Fulfill__is_valid_data_2)(__REDEEMER)),
             () -> {
                 ()
             },
             () -> {
                 __helios__error("validation returned false")
             }
         )()
     }(__cond = __helios__scriptcontext__current_script;
     __core__ifThenElse(
         __helios__script__fund_policy____is(__cond),
         () -> {
             (__lhs_0_13) -> {
                 __module__Tokens__direct_policy
             }
         },
         () -> {
             __core__ifThenElse(
                 __helios__script__mint_order_validator____is(__cond),
                 () -> {
                     (__lhs_0_12) -> {
                         __module__Tokens__direct_policy
                     }
                 },
                 () -> {
                     __core__ifThenElse(
                         __helios__script__burn_order_validator____is(__cond),
                         () -> {
                             (__lhs_0_11) -> {
                                 __module__Tokens__direct_policy
                             }
                         },
                         () -> {
                             __core__ifThenElse(
                                 __helios__script__supply_validator____is(__cond),
                                 () -> {
                                     (__lhs_0_10) -> {
                                         __module__Tokens__indirect_policy()
                                     }
                                 },
                                 () -> {
                                     __core__ifThenElse(
                                         __helios__script__assets_validator____is(__cond),
                                         () -> {
                                             (__lhs_0_9) -> {
                                                 __module__Tokens__indirect_policy()
                                             }
                                         },
                                         () -> {
                                             __core__ifThenElse(
                                                 __helios__script__portfolio_validator____is(__cond),
                                                 () -> {
                                                     (__lhs_0_8) -> {
                                                         __module__Tokens__indirect_policy()
                                                     }
                                                 },
                                                 () -> {
                                                     __core__ifThenElse(
                                                         __helios__script__price_validator____is(__cond),
                                                         () -> {
                                                             (__lhs_0_7) -> {
                                                                 __module__Tokens__indirect_policy()
                                                             }
                                                         },
                                                         () -> {
                                                             __core__ifThenElse(
                                                                 __helios__script__reimbursement_validator____is(__cond),
                                                                 () -> {
                                                                     (__lhs_0_6) -> {
                                                                         input_2 = __helios__scriptcontext__get_current_input();
                                                                         __helios__value__get_singleton_policy(__helios__txinput__value(input_2))()
                                                                     }
                                                                 },
                                                                 () -> {
                                                                     __core__ifThenElse(
                                                                         __helios__script__voucher_validator____is(__cond),
                                                                         () -> {
                                                                             (__lhs_0_5) -> {
                                                                                 __module__Tokens__indirect_policy()
                                                                             }
                                                                         },
                                                                         () -> {
                                                                             __core__ifThenElse(
                                                                                 __helios__script__config_validator____is(__cond),
                                                                                 () -> {
                                                                                     (__lhs_0_4) -> {
                                                                                         __module__Tokens__indirect_policy()
                                                                                     }
                                                                                 },
                                                                                 () -> {
                                                                                     __core__ifThenElse(
                                                                                         __helios__script__metadata_validator____is(__cond),
                                                                                         () -> {
                                                                                             (__lhs_0_3) -> {
                                                                                                 __module__Tokens__indirect_policy()
                                                                                             }
                                                                                         },
                                                                                         () -> {
                                                                                             __core__ifThenElse(
                                                                                                 __helios__script__oracle_delegate____is(__cond),
                                                                                                 () -> {
                                                                                                     (__lhs_0_2) -> {
                                                                                                         __module__Tokens__direct_policy
                                                                                                     }
                                                                                                 },
                                                                                                 () -> {
                                                                                                     __core__ifThenElse(
                                                                                                         __helios__script__benchmark_delegate____is(__cond),
                                                                                                         () -> {
                                                                                                             (__lhs_0_1) -> {
                                                                                                                 __module__Tokens__direct_policy
                                                                                                             }
                                                                                                         },
                                                                                                         () -> {
                                                                                                             (__lhs_0) -> {
                                                                                                                 __module__Tokens__direct_policy
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
     )()(__cond))
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
        "9fd8799fd8799f581c0a000000000000000000000000000000000000000000000000000000ffd87a80ff011a00155cc01864ff",
        "d87a9f9f9f0000ffffff",
        "d8799fd8799f9fd8799fd8799fd8799f58200100000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd87a9f581cd57844b24c6b01987d3abb78fac622e0b8a4bd22dca114a6bed3a23dffd87a80ffa240a1401a001e8480581cb37901c0280d6afdea22e8aab77695d4d3d3124cda611dba2268e7ada146737570706c7901d87b9f9f001a3b9aca0000001b000000174876e800009f00001b0000000757b12c009f188c01ffffffffd87a80ffffd8799fd8799fd8799f58200300000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd87a9f581ce24e2fb0a6460444d32fd815575372ecc21118fa19adcc41cd00c2baffd87a80ffa240a1401a001e8480581cb37901c0280d6afdea22e8aab77695d4d3d3124cda611dba2268e7ada148617373657473203001d87b9f80ffd87a80ffffd8799fd8799fd8799f58200400000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd87a9f581c77a25c83780079aebd736b087d4098e6b959dedaf6d7dbafe41a93caffd87a80ffa140a1401a0bebc200d87b9f9fd8799fd8799f581c0a000000000000000000000000000000000000000000000000000000ffd87a80ff011a00155cc01864ffffd87a80ffffff9fd8799fd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd87a9f581ce7582f42ddf89748625b58f5272b0047c21b038d2732aead9a02de9effd87a80ffa240a1401a001e8480581cb37901c0280d6afdea22e8aab77695d4d3d3124cda611dba2268e7ada146636f6e66696701d87b9f9f581c7b0000000000000000000000000000000000000000000000000000009f9f191388194e20ff9f0000ff9f18641a05265c00ff9f9f0080ff581c8d95f2f3d764e1a0e167d2228ff2dc4f28080aaab41712398ba9d077194e20ffff9f001864ff581c37c93a0c7183d903c65d51636f067ac4973aec6449ca7454b17108069f00581cf4641b6a4c3ee03358010430d1362f326be4c7163b3a5cb97c3efe40ffd87980ffffd87a80ffffd8799fd8799fd8799f58200200000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd87a9f581cac29f69bbce0ac371ec2d1ea0ed07daa130c21964271e8e1e9d91dbdffd87a80ffa240a1401a001e8480581cb37901c0280d6afdea22e8aab77695d4d3d3124cda611dba2268e7ada145707269636501d87b9f9f9f188c01ff1878ffffd87a80ffffff9fd8799fd8799fd8799f581c0a000000000000000000000000000000000000000000000000000000ffd87a80ffa1581cb37901c0280d6afdea22e8aab77695d4d3d3124cda611dba2268e7ada1440014df101a00157e3bd87b9f01ffd87a80ffffa0a140a1400080a1d8799fd87a9f581c8d95f2f3d764e1a0e167d2228ff2dc4f28080aaab41712398ba9d077ffff00d8799fd8799fd87980d87a80ffd8799fd87a9f18c8ffd87a80ffff9f581c7b000000000000000000000000000000000000000000000000000000ffa1d87b9fd8799fd87a9f581c8d95f2f3d764e1a0e167d2228ff2dc4f28080aaab41712398ba9d077ffffff9f0101ffa0d8799f5820ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd87a9fd8799fd8799f58200400000000000000000000000000000000000000000000000000000000000000ff00ffffff"
    ].map((cbor) => makeUplcDataValue(decodeUplcData(cbor)))

    /**
     * @param {UplcProgramV2} program
     */
    const evalProgram = (program) => {
        const res = program.eval(args)

        if (isRight(res.result)) {
            return "result: " + res.result.right.toString()
        } else if (isLeft(res.result)) {
            return "error"
        }
    }

    strictEqual(evalProgram(uplcProgram0), evalProgram(uplcProgram1))
})
