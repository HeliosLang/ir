import { describe, it } from "node:test"
import { format } from "../format/index.js"
import { prepare } from "./compile.js"
import { strictEqual } from "node:assert"
import { removeWhitespace } from "@helios-lang/codec-utils"

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
        const expr = prepare(src, {optimize: true})

        const output = format(expr, {syntacticSugar: false})

		strictEqual(removeWhitespace(output), removeWhitespace(expectedOutput))
    })
})
