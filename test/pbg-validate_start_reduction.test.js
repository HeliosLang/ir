import { strictEqual } from "node:assert"
import { test } from "node:test"
import { isLeft, isRight } from "@helios-lang/type-utils"
import { UplcDataValue, UplcProgramV2, decodeUplcData } from "@helios-lang/uplc"
import { DEFAULT_PARSE_OPTIONS, compile } from "../src/index.js"

/**
 * @typedef {import("@helios-lang/uplc").UplcProgramV2I} UplcProgramV2I
 */

test("PBG::fund_policy::main", () => {
    const src1 = `(ig1, kp1, mode1, group_ptrs, n_all_groups, __CONTEXT) -> {
    (__common5) -> {
        (__common6) -> {
            (__common1) -> {
                (__common2) -> {
                    (__helios__common__length) -> {
                        (__helios__txoutputdatum__inline) -> {
                            (__helios__scriptcontext__tx) -> {
                                (__common3) -> {
                                    (__common4) -> {
                                        (__common0) -> {
                                            (__helios__tx__time_range) -> {
                                                (__helios__timerange__start) -> {
                                                    (__helios__txinput__address) -> {
                                                        (__helios__common__fold) -> {
                                                            (__helios__assetclass__new) -> {
                                                                (__helios__scriptcontext__purpose) -> {
                                                                    (__module__Tokens__policy) -> {
                                                                        (__module__Tokens__supply) -> {
                                                                            (ig1_1, kp1_1, group_ptrs_2, n_all_groups_1) -> {
                                                                                (supply) -> {
                                                                                    (n_groups) -> {
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
                                                                                        }((recurse_5) -> {
                                                                                            recurse_5(recurse_5, __common4, (input_2) -> {
                                                                                                (a_2) -> {
                                                                                                    __core__ifThenElse(
                                                                                                        __core__equalsData(a_2, __core__constrData(0, __core__mkCons(__core__constrData(1, __core__mkCons(__core__bData(#e24e2fb0a6460444d32fd815575372ecc21118fa19adcc41cd00c2ba), __core__mkNilData(()))), __core__mkCons(__core__constrData(1, __core__mkNilData(())), __core__mkNilData(()))))),
                                                                                                        false,
                                                                                                        true
                                                                                                    )
                                                                                                }(__helios__txinput__address(input_2))
                                                                                            })
                                                                                        }((recurse_4, self_30, fn_2) -> {
                                                                                            __core__chooseList(self_30, () -> {
                                                                                                true
                                                                                            }, () -> {
                                                                                                __core__ifThenElse(
                                                                                                    fn_2(__core__headList__safe(self_30)),
                                                                                                    () -> {
                                                                                                        recurse_4(recurse_4, __core__tailList__safe(self_30), fn_2)
                                                                                                    },
                                                                                                    () -> {
                                                                                                        false
                                                                                                    }
                                                                                                )()
                                                                                            })()
                                                                                        })), __core__chooseUnit((cond) -> {
                                                                                            __core__ifThenElse(
                                                                                                cond,
                                                                                                () -> {
                                                                                                    ()
                                                                                                },
                                                                                                () -> {
                                                                                                    error()
                                                                                                }
                                                                                            )()
                                                                                        }(__core__equalsInteger(kp1_1, __core__unIData(__core__headList(supply)))), (V1) -> {
                                                                                            (tp1) -> {
                                                                                                (V0) -> {
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
                                                                                                    }(__core__lessThanInteger(__core__subtractInteger((self_17) -> {
                                                                                                        __core__unIData((self_8) -> {
                                                                                                            __core__headList(__core__sndPair(__core__unConstrData(self_8)))
                                                                                                        }((self_8) -> {
                                                                                                            __core__headList(__core__sndPair(__core__unConstrData(self_8)))
                                                                                                        }(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_17)))))))
                                                                                                    }(__helios__tx__time_range(__helios__scriptcontext__tx)), __helios__timerange__start(__helios__tx__time_range(__helios__scriptcontext__tx))), 86400000)), (b0_2) -> {
                                                                                                        __helios__common__fold(group_ptrs_2, (prev_1, item_3) -> {
                                                                                                            prev_1((a_7, b_7, c) -> {
                                                                                                                (ptr) -> {
                                                                                                                    (input_3) -> {
                                                                                                                        (id_2) -> {
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
                                                                                                                            }(__core__equalsData(__helios__txinput__address(input_3), __core__constrData(0, __core__mkCons(__core__constrData(1, __core__mkCons(__core__bData(#e24e2fb0a6460444d32fd815575372ecc21118fa19adcc41cd00c2ba), __core__mkNilData(()))), __core__mkCons(__core__constrData(1, __core__mkNilData(())), __core__mkNilData(())))))), __core__chooseUnit(__core__ifThenElse(
                                                                                                                                __core__equalsInteger(id_2, a_7),
                                                                                                                                () -> {
                                                                                                                                    ()
                                                                                                                                },
                                                                                                                                () -> {
                                                                                                                                    error()
                                                                                                                                }
                                                                                                                            )(), (group) -> {
                                                                                                                                __helios__common__fold(group, (prev_2, item_4) -> {
                                                                                                                                    prev_2((a_8, b_8) -> {
                                                                                                                                        (asset) -> {
                                                                                                                                            (callback_6) -> {
                                                                                                                                                callback_6(__core__ifThenElse(
                                                                                                                                                    __core__lessThanInteger(__core__unIData(__core__headList(__core__tailList(__core__tailList(__core__tailList(asset))))), a_8),
                                                                                                                                                    () -> {
                                                                                                                                                        __core__unIData(__core__headList(__core__tailList(__core__tailList(__core__tailList(asset)))))
                                                                                                                                                    },
                                                                                                                                                    () -> {
                                                                                                                                                        a_8
                                                                                                                                                    }
                                                                                                                                                )(), __core__addInteger(b_8, (self_36) -> {
                                                                                                                                                    (top) -> {
                                                                                                                                                        (bottom) -> {
                                                                                                                                                            __core__divideInteger(top, bottom)
                                                                                                                                                        }(__core__unIData(__core__headList(__core__tailList(__core__unListData(self_36)))))
                                                                                                                                                    }(__core__unIData(__core__headList(__core__unListData(self_36))))
                                                                                                                                                }(
                                                                                                                                                    (a_3, b_4) -> {
                                                                                                                                                        (at) -> {
                                                                                                                                                            (ab) -> {
                                                                                                                                                                __core__listData(__core__mkCons(__core__iData(__core__multiplyInteger(at, b_4)), __core__mkCons(__core__iData(ab), __core__mkNilData(()))))
                                                                                                                                                            }(__core__unIData(__core__headList(__core__tailList(__core__unListData(a_3)))))
                                                                                                                                                        }(__core__unIData(__core__headList(__core__unListData(a_3))))
                                                                                                                                                    }(__core__headList(__core__tailList(__core__tailList(asset))), __core__unIData(__core__headList(__core__tailList(asset)))))))
                                                                                                                                            }
                                                                                                                                        }(__core__unListData(item_4))
                                                                                                                                    })
                                                                                                                                }, (callback_3) -> {
                                                                                                                                    callback_3(b_7, c)
                                                                                                                                })((tp_2, dV_2) -> {
                                                                                                                                    (callback_5) -> {
                                                                                                                                        callback_5(__core__addInteger(a_7, 1), tp_2, dV_2)
                                                                                                                                    }
                                                                                                                                })
                                                                                                                            }(__core__unListData(__helios__txoutputdatum__inline((self_4) -> {
                                                                                                                                __core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(self_4)))))
                                                                                                                            }(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(input_3))))))))))
                                                                                                                        }((tokens_1) -> {
                                                                                                                            __core__chooseUnit(__core__ifThenElse(
                                                                                                                                __core__equalsInteger(__helios__common__length(tokens_1), 1),
                                                                                                                                () -> {
                                                                                                                                    ()
                                                                                                                                },
                                                                                                                                () -> {
                                                                                                                                    error()
                                                                                                                                }
                                                                                                                            )(), (head_1) -> {
                                                                                                                                (callback) -> {
                                                                                                                                    callback(__core__unBData(__core__fstPair(head_1)), __core__unIData(__core__sndPair(head_1)))
                                                                                                                                }
                                                                                                                            }(__core__headList(tokens_1))(
                                                                                                                            (token_name_3, qty_1) -> {
                                                                                                                                __core__chooseUnit(__core__ifThenElse(
                                                                                                                                    __core__equalsInteger(qty_1, 1),
                                                                                                                                    () -> {
                                                                                                                                        ()
                                                                                                                                    },
                                                                                                                                    () -> {
                                                                                                                                        error()
                                                                                                                                    }
                                                                                                                                )(), (self_51) -> {
                                                                                                                                    () -> {
                                                                                                                                        __core__unIData(__core__headList(__core__sndPair(__core__unConstrData(self_51))))
                                                                                                                                    }
                                                                                                                                }(__core__ifThenElse(
                                                                                                                                    __core__ifThenElse(
                                                                                                                                        __core__lessThanInteger(__core__lengthOfByteString(token_name_3), 7),
                                                                                                                                        () -> {
                                                                                                                                            false
                                                                                                                                        },
                                                                                                                                        () -> {
                                                                                                                                            __core__equalsByteString(#61737365747320, __core__sliceByteString(0, 7, token_name_3))
                                                                                                                                        }
                                                                                                                                    )(),
                                                                                                                                    () -> {
                                                                                                                                        (some) -> {
                                                                                                                                            __core__constrData(0, __core__mkCons(__core__iData(some), __core__mkNilData(())))
                                                                                                                                        }((string) -> {
                                                                                                                                            (bytes_2) -> {
                                                                                                                                                (n_3) -> {
                                                                                                                                                    (b0) -> {
                                                                                                                                                        (recurse_15) -> {
                                                                                                                                                            __core__ifThenElse(
                                                                                                                                                                __core__equalsInteger(b0, 48),
                                                                                                                                                                () -> {
                                                                                                                                                                    __core__ifThenElse(
                                                                                                                                                                        __core__equalsInteger(n_3, 1),
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
                                                                                                                                                                                __core__equalsInteger(__core__indexByteString(bytes_2, 1), 48),
                                                                                                                                                                                () -> {
                                                                                                                                                                                    error()
                                                                                                                                                                                },
                                                                                                                                                                                () -> {
                                                                                                                                                                                    __core__multiplyInteger(recurse_15(recurse_15, 0, 1), -1)
                                                                                                                                                                                }
                                                                                                                                                                            )()
                                                                                                                                                                        },
                                                                                                                                                                        () -> {
                                                                                                                                                                            recurse_15(recurse_15, 0, 0)
                                                                                                                                                                        }
                                                                                                                                                                    )()
                                                                                                                                                                }
                                                                                                                                                            )()
                                                                                                                                                        }((recurse_14, acc, i_1) -> {
                                                                                                                                                            __core__ifThenElse(
                                                                                                                                                                __core__equalsInteger(i_1, n_3),
                                                                                                                                                                () -> {
                                                                                                                                                                    acc
                                                                                                                                                                },
                                                                                                                                                                () -> {
                                                                                                                                                                    (new_acc) -> {
                                                                                                                                                                        recurse_14(recurse_14, new_acc, __core__addInteger(i_1, 1))
                                                                                                                                                                    }(__core__addInteger(__core__multiplyInteger(acc, 10), (digit) -> {
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
                                                                                                                                                                    }(__core__indexByteString(bytes_2, i_1))))
                                                                                                                                                                }
                                                                                                                                                            )()
                                                                                                                                                        })
                                                                                                                                                    }(__core__indexByteString(bytes_2, 0))
                                                                                                                                                }(__core__lengthOfByteString(bytes_2))
                                                                                                                                            }(__core__encodeUtf8(string))
                                                                                                                                        }((self_46) -> {
                                                                                                                                            () -> {
                                                                                                                                                __core__decodeUtf8(self_46)
                                                                                                                                            }
                                                                                                                                        }(__core__sliceByteString(7, __core__subtractInteger((pos) -> {
                                                                                                                                            __core__ifThenElse(
                                                                                                                                                __core__lessThanInteger(pos, 0),
                                                                                                                                                () -> {
                                                                                                                                                    __core__addInteger(__core__addInteger(__core__lengthOfByteString(token_name_3), 1), pos)
                                                                                                                                                },
                                                                                                                                                () -> {
                                                                                                                                                    pos
                                                                                                                                                }
                                                                                                                                            )()
                                                                                                                                        }(__core__lengthOfByteString(token_name_3)), 7), token_name_3))()))
                                                                                                                                    },
                                                                                                                                    () -> {
                                                                                                                                        __core__constrData(1, __core__mkNilData(()))
                                                                                                                                    }
                                                                                                                                )())())
                                                                                                                            }))
                                                                                                                        }((self_33) -> {
                                                                                                                            (mph) -> {
                                                                                                                                (mph_1) -> {
                                                                                                                                    (recurse_9) -> {
                                                                                                                                        recurse_9(recurse_9, self_33)
                                                                                                                                    }((recurse_8, map_2) -> {
                                                                                                                                        __core__chooseList(map_2, () -> {
                                                                                                                                            error()
                                                                                                                                        }, () -> {
                                                                                                                                            __core__ifThenElse(
                                                                                                                                                __core__equalsData(__core__fstPair(__core__headList__safe(map_2)), mph_1),
                                                                                                                                                () -> {
                                                                                                                                                    __core__unMapData(__core__sndPair(__core__headList__safe(map_2)))
                                                                                                                                                },
                                                                                                                                                () -> {
                                                                                                                                                    recurse_8(recurse_8, __core__tailList__safe(map_2))
                                                                                                                                                }
                                                                                                                                            )()
                                                                                                                                        })()
                                                                                                                                    })
                                                                                                                                }(__core__bData(mph))
                                                                                                                            }
                                                                                                                        }((self_15) -> {
                                                                                                                            __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_15)))))
                                                                                                                        }(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(input_3))))))(__module__Tokens__policy)))
                                                                                                                    }((recurse_17) -> {
                                                                                                                        recurse_17(recurse_17, __common0, 0)
                                                                                                                    }((recurse_16, self_60, i_2) -> {
                                                                                                                        __core__chooseList(self_60, () -> {
                                                                                                                            error()
                                                                                                                        }, () -> {
                                                                                                                            __core__ifThenElse(
                                                                                                                                __core__equalsInteger(ptr, i_2),
                                                                                                                                () -> {
                                                                                                                                    __core__headList__safe(self_60)
                                                                                                                                },
                                                                                                                                () -> {
                                                                                                                                    recurse_16(recurse_16, __core__tailList__safe(self_60), __core__addInteger(i_2, 1))
                                                                                                                                }
                                                                                                                            )()
                                                                                                                        })()
                                                                                                                    }))
                                                                                                                }(__core__unIData(item_3))
                                                                                                            })
                                                                                                        }, (callback_2) -> {
                                                                                                            callback_2(1, b0_2, 0)
                                                                                                        })
                                                                                                    }(
                                                                                                        __helios__timerange__start(__helios__tx__time_range(__helios__scriptcontext__tx))
                                                                                                    )(
                                                                                                        (__lhs_0_14, tp, dV) -> {
                                                                                                            (callback_4) -> {
                                                                                                                callback_4(tp, dV)
                                                                                                            }
                                                                                                        }
                                                                                                    ))((tp_oldest, dV_4) -> {
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
                                                                                                        }(__core__equalsInteger(V1, __core__addInteger(V0, dV_4))), __core__chooseUnit((cond) -> {
                                                                                                            __core__ifThenElse(
                                                                                                                cond,
                                                                                                                () -> {
                                                                                                                    ()
                                                                                                                },
                                                                                                                () -> {
                                                                                                                    error()
                                                                                                                }
                                                                                                            )()
                                                                                                        }(__core__equalsInteger(ig1_1, n_groups)), (cond) -> {
                                                                                                            __core__ifThenElse(
                                                                                                                cond,
                                                                                                                () -> {
                                                                                                                    ()
                                                                                                                },
                                                                                                                () -> {
                                                                                                                    error()
                                                                                                                }
                                                                                                            )()
                                                                                                        }(__core__equalsInteger(tp1, tp_oldest))))
                                                                                                    })
                                                                                                }(__core__unIData(__core__headList(__core__tailList(__core__tailList(__core__tailList(__core__tailList(supply)))))))
                                                                                            }(__core__unIData(__core__headList(__core__tailList(__common6))))
                                                                                        }(__core__unIData(__core__headList(__common6)))))
                                                                                    }(__helios__common__length(group_ptrs_2))
                                                                                }((input_4) -> {
                                                                                    __core__unListData(__helios__txoutputdatum__inline((self_4) -> {
                                                                                        __core__headList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(self_4)))))
                                                                                    }(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(input_4)))))))
                                                                                }((recurse_19) -> {
                                                                                    recurse_19(recurse_19, __common0)
                                                                                }((recurse_18, lst_3) -> {
                                                                                    __core__chooseList(lst_3, () -> {
                                                                                        error()
                                                                                    }, () -> {
                                                                                        (item_5) -> {
                                                                                            __core__ifThenElse(
                                                                                                (a_1) -> {
                                                                                                    __core__ifThenElse(
                                                                                                        __core__lessThanEqualsInteger(a_1, 0),
                                                                                                        false,
                                                                                                        true
                                                                                                    )
                                                                                                }((self_14) -> {
                                                                                                    (assetClass) -> {
                                                                                                        (__common7) -> {
                                                                                                            (__common8) -> {
                                                                                                                (mintingPolicyHash) -> {
                                                                                                                    (tokenName) -> {
                                                                                                                        (outer_1) -> {
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
                                                                                                                            }, self_14)
                                                                                                                        }((outer, inner, map) -> {
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
                                                                                                                        })
                                                                                                                    }(__core__headList(__core__tailList(__common8)))
                                                                                                                }(__core__headList(__common8))
                                                                                                            }(__core__sndPair(__common7))
                                                                                                        }(__core__unConstrData(assetClass))
                                                                                                    }
                                                                                                }((self_15) -> {
                                                                                                    __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_15)))))
                                                                                                }(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(item_5))))))(__module__Tokens__supply)),
                                                                                                () -> {
                                                                                                    item_5
                                                                                                },
                                                                                                () -> {
                                                                                                    recurse_18(recurse_18, __core__tailList__safe(lst_3))
                                                                                                }
                                                                                            )()
                                                                                        }(__core__headList__safe(lst_3))
                                                                                    })()
                                                                                })))
                                                                            }(__core__unIData(ig1), __core__unIData(kp1), __core__unListData(group_ptrs), __core__unIData(n_all_groups))
                                                                        }(__helios__assetclass__new(__module__Tokens__policy, #737570706c79))
                                                                    }((input) -> {
                                                                        (self_41) -> {
                                                                            __core__unBData(__core__headList(__core__sndPair(__core__unConstrData(self_41))))
                                                                        }((self_42) -> {
                                                                            () -> {
                                                                                (recurse_13) -> {
                                                                                    recurse_13(recurse_13)(self_42, false, ())
                                                                                }((recurse_12) -> {
                                                                                    (map_3, found, asset_class) -> {
                                                                                        __core__chooseList(map_3, () -> {
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
                                                                                            (head) -> {
                                                                                                (tail_2) -> {
                                                                                                    (mph_5) -> {
                                                                                                        __core__ifThenElse(
                                                                                                            __core__equalsByteString(mph_5, #),
                                                                                                            () -> {
                                                                                                                recurse_12(recurse_12)(tail_2, found, asset_class)
                                                                                                            },
                                                                                                            () -> {
                                                                                                                __core__ifThenElse(
                                                                                                                    found,
                                                                                                                    () -> {
                                                                                                                        error()
                                                                                                                    },
                                                                                                                    () -> {
                                                                                                                        (tokens) -> {
                                                                                                                            __core__chooseList(__core__tailList(tokens), () -> {
                                                                                                                                (first) -> {
                                                                                                                                    (qty) -> {
                                                                                                                                        __core__ifThenElse(
                                                                                                                                            __core__equalsInteger(qty, 1),
                                                                                                                                            () -> {
                                                                                                                                                (name) -> {
                                                                                                                                                    recurse_12(recurse_12)(tail_2, true, __helios__assetclass__new(mph_5, name))
                                                                                                                                                }(__core__unBData(__core__fstPair(first)))
                                                                                                                                            },
                                                                                                                                            () -> {
                                                                                                                                                error()
                                                                                                                                            }
                                                                                                                                        )()
                                                                                                                                    }(__core__unIData(__core__sndPair(first)))
                                                                                                                                }(__core__headList(tokens))
                                                                                                                            }, () -> {
                                                                                                                                error()
                                                                                                                            })()
                                                                                                                        }(__core__unMapData(__core__sndPair(head)))
                                                                                                                    }
                                                                                                                )()
                                                                                                            }
                                                                                                        )()
                                                                                                    }(__core__unBData(__core__fstPair(head)))
                                                                                                }(__core__tailList(map_3))
                                                                                            }(__core__headList(map_3))
                                                                                        })()
                                                                                    }
                                                                                })
                                                                            }
                                                                        }((self_15) -> {
                                                                            __core__unMapData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_15)))))
                                                                        }(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(input))))))())
                                                                    }((id) -> {
                                                                        (recurse_11) -> {
                                                                            recurse_11(recurse_11, __common4)
                                                                        }((recurse_10, lst_2) -> {
                                                                            __core__chooseList(lst_2, () -> {
                                                                                error()
                                                                            }, () -> {
                                                                                (item) -> {
                                                                                    __core__ifThenElse(
                                                                                        __core__equalsData(__core__headList(__core__sndPair(__core__unConstrData(item))), id),
                                                                                        () -> {
                                                                                            item
                                                                                        },
                                                                                        () -> {
                                                                                            recurse_10(recurse_10, __core__tailList__safe(lst_2))
                                                                                        }
                                                                                    )()
                                                                                }(__core__headList__safe(lst_2))
                                                                            })()
                                                                        })
                                                                    }(__core__headList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__purpose))))))
                                                                }(__core__headList(__core__tailList(__common2)))
                                                            }((mph_2, token_name) -> {
                                                                __core__constrData(0, __core__mkCons(__core__bData(mph_2), __core__mkCons(__core__bData(token_name), __core__mkNilData(()))))
                                                            })
                                                        }((self_26, fn, z) -> {
                                                            (recurse_3) -> {
                                                                recurse_3(recurse_3, self_26, z)
                                                            }((recurse_2, self_27, z_1) -> {
                                                                __core__chooseList(self_27, () -> {
                                                                    z_1
                                                                }, () -> {
                                                                    recurse_2(recurse_2, __core__tailList__safe(self_27), fn(z_1, __core__headList__safe(self_27)))
                                                                })()
                                                            })
                                                        })
                                                    }((self_25) -> {
                                                        (self_8) -> {
                                                            __core__headList(__core__sndPair(__core__unConstrData(self_8)))
                                                        }(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(self_25)))))
                                                    })
                                                }((self_24) -> {
                                                    __core__unIData((self_8) -> {
                                                        __core__headList(__core__sndPair(__core__unConstrData(self_8)))
                                                    }((self_8) -> {
                                                        __core__headList(__core__sndPair(__core__unConstrData(self_8)))
                                                    }(__core__headList(__core__sndPair(__core__unConstrData(self_24))))))
                                                })
                                            }((self_23) -> {
                                                __core__headList(__core__tailList(__core__tailList(__core__tailList(__core__tailList(__core__tailList(__core__tailList(__core__tailList(__core__sndPair(__core__unConstrData(self_23))))))))))
                                            })
                                        }(__core__unListData(__core__headList(__core__tailList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))))))
                                    }(__core__unListData(__common3))
                                }(__core__headList(__core__sndPair(__core__unConstrData(__helios__scriptcontext__tx))))
                            }(__core__headList(__common2))
                        }((self) -> {
                            (pair) -> {
                                (index) -> {
                                    (fields) -> {
                                        __core__ifThenElse(
                                            __core__equalsInteger(index, 2),
                                            () -> {
                                                __core__headList(fields)
                                            },
                                            () -> {
                                                error()
                                            }
                                        )()
                                    }(__core__sndPair(pair))
                                }(__core__fstPair(pair))
                            }(__core__unConstrData(self))
                        })
                    }((lst) -> {
                        (recurse_1) -> {
                            recurse_1(recurse_1, lst)
                        }((recurse, lst_1) -> {
                            __core__chooseList(lst_1, () -> {
                                0
                            }, () -> {
                                __core__addInteger(recurse(recurse, __core__tailList__safe(lst_1)), 1)
                            })()
                        })
                    })
                }(__core__sndPair(__common1))
            }(__core__unConstrData(__CONTEXT))
        }(__core__sndPair(__common5))
    }(__core__unConstrData(mode1))
}`

    compile(src1, {
        optimize: true,
        parseOptions: {
            ...DEFAULT_PARSE_OPTIONS,
            builtinsPrefix: "__core__"
        }
    })
})
