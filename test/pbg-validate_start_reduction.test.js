import { strictEqual } from "node:assert"
import { test } from "node:test"
import { isLeft, isRight } from "@helios-lang/type-utils"
import { UplcDataValue, UplcProgramV2, decodeUplcData } from "@helios-lang/uplc"
import { DEFAULT_PARSE_OPTIONS, compile } from "../src/index.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcProgramV2I} UplcProgramV2I
 */

test("PBG::fund_policy::main", () => {
    const src = `(ig1, kp1, mode1, group_ptrs, n_all_groups, __CONTEXT) -> {
(__helios__int__from_data) -> {
(__helios__assert) -> {
(__helios__int____eq) -> {
(__helios__int____add) -> {
(__helios__time____eq) -> {
(__helios__bool____not) -> {
(__helios__bool____eq) -> {
(__helios__common__length) -> {
(__helios__int__is_valid_data) -> {
(__helios__error) -> {
(__helios__txoutputdatum__inline) -> {
(__helios__common__enum_fields) -> {
(__helios__common__enum_fields_after_0) -> {
(__helios__common__enum_fields_after_1) -> {
(__helios__common__enum_field_2) -> {
(__helios__txoutput__datum) -> {
(__helios__common__enum_field_1) -> {
(__helios__txinput__output) -> {
(__helios__txinput__datum) -> {
(__helios__tx__ref_inputs) -> {
(__helios__common__enum_field_0) -> {
(__helios__scriptcontext__data) -> {
(__helios__scriptcontext__tx) -> {
(__helios__common__struct_fields_after_0) -> {
(__helios__common__struct_fields_after_1) -> {
(__helios__common__struct_fields_after_2) -> {
(__helios__common__struct_fields_after_3) -> {
(__helios__common__struct_field_4) -> {
(__helios__common__struct_field_0) -> {
(__helios__struct__from_data) -> {
(__helios__common__identity) -> {
(__helios__assetclass__from_data) -> {
(__helios__bool__from_data) -> {
(__helios__common__enum_tag_equals) -> {
(__helios__time__from_data) -> {
(__helios__int____gt) -> {
(__helios__value__get_safe) -> {
(__helios__txoutput__value) -> {
(__helios__txinput__value) -> {
(__helios__txinput__from_data) -> {
(__helios__int____lt) -> {
(__helios__duration____lt) -> {
(__helios__int____sub) -> {
(__helios__time____sub) -> {
(__helios__timerange__end) -> {
(__helios__common__enum_fields_after_2) -> {
(__helios__common__enum_fields_after_3) -> {
(__helios__common__enum_fields_after_4) -> {
(__helios__common__enum_fields_after_5) -> {
(__helios__common__enum_fields_after_6) -> {
(__helios__common__enum_field_7) -> {
(__helios__tx__time_range) -> {
(__helios__timerange__start) -> {
(__helios__duration__DAY) -> {
(__helios__common____eq) -> {
(__helios__address____eq) -> {
(__helios__txoutput__address) -> {
(__helios__txinput__address) -> {
(__helios__time____lt) -> {
(__helios__common__fold) -> {
(__helios__tx__inputs) -> {
(__helios__common____neq) -> {
(__helios__address____neq) -> {
(__helios__common__all) -> {
(__helios__assetclass____eq) -> {
(__helios__common__any) -> {
(__helios__bytearray____to_data) -> {
(__helios__mintingpolicyhash____to_data) -> {
(__helios__value__get_policy) -> {
(__helios__ratio__top) -> {
(__helios__ratio__bottom) -> {
(__helios__ratio__floor) -> {
(__helios__int____mul) -> {
(__helios__ratio__new_internal) -> {
(__helios__ratio____mul1) -> {
(__helios__common__struct_field_3) -> {
(__helios__ratio__from_data) -> {
(__helios__common__struct_field_2) -> {
(__helios__common__struct_field_1) -> {
(__helios__common__test_constr_data_2) -> {
(__helios__mintingpolicyhash__is_valid_data) -> {
(__helios__bytearray__is_valid_data_max_length) -> {
(__helios__assetclass__is_valid_data) -> {
(__helios__common__test_list_data) -> {
(__helios__common__test_list_head_data) -> {
(__helios__common__test_list_empty) -> {
(__helios__ratio__is_valid_data) -> {
(__helios__time__is_valid_data) -> {
(__helios__common__list_0) -> {
(__helios__common__list_1) -> {
(__helios__common__list_2) -> {
(__helios__address__new) -> {
(__helios__validatorhash____to_data) -> {
(__helios__spendingcredential__new_validator) -> {
(__helios__option__NONE) -> {
(__helios__address__from_validator) -> {
(__helios__bytearray__from_data) -> {
(__helios__assetclass__new) -> {
(__helios__mintingpolicyhash__from_data) -> {
(__helios__value__get_singleton_policy) -> {
(__helios__scriptcontext__purpose) -> {
(__helios__scriptcontext__get_spending_purpose_output_id) -> {
(__helios__txinput__output_id) -> {
(__helios__scriptcontext__get_current_input) -> {
(__helios__assetclass__mph) -> {
(__helios__value__get_singleton_asset_class) -> {
(__helios__mintingpolicyhash__from_script_hash) -> {
(__helios__string__encode_utf8) -> {
(__helios__common__starts_with) -> {
(__helios__bytearray__starts_with) -> {
(__helios__int__parse_digit) -> {
(__helios__int__parse) -> {
(__helios__bytearray__decode_utf8) -> {
(__helios__int__max) -> {
(__helios__common__slice_bytearray) -> {
(__helios__bytearray__slice) -> {
(__helios__bytearray__length) -> {
(__helios__int____to_data) -> {
(__helios__scripts__assets_validator) -> {
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
(__module__TokenNames__assets_prefix) -> {
(__helios__option[__helios__int]__some____new) -> {
(__helios__option[__helios__int]__none____new) -> {
(__module__TokenNames__parse_series) -> {
(__module__TokenNames__parse_assets) -> {
(__module__TokenNames__supply) -> {
(__module__Tokens__direct_policy) -> {
(__module__Tokens__indirect_policy) -> {
(__module__Tokens__policy) -> {
(__module__Tokens__supply) -> {
(__helios__map[__helios__bytearray@__helios__int]__length) -> {
(__helios__map[__helios__bytearray@__helios__int]__head) -> {
(__helios__option[__helios__int]__unwrap) -> {
(__module__Addresses__assets) -> {
(__module__AssetModule__Asset[]__is_valid_data) -> {
(__module__AssetModule__Asset[]__from_data) -> {
(__module__AssetModule__Asset[]__asset_class) -> {
(__module__AssetModule__Asset[]__count) -> {
(__module__AssetModule__Asset[]__price) -> {
(__module__AssetModule__Asset[]__price_timestamp) -> {
(__module__AssetModule__Asset[]__calc_value) -> {
(__module__Tokens__parse_assets[__helios__txinput]) -> {
(__helios__list[__helios__txinput]__all) -> {
(__module__AssetGroupModule__AssetGroup[]__nothing_spent) -> {
(__helios__list[__helios__int]__fold2[__helios__int@__helios__bool]) -> {
(__helios__list[__helios__data]__get) -> {
(__helios__list[__helios__txinput]__get) -> {
(__helios__list[__helios__int]__fold3[__helios__int@__helios__time@__helios__int]) -> {
(__helios__list[__module__AssetModule__Asset[]]__fold2[__helios__time@__helios__int]) -> {
(__module__AssetGroupModule__sum_total_asset_value) -> {
(__helios__list[__helios__txinput]__find) -> {
(__module__Tokens__contains[__helios__txinput]) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__from_data) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue____is) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__total) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__oldest_timestamp) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__Exists____is) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__Exists__asset_class) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__Exists__found) -> {
(__module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__asset_class) -> {
(__module__SupplyModule__Supply[]__from_data) -> {
(__module__SupplyModule__Supply[]__tick) -> {
(__module__SupplyModule__Supply[]__n_lovelace) -> {
(__helios__data__as[__module__SupplyModule__Supply[]]) -> {
(__module__Tokens__contains_supply[__helios__txinput]) -> {
(__module__SupplyModule__Supply[]__find_ref) -> {
(__helios__list[__helios__int]__is_valid_data_internal) -> {
(__helios__list[__helios__int]__from_data) -> {
(__helios__list[__helios__int]__length) -> {
(__module__portfolio_validator__validate_start_reduction) -> {
__module__portfolio_validator__validate_start_reduction(__helios__int__from_data(ig1), __helios__int__from_data(kp1), __module__PortfolioModule__PortfolioReductionMode[]__from_data(mode1), __helios__list[__helios__int]__from_data(group_ptrs), __helios__int__from_data(n_all_groups))
}(
    /*__module__portfolio_validator__validate_start_reduction*/
    (ig1, kp1, mode1, group_ptrs, n_all_groups) -> {
    (supply) -> {
        (n_groups) -> {
            __core__chooseUnit(__helios__assert(__module__AssetGroupModule__AssetGroup[]__nothing_spent(), "spent an asset group"), __core__chooseUnit(__helios__assert(__helios__int____eq(kp1, __module__SupplyModule__Supply[]__tick(supply)), "start tick of reduction not equal to supply tick"), (__cond)->
                {(
					(__lhs_0) -> {
                        (V1) -> {
                            (tp1) -> {
                            (V0) -> {
                            __module__AssetGroupModule__sum_total_asset_value(group_ptrs, 1)(
                                (tp_oldest, dV) -> {
                                    __core__chooseUnit(__helios__assert(__helios__int____eq(V1, __helios__int____add(V0, dV)), "wrong first total asset value sum"), __core__chooseUnit(__helios__assert(__helios__int____eq(ig1, n_groups), "iteration index not equal to the number of groups iterated over"), __helios__assert(__helios__time____eq(tp1, tp_oldest), "timestamp in reduction not equal to oldest timestamp")))
                                }
                            )
                        }(__module__SupplyModule__Supply[]__n_lovelace(supply))
                        }(__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__oldest_timestamp(__lhs_0))
                        }(__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__total(__lhs_0))
                    }
                )(__cond)}(mode1)))
        }(__helios__list[__helios__int]__length(group_ptrs))
    }(__module__SupplyModule__Supply[]__find_ref())
}
)
}(
    /*__helios__list[__helios__int]__length*/
    __helios__common__length
)
}(
    /*__helios__list[__helios__int]__from_data*/
    (data) -> {
        lst = __core__unListData(data);
        _ = __core__ifThenElse(
            __helios__list[__helios__int]__is_valid_data_internal(lst),
            () -> {
                ()
            },
            () -> {
                __core__trace("Warning: invalid list data", ())
            }
        )();
        lst
    }
)
}(
    /*__helios__list[__helios__int]__is_valid_data_internal*/
    (lst) -> {
        recurse = (recurse, lst) -> {
            __core__chooseList(
                lst,
                () -> {
                    true
                },
                () -> {
                    __core__ifThenElse(
                        __helios__int__is_valid_data(__core__headList__safe(lst)),
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
    /*__module__SupplyModule__Supply[]__find_ref*/
    () -> {
    (input) -> {
        __helios__data__as[__module__SupplyModule__Supply[]](__helios__txoutputdatum__inline(__helios__txinput__datum(input)))
    }(__helios__list[__helios__txinput]__find(__helios__tx__ref_inputs(__helios__scriptcontext__tx))(__module__Tokens__contains_supply[__helios__txinput]))
}
)
}(
    /*__module__Tokens__contains_supply[__helios__txinput]*/
    (v) -> {
    __module__Tokens__contains[__helios__txinput](v, __module__Tokens__supply)
}
)
}(
    /*__helios__data__as[__module__SupplyModule__Supply[]]*/
    (data) -> {
        __module__SupplyModule__Supply[]__from_data(data)
    }
)
}(
    /*__module__SupplyModule__Supply[]__n_lovelace*/
    (self) -> {
        __helios__int__from_data(__helios__common__struct_field_4(self))
    }
)
}(
    /*__module__SupplyModule__Supply[]__tick*/
    (self) -> {
							__helios__int__from_data(__helios__common__struct_field_0(self))
						}
)
}(
    /*__module__SupplyModule__Supply[]__from_data*/
    __helios__struct__from_data
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__DoesNotExist__asset_class*/
    (self) -> {
							__helios__assetclass__from_data(__helios__common__enum_field_0(self))
						}
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__Exists__found*/
    (self) -> {
							__helios__bool__from_data(__helios__common__enum_field_1(self))
						}
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__Exists__asset_class*/
    (self) -> {
							__helios__assetclass__from_data(__helios__common__enum_field_0(self))
						}
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__Exists____is*/
    (data) -> {
                __helios__common__enum_tag_equals(data, 1)
            }
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__oldest_timestamp*/
    (self) -> {
							__helios__time__from_data(__helios__common__enum_field_1(self))
						}
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue__total*/
    (self) -> {
							__helios__int__from_data(__helios__common__enum_field_0(self))
						}
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__TotalAssetValue____is*/
    (data) -> {
                __helios__common__enum_tag_equals(data, 0)
            }
)
}(
    /*__module__PortfolioModule__PortfolioReductionMode[]__from_data*/
    __helios__common__identity
)
}(
    /*__module__Tokens__contains[__helios__txinput]*/
    (v, asset_class) -> {
    __helios__int____gt(__helios__value__get_safe(__helios__txinput__value(v))(asset_class), 0)
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
    /*__module__AssetGroupModule__sum_total_asset_value*/
    (group_ptrs, first_id) -> {
    __core__chooseUnit(
        __helios__assert(
            __helios__duration____lt(
                __helios__time____sub(
                    __helios__timerange__end(__helios__tx__time_range(__helios__scriptcontext__tx)), 
                    __helios__timerange__start(__helios__tx__time_range(__helios__scriptcontext__tx))
                ), 
                __helios__duration__DAY
            ), 
            "validity time range too large"
        ), (ref_inputs) -> {
        __helios__list[__helios__int]__fold3[__helios__int@__helios__time@__helios__int](group_ptrs)((expected_id, tp, dV, ptr) -> {
            (input) -> {
                (id) -> {
                    __core__chooseUnit(__helios__assert(__helios__address____eq(__helios__txinput__address(input), __module__Addresses__assets), "asset group not at correct address"), __core__chooseUnit(__helios__assert(__helios__int____eq(id, expected_id), "assets id doesn't match expected id (asset groups not iterated in order)"), (group) -> {
                        __helios__list[__module__AssetModule__Asset[]]__fold2[__helios__time@__helios__int](group)((tp, dV, asset) -> {
                            (callback) -> {
                                callback(
                                    __core__ifThenElse(__helios__time____lt(__module__AssetModule__Asset[]__price_timestamp(asset), tp), () -> {__module__AssetModule__Asset[]__price_timestamp(asset)}, () -> {() -> {tp}()})(),
                                    __helios__int____add(dV, __module__AssetModule__Asset[]__calc_value(asset)())
                                )
                            }
                        }, tp, dV)(
                            (tp, dV) -> {
                                (callback) -> {
                                callback(
                                    __helios__int____add(expected_id, 1),
                                    tp,
                                    dV
                                )
                            }
                            }
                        )
                    }(__core__unListData(__helios__txoutputdatum__inline(__helios__txinput__datum(input))))))
                }(__module__Tokens__parse_assets[__helios__txinput](input))
            }(__helios__list[__helios__txinput]__get(ref_inputs)(ptr))
        }, first_id, __helios__timerange__start(__helios__tx__time_range(__helios__scriptcontext__tx)), 0)(
            (__lhs_0, tp, dV) -> {
                (callback) -> {
                callback(
                    tp,
                    dV
                )
            }
            }
        )
    }(__helios__tx__ref_inputs(__helios__scriptcontext__tx)))
}
)
}(
    /*__helios__list[__module__AssetModule__Asset[]]__fold2[__helios__time@__helios__int]*/
    (self) -> {
        (fn, a0, b0) -> {
            __helios__common__fold(
                self,
                (prev, item) -> {
                    prev(
                        (a, b) -> {
                            fn(a, b, __module__AssetModule__Asset[]__from_data(item))
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
    /*__helios__list[__helios__int]__fold3[__helios__int@__helios__time@__helios__int]*/
    (self) -> {
        (fn, a0, b0, c0) -> {
            __helios__common__fold(
                self,
                (prev, item) -> {
                    prev(
                        (a, b, c) -> {
                            fn(a, b, c, __helios__int__from_data(item))
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
            __helios__txinput__from_data(__helios__list[__helios__data]__get(self)(index))
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
                        __helios__error("index out of range")
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
    /*__helios__list[__helios__int]__fold2[__helios__int@__helios__bool]*/
    (self) -> {
        (fn, a0, b0) -> {
            __helios__common__fold(
                self,
                (prev, item) -> {
                    prev(
                        (a, b) -> {
                            fn(a, b, __helios__int__from_data(item))
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
    /*__module__AssetGroupModule__AssetGroup[]__nothing_spent*/
    () -> {
    __helios__list[__helios__txinput]__all(__helios__tx__inputs(__helios__scriptcontext__tx))((input) -> {
        __helios__address____neq(__helios__txinput__address(input), __module__Addresses__assets)
    })
}
)
}(
    /*__helios__list[__helios__txinput]__all*/
    (self) -> {
        (fn) -> {
            __helios__common__all(
                self, 
                (item) -> {
                    fn(__helios__txinput__from_data(item))
                }
            )
        }
    }
)
}(
    /*__module__Tokens__parse_assets[__helios__txinput]*/
    (v) -> {
    (tokens) -> {
        __core__chooseUnit(__helios__assert(__helios__int____eq(__helios__map[__helios__bytearray@__helios__int]__length(tokens), 1), "can only contain one assets token"), __helios__map[__helios__bytearray@__helios__int]__head(tokens)(
            (token_name, qty) -> {
                __core__chooseUnit(__helios__assert(__helios__int____eq(qty, 1), "expected only 1 assets token"), __helios__option[__helios__int]__unwrap(__module__TokenNames__parse_assets(token_name))())
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
							__helios__time__from_data(__helios__common__struct_field_3(self))
						}
)
}(
    /*__module__AssetModule__Asset[]__price*/
    (self) -> {
							__helios__ratio__from_data(__helios__common__struct_field_2(self))
						}
)
}(
    /*__module__AssetModule__Asset[]__count*/
    (self) -> {
							__helios__int__from_data(__helios__common__struct_field_1(self))
						}
)
}(
    /*__module__AssetModule__Asset[]__asset_class*/
    (self) -> {
							__helios__assetclass__from_data(__helios__common__struct_field_0(self))
						}
)
}(
    /*__module__AssetModule__Asset[]__from_data*/
    __helios__struct__from_data
)
}(
    /*__module__AssetModule__Asset[]__is_valid_data*/
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
									__helios__assetclass__is_valid_data(head),
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
						() -> {
							false
						},
						() -> {
							(head) -> {
								__core__ifThenElse(
									__helios__ratio__is_valid_data(head),
									() -> {(fields) -> {
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
    /*__module__Addresses__assets*/
    __helios__address__from_validator(__helios__scripts__assets_validator)
)
}(
    /*__helios__option[__helios__int]__unwrap*/
    (self) -> {
        () -> {
            __helios__int__from_data(__helios__common__enum_field_0(self))
        }
    }
)
}(
    /*__helios__map[__helios__bytearray@__helios__int]__head*/
    (self) -> {
        head = __core__headList(self);
        (callback) -> {
            callback(__helios__bytearray__from_data(__core__fstPair(head)), __helios__int__from_data(__core__sndPair(head)))
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
    /*__module__Tokens__supply*/
    __helios__assetclass__new(__module__Tokens__policy, __module__TokenNames__supply)
)
}(
    /*__module__Tokens__policy*/
    (__cond)->
    {(
__core__ifThenElse(
				__helios__script__fund_policy____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__mint_order_validator____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__burn_order_validator____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__supply_validator____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__assets_validator____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__portfolio_validator____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__price_validator____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__reimbursement_validator____is(__cond),
				() -> {
					(__lhs_0) -> {
                (input) -> {
                    __helios__value__get_singleton_policy(__helios__txinput__value(input))()
                }(__helios__scriptcontext__get_current_input())
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__voucher_validator____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__config_validator____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__metadata_validator____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__indirect_policy()
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__oracle_delegate____is(__cond),
				() -> {
					(__lhs_0) -> {
                __module__Tokens__direct_policy
            }
				}, () -> {
					__core__ifThenElse(
				__helios__script__benchmark_delegate____is(__cond),
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
    )(__cond)}(__helios__scriptcontext__current_script)
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
    /*__module__TokenNames__supply*/
    __helios__string__encode_utf8("supply")()
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
    }(__helios__bytearray__slice(token_name)(__helios__bytearray__length(prefix), __helios__bytearray__length(token_name)))}, () -> {() -> {__helios__option[__helios__int]__none____new()}()})()
}
)
}(
    /*__helios__option[__helios__int]__none____new*/
    () -> {
        __helios__option__NONE
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
    __core__constrData(9, __core__mkNilData(()))
)
}(
    /*__helios__scripts__fund_policy*/
    #fceee5190804e1ac2768bbdea17da037388c785e73b200792ce4adbd
)
}(
    /*__helios__scripts__assets_validator*/
    #e24e2fb0a6460444d32fd815575372ecc21118fa19adcc41cd00c2ba
)
}(
    /*__helios__int____to_data*/
    __core__iData
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
                        __helios__error("zero padded integer can't be parsed")
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
                                __helios__error("-0 not allowed")
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
    __helios__common__enum_field_1(__helios__scriptcontext__data)
)
}(
    /*__helios__value__get_singleton_policy*/
    (self) -> {
            () -> {
                __core__chooseList(
                    self,
                    () -> {
                        __helios__error("value doesn't contain a policy")
                    },
                    () -> {
                        mph = __helios__mintingpolicyhash__from_data(__core__fstPair(__core__headList(self)));
                        tail = __core__tailList(self);
                        __core__ifThenElse(
                            __core__equalsByteString(mph, #),
                            () -> {
                                __core__chooseList(
                                    tail,
                                    () -> {
                                        __helios__error("value contains only lovelace and no other minting policy")
                                    },
                                    () -> {
                                        mph = __helios__mintingpolicyhash__from_data(__core__fstPair(__core__headList(tail)));

                                        __core__chooseList(
                                            __core__tailList(tail),
                                            () -> {
                                                mph
                                            },
                                            () -> {
                                                __helios__error("value contains more than 1 minting policy")
                                            }
                                        )()
                                    }
                                )()
                            },
                            () -> {
                                __core__chooseList(
                                    tail,
                                    () -> {
                                        mph
                                    },
                                    () -> {
                                        next_mph = __helios__mintingpolicyhash__from_data(__core__fstPair(__core__headList(tail)));

                                        __core__ifThenElse(
                                            __core__equalsByteString(next_mph, #),
                                            () -> {
                                                __core__chooseList(
                                                    __core__tailList(tail),
                                                    () -> {
                                                        mph
                                                    },
                                                    () -> {
                                                        __helios__error("value contains more than 1 minting policy")
                                                    }
                                                )()
                                            },
                                            () -> {
                                                __helios__error("value contains more than 1 minting policy")
                                            }
                                        )()
                                    }
                                )()
                            }
                        )()
                    }
                )()
            }
        }
)
}(
    /*__helios__mintingpolicyhash__from_data*/
    __helios__bytearray__from_data
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
    /*__helios__bytearray__from_data*/
    __core__unBData
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
    /*__helios__common__list_1*/
    (a) -> {
        __core__mkCons(a, __helios__common__list_0)
    }
)
}(
    /*__helios__common__list_0*/
    __core__mkNilData(())
)
}(
    /*__helios__time__is_valid_data*/
    __helios__int__is_valid_data
)
}(
    /*__helios__ratio__is_valid_data*/
    (data) -> {
        __helios__common__test_list_data(
            data,
            __helios__common__test_list_head_data(
                __helios__int__is_valid_data,
                __helios__common__test_list_head_data(
                    (bottom_data) -> {
                        __core__chooseData(
                            bottom_data,
                            () -> {false},
                            () -> {false},
                            () -> {false},
                            () -> {
                                bottom = __core__unIData__safe(bottom_data);

                                __core__ifThenElse(
                                    __core__lessThanInteger(0, bottom),
                                    () -> {
                                        true
                                    },
                                    () -> {
                                        false
                                    }
                                )()
                            },
                            () -> {false}
                        )()
                    },
                    __helios__common__test_list_empty
                )
            )
        )
    }
)
}(
    /*__helios__common__test_list_empty*/
    (list) -> {
            __core__chooseList(list, true, false)
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
    /*__helios__assetclass__is_valid_data*/
    (data) -> {
        __helios__common__test_constr_data_2(data, 0, __helios__mintingpolicyhash__is_valid_data, __helios__bytearray__is_valid_data_max_length(32))
    }
)
}(
    /*__helios__bytearray__is_valid_data_max_length*/
    (n) -> {
        (data) -> {
            __core__chooseData(
                data,
                () -> {false},
                () -> {false},
                () -> {false},
                () -> {false},
                () -> {
                    bytes = __core__unBData__safe(data);
                    __core__ifThenElse(
                        __core__lessThanEqualsInteger(__core__lengthOfByteString(bytes), n),
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
    }
)
}(
    /*__helios__mintingpolicyhash__is_valid_data*/
    (data) -> {
                __core__chooseData(
                    data,
                    () -> {false},
                    () -> {false},
                    () -> {false},
                    () -> {false},
                    () -> {
                        bytes = __core__unBData__safe(data);
                        n = __core__lengthOfByteString(bytes);
                        __core__ifThenElse(
                            __core__equalsInteger(n, 0),
                            () -> {
                                true
                            },
                            () -> {
                                __core__ifThenElse(
                                    __core__equalsInteger(n, 28),
                                    true,
                                    false
                                )
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
    /*__helios__ratio__from_data*/
    __helios__common__identity
)
}(
    /*__helios__common__struct_field_3*/
    (self) -> {
        __core__headList(__helios__common__struct_fields_after_2(self))
    }
)
}(
    /*__helios__ratio____mul1*/
    (a, b) -> {
        at = __helios__ratio__top(a);
        ab = __helios__ratio__bottom(a);
        new_top = __helios__int____mul(at, b);
        __helios__ratio__new_internal(new_top, ab)
    }
)
}(
    /*__helios__ratio__new_internal*/
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
    /*__helios__value__get_policy*/
    (self) -> {
        (mph) -> {
            mph = __helios__mintingpolicyhash____to_data(mph);
            recurse = (recurse, map) -> {
                __core__chooseList(
                    map,
                    () -> {__helios__error("policy not found")},
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
    /*__helios__mintingpolicyhash____to_data*/
    __helios__bytearray____to_data
)
}(
    /*__helios__bytearray____to_data*/
    __core__bData
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
    /*__helios__assetclass____eq*/
    __helios__common____eq
)
}(
    /*__helios__common__all*/
    (self, fn) -> {
        (recurse) -> {
            recurse(recurse, self, fn)
        }(
            (recurse, self, fn) -> {
                __core__chooseList(
                    self,
                    () -> {true},
                    () -> {
                        __core__ifThenElse(
                            fn(__core__headList__safe(self)),
                            () -> {recurse(recurse, __core__tailList__safe(self), fn)},
                            () -> {false}
                        )()
                    }
                )()
            }
        )
    }
)
}(
    /*__helios__address____neq*/
    __helios__common____neq
)
}(
    /*__helios__common____neq*/
    (a, b) -> {
        __helios__bool____not(__core__equalsData(a, b))
    }
)
}(
    /*__helios__tx__inputs*/
    (self) -> {
        __core__unListData(__helios__common__enum_field_0(self))
    }
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
    /*__helios__time____lt*/
    __helios__int____lt
)
}(
    /*__helios__txinput__address*/
    (self) -> {
        __helios__txoutput__address(__helios__txinput__output(self))
    }
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
    /*__helios__duration__DAY*/
    86400000
)
}(
    /*__helios__timerange__start*/
    (self) -> {
        __helios__time__from_data(__helios__common__enum_field_0(__helios__common__enum_field_0(__helios__common__enum_field_0(self))))
    }
)
}(
    /*__helios__tx__time_range*/
    __helios__common__enum_field_7
)
}(
    /*__helios__common__enum_field_7*/
    (self) -> {
        __core__headList(__helios__common__enum_fields_after_6(self))
    }
)
}(
    /*__helios__common__enum_fields_after_6*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_5(self))
    }
)
}(
    /*__helios__common__enum_fields_after_5*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_4(self))
    }
)
}(
    /*__helios__common__enum_fields_after_4*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_3(self))
    }
)
}(
    /*__helios__common__enum_fields_after_3*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_2(self))
    }
)
}(
    /*__helios__common__enum_fields_after_2*/
    (self) -> {
        __core__tailList(__helios__common__enum_fields_after_1(self))
    }
)
}(
    /*__helios__timerange__end*/
    (self) -> {
        __helios__time__from_data(__helios__common__enum_field_0(__helios__common__enum_field_0(__helios__common__enum_field_1(self))))
    }
)
}(
    /*__helios__time____sub*/
    __helios__int____sub
)
}(
    /*__helios__int____sub*/
    __core__subtractInteger
)
}(
    /*__helios__duration____lt*/
    __helios__int____lt
)
}(
    /*__helios__int____lt*/
    __core__lessThanInteger
)
}(
    /*__helios__txinput__from_data*/
    __helios__common__identity
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
    /*__helios__time__from_data*/
    __helios__int__from_data
)
}(
    /*__helios__common__enum_tag_equals*/
    (data, i) -> {
            __core__equalsInteger(__core__fstPair(__core__unConstrData(data)), i)
        }
)
}(
    /*__helios__bool__from_data*/
    (d) -> {
        __core__ifThenElse(
            __core__equalsInteger(__core__fstPair(__core__unConstrData(d)), 0), 
            false, 
            true
        )
    }
)
}(
    /*__helios__assetclass__from_data*/
    __helios__common__identity
)
}(
    /*__helios__common__identity*/
    (self) -> {self}
)
}(
    /*__helios__struct__from_data*/
    __core__unListData
)
}(
    /*__helios__common__struct_field_0*/
    __core__headList
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
    /*__helios__int__is_valid_data*/
    (data) -> {
        __core__chooseData(data, false, false, false, true, false)
    }
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
    /*__helios__bool____eq*/
    (a, b) -> {
        __core__ifThenElse(a, b, __helios__bool____not(b))
    }
)
}(
    /*__helios__bool____not*/
    (b) -> {
        __core__ifThenElse(b, false, true)
    }
)
}(
    /*__helios__time____eq*/
    __helios__int____eq
)
}(
    /*__helios__int____add*/
    __core__addInteger
)
}(
    /*__helios__int____eq*/
    __core__equalsInteger
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
    /*__helios__int__from_data*/
    __core__unIData
)
}`

    compile(src, {
        optimize: true,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })
})
