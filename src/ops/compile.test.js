import { deepEqual, strictEqual } from "node:assert"
import { describe, it } from "node:test"
import { removeWhitespace } from "@helios-lang/codec-utils"
import { format } from "../format/index.js"
import { DEFAULT_PARSE_OPTIONS } from "../parse/index.js"
import { prepare } from "./compile.js"
import { compile } from "./compile.js"
import { UplcDataValue, decodeUplcData } from "@helios-lang/uplc"

describe(prepare.name, () => {
    it("real script 1", () => {
        const src = `(__helios__list[__helios__int]__length) -> {
            (__helios__list[__helios__int]__get) -> {
                (arg0, arg1) -> {
                    (b) -> {
                        constrData(ifThenElse(
                            b,
                            1,
                            0
                        ), mkNilData(()))
                    }((a, b) -> {
                        (__common0) -> {
                            (a, b) -> {
                                ifThenElse(
                                    a,
                                    b,
                                    (b) -> {
                                        ifThenElse(
                                            b,
                                            false,
                                            true
                                        )
                                    }(b)
                                )
                            }(equalsData(listData(a), listData(b)), (a, b) -> {
                                ifThenElse(
                                    a(),
                                    b,
                                    () -> {
                                        false
                                    }
                                )()
                            }(() -> {
                                equalsInteger(__common0, __helios__list[__helios__int]__length(b))
                            }, () -> {
                                (self, fn) -> {
                                    (self, fn) -> {
                                        (recurse) -> {
                                            recurse(recurse, self, fn)
                                        }((recurse, self, fn) -> {
                                            chooseList(self, () -> {
                                                true
                                            }, () -> {
                                                ifThenElse(
                                                    fn(headList__safe(self)),
                                                    () -> {
                                                        recurse(recurse, tailList__safe(self), fn)
                                                    },
                                                    () -> {
                                                        false
                                                    }
                                                )()
                                            })()
                                        })
                                    }(self, (item) -> {
                                        fn(unIData(item))
                                    })
                                }((n) -> {
                                    (recurse) -> {
                                        recurse(recurse, 0)
                                    }((recurse, i) -> {
                                        ifThenElse(
                                            lessThanInteger(i, n),
                                            () -> {
                                                mkCons(iData(i), recurse(recurse, addInteger(i, 1)))
                                            },
                                            () -> {
                                                mkNilData(())
                                            }
                                        )()
                                    })
                                }(__common0), (i) -> {
                                    equalsInteger(__helios__list[__helios__int]__get(a, i), __helios__list[__helios__int]__get(b, i))
                                })
                            }))
                        }(__helios__list[__helios__int]__length(a))
                    }((data) -> {
                        (lst) -> {
                            lst
                        }(unListData(data))
                    }(arg0), (data) -> {
                        (lst) -> {
                            lst
                        }(unListData(data))
                    }(arg1)))
                }
            }((self, index) -> {
                unIData((self, index) -> {
                    (recurse) -> {
                        recurse(recurse, self, 0)
                    }((recurse, self, i) -> {
                        chooseList(self, () -> {
                            error()
                        }, () -> {
                            ifThenElse(
                                equalsInteger(index, i),
                                () -> {
                                    headList__safe(self)
                                },
                                () -> {
                                    recurse(recurse, tailList__safe(self), addInteger(i, 1))
                                }
                            )()
                        })()
                    })
                }(self, index))
            })
        }((lst) -> {
            (recurse) -> {
                recurse(recurse, lst)
            }((recurse, lst) -> {
                chooseList(lst, () -> {
                    0
                }, () -> {
                    addInteger(recurse(recurse, tailList__safe(lst)), 1)
                })()
            })
        })`

        const expectedOutput = `(__helios__list[__helios__int]__length) -> {
    (__helios__list[__helios__int]__get) -> {
        (arg0, arg1) -> {
            (b_4) -> {
                constrData(ifThenElse(
                    b_4,
                    1,
                    0
                ), [])
            }((a, b) -> {
                (__common0) -> {
                    (b_2) -> {
                        ifThenElse(
                            equalsData(listData(a), listData(b)),
                            b_2,
                            ifThenElse(
                                b_2,
                                false,
                                true
                            )
                        )
                    }(ifThenElse(
                        equalsInteger(__common0, __helios__list[__helios__int]__length(b)),
                        () -> {
                            (recurse_7) -> {
                                recurse_7(recurse_7, (recurse_5) -> {
                                    recurse_5(recurse_5, 0)
                                }((recurse_4, i_2) -> {
                                    ifThenElse(
                                        lessThanInteger(i_2, __common0),
                                        () -> {
                                            mkCons(iData(i_2), recurse_4(recurse_4, addInteger(i_2, 1)))
                                        },
                                        () -> {
                                            []
                                        }
                                    )()
                                }), (item) -> {
                                    (i_1) -> {
                                        equalsInteger(__helios__list[__helios__int]__get(a, i_1), __helios__list[__helios__int]__get(b, i_1))
                                    }(unIData(item))
                                })
                            }((recurse_6, self_5, fn_2) -> {
                                chooseList(self_5, () -> {
                                    true
                                }, () -> {
                                    ifThenElse(
                                        fn_2(headList__safe(self_5)),
                                        () -> {
                                            recurse_6(recurse_6, tailList__safe(self_5), fn_2)
                                        },
                                        () -> {
                                            false
                                        }
                                    )()
                                })()
                            })
                        },
                        () -> {
                            false
                        }
                    )())
                }(__helios__list[__helios__int]__length(a))
            }(unListData(arg0), unListData(arg1)))
        }
    }((self, index) -> {
        unIData((recurse_3) -> {
            recurse_3(recurse_3, self, 0)
        }((recurse_2, self_2, i) -> {
            chooseList(self_2, () -> {
                error()
            }, () -> {
                ifThenElse(
                    equalsInteger(index, i),
                    () -> {
                        headList__safe(self_2)
                    },
                    () -> {
                        recurse_2(recurse_2, tailList__safe(self_2), addInteger(i, 1))
                    }
                )()
            })()
        }))
    })
}((lst) -> {
    (recurse_1) -> {
        recurse_1(recurse_1, lst)
    }((recurse, lst_1) -> {
        chooseList(lst_1, () -> {
            0
        }, () -> {
            addInteger(recurse(recurse, tailList__safe(lst_1)), 1)
        })()
    })
})`
        const expr = prepare(src, { optimize: true })

        const output = format(expr, { syntacticSugar: false })

        strictEqual(removeWhitespace(output), removeWhitespace(expectedOutput))
    })

    it("real script 2", () => {
        const src = `(group_ptrs, first_id, max_tick, __CONTEXT) -> {
            (__helios__assert) -> {
    (__helios__common__enum_fields) -> {
    (__helios__common__enum_field_0) -> {
    (__helios__txoutput__address) -> {
    (__helios__common__enum_fields_after_0) -> {
    (__helios__common__enum_field_1) -> {
    (__helios__txinput__output) -> {
    (__helios__txinput__address) -> {
    (__helios__txoutputdatum__inline) -> {
    (__helios__common__enum_fields_after_1) -> {
    (__helios__common__enum_field_2) -> {
    (__helios__txoutput__datum) -> {
    (__helios__txinput__datum) -> {
    (__helios__tx__ref_inputs) -> {
    (__helios__option__NONE) -> {
    (__helios__common__list_1) -> {
    (__helios__int____to_data) -> {
    (__helios__time____to_data) -> {
    (__helios__common__enum_tag_equals) -> {
    (__helios__common__fold) -> {
    (__helios__common__identity) -> {
    (__helios__value__get_policy) -> {
    (__helios__txoutput__value) -> {
    (__helios__txinput__value) -> {
    (__helios__ratio__top) -> {
    (__helios__ratio__bottom) -> {
    (__helios__ratio__floor) -> {
    (__helios__int____mul) -> {
    (__helios__ratio__new) -> {
    (__helios__ratio____mul1) -> {
    (__helios__common__struct_fields_after_0) -> {
    (__helios__common__struct_fields_after_1) -> {
    (__helios__common__struct_fields_after_2) -> {
    (__helios__common__struct_fields_after_3) -> {
    (__helios__common__struct_field_4) -> {
    (__helios__ratio__from_data) -> {
    (__helios__common__struct_field_3) -> {
    (__helios__common__struct_field_2) -> {
    (__helios__common__struct_field_1) -> {
    (__helios__struct__from_data) -> {
    (__helios__common__test_constr_data_2) -> {
    (__helios__bytearray__is_valid_data_fixed_length) -> {
    (__helios__mintingpolicyhash__is_valid_data) -> {
    (__helios__bytearray__is_valid_data) -> {
    (__helios__assetclass__is_valid_data) -> {
    (__helios__int__is_valid_data) -> {
    (__helios__common__test_list_data) -> {
    (__helios__common__test_list_head_data) -> {
    (__helios__common__list_2) -> {
    (__helios__address__new) -> {
    (__helios__spendingcredential__new_validator) -> {
    (__helios__address__from_validator) -> {
    (__helios__common__length) -> {
    (__helios__mintingpolicyhash__from_data) -> {
    (__helios__assetclass__mph) -> {
    (__helios__assetclass__new) -> {
    (__helios__value__get_singleton_asset_class) -> {
    (__helios__scriptcontext__purpose) -> {
    (__helios__scriptcontext__get_spending_purpose_output_id) -> {
    (__helios__txinput__output_id) -> {
    (__helios__tx__inputs) -> {
    (__helios__scriptcontext__get_current_input) -> {
    (__helios__mintingpolicyhash__from_script_hash) -> {
    (__helios__common__starts_with) -> {
    (__helios__bytearray__starts_with) -> {
    (__helios__int__parse_digit) -> {
    (__helios__int__parse) -> {
    (__helios__bytearray__decode_utf8) -> {
    (__helios__int__max) -> {
    (__helios__common__slice_bytearray) -> {
    (__helios__bytearray__slice) -> {
    (__helios__bytearray__length) -> {
    (__helios__string__encode_utf8) -> {
    (__helios__scripts__assets_validator) -> {
    (__module__TokenNames__assets_prefix) -> {
    (__helios__option[__helios__int]__some____new) -> {
    (__module__TokenNames__parse_series) -> {
    (__module__TokenNames__parse_assets) -> {
    (__module__Tokens__indirect_policy) -> {
    (__module__Tokens__policy) -> {
    (__helios__map[__helios__bytearray@__helios__int]__length) -> {
    (__helios__map[__helios__bytearray@__helios__int]__head) -> {
    (__helios__option[__helios__int]__unwrap) -> {
    (__module__Addresses__assets) -> {
    (__module__AssetModule__Asset[]__count) -> {
    (__module__AssetModule__Asset[]__count_tick) -> {
    (__module__AssetModule__Asset[]__price) -> {
    (__module__AssetModule__Asset[]__price_timestamp) -> {
    (__module__AssetModule__Asset[]__calc_value) -> {
    (__module__Tokens__parse_assets[__helios__txinput]) -> {
    (__helios__list[__helios__data]__get) -> {
    (__helios__list[__helios__txinput]__get) -> {
    (__helios__list[__helios__int]__fold3[__helios__int@__helios__option[__helios__time]@__helios__int]) -> {
    (__helios__list[__module__AssetModule__Asset[]]__fold2[__helios__option[__helios__time]@__helios__int]) -> {
    (__helios__option[__helios__time]__none____is) -> {
    (__helios__option[__helios__time]__some____new) -> {
    (__helios__option[__helios__time]__some__some) -> {
    (__helios__option[__helios__time]__none____new) -> {
    (__helios__option[__helios__time]__unwrap) -> {
    (__module__AssetGroupModule__sum_total_asset_value) -> {
    __module__AssetGroupModule__sum_total_asset_value(group_ptrs, first_id, max_tick)
    }(
    /*__module__AssetGroupModule__sum_total_asset_value*/
    (group_ptrs, first_id, max_tick) -> {
    (ref_inputs) -> {
        __helios__list[__helios__int]__fold3[__helios__int@__helios__option[__helios__time]@__helios__int](group_ptrs)((expected_id, tp, dV, ptr) -> {
            (input) -> {
                (id) -> {
                    __core__chooseUnit(__helios__assert(__core__equalsData(__helios__txinput__address(input), __module__Addresses__assets), "asset group not at correct address"), __core__chooseUnit(__helios__assert(__core__equalsInteger(id, expected_id), "assets id doesn't match expected id (asset groups not iterated in order)"), (group) -> {
                        __helios__list[__module__AssetModule__Asset[]]__fold2[__helios__option[__helios__time]@__helios__int](group)((tp, dV, asset) -> {
                            __core__chooseUnit(__helios__assert(__core__lessThanEqualsInteger(__module__AssetModule__Asset[]__count_tick(asset), max_tick), "asset changed count after reduction start"), (callback) -> {
                                callback(
                                    (e0) ->
                                        {(
    __core__ifThenElse(
                __helios__option[__helios__time]__none____is(e0),
                () -> {
                    (__lhs_0) -> {
                                                    __helios__option[__helios__time]__some____new(__module__AssetModule__Asset[]__price_timestamp(asset))
                                                }
                }, () -> {
                    (__lhs_0) -> {
                                                    (tp_old) -> {
                                                        __helios__option[__helios__time]__some____new(__core__ifThenElse(__core__lessThanInteger(__module__AssetModule__Asset[]__price_timestamp(asset), tp_old), () -> {__module__AssetModule__Asset[]__price_timestamp(asset)}, () -> {() -> {tp_old}()})())
                                                    }(__helios__option[__helios__time]__some__some(__lhs_0))
                                                }
                }
            )()
                                        )(e0)}(tp),
                                    __core__addInteger(dV, __module__AssetModule__Asset[]__calc_value(asset)())
                                )
                            })
                        }, tp, dV)(
                            (tp, dV) -> {
                                (callback) -> {
                                callback(
                                    __core__addInteger(expected_id, 1),
                                    tp,
                                    dV
                                )
                            }
                            }
                        )
                    }(__core__unListData(__helios__txoutputdatum__inline(__helios__txinput__datum(input))))))
                }(__module__Tokens__parse_assets[__helios__txinput](input))
            }(__helios__list[__helios__txinput]__get(ref_inputs)(ptr))
        }, first_id, __helios__option[__helios__time]__none____new(), 0)(
            (__lhs_0, tp, dV) -> {
                (callback) -> {
                callback(
                    __helios__option[__helios__time]__unwrap(tp)(),
                    dV
                )
            }
            }
        )
    }(__helios__tx__ref_inputs(__helios__common__enum_field_0(__CONTEXT)))
    }
    )
    }(
    /*__helios__option[__helios__time]__unwrap*/
    (self) -> {
        () -> {
            __core__unIData(__helios__common__enum_field_0(self))
        }
    }
    )
    }(
    /*__helios__option[__helios__time]__none____new*/
    () -> {
        __helios__option__NONE
    }
    )
    }(
    /*__helios__option[__helios__time]__some__some*/
    (self) -> {
        __core__unIData(__helios__common__enum_field_0(self))
    }
    )
    }(
    /*__helios__option[__helios__time]__some____new*/
    (some) -> {
        __core__constrData(0, __helios__common__list_1(__helios__time____to_data(some)))
    }
    )
    }(
    /*__helios__option[__helios__time]__none____is*/
    (data) -> {
            __helios__common__enum_tag_equals(data, 1)
        }
    )
    }(
    /*__helios__list[__module__AssetModule__Asset[]]__fold2[__helios__option[__helios__time]@__helios__int]*/
    (self) -> {
        (fn, a0, b0) -> {
            __helios__common__fold(
                self,
                (prev, item) -> {
                    prev(
                        (a, b) -> {
                            fn(a, b, __helios__struct__from_data(item))
                        }
                    )
                },
                (callback) -> {
                    callback(a0, b0)
                }
            )
        }
    }
    )
    }(
    /*__helios__list[__helios__int]__fold3[__helios__int@__helios__option[__helios__time]@__helios__int]*/
    (self) -> {
        (fn, a0, b0, c0) -> {
            __helios__common__fold(
                self,
                (prev, item) -> {
                    prev(
                        (a, b, c) -> {
                            fn(a, b, c, __core__unIData(item))
                        }
                    )
                },
                (callback) -> {
                    callback(a0, b0, c0)
                }
            )
        }
    }
    )
    }(
    /*__helios__list[__helios__txinput]__get*/
    (self) -> {
        (index) -> {
            __helios__list[__helios__data]__get(self)(index)
        }
    }
    )
    }(
    /*__helios__list[__helios__data]__get*/
    (self) -> {
        (index) -> {
            recurse = (recurse, self, i) -> {
                __core__chooseList(
                    self, 
                    () -> {
                        error()
                    }, 
                    () -> {
                        __core__ifThenElse(
                            __core__equalsInteger(index, i), 
                            () -> {
                                __core__headList__safe(self)
                            }, 
                            () -> {
                                recurse(recurse, __core__tailList__safe(self), __core__addInteger(i, 1))
                            }
                        )()
                    }
                )()
            };
            recurse(recurse, self, 0)
        }
    }
    )
    }(
    /*__module__Tokens__parse_assets[__helios__txinput]*/
    (v) -> {
    (tokens) -> {
        __core__chooseUnit(__helios__assert(__core__equalsInteger(__helios__map[__helios__bytearray@__helios__int]__length(tokens), 1), "can only contain one assets token"), __helios__map[__helios__bytearray@__helios__int]__head(tokens)(
            (token_name, qty) -> {
                __core__chooseUnit(__helios__assert(__core__equalsInteger(qty, 1), "expected only 1 assets token"), __helios__option[__helios__int]__unwrap(__module__TokenNames__parse_assets(token_name))())
            }
        ))
    }(__helios__value__get_policy(__helios__txinput__value(v))(__module__Tokens__policy))
    }
    )
    }(
    /*__module__AssetModule__Asset[]__calc_value*/
    (self) -> {
    () -> {
        __helios__ratio__floor(__helios__ratio____mul1(__module__AssetModule__Asset[]__price(self), __module__AssetModule__Asset[]__count(self)))()
    }
    }
    )
    }(
    /*__module__AssetModule__Asset[]__price_timestamp*/
    (self) -> {
        __core__unIData(__helios__common__struct_field_4(self))
                        }
    )
    }(
    /*__module__AssetModule__Asset[]__price*/
    (self) -> {
                            __helios__ratio__from_data(__helios__common__struct_field_3(self))
                        }
    )
    }(
    /*__module__AssetModule__Asset[]__count_tick*/
    (self) -> {
        __core__unIData(__helios__common__struct_field_2(self))
                        }
    )
    }(
    /*__module__AssetModule__Asset[]__count*/
    (self) -> {
        __core__unIData(__helios__common__struct_field_1(self))
                        }
    )
    }(
    /*__module__Addresses__assets*/
    __helios__address__from_validator(__helios__scripts__assets_validator)
    )
    }(
    /*__helios__option[__helios__int]__unwrap*/
    (self) -> {
        () -> {
            __core__unIData(__helios__common__enum_field_0(self))
        }
    }
    )
    }(
    /*__helios__map[__helios__bytearray@__helios__int]__head*/
    (self) -> {
        head = __core__headList(self);
        (callback) -> {
            callback(__core__unBData(__core__fstPair(head)), __core__unIData(__core__sndPair(head)))
        }
    }
    )
    }(
    /*__helios__map[__helios__bytearray@__helios__int]__length*/
    (self) -> {
        __helios__common__length(self)
    }
    )
    }(
    /*__module__Tokens__policy*/
        __module__Tokens__indirect_policy()
    )
    }(
    /*__module__Tokens__indirect_policy*/
    () -> {
    (input) -> {
        __helios__assetclass__mph(__helios__value__get_singleton_asset_class(__helios__txinput__value(input))())
    }(__helios__scriptcontext__get_current_input())
    }
    )
    }(
    /*__module__TokenNames__parse_assets*/
    (token_name) -> {
    __module__TokenNames__parse_series(__module__TokenNames__assets_prefix, token_name)
    }
    )
    }(
    /*__module__TokenNames__parse_series*/
    (prefix, token_name) -> {
    __core__ifThenElse(__helios__bytearray__starts_with(token_name)(prefix), () -> {(id) -> {
        __helios__option[__helios__int]__some____new(__helios__int__parse(__helios__bytearray__decode_utf8(id)()))
    }(__helios__bytearray__slice(token_name)(__helios__bytearray__length(prefix), __helios__bytearray__length(token_name)))}, () -> {() -> {__helios__option__NONE}()})()
    }
    )
    }(
    /*__helios__option[__helios__int]__some____new*/
    (some) -> {
        __core__constrData(0, __helios__common__list_1(__helios__int____to_data(some)))
    }
    )
    }(
    /*__module__TokenNames__assets_prefix*/
    __helios__string__encode_utf8("assets ")()
    )
    }(
    /*__helios__scripts__assets_validator*/
    #c809112948b8ce3c9f93b086aca545fe231ef0ec46605c70717e830a
    )
    }(
    /*__helios__string__encode_utf8*/
    (self) -> {
        () -> {
            __core__encodeUtf8(self)
        }
    }
    )
    }(
    /*__helios__bytearray__length*/
    __core__lengthOfByteString
    )
    }(
    /*__helios__bytearray__slice*/
    (self) -> {
        __helios__common__slice_bytearray(self, __core__lengthOfByteString)
    }
    )
    }(
    /*__helios__common__slice_bytearray*/
    (self, selfLengthFn) -> {
        (start, end) -> {
            (normalize) -> {
                (fn) -> {
                    fn(normalize(start))
                }(
                    (start) -> {
                        (fn) -> {
                            fn(normalize(end))
                        }(
                            (end) -> {
                                __core__sliceByteString(start, __core__subtractInteger(end, __helios__int__max(start, 0)), self)
                            }
                        )
                    }
                )
            }(
                (pos) -> {
                    __core__ifThenElse(
                        __core__lessThanInteger(pos, 0),
                        () -> {
                            __core__addInteger(__core__addInteger(selfLengthFn(self), 1), pos)
                        },
                        () -> {
                            pos
                        }
                    )()
                }
            )
        }
    }
    )
    }(
    /*__helios__int__max*/
    (a, b) -> {
        __core__ifThenElse(
            __core__lessThanInteger(a, b),
            b,
            a
        )
    }
    )
    }(
    /*__helios__bytearray__decode_utf8*/
    (self) -> {
        () -> {
            __core__decodeUtf8(self)
        }
    }
    )
    }(
    /*__helios__int__parse*/
    (string) -> {
        bytes = __core__encodeUtf8(string);
        n = __core__lengthOfByteString(bytes);
        b0 = __core__indexByteString(bytes, 0);
        recurse = (recurse, acc, i) -> {
            __core__ifThenElse(
                __core__equalsInteger(i, n),
                () -> {
                    acc
                },
                () -> {
                    new_acc = __core__addInteger(
                        __core__multiplyInteger(acc, 10), 
                        __helios__int__parse_digit(__core__indexByteString(bytes, i))
                    );
                    recurse(recurse, new_acc, __core__addInteger(i, 1))
                }
            )()
        };
        __core__ifThenElse(
            __core__equalsInteger(b0, 48),
            () -> {
                __core__ifThenElse(
                    __core__equalsInteger(n, 1),
                    () -> {
                        0
                    },
                    () -> {
                        error()
                    }
                )()
            },
            () -> {
                __core__ifThenElse(
                    __core__equalsInteger(b0, 45),
                    () -> {
                        __core__ifThenElse(
                            __core__equalsInteger(__core__indexByteString(bytes, 1), 48),
                            () -> {
                                error()
                            },
                            () -> {
                                __core__multiplyInteger(
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
        __core__ifThenElse(
            __core__lessThanEqualsInteger(digit, 57),
            () -> {
                __core__ifThenElse(
                    __core__lessThanEqualsInteger(48, digit),
                    () -> {
                        __core__subtractInteger(digit, 48)
                    },
                    () -> {
                        error()
                    }
                )()
            },
            () -> {
                error()
            }
        )()
    }
    )
    }(
    /*__helios__bytearray__starts_with*/
    (self) -> {
        __helios__common__starts_with(self, __core__lengthOfByteString)
    }
    )
    }(
    /*__helios__common__starts_with*/
    (self, selfLengthFn) -> {
        (prefix) -> {
            (n, m) -> {
                __core__ifThenElse(
                    __core__lessThanInteger(n, m),
                    () -> {false},
                    () -> {
                        __core__equalsByteString(prefix, __core__sliceByteString(0, m, self))
                    }
                )()
            }(selfLengthFn(self), __core__lengthOfByteString(prefix))
        }
    }
    )
    }(
    /*__helios__mintingpolicyhash__from_script_hash*/
    __helios__common__identity
    )
    }(
    /*__helios__scriptcontext__get_current_input*/
    () -> {
        id = __helios__scriptcontext__get_spending_purpose_output_id();
        recurse = (recurse, lst) -> {
            __core__chooseList(
                lst,
                () -> {error()},
                () -> {
                    item = __core__headList__safe(lst);
                    __core__ifThenElse(
                        __core__equalsData(__helios__txinput__output_id(item), id),
                        () -> {item},
                        () -> {recurse(recurse, __core__tailList__safe(lst))}
                    )()
                }
            )()
        };
        recurse(recurse, __helios__tx__inputs(__helios__common__enum_field_0(__CONTEXT)))
    }
    )
    }(
    /*__helios__tx__inputs*/
    (self) -> {
        __core__unListData(__helios__common__enum_field_0(self))
    }
    )
    }(
    /*__helios__txinput__output_id*/
    __helios__common__enum_field_0
    )
    }(
    /*__helios__scriptcontext__get_spending_purpose_output_id*/
    () -> {
        __helios__common__enum_field_0(__helios__scriptcontext__purpose)
    }
    )
    }(
    /*__helios__scriptcontext__purpose*/
    __helios__common__enum_field_1(__CONTEXT)
    )
    }(
    /*__helios__value__get_singleton_asset_class*/
    (self) -> {
            () -> {
                recurse = (map, found, asset_class) -> {
                    __core__chooseList(
                        map,
                        () -> {
                            __core__ifThenElse(
                                found,
                                () -> {
                                    asset_class
                                },
                                () -> {
                                    error()
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
                                    recurse(tail, found, asset_class)
                                },
                                () -> {
                                    __core__ifThenElse(
                                        found,
                                        () -> {
                                            error()
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
                                                            recurse(tail, true, __helios__assetclass__new(mph, name))
                                                        },
                                                        () -> {
                                                            error()
                                                        }
                                                    )()
                                                },
                                                () -> {
                                                    error()
                                                }
                                            )()
                                        }
                                    )()
                                }
                            )()
                        }
                    )()
                };
                recurse(self, false, ())
            }
        }
    )
    }(
    /*__helios__assetclass__new*/
    (mph, token_name) -> {
        __core__constrData(0, __helios__common__list_2(
            __core__bData(mph), 
            __core__bData(token_name)
        ))
    }
    )
    }(
    /*__helios__assetclass__mph*/
    (self) -> {
        __helios__mintingpolicyhash__from_data(__helios__common__enum_field_0(self))
    }
    )
    }(
    /*__helios__mintingpolicyhash__from_data*/
    __core__unBData
    )
    }(
    /*__helios__common__length*/
    (lst) -> {
        (recurse) -> {
            recurse(recurse, lst)
        }(
            (recurse, lst) -> {
                __core__chooseList(
                    lst, 
                    () -> {0}, 
                    () -> {__core__addInteger(recurse(recurse, __core__tailList__safe(lst)), 1)}
                )()
            }
        )
    }
    )
    }(
    /*__helios__address__from_validator*/
    (vh) -> {
            __helios__address__new(
                __helios__spendingcredential__new_validator(vh),
                __helios__option__NONE
            )
        }
    )
    }(
    /*__helios__spendingcredential__new_validator*/
    (hash) -> {
        __core__constrData(1, __helios__common__list_1(__core__bData(hash)))
    }
    )
    }(
    /*__helios__address__new*/
    (cred, staking_cred) -> {
        __core__constrData(0, __helios__common__list_2(cred, staking_cred))
    }
    )
    }(
    /*__helios__common__list_2*/
    (arg0, arg1) -> {
        __core__mkCons(arg0, __helios__common__list_1(arg1))
    }
    )
    }(
    /*__helios__common__test_list_head_data*/
    (test_head, test_tail) -> {
            (list) -> {
                __core__chooseList(
                    list,
                    () -> {
                        false
                    },
                    () -> {
                        __core__ifThenElse(
                            test_head(__core__headList(list)),
                            () -> {
                                test_tail(__core__tailList(list))
                            },
                            () -> {
                                false
                            }
                        )()
                    }
                )()
            }
        }
    )
    }(
    /*__helios__common__test_list_data*/
    (data, fn) -> {
            __core__chooseData(
                data,
                () -> {false},
                () -> {false},
                () -> {fn(__core__unListData(data))},
                () -> {false},
                () -> {false}
            )()
        }
    )
    }(
    /*__helios__int__is_valid_data*/
    (data) -> {
        __core__chooseData(data, false, false, false, true, false)
    }
    )
    }(
    /*__helios__assetclass__is_valid_data*/
    (data) -> {
        __helios__common__test_constr_data_2(data, 0, __helios__mintingpolicyhash__is_valid_data, __helios__bytearray__is_valid_data)
    }
    )
    }(
    /*__helios__bytearray__is_valid_data*/
    (data) -> {
        __core__chooseData(data, false, false, false, false, true)
    }
    )
    }(
    /*__helios__mintingpolicyhash__is_valid_data*/
    (data) -> {
            __helios__bytearray__is_valid_data_fixed_length(data, 28)
        }
    )
    }(
    /*__helios__bytearray__is_valid_data_fixed_length*/
    (data, n) -> {
        __core__chooseData(
            data,
            () -> {false},
            () -> {false},
            () -> {false},
            () -> {false},
            () -> {
                bytes = __core__unBData__safe(data);
                __core__ifThenElse(
                    __core__equalsInteger(__core__lengthOfByteString(bytes), n),
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
    )
    }(
    /*__helios__common__test_constr_data_2*/
    (data, index, test_a, test_b) -> {
        __core__chooseData(
            data,
            () -> {
                pair = __core__unConstrData__safe(data);
                __core__ifThenElse(
                    __core__equalsInteger(__core__fstPair(pair), index),
                    () -> {
                        fields = __core__sndPair(pair);
                        __core__chooseList(
                            fields,
                            () -> {
                                false
                            },
                            () -> {
                                __core__ifThenElse(
                                    test_a(__core__headList__safe(fields)),
                                    () -> {
                                        tail = __core__tailList__safe(fields);
                                        __core__chooseList(
                                            tail,
                                            () -> {
                                                false
                                            },
                                            () -> {
                                                __core__ifThenElse(
                                                    test_b(__core__headList__safe(tail)),
                                                    () -> {
                                                        __core__chooseList(
                                                            __core__tailList__safe(tail), 
                                                            () -> {
                                                                true
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
                                    },
                                    () -> {
                                        false
                                    }
                                )()
                            }
                        )()
                    },
                    () -> {
                        false
                    }
                )()
            },
            () -> {false},
            () -> {false},
            () -> {false},
            () -> {false}
        )()
    }
    )
    }(
    /*__helios__struct__from_data*/
    __core__unListData
    )
    }(
    /*__helios__common__struct_field_1*/
    (self) -> {
        __core__headList(__helios__common__struct_fields_after_0(self))
    }
    )
    }(
    /*__helios__common__struct_field_2*/
    (self) -> {
        __core__headList(__helios__common__struct_fields_after_1(self))
    }
    )
    }(
    /*__helios__common__struct_field_3*/
    (self) -> {
        __core__headList(__helios__common__struct_fields_after_2(self))
    }
    )
    }(
    /*__helios__ratio__from_data*/
    __helios__common__identity
    )
    }(
    /*__helios__common__struct_field_4*/
    (self) -> {
        __core__headList(__helios__common__struct_fields_after_3(self))
    }
    )
    }(
    /*__helios__common__struct_fields_after_3*/
    (self) -> {
        __core__tailList(__helios__common__struct_fields_after_2(self))
    }
    )
    }(
    /*__helios__common__struct_fields_after_2*/
    (self) -> {
        __core__tailList(__helios__common__struct_fields_after_1(self))
    }
    )
    }(
    /*__helios__common__struct_fields_after_1*/
    (self) -> {
        __core__tailList(__helios__common__struct_fields_after_0(self))
    }
    )
    }(
    /*__helios__common__struct_fields_after_0*/
    __core__tailList
    )
    }(
    /*__helios__ratio____mul1*/
    (a, b) -> {
        at = __helios__ratio__top(a);
        ab = __helios__ratio__bottom(a);
        new_top = __helios__int____mul(at, b);
        __helios__ratio__new(new_top, ab)
    }
    )
    }(
    /*__helios__ratio__new*/
    (top, bottom) -> {
        __core__listData(
            __core__mkCons(
                __core__iData(top),
                __core__mkCons(
                    __core__iData(bottom), 
                    __core__mkNilData(())
                )
            )
        )
    }
    )
    }(
    /*__helios__int____mul*/
    __core__multiplyInteger
    )
    }(
    /*__helios__ratio__floor*/
    (self) -> {
            () -> {
                top = __helios__ratio__top(self);
                bottom = __helios__ratio__bottom(self);
                __core__divideInteger(top, bottom)
            }
        }
    )
    }(
    /*__helios__ratio__bottom*/
    (self) -> {
        __core__unIData(__core__headList(__core__tailList(__core__unListData(self))))
    }
    )
    }(
    /*__helios__ratio__top*/
    (self) -> {
        __core__unIData(__core__headList(__core__unListData(self)))
    }
    )
    }(
    /*__helios__txinput__value*/
    (self) -> {
        __helios__txoutput__value(__helios__txinput__output(self))
    }
    )
    }(
    /*__helios__txoutput__value*/
    (self) -> {
        __core__unMapData(__helios__common__enum_field_1(self))
    }
    )
    }(
    /*__helios__value__get_policy*/
    (self) -> {
        (mph) -> {
            mph = __core__bData(mph);
            recurse = (recurse, map) -> {
                __core__chooseList(
                    map,
                    () -> {error()},
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(__core__fstPair(__core__headList__safe(map)), mph),
                            () -> {
                                __core__unMapData(__core__sndPair(__core__headList__safe(map)))
                            },
                            () -> {
                                recurse(recurse, __core__tailList__safe(map))
                            }
                        )()
                    }
                )()
            };
            recurse(recurse, self)
        } 
    }
    )
    }(
    /*__helios__common__identity*/
    (self) -> {self}
    )
    }(
    /*__helios__common__fold*/
    (self, fn, z) -> {
        (recurse) -> {
            recurse(recurse, self, z)
        }(
            (recurse, self, z) -> {
                __core__chooseList(
                    self, 
                    () -> {z}, 
                    () -> {recurse(recurse, __core__tailList__safe(self), fn(z, __core__headList__safe(self)))}
                )()
            }
        )
    }
    )
    }(
    /*__helios__common__enum_tag_equals*/
    (data, i) -> {
            __core__equalsInteger(__core__fstPair(__core__unConstrData(data)), i)
        }
    )
    }(
    /*__helios__time____to_data*/
    __helios__int____to_data
    )
    }(
    /*__helios__int____to_data*/
    __core__iData
    )
    }(
    /*__helios__common__list_1*/
    (a) -> {
        __core__mkCons(a, __core__mkNilData(()))
    }
    )
    }(
    /*__helios__option__NONE*/
    __core__constrData(1, __core__mkNilData(()))
    )
    }(
    /*__helios__tx__ref_inputs*/
    (self) -> {
        __core__unListData(__helios__common__enum_field_1(self))
    }
    )
    }(
    /*__helios__txinput__datum*/
    (self) -> {
        __helios__txoutput__datum(__helios__txinput__output(self))
    }
    )
    }(
    /*__helios__txoutput__datum*/
    __helios__common__enum_field_2
    )
    }(
    /*__helios__common__enum_field_2*/
    (self) -> {
        __core__headList(__helios__common__enum_fields_after_1(self))
    }
    )
    }(
    /*__helios__common__enum_fields_after_1*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_0(self))
    }
    )
    }(
    /*__helios__txoutputdatum__inline*/
    (self) -> {
        pair = __core__unConstrData(self);
        index = __core__fstPair(pair);
        fields = __core__sndPair(pair);
        __core__ifThenElse(
            __core__equalsInteger(index, 2),
            () -> {
                __core__headList(fields)
            },
            () -> {
                error()
            }
        )()
    }
    )
    }(
    /*__helios__txinput__address*/
    (self) -> {
        __helios__txoutput__address(__helios__txinput__output(self))
    }
    )
    }(
    /*__helios__txinput__output*/
    __helios__common__enum_field_1
    )
    }(
    /*__helios__common__enum_field_1*/
    (self) -> {
        __core__headList(__helios__common__enum_fields_after_0(self))
    }
    )
    }(
    /*__helios__common__enum_fields_after_0*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields(self))
    }
    )
    }(
    /*__helios__txoutput__address*/
    __helios__common__enum_field_0
    )
    }(
    /*__helios__common__enum_field_0*/
    (self) -> {
        __core__headList(__helios__common__enum_fields(self))
    }
    )
    }(
    /*__helios__common__enum_fields*/
    (self) -> {
        __core__sndPair(__core__unConstrData(self))
    }
    )
    }(
    /*__helios__assert*/
    (cond, msg) -> {
        __core__ifThenElse(
            cond,
            () -> {
                ()
            },
            () -> {
                __core__trace(
                    msg,
                    () -> {
                        error()
                    }
                )()
            }
        )()
    }
    )
        }
    `

        prepare(src, {
            optimize: true,
            parseOptions: {
                ...DEFAULT_PARSE_OPTIONS,
                builtinsPrefix: "__core__"
            }
        })
    })

    it("real script 3", () => {
        const src = `(__CONTEXT, __CURRENT_SCRIPT) -> {
            (__helios__common__list_0) -> {
(__helios__bool____to_data) -> {
(__helios__common__enum_fields) -> {
(__helios__common__enum_field_0) -> {
(__helios__common__enum_fields_after_0) -> {
(__helios__common__enum_field_1) -> {
(__helios__scriptcontext__data) -> {
(__helios__scriptcontext__purpose) -> {
(__helios__scriptcontext__get_spending_purpose_output_id) -> {
(__helios__error) -> {
(__helios__txinput__output_id) -> {
(__helios__tx__inputs) -> {
(__helios__scriptcontext__tx) -> {
(__helios__scriptcontext__get_current_input) -> {
(__helios__tx__ref_inputs) -> {
(__helios__common____eq) -> {
(__helios__address____eq) -> {
(__helios__txoutput__address) -> {
(__helios__txinput__output) -> {
(__helios__txinput__address) -> {
(__helios__assert) -> {
(__helios__txoutputdatum__inline) -> {
(__helios__common__enum_fields_after_1) -> {
(__helios__common__enum_field_2) -> {
(__helios__txoutput__datum) -> {
(__helios__txinput__datum) -> {
(__helios__bool____not) -> {
(__helios__int____gt) -> {
(__helios__value__get_safe) -> {
(__helios__txoutput__value) -> {
(__helios__txinput__value) -> {
(__helios__common__list_1) -> {
(__helios__common__find_safe) -> {
(__helios__common__identity) -> {
(__helios__txinput__from_data) -> {
(__helios__common__enum_tag_equals) -> {
(__helios__struct____to_data) -> {
(__helios__bytearray__is_valid_data_fixed_length) -> {
(__helios__pubkeyhash__is_valid_data) -> {
(__helios__stakingvalidatorhash__is_valid_data) -> {
(__helios__int__is_valid_data) -> {
(__helios__time__is_valid_data) -> {
(__helios__bytearray__is_valid_data) -> {
(__helios__duration__is_valid_data) -> {
(__helios__real__is_valid_data) -> {
(__helios__common__test_constr_data_2) -> {
(__helios__mintingpolicyhash__is_valid_data) -> {
(__helios__assetclass__is_valid_data) -> {
(__helios__common__list_2) -> {
(__helios__address__new) -> {
(__helios__bytearray____to_data) -> {
(__helios__validatorhash____to_data) -> {
(__helios__spendingcredential__new_validator) -> {
(__helios__option__NONE) -> {
(__helios__address__from_validator) -> {
(__helios__mintingpolicyhash____to_data) -> {
(__helios__assetclass__new) -> {
(__helios__bytearray__from_data) -> {
(__helios__mintingpolicyhash__from_data) -> {
(__helios__assetclass__mph) -> {
(__helios__value__get_singleton_asset_class) -> {
(__helios__mintingpolicyhash__from_script_hash) -> {
(__helios__string__encode_utf8) -> {
(__helios__scripts__config_validator) -> {
(__helios__scripts__fund_policy) -> {
(__helios__scriptcontext__current_script) -> {
(__helios__script__assets_validator____is) -> {
(__helios__script__benchmark_delegate____is) -> {
(__helios__script__burn_order_validator____is) -> {
(__helios__script__config_validator____is) -> {
(__helios__script__fund_policy____is) -> {
(__helios__script__metadata_validator____is) -> {
(__helios__script__mint_order_validator____is) -> {
(__helios__script__oracle_delegate____is) -> {
(__helios__script__portfolio_validator____is) -> {
(__helios__script__price_validator____is) -> {
(__helios__script__reimbursement_validator____is) -> {
(__helios__script__supply_validator____is) -> {
(__helios__script__voucher_validator____is) -> {
(__module__TokenNames__config) -> {
(__module__Tokens__direct_policy) -> {
(__module__Tokens__indirect_policy) -> {
(__module__Tokens__policy) -> {
(__module__Tokens__config) -> {
(__module__Addresses__config) -> {
(__module__SuccessFeeModule__SuccessFeeStep[]__is_valid_data) -> {
(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data_internal) -> {
(__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data) -> {
(__module__SuccessFeeModule__SuccessFee[]__is_valid_data) -> {
(__module__ConfigModule__MintFeeConfig[]__is_valid_data) -> {
(__module__ConfigModule__BurnFeeConfig[]__is_valid_data) -> {
(__module__ConfigModule__ManagementFeeConfig[]__is_valid_data) -> {
(__module__ConfigModule__SuccessFeeConfig[]__is_valid_data) -> {
(__module__ConfigModule__FeesConfig[]__is_valid_data) -> {
(__module__ConfigModule__TokenConfig[]__is_valid_data) -> {
(__module__ConfigModule__GovernanceConfig[]__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data) -> {
(__module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data) -> {
(__module__ConfigModule__ConfigState[]__is_valid_data) -> {
(__module__ConfigModule__ConfigState[]__Idle__is_valid_data) -> {
(__module__ConfigModule__ConfigState[]__Changing__is_valid_data) -> {
(__module__ConfigModule__Config[]__is_valid_data) -> {
(__module__ConfigModule__Config[]__from_data) -> {
(__module__ConfigModule__Config[]____to_data) -> {
(__helios__list[__helios__txinput]__find) -> {
(__helios__option[__helios__txinput]__some____is) -> {
(__helios__option[__helios__txinput]__some__some) -> {
(__helios__list[__helios__txinput]__find_safe) -> {
(__module__Tokens__contains[__helios__txinput]) -> {
(__module__Tokens__contains_config[__helios__txinput]) -> {
(__helios__data__as[__module__ConfigModule__Config[]]) -> {
(__module__ConfigModule__Config[]__find) -> {
(__helios__tuple[__module__ConfigModule__Config[]@__helios__bool]____to_data) -> {
__helios__tuple[__module__ConfigModule__Config[]@__helios__bool]____to_data(__module__ConfigModule__Config[]__find())
}(
    /*__helios__tuple[__module__ConfigModule__Config[]@__helios__bool]____to_data*/
    (tuple) -> {
            tuple(
                (x0, x1) -> {
                    __core__listData(__core__mkCons(__module__ConfigModule__Config[]____to_data(x0), __core__mkCons(__helios__bool____to_data(x1), __core__mkNilData(()))))
                }
            )
        }
)
}(
    /*__module__ConfigModule__Config[]__find*/
    () -> {
    (e0) ->
        {(
__core__ifThenElse(
				__helios__script__config_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                    (callback) -> {
                        callback(
                            __helios__scriptcontext__get_current_input(),
                            true
                        )
                    }
                }
				}, () -> {
					__core__ifThenElse(
				__helios__script__mint_order_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                    (callback) -> {
                        callback(
                            __helios__list[__helios__txinput]__find(__helios__tx__ref_inputs(__helios__scriptcontext__tx))((input) -> {
                                __helios__address____eq(__helios__txinput__address(input), __module__Addresses__config)
                            }),
                            false
                        )
                    }
                }
				}, () -> {
					__core__ifThenElse(
				__helios__script__burn_order_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                    (callback) -> {
                        callback(
                            __helios__list[__helios__txinput]__find(__helios__tx__ref_inputs(__helios__scriptcontext__tx))((input) -> {
                                __helios__address____eq(__helios__txinput__address(input), __module__Addresses__config)
                            }),
                            false
                        )
                    }
                }
				}, () -> {
					(_) -> {
                    (e0) ->
                        {(
__core__ifThenElse(
				__helios__option[__helios__txinput]__some____is(e0),
				() -> {
					(__lhs_0) -> {
                                    (ref_input) -> {
                                        (callback) -> {
                                        callback(
                                            ref_input,
                                            false
                                        )
                                    }
                                    }(__helios__option[__helios__txinput]__some__some(__lhs_0))
                                }
				}, () -> {
					(_) -> {
                                    (callback) -> {
                                        callback(
                                            __helios__list[__helios__txinput]__find(__helios__tx__inputs(__helios__scriptcontext__tx))((input) -> {
                                                __helios__address____eq(__helios__txinput__address(input), __module__Addresses__config)
                                            }),
                                            true
                                        )
                                    }
                                }
				}
			)()
                        )(e0)}(__helios__list[__helios__txinput]__find_safe(__helios__tx__ref_inputs(__helios__scriptcontext__tx))((input) -> {
                        __helios__address____eq(__helios__txinput__address(input), __module__Addresses__config)
                    }))
                }
				}
			)()
				}
			)()
				}
			)()
        )(e0)}(__helios__scriptcontext__current_script)(
        (input, is_spent) -> {
            __core__chooseUnit(__helios__assert(__module__Tokens__contains_config[__helios__txinput](input), "doesn't contain the config token"), (callback) -> {
            callback(
                __helios__data__as[__module__ConfigModule__Config[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input))),
                is_spent
            )
        })
        }
    )
}
)
}(
    /*__helios__data__as[__module__ConfigModule__Config[]]*/
    (data) -> {
                __module__ConfigModule__Config[]__from_data(data)
            }
)
}(
    /*__module__Tokens__contains_config[__helios__txinput]*/
    (v) -> {
    __module__Tokens__contains[__helios__txinput](v, __module__Tokens__config)
}
)
}(
    /*__module__Tokens__contains[__helios__txinput]*/
    (v, asset_class) -> {
    __helios__int____gt(__helios__value__get_safe(__helios__txinput__value(v))(asset_class), 0)
}
)
}(
    /*__helios__list[__helios__txinput]__find_safe*/
    (self) -> {
        (fn) -> {
            __helios__common__find_safe(
                self,
                (item) -> {
                    fn(__helios__txinput__from_data(item))
                },
                __helios__common__identity
            )
        }
    }
)
}(
    /*__helios__option[__helios__txinput]__some__some*/
    (self) -> {
        __helios__txinput__from_data(__helios__common__enum_field_0(self))
    }
)
}(
    /*__helios__option[__helios__txinput]__some____is*/
    (data) -> {
            __helios__common__enum_tag_equals(data, 0)
        }
)
}(
    /*__helios__list[__helios__txinput]__find*/
    (self) -> {
        (fn) -> {
            recurse = (recurse, lst) -> {
                __core__chooseList(
                    lst, 
                    () -> {__helios__error("not found")}, 
                    () -> {
                        item = __helios__txinput__from_data(__core__headList__safe(lst));
                        __core__ifThenElse(
                            fn(item), 
                            () -> {item}, 
                            () -> {recurse(recurse, __core__tailList__safe(lst))}
                        )()
                    }
                )()
            };
            recurse(recurse, self)
        }
    }
)
}(
    /*__module__ConfigModule__Config[]____to_data*/
    __helios__struct____to_data
)
}(
    /*__module__ConfigModule__Config[]__from_data*/
    (data) -> {
					(ignore) -> {
						__core__unListData(data)
					}(
						__core__ifThenElse(
							__module__ConfigModule__Config[]__is_valid_data(data),
							() -> {
								()
							},
							() -> {
								__core__trace("Warning: invalid Config data", ())
							}
						)()
					)
				}
)
}(
    /*__module__ConfigModule__Config[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__pubkeyhash__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__FeesConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__TokenConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__GovernanceConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__ConfigState[]__is_valid_data(__module__ConfigModule__ConfigState[]__Idle__is_valid_data, __module__ConfigModule__ConfigState[]__Changing__is_valid_data)(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__ConfigState[]__Changing__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 1),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__time__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__ConfigChangeProposal[]__is_valid_data(__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data)(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigState[]__Idle__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 0),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigState[]__is_valid_data*/
    (__module__ConfigModule__ConfigState[]__Idle__is_valid_data, __module__ConfigModule__ConfigState[]__Changing__is_valid_data) -> {(data) -> {
			__core__ifThenElse(
				__module__ConfigModule__ConfigState[]__Changing__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigState[]__Idle__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					false
				}
			)()
				}
			)()
		}}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 11),
							() -> {
								__helios__bytearray__is_valid_data(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 10),
							() -> {
								__helios__duration__is_valid_data(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 9),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 8),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 7),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 6),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 5),
							() -> {
								__helios__stakingvalidatorhash__is_valid_data(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 4),
							() -> {
								__helios__pubkeyhash__is_valid_data(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 3),
							() -> {
								__helios__int__is_valid_data(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 2),
							() -> {
								(data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__SuccessFeeModule__SuccessFee[]__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 1),
							() -> {
								__helios__assetclass__is_valid_data(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data*/
    (data) -> {
			__core__chooseData(
				data,
				() -> {
					(pair) -> {
						__core__ifThenElse(
							__core__equalsInteger(__core__fstPair(pair), 0),
							() -> {
								__helios__assetclass__is_valid_data(__core__listData(__core__sndPair(pair)))
							},
							() -> {
								false
							}
						)()
					}(__core__unConstrData__safe(data))
				},
				() -> {false},
				() -> {false},
				() -> {false},
				() -> {false}
			)()
		}
)
}(
    /*__module__ConfigModule__ConfigChangeProposal[]__is_valid_data*/
    (__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data, __module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data) -> {(data) -> {
			__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingMetadata__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingMaxPriceAge__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingManagementFee__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingBurnFee__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingMintFee__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingGovernance__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingOracle__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__ChangingAgent__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__IncreasingMaxTokenSupply__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__UpdatingSuccessFee__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__RemovingAssetClass__is_valid_data(data),
				() -> {
					true
				},
				() -> {
					__core__ifThenElse(
				__module__ConfigModule__ConfigChangeProposal[]__AddingAssetClass__is_valid_data(data),
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
		}}
)
}(
    /*__module__ConfigModule__GovernanceConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__TokenConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__FeesConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__MintFeeConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__BurnFeeConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__ManagementFeeConfig[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__ConfigModule__SuccessFeeConfig[]__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__SuccessFeeConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__module__SuccessFeeModule__SuccessFee[]__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__stakingvalidatorhash__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__ManagementFeeConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__duration__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__BurnFeeConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__ConfigModule__MintFeeConfig[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__int__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__SuccessFeeModule__SuccessFee[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data*/
    (data) -> {
        __core__chooseData(
            data,
            () -> {false},
            () -> {false},
            () -> {
                __helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data_internal(__core__unListData__safe(data))
            },
            () -> {false},
            () -> {false}
        )()
    }
)
}(
    /*__helios__list[__module__SuccessFeeModule__SuccessFeeStep[]]__is_valid_data_internal*/
    (lst) -> {
        recurse = (recurse, lst) -> {
            __core__chooseList(
                lst,
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __module__SuccessFeeModule__SuccessFeeStep[]__is_valid_data(__core__headList__safe(lst)),
                        () -> {
                            recurse(recurse, __core__tailList__safe(lst))
                        },
                        () -> {
                            false
                        }
                    )()
                }
            )()
        };
        recurse(recurse, lst)
    }
)
}(
    /*__module__SuccessFeeModule__SuccessFeeStep[]__is_valid_data*/
    (data) -> {
				__core__chooseData(
					data,
					() -> {false},
					() -> {false},
					() -> {
						(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
					__core__chooseList(
						fields,
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__real__is_valid_data(head),
									() -> {(fields) -> {
				__core__chooseList(
					fields,
					true,
					false
				)
			}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__tailList__safe(fields))},
									() -> {false}
								)()
							}(__core__headList__safe(fields))
						}
					)()
				}(__core__unListData__safe(data))
					},
					() -> {false},
					() -> {false}
				)()
			}
)
}(
    /*__module__Addresses__config*/
    __helios__address__from_validator(__helios__scripts__config_validator)
)
}(
    /*__module__Tokens__config*/
    __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__config)
)
}(
    /*__module__Tokens__policy*/
    (e0) ->
    {(
__core__ifThenElse(
				__helios__script__fund_policy____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__mint_order_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__burn_order_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__supply_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__assets_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__portfolio_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__price_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__reimbursement_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__voucher_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__config_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__metadata_validator____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__oracle_delegate____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__benchmark_delegate____is(e0),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
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
			)()
    )(e0)}(__helios__scriptcontext__current_script)
)
}(
    /*__module__Tokens__indirect_policy*/
    () -> {
    (input) -> {
        __helios__assetclass__mph(__helios__value__get_singleton_asset_class(__helios__txinput__value(input))())
    }(__helios__scriptcontext__get_current_input())
}
)
}(
    /*__module__Tokens__direct_policy*/
    __helios__mintingpolicyhash__from_script_hash(__helios__scripts__fund_policy)
)
}(
    /*__module__TokenNames__config*/
    __helios__string__encode_utf8("config")()
)
}(
    /*__helios__script__voucher_validator____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 13)
            }
)
}(
    /*__helios__script__supply_validator____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 12)
            }
)
}(
    /*__helios__script__reimbursement_validator____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 11)
            }
)
}(
    /*__helios__script__price_validator____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 10)
            }
)
}(
    /*__helios__script__portfolio_validator____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 9)
            }
)
}(
    /*__helios__script__oracle_delegate____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 8)
            }
)
}(
    /*__helios__script__mint_order_validator____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 7)
            }
)
}(
    /*__helios__script__metadata_validator____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 6)
            }
)
}(
    /*__helios__script__fund_policy____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 4)
            }
)
}(
    /*__helios__script__config_validator____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 3)
            }
)
}(
    /*__helios__script__burn_order_validator____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 2)
            }
)
}(
    /*__helios__script__benchmark_delegate____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 1)
            }
)
}(
    /*__helios__script__assets_validator____is*/
    (cs) -> {
                __core__equalsInteger(__core__fstPair(__core__unConstrData(cs)), 0)
            }
)
}(
    /*__helios__scriptcontext__current_script*/
    __CURRENT_SCRIPT
)
}(
    /*__helios__scripts__fund_policy*/
    #56d7d8a00a92740fbfd55e38c4e1033d4d8dae442c64a76dfc5196d3
)
}(
    /*__helios__scripts__config_validator*/
    #9bc83a7833cb92aad70490805c24b1f67935d9d5a4ea5ef2e6412c17
)
}(
    /*__helios__string__encode_utf8*/
    (self) -> {
        () -> {
            __core__encodeUtf8(self)
        }
    }
)
}(
    /*__helios__mintingpolicyhash__from_script_hash*/
    __helios__common__identity
)
}(
    /*__helios__value__get_singleton_asset_class*/
    (self) -> {
            () -> {
                recurse = (map, found, asset_class) -> {
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
                                    recurse(tail, found, asset_class)
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
                                                            recurse(tail, true, __helios__assetclass__new(mph, name))
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
                recurse(self, false, ())
            }
        }
)
}(
    /*__helios__assetclass__mph*/
    (self) -> {
        __helios__mintingpolicyhash__from_data(__helios__common__enum_field_0(self))
    }
)
}(
    /*__helios__mintingpolicyhash__from_data*/
    __helios__bytearray__from_data
)
}(
    /*__helios__bytearray__from_data*/
    __core__unBData
)
}(
    /*__helios__assetclass__new*/
    (mph, token_name) -> {
        __core__constrData(0, __helios__common__list_2(
            __helios__mintingpolicyhash____to_data(mph), 
            __helios__bytearray____to_data(token_name)
        ))
    }
)
}(
    /*__helios__mintingpolicyhash____to_data*/
    __helios__bytearray____to_data
)
}(
    /*__helios__address__from_validator*/
    (vh) -> {
            __helios__address__new(
                __helios__spendingcredential__new_validator(vh),
                __helios__option__NONE
            )
        }
)
}(
    /*__helios__option__NONE*/
    __core__constrData(1, __helios__common__list_0)
)
}(
    /*__helios__spendingcredential__new_validator*/
    (hash) -> {
        __core__constrData(1, __helios__common__list_1(__helios__validatorhash____to_data(hash)))
    }
)
}(
    /*__helios__validatorhash____to_data*/
    __helios__bytearray____to_data
)
}(
    /*__helios__bytearray____to_data*/
    __core__bData
)
}(
    /*__helios__address__new*/
    (cred, staking_cred) -> {
        __core__constrData(0, __helios__common__list_2(cred, staking_cred))
    }
)
}(
    /*__helios__common__list_2*/
    (arg0, arg1) -> {
        __core__mkCons(arg0, __helios__common__list_1(arg1))
    }
)
}(
    /*__helios__assetclass__is_valid_data*/
    (data) -> {
        __helios__common__test_constr_data_2(data, 0, __helios__mintingpolicyhash__is_valid_data, __helios__bytearray__is_valid_data)
    }
)
}(
    /*__helios__mintingpolicyhash__is_valid_data*/
    (data) -> {
            __helios__bytearray__is_valid_data_fixed_length(data, 28)
        }
)
}(
    /*__helios__common__test_constr_data_2*/
    (data, index, test_a, test_b) -> {
        __core__chooseData(
            data,
            () -> {
                pair = __core__unConstrData__safe(data);
                __core__ifThenElse(
                    __core__equalsInteger(__core__fstPair(pair), index),
                    () -> {
                        fields = __core__sndPair(pair);
                        __core__chooseList(
                            fields,
                            () -> {
                                false
                            },
                            () -> {
                                __core__ifThenElse(
                                    test_a(__core__headList__safe(fields)),
                                    () -> {
                                        tail = __core__tailList__safe(fields);
                                        __core__chooseList(
                                            tail,
                                            () -> {
                                                false
                                            },
                                            () -> {
                                                __core__ifThenElse(
                                                    test_b(__core__headList__safe(tail)),
                                                    () -> {
                                                        __core__chooseList(
                                                            __core__tailList__safe(tail), 
                                                            () -> {
                                                                true
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
                                    },
                                    () -> {
                                        false
                                    }
                                )()
                            }
                        )()
                    },
                    () -> {
                        false
                    }
                )()
            },
            () -> {false},
            () -> {false},
            () -> {false},
            () -> {false}
        )()
    }
)
}(
    /*__helios__real__is_valid_data*/
    __helios__int__is_valid_data
)
}(
    /*__helios__duration__is_valid_data*/
    __helios__int__is_valid_data
)
}(
    /*__helios__bytearray__is_valid_data*/
    (data) -> {
        __core__chooseData(data, false, false, false, false, true)
    }
)
}(
    /*__helios__time__is_valid_data*/
    __helios__int__is_valid_data
)
}(
    /*__helios__int__is_valid_data*/
    (data) -> {
        __core__chooseData(data, false, false, false, true, false)
    }
)
}(
    /*__helios__stakingvalidatorhash__is_valid_data*/
    (data) -> {
            __helios__bytearray__is_valid_data_fixed_length(data, 28)
        }
)
}(
    /*__helios__pubkeyhash__is_valid_data*/
    (data) -> {
            __helios__bytearray__is_valid_data_fixed_length(data, 28)
        }
)
}(
    /*__helios__bytearray__is_valid_data_fixed_length*/
    (data, n) -> {
        __core__chooseData(
            data,
            () -> {false},
            () -> {false},
            () -> {false},
            () -> {false},
            () -> {
                bytes = __core__unBData__safe(data);
                __core__ifThenElse(
                    __core__equalsInteger(__core__lengthOfByteString(bytes), n),
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
)
}(
    /*__helios__struct____to_data*/
    __core__listData
)
}(
    /*__helios__common__enum_tag_equals*/
    (data, i) -> {
            __core__equalsInteger(__core__fstPair(__core__unConstrData(data)), i)
        }
)
}(
    /*__helios__txinput__from_data*/
    __helios__common__identity
)
}(
    /*__helios__common__identity*/
    (self) -> {self}
)
}(
    /*__helios__common__find_safe*/
    (self, fn, callback) -> {
        (recurse) -> {
            recurse(recurse, self, fn)
        }(
            (recurse, self, fn) -> {
                __core__chooseList(
                    self, 
                    () -> {__core__constrData(1, __helios__common__list_0)}, 
                    () -> {
                        (head) -> {
                            __core__ifThenElse(
                                fn(head), 
                                () -> {__core__constrData(0, __helios__common__list_1(callback(head)))}, 
                                () -> {recurse(recurse, __core__tailList__safe(self), fn)}
                            )()
                        }(__core__headList__safe(self))
                    }
                )()
            }
        )
    }
)
}(
    /*__helios__common__list_1*/
    (a) -> {
        __core__mkCons(a, __helios__common__list_0)
    }
)
}(
    /*__helios__txinput__value*/
    (self) -> {
        __helios__txoutput__value(__helios__txinput__output(self))
    }
)
}(
    /*__helios__txoutput__value*/
    (self) -> {
        __core__unMapData(__helios__common__enum_field_1(self))
    }
)
}(
    /*__helios__value__get_safe*/
    (self) -> {
        (assetClass) -> {
            mintingPolicyHash = __helios__common__enum_field_0(assetClass);
            tokenName = __helios__common__enum_field_1(assetClass);
            outer = (outer, inner, map) -> {
                __core__chooseList(
                    map, 
                    () -> {0}, 
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(__core__fstPair(__core__headList__safe(map)), mintingPolicyHash), 
                            () -> {inner(inner, __core__unMapData(__core__sndPair(__core__headList__safe(map))))}, 
                            () -> {outer(outer, inner, __core__tailList__safe(map))}
                        )()
                    }
                )()
            };
            inner = (inner, map) -> {
                __core__chooseList(
                    map, 
                    () -> {0}, 
                    () -> {
                        __core__ifThenElse(
                            __core__equalsData(__core__fstPair(__core__headList__safe(map)), tokenName),
                            () -> {
                                __core__unIData(__core__sndPair(__core__headList__safe(map)))
                            },
                            () -> {
                                inner(inner, __core__tailList__safe(map))
                            }
                        )()
                    }
                )()
            };
            outer(outer, inner, self)
        }
    }
)
}(
    /*__helios__int____gt*/
    (a, b) -> {
        __helios__bool____not(__core__lessThanEqualsInteger(a, b))
    }
)
}(
    /*__helios__bool____not*/
    (b) -> {
        __core__ifThenElse(b, false, true)
    }
)
}(
    /*__helios__txinput__datum*/
    (self) -> {
        __helios__txoutput__datum(__helios__txinput__output(self))
    }
)
}(
    /*__helios__txoutput__datum*/
    __helios__common__enum_field_2
)
}(
    /*__helios__common__enum_field_2*/
    (self) -> {
        __core__headList(__helios__common__enum_fields_after_1(self))
    }
)
}(
    /*__helios__common__enum_fields_after_1*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_0(self))
    }
)
}(
    /*__helios__txoutputdatum__inline*/
    (self) -> {
        pair = __core__unConstrData(self);
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
    }
)
}(
    /*__helios__assert*/
    (cond, msg) -> {
        __core__ifThenElse(
            cond,
            () -> {
                ()
            },
            () -> {
                __core__trace(
                    msg,
                    () -> {
                        error()
                    }
                )()
            }
        )()
    }
)
}(
    /*__helios__txinput__address*/
    (self) -> {
        __helios__txoutput__address(__helios__txinput__output(self))
    }
)
}(
    /*__helios__txinput__output*/
    __helios__common__enum_field_1
)
}(
    /*__helios__txoutput__address*/
    __helios__common__enum_field_0
)
}(
    /*__helios__address____eq*/
    __helios__common____eq
)
}(
    /*__helios__common____eq*/
    __core__equalsData
)
}(
    /*__helios__tx__ref_inputs*/
    (self) -> {
        __core__unListData(__helios__common__enum_field_1(self))
    }
)
}(
    /*__helios__scriptcontext__get_current_input*/
    () -> {
        id = __helios__scriptcontext__get_spending_purpose_output_id();
        recurse = (recurse, lst) -> {
            __core__chooseList(
                lst,
                () -> {__helios__error("not found")},
                () -> {
                    item = __core__headList__safe(lst);
                    __core__ifThenElse(
                        __core__equalsData(__helios__txinput__output_id(item), id),
                        () -> {item},
                        () -> {recurse(recurse, __core__tailList__safe(lst))}
                    )()
                }
            )()
        };
        recurse(recurse, __helios__tx__inputs(__helios__scriptcontext__tx))
    }
)
}(
    /*__helios__scriptcontext__tx*/
    __helios__common__enum_field_0(__helios__scriptcontext__data)
)
}(
    /*__helios__tx__inputs*/
    (self) -> {
        __core__unListData(__helios__common__enum_field_0(self))
    }
)
}(
    /*__helios__txinput__output_id*/
    __helios__common__enum_field_0
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
}(
    /*__helios__scriptcontext__get_spending_purpose_output_id*/
    () -> {
        __helios__common__enum_field_0(__helios__scriptcontext__purpose)
    }
)
}(
    /*__helios__scriptcontext__purpose*/
    __helios__common__enum_field_1(__helios__scriptcontext__data)
)
}(
    /*__helios__scriptcontext__data*/
    __CONTEXT
)
}(
    /*__helios__common__enum_field_1*/
    (self) -> {
        __core__headList(__helios__common__enum_fields_after_0(self))
    }
)
}(
    /*__helios__common__enum_fields_after_0*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields(self))
    }
)
}(
    /*__helios__common__enum_field_0*/
    (self) -> {
        __core__headList(__helios__common__enum_fields(self))
    }
)
}(
    /*__helios__common__enum_fields*/
    (self) -> {
        __core__sndPair(__core__unConstrData(self))
    }
)
}(
    /*__helios__bool____to_data*/
    (b) -> {
        __core__constrData(__core__ifThenElse(b, 1, 0), __helios__common__list_0)
    }
)
}(
    /*__helios__common__list_0*/
    __core__mkNilData(())
)
        }`

        const src2 = `(__CONTEXT, __CURRENT_SCRIPT) -> {
            __helios__scriptcontext__purpose = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(__CONTEXT))));
            __helios__scriptcontext__tx = __core__headList(__core__sndPair(__core__unConstrData(__CONTEXT)));
            __helios__scriptcontext__get_current_input = () -> {
                id = __core__headList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__purpose)));
                recurse_1 = (recurse, lst) -> {
                    __core__chooseList(lst, () -> {
                        error()
                    }, () -> {
                        item = __core__headList__safe(lst);
                        __core__ifThenElse(
                            __core__equalsData(__core__headList(__core__sndPair(__core__unConstrData(item))), id),
                            () -> {
                                item
                            },
                            () -> {
                                recurse(recurse, __core__tailList__safe(lst))
                            }
                        )()
                    })()
                };
                recurse_1(recurse_1, __core__unListData(__core__headList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx)))))
            };
            __helios__txinput__address = (self_6) -> {
                self_1 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_6))));
                __core__headList(__core__sndPair(__core__unConstrData(self_1)))
            };
            __helios__assetclass__new = (mph, token_name) -> {
                __core__constrData(0, __core__mkCons(__core__bData(mph), __core__mkCons(__core__bData(token_name), __core__mkNilData(()))))
            };
            __module__Tokens__indirect_policy = () -> {
                input = __helios__scriptcontext__get_current_input();
                (self_17) -> {
                    __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(self_17))))
                }((self_18) -> {
                    recurse_5 = (recurse_4, map_2, found, asset_class) -> {
                        __core__chooseList(map_2, () -> {
                            __core__ifThenElse(
                                found,
                                () -> {
                                    asset_class
                                },
                                () -> {
                                    error()
                                }
                            )()
                        }, () -> {
                            head_1 = __core__headList(map_2);
                            tail_1 = __core__tailList(map_2);
                            mph_1 = __core__unBData(__core__fstPair(head_1));
                            __core__ifThenElse(
                                __core__equalsByteString(mph_1, #),
                                () -> {
                                    recurse_4(recurse_4, tail_1, found, asset_class)
                                },
                                () -> {
                                    __core__ifThenElse(
                                        found,
                                        () -> {
                                            error()
                                        },
                                        () -> {
                                            tokens = __core__unMapData(__core__sndPair(head_1));
                                            __core__chooseList(__core__tailList(tokens), () -> {
                                                first = __core__headList(tokens);
                                                qty = __core__unIData(__core__sndPair(first));
                                                __core__ifThenElse(
                                                    __core__equalsInteger(qty, 1),
                                                    () -> {
                                                        name = __core__unBData(__core__fstPair(first));
                                                        recurse_4(recurse_4, tail_1, true, __helios__assetclass__new(mph_1, name))
                                                    },
                                                    () -> {
                                                        error()
                                                    }
                                                )()
                                            }, () -> {
                                                error()
                                            })()
                                        }
                                    )()
                                }
                            )()
                        })()
                    };
                    recurse_5(recurse_5, self_18, false, ())
                }(self_12 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(input))));
                __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_12)))))))
            };
            __module__Tokens__policy = #56d7d8a00a92740fbfd55e38c4e1033d4d8dae442c64a76dfc5196d3;
            __module__Tokens__config = __helios__assetclass__new(__module__Tokens__policy, #636f6e666967);
            __helios__list[__helios__txinput]__find = (self_20, fn_2) -> {
                recurse_9 = (recurse_8, lst_3) -> {
                    __core__chooseList(lst_3, () -> {
                        error()
                    }, () -> {
                        item_1 = __core__headList__safe(lst_3);
                        __core__ifThenElse(
                            fn_2(item_1),
                            () -> {
                                item_1
                            },
                            () -> {
                                recurse_8(recurse_8, __core__tailList__safe(lst_3))
                            }
                        )()
                    })()
                };
                recurse_9(recurse_9, self_20)
            };
            tuple = __core__ifThenElse(
                __core__equalsInteger(__core__fstPair(__core__unConstrData(__CURRENT_SCRIPT)), 3),
                () -> {
                    (__lhs_0_17) -> {
                        (callback_6) -> {
                            callback_6(__helios__scriptcontext__get_current_input(), true)
                        }
                    }
                },
                () -> {
                    __core__ifThenElse(
                        __core__equalsInteger(__core__fstPair(__core__unConstrData(__CURRENT_SCRIPT)), 7),
                        () -> {
                            (__lhs_0_16) -> {
                                (callback_5) -> {
                                    callback_5(__helios__list[__helios__txinput]__find(__core__unListData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))))), (input_5) -> {
                                        __core__equalsData(__helios__txinput__address(input_5), __core__constrData(0, __core__mkCons(__core__constrData(1, __core__mkCons(__core__bData(#9bc83a7833cb92aad70490805c24b1f67935d9d5a4ea5ef2e6412c17), __core__mkNilData(()))), __core__mkCons(__core__constrData(1, __core__mkNilData(())), __core__mkNilData(())))))
                                    }), false)
                                }
                            }
                        },
                        () -> {
                            __core__ifThenElse(
                                __core__equalsInteger(__core__fstPair(__core__unConstrData(__CURRENT_SCRIPT)), 2),
                                () -> {
                                    (__lhs_0_15) -> {
                                        (callback_4) -> {
                                            callback_4(__helios__list[__helios__txinput]__find(__core__unListData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))))), (input_4) -> {
                                                __core__equalsData(__helios__txinput__address(input_4), __core__constrData(0, __core__mkCons(__core__constrData(1, __core__mkCons(__core__bData(#9bc83a7833cb92aad70490805c24b1f67935d9d5a4ea5ef2e6412c17), __core__mkNilData(()))), __core__mkCons(__core__constrData(1, __core__mkNilData(())), __core__mkNilData(())))))
                                            }), false)
                                        }
                                    }
                                },
                                () -> {
                                    (_) -> {
                                        (e0_2) -> {
                                            __core__ifThenElse(
                                                __core__equalsInteger(__core__fstPair(__core__unConstrData(e0_2)), 0),
                                                () -> {
                                                    (__lhs_0_14) -> {
                                                        ref_input = __core__headList(__core__sndPair(__core__unConstrData(__lhs_0_14)));
                                                        (callback_3) -> {
                                                            callback_3(ref_input, false)
                                                        }
                                                    }
                                                },
                                                () -> {
                                                    (__1) -> {
                                                        (callback_2) -> {
                                                            callback_2(__helios__list[__helios__txinput]__find(__core__unListData(__core__headList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx)))), (input_3) -> {
                                                                __core__equalsData(__helios__txinput__address(input_3), __core__constrData(0, __core__mkCons(__core__constrData(1, __core__mkCons(__core__bData(#9bc83a7833cb92aad70490805c24b1f67935d9d5a4ea5ef2e6412c17), __core__mkNilData(()))), __core__mkCons(__core__constrData(1, __core__mkNilData(())), __core__mkNilData(())))))
                                                            }), true)
                                                        }
                                                    }
                                                }
                                            )()(e0_2)
                                        }(self_22 = __core__unListData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx)))));
                                        recurse_3 = (recurse_2, self_15, fn_1) -> {
                                            __core__chooseList(self_15, () -> {
                                                __core__constrData(1, __core__mkNilData(()))
                                            }, () -> {
                                                head = __core__headList__safe(self_15);
                                                __core__ifThenElse(
                                                    fn_1(head),
                                                    () -> {
                                                        __core__constrData(0, __core__mkCons(head, __core__mkNilData(())))
                                                    },
                                                    () -> {
                                                        recurse_2(recurse_2, __core__tailList__safe(self_15), fn_1)
                                                    }
                                                )()
                                            })()
                                        };
                                        recurse_3(recurse_3, self_22, (input_2) -> {
                                            __core__equalsData(__helios__txinput__address(input_2), __core__constrData(0, __core__mkCons(__core__constrData(1, __core__mkCons(__core__bData(#9bc83a7833cb92aad70490805c24b1f67935d9d5a4ea5ef2e6412c17), __core__mkNilData(()))), __core__mkCons(__core__constrData(1, __core__mkNilData(())), __core__mkNilData(())))))
                                        }))
                                    }
                                }
                            )()
                        }
                    )()
                }
            )()(__CURRENT_SCRIPT)((input_1, is_spent) -> {
                __core__chooseUnit((cond) -> {
                    __core__ifThenElse(
                        cond,
                        () -> {
                            ()
                        },
                        () -> {
                            error()
                        }
                    )()
                }((a) -> {
                    __core__ifThenElse(
                        __core__lessThanEqualsInteger(a, 0),
                        false,
                        true
                    )
                }((self_11) -> {
                    mintingPolicyHash = __core__headList(__core__sndPair(__core__unConstrData(__module__Tokens__config)));
                    tokenName = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(__module__Tokens__config))));
                    outer_1 = (outer, inner, map) -> {
                        __core__chooseList(map, () -> {
                            0
                        }, () -> {
                            __core__ifThenElse(
                                __core__equalsData(__core__fstPair(__core__headList__safe(map)), mintingPolicyHash),
                                () -> {
                                    inner(inner, __core__unMapData(__core__sndPair(__core__headList__safe(map))))
                                },
                                () -> {
                                    outer(outer, inner, __core__tailList__safe(map))
                                }
                            )()
                        })()
                    };
                    outer_1(outer_1, (inner_1, map_1) -> {
                        __core__chooseList(map_1, () -> {
                            0
                        }, () -> {
                            __core__ifThenElse(
                                __core__equalsData(__core__fstPair(__core__headList__safe(map_1)), tokenName),
                                () -> {
                                    __core__unIData(__core__sndPair(__core__headList__safe(map_1)))
                                },
                                () -> {
                                    inner_1(inner_1, __core__tailList__safe(map_1))
                                }
                            )()
                        })()
                    }, self_11)
                }(self_12 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(input_1))));
                __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_12)))))))), (callback_1) -> {
                    callback_1(__core__unListData((self_7) -> {
                        pair = __core__unConstrData(self_7);
                        __core__ifThenElse(
                            __core__equalsInteger(__core__fstPair(pair), 2),
                            () -> {
                                __core__headList(__core__sndPair(pair))
                            },
                            () -> {
                                error()
                            }
                        )()
                    }(self_9 = __core__headList(__core__tailList(__core__sndPair(__core__unConstrData(input_1))));
                    __core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(self_9))))))), is_spent)
                })
            });
            tuple((x0, x1) -> {
                __core__listData(__core__mkCons(__core__listData(x0), __core__mkCons(__core__constrData(__core__ifThenElse(
                    x1,
                    1,
                    0
                ), __core__mkNilData(())), __core__mkNilData(()))))
            })
        }`

        const optimized = compile(src2, {
            optimize: true,
            parseOptions: {
                ...DEFAULT_PARSE_OPTIONS,
                builtinsPrefix: "__core__"
            },
            optimizeOptions: {
                factorizeCommon: true
            }
        })

        const unoptimized = compile(src2, {
            optimize: false,
            parseOptions: {
                ...DEFAULT_PARSE_OPTIONS,
                builtinsPrefix: "__core__"
            }
        })

        const ctx = decodeUplcData(
            "d8799fd8799f9fd8799fd8799fd8799f58200000000000000000000000000000000000000000000000000000000000000000ff00ffd8799fd8799fd87a9f581c9bc83a7833cb92aad70490805c24b1f67935d9d5a4ea5ef2e6412c17ffd87a80ffa240a1401a001e8480581c56d7d8a00a92740fbfd55e38c4e1033d4d8dae442c64a76dfc5196d3a146636f6e66696701d87b9f9f581c000000000000000000000000000000000000000000000000000000009f9f0000ff9f0000ff9f18641a05265c00ff9f9f0080ff581c00000000000000000000000000000000000000000000000000000000ffff9f0000ff581c000000000000000000000000000000000000000000000000000000009f00581c00000000000000000000000000000000000000000000000000000000ffd87980ffffd87a80ffffd8799fd8799fd8799f58200101010101010101010101010101010101010101010101010101010101010101ff00ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa240a1401a001e8480581c56d7d8a00a92740fbfd55e38c4e1033d4d8dae442c64a76dfc5196d3a1582044003925778b9da674943f19e768b8a8cea0911f3dd05216cae88d785b18c08601d87980d87a80ffffff8080a0a140a1400080a0d8799fd8799fd87980d87a80ffd8799fd87b80d87a80ffff80a0a0d8799f5820ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd87a9fd8799fd8799f58200101010101010101010101010101010101010101010101010101010101010101ff00ffffff"
        )
        const currentScript = decodeUplcData("d87d80")

        const args = [new UplcDataValue(ctx), new UplcDataValue(currentScript)]

        const resOptim = optimized.eval(args)
        const resUnoptim = unoptimized.eval(args)

        deepEqual(resOptim.result, resUnoptim.result)
    })
})
